import { useState } from "react";
import { Helmet } from "react-helmet-async";
import CategoryPageLayout from "@/components/CategoryPageLayout";
import UniversalImageCropper from "@/components/UniversalImageCropper";
import { getCategoryBySlug } from "@/data/toolsData";
import { getCategorySEOContent } from "@/data/categorySEOData";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { CheckCircle, Shield, Zap, Crop, Lock, Eye, Settings, Square } from "lucide-react";

type CropMode = "free" | "1:1" | "4:3" | "16:9" | "3:2" | "9:16" | "circle";

const ImageCropPage = () => {
  const category = getCategoryBySlug("image-crop")!;
  const seoContent = getCategorySEOContent("image-crop")!;
  const [selectedMode, setSelectedMode] = useState<CropMode>("free");
  const [key, setKey] = useState(0);

  const faqs = [
    {
      question: "What is image cropping and when should I use it?",
      answer: "Image cropping is the process of removing unwanted outer areas from an image to improve composition, focus on a subject, or meet specific size requirements. Use cropping to remove distracting backgrounds, center your subject, change image orientation, or prepare images for specific platforms like social media profiles or website banners."
    },
    {
      question: "What's the difference between cropping and resizing?",
      answer: "Cropping removes portions of an image to focus on a specific area, while resizing changes the overall dimensions without removing content. Cropping changes composition and aspect ratio; resizing scales the entire image. Both can be used together – crop first to perfect composition, then resize for specific dimension requirements."
    },
    {
      question: "What aspect ratios are available?",
      answer: "Our tool offers popular aspect ratios including Free (custom), 1:1 (square, perfect for Instagram), 4:3 (traditional photo), 16:9 (widescreen/video), 3:2 (classic SLR), 9:16 (portrait/stories), and Circle (for profile pictures). You can also set custom aspect ratios for specific needs."
    },
    {
      question: "How do I crop a perfect circle for profile pictures?",
      answer: "Select the Circle crop mode from our preset options. This creates a circular selection that's perfect for profile pictures on social media, messaging apps, and websites. The circular crop automatically centers and creates a transparent or white background around the circle."
    },
    {
      question: "Can I adjust the crop area precisely?",
      answer: "Yes! You can drag the crop box to reposition it, drag the corners or edges to resize it, and use our dimension inputs for pixel-perfect precision. The live preview shows exactly what your cropped image will look like in real-time."
    },
    {
      question: "Will cropping reduce my image quality?",
      answer: "Cropping itself doesn't reduce quality – you're simply selecting a portion of the original image. However, if you crop a small area and then enlarge it, quality may be affected. Our tool preserves maximum quality within the cropped region and lets you choose output quality settings."
    },
    {
      question: "What image formats can I crop?",
      answer: "Our universal cropper supports all major image formats including JPEG, PNG, WebP, GIF, TIFF, and BMP. The output format matches your input, ensuring compatibility with your workflow. PNG transparency is preserved in cropped outputs."
    },
    {
      question: "Are my images kept private during cropping?",
      answer: "Absolutely. All image cropping happens directly in your browser using client-side JavaScript. Your images are never uploaded to any server, ensuring complete privacy and security for personal photos or sensitive content."
    }
  ];

  return (
    <>
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            "name": "Free Online Image Cropper",
            "description": "Crop images online for free with preset aspect ratios or custom selections. Perfect for social media, profile pictures, and web optimization.",
            "url": window.location.href,
            "applicationCategory": "MultimediaApplication",
            "operatingSystem": "Any",
            "offers": {
              "@type": "Offer",
              "price": "0",
              "priceCurrency": "USD"
            },
            "featureList": [
              "Free-form cropping",
              "1:1 square crop",
              "16:9 widescreen crop",
              "4:3 standard crop",
              "Circle crop for profiles",
              "Custom aspect ratios",
              "Client-side processing"
            ]
          })}
        </script>
      </Helmet>

      <CategoryPageLayout category={category} seoContent={seoContent}>
        <UniversalImageCropper key={key} initialMode={selectedMode} />

        {/* Comprehensive About Section - 1000+ words */}
        <section className="mt-16 space-y-8">
          <div className="prose prose-lg max-w-none dark:prose-invert">
            <h2 className="text-3xl font-bold text-foreground mb-6">About Our Free Online Image Cropper</h2>
            
            <p className="text-muted-foreground leading-relaxed">
              Welcome to our powerful, intuitive image cropping tool designed to give you complete control over your image composition and framing. Whether you're a professional photographer perfecting your shots, a social media manager preparing content for multiple platforms, a web designer optimizing images for specific layouts, or anyone who wants to improve their photos, our free online image cropper provides the precision tools and flexible options you need to achieve perfect results every time. With support for multiple aspect ratios, freeform selection, and pixel-perfect adjustments, our tool transforms the cropping process from a tedious task into a seamless creative experience.
            </p>

            <p className="text-muted-foreground leading-relaxed">
              Image cropping is one of the most fundamental yet powerful photo editing techniques available. At its core, cropping involves selecting a portion of an image and discarding the rest, but the creative implications extend far beyond this simple description. Thoughtful cropping can completely transform a photograph – turning a cluttered snapshot into a compelling portrait, converting a horizontal landscape into a dramatic vertical composition, or isolating the perfect moment from a larger scene. Our tool puts this transformative power in your hands with an interface that makes professional-quality cropping accessible to everyone.
            </p>

            <p className="text-muted-foreground leading-relaxed">
              The foundation of our cropping tool is its comprehensive selection of aspect ratio presets, each designed for specific use cases in today's multi-platform digital world. The 1:1 square ratio is essential for Instagram posts, profile pictures, and product thumbnails where symmetrical framing creates visual balance. The 16:9 widescreen ratio matches modern displays and is perfect for YouTube thumbnails, website hero images, and cinematic presentations. The 4:3 traditional ratio suits classic photography and many web applications, while 3:2 matches the native aspect of most DSLR cameras.
            </p>

            <p className="text-muted-foreground leading-relaxed">
              Our 9:16 portrait ratio has become increasingly important with the rise of vertical content on platforms like Instagram Stories, TikTok, and Pinterest. This ratio maximizes screen real estate on mobile devices and creates immersive vertical experiences. For the ultimate profile picture preparation, our circle crop mode creates perfectly round selections ideal for social media avatars, messaging apps, and professional networking platforms. The circular crop handles transparency appropriately, giving you clean edges that work on any background.
            </p>

            <p className="text-muted-foreground leading-relaxed">
              Beyond presets, our freeform cropping mode liberates you from ratio constraints entirely, letting you select exactly the portion of your image you want to keep. This flexibility is invaluable for creative projects where conventional ratios don't apply, for removing unwanted elements from the edges of photos, or for preparing images for unique display contexts. The freeform selection can be adjusted with intuitive drag-and-resize controls, making it easy to fine-tune your crop area until it's exactly right.
            </p>

            <p className="text-muted-foreground leading-relaxed">
              Precision is paramount in professional image editing, and our cropper delivers with pixel-level accuracy. While drag-and-drop controls make quick adjustments intuitive, the numeric input fields let you specify exact dimensions and positions for the crop area. This precision is essential for technical applications where images must meet exact specifications, for creating perfectly aligned image series, or for any situation where approximate just won't do. The real-time preview updates instantly as you adjust values, providing immediate visual feedback.
            </p>

            <p className="text-muted-foreground leading-relaxed">
              The composition principles that professional photographers use to create compelling images are intrinsically connected to cropping decisions. The rule of thirds, which places subjects along imaginary lines dividing the image into nine equal parts, can often be applied or refined through careful cropping. Our tool's crop area overlay helps visualize these compositional guidelines, making it easier to position your subject optimally within the frame. Whether you're following traditional composition rules or intentionally breaking them for creative effect, our cropper supports your artistic vision.
            </p>

            <p className="text-muted-foreground leading-relaxed">
              Understanding when and how to crop is as important as having the right tools. Crop to remove distracting elements that pull attention from your subject – cluttered backgrounds, unwanted objects at frame edges, or dead space that doesn't contribute to the image. Crop to change the story your image tells – a wide shot that includes context becomes an intimate close-up when cropped tight around a subject's face. Crop to adapt content for different platforms – the same photo might need square, landscape, and portrait versions for different social media channels.
            </p>

            <p className="text-muted-foreground leading-relaxed">
              Privacy and security are woven into the foundation of our cropping tool. Every cropping operation occurs entirely within your web browser using sophisticated client-side JavaScript processing. This architectural choice means your images never leave your device – they're not uploaded to any server, stored in any cloud, or accessible to any third party. For personal photos, sensitive business images, or pre-release creative work, this local processing approach provides absolute assurance that your content remains private.
            </p>

            <p className="text-muted-foreground leading-relaxed">
              Our tool supports the complete range of popular image formats including JPEG, PNG, WebP, GIF, TIFF, and BMP. Each format is handled appropriately – PNG transparency is preserved in cropped outputs, JPEG compression efficiency is maintained, and metadata is handled according to best practices. The output format automatically matches your input, ensuring seamless integration with your existing workflow. Quality settings are fully adjustable, letting you balance file size with visual quality based on your intended use.
            </p>

            <p className="text-muted-foreground leading-relaxed">
              For users working with multiple images, our efficient workflow design minimizes repetitive actions. Once you've defined your desired crop parameters for one image, applying similar crops to subsequent images becomes quick and intuitive. This efficiency is particularly valuable for batch processing product photos, creating consistent image series, or preparing multiple images for a unified presentation. The streamlined interface keeps frequently-used controls readily accessible while tucking advanced options out of the way until needed.
            </p>

            <p className="text-muted-foreground leading-relaxed">
              The technical implementation of our cropping tool leverages modern browser capabilities for maximum performance and quality. The HTML5 Canvas API enables smooth, real-time manipulation of even large images, while optimized algorithms ensure that cropped outputs maintain maximum quality within the selected region. Anti-aliasing is applied appropriately for clean edges, and the processing pipeline handles color spaces correctly to preserve the visual character of your original images.
            </p>
          </div>
        </section>

        {/* How to Use Section */}
        <section className="mt-12 space-y-6">
          <h2 className="text-3xl font-bold text-foreground">How to Crop Your Images</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { step: "1", title: "Upload Image", desc: "Drag and drop your image or click to browse. We support JPEG, PNG, WebP, GIF, TIFF, and BMP formats." },
              { step: "2", title: "Choose Aspect Ratio", desc: "Select from preset ratios (1:1, 16:9, 4:3, etc.), circle crop, or use free-form selection for custom crops." },
              { step: "3", title: "Adjust Crop Area", desc: "Drag corners to resize, drag the box to reposition, or use dimension inputs for pixel-perfect precision." },
              { step: "4", title: "Download", desc: "Preview your cropped image and download when satisfied. Your original image remains completely unchanged." }
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
          <h2 className="text-3xl font-bold text-foreground">Why Use Our Image Cropper?</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              { icon: Crop, title: "Multiple Aspect Ratios", desc: "Choose from popular presets like 1:1, 16:9, 4:3, 9:16, or use free-form selection for any custom crop." },
              { icon: Square, title: "Circle Crop for Profiles", desc: "Create perfect circular crops for profile pictures on social media, messaging apps, and professional platforms." },
              { icon: Settings, title: "Pixel-Perfect Precision", desc: "Use numeric inputs for exact dimensions, or drag-and-drop controls for intuitive adjustments with real-time preview." },
              { icon: Zap, title: "Instant Processing", desc: "Browser-based processing means no upload delays. Crop images instantly regardless of file size." },
              { icon: Eye, title: "Live Preview", desc: "See exactly how your cropped image looks in real-time as you adjust the selection area." },
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
          <h2 className="text-3xl font-bold text-foreground">Key Benefits of Image Cropping</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              "Improve photo composition",
              "Remove distracting elements",
              "Meet platform size requirements",
              "Create profile-ready pictures",
              "Focus on your subject",
              "Change image orientation",
              "Prepare images for print",
              "Create consistent image sets",
              "Enhance visual storytelling"
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
                <h3 className="text-xl font-semibold text-foreground mb-2">Your Photos Stay Private</h3>
                <p className="text-muted-foreground">
                  We understand that photos are personal, and privacy matters. Our image cropping tool operates entirely within your web browser using client-side JavaScript technology. This means your images are processed locally on your device and are never uploaded to any external server or cloud service.
                </p>
              </div>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              {[
                { title: "Zero Server Uploads", desc: "All cropping happens 100% locally in your browser. No image data ever leaves your device." },
                { title: "No Data Tracking", desc: "We don't collect, store, or analyze any information about your images or cropping activities." },
                { title: "No Account Needed", desc: "Use our crop tool freely without registration, login, or providing any personal information." },
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

export default ImageCropPage;
