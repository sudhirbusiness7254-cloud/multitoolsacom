import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Cookie, X, Settings2, Check } from "lucide-react";
import { Link } from "react-router-dom";

const CookieConsent = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookie-consent");
    if (!consent) {
      // Small delay for better UX
      const timer = setTimeout(() => setIsVisible(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const acceptAll = () => {
    localStorage.setItem("cookie-consent", JSON.stringify({
      essential: true,
      analytics: true,
      advertising: true,
      timestamp: new Date().toISOString()
    }));
    setIsVisible(false);
  };

  const acceptEssential = () => {
    localStorage.setItem("cookie-consent", JSON.stringify({
      essential: true,
      analytics: false,
      advertising: false,
      timestamp: new Date().toISOString()
    }));
    setIsVisible(false);
  };

  const acceptSelected = () => {
    const analytics = (document.getElementById("analytics-cookies") as HTMLInputElement)?.checked || false;
    const advertising = (document.getElementById("advertising-cookies") as HTMLInputElement)?.checked || false;
    
    localStorage.setItem("cookie-consent", JSON.stringify({
      essential: true,
      analytics,
      advertising,
      timestamp: new Date().toISOString()
    }));
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 md:p-6 animate-in slide-in-from-bottom-10">
      <div className="max-w-4xl mx-auto bg-card border border-border rounded-2xl shadow-2xl overflow-hidden">
        {/* Main Banner */}
        <div className="p-4 md:p-6">
          <div className="flex items-start gap-4">
            <div className="hidden sm:flex w-12 h-12 rounded-xl bg-primary/10 items-center justify-center flex-shrink-0">
              <Cookie className="w-6 h-6 text-primary" />
            </div>
            
            <div className="flex-1">
              <h3 className="font-bold text-lg mb-2">We Value Your Privacy</h3>
              <p className="text-sm text-muted-foreground mb-4">
                We use cookies to enhance your browsing experience, serve personalized ads through Google AdSense, 
                and analyze our traffic. By clicking "Accept All", you consent to our use of cookies. 
                You can customize your preferences or learn more in our{" "}
                <Link to="/privacy" className="text-primary hover:underline">Privacy Policy</Link>.
              </p>
              
              {/* Cookie Details (Expandable) */}
              {showDetails && (
                <div className="bg-secondary/50 rounded-xl p-4 mb-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="font-medium text-sm">Essential Cookies</span>
                      <p className="text-xs text-muted-foreground">Required for the website to function properly</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-green-500">Always Active</span>
                      <Check className="w-4 h-4 text-green-500" />
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="font-medium text-sm">Analytics Cookies</span>
                      <p className="text-xs text-muted-foreground">Help us understand how visitors interact with our website</p>
                    </div>
                    <input 
                      type="checkbox" 
                      id="analytics-cookies"
                      defaultChecked
                      className="w-4 h-4 accent-primary" 
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="font-medium text-sm">Advertising Cookies</span>
                      <p className="text-xs text-muted-foreground">Used to deliver relevant ads via Google AdSense</p>
                    </div>
                    <input 
                      type="checkbox" 
                      id="advertising-cookies"
                      defaultChecked
                      className="w-4 h-4 accent-primary" 
                    />
                  </div>
                </div>
              )}
              
              {/* Buttons */}
              <div className="flex flex-wrap gap-2">
                <Button 
                  onClick={acceptAll}
                  className="bg-primary hover:bg-primary/90"
                >
                  Accept All
                </Button>
                
                {showDetails ? (
                  <Button 
                    onClick={acceptSelected}
                    variant="secondary"
                  >
                    Save Preferences
                  </Button>
                ) : (
                  <Button 
                    onClick={() => setShowDetails(true)}
                    variant="secondary"
                    className="gap-2"
                  >
                    <Settings2 className="w-4 h-4" />
                    Customize
                  </Button>
                )}
                
                <Button 
                  onClick={acceptEssential}
                  variant="ghost"
                  className="text-muted-foreground"
                >
                  Essential Only
                </Button>
              </div>
            </div>
            
            <button 
              onClick={acceptEssential}
              className="p-1 text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Close cookie banner"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CookieConsent;
