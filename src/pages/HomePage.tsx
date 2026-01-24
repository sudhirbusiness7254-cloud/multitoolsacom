import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import GradientWaveBackground from "@/components/GradientWaveBackground";
import { AdBottom, AdInline, AdExoticFat, AdPopunder, AdNative, AdPush, HilltopBanner } from "@/components/ads/AdContainer";
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
          {/* Hero Section - Engaging introduction with animated wave background */}
          <section className="py-8 sm:py-12 md:py-16 lg:py-20 xl:py-24 bg-gradient-hero relative overflow-hidden min-h-[500px] sm:min-h-[550px] md:min-h-[600px] lg:min-h-[700px]">
            {/* Animated Gradient Wave Background */}
            <GradientWaveBackground />
            
            {/* Decorative blurred circles */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[280px] sm:w-[350px] md:w-[450px] lg:w-[500px] h-[280px] sm:h-[350px] md:h-[450px] lg:h-[500px] bg-primary/10 rounded-full blur-3xl pointer-events-none z-[1]" />
            <div className="absolute top-20 right-10 w-[150px] md:w-[200px] h-[150px] md:h-[200px] bg-accent/5 rounded-full blur-2xl pointer-events-none hidden lg:block z-[1]" />
            
            <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12 relative z-10">
              <div className="text-center max-w-full sm:max-w-2xl md:max-w-3xl lg:max-w-4xl xl:max-w-5xl 2xl:max-w-6xl mx-auto">
                {/* H1 - Main site title */}
                <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-4 sm:mb-6 leading-tight">
                  Professional Image & PDF Tools
                  <span className="block text-primary mt-1 sm:mt-2">Completely Free, Totally Private</span>
                </h1>
                
                {/* Engaging introduction - 3-5 sentences */}
                <p className="text-sm sm:text-base md:text-lg lg:text-xl text-muted-foreground max-w-full sm:max-w-xl md:max-w-2xl lg:max-w-3xl mx-auto mb-3 sm:mb-4 leading-relaxed px-2 sm:px-0">
                  Welcome to <strong>MultiToolsA</strong>, your trusted destination for over 100 professional-grade image editing and PDF tools. 
                  Every tool runs entirely in your browser, which means your files never leave your device and are never uploaded to any server.
                </p>
                <p className="text-xs sm:text-sm md:text-base lg:text-lg text-muted-foreground max-w-full sm:max-w-lg md:max-w-xl lg:max-w-2xl mx-auto mb-6 sm:mb-8 px-2 sm:px-0">
                  Enjoy instant results with no waiting for uploads or downloads. Whether you need to convert formats, compress large files, 
                  resize images, or edit PDFs, our tools deliver professional quality with complete privacy protection.
                </p>
                
                <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 mb-8 sm:mb-10 px-2 sm:px-0">
                  <Link 
                    to="/all-tools"
                    className="inline-flex items-center justify-center gap-2 px-5 sm:px-6 md:px-8 py-3 sm:py-3.5 md:py-4 rounded-lg sm:rounded-xl bg-primary text-primary-foreground text-sm sm:text-base font-semibold hover:bg-primary/90 transition-all hover:scale-105 shadow-lg"
                  >
                    Explore {totalTools}+ Free Tools
                    <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
                  </Link>
                  <Link 
                    to="/how-tools-work"
                    className="inline-flex items-center justify-center gap-2 px-5 sm:px-6 md:px-8 py-3 sm:py-3.5 md:py-4 rounded-lg sm:rounded-xl bg-card text-foreground text-sm sm:text-base font-semibold border border-border hover:border-primary/50 transition-all"
                  >
                    <Eye className="w-4 h-4 sm:w-5 sm:h-5" />
                    See How It Works
                  </Link>
                </div>

                {/* Privacy & Trust Badges */}
                <div className="flex flex-wrap justify-center gap-2 sm:gap-3 md:gap-4 lg:gap-6 text-xs sm:text-sm px-2 sm:px-0">
                  <div className="flex items-center gap-1.5 sm:gap-2 bg-card/80 backdrop-blur-sm px-2.5 sm:px-3 md:px-4 py-1.5 sm:py-2 rounded-full border border-border">
                    <Shield className="w-4 h-4 sm:w-5 sm:h-5 text-green-500" />
                    <span className="font-medium">100% Private</span>
                  </div>
                  <div className="flex items-center gap-1.5 sm:gap-2 bg-card/80 backdrop-blur-sm px-2.5 sm:px-3 md:px-4 py-1.5 sm:py-2 rounded-full border border-border">
                    <Zap className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-500" />
                    <span className="font-medium">Instant Results</span>
                  </div>
                  <div className="flex items-center gap-1.5 sm:gap-2 bg-card/80 backdrop-blur-sm px-2.5 sm:px-3 md:px-4 py-1.5 sm:py-2 rounded-full border border-border">
                    <Globe className="w-4 h-4 sm:w-5 sm:h-5 text-blue-500" />
                    <span className="font-medium">Any Device</span>
                  </div>
                  <div className="flex items-center gap-1.5 sm:gap-2 bg-card/80 backdrop-blur-sm px-2.5 sm:px-3 md:px-4 py-1.5 sm:py-2 rounded-full border border-border">
                    <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-purple-500" />
                    <span className="font-medium">No Signup</span>
                  </div>
                </div>
              </div>
              
              {/* Hilltop Banner Ads - Below Hero Badges */}
              <div className="mt-6 flex flex-col items-center gap-3">
                <HilltopBanner variant={1} />
                <HilltopBanner variant={2} />
              </div>
            </div>
          </section>

          {/* Popular Tools - Quick access */}
          <section className="py-4 sm:py-6 px-4 sm:px-6 lg:px-8 xl:px-12 bg-secondary/30">
            <div className="w-full">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 gap-2">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
                    <span className="text-xs sm:text-sm font-semibold text-primary uppercase tracking-wide">Most Popular</span>
                  </div>
                  <h2 className="text-xl sm:text-2xl md:text-3xl font-bold">Frequently Used Tools</h2>
                  <p className="text-xs sm:text-sm text-muted-foreground mt-1">Quick access to our most popular image and PDF tools</p>
                </div>
                <Link to="/all-tools" className="hidden sm:flex text-primary hover:underline items-center gap-1 text-sm font-medium">
                  View All Tools <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
              
              <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-2 sm:gap-3 md:gap-4">
                {popularTools.map((tool) => (
                  <Link 
                    key={tool.slug}
                    to={`/${tool.slug}`}
                    className="group bg-card rounded-lg sm:rounded-xl p-2 sm:p-3 md:p-4 border border-border hover:border-primary/50 transition-all hover:-translate-y-1 hover:shadow-lg"
                  >
                    <ToolIconWithBackground 
                      toolSlug={tool.slug} 
                      size={32} 
                      iconSize={16}
                      className="mb-2 sm:mb-3 mx-auto sm:w-10 sm:h-10"
                    />
                    <h3 className="text-[10px] sm:text-xs md:text-sm font-medium text-center group-hover:text-primary transition-colors line-clamp-2">
                      {tool.name}
                    </h3>
                  </Link>
                ))}
              </div>
              
              <Link to="/all-tools" className="sm:hidden flex text-primary hover:underline items-center justify-center gap-1 font-medium text-sm mt-3">
                View All Tools <ArrowRight className="w-4 h-4" />
              </Link>
              
              {/* Ads after popular tools - compact */}
              <AdExoticFat className="mt-4" />
              <AdNative className="mt-3" />
            </div>
          </section>

          {/* Tool Categories - Detailed with unique descriptions */}
          <section className="py-4 sm:py-6 px-4 sm:px-6 lg:px-8 xl:px-12">
            <div className="w-full">
              <div className="text-center mb-4 sm:mb-6">
                <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-2">Complete Image & PDF Tool Collection</h2>
                <p className="text-sm sm:text-base text-muted-foreground max-w-full sm:max-w-xl md:max-w-2xl mx-auto px-2 sm:px-0">
                  Explore {imageCategories.length} specialized categories covering every aspect of image editing and document processing.
                </p>
              </div>
              
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4 md:gap-5">
                {imageCategories.map((category) => {
                  const gradient = getGradient(category.id);
                  const categoryInfo = categoryDescriptions[category.id];
                  
                  return (
                    <Link 
                      key={category.id}
                      to={`/${category.slug}`}
                      className="group bg-card rounded-xl sm:rounded-2xl p-3 sm:p-4 md:p-5 border border-border hover:border-primary/50 transition-all hover:-translate-y-1 hover:shadow-xl"
                    >
                      {/* Category Icon */}
                      <div 
                        className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-lg sm:rounded-xl flex items-center justify-center mb-3 sm:mb-4 shadow-md"
                        style={{ background: `linear-gradient(135deg, ${gradient.from}, ${gradient.to})` }}
                      >
                        <div className="[&>svg]:w-5 [&>svg]:h-5 sm:[&>svg]:w-6 sm:[&>svg]:h-6 md:[&>svg]:w-7 md:[&>svg]:h-7">
                          {categoryLucideIcons[category.id] || <Image className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 text-white" />}
                        </div>
                      </div>
                      
                      {/* Category Title */}
                      <h3 className="text-sm sm:text-base md:text-lg font-bold mb-1.5 sm:mb-2 group-hover:text-primary transition-colors">
                        {category.name}
                      </h3>
                      
                      {/* Category Description */}
                      <p className="text-xs sm:text-sm text-muted-foreground line-clamp-2 sm:line-clamp-3 mb-3 sm:mb-4">
                        {categoryInfo?.description || category.description}
                      </p>
                      
                      {/* Tools Count & Arrow */}
                      <div className="flex items-center justify-between">
                        <span className="text-xs sm:text-sm font-medium text-primary">
                          {category.tools.length} Tools
                        </span>
                        <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 text-primary group-hover:translate-x-1 transition-transform" />
                      </div>
                    </Link>
                  );
                })}
              </div>
              
              {/* Ads - After Categories - compact */}
              <AdExoticFat className="mt-4" />
              <AdNative className="mt-3" />
              <AdInline className="mt-3" />
            </div>
          </section>

          {/* How It Works - Step by step with icons */}
          <section className="py-4 sm:py-6 px-4 sm:px-6 lg:px-8 xl:px-12 bg-gradient-hero">
            <div className="w-full">
              <div className="text-center mb-4 sm:mb-6">
                <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-2">How Browser-Based Processing Works</h2>
                <p className="text-sm sm:text-base text-muted-foreground max-w-full sm:max-w-xl md:max-w-2xl mx-auto px-2 sm:px-0">
                  Unlike traditional online tools, MultiToolsA processes everything locally on your device.
                </p>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4 mb-4">
                {/* Step 1 */}
                <div className="bg-card rounded-xl border border-border overflow-hidden group hover:border-primary/30 transition-all">
                  <div className="relative aspect-video overflow-hidden bg-muted">
                    <img 
                      src={stepUpload4k} 
                      alt="Step 1: Select your image files"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                    <div className="absolute top-2 left-2 w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-sm shadow-lg">
                      1
                    </div>
                  </div>
                  <div className="p-3 sm:p-4">
                    <div className="flex items-center gap-2 mb-1">
                      <Upload className="w-4 h-4 text-primary" />
                      <h3 className="text-sm sm:text-base font-bold">Select Your Files</h3>
                    </div>
                    <p className="text-xs text-muted-foreground">Choose images from your device using our secure file picker.</p>
                  </div>
                </div>
                
                {/* Step 2 */}
                <div className="bg-card rounded-xl border border-border overflow-hidden group hover:border-primary/30 transition-all">
                  <div className="relative aspect-video overflow-hidden bg-muted">
                    <img 
                      src={stepPreview4k} 
                      alt="Step 2: Process locally"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                    <div className="absolute top-2 left-2 w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-sm shadow-lg">
                      2
                    </div>
                  </div>
                  <div className="p-3 sm:p-4">
                    <div className="flex items-center gap-2 mb-1">
                      <Cpu className="w-4 h-4 text-primary" />
                      <h3 className="text-sm sm:text-base font-bold">Process Locally</h3>
                    </div>
                    <p className="text-xs text-muted-foreground">Our tools process everything using your device's computing power.</p>
                  </div>
                </div>
                
                {/* Step 3 */}
                <div className="bg-card rounded-xl border border-border overflow-hidden group hover:border-primary/30 transition-all">
                  <div className="relative aspect-video overflow-hidden bg-muted">
                    <img 
                      src={stepDownload4k} 
                      alt="Step 3: Download instantly"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                    <div className="absolute top-2 left-2 w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-sm shadow-lg">
                      3
                    </div>
                  </div>
                  <div className="p-3 sm:p-4">
                    <div className="flex items-center gap-2 mb-1">
                      <Download className="w-4 h-4 text-primary" />
                      <h3 className="text-sm sm:text-base font-bold">Download Instantly</h3>
                    </div>
                    <p className="text-xs text-muted-foreground">Save your edited files directly to your device with one click.</p>
                  </div>
                </div>
              </div>
              
              {/* Privacy emphasis - compact */}
              <div className="bg-card rounded-xl p-3 sm:p-4 border border-green-500/30 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-green-500/10 flex items-center justify-center flex-shrink-0">
                  <Shield className="w-5 h-5 text-green-500" />
                </div>
                <div>
                  <h3 className="text-sm font-bold flex items-center gap-1">
                    <CheckCircle2 className="w-4 h-4 text-green-500" />
                    Your Files Stay Completely Private
                  </h3>
                  <p className="text-xs text-muted-foreground">Your images are processed entirely within your browser. No data is transmitted to servers.</p>
                </div>
              </div>
              
              <div className="text-center mt-4">
                <Link 
                  to="/how-tools-work"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary/90 transition-all"
                >
                  Learn More <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
              
              {/* Ad - After How It Works */}
              <AdExoticFat className="mt-4" />
              <AdNative className="mt-3" />
            </div>
          </section>

          {/* Why Choose Us - Trust signals */}
          <section className="py-4 sm:py-6 px-4 sm:px-6 lg:px-8 xl:px-12">
            <div className="w-full">
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-center mb-2">Why Thousands Choose MultiToolsA</h2>
              <p className="text-center text-xs sm:text-sm text-muted-foreground mb-4 max-w-full sm:max-w-xl md:max-w-2xl mx-auto">
                Professional-quality tools with uncompromising privacy.
              </p>
              
              <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-2 sm:gap-3">
                <div className="bg-card rounded-lg p-3 border border-border text-center">
                  <Clock className="w-6 h-6 text-primary mx-auto mb-2" />
                  <h3 className="text-xs sm:text-sm font-bold mb-1">No Waiting</h3>
                  <p className="text-[10px] sm:text-xs text-muted-foreground">Instant results without uploads</p>
                </div>
                <div className="bg-card rounded-lg p-3 border border-border text-center">
                  <Lock className="w-6 h-6 text-primary mx-auto mb-2" />
                  <h3 className="text-xs sm:text-sm font-bold mb-1">Zero Data Collection</h3>
                  <p className="text-[10px] sm:text-xs text-muted-foreground">We never see or store your files</p>
                </div>
                <div className="bg-card rounded-lg p-3 border border-border text-center">
                  <Users className="w-6 h-6 text-primary mx-auto mb-2" />
                  <h3 className="text-xs sm:text-sm font-bold mb-1">No Account Needed</h3>
                  <p className="text-[10px] sm:text-xs text-muted-foreground">Start using tools immediately</p>
                </div>
                <div className="bg-card rounded-lg p-3 border border-border text-center">
                  <Award className="w-6 h-6 text-primary mx-auto mb-2" />
                  <h3 className="text-xs sm:text-sm font-bold mb-1">Professional Quality</h3>
                  <p className="text-[10px] sm:text-xs text-muted-foreground">Enterprise-grade tools for free</p>
                </div>
              </div>
              
              {/* Ad - After Why Choose Us */}
              <AdExoticFat className="mt-4" />
              <AdNative className="mt-3" />
              <AdInline className="mt-3" />
            </div>
          </section>

          {/* Featured Blog Posts - Educational content */}
          <section className="py-4 sm:py-6 px-4 sm:px-6 lg:px-8 xl:px-12 bg-secondary/30">
            <div className="w-full">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <BookOpen className="w-4 h-4 text-primary" />
                    <span className="text-xs font-semibold text-primary uppercase tracking-wide">Learn</span>
                  </div>
                  <h2 className="text-xl sm:text-2xl font-bold">Image Editing Guides & Tutorials</h2>
                </div>
                <Link to="/blog" className="hidden sm:flex text-primary hover:underline items-center gap-1 text-sm font-medium">
                  All Articles <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
              
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                {featuredPosts.map((post) => (
                  <Link 
                    key={post.id}
                    to={`/blog/${post.id}`}
                    className="group bg-card rounded-xl overflow-hidden border border-border hover:border-primary/50 transition-all hover:-translate-y-1"
                  >
                    <div className="aspect-video overflow-hidden">
                      <img 
                        src={post.image} 
                        alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        loading="lazy"
                      />
                    </div>
                    <div className="p-3 sm:p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-xs px-2 py-0.5 bg-primary/10 text-primary rounded-full font-medium">{post.category}</span>
                        <span className="text-xs text-muted-foreground">{post.readTime}</span>
                      </div>
                      <h3 className="text-sm font-bold group-hover:text-primary transition-colors line-clamp-2">{post.title}</h3>
                    </div>
                  </Link>
                ))}
              </div>
              
              <Link to="/blog" className="sm:hidden flex text-primary hover:underline items-center justify-center gap-1 font-medium text-sm mt-3">
                All Articles <ArrowRight className="w-4 h-4" />
              </Link>
              
              {/* Ad - After Blog Posts */}
              <AdExoticFat className="mt-4" />
              <AdNative className="mt-3" />
            </div>
          </section>

          {/* Resources & Guides Section */}
          <section className="py-4 sm:py-6 px-4 sm:px-6 lg:px-8 xl:px-12">
            <div className="w-full">
              <h2 className="text-xl sm:text-2xl font-bold text-center mb-2">Resources & Learning Center</h2>
              <p className="text-center text-sm text-muted-foreground mb-4 max-w-2xl mx-auto">
                Expand your image editing knowledge with our comprehensive guides
              </p>
              
              <div className="grid sm:grid-cols-2 gap-3">
                <Link 
                  to="/image-formats-guide"
                  className="bg-card rounded-xl p-4 border border-border hover:border-primary/50 transition-all group flex gap-3"
                >
                  <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center flex-shrink-0">
                    <FileText className="w-5 h-5 text-blue-500" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold group-hover:text-primary transition-colors">Image Formats Guide</h3>
                    <p className="text-xs text-muted-foreground line-clamp-2">
                      Understand when to use JPEG, PNG, WebP, and other formats.
                    </p>
                  </div>
                </Link>
                
                <Link 
                  to="/tutorials"
                  className="bg-card rounded-xl p-4 border border-border hover:border-primary/50 transition-all group flex gap-3"
                >
                  <div className="w-10 h-10 rounded-lg bg-purple-500/10 flex items-center justify-center flex-shrink-0">
                    <BookOpen className="w-5 h-5 text-purple-500" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold group-hover:text-primary transition-colors">Step-by-Step Tutorials</h3>
                    <p className="text-xs text-muted-foreground line-clamp-2">
                      Follow detailed walkthroughs for common image editing tasks.
                    </p>
                  </div>
                </Link>
                
                <Link 
                  to="/faq"
                  className="bg-card rounded-xl p-4 border border-border hover:border-primary/50 transition-all group flex gap-3"
                >
                  <div className="w-10 h-10 rounded-lg bg-green-500/10 flex items-center justify-center flex-shrink-0">
                    <CheckCircle2 className="w-5 h-5 text-green-500" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold group-hover:text-primary transition-colors">Frequently Asked Questions</h3>
                    <p className="text-xs text-muted-foreground line-clamp-2">
                      Find answers to common questions about our tools.
                    </p>
                  </div>
                </Link>
                
                <Link 
                  to="/how-tools-work"
                  className="bg-card rounded-xl p-4 border border-border hover:border-primary/50 transition-all group flex gap-3"
                >
                  <div className="w-10 h-10 rounded-lg bg-orange-500/10 flex items-center justify-center flex-shrink-0">
                    <Cpu className="w-5 h-5 text-orange-500" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold group-hover:text-primary transition-colors">How Our Technology Works</h3>
                    <p className="text-xs text-muted-foreground line-clamp-2">
                      Discover the technical foundation behind our browser-based processing.
                    </p>
                  </div>
                </Link>
              </div>
              
              {/* Ad - After Resources */}
              <AdExoticFat className="mt-4" />
              <AdNative className="mt-3" />
              <AdBottom className="mt-3" />
            </div>
          </section>

          {/* Final CTA Section */}
          <section className="py-6 sm:py-8 px-4 sm:px-6 lg:px-8 xl:px-12 bg-gradient-hero">
            <div className="w-full max-w-4xl mx-auto text-center">
              <h2 className="text-2xl sm:text-3xl font-bold mb-3">Ready to Transform Your Images?</h2>
              <p className="text-sm sm:text-base text-muted-foreground mb-4 max-w-xl mx-auto">
                Start editing, converting, and compressing your files instantly—completely free, right in your browser.
              </p>
              <Link 
                to="/all-tools"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-primary text-primary-foreground font-bold hover:bg-primary/90 transition-all hover:scale-105 shadow-lg"
              >
                Explore All {totalTools}+ Tools
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </section>
        </main>
        
        <Footer />
        
        {/* Popunder Ad - One time per user */}
        <AdPopunder />
        
        {/* Push/Notification Ad - Loads for push prompts */}
        <AdPush />
      </div>
    </>
  );
};

export default HomePage;
