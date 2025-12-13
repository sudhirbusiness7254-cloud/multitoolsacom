import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { useState, useMemo } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ArrowRight, Zap, Shield, Globe, Sparkles, Hash, ChevronRight, Search } from "lucide-react";
import { toolCategories } from "@/data/toolsData";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";

// Colorful gradients for categories and tools
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

const getGradient = (categoryId: string) => {
  return categoryGradients[categoryId] || { from: "#6366F1", to: "#8B5CF6" };
};

const HomePage = () => {
  const imageCategories = toolCategories.filter(cat => cat.id !== "tag-tools").sort((a, b) => a.priority - b.priority);
  const totalTools = imageCategories.reduce((sum, cat) => sum + cat.tools.length, 0);
  
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>("image-converter");
  const [searchQuery, setSearchQuery] = useState("");

  const selectedCategory = useMemo(() => {
    return imageCategories.find(c => c.id === selectedCategoryId) || imageCategories[0];
  }, [selectedCategoryId, imageCategories]);

  const filteredTools = useMemo(() => {
    if (!searchQuery.trim()) return selectedCategory?.tools || [];
    const query = searchQuery.toLowerCase();
    return (selectedCategory?.tools || []).filter(tool => 
      tool.name.toLowerCase().includes(query) ||
      tool.description.toLowerCase().includes(query)
    );
  }, [selectedCategory, searchQuery]);

  return (
    <>
      <Helmet>
        <title>MultiTools - Free Image Tools & Tag Generator | Online Converter, Compressor, Editor</title>
        <meta name="description" content="Free online image tools: Convert, compress, resize, crop, rotate, add watermarks, filters & more. Generate hashtags for YouTube, Instagram, TikTok. Fast, secure, no signup." />
        <meta name="keywords" content="image converter, image compressor, photo editor, tag generator, jpg to png, hashtag generator, free online tools, image resize, image crop" />
        <link rel="canonical" href="https://multitools.com/" />
        
        <meta property="og:title" content="MultiTools - Free Image Tools & Tag Generator" />
        <meta property="og:description" content="Convert, compress, edit images and generate hashtags. 100% free, no signup required." />
        <meta property="og:type" content="website" />
        
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            "name": "MultiTools",
            "description": "Free online image tools and tag generator",
            "url": "https://multitools.com",
            "applicationCategory": "UtilitiesApplication",
            "operatingSystem": "Web Browser",
            "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" }
          })}
        </script>
      </Helmet>

      <div className="min-h-screen bg-background flex flex-col">
        <Header />
        
        <main className="flex-1">
          {/* Hero Section */}
          <section className="py-12 md:py-16 bg-gradient-hero relative overflow-hidden">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/10 rounded-full blur-3xl" />
            
            <div className="container mx-auto px-4 relative z-10">
              <div className="text-center max-w-4xl mx-auto">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/30 mb-4">
                  <Sparkles className="w-4 h-4 text-primary" />
                  <span className="text-sm font-medium text-primary">{totalTools}+ Free Online Tools</span>
                </div>
                
                <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight">
                  Complete Image Tools
                  <span 
                    className="bg-clip-text text-transparent"
                    style={{ backgroundImage: 'linear-gradient(135deg, #F97316, #EF4444)' }}
                  > Ecosystem</span>
                </h1>
                
                <p className="text-muted-foreground max-w-2xl mx-auto mb-6">
                  Convert, compress, resize, crop, edit, and enhance your images. 
                  All tools are free, fast, and process locally for complete privacy.
                </p>
                
                <div className="flex flex-wrap justify-center gap-4">
                  <Link 
                    to="/all-tools"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors"
                  >
                    Browse All Tools
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                  <Link 
                    to="/tag-extractor"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-secondary text-secondary-foreground font-medium hover:bg-secondary/80 transition-colors"
                  >
                    <Hash className="w-4 h-4" />
                    Tag Generator
                  </Link>
                </div>
              </div>
            </div>
          </section>

          {/* Main Split Layout - Tools Left, Categories Right */}
          <section className="py-8 md:py-12 px-4">
            <div className="container mx-auto max-w-7xl">
              <div className="flex flex-col lg:flex-row gap-6">
                {/* LEFT SIDE - Tools */}
                <div className="lg:w-2/3 w-full order-2 lg:order-1">
                  <div className="bg-card rounded-2xl border border-border p-6 h-full">
                    {/* Category Header */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                      <div className="flex items-center gap-3">
                        <div 
                          className="w-12 h-12 rounded-xl flex items-center justify-center"
                          style={{ 
                            background: `linear-gradient(135deg, ${getGradient(selectedCategoryId).from}, ${getGradient(selectedCategoryId).to})`,
                            boxShadow: `0 4px 20px ${getGradient(selectedCategoryId).from}40`
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

                    {/* Tools Grid */}
                    <div className="grid sm:grid-cols-2 gap-3">
                      {filteredTools.map((tool, index) => {
                        const gradient = getToolGradient(index);
                        return (
                          <Link
                            key={tool.id}
                            to={`/${tool.slug}`}
                            className="group flex items-center gap-3 p-3 rounded-xl bg-secondary/30 border border-border hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 animate-fade-in"
                            style={{ animationDelay: `${index * 20}ms` }}
                          >
                            <div 
                              className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 transition-transform duration-300 group-hover:scale-110"
                              style={{ 
                                background: `linear-gradient(135deg, ${gradient.from}, ${gradient.to})`,
                                boxShadow: `0 4px 12px ${gradient.from}30`
                              }}
                            >
                              <Sparkles className="w-4 h-4 text-white" />
                            </div>
                            
                            <div className="flex-1 min-w-0">
                              <h3 className="font-semibold text-sm group-hover:text-primary transition-colors">
                                {tool.name}
                              </h3>
                              <p className="text-xs text-muted-foreground line-clamp-1">
                                {tool.description}
                              </p>
                            </div>
                            
                            <ArrowRight className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all flex-shrink-0" />
                          </Link>
                        );
                      })}
                    </div>

                    {/* Empty State */}
                    {filteredTools.length === 0 && (
                      <div className="text-center py-8 animate-fade-in">
                        <Search className="w-10 h-10 text-muted-foreground mx-auto mb-3" />
                        <p className="text-muted-foreground">No tools found matching "{searchQuery}"</p>
                        <button 
                          onClick={() => setSearchQuery("")}
                          className="mt-3 text-sm text-primary hover:underline"
                        >
                          Clear search
                        </button>
                      </div>
                    )}

                    {/* View Category Page Link */}
                    <div className="mt-6 pt-4 border-t border-border">
                      <Link
                        to={`/${selectedCategory?.slug}`}
                        className="inline-flex items-center gap-2 text-primary hover:underline font-medium text-sm"
                      >
                        View {selectedCategory?.name} page with details
                        <ArrowRight className="w-4 h-4" />
                      </Link>
                    </div>
                  </div>
                </div>

                {/* RIGHT SIDE - Categories */}
                <div className="lg:w-1/3 w-full order-1 lg:order-2">
                  <div className="bg-card rounded-2xl border border-border p-4 sticky top-24">
                    <h2 className="font-semibold text-lg mb-4 px-2">Select Category</h2>
                    <ScrollArea className="h-auto lg:h-[500px]">
                      <div className="space-y-1 pr-2">
                        {imageCategories.map((category) => {
                          const gradient = getGradient(category.id);
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
                        
                        {/* All Tools Link */}
                        <Link
                          to="/all-tools"
                          className="flex items-center gap-3 px-3 py-3 rounded-xl hover:bg-secondary/50 text-primary mt-2"
                        >
                          <div 
                            className="w-10 h-10 rounded-xl flex items-center justify-center"
                            style={{ background: 'linear-gradient(135deg, #F97316, #EF4444)' }}
                          >
                            <span className="text-white text-sm font-bold">{totalTools}+</span>
                          </div>
                          <span className="text-sm font-medium">View All Tools</span>
                        </Link>
                      </div>
                    </ScrollArea>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Tag Tools Section */}
          <section className="py-12 md:py-16 px-4 bg-gradient-dark">
            <div className="container mx-auto max-w-4xl">
              <Link 
                to="/tag-extractor"
                className="group relative bg-card rounded-2xl p-8 border border-border hover:border-primary/50 transition-all duration-300 hover-lift overflow-hidden block"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-accent/5 rounded-full blur-2xl group-hover:bg-accent/10 transition-colors" />
                
                <div className="relative z-10 text-center">
                  <div 
                    className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6 mx-auto"
                    style={{ background: `linear-gradient(135deg, #8B5CF6, #6366F1)` }}
                  >
                    <Hash className="w-8 h-8 text-white" />
                  </div>
                  
                  <h2 className="text-2xl md:text-3xl font-bold mb-3">Tag Extractor & Generator</h2>
                  <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
                    Generate viral hashtags and tags for YouTube, Instagram, TikTok, Twitter, Facebook, and more.
                  </p>
                  
                  <div className="flex flex-wrap gap-2 justify-center mb-6">
                    {["YouTube", "Instagram", "TikTok", "Twitter", "Facebook"].map((platform) => (
                      <span key={platform} className="px-3 py-1 bg-secondary rounded-full text-xs font-medium text-secondary-foreground">
                        {platform}
                      </span>
                    ))}
                  </div>
                  
                  <div className="flex items-center gap-2 text-primary font-semibold justify-center">
                    <span>Generate Tags</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            </div>
          </section>

          {/* Features Section */}
          <section className="py-12 md:py-16 px-4">
            <div className="container mx-auto max-w-5xl">
              <h2 className="text-2xl sm:text-3xl font-bold text-center mb-8">
                Why Choose MultiTools?
              </h2>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  { icon: Zap, title: "Lightning Fast", desc: "Instant results with browser-based processing", gradient: { from: "#F97316", to: "#EAB308" } },
                  { icon: Shield, title: "100% Secure", desc: "Your files never leave your device", gradient: { from: "#22C55E", to: "#10B981" } },
                  { icon: Globe, title: "Works Everywhere", desc: "Use on any device with a browser", gradient: { from: "#3B82F6", to: "#06B6D4" } },
                  { icon: Sparkles, title: "Completely Free", desc: "No hidden fees or watermarks", gradient: { from: "#A855F7", to: "#EC4899" } }
                ].map((item, i) => (
                  <div key={i} className="bg-card rounded-xl p-6 border border-border text-center hover:border-primary/50 transition-colors">
                    <div 
                      className="w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4"
                      style={{ background: `linear-gradient(135deg, ${item.gradient.from}, ${item.gradient.to})` }}
                    >
                      <item.icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="font-semibold mb-2">{item.title}</h3>
                    <p className="text-sm text-muted-foreground">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default HomePage;