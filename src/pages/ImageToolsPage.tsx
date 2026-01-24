import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ImageConverter from "@/components/ImageConverter";
import BatchImageConverter from "@/components/BatchImageConverter";
import PromptToImage from "@/components/PromptToImage";
import { AdBottom, AdVideo, AdInline, AdExoticFat } from "@/components/ads/AdContainer";
import { 
  Image, 
  Zap, 
  Shield, 
  Download, 
  Globe,
  FileImage,
  CheckCircle,
  ArrowRight,
  Layers,
  Wand2
} from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import HreflangTags from "@/components/HreflangTags";

const formatColors: Record<string, string> = {
  JPG: "#FF9500",
  PNG: "#34C759",
  WEBP: "#007AFF",
  GIF: "#AF52DE",
  BMP: "#FF3B30",
  SVG: "#FF2D55",
  TIFF: "#8E8E93",
  HEIC: "#5AC8FA",
  HEIF: "#5AC8FA",
  RAW: "#636366",
};

const conversionOptions = [
  // JPG Conversions
  { from: "JPG", to: "PNG", route: "/jpg-to-png", desc: "Convert JPG to PNG with transparency support" },
  { from: "PNG", to: "JPG", route: "/png-to-jpg", desc: "Convert PNG to JPG with compression" },
  { from: "JPG", to: "WEBP", route: "/jpg-to-webp", desc: "Convert JPG to WEBP for smaller files" },
  { from: "WEBP", to: "JPG", route: "/webp-to-jpg", desc: "Convert WEBP to JPG for compatibility" },
  { from: "PNG", to: "WEBP", route: "/png-to-webp", desc: "Convert PNG to WEBP for web" },
  { from: "WEBP", to: "PNG", route: "/webp-to-png", desc: "Convert WEBP to PNG with transparency" },
  { from: "GIF", to: "PNG", route: "/gif-to-png", desc: "Convert GIF to PNG format" },
  { from: "GIF", to: "JPG", route: "/gif-to-jpg", desc: "Convert GIF to JPG format" },
  { from: "BMP", to: "JPG", route: "/bmp-to-jpg", desc: "Convert BMP to JPG with compression" },
  { from: "BMP", to: "PNG", route: "/bmp-to-png", desc: "Convert BMP to PNG format" },
  { from: "TIFF", to: "JPG", route: "/tiff-to-jpg", desc: "Convert TIFF to JPG format" },
  { from: "TIFF", to: "PNG", route: "/tiff-to-png", desc: "Convert TIFF to PNG format" },
  { from: "RAW", to: "JPG", route: "/raw-to-jpg", desc: "Convert RAW to JPG format" },
  { from: "RAW", to: "PNG", route: "/raw-to-png", desc: "Convert RAW to PNG format" },
  { from: "SVG", to: "PNG", route: "/svg-to-png", desc: "Rasterize SVG to PNG image" },
  { from: "SVG", to: "JPG", route: "/svg-to-jpg", desc: "Convert SVG to JPG format" },
];

