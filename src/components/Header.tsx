import { Link, useLocation } from "react-router-dom";
import logo from "@/assets/logo.png";

const Header = () => {
  const location = useLocation();
  
  const isActive = (path: string) => location.pathname === path;
  
  return (
    <header className="bg-teal-dark border-b border-teal-medium sticky top-0 z-50 backdrop-blur-sm bg-opacity-95">
      <nav className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
            <img src={logo} alt="Tag Generator Logo" className="h-12 w-12" />
            <span className="text-2xl font-bold text-cyan-bright">MultiToolsA</span>
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
          <button className="md:hidden text-foreground">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
        
        {/* Mobile menu - you can expand this later */}
      </nav>
    </header>
  );
};

export default Header;
