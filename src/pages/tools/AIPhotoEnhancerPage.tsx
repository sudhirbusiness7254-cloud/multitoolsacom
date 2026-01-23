import { Helmet } from "react-helmet-async";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HreflangTags from "@/components/HreflangTags";
import AIPhotoEnhancer from "@/components/ai-tools/AIPhotoEnhancer";
import ImageComparisonSlider from "@/components/ImageComparisonSlider";
import { AdBottom, AdVideo } from "@/components/ads/AdContainer";
import { Link } from "react-router-dom";
import { ArrowLeft, Sparkles, Zap, Shield, Download, Image, Star, CheckCircle, Camera, Palette, Monitor, Eye } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

// Import demo images
import enhanceBefore from "@/assets/demo/girl1-before.jpg";
import enhanceAfter from "@/assets/demo/girl1-after.jpg";

const AIPhotoEnhancerPage = () => {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Is AI Photo Enhancer really free?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes! Our AI Photo Enhancer is completely free to use with no signup required. You can enhance unlimited photos without any watermarks or hidden fees."
        }
      },
      {
        "@type": "Question",
        "name": "How does AI photo enhancement work?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Our AI analyzes your image using deep learning algorithms trained on millions of professional photos. It identifies areas that need improvement such as sharpness, color balance, lighting, and noise, then applies intelligent corrections while preserving natural details."
        }
      },
      {
        "@type": "Question",
        "name": "What image formats are supported?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "We support all major image formats including JPG, JPEG, PNG, WebP, BMP, and TIFF. You can download your enhanced photo in JPG, PNG, or WebP format."
        }
      },
      {
        "@type": "Question",
        "name": "Will my photos be stored on your servers?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "No. Your photos are processed in real-time and immediately deleted after enhancement. We never store, share, or use your images for any purpose other than processing your request."
        }
      },
      {
        "@type": "Question",
        "name": "How is this different from paid apps?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Unlike paid apps, our tool is completely free with no watermarks, no subscription required, and no app download needed. You get 4K quality output with adjustable saturation and quality settings that you control."
        }
      }
    ]
  };

  return (
    <>
      <Helmet>
        <title>AI Photo Enhancer - Improve Image Quality Free | 4K Output</title>
        <meta name="description" content="Free AI Photo Enhancer tool. Improve image quality, sharpness, clarity and colors automatically. Professional results - no signup, no watermarks, 4K output." />
        <meta name="keywords" content="AI photo enhancer, improve image quality, photo enhancement, free photo enhancer, 4K upscale, image quality improvement" />
        <link rel="canonical" href="https://multitoolsa.com/ai-photo-enhancer" />
        
        <meta property="og:title" content="AI Photo Enhancer - Improve Image Quality Free" />
        <meta property="og:description" content="Enhance your photos with AI. Improve sharpness, clarity, and colors automatically. Free, no watermarks, 4K quality." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://multitoolsa.com/ai-photo-enhancer" />
        
        <script type="application/ld+json">
          {JSON.stringify(faqSchema)}
        </script>
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            "name": "AI Photo Enhancer",
            "description": "Free AI-powered photo enhancement tool that improves image quality, sharpness, and colors automatically",
            "url": "https://multitoolsa.com/ai-photo-enhancer",
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
      <HreflangTags path="/ai-photo-enhancer" />

      <div className="min-h-screen bg-background flex flex-col">
        <Header />
        
        <main className="flex-1">
          {/* Hero Section */}
          <section className="py-10 md:py-16 bg-gradient-hero relative overflow-hidden">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/10 rounded-full blur-3xl" />
            
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
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/30 mb-6">
                  <Sparkles className="w-4 h-4 text-primary" />
                  <span className="text-sm font-medium text-primary">AI Powered Enhancement</span>
                </div>
                
                <h1 className="text-3xl md:text-5xl font-bold mb-4">
                  AI Photo Enhancer
                </h1>
                
                <p className="text-lg text-muted-foreground mb-8">
                  Transform ordinary photos into stunning, professional-quality images with our advanced AI technology. 
                  Improve sharpness, clarity, colors, and details automatically - completely free with 4K output.
                </p>
              </div>
            </div>
          </section>

          {/* Tool Section */}
          <section className="py-8 md:py-12 px-4">
            <div className="container mx-auto max-w-4xl">
              <AIPhotoEnhancer />
              
              {/* Ads below tool */}
              <AdBottom className="mt-6" />
              <AdVideo className="mt-4" />
            </div>
          </section>

          {/* Demo Comparison Section */}
          <section className="py-10 md:py-14 px-4 bg-secondary/30">
            <div className="container mx-auto max-w-lg">
              <div className="text-center mb-6">
                <h2 className="text-xl md:text-2xl font-bold mb-2">See the Enhancement</h2>
                <p className="text-sm text-muted-foreground">Drag the slider to compare</p>
              </div>
              
              <div className="bg-card rounded-xl border border-border overflow-hidden shadow-md">
                <ImageComparisonSlider
                  originalSrc={enhanceBefore}
                  compressedSrc={enhanceAfter}
                  originalLabel="Original"
                  compressedLabel="Enhanced"
                  className="w-full"
                />
              </div>
            </div>
          </section>

          {/* About Section */}
          <section className="py-12 md:py-16 px-4 bg-secondary/30">
            <div className="container mx-auto max-w-4xl">
              <h2 className="text-2xl md:text-4xl font-bold text-center mb-8">About AI Photo Enhancer</h2>
              
              <div className="prose prose-lg dark:prose-invert max-w-none space-y-6">
                <p>
                  Our AI Photo Enhancer is a cutting-edge tool designed to automatically improve the quality of your digital photographs using artificial intelligence. Whether you're working with smartphone photos, old scanned images, or photos taken in poor lighting conditions, our AI technology analyzes every pixel and applies intelligent enhancements to bring out the best in your images.
                </p>
                
                <p>
                  The technology behind our photo enhancer uses deep learning neural networks trained on millions of professional photographs. This training allows the AI to understand what makes a photo look great - from proper color balance and contrast to optimal sharpness and noise reduction. When you upload an image, the AI identifies areas that need improvement and applies corrections while preserving the natural look and feel of your photo.
                </p>
                
                <p>
                  Unlike simple filter apps that apply one-size-fits-all adjustments, our AI understands the context of different image elements. It knows to preserve skin tones in portraits, enhance details in landscapes, and maintain the atmosphere in low-light photos. This intelligent approach ensures that your enhanced photos look natural and professional, not over-processed or artificial.
                </p>
                
                <h3 className="text-xl font-semibold mt-8">Why Photo Enhancement Matters</h3>
                
                <p>
                  In today's visual-first world, image quality can make or break your online presence. Whether you're posting to social media, creating content for your business, or preserving family memories, high-quality photos leave a lasting impression. Poor lighting, camera shake, or low resolution can diminish the impact of even the most memorable moments.
                </p>
                
                <p>
                  Professional photo editing traditionally requires expensive software and years of experience. Our AI Photo Enhancer democratizes this process, giving everyone access to professional-grade image enhancement at the click of a button. You don't need to understand curves, levels, or color theory - our AI handles all the technical aspects while you enjoy the results.
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
                  { icon: Sparkles, title: "4K Quality Output", desc: "Upscale and enhance photos up to 4K resolution with crystal-clear details", color: "text-yellow-500", bg: "bg-yellow-500/10" },
                  { icon: Palette, title: "Vibrant Colors", desc: "Intelligent color correction that makes your photos pop with life", color: "text-pink-500", bg: "bg-pink-500/10" },
                  { icon: Eye, title: "Detail Enhancement", desc: "Sharpen fine details and textures while reducing noise", color: "text-blue-500", bg: "bg-blue-500/10" },
                  { icon: Zap, title: "Instant Processing", desc: "Get enhanced photos in seconds with no waiting", color: "text-green-500", bg: "bg-green-500/10" }
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
              <h2 className="text-2xl md:text-4xl font-bold text-center mb-10">How AI Photo Enhancement Works</h2>
              
              <div className="grid md:grid-cols-4 gap-8">
                {[
                  { step: "1", title: "Upload", desc: "Drag and drop or click to upload your photo in any format" },
                  { step: "2", title: "AI Analysis", desc: "Our AI analyzes your image and identifies areas for improvement" },
                  { step: "3", title: "Enhancement", desc: "Intelligent corrections are applied to sharpness, colors, and details" },
                  { step: "4", title: "Download", desc: "Download your enhanced 4K photo in your preferred format" }
                ].map((item, i) => (
                  <div key={i} className="text-center">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-r from-primary to-primary/60 text-primary-foreground font-bold text-xl flex items-center justify-center mx-auto mb-4">
                      {item.step}
                    </div>
                    <h3 className="font-semibold text-lg mb-2">{item.title}</h3>
                    <p className="text-sm text-muted-foreground">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Who Can Use */}
          <section className="py-12 md:py-16 px-4">
            <div className="container mx-auto max-w-5xl">
              <h2 className="text-2xl md:text-4xl font-bold text-center mb-10">Who Can Benefit</h2>
              
              <div className="grid md:grid-cols-3 gap-6">
                {[
                  { icon: Camera, title: "Photographers", desc: "Quickly enhance client photos or improve shots taken in challenging conditions without spending hours in editing software." },
                  { icon: Monitor, title: "Content Creators", desc: "Create stunning visuals for social media, blogs, and videos with professional-quality images that engage your audience." },
                  { icon: Star, title: "Businesses", desc: "Enhance product photos, marketing materials, and website images to present a polished, professional brand image." },
                  { icon: Image, title: "Everyday Users", desc: "Improve vacation photos, family pictures, and personal memories with just one click - no skills required." },
                  { icon: CheckCircle, title: "Real Estate", desc: "Make property photos look their best with enhanced lighting, colors, and sharpness to attract more buyers." },
                  { icon: Sparkles, title: "E-commerce", desc: "Create consistent, high-quality product images that build trust and increase conversions." }
                ].map((item, i) => (
                  <div key={i} className="bg-card rounded-xl p-6 border border-border">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                      <item.icon className="w-6 h-6 text-primary" />
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
              <h2 className="text-2xl md:text-4xl font-bold text-center mb-8">Why Choose Our AI Photo Enhancer</h2>
              
              <div className="prose prose-lg dark:prose-invert max-w-none">
                <p>
                  Compared to traditional photo editing methods that require expensive software subscriptions and years of experience, our AI Photo Enhancer offers instant, professional results with zero learning curve. While paid apps require downloads, subscriptions, and often add watermarks, our tool is completely free, works in your browser, and produces clean, watermark-free results.
                </p>
                
                <div className="grid md:grid-cols-2 gap-6 mt-8 not-prose">
                  {[
                    { title: "No Signup Required", desc: "Start enhancing photos immediately without creating an account" },
                    { title: "No Watermarks", desc: "Download clean, professional images without any branding" },
                    { title: "No App Download", desc: "Works directly in your browser on any device" },
                    { title: "Unlimited Use", desc: "Enhance as many photos as you want, completely free" },
                    { title: "Multiple Formats", desc: "Download in JPG, PNG, or WebP format" },
                    { title: "Adjustable Settings", desc: "Control quality presets and color saturation levels" }
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
                    Your privacy is our top priority. When you upload a photo to our AI Photo Enhancer, it is processed in real-time using secure, encrypted connections. We never store your images on our servers - once your enhanced photo is ready for download, the original and processed images are immediately deleted from our systems.
                  </p>
                  
                  <p>
                    We do not use your photos for AI training, share them with third parties, or retain any copies. Your images remain yours and yours alone. This commitment to privacy makes our tool safe for personal photos, confidential business materials, and any sensitive visual content you need to enhance.
                  </p>
                  
                  <ul className="mt-4">
                    <li>No image storage - files deleted immediately after processing</li>
                    <li>Encrypted data transfer using HTTPS</li>
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
                  <AccordionTrigger>Is AI Photo Enhancer really free?</AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    Yes! Our AI Photo Enhancer is completely free to use with no signup required. You can enhance unlimited photos without any watermarks or hidden fees. There are no premium tiers or subscription requirements.
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="2" className="bg-card border border-border rounded-xl px-6">
                  <AccordionTrigger>How does AI photo enhancement work?</AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    Our AI uses deep learning neural networks trained on millions of professional photographs. When you upload an image, the AI analyzes every pixel, identifies areas that need improvement (sharpness, color balance, lighting, noise), and applies intelligent corrections while preserving natural details and textures.
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="3" className="bg-card border border-border rounded-xl px-6">
                  <AccordionTrigger>What image formats are supported?</AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    We support all major image formats including JPG, JPEG, PNG, WebP, BMP, TIFF, and GIF. For output, you can download your enhanced photo in JPG, PNG, or WebP format depending on your needs.
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="4" className="bg-card border border-border rounded-xl px-6">
                  <AccordionTrigger>Will my photos be stored on your servers?</AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    No. Your photos are processed in real-time and immediately deleted after enhancement. We never store, share, or use your images for any purpose other than processing your request. Your privacy is fully protected.
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="5" className="bg-card border border-border rounded-xl px-6">
                  <AccordionTrigger>How is this different from paid apps?</AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    Unlike paid apps, our tool is completely free with no watermarks, no subscription required, and no app download needed. You get 4K quality output with adjustable saturation and quality settings. Everything works directly in your browser without any installation.
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="6" className="bg-card border border-border rounded-xl px-6">
                  <AccordionTrigger>What quality settings should I use?</AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    For most photos, "Premium" quality with "High" saturation works great. Use "Ultra" quality for important photos you want to print or display at large sizes. The saturation slider controls color vibrancy - use higher values for landscape and product photos, lower for portraits.
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="7" className="bg-card border border-border rounded-xl px-6">
                  <AccordionTrigger>Can I enhance old or damaged photos?</AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    Yes! Our AI is excellent at improving old, faded, or low-quality photos. For severely damaged photos with scratches or tears, we recommend using our AI Image Restorer tool first, then enhancing with this tool for the best results.
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="8" className="bg-card border border-border rounded-xl px-6">
                  <AccordionTrigger>Is there a file size limit?</AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    We recommend images up to 10MB for optimal processing speed. Larger files will still work but may take longer to process. Very high-resolution images (above 20MP) may be scaled before enhancement to ensure fast processing.
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="9" className="bg-card border border-border rounded-xl px-6">
                  <AccordionTrigger>Can I use enhanced photos commercially?</AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    Yes! Photos you enhance using our tool are yours to use however you wish, including for commercial purposes. Just ensure you have the rights to the original photo before enhancing and using it.
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="10" className="bg-card border border-border rounded-xl px-6">
                  <AccordionTrigger>Does the AI work on all types of photos?</AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    Our AI works well on most photo types including portraits, landscapes, product shots, food, architecture, and more. It's trained to recognize different image contexts and apply appropriate enhancements. Very stylized or heavily filtered images may see less improvement.
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
                <Link to="/ai-image-upscaler" className="bg-card rounded-xl p-6 border border-border hover:border-primary transition-colors">
                  <h3 className="font-semibold mb-2">AI Image Upscaler</h3>
                  <p className="text-sm text-muted-foreground">Increase resolution up to 4x without quality loss</p>
                </Link>
                <Link to="/ai-image-restorer" className="bg-card rounded-xl p-6 border border-border hover:border-primary transition-colors">
                  <h3 className="font-semibold mb-2">AI Image Restorer</h3>
                  <p className="text-sm text-muted-foreground">Repair old, damaged, or faded photos</p>
                </Link>
                <Link to="/ai-face-beautify" className="bg-card rounded-xl p-6 border border-border hover:border-primary transition-colors">
                  <h3 className="font-semibold mb-2">AI Face Beautify</h3>
                  <p className="text-sm text-muted-foreground">Enhance facial features naturally</p>
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

export default AIPhotoEnhancerPage;
