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
                  Complete Image T<span className="text-green-500">oo</span>ls
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

          {/* Comprehensive Tools Description Section for AdSense */}
          <section className="py-12 sm:py-16 md:py-20 lg:py-24 px-4 sm:px-6 bg-background">
            <div className="container mx-auto max-w-6xl">
              <div className="text-center mb-10 sm:mb-12 md:mb-16">
                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6">
                  Complete Guide to Our Free Online Image Tools
                </h2>
                <p className="text-base sm:text-lg text-muted-foreground max-w-3xl mx-auto">
                  Discover the power of professional image editing without expensive software. Our comprehensive suite of tools helps millions of users worldwide transform their images effortlessly.
                </p>
              </div>

              {/* About Our Platform */}
              <div className="prose prose-lg max-w-none mb-12 sm:mb-16">
                <div className="bg-card rounded-2xl p-6 sm:p-8 md:p-10 border border-border mb-8">
                  <h3 className="text-xl sm:text-2xl font-bold mb-4 text-foreground">About MultiTools - Your All-in-One Image Solution</h3>
                  <p className="text-muted-foreground mb-4 leading-relaxed">
                    MultiTools is a comprehensive online platform that provides free, professional-grade image editing tools accessible to everyone. Whether you are a professional photographer, graphic designer, social media manager, blogger, or simply someone who needs to edit images occasionally, our platform offers everything you need without the complexity of traditional software.
                  </p>
                  <p className="text-muted-foreground mb-4 leading-relaxed">
                    Our mission is to democratize image editing by providing powerful tools that work directly in your browser. Unlike desktop applications that require expensive licenses and technical expertise, MultiTools offers instant access to over 80 specialized tools that handle every aspect of image processing, from basic conversions to advanced editing features.
                  </p>
                  <p className="text-muted-foreground leading-relaxed">
                    Every tool on our platform is designed with user experience in mind. We understand that time is valuable, which is why our tools process images instantly using advanced browser-based technology. Your files never leave your device, ensuring complete privacy and security while delivering professional-quality results.
                  </p>
                </div>
              </div>

              {/* Image Converter Tools */}
              <div className="mb-10 sm:mb-12 md:mb-14">
                <h3 className="text-xl sm:text-2xl md:text-3xl font-bold mb-4 sm:mb-6 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #3B82F6, #06B6D4)' }}>
                    <RefreshCw className="w-5 h-5 text-white" />
                  </div>
                  Image Format Conversion Tools
                </h3>
                <div className="bg-card rounded-xl p-5 sm:p-6 md:p-8 border border-border">
                  <p className="text-muted-foreground mb-4 leading-relaxed">
                    Our image converter tools support a wide range of formats including JPG, PNG, WebP, GIF, BMP, TIFF, SVG, HEIC, and RAW. Converting between formats is essential for optimizing images for different platforms and purposes. For example, JPG format is ideal for photographs with millions of colors, while PNG supports transparency and is perfect for logos and graphics.
                  </p>
                  <p className="text-muted-foreground mb-4 leading-relaxed">
                    WebP format, developed by Google, offers superior compression compared to JPG and PNG, making it the preferred choice for web optimization. Our JPG to WebP and PNG to WebP converters help you reduce file sizes by up to 30% while maintaining excellent visual quality. This translates to faster website loading times and improved user experience.
                  </p>
                  <p className="text-muted-foreground mb-4 leading-relaxed">
                    For iPhone users, our HEIC to JPG converter is invaluable. Apple devices capture photos in HEIC format which offers excellent quality at smaller file sizes, but this format is not universally supported. Our converter transforms HEIC images to widely compatible JPG format instantly, ensuring you can share your photos anywhere.
                  </p>
                  <h4 className="font-semibold text-lg mb-3 text-foreground">Supported Conversions Include:</h4>
                  <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 text-sm text-muted-foreground">
                    <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-primary rounded-full"></span>JPG to PNG</li>
                    <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-primary rounded-full"></span>PNG to JPG</li>
                    <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-primary rounded-full"></span>JPG to WebP</li>
                    <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-primary rounded-full"></span>WebP to PNG</li>
                    <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-primary rounded-full"></span>GIF to PNG</li>
                    <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-primary rounded-full"></span>HEIC to JPG</li>
                    <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-primary rounded-full"></span>SVG to PNG</li>
                    <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-primary rounded-full"></span>RAW to JPG</li>
                  </ul>
                </div>
              </div>

              {/* Image Compression */}
              <div className="mb-10 sm:mb-12 md:mb-14">
                <h3 className="text-xl sm:text-2xl md:text-3xl font-bold mb-4 sm:mb-6 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #22C55E, #10B981)' }}>
                    <Minimize2 className="w-5 h-5 text-white" />
                  </div>
                  Image Compression and Optimization
                </h3>
                <div className="bg-card rounded-xl p-5 sm:p-6 md:p-8 border border-border">
                  <p className="text-muted-foreground mb-4 leading-relaxed">
                    Image compression is crucial for website performance, email attachments, and storage optimization. Our compression tools use advanced algorithms to reduce file sizes significantly while preserving visual quality. The human eye cannot distinguish the difference between an optimized image and the original in most cases.
                  </p>
                  <p className="text-muted-foreground mb-4 leading-relaxed">
                    Our JPEG compressor analyzes each image and applies intelligent compression that targets redundant data while preserving important details. You can reduce image sizes by 50-80% without noticeable quality loss. This is essential for website owners who want to improve page load speeds and search engine rankings.
                  </p>
                  <p className="text-muted-foreground mb-4 leading-relaxed">
                    PNG compression works differently because PNG uses lossless compression. Our PNG compressor optimizes the color palette and removes unnecessary metadata to achieve smaller file sizes. For images with transparency, this is the ideal format, and our tool ensures optimal compression.
                  </p>
                  <p className="text-muted-foreground leading-relaxed">
                    Website performance directly impacts user experience and SEO rankings. Studies show that pages loading in under 3 seconds have significantly lower bounce rates. By compressing your images with our tools, you contribute to faster loading times and better overall website performance.
                  </p>
                </div>
              </div>

              {/* Image Resize */}
              <div className="mb-10 sm:mb-12 md:mb-14">
                <h3 className="text-xl sm:text-2xl md:text-3xl font-bold mb-4 sm:mb-6 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #00C6FF, #0072FF)' }}>
                    <Maximize2 className="w-5 h-5 text-white" />
                  </div>
                  Professional Image Resizing
                </h3>
                <div className="bg-card rounded-xl p-5 sm:p-6 md:p-8 border border-border">
                  <p className="text-muted-foreground mb-4 leading-relaxed">
                    Resizing images correctly is essential for various applications. Whether you need specific dimensions for social media posts, website banners, print materials, or profile pictures, our resize tools offer precise control over your image dimensions while maintaining aspect ratios and quality.
                  </p>
                  <p className="text-muted-foreground mb-4 leading-relaxed">
                    Our Exact Resize tool lets you specify exact width and height in pixels, perfect for when you need precise dimensions. The Percentage Resize tool scales images proportionally, ideal for reducing image size while keeping the original aspect ratio. Fit to Width and Fit to Height tools automatically calculate the other dimension to maintain proportions.
                  </p>
                  <p className="text-muted-foreground mb-4 leading-relaxed">
                    The Fit to Box feature is particularly useful when you have a specific container size and want the image to fit within it without distortion. This is commonly used for product images, thumbnails, and gallery displays where consistent sizing is important.
                  </p>
                  <p className="text-muted-foreground leading-relaxed">
                    All our resize operations use high-quality resampling algorithms that preserve image sharpness and detail. Unlike simple resize tools that create pixelated results, our technology intelligently interpolates pixels to create smooth, professional-looking resized images.
                  </p>
                </div>
              </div>

              {/* Crop and Edit */}
              <div className="mb-10 sm:mb-12 md:mb-14">
                <h3 className="text-xl sm:text-2xl md:text-3xl font-bold mb-4 sm:mb-6 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #A855F7, #EC4899)' }}>
                    <Crop className="w-5 h-5 text-white" />
                  </div>
                  Advanced Cropping and Editing Features
                </h3>
                <div className="bg-card rounded-xl p-5 sm:p-6 md:p-8 border border-border">
                  <p className="text-muted-foreground mb-4 leading-relaxed">
                    Cropping is one of the most fundamental image editing operations. Our crop tools offer multiple modes including manual selection, preset aspect ratios, circle crop for profile pictures, and square crop for social media. Each mode is optimized for specific use cases to help you achieve perfect results quickly.
                  </p>
                  <p className="text-muted-foreground mb-4 leading-relaxed">
                    The Aspect Ratio Crop tool includes presets for common formats like 16:9 for widescreen displays, 4:3 for traditional monitors, 1:1 for Instagram posts, and 9:16 for stories and reels. Custom aspect ratios are also supported for specialized requirements.
                  </p>
                  <p className="text-muted-foreground mb-4 leading-relaxed">
                    Our rotation and flip tools handle image orientation with precision. Rotate images by 90, 180, or 270 degrees, or specify custom angles for precise alignment. Flip tools create mirror images horizontally or vertically, useful for design work and creative projects.
                  </p>
                  <p className="text-muted-foreground leading-relaxed">
                    Photo filters and adjustments bring professional editing capabilities to your browser. Adjust brightness, contrast, saturation, and sharpness. Apply artistic filters like sepia, vintage, grayscale, and more. These tools transform ordinary photos into visually stunning images suitable for any purpose.
                  </p>
                </div>
              </div>

              {/* Benefits Section */}
              <div className="mb-10 sm:mb-12 md:mb-14">
                <h3 className="text-xl sm:text-2xl md:text-3xl font-bold mb-6 sm:mb-8 text-center">
                  Benefits of Using MultiTools
                </h3>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                  <div className="bg-card rounded-xl p-5 sm:p-6 border border-border">
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                      <Zap className="w-6 h-6 text-primary" />
                    </div>
                    <h4 className="font-bold text-lg mb-2">Instant Processing</h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      All image processing happens directly in your browser using advanced JavaScript technology. No waiting for server uploads or downloads. Results appear instantly, saving you valuable time.
                    </p>
                  </div>
                  <div className="bg-card rounded-xl p-5 sm:p-6 border border-border">
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                      <Shield className="w-6 h-6 text-primary" />
                    </div>
                    <h4 className="font-bold text-lg mb-2">Complete Privacy</h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Your images never leave your device. Unlike cloud-based services that upload your files to remote servers, our tools process everything locally. Your photos, documents, and personal images remain completely private.
                    </p>
                  </div>
                  <div className="bg-card rounded-xl p-5 sm:p-6 border border-border">
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                      <Globe className="w-6 h-6 text-primary" />
                    </div>
                    <h4 className="font-bold text-lg mb-2">Universal Access</h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Access our tools from any device with a modern web browser. Works perfectly on Windows, Mac, Linux, iOS, Android, and Chrome OS. No installation required, no storage space consumed.
                    </p>
                  </div>
                  <div className="bg-card rounded-xl p-5 sm:p-6 border border-border">
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                      <Sparkles className="w-6 h-6 text-primary" />
                    </div>
                    <h4 className="font-bold text-lg mb-2">Professional Quality</h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Our tools use the same algorithms found in professional software. High-quality compression, precise resizing, and accurate color processing ensure your images look their best.
                    </p>
                  </div>
                  <div className="bg-card rounded-xl p-5 sm:p-6 border border-border">
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                      <Star className="w-6 h-6 text-primary" />
                    </div>
                    <h4 className="font-bold text-lg mb-2">Completely Free</h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      All tools are free to use without limitations. No registration required, no watermarks added, no daily limits. Use our tools as much as you need for personal or commercial projects.
                    </p>
                  </div>
                  <div className="bg-card rounded-xl p-5 sm:p-6 border border-border">
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                      <TrendingUp className="w-6 h-6 text-primary" />
                    </div>
                    <h4 className="font-bold text-lg mb-2">Regular Updates</h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      We continuously improve our tools and add new features based on user feedback. Our development team stays updated with the latest web technologies to provide the best possible experience.
                    </p>
                  </div>
                </div>
              </div>

              {/* Who Uses Our Tools */}
              <div className="mb-10 sm:mb-12 md:mb-14">
                <h3 className="text-xl sm:text-2xl md:text-3xl font-bold mb-6 text-center">
                  Who Uses Our Image Tools?
                </h3>
                <div className="bg-card rounded-xl p-6 sm:p-8 border border-border">
                  <div className="grid sm:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-bold mb-3 text-lg">Professional Users</h4>
                      <ul className="space-y-2 text-muted-foreground">
                        <li className="flex items-start gap-2"><span className="w-1.5 h-1.5 bg-primary rounded-full mt-2"></span>Photographers who need quick batch processing</li>
                        <li className="flex items-start gap-2"><span className="w-1.5 h-1.5 bg-primary rounded-full mt-2"></span>Graphic designers working on web projects</li>
                        <li className="flex items-start gap-2"><span className="w-1.5 h-1.5 bg-primary rounded-full mt-2"></span>Web developers optimizing site performance</li>
                        <li className="flex items-start gap-2"><span className="w-1.5 h-1.5 bg-primary rounded-full mt-2"></span>Marketing teams creating social media content</li>
                        <li className="flex items-start gap-2"><span className="w-1.5 h-1.5 bg-primary rounded-full mt-2"></span>E-commerce businesses managing product images</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-bold mb-3 text-lg">Personal Users</h4>
                      <ul className="space-y-2 text-muted-foreground">
                        <li className="flex items-start gap-2"><span className="w-1.5 h-1.5 bg-primary rounded-full mt-2"></span>Students preparing presentations and projects</li>
                        <li className="flex items-start gap-2"><span className="w-1.5 h-1.5 bg-primary rounded-full mt-2"></span>Bloggers optimizing images for their websites</li>
                        <li className="flex items-start gap-2"><span className="w-1.5 h-1.5 bg-primary rounded-full mt-2"></span>Social media users creating perfect profile pictures</li>
                        <li className="flex items-start gap-2"><span className="w-1.5 h-1.5 bg-primary rounded-full mt-2"></span>Anyone sharing photos via email or messaging</li>
                        <li className="flex items-start gap-2"><span className="w-1.5 h-1.5 bg-primary rounded-full mt-2"></span>Home users organizing digital photo collections</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              {/* FAQ Section */}
              <div className="mb-10 sm:mb-12 md:mb-14">
                <h3 className="text-xl sm:text-2xl md:text-3xl font-bold mb-6 sm:mb-8 text-center">
                  Frequently Asked Questions
                </h3>
                <div className="space-y-4">
                  <div className="bg-card rounded-xl p-5 sm:p-6 border border-border">
                    <h4 className="font-bold mb-2">Is MultiTools really free to use?</h4>
                    <p className="text-muted-foreground">Yes, all our tools are completely free with no hidden costs. We do not require registration, subscription, or payment. You can use any tool unlimited times without restrictions.</p>
                  </div>
                  <div className="bg-card rounded-xl p-5 sm:p-6 border border-border">
                    <h4 className="font-bold mb-2">Are my images safe and private?</h4>
                    <p className="text-muted-foreground">Absolutely. Your images are processed entirely in your browser and never uploaded to our servers. We have no access to your files, ensuring complete privacy and security for all your images.</p>
                  </div>
                  <div className="bg-card rounded-xl p-5 sm:p-6 border border-border">
                    <h4 className="font-bold mb-2">What image formats are supported?</h4>
                    <p className="text-muted-foreground">We support all major image formats including JPG, JPEG, PNG, WebP, GIF, BMP, TIFF, SVG, HEIC, and RAW files. Our converters can transform images between these formats seamlessly.</p>
                  </div>
                  <div className="bg-card rounded-xl p-5 sm:p-6 border border-border">
                    <h4 className="font-bold mb-2">Do I need to install any software?</h4>
                    <p className="text-muted-foreground">No installation is required. All tools work directly in your web browser. Simply visit the tool page, upload your image, and get results instantly. Works on any device with a modern browser.</p>
                  </div>
                  <div className="bg-card rounded-xl p-5 sm:p-6 border border-border">
                    <h4 className="font-bold mb-2">Can I use these tools for commercial purposes?</h4>
                    <p className="text-muted-foreground">Yes, you can use our tools for both personal and commercial projects without any restrictions. There are no watermarks or usage limitations on the processed images.</p>
                  </div>
                  <div className="bg-card rounded-xl p-5 sm:p-6 border border-border">
                    <h4 className="font-bold mb-2">How do I get the best compression results?</h4>
                    <p className="text-muted-foreground">For photos, use JPEG compression at 70-80% quality for optimal file size reduction while maintaining visual quality. For graphics with transparency, use PNG. For web optimization, consider converting to WebP format.</p>
                  </div>
                </div>
              </div>

              {/* Closing Statement */}
              <div className="text-center bg-gradient-hero rounded-2xl p-8 sm:p-10 md:p-12">
                <h3 className="text-xl sm:text-2xl md:text-3xl font-bold mb-4">
                  Start Using MultiTools Today
                </h3>
                <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                  Join millions of users who trust MultiTools for their image editing needs. Our comprehensive suite of free tools is constantly growing to serve you better. No signup required - just pick a tool and start creating.
                </p>
                <Link 
                  to="/all-tools"
                  className="inline-flex items-center gap-2 px-6 sm:px-8 py-3 sm:py-4 rounded-xl bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-colors text-base sm:text-lg"
                >
                  Explore All Tools
                  <ArrowRight className="w-5 h-5" />
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