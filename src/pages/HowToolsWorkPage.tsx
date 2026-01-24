import { Helmet } from "react-helmet-async";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { AdBottom, AdVideo, AdInline, AdExoticFat } from "@/components/ads/AdContainer";
import HreflangTags from "@/components/HreflangTags";
import { Link } from "react-router-dom";
import { 
  Cpu, Shield, Zap, Globe, Lock, Eye, Server, HardDrive, 
  Code, Layers, CheckCircle, ArrowRight, MonitorSmartphone,
  Wifi, WifiOff, Database, FileImage, Binary, Cog
} from "lucide-react";

const HowToolsWorkPage = () => {
  const processingSteps = [
    {
      icon: <FileImage className="w-6 h-6" />,
      title: "1. Image Selection",
      description: "When you select or drag an image file, your browser reads the file directly from your device using the HTML5 File API. The file data stays in your browser's memory."
    },
    {
      icon: <Binary className="w-6 h-6" />,
      title: "2. Data Processing",
      description: "JavaScript reads the image data and creates an in-memory representation using HTML5 Canvas API. This allows pixel-level manipulation without any server communication."
    },
    {
      icon: <Cog className="w-6 h-6" />,
      title: "3. Transformation",
      description: "Your requested operation (compression, conversion, resize, etc.) is performed entirely in JavaScript within your browser. Complex operations use Web Workers to avoid freezing your browser."
    },
    {
      icon: <HardDrive className="w-6 h-6" />,
      title: "4. Output Generation",
      description: "The processed image is encoded into the target format using browser-native encoding or JavaScript libraries. A download link is created pointing to data in your browser's memory."
    }
  ];

  const technologies = [
    {
      name: "HTML5 Canvas API",
      description: "A powerful 2D graphics API built into every modern browser. We use it to read, manipulate, and encode image pixel data for operations like cropping, resizing, and format conversion.",
      useCase: "Image manipulation, pixel operations, format encoding"
    },
    {
      name: "JavaScript (ES6+)",
      description: "Modern JavaScript handles all processing logic. Advanced features like async/await ensure smooth performance, while typed arrays enable efficient binary data handling.",
      useCase: "Core processing logic, user interface, data handling"
    },
    {
      name: "Web Workers",
      description: "Background threads that run heavy computations without blocking the main interface. Used for intensive operations like compression algorithms on large images.",
      useCase: "Heavy computations, parallel processing"
    },
    {
      name: "Blob API",
      description: "Allows creation of file-like objects in browser memory. We use it to create downloadable files from processed image data without ever touching a server.",
      useCase: "File creation, download generation"
    },
    {
      name: "WebAssembly (Wasm)",
      description: "For certain advanced operations, we use WebAssembly modules compiled from C/C++ libraries, running at near-native speed directly in your browser.",
      useCase: "High-performance algorithms, complex codecs"
    }
  ];

  const privacyGuarantees = [
    {
      icon: <WifiOff className="w-5 h-5" />,
      title: "No Upload Required",
      description: "Your images are never uploaded to any server. All processing happens locally on your device using browser technologies."
    },
    {
      icon: <Server className="w-5 h-5" />,
      title: "No Server Processing",
      description: "We don't have servers waiting to receive your images. There's no backend infrastructure for image handling—by design."
    },
    {
      icon: <Database className="w-5 h-5" />,
      title: "No Storage",
      description: "Images exist only in your browser's temporary memory. When you close the tab or navigate away, all image data is automatically cleared."
    },
    {
      icon: <Eye className="w-5 h-5" />,
      title: "No Access",
      description: "We physically cannot see your images. The architecture makes it technically impossible for us to access files you process."
    },
    {
      icon: <Lock className="w-5 h-5" />,
      title: "No Tracking",
      description: "We don't track which files you process, their names, contents, or any image-specific data. Your work remains completely private."
    },
    {
      icon: <Shield className="w-5 h-5" />,
      title: "Secure Connection",
      description: "Our website uses HTTPS encryption. While no images are transmitted, this protects the page content and any analytics data."
    }
  ];

  const technicalDetails = [
    {
      question: "How does image compression work in the browser?",
      answer: "When you compress an image, our JavaScript code decodes the image into raw pixel data using Canvas API, then re-encodes it with the specified quality level. For JPEG, this uses the browser's built-in encoder. For advanced compression, we use optimized JavaScript or WebAssembly algorithms that analyze the image and remove redundant data intelligently."
    },
    {
      question: "How are format conversions performed?",
      answer: "Format conversion involves decoding the source image to a Canvas (raw pixels), then using Canvas.toDataURL() or Canvas.toBlob() to encode in the target format. Each format has specific encoding options—for example, JPEG accepts a quality parameter while PNG supports different compression levels."
    },
    {
      question: "Why is processing speed dependent on my device?",
      answer: "Since all processing happens on your device, performance scales with your hardware. Faster processors complete operations quicker. Modern smartphones handle most images instantly, while older devices may take a few seconds for large files. This is the trade-off for complete privacy."
    },
    {
      question: "Can I process images offline?",
      answer: "Once the page is loaded, most tools work without an internet connection since all code runs locally. However, initial page load requires internet access. We're exploring Progressive Web App (PWA) features for full offline support."
    },
    {
      question: "What happens to my image data after processing?",
      answer: "Processed images exist only in your browser's memory (RAM) until you download them. When you close the tab, navigate away, or explicitly clear the data, it's released from memory. No copies are made, no cloud backups exist—the data simply ceases to exist."
    },
    {
      question: "Are there file size limits?",
      answer: "There are no arbitrary limits. However, very large images (100MB+) may exceed your device's available memory, causing processing to fail. Most devices handle files up to 50MB without issues. For larger files, consider processing them in sections or using a device with more RAM."
    }
  ];

  return (
    <>
      <Helmet>
        <title>How Our Tools Work - Browser-Based Image Processing Explained | MultiToolsA</title>
        <meta name="description" content="Learn how MultiToolsA processes images entirely in your browser using JavaScript and HTML5. Understand the technology behind our privacy-first approach with no server uploads." />
        <meta name="keywords" content="browser-based image processing, client-side image editing, JavaScript image tools, HTML5 Canvas, privacy-first tools, no upload image editor" />
        <link rel="canonical" href="https://multitoolsa.com/how-tools-work" />
        
        <meta property="og:title" content="How Our Tools Work - Browser-Based Image Processing" />
        <meta property="og:description" content="Discover the technology behind MultiToolsA's privacy-first image tools. All processing happens in your browser—no uploads, no servers, no risk." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://multitoolsa.com/how-tools-work" />
        
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "TechArticle",
            "headline": "How Browser-Based Image Processing Works",
            "description": "Technical explanation of how MultiToolsA processes images entirely in your browser using JavaScript and HTML5 technologies.",
            "author": {
              "@type": "Organization",
              "name": "MultiToolsA"
            },
            "publisher": {
              "@type": "Organization",
              "name": "MultiToolsA",
              "url": "https://multitoolsa.com"
            },
            "mainEntityOfPage": "https://multitoolsa.com/how-tools-work"
          })}
        </script>
      </Helmet>
      <HreflangTags path="/how-tools-work" />

      <div className="min-h-screen bg-background flex flex-col">
        <Header />
        
        <main className="flex-1">
          {/* Hero Section */}
          <section className="py-16 md:py-24 bg-gradient-hero relative overflow-hidden">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/10 rounded-full blur-3xl pointer-events-none" />
            
            <div className="container mx-auto px-4 relative z-10 text-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/30 mb-6">
                <Cpu className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium text-primary">Technical Deep Dive</span>
              </div>
              
              <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-6">
                How Our Tools Work
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-8 leading-relaxed">
                Every MultiToolsA tool processes images entirely within your web browser. No uploads. No servers. 
                No risk. Here's the technology that makes this possible.
              </p>
              
              <div className="flex flex-wrap justify-center gap-4">
                <div className="flex items-center gap-2 px-4 py-2 bg-green-500/10 border border-green-500/30 rounded-full text-green-500 text-sm font-medium">
                  <Shield className="w-4 h-4" />
                  100% Client-Side
                </div>
                <div className="flex items-center gap-2 px-4 py-2 bg-blue-500/10 border border-blue-500/30 rounded-full text-blue-500 text-sm font-medium">
                  <Zap className="w-4 h-4" />
                  No Server Required
                </div>
                <div className="flex items-center gap-2 px-4 py-2 bg-purple-500/10 border border-purple-500/30 rounded-full text-purple-500 text-sm font-medium">
                  <Lock className="w-4 h-4" />
                  Privacy Guaranteed
                </div>
              </div>
            </div>
          </section>

          {/* Processing Flow */}
          <section className="py-16 md:py-20 px-4">
            <div className="container mx-auto max-w-5xl">
              <div className="text-center mb-12">
                <h2 className="text-2xl md:text-4xl font-bold mb-4">The Processing Pipeline</h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  Here's exactly what happens when you use any MultiToolsA image tool—from file selection to download.
                </p>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6">
                {processingSteps.map((step, index) => (
                  <div key={index} className="bg-card rounded-2xl p-6 border border-border relative">
                    <div className="absolute -top-3 -left-3 w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold text-sm">
                      {index + 1}
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary flex-shrink-0">
                        {step.icon}
                      </div>
                      <div>
                        <h3 className="font-bold text-lg mb-2">{step.title}</h3>
                        <p className="text-muted-foreground">{step.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-8 bg-green-500/10 border border-green-500/30 rounded-2xl p-6 text-center">
                <Shield className="w-8 h-8 text-green-500 mx-auto mb-3" />
                <p className="text-green-500 font-medium text-lg mb-2">Notice what's missing?</p>
                <p className="text-muted-foreground">
                  There's no "upload to server" step. There's no "wait for server response" step. 
                  Your image never leaves the device you're holding right now.
                </p>
              </div>
            </div>
          </section>

          {/* Technologies Used */}
          <section className="py-16 md:py-20 px-4 bg-gradient-dark">
            <div className="container mx-auto max-w-5xl">
              <div className="text-center mb-12">
                <h2 className="text-2xl md:text-4xl font-bold mb-4">Technologies We Use</h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  Modern web standards make browser-based image processing possible. Here are the key technologies powering MultiToolsA.
                </p>
              </div>
              
              <div className="space-y-4">
                {technologies.map((tech, index) => (
                  <div key={index} className="bg-card rounded-xl p-6 border border-border">
                    <div className="flex flex-col md:flex-row md:items-start gap-4">
                      <div className="flex-1">
                        <h3 className="font-bold text-lg text-primary mb-2">{tech.name}</h3>
                        <p className="text-muted-foreground mb-2">{tech.description}</p>
                        <div className="flex items-center gap-2 text-sm">
                          <Code className="w-4 h-4 text-primary" />
                          <span className="text-muted-foreground"><strong>Used for:</strong> {tech.useCase}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Privacy Guarantees */}
          <section className="py-16 md:py-20 px-4">
            <div className="container mx-auto max-w-5xl">
              <div className="text-center mb-12">
                <h2 className="text-2xl md:text-4xl font-bold mb-4">Our Privacy Guarantees</h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  Privacy isn't just a policy—it's built into our architecture. Here's what our technical approach means for your data.
                </p>
              </div>
              
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {privacyGuarantees.map((item, index) => (
                  <div key={index} className="bg-card rounded-xl p-6 border border-border">
                    <div className="w-10 h-10 rounded-lg bg-green-500/10 flex items-center justify-center text-green-500 mb-4">
                      {item.icon}
                    </div>
                    <h3 className="font-bold mb-2">{item.title}</h3>
                    <p className="text-sm text-muted-foreground">{item.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Device Diagram */}
          <section className="py-16 md:py-20 px-4 bg-gradient-dark">
            <div className="container mx-auto max-w-4xl">
              <div className="text-center mb-12">
                <h2 className="text-2xl md:text-4xl font-bold mb-4">Your Device Does Everything</h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  Traditional online tools upload your files to their servers for processing. 
                  MultiToolsA is fundamentally different.
                </p>
              </div>
              
              <div className="grid md:grid-cols-2 gap-8">
                {/* Traditional Tools */}
                <div className="bg-red-500/5 border border-red-500/30 rounded-2xl p-6">
                  <h3 className="font-bold text-lg text-red-500 mb-4 flex items-center gap-2">
                    <Server className="w-5 h-5" />
                    Traditional Online Tools
                  </h3>
                  <div className="space-y-3 text-sm">
                    <div className="flex items-center gap-3">
                      <span className="w-6 h-6 rounded-full bg-red-500/20 flex items-center justify-center text-red-500 text-xs">1</span>
                      <span className="text-muted-foreground">Upload image to server</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="w-6 h-6 rounded-full bg-red-500/20 flex items-center justify-center text-red-500 text-xs">2</span>
                      <span className="text-muted-foreground">Server stores and processes</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="w-6 h-6 rounded-full bg-red-500/20 flex items-center justify-center text-red-500 text-xs">3</span>
                      <span className="text-muted-foreground">Download from server</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="w-6 h-6 rounded-full bg-red-500/20 flex items-center justify-center text-red-500 text-xs">⚠</span>
                      <span className="text-muted-foreground">Copies may remain on server</span>
                    </div>
                  </div>
                </div>
                
                {/* MultiToolsA */}
                <div className="bg-green-500/5 border border-green-500/30 rounded-2xl p-6">
                  <h3 className="font-bold text-lg text-green-500 mb-4 flex items-center gap-2">
                    <MonitorSmartphone className="w-5 h-5" />
                    MultiToolsA Approach
                  </h3>
                  <div className="space-y-3 text-sm">
                    <div className="flex items-center gap-3">
                      <span className="w-6 h-6 rounded-full bg-green-500/20 flex items-center justify-center text-green-500 text-xs">1</span>
                      <span className="text-muted-foreground">Select image (stays on device)</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="w-6 h-6 rounded-full bg-green-500/20 flex items-center justify-center text-green-500 text-xs">2</span>
                      <span className="text-muted-foreground">Browser processes locally</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="w-6 h-6 rounded-full bg-green-500/20 flex items-center justify-center text-green-500 text-xs">3</span>
                      <span className="text-muted-foreground">Save result to device</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="w-6 h-6 rounded-full bg-green-500/20 flex items-center justify-center text-green-500 text-xs">✓</span>
                      <span className="text-muted-foreground">No copies exist anywhere else</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Technical FAQs */}
          <section className="py-16 md:py-20 px-4">
            <div className="container mx-auto max-w-4xl">
              <div className="text-center mb-12">
                <h2 className="text-2xl md:text-4xl font-bold mb-4">Technical Questions Answered</h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  Common questions about how browser-based image processing works.
                </p>
              </div>
              
              <div className="space-y-4">
                {technicalDetails.map((item, index) => (
                  <div key={index} className="bg-card rounded-xl p-6 border border-border">
                    <h3 className="font-bold text-lg mb-3">{item.question}</h3>
                    <p className="text-muted-foreground leading-relaxed">{item.answer}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="py-16 md:py-20 px-4 bg-gradient-dark">
            <div className="container mx-auto max-w-3xl text-center">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">Experience Privacy-First Image Tools</h2>
              <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
                Now that you understand how we protect your privacy, try our tools for yourself. 
                Over 100 tools, all free, all private.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link 
                  to="/all-tools"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors"
                >
                  Browse All Tools
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link 
                  to="/about"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-secondary text-secondary-foreground font-medium hover:bg-secondary/80 transition-colors"
                >
                  Learn About Us
                </Link>
              </div>
              
              {/* Ads Section */}
              <div className="mt-10 space-y-4">
                <AdExoticFat />
                <AdVideo />
                <AdInline />
                <AdBottom />
                <AdExoticFat />
              </div>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default HowToolsWorkPage;
