import { Helmet } from "react-helmet-async";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HreflangTags from "@/components/HreflangTags";
import AIFaceSwap from "@/components/ai-tools/AIFaceSwap";
import { AdBottom, AdVideo } from "@/components/ads/AdContainer";
import { Link } from "react-router-dom";
import { ArrowLeft, Sparkles, Zap, Shield, Download, Image, Star, CheckCircle, Users, Camera, Laugh, RefreshCcw } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const AIFaceSwapPage = () => {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "How does AI face swap work?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Our AI detects faces in both photos, maps facial landmarks, and seamlessly blends the source face onto the target photo. It adjusts for lighting, angle, skin tone, and expression to create realistic-looking results."
        }
      },
      {
        "@type": "Question",
        "name": "Is face swapping legal and ethical?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Face swapping is legal for personal entertainment and creative purposes. However, using it to create misleading content, impersonate others maliciously, or for harassment is unethical and may be illegal. Always use responsibly and with consent."
        }
      },
      {
        "@type": "Question",
        "name": "What photos work best for face swap?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Best results come from clear, front-facing photos where the face is well-lit and fully visible. Similar lighting and angles between source and target photos produce the most realistic swaps."
        }
      }
    ]
  };

  return (
    <>
      <Helmet>
        <title>AI Face Swap - Free Online Face Swapping Tool | MultiToolsA</title>
        <meta name="description" content="Swap faces between photos instantly using AI. Free online face swap tool with realistic results. No watermarks, no signup required. Fun and easy face swapping." />
        <meta name="keywords" content="face swap, AI face swap, face swap online, swap faces, face changer, face swap free, face swap app, photo face swap" />
        <link rel="canonical" href="https://multitoolsa.com/ai-face-swap" />
        
        <meta property="og:title" content="AI Face Swap - Free Online Face Swapping Tool" />
        <meta property="og:description" content="Swap faces between photos instantly using AI. Free, realistic results, no watermarks." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://multitoolsa.com/ai-face-swap" />
        
        <script type="application/ld+json">
          {JSON.stringify(faqSchema)}
        </script>
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            "name": "AI Face Swap",
            "description": "Free AI-powered face swapping tool that seamlessly swaps faces between photos",
            "url": "https://multitoolsa.com/ai-face-swap",
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
      <HreflangTags path="/ai-face-swap" />

      <div className="min-h-screen bg-background flex flex-col">
        <Header />
        
        <main className="flex-1">
          {/* Hero Section */}
          <section className="py-10 md:py-16 bg-gradient-hero relative overflow-hidden">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-3xl" />
            
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
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/30 mb-6">
                  <RefreshCcw className="w-4 h-4 text-purple-500" />
                  <span className="text-sm font-medium text-purple-500">Face Swap AI</span>
                </div>
                
                <h1 className="text-3xl md:text-5xl font-bold mb-4">
                  AI Face Swap
                </h1>
                
                <p className="text-lg text-muted-foreground mb-8">
                  Swap faces between two photos with stunning realism. Our AI handles lighting matching, 
                  skin tone blending, and angle adjustment to create seamless, natural-looking face swaps.
                </p>
              </div>
            </div>
          </section>

          {/* Tool Section */}
          <section className="py-8 md:py-12 px-4">
            <div className="container mx-auto max-w-4xl">
              <AIFaceSwap />
              
              {/* Ads below tool */}
              <AdBottom className="mt-6" />
              <AdVideo className="mt-4" />
            </div>
          </section>

          {/* About Section */}
          <section className="py-12 md:py-16 px-4 bg-secondary/30">
            <div className="container mx-auto max-w-4xl">
              <h2 className="text-2xl md:text-4xl font-bold text-center mb-8">About AI Face Swap</h2>
              
              <div className="prose prose-lg dark:prose-invert max-w-none space-y-6">
                <p>
                  Face swapping technology uses artificial intelligence to replace one person's face with another in photographs. Our AI Face Swap tool employs advanced deep learning algorithms to detect faces, analyze facial features, and seamlessly blend the source face onto the target image while maintaining a realistic appearance.
                </p>
                
                <p>
                  The technology behind modern face swapping is remarkably sophisticated. The AI first detects and maps facial landmarks—the positions of eyes, nose, mouth, jaw, and other features—in both images. It then calculates the necessary transformations to align the source face with the target's pose and expression. Finally, it blends the face considering lighting conditions, skin tones, and shadows to create a convincing result.
                </p>
                
                <p>
                  Face swapping has evolved from obvious, humorous photo edits to highly realistic transformations. While this technology is primarily used for entertainment and creative purposes, it's important to use it responsibly and ethically. Our tool is designed for fun, legitimate creative projects, and personal amusement—never for deception or harmful purposes.
                </p>
                
                <h3 className="text-xl font-semibold mt-8">Fun and Creative Applications</h3>
                
                <p>
                  Face swap technology opens up endless creative possibilities. Friends and family members can swap faces for hilarious photos. You can insert yourself into famous movie scenes or artwork. Content creators can produce engaging social media content. Party planners can create unique invitations. The applications are limited only by imagination.
                </p>
                
                <p>
                  Beyond entertainment, face swap technology has legitimate professional uses. Advertising agencies use it for concept mockups. Film and TV productions use it for special effects. Fashion and beauty brands use it for virtual try-on features. When used responsibly with proper consent, it's a powerful creative tool.
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
                  { icon: Sparkles, title: "Realistic Blending", desc: "AI matches lighting, skin tone, and shadows for natural results", color: "text-purple-500", bg: "bg-purple-500/10" },
                  { icon: Users, title: "Any Two Photos", desc: "Swap faces between any two photos with visible faces", color: "text-blue-500", bg: "bg-blue-500/10" },
                  { icon: Zap, title: "Instant Results", desc: "Get your face swap in seconds with no waiting", color: "text-green-500", bg: "bg-green-500/10" },
                  { icon: Download, title: "HD Download", desc: "Download high-quality results without watermarks", color: "text-yellow-500", bg: "bg-yellow-500/10" }
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
              <h2 className="text-2xl md:text-4xl font-bold text-center mb-10">How Face Swap Works</h2>
              
              <div className="grid md:grid-cols-4 gap-8">
                {[
                  { step: "1", title: "Source Face", desc: "Upload a photo with the face you want to use" },
                  { step: "2", title: "Target Photo", desc: "Upload the photo where you want the face placed" },
                  { step: "3", title: "AI Processing", desc: "AI maps, aligns, and blends the faces seamlessly" },
                  { step: "4", title: "Download", desc: "Get your face-swapped photo instantly" }
                ].map((item, i) => (
                  <div key={i} className="text-center">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold text-xl flex items-center justify-center mx-auto mb-4">
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
              <h2 className="text-2xl md:text-4xl font-bold text-center mb-10">Fun Ways to Use Face Swap</h2>
              
              <div className="grid md:grid-cols-3 gap-6">
                {[
                  { icon: Laugh, title: "Family Fun", desc: "Swap faces between family members for hilarious photos at gatherings and reunions. Create memorable, shareable moments." },
                  { icon: Star, title: "Celebrity Photos", desc: "Place your face into photos with celebrities, movie scenes, or famous artwork for fun social media posts." },
                  { icon: Camera, title: "Couples & Friends", desc: "Create fun photos by swapping faces with your partner or best friends. Perfect for inside jokes and memorable gifts." },
                  { icon: Image, title: "Pet Face Swaps", desc: "While optimized for humans, try swapping faces with pets for unexpectedly hilarious results." },
                  { icon: Users, title: "Group Photos", desc: "Create chaos by swapping multiple faces in group photos for maximum comedy effect." },
                  { icon: Sparkles, title: "Costume & Cosplay", desc: "See how you'd look as your favorite character by swapping with cosplay or costume photos." }
                ].map((item, i) => (
                  <div key={i} className="bg-card rounded-xl p-6 border border-border">
                    <div className="w-12 h-12 rounded-xl bg-purple-500/10 flex items-center justify-center mb-4">
                      <item.icon className="w-6 h-6 text-purple-500" />
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
                  { title: "Use Clear, Front-Facing Photos", desc: "Both faces should be clearly visible, preferably facing forward with eyes open" },
                  { title: "Match Lighting Conditions", desc: "Photos with similar lighting (both outdoor, both indoor) blend more naturally" },
                  { title: "Similar Angles Work Best", desc: "Faces at similar angles (both looking straight, both tilted) produce better results" },
                  { title: "High-Quality Source Photos", desc: "The higher the resolution of your photos, the better the final result" },
                  { title: "Avoid Obstructions", desc: "Faces without glasses, hands, or hair covering them swap more cleanly" },
                  { title: "Experiment and Have Fun", desc: "Try different photo combinations - sometimes unexpected pairs work great!" }
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

          {/* Privacy & Ethics */}
          <section className="py-12 md:py-16 px-4">
            <div className="container mx-auto max-w-4xl">
              <div className="bg-card rounded-2xl p-8 border border-border">
                <div className="flex items-center gap-3 mb-6">
                  <Shield className="w-8 h-8 text-green-500" />
                  <h2 className="text-2xl font-bold">Privacy & Responsible Use</h2>
                </div>
                
                <div className="prose prose-lg dark:prose-invert max-w-none">
                  <p>
                    Your photos are processed securely and deleted immediately after face swapping. We never store your images or use them for any other purpose. However, with great technology comes great responsibility.
                  </p>
                  
                  <h4 className="font-semibold mt-6">Responsible Use Guidelines:</h4>
                  <ul className="mt-2">
                    <li>Always get consent before using someone else's photo</li>
                    <li>Never create misleading or deceptive content to harm others</li>
                    <li>Don't use face swap for impersonation, fraud, or harassment</li>
                    <li>Be mindful when sharing results - what's funny to you may not be to others</li>
                    <li>Never create inappropriate content involving non-consenting individuals</li>
                  </ul>
                  
                  <p className="mt-4">
                    Face swap technology is meant for fun and creativity. Using it ethically ensures everyone can enjoy this technology without harm.
                  </p>
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
                  <AccordionTrigger>How does AI face swap work?</AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    Our AI detects faces in both photos, maps facial landmarks (eyes, nose, mouth, jawline), and calculates the transformations needed to align the source face with the target pose. It then blends the face while adjusting for lighting, skin tone, and shadows to create realistic results.
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="2" className="bg-card border border-border rounded-xl px-6">
                  <AccordionTrigger>Is face swapping legal?</AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    Face swapping for personal entertainment, creative projects, and with consent is generally legal. However, using it to deceive, defraud, harass, or create non-consensual inappropriate content may violate laws. Always use responsibly and ethically.
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="3" className="bg-card border border-border rounded-xl px-6">
                  <AccordionTrigger>What photos work best for face swap?</AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    Best results come from clear, front-facing photos where faces are well-lit, fully visible, and not obscured by glasses, hair, or hands. Similar lighting conditions and face angles between source and target photos produce the most natural swaps.
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="4" className="bg-card border border-border rounded-xl px-6">
                  <AccordionTrigger>Can I swap faces between people of different genders?</AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    Yes! Our AI can swap faces between any two photos regardless of gender, age, or ethnicity. However, swaps between faces with similar features (face shape, size) tend to look more natural than very different face types.
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="5" className="bg-card border border-border rounded-xl px-6">
                  <AccordionTrigger>Will you store my photos?</AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    No. Your photos are processed in real-time and immediately deleted after the face swap is complete. We never store, view, or use your images for any purpose beyond generating your face swap result.
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="6" className="bg-card border border-border rounded-xl px-6">
                  <AccordionTrigger>Why does my face swap look weird?</AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    Poor results usually stem from: mismatched lighting, very different face angles, low-quality source images, or obstructed faces. Try using clearer photos with similar lighting and angles for better results.
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="7" className="bg-card border border-border rounded-xl px-6">
                  <AccordionTrigger>Can I swap multiple faces in one photo?</AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    Our tool currently swaps one face at a time. For photos with multiple faces, you can process the result multiple times, each time adding a different face swap. This allows building complex multi-face swap images.
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="8" className="bg-card border border-border rounded-xl px-6">
                  <AccordionTrigger>Is this tool really free?</AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    Yes! AI Face Swap is completely free with no signup required, no watermarks on downloads, and no limit on how many swaps you can do. Enjoy creating as many face swaps as you like.
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="9" className="bg-card border border-border rounded-xl px-6">
                  <AccordionTrigger>Can I use face-swapped images commercially?</AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    Commercial use requires careful consideration of consent, likeness rights, and applicable laws. Ensure you have rights to use all faces involved and consult legal advice for commercial projects involving face swaps.
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="10" className="bg-card border border-border rounded-xl px-6">
                  <AccordionTrigger>Why can't the AI find faces in my photo?</AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    Face detection may fail if: the face is too small in the frame, heavily obscured, at an extreme angle, very dark, or blurry. Try using a photo where the face is larger, clearer, and more visible.
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
                <Link to="/ai-face-beautify" className="bg-card rounded-xl p-6 border border-border hover:border-primary transition-colors">
                  <h3 className="font-semibold mb-2">AI Face Beautify</h3>
                  <p className="text-sm text-muted-foreground">Enhance facial features naturally</p>
                </Link>
                <Link to="/ai-photo-enhancer" className="bg-card rounded-xl p-6 border border-border hover:border-primary transition-colors">
                  <h3 className="font-semibold mb-2">AI Photo Enhancer</h3>
                  <p className="text-sm text-muted-foreground">Improve overall image quality</p>
                </Link>
                <Link to="/ai-colorize" className="bg-card rounded-xl p-6 border border-border hover:border-primary transition-colors">
                  <h3 className="font-semibold mb-2">AI Colorize</h3>
                  <p className="text-sm text-muted-foreground">Add color to black & white photos</p>
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

export default AIFaceSwapPage;
