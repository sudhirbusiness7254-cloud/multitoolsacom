import { Helmet } from "react-helmet-async";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HreflangTags from "@/components/HreflangTags";
import { AdBottom, AdVideo, AdInline, AdExoticFat } from "@/components/ads/AdContainer";
import { Link } from "react-router-dom";
import { Sparkles, Wand2, ArrowUpCircle, History, Zap, Shield, Download, Users, Palette, Smile, ChevronRight, Star, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import ImageComparisonSlider from "@/components/ImageComparisonSlider";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

// Import demo images
import girl1Before from "@/assets/demo/girl1-before.jpg";
import girl1After from "@/assets/demo/girl1-after.jpg";
import girl2Before from "@/assets/demo/girl2-before.jpg";
import girl2After from "@/assets/demo/girl2-after.jpg";
import girl3Before from "@/assets/demo/girl3-before.jpg";
import girl3After from "@/assets/demo/girl3-after.jpg";

const aiTools = [
  {
    name: "AI Photo Enhancer",
    slug: "ai-photo-enhancer",
    description: "Enhance photos to 4K quality with advanced AI technology.",
    icon: Sparkles,
    gradient: { from: "#10B981", to: "#059669" },
    badge: "Most Popular"
  },
  {
    name: "AI Image Upscaler",
    slug: "ai-image-upscaler",
    description: "Upscale images 4x with AI super-resolution.",
    icon: ArrowUpCircle,
    gradient: { from: "#3B82F6", to: "#6366F1" },
    badge: "4K Output"
  },
  {
    name: "AI Face Beautify",
    slug: "ai-face-beautify",
    description: "Professional face retouching with AI.",
    icon: Smile,
    gradient: { from: "#EC4899", to: "#F43F5E" },
    badge: "Pro Quality"
  },
  {
    name: "AI Image Restorer",
    slug: "ai-image-restorer",
    description: "Restore old, damaged photos to new quality.",
    icon: History,
    gradient: { from: "#F59E0B", to: "#EA580C" },
    badge: null
  },
  {
    name: "AI Image Generator",
    slug: "ai-image-generation",
    description: "Create images from text descriptions.",
    icon: Wand2,
    gradient: { from: "#A855F7", to: "#EC4899" },
    badge: null
  },
  {
    name: "AI Face Swap",
    slug: "ai-face-swap",
    description: "Swap faces between photos realistically.",
    icon: Users,
    gradient: { from: "#EC4899", to: "#F97316" },
    badge: null
  },
  {
    name: "AI Colorize",
    slug: "ai-colorize",
    description: "Add color to black & white photos.",
    icon: Palette,
    gradient: { from: "#F59E0B", to: "#EAB308" },
    badge: null
  }
];

// Demo comparison sliders with actual before/after images
const demoSliders = [
  {
    title: "Photo Enhancement",
    original: girl1Before,
    enhanced: girl1After,
    tool: "ai-photo-enhancer",
    aspectClassName: "aspect-[3/4]" // Portrait to match other tools
  },
  {
    title: "Face Beautify",
    original: girl2Before,
    enhanced: girl2After,
    tool: "ai-face-beautify",
    aspectClassName: "aspect-[3/4]" // Portrait for face tools
  },
  {
    title: "Image Upscaling",
    original: girl3Before,
    enhanced: girl3After,
    tool: "ai-image-upscaler",
    aspectClassName: "aspect-[3/4]" // Portrait for close-up detail
  }
];

const AIImageToolsPage = () => {
  return (
    <>
      <Helmet>
        <title>AI Image Tools - Free Online AI Photo Editor | 4K Quality</title>
        <meta name="description" content="Free AI-powered image tools: Photo Enhancer, Image Upscaler, Face Beautify):, and more. 4K quality output. Professional results. No signup required." />
        <meta name="keywords" content="AI image tools, AI photo enhancer, AI upscaler, background remover, image restorer, free AI tools, 4K photo enhancement" />
        <link rel="canonical" href="https://multitoolsa.com/ai-image-tools" />
      </Helmet>
      <HreflangTags path="/ai-image-tools" />

      <div className="min-h-screen bg-background flex flex-col">
        <Header />
        
        <main className="flex-1">
          {/* Hero Section - Remini Style */}
          <section className="py-16 md:py-24 lg:py-28 bg-gradient-to-b from-background via-purple-500/5 to-background relative overflow-hidden">
            {/* Animated background */}
            <div className="absolute inset-0 overflow-hidden">
              <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-[100px] animate-pulse" />
              <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-pink-500/10 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: '1s' }} />
            </div>
            
            <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16 relative z-10">
              <div className="text-center max-w-5xl xl:max-w-6xl mx-auto mb-12">
                {/* Badge */}
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30 mb-6">
                  <Sparkles className="w-4 h-4 text-purple-400" />
                  <span className="text-sm font-medium bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                    AI-Powered • 4K Quality • Free
                  </span>
                </div>
                
                <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-bold mb-6 leading-tight">
                  <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">
                    AI Photo Enhancement
                  </span>
                  <br />
                  <span className="text-foreground">Professional 4K Quality</span>
                </h1>
                
                <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
                  Transform your photos with professional AI enhancement. 
                  4K ultra-HD quality, instant results, completely free.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link to="/ai-photo-enhancer">
                    <Button size="lg" className="gap-2 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-lg px-8 py-6">
                      <Sparkles className="w-5 h-5" />
                      Enhance Photo Now
                      <ChevronRight className="w-5 h-5" />
                    </Button>
                  </Link>
                  <Link to="/ai-image-upscaler">
                    <Button size="lg" variant="outline" className="gap-2 text-lg px-8 py-6">
                      <ArrowUpCircle className="w-5 h-5" />
                      Upscale to 4K
                    </Button>
                  </Link>
                </div>
                
                {/* Trust badges */}
                <div className="flex items-center justify-center gap-6 mt-8 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                    <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                    <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                    <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                    <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                    <span className="ml-1">4.9/5</span>
                  </div>
                  <div className="w-px h-4 bg-border" />
                  <span>1M+ Photos Enhanced</span>
                  <div className="w-px h-4 bg-border hidden sm:block" />
                  <span className="hidden sm:block">No Signup Required</span>
                </div>
              </div>

              {/* Demo Comparison Sliders */}
              <div className="grid md:grid-cols-3 gap-4 md:gap-6 max-w-6xl xl:max-w-7xl 2xl:max-w-[1600px] mx-auto">
                {demoSliders.map((demo, index) => (
                  <div 
                    key={index} 
                    className="group relative"
                  >
                    <div className="absolute -inset-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl opacity-0 group-hover:opacity-100 blur transition-all duration-300" />
                    <div className="relative bg-card rounded-xl overflow-hidden border border-border group-hover:border-transparent transition-colors">
                      <ImageComparisonSlider
                        originalSrc={demo.original}
                        compressedSrc={demo.enhanced}
                        originalLabel="Before"
                        compressedLabel="After"
                        aspectClassName={demo.aspectClassName}
                      />
                      <div className="p-4 text-center">
                        <h3 className="font-semibold">{demo.title}</h3>
                        <p className="text-sm text-muted-foreground mb-2">Drag to compare</p>
                        <Link to={`/${demo.tool}`}>
                          <Button size="sm" variant="outline" className="text-xs">
                            Try {demo.title} →
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* AI Tools Grid */}
          <section className="py-16 md:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16">
            <div className="w-full max-w-6xl xl:max-w-7xl 2xl:max-w-[1600px] mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">All AI Image Tools</h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  Professional-grade AI tools for every photo editing need. Each tool includes before/after comparison.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
                {aiTools.map((tool) => {
                  const Icon = tool.icon;
                  return (
                    <Link
                      key={tool.slug}
                      to={`/${tool.slug}`}
                      className="group relative"
                    >
                      {/* Glow effect on hover */}
                      <div 
                        className="absolute -inset-0.5 rounded-2xl opacity-0 group-hover:opacity-100 blur-sm transition-opacity duration-300"
                        style={{ background: `linear-gradient(135deg, ${tool.gradient.from}, ${tool.gradient.to})` }}
                      />
                      
                      <div className="relative bg-card hover:bg-card/80 border border-border group-hover:border-transparent rounded-xl p-6 transition-all duration-300 h-full">
                        {/* Badge */}
                        {tool.badge && (
                          <div 
                            className="absolute top-4 right-4 px-2 py-1 rounded-full text-xs font-medium text-white"
                            style={{ background: `linear-gradient(135deg, ${tool.gradient.from}, ${tool.gradient.to})` }}
                          >
                            {tool.badge}
                          </div>
                        )}
                        
                        <div className="flex items-start gap-4">
                          <div 
                            className="w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg"
                            style={{ background: `linear-gradient(135deg, ${tool.gradient.from}, ${tool.gradient.to})` }}
                          >
                            <Icon className="w-7 h-7 text-white" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h3 className="font-semibold text-lg mb-2 group-hover:text-primary transition-colors">
                              {tool.name}
                            </h3>
                            <p className="text-sm text-muted-foreground">
                              {tool.description}
                            </p>
                          </div>
                        </div>
                        
                        {/* CTA */}
                        <div className="mt-4 pt-4 border-t border-border flex items-center justify-between">
                          <span className="text-sm text-muted-foreground">Free • No signup</span>
                          <div className="flex items-center gap-1 text-primary text-sm font-medium group-hover:gap-2 transition-all">
                            Try Now
                            <ChevronRight className="w-4 h-4" />
                          </div>
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
              
              {/* Ads - After Tools Grid */}
              <div className="max-w-4xl mx-auto mt-10">
                <AdInline />
                <AdBottom className="mt-4" />
                <AdVideo className="mt-4" />
              </div>
            </div>
          </section>

          {/* Features Section */}
          <section className="py-16 md:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16 bg-gradient-to-b from-secondary/30 to-background">
            <div className="w-full max-w-6xl xl:max-w-7xl 2xl:max-w-[1600px] mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose Our AI Tools?</h2>
                <p className="text-muted-foreground">Professional quality results, completely free</p>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                {[
                  { 
                    icon: Zap, 
                    title: "4K Ultra HD", 
                    desc: "Professional quality output",
                    gradient: "from-yellow-500 to-orange-500"
                  },
                  { 
                    icon: Shield, 
                    title: "100% Private", 
                    desc: "Your images are never stored",
                    gradient: "from-green-500 to-emerald-500"
                  },
                  { 
                    icon: Download, 
                    title: "Free Downloads", 
                    desc: "No watermarks, no limits",
                    gradient: "from-blue-500 to-cyan-500"
                  },
                  { 
                    icon: Play, 
                    title: "Instant Results", 
                    desc: "Process images in seconds",
                    gradient: "from-purple-500 to-pink-500"
                  }
                ].map((item, i) => (
                  <div key={i} className="bg-card rounded-xl p-6 border border-border text-center hover:border-primary/50 transition-colors group">
                    <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${item.gradient} flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform`}>
                      <item.icon className="w-7 h-7 text-white" />
                    </div>
                    <h3 className="font-semibold text-lg mb-2">{item.title}</h3>
                    <p className="text-sm text-muted-foreground">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* How It Works */}
          <section className="py-16 md:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16">
            <div className="w-full max-w-5xl xl:max-w-6xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">How It Works</h2>
                <p className="text-muted-foreground">Enhance your photos in 3 simple steps</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
                {[
                  { step: "1", title: "Upload Photo", desc: "Drag & drop or click to upload any photo" },
                  { step: "2", title: "AI Enhances", desc: "Our AI automatically processes your image" },
                  { step: "3", title: "Download 4K", desc: "Compare & download your enhanced photo" }
                ].map((item, i) => (
                  <div key={i} className="text-center">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center mx-auto mb-4 text-2xl font-bold text-white">
                      {item.step}
                    </div>
                    <h3 className="font-semibold text-lg mb-2">{item.title}</h3>
                    <p className="text-sm text-muted-foreground">{item.desc}</p>
                  </div>
                ))}
              </div>
              
              {/* CTA */}
              <div className="text-center mt-12">
                <Link to="/ai-photo-enhancer">
                  <Button size="lg" className="gap-2 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600">
                    <Sparkles className="w-5 h-5" />
                    Try It Free Now
                  </Button>
                </Link>
              </div>
            </div>
          </section>

          {/* Comprehensive About Section */}
          <section className="py-16 md:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16">
            <div className="w-full max-w-5xl xl:max-w-6xl mx-auto">
              <div className="prose prose-lg dark:prose-invert max-w-none">
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-8">About Our AI Image Tools</h2>
                
                <p className="text-muted-foreground leading-relaxed">
                  Welcome to the most comprehensive suite of free AI-powered image enhancement tools available online. Our AI Image Tools collection represents the cutting edge of artificial intelligence technology applied to photo editing, offering professional-grade results that rival expensive software and paid services. Whether you're a professional photographer, social media influencer, small business owner, or someone who simply wants to make their photos look stunning, our tools provide everything you need to transform ordinary images into extraordinary masterpieces.
                </p>

                <h3 className="text-2xl font-semibold mt-10 mb-4">What Are AI Image Tools?</h3>
                <p className="text-muted-foreground leading-relaxed">
                  AI Image Tools utilize advanced machine learning algorithms and neural networks trained on millions of high-quality photographs to understand and enhance visual content. Unlike traditional photo editing software that relies on manual adjustments and filters, AI-powered tools can intelligently analyze your images, identify areas for improvement, and apply sophisticated enhancements automatically. This includes recognizing faces, understanding lighting conditions, detecting noise and blur, and applying corrections that would take hours to achieve manually. Our suite includes seven powerful tools: AI Photo Enhancer for overall quality improvement, AI Image Upscaler for resolution enhancement, AI Face Beautify for portrait retouching, AI Image Restorer for repairing old or damaged photos, AI Face Swap for creative transformations, AI Colorize for adding color to black and white images, and AI Image Generator for creating images from text descriptions.
                </p>

                <h3 className="text-2xl font-semibold mt-10 mb-4">How Our AI Enhancement Technology Works</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Our AI enhancement technology operates through a sophisticated multi-stage processing pipeline. When you upload an image, our neural networks first analyze the content to understand what type of image it is—whether it's a portrait, landscape, group photo, or document. The AI then identifies specific characteristics such as faces, backgrounds, text, and objects. Based on this analysis, specialized enhancement models are applied: facial enhancement networks improve skin texture and features while preserving identity, super-resolution networks increase detail and sharpness, color correction models optimize saturation and white balance, and noise reduction algorithms remove grain while preserving important details. The entire process takes just seconds, transforming your photos with the precision of a professional retoucher but at lightning speed.
                </p>

                <h3 className="text-2xl font-semibold mt-10 mb-4">Why Choose Our AI Image Tools Over Alternatives?</h3>
                <p className="text-muted-foreground leading-relaxed">
                  There are many AI photo enhancement services available, so why should you choose ours? First, we offer truly free access with no hidden fees, watermarks, or usage limits—unlike paid apps that restrict features behind paywalls. Second, our 4K Ultra HD output quality matches or exceeds paid services, utilizing the latest AI models trained on professional photography datasets. Third, privacy is paramount: your images are processed securely and never stored on our servers, unlike many competitors who retain your photos for training purposes. Fourth, there's no account creation required—simply upload and enhance without the friction of signup forms and email verification. Fifth, our browser-based tools work on any device with an internet connection, including smartphones, tablets, laptops, and desktop computers, without requiring software installation.
                </p>

                <h3 className="text-2xl font-semibold mt-10 mb-4">Key Features of Our AI Suite</h3>
                <div className="text-muted-foreground leading-relaxed space-y-3">
                  <p><strong>4K Ultra HD Output:</strong> Every enhanced image is processed to achieve maximum resolution and clarity, suitable for printing, professional portfolios, and high-resolution displays.</p>
                  <p><strong>Instant Processing:</strong> Our optimized AI infrastructure processes images in seconds, not minutes, so you can enhance multiple photos without waiting.</p>
                  <p><strong>Before/After Comparison:</strong> Every tool includes an interactive comparison slider that lets you see exactly what improvements have been made to your image.</p>
                  <p><strong>Batch Processing:</strong> Need to enhance multiple images? Our tools support batch uploads for efficient workflow management.</p>
                  <p><strong>Format Flexibility:</strong> Upload images in any common format including JPG, PNG, WEBP, HEIC, and download your enhanced results in your preferred format.</p>
                  <p><strong>Mobile Optimization:</strong> Our tools are fully responsive and work beautifully on mobile devices, making on-the-go photo enhancement effortless.</p>
                </div>

                <h3 className="text-2xl font-semibold mt-10 mb-4">Who Can Benefit from AI Image Tools?</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Our AI Image Tools serve a diverse range of users across different industries and use cases. Professional photographers use our upscaling and enhancement tools to prepare images for large-format printing and client delivery. Social media managers and influencers rely on our face beautify and photo enhancer to create scroll-stopping content that drives engagement. E-commerce businesses enhance product photos to increase conversion rates and build customer trust. Real estate agents use our tools to make property photos more appealing to potential buyers. Family historians and genealogists restore old, faded photographs to preserve precious memories for future generations. Graphic designers incorporate our AI-generated images and enhanced photos into marketing materials and creative projects. Students and educators enhance educational materials and presentation visuals. The applications are virtually limitless.
                </p>

                <h3 className="text-2xl font-semibold mt-10 mb-4">Real-World Use Cases</h3>
                <div className="text-muted-foreground leading-relaxed space-y-3">
                  <p><strong>Social Media Optimization:</strong> Transform smartphone photos into professional-looking content for Instagram, TikTok, LinkedIn, and other platforms. Enhanced images receive significantly more engagement than unedited uploads.</p>
                  <p><strong>Old Photo Restoration:</strong> Breathe new life into vintage family photos, historical documents, and cherished memories. Our AI can repair scratches, remove stains, and even add color to black and white images.</p>
                  <p><strong>Professional Headshots:</strong> Upgrade casual photos into polished headshots suitable for resumes, LinkedIn profiles, and company websites without expensive photography sessions.</p>
                  <p><strong>Print Preparation:</strong> Upscale low-resolution images to print-ready quality for posters, canvas prints, photo books, and marketing materials.</p>
                  <p><strong>E-commerce Product Photos:</strong> Enhance product images to showcase items in their best light, improving click-through rates and customer confidence.</p>
                </div>

                <h3 className="text-2xl font-semibold mt-10 mb-4">Our Commitment to Privacy and Security</h3>
                <p className="text-muted-foreground leading-relaxed">
                  We understand that your photos often contain personal and sensitive content. That's why we've built our entire platform with privacy as a foundational principle. When you upload an image to our tools, it is processed entirely in real-time and immediately discarded after enhancement is complete. We do not store, archive, or use your images for any purpose other than the immediate enhancement you've requested. Our servers use industry-standard encryption protocols to protect data in transit, and we never share your content with third parties. Unlike many AI services that use uploaded images to train their models, we respect your intellectual property and personal privacy completely. You can use our tools with confidence, knowing that your photos remain yours and yours alone.
                </p>

                <h3 className="text-2xl font-semibold mt-10 mb-4">Technical Excellence Behind the Scenes</h3>
                <p className="text-muted-foreground leading-relaxed">
                  The technology powering our AI Image Tools represents years of research and development in computer vision and deep learning. Our enhancement models are based on state-of-the-art architectures including Generative Adversarial Networks (GANs), Transformer-based models, and custom neural network designs optimized for specific enhancement tasks. We continuously update our models with the latest advancements in AI research, ensuring that you always have access to cutting-edge technology. Our infrastructure is built on scalable cloud architecture that can handle millions of image enhancements while maintaining fast processing times and consistent quality. Whether you're the first user of the day or the millionth, you'll experience the same lightning-fast, high-quality results.
                </p>

                <h3 className="text-2xl font-semibold mt-10 mb-4">Getting Started with AI Image Enhancement</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Using our AI Image Tools is incredibly simple. Choose the tool that matches your needs from our collection above. Upload your image by dragging and dropping it onto the tool interface or clicking to browse your files. Our AI will automatically process your image, typically completing enhancement within seconds. Use the interactive before/after slider to see the improvements and verify the results meet your expectations. When you're satisfied, download your enhanced image in high quality with no watermarks. That's it—professional-grade AI enhancement in four simple steps, completely free.
                </p>
              </div>
            </div>
          </section>

          {/* FAQ */}
          <section className="py-16 md:py-20 px-4 bg-secondary/30">
            <div className="container mx-auto max-w-4xl">
              <h2 className="text-3xl md:text-4xl font-bold text-center mb-10">Frequently Asked Questions</h2>
              
              <Accordion type="single" collapsible className="space-y-4">
                <AccordionItem value="1" className="bg-card border border-border rounded-xl px-6">
                  <AccordionTrigger>Is this really free? What's the quality like?</AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    Yes! All our AI image tools are completely free with no signup required. Our AI uses the latest models to deliver 4K quality results with professional-grade output. Unlike paid apps that limit free users and add watermarks, we offer unlimited free access with full-quality, watermark-free downloads.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="2" className="bg-card border border-border rounded-xl px-6">
                  <AccordionTrigger>What's the maximum output quality?</AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    Our AI enhances images to 4K Ultra HD quality (up to 4096 pixels on the longest edge) with professional-grade results. The upscaler can increase resolution by up to 4x while maintaining sharpness and adding realistic detail through AI reconstruction.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="3" className="bg-card border border-border rounded-xl px-6">
                  <AccordionTrigger>Are my photos private and secure?</AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    Absolutely. Your photos are processed in real-time and immediately discarded after enhancement. We never store, archive, or use your images for training purposes. All data transfers use encrypted connections, and we never share your content with third parties.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="4" className="bg-card border border-border rounded-xl px-6">
                  <AccordionTrigger>How does the comparison slider work?</AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    After your image is enhanced, you'll see an interactive before/after comparison slider. Simply drag the handle left or right to reveal more of the original or enhanced version. This allows you to see exactly what improvements the AI has made to your photo.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="5" className="bg-card border border-border rounded-xl px-6">
                  <AccordionTrigger>What image formats are supported?</AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    We support all common image formats including JPG, JPEG, PNG, WEBP, HEIC (iPhone photos), GIF, BMP, and TIFF. You can download your enhanced images in JPG or PNG format for maximum compatibility.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="6" className="bg-card border border-border rounded-xl px-6">
                  <AccordionTrigger>Can I use enhanced images commercially?</AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    Yes! Images you enhance using our tools remain your property. You can use them for any purpose including commercial projects, social media, print materials, websites, and more. We don't claim any rights to your original or enhanced images.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="7" className="bg-card border border-border rounded-xl px-6">
                  <AccordionTrigger>Do I need to create an account?</AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    No account is required! Simply visit any of our AI tools, upload your image, and download the enhanced result. We've designed our platform to be as frictionless as possible so you can get professional results instantly.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="8" className="bg-card border border-border rounded-xl px-6">
                  <AccordionTrigger>What's the difference between Photo Enhancer and Image Upscaler?</AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    The AI Photo Enhancer focuses on overall quality improvement including color correction, sharpness, noise reduction, and lighting optimization without changing resolution. The AI Image Upscaler specifically increases the resolution (pixel dimensions) of your image by 2x to 4x while adding AI-reconstructed detail. For best results on low-quality photos, use the Enhancer first, then the Upscaler.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </section>
        </main>
        
        <Footer />
      </div>
    </>
  );
};

export default AIImageToolsPage;
