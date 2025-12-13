import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ArrowRight, Zap, Shield, Globe, Sparkles, Hash, Star, TrendingUp } from "lucide-react";
import { toolCategories } from "@/data/toolsData";

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

// Popular tools to feature on homepage
const popularTools = [
  { slug: "jpg-to-png", name: "JPG to PNG", category: "image-converter" },
  { slug: "png-to-jpg", name: "PNG to JPG", category: "image-converter" },
  { slug: "jpeg-compressor", name: "JPEG Compressor", category: "image-compression" },
  { slug: "image-to-pdf", name: "Image to PDF", category: "image-to-document" },
  { slug: "exact-resize", name: "Exact Resize", category: "image-resize" },
  { slug: "manual-crop", name: "Manual Crop", category: "image-crop" },
  { slug: "rotate-90", name: "Rotate 90°", category: "image-rotate-flip" },
  { slug: "text-watermark", name: "Text Watermark", category: "watermark-tools" },
  { slug: "jpg-to-webp", name: "JPG to WebP", category: "image-converter" },
  { slug: "png-compressor", name: "PNG Compressor", category: "image-compression" },
  { slug: "collage-maker", name: "Collage Maker", category: "image-combine" },
  { slug: "image-to-qr-code", name: "QR Code Generator", category: "image-qr" },
];

const getGradient = (categoryId: string) => {
  return categoryGradients[categoryId] || { from: "#6366F1", to: "#8B5CF6" };
};

