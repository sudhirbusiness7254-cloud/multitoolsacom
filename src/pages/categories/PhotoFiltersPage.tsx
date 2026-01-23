import { Helmet } from "react-helmet-async";
import CategoryPageLayout from "@/components/CategoryPageLayout";
import UniversalPhotoFilters from "@/components/UniversalPhotoFilters";
import { getCategoryBySlug } from "@/data/toolsData";
import { getCategorySEOContent } from "@/data/categorySEOData";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { CheckCircle, Shield, Zap, Sparkles, Lock, Eye, Settings, Palette } from "lucide-react";
import { AdVideo, AdInline } from "@/components/ads/AdContainer";

const PhotoFiltersPage = () => {
  const category = getCategoryBySlug("photo-filters")!;
  const seoContent = getCategorySEOContent("photo-filters")!;

  const faqs = [
    {
      question: "What types of photo filters are available?",
      answer: "We offer a wide range of filters including vintage/retro styles, black & white conversions, warm and cool tone adjustments, dramatic contrast effects, soft and dreamy looks, cinematic color grades, and artistic stylizations. Each filter can be adjusted in intensity."
    },
    {
      question: "Can I adjust the filter intensity?",
      answer: "Yes! Every filter has adjustable intensity from subtle (10-30%) to full strength (100%). This lets you find the perfect balance between the original image and the filtered effect. Preview changes in real-time as you adjust."
    },
    {
      question: "Can I combine multiple filters?",
      answer: "Our tool applies one filter at a time for optimal quality and predictable results. However, you can download a filtered image and upload it again to apply additional effects, building complex looks layer by layer."
    },
    {
      question: "What's the difference between filters and adjustments?",
      answer: "Filters apply preset combinations of color, contrast, and tone changes for specific looks (like 'vintage' or 'cinematic'). Adjustments let you manually control individual parameters like brightness, contrast, saturation, and exposure."
    },
    {
      question: "Will filters reduce my image quality?",
      answer: "Our filters are applied using high-quality algorithms that preserve image detail. While some filters intentionally add grain or soft effects, the underlying image quality is maintained. You can also choose output quality settings."
    },
    {
      question: "What image formats are supported?",
      answer: "We support all major image formats including JPEG, PNG, WebP, GIF, and TIFF. Your filtered image can be saved in the same format or converted to optimize for your intended use."
    },
    {
      question: "Can I preview filters before applying?",
      answer: "Absolutely! Our real-time preview shows exactly how each filter will look on your specific image before you commit. Browse through filters and adjust intensity to find the perfect look."
    },
    {
      question: "Are my images kept private during filtering?",
      answer: "Yes, completely. All filter processing happens directly in your browser using client-side technology. Your images are never uploaded to any server, ensuring complete privacy for your photos."
    }
  ];

  return (
    <>
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            "name": "Free Online Photo Filters",
            "description": "Apply beautiful photo filters online for free. Vintage, black & white, cinematic, and artistic effects with adjustable intensity.",
            "url": window.location.href,
            "applicationCategory": "MultimediaApplication",
            "operatingSystem": "Any",
            "offers": {
              "@type": "Offer",
              "price": "0",
              "priceCurrency": "USD"
            },
            "featureList": [
              "Vintage filters",
              "Black & white conversion",
              "Cinematic color grades",
              "Adjustable intensity",
              "Real-time preview",
              "Client-side processing"
            ]
          })}
        </script>
      </Helmet>

      <CategoryPageLayout category={category} seoContent={seoContent}>
        <UniversalPhotoFilters />
        {/* Video Ad - Below Tool Output */}
        <AdVideo className="mt-6" />

        {/* Comprehensive About Section - 1000+ words */}
        <section className="mt-16 space-y-8">
          <div className="prose prose-lg max-w-none dark:prose-invert">
            <h2 className="text-3xl font-bold text-foreground mb-6">About Our Free Online Photo Filters</h2>
            
            <p className="text-muted-foreground leading-relaxed">
              Welcome to our comprehensive photo filter collection, designed to transform your ordinary images into extraordinary visual statements. Whether you're seeking the warm nostalgia of vintage aesthetics, the timeless elegance of black and white photography, the dramatic impact of cinematic color grading, or the ethereal beauty of dreamy soft effects, our free online photo filter tool provides professional-quality transformations with just a few clicks. With adjustable intensity controls, real-time previews, and a curated selection of stunning filter presets, creating beautiful, stylized imagery has never been more accessible.
            </p>

            <p className="text-muted-foreground leading-relaxed">
              Photo filters have become an integral part of modern visual culture, shaping how we perceive and present imagery across social media, professional portfolios, marketing materials, and personal memories. What began as technical processes in darkrooms and professional editing suites has evolved into accessible creative tools that anyone can use. Our filter collection brings this creative power to your browser, offering the same types of color grading and stylization techniques used by professional photographers and filmmakers, adapted for instant, intuitive application.
            </p>

            <p className="text-muted-foreground leading-relaxed">
              Our vintage and retro filter collection captures the distinctive looks of different photographic eras. Warm, faded tones reminiscent of 1970s photography. Cross-processed effects that recall experimental film techniques. Polaroid-style color shifts with soft vignettes. Sepia tones that evoke antique photographs. Each vintage filter is carefully designed to replicate authentic period aesthetics while remaining flexible through intensity adjustment. Whether you're creating content with nostalgic appeal or giving modern subjects a timeless quality, these filters provide instant period-appropriate styling.
            </p>

            <p className="text-muted-foreground leading-relaxed">
              Black and white conversion is one of the most powerful creative transformations available to photographers, and our tool provides multiple approaches to monochrome imagery. Simple desaturation for quick conversions. High-contrast dramatic black and white for bold statements. Soft, low-contrast conversions for dreamy, artistic effects. Film-emulation conversions that replicate the tonal characteristics of classic black and white films. Each approach serves different aesthetic goals, and our adjustable intensity lets you dial in partial desaturation for subtle effects or full monochrome for maximum impact.
            </p>

            <p className="text-muted-foreground leading-relaxed">
              Cinematic color grading filters bring Hollywood-quality color science to your photographs. Teal and orange grades that dominate modern blockbuster cinematography. Desaturated, gritty looks for dramatic realism. High-saturation, punchy treatments for dynamic energy. Muted, pastel palettes for indie film aesthetics. These filters apply the same color grading principles used in professional film post-production, transforming ordinary photos into frames worthy of the silver screen. Perfect for storytelling imagery, portrait work, or any photo that needs cinematic impact.
            </p>

            <p className="text-muted-foreground leading-relaxed">
              Warm and cool tone adjustments address one of photography's fundamental creative choices: color temperature. Warm filters add golden, sunset-like tones that feel cozy, inviting, and romantic. Cool filters introduce blue undertones that feel calm, professional, or dramatically moody depending on intensity. These tone adjustments go beyond simple white balance correction, creatively shifting color palettes to evoke specific emotional responses. Use warm tones for portraits and lifestyle imagery, cool tones for corporate and technological subjects.
            </p>

            <p className="text-muted-foreground leading-relaxed">
              Soft and dreamy filters create ethereal, romantic imagery that feels delicate and otherworldly. Gentle bloom effects that soften highlights. Reduced contrast for airy, light-filled looks. Subtle color shifts toward pastels. These filters are beloved for portrait photography, wedding imagery, fine art photography, and any context where a gentle, beautiful aesthetic is desired. Adjustable intensity prevents over-processing, letting you achieve subtle softening or full dream-like transformation.
            </p>

            <p className="text-muted-foreground leading-relaxed">
              High-contrast and dramatic filters push images toward bold, striking presentations. Deep shadows and bright highlights create dynamic tension. Enhanced clarity and texture make subjects pop. Selective color saturation draws attention to key elements. These filters demand attention and make strong visual statements, ideal for sports photography, street photography, dramatic portraits, and any imagery meant to convey power and intensity.
            </p>

            <p className="text-muted-foreground leading-relaxed">
              The adjustable intensity feature is central to effective filter use. Most images don't benefit from filters at 100% strength – the sweet spot often lies in subtler applications that enhance without overwhelming. Our intensity slider lets you find exactly the right balance for each specific image, from barely perceptible enhancements that polish without altering the fundamental character, to full-strength applications that completely transform the visual identity. Real-time preview ensures you see exactly what you're getting before committing.
            </p>

            <p className="text-muted-foreground leading-relaxed">
              Understanding when and how to use filters elevates their effectiveness. Consider the mood you want to convey, the context where the image will be seen, and the subjects within the frame. Vintage filters suit nostalgic content and period-appropriate subjects. Cinematic grades elevate narrative imagery. Black and white emphasizes form, texture, and emotion over color. Matching filter choice to content purpose produces professional results that feel intentional rather than arbitrary.
            </p>

            <p className="text-muted-foreground leading-relaxed">
              Privacy and security are built into our filter tool's foundation. Every filtering operation occurs entirely within your web browser using client-side JavaScript processing. Your images are never uploaded to any server, stored in any cloud, or accessible to any third party. This local processing approach provides absolute assurance that your photos remain completely private throughout the creative process, whether you're filtering personal memories or client work.
            </p>

            <p className="text-muted-foreground leading-relaxed">
              Our tool supports all major image formats including JPEG, PNG, WebP, GIF, and TIFF. Quality preservation is prioritized throughout the filtering process, with algorithms designed to maintain image detail while applying creative transformations. Adjustable output quality settings let you balance file size with visual fidelity based on your intended use – maximum quality for printing, optimized for web delivery.
            </p>
          </div>
        </section>

        {/* How to Use Section */}
        <section className="mt-12 space-y-6">
          <h2 className="text-3xl font-bold text-foreground">How to Apply Photo Filters</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { step: "1", title: "Upload Image", desc: "Drag and drop your photo or click to browse. We support JPEG, PNG, WebP, GIF, and TIFF formats." },
              { step: "2", title: "Browse Filters", desc: "Explore our curated collection of vintage, cinematic, B&W, and artistic filters with real-time preview." },
              { step: "3", title: "Adjust Intensity", desc: "Use the intensity slider to find the perfect balance from subtle enhancement to dramatic transformation." },
              { step: "4", title: "Download", desc: "Save your filtered image in your preferred format and quality. Original image quality is preserved." }
            ].map((item) => (
              <div key={item.step} className="bg-card border border-border rounded-xl p-6 text-center">
                <div className="w-12 h-12 bg-primary/10 text-primary rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                  {item.step}
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">{item.title}</h3>
                <p className="text-muted-foreground text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Why Use Section */}
        <section className="mt-12 space-y-6">
          <h2 className="text-3xl font-bold text-foreground">Why Use Our Photo Filters?</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              { icon: Sparkles, title: "Curated Filter Collection", desc: "Professional-quality vintage, cinematic, B&W, and artistic filters designed for stunning results." },
              { icon: Palette, title: "Adjustable Intensity", desc: "Fine-tune every filter from subtle enhancement to dramatic transformation. Find your perfect look." },
              { icon: Eye, title: "Real-Time Preview", desc: "See exactly how filters affect your specific image before committing. No guesswork needed." },
              { icon: Zap, title: "Instant Processing", desc: "Browser-based processing means instant results. Apply and preview filters in milliseconds." },
              { icon: Settings, title: "Quality Preservation", desc: "High-quality algorithms maintain image detail while applying creative transformations." },
              { icon: Shield, title: "Complete Privacy", desc: "Images never leave your device. All filtering happens locally in your browser." }
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
          <h2 className="text-3xl font-bold text-foreground">Key Benefits of Photo Filters</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              "Create consistent visual branding",
              "Enhance mood and emotion",
              "Transform ordinary to extraordinary",
              "Match content to context",
              "Professional-looking results",
              "Instant creative transformation",
              "Perfect for social media",
              "Express artistic vision",
              "Elevate photo presentations"
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
                <h3 className="text-xl font-semibold text-foreground mb-2">Your Photos Remain Private</h3>
                <p className="text-muted-foreground">
                  Your photos are personal creative work, and we respect that completely. Our photo filter tool operates entirely within your web browser using client-side JavaScript technology. Your images are processed locally and never uploaded to any external server.
                </p>
              </div>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              {[
                { title: "100% Local Processing", desc: "All filter effects are applied in your browser. Zero data transmission to servers." },
                { title: "No Data Collection", desc: "We don't track, store, or analyze any information about your photos or filter choices." },
                { title: "No Account Required", desc: "Use our filter tool freely without registration, login, or personal information." },
                { title: "Automatic Cleanup", desc: "When you close the browser tab, all processed images are automatically cleared." }
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

export default PhotoFiltersPage;
