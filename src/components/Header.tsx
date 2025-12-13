import { Link, useLocation } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { Menu, X, ChevronDown, Search } from "lucide-react";
import logo from "@/assets/logo.png";
import { toolCategories } from "@/data/toolsData";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";

// Colorful gradients for categories
const categoryGradients: Record<string, { from: string; to: string }> = {
  "image-converter": { from: "#3B82F6", to: "#06B6D4" },
  "image-compression": { from: "#22C55E", to: "#10B981" },
  "image-to-document": { from: "#EC4899", to: "#F97316" },
  "image-resize": { from: "#00C6FF", to: "#0072FF" },
  "image-crop": { from: "#A855F7", to: "#EC4899" },
  "image-rotate-flip": { from: "#F97316", to: "#EAB308" },
  "image-format-utilities": { from: "#6366F1", to: "#8B5CF6" },
  "photo-filters": { from: "#F093FB", to: "#F5576C" },
  "watermark-tools": { from: "#14B8A6", to: "#059669" },
  "image-combine": { from: "#8B5CF6", to: "#7C3AED" },
  "image-metadata": { from: "#F59E0B", to: "#D97706" },
  "image-optimization": { from: "#EF4444", to: "#DC2626" },
  "image-drawing": { from: "#10B981", to: "#059669" },
  "image-security": { from: "#EF4444", to: "#B91C1C" },
  "image-qr": { from: "#3B82F6", to: "#1D4ED8" },
  "tag-tools": { from: "#8B5CF6", to: "#6366F1" },
};

// Top categories to show directly in nav bar
const topCategoryIds = [
  "image-converter",
  "image-compression", 
  "image-resize",
  "image-crop",
  "watermark-tools"
];

