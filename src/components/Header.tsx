import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import logo from "@/assets/logo.png";

const Header = () => {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [toolsDropdownOpen, setToolsDropdownOpen] = useState(false);
  
  const isActive = (path: string) => location.pathname === path;
  const isToolsActive = () => location.pathname === "/" || location.pathname.includes("converter") || location.pathname.includes("to-");
  
  const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen);
  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
    setToolsDropdownOpen(false);
  };
  
  return (
    <header className="bg-teal-dark border-b border-teal-medium sticky top-0 z-50 backdrop-blur-sm bg-opacity-95">
      <nav className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 md:gap-3 hover:opacity-80 transition-opacity">
            <img src={logo} alt="Tag Generator Logo" className="h-10 w-10 md:h-12 md:w-12" />
            <span className="text-xl md:text-2xl font-bold text-cyan-bright">MultiTools</span>
          </Link>
          
          <div className="hidden md:flex items-center gap-6">
            {/* Tools Dropdown */}
            <div className="relative">
              <button
                onClick={() => setToolsDropdownOpen(!toolsDropdownOpen)}
                onBlur={() => setTimeout(() => setToolsDropdownOpen(false), 150)}
                className={`flex items-center gap-1 text-sm font-medium transition-colors hover:text-cyan-bright ${
                  isToolsActive() ? "text-cyan-bright" : "text-foreground"
                }`}
              >
                Tools
                <ChevronDown className={`w-4 h-4 transition-transform ${toolsDropdownOpen ? 'rotate-180' : ''}`} />
              </button>
              
              {toolsDropdownOpen && (
                <div className="absolute top-full left-0 mt-2 w-56 bg-teal-dark border border-teal-medium rounded-lg shadow-lg overflow-hidden z-50">
                  <Link
                    to="/"
                    onClick={() => setToolsDropdownOpen(false)}
                    className={`block px-4 py-3 text-sm transition-colors hover:bg-teal-medium ${
                      isActive("/") ? "text-cyan-bright bg-teal-medium/50" : "text-foreground"
                    }`}
                  >
                    🏷️ Tag Extractor
                    <span className="block text-xs text-muted-foreground mt-0.5">Generate tags for social media</span>
                  </Link>
                  <Link
                    to="/image-converter"
                    onClick={() => setToolsDropdownOpen(false)}
                    className={`block px-4 py-3 text-sm transition-colors hover:bg-teal-medium ${
                      location.pathname.includes("converter") || location.pathname.includes("to-") ? "text-cyan-bright bg-teal-medium/50" : "text-foreground"
                    }`}
                  >
                    🖼️ Image Converter
                    <span className="block text-xs text-muted-foreground mt-0.5">Convert JPG, PNG, WEBP, HEIC</span>
                  </Link>
                </div>
              )}
            </div>

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
            <div className="flex flex-col gap-2 pt-4">
              {/* Tools Section */}
              <div className="mb-2">
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider px-2 mb-2">Tools</p>
                <Link 
                  to="/" 
                  onClick={closeMobileMenu}
                  className={`block px-4 py-2 rounded-lg text-sm font-medium transition-colors hover:bg-teal-medium ${
                    isActive("/") ? "text-cyan-bright bg-teal-medium/50" : "text-foreground"
                  }`}
                >
                  🏷️ Tag Extractor
                </Link>
                <Link 
                  to="/image-converter" 
                  onClick={closeMobileMenu}
                  className={`block px-4 py-2 rounded-lg text-sm font-medium transition-colors hover:bg-teal-medium ${
                    location.pathname.includes("converter") ? "text-cyan-bright bg-teal-medium/50" : "text-foreground"
                  }`}
                >
                  🖼️ Image Converter
                </Link>
              </div>

              <div className="border-t border-teal-medium pt-2">
                <Link 
                  to="/about" 
                  onClick={closeMobileMenu}
                  className={`block px-4 py-2 rounded-lg text-sm font-medium transition-colors hover:bg-teal-medium ${
                    isActive("/about") ? "text-cyan-bright" : "text-foreground"
                  }`}
                >
                  About
                </Link>
                <Link 
                  to="/privacy" 
                  onClick={closeMobileMenu}
                  className={`block px-4 py-2 rounded-lg text-sm font-medium transition-colors hover:bg-teal-medium ${
                    isActive("/privacy") ? "text-cyan-bright" : "text-foreground"
                  }`}
                >
                  Privacy
                </Link>
                <Link 
                  to="/terms" 
                  onClick={closeMobileMenu}
                  className={`block px-4 py-2 rounded-lg text-sm font-medium transition-colors hover:bg-teal-medium ${
                    isActive("/terms") ? "text-cyan-bright" : "text-foreground"
                  }`}
                >
                  Terms
                </Link>
                <Link 
                  to="/contact" 
                  onClick={closeMobileMenu}
                  className={`block px-4 py-2 rounded-lg text-sm font-medium transition-colors hover:bg-teal-medium ${
                    isActive("/contact") ? "text-cyan-bright" : "text-foreground"
                  }`}
                >
                  Contact
                </Link>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;