const HomePage = () => {
  const imageCategories = toolCategories.filter(cat => cat.id !== "tag-tools").sort((a, b) => a.priority - b.priority);
  const totalTools = imageCategories.reduce((sum, cat) => sum + cat.tools.length, 0);

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
          <section className="py-16 md:py-24 bg-gradient-hero relative overflow-hidden">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/10 rounded-full blur-3xl" />
            
            <div className="container mx-auto px-4 relative z-10">
              <div className="text-center max-w-4xl mx-auto mb-12">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/30 mb-6">
                  <Sparkles className="w-4 h-4 text-primary" />
                  <span className="text-sm font-medium text-primary">{totalTools}+ Free Online Tools</span>
                </div>
                
                <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
                  Complete Image Tools
                  <span className="bg-gradient-orange bg-clip-text text-transparent"> Ecosystem</span>
                </h1>
                
                <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
                  Convert, compress, resize, crop, edit, and enhance your images. Generate viral hashtags for social media. 
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

          {/* Popular Tools Section */}
          <section className="py-12 md:py-16 px-4 bg-secondary/30">
            <div className="container mx-auto max-w-7xl">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <TrendingUp className="w-5 h-5 text-primary" />
                    <span className="text-sm font-medium text-primary">Most Popular</span>
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-bold">Popular Tools</h2>
                </div>
                <Link 
                  to="/all-tools"
                  className="hidden sm:flex items-center gap-2 text-primary hover:underline"
                >
                  View All <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
              
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {popularTools.map((tool) => {
                  const gradient = getGradient(tool.category);
                  return (
                    <Link 
                      key={tool.slug}
                      to={`/${tool.slug}`}
                      className="group bg-card rounded-xl p-4 border border-border hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
                    >
                      <div 
                        className="w-12 h-12 rounded-xl flex items-center justify-center mb-3 mx-auto"
                        style={{ background: `linear-gradient(135deg, ${gradient.from}, ${gradient.to})` }}
                      >
                        <Star className="w-6 h-6 text-white" />
                      </div>
                      <h3 className="text-sm font-semibold text-center group-hover:text-primary transition-colors line-clamp-2">
                        {tool.name}
                      </h3>
                    </Link>
                  );
                })}
              </div>
              
              <div className="sm:hidden mt-6 text-center">
                <Link 
                  to="/all-tools"
                  className="inline-flex items-center gap-2 text-primary hover:underline"
                >
                  View All Tools <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </section>

          {/* Image Tools Categories */}
          <section className="py-16 md:py-24 px-4">
            <div className="container mx-auto max-w-7xl">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-4">
                Image Tool Categories
              </h2>
              <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
                {imageCategories.length} categories with {totalTools}+ individual tools for all your image editing needs
              </p>
              
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {imageCategories.map((category) => {
                  const gradient = getGradient(category.id);
                  return (
                    <Link 
                      key={category.id}
                      to={`/${category.slug}`}
                      className="group relative bg-card rounded-2xl p-6 border border-border hover:border-primary/50 transition-all duration-300 hover-lift overflow-hidden"
                    >
                      <div 
                        className="absolute top-0 right-0 w-24 h-24 rounded-full blur-2xl opacity-20 group-hover:opacity-30 transition-opacity"
                        style={{ background: `linear-gradient(135deg, ${gradient.from}, ${gradient.to})` }}
                      />
                      
                      <div className="relative z-10">
                        <div 
                          className="w-14 h-14 rounded-xl flex items-center justify-center mb-4"
                          style={{ background: `linear-gradient(135deg, ${gradient.from}, ${gradient.to})` }}
                        >
                          <span className="text-white text-xl font-bold">{category.tools.length}</span>
                        </div>
                        
                        <h3 className="text-lg font-bold mb-2 group-hover:text-primary transition-colors">{category.name}</h3>
                        <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{category.description}</p>
                        
                        {/* Tool Preview */}
                        <div className="flex flex-wrap gap-1 mb-4">
                          {category.tools.slice(0, 3).map((tool) => (
                            <span key={tool.id} className="text-xs bg-secondary px-2 py-1 rounded-full">
                              {tool.name}
                            </span>
                          ))}
                          {category.tools.length > 3 && (
                            <span className="text-xs bg-secondary px-2 py-1 rounded-full text-muted-foreground">
                              +{category.tools.length - 3}
                            </span>
                          )}
                        </div>
                        
                        <div className="flex items-center gap-2 text-primary text-sm font-medium">
                          <span>Explore Tools</span>
                          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          </section>

          {/* Tag Tools Section */}
          <section className="py-16 md:py-24 px-4 bg-gradient-dark">
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
                    Auto-detect platform from URL.
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
          <section className="py-16 md:py-24 px-4">
            <div className="container mx-auto max-w-5xl">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-12">
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

          {/* All Tools Quick Access */}
          <section className="py-12 md:py-16 px-4 bg-secondary/30">
            <div className="container mx-auto max-w-7xl">
              <h2 className="text-2xl font-bold text-center mb-8">Quick Access to All Tools</h2>
              
              {imageCategories.slice(0, 4).map((category) => {
                const gradient = getGradient(category.id);
                return (
                  <div key={category.id} className="mb-8">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div 
                          className="w-8 h-8 rounded-lg flex items-center justify-center"
                          style={{ background: `linear-gradient(135deg, ${gradient.from}, ${gradient.to})` }}
                        >
                          <span className="text-white text-xs font-bold">{category.tools.length}</span>
                        </div>
                        <h3 className="font-semibold">{category.name}</h3>
                      </div>
                      <Link 
                        to={`/${category.slug}`}
                        className="text-sm text-primary hover:underline"
                      >
                        View All →
                      </Link>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {category.tools.slice(0, 8).map((tool) => (
                        <Link
                          key={tool.id}
                          to={`/${tool.slug}`}
                          className="px-3 py-1.5 bg-card border border-border rounded-lg text-sm hover:border-primary/50 hover:text-primary transition-colors"
                        >
                          {tool.name}
                        </Link>
                      ))}
                      {category.tools.length > 8 && (
                        <Link
                          to={`/${category.slug}`}
                          className="px-3 py-1.5 bg-primary/10 text-primary rounded-lg text-sm hover:bg-primary/20 transition-colors"
                        >
                          +{category.tools.length - 8} more
                        </Link>
                      )}
                    </div>
                  </div>
                );
              })}
              
              <div className="text-center">
                <Link 
                  to="/all-tools"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors"
                >
                  Browse All {totalTools}+ Tools
                  <ArrowRight className="w-4 h-4" />
                </Link>
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