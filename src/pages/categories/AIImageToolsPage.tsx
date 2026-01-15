import { Helmet } from "react-helmet-async";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HreflangTags from "@/components/HreflangTags";
import { Link } from "react-router-dom";
import { Sparkles, Wand2, ArrowUpCircle, Eraser, History, Zap, Shield, Download, Users, Palette, Trash2 } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const aiTools = [
  {
    name: "AI Photo Enhancer",
    slug: "ai-photo-enhancer",
    description: "Enhance image quality, sharpness, clarity, and details automatically using AI. Like Remini but free.",
    icon: Sparkles,
    gradient: { from: "#10B981", to: "#059669" }
  },
  {
    name: "AI Image Generator",
    slug: "ai-image-generation",
    description: "Generate stunning images from text descriptions using advanced AI models.",
    icon: Wand2,
    gradient: { from: "#A855F7", to: "#EC4899" }
  },
  {
    name: "AI Image Upscaler",
    slug: "ai-image-upscaler",
    description: "Increase image resolution up to 4x using AI super-resolution technology.",
    icon: ArrowUpCircle,
    gradient: { from: "#3B82F6", to: "#6366F1" }
  },
  {
    name: "AI Background Remover",
    slug: "ai-background-remover",
    description: "Remove backgrounds from images automatically. Runs locally in your browser.",
    icon: Eraser,
    gradient: { from: "#EC4899", to: "#F43F5E" }
  },
  {
    name: "AI Image Restorer",
    slug: "ai-image-restorer",
    description: "Restore old, damaged, or low-quality photos. Fix scratches, fading, and noise.",
    icon: History,
    gradient: { from: "#F59E0B", to: "#EA580C" }
  },
  {
    name: "AI Face Swap",
    slug: "ai-face-swap",
    description: "Swap faces between two photos instantly with realistic results using AI.",
    icon: Users,
    gradient: { from: "#EC4899", to: "#F97316" }
  },
  {
    name: "AI Colorize Photos",
    slug: "ai-colorize",
    description: "Transform black & white photos into vibrant color images using AI colorization.",
    icon: Palette,
    gradient: { from: "#F59E0B", to: "#EAB308" }
  },
  {
    name: "AI Object Removal",
    slug: "ai-object-removal",
    description: "Remove unwanted objects, people, or watermarks from photos with AI inpainting.",
    icon: Trash2,
    gradient: { from: "#EF4444", to: "#DC2626" }
  }
];

const AIImageToolsPage = () => {
  return (
    <>
      <Helmet>
        <title>AI Image Tools - Free Online AI Photo Editor | MultiToolsA</title>
        <meta name="description" content="Free AI-powered image tools: Photo Enhancer, Image Generator, Upscaler, Background Remover, and Image Restorer. No signup required." />
        <meta name="keywords" content="AI image tools, AI photo enhancer, remini alternative, AI upscaler, background remover, image restorer, free AI tools" />
        <link rel="canonical" href="https://multitoolsa.com/ai-image-tools" />
      </Helmet>
      <HreflangTags path="/ai-image-tools" />

      <div className="min-h-screen bg-background flex flex-col">
        <Header />
        
        <main className="flex-1">
          {/* Hero */}
          <section className="py-12 md:py-20 bg-gradient-hero relative overflow-hidden">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-500/10 rounded-full blur-3xl" />
            
            <div className="container mx-auto px-4 relative z-10 text-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/30 mb-6">
                <Wand2 className="w-4 h-4 text-purple-500" />
                <span className="text-sm font-medium text-purple-500">AI Powered</span>
              </div>
              
              <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-6">
                AI Image Tools
              </h1>
              
              <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
                Powerful AI-powered tools to enhance, generate, upscale, and edit your images. 
                Free to use, no signup required.
              </p>
            </div>
          </section>

          {/* Tools Grid */}
          <section className="py-12 md:py-16 px-4">
            <div className="container mx-auto max-w-6xl">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {aiTools.map((tool) => {
                  const Icon = tool.icon;
                  return (
                    <Link
                      key={tool.slug}
                      to={`/${tool.slug}`}
                      className="group bg-card hover:bg-secondary/50 border border-border hover:border-primary/50 rounded-xl p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                    >
                      <div className="flex items-start gap-4">
                        <div 
                          className="w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0"
                          style={{ background: `linear-gradient(135deg, ${tool.gradient.from}, ${tool.gradient.to})` }}
                        >
                          <Icon className="w-7 h-7 text-white" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-lg mb-2 group-hover:text-primary transition-colors">
                            {tool.name}
                          </h3>
                          <p className="text-sm text-muted-foreground">
                            {tool.description}
                          </p>
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          </section>

          {/* Features */}
          <section className="py-12 md:py-16 px-4 bg-gradient-dark">
            <div className="container mx-auto max-w-5xl">
              <h2 className="text-2xl md:text-4xl font-bold text-center mb-12">Why Use Our AI Tools?</h2>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  { icon: Zap, title: "Instant Results", desc: "Get results in seconds" },
                  { icon: Shield, title: "100% Private", desc: "Your images stay private" },
                  { icon: Download, title: "Free Downloads", desc: "No watermarks or limits" },
                  { icon: Wand2, title: "AI Powered", desc: "Advanced AI technology" }
                ].map((item, i) => (
                  <div key={i} className="bg-card rounded-xl p-6 border border-border text-center">
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

          {/* FAQ */}
          <section className="py-12 md:py-16 px-4">
            <div className="container mx-auto max-w-4xl">
              <h2 className="text-2xl md:text-4xl font-bold text-center mb-10">FAQ</h2>
              
              <Accordion type="single" collapsible className="space-y-4">
                <AccordionItem value="1" className="bg-card border border-border rounded-xl px-6">
                  <AccordionTrigger>Are these AI tools really free?</AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    Yes, all our AI image tools are completely free to use with no signup required.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="2" className="bg-card border border-border rounded-xl px-6">
                  <AccordionTrigger>Is my data safe?</AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    Yes, we prioritize your privacy. Some tools run entirely in your browser, and we don't store your images.
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
