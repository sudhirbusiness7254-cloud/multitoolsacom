import { Helmet } from "react-helmet-async";
import CategoryPageLayout from "@/components/CategoryPageLayout";
import UniversalImageCombine from "@/components/UniversalImageCombine";
import { getCategoryBySlug } from "@/data/toolsData";
import { getCategorySEOContent } from "@/data/categorySEOData";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { CheckCircle, Shield, Zap, Layers, Lock, Eye, Settings, Grid } from "lucide-react";
import { AdVideo, AdInline, AdExoticFat } from "@/components/ads/AdContainer";

const ImageCombinePage = () => {
  const category = getCategoryBySlug("image-combine")!;
  const seoContent = getCategorySEOContent("image-combine")!;

  const faqs = [
    {
      question: "What is image combining and what can I create with it?",
      answer: "Image combining merges multiple separate images into a single unified image. You can create collages, side-by-side comparisons, before/after presentations, photo grids for social media, panoramic compositions, and layered composite images for creative projects."
    },
    {
      question: "How many images can I combine at once?",
      answer: "Our tool supports combining multiple images in various arrangements. You can create horizontal or vertical layouts with 2-10+ images, grid arrangements, or layered compositions. The practical limit depends on your desired output size and image complexity."
    },
    {
      question: "What layout options are available?",
      answer: "We offer horizontal arrangements (images side by side), vertical stacking (images top to bottom), grid layouts (rows and columns), and overlay/layer modes for creative composites. Each layout has customizable spacing and alignment options."
    },
    {
      question: "Can I adjust spacing between combined images?",
      answer: "Yes, you have full control over spacing (gap) between images, border widths, and padding. You can also choose background colors for the gaps or make them transparent. This helps create professional-looking collages and presentations."
    },
    {
      question: "Will the combined image maintain quality?",
      answer: "Our tool preserves the original quality of each source image in the combined output. You can also choose output quality settings to balance file size with visual quality. Images are processed at their native resolution."
    },
    {
      question: "Can I combine images of different sizes?",
      answer: "Yes! Our intelligent sizing algorithms can automatically resize images to match heights (for horizontal layouts), widths (for vertical layouts), or fit within grid cells. You can also manually specify output dimensions."
    },
    {
      question: "What image formats are supported?",
      answer: "We support all major formats including JPEG, PNG, WebP, GIF, and TIFF. You can mix different input formats, and the output can be saved in your preferred format with appropriate quality settings."
    },
    {
      question: "Are my images kept private during combining?",
      answer: "Absolutely. All image combining happens directly in your browser using client-side processing. Your images are never uploaded to any server, ensuring complete privacy for personal photos or sensitive content."
    }
  ];

  return (
    <>
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            "name": "Free Online Image Combiner",
            "description": "Combine multiple images into one online for free. Create collages, side-by-side comparisons, and photo grids with our browser-based tool.",
            "url": window.location.href,
            "applicationCategory": "MultimediaApplication",
            "operatingSystem": "Any",
            "offers": {
              "@type": "Offer",
              "price": "0",
              "priceCurrency": "USD"
            },
            "featureList": [
              "Horizontal image combining",
              "Vertical image stacking",
              "Grid layouts",
              "Adjustable spacing",
              "Multiple format support",
              "Client-side processing"
            ]
          })}
        </script>
      </Helmet>

      <CategoryPageLayout category={category} seoContent={seoContent}>
        <UniversalImageCombine />
        {/* Video Ad - Below Tool Output */}
        <AdVideo className="mt-6" />

        {/* Comprehensive About Section - 1000+ words */}
        <section className="mt-16 space-y-8">
          <div className="prose prose-lg max-w-none dark:prose-invert">
            <h2 className="text-3xl font-bold text-foreground mb-6">About Our Free Online Image Combiner</h2>
            
            <p className="text-muted-foreground leading-relaxed">
              Welcome to our powerful, versatile image combining tool designed to merge multiple images into stunning unified compositions. Whether you're creating eye-catching social media collages, professional before-and-after comparisons, engaging photo grids, or artistic composite images, our free online image combiner provides the flexibility and precision you need to bring your creative visions to life. With intuitive layout options, customizable spacing controls, and professional-quality output, this tool transforms the complex task of image merging into a seamless, enjoyable experience.
            </p>

            <p className="text-muted-foreground leading-relaxed">
              In today's visually-driven digital landscape, the ability to combine multiple images effectively has become an essential skill for content creators, marketers, photographers, and everyday users alike. Social media platforms thrive on engaging visual content, and combined images – whether collages, comparison shots, or creative composites – consistently outperform single images in terms of engagement and shareability. Our image combiner tool democratizes access to professional-quality image merging, eliminating the need for expensive software or technical expertise while delivering results that rival dedicated design applications.
            </p>

            <p className="text-muted-foreground leading-relaxed">
              The foundation of our image combiner is its comprehensive selection of layout options designed to address every common use case. Horizontal combining arranges images side by side in a row, perfect for before-and-after comparisons, sequential storytelling, or creating wide panoramic-style compositions from separate shots. This layout automatically aligns images by height, ensuring a clean, professional appearance regardless of the original image dimensions. Whether you're showcasing a transformation, comparing products, or creating a visual timeline, horizontal combining delivers polished results.
            </p>

            <p className="text-muted-foreground leading-relaxed">
              Vertical stacking places images one above another, creating tall compositions ideal for social media stories, Pinterest pins, infographic-style content, or step-by-step visual guides. This layout aligns images by width, ensuring consistent left-to-right alignment throughout the combined image. Content creators frequently use vertical combinations for tutorial content, recipe steps, or fashion lookbooks where the natural viewing flow moves from top to bottom.
            </p>

            <p className="text-muted-foreground leading-relaxed">
              Grid layouts unlock even more creative possibilities, arranging images in rows and columns to create organized, visually balanced compositions. Whether you're creating a photo collage of vacation highlights, a product catalog grid, a team photo arrangement, or a mood board for creative projects, grid layouts provide structure while accommodating varying numbers of images. Our intelligent grid system automatically calculates optimal row and column arrangements based on your image count, though you retain full control to customize the layout as needed.
            </p>

            <p className="text-muted-foreground leading-relaxed">
              Understanding that visual design is about more than just arrangement, our tool provides extensive customization options for fine-tuning your combined images. Spacing controls let you adjust the gap between images – tight spacing creates a seamless, connected feel, while generous spacing gives each image room to breathe and establishes clear visual separation. Border options add professional finishing touches, and background color selection (including transparency) ensures your combined image integrates perfectly with its intended context.
            </p>

            <p className="text-muted-foreground leading-relaxed">
              One of the most challenging aspects of combining images is handling photographs of different sizes and aspect ratios. Our intelligent sizing algorithms address this challenge automatically, resizing images to create harmonious compositions while preserving the visual integrity of each source image. For horizontal layouts, images are scaled to match heights; for vertical layouts, widths are equalized; for grids, images are fitted within consistent cell dimensions. This automatic sizing saves hours of manual adjustment while producing professional results.
            </p>

            <p className="text-muted-foreground leading-relaxed">
              Beyond basic combining, our tool supports overlay and layering modes for more advanced creative compositions. Layer one image over another with adjustable opacity to create artistic double exposures, subtle watermarks, or complex composite images. This functionality bridges the gap between simple image combining and advanced photo manipulation, providing creative options typically found only in professional editing software.
            </p>

            <p className="text-muted-foreground leading-relaxed">
              Quality preservation is paramount throughout our combining process. Each source image maintains its original detail and color accuracy in the final combined output. Our processing algorithms handle color space conversions correctly, apply appropriate anti-aliasing for smooth edges, and produce outputs that stand up to close examination. Adjustable output quality settings let you balance file size with visual fidelity based on your intended use – maximum quality for printing or portfolios, optimized settings for web delivery.
            </p>

            <p className="text-muted-foreground leading-relaxed">
              Privacy and security form the foundation of our tool's architecture. Every combining operation occurs entirely within your web browser using sophisticated client-side JavaScript processing. This means your images never leave your device – they're not uploaded to any server, stored in any cloud, or accessible to any third party. For personal photos, sensitive business images, or pre-release creative work, this local processing approach provides absolute assurance that your content remains private and secure.
            </p>

            <p className="text-muted-foreground leading-relaxed">
              Our tool supports all major image formats including JPEG, PNG, WebP, GIF, and TIFF, with the flexibility to mix different input formats in a single combined image. Output format options ensure compatibility with your intended use case – JPEG for photographs, PNG for images requiring transparency, WebP for optimized web delivery. Format-specific optimizations ensure the best possible quality and file size for each output type.
            </p>

            <p className="text-muted-foreground leading-relaxed">
              The real-time preview system shows you exactly how your combined image will look as you adjust settings. Add or remove images, change layouts, adjust spacing, modify backgrounds – every change is reflected immediately in the preview, eliminating guesswork and enabling rapid iteration. This instant feedback loop makes it easy to experiment with different arrangements until you achieve exactly the result you're looking for.
            </p>
          </div>
        </section>

        {/* How to Use Section */}
        <section className="mt-12 space-y-6">
          <h2 className="text-3xl font-bold text-foreground">How to Combine Your Images</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { step: "1", title: "Upload Images", desc: "Drag and drop multiple images or click to browse. We support JPEG, PNG, WebP, GIF, and TIFF formats." },
              { step: "2", title: "Choose Layout", desc: "Select horizontal, vertical, grid, or overlay arrangement. Reorder images by dragging them into position." },
              { step: "3", title: "Customize", desc: "Adjust spacing, borders, and background color. Fine-tune alignment and sizing options as needed." },
              { step: "4", title: "Download", desc: "Preview your combined image and download when satisfied. Choose output format and quality settings." }
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
          <h2 className="text-3xl font-bold text-foreground">Why Use Our Image Combiner?</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              { icon: Layers, title: "Multiple Layout Options", desc: "Choose from horizontal, vertical, grid, and overlay arrangements to create the perfect composition for your needs." },
              { icon: Grid, title: "Smart Grid System", desc: "Automatically arrange images in balanced grids, perfect for collages, catalogs, and organized presentations." },
              { icon: Settings, title: "Full Customization", desc: "Control spacing, borders, backgrounds, and alignment. Fine-tune every aspect of your combined image." },
              { icon: Zap, title: "Instant Processing", desc: "Browser-based processing means no upload delays. Combine images instantly regardless of file size." },
              { icon: Eye, title: "Real-Time Preview", desc: "See exactly how your combined image looks as you adjust settings. Experiment freely with immediate feedback." },
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
          <h2 className="text-3xl font-bold text-foreground">Key Benefits of Image Combining</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              "Create engaging social media collages",
              "Build before-and-after comparisons",
              "Design professional photo grids",
              "Combine product shots",
              "Create visual storytelling sequences",
              "Build mood boards and inspiration",
              "Merge screenshots for tutorials",
              "Create team photo compositions",
              "Design event photo highlights"
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
                  We understand that your photos are personal and privacy matters. Our image combining tool operates entirely within your web browser using client-side JavaScript technology. Your images are processed locally on your device and are never uploaded to any external server.
                </p>
              </div>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              {[
                { title: "Zero Server Uploads", desc: "All combining happens 100% locally in your browser. No image data ever leaves your device." },
                { title: "No Data Collection", desc: "We don't track, store, or analyze any information about your images or combining activities." },
                { title: "No Account Required", desc: "Use our combine tool freely without registration, login, or sharing personal information." },
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

export default ImageCombinePage;
