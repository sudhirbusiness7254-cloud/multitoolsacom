import { useState, useEffect } from "react";
import { Star, Send, CheckCircle, Users, MessageSquare } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

interface Review {
  id: string;
  name: string;
  role: string | null;
  location: string | null;
  rating: number;
  title: string;
  review: string;
  created_at: string;
}

const RealTimeReviews = () => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [liveUsersCount, setLiveUsersCount] = useState(1);
  
  // Form state
  const [formData, setFormData] = useState({
    name: "",
    role: "",
    location: "",
    rating: 5,
    title: "",
    review: ""
  });

  // Fetch initial reviews
  useEffect(() => {
    const fetchReviews = async () => {
      const { data, error } = await supabase
        .from("reviews")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(12);

      if (error) {
        console.error("Error fetching reviews:", error);
      } else {
        setReviews(data || []);
      }
      setLoading(false);
    };

    fetchReviews();
  }, []);

  // Real-time subscription for new reviews
  useEffect(() => {
    const channel = supabase
      .channel("reviews-realtime")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "reviews"
        },
        (payload) => {
          const newReview = payload.new as Review;
          setReviews((prev) => [newReview, ...prev.slice(0, 11)]);
          toast.success("New review just posted!", {
            description: `${newReview.name} left a ${newReview.rating}-star review`
          });
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  // Presence for live users count
  useEffect(() => {
    const channel = supabase.channel("reviews-presence", {
      config: { presence: { key: Math.random().toString(36).substring(7) } }
    });

    channel
      .on("presence", { event: "sync" }, () => {
        const state = channel.presenceState();
        setLiveUsersCount(Object.keys(state).length || 1);
      })
      .subscribe(async (status) => {
        if (status === "SUBSCRIBED") {
          await channel.track({ online_at: new Date().toISOString() });
        }
      });

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.title || !formData.review) {
      toast.error("Please fill in all required fields");
      return;
    }

    setSubmitting(true);

    const { error } = await supabase.from("reviews").insert({
      name: formData.name,
      role: formData.role || null,
      location: formData.location || null,
      rating: formData.rating,
      title: formData.title,
      review: formData.review
    });

    if (error) {
      toast.error("Failed to submit review. Please try again.");
      console.error("Error submitting review:", error);
    } else {
      toast.success("Thank you! Your review is pending approval.", {
        description: "It will appear once approved by our team."
      });
      setFormData({
        name: "",
        role: "",
        location: "",
        rating: 5,
        title: "",
        review: ""
      });
      setShowForm(false);
    }

    setSubmitting(false);
  };

  const calculateStats = () => {
    if (reviews.length === 0) return { avg: 0, total: 0, distribution: [0, 0, 0, 0, 0] };
    
    const total = reviews.length;
    const sum = reviews.reduce((acc, r) => acc + r.rating, 0);
    const avg = (sum / total).toFixed(1);
    
    const distribution = [5, 4, 3, 2, 1].map(
      star => reviews.filter(r => r.rating === star).length
    );

    return { avg: parseFloat(avg), total, distribution };
  };

  const stats = calculateStats();

  const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return "Just now";
    if (diffMins < 60) return `${diffMins} min ago`;
    if (diffHours < 24) return `${diffHours} hours ago`;
    if (diffDays < 7) return `${diffDays} days ago`;
    return date.toLocaleDateString();
  };

  if (loading) {
    return (
      <div className="py-12 text-center">
        <div className="animate-pulse flex flex-col items-center gap-4">
          <div className="w-16 h-16 bg-muted rounded-full"></div>
          <div className="w-48 h-4 bg-muted rounded"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="mb-10 sm:mb-12 md:mb-14">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
        <div>
          <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-center sm:text-left">
            Real-Time User Reviews
          </h3>
          <p className="text-muted-foreground text-sm mt-1">
            Live reviews from our community - see new ones appear instantly!
          </p>
        </div>
        
        {/* Live indicator */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 px-3 py-1.5 bg-green-500/10 border border-green-500/30 rounded-full">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
            <span className="text-xs font-medium text-green-600 dark:text-green-400">LIVE</span>
          </div>
          <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
            <Users className="w-4 h-4" />
            <span>{liveUsersCount} viewing</span>
          </div>
        </div>
      </div>

      {/* Stats Summary */}
      <div className="bg-card rounded-2xl p-6 sm:p-8 border border-border mb-8">
        <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-12">
          <div className="text-center">
            <div className="text-5xl sm:text-6xl font-bold text-primary mb-2">{stats.avg || "5.0"}</div>
            <div className="flex justify-center gap-1 mb-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className={`w-6 h-6 ${
                    star <= Math.round(stats.avg) ? "fill-yellow-500 text-yellow-500" : "text-muted"
                  }`}
                />
              ))}
            </div>
            <p className="text-sm text-muted-foreground">Based on {stats.total} reviews</p>
          </div>
          <div className="hidden md:block w-px h-24 bg-border" />
          <div className="flex-1 max-w-md space-y-2">
            {[5, 4, 3, 2, 1].map((star, i) => (
              <div key={star} className="flex items-center gap-3">
                <span className="text-sm w-12">{star} star</span>
                <div className="flex-1 h-2 bg-secondary rounded-full overflow-hidden">
                  <div
                    className="h-full bg-yellow-500 rounded-full transition-all duration-500"
                    style={{
                      width: stats.total > 0 ? `${(stats.distribution[i] / stats.total) * 100}%` : "0%"
                    }}
                  />
                </div>
                <span className="text-xs text-muted-foreground w-8 text-right">
                  {stats.distribution[i]}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Add Review Button */}
      <div className="text-center mb-8">
        <Button
          onClick={() => setShowForm(!showForm)}
          variant={showForm ? "outline" : "default"}
          className="gap-2"
        >
          <MessageSquare className="w-4 h-4" />
          {showForm ? "Cancel" : "Write a Review"}
        </Button>
      </div>

      {/* Review Form */}
      {showForm && (
        <div className="bg-card rounded-xl p-6 border border-border mb-8 animate-in slide-in-from-top-4">
          <h4 className="font-semibold text-lg mb-4">Share Your Experience</h4>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium mb-1 block">Your Name *</label>
                <Input
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="John Doe"
                  required
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-1 block">Your Role</label>
                <Input
                  value={formData.role}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                  placeholder="e.g., Web Developer"
                />
              </div>
            </div>
            
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium mb-1 block">Location</label>
                <Input
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  placeholder="e.g., New York, USA"
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">Rating *</label>
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setFormData({ ...formData, rating: star })}
                      className="p-1 hover:scale-110 transition-transform"
                    >
                      <Star
                        className={`w-6 h-6 ${
                          star <= formData.rating
                            ? "fill-yellow-500 text-yellow-500"
                            : "text-muted hover:text-yellow-400"
                        }`}
                      />
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div>
              <label className="text-sm font-medium mb-1 block">Review Title *</label>
              <Input
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="Summarize your experience"
                required
              />
            </div>

            <div>
              <label className="text-sm font-medium mb-1 block">Your Review *</label>
              <Textarea
                value={formData.review}
                onChange={(e) => setFormData({ ...formData, review: e.target.value })}
                placeholder="Tell us about your experience with MultiToolsA..."
                className="min-h-[100px]"
                required
              />
            </div>

            <Button type="submit" disabled={submitting} className="w-full gap-2">
              {submitting ? (
                <>Submitting...</>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  Submit Review
                </>
              )}
            </Button>
          </form>
        </div>
      )}

      {/* Reviews Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {reviews.map((review) => (
          <div
            key={review.id}
            className="bg-card rounded-xl p-5 sm:p-6 border border-border hover:border-primary/30 transition-all animate-in fade-in-50"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${
                      i < review.rating ? "fill-yellow-500 text-yellow-500" : "text-muted"
                    }`}
                  />
                ))}
              </div>
              <span className="inline-flex items-center gap-1 text-xs text-green-600 bg-green-100 dark:bg-green-900/30 px-2 py-0.5 rounded-full">
                <CheckCircle className="w-3 h-3" />
                Verified
              </span>
            </div>
            <h4 className="font-semibold text-foreground mb-2">{review.title}</h4>
            <p className="text-sm text-muted-foreground mb-4 leading-relaxed line-clamp-3">
              "{review.review}"
            </p>
            <div className="flex items-center justify-between pt-3 border-t border-border">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-semibold text-sm">
                  {review.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")
                    .toUpperCase()
                    .slice(0, 2)}
                </div>
                <div>
                  <p className="font-medium text-sm">{review.name}</p>
                  <p className="text-xs text-muted-foreground">{review.role || "User"}</p>
                </div>
              </div>
              <div className="text-right">
                {review.location && (
                  <p className="text-xs text-muted-foreground">{review.location}</p>
                )}
                <p className="text-xs text-muted-foreground">{formatTimeAgo(review.created_at)}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {reviews.length === 0 && (
        <div className="text-center py-12">
          <MessageSquare className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
          <p className="text-muted-foreground">No reviews yet. Be the first to leave one!</p>
        </div>
      )}
    </div>
  );
};

export default RealTimeReviews;