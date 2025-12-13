import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { toolCategories } from "@/data/toolsData";
import { ArrowRight, Search, Sparkles, ChevronRight } from "lucide-react";
import { useState, useMemo } from "react";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";

// Colorful gradient pairs for categories
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

// Tool-specific colorful gradients
const toolGradients = [
  { from: "#FF6B6B", to: "#FF8E53" },
  { from: "#4ECDC4", to: "#45B7AA" },
  { from: "#667eea", to: "#764ba2" },
  { from: "#f093fb", to: "#f5576c" },
  { from: "#11998e", to: "#38ef7d" },
  { from: "#00c6ff", to: "#0072ff" },
  { from: "#f857a6", to: "#ff5858" },
  { from: "#6366f1", to: "#8b5cf6" },
  { from: "#ec4899", to: "#f97316" },
  { from: "#3b82f6", to: "#1d4ed8" },
  { from: "#14b8a6", to: "#059669" },
  { from: "#f59e0b", to: "#d97706" },
  { from: "#8b5cf6", to: "#7c3aed" },
  { from: "#ef4444", to: "#dc2626" },
  { from: "#22c55e", to: "#16a34a" },
  { from: "#06b6d4", to: "#0891b2" },
  { from: "#a855f7", to: "#9333ea" },
  { from: "#84cc16", to: "#65a30d" },
];

const getToolGradient = (index: number) => toolGradients[index % toolGradients.length];

const AllToolsPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>("image-converter");
  
  const imageCategories = toolCategories.filter(c => c.id !== "tag-tools");
  
  const selectedCategory = useMemo(() => {
    return imageCategories.find(c => c.id === selectedCategoryId) || imageCategories[0];
  }, [selectedCategoryId, imageCategories]);

  const filteredTools = useMemo(() => {
    if (!searchQuery.trim()) return selectedCategory?.tools || [];
    const query = searchQuery.toLowerCase();
    return (selectedCategory?.tools || []).filter(tool => 
      tool.name.toLowerCase().includes(query) ||
      tool.description.toLowerCase().includes(query) ||
      tool.keywords.some(k => k.toLowerCase().includes(query))
    );
  }, [selectedCategory, searchQuery]);

  const getCategoryGradient = (categoryId: string) => {
    return categoryGradients[categoryId] || { from: "#6366F1", to: "#8B5CF6" };
  };

  return (
    <>
      <Helmet>
        <title>All Image Tools - 80+ Free Online Image Tools | MultiTools</title>
        <meta name="description" content="Browse our complete collection of 80+ free online image tools. Convert, compress, resize, crop, edit, and enhance images. No signup required." />
        <link rel="canonical" href="https://multitools.com/all-tools" />
      </Helmet>

      <div className="min-h-screen bg-background flex flex-col">
        <Header />
        
        <main className="flex-1">
          {/* Hero */}
          <section className="py-8 md:py-12 bg-gradient-hero">
            <div className="container mx-auto px-4 text-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/30 mb-4">
                <Sparkles className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium text-primary">80+ Free Tools</span>
              </div>
              <h1 className="text-3xl md:text-4xl font-bold mb-3">All Image Tools</h1>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Browse our complete collection of free online image tools
              </p>
            </div>
          </section>

          {/* Split Layout Section */}
          <section className="py-8 px-4">
            <div className="container mx-auto max-w-7xl">
              <div className="flex flex-col lg:flex-row gap-6">
                {/* Left Sidebar - Categories */}
                <div className="lg:w-1/4 w-full">
                  <div className="bg-card rounded-2xl border border-border p-4 sticky top-24">
                    <h2 className="font-semibold text-lg mb-4 px-2">Categories</h2>
                    <ScrollArea className="h-[calc(100vh-280px)] lg:h-[500px]">
                      <div className="space-y-1 pr-2">
                        {imageCategories.map((category) => {
                          const gradient = getCategoryGradient(category.id);
                          const isActive = selectedCategoryId === category.id;
                          
                          return (
                            <button
                              key={category.id}
                              onClick={() => {
                                setSelectedCategoryId(category.id);
                                setSearchQuery("");
                              }}
                              className={`w-full flex items-center justify-between px-3 py-3 rounded-xl text-left transition-all duration-300 group ${
                                isActive 
                                  ? 'bg-primary/10 border border-primary/30 shadow-sm' 
                                  : 'hover:bg-secondary/50 border border-transparent'
                              }`}
                            >
                              <div className="flex items-center gap-3">
                                <div 
                                  className={`w-10 h-10 rounded-xl flex items-center justify-center transition-transform duration-300 ${
                                    isActive ? 'scale-110' : 'group-hover:scale-105'
                                  }`}
                                  style={{ 
                                    background: `linear-gradient(135deg, ${gradient.from}, ${gradient.to})`,
                                    boxShadow: isActive ? `0 4px 15px ${gradient.from}40` : 'none'
                                  }}
                                >
                                  <span className="text-white text-sm font-bold">{category.tools.length}</span>
                                </div>
                                <span className={`text-sm font-medium transition-colors ${
                                  isActive ? 'text-primary' : 'text-foreground group-hover:text-primary'
                                }`}>
                                  {category.name}
                                </span>
                              </div>
                              <ChevronRight className={`w-4 h-4 transition-all duration-300 ${
                                isActive 
                                  ? 'text-primary translate-x-1' 
                                  : 'text-muted-foreground group-hover:translate-x-1'
                              }`} />
                            </button>
                          );
                        })}
                      </div>
                    </ScrollArea>
                  </div>
                </div>

                {/* Right Content - Tools */}
                <div className="lg:w-3/4 w-full">
                  <div className="bg-card rounded-2xl border border-border p-6">
                    {/* Category Header */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                      <div className="flex items-center gap-3">
                        <div 
                          className="w-12 h-12 rounded-xl flex items-center justify-center"
                          style={{ 
                            background: `linear-gradient(135deg, ${getCategoryGradient(selectedCategoryId).from}, ${getCategoryGradient(selectedCategoryId).to})`,
                            boxShadow: `0 4px 20px ${getCategoryGradient(selectedCategoryId).from}40`
                          }}
                        >
                          <Sparkles className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <h2 className="text-xl font-bold">{selectedCategory?.name}</h2>
                          <p className="text-sm text-muted-foreground">{selectedCategory?.tools.length} tools available</p>
                        </div>
                      </div>
                      
                      {/* Search */}
                      <div className="relative w-full sm:w-64">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <Input
                          type="search"
                          placeholder="Search tools..."
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          className="pl-10"
                        />
                      </div>
                    </div>

                    {/* Tools Grid with Animation */}
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                      {filteredTools.map((tool, index) => {
                        const gradient = getToolGradient(index);
                        return (
                          <Link
                            key={tool.id}
                            to={`/${tool.slug}`}
                            className="group relative bg-secondary/30 rounded-xl p-4 border border-border hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 animate-fade-in"
                            style={{ animationDelay: `${index * 30}ms` }}
                          >
                            <div className="flex items-start gap-3">
                              <div 
                                className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 transition-transform duration-300 group-hover:scale-110"
                                style={{ 
                                  background: `linear-gradient(135deg, ${gradient.from}, ${gradient.to})`,
                                  boxShadow: `0 4px 15px ${gradient.from}30`
                                }}
                              >
                                <Sparkles className="w-5 h-5 text-white" />
                              </div>
                              
                              <div className="flex-1 min-w-0">
                                <h3 className="font-semibold text-sm mb-1 group-hover:text-primary transition-colors">
                                  {tool.name}
                                </h3>
                                <p className="text-xs text-muted-foreground line-clamp-2">
                                  {tool.description}
                                </p>
                              </div>
                            </div>
                            
                            <ArrowRight className="absolute top-4 right-4 w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300" />
                          </Link>
                        );
                      })}
                    </div>

                    {/* Empty State */}
                    {filteredTools.length === 0 && (
                      <div className="text-center py-12 animate-fade-in">
                        <div className="w-16 h-16 rounded-2xl bg-secondary/50 flex items-center justify-center mx-auto mb-4">
                          <Search className="w-8 h-8 text-muted-foreground" />
                        </div>
                        <p className="text-muted-foreground">No tools found matching "{searchQuery}"</p>
                        <button 
                          onClick={() => setSearchQuery("")}
                          className="mt-4 text-sm text-primary hover:underline"
                        >
                          Clear search
                        </button>
                      </div>
                    )}

                    {/* View Category Page Link */}
                    <div className="mt-6 pt-6 border-t border-border">
                      <Link
                        to={`/${selectedCategory?.slug}`}
                        className="inline-flex items-center gap-2 text-primary hover:underline font-medium"
                      >
                        View {selectedCategory?.name} page with details
                        <ArrowRight className="w-4 h-4" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default AllToolsPage;