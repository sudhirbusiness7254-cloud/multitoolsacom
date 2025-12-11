import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Minimize2, ArrowRight, Zap, Shield, Globe, Sparkles } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const compressionTools = [
  { name: "Universal Compressor", slug: "universal-image-compressor", description: "Compress any image format", savings: "All Formats", featured: true },
  { name: "JPEG Compressor", slug: "jpeg-compressor", description: "Compress JPG/JPEG images", savings: "Up to 90%" },
  { name: "PNG Compressor", slug: "png-compressor", description: "Compress PNG with transparency", savings: "Up to 60%" },
  { name: "WebP Compressor", slug: "webp-compressor", description: "Optimize WebP images", savings: "Up to 50%" },
  { name: "GIF Compressor", slug: "gif-compressor", description: "Compress static GIF images", savings: "Up to 50%" },
  { name: "TIFF Compressor", slug: "tiff-compressor", description: "Compress TIFF images", savings: "Up to 95%" },
];

const faqs = [
  {
    question: "What is image compression?",
    answer: "Image compression reduces file size by removing unnecessary data. Lossy compression removes some image data for smaller files, while lossless compression preserves all data. Our tools use intelligent compression to balance quality and size."
  },
  {
    question: "Will compression reduce image quality?",
    answer: "It depends on the compression level. At recommended settings (70-85%), quality loss is virtually imperceptible. You can adjust the quality slider to find the perfect balance for your needs."
  },
  {
    question: "Which image format compresses best?",
    answer: "WebP offers the best compression for web use. JPEG compresses well for photographs. PNG is best for graphics with transparency. Choose based on your specific needs and browser compatibility requirements."
  },
  {
    question: "Are my images uploaded to a server?",
    answer: "No, all compression happens in your browser. Your images never leave your device, ensuring complete privacy and security."
  },
  {
    question: "How much can I reduce file size?",
    answer: "Results vary by image type and format. JPEG images typically reduce by 60-90%, PNG by 20-60%, and TIFF files can reduce by up to 95% due to their initially large size."
  },
  {
    question: "Can I compress images in bulk?",
    answer: "Currently, our tools process one image at a time. Simply compress each image sequentially for multiple files."
  }
];

const ImageCompressionPage = () => {
  const schemaMarkup = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Image Compression Tools - MultiTools",
    "description": "Free online image compression tools. Reduce JPEG, PNG, WebP, GIF, and TIFF file sizes without losing quality.",
    "url": "https://multitools.com/image-compression",
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
        <title>Image Compression Tools - Compress JPEG, PNG, WebP, GIF Online Free</title>
        <meta name="description" content="Free online image compression tools. Reduce JPEG, PNG, WebP, GIF, and TIFF file sizes by up to 90% without losing quality. Fast, secure, browser-based compression." />
        <meta name="keywords" content="image compressor, jpeg compressor, png compressor, webp compressor, gif compressor, compress images, reduce image size, image optimization" />
        <link rel="canonical" href="https://multitools.com/image-compression" />
        
        <meta property="og:title" content="Image Compression Tools - Compress Images Online Free" />
        <meta property="og:description" content="Reduce image file sizes by up to 90% without losing quality. Free online compression for JPEG, PNG, WebP, GIF, and TIFF." />
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
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/10 rounded-full blur-3xl" />
            
            <div className="container mx-auto px-4 relative z-10">
              <div className="text-center max-w-3xl mx-auto">
                <div className="w-16 h-16 rounded-2xl bg-gradient-orange flex items-center justify-center mx-auto mb-6">
                  <Minimize2 className="w-8 h-8 text-primary-foreground" />
                </div>
                
                <h1 className="text-3xl md:text-5xl font-bold mb-4">
                  Image Compression Tools
                </h1>
                <p className="text-lg text-muted-foreground mb-8">
                  Reduce image file sizes by up to 90% without losing quality. 
                  Fast, free, and secure browser-based compression for all major image formats.
                </p>
              </div>
            </div>
          </section>

          {/* Tools Grid */}
          <section className="py-12 md:py-16 px-4">
            <div className="container mx-auto max-w-5xl">
              <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">
                Choose Your Compressor
              </h2>
              
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {compressionTools.map((tool) => (
                  <Link
                    key={tool.slug}
                    to={`/${tool.slug}`}
                    className="group bg-card rounded-2xl p-6 border border-border hover:border-primary/50 transition-all hover-lift"
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 rounded-xl bg-gradient-orange flex items-center justify-center">
                        <Minimize2 className="w-5 h-5 text-primary-foreground" />
                      </div>
                      <span className="text-xs text-primary font-medium bg-primary/10 px-2 py-1 rounded">
                        {tool.savings}
                      </span>
                    </div>
                    
                    <h3 className="text-lg font-bold mb-2 group-hover:text-primary transition-colors">
                      {tool.name}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-4">{tool.description}</p>
                    
                    <div className="flex items-center gap-2 text-primary text-sm font-medium">
                      <span>Compress Now</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>

          {/* Features */}
          <section className="py-12 md:py-16 px-4 bg-gradient-dark">
            <div className="container mx-auto max-w-5xl">
              <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">
                Why Use Our Compression Tools?
              </h2>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  { icon: Zap, title: "Lightning Fast", desc: "Instant compression in your browser" },
                  { icon: Shield, title: "100% Secure", desc: "Files never leave your device" },
                  { icon: Globe, title: "Works Everywhere", desc: "Use on any device with a browser" },
                  { icon: Sparkles, title: "Free Forever", desc: "No hidden fees or watermarks" }
                ].map((item, i) => (
                  <div key={i} className="bg-card rounded-xl p-6 border border-border text-center">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                      <item.icon className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="font-semibold mb-2">{item.title}</h3>
                    <p className="text-sm text-muted-foreground">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Article */}
          <section className="py-12 md:py-16 px-4">
            <div className="container mx-auto max-w-4xl">
              <h2 className="text-2xl md:text-3xl font-bold mb-6">
                The Complete Guide to Image Compression
              </h2>
              
              <div className="prose prose-invert max-w-none space-y-4 text-muted-foreground">
                <p>
                  Image compression is essential for modern web development, social media, and digital communication. 
                  Large image files slow down websites, consume bandwidth, and fill storage quickly. Our suite of 
                  compression tools helps you solve these problems efficiently.
                </p>
                
                <p>
                  Understanding different image formats is key to effective compression. JPEG is ideal for photographs 
                  with millions of colors, offering excellent lossy compression. PNG preserves transparency and works 
                  best for graphics, logos, and screenshots. WebP, developed by Google, provides superior compression 
                  for web use with support for both lossy and lossless compression plus transparency.
                </p>
                
                <p>
                  Our compression tools use advanced algorithms to analyze your images and remove unnecessary data 
                  while preserving visual quality. The adjustable quality slider gives you complete control over the 
                  balance between file size and image quality. For most web use cases, 70-85% quality provides 
                  excellent results with significant file size reduction.
                </p>
                
                <p>
                  Security and privacy are paramount. Unlike cloud-based compression services, our tools process 
                  everything locally in your browser. Your images never leave your device, making our tools safe 
                  for sensitive, proprietary, or personal images.
                </p>
                
                <p>
                  Whether you are a web developer optimizing site performance, a photographer managing large image 
                  libraries, or a content creator preparing images for social media, our compression tools deliver 
                  professional results without the complexity or cost of desktop software.
                </p>
              </div>
            </div>
          </section>

          {/* FAQs */}
          <section className="py-12 md:py-16 px-4 bg-gradient-dark">
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

export default ImageCompressionPage;
