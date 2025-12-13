import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ArrowRight, Zap, Shield, Globe, Sparkles, Hash, TrendingUp, RefreshCw, Minimize2, Maximize2, Crop, Droplet, RotateCw, Settings, Palette, Layers, FileText, Database, Zap as ZapIcon, Pencil, Lock, QrCode, Image, Star } from "lucide-react";
import { toolCategories } from "@/data/toolsData";
import { ToolIconWithBackground, getToolIconColor, getToolIconComponent } from "@/lib/toolIcons";

// Category icons mapping
const categoryLucideIcons: Record<string, React.ReactNode> = {
  "image-converter": <RefreshCw className="w-6 h-6 text-white" />,
  "image-compression": <Minimize2 className="w-6 h-6 text-white" />,
  "image-to-document": <FileText className="w-6 h-6 text-white" />,
  "image-resize": <Maximize2 className="w-6 h-6 text-white" />,
  "image-crop": <Crop className="w-6 h-6 text-white" />,
  "image-rotate-flip": <RotateCw className="w-6 h-6 text-white" />,
  "image-format-utilities": <Settings className="w-6 h-6 text-white" />,
  "photo-filters": <Palette className="w-6 h-6 text-white" />,
  "watermark-tools": <Droplet className="w-6 h-6 text-white" />,
  "image-combine": <Layers className="w-6 h-6 text-white" />,
  "image-metadata": <Database className="w-6 h-6 text-white" />,
  "image-optimization": <ZapIcon className="w-6 h-6 text-white" />,
  "image-drawing": <Pencil className="w-6 h-6 text-white" />,
  "image-security": <Lock className="w-6 h-6 text-white" />,
  "image-qr": <QrCode className="w-6 h-6 text-white" />,
  "tag-tools": <Hash className="w-6 h-6 text-white" />,
  "pdf-tools": <FileText className="w-6 h-6 text-white" />,
};

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
  "pdf-tools": { from: "#DC2626", to: "#EA580C" },
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
          <section className="py-8 sm:py-12 md:py-16 lg:py-20 xl:py-24 bg-gradient-hero relative overflow-hidden">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[250px] sm:w-[350px] md:w-[450px] lg:w-[550px] h-[250px] sm:h-[350px] md:h-[450px] lg:h-[550px] bg-primary/10 rounded-full blur-3xl pointer-events-none" />
            
            <div className="container mx-auto px-4 sm:px-6 relative z-10">
              <div className="text-center max-w-4xl mx-auto">
                <div className="inline-flex items-center gap-1.5 sm:gap-2 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-primary/10 border border-primary/30 mb-4 sm:mb-5 md:mb-6">
                  <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-primary" />
                  <span className="text-xs sm:text-sm font-medium text-primary">{totalTools}+ Free Online Tools</span>
                </div>
                
                <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-3 sm:mb-4 md:mb-5 leading-tight px-2">
                  Complete Image Tools
                  <span 
                    className="bg-clip-text text-transparent block sm:inline"
                    style={{ backgroundImage: 'linear-gradient(135deg, #F97316, #EF4444)' }}
                  > Ecosystem</span>
                </h1>
                
                <p className="text-sm sm:text-base md:text-lg text-muted-foreground max-w-xl sm:max-w-2xl mx-auto mb-5 sm:mb-6 md:mb-8 px-3 sm:px-4">
                  Convert, compress, resize, crop, edit, and enhance your images. Generate viral hashtags for social media. 
                  All tools are free, fast, and process locally for complete privacy.
                </p>
                
                <div className="flex flex-col sm:flex-row justify-center gap-2.5 sm:gap-3 md:gap-4 px-4 sm:px-0">
                  <Link 
                    to="/all-tools"
                    className="inline-flex items-center justify-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 rounded-lg bg-primary text-primary-foreground font-medium hover:bg-primary/90 active:bg-primary/80 transition-colors text-sm sm:text-base touch-target"
                  >
                    Browse All Tools
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                  <Link 
                    to="/pdf-tools"
                    className="inline-flex items-center justify-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 rounded-lg text-sm sm:text-base touch-target font-medium transition-colors"
                    style={{ background: 'linear-gradient(135deg, #DC2626, #EA580C)', color: 'white' }}
                  >
                    <FileText className="w-4 h-4" />
                    PDF Tools
                  </Link>
                  <Link 
                    to="/tag-extractor"
                    className="inline-flex items-center justify-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 rounded-lg bg-secondary text-secondary-foreground font-medium hover:bg-secondary/80 active:bg-secondary/70 transition-colors text-sm sm:text-base touch-target"
                  >
                    <Hash className="w-4 h-4" />
                    Tag Generator
                  </Link>
                </div>
              </div>
            </div>
          </section>

          {/* Popular Tools Section */}
          <section className="py-6 sm:py-10 md:py-14 px-3 sm:px-4 md:px-6 bg-secondary/30">
            <div className="container mx-auto max-w-7xl">
              <div className="flex items-center justify-between mb-4 sm:mb-6 md:mb-8">
                <div>
                  <div className="flex items-center gap-1.5 sm:gap-2 mb-1">
                    <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
                    <span className="text-xs sm:text-sm font-medium text-primary">Most Popular</span>
                  </div>
                  <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold">Popular Tools</h2>
                </div>
                <Link 
                  to="/all-tools"
                  className="hidden sm:flex items-center gap-2 text-sm text-primary hover:underline"
                >
                  View All <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
              
              <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-2 sm:gap-3 md:gap-4">
                {popularTools.map((tool) => {
                  return (
                    <Link 
                      key={tool.slug}
                      to={`/${tool.slug}`}
                      className="group bg-card rounded-lg sm:rounded-xl p-2.5 sm:p-3 md:p-4 border border-border hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 active:scale-[0.98]"
                    >
                      <ToolIconWithBackground 
                        toolSlug={tool.slug} 
                        size={40} 
                        iconSize={20}
                        className="mb-1.5 sm:mb-2 md:mb-3 mx-auto"
                      />
                      <h3 className="text-[10px] sm:text-xs md:text-sm font-semibold text-center group-hover:text-primary transition-colors line-clamp-2">
                        {tool.name}
                      </h3>
                    </Link>
                  );
                })}
              </div>
              
              <div className="sm:hidden mt-4 text-center">
                <Link 
                  to="/all-tools"
                  className="inline-flex items-center gap-2 text-sm text-primary hover:underline py-2"
                >
                  View All Tools <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </section>

          {/* Image Tools Categories */}
          <section className="py-8 sm:py-12 md:py-16 lg:py-20 px-3 sm:px-4 md:px-6">
            <div className="container mx-auto max-w-7xl">
              <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-center mb-2 sm:mb-3 md:mb-4">
                Image Tool Categories
              </h2>
              <p className="text-center text-muted-foreground mb-6 sm:mb-8 md:mb-10 lg:mb-12 max-w-2xl mx-auto text-sm sm:text-base px-2">
                {imageCategories.length} categories with {totalTools}+ individual tools for all your image editing needs
              </p>
              
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-5 lg:gap-6">
                {imageCategories.map((category) => {
                  const gradient = getGradient(category.id);
                  return (
                    <Link 
                      key={category.id}
                      to={`/${category.slug}`}
                      className="group relative bg-card rounded-xl sm:rounded-2xl p-3 sm:p-4 md:p-5 lg:p-6 border border-border hover:border-primary/50 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg overflow-hidden active:scale-[0.98]"
                    >
                      <div 
                        className="absolute top-0 right-0 w-16 sm:w-20 md:w-24 h-16 sm:h-20 md:h-24 rounded-full blur-2xl opacity-20 group-hover:opacity-30 transition-opacity pointer-events-none"
                        style={{ background: `linear-gradient(135deg, ${gradient.from}, ${gradient.to})` }}
                      />
                      
                      <div className="relative z-10">
                        <div 
                          className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-lg sm:rounded-xl flex items-center justify-center mb-2 sm:mb-3 md:mb-4"
                          style={{ background: `linear-gradient(135deg, ${gradient.from}, ${gradient.to})` }}
                        >
                          <div className="[&>svg]:w-4 [&>svg]:h-4 sm:[&>svg]:w-5 sm:[&>svg]:h-5 md:[&>svg]:w-6 md:[&>svg]:h-6">
                            {categoryLucideIcons[category.id] || <Image className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-white" />}
                          </div>
                        </div>
                        
                        <h3 className="text-sm sm:text-base md:text-lg font-bold mb-1 sm:mb-2 group-hover:text-primary transition-colors line-clamp-1">{category.name}</h3>
                        <p className="text-xs sm:text-sm text-muted-foreground mb-2 sm:mb-3 md:mb-4 line-clamp-2 hidden sm:block">{category.description}</p>
                        
                        {/* Tool Preview - Hidden on mobile */}
                        <div className="hidden md:flex flex-wrap gap-1 mb-3 md:mb-4">
                          {category.tools.slice(0, 2).map((tool) => (
                            <span key={tool.id} className="text-[10px] md:text-xs bg-secondary px-1.5 md:px-2 py-0.5 md:py-1 rounded-full">
                              {tool.name}
                            </span>
                          ))}
                          {category.tools.length > 2 && (
                            <span className="text-[10px] md:text-xs bg-secondary px-1.5 md:px-2 py-0.5 md:py-1 rounded-full text-muted-foreground">
                              +{category.tools.length - 2}
                            </span>
                          )}
                        </div>
                        
                        <div className="flex items-center gap-1 sm:gap-2 text-primary text-xs sm:text-sm font-medium">
                          <span>{category.tools.length} Tools</span>
                          <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 group-hover:translate-x-1 transition-transform" />
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          </section>

          {/* Tag Tools Section */}
          <section className="py-8 sm:py-12 md:py-16 lg:py-20 px-3 sm:px-4 md:px-6 bg-gradient-dark">
            <div className="container mx-auto max-w-4xl">
              <Link 
                to="/tag-extractor"
                className="group relative bg-card rounded-xl sm:rounded-2xl p-5 sm:p-6 md:p-8 border border-border hover:border-primary/50 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg overflow-hidden block active:scale-[0.99]"
              >
                <div className="absolute top-0 right-0 w-24 sm:w-32 h-24 sm:h-32 bg-accent/5 rounded-full blur-2xl group-hover:bg-accent/10 transition-colors pointer-events-none" />
                
                <div className="relative z-10 text-center">
                  <div 
                    className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-xl sm:rounded-2xl flex items-center justify-center mb-4 sm:mb-5 md:mb-6 mx-auto"
                    style={{ background: `linear-gradient(135deg, #8B5CF6, #6366F1)` }}
                  >
                    <Hash className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-white" />
                  </div>
                  
                  <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-2 sm:mb-3">Tag Extractor & Generator</h2>
                  <p className="text-sm sm:text-base text-muted-foreground mb-4 sm:mb-5 md:mb-6 max-w-xl mx-auto px-2">
                    Generate viral hashtags and tags for YouTube, Instagram, TikTok, Twitter, Facebook, and more. 
                    Auto-detect platform from URL.
                  </p>
                  
                  <div className="flex flex-wrap gap-1.5 sm:gap-2 justify-center mb-4 sm:mb-5 md:mb-6">
                    {["YouTube", "Instagram", "TikTok", "Twitter", "Facebook"].map((platform) => (
                      <span key={platform} className="px-2 sm:px-3 py-0.5 sm:py-1 bg-secondary rounded-full text-[10px] sm:text-xs font-medium text-secondary-foreground">
                        {platform}
                      </span>
                    ))}
                  </div>
                  
                  <div className="flex items-center gap-2 text-primary font-semibold justify-center text-sm sm:text-base">
                    <span>Generate Tags</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            </div>
          </section>

          {/* Features Section */}
          <section className="py-8 sm:py-12 md:py-16 lg:py-20 px-3 sm:px-4 md:px-6">
            <div className="container mx-auto max-w-5xl">
              <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-center mb-6 sm:mb-8 md:mb-10 lg:mb-12">
                Why Choose MultiTools?
              </h2>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 md:gap-5 lg:gap-6">
                {[
                  { icon: Zap, title: "Lightning Fast", desc: "Instant results with browser-based processing", gradient: { from: "#F97316", to: "#EAB308" } },
                  { icon: Shield, title: "100% Secure", desc: "Your files never leave your device", gradient: { from: "#22C55E", to: "#10B981" } },
                  { icon: Globe, title: "Works Everywhere", desc: "Use on any device with a browser", gradient: { from: "#3B82F6", to: "#06B6D4" } },
                  { icon: Sparkles, title: "Completely Free", desc: "No hidden fees or watermarks", gradient: { from: "#A855F7", to: "#EC4899" } }
                ].map((item, i) => (
                  <div key={i} className="bg-card rounded-lg sm:rounded-xl p-3 sm:p-4 md:p-5 lg:p-6 border border-border text-center hover:border-primary/50 transition-colors">
                    <div 
                      className="w-10 h-10 sm:w-11 sm:h-11 md:w-12 md:h-12 rounded-lg sm:rounded-xl flex items-center justify-center mx-auto mb-2 sm:mb-3 md:mb-4"
                      style={{ background: `linear-gradient(135deg, ${item.gradient.from}, ${item.gradient.to})` }}
                    >
                      <item.icon className="w-5 h-5 sm:w-5 sm:h-5 md:w-6 md:h-6 text-white" />
                    </div>
                    <h3 className="font-semibold mb-1 sm:mb-2 text-xs sm:text-sm md:text-base">{item.title}</h3>
                    <p className="text-[10px] sm:text-xs md:text-sm text-muted-foreground hidden sm:block">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Complete Tools by Category Section */}
          <section className="py-8 sm:py-10 md:py-14 lg:py-16 px-3 sm:px-4 md:px-6 bg-secondary/30">
            <div className="container mx-auto max-w-7xl">
              <div className="text-center mb-6 sm:mb-8 md:mb-10 lg:mb-12">
                <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-2 sm:mb-3 md:mb-4">All Tools by Category</h2>
                <p className="text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto px-2">
                  Browse all {totalTools}+ tools organized by category. Click any tool to use it instantly.
                </p>
              </div>
              
              <div className="space-y-4 sm:space-y-6 md:space-y-8 lg:space-y-10">
                {imageCategories.map((category) => {
                  const gradient = getGradient(category.id);
                  return (
                    <div key={category.id} className="bg-card rounded-xl sm:rounded-2xl p-3 sm:p-4 md:p-5 lg:p-6 border border-border">
                      {/* Category Header */}
                      <div className="flex items-center justify-between mb-3 sm:mb-4 md:mb-5 lg:mb-6 pb-3 sm:pb-4 border-b border-border gap-3">
                        <div className="flex items-center gap-2 sm:gap-3 md:gap-4 min-w-0">
                          <div 
                            className="w-9 h-9 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-lg sm:rounded-xl flex items-center justify-center flex-shrink-0"
                            style={{ background: `linear-gradient(135deg, ${gradient.from}, ${gradient.to})` }}
                          >
                            <div className="[&>svg]:w-4 [&>svg]:h-4 sm:[&>svg]:w-5 sm:[&>svg]:h-5">
                              {categoryLucideIcons[category.id] || <Image className="w-4 h-4 sm:w-5 sm:h-5 text-white" />}
                            </div>
                          </div>
                          <div className="min-w-0">
                            <h3 className="text-sm sm:text-base md:text-lg lg:text-xl font-bold truncate">{category.name}</h3>
                            <p className="text-xs sm:text-sm text-muted-foreground truncate hidden sm:block">{category.description}</p>
                          </div>
                        </div>
                        <Link 
                          to={`/${category.slug}`}
                          className="hidden md:flex items-center gap-2 px-3 md:px-4 py-1.5 md:py-2 rounded-lg bg-primary/10 text-primary hover:bg-primary/20 transition-colors text-xs md:text-sm font-medium flex-shrink-0"
                        >
                          View Category <ArrowRight className="w-3 h-3 md:w-4 md:h-4" />
                        </Link>
                      </div>
                      
                      {/* All Tools Grid */}
                      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-1.5 sm:gap-2 md:gap-3">
                        {category.tools.map((tool) => (
                          <Link
                            key={tool.id}
                            to={`/${tool.slug}`}
                            className="group flex items-center gap-1.5 sm:gap-2 p-2 sm:p-2.5 md:p-3 rounded-lg bg-secondary/50 hover:bg-secondary border border-transparent hover:border-primary/30 transition-all active:scale-[0.98]"
                          >
                            <ToolIconWithBackground 
                              toolSlug={tool.slug} 
                              size={28} 
                              iconSize={14}
                              className="flex-shrink-0"
                            />
                            <span className="text-xs sm:text-sm font-medium group-hover:text-primary transition-colors line-clamp-1">
                              {tool.name}
                            </span>
                          </Link>
                        ))}
                      </div>
                      
                      {/* Mobile View Category Link */}
                      <div className="md:hidden mt-3 sm:mt-4 text-center">
                        <Link 
                          to={`/${category.slug}`}
                          className="inline-flex items-center gap-2 text-primary text-xs sm:text-sm font-medium hover:underline py-2"
                        >
                          View {category.name} <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4" />
                        </Link>
                      </div>
                    </div>
                  );
                })}
              </div>
              
              <div className="text-center mt-8 sm:mt-10 md:mt-12">
                <Link 
                  to="/all-tools"
                  className="inline-flex items-center gap-2 px-5 sm:px-6 md:px-8 py-3 sm:py-3.5 md:py-4 rounded-lg sm:rounded-xl bg-primary text-primary-foreground font-semibold hover:bg-primary/90 active:bg-primary/80 transition-colors text-sm sm:text-base md:text-lg touch-target"
                >
                  Browse All {totalTools}+ Tools
                  <ArrowRight className="w-4 h-4 md:w-5 md:h-5" />
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