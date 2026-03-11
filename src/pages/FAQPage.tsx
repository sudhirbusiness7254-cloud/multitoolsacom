import { Helmet } from "react-helmet-async";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HreflangTags from "@/components/HreflangTags";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Link } from "react-router-dom";
import { HelpCircle, Image, FileText, Shield, Zap, Globe, Lock } from "lucide-react";

const faqCategories = [
  {
    id: "general",
    title: "General Questions",
    icon: <HelpCircle className="w-5 h-5" />,
    faqs: [
      {
        question: "What is MultiToolsA?",
        answer: "MultiToolsA is a comprehensive free online platform offering 100+ image editing, conversion, compression, and optimization tools. All our tools work directly in your browser without requiring any software installation, account registration, or file uploads to external servers. We provide professional-grade image processing capabilities completely free of charge, making advanced image editing accessible to everyone from professional designers to casual users."
      },
      {
        question: "Is MultiToolsA really free to use?",
        answer: "Yes, MultiToolsA is 100% free to use with no hidden costs, subscription fees, or premium tiers. All features are available to everyone without limitations. We believe that essential image editing tools should be accessible to all users regardless of their budget. There are no watermarks added to your images, no file size limits, and no daily usage caps."
      },
      {
        question: "Do I need to create an account to use the tools?",
        answer: "No, you do not need to create an account, register, or log in to use any of our tools. Simply visit the tool page you need and start using it immediately. We designed our platform to be as accessible and convenient as possible, eliminating unnecessary barriers to accessing our image editing capabilities."
      },
      {
        question: "What devices and browsers are supported?",
        answer: "MultiToolsA works on any modern web browser including Chrome, Firefox, Safari, Edge, and Opera on any device—Windows, Mac, Linux, iOS, and Android. Our tools are fully responsive and optimized for both desktop and mobile use, allowing you to edit images on your smartphone, tablet, laptop, or desktop computer with the same professional results."
      },
      {
        question: "How is MultiToolsA different from other online image tools?",
        answer: "MultiToolsA stands out through our commitment to privacy (all processing happens locally in your browser), our comprehensive toolset (100+ specialized tools), zero-friction access (no accounts or downloads required), and professional-quality results at no cost. Unlike many competitors, we never upload your images to external servers, ensuring your files remain completely private and secure."
      }
    ]
  },
  {
    id: "privacy",
    title: "Privacy & Security",
    icon: <Shield className="w-5 h-5" />,
    faqs: [
      {
        question: "Are my images uploaded to your servers?",
        answer: "No, absolutely not. All image processing happens entirely within your web browser using JavaScript and HTML5 Canvas technology. Your images never leave your device, are never transmitted over the internet, and are never stored on any server. This local processing approach ensures complete privacy and security for all your files, making MultiToolsA safe to use even with sensitive or confidential images."
      },
      {
        question: "How do you protect my privacy?",
        answer: "We protect your privacy through browser-based processing, meaning your files never leave your device. We don't collect personal information, don't require accounts, and don't track individual file operations. When you close your browser tab or navigate away, all image data is automatically cleared from memory. We use industry-standard encryption (HTTPS) for our website, but since no files are transmitted, there's nothing to intercept."
      },
      {
        question: "Is it safe to use MultiToolsA for sensitive images?",
        answer: "Yes, MultiToolsA is one of the safest options for processing sensitive images. Since all processing occurs locally in your browser and no files are uploaded to any server, your images remain completely private. This makes our tools suitable for processing confidential documents, personal photos, business assets, and any other sensitive visual content."
      },
      {
        question: "Do you store or sell user data?",
        answer: "No, we do not store any user data, images, or personal information. We do not have access to your files at any point during or after processing. We use minimal analytics (like page views) to improve our service, but no personal or file-related information is collected. We never sell, share, or monetize user data in any way."
      },
      {
        question: "What happens to my images after processing?",
        answer: "After processing, your images exist only in your browser's memory until you download them or close the page. We don't retain any copies, create backups, or store processed images anywhere. Once you leave the page, all temporary image data is automatically cleared. The only copy of your processed image is the one you choose to download to your device."
      }
    ]
  },
  {
    id: "image-conversion",
    title: "Image Conversion",
    icon: <Image className="w-5 h-5" />,
    faqs: [
      {
        question: "What image formats can I convert between?",
        answer: "MultiToolsA supports conversion between all major image formats including JPG/JPEG, PNG, WebP, GIF, BMP, TIFF, SVG, HEIC, and RAW formats. Popular conversions include JPG to PNG for transparency support, PNG to JPG for smaller file sizes, and conversion to WebP for modern web optimization. Each format has specific advantages for different use cases."
      },
      {
        question: "Will I lose quality when converting images?",
        answer: "It depends on the conversion type. Converting to PNG (lossless) preserves all quality. Converting to JPG or WebP (lossy formats) may result in some quality loss, but you can control this with our quality sliders. For most practical purposes, the quality difference is imperceptible at 80%+ quality settings. Converting from a lossy format won't recover already-lost quality."
      },
      {
        question: "Can I convert HEIC files from my iPhone?",
        answer: "Yes, our HEIC to JPG and HEIC to PNG converters are specifically designed to handle iPhone and iPad photos in HEIC format. This format provides excellent compression but isn't universally supported, so converting to JPG or PNG makes your photos compatible with all devices, websites, and applications."
      },
      {
        question: "What's the difference between JPG and PNG?",
        answer: "JPG uses lossy compression (smaller files, some quality loss) and is best for photographs. It doesn't support transparency. PNG uses lossless compression (larger files, no quality loss) and supports transparency, making it ideal for logos, graphics, and images with text. Choose JPG for photos and PNG for graphics requiring transparency or pixel-perfect quality."
      },
      {
        question: "Should I use WebP format for my website?",
        answer: "Yes, WebP is highly recommended for websites. It provides 25-35% smaller file sizes compared to JPG at similar quality levels, supports both lossy and lossless compression, and includes transparency support. WebP is now supported by all major browsers (95%+ global coverage). Using WebP can significantly improve your website's loading speed and Core Web Vitals scores."
      }
    ]
  },
  {
    id: "compression",
    title: "Image Compression",
    icon: <Zap className="w-5 h-5" />,
    faqs: [
      {
        question: "How much can I reduce my image file size?",
        answer: "Typically, you can reduce image file sizes by 50-80% without visible quality loss. For photos, compression to 70-85% quality usually provides excellent results with 60-70% size reduction. PNG files can often be reduced by 40-60% using lossless compression. The exact reduction depends on the original image content, format, and chosen compression settings."
      },
      {
        question: "What's the difference between lossy and lossless compression?",
        answer: "Lossy compression permanently removes some image data to achieve smaller files—this is what JPG and WebP use. The removed data typically isn't noticeable to the human eye. Lossless compression reduces file size without removing any data—PNG uses this method. Your choice depends on whether you prioritize smaller files (lossy) or perfect quality preservation (lossless)."
      },
      {
        question: "What compression level should I use for web images?",
        answer: "For web images, we recommend 70-85% quality for JPG and WebP formats. This provides excellent visual quality with significant file size reduction. For hero images and important visuals, use 80-90%. For thumbnails and background images, 60-75% is often sufficient. Always test different levels to find the best balance for your specific images."
      },
      {
        question: "Can I compress images without losing quality?",
        answer: "Yes, using lossless compression. PNG files can be compressed losslessly, removing unnecessary metadata and optimizing encoding without affecting image quality. For photos in JPG format, some quality loss is inherent to achieve compression, but at 85%+ quality settings, the difference is typically imperceptible to human eyes."
      },
      {
        question: "How does image compression affect SEO?",
        answer: "Properly compressed images significantly improve SEO by reducing page load times, which is a Google ranking factor. Faster-loading pages provide better user experience, reduce bounce rates, and improve Core Web Vitals scores (especially Largest Contentful Paint). Google rewards fast-loading websites with higher search rankings, making image optimization crucial for SEO success."
      }
    ]
  },
  {
    id: "editing",
    title: "Image Editing & Manipulation",
    icon: <FileText className="w-5 h-5" />,
    faqs: [
      {
        question: "What editing features does MultiToolsA offer?",
        answer: "MultiToolsA offers comprehensive editing including: resizing (exact, percentage, fit-to-dimensions), cropping (manual, aspect ratio, circle, square), rotation and flipping, filters and effects (brightness, contrast, saturation, blur, sharpen), watermarking (text and image), drawing and annotation, background removal, metadata editing, and image combining. Each feature is available as a dedicated, specialized tool."
      },
      {
        question: "Can I resize images without losing quality?",
        answer: "Reducing image size generally maintains quality well since you're keeping existing pixels. Enlarging images may result in some quality loss as the software must create new pixels. For best results when upscaling, use our 'Resize Without Quality Loss' tool which uses advanced interpolation algorithms to minimize quality degradation. Keep enlargement to 200% or less for best results."
      },
      {
        question: "How do I add a watermark to protect my images?",
        answer: "Use our Watermark Tools to add text or image watermarks. You can customize position (corner, center, tiled), opacity (10-100%), font style and size, and color. For best protection, place watermarks over important image areas and use 30-50% opacity. You can watermark multiple images at once for consistency across your portfolio."
      },
      {
        question: "Can I remove backgrounds from images?",
        answer: "Yes, our Image Security and Editing tools allow you to work with image areas. For background removal, you can use our cropping tools with transparency support (PNG output) or manually blur/hide areas using our security tools. For complex background removal, we recommend processing your images and then using the transparency features in PNG format."
      },
      {
        question: "How do I combine multiple images into one?",
        answer: "Our Image Combine tools offer several options: horizontal merge (side by side), vertical merge (stacked), collage maker (grid layout), image stitching (panoramas), and before/after comparison. Upload multiple images, choose your layout, adjust spacing and alignment, and download the combined result. Great for social media, presentations, and comparisons."
      }
    ]
  },
  {
    id: "technical",
    title: "Technical Questions",
    icon: <Globe className="w-5 h-5" />,
    faqs: [
      {
        question: "Why do some tools take longer to process large images?",
        answer: "Processing time depends on your device's capabilities since all processing happens locally in your browser. Larger images (10+ megapixels) require more memory and processing power. For optimal performance with large files, close other browser tabs and applications. Modern devices process most images in seconds, while older devices may take longer."
      },
      {
        question: "What's the maximum file size I can process?",
        answer: "There's no strict maximum file size, but processing depends on your device's available memory. Most modern devices can handle images up to 50-100MB comfortably. For very large files (100MB+), processing may be slower or may fail on devices with limited memory. If you experience issues, try processing during times when fewer applications are running."
      },
      {
        question: "Why isn't my image loading/processing?",
        answer: "Common causes include: corrupted image files, unsupported formats (try converting first), very large files exceeding device memory, browser issues (try refreshing or using a different browser), or privacy extensions blocking functionality. Ensure your file is a valid image format and try with a smaller test file to diagnose the issue."
      },
      {
        question: "Can I use MultiToolsA offline?",
        answer: "Currently, MultiToolsA requires an internet connection to load the web application. However, once the page is loaded, processing happens locally and doesn't require ongoing connectivity. We're exploring Progressive Web App (PWA) capabilities that would enable offline use in future updates."
      },
      {
        question: "How do I report a bug or suggest a feature?",
        answer: "We welcome feedback! Visit our Contact page to report bugs or suggest new features. Please include details about your browser, device, the specific tool you were using, and steps to reproduce any issues. Feature suggestions help us prioritize development to better serve our users' needs."
      }
    ]
  }
];

