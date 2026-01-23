import { Helmet } from "react-helmet-async";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HreflangTags from "@/components/HreflangTags";
import AIColorize from "@/components/ai-tools/AIColorize";
import { Link } from "react-router-dom";
import { ArrowLeft, Sparkles, Zap, Shield, Download, Image, Star, CheckCircle, Palette, History, Camera, Book } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const AIColorizePage = () => {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "How does AI photo colorization work?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Our AI analyzes grayscale values and image content to predict realistic colors. It understands context - recognizing skin tones, sky, grass, fabric patterns - and applies appropriate colors based on training on millions of color/grayscale image pairs."
        }
      },
      {
        "@type": "Question",
        "name": "Are the colors historically accurate?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "The AI produces realistic, natural-looking colors but cannot guarantee historical accuracy for specific items like clothing or car colors. It predicts the most likely colors based on context and patterns, which may differ from the original."
        }
      },
      {
        "@type": "Question",
        "name": "What photos work best for colorization?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Clear, well-exposed black and white photos with good contrast produce the best results. Photos with distinct elements (faces, landscapes, objects) colorize better than abstract or heavily damaged images."
        }
      }
    ]
  };

  return (
    <>
      <Helmet>
        <title>AI Colorize Photos - Add Color to Black & White Images Free | MultiToolsA</title>
        <meta name="description" content="Transform black and white photos into vibrant color images using AI. Free online photo colorization tool. Restore old family photos with realistic, natural colors." />
        <meta name="keywords" content="colorize photos, AI colorize, black and white to color, photo colorization, restore old photos, add color to photos, B&W to color" />
        <link rel="canonical" href="https://multitoolsa.com/ai-colorize" />
        
        <meta property="og:title" content="AI Colorize Photos - Add Color to Black & White Images" />
        <meta property="og:description" content="Transform B&W photos into vibrant color images using AI. Free, realistic colors, no watermarks." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://multitoolsa.com/ai-colorize" />
        
        <script type="application/ld+json">
          {JSON.stringify(faqSchema)}
        </script>
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            "name": "AI Photo Colorization",
            "description": "Free AI-powered photo colorization tool that adds realistic colors to black and white images",
            "url": "https://multitoolsa.com/ai-colorize",
            "applicationCategory": "ImageEditingApplication",
            "operatingSystem": "Any",
            "offers": {
              "@type": "Offer",
              "price": "0",
              "priceCurrency": "USD"
            }
          })}
        </script>
      </Helmet>
      <HreflangTags path="/ai-colorize" />

      <div className="min-h-screen bg-background flex flex-col">
        <Header />
        
        <main className="flex-1">
          {/* Hero Section */}
          <section className="py-10 md:py-16 bg-gradient-hero relative overflow-hidden">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-orange-500/10 rounded-full blur-3xl" />
            
            <div className="container mx-auto px-4 relative z-10">
              <div className="mb-6">
                <Link 
                  to="/ai-image-tools" 
                  className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Back to AI Image Tools
                </Link>
              </div>
              
              <div className="max-w-3xl mx-auto text-center">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-500/10 border border-orange-500/30 mb-6">
                  <Palette className="w-4 h-4 text-orange-500" />
                  <span className="text-sm font-medium text-orange-500">AI Colorization</span>
                </div>
                
                <h1 className="text-3xl md:text-5xl font-bold mb-4">
                  AI Photo Colorization
                </h1>
                
                <p className="text-lg text-muted-foreground mb-8">
                  Breathe new life into old black & white photographs. Our AI analyzes your image and 
                  adds realistic, vibrant colors automatically - bringing memories from the past into vivid color.
                </p>
              </div>
            </div>
          </section>

          {/* Tool Section */}
          <section className="py-8 md:py-12 px-4">
            <div className="container mx-auto">
              <AIColorize />
            </div>
          </section>

          {/* About Section */}
          <section className="py-12 md:py-16 px-4 bg-secondary/30">
            <div className="container mx-auto max-w-4xl">
              <h2 className="text-2xl md:text-4xl font-bold text-center mb-8">About AI Photo Colorization</h2>
              
              <div className="prose prose-lg dark:prose-invert max-w-none space-y-6">
                <p>
                  Photo colorization is the art of adding color to monochrome (black and white or sepia) photographs. Historically, this was done by hand-painting each photo - a painstaking process requiring skilled artists and hours of work per image. Today, artificial intelligence can accomplish the same task in seconds, making colorization accessible to everyone.
                </p>
                
                <p>
                  Our AI colorization technology uses deep learning neural networks trained on millions of pairs of color and grayscale images. Through this training, the AI learns to recognize what colors different objects, textures, and scenes should have. It understands that skin has certain tones, grass is green, skies are blue, and can even distinguish between different fabric colors and materials based on their textures and patterns.
                </p>
                
                <p>
                  When you upload a black and white photo, the AI analyzes each pixel's grayscale value and context. It considers what the object is, what surrounds it, the lighting conditions, and other contextual clues. Based on this analysis, it predicts the most likely colors for each area and applies them while maintaining natural-looking gradations and transitions.
                </p>
                
                <h3 className="text-xl font-semibold mt-8">Bringing History to Life</h3>
                
                <p>
                  Before color photography became widespread in the 1960s-70s, virtually all photographs were black and white. This means that our visual record of everything before this era—our grandparents, great-grandparents, historical events, famous figures, and everyday life—exists only in monochrome. Colorization bridges this gap, allowing us to see the past as it actually appeared.
                </p>
                
                <p>
                  Seeing historical photos in color creates an immediate emotional connection that black and white images often lack. Suddenly, people from decades or centuries ago don't seem so distant—they look like people we might meet today. Family photos of ancestors become more relatable and real. Historical events feel more immediate and impactful. This emotional power is why colorization has become such a beloved tool for preserving and experiencing history.
                </p>
              </div>
            </div>
          </section>

          {/* Features Grid */}
          <section className="py-12 md:py-16 px-4">
            <div className="container mx-auto max-w-5xl">
              <h2 className="text-2xl md:text-4xl font-bold text-center mb-10">Key Features</h2>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  { icon: Palette, title: "Realistic Colors", desc: "AI predicts natural, accurate colors based on image context and content", color: "text-orange-500", bg: "bg-orange-500/10" },
                  { icon: Sparkles, title: "Smart Detection", desc: "Recognizes faces, skin tones, objects, and environments automatically", color: "text-pink-500", bg: "bg-pink-500/10" },
                  { icon: Zap, title: "Instant Results", desc: "Transform photos in seconds, not hours or days", color: "text-green-500", bg: "bg-green-500/10" },
                  { icon: Download, title: "HD Quality", desc: "Download full-resolution colorized images without watermarks", color: "text-blue-500", bg: "bg-blue-500/10" }
                ].map((item, i) => (
                  <div key={i} className="bg-card rounded-xl p-6 border border-border text-center">
                    <div className={`w-12 h-12 rounded-xl ${item.bg} flex items-center justify-center mx-auto mb-4`}>
                      <item.icon className={`w-6 h-6 ${item.color}`} />
                    </div>
                    <h3 className="font-semibold mb-2">{item.title}</h3>
                    <p className="text-sm text-muted-foreground">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* How It Works */}
          <section className="py-12 md:py-16 px-4 bg-gradient-dark">
            <div className="container mx-auto max-w-4xl">
              <h2 className="text-2xl md:text-4xl font-bold text-center mb-10">How AI Colorization Works</h2>
              
              <div className="grid md:grid-cols-4 gap-8">
                {[
                  { step: "1", title: "Upload", desc: "Upload your black & white or sepia photo" },
                  { step: "2", title: "Analysis", desc: "AI identifies objects, faces, and scene elements" },
                  { step: "3", title: "Colorization", desc: "Realistic colors are predicted and applied" },
                  { step: "4", title: "Download", desc: "Get your vibrant colorized photo" }
                ].map((item, i) => (
                  <div key={i} className="text-center">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-r from-orange-500 to-red-500 text-white font-bold text-xl flex items-center justify-center mx-auto mb-4">
                      {item.step}
                    </div>
                    <h3 className="font-semibold text-lg mb-2">{item.title}</h3>
                    <p className="text-sm text-muted-foreground">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Use Cases */}
          <section className="py-12 md:py-16 px-4">
            <div className="container mx-auto max-w-5xl">
              <h2 className="text-2xl md:text-4xl font-bold text-center mb-10">Who Uses Photo Colorization</h2>
              
              <div className="grid md:grid-cols-3 gap-6">
                {[
                  { icon: History, title: "Family Historians", desc: "Colorize old family photos to bring ancestors to life and create more engaging family history displays and albums." },
                  { icon: Book, title: "Educators & Students", desc: "Make historical photos more engaging for education. Help students connect with historical events and figures through color." },
                  { icon: Camera, title: "Photo Restorers", desc: "Add colorization as a service offering or combine with restoration work for complete vintage photo transformations." },
                  { icon: Star, title: "Gift Creators", desc: "Create meaningful gifts by colorizing old photos of loved ones for birthdays, anniversaries, or memorials." },
                  { icon: Image, title: "Content Creators", desc: "Use colorized historical photos for documentaries, articles, presentations, and social media content." },
                  { icon: Sparkles, title: "Memory Preservers", desc: "Anyone wanting to see their family history and treasured old photos in a new, more vivid light." }
                ].map((item, i) => (
                  <div key={i} className="bg-card rounded-xl p-6 border border-border">
                    <div className="w-12 h-12 rounded-xl bg-orange-500/10 flex items-center justify-center mb-4">
                      <item.icon className="w-6 h-6 text-orange-500" />
                    </div>
                    <h3 className="font-semibold text-lg mb-2">{item.title}</h3>
                    <p className="text-sm text-muted-foreground">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Tips for Best Results */}
          <section className="py-12 md:py-16 px-4 bg-secondary/30">
            <div className="container mx-auto max-w-4xl">
              <h2 className="text-2xl md:text-4xl font-bold text-center mb-8">Tips for Best Results</h2>
              
              <div className="grid md:grid-cols-2 gap-6">
                {[
                  { title: "Use High-Quality Scans", desc: "Higher resolution source images provide more detail for the AI to work with, producing better colorization" },
                  { title: "Clear, Well-Exposed Photos", desc: "Photos with good contrast and clear details colorize better than very dark or faded images" },
                  { title: "Restore Before Colorizing", desc: "If your photo is damaged, use our AI Image Restorer first, then colorize the restored version" },
                  { title: "Enhance After Colorizing", desc: "Use our AI Photo Enhancer after colorization to boost vibrancy and overall quality" },
                  { title: "Manage Expectations", desc: "Remember AI predicts most likely colors - actual historical colors may have been different" },
                  { title: "Try Multiple Times", desc: "For important photos, try colorizing multiple times - slight variations can occur" }
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold">{item.title}</h4>
                      <p className="text-sm text-muted-foreground">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Privacy & Security */}
          <section className="py-12 md:py-16 px-4">
            <div className="container mx-auto max-w-4xl">
              <div className="bg-card rounded-2xl p-8 border border-border">
                <div className="flex items-center gap-3 mb-6">
                  <Shield className="w-8 h-8 text-green-500" />
                  <h2 className="text-2xl font-bold">Privacy & Security</h2>
                </div>
                
                <div className="prose prose-lg dark:prose-invert max-w-none">
                  <p>
                    We understand that the photos you colorize are often deeply personal - precious family memories and historical treasures. Your privacy is fully protected. Photos are processed securely, never stored on our servers, and immediately deleted after colorization.
                  </p>
                  
                  <ul className="mt-4">
                    <li>Photos deleted immediately after processing</li>
                    <li>Encrypted connections for secure upload and download</li>
                    <li>No account or personal information required</li>
                    <li>Images never used for AI training or shared with third parties</li>
                    <li>No human review of uploaded photos</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* FAQ */}
          <section className="py-12 md:py-16 px-4 bg-gradient-dark">
            <div className="container mx-auto max-w-4xl">
              <h2 className="text-2xl md:text-4xl font-bold text-center mb-10">Frequently Asked Questions</h2>
              
              <Accordion type="single" collapsible className="space-y-4">
                <AccordionItem value="1" className="bg-card border border-border rounded-xl px-6">
                  <AccordionTrigger>How does AI photo colorization work?</AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    Our AI analyzes grayscale values and image content to predict realistic colors. It understands context - recognizing skin tones, sky, grass, fabric patterns - and applies appropriate colors based on training on millions of color/grayscale image pairs. It's like having a skilled artist who instantly knows what colors should be where.
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="2" className="bg-card border border-border rounded-xl px-6">
                  <AccordionTrigger>Are the colors historically accurate?</AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    The AI produces realistic, natural-looking colors but cannot guarantee historical accuracy for specific items. It predicts the most likely colors based on context - a blue sky will be blue, grass will be green - but specific items like clothing or car colors may differ from the original. Think of it as a realistic interpretation rather than exact recreation.
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="3" className="bg-card border border-border rounded-xl px-6">
                  <AccordionTrigger>What photos work best for colorization?</AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    Clear, well-exposed black and white photos with good contrast produce the best results. Photos with distinct, recognizable elements (faces, landscapes, objects) colorize better than abstract or heavily damaged images. High-resolution scans work better than low-quality photos.
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="4" className="bg-card border border-border rounded-xl px-6">
                  <AccordionTrigger>Can I colorize already colored photos?</AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    Our tool is designed for black & white or sepia photos. If you upload a colored photo, the AI may attempt to re-colorize it, but results won't be optimal. For enhancing colors in existing color photos, use our AI Photo Enhancer instead.
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="5" className="bg-card border border-border rounded-xl px-6">
                  <AccordionTrigger>Why are some areas colorized differently than I expected?</AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    The AI predicts colors based on patterns it learned from millions of images. Sometimes ambiguous areas (unusual clothing, unfamiliar objects) may get unexpected colors because the AI is making its best guess based on similar patterns it has seen. Context clues help, but some ambiguity is inherent.
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="6" className="bg-card border border-border rounded-xl px-6">
                  <AccordionTrigger>Should I restore photos before colorizing?</AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    Yes, for damaged photos we recommend using our AI Image Restorer first. Colorization works best on clear, undamaged images. Restore scratches, fading, and damage first, then colorize the restored version for optimal results.
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="7" className="bg-card border border-border rounded-xl px-6">
                  <AccordionTrigger>Is this tool really free?</AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    Yes! AI Colorize is completely free with no signup, no watermarks, and no limits on usage. Colorize as many photos as you need without any cost. We believe everyone should have access to tools that bring their memories to life.
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="8" className="bg-card border border-border rounded-xl px-6">
                  <AccordionTrigger>How long does colorization take?</AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    Most photos are colorized in 10-30 seconds. Processing time depends on image size and complexity. Larger, more detailed images may take slightly longer as the AI analyzes more content.
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="9" className="bg-card border border-border rounded-xl px-6">
                  <AccordionTrigger>What image formats are supported?</AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    We support all major formats including JPG, JPEG, PNG, WebP, BMP, and TIFF. You can download your colorized photo in JPG, PNG, or WebP format. We recommend PNG for archival purposes.
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="10" className="bg-card border border-border rounded-xl px-6">
                  <AccordionTrigger>Can I use colorized photos commercially?</AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    Photos you colorize are yours to use, including for commercial purposes. However, ensure you have rights to the original photo and consider any copyright or likeness issues for commercial use, especially with photos of identifiable people.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </section>

          {/* Related Tools */}
          <section className="py-12 md:py-16 px-4">
            <div className="container mx-auto max-w-4xl">
              <h2 className="text-2xl font-bold text-center mb-8">Related AI Tools</h2>
              
              <div className="grid md:grid-cols-3 gap-4">
                <Link to="/ai-image-restorer" className="bg-card rounded-xl p-6 border border-border hover:border-primary transition-colors">
                  <h3 className="font-semibold mb-2">AI Image Restorer</h3>
                  <p className="text-sm text-muted-foreground">Repair damaged photos first</p>
                </Link>
                <Link to="/ai-photo-enhancer" className="bg-card rounded-xl p-6 border border-border hover:border-primary transition-colors">
                  <h3 className="font-semibold mb-2">AI Photo Enhancer</h3>
                  <p className="text-sm text-muted-foreground">Enhance colors and quality</p>
                </Link>
                <Link to="/ai-image-upscaler" className="bg-card rounded-xl p-6 border border-border hover:border-primary transition-colors">
                  <h3 className="font-semibold mb-2">AI Image Upscaler</h3>
                  <p className="text-sm text-muted-foreground">Increase resolution for printing</p>
                </Link>
              </div>
            </div>
          </section>
        </main>
        
        <Footer />
      </div>
    </>
  );
};

export default AIColorizePage;
