import { Helmet } from "react-helmet-async";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PromptToImage from "@/components/PromptToImage";
import HreflangTags from "@/components/HreflangTags";
import { AdBottom, AdVideo, AdInline, AdExoticFat } from "@/components/ads/AdContainer";
import { Link } from "react-router-dom";
import { 
  Wand2, 
  Sparkles, 
  Zap, 
  Shield, 
  Download, 
  Image,
  RectangleHorizontal,
  RectangleVertical,
  Square,
  Palette,
  Camera,
  Brush
} from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const tools = [
  {
    name: "Landscape Generator",
    slug: "ai-landscape",
    description: "Create stunning wide-format images for banners and headers",
    icon: RectangleHorizontal,
    gradient: { from: "#3B82F6", to: "#06B6D4" }
  },
  {
    name: "Portrait Generator",
    slug: "ai-portrait",
    description: "Generate vertical images for social stories and mobile",
    icon: RectangleVertical,
    gradient: { from: "#EC4899", to: "#F97316" }
  },
  {
    name: "Square Image Generator",
    slug: "ai-square",
    description: "Create perfect square images for social media posts",
    icon: Square,
    gradient: { from: "#8B5CF6", to: "#A855F7" }
  },
  {
    name: "Art Style Generator",
    slug: "ai-art",
    description: "Generate images in various artistic styles",
    icon: Palette,
    gradient: { from: "#F59E0B", to: "#EF4444" }
  },
  {
    name: "Photo Realistic",
    slug: "ai-photo",
    description: "Create photorealistic images from descriptions",
    icon: Camera,
    gradient: { from: "#10B981", to: "#059669" }
  },
  {
    name: "Digital Art",
    slug: "ai-digital-art",
    description: "Generate digital illustrations and artwork",
    icon: Brush,
    gradient: { from: "#6366F1", to: "#8B5CF6" }
  }
];

