import { Helmet } from "react-helmet-async";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AIFaceBeautify from "@/components/ai-tools/AIFaceBeautify";
import ImageComparisonSlider from "@/components/ImageComparisonSlider";
import { AdBottom, AdVideo } from "@/components/ads/AdContainer";
import HreflangTags from "@/components/HreflangTags";
import { Smile, Sparkles, Shield, Zap, Download, Eye, Sun, Heart } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

// Import demo images
import beautifyBefore from "@/assets/demo/beautify-before.jpg";
import beautifyAfter from "@/assets/demo/beautify-after.jpg";

const AIFaceBeautifyPage = () => {
  return (
    <>
      <Helmet>
        <title>AI Face Beautify - Free Online Face Enhancement Tool | MultiToolsA</title>
        <meta name="description" content="Free AI Face Beautify tool. Enhance facial features with skin smoothing, eye enhancement, teeth whitening, and more. Professional results. No signup required." />
        <meta name="keywords" content="AI face beautify, face enhancement, skin smoothing, teeth whitening, eye enhancement, free face editor, portrait enhancement" />
        <link rel="canonical" href="https://multitoolsa.com/ai-face-beautify" />
        
        <meta property="og:title" content="AI Face Beautify - Free Face Enhancement Tool" />
        <meta property="og:description" content="Enhance your facial features with AI-powered beautification. Skin smoothing, eye enhancement, teeth whitening and more." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://multitoolsa.com/ai-face-beautify" />
        
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            "name": "AI Face Beautify",
            "description": "Free AI-powered face beautification tool with skin smoothing, eye enhancement, and teeth whitening",
            "url": "https://multitoolsa.com/ai-face-beautify",
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
      <HreflangTags path="/ai-face-beautify" />

      <div className="min-h-screen bg-background flex flex-col">
        <Header />
        
        <main className="flex-1">
          {/* Hero */}
          <section className="py-10 md:py-16 bg-gradient-hero relative overflow-hidden">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-pink-500/10 rounded-full blur-3xl" />
            
            <div className="container mx-auto px-4 relative z-10">
              <div className="max-w-3xl mx-auto text-center">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-pink-500/10 border border-pink-500/30 mb-6">
                  <Sparkles className="w-4 h-4 text-pink-500" />
                  <span className="text-sm font-medium text-pink-500">AI Powered</span>
                </div>
                
                <h1 className="text-3xl md:text-5xl font-bold mb-4">
                  AI Face Beautify
                </h1>
                
                <p className="text-lg text-muted-foreground mb-8">
                  Enhance your facial features with AI-powered beautification. 
                  Smooth skin, brighten eyes, whiten teeth, and more - professional results, completely free.
                </p>
              </div>
            </div>
          </section>

          {/* Tool */}
          <section className="py-8 md:py-12 px-4">
            <div className="container mx-auto max-w-4xl">
              <AIFaceBeautify />
              
              {/* Ads below tool */}
              <AdBottom className="mt-6" />
              <AdVideo className="mt-4" />
            </div>
          </section>

          {/* Demo Comparison Section */}
          <section className="py-10 md:py-14 px-4 bg-secondary/30">
            <div className="container mx-auto max-w-lg">
              <div className="text-center mb-6">
                <h2 className="text-xl md:text-2xl font-bold mb-2">See the Transformation</h2>
                <p className="text-sm text-muted-foreground">Drag the slider to compare</p>
              </div>
              
              <div className="bg-card rounded-xl border border-border overflow-hidden shadow-md">
                <ImageComparisonSlider
                  originalSrc={beautifyBefore}
                  compressedSrc={beautifyAfter}
                  originalLabel="Natural"
                  compressedLabel="Beautified"
                  className="w-full"
                />
              </div>
            </div>
          </section>

          {/* Features */}
          <section className="py-12 md:py-16 px-4 bg-gradient-dark">
            <div className="container mx-auto max-w-5xl">
              <h2 className="text-2xl md:text-4xl font-bold text-center mb-10">Beautification Features</h2>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  { icon: Heart, title: "Skin Smoothing", desc: "Remove blemishes and smooth skin naturally", color: "text-pink-500", bg: "bg-pink-500/10" },
                  { icon: Eye, title: "Eye Enhancement", desc: "Brighten and enhance eye appearance", color: "text-blue-500", bg: "bg-blue-500/10" },
                  { icon: Sparkles, title: "Teeth Whitening", desc: "Natural teeth whitening effect", color: "text-yellow-500", bg: "bg-yellow-500/10" },
                  { icon: Sun, title: "Face Lighting", desc: "Improve facial lighting and glow", color: "text-orange-500", bg: "bg-orange-500/10" }
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

          {/* Why Choose */}
          <section className="py-12 md:py-16 px-4">
            <div className="container mx-auto max-w-5xl">
              <h2 className="text-2xl md:text-4xl font-bold text-center mb-10">Why Choose Our AI Face Beautify?</h2>
              
              <div className="grid md:grid-cols-3 gap-6">
                {[
                  { icon: Zap, title: "Instant Results", desc: "Get beautified photos in seconds with powerful AI processing" },
                  { icon: Shield, title: "100% Private", desc: "Your photos are processed securely and never stored" },
                  { icon: Download, title: "Free Downloads", desc: "Download beautified photos without watermarks" }
                ].map((item, i) => (
                  <div key={i} className="bg-card rounded-xl p-6 border border-border">
                    <div className="w-12 h-12 rounded-xl bg-pink-500/10 flex items-center justify-center mb-4">
                      <item.icon className="w-6 h-6 text-pink-500" />
                    </div>
                    <h3 className="font-semibold text-lg mb-2">{item.title}</h3>
                    <p className="text-muted-foreground">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* How to Use */}
          <section className="py-12 md:py-16 px-4 bg-gradient-dark">
            <div className="container mx-auto max-w-4xl">
              <h2 className="text-2xl md:text-4xl font-bold text-center mb-10">How to Use</h2>
              
              <div className="grid md:grid-cols-3 gap-8">
                {[
                  { step: "1", title: "Upload Photo", desc: "Upload a clear photo with visible face" },
                  { step: "2", title: "Adjust Settings", desc: "Choose beautification options like skin smoothing level" },
                  { step: "3", title: "Download", desc: "Download your beautified photo instantly" }
                ].map((item, i) => (
                  <div key={i} className="text-center">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-r from-pink-500 to-rose-500 text-white font-bold text-xl flex items-center justify-center mx-auto mb-4">
                      {item.step}
                    </div>
                    <h3 className="font-semibold text-lg mb-2">{item.title}</h3>
                    <p className="text-muted-foreground">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* FAQ */}
          <section className="py-12 md:py-16 px-4">
            <div className="container mx-auto max-w-4xl">
              <h2 className="text-2xl md:text-4xl font-bold text-center mb-10">Frequently Asked Questions</h2>
              
              <Accordion type="single" collapsible className="space-y-4">
                <AccordionItem value="1" className="bg-card border border-border rounded-xl px-6">
                  <AccordionTrigger>Is AI Face Beautify really free?</AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    Yes! Our AI Face Beautify tool is completely free to use with no signup required. You can beautify as many photos as you want.
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="2" className="bg-card border border-border rounded-xl px-6">
                  <AccordionTrigger>How does the skin smoothing work?</AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    Our AI analyzes your facial features and applies natural skin smoothing that removes blemishes, reduces pores visibility, and evens out skin tone while maintaining a realistic appearance.
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="3" className="bg-card border border-border rounded-xl px-6">
                  <AccordionTrigger>Will my photos look natural after beautification?</AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    Yes! Our AI is designed to enhance your features while maintaining a natural look. You can adjust the intensity of effects like skin smoothing to get the perfect balance.
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="4" className="bg-card border border-border rounded-xl px-6">
                  <AccordionTrigger>Is my photo data safe?</AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    Absolutely! Your photos are processed securely and are never stored on our servers. Once you download your beautified image, all data is deleted.
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="5" className="bg-card border border-border rounded-xl px-6">
                  <AccordionTrigger>What types of photos work best?</AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    For best results, use clear photos where the face is visible and well-lit. Front-facing portraits work best, but the AI can also process photos at various angles.
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

export default AIFaceBeautifyPage;
