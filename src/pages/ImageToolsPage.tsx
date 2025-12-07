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
  FileImage
} from "lucide-react";

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
          "text": "Select the conversion type you need (e.g., JPG to PNG), upload your image, and download the converted file instantly."
        }
      },
      {
        "@type": "Question",
        "name": "Is this image converter free?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, all image conversions are completely free with no watermarks or signup required."
        }
      },
      {
        "@type": "Question",
        "name": "Can I convert HEIC photos from iPhone?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, you can convert HEIC/HEIF images from iPhone to JPG, PNG, or WEBP format for universal compatibility."
        }
      }
    ]
  };

  return (
    <>
      <Helmet>
        <title>Free Image Converter - JPG, PNG, WEBP, GIF, HEIC, SVG | All Formats</title>
        <meta name="description" content="Convert images between all formats: JPG to PNG, PNG to JPG, WEBP to JPG, HEIC to JPG, SVG to PNG, and more. Free online image converter with no watermarks." />
        <meta name="keywords" content="image converter, jpg to png, png to jpg, webp converter, heic to jpg, gif converter, svg to png, photo converter, free image converter, online image converter" />
        <link rel="canonical" href="https://yoursite.com/image-tools" />
        
        <meta property="og:title" content="Free Image Converter - All Formats Supported" />
        <meta property="og:description" content="Convert images between JPG, PNG, WEBP, GIF, BMP, SVG, and HEIC formats online for free." />
        <meta property="og:type" content="website" />
        
        <script type="application/ld+json">
          {JSON.stringify(faqSchema)}
        </script>
      </Helmet>

      <div className="min-h-screen bg-background flex flex-col">
        <Header />
        
        <main className="flex-1">
          {/* Hero Section */}
          <section className="py-12 md:py-20 bg-gradient-hero">
            <div className="container mx-auto px-4">
              <div className="text-center max-w-4xl mx-auto mb-12">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-bright/10 border border-cyan-bright/30 mb-6">
                  <Image className="w-4 h-4 text-cyan-bright" />
                  <span className="text-sm font-medium text-cyan-bright">Image Conversion Tools</span>
                </div>
                
                <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight">
                  Free Online Image Converter
                </h1>
                
                <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
                  Convert images between all popular formats instantly. 
                  Select your conversion type below and get started for free!
                </p>
              </div>

              {/* Quick Convert Button */}
              <div className="text-center mb-12">
                <Link 
                  to="/image-converter"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-cyan-bright hover:bg-cyan-bright/90 text-teal-dark font-bold rounded-xl transition-all hover:shadow-lg hover:shadow-cyan-bright/30"
                >
                  <FileImage className="w-5 h-5" />
                  Quick Convert (Any Format)
                </Link>
              </div>
            </div>
          </section>

          {/* JPG Conversions */}
          <section className="py-12 md:py-16">
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
          <section className="py-12 md:py-16 bg-teal-dark/50">
            <div className="container mx-auto px-4">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2 flex items-center gap-3">
                <span className="w-10 h-10 rounded-lg flex items-center justify-center text-sm font-bold" style={{ backgroundColor: formatColors.PNG, color: '#0a1a1f' }}>
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
          <section className="py-12 md:py-16">
            <div className="container mx-auto px-4">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2 flex items-center gap-3">
                <span className="w-10 h-10 rounded-lg flex items-center justify-center text-sm font-bold" style={{ backgroundColor: formatColors.WEBP, color: '#0a1a1f' }}>
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
          <section className="py-12 md:py-16 bg-teal-dark/50">
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
          <section className="py-12 md:py-16">
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
          <section className="py-12 md:py-16 bg-teal-dark/50">
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
          <section className="py-12 md:py-16">
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
          <section className="py-16 md:py-24 bg-teal-dark/50">
            <div className="container mx-auto px-4">
              <h2 className="text-2xl md:text-4xl font-bold text-center text-foreground mb-12">
                Why Use Our Image Converter?
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-teal-medium/30 rounded-2xl p-6 border border-teal-medium hover:border-cyan-bright transition-colors">
                  <div className="w-12 h-12 rounded-xl bg-cyan-bright/20 flex items-center justify-center mb-4">
                    <Zap className="w-6 h-6 text-cyan-bright" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">Lightning Fast</h3>
                  <p className="text-muted-foreground text-sm">
                    Convert images in seconds with our optimized browser-based technology.
                  </p>
                </div>

                <div className="bg-teal-medium/30 rounded-2xl p-6 border border-teal-medium hover:border-cyan-bright transition-colors">
                  <div className="w-12 h-12 rounded-xl bg-cyan-bright/20 flex items-center justify-center mb-4">
                    <Shield className="w-6 h-6 text-cyan-bright" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">100% Secure</h3>
                  <p className="text-muted-foreground text-sm">
                    Your images never leave your device. All processing happens locally.
                  </p>
                </div>

                <div className="bg-teal-medium/30 rounded-2xl p-6 border border-teal-medium hover:border-cyan-bright transition-colors">
                  <div className="w-12 h-12 rounded-xl bg-cyan-bright/20 flex items-center justify-center mb-4">
                    <Download className="w-6 h-6 text-cyan-bright" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">No Watermarks</h3>
                  <p className="text-muted-foreground text-sm">
                    Download clean, professional images without any watermarks.
                  </p>
                </div>

                <div className="bg-teal-medium/30 rounded-2xl p-6 border border-teal-medium hover:border-cyan-bright transition-colors">
                  <div className="w-12 h-12 rounded-xl bg-cyan-bright/20 flex items-center justify-center mb-4">
                    <Globe className="w-6 h-6 text-cyan-bright" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">Works Everywhere</h3>
                  <p className="text-muted-foreground text-sm">
                    Use on any device with a modern browser.
                  </p>
                </div>
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
