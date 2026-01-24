import { Helmet } from "react-helmet-async";
import CategoryPageLayout from "@/components/CategoryPageLayout";
import UniversalWatermark from "@/components/UniversalWatermark";
import HowToUseGuide from "@/components/HowToUseGuide";
import { getCategoryBySlug } from "@/data/toolsData";
import { getCategorySEOContent } from "@/data/categorySEOData";
import { getToolGuideData } from "@/data/toolGuideData";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { CheckCircle, Shield, Zap, Image, Lock, Eye, Settings, Copyright } from "lucide-react";
import { AdVideo, AdInline, AdExoticFat } from "@/components/ads/AdContainer";

const WatermarkToolsPage = () => {
  const category = getCategoryBySlug("watermark-tools")!;
  const seoContent = getCategorySEOContent("watermark-tools")!;
  const guideData = getToolGuideData("watermark-tools");

  const faqs = [
    {
      question: "What is a watermark and why should I use one?",
      answer: "A watermark is a visible overlay on an image that identifies ownership, brand, or copyright. Watermarks protect your images from unauthorized use, promote your brand when images are shared, establish ownership in case of disputes, and deter image theft. They're essential for photographers, designers, and content creators."
    },
    {
      question: "What types of watermarks can I add?",
      answer: "Our tool supports both text and image watermarks. Text watermarks are perfect for copyright notices, photographer names, or brand names. Image watermarks allow you to add logos, signatures, or any custom graphic. You can also combine both types for comprehensive branding."
    },
    {
      question: "Can I customize the watermark appearance?",
      answer: "Absolutely! You have complete control over watermark appearance including font style, size, color, and opacity for text watermarks. For image watermarks, you can adjust size, opacity, and positioning. Both types offer rotation options and precise placement controls."
    },
    {
      question: "Where should I position my watermark?",
      answer: "Strategic watermark placement depends on your goals. Corner placements are subtle but may be cropped out. Center placement is more protective but can obstruct the image. Diagonal or tiled watermarks offer maximum protection. Our tool offers preset positions and custom placement options."
    },
    {
      question: "What opacity should I use for watermarks?",
      answer: "The ideal opacity depends on your purpose. For subtle branding, 20-40% opacity keeps watermarks visible without being distracting. For stronger copyright protection, 50-70% opacity makes watermarks harder to remove. Preview different settings to find the right balance for your needs."
    },
    {
      question: "Can I add watermarks to multiple images at once?",
      answer: "Yes, our batch processing feature allows you to apply the same watermark settings to multiple images simultaneously. This is perfect for processing photo collections, product catalogs, or any situation where consistent watermarking is needed across many images."
    },
    {
      question: "Will adding a watermark reduce my image quality?",
      answer: "Our watermarking tool is designed to preserve image quality. The watermark is applied with high-quality compositing algorithms that blend seamlessly with your image. You can also choose output quality settings to balance file size with visual quality."
    },
    {
      question: "Are my images kept private when adding watermarks?",
      answer: "Yes, completely. All watermark processing happens directly in your browser using client-side technology. Your images and watermark designs are never uploaded to any server, ensuring complete privacy and security for your creative work."
    }
  ];

  return (
    <>
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            "name": "Free Online Watermark Tool",
            "description": "Add text or image watermarks to your photos online for free. Protect your images with customizable watermarks using our browser-based tool.",
            "url": window.location.href,
            "applicationCategory": "MultimediaApplication",
            "operatingSystem": "Any",
            "offers": {
              "@type": "Offer",
              "price": "0",
              "priceCurrency": "USD"
            },
            "featureList": [
              "Text watermarks",
              "Image/logo watermarks",
              "Custom positioning",
              "Adjustable opacity",
              "Multiple font options",
              "Batch processing",
              "Client-side processing"
            ]
          })}
        </script>
      </Helmet>

      <CategoryPageLayout category={category} seoContent={seoContent}>
        <UniversalWatermark />
        {/* ExoticFat Ads - Primary Monetization */}
        <AdExoticFat className="mt-6" />
        <AdExoticFat className="mt-4" />
        {/* Video Ad - Below Tool Output */}
        <AdVideo className="mt-4" />

        {/* Comprehensive About Section - 1000+ words */}
        <section className="mt-16 space-y-8">
          <div className="prose prose-lg max-w-none dark:prose-invert">
            <h2 className="text-3xl font-bold text-foreground mb-6">About Our Free Online Watermark Tool</h2>
            
            <p className="text-muted-foreground leading-relaxed">
              Welcome to our comprehensive, professional-grade watermarking solution designed to protect, brand, and authenticate your digital images with ease and precision. In an age where visual content travels instantly across the globe through social media, websites, and digital communications, protecting your creative work from unauthorized use while simultaneously building brand recognition has never been more critical. Our free online watermark tool empowers photographers, graphic designers, content creators, businesses, and individuals to add customizable text and image watermarks to their photos, establishing ownership and enhancing professional presentation.
            </p>

            <p className="text-muted-foreground leading-relaxed">
              The practice of watermarking dates back centuries to papermakers who embedded identifying marks into their products, and this tradition continues in the digital age with enhanced capabilities and purposes. Modern digital watermarking serves multiple essential functions: copyright protection that deters unauthorized use and establishes ownership, brand promotion that builds recognition as images spread across platforms, professional presentation that signals quality and authenticity, and legal documentation that provides evidence of ownership in case of disputes. Our tool addresses all these needs with a flexible, intuitive interface that puts professional watermarking capabilities in everyone's hands.
            </p>

            <p className="text-muted-foreground leading-relaxed">
              Our watermark tool offers two primary watermark types, each with extensive customization options. Text watermarks are perfect for adding copyright notices, photographer names, website URLs, dates, or any custom text directly onto your images. You have complete control over typography with a wide selection of fonts ranging from elegant scripts to bold sans-serifs, ensuring your watermark matches your brand aesthetic. Font size, color, and style options let you create watermarks that range from subtle and professional to bold and unmistakable.
            </p>

            <p className="text-muted-foreground leading-relaxed">
              Image watermarks open up even more branding possibilities, allowing you to overlay your logo, signature, or any custom graphic onto your photos. This is particularly valuable for businesses and professional photographers who want consistent brand presence across all their visual content. Whether you're using a transparent PNG logo, a stylized signature, or a custom design element, our tool handles various image formats and applies them with precision. You can scale your watermark image to any size, adjust its opacity for the perfect blend, and position it exactly where you want it.
            </p>

            <p className="text-muted-foreground leading-relaxed">
              Positioning your watermark strategically is crucial for balancing visibility with image aesthetics. Our tool offers preset positions including all four corners, center, and edge placements, making it easy to apply consistent watermark positioning across multiple images. For users who need more control, custom positioning allows you to place watermarks at exact pixel coordinates or percentage positions within the image. The visual preview updates in real-time, showing exactly how your watermark will appear before you commit to the final output.
            </p>

            <p className="text-muted-foreground leading-relaxed">
              Opacity control is one of the most important aspects of effective watermarking, and our tool gives you precise control over this parameter. A watermark that's too prominent can distract from the image and reduce its aesthetic appeal, while one that's too subtle may be easily removed or overlooked. Our opacity slider lets you find the perfect balance for your specific use case – subtle and professional for portfolio presentation, or bold and protective for preview images that you want to protect from unauthorized use.
            </p>

            <p className="text-muted-foreground leading-relaxed">
              For photographers and businesses processing large volumes of images, our batch watermarking capability is a game-changing productivity feature. Instead of applying watermarks to images one by one, you can upload multiple files and apply consistent watermark settings across all of them in a single operation. This workflow optimization can save hours of tedious repetitive work, particularly valuable for event photographers processing hundreds of photos, e-commerce businesses watermarking product catalogs, or social media managers preparing content batches.
            </p>

            <p className="text-muted-foreground leading-relaxed">
              The technical implementation of our watermarking tool employs high-quality compositing algorithms that blend watermarks seamlessly with underlying images. Unlike basic overlay methods that can produce harsh edges or color artifacts, our approach considers transparency, color blending modes, and anti-aliasing to produce professional results that look like integrated design elements rather than awkward additions. This attention to quality ensures your watermarked images maintain their professional appearance.
            </p>

            <p className="text-muted-foreground leading-relaxed">
              Privacy and security are fundamental to our design philosophy, especially important when dealing with creative work before it's ready for public release. Every watermarking operation occurs entirely within your web browser using advanced client-side JavaScript processing. This means your original images, your watermark designs, and your final outputs never leave your device – they're not uploaded to any server, stored in any cloud, or accessible to anyone but you. This local processing approach provides absolute privacy for your creative work.
            </p>

            <p className="text-muted-foreground leading-relaxed">
              Our tool supports all major image formats including JPEG, PNG, WebP, GIF, and TIFF, automatically handling format-specific considerations like transparency preservation in PNG files. Output quality is fully adjustable, letting you balance file size with image quality based on your intended use – higher quality for portfolio presentation, optimized for web delivery, or balanced for general sharing. The flexibility ensures your watermarked images are ready for their specific destination.
            </p>

            <p className="text-muted-foreground leading-relaxed">
              For professional photographers and studios, consistent watermarking is part of establishing a recognizable brand identity. When your watermarked images are shared across social media, embedded in blog posts, or displayed in various contexts, they carry your brand with them. Over time, this consistent branding builds recognition and associates your name with quality work. Our tool makes it easy to maintain this consistency with saveable presets and intuitive controls that streamline your watermarking workflow.
            </p>

            <p className="text-muted-foreground leading-relaxed">
              Beyond simple protection, strategic watermarking can actually enhance the perceived value of your work. A tastefully applied watermark signals professionalism and ownership, distinguishing your images from anonymous content. It tells viewers that this is work worth protecting, created by someone who takes their craft seriously. Whether you're building a photography business, promoting your design services, or simply protecting personal creative work, our watermark tool provides the capabilities you need to present and protect your images professionally.
            </p>
          </div>
        </section>

        {/* How to Use Guide with 4K Screenshots */}
        {guideData && (
          <section className="mt-12">
            <HowToUseGuide 
              guideData={guideData}
              toolName="Watermark Tool"
              gradientFrom="#f59e0b"
              gradientTo="#d97706"
            />
          </section>
        )}

        {/* Why Use Section */}
        <section className="mt-12 space-y-6">
          <h2 className="text-3xl font-bold text-foreground">Why Use Our Watermark Tool?</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              { icon: Copyright, title: "Protect Your Copyright", desc: "Establish clear ownership of your images with visible watermarks that deter unauthorized use and theft." },
              { icon: Image, title: "Text & Image Watermarks", desc: "Choose text watermarks for copyright notices or image watermarks for logos and branding elements." },
              { icon: Settings, title: "Full Customization", desc: "Complete control over fonts, colors, sizes, opacity, positioning, and rotation for perfect watermarks." },
              { icon: Zap, title: "Instant Processing", desc: "Browser-based processing means no upload delays. Apply watermarks instantly to any image." },
              { icon: Eye, title: "Real-Time Preview", desc: "See exactly how your watermark looks before downloading. Adjust settings with immediate visual feedback." },
              { icon: Shield, title: "Complete Privacy", desc: "Images never leave your device. All processing happens locally in your browser for total security." }
            ].map((item, index) => (
              <div key={index} className="flex gap-4 p-6 bg-card border border-border rounded-xl">
                <div className="flex-shrink-0">
                  <item.icon className="w-8 h-8 text-primary" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">{item.title}</h3>
                  <p className="text-muted-foreground">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Key Benefits Section */}
        <section className="mt-12 space-y-6">
          <h2 className="text-3xl font-bold text-foreground">Key Benefits of Watermarking</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              "Protect images from theft",
              "Build brand recognition",
              "Establish copyright ownership",
              "Professional presentation",
              "Deter unauthorized use",
              "Promote your work",
              "Legal protection evidence",
              "Consistent branding",
              "Batch process efficiency"
            ].map((benefit, index) => (
              <div key={index} className="flex items-center gap-3 p-4 bg-card border border-border rounded-lg">
                <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                <span className="text-foreground">{benefit}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Privacy & Security Section */}
        <section className="mt-12 space-y-6">
          <h2 className="text-3xl font-bold text-foreground">Privacy & Security Guarantee</h2>
          <div className="bg-card border border-border rounded-xl p-8">
            <div className="flex items-start gap-4 mb-6">
              <Lock className="w-10 h-10 text-primary flex-shrink-0" />
              <div>
                <h3 className="text-xl font-semibold text-foreground mb-2">Your Images Remain Private</h3>
                <p className="text-muted-foreground">
                  We understand that images awaiting watermarking are often sensitive creative work that hasn't been publicly released. Our watermark tool operates entirely within your web browser using client-side JavaScript technology. Your original images, watermark designs, and final outputs are processed locally and never uploaded to any server.
                </p>
              </div>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              {[
                { title: "100% Local Processing", desc: "All watermarking happens in your browser. Zero data transmission to any external servers." },
                { title: "No Data Collection", desc: "We don't track, collect, or analyze any information about your images or watermark activities." },
                { title: "No Account Required", desc: "Use our watermark tool freely without registration, login, or sharing personal information." },
                { title: "Automatic Memory Cleanup", desc: "When you close the browser tab, all processed images are automatically cleared from memory." }
              ].map((item, index) => (
                <div key={index} className="flex items-start gap-3">
                  <Shield className="w-5 h-5 text-green-500 flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-semibold text-foreground">{item.title}</h4>
                    <p className="text-muted-foreground text-sm">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="mt-12 space-y-6">
          <h2 className="text-3xl font-bold text-foreground">Frequently Asked Questions</h2>
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`} className="border border-border rounded-lg mb-3 px-4">
                <AccordionTrigger className="text-left text-foreground hover:no-underline">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </section>
      </CategoryPageLayout>
    </>
  );
};

export default WatermarkToolsPage;
