import { Link, useLocation } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { Menu, X, ChevronDown, ChevronRight, Search } from "lucide-react";
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

const Header = () => {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [toolsDropdownOpen, setToolsDropdownOpen] = useState(false);
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);
  
  const isActive = (path: string) => location.pathname === path;
  const isToolsActive = () => location.pathname.includes("image") || location.pathname.includes("tag") || location.pathname.includes("to-") || location.pathname.includes("photo");
  
  const closeMobileMenu = () => { 
    setMobileMenuOpen(false); 
    setToolsDropdownOpen(false); 
    setExpandedCategory(null);
    setSearchQuery("");
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setToolsDropdownOpen(false);
        setExpandedCategory(null);
        setSearchQuery("");
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
  
  const imageCategories = toolCategories.filter(c => c.id !== "tag-tools");
  
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
      <nav className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 md:gap-3 hover:opacity-80 transition-opacity">
            <img src={logo} alt="MultiTools Logo" className="h-10 w-10 md:h-12 md:w-12" />
            <span className="text-xl md:text-2xl font-bold text-primary">MultiTools</span>
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            <div className="relative" ref={dropdownRef}>
              <button 
                onClick={() => setToolsDropdownOpen(!toolsDropdownOpen)} 
                className={`flex items-center gap-1 text-sm font-medium transition-colors hover:text-primary ${isToolsActive() ? "text-primary" : "text-foreground"}`}
              >
                Tools <ChevronDown className={`w-4 h-4 transition-transform ${toolsDropdownOpen ? 'rotate-180' : ''}`} />
              </button>
              
              {toolsDropdownOpen && (
                <div className="absolute top-full left-0 mt-2 w-[800px] bg-card border border-border rounded-xl shadow-2xl z-[100] overflow-hidden">
                  <div className="flex">
                    {/* Categories Column */}
                    <div className="w-1/3 bg-secondary/30 border-r border-border p-2">
                      {/* Search */}
                      <div className="p-2 mb-2">
                        <div className="relative">
                          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                          <Input
                            placeholder="Search tools..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="pl-9 h-9 text-sm bg-background"
                          />
                        </div>
                      </div>
                      
                      <ScrollArea className="h-[400px]">
                        <div className="space-y-1">
                          {filteredCategories.map((cat) => {
                            const gradient = getGradient(cat.id);
                            return (
                              <button
                                key={cat.id}
                                onClick={() => setExpandedCategory(expandedCategory === cat.id ? null : cat.id)}
                                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-left transition-colors ${
                                  expandedCategory === cat.id ? 'bg-secondary' : 'hover:bg-secondary/50'
                                }`}
                              >
                                <div className="flex items-center gap-3">
                                  <div 
                                    className="w-8 h-8 rounded-lg flex items-center justify-center"
                                    style={{ background: `linear-gradient(135deg, ${gradient.from}, ${gradient.to})` }}
                                  >
                                    <span className="text-white text-xs font-bold">{cat.tools.length}</span>
                                  </div>
                                  <span className="text-sm font-medium">{cat.name}</span>
                                </div>
                                <ChevronRight className={`w-4 h-4 text-muted-foreground transition-transform ${expandedCategory === cat.id ? 'rotate-90' : ''}`} />
                              </button>
                            );
                          })}
                          
                          {/* All Tools Link */}
                          <Link
                            to="/all-tools"
                            onClick={() => setToolsDropdownOpen(false)}
                            className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-secondary/50 text-primary"
                          >
                            <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center">
                              <span className="text-primary text-xs font-bold">80+</span>
                            </div>
                            <span className="text-sm font-medium">View All Tools</span>
                          </Link>
                        </div>
                      </ScrollArea>
                    </div>
                    
                    {/* Tools Column */}
                    <div className="w-2/3 p-4">
                      {expandedCategory ? (
                        <>
                          <div className="flex items-center justify-between mb-4">
                            <h3 className="font-semibold text-lg">
                              {imageCategories.find(c => c.id === expandedCategory)?.name}
                            </h3>
                            <Link
                              to={`/${expandedCategory}`}
                              onClick={() => setToolsDropdownOpen(false)}
                              className="text-sm text-primary hover:underline"
                            >
                              View Category →
                            </Link>
                          </div>
                          <ScrollArea className="h-[380px]">
                            <div className="grid grid-cols-2 gap-2">
                              {imageCategories
                                .find(c => c.id === expandedCategory)
                                ?.tools.map((tool) => {
                                  const gradient = getGradient(expandedCategory);
                                  return (
                                    <Link
                                      key={tool.id}
                                      to={`/${tool.slug}`}
                                      onClick={() => setToolsDropdownOpen(false)}
                                      className="group flex items-center gap-3 p-2.5 rounded-lg hover:bg-secondary transition-colors"
                                    >
                                      <div 
                                        className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                                        style={{ background: `linear-gradient(135deg, ${gradient.from}40, ${gradient.to}40)` }}
                                      >
                                        <div 
                                          className="w-2 h-2 rounded-full"
                                          style={{ background: `linear-gradient(135deg, ${gradient.from}, ${gradient.to})` }}
                                        />
                                      </div>
                                      <div>
                                        <span className="text-sm font-medium group-hover:text-primary transition-colors block">
                                          {tool.name}
                                        </span>
                                        <span className="text-xs text-muted-foreground line-clamp-1">
                                          {tool.description}
                                        </span>
                                      </div>
                                    </Link>
                                  );
                                })}
                            </div>
                          </ScrollArea>
                        </>
                      ) : searchQuery.trim() && filteredCategories.length > 0 ? (
                        <>
                          <h3 className="font-semibold text-lg mb-4">Search Results</h3>
                          <ScrollArea className="h-[380px]">
                            <div className="grid grid-cols-2 gap-2">
                              {filteredCategories.flatMap(cat => 
                                cat.tools.map(tool => {
                                  const gradient = getGradient(cat.id);
                                  return (
                                    <Link
                                      key={tool.id}
                                      to={`/${tool.slug}`}
                                      onClick={() => setToolsDropdownOpen(false)}
                                      className="group flex items-center gap-3 p-2.5 rounded-lg hover:bg-secondary transition-colors"
                                    >
                                      <div 
                                        className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                                        style={{ background: `linear-gradient(135deg, ${gradient.from}40, ${gradient.to}40)` }}
                                      >
                                        <div 
                                          className="w-2 h-2 rounded-full"
                                          style={{ background: `linear-gradient(135deg, ${gradient.from}, ${gradient.to})` }}
                                        />
                                      </div>
                                      <div>
                                        <span className="text-sm font-medium group-hover:text-primary transition-colors block">
                                          {tool.name}
                                        </span>
                                        <span className="text-xs text-muted-foreground">{cat.name}</span>
                                      </div>
                                    </Link>
                                  );
                                })
                              )}
                            </div>
                          </ScrollArea>
                        </>
                      ) : (
                        <div className="h-full flex flex-col items-center justify-center text-center p-8">
                          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center mb-4">
                            <span className="text-2xl">🛠️</span>
                          </div>
                          <h3 className="font-semibold mb-2">80+ Image Tools</h3>
                          <p className="text-sm text-muted-foreground mb-4">
                            Select a category to see available tools, or search for a specific tool.
                          </p>
                          <Link
                            to="/all-tools"
                            onClick={() => setToolsDropdownOpen(false)}
                            className="text-sm text-primary hover:underline"
                          >
                            Browse All Tools →
                          </Link>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
            
            <Link to="/tag-extractor" className={`text-sm font-medium transition-colors hover:text-primary ${isActive("/tag-extractor") ? "text-primary" : "text-foreground"}`}>
              Tag Generator
            </Link>
            <Link to="/about" className={`text-sm font-medium transition-colors hover:text-primary ${isActive("/about") ? "text-primary" : "text-foreground"}`}>About</Link>
            <Link to="/contact" className={`text-sm font-medium transition-colors hover:text-primary ${isActive("/contact") ? "text-primary" : "text-foreground"}`}>Contact</Link>
          </div>
          
          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden text-foreground hover:text-primary transition-colors" aria-label="Toggle menu">
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
        
        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-border">
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
                {(searchQuery.trim() ? filteredCategories : imageCategories).map((cat) => {
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
                              className="block px-3 py-2 text-sm text-primary"
                            >
                              +{cat.tools.length - 8} more...
                            </Link>
                          )}
                        </div>
                      )}
                    </div>
                  );
                })}
                
                {/* Tag Generator */}
                <Link
                  to="/tag-extractor"
                  onClick={closeMobileMenu}
                  className="flex items-center gap-3 px-3 py-3 rounded-lg hover:bg-secondary transition-colors"
                >
                  <div 
                    className="w-8 h-8 rounded-lg flex items-center justify-center"
                    style={{ background: `linear-gradient(135deg, #8B5CF6, #6366F1)` }}
                  >
                    <span className="text-white text-lg">#</span>
                  </div>
                  <span className="font-medium">Tag Generator</span>
                </Link>
                
                <div className="border-t border-border pt-2 mt-2 space-y-1">
                  <Link to="/all-tools" onClick={closeMobileMenu} className="block px-3 py-2 text-sm font-medium text-primary">
                    View All 80+ Tools
                  </Link>
                  <Link to="/about" onClick={closeMobileMenu} className="block px-3 py-2 text-sm hover:bg-secondary rounded-lg">About</Link>
                  <Link to="/contact" onClick={closeMobileMenu} className="block px-3 py-2 text-sm hover:bg-secondary rounded-lg">Contact</Link>
                </div>
              </div>
            </ScrollArea>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;