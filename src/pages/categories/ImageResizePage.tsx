import { useState } from "react";
import { Helmet } from "react-helmet-async";
import CategoryPageLayout from "@/components/CategoryPageLayout";
import UniversalImageResizer from "@/components/UniversalImageResizer";
import BatchImageResizer from "@/components/BatchImageResizer";
import { getCategoryBySlug } from "@/data/toolsData";
import { getCategorySEOContent } from "@/data/categorySEOData";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CheckCircle, Shield, Zap, Maximize, Lock, Eye, Settings, Ratio, Image, Layers } from "lucide-react";

const ImageResizePage = () => {
  const [activeTab, setActiveTab] = useState("single");
  const category = getCategoryBySlug("image-resize")!;
  const seoContent = getCategorySEOContent("image-resize")!

  const faqs = [
    {
      question: "What is image resizing and why would I need it?",
      answer: "Image resizing is the process of changing an image's dimensions (width and height) to meet specific requirements. You might need it for social media posts with specific size requirements, website optimization, email attachments, print projects, or to fit images into specific layouts and templates."
    },
    {
      question: "What's the difference between resizing and cropping?",
      answer: "Resizing changes the overall dimensions of an image while keeping all content visible (the entire image is scaled). Cropping removes portions of an image to focus on a specific area. Resizing maintains the complete image; cropping cuts away parts you don't want."
    },
    {
      question: "Will resizing my image affect its quality?",
      answer: "Enlarging images (upscaling) can reduce quality as pixels are stretched. Reducing size (downscaling) generally maintains quality well. Our tool uses advanced algorithms to minimize quality loss during resizing, and you can control output quality settings."
    },
    {
      question: "What does 'maintain aspect ratio' mean?",
      answer: "Aspect ratio is the proportional relationship between width and height. When you maintain aspect ratio and change one dimension, the other adjusts automatically to prevent distortion. For example, a 1920x1080 image has a 16:9 aspect ratio."
    },
    {
      question: "Which resize mode should I use?",
      answer: "Use 'Exact Dimensions' when you need specific pixel sizes. Use 'Percentage' for proportional scaling. 'Fit to Width/Height' is great when one dimension is critical. 'Fit to Box' ensures images don't exceed certain dimensions. 'Quality Resize' balances size with file size optimization."
    },
    {
      question: "What image formats can I resize?",
      answer: "Our tool supports all major image formats including JPEG, PNG, WebP, GIF, TIFF, and BMP. The output format matches your input, ensuring compatibility with your workflow."
    },
    {
      question: "Is there a file size limit for resizing?",
      answer: "Our browser-based tool can handle images up to 50MB. Since processing happens locally on your device, larger files may take longer depending on your computer's capabilities. There's no artificial limit imposed by our servers."
    },
    {
      question: "Are my images kept private during resizing?",
      answer: "Yes, completely. All image resizing happens directly in your browser using client-side processing. Your images are never uploaded to any server, ensuring total privacy and security for sensitive or personal images."
    }
  ];

  return (
    <>
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            "name": "Free Online Image Resizer",
            "description": "Resize images online for free with multiple modes: exact dimensions, percentage, fit to width/height, and more. Browser-based processing ensures privacy.",
            "url": window.location.href,
            "applicationCategory": "MultimediaApplication",
            "operatingSystem": "Any",
            "offers": {
              "@type": "Offer",
              "price": "0",
              "priceCurrency": "USD"
            },
            "featureList": [
              "Exact dimension resizing",
              "Percentage-based scaling",
              "Fit to width resizing",
              "Fit to height resizing",
              "Fit to box resizing",
              "Aspect ratio preservation",
              "Multiple format support",
              "Client-side processing"
            ]
          })}
        </script>
      </Helmet>

      <CategoryPageLayout category={category} seoContent={seoContent}>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-8">
            <TabsTrigger value="single" className="gap-2">
              <Image className="w-4 h-4" />
              Single Image
            </TabsTrigger>
            <TabsTrigger value="batch" className="gap-2">
              <Layers className="w-4 h-4" />
              Batch Mode
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="single" className="mt-0">
            <UniversalImageResizer />
          </TabsContent>
          
          <TabsContent value="batch" className="mt-0">
            <BatchImageResizer />
          </TabsContent>
        </Tabs>

        {/* Comprehensive About Section - 1000+ words */}
        <section className="mt-16 space-y-8">
          <div className="prose prose-lg max-w-none dark:prose-invert">
            <h2 className="text-3xl font-bold text-foreground mb-6">About Our Free Online Image Resizer</h2>
            
            <p className="text-muted-foreground leading-relaxed">
              Welcome to our powerful, versatile image resizing tool designed to meet every dimension requirement you might encounter in the digital world. Whether you're a professional photographer preparing images for various platforms, a web developer optimizing assets for responsive designs, a social media manager creating content for multiple channels, or simply someone who needs to resize a photo for an email attachment, our free online image resizer provides the precision, flexibility, and ease of use you need to accomplish your goals efficiently and effectively.
            </p>

            <p className="text-muted-foreground leading-relaxed">
              In today's multi-platform digital ecosystem, images need to conform to countless different dimension requirements. Instagram posts call for square formats, Twitter headers demand specific ratios, LinkedIn banners have their own specifications, and websites require various sizes for different contexts – thumbnails, hero images, product photos, and more. Our image resizer eliminates the complexity of managing these diverse requirements by offering multiple resize modes that adapt to your specific needs, whether you need exact pixel dimensions, proportional scaling, or intelligent fitting within size constraints.
            </p>

            <p className="text-muted-foreground leading-relaxed">
              The cornerstone of our image resizing tool is its comprehensive selection of resize modes, each designed for specific use cases. The Exact Dimensions mode gives you precise pixel control, perfect when you know exactly what size you need – ideal for platform-specific requirements or print projects with exact specifications. Percentage-based resizing lets you scale images proportionally, maintaining the original aspect ratio while adjusting overall size – perfect for creating thumbnails or reducing images by a consistent factor across a collection.
            </p>

            <p className="text-muted-foreground leading-relaxed">
              Our Fit to Width and Fit to Height modes are invaluable when one dimension is critical while the other can be flexible. Web designers frequently use Fit to Width when images must span a specific column width, while the height adjusts automatically to maintain proportions. Similarly, Fit to Height is perfect for scenarios where vertical space is constrained, such as sidebar images or specific layout slots. These modes ensure your images fit perfectly without distortion, regardless of the original aspect ratio.
            </p>

            <p className="text-muted-foreground leading-relaxed">
              The Fit to Box mode represents one of our most intelligent resizing options, designed for situations where images must not exceed certain dimensions in either direction. This mode calculates the optimal size that keeps your image within specified maximum width and height constraints while maintaining aspect ratio. It's particularly useful for e-commerce product images that need to fit within consistent display boxes, or for creating image galleries where visual uniformity is important.
            </p>

            <p className="text-muted-foreground leading-relaxed">
              Quality-focused resizing addresses the common challenge of balancing image dimensions with file size. This mode allows you to resize while simultaneously optimizing for web delivery, reducing file sizes without significant quality loss. The result is images that load faster, consume less bandwidth, and improve overall user experience – all while meeting your dimension requirements. This dual optimization makes our tool particularly valuable for website performance optimization.
            </p>

            <p className="text-muted-foreground leading-relaxed">
              Understanding aspect ratio is fundamental to successful image resizing, and our tool puts you in complete control. The aspect ratio lock feature ensures that when you change one dimension, the other adjusts proportionally, preventing the stretched or squished appearance that occurs when images are resized without maintaining proportions. For creative projects where intentional distortion is desired, you can unlock the aspect ratio and set width and height independently.
            </p>

            <p className="text-muted-foreground leading-relaxed">
              Our resizing algorithms employ sophisticated interpolation techniques that determine how pixel values are calculated when images are scaled. For downscaling (making images smaller), we use averaging algorithms that sample multiple original pixels to determine new pixel values, preserving detail and preventing aliasing artifacts. For upscaling (making images larger), we employ smart interpolation that intelligently fills in new pixels based on surrounding content, minimizing the blocky appearance that can occur with naive enlargement methods.
            </p>

            <p className="text-muted-foreground leading-relaxed">
              Privacy and security remain paramount in our design philosophy. Every resizing operation occurs entirely within your web browser using client-side JavaScript processing. This means your images never leave your device – they're not uploaded to any server, stored in any cloud, or accessible to any third party. This local processing approach not only protects your privacy but also enables faster operation since there's no upload/download latency, regardless of image size or internet connection speed.
            </p>

            <p className="text-muted-foreground leading-relaxed">
              The tool supports all major image formats including JPEG, PNG, WebP, GIF, TIFF, and BMP, automatically detecting input formats and producing outputs in the same format to ensure compatibility with your workflow. Each format has unique characteristics that our algorithms account for – JPEG resizing maintains efficient compression, PNG resizing preserves transparency, GIF resizing handles animation frames appropriately, and so forth.
            </p>

            <p className="text-muted-foreground leading-relaxed">
              For professional users managing large image collections, our batch processing capabilities enable resizing multiple images with consistent settings in a single operation. This workflow optimization can save hours of manual work, particularly valuable for product photographers, content creators, or anyone who regularly processes large volumes of images. The batch feature maintains quality standards across all images, ensuring visual consistency throughout your digital assets while dramatically improving productivity.
            </p>

            <p className="text-muted-foreground leading-relaxed">
              Our real-time preview system shows you exactly how your resized image will look before you commit to the final output. This immediate visual feedback eliminates guesswork and allows you to fine-tune settings until you achieve precisely the result you're looking for. The preview updates instantly as you adjust dimensions, giving you complete confidence in your resizing decisions before downloading the final image.
            </p>
          </div>
        </section>

        {/* How to Use Section */}
        <section className="mt-12 space-y-6">
          <h2 className="text-3xl font-bold text-foreground">How to Resize Your Images</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { step: "1", title: "Upload Image", desc: "Drag and drop your image or click to browse. We support JPEG, PNG, WebP, GIF, TIFF, and BMP formats." },
              { step: "2", title: "Choose Mode", desc: "Select your resize mode: exact dimensions, percentage, fit to width/height, fit to box, or quality resize." },
              { step: "3", title: "Set Dimensions", desc: "Enter your desired dimensions. Toggle aspect ratio lock to maintain or unlock proportions as needed." },
              { step: "4", title: "Download", desc: "Preview your resized image, verify the new dimensions, and download. Your original remains unchanged." }
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
          <h2 className="text-3xl font-bold text-foreground">Why Use Our Image Resizer?</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              { icon: Maximize, title: "Multiple Resize Modes", desc: "Choose from exact dimensions, percentage scaling, fit to width/height, fit to box, and quality-focused resizing." },
              { icon: Ratio, title: "Aspect Ratio Control", desc: "Lock aspect ratio for proportional scaling or unlock for custom dimensions. Complete control over your output." },
              { icon: Zap, title: "Instant Processing", desc: "Browser-based processing means no upload delays. Resize images instantly regardless of file size." },
              { icon: Shield, title: "Total Privacy", desc: "Images never leave your device. All processing happens locally in your browser for complete security." },
              { icon: Eye, title: "Real-Time Preview", desc: "See exactly how your resized image looks before downloading. Adjust settings with immediate visual feedback." },
              { icon: Settings, title: "Professional Quality", desc: "Advanced interpolation algorithms ensure high-quality results whether upscaling or downscaling images." }
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
          <h2 className="text-3xl font-bold text-foreground">Key Benefits of Image Resizing</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              "Meet platform-specific requirements",
              "Optimize for web performance",
              "Create consistent image galleries",
              "Prepare images for print",
              "Reduce email attachment sizes",
              "Create responsive image sets",
              "Batch process multiple images",
              "Maintain visual quality",
              "Save storage space"
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
                <h3 className="text-xl font-semibold text-foreground mb-2">Complete Image Privacy</h3>
                <p className="text-muted-foreground">
                  Your image privacy is our top priority. Our resizing tool operates entirely within your web browser using advanced client-side JavaScript technology. This means your images are processed locally on your device and are never uploaded to any external server or cloud service.
                </p>
              </div>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              {[
                { title: "Zero Server Uploads", desc: "Images are processed 100% locally in your browser. No data is ever transmitted to external servers." },
                { title: "No Data Retention", desc: "We don't collect, store, or analyze any information about your images or resizing activities." },
                { title: "No Registration Needed", desc: "Use our resize tool freely without creating accounts, logging in, or sharing personal information." },
                { title: "Instant Cleanup", desc: "When you close the browser tab, all processed images are automatically cleared from memory." }
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

export default ImageResizePage;
