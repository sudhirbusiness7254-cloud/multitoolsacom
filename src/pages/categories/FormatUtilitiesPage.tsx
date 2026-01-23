import { useState } from "react";
import { Helmet } from "react-helmet-async";
import CategoryPageLayout from "@/components/CategoryPageLayout";
import UniversalFormatUtility from "@/components/UniversalFormatUtility";
import { getCategoryBySlug } from "@/data/toolsData";
import { getCategorySEOContent } from "@/data/categorySEOData";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { CheckCircle, Shield, Zap, Palette, Lock, Eye, Settings, Wand2 } from "lucide-react";
import { AdVideo, AdInline } from "@/components/ads/AdContainer";

type UtilityMode = "grayscale" | "blackwhite" | "add-transparency" | "remove-transparency" | "invert" | "sepia";

const FormatUtilitiesPage = () => {
  const category = getCategoryBySlug("image-format-utilities")!;
  const seoContent = getCategorySEOContent("image-format-utilities")!;
  const [selectedMode, setSelectedMode] = useState<UtilityMode>("grayscale");
  const [key, setKey] = useState(0);

  const faqs = [
    {
      question: "What color utility options are available?",
      answer: "Our tool offers grayscale conversion (color to B&W), pure black & white (high contrast), sepia toning (vintage brown tones), color inversion (negative effect), add transparency, and remove transparency. Each serves different creative and practical purposes."
    },
    {
      question: "What's the difference between grayscale and black & white?",
      answer: "Grayscale converts colors to a full range of gray tones, preserving smooth gradients and subtle details. Pure black & white creates high-contrast images with only two colors, producing a bold, graphic look. Choose based on whether you want tonal subtlety or dramatic contrast."
    },
    {
      question: "How does adding transparency work?",
      answer: "Adding transparency removes a selected color (typically white or black backgrounds) and makes those areas transparent. This is perfect for creating logos and graphics that can overlay any background. The result is saved as PNG to preserve transparency."
    },
    {
      question: "Why would I remove transparency?",
      answer: "Removing transparency replaces transparent areas with a solid color (usually white). This is necessary when formats require solid backgrounds (like JPEG), when printing on paper, or when transparency causes display issues in certain applications."
    },
    {
      question: "What is color inversion used for?",
      answer: "Color inversion creates a 'negative' effect where every color is replaced with its opposite on the color wheel. This can create striking artistic effects, improve readability of certain images, or prepare images for specific printing processes."
    },
    {
      question: "How does sepia toning work?",
      answer: "Sepia applies warm brown tones to your image, creating a vintage, antique photograph aesthetic. This evokes nostalgia and timelessness, popular for portraits, landscapes, and any image you want to give a classic feel."
    },
    {
      question: "What image formats are supported?",
      answer: "We support all major image formats including JPEG, PNG, WebP, GIF, and TIFF. Transparency operations output as PNG to preserve alpha channels. Other conversions maintain your original format."
    },
    {
      question: "Are my images kept private during processing?",
      answer: "Yes, completely. All color transformations happen directly in your browser using client-side processing. Your images are never uploaded to any server, ensuring complete privacy."
    }
  ];

  return (
    <>
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            "name": "Free Online Image Format Utilities",
            "description": "Convert images to grayscale, black & white, sepia, and more. Add or remove transparency. Free browser-based image utilities.",
            "url": window.location.href,
            "applicationCategory": "MultimediaApplication",
            "operatingSystem": "Any",
            "offers": {
              "@type": "Offer",
              "price": "0",
              "priceCurrency": "USD"
            },
            "featureList": [
              "Grayscale conversion",
              "Black & white conversion",
              "Sepia toning",
              "Color inversion",
              "Add transparency",
              "Remove transparency",
              "Client-side processing"
            ]
          })}
        </script>
      </Helmet>

      <CategoryPageLayout category={category} seoContent={seoContent}>
        <UniversalFormatUtility key={key} initialMode={selectedMode} />
        {/* Video Ad - Below Tool Output */}
        <AdVideo className="mt-6" />

        {/* Comprehensive About Section - 1000+ words */}
        <section className="mt-16 space-y-8">
          <div className="prose prose-lg max-w-none dark:prose-invert">
            <h2 className="text-3xl font-bold text-foreground mb-6">About Our Free Online Image Format Utilities</h2>
            
            <p className="text-muted-foreground leading-relaxed">
              Welcome to our comprehensive collection of image format utilities, providing essential color transformations and transparency management tools that address common image processing needs. From converting color photographs to elegant grayscale, creating high-contrast black and white graphics, applying timeless sepia tones, managing transparency for logos and overlays, to inverting colors for creative effects, our free online toolkit covers the fundamental image transformations that professionals and casual users alike encounter regularly in their workflows.
            </p>

            <p className="text-muted-foreground leading-relaxed">
              Image format utilities represent the foundational building blocks of image processing – the essential transformations that prepare images for specific uses, create particular aesthetic effects, or solve practical compatibility challenges. While these operations may seem simple compared to complex photo editing, they're among the most frequently needed image manipulations. Our browser-based approach makes these essential tools instantly accessible without software installation, learning curves, or subscription fees.
            </p>

            <p className="text-muted-foreground leading-relaxed">
              Grayscale conversion transforms full-color images into black-and-white photographs with a complete range of gray tones. Unlike simple desaturation that can produce flat results, our grayscale algorithm considers the luminance values of different color channels to produce conversions that maintain the visual depth and contrast of the original. Red, green, and blue channels contribute differently to perceived brightness, and proper grayscale conversion accounts for this, ensuring that different colored objects remain distinguishable by their gray values.
            </p>

            <p className="text-muted-foreground leading-relaxed">
              Pure black and white conversion takes grayscale further, reducing images to only two values with no intermediate grays. This creates bold, graphic imagery with maximum contrast. The threshold setting determines which gray values become black and which become white, allowing you to control the balance and highlight different aspects of the image. This effect is popular for creating striking artwork, preparing images for certain printing processes, or generating high-contrast graphics from photographs.
            </p>

            <p className="text-muted-foreground leading-relaxed">
              Sepia toning applies warm, brownish tones that evoke the aesthetic of antique photographs and historical imagery. The sepia effect has enduring popularity because it combines the timelessness of black and white with a warmth that feels more inviting than pure grayscale. Our sepia implementation offers adjustable intensity, from subtle warming that adds gentle nostalgia to full vintage transformation that completely reimagines modern photos as historical artifacts.
            </p>

            <p className="text-muted-foreground leading-relaxed">
              Color inversion creates negative images where every color is replaced by its opposite on the color wheel – white becomes black, red becomes cyan, blue becomes yellow. This transformation has both creative and practical applications. Artistically, inversion creates surreal, otherworldly imagery. Practically, it can improve readability of certain documents, prepare images for specific printing processes, or reveal details that are obscured in the original positive image.
            </p>

            <p className="text-muted-foreground leading-relaxed">
              Transparency management tools address one of the most common practical challenges in image work. Adding transparency converts solid backgrounds to transparent areas, essential for creating logos, icons, and graphics that need to overlay other content seamlessly. Our tool intelligently identifies background colors and converts them to transparency while preserving the subjects you want to keep. Adjustable tolerance handles anti-aliased edges and similar colors appropriately.
            </p>

            <p className="text-muted-foreground leading-relaxed">
              Removing transparency performs the inverse operation, replacing transparent areas with solid colors. This is necessary when moving images to formats that don't support transparency (like standard JPEG), when preparing images for printing where transparency would appear as unprinted paper, or when images with transparency display incorrectly in certain applications. You can choose any background color, though white is most common.
            </p>

            <p className="text-muted-foreground leading-relaxed">
              Understanding when to use each utility helps achieve optimal results. Grayscale works beautifully for photographs where you want to emphasize form, texture, and emotion over color – portraits, architecture, street photography. Pure black and white suits graphic purposes, text documents, and bold artistic statements. Sepia adds warmth and nostalgia to any subject, particularly portraits and landscapes. Color inversion serves creative projects and specific technical requirements.
            </p>

            <p className="text-muted-foreground leading-relaxed">
              Our tools preserve image quality throughout all transformations. Grayscale and sepia conversions maintain the full tonal range of the original, preventing banding or posterization. Transparency operations create clean edges with appropriate anti-aliasing. All outputs use proper color profiles and bit depths to ensure compatibility with subsequent editing or publishing workflows.
            </p>

            <p className="text-muted-foreground leading-relaxed">
              Privacy and security are fundamental to our format utilities. Every transformation occurs entirely within your web browser using client-side JavaScript processing. Your images are never uploaded to any server, stored in any cloud, or accessible to any third party. Whether you're processing personal photos, proprietary graphics, or confidential documents, local processing provides absolute assurance that your content remains private.
            </p>

            <p className="text-muted-foreground leading-relaxed">
              Our tool supports all major image formats including JPEG, PNG, WebP, GIF, and TIFF. Format-appropriate output ensures optimal results – transparency operations produce PNG files to preserve alpha channels, while other transformations match input formats for workflow compatibility. Quality settings are available where applicable, letting you balance file size with visual fidelity.
            </p>

            <p className="text-muted-foreground leading-relaxed">
              The real-time preview system shows exactly how each transformation affects your specific image before you commit. See grayscale conversion, sepia toning, or transparency changes applied instantly, making it easy to evaluate results and adjust settings if needed. This immediate feedback eliminates guesswork and enables confident decision-making about which effect best serves your purpose.
            </p>
          </div>
        </section>

        {/* How to Use Section */}
        <section className="mt-12 space-y-6">
          <h2 className="text-3xl font-bold text-foreground">How to Use Image Format Utilities</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { step: "1", title: "Upload Image", desc: "Drag and drop your image or click to browse. We support JPEG, PNG, WebP, GIF, and TIFF formats." },
              { step: "2", title: "Choose Utility", desc: "Select your transformation: grayscale, B&W, sepia, invert colors, add transparency, or remove transparency." },
              { step: "3", title: "Adjust Settings", desc: "Fine-tune parameters like threshold levels, tolerance, or intensity. Preview changes in real-time." },
              { step: "4", title: "Download", desc: "Save your transformed image. Format is automatically optimized for your chosen utility." }
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
          <h2 className="text-3xl font-bold text-foreground">Why Use Our Format Utilities?</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              { icon: Palette, title: "Complete Color Control", desc: "Grayscale, B&W, sepia, and inversion options for any creative or practical color transformation need." },
              { icon: Wand2, title: "Transparency Management", desc: "Add or remove transparency with intelligent edge detection. Perfect for logos and overlays." },
              { icon: Settings, title: "Adjustable Parameters", desc: "Fine-tune thresholds, tolerance, and intensity to achieve exactly the result you need." },
              { icon: Zap, title: "Instant Processing", desc: "Browser-based processing means instant results. Transform images in milliseconds." },
              { icon: Eye, title: "Real-Time Preview", desc: "See transformations applied to your image instantly. Adjust settings with immediate feedback." },
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
          <h2 className="text-3xl font-bold text-foreground">Key Benefits of Format Utilities</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              "Create elegant grayscale images",
              "Design bold B&W graphics",
              "Add vintage sepia warmth",
              "Prepare transparent logos",
              "Fix transparency issues",
              "Create negative/inverted art",
              "Prepare images for print",
              "Format compatibility fixes",
              "Quick batch transformations"
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
                  Whether you're converting personal photos or proprietary graphics, privacy matters. Our format utilities operate entirely within your web browser using client-side JavaScript. Your images are processed locally and never uploaded to any external server.
                </p>
              </div>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              {[
                { title: "100% Local Processing", desc: "All transformations happen in your browser. Zero data transmission to servers." },
                { title: "No Data Collection", desc: "We don't track, store, or analyze any information about your images." },
                { title: "No Account Required", desc: "Use our utilities freely without registration, login, or personal information." },
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

export default FormatUtilitiesPage;
