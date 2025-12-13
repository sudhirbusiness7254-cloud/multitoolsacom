import { Link, useLocation } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { Menu, X, ChevronDown, Image, Hash, Minimize2, Crop, RotateCw, Sparkles, Type, Layers, Info, Zap, PenTool, Shield, QrCode, FileText, Settings } from "lucide-react";
import logo from "@/assets/logo.png";
import { toolCategories } from "@/data/toolsData";

const categoryIcons: Record<string, React.ReactNode> = {
  "image-converter": <Image className="w-4 h-4" />,
  "image-compression": <Minimize2 className="w-4 h-4" />,
  "image-to-document": <FileText className="w-4 h-4" />,
  "image-resize": <Image className="w-4 h-4" />,
  "image-crop": <Crop className="w-4 h-4" />,
  "image-rotate-flip": <RotateCw className="w-4 h-4" />,
  "image-format-utilities": <Settings className="w-4 h-4" />,
  "photo-filters": <Sparkles className="w-4 h-4" />,
  "watermark-tools": <Type className="w-4 h-4" />,
  "image-combine": <Layers className="w-4 h-4" />,
  "image-metadata": <Info className="w-4 h-4" />,
  "image-optimization": <Zap className="w-4 h-4" />,
  "image-drawing": <PenTool className="w-4 h-4" />,
  "image-security": <Shield className="w-4 h-4" />,
  "image-qr": <QrCode className="w-4 h-4" />,
  "tag-tools": <Hash className="w-4 h-4" />,
};

const Header = () => {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [toolsDropdownOpen, setToolsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  
  const isActive = (path: string) => location.pathname === path;
  const isToolsActive = () => location.pathname.includes("image") || location.pathname.includes("tag") || location.pathname.includes("to-") || location.pathname.includes("photo");
  
  const closeMobileMenu = () => { setMobileMenuOpen(false); setToolsDropdownOpen(false); };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) setToolsDropdownOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
  
  const imageCategories = toolCategories.filter(c => c.id !== "tag-tools");
  
  return (
    <header className="bg-card border-b border-border sticky top-0 z-50 backdrop-blur-sm bg-opacity-95">
      <nav className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 md:gap-3 hover:opacity-80 transition-opacity">
            <img src={logo} alt="MultiTools Logo" className="h-10 w-10 md:h-12 md:w-12" />
            <span className="text-xl md:text-2xl font-bold text-primary">MultiTools</span>
          </Link>
          
          <div className="hidden md:flex items-center gap-6">
            <div className="relative" ref={dropdownRef}>
              <button onClick={() => setToolsDropdownOpen(!toolsDropdownOpen)} className={`flex items-center gap-1 text-sm font-medium transition-colors hover:text-primary ${isToolsActive() ? "text-primary" : "text-foreground"}`}>
                Tools <ChevronDown className={`w-4 h-4 transition-transform ${toolsDropdownOpen ? 'rotate-180' : ''}`} />
              </button>
              
              {toolsDropdownOpen && (
                <div className="absolute top-full left-0 mt-2 w-[600px] bg-card border border-border rounded-xl shadow-xl z-[100] overflow-hidden p-4 max-h-[70vh] overflow-y-auto">
                  <div className="grid grid-cols-2 gap-2">
                    {imageCategories.map((cat) => (
                      <Link key={cat.id} to={`/${cat.slug}`} onClick={() => setToolsDropdownOpen(false)} className="flex items-center gap-3 px-3 py-2 rounded-lg transition-colors hover:bg-secondary">
                        <div className="w-8 h-8 rounded-lg bg-gradient-orange flex items-center justify-center flex-shrink-0 text-primary-foreground">
                          {categoryIcons[cat.id] || <Image className="w-4 h-4" />}
                        </div>
                        <div>
                          <span className="font-medium text-sm text-foreground">{cat.name}</span>
                          <span className="block text-xs text-muted-foreground">{cat.tools.length} tools</span>
                        </div>
                      </Link>
                    ))}
                    <Link to="/tag-extractor" onClick={() => setToolsDropdownOpen(false)} className="flex items-center gap-3 px-3 py-2 rounded-lg transition-colors hover:bg-secondary">
                      <div className="w-8 h-8 rounded-lg bg-gradient-orange flex items-center justify-center flex-shrink-0 text-primary-foreground">
                        <Hash className="w-4 h-4" />
                      </div>
                      <div>
                        <span className="font-medium text-sm text-foreground">Tag Extractor</span>
                        <span className="block text-xs text-muted-foreground">Social media tags</span>
                      </div>
                    </Link>
                  </div>
                </div>
              )}
            </div>
            <Link to="/about" className={`text-sm font-medium transition-colors hover:text-primary ${isActive("/about") ? "text-primary" : "text-foreground"}`}>About</Link>
            <Link to="/contact" className={`text-sm font-medium transition-colors hover:text-primary ${isActive("/contact") ? "text-primary" : "text-foreground"}`}>Contact</Link>
          </div>
          
          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden text-foreground hover:text-primary transition-colors" aria-label="Toggle menu">
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
        
        {mobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-border max-h-[70vh] overflow-y-auto">
            <div className="flex flex-col gap-1 pt-4">
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider px-2 mb-2">Image Tools</p>
              {imageCategories.map((cat) => (
                <Link key={cat.id} to={`/${cat.slug}`} onClick={closeMobileMenu} className="flex items-center gap-3 px-4 py-2 rounded-lg text-sm transition-colors hover:bg-secondary">
                  <div className="w-7 h-7 rounded-lg bg-gradient-orange flex items-center justify-center text-primary-foreground">{categoryIcons[cat.id]}</div>
                  {cat.name}
                </Link>
              ))}
              <Link to="/tag-extractor" onClick={closeMobileMenu} className="flex items-center gap-3 px-4 py-2 rounded-lg text-sm transition-colors hover:bg-secondary">
                <div className="w-7 h-7 rounded-lg bg-gradient-orange flex items-center justify-center text-primary-foreground"><Hash className="w-4 h-4" /></div>
                Tag Extractor
              </Link>
              <div className="border-t border-border pt-2 mt-2">
                <Link to="/about" onClick={closeMobileMenu} className="block px-4 py-2 rounded-lg text-sm hover:bg-secondary">About</Link>
                <Link to="/contact" onClick={closeMobileMenu} className="block px-4 py-2 rounded-lg text-sm hover:bg-secondary">Contact</Link>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;
