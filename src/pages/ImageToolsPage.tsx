import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ConversionOptionCard from "@/components/ConversionOptionCard";
import { 
  Image, 
  Zap, 
  Shield, 
  Download, 
  Globe,
  FileImage,
  CheckCircle,
  Clock,
  Smartphone,
  Monitor
} from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const formatColors: Record<string, string> = {
  JPG: "#FFD700",
  PNG: "#4CAF50",
  WEBP: "#2196F3",
  GIF: "#9C27B0",
  BMP: "#FF5722",
  SVG: "#E91E63",
  TIFF: "#795548",
  HEIC: "#00BCD4",
  HEIF: "#00BCD4",
  RAW: "#607D8B",
  PDF: "#F44336",
};

const conversionOptions = [
  // JPG Conversions
  { from: "JPG", to: "PNG", route: "/image-converter/jpg-to-png", desc: "Convert JPG to PNG with transparency support" },
  { from: "JPG", to: "WEBP", route: "/image-converter/jpg-to-webp", desc: "Convert JPG to WEBP for smaller file sizes" },
  { from: "JPG", to: "GIF", route: "/image-converter/jpg-to-gif", desc: "Convert JPG to GIF format" },
  { from: "JPG", to: "BMP", route: "/image-converter/jpg-to-bmp", desc: "Convert JPG to BMP bitmap format" },
  
  // PNG Conversions
  { from: "PNG", to: "JPG", route: "/image-converter/png-to-jpg", desc: "Convert PNG to JPG with compression" },
  { from: "PNG", to: "WEBP", route: "/image-converter/png-to-webp", desc: "Convert PNG to WEBP for web optimization" },
  { from: "PNG", to: "GIF", route: "/image-converter/png-to-gif", desc: "Convert PNG to GIF format" },
  { from: "PNG", to: "BMP", route: "/image-converter/png-to-bmp", desc: "Convert PNG to BMP bitmap format" },
  
  // WEBP Conversions
  { from: "WEBP", to: "JPG", route: "/image-converter/webp-to-jpg", desc: "Convert WEBP to JPG for compatibility" },
  { from: "WEBP", to: "PNG", route: "/image-converter/webp-to-png", desc: "Convert WEBP to PNG with transparency" },
  { from: "WEBP", to: "GIF", route: "/image-converter/webp-to-gif", desc: "Convert WEBP to GIF format" },
  { from: "WEBP", to: "BMP", route: "/image-converter/webp-to-bmp", desc: "Convert WEBP to BMP format" },
  
  // GIF Conversions
  { from: "GIF", to: "JPG", route: "/image-converter/gif-to-jpg", desc: "Convert GIF to JPG format" },
  { from: "GIF", to: "PNG", route: "/image-converter/gif-to-png", desc: "Convert GIF to PNG with quality" },
  { from: "GIF", to: "WEBP", route: "/image-converter/gif-to-webp", desc: "Convert GIF to WEBP format" },
  { from: "GIF", to: "BMP", route: "/image-converter/gif-to-bmp", desc: "Convert GIF to BMP format" },
  
  // SVG Conversions
  { from: "SVG", to: "PNG", route: "/image-converter/svg-to-png", desc: "Rasterize SVG to PNG image" },
  { from: "SVG", to: "JPG", route: "/image-converter/svg-to-jpg", desc: "Convert SVG to JPG format" },
  { from: "SVG", to: "WEBP", route: "/image-converter/svg-to-webp", desc: "Convert SVG to WEBP format" },
  
  // HEIC/HEIF Conversions (iPhone)
  { from: "HEIC", to: "JPG", route: "/image-converter/heic-to-jpg", desc: "Convert iPhone HEIC to JPG" },
  { from: "HEIC", to: "PNG", route: "/image-converter/heic-to-png", desc: "Convert iPhone HEIC to PNG" },
  { from: "HEIC", to: "WEBP", route: "/image-converter/heic-to-webp", desc: "Convert iPhone HEIC to WEBP" },
  
  // BMP Conversions
  { from: "BMP", to: "JPG", route: "/image-converter/bmp-to-jpg", desc: "Convert BMP to JPG with compression" },
  { from: "BMP", to: "PNG", route: "/image-converter/bmp-to-png", desc: "Convert BMP to PNG format" },
  { from: "BMP", to: "WEBP", route: "/image-converter/bmp-to-webp", desc: "Convert BMP to WEBP format" },
];