const FAQPage = () => {
  // Flatten all FAQs for schema
  const allFaqs = faqCategories.flatMap(cat => cat.faqs);
  
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": allFaqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };

  return (
    <>
      <Helmet>
        <title>Frequently Asked Questions - MultiToolsA | Image Tools FAQ</title>
        <meta name="description" content="Find answers to common questions about MultiToolsA's free online image tools. Learn about image conversion, compression, privacy, security, and how to use our 100+ tools." />
        <meta name="keywords" content="MultiToolsA FAQ, image tools help, image converter questions, compression help, online image editor FAQ, free tools support" />
        <link rel="canonical" href="https://multitoolsa.com/faq" />
        
        <meta property="og:title" content="FAQ - MultiToolsA Image Tools" />
        <meta property="og:description" content="Get answers to frequently asked questions about our free online image tools." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://multitoolsa.com/faq" />
        
        <script type="application/ld+json">
          {JSON.stringify(faqSchema)}
        </script>
      </Helmet>
      <HreflangTags path="/faq" />

      <div className="min-h-screen bg-background flex flex-col">
        <Header />
        
        <main className="flex-1">
          {/* Hero Section */}
          <section className="py-12 md:py-20 bg-gradient-hero relative overflow-hidden">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/10 rounded-full blur-3xl pointer-events-none" />
            
            <div className="container mx-auto px-4 relative z-10 text-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/30 mb-6">
                <HelpCircle className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium text-primary">Help Center</span>
              </div>
              
              <h1 className="text-3xl md:text-5xl font-bold mb-4">
                Frequently Asked Questions
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Find answers to common questions about MultiToolsA's free online image tools. 
                Can't find what you're looking for? <Link to="/contact" className="text-primary hover:underline">Contact us</Link>.
              </p>
            </div>
          </section>

          {/* Quick Stats */}
          <section className="py-8 bg-secondary/30">
            <div className="container mx-auto px-4">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                <div className="p-4">
                  <div className="text-3xl font-bold text-primary">100+</div>
                  <div className="text-sm text-muted-foreground">Free Tools</div>
                </div>
                <div className="p-4">
                  <div className="text-3xl font-bold text-primary">100%</div>
                  <div className="text-sm text-muted-foreground">Private & Secure</div>
                </div>
                <div className="p-4">
                  <div className="text-3xl font-bold text-primary">0</div>
                  <div className="text-sm text-muted-foreground">Files Uploaded</div>
                </div>
                <div className="p-4">
                  <div className="text-3xl font-bold text-primary">24/7</div>
                  <div className="text-sm text-muted-foreground">Available</div>
                </div>
              </div>
            </div>
          </section>


          {/* FAQ Categories */}
          <section className="py-12 md:py-16 px-4">
            <div className="container mx-auto max-w-4xl">
              {faqCategories.map((category) => (
                <div key={category.id} className="mb-10">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                      {category.icon}
                    </div>
                    <h2 className="text-2xl font-bold">{category.title}</h2>
                  </div>
                  
                  <Accordion type="single" collapsible className="space-y-2">
                    {category.faqs.map((faq, index) => (
                      <AccordionItem 
                        key={index} 
                        value={`${category.id}-${index}`}
                        className="bg-card border border-border rounded-xl px-4"
                      >
                        <AccordionTrigger className="text-left hover:no-underline py-4">
                          <span className="font-medium">{faq.question}</span>
                        </AccordionTrigger>
                        <AccordionContent className="text-muted-foreground pb-4 leading-relaxed">
                          {faq.answer}
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </div>
              ))}
            </div>
          </section>

          {/* Mobile Native Ad - after FAQ */}
          <div className="container mx-auto max-w-4xl px-4 lg:hidden">
            <MobileNativeAd />
          </div>
          
          {/* Desktop Native Banner Ad - after FAQ */}
          <div className="container mx-auto max-w-4xl px-4 hidden lg:block">
            <NativeBannerAd />
          </div>

          {/* Still Have Questions */}
          <section className="py-12 md:py-16 px-4 bg-gradient-dark">
            <div className="container mx-auto max-w-3xl text-center">
              <Lock className="w-12 h-12 text-primary mx-auto mb-4" />
              <h2 className="text-2xl md:text-3xl font-bold mb-4">Still Have Questions?</h2>
              <p className="text-muted-foreground mb-6">
                Our team is here to help. Reach out with any questions about our tools, 
                technical issues, or feature requests. We typically respond within 24 hours.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link 
                  to="/contact"
                  className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors"
                >
                  Contact Support
                </Link>
                <Link 
                  to="/about"
                  className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-secondary text-secondary-foreground font-medium hover:bg-secondary/80 transition-colors"
                >
                  Learn About Us
                </Link>
              </div>
            </div>
          </section>

          {/* Mobile Native Ad - before resources */}
          <div className="container mx-auto max-w-4xl px-4 lg:hidden">
            <MobileNativeAd />
          </div>
          
          {/* Desktop Native Banner Ad - before resources */}
          <div className="container mx-auto max-w-4xl px-4 hidden lg:block">
            <NativeBannerAd />
          </div>

          {/* Related Links */}
          <section className="py-12 md:py-16 px-4">
            <div className="container mx-auto max-w-4xl">
              <h2 className="text-2xl font-bold mb-6 text-center">Helpful Resources</h2>
              <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
                <Link 
                  to="/all-tools"
                  className="bg-card p-6 rounded-xl border border-border hover:border-primary/50 transition-colors"
                >
                  <h3 className="font-semibold mb-2">Browse All Tools</h3>
                  <p className="text-sm text-muted-foreground">Explore our complete collection of 100+ image tools.</p>
                </Link>
                <Link 
                  to="/blog"
                  className="bg-card p-6 rounded-xl border border-border hover:border-primary/50 transition-colors"
                >
                  <h3 className="font-semibold mb-2">Read Our Blog</h3>
                  <p className="text-sm text-muted-foreground">Tutorials, tips, and guides for image editing.</p>
                </Link>
                <Link 
                  to="/privacy"
                  className="bg-card p-6 rounded-xl border border-border hover:border-primary/50 transition-colors"
                >
                  <h3 className="font-semibold mb-2">Privacy Policy</h3>
                  <p className="text-sm text-muted-foreground">Learn how we protect your data and privacy.</p>
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

export default FAQPage;
