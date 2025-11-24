import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-teal-dark border-t border-teal-medium mt-16">
      <div className="container mx-auto px-4 py-6 md:py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
          <div>
            <h3 className="text-lg font-semibold text-cyan-bright mb-3">Tag Generator</h3>
            <p className="text-sm text-muted-foreground">
              Free YouTube tag and hashtag generator tool to help optimize your video content and reach more viewers.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold text-cyan-bright mb-3">Quick Links</h3>
            <div className="flex flex-col gap-2">
              <Link to="/" className="text-sm text-muted-foreground hover:text-cyan-bright transition-colors">
                Home
              </Link>
              <Link to="/about" className="text-sm text-muted-foreground hover:text-cyan-bright transition-colors">
                About
              </Link>
              <Link to="/privacy" className="text-sm text-muted-foreground hover:text-cyan-bright transition-colors">
                Privacy Policy
              </Link>
              <Link to="/terms" className="text-sm text-muted-foreground hover:text-cyan-bright transition-colors">
                Terms & Conditions
              </Link>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold text-cyan-bright mb-3">Contact Us</h3>
            <div className="flex flex-col gap-2 text-sm text-muted-foreground">
              <a href="mailto:info@multitoolsa.com" className="hover:text-cyan-bright transition-colors">
                info@multitoolsa.com
              </a>
              <a href="tel:+9779763567489" className="hover:text-cyan-bright transition-colors">
                +977 9763567489
              </a>
            </div>
          </div>
        </div>
        
        <div className="border-t border-teal-medium mt-8 pt-6 text-center">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Tag Generator. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
