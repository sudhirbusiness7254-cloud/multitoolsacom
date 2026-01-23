import { Helmet } from "react-helmet-async";
import CategoryPageLayout from "@/components/CategoryPageLayout";
import UniversalDocumentConverter from "@/components/UniversalDocumentConverter";
import { getCategoryBySlug } from "@/data/toolsData";
import { getCategorySEOContent } from "@/data/categorySEOData";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { CheckCircle, Shield, Zap, FileText, Lock, Eye, Settings, FileImage } from "lucide-react";
import { AdVideo, AdInline } from "@/components/ads/AdContainer";

const ImageToDocumentPage = () => {
  const category = getCategoryBySlug("image-to-document")!;
  const seoContent = getCategorySEOContent("image-to-document")!;

  const faqs = [
    {
      question: "What document formats can I convert images to?",
      answer: "Our tool converts images to PDF (most popular for sharing and printing), Word/DOCX (for editable documents), PowerPoint/PPTX (for presentations), and HTML (for web pages). Each format has specific advantages for different use cases."
    },
    {
      question: "Can I convert multiple images into a single PDF?",
      answer: "Yes! Our tool supports combining multiple images into a single multi-page PDF document. You can arrange the page order, set orientation, and adjust margins before creating your PDF."
    },
    {
      question: "Will OCR be applied to make text searchable?",
      answer: "Our basic conversion creates image-based documents where images are embedded as-is. For OCR (text recognition) that makes documents searchable and editable, additional processing is required which may be available in specific tools."
    },
    {
      question: "What image formats can I convert to documents?",
      answer: "We support all major image formats as input including JPEG, PNG, WebP, GIF, TIFF, and BMP. Any of these can be converted to your chosen document format while preserving quality."
    },
    {
      question: "Can I adjust the layout and sizing in the document?",
      answer: "Yes, you can control page size (A4, Letter, etc.), orientation (portrait/landscape), margins, and image scaling. This ensures your images fit properly within the document format you choose."
    },
    {
      question: "Why convert images to PDF?",
      answer: "PDF is the universal format for sharing and printing. Converting images to PDF ensures consistent appearance across all devices, enables multi-page documents, adds printing options, and creates professional deliverables from image collections."
    },
    {
      question: "Can I convert images to editable Word documents?",
      answer: "We embed images into Word documents, which can then be edited in Microsoft Word or compatible software. You can add text, adjust layouts, and further customize the document after conversion."
    },
    {
      question: "Are my images kept private during conversion?",
      answer: "Absolutely. All document conversion happens directly in your browser using client-side processing. Your images and resulting documents are never uploaded to any server."
    }
  ];

  return (
    <>
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            "name": "Free Online Image to Document Converter",
            "description": "Convert images to PDF, Word, PowerPoint, and HTML online for free. Create professional documents from your photos and graphics.",
            "url": window.location.href,
            "applicationCategory": "MultimediaApplication",
            "operatingSystem": "Any",
            "offers": {
              "@type": "Offer",
              "price": "0",
              "priceCurrency": "USD"
            },
            "featureList": [
              "Image to PDF conversion",
              "Image to Word conversion",
              "Image to PowerPoint conversion",
              "Image to HTML conversion",
              "Multi-image to PDF",
              "Custom page layouts",
              "Client-side processing"
            ]
          })}
        </script>
      </Helmet>

      <CategoryPageLayout category={category} seoContent={seoContent}>
        <UniversalDocumentConverter />
        {/* Video Ad - Below Tool Output */}
        <AdVideo className="mt-6" />

        {/* Comprehensive About Section - 1000+ words */}
        <section className="mt-16 space-y-8">
          <div className="prose prose-lg max-w-none dark:prose-invert">
            <h2 className="text-3xl font-bold text-foreground mb-6">About Our Free Online Image to Document Converter</h2>
            
            <p className="text-muted-foreground leading-relaxed">
              Welcome to our comprehensive image to document conversion platform, the ultimate solution for transforming your photographs, graphics, screenshots, and visual content into professional document formats. In the modern professional and personal landscape, the ability to convert images into universally compatible document formats has become an essential capability. Whether you're creating portfolios, compiling reports, building presentations, preparing print materials, or archiving visual content, our free online tool provides the precision, flexibility, and quality you need to produce polished, professional documents from any image source.
            </p>

            <p className="text-muted-foreground leading-relaxed">
              The need for image to document conversion arises across countless professional and personal scenarios. Photographers prepare client galleries and proof sheets in PDF format for easy viewing and printing. Business professionals compile visual reports and presentations that combine charts, screenshots, and photographs. Students organize research images, diagrams, and visual notes into coherent study materials. Real estate agents create property brochures from listing photos. Healthcare providers prepare visual documentation for records. Designers compile portfolios that showcase their work in professional presentations. Our tool addresses all these needs with a unified, intuitive interface that produces high-quality results.
            </p>

            <p className="text-muted-foreground leading-relaxed">
              PDF (Portable Document Format) conversion is our most popular feature, and for good reason. PDF has become the de facto standard for document sharing because it preserves exact formatting across all devices and platforms. When you convert images to PDF, you create documents that look identical whether viewed on Windows, Mac, Linux, tablets, or smartphones. PDFs can be password-protected for security, digitally signed for authenticity, and printed with precise output matching. Our conversion tool offers complete control over page size, orientation, margins, and image placement, ensuring your PDF documents meet exact specifications.
            </p>

            <p className="text-muted-foreground leading-relaxed">
              Multi-image PDF creation is particularly valuable for compiling photo collections into cohesive documents. Combine vacation photos into a travel journal. Create multi-page product catalogs from individual product shots. Compile scan images of multi-page documents into single PDF files. Build photo books ready for printing services. Our tool lets you upload multiple images, arrange them in your preferred order, and generate a single PDF with each image on its own page or multiple images per page depending on your layout preferences.
            </p>

            <p className="text-muted-foreground leading-relaxed">
              Word document (DOCX) conversion bridges the gap between visual content and editable text documents. When you convert images to Word format, you create documents that can be further edited in Microsoft Word, Google Docs, or other word processors. Add captions and descriptions to your images. Incorporate visual content into reports and proposals. Create illustrated instructions and tutorials. The editable nature of Word documents makes this format ideal when you need to combine images with text content or when recipients need to make modifications.
            </p>

            <p className="text-muted-foreground leading-relaxed">
              PowerPoint (PPTX) conversion transforms images into presentation-ready slides. Each image becomes a slide, ready for you to add titles, bullet points, and speaker notes. This is invaluable for quickly creating presentations from visual content – product launches from product photos, training materials from process screenshots, portfolio presentations from artwork images. The resulting presentations can be edited in PowerPoint, Google Slides, or Keynote, giving you complete flexibility to refine your slides after conversion.
            </p>

            <p className="text-muted-foreground leading-relaxed">
              HTML conversion creates web-ready pages from your images. Each converted image becomes an HTML page that can be viewed in any web browser, embedded in websites, or used as the foundation for web galleries. This format is particularly useful for developers needing to quickly prototype image galleries, for creating simple web pages from visual content, or for generating content that will be integrated into larger web projects.
            </p>

            <p className="text-muted-foreground leading-relaxed">
              Understanding page layout options is essential for professional results. Standard page sizes include A4 (international standard), Letter (US standard), Legal, and various other formats. Orientation options let you choose portrait (taller than wide) or landscape (wider than tall) based on your image content and presentation needs. Margin controls ensure your images have appropriate spacing from page edges, preventing content from being cut off during printing and creating visually balanced layouts.
            </p>

            <p className="text-muted-foreground leading-relaxed">
              Image scaling options determine how your pictures fit within document pages. Fit-to-page scaling maximizes image size while maintaining aspect ratio and respecting margins. Original size preserves exact pixel dimensions, useful when precise sizing matters. Custom scaling lets you specify exact dimensions or percentages. These options ensure your images appear exactly as intended in the final document, whether you're creating full-bleed photo books or precise technical documentation.
            </p>

            <p className="text-muted-foreground leading-relaxed">
              Quality preservation is paramount throughout our conversion process. Images are embedded at their original resolution, ensuring that printed documents show full detail and screen viewing remains crisp. Our algorithms handle color space conversions correctly, maintaining accurate color reproduction from source images to final documents. Whether your images will be viewed on screen or printed professionally, quality remains consistent with your original files.
            </p>

            <p className="text-muted-foreground leading-relaxed">
              Privacy and security are fundamental to our conversion tool's design. Every operation occurs entirely within your web browser using client-side JavaScript processing. Your images and the documents you create never leave your device – they're not uploaded to any server, stored in any cloud, or accessible to any third party. For sensitive images, confidential business materials, or personal photos, this local processing approach provides absolute assurance that your content remains completely private.
            </p>

            <p className="text-muted-foreground leading-relaxed">
              Our tool supports all major image formats as input sources, including JPEG, PNG, WebP, GIF, TIFF, and BMP. This comprehensive format support ensures you can convert virtually any image file you encounter in your workflow, regardless of its source. Screenshots, digital photos, scanned documents, downloaded graphics – all can be converted to your preferred document format with consistent, high-quality results.
            </p>
          </div>
        </section>

        {/* How to Use Section */}
        <section className="mt-12 space-y-6">
          <h2 className="text-3xl font-bold text-foreground">How to Convert Images to Documents</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { step: "1", title: "Upload Images", desc: "Drag and drop your images or click to browse. Add multiple images for multi-page documents." },
              { step: "2", title: "Choose Format", desc: "Select your output format: PDF, Word (DOCX), PowerPoint (PPTX), or HTML." },
              { step: "3", title: "Configure Layout", desc: "Set page size, orientation, margins, and image scaling options for professional results." },
              { step: "4", title: "Download", desc: "Generate and download your document. Multi-image PDFs combine all images into one file." }
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
          <h2 className="text-3xl font-bold text-foreground">Why Convert Images to Documents?</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              { icon: FileText, title: "Universal Compatibility", desc: "PDF and document formats open on any device. Share with confidence that recipients can view your content." },
              { icon: FileImage, title: "Multiple Output Formats", desc: "Convert to PDF for sharing, Word for editing, PowerPoint for presenting, or HTML for web use." },
              { icon: Settings, title: "Full Layout Control", desc: "Customize page size, orientation, margins, and image placement for professional results." },
              { icon: Zap, title: "Instant Processing", desc: "Browser-based conversion means no upload delays. Create documents instantly from your images." },
              { icon: Eye, title: "Quality Preservation", desc: "Images maintain their original resolution and quality in the converted documents." },
              { icon: Shield, title: "Complete Privacy", desc: "Images never leave your device. All conversion happens locally in your browser." }
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
          <h2 className="text-3xl font-bold text-foreground">Key Benefits of Image to Document Conversion</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              "Create shareable PDF portfolios",
              "Build multi-page photo books",
              "Generate presentation slides",
              "Compile visual reports",
              "Prepare print-ready documents",
              "Create editable Word files",
              "Build web-ready HTML pages",
              "Archive image collections",
              "Professional document delivery"
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
                <h3 className="text-xl font-semibold text-foreground mb-2">Your Images and Documents Stay Private</h3>
                <p className="text-muted-foreground">
                  Document conversion often involves sensitive content – business materials, personal photos, confidential information. Our conversion tool operates entirely within your web browser. Your images and the documents you create are processed locally and never uploaded to any server.
                </p>
              </div>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              {[
                { title: "Zero Server Uploads", desc: "All conversion happens 100% locally in your browser. No data is ever transmitted." },
                { title: "No Data Retention", desc: "We don't store, track, or analyze any information about your images or documents." },
                { title: "No Account Required", desc: "Use our conversion tool freely without registration, login, or personal information." },
                { title: "Automatic Memory Cleanup", desc: "When you close the browser tab, all processed content is automatically cleared." }
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

export default ImageToDocumentPage;
