import { Helmet } from "react-helmet-async";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HreflangTags from "@/components/HreflangTags";
import AIImageRestorer from "@/components/ai-tools/AIImageRestorer";
import ImageComparisonSlider from "@/components/ImageComparisonSlider";
import { Link } from "react-router-dom";
import { ArrowLeft, Sparkles, Zap, Shield, Download, Image, Star, CheckCircle, History, Camera, Eraser, Wand2 } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

// Import demo images
import restorerBefore from "@/assets/demo/restorer-before.jpg";
import restorerAfter from "@/assets/demo/restorer-after.jpg";

const AIImageRestorerPage = () => {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What types of photo damage can AI restore?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Our AI can restore photos with scratches, tears, fading, discoloration, noise, blur, water damage marks, and general age-related deterioration. It works on both scanned physical photos and old digital images."
        }
      },
      {
        "@type": "Question",
        "name": "How does AI photo restoration work?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Our AI analyzes damage patterns in your photo and uses deep learning trained on millions of images to intelligently reconstruct missing or damaged areas. It understands image context to fill in details that match the surrounding content naturally."
        }
      },
      {
        "@type": "Question",
        "name": "Will restoration change my photo's character?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "No. Our AI is designed to repair damage while preserving the original character and atmosphere of your photo. It removes defects without over-processing or making photos look artificially enhanced."
        }
      }
    ]
  };

  return (
    <>
      <Helmet>
        <title>AI Image Restorer - Restore Old & Damaged Photos Free | MultiToolsA</title>
        <meta name="description" content="Free AI Image Restorer. Repair scratches, fix fading, remove damage from old photos. Restore vintage photographs to their original glory. No signup required." />
        <meta name="keywords" content="AI photo restoration, restore old photos, fix damaged photos, photo repair, vintage photo restoration, scratch removal, image restoration free" />
        <link rel="canonical" href="https://multitoolsa.com/ai-image-restorer" />
        
        <meta property="og:title" content="AI Image Restorer - Restore Old & Damaged Photos Free" />
        <meta property="og:description" content="Restore old, damaged, or faded photos using AI. Remove scratches, fix discoloration, repair tears. Free, no watermarks." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://multitoolsa.com/ai-image-restorer" />
        
        <script type="application/ld+json">
          {JSON.stringify(faqSchema)}
        </script>
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            "name": "AI Image Restorer",
            "description": "Free AI-powered photo restoration tool that repairs old, damaged, and faded photographs",
            "url": "https://multitoolsa.com/ai-image-restorer",
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
      <HreflangTags path="/ai-image-restorer" />

      <div className="min-h-screen bg-background flex flex-col">
        <Header />
        
        <main className="flex-1">
          {/* Hero Section */}
          <section className="py-10 md:py-16 bg-gradient-hero relative overflow-hidden">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-amber-500/10 rounded-full blur-3xl" />
            
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
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/10 border border-amber-500/30 mb-6">
                  <History className="w-4 h-4 text-amber-500" />
                  <span className="text-sm font-medium text-amber-500">Photo Restoration AI</span>
                </div>
                
                <h1 className="text-3xl md:text-5xl font-bold mb-4">
                  AI Image Restorer
                </h1>
                
                <p className="text-lg text-muted-foreground mb-8">
                  Breathe new life into old, damaged, or faded photographs. Our AI intelligently repairs scratches, 
                  fixes discoloration, removes noise, and restores your precious memories to their original glory.
                </p>
              </div>
            </div>
          </section>

          {/* Demo Comparison Section */}
          <section className="py-10 md:py-14 px-4 bg-secondary/30">
            <div className="container mx-auto max-w-3xl">
              <div className="text-center mb-8">
                <h2 className="text-2xl md:text-3xl font-bold mb-3">See the Restoration</h2>
                <p className="text-muted-foreground">Drag the slider to compare damaged original vs AI restored photo</p>
              </div>
              
              <div className="bg-card rounded-2xl border border-border overflow-hidden shadow-lg">
                <div className="aspect-[3/4]">
                  <ImageComparisonSlider
                    originalSrc={restorerBefore}
                    compressedSrc={restorerAfter}
                    originalLabel="Damaged Original"
                    compressedLabel="AI Restored"
                    className="w-full h-full"
                  />
                </div>
              </div>
            </div>
          </section>

          {/* Tool Section */}
          <section className="py-8 md:py-12 px-4">
            <div className="container mx-auto">
              <AIImageRestorer />
            </div>
          </section>

          {/* About Section */}
          <section className="py-12 md:py-16 px-4 bg-secondary/30">
            <div className="container mx-auto max-w-4xl">
              <h2 className="text-2xl md:text-4xl font-bold text-center mb-8">About AI Photo Restoration</h2>
              
              <div className="prose prose-lg dark:prose-invert max-w-none space-y-6">
                <p>
                  Photo restoration is the art and science of repairing damaged photographs to restore them to their original condition—or as close to it as possible. Traditionally, this required skilled professionals using tools like Photoshop, spending hours carefully cloning, healing, and reconstructing damaged areas pixel by pixel. Our AI Image Restorer automates this process using artificial intelligence trained specifically on photo restoration tasks.
                </p>
                
                <p>
                  The AI behind our restoration tool has been trained on vast datasets of damaged and restored photograph pairs. Through this training, it has learned to recognize different types of damage—scratches, tears, fading, water stains, mold spots, chemical deterioration, and digital noise—and understands how to repair each type appropriately. When you upload a damaged photo, the AI analyzes the damage patterns and intelligently reconstructs the affected areas based on surrounding image content.
                </p>
                
                <p>
                  What makes AI restoration particularly powerful is its ability to understand context. When filling in a scratch across someone's face, the AI knows what facial features should look like and reconstructs them naturally. When repairing a torn corner of a landscape photo, it extends the scenery convincingly. This contextual understanding produces results that often surpass what casual Photoshop users could achieve.
                </p>
                
                <h3 className="text-xl font-semibold mt-8">Preserving Family Memories</h3>
                
                <p>
                  Old photographs are irreplaceable windows into our past. They capture moments with loved ones who may no longer be with us, document family history, and preserve visual records of times we can never revisit. Yet physical photographs are fragile—they fade in sunlight, deteriorate in humidity, develop scratches from handling, and can be damaged by water, fire, or simple accidents.
                </p>
                
                <p>
                  Our AI restoration tool helps preserve these precious memories by repairing damage that would otherwise obscure or destroy the image. Whether you're digitizing old family albums, restoring photos for genealogy projects, or rescuing a damaged photo of a loved one, our tool makes professional-quality restoration accessible to everyone, completely free.
                </p>
              </div>
            </div>
          </section>

          {/* Features Grid */}
          <section className="py-12 md:py-16 px-4">
            <div className="container mx-auto max-w-5xl">
              <h2 className="text-2xl md:text-4xl font-bold text-center mb-10">What We Can Restore</h2>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  { icon: Eraser, title: "Scratches & Tears", desc: "Remove surface scratches, repair torn edges, and fix creased areas", color: "text-amber-500", bg: "bg-amber-500/10" },
                  { icon: Sparkles, title: "Fading & Discoloration", desc: "Restore faded colors and correct yellowing or discoloration", color: "text-yellow-500", bg: "bg-yellow-500/10" },
                  { icon: Wand2, title: "Noise & Grain", desc: "Reduce film grain, digital noise, and scanner artifacts", color: "text-purple-500", bg: "bg-purple-500/10" },
                  { icon: Image, title: "Missing Areas", desc: "Intelligently reconstruct damaged or missing portions", color: "text-blue-500", bg: "bg-blue-500/10" }
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
              <h2 className="text-2xl md:text-4xl font-bold text-center mb-10">How AI Restoration Works</h2>
              
              <div className="grid md:grid-cols-4 gap-8">
                {[
                  { step: "1", title: "Upload", desc: "Upload your damaged or old photograph" },
                  { step: "2", title: "Analysis", desc: "AI identifies damage types and affected areas" },
                  { step: "3", title: "Restoration", desc: "Intelligent repair of scratches, fading, and damage" },
                  { step: "4", title: "Download", desc: "Get your beautifully restored photo" }
                ].map((item, i) => (
                  <div key={i} className="text-center">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 text-white font-bold text-xl flex items-center justify-center mx-auto mb-4">
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
              <h2 className="text-2xl md:text-4xl font-bold text-center mb-10">Who Uses Photo Restoration</h2>
              
              <div className="grid md:grid-cols-3 gap-6">
                {[
                  { icon: Camera, title: "Family Historians", desc: "Restore old family photos, wedding pictures, and ancestral photographs for genealogy projects and family archives." },
                  { icon: History, title: "Archive Keepers", desc: "Museums, libraries, and historical societies preserve their photographic collections by restoring damaged images." },
                  { icon: Star, title: "Memorial Projects", desc: "Create restored photos of loved ones for funerals, memorials, tributes, or special anniversary celebrations." },
                  { icon: Image, title: "Album Digitizers", desc: "Anyone scanning and digitizing old photo albums can restore images during the preservation process." },
                  { icon: Sparkles, title: "Gift Creators", desc: "Restore old photos as meaningful personalized gifts for parents, grandparents, or milestone celebrations." },
                  { icon: Zap, title: "Professional Restorers", desc: "Photo restoration professionals use AI to speed up their workflow and handle more client projects." }
                ].map((item, i) => (
                  <div key={i} className="bg-card rounded-xl p-6 border border-border">
                    <div className="w-12 h-12 rounded-xl bg-amber-500/10 flex items-center justify-center mb-4">
                      <item.icon className="w-6 h-6 text-amber-500" />
                    </div>
                    <h3 className="font-semibold text-lg mb-2">{item.title}</h3>
                    <p className="text-sm text-muted-foreground">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Benefits */}
          <section className="py-12 md:py-16 px-4 bg-secondary/30">
            <div className="container mx-auto max-w-4xl">
              <h2 className="text-2xl md:text-4xl font-bold text-center mb-8">Why Use AI Restoration</h2>
              
              <div className="prose prose-lg dark:prose-invert max-w-none">
                <p>
                  Professional photo restoration services can cost $50-$500+ per image depending on damage severity. Our AI tool delivers comparable results instantly and completely free. While professional human restorers may still be needed for extremely complex cases, our AI handles the vast majority of restoration needs with impressive results.
                </p>
                
                <div className="grid md:grid-cols-2 gap-6 mt-8 not-prose">
                  {[
                    { title: "Instant Results", desc: "Get restored photos in seconds, not days or weeks" },
                    { title: "Completely Free", desc: "No cost, no subscription, no hidden fees" },
                    { title: "Preserves Character", desc: "Repairs damage without over-processing the vintage feel" },
                    { title: "No Skills Needed", desc: "Professional results without Photoshop knowledge" },
                    { title: "Unlimited Use", desc: "Restore as many photos as you need" },
                    { title: "No Watermarks", desc: "Download clean, ready-to-use restored images" }
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
                    We understand that the photos you restore are often deeply personal—family memories, photos of loved ones, or irreplaceable historical images. That's why privacy is paramount in our service. Your photos are processed in real-time and immediately deleted after restoration. We never store, view, or use your images for any purpose beyond processing your request.
                  </p>
                  
                  <ul className="mt-4">
                    <li>No image storage - photos deleted immediately after processing</li>
                    <li>Encrypted connections for secure upload and download</li>
                    <li>No human review of uploaded images</li>
                    <li>No account required - no personal data collected</li>
                    <li>Photos never used for AI training or shared with third parties</li>
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
                  <AccordionTrigger>What types of photo damage can AI restore?</AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    Our AI can restore photos with scratches, tears, creases, fading, discoloration, yellowing, noise, blur, water damage marks, mold spots, and general age-related deterioration. It works on both scanned physical photos and old digital images.
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="2" className="bg-card border border-border rounded-xl px-6">
                  <AccordionTrigger>How does AI photo restoration work?</AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    Our AI analyzes damage patterns in your photo and uses deep learning trained on millions of images to intelligently reconstruct missing or damaged areas. It understands image context—faces, backgrounds, textures—to fill in details that match the surrounding content naturally.
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="3" className="bg-card border border-border rounded-xl px-6">
                  <AccordionTrigger>Will restoration change my photo's vintage character?</AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    No. Our AI is designed to repair damage while preserving the original character and atmosphere of your photo. It removes defects without over-processing or making photos look artificially modern. The vintage feel and age-appropriate aesthetics are maintained.
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="4" className="bg-card border border-border rounded-xl px-6">
                  <AccordionTrigger>Should I scan my photo before uploading?</AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    Yes, for physical photos, scan them at the highest resolution your scanner supports (300 DPI minimum, 600+ DPI preferred). Higher quality scans give the AI more detail to work with and produce better restoration results.
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="5" className="bg-card border border-border rounded-xl px-6">
                  <AccordionTrigger>Can AI restore photos with missing faces?</AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    The AI can repair minor facial damage (scratches, fading) excellently. However, for photos with large portions of faces missing, results may vary. The AI reconstructs based on surrounding context, but cannot accurately recreate specific facial features of individuals it has never seen.
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="6" className="bg-card border border-border rounded-xl px-6">
                  <AccordionTrigger>Is AI restoration as good as professional restoration?</AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    For most photos, AI restoration produces excellent results comparable to professional work. Complex cases with severe damage may still benefit from human expertise. However, our AI handles 90%+ of restoration needs effectively and saves the cost and time of professional services.
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="7" className="bg-card border border-border rounded-xl px-6">
                  <AccordionTrigger>Can I combine restoration with other tools?</AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    Absolutely! For best results with old photos, we recommend: 1) Use AI Image Restorer first to repair damage, 2) Use AI Colorize if it's black & white, 3) Use AI Photo Enhancer to boost overall quality, and 4) Use AI Image Upscaler if you need a larger print size.
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="8" className="bg-card border border-border rounded-xl px-6">
                  <AccordionTrigger>How long does restoration take?</AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    Most restorations complete in 10-30 seconds. Processing time depends on image size and damage complexity. Larger, more heavily damaged images may take slightly longer as the AI performs more extensive analysis and reconstruction.
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="9" className="bg-card border border-border rounded-xl px-6">
                  <AccordionTrigger>What image formats are supported?</AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    We support all major image formats including JPG, JPEG, PNG, WebP, BMP, and TIFF. You can download your restored photo in JPG, PNG, or WebP format. We recommend PNG for archival purposes as it preserves full quality.
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="10" className="bg-card border border-border rounded-xl px-6">
                  <AccordionTrigger>Is this tool really free?</AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    Yes! Our AI Image Restorer is completely free with no signup, no watermarks, and no limits on usage. Restore as many photos as you need without any cost. We believe everyone deserves access to tools that preserve their precious memories.
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
                <Link to="/ai-colorize" className="bg-card rounded-xl p-6 border border-border hover:border-primary transition-colors">
                  <h3 className="font-semibold mb-2">AI Colorize</h3>
                  <p className="text-sm text-muted-foreground">Add color to black & white photos</p>
                </Link>
                <Link to="/ai-photo-enhancer" className="bg-card rounded-xl p-6 border border-border hover:border-primary transition-colors">
                  <h3 className="font-semibold mb-2">AI Photo Enhancer</h3>
                  <p className="text-sm text-muted-foreground">Improve overall image quality</p>
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

export default AIImageRestorerPage;
