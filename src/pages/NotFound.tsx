import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { AdBottom, AdVideo, AdInline, AdExoticFat } from "@/components/ads/AdContainer";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      
      <main className="flex-1 flex flex-col items-center justify-center px-4 py-16">
        <div className="text-center mb-8">
          <h1 className="mb-4 text-6xl md:text-8xl font-bold text-primary">404</h1>
          <p className="mb-4 text-xl md:text-2xl text-muted-foreground">Oops! Page not found</p>
          <p className="text-muted-foreground mb-8 max-w-md mx-auto">
            The page you're looking for doesn't exist or has been moved.
          </p>
          <a 
            href="/" 
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors"
          >
            Return to Home
          </a>
        </div>
        
        {/* Ads Section */}
        <div className="w-full max-w-4xl mx-auto space-y-4 mt-8">
          <AdExoticFat />
          <AdVideo />
          <AdInline />
          <AdBottom />
          <AdExoticFat />
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default NotFound;
