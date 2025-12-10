import { Link } from "react-router-dom";
import { Image, Hash } from "lucide-react";

const Footer = () => {
  const imageConversions = [
    { label: "JPG to PNG", route: "/jpg-to-png" },
    { label: "PNG to JPG", route: "/png-to-jpg" },
    { label: "JPG to WEBP", route: "/jpg-to-webp" },
    { label: "WEBP to JPG", route: "/webp-to-jpg" },
    { label: "PNG to WEBP", route: "/png-to-webp" },
    { label: "TIFF to JPG", route: "/tiff-to-jpg" },
    { label: "RAW to JPG", route: "/raw-to-jpg" },
    { label: "SVG to PNG", route: "/svg-to-png" },
  ];

  return (
    <footer className="bg-card border-t border-border mt-16">
      <div className="container mx-auto px-4 py-10 md:py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <h3 className="text-xl font-bold text-primary mb-4">MultiTools</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Free online tools for image conversion and social media tag generation. Fast, secure, and easy to use.
            </p>
          </div>
          
          {/* Image Tools */}
          <div>
            <h4 className="font-semibold text-foreground mb-4 flex items-center gap-2">
              <Image className="w-4 h-4 text-primary" />
              Image Converter
            </h4>
            <div className="grid grid-cols-2 gap-2">
              {imageConversions.map((item) => (
                <Link 
                  key={item.route}
                  to={item.route} 
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  {item.label}
                </Link>
              ))}
            </div>
            <Link 
              to="/image-tools" 
              className="inline-block text-sm text-primary hover:underline mt-3"
            >
              View All →
            </Link>
          </div>

          {/* Tag Tools */}
          <div>
            <h4 className="font-semibold text-foreground mb-4 flex items-center gap-2">
              <Hash className="w-4 h-4 text-primary" />
              Tag Generator
            </h4>
            <div className="flex flex-col gap-2">
              <Link 
                to="/tag-extractor" 
                className="text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                YouTube Tags
              </Link>
              <Link 
                to="/tag-extractor" 
                className="text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                Instagram Hashtags
              </Link>
              <Link 
                to="/tag-extractor" 
                className="text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                TikTok Tags
              </Link>
              <Link 
                to="/tag-extractor" 
                className="text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                Twitter Hashtags
              </Link>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Quick Links</h4>
            <div className="flex flex-col gap-2">
              <Link to="/" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                Home
              </Link>
              <Link to="/about" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                About
              </Link>
              <Link to="/privacy" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                Privacy Policy
              </Link>
              <Link to="/terms" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                Terms & Conditions
              </Link>
              <Link to="/contact" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                Contact Us
              </Link>
            </div>
          </div>
        </div>
        
        <div className="border-t border-border mt-10 pt-6 text-center">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} MultiTools. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