const AIImageGenerationPage = () => {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "How does AI image generation work?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Our AI image generator uses advanced machine learning models to create images from text descriptions. Simply describe what you want to see, and the AI will generate a unique image matching your description."
        }
      },
      {
        "@type": "Question",
        "name": "What image orientations are supported?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "We support three orientations: Landscape (16:9) for banners and headers, Portrait (9:16) for social stories and mobile content, and Square (1:1) for social media posts."
        }
      },
      {
        "@type": "Question",
        "name": "Can I download the generated images?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, you can download generated images in PNG, JPG, or WebP formats. The images are yours to use as you wish."
        }
      },
      {
        "@type": "Question",
        "name": "Is the AI image generator free?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, our AI image generator is free to use. Generate as many images as you need with no watermarks."
        }
      }
    ]
  };

  return (
    <>
      <Helmet>
        <title>AI Image Generator - Create Images from Text | Free Online Tool</title>
        <meta name="description" content="Generate stunning images from text descriptions using AI. Create landscape, portrait, or square images instantly. Free, no signup required." />
        <meta name="keywords" content="AI image generator, text to image, AI art generator, image creation, landscape generator, portrait generator, AI artwork" />
        <link rel="canonical" href="https://multitoolsa.com/ai-image-generation" />
        
        <meta property="og:title" content="AI Image Generator - Create Images from Text" />
        <meta property="og:description" content="Generate stunning images from text descriptions using AI. Landscape, portrait, or square formats." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://multitoolsa.com/ai-image-generation" />
        
        <script type="application/ld+json">
          {JSON.stringify(faqSchema)}
        </script>
      </Helmet>
      <HreflangTags path="/ai-image-generation" />

      <div className="min-h-screen bg-background flex flex-col">
        <Header />
        
        <main className="flex-1">
          {/* Hero Section */}
          <section className="py-12 md:py-20 bg-gradient-hero relative overflow-hidden">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-500/10 rounded-full blur-3xl" />
            <div className="absolute top-1/4 right-1/4 w-[300px] h-[300px] bg-primary/10 rounded-full blur-3xl" />
            
            <div className="container mx-auto px-4 relative z-10">
              <div className="text-center max-w-4xl mx-auto mb-10">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/30 mb-6">
                  <Wand2 className="w-4 h-4 text-purple-500" />
                  <span className="text-sm font-medium text-purple-500">AI Powered</span>
                </div>
                
                <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                  AI Image Generator
                </h1>
                
                <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
                  Create stunning images from text descriptions. Choose landscape, portrait, or square format 
                  and let AI bring your vision to life.
                </p>
              </div>

              {/* Main Tool */}
              <PromptToImage />
              
              {/* Ads - After Tool */}
              <div className="max-w-4xl mx-auto mt-8">
                <AdInline />
                <AdBottom className="mt-4" />
                <AdVideo className="mt-4" />
              </div>
            </div>
          </section>

          {/* Tool Cards Grid */}
          <section className="py-12 md:py-16 px-4">
            <div className="container mx-auto max-w-6xl">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-4">
                AI Generation Tools
              </h2>
              <p className="text-center text-muted-foreground mb-10 max-w-2xl mx-auto">
                Explore different AI image generation options for every need
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {tools.map((tool) => {
                  const Icon = tool.icon;
                  return (
                    <div
                      key={tool.slug}
                      className="group bg-card hover:bg-secondary/50 border border-border hover:border-primary/50 rounded-xl p-6 transition-all duration-300 hover-lift cursor-pointer"
                      onClick={() => {
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                    >
                      <div className="flex items-start gap-4">
                        <div 
                          className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                          style={{ background: `linear-gradient(135deg, ${tool.gradient.from}, ${tool.gradient.to})` }}
                        >
                          <Icon className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <h3 className="font-semibold mb-1 group-hover:text-primary transition-colors">
                            {tool.name}
                          </h3>
                          <p className="text-sm text-muted-foreground">
                            {tool.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>

          {/* Features */}
          <section className="py-12 md:py-16 px-4 bg-gradient-dark">
            <div className="container mx-auto max-w-5xl">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-12">
                Why Use Our AI Image Generator?
              </h2>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  { icon: Sparkles, title: "AI Powered", desc: "Advanced AI models for quality" },
                  { icon: Zap, title: "Instant Results", desc: "Generate in seconds" },
                  { icon: Shield, title: "100% Private", desc: "No images stored on servers" },
                  { icon: Download, title: "Multiple Formats", desc: "PNG, JPG, or WebP output" }
                ].map((item, i) => (
                  <div key={i} className="bg-card rounded-xl p-6 border border-border text-center hover:border-primary/50 transition-colors">
                    <div className="w-12 h-12 rounded-xl bg-purple-500/10 flex items-center justify-center mx-auto mb-4">
                      <item.icon className="w-6 h-6 text-purple-500" />
                    </div>
                    <h3 className="font-semibold mb-2">{item.title}</h3>
                    <p className="text-sm text-muted-foreground">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Orientation Guide */}
          <section className="py-12 md:py-16 px-4">
            <div className="container mx-auto max-w-5xl">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-4">
                Choose the Right Orientation
              </h2>
              <p className="text-center text-muted-foreground mb-10 max-w-2xl mx-auto">
                Different orientations work best for different purposes
              </p>
              
              <div className="grid md:grid-cols-3 gap-8">
                <div className="bg-card rounded-xl p-6 border border-border text-center">
                  <div className="w-full aspect-video bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-lg mb-4 flex items-center justify-center">
                    <RectangleHorizontal className="w-16 h-16 text-blue-500" />
                  </div>
                  <h3 className="font-semibold text-lg mb-2">Landscape (16:9)</h3>
                  <p className="text-sm text-muted-foreground">
                    Perfect for website banners, YouTube thumbnails, desktop wallpapers, and presentation backgrounds.
                  </p>
                </div>
                
                <div className="bg-card rounded-xl p-6 border border-border text-center">
                  <div className="w-2/3 mx-auto aspect-[9/16] bg-gradient-to-r from-pink-500/20 to-orange-500/20 rounded-lg mb-4 flex items-center justify-center">
                    <RectangleVertical className="w-12 h-12 text-pink-500" />
                  </div>
                  <h3 className="font-semibold text-lg mb-2">Portrait (9:16)</h3>
                  <p className="text-sm text-muted-foreground">
                    Ideal for Instagram Stories, TikTok, Pinterest pins, and mobile phone wallpapers.
                  </p>
                </div>
                
                <div className="bg-card rounded-xl p-6 border border-border text-center">
                  <div className="w-3/4 mx-auto aspect-square bg-gradient-to-r from-purple-500/20 to-violet-500/20 rounded-lg mb-4 flex items-center justify-center">
                    <Square className="w-12 h-12 text-purple-500" />
                  </div>
                  <h3 className="font-semibold text-lg mb-2">Square (1:1)</h3>
                  <p className="text-sm text-muted-foreground">
                    Great for Instagram posts, Facebook posts, profile pictures, and product images.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* FAQ Section */}
          <section className="py-12 md:py-16 px-4 bg-gradient-dark">
            <div className="container mx-auto max-w-4xl">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-10">
                Frequently Asked Questions
              </h2>
              
              <Accordion type="single" collapsible className="w-full space-y-4">
                <AccordionItem value="item-1" className="bg-card border border-border rounded-xl px-6">
                  <AccordionTrigger className="text-left font-semibold">
                    How does AI image generation work?
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    Our AI image generator uses advanced machine learning models trained on millions of images. When you enter a text description, the AI interprets your words and generates a unique image that matches your description. The more detailed your prompt, the better the results.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-2" className="bg-card border border-border rounded-xl px-6">
                  <AccordionTrigger className="text-left font-semibold">
                    What image orientations are supported?
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    We support three orientations: Landscape (16:9) perfect for banners, headers, and desktop wallpapers; Portrait (9:16) ideal for social media stories and mobile content; and Square (1:1) great for social media posts and profile pictures.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-3" className="bg-card border border-border rounded-xl px-6">
                  <AccordionTrigger className="text-left font-semibold">
                    Can I use generated images commercially?
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    Yes, images you generate are yours to use. However, please be mindful of creating content that mimics specific artists, brands, or real people. Always ensure your usage complies with applicable laws and guidelines.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-4" className="bg-card border border-border rounded-xl px-6">
                  <AccordionTrigger className="text-left font-semibold">
                    How can I get better results?
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    For best results: Be specific and descriptive in your prompts. Include details about style, lighting, colors, and mood. Use the "Try example" button for inspiration. Mention the desired composition and any specific elements you want to see.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-5" className="bg-card border border-border rounded-xl px-6">
                  <AccordionTrigger className="text-left font-semibold">
                    Is my data private?
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    Yes, we take privacy seriously. Your prompts are processed securely, and generated images are not stored on our servers after you download them. Your creative work remains your own.
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

export default AIImageGenerationPage;
