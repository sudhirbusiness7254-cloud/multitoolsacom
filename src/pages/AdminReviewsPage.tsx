import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { CheckCircle, XCircle, Trash2, Star, Clock, Shield, LogIn } from "lucide-react";

interface Review {
  id: string;
  name: string;
  role: string | null;
  location: string | null;
  rating: number;
  title: string;
  review: string;
  status: string;
  created_at: string;
}

const AdminReviewsPage = () => {
  const navigate = useNavigate();
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [filter, setFilter] = useState<'all' | 'pending' | 'approved' | 'rejected'>('pending');

  useEffect(() => {
    checkAdminStatus();
  }, []);

  useEffect(() => {
    if (isAdmin) {
      fetchReviews();
    }
  }, [isAdmin, filter]);

  const checkAdminStatus = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      setIsLoggedIn(false);
      setLoading(false);
      return;
    }

    setIsLoggedIn(true);

    // Check if user has admin role
    const { data: roles } = await supabase
      .from('user_roles')
      .select('role')
      .eq('user_id', user.id)
      .eq('role', 'admin');

    if (roles && roles.length > 0) {
      setIsAdmin(true);
    }
    setLoading(false);
  };

  const fetchReviews = async () => {
    let query = supabase
      .from('reviews')
      .select('*')
      .order('created_at', { ascending: false });

    if (filter !== 'all') {
      query = query.eq('status', filter);
    }

    const { data, error } = await query;

    if (error) {
      console.error('Error fetching reviews:', error);
      toast.error('Failed to fetch reviews');
    } else {
      setReviews(data || []);
    }
  };

  const updateReviewStatus = async (id: string, status: 'approved' | 'rejected') => {
    const { error } = await supabase
      .from('reviews')
      .update({ status })
      .eq('id', id);

    if (error) {
      console.error('Error updating review:', error);
      toast.error('Failed to update review');
    } else {
      toast.success(`Review ${status}`);
      fetchReviews();
    }
  };

  const deleteReview = async (id: string) => {
    const { error } = await supabase
      .from('reviews')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting review:', error);
      toast.error('Failed to delete review');
    } else {
      toast.success('Review deleted');
      fetchReviews();
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved': return 'bg-green-500/20 text-green-500 border-green-500/30';
      case 'rejected': return 'bg-red-500/20 text-red-500 border-red-500/30';
      default: return 'bg-yellow-500/20 text-yellow-500 border-yellow-500/30';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center p-8">
            <LogIn className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <h1 className="text-2xl font-bold mb-2">Login Required</h1>
            <p className="text-muted-foreground mb-4">Please login to access this page.</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center p-8">
            <Shield className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <h1 className="text-2xl font-bold mb-2">Access Denied</h1>
            <p className="text-muted-foreground">You don't have permission to access this page.</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Helmet>
        <title>Admin - Review Moderation | MultiToolsA</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <Header />

      <main className="flex-1 py-8 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
            <div>
              <h1 className="text-3xl font-bold flex items-center gap-2">
                <Shield className="w-8 h-8 text-primary" />
                Review Moderation
              </h1>
              <p className="text-muted-foreground">Approve or reject user reviews</p>
            </div>

            <div className="flex gap-2 flex-wrap">
              {(['all', 'pending', 'approved', 'rejected'] as const).map((status) => (
                <Button
                  key={status}
                  variant={filter === status ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setFilter(status)}
                  className="capitalize"
                >
                  {status}
                  {status === 'pending' && reviews.filter(r => r.status === 'pending').length > 0 && filter !== 'pending' && (
                    <span className="ml-1 bg-yellow-500 text-white rounded-full px-1.5 text-xs">
                      {reviews.filter(r => r.status === 'pending').length}
                    </span>
                  )}
                </Button>
              ))}
            </div>
          </div>

          {reviews.length === 0 ? (
            <div className="text-center py-12 bg-card rounded-lg border border-border">
              <Clock className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">No {filter === 'all' ? '' : filter} reviews found</p>
            </div>
          ) : (
            <div className="space-y-4">
              {reviews.map((review) => (
                <div 
                  key={review.id} 
                  className="bg-card border border-border rounded-lg p-6"
                >
                  <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(review.status)}`}>
                          {review.status}
                        </span>
                        <div className="flex gap-0.5">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star
                              key={star}
                              className={`w-4 h-4 ${star <= review.rating ? 'fill-yellow-500 text-yellow-500' : 'text-muted-foreground'}`}
                            />
                          ))}
                        </div>
                      </div>

                      <h3 className="text-lg font-semibold mb-1">{review.title}</h3>
                      <p className="text-muted-foreground mb-3">{review.review}</p>

                      <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                        <span className="font-medium text-foreground">{review.name}</span>
                        {review.role && <span>{review.role}</span>}
                        {review.location && <span>{review.location}</span>}
                        <span>{formatDate(review.created_at)}</span>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      {review.status !== 'approved' && (
                        <Button
                          size="sm"
                          variant="outline"
                          className="text-green-500 hover:bg-green-500 hover:text-white"
                          onClick={() => updateReviewStatus(review.id, 'approved')}
                        >
                          <CheckCircle className="w-4 h-4 mr-1" />
                          Approve
                        </Button>
                      )}
                      {review.status !== 'rejected' && (
                        <Button
                          size="sm"
                          variant="outline"
                          className="text-red-500 hover:bg-red-500 hover:text-white"
                          onClick={() => updateReviewStatus(review.id, 'rejected')}
                        >
                          <XCircle className="w-4 h-4 mr-1" />
                          Reject
                        </Button>
                      )}
                      <Button
                        size="sm"
                        variant="outline"
                        className="text-muted-foreground hover:bg-destructive hover:text-destructive-foreground"
                        onClick={() => deleteReview(review.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default AdminReviewsPage;
