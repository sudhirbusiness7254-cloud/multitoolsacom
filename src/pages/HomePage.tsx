import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import GradientWaveBackground from "@/components/GradientWaveBackground";
import { AdBottom, AdVideo, AdInline } from "@/components/ads/AdContainer";
import { 
  ArrowRight, 
  Shield, 
  Zap, 
  Globe, 
  Sparkles, 
  TrendingUp, 
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
  Eye,
  Clock,
  Users,
  Award
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
  "image-optimization": <Zap className="w-6 h-6 text-white" />,
  "image-drawing": <Pencil className="w-6 h-6 text-white" />,
  "image-security": <Lock className="w-6 h-6 text-white" />,
  "image-qr": <QrCode className="w-6 h-6 text-white" />,
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
  "pdf-tools": { from: "#DC2626", to: "#EA580C" },
};

// Unique descriptions for each category - AdSense & SEO optimized
const categoryDescriptions: Record<string, { headline: string; description: string; benefits: string }> = {
  "image-converter": {
    headline: "Universal Image Format Converter",
    description: "Transform your images between any format instantly. Whether you need to convert PNG to JPG for smaller file sizes, or switch to WebP for modern web compatibility, our converter handles it all.",
    benefits: "Perfect for web developers optimizing site performance, photographers preparing files for different platforms, and anyone who needs quick format changes without quality loss."
  },
  "image-compression": {
    headline: "Smart Image Compression",
    description: "Reduce file sizes dramatically while preserving visual quality. Our intelligent compression algorithms analyze each image to find the optimal balance between size reduction and clarity.",
    benefits: "Ideal for bloggers managing upload limits, email attachments that need to fit size restrictions, and website owners looking to improve page load speeds."
  },
  "image-to-document": {
    headline: "Image to Document Conversion",
    description: "Convert your images into professional document formats. Create PDFs from photos, embed pictures into Word documents, or prepare images for presentations seamlessly.",
    benefits: "Essential for office workers preparing reports, students compiling portfolios, and anyone who needs to include images in formal documentation."
  },
  "image-resize": {
    headline: "Precision Image Resizing",
    description: "Resize images to exact dimensions or scale them proportionally. Control width, height, and aspect ratio with pixel-perfect accuracy for any requirement.",
    benefits: "Great for social media managers meeting platform specifications, print designers preparing artwork, and developers creating responsive image assets."
  },
  "image-crop": {
    headline: "Flexible Image Cropping",
    description: "Remove unwanted areas and focus on what matters. Use standard aspect ratios for social media or create custom crops for unique layouts.",
    benefits: "Useful for content creators optimizing thumbnails, photographers perfecting composition, and marketers preparing visuals for multiple channels."
  },
  "image-rotate-flip": {
    headline: "Rotate & Flip Tools",
    description: "Correct image orientation with simple rotation and flip options. Fix upside-down photos, create mirror effects, or adjust angles precisely.",
    benefits: "Helpful for fixing smartphone photos taken at odd angles, creating symmetrical designs, and preparing images for specific layout requirements."
  },
  "image-format-utilities": {
    headline: "Format Utility Tools",
    description: "Specialized utilities for working with image formats. Convert to Base64 for web embedding, extract color palettes, and handle format-specific optimizations.",
    benefits: "Valuable for frontend developers embedding images in code, designers extracting brand colors, and technical users handling advanced format needs."
  },
  "photo-filters": {
    headline: "Photo Filters & Effects",
    description: "Apply stunning visual effects to transform your photos. From vintage film looks to modern artistic styles, enhance your images with one-click filters.",
    benefits: "Popular among social media enthusiasts, amateur photographers, and creative professionals seeking quick visual enhancements."
  },
  "watermark-tools": {
    headline: "Watermark Protection",
    description: "Protect your creative work with text or image watermarks. Add branding, copyright notices, or ownership marks to prevent unauthorized use.",
    benefits: "Critical for photographers protecting portfolios, businesses watermarking proprietary content, and creators sharing work online safely."
  },
  "image-combine": {
    headline: "Image Combining Tools",
    description: "Merge multiple images into collages, side-by-side comparisons, or layered compositions. Create visual stories by combining separate photos into unified designs.",
    benefits: "Excellent for creating before/after comparisons, social media collages, and presentation materials that need multiple images together."
  },
  "image-metadata": {
    headline: "Metadata Management",
    description: "View, edit, and remove image metadata including EXIF data. Control what information travels with your photos when you share them online.",
    benefits: "Important for privacy-conscious users removing location data, photographers checking camera settings, and publishers managing image information."
  },
  "image-optimization": {
    headline: "Web Optimization Suite",
    description: "Prepare images specifically for web use with advanced optimization. Reduce loading times without visible quality loss using smart compression techniques.",
    benefits: "Essential for website owners improving Core Web Vitals, SEO specialists optimizing page speed, and developers building fast-loading applications."
  },
  "image-drawing": {
    headline: "Drawing & Annotation Tools",
    description: "Add drawings, shapes, arrows, and text annotations directly onto images. Create instructional graphics, highlight important areas, or add creative elements.",
    benefits: "Useful for educators creating visual explanations, support teams annotating screenshots, and marketers adding callouts to images."
  },
  "image-security": {
    headline: "Image Security Features",
    description: "Encrypt images for secure sharing and add password protection to sensitive visual content. Control who can access your private photos and documents.",
    benefits: "Crucial for businesses sharing confidential visuals, healthcare professionals protecting patient images, and anyone needing secure image transfer."
  },
  "image-qr": {
    headline: "QR Code Generator",
    description: "Create scannable QR codes from URLs, text, or contact information. Customize colors and sizes for perfect integration with your branding.",
    benefits: "Perfect for marketing campaigns, business cards, event materials, and any scenario requiring quick mobile access to digital content."
  },
  "pdf-tools": {
    headline: "PDF Editing & Conversion",
    description: "Merge multiple PDFs, split large documents, compress file sizes, and convert between formats. Complete PDF management without expensive software.",
    benefits: "Indispensable for office professionals handling documents, students organizing study materials, and anyone working with PDF files regularly."
  }
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
          {/* Hero Section - Ultra Attractive with Glassmorphism & Animations */}
          <section className="py-12 sm:py-16 md:py-20 lg:py-28 xl:py-32 bg-gradient-hero relative overflow-hidden min-h-[550px] sm:min-h-[600px] md:min-h-[700px] lg:min-h-[800px]">
            {/* Animated Gradient Wave Background */}
            <GradientWaveBackground />
            
            {/* Animated Gradient Orbs */}
            <div className="absolute top-1/4 left-1/4 w-[300px] sm:w-[400px] md:w-[500px] lg:w-[600px] h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px] rounded-full blur-[100px] pointer-events-none z-[1] animate-pulse"
              style={{ background: 'radial-gradient(circle, hsl(24 95% 50% / 0.15), transparent 70%)' }} />
            <div className="absolute bottom-1/4 right-1/4 w-[250px] sm:w-[350px] md:w-[450px] h-[250px] sm:h-[350px] md:h-[450px] rounded-full blur-[80px] pointer-events-none z-[1] animate-pulse"
              style={{ background: 'radial-gradient(circle, hsl(280 70% 50% / 0.12), transparent 70%)', animationDelay: '1s' }} />
            <div className="absolute top-1/3 right-1/3 w-[200px] md:w-[300px] h-[200px] md:h-[300px] rounded-full blur-[60px] pointer-events-none hidden lg:block z-[1] animate-pulse"
              style={{ background: 'radial-gradient(circle, hsl(200 80% 50% / 0.1), transparent 70%)', animationDelay: '2s' }} />
            
            {/* Floating Decorative Elements */}
            <div className="absolute top-[15%] left-[10%] w-20 h-20 rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 backdrop-blur-sm border border-white/10 rotate-12 animate-float hidden lg:block z-[2]" />
            <div className="absolute top-[25%] right-[8%] w-16 h-16 rounded-xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 backdrop-blur-sm border border-white/10 -rotate-12 animate-float hidden lg:block z-[2]" style={{ animationDelay: '1s' }} />
            <div className="absolute bottom-[20%] left-[5%] w-14 h-14 rounded-lg bg-gradient-to-br from-cyan-500/20 to-blue-500/20 backdrop-blur-sm border border-white/10 rotate-6 animate-float hidden xl:block z-[2]" style={{ animationDelay: '2s' }} />
            
            <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16 relative z-10">
              <div className="text-center max-w-full sm:max-w-2xl md:max-w-4xl lg:max-w-5xl xl:max-w-6xl 2xl:max-w-7xl mx-auto">
                
                {/* Animated Badge */}
                <div className="inline-flex items-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 rounded-full bg-gradient-to-r from-primary/20 via-accent/20 to-primary/20 backdrop-blur-md border border-primary/30 mb-6 sm:mb-8 animate-shimmer">
                  <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-primary animate-pulse" />
                  <span className="text-xs sm:text-sm font-semibold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                    {totalTools}+ Free Professional Tools
                  </span>
                  <div className="w-2 h-2 rounded-full bg-green-500 animate-ping" />
                </div>
                
                {/* Main Title with Gradient */}
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl font-black mb-4 sm:mb-6 leading-[1.1] tracking-tight">
                  <span className="inline-block animate-fade-in">Transform Your</span>
                  <br />
                  <span className="inline-block bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent animate-gradient bg-[length:200%_auto]" style={{ animationDelay: '200ms' }}>
                    Images & PDFs
                  </span>
                  <br />
                  <span className="inline-block text-foreground/90" style={{ animationDelay: '400ms' }}>Instantly</span>
                </h1>
                
                {/* Subtitle with better readability */}
                <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-muted-foreground max-w-full sm:max-w-xl md:max-w-2xl lg:max-w-3xl mx-auto mb-8 sm:mb-10 leading-relaxed px-2 sm:px-0">
                  Free browser-based tools that process everything locally. 
                  <span className="text-foreground font-medium"> No uploads, no signup, complete privacy.</span>
                </p>
                
                {/* CTA Buttons with Glow Effect */}
                <div className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-5 mb-10 sm:mb-14 px-2 sm:px-0">
                  <Link 
                    to="/all-tools"
                    className="group relative inline-flex items-center justify-center gap-2 sm:gap-3 px-6 sm:px-8 md:px-10 py-4 sm:py-5 rounded-xl sm:rounded-2xl bg-gradient-to-r from-primary to-accent text-white text-base sm:text-lg font-bold transition-all duration-300 hover:scale-105 shadow-xl hover:shadow-2xl hover:shadow-primary/30 overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-accent to-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <span className="relative z-10">Start Using Free Tools</span>
                    <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6 relative z-10 group-hover:translate-x-1 transition-transform" />
                  </Link>
                  <Link 
                    to="/ai-image-tools"
                    className="group inline-flex items-center justify-center gap-2 sm:gap-3 px-6 sm:px-8 md:px-10 py-4 sm:py-5 rounded-xl sm:rounded-2xl bg-card/80 backdrop-blur-md text-foreground text-base sm:text-lg font-semibold border-2 border-border hover:border-primary/50 transition-all duration-300 hover:bg-card"
                  >
                    <Cpu className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
                    <span>Try AI Tools</span>
                    <Sparkles className="w-4 h-4 text-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                </div>

                {/* Feature Pills with Glassmorphism */}
                <div className="flex flex-wrap justify-center gap-3 sm:gap-4 md:gap-5 px-2 sm:px-0">
                  {[
                    { icon: Shield, text: "100% Private", color: "text-emerald-500", bg: "from-emerald-500/20 to-emerald-500/5" },
                    { icon: Zap, text: "Lightning Fast", color: "text-amber-500", bg: "from-amber-500/20 to-amber-500/5" },
                    { icon: Globe, text: "Works Offline", color: "text-blue-500", bg: "from-blue-500/20 to-blue-500/5" },
                    { icon: Sparkles, text: "No Signup", color: "text-purple-500", bg: "from-purple-500/20 to-purple-500/5" },
                  ].map((item, i) => (
                    <div 
                      key={i}
                      className={`group flex items-center gap-2 sm:gap-3 bg-gradient-to-r ${item.bg} backdrop-blur-md px-4 sm:px-5 py-2.5 sm:py-3 rounded-xl sm:rounded-2xl border border-white/10 hover:border-white/20 transition-all duration-300 hover:scale-105 cursor-default`}
                    >
                      <item.icon className={`w-5 h-5 sm:w-6 sm:h-6 ${item.color}`} />
                      <span className="font-semibold text-sm sm:text-base">{item.text}</span>
                    </div>
                  ))}
                </div>

                {/* Stats Row */}
                <div className="mt-12 sm:mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 max-w-4xl mx-auto">
                  {[
                    { value: "100+", label: "Free Tools", icon: Award },
                    { value: "1M+", label: "Files Processed", icon: CheckCircle2 },
                    { value: "0", label: "Data Uploaded", icon: Shield },
                    { value: "24/7", label: "Available", icon: Clock },
                  ].map((stat, i) => (
                    <div key={i} className="text-center p-4 sm:p-5 rounded-xl sm:rounded-2xl bg-card/40 backdrop-blur-sm border border-border/50">
                      <stat.icon className="w-6 h-6 sm:w-8 sm:h-8 text-primary mx-auto mb-2" />
                      <div className="text-2xl sm:text-3xl md:text-4xl font-black bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                        {stat.value}
                      </div>
                      <div className="text-xs sm:text-sm text-muted-foreground font-medium">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Popular Tools - Premium Glass Cards */}
          <section className="py-10 sm:py-14 md:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16 bg-gradient-to-b from-secondary/50 to-background relative overflow-hidden">
            {/* Background Decoration */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
            
            <div className="w-full max-w-[1800px] mx-auto">
              <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-8 sm:mb-12 gap-4">
                <div>
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 mb-3">
                    <TrendingUp className="w-4 h-4 text-primary" />
                    <span className="text-xs font-bold text-primary uppercase tracking-wider">Trending Now</span>
                    <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                  </div>
                  <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black">Most Popular Tools</h2>
                  <p className="text-sm sm:text-base text-muted-foreground mt-2 max-w-lg">Quick access to our most-loved image and PDF tools - used by millions</p>
                </div>
                <Link to="/all-tools" className="hidden sm:flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary/10 text-primary font-semibold hover:bg-primary/20 transition-colors">
                  View All {totalTools}+ Tools <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
              
              <div className="grid grid-cols-2 xs:grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-8 2xl:grid-cols-12 gap-3 sm:gap-4 md:gap-5">
                {popularTools.map((tool, index) => (
                  <Link 
                    key={tool.slug}
                    to={`/${tool.slug}`}
                    className="group relative bg-gradient-to-br from-card to-card/80 rounded-xl sm:rounded-2xl p-3 sm:p-4 md:p-5 border border-border hover:border-primary/40 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-primary/10 overflow-hidden"
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    {/* Hover Glow Effect */}
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    
                    <div className="relative z-10">
                      <div className="relative mb-3 sm:mb-4">
                        <ToolIconWithBackground 
                          toolSlug={tool.slug} 
                          size={40} 
                          iconSize={20}
                          className="mx-auto sm:w-12 sm:h-12 md:w-14 md:h-14 group-hover:scale-110 transition-transform duration-300"
                        />
                      </div>
                      <h3 className="text-xs sm:text-sm md:text-base font-semibold text-center group-hover:text-primary transition-colors line-clamp-2">
                        {tool.name}
                      </h3>
                    </div>
                  </Link>
                ))}
              </div>
              
              <Link to="/all-tools" className="sm:hidden flex items-center justify-center gap-2 mt-6 px-6 py-3 rounded-xl bg-primary text-primary-foreground font-semibold">
                View All Tools <ArrowRight className="w-4 h-4" />
              </Link>
              
              {/* Ads after popular tools */}
              <AdBottom className="mt-8 sm:mt-12" />
              <AdVideo className="mt-4 sm:mt-6" />
            </div>
          </section>

          {/* Tool Categories - Modern Bento Grid Style */}
          <section className="py-12 sm:py-16 md:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16 relative">
            {/* Section Background Accent */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/[0.02] to-transparent pointer-events-none" />
            
            <div className="w-full max-w-[1800px] mx-auto relative z-10">
              <div className="text-center mb-10 sm:mb-14 lg:mb-16">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-primary/10 to-accent/10 border border-primary/20 mb-4">
                  <Layers className="w-4 h-4 text-primary" />
                  <span className="text-xs font-bold uppercase tracking-wider text-primary">{imageCategories.length} Categories</span>
                </div>
                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-black mb-4 sm:mb-6">
                  All Tools <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Organized</span>
                </h2>
                <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
                  Every tool you need for images and PDFs, organized into intuitive categories
                </p>
              </div>
              
              <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4 sm:gap-5 md:gap-6">
                {imageCategories.map((category, index) => {
                  const gradient = getGradient(category.id);
                  const categoryInfo = categoryDescriptions[category.id];
                  
                  return (
                    <Link 
                      key={category.id}
                      to={`/${category.slug}`}
                      className="group relative bg-gradient-to-br from-card via-card to-card/90 rounded-2xl sm:rounded-3xl p-4 sm:p-5 md:p-6 border border-border hover:border-transparent transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl overflow-hidden"
                      style={{ animationDelay: `${index * 30}ms` }}
                    >
                      {/* Animated Border Gradient on Hover */}
                      <div 
                        className="absolute inset-0 rounded-2xl sm:rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10"
                        style={{ 
                          background: `linear-gradient(135deg, ${gradient.from}40, ${gradient.to}40)`,
                          padding: '1px'
                        }}
                      />
                      
                      {/* Background Glow */}
                      <div 
                        className="absolute -top-20 -right-20 w-40 h-40 rounded-full blur-3xl opacity-0 group-hover:opacity-30 transition-opacity duration-500 pointer-events-none"
                        style={{ background: `linear-gradient(135deg, ${gradient.from}, ${gradient.to})` }}
                      />
                      
                      {/* Category Icon with Glow */}
                      <div className="relative mb-4 sm:mb-5">
                        <div 
                          className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-xl sm:rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-xl group-hover:scale-110 transition-all duration-300"
                          style={{ background: `linear-gradient(135deg, ${gradient.from}, ${gradient.to})` }}
                        >
                          <div className="[&>svg]:w-6 [&>svg]:h-6 sm:[&>svg]:w-7 sm:[&>svg]:h-7 md:[&>svg]:w-8 md:[&>svg]:h-8">
                            {categoryLucideIcons[category.id] || <Image className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-white" />}
                          </div>
                        </div>
                        {/* Tool Count Badge */}
                        <div className="absolute -top-1 -right-1 w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-card border-2 border-border flex items-center justify-center">
                          <span className="text-[10px] sm:text-xs font-bold text-primary">{category.tools.length}</span>
                        </div>
                      </div>
                      
                      {/* Category Title */}
                      <h3 className="text-base sm:text-lg md:text-xl font-bold mb-2 sm:mb-3 group-hover:text-primary transition-colors">
                        {category.name}
                      </h3>
                      
                      {/* Category Description */}
                      <p className="text-xs sm:text-sm text-muted-foreground line-clamp-2 mb-4">
                        {categoryInfo?.description || category.description}
                      </p>
                      
                      {/* CTA Button */}
                      <div className="flex items-center gap-2 text-sm font-semibold text-primary group-hover:gap-3 transition-all">
                        <span>Explore</span>
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </Link>
                  );
                })}
              </div>
              
              {/* Inline Ad - After Categories */}
              <AdInline className="mt-10 sm:mt-14" />
            </div>
          </section>

          {/* How It Works - Step by step with icons */}
          <section className="py-8 sm:py-12 md:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 xl:px-12 bg-gradient-hero">
            <div className="w-full">
              <div className="text-center mb-8 sm:mb-12">
                <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-3 sm:mb-4">How Browser-Based Processing Works</h2>
                <p className="text-sm sm:text-base md:text-lg text-muted-foreground max-w-full sm:max-w-xl md:max-w-2xl mx-auto px-2 sm:px-0">
                  Unlike traditional online tools, MultiToolsA processes everything locally on your device. 
                  Here's why this matters for your privacy and speed.
                </p>
              </div>
              
              {/* Steps with connecting arrows */}
              <div className="relative">
                {/* Connecting lines - visible on desktop */}
                <div className="hidden md:block absolute top-[120px] left-[33%] w-[34%] h-0.5 bg-gradient-to-r from-primary/50 via-primary to-primary/50 z-10">
                  <div className="absolute -right-2 top-1/2 -translate-y-1/2 w-0 h-0 border-t-[6px] border-t-transparent border-b-[6px] border-b-transparent border-l-[10px] border-l-primary" />
                </div>
                <div className="hidden md:block absolute top-[120px] right-[33%] w-[34%] h-0.5 bg-gradient-to-r from-primary/50 via-primary to-primary/50 z-10 translate-x-[100%]">
                  <div className="absolute -right-2 top-1/2 -translate-y-1/2 w-0 h-0 border-t-[6px] border-t-transparent border-b-[6px] border-b-transparent border-l-[10px] border-l-primary" />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 mb-8 sm:mb-12">
                  {/* Step 1 */}
                  <div 
                    className="bg-card rounded-xl sm:rounded-2xl border border-border overflow-hidden group hover:border-primary/30 transition-all hover:shadow-xl animate-fade-in"
                    style={{ animationDelay: '0ms', animationFillMode: 'both' }}
                  >
                    {/* Screenshot */}
                    <div className="relative aspect-video overflow-hidden bg-muted">
                      <img 
                        src={stepUpload4k} 
                        alt="Step 1: Select your image files using the secure file picker"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                      />
                      <div className="absolute top-2 left-2 sm:top-3 sm:left-3 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-sm sm:text-lg shadow-lg">
                        1
                      </div>
                    </div>
                    {/* Content */}
                    <div className="p-4 sm:p-5 md:p-6">
                      <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
                        <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                          <Upload className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
                        </div>
                        <h3 className="text-sm sm:text-base md:text-lg font-bold">Select Your Files</h3>
                      </div>
                      <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                        Choose images or documents from your device using our secure file picker.
                      </p>
                    </div>
                  </div>
                  
                  {/* Step 2 */}
                  <div 
                    className="bg-card rounded-xl sm:rounded-2xl border border-border overflow-hidden group hover:border-primary/30 transition-all hover:shadow-xl animate-fade-in"
                    style={{ animationDelay: '150ms', animationFillMode: 'both' }}
                  >
                    {/* Screenshot */}
                    <div className="relative aspect-video overflow-hidden bg-muted">
                      <img 
                        src={stepPreview4k} 
                        alt="Step 2: Preview and process your image locally in the browser"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                      />
                      <div className="absolute top-2 left-2 sm:top-3 sm:left-3 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-sm sm:text-lg shadow-lg">
                        2
                      </div>
                    </div>
                    {/* Content */}
                    <div className="p-4 sm:p-5 md:p-6">
                      <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
                        <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                          <Cpu className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
                        </div>
                        <h3 className="text-sm sm:text-base md:text-lg font-bold">Process Locally</h3>
                      </div>
                      <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                        Our tools process everything using your device's computing power.
                      </p>
                    </div>
                  </div>
                  
                  {/* Step 3 */}
                  <div 
                    className="bg-card rounded-xl sm:rounded-2xl border border-border overflow-hidden group hover:border-primary/30 transition-all hover:shadow-xl animate-fade-in"
                    style={{ animationDelay: '300ms', animationFillMode: 'both' }}
                  >
                    {/* Screenshot */}
                    <div className="relative aspect-video overflow-hidden bg-muted">
                      <img 
                        src={stepDownload4k} 
                        alt="Step 3: Download your edited image instantly to your device"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                      />
                      <div className="absolute top-2 left-2 sm:top-3 sm:left-3 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-sm sm:text-lg shadow-lg">
                        3
                      </div>
                    </div>
                    {/* Content */}
                    <div className="p-4 sm:p-5 md:p-6">
                      <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
                        <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                          <Download className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
                        </div>
                        <h3 className="text-sm sm:text-base md:text-lg font-bold">Download Instantly</h3>
                      </div>
                      <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                        Save your edited files directly to your device with one click.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Privacy emphasis */}
              <div className="bg-card rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 border border-green-500/30 flex flex-col md:flex-row items-center gap-4 sm:gap-6">
                <div className="flex-shrink-0">
                  <div className="w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-full bg-green-500/10 flex items-center justify-center">
                    <Shield className="w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10 text-green-500" />
                  </div>
                </div>
                <div className="text-center md:text-left">
                  <h3 className="text-base sm:text-lg md:text-xl font-bold mb-1 sm:mb-2 flex items-center gap-2 justify-center md:justify-start">
                    <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-green-500" />
                    Your Files Stay Completely Private
                  </h3>
                  <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                    Your images are processed entirely within your browser. No data is transmitted to servers or stored anywhere.
                  </p>
                </div>
              </div>
              
              <div className="text-center mt-6 sm:mt-8">
                <Link 
                  to="/how-tools-work"
                  className="inline-flex items-center gap-2 px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg sm:rounded-xl bg-primary text-primary-foreground text-sm sm:text-base font-semibold hover:bg-primary/90 transition-all"
                >
                  Learn More
                  <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
                </Link>
              </div>
              
              {/* Inline Ad - After How It Works */}
              <AdInline className="mt-6 sm:mt-8" />
            </div>
          </section>

          {/* Why Choose Us - Trust signals */}
          <section className="py-8 sm:py-12 md:py-16 px-4 sm:px-6 lg:px-8 xl:px-12">
            <div className="w-full">
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-center mb-3 sm:mb-4">Why Thousands Choose MultiToolsA</h2>
              <p className="text-center text-xs sm:text-sm md:text-base text-muted-foreground mb-8 sm:mb-12 max-w-full sm:max-w-xl md:max-w-2xl mx-auto px-2 sm:px-0">
                Professional-quality tools with uncompromising privacy.
              </p>
              
              <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
                <div className="bg-card rounded-lg sm:rounded-xl p-3 sm:p-4 md:p-6 border border-border text-center">
                  <Clock className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 text-primary mx-auto mb-2 sm:mb-4" />
                  <h3 className="text-xs sm:text-sm md:text-base font-bold mb-1 sm:mb-2">No Waiting</h3>
                  <p className="text-[10px] sm:text-xs md:text-sm text-muted-foreground">
                    Instant results without uploads
                  </p>
                </div>
                <div className="bg-card rounded-xl p-6 border border-border text-center">
                  <Lock className="w-10 h-10 text-primary mx-auto mb-4" />
                  <h3 className="font-bold mb-2">Zero Data Collection</h3>
                  <p className="text-sm text-muted-foreground">
                    We never see, store, or access your files or personal information
                  </p>
                </div>
                <div className="bg-card rounded-xl p-6 border border-border text-center">
                  <Users className="w-10 h-10 text-primary mx-auto mb-4" />
                  <h3 className="font-bold mb-2">No Account Needed</h3>
                  <p className="text-sm text-muted-foreground">
                    Start using any tool immediately without registration
                  </p>
                </div>
                <div className="bg-card rounded-xl p-6 border border-border text-center">
                  <Award className="w-10 h-10 text-primary mx-auto mb-4" />
                  <h3 className="font-bold mb-2">Professional Quality</h3>
                  <p className="text-sm text-muted-foreground">
                    Enterprise-grade tools available completely free
                  </p>
                </div>
              </div>
              
              {/* Ad after Why Choose Us */}
              <AdBottom className="mt-10" />
            </div>
          </section>
          
          {/* Additional Video Ad Section */}
          <section className="py-6 px-4 sm:px-6">
            <div className="container mx-auto max-w-6xl">
              <AdVideo />
            </div>
          </section>

          {/* Featured Blog Posts - Educational content */}
          <section className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 xl:px-12 bg-secondary/30">
            <div className="container mx-auto max-w-7xl 2xl:max-w-[1600px]">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <BookOpen className="w-5 h-5 text-primary" />
                    <span className="text-sm font-semibold text-primary uppercase tracking-wide">Learn</span>
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-bold">Image Editing Guides & Tutorials</h2>
                  <p className="text-muted-foreground mt-1">Expert advice to help you get the most from your images</p>
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
                    className="group bg-card rounded-xl overflow-hidden border border-border hover:border-primary/50 transition-all hover:-translate-y-1 hover:shadow-lg"
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
                      <h3 className="font-bold group-hover:text-primary transition-colors line-clamp-2 mb-2">
                        {post.title}
                      </h3>
                      <p className="text-sm text-muted-foreground line-clamp-2">{post.excerpt}</p>
                    </div>
                  </Link>
                ))}
              </div>
              
              <Link to="/blog" className="sm:hidden flex text-primary hover:underline items-center justify-center gap-1 font-medium mt-6">
                All Articles <ArrowRight className="w-4 h-4" />
              </Link>
              
              {/* Ad after Blog Posts */}
              <AdInline className="mt-10" />
            </div>
          </section>

          {/* Resources & Guides Section */}
          <section className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 xl:px-12">
            <div className="container mx-auto max-w-7xl 2xl:max-w-[1600px]">
              <h2 className="text-2xl sm:text-3xl font-bold text-center mb-4">Resources & Learning Center</h2>
              <p className="text-center text-muted-foreground mb-10 max-w-2xl mx-auto">
                Expand your image editing knowledge with our comprehensive guides and documentation
              </p>
              
              <div className="grid sm:grid-cols-2 gap-6">
                <Link 
                  to="/image-formats-guide"
                  className="bg-card rounded-xl p-6 border border-border hover:border-primary/50 transition-all group flex gap-4"
                >
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center">
                      <FileText className="w-6 h-6 text-blue-500" />
                    </div>
                  </div>
                  <div>
                    <h3 className="font-bold mb-2 group-hover:text-primary transition-colors">Image Formats Guide</h3>
                    <p className="text-sm text-muted-foreground">
                      Understand when to use JPEG, PNG, WebP, and other formats. Learn the technical differences and choose 
                      the right format for every project.
                    </p>
                    <span className="inline-flex items-center gap-1 text-primary text-sm font-medium mt-3">
                      Read Guide <ArrowRight className="w-4 h-4" />
                    </span>
                  </div>
                </Link>
                
                <Link 
                  to="/tutorials"
                  className="bg-card rounded-xl p-6 border border-border hover:border-primary/50 transition-all group flex gap-4"
                >
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 rounded-xl bg-purple-500/10 flex items-center justify-center">
                      <BookOpen className="w-6 h-6 text-purple-500" />
                    </div>
                  </div>
                  <div>
                    <h3 className="font-bold mb-2 group-hover:text-primary transition-colors">Step-by-Step Tutorials</h3>
                    <p className="text-sm text-muted-foreground">
                      Follow detailed walkthroughs for common image editing tasks. From basic resizing to advanced 
                      optimization techniques, master every tool.
                    </p>
                    <span className="inline-flex items-center gap-1 text-primary text-sm font-medium mt-3">
                      Browse Tutorials <ArrowRight className="w-4 h-4" />
                    </span>
                  </div>
                </Link>
                
                <Link 
                  to="/faq"
                  className="bg-card rounded-xl p-6 border border-border hover:border-primary/50 transition-all group flex gap-4"
                >
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 rounded-xl bg-green-500/10 flex items-center justify-center">
                      <CheckCircle2 className="w-6 h-6 text-green-500" />
                    </div>
                  </div>
                  <div>
                    <h3 className="font-bold mb-2 group-hover:text-primary transition-colors">Frequently Asked Questions</h3>
                    <p className="text-sm text-muted-foreground">
                      Find answers to common questions about our tools, privacy policies, and supported formats. 
                      Get quick solutions to typical issues.
                    </p>
                    <span className="inline-flex items-center gap-1 text-primary text-sm font-medium mt-3">
                      View FAQ <ArrowRight className="w-4 h-4" />
                    </span>
                  </div>
                </Link>
                
                <Link 
                  to="/how-tools-work"
                  className="bg-card rounded-xl p-6 border border-border hover:border-primary/50 transition-all group flex gap-4"
                >
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 rounded-xl bg-orange-500/10 flex items-center justify-center">
                      <Cpu className="w-6 h-6 text-orange-500" />
                    </div>
                  </div>
                  <div>
                    <h3 className="font-bold mb-2 group-hover:text-primary transition-colors">How Our Technology Works</h3>
                    <p className="text-sm text-muted-foreground">
                      Discover the technical foundation behind our browser-based processing. Learn how we ensure 
                      privacy while delivering professional results.
                    </p>
                    <span className="inline-flex items-center gap-1 text-primary text-sm font-medium mt-3">
                      Learn More <ArrowRight className="w-4 h-4" />
                    </span>
                  </div>
                </Link>
              </div>
              
              {/* Ad after Resources */}
              <AdVideo className="mt-10" />
            </div>
          </section>
          
          {/* Inline Ad before Final CTA */}
          <section className="py-6 px-4 sm:px-6 lg:px-8 xl:px-12 bg-secondary/20">
            <div className="container mx-auto max-w-7xl 2xl:max-w-[1600px]">
              <AdBottom />
            </div>
          </section>

          {/* Final CTA Section */}
          <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 xl:px-12 bg-gradient-hero">
            <div className="container mx-auto max-w-5xl 2xl:max-w-6xl text-center">
              <h2 className="text-3xl sm:text-4xl font-bold mb-6">Ready to Transform Your Images?</h2>
              <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                Start editing, converting, and compressing your files instantly—completely free, right in your browser. 
                No registration, no uploads to external servers, no limits.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Link 
                  to="/all-tools"
                  className="inline-flex items-center justify-center gap-2 px-10 py-5 rounded-xl bg-primary text-primary-foreground font-bold text-lg hover:bg-primary/90 transition-all hover:scale-105 shadow-xl"
                >
                  Explore All {totalTools}+ Tools
                  <ArrowRight className="w-6 h-6" />
                </Link>
              </div>
              <p className="text-sm text-muted-foreground mt-6">
                Join thousands of users who trust MultiToolsA for their daily image editing needs
              </p>
            </div>
          </section>
        </main>
        
        <Footer />
      </div>
    </>
  );
};

export default HomePage;
