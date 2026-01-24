import { Helmet } from "react-helmet-async";
import CategoryPageLayout from "@/components/CategoryPageLayout";
import UniversalImageDrawing from "@/components/UniversalImageDrawing";
import { getCategoryBySlug } from "@/data/toolsData";
import { getCategorySEOContent } from "@/data/categorySEOData";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { CheckCircle, Shield, Zap, Pencil, Lock, Eye, Settings, Type } from "lucide-react";
import { AdVideo, AdInline, AdExoticFat } from "@/components/ads/AdContainer";

const ImageDrawingPage = () => {
  const category = getCategoryBySlug("image-drawing")!;
  const seoContent = getCategorySEOContent("image-drawing")!;

  const faqs = [
    {
      question: "What drawing and annotation tools are available?",
      answer: "Our tool includes freehand drawing with adjustable brush sizes and colors, straight lines, arrows for pointing out elements, rectangles and circles for highlighting areas, text annotations with font customization, and an eraser for corrections. Each tool offers color and size customization."
    },
    {
      question: "Can I add text annotations to my images?",
      answer: "Yes! Our text tool lets you add labels, notes, and annotations anywhere on your image. Customize font size, color, and style to match your needs. Text annotations are perfect for creating tutorials, adding captions, or marking up documents."
    },
    {
      question: "Is there an undo/redo feature?",
      answer: "Absolutely. Our multi-level undo/redo system lets you step backward and forward through your edits. Made a mistake? Simply undo it. Changed your mind? Redo it. This gives you confidence to experiment freely with your annotations."
    },
    {
      question: "What brush sizes and colors are available?",
      answer: "We offer a wide range of brush sizes from fine detail work to bold strokes. The color picker provides unlimited color options including a convenient palette of commonly used colors. You can also adjust opacity for semi-transparent overlays."
    },
    {
      question: "Can I draw shapes like arrows and rectangles?",
      answer: "Yes, we provide shape tools including arrows (perfect for tutorials and callouts), rectangles for highlighting areas, circles for emphasizing points, and straight lines for connections and underlines. All shapes can be customized in color and stroke width."
    },
    {
      question: "How do I erase mistakes?",
      answer: "Use the eraser tool to remove unwanted marks. The eraser works on any drawn elements – freehand strokes, shapes, or text. You can adjust eraser size for precision work or broad corrections. Undo is also available for reverting recent changes."
    },
    {
      question: "What image formats are supported?",
      answer: "Our drawing tool supports all major image formats including JPEG, PNG, WebP, GIF, and TIFF. Your annotated image can be saved in the same format or converted to PNG to preserve transparency in your drawings."
    },
    {
      question: "Are my images kept private while annotating?",
      answer: "Yes, completely. All drawing and annotation happens directly in your browser using client-side processing. Your images are never uploaded to any server, ensuring complete privacy for personal photos or sensitive documents."
    }
  ];

  return (
    <>
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            "name": "Free Online Image Drawing & Annotation Tool",
            "description": "Draw on images and add annotations online for free. Add text, arrows, shapes, and freehand drawings with our browser-based tool.",
            "url": window.location.href,
            "applicationCategory": "MultimediaApplication",
            "operatingSystem": "Any",
            "offers": {
              "@type": "Offer",
              "price": "0",
              "priceCurrency": "USD"
            },
            "featureList": [
              "Freehand drawing",
              "Text annotations",
              "Arrow and shape tools",
              "Adjustable brush sizes",
              "Multiple colors",
              "Undo/redo support",
              "Client-side processing"
            ]
          })}
        </script>
      </Helmet>

      <CategoryPageLayout category={category} seoContent={seoContent}>
        <UniversalImageDrawing />
        {/* Video Ad - Below Tool Output */}
        <AdVideo className="mt-6" />

        {/* Comprehensive About Section - 1000+ words */}
        <section className="mt-16 space-y-8">
          <div className="prose prose-lg max-w-none dark:prose-invert">
            <h2 className="text-3xl font-bold text-foreground mb-6">About Our Free Online Image Drawing & Annotation Tool</h2>
            
            <p className="text-muted-foreground leading-relaxed">
              Welcome to our comprehensive image drawing and annotation tool, designed to transform any image into an informative, marked-up visual communication. Whether you're creating tutorials with step-by-step annotations, marking up documents for review, adding creative illustrations to photographs, highlighting important elements in screenshots, or preparing presentation materials with callouts and labels, our free online drawing tool provides all the capabilities you need in an intuitive, browser-based interface that requires no software installation or technical expertise.
            </p>

            <p className="text-muted-foreground leading-relaxed">
              Visual annotation has become an essential communication tool in our increasingly digital world. Rather than writing lengthy explanations, a few well-placed arrows and labels can convey information instantly and clearly. Technical writers use annotations to create software tutorials. Teachers mark up educational materials with highlights and notes. Designers provide feedback with circled elements and written comments. Project managers communicate requirements with annotated mockups. Our drawing tool makes all of these workflows accessible to everyone, regardless of their design software experience.
            </p>

            <p className="text-muted-foreground leading-relaxed">
              At the heart of our tool is a sophisticated freehand drawing engine that captures your natural drawing gestures with precision and smoothness. Whether you're using a mouse, trackpad, touchscreen, or stylus, the drawing experience feels natural and responsive. Adjustable brush sizes range from fine lines for detailed work to bold strokes for emphasis. An unlimited color palette lets you choose exactly the right color for any annotation purpose – red for critical attention, green for approved elements, blue for informational notes, or any shade that suits your visual communication needs.
            </p>

            <p className="text-muted-foreground leading-relaxed">
              Beyond freehand drawing, our comprehensive shape toolkit addresses the most common annotation needs with purpose-built tools. Arrows are perhaps the most valuable annotation element, instantly directing the viewer's attention to specific areas while indicating direction or sequence. Our arrow tool creates clean, professional arrows that can be positioned precisely where needed. Rectangle and circle tools let you highlight or frame important areas, creating visual emphasis that guides the viewer's eye. Straight line tools enable underlining, connections between elements, and structural annotations.
            </p>

            <p className="text-muted-foreground leading-relaxed">
              Text annotation capabilities transform our tool from a simple drawing application into a complete visual communication platform. Add labels, titles, explanatory notes, step numbers, or any textual content directly onto your images. Font size customization ensures your text is appropriately scaled for the image size and viewing context – larger text for presentations and smaller annotations for detailed technical documentation. Color options let you match or contrast text with surrounding elements, and positioning is completely flexible with drag-and-drop placement.
            </p>

            <p className="text-muted-foreground leading-relaxed">
              We understand that creativity often involves experimentation and revision, which is why our multi-level undo/redo system is a cornerstone feature. Made a mark you don't like? Undo it instantly. Want to try a different approach? Clear and start fresh. Changed your mind about that undo? Redo brings it back. This non-destructive workflow encourages experimentation and removes the anxiety of making mistakes. Combined with the eraser tool for selective corrections, you have complete control over your annotation process from start to finish.
            </p>

            <p className="text-muted-foreground leading-relaxed">
              The eraser tool provides surgical precision for corrections without affecting surrounding annotations. Adjust eraser size to match the scale of what you're removing – small for detailed corrections, large for clearing broader areas. The eraser works on all annotation types including freehand strokes, shapes, and text, giving you consistent correction capabilities across all your markup work. This selective editing capability is essential for refining annotations without starting over.
            </p>

            <p className="text-muted-foreground leading-relaxed">
              Touch screen support brings our annotation tool to tablets and touch-enabled devices, opening up intuitive finger-based and stylus-based annotation workflows. Draw naturally with your finger, use a stylus for precision work, or combine both approaches. The same tools and capabilities available on desktop work seamlessly on touch devices, making our tool ideal for mobile professionals, classroom use with tablets, or anyone who prefers touch-based interaction.
            </p>

            <p className="text-muted-foreground leading-relaxed">
              Our tool supports all major image formats including JPEG, PNG, WebP, GIF, and TIFF as input sources. When saving your annotated image, format options ensure compatibility with your intended use case. PNG output preserves any transparency in your annotations and provides lossless quality ideal for further editing. JPEG output offers smaller file sizes for web sharing. The original image quality is preserved throughout the annotation process, ensuring professional results.
            </p>

            <p className="text-muted-foreground leading-relaxed">
              Privacy and security are built into the foundation of our drawing tool. Every annotation operation occurs entirely within your web browser using client-side JavaScript processing. This means your images never leave your device – they're not uploaded to any server, stored in any cloud, or accessible to any third party. For sensitive documents, confidential materials, or personal photos, this local processing approach provides absolute assurance that your content remains private.
            </p>

            <p className="text-muted-foreground leading-relaxed">
              The real-time canvas provides immediate visual feedback as you draw, ensuring what you see is exactly what you'll get in the final output. Zoom capabilities let you work at different magnification levels – zoom in for detailed work on small areas, zoom out for overall composition review. Pan controls let you navigate large images efficiently. These navigation tools ensure you can work comfortably with images of any size and focus on exactly the areas that need annotation.
            </p>

            <p className="text-muted-foreground leading-relaxed">
              Whether you're a professional creating polished tutorials, a student annotating research materials, a business user marking up presentations, or anyone who needs to add visual information to images, our drawing and annotation tool provides the capabilities, ease of use, and quality output you need. The combination of comprehensive tools, intuitive interface, and privacy-focused design makes it the ideal choice for all your image annotation needs.
            </p>
          </div>
        </section>

        {/* How to Use Section */}
        <section className="mt-12 space-y-6">
          <h2 className="text-3xl font-bold text-foreground">How to Draw and Annotate Images</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { step: "1", title: "Upload Image", desc: "Drag and drop your image or click to browse. We support JPEG, PNG, WebP, GIF, and TIFF formats." },
              { step: "2", title: "Select Tools", desc: "Choose from freehand drawing, arrows, shapes, text, or eraser. Customize color and size settings." },
              { step: "3", title: "Annotate", desc: "Draw, add shapes, and type text. Use undo/redo freely to perfect your annotations." },
              { step: "4", title: "Download", desc: "Save your annotated image in your preferred format. Original quality is preserved." }
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
          <h2 className="text-3xl font-bold text-foreground">Why Use Our Drawing Tool?</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              { icon: Pencil, title: "Complete Drawing Tools", desc: "Freehand drawing, shapes, arrows, and more. Everything you need to annotate images professionally." },
              { icon: Type, title: "Text Annotations", desc: "Add labels, notes, and captions with customizable fonts, sizes, and colors for clear communication." },
              { icon: Settings, title: "Full Customization", desc: "Adjustable brush sizes, unlimited colors, and opacity controls for precise annotation work." },
              { icon: Zap, title: "Undo/Redo Support", desc: "Multi-level undo and redo lets you experiment freely and correct mistakes instantly." },
              { icon: Eye, title: "Real-Time Preview", desc: "See your annotations as you draw them. Zoom and pan for detailed work on any image size." },
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
          <h2 className="text-3xl font-bold text-foreground">Key Benefits of Image Annotation</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              "Create tutorials and guides",
              "Mark up documents for review",
              "Add callouts to screenshots",
              "Highlight important elements",
              "Create educational materials",
              "Provide design feedback",
              "Annotate maps and diagrams",
              "Add captions to photos",
              "Build presentation visuals"
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
                  We understand that images you annotate may contain sensitive information. Our drawing tool operates entirely within your web browser using client-side JavaScript technology. Your images are processed locally and never uploaded to any external server.
                </p>
              </div>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              {[
                { title: "100% Local Processing", desc: "All drawing and annotation happens in your browser. Zero data transmission to servers." },
                { title: "No Data Collection", desc: "We don't track, store, or analyze any information about your images or annotations." },
                { title: "No Account Required", desc: "Use our drawing tool freely without registration, login, or personal information." },
                { title: "Automatic Memory Cleanup", desc: "When you close the browser tab, all images are automatically cleared from memory." }
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

export default ImageDrawingPage;
