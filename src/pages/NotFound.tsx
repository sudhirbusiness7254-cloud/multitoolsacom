import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Home, Search, ArrowRight } from "lucide-react";
import InContentAd from "@/components/ads/InContentAd";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      
      <main className="flex-1 flex flex-col items-center justify-center px-4 py-16">
        <div className="text-center max-w-2xl mx-auto">
          <h1 className="text-8xl font-bold text-primary mb-4">404</h1>
          <h2 className="text-2xl font-bold mb-4">Page Not Found</h2>
          <p className="text-muted-foreground mb-8">
            Sorry, the page you're looking for doesn't exist or has been moved.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link 
              to="/"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-all"
            >
              <Home className="w-5 h-5" />
              Go Home
            </Link>
            <Link 
              to="/all-tools"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-secondary text-foreground font-semibold hover:bg-secondary/80 transition-all"
            >
              <Search className="w-5 h-5" />
              Browse Tools
            </Link>
          </div>

          {/* Ad placement on 404 page */}
          <InContentAd />

          {/* Popular tools suggestions */}
          <div className="mt-12">
            <h3 className="text-lg font-semibold mb-4">Popular Tools</h3>
            <div className="flex flex-wrap justify-center gap-3">
              <Link to="/jpg-to-png" className="px-4 py-2 bg-card border border-border rounded-lg hover:border-primary/50 transition-colors text-sm">
                JPG to PNG
              </Link>
              <Link to="/image-compressor" className="px-4 py-2 bg-card border border-border rounded-lg hover:border-primary/50 transition-colors text-sm">
                Image Compressor
              </Link>
              <Link to="/image-resize" className="px-4 py-2 bg-card border border-border rounded-lg hover:border-primary/50 transition-colors text-sm">
                Image Resize
              </Link>
              <Link to="/merge-pdf" className="px-4 py-2 bg-card border border-border rounded-lg hover:border-primary/50 transition-colors text-sm">
                Merge PDF
              </Link>
              <Link to="/crop-image" className="px-4 py-2 bg-card border border-border rounded-lg hover:border-primary/50 transition-colors text-sm">
                Crop Image
              </Link>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default NotFound;