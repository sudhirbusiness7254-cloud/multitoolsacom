import { Helmet } from "react-helmet-async";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HreflangTags from "@/components/HreflangTags";
import AIImageUpscaler from "@/components/ai-tools/AIImageUpscaler";
import ImageComparisonSlider from "@/components/ImageComparisonSlider";
import { AdBottom, AdVideo, AdInline, AdExoticFat, AdUnit1, AdUnit2, AdUnit3, AdUnit4, AdUnit5, AdUnit6 } from "@/components/ads/AdContainer";
import { Link } from "react-router-dom";
import { ArrowLeft, Sparkles, Zap, Shield, Download, Image, Star, CheckCircle, Maximize, Monitor, Printer, Share2 } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

// Import demo images
import upscalerBefore from "@/assets/demo/upscaler-before.jpg";
import upscalerAfter from "@/assets/demo/upscaler-after.jpg";

const AIImageUpscalerPage = () => {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What does image upscaling mean?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Image upscaling is the process of increasing an image's resolution while maintaining or improving quality. Our AI upscaler uses super-resolution technology to intelligently add pixels, resulting in larger images with sharp details rather than the blurry results you'd get from traditional resizing."
        }
      },
      {
        "@type": "Question",
        "name": "How much can I upscale my image?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "You can upscale images by 2x, 3x, or 4x their original resolution. For example, a 1000x1000 pixel image can become 4000x4000 pixels (4x upscale). We recommend 2x for most uses and 4x only when you need maximum resolution."
        }
      },
      {
        "@type": "Question",
        "name": "Is AI upscaling better than Photoshop?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, AI upscaling produces significantly better results than traditional methods like Photoshop's bicubic interpolation. Our AI understands image content and intelligently recreates details, textures, and edges rather than simply averaging pixel colors."
        }
      }
    ]
  };

  return (
    <>
      <Helmet>
        <title>AI Image Upscaler - Increase Resolution 2x/4x Free | No Quality Loss</title>
        <meta name="description" content="Free AI Image Upscaler. Increase image resolution up to 4x using super-resolution AI. Enlarge photos without losing quality. No signup, no watermarks." />
        <meta name="keywords" content="AI image upscaler, increase image resolution, upscale image, enlarge photo, super resolution, 4x upscale, image enlarger free" />
        <link rel="canonical" href="https://multitoolsa.com/ai-image-upscaler" />
        
        <meta property="og:title" content="AI Image Upscaler - Increase Resolution 2x/4x Free" />
        <meta property="og:description" content="Upscale images up to 4x resolution using AI super-resolution technology. Free, no watermarks." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://multitoolsa.com/ai-image-upscaler" />
        
        <script type="application/ld+json">
          {JSON.stringify(faqSchema)}
        </script>
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            "name": "AI Image Upscaler",
            "description": "Free AI-powered image upscaling tool that increases resolution up to 4x without quality loss",
            "url": "https://multitoolsa.com/ai-image-upscaler",
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
      <HreflangTags path="/ai-image-upscaler" />

      <div className="min-h-screen bg-background flex flex-col">
        <Header />
        
        <main className="flex-1">
          {/* Hero Section */}
          <section className="py-10 md:py-16 lg:py-20 bg-gradient-hero relative overflow-hidden">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-3xl" />
            
            <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16 relative z-10">
              <div className="mb-6">
                <Link 
                  to="/ai-image-tools" 
                  className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Back to AI Image Tools
                </Link>
              </div>
              
              <div className="max-w-4xl xl:max-w-5xl mx-auto text-center">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/30 mb-6">
                  <Maximize className="w-4 h-4 text-cyan-500" />
                  <span className="text-sm font-medium text-cyan-500">Super Resolution AI</span>
                </div>
                
                <h1 className="text-3xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-4">
                  AI Image Upscaler
                </h1>
                
                <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
                  Increase your image resolution up to 4x without losing quality. Our AI super-resolution technology 
                  intelligently reconstructs fine details, textures, and edges for crystal-clear enlargements.
                </p>
              </div>
            </div>
          </section>

          {/* Tool Section */}
          <section className="py-8 md:py-12 lg:py-16 px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16">
            <div className="w-full max-w-5xl xl:max-w-6xl mx-auto">
              <AIImageUpscaler />
              
              {/* Ads below tool */}
              <AdExoticFat className="mt-6" />
              <AdUnit1 className="mt-4" />
              <AdBottom className="mt-4" />
              <AdUnit2 className="mt-4" />
              <AdVideo className="mt-4" />
              <AdUnit3 className="mt-4" />
              <AdInline className="mt-4" />
            </div>
          </section>

          {/* Demo Comparison Section */}
          <section className="py-10 md:py-14 lg:py-16 px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16 bg-secondary/30">
            <div className="w-full max-w-xl lg:max-w-2xl mx-auto">
              <div className="text-center mb-6">
                <h2 className="text-xl md:text-2xl font-bold mb-2">See the Difference</h2>
                <p className="text-sm text-muted-foreground">Drag the slider to compare</p>
              </div>
              
              <div className="bg-card rounded-xl border border-border overflow-hidden shadow-md">
                <ImageComparisonSlider
                  originalSrc={upscalerBefore}
                  compressedSrc={upscalerAfter}
                  originalLabel="Low Resolution"
                  compressedLabel="4K Upscaled"
                  className="w-full"
                />
              </div>
            </div>
          </section>

          {/* About Section */}
          <section className="py-12 md:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16 bg-secondary/30">
            <div className="w-full max-w-5xl xl:max-w-6xl mx-auto">
              <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold text-center mb-8">About AI Image Upscaling</h2>
              
              <div className="prose prose-lg dark:prose-invert max-w-none space-y-6">
                <p>
                  AI Image Upscaling represents a revolutionary advancement in digital image processing. Unlike traditional upscaling methods that simply stretch pixels and apply smoothing filters, our AI-powered upscaler uses deep learning technology to intelligently reconstruct image details at higher resolutions. This technology, known as super-resolution, analyzes the patterns, textures, and structures in your image to generate new pixels that match the content naturally.
                </p>
                
                <p>
                  The science behind AI upscaling involves training neural networks on millions of high-resolution and low-resolution image pairs. Through this training, the AI learns how details, edges, and textures should appear at higher resolutions. When you upload an image, the AI applies this learned knowledge to predict and generate new pixel data that looks authentic and sharp, rather than blurry or pixelated.
                </p>
                
                <p>
                  Our upscaler is particularly effective for enhancing old photographs, low-resolution web images, screenshots, and digital artwork. Whether you need to print a small photo at poster size, zoom into image details, or simply improve the clarity of a compressed image, AI upscaling delivers results that were previously impossible without the original high-resolution source.
                </p>
                
                <h3 className="text-xl font-semibold mt-8">Why Traditional Upscaling Falls Short</h3>
                
                <p>
                  Traditional upscaling methods like bicubic or bilinear interpolation work by averaging neighboring pixels to create new ones. While this produces smoother results than simple nearest-neighbor scaling, it inevitably leads to soft, blurry images because no new detail information is being created. The larger you scale, the worse the blurriness becomes.
                </p>
                
                <p>
                  AI upscaling fundamentally changes this paradigm. Instead of just averaging pixels, it actually generates new detail based on its understanding of image content. Hair strands become defined rather than smeared. Textures like fabric, skin, and foliage gain realistic detail. Text becomes readable. Edges become crisp. This is why AI-upscaled images can look nearly as good as photos originally taken at higher resolutions.
                </p>
              </div>
            </div>
          </section>

          {/* Features Grid */}
          <section className="py-12 md:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16">
            <div className="w-full max-w-6xl xl:max-w-7xl 2xl:max-w-[1600px] mx-auto">
              <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold text-center mb-10">Key Features</h2>
              
              <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                {[
                  { icon: Maximize, title: "Up to 4x Upscale", desc: "Increase resolution by 2x, 3x, or 4x while maintaining sharp details", color: "text-cyan-500", bg: "bg-cyan-500/10" },
                  { icon: Sparkles, title: "Detail Reconstruction", desc: "AI generates new realistic details that match your image content", color: "text-yellow-500", bg: "bg-yellow-500/10" },
                  { icon: Zap, title: "Fast Processing", desc: "Get upscaled images in seconds, not minutes", color: "text-green-500", bg: "bg-green-500/10" },
                  { icon: Download, title: "Multiple Formats", desc: "Download in JPG, PNG, or WebP at your chosen quality", color: "text-blue-500", bg: "bg-blue-500/10" }
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
              
              {/* Inline Ad - After Features */}
              <AdInline className="mt-8" />
            </div>
          </section>

          {/* How It Works */}
          <section className="py-12 md:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16 bg-gradient-dark">
            <div className="w-full max-w-5xl xl:max-w-6xl mx-auto">
              <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold text-center mb-10">How AI Upscaling Works</h2>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
                {[
                  { step: "1", title: "Upload", desc: "Upload your image in any common format" },
                  { step: "2", title: "Choose Scale", desc: "Select 2x, 3x, or 4x upscale level" },
                  { step: "3", title: "AI Processing", desc: "Neural network reconstructs details at higher resolution" },
                  { step: "4", title: "Download", desc: "Get your high-resolution image instantly" }
                ].map((item, i) => (
                  <div key={i} className="text-center">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-bold text-xl flex items-center justify-center mx-auto mb-4">
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
          <section className="py-12 md:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16">
            <div className="w-full max-w-6xl xl:max-w-7xl 2xl:max-w-[1600px] mx-auto">
              <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold text-center mb-10">Common Use Cases</h2>
              
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-6 gap-4 md:gap-6">
                {[
                  { icon: Printer, title: "Print Enlargement", desc: "Upscale small photos for large prints, posters, or canvas without losing quality. Perfect for turning old family photos into wall art." },
                  { icon: Monitor, title: "Digital Display", desc: "Enhance images for high-resolution displays, 4K monitors, and digital signage where pixel quality matters." },
                  { icon: Share2, title: "Social Media", desc: "Upscale compressed or small images for crisp display on social platforms that prefer high-resolution content." },
                  { icon: Image, title: "Old Photo Restoration", desc: "Breathe new life into old scanned photos and vintage images by upscaling them to modern resolutions." },
                  { icon: Star, title: "E-commerce", desc: "Create zoom-friendly product images that let customers see fine details, increasing trust and conversions." },
                  { icon: Sparkles, title: "Digital Art", desc: "Upscale artwork and illustrations for higher-resolution prints or to meet client resolution requirements." }
                ].map((item, i) => (
                  <div key={i} className="bg-card rounded-xl p-6 border border-border">
                    <div className="w-12 h-12 rounded-xl bg-cyan-500/10 flex items-center justify-center mb-4">
                      <item.icon className="w-6 h-6 text-cyan-500" />
                    </div>
                    <h3 className="font-semibold text-lg mb-2">{item.title}</h3>
                    <p className="text-sm text-muted-foreground">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Benefits */}
          <section className="py-12 md:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16 bg-secondary/30">
            <div className="w-full max-w-5xl xl:max-w-6xl mx-auto">
              <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold text-center mb-8">Why Choose Our AI Upscaler</h2>
              
              <div className="prose prose-lg dark:prose-invert max-w-none">
                <p>
                  Our AI Image Upscaler stands apart from traditional tools and competing services by offering professional-grade results completely free. While services like Topaz Gigapixel require expensive software purchases, and online tools often add watermarks or limit resolution, we provide unlimited upscaling with no restrictions.
                </p>
                
                <div className="grid md:grid-cols-2 gap-6 mt-8 not-prose">
                  {[
                    { title: "No Quality Loss", desc: "AI reconstructs details rather than just stretching pixels" },
                    { title: "Free & Unlimited", desc: "Upscale as many images as you need without paying" },
                    { title: "No Watermarks", desc: "Download clean images ready for any use" },
                    { title: "Browser-Based", desc: "No software to install, works on any device" },
                    { title: "Quality Presets", desc: "Choose Standard, Premium, or Ultra quality output" },
                    { title: "Multiple Scales", desc: "Select 2x, 3x, or 4x depending on your needs" }
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
          <section className="py-12 md:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16">
            <div className="w-full max-w-5xl xl:max-w-6xl mx-auto">
              <div className="bg-card rounded-2xl p-8 border border-border">
                <div className="flex items-center gap-3 mb-6">
                  <Shield className="w-8 h-8 text-green-500" />
                  <h2 className="text-2xl font-bold">Privacy & Security</h2>
                </div>
                
                <div className="prose prose-lg dark:prose-invert max-w-none">
                  <p>
                    Your images are processed securely and privately. We use encrypted connections for all uploads, and your images are never stored on our servers beyond the processing time. Once you download your upscaled image, all data is immediately deleted.
                  </p>
                  
                  <p>
                    We do not use your images for AI training, share them with third parties, or retain any copies. Whether you're upscaling personal photos, client work, or confidential materials, your privacy is fully protected.
                  </p>
                  
                  <ul className="mt-4">
                    <li>Encrypted upload and download connections</li>
                    <li>No server-side image storage</li>
                    <li>Images deleted immediately after processing</li>
                    <li>No data shared with third parties</li>
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
                  <AccordionTrigger>What does image upscaling mean?</AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    Image upscaling is the process of increasing an image's resolution (number of pixels) while maintaining or improving quality. Our AI upscaler uses super-resolution technology to intelligently add pixels and reconstruct details, resulting in larger images that are sharp and clear rather than blurry.
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="2" className="bg-card border border-border rounded-xl px-6">
                  <AccordionTrigger>How much can I upscale my image?</AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    You can upscale images by 2x, 3x, or 4x their original resolution. For example, a 1000x1000 pixel image can become 4000x4000 pixels with 4x upscale. We recommend 2x for most uses as it provides the best balance of size increase and quality retention.
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="3" className="bg-card border border-border rounded-xl px-6">
                  <AccordionTrigger>Is AI upscaling better than Photoshop?</AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    Yes, AI upscaling produces significantly better results than traditional methods like Photoshop's bicubic interpolation. Our AI understands image content and intelligently recreates details, textures, and edges rather than simply averaging pixel colors, which causes blurriness.
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="4" className="bg-card border border-border rounded-xl px-6">
                  <AccordionTrigger>Which scale level should I choose?</AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    Choose 2x for general quality improvement and moderate enlargement - this gives the best quality. Use 3x when you need significantly larger images. Reserve 4x for when you absolutely need maximum resolution, understanding that some detail quality may be slightly reduced at this extreme scale.
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="5" className="bg-card border border-border rounded-xl px-6">
                  <AccordionTrigger>Can I upscale already upscaled images?</AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    While technically possible, we don't recommend upscaling an already upscaled image. Each upscale pass can introduce subtle artifacts. For best results, always start from the original image and upscale once to your desired resolution.
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="6" className="bg-card border border-border rounded-xl px-6">
                  <AccordionTrigger>What types of images work best?</AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    Our AI works well on photos, illustrations, digital art, and graphics. Best results come from clear, well-lit source images. Very noisy, heavily compressed, or extremely low-resolution images may show limited improvement. Photos typically upscale better than text-heavy images.
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="7" className="bg-card border border-border rounded-xl px-6">
                  <AccordionTrigger>Will upscaling make blurry photos sharp?</AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    AI upscaling can significantly improve perceived sharpness by reconstructing details, but it cannot recover information that was never captured. Motion blur or out-of-focus areas will remain soft. For blur correction, consider using our AI Photo Enhancer in combination with upscaling.
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="8" className="bg-card border border-border rounded-xl px-6">
                  <AccordionTrigger>Is there a file size or resolution limit?</AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    We recommend source images up to 10MB for optimal processing speed. Very high-resolution starting images may be scaled before upscaling due to processing constraints. For most use cases, even small source images produce excellent upscaled results.
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="9" className="bg-card border border-border rounded-xl px-6">
                  <AccordionTrigger>How long does upscaling take?</AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    Processing typically takes 5-30 seconds depending on the image size and chosen scale level. 2x upscaling is fastest, while 4x Ultra quality takes longer. Processing happens on our servers, so your device speed doesn't affect processing time.
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="10" className="bg-card border border-border rounded-xl px-6">
                  <AccordionTrigger>Can I use upscaled images commercially?</AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    Yes! Images you upscale are yours to use however you wish, including for commercial purposes. Just ensure you have the rights to the original image before upscaling and using it commercially.
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
                <Link to="/ai-photo-enhancer" className="bg-card rounded-xl p-6 border border-border hover:border-primary transition-colors">
                  <h3 className="font-semibold mb-2">AI Photo Enhancer</h3>
                  <p className="text-sm text-muted-foreground">Improve sharpness, colors, and clarity</p>
                </Link>
                <Link to="/ai-image-restorer" className="bg-card rounded-xl p-6 border border-border hover:border-primary transition-colors">
                  <h3 className="font-semibold mb-2">AI Image Restorer</h3>
                  <p className="text-sm text-muted-foreground">Repair old, damaged, or faded photos</p>
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

export default AIImageUpscalerPage;
