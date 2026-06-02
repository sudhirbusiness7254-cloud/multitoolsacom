import { Helmet } from "react-helmet-async";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import UniversalImageCompressor from "@/components/UniversalImageCompressor";
import { 
  Minimize2, 
  Zap, 
  Shield, 
  Globe, 
  Sparkles, 
  FileImage,
  ArrowRight
} from "lucide-react";
import { Link } from "react-router-dom";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const supportedFormats = [
  { name: "JPEG/JPG", desc: "Photographs & web images", savings: "Up to 90%" },
  { name: "PNG", desc: "Graphics with transparency", savings: "Up to 60%" },
  { name: "WebP", desc: "Modern web format", savings: "Up to 50%" },
  { name: "GIF", desc: "Static & animated images", savings: "Up to 50%" },
  { name: "BMP", desc: "Bitmap images", savings: "Up to 95%" },
  { name: "TIFF", desc: "High-quality images", savings: "Up to 95%" },
  { name: "HEIC", desc: "Apple device format", savings: "Up to 70%" },
  { name: "SVG", desc: "Vector graphics", savings: "Varies" },
];

const features = [
  { icon: Zap, title: "Lightning Fast", desc: "Instant compression powered by your browser" },
  { icon: Shield, title: "100% Private", desc: "Files never leave your device" },
  { icon: Globe, title: "Universal Support", desc: "Works with all major image formats" },
  { icon: Sparkles, title: "Smart Detection", desc: "Auto-detects format for optimal compression" },
];

const faqs = [
  {
    question: "Which image formats does this compressor support?",
    answer: "Our universal compressor supports all major image formats including JPEG, PNG, WebP, GIF, BMP, TIFF, HEIC, SVG, and AVIF. The tool automatically detects your file format and applies the optimal compression algorithm."
  },
  {
    question: "How does the compression work?",
    answer: "The compression happens entirely in your browser using advanced algorithms. Your images are never uploaded to any server, ensuring complete privacy. The tool analyzes your image and removes unnecessary data while preserving visual quality."
  },
  {
    question: "Will I lose image quality after compression?",
    answer: "The quality slider lets you control the balance between file size and quality. At 70-85% quality, most images show no visible difference while achieving significant file size reduction. You can always preview the result before downloading."
  },
  {
    question: "What's the maximum file size I can compress?",
    answer: "We recommend images up to 50MB for optimal performance. Larger files may take longer to process depending on your device's capabilities."
  },
  {
    question: "Are my images uploaded to a server?",
    answer: "No, absolutely not. All compression happens locally in your browser using JavaScript. Your images never leave your device, making this tool completely private and secure."
  },
  {
    question: "Can I use this tool on mobile devices?",
    answer: "Yes! The tool works on any device with a modern web browser, including smartphones and tablets. Simply upload your images and compress them on the go."
  }
];

