import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { AdBottom, AdVideo, AdInline } from "@/components/ads/AdContainer";
import { 
  ArrowRight, 
  Shield, 
  Zap, 
  Globe, 
  RefreshCw, 
  Minimize2, 
  Maximize2, 
  Crop, 
  Droplet, 
  RotateCw, 
  Settings, 
  Palette, 
  Layers, 
  FileText, 
  Database, 
  Pencil, 
  Lock, 
  QrCode, 
  Image, 
  BookOpen,
  Upload,
  Cpu,
  Download,
  CheckCircle2,
  Clock,
  Users,
  Award,
  Sparkles,
  Heart
} from "lucide-react";
import { toolCategories } from "@/data/toolsData";
import { ToolIconWithBackground } from "@/lib/toolIcons";
import HreflangTags from "@/components/HreflangTags";
import { blogPosts } from "@/data/blogData";

// 4K Screenshots for How It Works section
import stepUpload4k from "@/assets/guides/step-upload-4k.png";
import stepPreview4k from "@/assets/guides/step-preview-4k.png";
import stepDownload4k from "@/assets/guides/step-download-4k.png";

// Category icons mapping
const categoryLucideIcons: Record<string, React.ReactNode> = {
  "image-converter": <RefreshCw className="w-6 h-6 sm:w-8 sm:h-8 text-white" />,
  "image-compression": <Minimize2 className="w-6 h-6 sm:w-8 sm:h-8 text-white" />,
  "image-to-document": <FileText className="w-6 h-6 sm:w-8 sm:h-8 text-white" />,
  "image-resize": <Maximize2 className="w-6 h-6 sm:w-8 sm:h-8 text-white" />,
  "image-crop": <Crop className="w-6 h-6 sm:w-8 sm:h-8 text-white" />,
  "image-rotate-flip": <RotateCw className="w-6 h-6 sm:w-8 sm:h-8 text-white" />,
  "image-format-utilities": <Settings className="w-6 h-6 sm:w-8 sm:h-8 text-white" />,
  "photo-filters": <Palette className="w-6 h-6 sm:w-8 sm:h-8 text-white" />,
  "watermark-tools": <Droplet className="w-6 h-6 sm:w-8 sm:h-8 text-white" />,
  "image-combine": <Layers className="w-6 h-6 sm:w-8 sm:h-8 text-white" />,
  "image-metadata": <Database className="w-6 h-6 sm:w-8 sm:h-8 text-white" />,
  "image-optimization": <Zap className="w-6 h-6 sm:w-8 sm:h-8 text-white" />,
  "image-drawing": <Pencil className="w-6 h-6 sm:w-8 sm:h-8 text-white" />,
  "image-security": <Lock className="w-6 h-6 sm:w-8 sm:h-8 text-white" />,
  "image-qr": <QrCode className="w-6 h-6 sm:w-8 sm:h-8 text-white" />,
  "pdf-tools": <FileText className="w-6 h-6 sm:w-8 sm:h-8 text-white" />,
};

// iLovePDF style colorful gradients for categories
const categoryColors: Record<string, string> = {
  "image-converter": "#3B82F6",
  "image-compression": "#22C55E", 
  "image-to-document": "#EC4899",
  "image-resize": "#0EA5E9",
  "image-crop": "#A855F7",
  "image-rotate-flip": "#F97316",
  "image-format-utilities": "#6366F1",
  "photo-filters": "#F43F5E",
  "watermark-tools": "#14B8A6",
  "image-combine": "#8B5CF6",
  "image-metadata": "#F59E0B",
  "image-optimization": "#EF4444",
  "image-drawing": "#10B981",
  "image-security": "#DC2626",
  "image-qr": "#2563EB",
  "pdf-tools": "#DC2626",
};

