import { useState } from "react";
import { Helmet } from "react-helmet-async";
import CategoryPageLayout from "@/components/CategoryPageLayout";
import UniversalRotateFlip from "@/components/UniversalRotateFlip";
import HowToUseGuide from "@/components/HowToUseGuide";
import { getCategoryBySlug } from "@/data/toolsData";
import { getCategorySEOContent } from "@/data/categorySEOData";
import { getToolGuideData } from "@/data/toolGuideData";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { CheckCircle, Shield, Zap, RotateCw, Lock, Eye, Settings, FlipHorizontal } from "lucide-react";
import { AdVideo, AdInline, AdExoticFat } from "@/components/ads/AdContainer";

type TransformMode = "rotate-90" | "rotate-180" | "rotate-270" | "custom" | "flip-h" | "flip-v";

const ImageRotateFlipPage = () => {
  const category = getCategoryBySlug("image-rotate-flip")!;
  const seoContent = getCategorySEOContent("image-rotate-flip")!;
  const guideData = getToolGuideData("image-rotate-flip");
  const [selectedMode, setSelectedMode] = useState<TransformMode>("rotate-90");
  const [key, setKey] = useState(0);

  const faqs = [
    {
      question: "What rotation options are available?",
      answer: "Our tool offers 90° clockwise rotation, 180° rotation (upside down), 270° clockwise (or 90° counter-clockwise), and custom angle rotation for precise adjustments. Each option produces clean, high-quality results."
    },
    {
      question: "What's the difference between flip and rotate?",
      answer: "Rotation turns the image around its center point by a specified angle. Flipping creates a mirror image – horizontal flip mirrors left-to-right (like a mirror), vertical flip mirrors top-to-bottom. Both are useful for different correction needs."
    },
    {
      question: "When should I use horizontal flip?",
      answer: "Horizontal flip creates a mirror image, useful for correcting selfies taken with front cameras, creating symmetrical designs, flipping scanned documents that were placed face-down, or artistic mirror effects."
    },
    {
      question: "When should I use vertical flip?",
      answer: "Vertical flip inverts the image top-to-bottom, useful for correcting images captured upside down by certain cameras or scanners, creating reflection effects, or preparing images for specific printing processes."
    },
    {
      question: "Can I rotate by custom angles?",
      answer: "Yes! Our custom rotation feature lets you specify any angle from 0° to 360°. This is perfect for straightening slightly tilted photos, creating artistic angled compositions, or making precise orientation adjustments."
    },
    {
      question: "Will rotating or flipping reduce image quality?",
      answer: "90°, 180°, and 270° rotations are lossless operations that don't reduce quality. Flips are also lossless. Custom angle rotations may require interpolation but our algorithms minimize any quality impact."
    },
    {
      question: "What image formats are supported?",
      answer: "We support all major image formats including JPEG, PNG, WebP, GIF, and TIFF. The output format matches your input to ensure compatibility with your workflow."
    },
    {
      question: "Are my images kept private during processing?",
      answer: "Absolutely. All rotation and flip operations happen directly in your browser using client-side processing. Your images are never uploaded to any server, ensuring complete privacy."
    }
  ];

  return (
    <>
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            "name": "Free Online Image Rotate & Flip Tool",
            "description": "Rotate and flip images online for free. 90°, 180°, 270° rotation, horizontal/vertical flip, and custom angles with our browser-based tool.",
            "url": window.location.href,
            "applicationCategory": "MultimediaApplication",
            "operatingSystem": "Any",
            "offers": {
              "@type": "Offer",
              "price": "0",
              "priceCurrency": "USD"
            },
            "featureList": [
              "90° rotation",
              "180° rotation",
              "270° rotation",
              "Custom angle rotation",
              "Horizontal flip",
              "Vertical flip",
              "Client-side processing"
            ]
          })}
        </script>
      </Helmet>

      <CategoryPageLayout category={category} seoContent={seoContent}>
        <UniversalRotateFlip key={key} initialMode={selectedMode} />
        {/* Video Ad - Below Tool Output */}
        <AdVideo className="mt-6" />

        {/* Comprehensive About Section - 1000+ words */}
        <section className="mt-16 space-y-8">
          <div className="prose prose-lg max-w-none dark:prose-invert">
            <h2 className="text-3xl font-bold text-foreground mb-6">About Our Free Online Image Rotate & Flip Tool</h2>
            
            <p className="text-muted-foreground leading-relaxed">
              Welcome to our comprehensive image rotation and flip tool, designed to correct orientations, straighten horizons, and transform your images with precision and ease. Whether you're fixing photos that were captured at the wrong angle, creating mirror images for design projects, straightening slightly tilted shots, or preparing images for specific display requirements, our free online rotate and flip tool provides all the capabilities you need. With instant processing, lossless transformations, and intuitive controls, correcting image orientation has never been simpler.
            </p>

            <p className="text-muted-foreground leading-relaxed">
              Image orientation issues are among the most common problems encountered when working with digital photographs. Despite sophisticated orientation sensors in modern cameras and smartphones, images frequently end up rotated incorrectly – sideways portraits that should be vertical, upside-down captures from cameras held at unusual angles, or scanned documents that need reorientation. Our rotation tool addresses all these scenarios with one-click preset rotations and custom angle adjustments for more nuanced corrections.
            </p>

            <p className="text-muted-foreground leading-relaxed">
              The cornerstone of our rotation capabilities is the set of preset angle options that address the most common rotation needs. The 90° clockwise rotation is perfect for portrait photos captured in landscape orientation, turning them upright with a single click. The 180° rotation corrects completely inverted images, common when cameras are held upside down or when scanning documents placed incorrectly. The 270° clockwise rotation (equivalent to 90° counter-clockwise) provides the opposite correction to 90° rotation, essential for photos rotated the wrong direction.
            </p>

            <p className="text-muted-foreground leading-relaxed">
              Beyond preset angles, our custom rotation feature unlocks precise control over image orientation. Specify any angle from 0° to 360° to straighten slightly tilted horizons, correct minor camera tilt, or create intentional diagonal compositions for artistic effect. The real-time preview shows exactly how your rotated image will look before you commit, making it easy to find the perfect angle. Fine-tuning controls let you adjust in small increments for pixel-perfect straightening.
            </p>

            <p className="text-muted-foreground leading-relaxed">
              Flipping operations provide a different type of image transformation, creating mirror reflections rather than angular rotations. Horizontal flip produces a left-to-right mirror image, as if viewing the photograph reflected in a vertical mirror. This is invaluable for correcting selfies taken with front-facing cameras that capture mirror images, creating symmetrical designs from asymmetrical sources, or reversing scanned documents that were placed face-down.
            </p>

            <p className="text-muted-foreground leading-relaxed">
              Vertical flip inverts the image from top to bottom, as if reflected in a horizontal mirror. While less commonly needed than horizontal flip, vertical flip is essential for correcting images captured with inverted cameras, creating reflection effects for artistic compositions, or preparing images for certain printing and manufacturing processes where vertical inversion is required. Combined with rotation, vertical flip provides complete orientation control for any correction need.
            </p>

            <p className="text-muted-foreground leading-relaxed">
              Understanding the technical distinction between different rotation types is important for quality-conscious users. Standard angle rotations (90°, 180°, 270°) are mathematically lossless transformations – they simply rearrange existing pixels without any interpolation or resampling. This means these rotations can be applied repeatedly without any cumulative quality degradation. Flip operations are similarly lossless, simply reversing the order of pixel rows or columns without affecting pixel values.
            </p>

            <p className="text-muted-foreground leading-relaxed">
              Custom angle rotations require a different approach since pixels must be mapped to positions that may not align with the original pixel grid. Our tool employs sophisticated interpolation algorithms that calculate new pixel values with minimal quality impact. For most practical purposes, the quality difference is imperceptible, but photographers working with critical images should be aware that arbitrary angle rotations involve mathematical processing beyond simple pixel rearrangement.
            </p>

            <p className="text-muted-foreground leading-relaxed">
              Batch processing capabilities enable efficient correction of multiple images with consistent settings. When you've captured a series of images with the same orientation problem – all the photos from an event where your camera's orientation sensor malfunctioned, for example – batch rotation lets you correct them all at once rather than processing each individually. This workflow optimization can save significant time when dealing with large image collections.
            </p>

            <p className="text-muted-foreground leading-relaxed">
              Privacy and security are fundamental to our tool's design. Every rotation and flip operation occurs entirely within your web browser using client-side JavaScript processing. Your images are processed locally on your device and never transmitted to any external server. This means your photos remain completely private – personal images, sensitive documents, and pre-release creative work can all be processed with absolute confidence that they won't be exposed to third parties.
            </p>

            <p className="text-muted-foreground leading-relaxed">
              Our tool supports all major image formats including JPEG, PNG, WebP, GIF, and TIFF. Format-specific considerations are handled automatically – transparency in PNG files is preserved, JPEG compression efficiency is maintained, and GIF animations can be rotated with all frames transformed consistently. The output format matches your input to ensure seamless integration with your existing workflow, though format conversion options are available when needed.
            </p>

            <p className="text-muted-foreground leading-relaxed">
              The real-time preview system provides immediate visual feedback as you adjust rotation angles or toggle flip options. See exactly how your transformed image will look before downloading, ensuring you get the correct result on the first try. The preview updates instantly, enabling rapid experimentation with different settings until you achieve the perfect orientation for your image.
            </p>
          </div>
        </section>

        {/* How to Use Guide with 4K Screenshots */}
        {guideData && (
          <section className="mt-12">
            <HowToUseGuide 
              guideData={guideData}
              toolName="Rotate & Flip Tool"
              gradientFrom="#6366f1"
              gradientTo="#4f46e5"
            />
          </section>
        )}

        {/* Why Use Section */}
        <section className="mt-12 space-y-6">
          <h2 className="text-3xl font-bold text-foreground">Why Use Our Rotate & Flip Tool?</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              { icon: RotateCw, title: "Multiple Rotation Options", desc: "90°, 180°, 270° presets plus custom angle rotation for any orientation correction need." },
              { icon: FlipHorizontal, title: "Horizontal & Vertical Flip", desc: "Create mirror images in either direction. Perfect for selfie correction and design work." },
              { icon: Settings, title: "Custom Angle Control", desc: "Rotate by any angle from 0° to 360° for precise horizon straightening and artistic effects." },
              { icon: Zap, title: "Lossless Transformations", desc: "Standard rotations and flips preserve full image quality with no degradation." },
              { icon: Eye, title: "Real-Time Preview", desc: "See your transformed image instantly. Adjust settings with immediate visual feedback." },
              { icon: Shield, title: "Complete Privacy", desc: "Images never leave your device. All processing happens locally in your browser." }
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
          <h2 className="text-3xl font-bold text-foreground">Key Benefits of Image Rotation & Flip</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              "Fix incorrectly oriented photos",
              "Straighten tilted horizons",
              "Correct selfie mirror effect",
              "Prepare images for print",
              "Create mirror designs",
              "Fix scanner orientation",
              "Artistic angle compositions",
              "Batch process collections",
              "Preserve original quality"
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
                  Your photos are personal, and we respect that. Our rotate and flip tool operates entirely within your web browser using client-side JavaScript technology. Your images are processed locally on your device and never uploaded to any external server.
                </p>
              </div>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              {[
                { title: "100% Local Processing", desc: "All rotation and flip operations happen in your browser. Zero data transmission." },
                { title: "No Data Collection", desc: "We don't track, store, or analyze any information about your images." },
                { title: "No Account Required", desc: "Use our tool freely without registration, login, or personal information." },
                { title: "Automatic Memory Cleanup", desc: "When you close the tab, all processed images are automatically cleared." }
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

export default ImageRotateFlipPage;