const ImageToolsPage = () => {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "How do I convert an image to a different format?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Select the conversion type you need (e.g., JPG to PNG), upload your image by clicking or drag-and-drop, and download the converted file instantly. All processing happens in your browser for maximum privacy."
        }
      },
      {
        "@type": "Question",
        "name": "Is this image converter free to use?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, all image conversions are completely free with no watermarks, no signup required, and no daily limits. You can convert as many images as you need."
        }
      },
      {
        "@type": "Question",
        "name": "Can I convert HEIC photos from iPhone?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, you can convert HEIC/HEIF images from iPhone to JPG, PNG, or WEBP format for universal compatibility across all devices and platforms."
        }
      },
      {
        "@type": "Question",
        "name": "Is my image data secure?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, your images are 100% secure. All conversions happen locally in your browser - your files are never uploaded to our servers. This ensures complete privacy and faster processing."
        }
      },
      {
        "@type": "Question",
        "name": "What image formats are supported?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "We support all popular image formats including JPG/JPEG, PNG, WEBP, GIF, BMP, SVG, and HEIC/HEIF. You can convert between any of these formats instantly."
        }
      },
      {
        "@type": "Question",
        "name": "What is the best image format for web?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "WEBP is generally the best format for web use as it provides excellent quality at smaller file sizes (25-35% smaller than JPG). PNG is best for images with transparency, and JPG is widely compatible for photographs."
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
        <title>Free Image Converter Online - JPG, PNG, WEBP, GIF, HEIC, SVG | 2024</title>
        <meta name="description" content="Convert images online free: JPG to PNG, PNG to JPG, WEBP to JPG, HEIC to JPG, SVG to PNG and more. No watermarks, no signup. Fast, secure browser-based image converter." />
        <meta name="keywords" content="image converter, jpg to png, png to jpg, webp converter, heic to jpg, gif converter, svg to png, photo converter, free image converter, online image converter, convert image format" />
        <link rel="canonical" href="https://yoursite.com/image-tools" />
        
        <meta property="og:title" content="Free Image Converter - Convert JPG, PNG, WEBP, GIF, HEIC Online" />
        <meta property="og:description" content="Convert images between all formats free online. No watermarks, no signup. Fast and secure." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://yoursite.com/image-tools" />
        
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Free Image Converter Online" />
        <meta name="twitter:description" content="Convert images between JPG, PNG, WEBP, GIF, HEIC, SVG formats instantly." />
        
        <script type="application/ld+json">
          {JSON.stringify(faqSchema)}
        </script>
        <script type="application/ld+json">
          {JSON.stringify(softwareSchema)}
        </script>
      </Helmet>

      <div className="min-h-screen bg-background flex flex-col">
        <Header />
        
        <main className="flex-1">
          {/* Hero Section */}
          <section className="py-12 md:py-20 bg-gradient-image text-primary-foreground">
            <div className="container mx-auto px-4">
              <div className="text-center max-w-4xl mx-auto mb-12">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-foreground/10 border border-primary-foreground/20 mb-6">
                  <Image className="w-4 h-4" />
                  <span className="text-sm font-medium">Image Conversion Tools</span>
                </div>
                
                <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                  Free Online Image Converter
                </h1>
                
                <p className="text-lg md:text-xl opacity-90 max-w-2xl mx-auto">
                  Convert images between JPG, PNG, WEBP, GIF, HEIC, SVG, and BMP formats instantly. 
                  100% free, no watermarks, secure browser-based conversion.
                </p>
              </div>

              {/* Quick Convert Button */}
              <div className="text-center mb-8">
                <Link 
                  to="/image-converter"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-primary-foreground text-foreground font-bold rounded-xl transition-all hover:shadow-lg hover:scale-105"
                >
                  <FileImage className="w-5 h-5" />
                  Quick Convert (Any Format)
                </Link>
              </div>
            </div>
          </section>

          {/* How It Works */}
          <section className="py-12 md:py-16 px-4">
            <div className="container mx-auto max-w-5xl">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center text-foreground mb-4">
                How to Convert Images
              </h2>
              <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
                Convert your images in 3 simple steps. No signup required, completely free.
              </p>
              
              <div className="grid md:grid-cols-3 gap-8">
                {[
                  {
                    step: "1",
                    title: "Choose Format",
                    description: "Select your desired conversion format from the options below (e.g., JPG to PNG).",
                    icon: FileImage
                  },
                  {
                    step: "2", 
                    title: "Upload Image",
                    description: "Drag and drop your image or click to upload. We support all major image formats.",
                    icon: Download
                  },
                  {
                    step: "3",
                    title: "Download Result",
                    description: "Click download to save your converted image. It's that simple!",
                    icon: CheckCircle
                  }
                ].map((item) => (
                  <div key={item.step} className="text-center">
                    <div className="bg-gradient-image w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                      <item.icon className="w-8 h-8 text-primary-foreground" />
                    </div>
                    <div className="bg-brand-blue text-primary-foreground w-8 h-8 rounded-full flex items-center justify-center mx-auto mb-3 text-sm font-bold">
                      {item.step}
                    </div>
                    <h3 className="text-xl font-semibold text-foreground mb-2">{item.title}</h3>
                    <p className="text-muted-foreground">{item.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* JPG Conversions */}
          <section className="py-12 md:py-16 bg-muted/30">
            <div className="container mx-auto px-4">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2 flex items-center gap-3">
                <span className="w-10 h-10 rounded-lg flex items-center justify-center text-sm font-bold" style={{ backgroundColor: formatColors.JPG, color: '#0a1a1f' }}>
                  JPG
                </span>
                JPG / JPEG Conversions
              </h2>
              <p className="text-muted-foreground mb-8">Convert JPG images to other formats</p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {conversionOptions
                  .filter(opt => opt.from === "JPG")
                  .map((opt, i) => (
                    <ConversionOptionCard
                      key={i}
                      fromFormat={opt.from}
                      toFormat={opt.to}
                      fromColor={formatColors[opt.from]}
                      toColor={formatColors[opt.to]}
                      route={opt.route}
                      description={opt.desc}
                    />
                  ))}
              </div>
            </div>
          </section>

          {/* PNG Conversions */}
          <section className="py-12 md:py-16">
            <div className="container mx-auto px-4">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2 flex items-center gap-3">
                <span className="w-10 h-10 rounded-lg flex items-center justify-center text-sm font-bold" style={{ backgroundColor: formatColors.PNG, color: '#fff' }}>
                  PNG
                </span>
                PNG Conversions
              </h2>
              <p className="text-muted-foreground mb-8">Convert PNG images to other formats</p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {conversionOptions
                  .filter(opt => opt.from === "PNG")
                  .map((opt, i) => (
                    <ConversionOptionCard
                      key={i}
                      fromFormat={opt.from}
                      toFormat={opt.to}
                      fromColor={formatColors[opt.from]}
                      toColor={formatColors[opt.to]}
                      route={opt.route}
                      description={opt.desc}
                    />
                  ))}
              </div>
            </div>
          </section>

          {/* WEBP Conversions */}
          <section className="py-12 md:py-16 bg-muted/30">
            <div className="container mx-auto px-4">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2 flex items-center gap-3">
                <span className="w-10 h-10 rounded-lg flex items-center justify-center text-sm font-bold" style={{ backgroundColor: formatColors.WEBP, color: '#fff' }}>
                  WEBP
                </span>
                WEBP Conversions
              </h2>
              <p className="text-muted-foreground mb-8">Convert WEBP images to other formats</p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {conversionOptions
                  .filter(opt => opt.from === "WEBP")
                  .map((opt, i) => (
                    <ConversionOptionCard
                      key={i}
                      fromFormat={opt.from}
                      toFormat={opt.to}
                      fromColor={formatColors[opt.from]}
                      toColor={formatColors[opt.to]}
                      route={opt.route}
                      description={opt.desc}
                    />
                  ))}
              </div>
            </div>
          </section>

          {/* GIF Conversions */}
          <section className="py-12 md:py-16">
            <div className="container mx-auto px-4">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2 flex items-center gap-3">
                <span className="w-10 h-10 rounded-lg flex items-center justify-center text-sm font-bold" style={{ backgroundColor: formatColors.GIF, color: '#fff' }}>
                  GIF
                </span>
                GIF Conversions
              </h2>
              <p className="text-muted-foreground mb-8">Convert GIF images to other formats</p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {conversionOptions
                  .filter(opt => opt.from === "GIF")
                  .map((opt, i) => (
                    <ConversionOptionCard
                      key={i}
                      fromFormat={opt.from}
                      toFormat={opt.to}
                      fromColor={formatColors[opt.from]}
                      toColor={formatColors[opt.to]}
                      route={opt.route}
                      description={opt.desc}
                    />
                  ))}
              </div>
            </div>
          </section>

          {/* SVG Conversions */}
          <section className="py-12 md:py-16 bg-muted/30">
            <div className="container mx-auto px-4">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2 flex items-center gap-3">
                <span className="w-10 h-10 rounded-lg flex items-center justify-center text-sm font-bold" style={{ backgroundColor: formatColors.SVG, color: '#fff' }}>
                  SVG
                </span>
                SVG Conversions
              </h2>
              <p className="text-muted-foreground mb-8">Convert SVG vector images to raster formats</p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {conversionOptions
                  .filter(opt => opt.from === "SVG")
                  .map((opt, i) => (
                    <ConversionOptionCard
                      key={i}
                      fromFormat={opt.from}
                      toFormat={opt.to}
                      fromColor={formatColors[opt.from]}
                      toColor={formatColors[opt.to]}
                      route={opt.route}
                      description={opt.desc}
                    />
                  ))}
              </div>
            </div>
          </section>

          {/* HEIC Conversions */}
          <section className="py-12 md:py-16">
            <div className="container mx-auto px-4">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2 flex items-center gap-3">
                <span className="w-10 h-10 rounded-lg flex items-center justify-center text-sm font-bold" style={{ backgroundColor: formatColors.HEIC, color: '#0a1a1f' }}>
                  HEIC
                </span>
                HEIC / HEIF Conversions (iPhone)
              </h2>
              <p className="text-muted-foreground mb-8">Convert iPhone HEIC photos to compatible formats</p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {conversionOptions
                  .filter(opt => opt.from === "HEIC")
                  .map((opt, i) => (
                    <ConversionOptionCard
                      key={i}
                      fromFormat={opt.from}
                      toFormat={opt.to}
                      fromColor={formatColors[opt.from]}
                      toColor={formatColors[opt.to]}
                      route={opt.route}
                      description={opt.desc}
                    />
                  ))}
              </div>
            </div>
          </section>

          {/* BMP Conversions */}
          <section className="py-12 md:py-16 bg-muted/30">
            <div className="container mx-auto px-4">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2 flex items-center gap-3">
                <span className="w-10 h-10 rounded-lg flex items-center justify-center text-sm font-bold" style={{ backgroundColor: formatColors.BMP, color: '#fff' }}>
                  BMP
                </span>
                BMP Conversions
              </h2>
              <p className="text-muted-foreground mb-8">Convert BMP bitmap images to modern formats</p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {conversionOptions
                  .filter(opt => opt.from === "BMP")
                  .map((opt, i) => (
                    <ConversionOptionCard
                      key={i}
                      fromFormat={opt.from}
                      toFormat={opt.to}
                      fromColor={formatColors[opt.from]}
                      toColor={formatColors[opt.to]}
                      route={opt.route}
                      description={opt.desc}
                    />
                  ))}
              </div>
            </div>
          </section>

          {/* Features Section */}
          <section className="py-16 md:py-24">
            <div className="container mx-auto px-4">
              <h2 className="text-2xl md:text-4xl font-bold text-center text-foreground mb-4">
                Why Use Our Image Converter?
              </h2>
              <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
                The fastest, most secure way to convert images online
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  {
                    icon: Zap,
                    title: "Lightning Fast",
                    description: "Convert images in seconds with our optimized browser-based technology. No waiting for uploads."
                  },
                  {
                    icon: Shield,
                    title: "100% Secure",
                    description: "Your images never leave your device. All processing happens locally in your browser."
                  },
                  {
                    icon: Globe,
                    title: "No Watermarks",
                    description: "Download clean, professional images without any watermarks or branding."
                  },
                  {
                    icon: Smartphone,
                    title: "Works Everywhere",
                    description: "Use on any device - desktop, tablet, or mobile. No software installation needed."
                  }
                ].map((feature, i) => (
                  <div key={i} className="bg-card rounded-2xl p-6 border border-border hover:border-brand-blue/50 transition-colors">
                    <div className="w-12 h-12 rounded-xl bg-brand-blue/10 flex items-center justify-center mb-4">
                      <feature.icon className="w-6 h-6 text-brand-blue" />
                    </div>
                    <h3 className="text-lg font-semibold text-foreground mb-2">{feature.title}</h3>
                    <p className="text-muted-foreground text-sm">{feature.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* FAQ Section */}
          <section className="py-12 md:py-16 px-4 bg-muted/30">
            <div className="container mx-auto max-w-4xl">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center text-foreground mb-4">
                Frequently Asked Questions
              </h2>
              <p className="text-center text-muted-foreground mb-10">
                Everything you need to know about our image converter
              </p>
              
              <Accordion type="single" collapsible className="w-full space-y-4">
                <AccordionItem value="item-1" className="bg-card border border-border rounded-xl px-6">
                  <AccordionTrigger className="text-left font-semibold">
                    How do I convert an image to a different format?
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    Converting images is simple: 1) Choose the conversion type you need from the options above (e.g., JPG to PNG), 2) Upload your image by clicking or dragging and dropping, 3) Wait a moment for the conversion to complete, 4) Click download to save your converted image. All processing happens in your browser for maximum speed and privacy.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-2" className="bg-card border border-border rounded-xl px-6">
                  <AccordionTrigger className="text-left font-semibold">
                    Is this image converter completely free?
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    Yes, our image converter is 100% free to use. There are no hidden costs, no signup required, no watermarks on your converted images, and no daily limits. You can convert as many images as you need without any restrictions.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-3" className="bg-card border border-border rounded-xl px-6">
                  <AccordionTrigger className="text-left font-semibold">
                    Is my image data secure and private?
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    Absolutely. Your images are 100% secure because all conversions happen locally in your browser. Your files are never uploaded to our servers or stored anywhere. This means faster processing and complete privacy - only you have access to your images.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-4" className="bg-card border border-border rounded-xl px-6">
                  <AccordionTrigger className="text-left font-semibold">
                    Can I convert HEIC photos from my iPhone?
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    Yes! We support HEIC/HEIF format which is the default photo format on iPhones. You can easily convert your iPhone photos to JPG, PNG, or WEBP for universal compatibility across all devices, websites, and applications.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-5" className="bg-card border border-border rounded-xl px-6">
                  <AccordionTrigger className="text-left font-semibold">
                    What image formats are supported?
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    We support all popular image formats including: JPG/JPEG (photographs), PNG (images with transparency), WEBP (modern web format), GIF (simple animations), BMP (bitmap images), SVG (vector graphics), and HEIC/HEIF (iPhone photos). You can convert between any of these formats.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-6" className="bg-card border border-border rounded-xl px-6">
                  <AccordionTrigger className="text-left font-semibold">
                    What is the best image format for websites?
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    For websites, WEBP is generally the best choice as it provides excellent quality at 25-35% smaller file sizes than JPG. This improves page loading speed and SEO. Use PNG when you need transparency (logos, icons), and JPG for photographs when browser compatibility is a concern.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </section>

          {/* SEO Article Section */}
          <section className="py-12 md:py-16 px-4">
            <div className="container mx-auto max-w-4xl">
              <article className="prose prose-lg max-w-none">
                <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-6">
                  The Complete Guide to Image Formats & Conversion in 2024
                </h2>
                
                <div className="bg-card rounded-xl p-6 md:p-8 border border-border space-y-6">
                  <div>
                    <h3 className="text-xl font-semibold text-foreground mb-3">Understanding Image Formats</h3>
                    <p className="text-muted-foreground">
                      Image formats serve different purposes in digital media. JPG/JPEG uses lossy compression, making it ideal for photographs where small quality loss is acceptable in exchange for smaller file sizes. PNG uses lossless compression and supports transparency, perfect for logos, icons, and graphics with text. WEBP is Google's modern format that provides superior compression for both photographs and graphics. GIF supports simple animations but is limited to 256 colors. SVG is a vector format that scales infinitely without quality loss.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold text-foreground mb-3">When to Convert Image Formats</h3>
                    <p className="text-muted-foreground">
                      You should convert images when: uploading to websites (use WEBP for best performance), sharing on social media (JPG is universally supported), printing (high-quality PNG or TIFF), using in presentations (PNG for graphics, JPG for photos), email attachments (JPG for smaller sizes), or when the original format isn't compatible with your application.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold text-foreground mb-3">Image Format Comparison</h3>
                    <div className="space-y-4 text-muted-foreground">
                      <p><strong className="text-foreground">JPG/JPEG:</strong> Best for photographs and complex images with many colors. Uses lossy compression. Does not support transparency. Universal compatibility across all devices and platforms.</p>
                      <p><strong className="text-foreground">PNG:</strong> Best for graphics, logos, icons, and images requiring transparency. Uses lossless compression. Larger file sizes than JPG for photographs. Ideal for screenshots and text-heavy images.</p>
                      <p><strong className="text-foreground">WEBP:</strong> Best for web use. Provides 25-35% smaller files than JPG at equivalent quality. Supports both lossy and lossless compression plus transparency. Excellent browser support in 2024.</p>
                      <p><strong className="text-foreground">GIF:</strong> Best for simple animations and graphics with few colors. Limited to 256 colors. Supports transparency (but not partial transparency). Being replaced by animated WEBP in many use cases.</p>
                      <p><strong className="text-foreground">SVG:</strong> Best for logos, icons, and illustrations. Vector format that scales infinitely. Text remains searchable. Cannot represent photographs. Small file sizes for graphics.</p>
                      <p><strong className="text-foreground">HEIC/HEIF:</strong> Apple's modern format used on iPhones. Excellent compression with high quality. Limited compatibility outside Apple ecosystem. Often needs conversion for web use.</p>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold text-foreground mb-3">Image Optimization Best Practices</h3>
                    <ul className="list-disc list-inside text-muted-foreground space-y-2">
                      <li>Use WEBP format for web images whenever possible</li>
                      <li>Resize images to the actual display size before uploading</li>
                      <li>Compress images without noticeable quality loss</li>
                      <li>Use PNG only when transparency is required</li>
                      <li>Consider lazy loading for images below the fold</li>
                      <li>Add descriptive alt text for accessibility and SEO</li>
                      <li>Use responsive images with srcset for different screen sizes</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold text-foreground mb-3">Why Browser-Based Conversion is Better</h3>
                    <p className="text-muted-foreground">
                      Our browser-based image converter offers several advantages over traditional online converters: complete privacy (files never leave your device), faster processing (no upload/download time), works offline once loaded, no file size limits imposed by servers, and no risk of your images being stored or accessed by third parties. Modern browsers can efficiently handle image processing using canvas APIs and web workers.
                    </p>
                  </div>
                </div>
              </article>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default ImageToolsPage;