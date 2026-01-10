import { Helmet } from "react-helmet-async";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HreflangTags from "@/components/HreflangTags";
import RealTimeReviews from "@/components/RealTimeReviews";
import { Link } from "react-router-dom";
import { ArrowRight, Star, MessageSquare } from "lucide-react";

const ReviewsPage = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Helmet>
        <title>User Reviews & Testimonials - MultiToolsA | Real Feedback</title>
        <meta 
          name="description" 
          content="Read real reviews from MultiToolsA users. See what photographers, designers, developers, and content creators say about our free image tools. Share your own experience!" 
        />
        <meta name="keywords" content="MultiToolsA reviews, user testimonials, image tool reviews, free tool feedback, user ratings" />
        <link rel="canonical" href="https://multitoolsa.com/reviews" />
        <meta property="og:title" content="User Reviews - MultiToolsA" />
        <meta property="og:description" content="Real reviews from real users. See what people say about our free image tools." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://multitoolsa.com/reviews" />
        
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            "name": "User Reviews - MultiToolsA",
            "description": "Real user reviews and testimonials for MultiToolsA image tools",
            "url": "https://multitoolsa.com/reviews",
            "mainEntity": {
              "@type": "Product",
              "name": "MultiToolsA",
              "description": "Free online image editing tools",
              "aggregateRating": {
                "@type": "AggregateRating",
                "ratingValue": "4.9",
                "reviewCount": "2847",
                "bestRating": "5",
                "worstRating": "1"
              }
            }
          })}
        </script>
      </Helmet>
      <HreflangTags path="/reviews" />

      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-12 md:py-20 bg-gradient-hero relative overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/10 rounded-full blur-3xl pointer-events-none" />
          
          <div className="container mx-auto px-4 relative z-10 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/30 mb-6">
              <MessageSquare className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">Real-Time Reviews</span>
            </div>
            
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-6">
              What Our Users Say
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
              Real feedback from real users. See live reviews as they're posted and share your own experience 
              with MultiToolsA's free image tools.
            </p>
            
            <div className="flex flex-wrap justify-center gap-6 text-sm">
              <div className="flex items-center gap-2">
                <div className="flex gap-0.5">
                  {[1,2,3,4,5].map(i => (
                    <Star key={i} className="w-4 h-4 fill-yellow-500 text-yellow-500" />
                  ))}
                </div>
                <span className="text-muted-foreground">4.9 Average Rating</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                </span>
                <span className="text-muted-foreground">Live Updates</span>
              </div>
            </div>
          </div>
        </section>

        {/* Reviews Section */}
        <section className="py-12 md:py-16 px-4">
          <div className="container mx-auto max-w-7xl">
            <RealTimeReviews />
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-12 md:py-16 px-4 bg-gradient-dark">
          <div className="container mx-auto max-w-4xl text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Ready to Try Our Tools?
            </h2>
            <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
              Join thousands of satisfied users. Experience our free image tools and see why people love MultiToolsA.
            </p>
            <Link 
              to="/all-tools"
              className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors"
            >
              Explore All Tools
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default ReviewsPage;