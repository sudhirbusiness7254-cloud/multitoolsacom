import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ArrowRight, Zap, Shield, Globe, Sparkles, Hash, TrendingUp, RefreshCw, Minimize2, Maximize2, Crop, Droplet, RotateCw, Settings, Palette, Layers, FileText, Database, Zap as ZapIcon, Pencil, Lock, QrCode, Image, BookOpen } from "lucide-react";
import { toolCategories } from "@/data/toolsData";
import { ToolIconWithBackground } from "@/lib/toolIcons";
import HreflangTags from "@/components/HreflangTags";
import { blogPosts } from "@/data/blogData";

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
  "pdf-tools": { from: "#DC2626", to: "#EA580C" },
};

// Popular tools - curated for quick access
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
  const featuredPosts = blogPosts.slice(0, 3);

  return (
    <>
      <Helmet>
        <title>MultiToolsA - Free Online Image & PDF Tools | No Upload Required</title>
        <meta name="description" content="Edit images directly in your browser. Convert, compress, resize, crop, and more. 100% free, no signup, complete privacy - your files never leave your device." />
        <meta name="keywords" content="image converter, image compressor, photo editor, pdf tools, jpg to png, free online tools" />
        <link rel="canonical" href="https://multitoolsa.com/" />
        
        <meta property="og:title" content="MultiToolsA - Free Browser-Based Image Tools" />
        <meta property="og:description" content="Edit images privately in your browser. No uploads, no accounts, no limits." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://multitoolsa.com/" />
        
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            "name": "MultiToolsA",
            "description": "Free browser-based image and PDF editing tools",
            "url": "https://multitoolsa.com",
            "applicationCategory": "UtilitiesApplication",
            "operatingSystem": "Web Browser",
            "offers": {
              "@type": "Offer",
              "price": "0",
              "priceCurrency": "USD"
            }
          })}
        </script>
      </Helmet>
      <HreflangTags path="/" />

      <div className="min-h-screen bg-background flex flex-col">
        <Header />
        
        <main className="flex-1">
          {/* Hero Section - Focused value proposition */}
          <section className="py-10 sm:py-16 md:py-20 bg-gradient-hero relative overflow-hidden">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] sm:w-[450px] h-[300px] sm:h-[450px] bg-primary/10 rounded-full blur-3xl pointer-events-none" />
            
            <div className="container mx-auto px-4 sm:px-6 relative z-10">
              <div className="text-center max-w-3xl mx-auto">
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 leading-tight">
                  Edit Images Privately
                  <span className="block text-primary">In Your Browser</span>
                </h1>
                
                <p className="text-base sm:text-lg text-muted-foreground max-w-xl mx-auto mb-6">
                  Convert, compress, resize, and edit images without uploading to any server. 
                  Your files stay on your device.
                </p>
                
                <div className="flex flex-col sm:flex-row justify-center gap-3 mb-8">
                  <Link 
                    to="/all-tools"
                    className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors"
                  >
                    Browse {totalTools}+ Tools
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                  <Link 
                    to="/how-tools-work"
                    className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-secondary text-secondary-foreground font-medium hover:bg-secondary/80 transition-colors"
                  >
                    How It Works
                  </Link>
                </div>

                {/* Trust indicators - concise */}
                <div className="flex flex-wrap justify-center gap-4 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1.5"><Shield className="w-4 h-4 text-green-500" /> No Upload</span>
                  <span className="flex items-center gap-1.5"><Zap className="w-4 h-4 text-yellow-500" /> Instant</span>
                  <span className="flex items-center gap-1.5"><Globe className="w-4 h-4 text-blue-500" /> Any Device</span>
                  <span className="flex items-center gap-1.5"><Sparkles className="w-4 h-4 text-purple-500" /> Free</span>
                </div>
              </div>
            </div>
          </section>

          {/* Popular Tools - Quick access */}
          <section className="py-8 sm:py-12 px-4 sm:px-6 bg-secondary/30">
            <div className="container mx-auto max-w-6xl">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <TrendingUp className="w-4 h-4 text-primary" />
                    <span className="text-sm font-medium text-primary">Most Used</span>
                  </div>
                  <h2 className="text-xl sm:text-2xl font-bold">Popular Tools</h2>
                </div>
                <Link to="/all-tools" className="text-sm text-primary hover:underline flex items-center gap-1">
                  View All <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
              
              <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2 sm:gap-3">
                {popularTools.map((tool) => (
                  <Link 
                    key={tool.slug}
                    to={`/${tool.slug}`}
                    className="group bg-card rounded-lg p-3 border border-border hover:border-primary/50 transition-all hover:-translate-y-0.5"
                  >
                    <ToolIconWithBackground 
                      toolSlug={tool.slug} 
                      size={36} 
                      iconSize={18}
                      className="mb-2 mx-auto"
                    />
                    <h3 className="text-xs font-medium text-center group-hover:text-primary transition-colors line-clamp-2">
                      {tool.name}
                    </h3>
                  </Link>
                ))}
              </div>
            </div>
          </section>

          {/* Tool Categories - Organized access */}
          <section className="py-10 sm:py-16 px-4 sm:px-6">
            <div className="container mx-auto max-w-6xl">
              <h2 className="text-2xl sm:text-3xl font-bold text-center mb-3">Tool Categories</h2>
              <p className="text-center text-muted-foreground mb-8 max-w-xl mx-auto">
                {imageCategories.length} categories organized by task type
              </p>
              
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {imageCategories.map((category) => {
                  const gradient = getGradient(category.id);
                  return (
                    <Link 
                      key={category.id}
                      to={`/${category.slug}`}
                      className="group bg-card rounded-xl p-4 border border-border hover:border-primary/50 transition-all hover:-translate-y-0.5"
                    >
                      <div 
                        className="w-10 h-10 rounded-lg flex items-center justify-center mb-3"
                        style={{ background: `linear-gradient(135deg, ${gradient.from}, ${gradient.to})` }}
                      >
                        <div className="[&>svg]:w-5 [&>svg]:h-5">
                          {categoryLucideIcons[category.id] || <Image className="w-5 h-5 text-white" />}
                        </div>
                      </div>
                      
                      <h3 className="text-sm font-bold mb-1 group-hover:text-primary transition-colors">{category.name}</h3>
                      <p className="text-xs text-muted-foreground line-clamp-2 mb-2">{category.description}</p>
                      
                      <div className="flex items-center gap-1 text-primary text-xs font-medium">
                        <span>{category.tools.length} Tools</span>
                        <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          </section>

          {/* How It Works - Educational content */}
          <section className="py-10 sm:py-16 px-4 sm:px-6 bg-secondary/30">
            <div className="container mx-auto max-w-5xl">
              <h2 className="text-2xl sm:text-3xl font-bold text-center mb-3">How Browser-Based Processing Works</h2>
              <p className="text-center text-muted-foreground mb-8 max-w-2xl mx-auto">
                Your images are processed using JavaScript directly in your browser. 
                No data is ever sent to our servers.
              </p>
              
              <div className="grid sm:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <span className="text-xl font-bold text-primary">1</span>
                  </div>
                  <h3 className="font-semibold mb-2">Select Your Image</h3>
                  <p className="text-sm text-muted-foreground">
                    Choose files from your device. They load directly into your browser's memory.
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <span className="text-xl font-bold text-primary">2</span>
                  </div>
                  <h3 className="font-semibold mb-2">Local Processing</h3>
                  <p className="text-sm text-muted-foreground">
                    JavaScript and Canvas API handle all transformations on your device.
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <span className="text-xl font-bold text-primary">3</span>
                  </div>
                  <h3 className="font-semibold mb-2">Download Result</h3>
                  <p className="text-sm text-muted-foreground">
                    Save your edited image directly to your device. Nothing stored online.
                  </p>
                </div>
              </div>
              
              <div className="text-center mt-8">
                <Link 
                  to="/how-tools-work"
                  className="inline-flex items-center gap-2 text-primary font-medium hover:underline"
                >
                  Learn more about our technology <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </section>

          {/* Featured Blog Posts - Educational content */}
          <section className="py-10 sm:py-16 px-4 sm:px-6">
            <div className="container mx-auto max-w-6xl">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <BookOpen className="w-4 h-4 text-primary" />
                    <span className="text-sm font-medium text-primary">Learn</span>
                  </div>
                  <h2 className="text-xl sm:text-2xl font-bold">Image Editing Guides</h2>
                </div>
                <Link to="/blog" className="text-sm text-primary hover:underline flex items-center gap-1">
                  All Articles <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
              
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {featuredPosts.map((post) => (
                  <Link 
                    key={post.id}
                    to={`/blog/${post.id}`}
                    className="group bg-card rounded-xl overflow-hidden border border-border hover:border-primary/50 transition-all"
                  >
                    <div className="aspect-video overflow-hidden">
                      <img 
                        src={post.image} 
                        alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        loading="lazy"
                      />
                    </div>
                    <div className="p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-xs px-2 py-0.5 bg-primary/10 text-primary rounded-full">{post.category}</span>
                        <span className="text-xs text-muted-foreground">{post.readTime}</span>
                      </div>
                      <h3 className="font-semibold group-hover:text-primary transition-colors line-clamp-2 mb-2">
                        {post.title}
                      </h3>
                      <p className="text-sm text-muted-foreground line-clamp-2">{post.excerpt}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>

          {/* Quick Links Section - Additional resources */}
          <section className="py-10 sm:py-16 px-4 sm:px-6 bg-secondary/30">
            <div className="container mx-auto max-w-4xl">
              <h2 className="text-2xl sm:text-3xl font-bold text-center mb-8">Resources & Guides</h2>
              
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <Link 
                  to="/image-formats-guide"
                  className="bg-card rounded-xl p-4 border border-border hover:border-primary/50 transition-all group"
                >
                  <h3 className="font-semibold mb-2 group-hover:text-primary transition-colors">Image Formats Guide</h3>
                  <p className="text-sm text-muted-foreground">JPEG vs PNG vs WebP - when to use each format</p>
                </Link>
                <Link 
                  to="/tutorials"
                  className="bg-card rounded-xl p-4 border border-border hover:border-primary/50 transition-all group"
                >
                  <h3 className="font-semibold mb-2 group-hover:text-primary transition-colors">Step-by-Step Tutorials</h3>
                  <p className="text-sm text-muted-foreground">Detailed guides for common image tasks</p>
                </Link>
                <Link 
                  to="/faq"
                  className="bg-card rounded-xl p-4 border border-border hover:border-primary/50 transition-all group"
                >
                  <h3 className="font-semibold mb-2 group-hover:text-primary transition-colors">FAQ</h3>
                  <p className="text-sm text-muted-foreground">Answers to common questions about our tools</p>
                </Link>
                <Link 
                  to="/how-tools-work"
                  className="bg-card rounded-xl p-4 border border-border hover:border-primary/50 transition-all group"
                >
                  <h3 className="font-semibold mb-2 group-hover:text-primary transition-colors">How It Works</h3>
                  <p className="text-sm text-muted-foreground">Technical explanation of browser-based processing</p>
                </Link>
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="py-12 sm:py-16 px-4 sm:px-6">
            <div className="container mx-auto max-w-3xl text-center">
              <h2 className="text-2xl sm:text-3xl font-bold mb-4">Ready to Edit Your Images?</h2>
              <p className="text-muted-foreground mb-6">
                No registration, no uploads, no limits. Start editing in seconds.
              </p>
              <Link 
                to="/all-tools"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-lg bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-colors"
              >
                Explore All Tools
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </section>
        </main>
        
        <Footer />
      </div>
    </>
  );
};

export default HomePage;