const UniversalCompressorPage = () => {
  const schemaMarkup = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Universal Image Compressor - MultiTools",
    "description": "Free online universal image compressor. Compress JPEG, PNG, WebP, GIF, BMP, TIFF, HEIC, and more without losing quality.",
    "url": "https://multitoolsa.com/universal-image-compressor",
    "applicationCategory": "UtilitiesApplication",
    "operatingSystem": "Web Browser",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    }
  };

  return (
    <>
      <Helmet>
        <title>Universal Image Compressor - Compress Any Image Format Online Free</title>
        <meta name="description" content="Free online universal image compressor. Compress JPEG, PNG, WebP, GIF, BMP, TIFF, HEIC, SVG and more without losing quality. Fast, secure, browser-based compression." />
        <meta name="keywords" content="universal image compressor, compress any image, image compressor online, compress jpeg png webp gif, free image compression, reduce image size, all format compressor" />
        <link rel="canonical" href="https://multitoolsa.com/universal-image-compressor" />
        
        <meta property="og:title" content="Universal Image Compressor - Compress Any Image Online Free" />
        <meta property="og:description" content="Compress any image format including JPEG, PNG, WebP, GIF, BMP, TIFF, HEIC. Free, fast, and secure browser-based compression." />
        <meta property="og:type" content="website" />
        
        <script type="application/ld+json">
          {JSON.stringify(schemaMarkup)}
        </script>
      </Helmet>

      <div className="min-h-screen bg-background flex flex-col">
        <Header />
        
        <main className="flex-1">
          {/* Hero Section */}
          <section className="py-12 md:py-20 bg-gradient-hero relative overflow-hidden">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/10 rounded-full blur-3xl" />
            <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-accent/5 rounded-full blur-3xl" />
            
            <div className="container mx-auto px-4 relative z-10">
              <div className="text-center max-w-3xl mx-auto mb-10">
                <div className="w-20 h-20 rounded-3xl bg-gradient-orange flex items-center justify-center mx-auto mb-6 glow-orange">
                  <Minimize2 className="w-10 h-10 text-primary-foreground" />
                </div>
                
                <h1 className="text-3xl md:text-5xl font-bold mb-4">
                  Universal Image Compressor
                </h1>
                <p className="text-lg text-muted-foreground mb-2">
                  Compress any image format with a single tool. Fast, free, and secure.
                </p>
                <p className="text-sm text-muted-foreground">
                  Supports JPEG, PNG, WebP, GIF, BMP, TIFF, HEIC, SVG, AVIF and more
                </p>
              </div>

              {/* Main Compressor Tool */}
              <div className="max-w-3xl mx-auto">
                <UniversalImageCompressor />
              </div>
            </div>
          </section>

          {/* Supported Formats */}
          <section className="py-12 md:py-16 px-4">
            <div className="container mx-auto max-w-5xl">
              <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">
                All Formats Supported
              </h2>
              
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                {supportedFormats.map((format) => (
                  <div
                    key={format.name}
                    className="bg-card rounded-xl p-4 border border-border hover:border-primary/50 transition-all text-center"
                  >
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mx-auto mb-3">
                      <FileImage className="w-5 h-5 text-primary" />
                    </div>
                    <h3 className="font-semibold mb-1">{format.name}</h3>
                    <p className="text-xs text-muted-foreground mb-2">{format.desc}</p>
                    <span className="text-xs text-primary font-medium">{format.savings}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Features */}
          <section className="py-12 md:py-16 px-4 bg-gradient-dark">
            <div className="container mx-auto max-w-5xl">
              <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">
                Why Choose Our Universal Compressor?
              </h2>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {features.map((item, i) => (
                  <div key={i} className="bg-card rounded-xl p-6 border border-border text-center hover-lift">
                    <div className="w-14 h-14 rounded-xl bg-gradient-orange flex items-center justify-center mx-auto mb-4">
                      <item.icon className="w-7 h-7 text-primary-foreground" />
                    </div>
                    <h3 className="font-semibold mb-2">{item.title}</h3>
                    <p className="text-sm text-muted-foreground">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* How It Works */}
          <section className="py-12 md:py-16 px-4">
            <div className="container mx-auto max-w-4xl">
              <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">
                How It Works
              </h2>
              
              <div className="grid md:grid-cols-3 gap-6">
                {[
                  { step: "1", title: "Upload", desc: "Drag and drop or click to upload any image file" },
                  { step: "2", title: "Adjust", desc: "Set your preferred quality level using the slider" },
                  { step: "3", title: "Download", desc: "Get your compressed image instantly" },
                ].map((item) => (
                  <div key={item.step} className="text-center">
                    <div className="w-12 h-12 rounded-full bg-gradient-orange flex items-center justify-center mx-auto mb-4 text-xl font-bold text-primary-foreground">
                      {item.step}
                    </div>
                    <h3 className="font-semibold mb-2">{item.title}</h3>
                    <p className="text-sm text-muted-foreground">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Format-Specific Compressors */}
          <section className="py-12 md:py-16 px-4 bg-gradient-dark">
            <div className="container mx-auto max-w-5xl">
              <h2 className="text-2xl md:text-3xl font-bold text-center mb-4">
                Need Format-Specific Compression?
              </h2>
              <p className="text-center text-muted-foreground mb-8">
                We also offer dedicated compressors optimized for each format
              </p>
              
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {[
                  { name: "JPEG Compressor", slug: "jpeg-compressor", savings: "Up to 90%" },
                  { name: "PNG Compressor", slug: "png-compressor", savings: "Up to 60%" },
                  { name: "WebP Compressor", slug: "webp-compressor", savings: "Up to 50%" },
                  { name: "GIF Compressor", slug: "gif-compressor", savings: "Up to 50%" },
                  { name: "TIFF Compressor", slug: "tiff-compressor", savings: "Up to 95%" },
                ].map((tool) => (
                  <Link
                    key={tool.slug}
                    to={`/${tool.slug}`}
                    className="group bg-card rounded-xl p-4 border border-border hover:border-primary/50 transition-all flex items-center gap-4"
                  >
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Minimize2 className="w-5 h-5 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold group-hover:text-primary transition-colors">
                        {tool.name}
                      </h3>
                      <p className="text-xs text-muted-foreground">{tool.savings}</p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                  </Link>
                ))}
              </div>
            </div>
          </section>

          {/* FAQs */}
          <section className="py-12 md:py-16 px-4">
            <div className="container mx-auto max-w-4xl">
              <h2 className="text-2xl md:text-3xl font-bold mb-6">
                Frequently Asked Questions
              </h2>
              
              <Accordion type="single" collapsible className="space-y-2">
                {faqs.map((faq, i) => (
                  <AccordionItem key={i} value={`faq-${i}`} className="bg-card border border-border rounded-xl px-4">
                    <AccordionTrigger className="text-left hover:no-underline">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default UniversalCompressorPage;
