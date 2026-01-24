import { Helmet } from "react-helmet-async";
import CategoryPageLayout from "@/components/CategoryPageLayout";
import UniversalImageOptimization from "@/components/UniversalImageOptimization";
import { getCategoryBySlug } from "@/data/toolsData";
import { getCategorySEOContent } from "@/data/categorySEOData";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { CheckCircle, Shield, Zap, Gauge, Lock, Eye, Settings, TrendingDown } from "lucide-react";
import { AdVideo, AdInline, AdExoticFat } from "@/components/ads/AdContainer";

const ImageOptimizationPage = () => {
  const category = getCategoryBySlug("image-optimization")!;
  const seoContent = getCategorySEOContent("image-optimization")!;

  const faqs = [
    {
      question: "What is image optimization and why is it important?",
      answer: "Image optimization is the process of reducing file size while maintaining acceptable visual quality. It's crucial for faster website loading, better SEO rankings, reduced bandwidth costs, improved user experience on mobile devices, and more efficient storage usage."
    },
    {
      question: "What's the difference between lossy and lossless optimization?",
      answer: "Lossy optimization permanently removes some image data to achieve smaller file sizes, with slight quality reduction. Lossless optimization reduces file size without any quality loss by removing metadata and optimizing encoding. Our tool offers both options."
    },
    {
      question: "How much can I reduce my image file sizes?",
      answer: "Typical optimization can reduce file sizes by 40-80% depending on the original image and settings. Photographs often compress well with lossy methods, while graphics with flat colors benefit from lossless PNG optimization."
    },
    {
      question: "Will optimization affect my image quality?",
      answer: "With smart optimization settings, the quality difference is imperceptible to the human eye. Our tool lets you preview results before saving, so you can find the perfect balance between file size and quality for your needs."
    },
    {
      question: "What image formats can be optimized?",
      answer: "We optimize all major formats including JPEG (best for photos), PNG (best for graphics), WebP (excellent all-around), GIF (for animations), and TIFF. Each format has specific optimization techniques tailored to its characteristics."
    },
    {
      question: "Is image optimization the same as compression?",
      answer: "Compression is one technique within optimization. Full optimization includes compression plus metadata removal, color profile optimization, progressive encoding, and format-specific enhancements. Our tool applies all relevant techniques."
    },
    {
      question: "Can I optimize multiple images at once?",
      answer: "Yes, our batch processing feature lets you optimize multiple images with consistent settings, saving significant time when preparing large image collections for web use or storage."
    },
    {
      question: "Are my images kept private during optimization?",
      answer: "Absolutely. All optimization happens directly in your browser using client-side processing. Your images are never uploaded to any server, ensuring complete privacy and security."
    }
  ];

  return (
    <>
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            "name": "Free Online Image Optimizer",
            "description": "Optimize and compress images online for free. Reduce file size while maintaining quality for faster websites and better SEO.",
            "url": window.location.href,
            "applicationCategory": "MultimediaApplication",
            "operatingSystem": "Any",
            "offers": {
              "@type": "Offer",
              "price": "0",
              "priceCurrency": "USD"
            },
            "featureList": [
              "JPEG optimization",
              "PNG optimization",
              "WebP optimization",
              "Lossy compression",
              "Lossless compression",
              "Metadata removal",
              "Batch processing",
              "Client-side processing"
            ]
          })}
        </script>
      </Helmet>

      <CategoryPageLayout category={category} seoContent={seoContent}>
        <UniversalImageOptimization />
        {/* Video Ad - Below Tool Output */}
        <AdVideo className="mt-6" />

        {/* Comprehensive About Section - 1000+ words */}
        <section className="mt-16 space-y-8">
          <div className="prose prose-lg max-w-none dark:prose-invert">
            <h2 className="text-3xl font-bold text-foreground mb-6">About Our Free Online Image Optimization Tool</h2>
            
            <p className="text-muted-foreground leading-relaxed">
              Welcome to our comprehensive image optimization platform, the definitive solution for reducing image file sizes while preserving the visual quality that makes your photographs and graphics compelling. In today's performance-driven digital environment, where page load speed directly impacts user engagement, search engine rankings, and conversion rates, image optimization has evolved from a nice-to-have to an absolute necessity. Our free online tool brings enterprise-grade optimization technology to everyone, enabling photographers, web developers, content creators, e-commerce managers, and everyday users to dramatically improve their images' web performance without specialized software or technical expertise.
            </p>

            <p className="text-muted-foreground leading-relaxed">
              The importance of image optimization cannot be overstated in modern web development. Research consistently demonstrates that page load time is one of the most critical factors in user experience and business success. Every additional second of load time increases bounce rates, decreases page views, and reduces conversions. Images typically account for 50-70% of a webpage's total file size, making them the single most impactful optimization target. By optimizing your images effectively, you can achieve dramatic improvements in page speed that translate directly to better user engagement and higher search engine rankings.
            </p>

            <p className="text-muted-foreground leading-relaxed">
              Our optimization technology employs a sophisticated multi-layered approach that goes far beyond simple compression. The process begins with intelligent analysis of each image's characteristics – content type, color complexity, edge sharpness, gradient smoothness, and texture patterns. This analysis informs the selection of optimal encoding parameters specific to that particular image, rather than applying one-size-fits-all settings. The result is consistently superior optimization that maximizes size reduction while minimizing perceptible quality impact.
            </p>

            <p className="text-muted-foreground leading-relaxed">
              Understanding the distinction between lossy and lossless optimization is crucial for achieving optimal results. Lossy optimization permanently removes image data that human eyes are unlikely to notice, such as subtle color variations and fine details in complex areas. This approach can achieve dramatic file size reductions – often 60-80% – with quality differences that are imperceptible at normal viewing distances. Our intelligent algorithms focus compression on areas where it won't be noticed while preserving sharpness in critical regions like edges and text.
            </p>

            <p className="text-muted-foreground leading-relaxed">
              Lossless optimization reduces file size without discarding any image data. This is achieved through techniques like metadata removal, color palette optimization, more efficient encoding algorithms, and elimination of redundant information in the file structure. Lossless optimization typically achieves 10-40% size reduction depending on the original file's efficiency. For images where absolute quality preservation is essential – medical imaging, archival photography, legal documents – lossless optimization provides size benefits without any compromise.
            </p>

            <p className="text-muted-foreground leading-relaxed">
              Each image format has unique characteristics that require specialized optimization approaches. JPEG optimization focuses on quantization table refinement, progressive encoding for faster perceived loading, and chroma subsampling that exploits human color perception limitations. PNG optimization involves color palette reduction, filter selection optimization, and maximum zlib compression without quality loss. WebP optimization leverages this modern format's superior compression algorithms while maintaining compatibility with its unique features including transparency and animation support.
            </p>

            <p className="text-muted-foreground leading-relaxed">
              Metadata removal is often an overlooked component of image optimization that can significantly reduce file sizes. Digital images frequently contain extensive embedded metadata including EXIF data from cameras (shooting parameters, GPS location, device information), IPTC data (copyright, captions, keywords), XMP data (editing history, color profiles), and thumbnail images. This metadata can add substantial kilobytes to file sizes without contributing to the visible image. Our optimization tool offers the option to strip all metadata, preserving only the pixel data that viewers actually see.
            </p>

            <p className="text-muted-foreground leading-relaxed">
              Progressive encoding is another optimization technique that dramatically improves perceived performance. Rather than loading images top-to-bottom, progressive images load as an initially blurry complete image that becomes sharper as more data arrives. This means users see something meaningful almost immediately, even while the full image continues loading. Our tool applies progressive encoding where appropriate, improving the user experience for visitors with slower connections while maintaining full compatibility with all modern browsers.
            </p>

            <p className="text-muted-foreground leading-relaxed">
              The real-time preview system in our tool shows you exactly how optimized images will look before you commit to downloading. Compare original and optimized versions side by side, examine details at various zoom levels, and make informed decisions about the tradeoff between size and quality for your specific use case. This visual feedback eliminates guesswork and ensures you achieve exactly the results you need.
            </p>

            <p className="text-muted-foreground leading-relaxed">
              Privacy and security are fundamental to our architecture. Every optimization operation occurs entirely within your web browser using client-side JavaScript processing. Your images are never uploaded to any server, stored in any cloud, or transmitted to any third party. This local processing approach not only protects your privacy but also enables faster operation since there's no upload/download latency – optimization happens instantly regardless of image size or internet connection speed.
            </p>

            <p className="text-muted-foreground leading-relaxed">
              For professionals managing large image libraries, our batch processing capability optimizes multiple images with consistent settings in a single operation. This workflow efficiency is invaluable for e-commerce sites with extensive product catalogs, photography portfolios, content-heavy websites, and any situation requiring consistent optimization across many images. Batch processing maintains quality standards across all images while dramatically reducing the time required for optimization work.
            </p>

            <p className="text-muted-foreground leading-relaxed">
              Beyond individual website performance, properly optimized images contribute to broader sustainability goals. Smaller file sizes require less energy to transmit, store, and display. When multiplied across billions of images served daily on the internet, even modest per-image savings aggregate into significant reductions in data center energy consumption and associated carbon emissions. By optimizing your images, you're not just improving your website – you're contributing to a more sustainable digital ecosystem.
            </p>
          </div>
        </section>

        {/* How to Use Section */}
        <section className="mt-12 space-y-6">
          <h2 className="text-3xl font-bold text-foreground">How to Optimize Your Images</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { step: "1", title: "Upload Images", desc: "Drag and drop your images or click to browse. We support JPEG, PNG, WebP, GIF, and TIFF formats." },
              { step: "2", title: "Choose Settings", desc: "Select optimization level (lossy/lossless) and quality settings. Preview changes in real-time." },
              { step: "3", title: "Optimize", desc: "Click optimize and watch file sizes shrink. Compare original vs optimized quality side by side." },
              { step: "4", title: "Download", desc: "Download your optimized images with dramatically reduced file sizes and maintained quality." }
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
          <h2 className="text-3xl font-bold text-foreground">Why Optimize Your Images?</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              { icon: Gauge, title: "Faster Page Load Times", desc: "Optimized images load faster, improving user experience and reducing bounce rates significantly." },
              { icon: TrendingDown, title: "Massive Size Reduction", desc: "Achieve 40-80% file size reduction while maintaining visual quality that's imperceptible to viewers." },
              { icon: Settings, title: "Smart Optimization", desc: "Intelligent algorithms analyze each image to apply optimal compression without visible quality loss." },
              { icon: Zap, title: "Instant Processing", desc: "Browser-based processing means no upload delays. Optimize images instantly on your device." },
              { icon: Eye, title: "Visual Comparison", desc: "Compare original and optimized images side by side to verify quality before downloading." },
              { icon: Shield, title: "Complete Privacy", desc: "Images never leave your device. All optimization happens locally in your browser." }
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
          <h2 className="text-3xl font-bold text-foreground">Key Benefits of Image Optimization</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              "Improved SEO rankings",
              "Better Core Web Vitals",
              "Reduced bandwidth costs",
              "Faster mobile experience",
              "Lower storage requirements",
              "Improved conversion rates",
              "Better email deliverability",
              "Faster social media uploads",
              "Reduced environmental impact"
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
                <h3 className="text-xl font-semibold text-foreground mb-2">Your Images Stay Private</h3>
                <p className="text-muted-foreground">
                  Your privacy matters. Our image optimization tool operates entirely within your web browser using client-side JavaScript technology. Your images are processed locally on your device and never uploaded to any external server or cloud service.
                </p>
              </div>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              {[
                { title: "Zero Server Uploads", desc: "All optimization happens 100% locally in your browser. No image data is transmitted." },
                { title: "No Data Collection", desc: "We don't track, store, or analyze any information about your images or activities." },
                { title: "No Account Required", desc: "Use our optimization tool freely without registration, login, or personal information." },
                { title: "Automatic Cleanup", desc: "When you close the browser tab, all processed images are automatically cleared from memory." }
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

export default ImageOptimizationPage;
