import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import logo from "@/assets/logo.png";

const Header = () => {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const isActive = (path: string) => location.pathname === path;
  
  const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen);
  const closeMobileMenu = () => setMobileMenuOpen(false);
  
  return (
    <header className="bg-teal-dark border-b border-teal-medium sticky top-0 z-50 backdrop-blur-sm bg-opacity-95">
      <nav className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 md:gap-3 hover:opacity-80 transition-opacity">
            <img src={logo} alt="Tag Generator Logo" className="h-10 w-10 md:h-12 md:w-12" />
            <span className="text-xl md:text-2xl font-bold text-cyan-bright">MultiToolsA</span>
          </Link>
          
          <div className="hidden md:flex items-center gap-6">
            <Link 
              to="/" 
              className={`text-sm font-medium transition-colors hover:text-cyan-bright ${
                isActive("/") ? "text-cyan-bright" : "text-foreground"
              }`}
            >
              Home
            </Link>
            <Link 
              to="/about" 
              className={`text-sm font-medium transition-colors hover:text-cyan-bright ${
                isActive("/about") ? "text-cyan-bright" : "text-foreground"
              }`}
            >
              About
            </Link>
            <Link 
              to="/privacy" 
              className={`text-sm font-medium transition-colors hover:text-cyan-bright ${
                isActive("/privacy") ? "text-cyan-bright" : "text-foreground"
              }`}
            >
              Privacy
            </Link>
            <Link 
              to="/terms" 
              className={`text-sm font-medium transition-colors hover:text-cyan-bright ${
                isActive("/terms") ? "text-cyan-bright" : "text-foreground"
              }`}
            >
              Terms
            </Link>
            <Link 
              to="/contact" 
              className={`text-sm font-medium transition-colors hover:text-cyan-bright ${
                isActive("/contact") ? "text-cyan-bright" : "text-foreground"
              }`}
            >
              Contact
            </Link>
          </div>
          
          {/* Mobile menu button */}
          <button 
            onClick={toggleMobileMenu}
            className="md:hidden text-foreground hover:text-cyan-bright transition-colors"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
        
        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-teal-medium">
            <div className="flex flex-col gap-4 pt-4">
              <Link 
                to="/" 
                onClick={closeMobileMenu}
                className={`text-sm font-medium transition-colors hover:text-cyan-bright ${
                  isActive("/") ? "text-cyan-bright" : "text-foreground"
                }`}
              >
                Home
              </Link>
              <Link 
                to="/about" 
                onClick={closeMobileMenu}
                className={`text-sm font-medium transition-colors hover:text-cyan-bright ${
                  isActive("/about") ? "text-cyan-bright" : "text-foreground"
                }`}
              >
                About
              </Link>
              <Link 
                to="/privacy" 
                onClick={closeMobileMenu}
                className={`text-sm font-medium transition-colors hover:text-cyan-bright ${
                  isActive("/privacy") ? "text-cyan-bright" : "text-foreground"
                }`}
              >
                Privacy
              </Link>
              <Link 
                to="/terms" 
                onClick={closeMobileMenu}
                className={`text-sm font-medium transition-colors hover:text-cyan-bright ${
                  isActive("/terms") ? "text-cyan-bright" : "text-foreground"
                }`}
              >
                Terms
              </Link>
              <Link 
                to="/contact" 
                onClick={closeMobileMenu}
                className={`text-sm font-medium transition-colors hover:text-cyan-bright ${
                  isActive("/contact") ? "text-cyan-bright" : "text-foreground"
                }`}
              >
                Contact
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;
