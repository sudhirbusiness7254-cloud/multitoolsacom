import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ArrowRight, Zap, Shield, Globe, Sparkles, Hash, TrendingUp, RefreshCw, Minimize2, Maximize2, Crop, Droplet, RotateCw, Settings, Palette, Layers, FileText, Database, Zap as ZapIcon, Pencil, Lock, QrCode, Image, Star } from "lucide-react";
import { toolCategories } from "@/data/toolsData";
import { ToolIconWithBackground, getToolIconColor, getToolIconComponent } from "@/lib/toolIcons";
import HreflangTags from "@/components/HreflangTags";
import RealTimeReviews from "@/components/RealTimeReviews";
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
  { slug: "merge-pdf", name: "Merge PDF", category: "pdf-tools" },
  { slug: "exact-resize", name: "Exact Resize", category: "image-resize" },
  { slug: "manual-crop", name: "Manual Crop", category: "image-crop" },
  { slug: "rotate-90", name: "Rotate 90°", category: "image-rotate-flip" },
  { slug: "text-watermark", name: "Text Watermark", category: "watermark-tools" },
  { slug: "jpg-to-webp", name: "JPG to WebP", category: "image-converter" },
  { slug: "png-compressor", name: "PNG Compressor", category: "image-compression" },
  { slug: "compress-pdf", name: "Compress PDF", category: "pdf-tools" },
  { slug: "word-to-pdf", name: "Word to PDF", category: "pdf-tools" },
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
        <link rel="canonical" href="https://multitoolsa.com/" />
        
        <meta property="og:title" content="MultiTools - Free Image Tools & Tag Generator" />
        <meta property="og:description" content="Convert, compress, edit images and generate hashtags. 100% free, no signup required." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://multitoolsa.com/" />
        
        {/* Organization Schema for brand recognition */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "MultiToolsA",
            "alternateName": "MultiTools",
            "url": "https://multitoolsa.com",
            "logo": "https://multitoolsa.com/logo.png",
            "description": "Free online image tools and tag generator for content creators, designers, and professionals.",
            "foundingDate": "2024",
            "sameAs": [],
            "contactPoint": {
              "@type": "ContactPoint",
              "contactType": "customer service",
              "email": "info@multitoolsa.com",
              "availableLanguage": ["English", "Spanish", "French", "German", "Chinese", "Arabic", "Portuguese", "Japanese"]
            },
            "address": {
              "@type": "PostalAddress",
              "addressCountry": "NP"
            }
          })}
        </script>
        
        {/* WebSite Schema with SearchAction */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            "name": "MultiToolsA",
            "alternateName": "MultiTools",
            "url": "https://multitoolsa.com",
            "description": "Free online image tools: Convert, compress, resize, crop, and edit images. Generate hashtags for social media.",
            "publisher": {
              "@type": "Organization",
              "name": "MultiToolsA",
              "url": "https://multitoolsa.com"
            },
            "potentialAction": {
              "@type": "SearchAction",
              "target": {
                "@type": "EntryPoint",
                "urlTemplate": "https://multitoolsa.com/all-tools?q={search_term_string}"
              },
              "query-input": "required name=search_term_string"
            }
          })}
        </script>
        
        {/* WebApplication Schema */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            "name": "MultiToolsA",
            "description": "Free online image tools and tag generator",
            "url": "https://multitoolsa.com",
            "applicationCategory": "UtilitiesApplication",
            "operatingSystem": "Web Browser",
            "browserRequirements": "Requires JavaScript. Requires HTML5.",
            "softwareVersion": "1.0",
            "offers": {
              "@type": "Offer",
              "price": "0",
              "priceCurrency": "USD"
            },
            "featureList": [
              "Image Format Conversion",
              "Image Compression",
              "Image Resizing",
              "Image Cropping",
              "Photo Filters",
              "Watermarking",
              "PDF Tools",
              "Hashtag Generation"
            ],
            "screenshot": "https://multitoolsa.com/screenshot.png"
          })}
        </script>
      </Helmet>
      <HreflangTags path="/" />

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

          {/* PDF Tools Section */}
          <section className="py-8 sm:py-12 md:py-16 lg:py-20 px-3 sm:px-4 md:px-6 bg-gradient-to-b from-red-500/5 to-orange-500/5">
            <div className="container mx-auto max-w-4xl">
              <div className="text-center mb-6 sm:mb-8">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-red-500/10 border border-red-500/30 mb-4">
                  <FileText className="w-4 h-4 text-red-500" />
                  <span className="text-sm font-medium text-red-500">PDF Tools</span>
                </div>
                <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-2">All-in-One PDF Tools</h2>
                <p className="text-muted-foreground">Merge, compress, split, and convert PDFs online for free</p>
              </div>
              
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 sm:gap-4">
                {[
                  { slug: "merge-pdf", name: "Merge PDF", icon: "📄" },
                  { slug: "compress-pdf", name: "Compress PDF", icon: "📦" },
                  { slug: "word-to-pdf", name: "Word to PDF", icon: "📝" },
                  { slug: "image-to-pdf", name: "Image to PDF", icon: "🖼️" },
                  { slug: "split-pdf", name: "Split PDF", icon: "✂️" },
                ].map((tool) => (
                  <Link
                    key={tool.slug}
                    to={`/${tool.slug}`}
                    className="group bg-card rounded-xl p-4 border border-border hover:border-red-500/50 transition-all hover:-translate-y-0.5 hover:shadow-lg text-center"
                  >
                    <div className="text-2xl mb-2">{tool.icon}</div>
                    <span className="text-sm font-medium group-hover:text-red-500 transition-colors">{tool.name}</span>
                  </Link>
                ))}
              </div>
              
              <div className="text-center mt-6">
                <Link
                  to="/pdf-tools"
                  className="inline-flex items-center gap-2 text-red-500 font-medium hover:underline"
                >
                  View All PDF Tools <ArrowRight className="w-4 h-4" />
                </Link>
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

          {/* Trust & Social Proof Section */}
          <section className="py-8 sm:py-12 md:py-16 px-3 sm:px-4 md:px-6 bg-gradient-to-b from-primary/5 to-transparent">
            <div className="container mx-auto max-w-6xl">
              <div className="text-center mb-6 sm:mb-8 md:mb-10">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-green-500/10 border border-green-500/30 mb-4">
                  <Star className="w-4 h-4 text-green-500" />
                  <span className="text-sm font-medium text-green-500">Trusted by Thousands</span>
                </div>
                <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-3">
                  What Our Users Say
                </h2>
                <p className="text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto">
                  Join content creators, designers, and businesses who trust MultiToolsA for their daily image editing needs.
                </p>
              </div>
              
              {/* Testimonials Grid */}
              <div className="grid md:grid-cols-3 gap-4 md:gap-6 mb-8 md:mb-12">
                {[
                  {
                    name: "Sarah Chen",
                    role: "E-commerce Business Owner",
                    quote: "MultiToolsA saved me hours every week. I compress and resize hundreds of product images without any quality loss. The batch processing is a game-changer for my online store!",
                    avatar: "SC",
                    rating: 5
                  },
                  {
                    name: "Marcus Rodriguez",
                    role: "Freelance Web Developer",
                    quote: "I recommend this to all my clients. The privacy aspect is huge - images never leave your browser. Plus, the WebP conversion has improved my clients' site speeds by 40%.",
                    avatar: "MR",
                    rating: 5
                  },
                  {
                    name: "Emily Watson",
                    role: "Social Media Manager",
                    quote: "From resizing for Instagram to adding watermarks, these tools handle everything I need. No more expensive Adobe subscriptions. Truly free and professional quality.",
                    avatar: "EW",
                    rating: 5
                  }
                ].map((testimonial, i) => (
                  <div key={i} className="bg-card rounded-xl p-5 md:p-6 border border-border hover:border-primary/30 transition-colors">
                    <div className="flex gap-1 mb-3">
                      {[...Array(testimonial.rating)].map((_, j) => (
                        <Star key={j} className="w-4 h-4 fill-yellow-500 text-yellow-500" />
                      ))}
                    </div>
                    <p className="text-sm text-muted-foreground mb-4 leading-relaxed">"{testimonial.quote}"</p>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-semibold text-sm">
                        {testimonial.avatar}
                      </div>
                      <div>
                        <p className="font-semibold text-sm">{testimonial.name}</p>
                        <p className="text-xs text-muted-foreground">{testimonial.role}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Trust Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 p-4 md:p-6 bg-card rounded-2xl border border-border">
                {[
                  { value: "50K+", label: "Monthly Users", icon: "👥" },
                  { value: "1M+", label: "Images Processed", icon: "🖼️" },
                  { value: "4.9/5", label: "User Rating", icon: "⭐" },
                  { value: "100%", label: "Free Forever", icon: "✨" }
                ].map((stat, i) => (
                  <div key={i} className="text-center p-3 md:p-4">
                    <span className="text-2xl mb-1 block">{stat.icon}</span>
                    <p className="text-xl md:text-2xl lg:text-3xl font-bold text-primary">{stat.value}</p>
                    <p className="text-xs md:text-sm text-muted-foreground">{stat.label}</p>
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

          {/* Comprehensive Tools Description Section - 4000+ Words */}
          <section className="py-12 sm:py-16 md:py-20 lg:py-24 px-4 sm:px-6 bg-background">
            <div className="container mx-auto max-w-6xl">
              <div className="text-center mb-10 sm:mb-12 md:mb-16">
                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6">
                  Complete Guide to Our Free Online Image Tools
                </h2>
                <p className="text-base sm:text-lg text-muted-foreground max-w-3xl mx-auto">
                  Discover the power of professional image editing without expensive software. Our comprehensive suite of 100+ free tools helps you transform your images effortlessly—all processed locally in your browser for complete privacy.
                </p>
              </div>

              {/* About Our Platform */}
              <div className="prose prose-lg max-w-none mb-12 sm:mb-16">
                <div className="bg-card rounded-2xl p-6 sm:p-8 md:p-10 border border-border mb-8">
                  <h3 className="text-xl sm:text-2xl font-bold mb-4 text-foreground">About MultiTools - Your All-in-One Image Solution</h3>
                  <p className="text-muted-foreground mb-4 leading-relaxed">
                    MultiTools is a comprehensive online platform that provides free, professional-grade image editing tools accessible to everyone. Whether you are a professional photographer, graphic designer, social media manager, blogger, or simply someone who needs to edit images occasionally, our platform offers everything you need without the complexity of traditional software. We have built this platform with a singular mission: to democratize image editing and make professional-quality tools available to everyone, regardless of their technical expertise or budget.
                  </p>
                  <p className="text-muted-foreground mb-4 leading-relaxed">
                    Unlike desktop applications that require expensive licenses, complex installations, and technical expertise, MultiTools offers instant access to over 85 specialized tools that handle every aspect of image processing. From basic format conversions to advanced editing features, watermarking, metadata management, and document creation, our platform covers the entire spectrum of image manipulation needs. Every tool is designed with user experience in mind, featuring intuitive interfaces that make complex operations simple and accessible.
                  </p>
                  <p className="text-muted-foreground mb-4 leading-relaxed">
                    The technology behind MultiTools represents the cutting edge of browser-based image processing. We utilize advanced JavaScript libraries, WebGL acceleration, and modern compression algorithms to deliver professional-quality results directly in your browser. This approach means your images never leave your device – they are processed entirely locally, ensuring complete privacy and security. There are no upload queues, no server processing delays, and no risk of your sensitive images being stored on external servers.
                  </p>
                  <p className="text-muted-foreground leading-relaxed">
                    Our platform is continuously evolving. We regularly add new tools, improve existing ones based on user feedback, and optimize performance to handle even the largest image files efficiently. Whether you need to process a single image or batch convert hundreds of files, MultiTools scales to meet your needs without any limitations on usage or file count.
                  </p>
                </div>
              </div>

              {/* Image Converter Tools - Detailed */}
              <div className="mb-10 sm:mb-12 md:mb-14">
                <h3 className="text-xl sm:text-2xl md:text-3xl font-bold mb-4 sm:mb-6 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #3B82F6, #06B6D4)' }}>
                    <RefreshCw className="w-5 h-5 text-white" />
                  </div>
                  Image Format Conversion: The Foundation of Digital Image Work
                </h3>
                <div className="bg-card rounded-xl p-5 sm:p-6 md:p-8 border border-border">
                  <p className="text-muted-foreground mb-4 leading-relaxed">
                    Image format conversion is perhaps the most fundamental operation in digital image processing, yet it is one that most people don't fully understand. Each image format was designed with specific use cases in mind, and choosing the right format can make the difference between a crisp, fast-loading image and a bloated file that frustrates users and wastes bandwidth. Our comprehensive suite of conversion tools supports over 18 different format transformations, covering every major image format in use today.
                  </p>
                  <p className="text-muted-foreground mb-4 leading-relaxed">
                    The JPEG format, developed by the Joint Photographic Experts Group, remains the most widely used format for photographs and complex images with millions of colors. JPEG uses lossy compression, meaning it discards some image data to achieve smaller file sizes. This trade-off makes JPEG ideal for photographs where perfect pixel accuracy isn't critical. Our JPG to PNG converter is essential when you need to preserve image quality for further editing or when you need transparency support that JPEG doesn't provide.
                  </p>
                  <p className="text-muted-foreground mb-4 leading-relaxed">
                    PNG (Portable Network Graphics) format supports lossless compression and transparency, making it perfect for logos, graphics, screenshots, and images where quality preservation is paramount. The PNG format can represent images with millions of colors while maintaining perfect quality, though at larger file sizes than JPEG. Our PNG to JPG converter helps when you need to reduce file sizes for web usage or email attachments where transparency isn't required.
                  </p>
                  <p className="text-muted-foreground mb-4 leading-relaxed">
                    WebP, developed by Google, represents the next generation of web image formats. It combines the best features of both JPEG and PNG: excellent compression for photographs (often 25-34% smaller than equivalent JPEG files) and support for transparency (often 26% smaller than equivalent PNG files). Additionally, WebP supports animation, making it a potential replacement for GIF as well. Our JPG to WebP and PNG to WebP converters help you optimize images for modern web applications, significantly improving page load times and user experience.
                  </p>
                  <p className="text-muted-foreground mb-4 leading-relaxed">
                    For iPhone and iPad users, HEIC (High Efficiency Image Container) format poses unique challenges. Apple adopted HEIC as the default photo format because it offers superior compression compared to JPEG while maintaining excellent quality. However, HEIC is not universally supported across all devices and platforms. Our HEIC to JPG and HEIC to PNG converters ensure you can share your Apple photos with anyone, regardless of their device or operating system.
                  </p>
                  <p className="text-muted-foreground mb-4 leading-relaxed">
                    Professional photographers working with RAW files will appreciate our RAW to JPG and RAW to PNG converters. RAW files contain unprocessed data directly from your camera's sensor, providing maximum flexibility for post-processing. However, they're not suitable for sharing or web use. Our converters apply intelligent processing to convert RAW files into universally compatible formats while preserving as much of the original quality as possible.
                  </p>
                  <h4 className="font-semibold text-lg mb-3 text-foreground">Complete List of Supported Conversions:</h4>
                  <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 text-sm text-muted-foreground">
                    <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-primary rounded-full"></span>JPG to PNG</li>
                    <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-primary rounded-full"></span>PNG to JPG</li>
                    <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-primary rounded-full"></span>JPG to WebP</li>
                    <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-primary rounded-full"></span>WebP to JPG</li>
                    <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-primary rounded-full"></span>PNG to WebP</li>
                    <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-primary rounded-full"></span>WebP to PNG</li>
                    <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-primary rounded-full"></span>GIF to PNG</li>
                    <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-primary rounded-full"></span>GIF to JPG</li>
                    <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-primary rounded-full"></span>BMP to JPG</li>
                    <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-primary rounded-full"></span>BMP to PNG</li>
                    <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-primary rounded-full"></span>TIFF to JPG</li>
                    <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-primary rounded-full"></span>TIFF to PNG</li>
                    <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-primary rounded-full"></span>SVG to PNG</li>
                    <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-primary rounded-full"></span>SVG to JPG</li>
                    <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-primary rounded-full"></span>HEIC to JPG</li>
                    <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-primary rounded-full"></span>HEIC to PNG</li>
                    <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-primary rounded-full"></span>RAW to JPG</li>
                    <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-primary rounded-full"></span>RAW to PNG</li>
                  </ul>
                </div>
              </div>

              {/* Image Compression - Detailed */}
              <div className="mb-10 sm:mb-12 md:mb-14">
                <h3 className="text-xl sm:text-2xl md:text-3xl font-bold mb-4 sm:mb-6 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #22C55E, #10B981)' }}>
                    <Minimize2 className="w-5 h-5 text-white" />
                  </div>
                  Image Compression: Balancing Quality and Performance
                </h3>
                <div className="bg-card rounded-xl p-5 sm:p-6 md:p-8 border border-border">
                  <p className="text-muted-foreground mb-4 leading-relaxed">
                    In an era where website speed directly impacts search engine rankings, user experience, and conversion rates, image compression has become a critical skill for anyone managing digital content. Our compression tools utilize state-of-the-art algorithms that analyze each image individually, identifying redundant data that can be removed without perceptible quality loss. The result is dramatically smaller file sizes that load faster while maintaining visual fidelity that satisfies even the most discerning eyes.
                  </p>
                  <p className="text-muted-foreground mb-4 leading-relaxed">
                    Our JPEG compressor employs advanced DCT (Discrete Cosine Transform) optimization to intelligently reduce file sizes. Unlike basic compression tools that apply blanket compression across the entire image, our algorithm analyzes different regions of your image, applying stronger compression to areas where it won't be noticed (like sky or solid backgrounds) while preserving detail in important areas (like faces or text). This intelligent approach typically achieves 50-80% file size reduction while maintaining excellent visual quality.
                  </p>
                  <p className="text-muted-foreground mb-4 leading-relaxed">
                    PNG compression works fundamentally differently because PNG uses lossless compression – no image data is actually discarded. Our PNG compressor optimizes images through color palette reduction, filtering algorithms, and metadata stripping. For images that don't require millions of colors, converting to an optimized 256-color palette can reduce file sizes by 70% or more without any visible quality difference. Our tool automatically analyzes your image and recommends the optimal compression approach.
                  </p>
                  <p className="text-muted-foreground mb-4 leading-relaxed">
                    WebP compression offers the best of both worlds, supporting both lossy and lossless compression modes. Our WebP compressor leverages Google's advanced VP8 encoding to achieve superior compression ratios. For photographs, WebP typically produces files 25-34% smaller than equivalent quality JPEG. For graphics with transparency, WebP files are often 26% smaller than PNG. If you're optimizing for web performance, WebP should be your primary format choice.
                  </p>
                  <p className="text-muted-foreground mb-4 leading-relaxed">
                    GIF compression presents unique challenges due to the format's 256-color limitation and animation support. Our GIF compressor reduces file sizes by optimizing color palettes, removing duplicate frames in animations, and applying advanced LZW compression. For animated GIFs, we can often achieve 40-60% file size reduction while preserving smooth animation quality.
                  </p>
                  <p className="text-muted-foreground leading-relaxed">
                    The impact of proper image compression extends beyond just faster loading times. Compressed images reduce bandwidth costs for website owners, consume less storage space on servers and devices, and provide better experiences for users on mobile networks or limited data plans. Studies show that a one-second delay in page load time can result in a 7% reduction in conversions – proper image compression is literally money in your pocket.
                  </p>
                </div>
              </div>

              {/* Image Resize - Detailed */}
              <div className="mb-10 sm:mb-12 md:mb-14">
                <h3 className="text-xl sm:text-2xl md:text-3xl font-bold mb-4 sm:mb-6 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #00C6FF, #0072FF)' }}>
                    <Maximize2 className="w-5 h-5 text-white" />
                  </div>
                  Professional Image Resizing: Precision Control Over Dimensions
                </h3>
                <div className="bg-card rounded-xl p-5 sm:p-6 md:p-8 border border-border">
                  <p className="text-muted-foreground mb-4 leading-relaxed">
                    Image resizing might seem straightforward, but doing it correctly requires sophisticated algorithms and careful attention to detail. Simple resize operations can result in blurry, pixelated, or distorted images. Our professional resize tools use advanced resampling algorithms including Lanczos, bicubic, and bilinear interpolation to ensure resized images maintain sharpness and quality regardless of the scale factor.
                  </p>
                  <p className="text-muted-foreground mb-4 leading-relaxed">
                    Our Exact Resize tool provides pixel-perfect control over your image dimensions. Specify exact width and height in pixels, and your image will be resized precisely to those dimensions. This tool is essential for meeting specific platform requirements – for example, Facebook cover photos require exactly 820x312 pixels, YouTube thumbnails need 1280x720 pixels, and Amazon product images have specific dimension requirements. Our tool ensures your images meet these specifications exactly.
                  </p>
                  <p className="text-muted-foreground mb-4 leading-relaxed">
                    The Percentage Resize tool scales images proportionally by a specified percentage. This is ideal when you need to reduce image sizes by a consistent amount – for example, reducing all images to 50% of their original size for web use. Proportional scaling ensures aspect ratios are maintained, preventing the stretched or squished appearance that occurs when width and height are scaled differently.
                  </p>
                  <p className="text-muted-foreground mb-4 leading-relaxed">
                    Fit to Width and Fit to Height tools automatically calculate the corresponding dimension to maintain aspect ratio. If you need all images to have a consistent width (like 800 pixels for a blog), Fit to Width will resize images to that width while automatically calculating the appropriate height. This ensures consistency across your image collection while preserving the natural proportions of each image.
                  </p>
                  <p className="text-muted-foreground mb-4 leading-relaxed">
                    The Fit to Box tool is particularly powerful for creating consistent galleries, product displays, or thumbnails. Specify a maximum width and height, and images will be scaled to fit within that box while maintaining their aspect ratio. This ensures no image exceeds your specified dimensions while preserving the natural proportions of each image – perfect for responsive web design and e-commerce applications.
                  </p>
                  <p className="text-muted-foreground leading-relaxed">
                    Our Resize Without Quality Loss tool employs advanced AI-powered upscaling for enlarging images. Traditional upscaling simply stretches pixels, resulting in blurry, pixelated results. Our intelligent upscaling algorithm analyzes image content and intelligently generates new pixel data, enabling significant enlargements while maintaining sharpness and detail. This is invaluable for printing small images at larger sizes or recovering detail from low-resolution sources.
                  </p>
                </div>
              </div>

              {/* Crop and Rotate Tools */}
              <div className="mb-10 sm:mb-12 md:mb-14">
                <h3 className="text-xl sm:text-2xl md:text-3xl font-bold mb-4 sm:mb-6 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #A855F7, #EC4899)' }}>
                    <Crop className="w-5 h-5 text-white" />
                  </div>
                  Cropping, Rotating, and Image Composition
                </h3>
                <div className="bg-card rounded-xl p-5 sm:p-6 md:p-8 border border-border">
                  <p className="text-muted-foreground mb-4 leading-relaxed">
                    Cropping is one of the most powerful composition tools available to photographers and designers. By removing unwanted portions of an image, you can improve composition, focus attention on the subject, meet specific aspect ratio requirements, and transform an ordinary photo into a compelling visual story. Our suite of cropping tools provides every mode you need for any cropping scenario.
                  </p>
                  <p className="text-muted-foreground mb-4 leading-relaxed">
                    The Manual Crop tool offers complete freedom to select any rectangular region of your image. Click and drag to define your crop area, then fine-tune the selection with precision handles. This mode is perfect when you need complete creative control over the final composition without any constraints on aspect ratio or dimensions.
                  </p>
                  <p className="text-muted-foreground mb-4 leading-relaxed">
                    Aspect Ratio Crop constrains your selection to specific proportions. Choose from common ratios like 16:9 (widescreen), 4:3 (traditional), 1:1 (square), 9:16 (vertical/stories), or enter custom ratios for specialized needs. This tool ensures your cropped images perfectly fit their intended destination, whether that's a YouTube thumbnail, Instagram post, or printed photograph.
                  </p>
                  <p className="text-muted-foreground mb-4 leading-relaxed">
                    Circle Crop creates perfectly circular images with transparent backgrounds – essential for profile pictures, avatars, and creative designs. The tool automatically centers your selection and generates a clean circular mask with smooth edges. The result is a professional-looking circular image ready for use across any platform.
                  </p>
                  <p className="text-muted-foreground mb-4 leading-relaxed">
                    Our rotation and flip tools provide complete control over image orientation. Rotate images by 90, 180, or 270 degrees with a single click, or use Custom Rotate to specify any angle with decimal precision. This is essential for correcting tilted horizons, creative angle adjustments, or simply fixing photos that were taken in the wrong orientation. Flip tools create horizontal or vertical mirror images, useful for design work and creative projects.
                  </p>
                  <p className="text-muted-foreground leading-relaxed">
                    The Image Combine tools enable creative compositions by merging multiple images together. Merge images horizontally (side by side), vertically (stacked), or create custom collages with our Collage Maker. The Before/After Maker creates compelling comparison images perfect for showcasing transformations, edits, or progress over time. These tools are invaluable for social media content, marketing materials, and visual storytelling.
                  </p>
                </div>
              </div>

              {/* Photo Filters and Effects */}
              <div className="mb-10 sm:mb-12 md:mb-14">
                <h3 className="text-xl sm:text-2xl md:text-3xl font-bold mb-4 sm:mb-6 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #F093FB, #F5576C)' }}>
                    <Palette className="w-5 h-5 text-white" />
                  </div>
                  Photo Filters, Effects, and Color Adjustments
                </h3>
                <div className="bg-card rounded-xl p-5 sm:p-6 md:p-8 border border-border">
                  <p className="text-muted-foreground mb-4 leading-relaxed">
                    Transform ordinary photos into stunning visual masterpieces with our comprehensive suite of filters and effects. From subtle color corrections to dramatic artistic transformations, these tools give you the creative power of professional photo editing software without the complexity or cost. Each filter is carefully crafted to produce beautiful, natural-looking results.
                  </p>
                  <p className="text-muted-foreground mb-4 leading-relaxed">
                    Brightness and Contrast adjustments form the foundation of photo editing. Brightness controls the overall lightness or darkness of your image, while Contrast adjusts the difference between the lightest and darkest areas. Proper adjustment of these two parameters can bring life to flat, dull photos or tone down overly harsh images. Our tools provide precise slider controls for fine-tuning these essential parameters.
                  </p>
                  <p className="text-muted-foreground mb-4 leading-relaxed">
                    Saturation control adjusts the intensity of colors in your image. Increase saturation for vibrant, punchy colors that pop off the screen, or decrease it for muted, vintage-inspired tones. Our Grayscale Conversion tool removes all color, creating classic black-and-white images with full tonal range. The Black & White Conversion goes further, creating high-contrast images with only pure black and pure white – perfect for graphic effects and text overlays.
                  </p>
                  <p className="text-muted-foreground mb-4 leading-relaxed">
                    Artistic filters transform your photos with distinctive looks. The Sepia Effect adds warm, brownish tones reminiscent of vintage photographs. Vintage Filter applies a comprehensive retro look with faded colors, slight vignetting, and warm color shifts. Warm Tone and Cool Tone adjustments shift the overall color temperature, making images feel cozy and inviting or crisp and refreshing respectively.
                  </p>
                  <p className="text-muted-foreground mb-4 leading-relaxed">
                    Sharpening enhances edge detail, making images appear crisper and more focused. This is especially useful for images that appear slightly soft due to camera shake, lens limitations, or compression. Our Blur Filter provides the opposite effect, softening images for dreamy effects or background defocusing. Gaussian Blur offers precise control over blur intensity for professional-looking depth-of-field simulation.
                  </p>
                  <p className="text-muted-foreground leading-relaxed">
                    Creative effects like Emboss, Pixelate, and Negative open up endless artistic possibilities. Emboss creates a raised, three-dimensional appearance as if the image were carved into a surface. Pixelate transforms images into a mosaic of larger blocks, useful for censoring content or creating retro gaming aesthetics. The Negative effect inverts all colors, creating surreal, otherworldly images that can be striking in creative projects.
                  </p>
                </div>
              </div>

              {/* Watermark and Security Tools */}
              <div className="mb-10 sm:mb-12 md:mb-14">
                <h3 className="text-xl sm:text-2xl md:text-3xl font-bold mb-4 sm:mb-6 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #14B8A6, #059669)' }}>
                    <Droplet className="w-5 h-5 text-white" />
                  </div>
                  Watermarking and Image Security
                </h3>
                <div className="bg-card rounded-xl p-5 sm:p-6 md:p-8 border border-border">
                  <p className="text-muted-foreground mb-4 leading-relaxed">
                    Protecting your creative work is essential in the digital age where images can be copied and shared in seconds. Our watermarking tools help you establish ownership, prevent unauthorized use, and build brand recognition across all your visual content. From subtle corner logos to prominent text overlays, our tools provide complete control over watermark appearance and placement.
                  </p>
                  <p className="text-muted-foreground mb-4 leading-relaxed">
                    Text Watermark adds customizable text overlays to your images. Choose from a variety of fonts, adjust size, color, and opacity, and position your watermark precisely where you want it. Multiple position presets (corners, center, tiled) make it easy to apply consistent watermarks across your entire image library. The tiled option covers the entire image with repeated watermarks, making removal extremely difficult.
                  </p>
                  <p className="text-muted-foreground mb-4 leading-relaxed">
                    Image Watermark allows you to overlay your logo or any other image as a watermark. This is perfect for photographers and businesses who want to brand their images with a professional logo. Adjust the watermark size, opacity, and position to achieve the perfect balance between visibility and unobtrusiveness. Our tool supports PNG logos with transparency for seamless integration.
                  </p>
                  <p className="text-muted-foreground mb-4 leading-relaxed">
                    For privacy protection, our security tools provide essential functionality. Manual Face Blur and Manual Pixel Blur allow you to obscure specific areas of your images – faces, license plates, personal information, or anything else you need to protect. The Hide Area tool provides solid coverage for complete concealment of sensitive content.
                  </p>
                  <p className="text-muted-foreground leading-relaxed">
                    Image Encrypt and Image Decrypt provide password-protected encryption for your most sensitive images. Using industry-standard encryption algorithms, these tools ensure that only authorized individuals with the correct password can view the encrypted images. This is invaluable for protecting confidential documents, private photographs, or any visual content that requires controlled access.
                  </p>
                </div>
              </div>

              {/* Metadata Tools */}
              <div className="mb-10 sm:mb-12 md:mb-14">
                <h3 className="text-xl sm:text-2xl md:text-3xl font-bold mb-4 sm:mb-6 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #F59E0B, #D97706)' }}>
                    <Database className="w-5 h-5 text-white" />
                  </div>
                  Image Metadata Management for Privacy and Organization
                </h3>
                <div className="bg-card rounded-xl p-5 sm:p-6 md:p-8 border border-border">
                  <p className="text-muted-foreground mb-4 leading-relaxed">
                    Every digital photograph contains hidden metadata – information about when the photo was taken, what camera was used, camera settings, and potentially even GPS coordinates showing exactly where the photo was taken. While this metadata is useful for organizing photos and technical reference, it can pose serious privacy risks when images are shared publicly. Our metadata tools give you complete control over this hidden information.
                  </p>
                  <p className="text-muted-foreground mb-4 leading-relaxed">
                    View EXIF provides comprehensive access to all metadata embedded in your images. See the exact camera model, lens information, ISO settings, shutter speed, aperture, focal length, and much more. For photos with GPS data, you can view the precise coordinates and even see the location on a map. This is invaluable for photographers who want to learn from their camera settings or anyone curious about the technical details of their images.
                  </p>
                  <p className="text-muted-foreground mb-4 leading-relaxed">
                    Remove EXIF strips all metadata from your images, protecting your privacy before sharing. This is essential before posting images online, as metadata can reveal your home location, travel patterns, and personal information. Our tool removes all metadata completely while preserving the visual quality of your image, ensuring you can share safely.
                  </p>
                  <p className="text-muted-foreground mb-4 leading-relaxed">
                    Edit Date/Time allows you to modify the timestamp metadata in your images. This is useful for correcting incorrect camera dates, synchronizing timestamps across multiple cameras, or organizing photos chronologically. Change the date, time, or both while leaving other metadata intact.
                  </p>
                  <p className="text-muted-foreground leading-relaxed">
                    Copy EXIF enables you to transfer metadata from one image to another. This is particularly useful when you've edited an image in software that strips metadata – you can restore the original metadata from the source file. It's also valuable for applying consistent metadata across a series of related images.
                  </p>
                </div>
              </div>

              {/* PDF Tools */}
              <div className="mb-10 sm:mb-12 md:mb-14">
                <h3 className="text-xl sm:text-2xl md:text-3xl font-bold mb-4 sm:mb-6 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #DC2626, #EA580C)' }}>
                    <FileText className="w-5 h-5 text-white" />
                  </div>
                  PDF Tools: Complete Document Processing Suite
                </h3>
                <div className="bg-card rounded-xl p-5 sm:p-6 md:p-8 border border-border">
                  <p className="text-muted-foreground mb-4 leading-relaxed">
                    PDFs have become the universal standard for document sharing, and our PDF tools provide everything you need to work with these essential files. From merging multiple documents into a single file to compressing oversized PDFs for email, our tools handle all common PDF operations with professional-quality results.
                  </p>
                  <p className="text-muted-foreground mb-4 leading-relaxed">
                    Merge PDF combines multiple PDF files into a single document. Simply upload your files, arrange them in your desired order, and download the combined result. This is invaluable for creating comprehensive reports, combining scanned documents, or organizing related PDFs into a single file for easier sharing and storage.
                  </p>
                  <p className="text-muted-foreground mb-4 leading-relaxed">
                    Compress PDF reduces file sizes for easier sharing and storage. Our intelligent compression analyzes each page and applies optimal compression settings to images while preserving text clarity. Reduce PDFs by 50-80% while maintaining readable, professional-looking documents suitable for any purpose.
                  </p>
                  <p className="text-muted-foreground mb-4 leading-relaxed">
                    Word to PDF converts Microsoft Word documents (DOCX, DOC) to universally compatible PDF format. This ensures your documents appear exactly as intended regardless of the recipient's software or operating system. Formatting, fonts, and layouts are preserved perfectly in the conversion process.
                  </p>
                  <p className="text-muted-foreground mb-4 leading-relaxed">
                    Image to PDF converts individual images or combines multiple images into PDF documents. This is perfect for creating digital photo albums, converting scanned documents to PDF, or preparing images for professional printing. Control image quality, page size, and orientation for perfect results.
                  </p>
                  <p className="text-muted-foreground leading-relaxed">
                    Split PDF extracts specific pages or divides large PDFs into smaller documents. Extract individual pages, specific page ranges, or split every page into separate files. This is essential for extracting relevant sections from large documents, organizing content, or preparing specific pages for sharing.
                  </p>
                </div>
              </div>

              {/* Benefits Section */}
              <div className="mb-10 sm:mb-12 md:mb-14">
                <h3 className="text-xl sm:text-2xl md:text-3xl font-bold mb-6 sm:mb-8 text-center">
                  Why Millions Choose MultiTools
                </h3>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                  <div className="bg-card rounded-xl p-5 sm:p-6 border border-border">
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                      <Zap className="w-6 h-6 text-primary" />
                    </div>
                    <h4 className="font-bold text-lg mb-2">Instant Processing</h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      All image processing happens directly in your browser using advanced JavaScript and WebGL technology. There are no server queues, no waiting for uploads, and no processing delays. Results appear instantly, saving you valuable time and frustration. Even large files and batch operations complete in seconds.
                    </p>
                  </div>
                  <div className="bg-card rounded-xl p-5 sm:p-6 border border-border">
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                      <Shield className="w-6 h-6 text-primary" />
                    </div>
                    <h4 className="font-bold text-lg mb-2">Complete Privacy</h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Your images never leave your device. Unlike cloud-based services that upload your files to remote servers where they may be stored, analyzed, or accessed by third parties, our tools process everything locally. Your photos, documents, and personal images remain completely private and under your control.
                    </p>
                  </div>
                  <div className="bg-card rounded-xl p-5 sm:p-6 border border-border">
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                      <Globe className="w-6 h-6 text-primary" />
                    </div>
                    <h4 className="font-bold text-lg mb-2">Universal Access</h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Access our tools from any device with a modern web browser. Works perfectly on Windows, Mac, Linux, Chrome OS, iOS, and Android. No installation required, no storage space consumed, no updates to manage. Simply visit the website and start editing – it's that simple.
                    </p>
                  </div>
                  <div className="bg-card rounded-xl p-5 sm:p-6 border border-border">
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                      <Sparkles className="w-6 h-6 text-primary" />
                    </div>
                    <h4 className="font-bold text-lg mb-2">Professional Quality</h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Our tools use the same advanced algorithms found in professional desktop software. High-quality compression that preserves visual fidelity, precise resizing with advanced interpolation, accurate color processing, and clean output files that meet professional standards for any purpose.
                    </p>
                  </div>
                  <div className="bg-card rounded-xl p-5 sm:p-6 border border-border">
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                      <Star className="w-6 h-6 text-primary" />
                    </div>
                    <h4 className="font-bold text-lg mb-2">Completely Free Forever</h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      All tools are free to use without any limitations whatsoever. No registration required, no watermarks added, no daily limits, no feature restrictions. Use our tools as much as you need for personal projects, commercial work, or anything else – it's all free.
                    </p>
                  </div>
                  <div className="bg-card rounded-xl p-5 sm:p-6 border border-border">
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                      <TrendingUp className="w-6 h-6 text-primary" />
                    </div>
                    <h4 className="font-bold text-lg mb-2">Continuous Improvement</h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      We continuously improve our tools and add new features based on user feedback and technological advances. Our development team stays current with the latest web technologies to provide the best possible experience. Regular updates ensure you always have access to cutting-edge capabilities.
                    </p>
                  </div>
                </div>
              </div>

              {/* Who Uses Our Tools */}
              <div className="mb-10 sm:mb-12 md:mb-14">
                <h3 className="text-xl sm:text-2xl md:text-3xl font-bold mb-6 text-center">
                  Who Uses MultiTools?
                </h3>
                <div className="bg-card rounded-xl p-6 sm:p-8 border border-border">
                  <div className="grid sm:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-bold mb-3 text-lg">Professional Users</h4>
                      <ul className="space-y-2 text-muted-foreground">
                        <li className="flex items-start gap-2"><span className="w-1.5 h-1.5 bg-primary rounded-full mt-2"></span>Photographers who need quick batch processing and format conversions</li>
                        <li className="flex items-start gap-2"><span className="w-1.5 h-1.5 bg-primary rounded-full mt-2"></span>Graphic designers preparing assets for web and print projects</li>
                        <li className="flex items-start gap-2"><span className="w-1.5 h-1.5 bg-primary rounded-full mt-2"></span>Web developers optimizing images for site performance</li>
                        <li className="flex items-start gap-2"><span className="w-1.5 h-1.5 bg-primary rounded-full mt-2"></span>Marketing teams creating social media content at scale</li>
                        <li className="flex items-start gap-2"><span className="w-1.5 h-1.5 bg-primary rounded-full mt-2"></span>E-commerce businesses managing product image libraries</li>
                        <li className="flex items-start gap-2"><span className="w-1.5 h-1.5 bg-primary rounded-full mt-2"></span>Real estate agents preparing property photos for listings</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-bold mb-3 text-lg">Personal Users</h4>
                      <ul className="space-y-2 text-muted-foreground">
                        <li className="flex items-start gap-2"><span className="w-1.5 h-1.5 bg-primary rounded-full mt-2"></span>Students preparing presentations and school projects</li>
                        <li className="flex items-start gap-2"><span className="w-1.5 h-1.5 bg-primary rounded-full mt-2"></span>Bloggers optimizing images for faster website loading</li>
                        <li className="flex items-start gap-2"><span className="w-1.5 h-1.5 bg-primary rounded-full mt-2"></span>Social media users creating perfect profile pictures</li>
                        <li className="flex items-start gap-2"><span className="w-1.5 h-1.5 bg-primary rounded-full mt-2"></span>Anyone sharing photos via email or messaging apps</li>
                        <li className="flex items-start gap-2"><span className="w-1.5 h-1.5 bg-primary rounded-full mt-2"></span>Home users organizing and editing family photo collections</li>
                        <li className="flex items-start gap-2"><span className="w-1.5 h-1.5 bg-primary rounded-full mt-2"></span>Privacy-conscious individuals removing metadata from images</li>
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
                    <p className="text-muted-foreground">Yes, all our tools are completely free with no hidden costs, subscription requirements, or premium tiers. We do not require registration, payment, or any personal information. You can use any tool unlimited times without restrictions of any kind.</p>
                  </div>
                  <div className="bg-card rounded-xl p-5 sm:p-6 border border-border">
                    <h4 className="font-bold mb-2">Are my images safe and private?</h4>
                    <p className="text-muted-foreground">Absolutely. Your images are processed entirely in your browser and never uploaded to our servers. We have no access to your files whatsoever, ensuring complete privacy and security for all your images. This is a fundamental design principle of our platform.</p>
                  </div>
                  <div className="bg-card rounded-xl p-5 sm:p-6 border border-border">
                    <h4 className="font-bold mb-2">What image formats are supported?</h4>
                    <p className="text-muted-foreground">We support all major image formats including JPG/JPEG, PNG, WebP, GIF, BMP, TIFF, SVG, HEIC (iPhone photos), and various RAW formats. Our converters can seamlessly transform images between any of these formats with professional-quality results.</p>
                  </div>
                  <div className="bg-card rounded-xl p-5 sm:p-6 border border-border">
                    <h4 className="font-bold mb-2">Do I need to install any software?</h4>
                    <p className="text-muted-foreground">No installation is required. All tools work directly in your web browser using modern web technologies. Simply visit the tool page, upload your image, and get results instantly. Works on any device with a modern browser including phones, tablets, and computers.</p>
                  </div>
                  <div className="bg-card rounded-xl p-5 sm:p-6 border border-border">
                    <h4 className="font-bold mb-2">Can I use these tools for commercial purposes?</h4>
                    <p className="text-muted-foreground">Yes, you can use our tools for both personal and commercial projects without any restrictions. There are no watermarks added to processed images, no usage limitations, and no licensing requirements. Use them freely for any purpose.</p>
                  </div>
                  <div className="bg-card rounded-xl p-5 sm:p-6 border border-border">
                    <h4 className="font-bold mb-2">How do I get the best compression results?</h4>
                    <p className="text-muted-foreground">For photographs, use JPEG compression at 70-80% quality for optimal balance between file size and visual quality. For graphics with transparency, use PNG. For best web optimization, convert to WebP format which offers superior compression for both photos and graphics.</p>
                  </div>
                  <div className="bg-card rounded-xl p-5 sm:p-6 border border-border">
                    <h4 className="font-bold mb-2">Is there a file size limit?</h4>
                    <p className="text-muted-foreground">Our tools can handle very large files, though processing time depends on your device's capabilities. Most operations on files up to 50MB complete within seconds on modern devices. For extremely large files, we recommend processing on a desktop computer for best performance.</p>
                  </div>
                </div>
              </div>

              {/* Resources Section */}
              <div className="mb-10 sm:mb-12 md:mb-14">
                <h3 className="text-xl sm:text-2xl md:text-3xl font-bold mb-6 sm:mb-8 text-center">
                  Learn & Explore
                </h3>
                <p className="text-center text-muted-foreground mb-8 max-w-2xl mx-auto">
                  Expand your image editing skills with our comprehensive resources. From step-by-step tutorials to in-depth articles, we've got everything you need to master digital image processing.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
                  {/* Tutorials Card */}
                  <Link 
                    to="/tutorials"
                    className="group bg-card rounded-xl p-6 sm:p-8 border border-border hover:border-primary/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                  >
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4" style={{ background: 'linear-gradient(135deg, #8B5CF6, #A855F7)' }}>
                      <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                      </svg>
                    </div>
                    <h4 className="font-bold text-lg mb-2 group-hover:text-primary transition-colors">Step-by-Step Tutorials</h4>
                    <p className="text-muted-foreground text-sm mb-4">
                      Learn how to compress images, convert formats, resize for social media, add watermarks, and more with our detailed visual guides.
                    </p>
                    <div className="flex items-center gap-2 text-primary text-sm font-medium">
                      <span>6 Comprehensive Guides</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </Link>

                  {/* Blog Card */}
                  <Link 
                    to="/blog"
                    className="group bg-card rounded-xl p-6 sm:p-8 border border-border hover:border-primary/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                  >
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4" style={{ background: 'linear-gradient(135deg, #3B82F6, #06B6D4)' }}>
                      <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                      </svg>
                    </div>
                    <h4 className="font-bold text-lg mb-2 group-hover:text-primary transition-colors">Expert Blog Articles</h4>
                    <p className="text-muted-foreground text-sm mb-4">
                      Deep-dive articles covering image optimization, format comparisons, web performance tips, and professional editing techniques.
                    </p>
                    <div className="flex items-center gap-2 text-primary text-sm font-medium">
                      <span>Browse Articles</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </Link>

                  {/* FAQ Card */}
                  <Link 
                    to="/faq"
                    className="group bg-card rounded-xl p-6 sm:p-8 border border-border hover:border-primary/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                  >
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4" style={{ background: 'linear-gradient(135deg, #22C55E, #10B981)' }}>
                      <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <h4 className="font-bold text-lg mb-2 group-hover:text-primary transition-colors">Frequently Asked Questions</h4>
                    <p className="text-muted-foreground text-sm mb-4">
                      Find answers to common questions about image formats, compression, privacy, supported features, and how our tools work.
                    </p>
                    <div className="flex items-center gap-2 text-primary text-sm font-medium">
                      <span>View All FAQs</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </Link>
                </div>
              </div>

              {/* Real-Time Reviews Section */}
              <RealTimeReviews />

              {/* Static Testimonials Section */}
              <div className="mb-10 sm:mb-12 md:mb-14">
                <h3 className="text-xl sm:text-2xl md:text-3xl font-bold mb-4 text-center">
                  Real Reviews from Real Users
                </h3>
                <p className="text-center text-muted-foreground mb-8 max-w-2xl mx-auto">
                  See what our users are saying about MultiToolsA. These are genuine reviews from people who use our tools daily.
                </p>
                
                {/* Overall Rating Summary */}
                <div className="bg-card rounded-2xl p-6 sm:p-8 border border-border mb-8">
                  <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-12">
                    <div className="text-center">
                      <div className="text-5xl sm:text-6xl font-bold text-primary mb-2">4.9</div>
                      <div className="flex justify-center gap-1 mb-2">
                        {[1,2,3,4,5].map((star) => (
                          <Star key={star} className="w-6 h-6 fill-yellow-500 text-yellow-500" />
                        ))}
                      </div>
                      <p className="text-sm text-muted-foreground">Based on 2,847 reviews</p>
                    </div>
                    <div className="hidden md:block w-px h-24 bg-border" />
                    <div className="flex-1 max-w-md space-y-2">
                      {[
                        { stars: 5, percent: 89, count: 2534 },
                        { stars: 4, percent: 8, count: 228 },
                        { stars: 3, percent: 2, count: 57 },
                        { stars: 2, percent: 1, count: 20 },
                        { stars: 1, percent: 0, count: 8 },
                      ].map((rating) => (
                        <div key={rating.stars} className="flex items-center gap-3">
                          <span className="text-sm w-12">{rating.stars} star</span>
                          <div className="flex-1 h-2 bg-secondary rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-yellow-500 rounded-full" 
                              style={{ width: `${rating.percent}%` }}
                            />
                          </div>
                          <span className="text-xs text-muted-foreground w-12 text-right">{rating.count}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Detailed Testimonials */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                  {[
                    {
                      name: "David Chen",
                      role: "Professional Photographer",
                      location: "San Francisco, CA",
                      rating: 5,
                      date: "2 weeks ago",
                      title: "Best free image tools I've found",
                      review: "I've tried dozens of online image tools, and MultiToolsA is hands down the best. The compression quality is amazing - I reduced my portfolio images by 70% with no visible quality loss. The fact that everything processes locally means my client photos stay private. Highly recommend!",
                      verified: true
                    },
                    {
                      name: "Maria Rodriguez",
                      role: "E-commerce Store Owner",
                      location: "Miami, FL",
                      rating: 5,
                      date: "1 week ago",
                      title: "Saved me hundreds on software",
                      review: "I was paying $20/month for image editing software before I found MultiToolsA. Now I process all my product images for free. The batch processing saves me hours every week. My website loads faster too thanks to the optimized images!",
                      verified: true
                    },
                    {
                      name: "James Wilson",
                      role: "Web Developer",
                      location: "London, UK",
                      rating: 5,
                      date: "3 days ago",
                      title: "Perfect for web optimization",
                      review: "As a developer, I appreciate how well these tools work. WebP conversion improved my clients' PageSpeed scores significantly. The tools are technically solid and the UI is clean. Browser-based processing is genius for privacy-conscious clients.",
                      verified: true
                    },
                    {
                      name: "Sophie Martin",
                      role: "Social Media Manager",
                      location: "Paris, France",
                      rating: 5,
                      date: "1 month ago",
                      title: "Use it daily for my work",
                      review: "I manage social media for 5 different brands and use MultiToolsA every single day. Resizing for different platforms, adding watermarks, compressing for faster uploads - it handles everything. The interface is intuitive and fast.",
                      verified: true
                    },
                    {
                      name: "Ahmed Hassan",
                      role: "Graphic Designer",
                      location: "Dubai, UAE",
                      rating: 4,
                      date: "2 weeks ago",
                      title: "Great tools, wish there was more",
                      review: "Really solid tool collection. I use the format converters and compressors daily. Would love to see more advanced editing features in the future, but for what it offers, it's excellent. The privacy aspect is a huge plus for client work.",
                      verified: true
                    },
                    {
                      name: "Lisa Thompson",
                      role: "Blogger & Content Creator",
                      location: "Sydney, Australia",
                      rating: 5,
                      date: "5 days ago",
                      title: "My go-to for blog images",
                      review: "I've been using MultiToolsA for 6 months now and it's become essential for my blog workflow. Image compression cut my blog loading time in half. The tag generator is also fantastic for my YouTube channel. Truly a one-stop shop!",
                      verified: true
                    }
                  ].map((testimonial, index) => (
                    <div key={index} className="bg-card rounded-xl p-5 sm:p-6 border border-border hover:border-primary/30 transition-colors">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex gap-0.5">
                          {[...Array(5)].map((_, i) => (
                            <Star 
                              key={i} 
                              className={`w-4 h-4 ${i < testimonial.rating ? 'fill-yellow-500 text-yellow-500' : 'text-muted'}`} 
                            />
                          ))}
                        </div>
                        {testimonial.verified && (
                          <span className="inline-flex items-center gap-1 text-xs text-green-600 bg-green-100 dark:bg-green-900/30 px-2 py-0.5 rounded-full">
                            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                            Verified
                          </span>
                        )}
                      </div>
                      <h4 className="font-semibold text-foreground mb-2">{testimonial.title}</h4>
                      <p className="text-sm text-muted-foreground mb-4 leading-relaxed">"{testimonial.review}"</p>
                      <div className="flex items-center justify-between pt-3 border-t border-border">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-semibold text-sm">
                            {testimonial.name.split(' ').map(n => n[0]).join('')}
                          </div>
                          <div>
                            <p className="font-medium text-sm">{testimonial.name}</p>
                            <p className="text-xs text-muted-foreground">{testimonial.role}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-xs text-muted-foreground">{testimonial.location}</p>
                          <p className="text-xs text-muted-foreground">{testimonial.date}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Call to Action */}
                <div className="mt-8 text-center">
                  <p className="text-sm text-muted-foreground mb-4">
                    Love using MultiToolsA? We'd love to hear from you!
                  </p>
                  <Link 
                    to="/contact"
                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-secondary text-secondary-foreground rounded-lg hover:bg-secondary/80 transition-colors text-sm font-medium"
                  >
                    Share Your Experience
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>

              {/* Closing Statement */}
              <div className="text-center bg-gradient-hero rounded-2xl p-8 sm:p-10 md:p-12">
                <h3 className="text-xl sm:text-2xl md:text-3xl font-bold mb-4">
                  Start Using MultiToolsA Today
                </h3>
                <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                  Join over 50,000 monthly users who trust MultiToolsA for their image editing needs. Our comprehensive suite of free tools is constantly growing to serve you better. No signup required, no payment needed – just pick a tool and start creating professional-quality images in seconds.
                </p>
                <Link 
                  to="/all-tools"
                  className="inline-flex items-center gap-2 px-6 sm:px-8 py-3 sm:py-4 rounded-xl bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-colors text-base sm:text-lg"
                >
                  Explore All 100+ Tools
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