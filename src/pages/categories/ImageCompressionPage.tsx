import { Helmet } from "react-helmet-async";
import CategoryPageLayout from "@/components/CategoryPageLayout";
import UniversalImageCompressor from "@/components/UniversalImageCompressor";
import { getCategoryBySlug } from "@/data/toolsData";
import { getCategorySEOContent } from "@/data/categorySEOData";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { CheckCircle, Shield, Zap, FileDown, Lock, Eye, Settings, HardDrive } from "lucide-react";

const ImageCompressionPage = () => {
  const category = getCategoryBySlug("image-compression")!;
  const seoContent = getCategorySEOContent("image-compression")!;

  const faqs = [
    {
      question: "What is image compression and why is it important?",
      answer: "Image compression is the process of reducing the file size of an image while maintaining acceptable visual quality. It's crucial for faster website loading times, reduced storage costs, improved email deliverability, and better user experience on mobile devices with limited bandwidth."
    },
    {
      question: "What's the difference between lossy and lossless compression?",
      answer: "Lossy compression permanently removes some image data to achieve smaller file sizes, resulting in slight quality loss. Lossless compression reduces file size without losing any image data, preserving original quality. Our tool offers adjustable quality settings to balance between size and quality based on your needs."
    },
    {
      question: "Which image formats can I compress?",
      answer: "Our universal image compressor supports all major formats including JPEG, PNG, WebP, GIF, and TIFF. Each format has different compression characteristics - JPEG is best for photographs, PNG for graphics with transparency, WebP for web optimization, and GIF for simple animations."
    },
    {
      question: "How much can I reduce my image file size?",
      answer: "Typical compression ratios range from 40% to 90% file size reduction depending on the original image, format, and quality settings. Photographs with lots of detail often compress better than graphics with sharp edges. Our tool shows you real-time size comparisons."
    },
    {
      question: "Will compressing my images affect their quality?",
      answer: "The level of quality loss depends on your compression settings. With our adjustable quality slider, you can find the perfect balance between file size and visual quality. At higher quality settings (70-90%), most images show no visible difference to the human eye."
    },
    {
      question: "Is my data safe when I compress images here?",
      answer: "Absolutely. All image compression happens directly in your browser using client-side JavaScript. Your images are never uploaded to any server, ensuring complete privacy and security. Once you close the browser tab, all processed images are automatically removed from memory."
    },
    {
      question: "Can I compress multiple images at once?",
      answer: "Yes, our tool supports batch processing. You can upload multiple images and compress them all with the same quality settings, saving you significant time when optimizing large collections of images."
    },
    {
      question: "What quality setting should I use for web images?",
      answer: "For web images, we recommend a quality setting between 70-85%. This typically provides an excellent balance of small file size and good visual quality. For hero images or important visuals, you might want to use 85-90% quality."
    }
  ];

  return (
    <>
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            "name": "Free Online Image Compressor",
            "description": "Compress JPEG, PNG, WebP, GIF, and TIFF images online for free. Reduce file size while maintaining quality with our browser-based compression tool.",
            "url": window.location.href,
            "applicationCategory": "MultimediaApplication",
            "operatingSystem": "Any",
            "offers": {
              "@type": "Offer",
              "price": "0",
              "priceCurrency": "USD"
            },
            "featureList": [
              "JPEG compression",
              "PNG compression",
              "WebP compression",
              "GIF compression",
              "TIFF compression",
              "Adjustable quality settings",
              "Batch processing",
              "Client-side processing"
            ]
          })}
        </script>
      </Helmet>

      <CategoryPageLayout category={category} seoContent={seoContent}>
        <UniversalImageCompressor />

        {/* Comprehensive About Section - 1000+ words */}
        <section className="mt-16 space-y-8">
          <div className="prose prose-lg max-w-none dark:prose-invert">
            <h2 className="text-3xl font-bold text-foreground mb-6">About Our Free Online Image Compressor</h2>
            
            <p className="text-muted-foreground leading-relaxed">
              Welcome to our comprehensive, professional-grade image compression tool that empowers users to dramatically reduce image file sizes while preserving exceptional visual quality. In today's digital landscape, where website performance, storage efficiency, and bandwidth optimization are paramount concerns, our free online image compressor stands as an indispensable solution for photographers, web developers, digital marketers, content creators, and everyday users who need to optimize their visual content without compromising on quality.
            </p>

            <p className="text-muted-foreground leading-relaxed">
              Our advanced image compression technology leverages sophisticated algorithms that analyze each image's unique characteristics to determine the optimal compression strategy. Unlike basic compression tools that apply one-size-fits-all settings, our intelligent system considers factors such as color complexity, edge sharpness, gradient smoothness, and texture patterns to deliver compression results that maximize size reduction while minimizing perceptible quality loss. This means your photographs retain their vibrant colors and fine details, while graphics maintain crisp edges and clean lines.
            </p>

            <p className="text-muted-foreground leading-relaxed">
              The importance of image compression cannot be overstated in our increasingly visual digital world. Research consistently shows that page load speed directly impacts user engagement, conversion rates, and search engine rankings. Images typically account for 50-70% of a webpage's total size, making image optimization one of the most impactful steps you can take to improve website performance. Our compression tool helps you achieve Google's recommended image file sizes, contributing to better Core Web Vitals scores and improved SEO performance.
            </p>

            <p className="text-muted-foreground leading-relaxed">
              What sets our image compressor apart is its unwavering commitment to user privacy and data security. Every compression operation occurs entirely within your web browser using advanced client-side JavaScript processing. This architectural decision means your images never leave your device – they're not uploaded to any server, stored in any cloud, or accessible to anyone but you. This browser-based approach not only protects your privacy but also enables faster processing since there's no upload/download delay, regardless of your internet connection speed.
            </p>

            <p className="text-muted-foreground leading-relaxed">
              Our tool supports the complete spectrum of popular image formats, each with their own compression characteristics and ideal use cases. JPEG compression is perfect for photographs and complex images with millions of colors, offering excellent compression ratios for real-world imagery. PNG compression preserves transparency and is ideal for logos, icons, and graphics with text. WebP compression delivers superior compression for web use, often achieving 25-35% smaller file sizes than equivalent JPEG or PNG files. GIF compression optimizes animated content while preserving frame quality. TIFF compression caters to professional photographers and designers who work with high-fidelity imagery.
            </p>

            <p className="text-muted-foreground leading-relaxed">
              The user experience has been carefully designed to be intuitive and efficient. Simply drag and drop your images into the upload area, adjust the quality slider to your preferred balance of size and quality, and watch as the compression happens in real-time. Our live preview feature shows you exactly how your compressed image will look before you download it, eliminating any guesswork. The real-time file size comparison displays both original and compressed sizes along with the percentage saved, giving you complete transparency into the compression results.
            </p>

            <p className="text-muted-foreground leading-relaxed">
              For professionals managing large image libraries, our batch processing capability is a game-changer. Instead of compressing images one by one, you can upload multiple files and process them all with consistent settings. This workflow optimization can save hours of tedious manual work, particularly for e-commerce sites with extensive product catalogs, photography portfolios, or content-heavy websites. The batch feature maintains the same quality standards across all images, ensuring visual consistency throughout your digital assets.
            </p>

            <p className="text-muted-foreground leading-relaxed">
              Understanding compression quality settings is key to achieving optimal results. Our quality slider ranges from 1 to 100, with higher values preserving more detail and lower values achieving greater size reduction. For most web applications, a quality setting between 70-85% provides an excellent balance – file sizes are dramatically reduced while images remain virtually indistinguishable from originals to the human eye. For print or archival purposes where maximum quality is essential, settings above 90% maintain near-original quality with modest size reductions.
            </p>

            <p className="text-muted-foreground leading-relaxed">
              The technical foundation of our compressor employs modern browser APIs and optimized algorithms that deliver professional-grade results. We utilize the HTML5 Canvas API for image manipulation, combined with efficient encoding routines that produce consistently excellent output. The compression engine automatically handles color space conversions, metadata preservation where appropriate, and format-specific optimizations that ensure the best possible results for each image type.
            </p>

            <p className="text-muted-foreground leading-relaxed">
              Beyond simple file size reduction, proper image compression contributes to broader environmental sustainability. Smaller image files require less energy to store, transmit, and display. When multiplied across the billions of images transferred across the internet daily, even modest per-image savings aggregate into significant reductions in data center energy consumption and carbon emissions. By optimizing your images, you're not just improving your website – you're contributing to a more sustainable digital ecosystem.
            </p>
          </div>
        </section>

        {/* How to Use Section */}
        <section className="mt-12 space-y-6">
          <h2 className="text-3xl font-bold text-foreground">How to Compress Your Images</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { step: "1", title: "Upload Image", desc: "Drag and drop your image or click to browse. We support JPEG, PNG, WebP, GIF, and TIFF formats up to 50MB." },
              { step: "2", title: "Adjust Quality", desc: "Use the quality slider to find your ideal balance between file size and image quality. Preview changes in real-time." },
              { step: "3", title: "Compress", desc: "Click the compress button and watch as our algorithm optimizes your image. Processing happens instantly in your browser." },
              { step: "4", title: "Download", desc: "Preview the result, compare file sizes, and download your compressed image. Your original remains untouched." }
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
          <h2 className="text-3xl font-bold text-foreground">Why Use Our Image Compressor?</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              { icon: Zap, title: "Lightning Fast Performance", desc: "Browser-based processing means no upload delays. Compress images instantly regardless of file size or internet speed." },
              { icon: Shield, title: "Complete Privacy Protection", desc: "Your images never leave your device. All processing happens locally in your browser with zero server uploads." },
              { icon: Settings, title: "Full Quality Control", desc: "Adjustable quality settings let you find the perfect balance between file size reduction and visual quality." },
              { icon: FileDown, title: "Massive Size Reduction", desc: "Achieve 40-90% file size reduction while maintaining excellent visual quality for web and mobile use." },
              { icon: Eye, title: "Real-Time Preview", desc: "See exactly how your compressed image looks before downloading. Compare original and compressed side by side." },
              { icon: HardDrive, title: "All Formats Supported", desc: "Compress JPEG, PNG, WebP, GIF, and TIFF images with format-specific optimization algorithms." }
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
          <h2 className="text-3xl font-bold text-foreground">Key Benefits of Image Compression</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              "Faster website loading speeds",
              "Improved SEO and search rankings",
              "Reduced bandwidth costs",
              "Better mobile user experience",
              "Lower storage requirements",
              "Faster email delivery",
              "Improved social media sharing",
              "Better Core Web Vitals scores",
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
                  We take your privacy extremely seriously. Our image compression tool operates entirely within your web browser using client-side JavaScript technology. This means your images are processed locally on your device and are never uploaded to any external server.
                </p>
              </div>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              {[
                { title: "No Server Uploads", desc: "Images are processed 100% locally in your browser. Zero data transmission to external servers." },
                { title: "No Data Collection", desc: "We don't collect, store, or analyze any information about your images or compression activities." },
                { title: "No Account Required", desc: "Use our compression tool freely without registration, login, or providing any personal information." },
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

export default ImageCompressionPage;
