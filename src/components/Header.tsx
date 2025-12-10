import { Link, useLocation } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { Menu, X, ChevronDown, Image, Hash } from "lucide-react";
import logo from "@/assets/logo.png";

const Header = () => {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [toolsDropdownOpen, setToolsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  
  const isActive = (path: string) => location.pathname === path;
  const isToolsActive = () => 
    location.pathname.includes("image") || 
    location.pathname.includes("tag") || 
    location.pathname.includes("to-");
  
  const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen);
  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
    setToolsDropdownOpen(false);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setToolsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
  
  return (
    <header className="bg-card border-b border-border sticky top-0 z-50 backdrop-blur-sm bg-opacity-95">
      <nav className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 md:gap-3 hover:opacity-80 transition-opacity">
            <img src={logo} alt="MultiTools Logo" className="h-10 w-10 md:h-12 md:w-12" />
            <span className="text-xl md:text-2xl font-bold text-primary">MultiTools</span>
          </Link>
          
          <div className="hidden md:flex items-center gap-6">
            {/* Tools Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setToolsDropdownOpen(!toolsDropdownOpen)}
                className={`flex items-center gap-1 text-sm font-medium transition-colors hover:text-primary ${
                  isToolsActive() ? "text-primary" : "text-foreground"
                }`}
              >
                Tools
                <ChevronDown className={`w-4 h-4 transition-transform ${toolsDropdownOpen ? 'rotate-180' : ''}`} />
              </button>
              
              {toolsDropdownOpen && (
                <div className="absolute top-full left-0 mt-2 w-64 bg-card border border-border rounded-xl shadow-xl z-[100] overflow-hidden">
                  <Link
                    to="/image-tools"
                    onClick={() => setToolsDropdownOpen(false)}
                    className={`flex items-start gap-3 px-4 py-4 transition-colors hover:bg-secondary ${
                      location.pathname.includes("image") || location.pathname.includes("to-") 
                        ? "bg-secondary" 
                        : ""
                    }`}
                  >
                    <div className="w-10 h-10 rounded-lg bg-gradient-orange flex items-center justify-center flex-shrink-0">
                      <Image className="w-5 h-5 text-primary-foreground" />
                    </div>
                    <div>
                      <span className="font-semibold text-foreground">Image Converter</span>
                      <span className="block text-xs text-muted-foreground mt-0.5">
                        JPG, PNG, WEBP, TIFF, RAW & more
                      </span>
                    </div>
                  </Link>
                  <Link
                    to="/tag-extractor"
                    onClick={() => setToolsDropdownOpen(false)}
                    className={`flex items-start gap-3 px-4 py-4 transition-colors hover:bg-secondary ${
                      location.pathname.includes("tag") ? "bg-secondary" : ""
                    }`}
                  >
                    <div className="w-10 h-10 rounded-lg bg-gradient-orange flex items-center justify-center flex-shrink-0">
                      <Hash className="w-5 h-5 text-primary-foreground" />
                    </div>
                    <div>
                      <span className="font-semibold text-foreground">Tag Extractor</span>
                      <span className="block text-xs text-muted-foreground mt-0.5">
                        YouTube, Instagram, TikTok & more
                      </span>
                    </div>
                  </Link>
                </div>
              )}
            </div>

            <Link 
              to="/about" 
              className={`text-sm font-medium transition-colors hover:text-primary ${
                isActive("/about") ? "text-primary" : "text-foreground"
              }`}
            >
              About
            </Link>
            <Link 
              to="/contact" 
              className={`text-sm font-medium transition-colors hover:text-primary ${
                isActive("/contact") ? "text-primary" : "text-foreground"
              }`}
            >
              Contact
            </Link>
          </div>
          
          {/* Mobile menu button */}
          <button 
            onClick={toggleMobileMenu}
            className="md:hidden text-foreground hover:text-primary transition-colors"
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
          <div className="md:hidden mt-4 pb-4 border-t border-border">
            <div className="flex flex-col gap-2 pt-4">
              {/* Tools Section */}
              <div className="mb-2">
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider px-2 mb-2">Tools</p>
                <Link 
                  to="/image-tools" 
                  onClick={closeMobileMenu}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors hover:bg-secondary ${
                    location.pathname.includes("image") ? "bg-secondary text-primary" : "text-foreground"
                  }`}
                >
                  <div className="w-8 h-8 rounded-lg bg-gradient-orange flex items-center justify-center">
                    <Image className="w-4 h-4 text-primary-foreground" />
                  </div>
                  Image Converter
                </Link>
                <Link 
                  to="/tag-extractor" 
                  onClick={closeMobileMenu}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors hover:bg-secondary ${
                    location.pathname.includes("tag") ? "bg-secondary text-primary" : "text-foreground"
                  }`}
                >
                  <div className="w-8 h-8 rounded-lg bg-gradient-orange flex items-center justify-center">
                    <Hash className="w-4 h-4 text-primary-foreground" />
                  </div>
                  Tag Extractor
                </Link>
              </div>

              <div className="border-t border-border pt-2">
                <Link 
                  to="/about" 
                  onClick={closeMobileMenu}
                  className={`block px-4 py-2 rounded-lg text-sm font-medium transition-colors hover:bg-secondary ${
                    isActive("/about") ? "text-primary" : "text-foreground"
                  }`}
                >
                  About
                </Link>
                <Link 
                  to="/contact" 
                  onClick={closeMobileMenu}
                  className={`block px-4 py-2 rounded-lg text-sm font-medium transition-colors hover:bg-secondary ${
                    isActive("/contact") ? "text-primary" : "text-foreground"
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