const ImageToolsPage = () => {
  const [activeTab, setActiveTab] = useState("single");
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "How do I convert an image to a different format?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Upload your image by clicking or drag-and-drop, select the output format, and download the converted file instantly. All processing happens in your browser for maximum privacy."
        }
      },
      {
        "@type": "Question",
        "name": "Is this image converter free to use?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, all image conversions are completely free with no watermarks, no signup required, and no daily limits."
        }
      },
      {
        "@type": "Question",
        "name": "Can I convert TIFF and RAW images?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, we support TIFF and RAW image formats. You can convert them to JPG or PNG for universal compatibility."
        }
      },
      {
        "@type": "Question",
        "name": "Is my image data secure?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, your images are 100% secure. All conversions happen locally in your browser - your files are never uploaded to our servers."
        }
      }
    ]
  };

  const softwareSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Free Online Image Converter",
    "operatingSystem": "Web Browser",
    "applicationCategory": "MultimediaApplication",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "ratingCount": "5632"
    }
  };

  return (
    <>
      <Helmet>
        <title>Free Image Converter Online - JPG, PNG, WEBP, GIF, TIFF, RAW, HEIC, SVG | 2024</title>
        <meta name="description" content="Convert images online free: JPG to PNG, PNG to JPG, WEBP, TIFF to JPG, RAW to PNG and more. No watermarks, no signup. Fast, secure browser-based image converter." />
        <meta name="keywords" content="image converter, jpg to png, png to jpg, webp converter, tiff to jpg, raw to png, gif converter, svg to png, heic to jpg, free image converter" />
        <link rel="canonical" href="https://multitoolsa.com/image-tools" />
        
        <meta property="og:title" content="Free Image Converter - Convert JPG, PNG, WEBP, TIFF, RAW Online" />
        <meta property="og:description" content="Convert images between all formats free online. No watermarks, no signup. Fast and secure." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://multitoolsa.com/image-tools" />
        
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Free Image Converter Online" />
        <meta name="twitter:description" content="Convert images between JPG, PNG, WEBP, GIF, TIFF, RAW formats instantly." />
        
        <script type="application/ld+json">
          {JSON.stringify(faqSchema)}
        </script>
        <script type="application/ld+json">
          {JSON.stringify(softwareSchema)}
        </script>
      </Helmet>
      <HreflangTags path="/image-tools" />

      <div className="min-h-screen bg-background flex flex-col">
        <Header />
        
        <main className="flex-1">
          {/* Hero Section with Converter */}
          <section className="py-12 md:py-16 lg:py-20 bg-gradient-hero relative overflow-hidden">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/10 rounded-full blur-3xl" />
            
            <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16 relative z-10">
              <div className="text-center max-w-4xl mx-auto mb-10">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/30 mb-6">
                  <Image className="w-4 h-4 text-primary" />
                  <span className="text-sm font-medium text-primary">Free Image Converter</span>
                </div>
                
                <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-6 leading-tight">
                  Convert Images Instantly
                </h1>
                
                <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
                  Upload any image and convert to JPG, PNG, WEBP, GIF, BMP, TIFF, or RAW. 
                  100% free, secure, and processed entirely in your browser.
                </p>
              </div>

              {/* Mode Tabs */}
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full max-w-5xl mx-auto">
                <TabsList className="grid w-full max-w-lg mx-auto grid-cols-3 mb-8">
                  <TabsTrigger value="single" className="gap-2 text-xs sm:text-sm">
                    <Image className="w-4 h-4" />
                    <span className="hidden sm:inline">Single Image</span>
                    <span className="sm:hidden">Single</span>
                  </TabsTrigger>
                  <TabsTrigger value="batch" className="gap-2 text-xs sm:text-sm">
                    <Layers className="w-4 h-4" />
                    <span className="hidden sm:inline">Batch Mode</span>
                    <span className="sm:hidden">Batch</span>
                  </TabsTrigger>
                  <TabsTrigger value="ai-generate" className="gap-2 text-xs sm:text-sm">
                    <Wand2 className="w-4 h-4" />
                    <span className="hidden sm:inline">AI Generate</span>
                    <span className="sm:hidden">AI</span>
                  </TabsTrigger>
                </TabsList>
                
                <TabsContent value="single" className="mt-0">
                  <ImageConverter />
                </TabsContent>
                
                <TabsContent value="batch" className="mt-0">
                  <BatchImageConverter />
                </TabsContent>
                
                <TabsContent value="ai-generate" className="mt-0">
                  <PromptToImage />
                </TabsContent>
              </Tabs>
              
              {/* Ads below tool */}
              <div className="flex flex-col items-center gap-4 mt-8 max-w-5xl mx-auto">
                <AdExoticFat />
                <AdVideo />
                <AdInline />
                <AdBottom />
              </div>
            </div>
          </section>

          {/* Conversion Options Grid */}
          <section className="py-12 md:py-16 px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16">
            <div className="w-full">
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-4">
                All Conversion Options
              </h2>
              <p className="text-center text-muted-foreground mb-10 max-w-2xl mx-auto">
                Select your desired conversion format below for a dedicated tool
              </p>
              
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-3 lg:gap-4">
                {conversionOptions.map((opt, i) => (
                  <Link
                    key={i}
                    to={opt.route}
                    className="group bg-card hover:bg-secondary border border-border hover:border-primary/50 rounded-xl p-3 lg:p-4 transition-all duration-300 hover-lift"
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <span 
                        className="px-2 py-1 rounded text-xs font-bold"
                        style={{ backgroundColor: formatColors[opt.from], color: '#000' }}
                      >
                        {opt.from}
                      </span>
                      <ArrowRight className="w-3 h-3 text-primary group-hover:translate-x-0.5 transition-transform" />
                      <span 
                        className="px-2 py-1 rounded text-xs font-bold"
                        style={{ backgroundColor: formatColors[opt.to], color: '#000' }}
                      >
                        {opt.to}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground group-hover:text-foreground transition-colors line-clamp-2">
                      {opt.desc}
                    </p>
                  </Link>
                ))}
              </div>
              
              {/* Ads - After Conversion Grid */}
              <div className="flex flex-col items-center gap-4 mt-8">
                <AdExoticFat />
                <AdVideo />
                <AdInline />
              </div>
            </div>
          </section>

          {/* How It Works */}
          <section className="py-12 md:py-16 px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16 bg-gradient-dark">
            <div className="w-full max-w-6xl mx-auto">
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-12">
                How to Convert Images
              </h2>
              
              <div className="grid sm:grid-cols-3 gap-6 lg:gap-8">
                {[
                  {
                    step: "1",
                    title: "Upload Image",
                    description: "Drag and drop your image or click to browse. Supports JPG, PNG, WEBP, GIF, BMP, TIFF, RAW, HEIC, SVG.",
                    icon: FileImage
                  },
                  {
                    step: "2", 
                    title: "Select Format",
                    description: "Choose your desired output format from the dropdown menu.",
                    icon: Download
                  },
                  {
                    step: "3",
                    title: "Download Result",
                    description: "Click convert and download your image instantly. That's it!",
                    icon: CheckCircle
                  }
                ].map((item) => (
                  <div key={item.step} className="text-center">
                    <div className="bg-gradient-orange w-14 h-14 lg:w-16 lg:h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                      <item.icon className="w-7 h-7 lg:w-8 lg:h-8 text-primary-foreground" />
                    </div>
                    <div className="bg-primary text-primary-foreground w-8 h-8 rounded-full flex items-center justify-center mx-auto mb-3 text-sm font-bold">
                      {item.step}
                    </div>
                    <h3 className="text-lg lg:text-xl font-semibold mb-2">{item.title}</h3>
                    <p className="text-sm lg:text-base text-muted-foreground">{item.description}</p>
                  </div>
                ))}
              </div>
              
              {/* Ads - After How It Works */}
              <div className="flex flex-col items-center gap-4 mt-8">
                <AdExoticFat />
                <AdVideo />
                <AdBottom />
              </div>
            </div>
          </section>

          {/* Features */}
          <section className="py-12 md:py-16 px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16">
            <div className="w-full">
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-12">
                Why Use Our Image Converter?
              </h2>
              
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
                {[
                  { icon: Zap, title: "Lightning Fast", desc: "Convert in seconds" },
                  { icon: Shield, title: "100% Secure", desc: "Files stay on your device" },
                  { icon: Download, title: "No Watermarks", desc: "Clean, professional output" },
                  { icon: Globe, title: "Works Everywhere", desc: "Any device, any browser" }
                ].map((item, i) => (
                  <div key={i} className="bg-card rounded-xl p-4 lg:p-6 border border-border text-center hover:border-primary/50 transition-colors">
                    <div className="w-10 h-10 lg:w-12 lg:h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-3 lg:mb-4">
                      <item.icon className="w-5 h-5 lg:w-6 lg:h-6 text-primary" />
                    </div>
                    <h3 className="font-semibold text-sm lg:text-base mb-1 lg:mb-2">{item.title}</h3>
                    <p className="text-xs lg:text-sm text-muted-foreground">{item.desc}</p>
                  </div>
                ))}
              </div>
              
              {/* ExoticFat Ad - After Features */}
              <AdExoticFat className="mt-8" />
            </div>
          </section>

          {/* Supported Formats */}
          <section className="py-12 md:py-16 px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16 bg-gradient-dark">
            <div className="w-full max-w-6xl mx-auto">
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-4">
                Supported Image Formats
              </h2>
              <p className="text-center text-muted-foreground mb-10">
                Convert between all popular image formats
              </p>

              <div className="grid grid-cols-5 sm:grid-cols-10 gap-2 lg:gap-3">
                {Object.entries(formatColors).map(([format, color]) => (
                  <div 
                    key={format}
                    className="bg-card rounded-lg p-2 lg:p-3 text-center border border-border hover:border-primary/50 transition-colors"
                  >
                    <div 
                      className="w-8 h-8 lg:w-10 lg:h-10 rounded-lg flex items-center justify-center mx-auto text-[10px] lg:text-xs font-bold"
                      style={{ backgroundColor: color, color: '#000' }}
                    >
                      {format}
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Ads - After Formats */}
              <div className="flex flex-col items-center gap-4 mt-8">
                <AdExoticFat />
                <AdVideo />
                <AdInline />
              </div>
            </div>
          </section>

          {/* FAQ Section */}
          <section className="py-12 md:py-16 px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16">
            <div className="w-full max-w-6xl mx-auto">
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-10">
                Frequently Asked Questions
              </h2>
              
              <Accordion type="single" collapsible className="w-full space-y-4">
                <AccordionItem value="item-1" className="bg-card border border-border rounded-xl px-4 lg:px-6">
                  <AccordionTrigger className="text-left font-semibold text-sm lg:text-base">
                    How do I convert an image to a different format?
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground text-sm lg:text-base">
                    Upload your image by clicking or drag-and-drop, select the output format from the dropdown, and click Convert. Your converted image will be ready to download instantly.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-2" className="bg-card border border-border rounded-xl px-4 lg:px-6">
                  <AccordionTrigger className="text-left font-semibold text-sm lg:text-base">
                    Is this image converter free?
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground text-sm lg:text-base">
                    Yes, completely free! No signup, no watermarks, no daily limits. Convert as many images as you need.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-3" className="bg-card border border-border rounded-xl px-4 lg:px-6">
                  <AccordionTrigger className="text-left font-semibold text-sm lg:text-base">
                    Can I convert TIFF and RAW images?
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground text-sm lg:text-base">
                    Yes, we support TIFF and RAW formats. Convert them to JPG or PNG for universal compatibility across all devices and platforms.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-4" className="bg-card border border-border rounded-xl px-4 lg:px-6">
                  <AccordionTrigger className="text-left font-semibold text-sm lg:text-base">
                    Are my images secure?
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground text-sm lg:text-base">
                    Absolutely! All conversions happen locally in your browser. Your images are never uploaded to our servers, ensuring complete privacy and security.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-5" className="bg-card border border-border rounded-xl px-4 lg:px-6">
                  <AccordionTrigger className="text-left font-semibold text-sm lg:text-base">
                    What's the best format for web images?
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground text-sm lg:text-base">
                    WEBP is the best format for web use - it provides excellent quality at 25-35% smaller file sizes than JPG. PNG is best for images with transparency, and JPG is widely compatible for photographs.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
              
              {/* Ads - After FAQ */}
              <div className="flex flex-col items-center gap-4 mt-8">
                <AdExoticFat />
                <AdVideo />
                <AdBottom />
              </div>
            </div>
          </section>

          {/* SEO Article */}
          <section className="py-12 md:py-16 px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16 bg-gradient-dark">
            <div className="w-full max-w-6xl mx-auto">
              <article className="prose prose-invert max-w-none">
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-6 text-foreground">
                  The Complete Guide to Image Format Conversion in 2024
                </h2>
                
                <div className="space-y-6 text-muted-foreground">
                  <p>
                    Image format conversion is essential for optimizing your photos and graphics for different uses. Whether you're preparing images for web, print, or social media, choosing the right format can significantly impact file size, quality, and compatibility.
                  </p>
                  
                  <h3 className="text-xl font-semibold text-foreground mt-8 mb-4">Understanding Image Formats</h3>
                  <p>
                    <strong className="text-foreground">JPG/JPEG:</strong> Best for photographs with millions of colors. Uses lossy compression to achieve small file sizes while maintaining good visual quality.<br/><br/>
                    <strong className="text-foreground">PNG:</strong> Ideal for graphics with transparency, logos, and images requiring sharp edges. Uses lossless compression to preserve quality.<br/><br/>
                    <strong className="text-foreground">WEBP:</strong> Modern format offering superior compression. 25-35% smaller than JPG with similar quality. Supports transparency.<br/><br/>
                    <strong className="text-foreground">TIFF:</strong> Professional format used in print and photography. Supports high color depth and lossless compression.<br/><br/>
                    <strong className="text-foreground">RAW:</strong> Unprocessed camera data with maximum editing flexibility. Large file sizes but preserves all image information.
                  </p>
                  
                  <h3 className="text-xl font-semibold text-foreground mt-8 mb-4">When to Use Each Format</h3>
                  <p>
                    For web optimization, WEBP is the recommended choice due to its excellent compression and quality balance. Use PNG for logos and graphics with transparency. JPG remains the standard for photographs shared online or via email. For professional printing, TIFF provides the highest quality output.
                  </p>
                </div>
              </article>
              
              {/* Ads - After Article */}
              <div className="flex flex-col items-center gap-4 mt-8">
                <AdExoticFat />
                <AdVideo />
                <AdInline />
                <AdBottom />
              </div>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default ImageToolsPage;
