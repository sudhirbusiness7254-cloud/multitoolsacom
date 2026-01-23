import { Helmet } from "react-helmet-async";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HreflangTags from "@/components/HreflangTags";
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
import enhanceBefore from "@/assets/demo/enhance-before.jpg";
import enhanceAfter from "@/assets/demo/enhance-after.jpg";
import beautifyBefore from "@/assets/demo/beautify-before.jpg";
import beautifyAfter from "@/assets/demo/beautify-after.jpg";
import upscaleBefore from "@/assets/demo/upscale-before.jpg";
import upscaleAfter from "@/assets/demo/upscale-after.jpg";

const aiTools = [
  {
    name: "AI Photo Enhancer",
    slug: "ai-photo-enhancer",
    description: "Enhance photos to 4K quality with AI. Better than Remini.",
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
    original: enhanceBefore,
    enhanced: enhanceAfter,
    tool: "ai-photo-enhancer",
    aspectClassName: "aspect-[3/4]" // Portrait to match other tools
  },
  {
    title: "Face Beautify",
    original: beautifyBefore,
    enhanced: beautifyAfter,
    tool: "ai-face-beautify",
    aspectClassName: "aspect-[3/4]" // Portrait for face tools
  },
  {
    title: "Image Upscaling",
    original: upscaleBefore,
    enhanced: upscaleAfter,
    tool: "ai-image-upscaler",
    aspectClassName: "aspect-[3/4]" // Portrait for close-up detail
  }
];

const AIImageToolsPage = () => {
  return (
    <>
      <Helmet>
        <title>AI Image Tools - Free Online AI Photo Editor | Better Than Remini</title>
        <meta name="description" content="Free AI-powered image tools: Photo Enhancer, Image Upscaler, Face Beautify, Background Remover. 4K quality output. Better than Remini. No signup required." />
        <meta name="keywords" content="AI image tools, AI photo enhancer, remini alternative, AI upscaler, background remover, image restorer, free AI tools, 4K photo enhancement" />
        <link rel="canonical" href="https://multitoolsa.com/ai-image-tools" />
      </Helmet>
      <HreflangTags path="/ai-image-tools" />

      <div className="min-h-screen bg-background flex flex-col">
        <Header />
        
        <main className="flex-1">
          {/* Hero Section - Remini Style */}
          <section className="py-16 md:py-24 bg-gradient-to-b from-background via-purple-500/5 to-background relative overflow-hidden">
            {/* Animated background */}
            <div className="absolute inset-0 overflow-hidden">
              <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-[100px] animate-pulse" />
              <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-pink-500/10 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: '1s' }} />
            </div>
            
            <div className="container mx-auto px-4 relative z-10">
              <div className="text-center max-w-4xl mx-auto mb-12">
                {/* Badge */}
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30 mb-6">
                  <Sparkles className="w-4 h-4 text-purple-400" />
                  <span className="text-sm font-medium bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                    AI-Powered • 4K Quality • Free
                  </span>
                </div>
                
                <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
                  <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">
                    AI Photo Enhancement
                  </span>
                  <br />
                  <span className="text-foreground">Better Than Remini</span>
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
              <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
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
          <section className="py-16 md:py-20 px-4">
            <div className="container mx-auto max-w-6xl">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">All AI Image Tools</h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  Professional-grade AI tools for every photo editing need. Each tool includes before/after comparison.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
            </div>
          </section>

          {/* Features Section */}
          <section className="py-16 md:py-20 px-4 bg-gradient-to-b from-secondary/30 to-background">
            <div className="container mx-auto max-w-6xl">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose Our AI Tools?</h2>
                <p className="text-muted-foreground">Better quality than Remini, completely free</p>
              </div>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
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
          <section className="py-16 md:py-20 px-4">
            <div className="container mx-auto max-w-4xl">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">How It Works</h2>
                <p className="text-muted-foreground">Enhance your photos in 3 simple steps</p>
              </div>
              
              <div className="grid md:grid-cols-3 gap-8">
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

          {/* FAQ */}
          <section className="py-16 md:py-20 px-4 bg-secondary/30">
            <div className="container mx-auto max-w-4xl">
              <h2 className="text-3xl md:text-4xl font-bold text-center mb-10">Frequently Asked Questions</h2>
              
              <Accordion type="single" collapsible className="space-y-4">
                <AccordionItem value="1" className="bg-card border border-border rounded-xl px-6">
                  <AccordionTrigger>Is this really free? Better than Remini?</AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    Yes! All our AI image tools are completely free with no signup required. Our AI uses the latest models to deliver 4K quality results that often exceed what Remini provides.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="2" className="bg-card border border-border rounded-xl px-6">
                  <AccordionTrigger>What's the output quality?</AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    Our AI enhances images to 4K Ultra HD quality with professional-grade results. You can see the before/after comparison using our slider tool.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="3" className="bg-card border border-border rounded-xl px-6">
                  <AccordionTrigger>Are my photos private and secure?</AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    Absolutely. Your photos are processed securely and never stored on our servers. We prioritize your privacy.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="4" className="bg-card border border-border rounded-xl px-6">
                  <AccordionTrigger>How does the comparison slider work?</AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    After your image is enhanced, click the "Compare" button to see a side-by-side before/after slider. Drag the handle to compare the original and enhanced versions.
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