const Header = () => {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [allToolsOpen, setAllToolsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  
  const isActive = (path: string) => location.pathname === path;
  const isCategoryActive = (slug: string) => location.pathname.includes(slug);
  
  const closeMobileMenu = () => { 
    setMobileMenuOpen(false); 
    setAllToolsOpen(false);
    setSearchQuery("");
    setExpandedCategory(null);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setAllToolsOpen(false);
        setSearchQuery("");
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
  
  const imageCategories = toolCategories.filter(c => c.id !== "tag-tools");
  const topCategories = imageCategories.filter(c => topCategoryIds.includes(c.id));
  
  // Filter tools based on search
  const filteredCategories = searchQuery.trim() 
    ? imageCategories.map(cat => ({
        ...cat,
        tools: cat.tools.filter(tool => 
          tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          tool.description.toLowerCase().includes(searchQuery.toLowerCase())
        )
      })).filter(cat => cat.tools.length > 0)
    : imageCategories;

  const getGradient = (categoryId: string) => {
    return categoryGradients[categoryId] || { from: "#6366F1", to: "#8B5CF6" };
  };

  return (
    <header className="bg-card border-b border-border sticky top-0 z-50 backdrop-blur-sm bg-opacity-95">
      <nav className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <img src={logo} alt="MultiTools Logo" className="h-10 w-10" />
            <span className="text-xl font-bold text-primary hidden sm:block">MultiTools</span>
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            {/* Top Categories as Direct Links */}
            {topCategories.map((cat) => (
              <Link
                key={cat.id}
                to={`/${cat.slug}`}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors hover:bg-secondary ${
                  isCategoryActive(cat.slug) ? "text-primary bg-primary/10" : "text-foreground"
                }`}
              >
                {cat.name.replace(" Tools", "").replace(" Image", "")}
              </Link>
            ))}
            
            {/* All Tools Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button 
                onClick={() => setAllToolsOpen(!allToolsOpen)} 
                className={`flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-medium transition-colors hover:bg-secondary ${
                  allToolsOpen ? "text-primary bg-primary/10" : "text-foreground"
                }`}
              >
                ALL TOOLS <ChevronDown className={`w-4 h-4 transition-transform ${allToolsOpen ? 'rotate-180' : ''}`} />
              </button>
              
              {allToolsOpen && (
                <div className="absolute top-full right-0 mt-2 w-[900px] bg-card border border-border rounded-xl shadow-2xl z-[100] overflow-hidden">
                  {/* Search Bar */}
                  <div className="p-4 border-b border-border bg-secondary/30">
                    <div className="relative max-w-md mx-auto">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input
                        placeholder="Search all tools..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-9 bg-background"
                      />
                    </div>
                  </div>
                  
                  {/* Categories Grid with Tools */}
                  <ScrollArea className="h-[480px]">
                    <div className="p-4">
                      <div className="grid grid-cols-5 gap-6">
                        {filteredCategories.map((cat) => {
                          const gradient = getGradient(cat.id);
                          return (
                            <div key={cat.id} className="space-y-2">
                              {/* Category Header */}
                              <Link
                                to={`/${cat.slug}`}
                                onClick={() => setAllToolsOpen(false)}
                                className="flex items-center gap-2 text-xs font-bold uppercase tracking-wide text-muted-foreground hover:text-primary transition-colors pb-2 border-b border-border"
                              >
                                <div 
                                  className="w-4 h-4 rounded flex items-center justify-center"
                                  style={{ background: `linear-gradient(135deg, ${gradient.from}, ${gradient.to})` }}
                                />
                                {cat.name.replace(" Tools", "").replace(" Image", "")}
                              </Link>
                              
                              {/* Tools List */}
                              <div className="space-y-0.5">
                                {cat.tools.slice(0, 6).map((tool) => (
                                  <Link
                                    key={tool.id}
                                    to={`/${tool.slug}`}
                                    onClick={() => setAllToolsOpen(false)}
                                    className="flex items-center gap-2 py-1.5 text-sm hover:text-primary transition-colors group"
                                  >
                                    <div 
                                      className="w-5 h-5 rounded flex items-center justify-center flex-shrink-0"
                                      style={{ background: `linear-gradient(135deg, ${gradient.from}30, ${gradient.to}30)` }}
                                    >
                                      <div 
                                        className="w-1.5 h-1.5 rounded-full"
                                        style={{ background: `linear-gradient(135deg, ${gradient.from}, ${gradient.to})` }}
                                      />
                                    </div>
                                    <span className="line-clamp-1">{tool.name}</span>
                                  </Link>
                                ))}
                                {cat.tools.length > 6 && (
                                  <Link
                                    to={`/${cat.slug}`}
                                    onClick={() => setAllToolsOpen(false)}
                                    className="text-xs text-primary hover:underline pt-1 block"
                                  >
                                    +{cat.tools.length - 6} more
                                  </Link>
                                )}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </ScrollArea>
                  
                  {/* Footer */}
                  <div className="p-3 border-t border-border bg-secondary/30 text-center">
                    <Link
                      to="/all-tools"
                      onClick={() => setAllToolsOpen(false)}
                      className="text-sm font-medium text-primary hover:underline"
                    >
                      Browse All 80+ Tools →
                    </Link>
                  </div>
                </div>
              )}
            </div>

            <div className="w-px h-6 bg-border mx-2" />
            
            <Link 
              to="/tag-extractor" 
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors hover:bg-secondary ${
                isActive("/tag-extractor") ? "text-primary bg-primary/10" : "text-foreground"
              }`}
            >
              Tag Generator
            </Link>
            <Link 
              to="/about" 
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors hover:bg-secondary ${
                isActive("/about") ? "text-primary" : "text-foreground"
              }`}
            >
              About
            </Link>
            <Link 
              to="/contact" 
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors hover:bg-secondary ${
                isActive("/contact") ? "text-primary" : "text-foreground"
              }`}
            >
              Contact
            </Link>
          </div>
          
          {/* Mobile Menu Button */}
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)} 
            className="lg:hidden text-foreground hover:text-primary transition-colors" 
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
        
        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden mt-4 pb-4 border-t border-border">
            {/* Mobile Search */}
            <div className="p-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search tools..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9"
                />
              </div>
            </div>
            
            <ScrollArea className="max-h-[60vh]">
              <div className="flex flex-col gap-1 px-2">
                {/* Top Categories */}
                {topCategories.map((cat) => {
                  const gradient = getGradient(cat.id);
                  return (
                    <Link
                      key={cat.id}
                      to={`/${cat.slug}`}
                      onClick={closeMobileMenu}
                      className="flex items-center gap-3 px-3 py-3 rounded-lg hover:bg-secondary transition-colors"
                    >
                      <div 
                        className="w-8 h-8 rounded-lg flex items-center justify-center"
                        style={{ background: `linear-gradient(135deg, ${gradient.from}, ${gradient.to})` }}
                      >
                        <span className="text-white text-xs font-bold">{cat.tools.length}</span>
                      </div>
                      <span className="font-medium">{cat.name}</span>
                    </Link>
                  );
                })}
                
                <div className="border-t border-border my-2" />
                
                {/* All Categories Expandable */}
                {(searchQuery.trim() ? filteredCategories : imageCategories.filter(c => !topCategoryIds.includes(c.id))).map((cat) => {
                  const gradient = getGradient(cat.id);
                  const isExpanded = expandedCategory === cat.id;
                  
                  return (
                    <div key={cat.id}>
                      <button
                        onClick={() => setExpandedCategory(isExpanded ? null : cat.id)}
                        className="w-full flex items-center justify-between px-3 py-3 rounded-lg hover:bg-secondary transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          <div 
                            className="w-8 h-8 rounded-lg flex items-center justify-center"
                            style={{ background: `linear-gradient(135deg, ${gradient.from}, ${gradient.to})` }}
                          >
                            <span className="text-white text-xs font-bold">{cat.tools.length}</span>
                          </div>
                          <span className="font-medium">{cat.name}</span>
                        </div>
                        <ChevronDown className={`w-4 h-4 text-muted-foreground transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
                      </button>
                      
                      {isExpanded && (
                        <div className="ml-11 space-y-1 py-2">
                          <Link
                            to={`/${cat.slug}`}
                            onClick={closeMobileMenu}
                            className="block px-3 py-2 text-sm text-primary font-medium"
                          >
                            View All {cat.name} →
                          </Link>
                          {cat.tools.slice(0, 8).map((tool) => (
                            <Link
                              key={tool.id}
                              to={`/${tool.slug}`}
                              onClick={closeMobileMenu}
                              className="block px-3 py-2 text-sm text-muted-foreground hover:text-foreground"
                            >
                              {tool.name}
                            </Link>
                          ))}
                          {cat.tools.length > 8 && (
                            <Link
                              to={`/${cat.slug}`}
                              onClick={closeMobileMenu}
                              className="block px-3 py-2 text-xs text-primary"
                            >
                              +{cat.tools.length - 8} more tools
                            </Link>
                          )}
                        </div>
                      )}
                    </div>
                  );
                })}
                
                <div className="border-t border-border my-2" />
                
                {/* Other Links */}
                <Link
                  to="/all-tools"
                  onClick={closeMobileMenu}
                  className="flex items-center gap-3 px-3 py-3 rounded-lg hover:bg-secondary transition-colors text-primary"
                >
                  <span className="font-medium">View All Tools</span>
                </Link>
                <Link
                  to="/tag-extractor"
                  onClick={closeMobileMenu}
                  className="flex items-center gap-3 px-3 py-3 rounded-lg hover:bg-secondary transition-colors"
                >
                  <span className="font-medium">Tag Generator</span>
                </Link>
                <Link
                  to="/about"
                  onClick={closeMobileMenu}
                  className="flex items-center gap-3 px-3 py-3 rounded-lg hover:bg-secondary transition-colors"
                >
                  <span className="font-medium">About</span>
                </Link>
                <Link
                  to="/contact"
                  onClick={closeMobileMenu}
                  className="flex items-center gap-3 px-3 py-3 rounded-lg hover:bg-secondary transition-colors"
                >
                  <span className="font-medium">Contact</span>
                </Link>
              </div>
            </ScrollArea>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;