const HomePage = () => {
  const imageCategories = toolCategories.filter(cat => cat.id !== "tag-tools").sort((a, b) => a.priority - b.priority);
  const totalTools = imageCategories.reduce((sum, cat) => sum + cat.tools.length, 0);
  const featuredPosts = blogPosts.slice(0, 3);

  return (
    <>
      <Helmet>
        <title>MultiToolsA - Free Online Image & PDF Tools | No Upload Required</title>
        <meta name="description" content="Transform, compress, resize, and edit images directly in your browser. 100+ free professional tools with complete privacy - your files never leave your device. No signup required." />
        <meta name="keywords" content="online image tools, image converter, image compressor, PDF editor, photo editor, resize image, crop image, free image tools, browser-based image editing" />
        <link rel="canonical" href="https://multitoolsa.com/" />
        
        <meta property="og:title" content="MultiToolsA - Free Browser-Based Image & PDF Tools" />
        <meta property="og:description" content="Edit images privately in your browser. No uploads, no accounts, no limits. 100+ professional tools for free." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://multitoolsa.com/" />
        <meta property="og:image" content="https://multitoolsa.com/screenshot.png" />
        
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="MultiToolsA - Free Online Image Tools" />
        <meta name="twitter:description" content="100+ free image editing tools. No uploads, complete privacy." />
        
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            "name": "MultiToolsA",
            "description": "Free browser-based image and PDF editing tools with complete privacy",
            "url": "https://multitoolsa.com",
            "applicationCategory": "UtilitiesApplication",
            "operatingSystem": "Web Browser",
            "offers": {
              "@type": "Offer",
              "price": "0",
              "priceCurrency": "USD"
            },
            "featureList": [
              "Image format conversion",
              "Image compression",
              "Image resizing",
              "PDF editing",
              "Photo filters",
              "Watermark tools"
            ]
          })}
        </script>
        
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "MultiToolsA",
            "url": "https://multitoolsa.com",
            "logo": "https://multitoolsa.com/logo.png",
            "description": "Free online image and PDF tools platform"
          })}
        </script>
      </Helmet>
      <HreflangTags path="/" />

      <div className="min-h-screen bg-background flex flex-col">
        <Header />
        
        <main className="flex-1">
          {/* Hero Section - Clean & Minimal like iLovePDF */}
          <section className="py-12 sm:py-16 md:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 text-center bg-gradient-to-b from-background to-secondary/20">
            <div className="max-w-4xl mx-auto">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 text-foreground leading-tight">
                Every tool you need to work with 
                <span className="text-primary"> Images & PDFs</span>
              </h1>
              <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
                Free online tools to convert, compress, resize, and edit images. 
                All processing happens in your browser - your files never leave your device.
              </p>
              
              {/* Trust Badges Row */}
              <div className="flex flex-wrap justify-center gap-4 sm:gap-6 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Shield className="w-5 h-5 text-green-500" />
                  <span>100% Private</span>
                </div>
                <div className="flex items-center gap-2">
                  <Zap className="w-5 h-5 text-yellow-500" />
                  <span>Instant Processing</span>
                </div>
                <div className="flex items-center gap-2">
                  <Heart className="w-5 h-5 text-red-500" />
                  <span>Completely Free</span>
                </div>
              </div>
            </div>
          </section>

          {/* Main Tools Grid - iLovePDF Style Colorful Cards */}
          <section className="py-8 sm:py-12 md:py-16 px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16">
            <div className="max-w-[1600px] mx-auto">
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-8 gap-4 sm:gap-5 md:gap-6">
                {imageCategories.map((category) => {
                  const bgColor = categoryColors[category.id] || "#6366F1";
                  
                  return (
                    <Link 
                      key={category.id}
                      to={`/${category.slug}`}
                      className="group flex flex-col items-center text-center p-4 sm:p-5 md:p-6 rounded-2xl sm:rounded-3xl transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
                      style={{ backgroundColor: bgColor }}
                    >
                      {/* Icon */}
                      <div className="w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center mb-3 sm:mb-4 group-hover:scale-110 transition-transform">
                        {categoryLucideIcons[category.id] || <Image className="w-6 h-6 sm:w-8 sm:h-8 text-white" />}
                      </div>
                      
                      {/* Title */}
                      <h3 className="text-sm sm:text-base md:text-lg font-bold text-white mb-1 sm:mb-2">
                        {category.name}
                      </h3>
                      
                      {/* Tool Count */}
                      <span className="text-xs sm:text-sm text-white/80">
                        {category.tools.length} tools
                      </span>
                    </Link>
                  );
                })}
              </div>
            </div>
          </section>

          {/* Quick Tools Section - Popular Individual Tools */}
          <section className="py-8 sm:py-12 px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16 bg-secondary/30">
            <div className="max-w-[1600px] mx-auto">
              <div className="text-center mb-8 sm:mb-10">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3">Popular Tools</h2>
                <p className="text-muted-foreground">Quick access to our most used tools</p>
              </div>
              
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-3 sm:gap-4">
                {[
                  { slug: "jpg-to-png", name: "JPG to PNG" },
                  { slug: "png-to-jpg", name: "PNG to JPG" },
                  { slug: "jpeg-compressor", name: "Compress JPEG" },
                  { slug: "merge-pdf", name: "Merge PDF" },
                  { slug: "exact-resize", name: "Resize Image" },
                  { slug: "manual-crop", name: "Crop Image" },
                  { slug: "rotate-90", name: "Rotate Image" },
                  { slug: "text-watermark", name: "Add Watermark" },
                  { slug: "jpg-to-webp", name: "JPG to WebP" },
                  { slug: "compress-pdf", name: "Compress PDF" },
                  { slug: "word-to-pdf", name: "Word to PDF" },
                  { slug: "image-to-pdf", name: "Image to PDF" },
                  { slug: "heic-to-jpg", name: "HEIC to JPG" },
                  { slug: "png-compressor", name: "Compress PNG" },
                  { slug: "webp-to-jpg", name: "WebP to JPG" },
                  { slug: "split-pdf", name: "Split PDF" },
                ].map((tool) => (
                  <Link 
                    key={tool.slug}
                    to={`/${tool.slug}`}
                    className="group bg-card rounded-xl sm:rounded-2xl p-3 sm:p-4 border border-border hover:border-primary/50 transition-all hover:-translate-y-1 hover:shadow-lg text-center"
                  >
                    <ToolIconWithBackground 
                      toolSlug={tool.slug} 
                      size={36} 
                      iconSize={18}
                      className="mx-auto mb-2 sm:mb-3 sm:w-11 sm:h-11"
                    />
                    <span className="text-xs sm:text-sm font-medium group-hover:text-primary transition-colors line-clamp-1">
                      {tool.name}
                    </span>
                  </Link>
                ))}
              </div>
              
              <div className="text-center mt-6 sm:mt-8">
                <Link 
                  to="/all-tools"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-all"
                >
                  View All {totalTools}+ Tools
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
              
              <AdBottom className="mt-8" />
            </div>
          </section>

          {/* Features Section - Clean Cards */}
          <section className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 lg:px-8 xl:px-12">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-10 sm:mb-12">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">Why Choose MultiToolsA?</h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  Professional tools with complete privacy - no uploads, no accounts, no limits
                </p>
              </div>
              
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                <div className="bg-card rounded-2xl p-6 border border-border text-center hover:shadow-lg transition-shadow">
                  <div className="w-14 h-14 rounded-2xl bg-green-500/10 flex items-center justify-center mx-auto mb-4">
                    <Shield className="w-7 h-7 text-green-500" />
                  </div>
                  <h3 className="font-bold text-lg mb-2">100% Private</h3>
                  <p className="text-sm text-muted-foreground">
                    Your files never leave your device. All processing happens locally in your browser.
                  </p>
                </div>
                
                <div className="bg-card rounded-2xl p-6 border border-border text-center hover:shadow-lg transition-shadow">
                  <div className="w-14 h-14 rounded-2xl bg-yellow-500/10 flex items-center justify-center mx-auto mb-4">
                    <Zap className="w-7 h-7 text-yellow-500" />
                  </div>
                  <h3 className="font-bold text-lg mb-2">Lightning Fast</h3>
                  <p className="text-sm text-muted-foreground">
                    No waiting for uploads. Get instant results using your device's processing power.
                  </p>
                </div>
                
                <div className="bg-card rounded-2xl p-6 border border-border text-center hover:shadow-lg transition-shadow">
                  <div className="w-14 h-14 rounded-2xl bg-blue-500/10 flex items-center justify-center mx-auto mb-4">
                    <Globe className="w-7 h-7 text-blue-500" />
                  </div>
                  <h3 className="font-bold text-lg mb-2">Works Anywhere</h3>
                  <p className="text-sm text-muted-foreground">
                    Use on any device - desktop, tablet, or mobile. Works offline after initial load.
                  </p>
                </div>
                
                <div className="bg-card rounded-2xl p-6 border border-border text-center hover:shadow-lg transition-shadow">
                  <div className="w-14 h-14 rounded-2xl bg-purple-500/10 flex items-center justify-center mx-auto mb-4">
                    <Sparkles className="w-7 h-7 text-purple-500" />
                  </div>
                  <h3 className="font-bold text-lg mb-2">No Signup</h3>
                  <p className="text-sm text-muted-foreground">
                    Start using any tool immediately. No account, no registration, no hassle.
                  </p>
                </div>
              </div>
            </div>
          </section>

          <AdInline className="px-4 sm:px-6 lg:px-8" />

          {/* How It Works - Simple Steps */}
          <section className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 lg:px-8 bg-secondary/30">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-10 sm:mb-12">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">How It Works</h2>
                <p className="text-muted-foreground max-w-xl mx-auto">
                  Simple 3-step process - your files stay on your device
                </p>
              </div>
              
              <div className="grid sm:grid-cols-3 gap-6 sm:gap-8">
                <div className="text-center">
                  <div className="relative mb-4">
                    <img 
                      src={stepUpload4k} 
                      alt="Step 1: Upload your file"
                      className="w-full rounded-2xl border border-border shadow-lg"
                      loading="lazy"
                    />
                    <div className="absolute -top-3 -left-3 w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-lg shadow-lg">
                      1
                    </div>
                  </div>
                  <h3 className="font-bold text-lg mb-2">Select File</h3>
                  <p className="text-sm text-muted-foreground">
                    Choose your image or document from your device
                  </p>
                </div>
                
                <div className="text-center">
                  <div className="relative mb-4">
                    <img 
                      src={stepPreview4k} 
                      alt="Step 2: Process locally"
                      className="w-full rounded-2xl border border-border shadow-lg"
                      loading="lazy"
                    />
                    <div className="absolute -top-3 -left-3 w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-lg shadow-lg">
                      2
                    </div>
                  </div>
                  <h3 className="font-bold text-lg mb-2">Process Locally</h3>
                  <p className="text-sm text-muted-foreground">
                    Your file is processed right in your browser
                  </p>
                </div>
                
                <div className="text-center">
                  <div className="relative mb-4">
                    <img 
                      src={stepDownload4k} 
                      alt="Step 3: Download result"
                      className="w-full rounded-2xl border border-border shadow-lg"
                      loading="lazy"
                    />
                    <div className="absolute -top-3 -left-3 w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-lg shadow-lg">
                      3
                    </div>
                  </div>
                  <h3 className="font-bold text-lg mb-2">Download</h3>
                  <p className="text-sm text-muted-foreground">
                    Save your edited file instantly to your device
                  </p>
                </div>
              </div>
              
              <div className="mt-10 sm:mt-12 p-4 sm:p-6 bg-green-500/10 rounded-2xl border border-green-500/20 flex items-center gap-4 justify-center">
                <Shield className="w-8 h-8 text-green-500 flex-shrink-0" />
                <p className="text-sm sm:text-base text-green-700 dark:text-green-300">
                  <strong>Privacy Guaranteed:</strong> Your files never leave your device. Zero data is uploaded to our servers.
                </p>
              </div>
            </div>
          </section>

          <AdVideo className="px-4 sm:px-6 lg:px-8 py-6" />

          {/* Blog Section */}
          <section className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h2 className="text-2xl sm:text-3xl font-bold">Guides & Tutorials</h2>
                  <p className="text-muted-foreground mt-1">Learn image editing tips and tricks</p>
                </div>
                <Link to="/blog" className="hidden sm:flex text-primary hover:underline items-center gap-1 font-medium">
                  All Articles <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
              
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {featuredPosts.map((post) => (
                  <Link 
                    key={post.id}
                    to={`/blog/${post.id}`}
                    className="group bg-card rounded-2xl overflow-hidden border border-border hover:border-primary/50 transition-all hover:-translate-y-1 hover:shadow-lg"
                  >
                    <div className="aspect-video overflow-hidden">
                      <img 
                        src={post.image} 
                        alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        loading="lazy"
                      />
                    </div>
                    <div className="p-5">
                      <div className="flex items-center gap-2 mb-3">
                        <span className="text-xs px-2.5 py-1 bg-primary/10 text-primary rounded-full font-medium">{post.category}</span>
                        <span className="text-xs text-muted-foreground">{post.readTime}</span>
                      </div>
                      <h3 className="font-bold group-hover:text-primary transition-colors line-clamp-2">
                        {post.title}
                      </h3>
                    </div>
                  </Link>
                ))}
              </div>
              
              <Link to="/blog" className="sm:hidden flex text-primary hover:underline items-center justify-center gap-1 font-medium mt-6">
                All Articles <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </section>

          {/* Resources Links */}
          <section className="py-10 sm:py-14 px-4 sm:px-6 lg:px-8 bg-secondary/20">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-2xl sm:text-3xl font-bold text-center mb-8">Resources</h2>
              
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <Link 
                  to="/image-formats-guide"
                  className="bg-card rounded-xl p-5 border border-border hover:border-primary/50 transition-all group"
                >
                  <FileText className="w-8 h-8 text-blue-500 mb-3" />
                  <h3 className="font-bold mb-1 group-hover:text-primary transition-colors">Image Formats Guide</h3>
                  <p className="text-sm text-muted-foreground">Learn about JPEG, PNG, WebP & more</p>
                </Link>
                
                <Link 
                  to="/tutorials"
                  className="bg-card rounded-xl p-5 border border-border hover:border-primary/50 transition-all group"
                >
                  <BookOpen className="w-8 h-8 text-purple-500 mb-3" />
                  <h3 className="font-bold mb-1 group-hover:text-primary transition-colors">Tutorials</h3>
                  <p className="text-sm text-muted-foreground">Step-by-step editing guides</p>
                </Link>
                
                <Link 
                  to="/faq"
                  className="bg-card rounded-xl p-5 border border-border hover:border-primary/50 transition-all group"
                >
                  <CheckCircle2 className="w-8 h-8 text-green-500 mb-3" />
                  <h3 className="font-bold mb-1 group-hover:text-primary transition-colors">FAQ</h3>
                  <p className="text-sm text-muted-foreground">Common questions answered</p>
                </Link>
                
                <Link 
                  to="/how-tools-work"
                  className="bg-card rounded-xl p-5 border border-border hover:border-primary/50 transition-all group"
                >
                  <Cpu className="w-8 h-8 text-orange-500 mb-3" />
                  <h3 className="font-bold mb-1 group-hover:text-primary transition-colors">How It Works</h3>
                  <p className="text-sm text-muted-foreground">Our technology explained</p>
                </Link>
              </div>
            </div>
          </section>

          <AdBottom className="px-4 sm:px-6 lg:px-8 py-6" />

          {/* Final CTA */}
          <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-primary text-primary-foreground">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">
                Ready to Get Started?
              </h2>
              <p className="text-lg opacity-90 mb-8 max-w-2xl mx-auto">
                Start using {totalTools}+ free tools right now. No signup required, 100% private.
              </p>
              <Link 
                to="/all-tools"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-white text-primary font-bold text-lg hover:bg-white/90 transition-all shadow-lg"
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
