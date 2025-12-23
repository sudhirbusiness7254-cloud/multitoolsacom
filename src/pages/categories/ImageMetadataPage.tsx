import { Helmet } from "react-helmet-async";
import CategoryPageLayout from "@/components/CategoryPageLayout";
import UniversalImageMetadata from "@/components/UniversalImageMetadata";
import { getCategoryBySlug } from "@/data/toolsData";
import { getCategorySEOContent } from "@/data/categorySEOData";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { CheckCircle, Shield, Zap, FileText, Lock, Eye, Settings, Info } from "lucide-react";

const ImageMetadataPage = () => {
  const category = getCategoryBySlug("image-metadata")!;
  const seoContent = getCategorySEOContent("image-metadata")!;

  const faqs = [
    {
      question: "What is image metadata and why is it important?",
      answer: "Image metadata is hidden information embedded within image files. It includes camera settings (EXIF), copyright information (IPTC), and technical details (XMP). This data is valuable for photographers organizing collections, verifying image authenticity, and managing digital assets."
    },
    {
      question: "What types of metadata can I view?",
      answer: "Our tool displays EXIF data (camera model, lens, exposure settings, date/time, GPS location), IPTC data (copyright, creator, captions, keywords), XMP data (editing history, color profiles), and basic file information (dimensions, file size, format)."
    },
    {
      question: "Can I remove metadata from my images?",
      answer: "Yes! Our metadata removal tool strips all embedded metadata from your images, including potentially sensitive GPS location data. This is essential for privacy when sharing photos online or protecting your personal information."
    },
    {
      question: "Why would I want to remove image metadata?",
      answer: "Metadata can contain sensitive information like GPS coordinates revealing where photos were taken, device identifiers, and personal details. Removing metadata before sharing images online protects your privacy and prevents potential security risks."
    },
    {
      question: "Does metadata removal affect image quality?",
      answer: "No, metadata removal only strips the embedded information without touching the actual image pixels. Your image quality, dimensions, and appearance remain completely unchanged after metadata is removed."
    },
    {
      question: "What metadata can reveal my location?",
      answer: "GPS coordinates embedded in EXIF data can reveal exactly where a photo was taken. Many smartphones automatically add this location data. Our tool shows you this information and lets you remove it to protect your privacy."
    },
    {
      question: "Which image formats contain metadata?",
      answer: "JPEG, TIFF, and PNG files commonly contain metadata. RAW formats from cameras also include extensive EXIF data. Our tool can read and remove metadata from all major image formats."
    },
    {
      question: "Is my image data kept private during analysis?",
      answer: "Absolutely. All metadata viewing and removal happens directly in your browser. Your images are never uploaded to any server, ensuring complete privacy for your photos and their embedded information."
    }
  ];

  return (
    <>
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            "name": "Free Online Image Metadata Viewer & Remover",
            "description": "View and remove image metadata (EXIF, IPTC, XMP) online for free. Protect your privacy by stripping location and camera data from photos.",
            "url": window.location.href,
            "applicationCategory": "MultimediaApplication",
            "operatingSystem": "Any",
            "offers": {
              "@type": "Offer",
              "price": "0",
              "priceCurrency": "USD"
            },
            "featureList": [
              "EXIF data viewing",
              "IPTC metadata display",
              "GPS location extraction",
              "Metadata removal",
              "Privacy protection",
              "Client-side processing"
            ]
          })}
        </script>
      </Helmet>

      <CategoryPageLayout category={category} seoContent={seoContent}>
        <UniversalImageMetadata />

        {/* Comprehensive About Section - 1000+ words */}
        <section className="mt-16 space-y-8">
          <div className="prose prose-lg max-w-none dark:prose-invert">
            <h2 className="text-3xl font-bold text-foreground mb-6">About Our Free Online Image Metadata Tool</h2>
            
            <p className="text-muted-foreground leading-relaxed">
              Welcome to our comprehensive image metadata viewer and remover, a powerful tool designed to give you complete visibility and control over the hidden information embedded within your digital photographs. Every digital image carries a wealth of metadata – invisible data that tells the story of how, when, where, and with what equipment the photo was captured. While this information is invaluable for photographers managing their collections, it can also pose significant privacy and security concerns when images are shared publicly. Our tool empowers you to view all this hidden data and, when necessary, remove it completely to protect your privacy.
            </p>

            <p className="text-muted-foreground leading-relaxed">
              Digital image metadata comes in several standardized formats, each serving different purposes and containing different types of information. EXIF (Exchangeable Image File Format) data is perhaps the most familiar, automatically recorded by digital cameras and smartphones at the moment of capture. This includes camera make and model, lens information, exposure settings (aperture, shutter speed, ISO), focus distance, flash usage, and crucially, the date and time of capture. Many devices also record GPS coordinates, creating a precise location record that could reveal your home address, workplace, or travel patterns.
            </p>

            <p className="text-muted-foreground leading-relaxed">
              IPTC (International Press Telecommunications Council) metadata provides fields for copyright information, creator credits, captions, keywords, and other editorial data. Professional photographers and news organizations use IPTC fields extensively to manage image rights, attribution, and searchability. When you see photo credits in publications or find images through keyword searches in stock photo libraries, IPTC metadata is typically the underlying system making this possible. Our viewer displays all IPTC fields, helping you understand and manage the editorial information attached to your images.
            </p>

            <p className="text-muted-foreground leading-relaxed">
              XMP (Extensible Metadata Platform) is Adobe's more recent metadata standard, offering flexibility for storing editing history, color profile information, and custom metadata fields. If an image has been processed in editing software, XMP data may reveal the software used, adjustments applied, and the complete editing workflow. This can be useful for understanding an image's processing history but may also expose more information than you wish to share when distributing images publicly.
            </p>

            <p className="text-muted-foreground leading-relaxed">
              The privacy implications of image metadata have become increasingly significant as photo sharing has become ubiquitous. GPS coordinates embedded in photos can reveal exactly where images were taken – potentially exposing your home location, children's schools, favorite vacation spots, or daily routines. Device identifiers in metadata can be used to track multiple photos back to the same camera or phone. Timestamps create detailed timelines of your activities. When images are shared on social media, sent via messaging apps, or posted on websites, this hidden data often travels with them unless explicitly removed.
            </p>

            <p className="text-muted-foreground leading-relaxed">
              Our metadata removal capability addresses these privacy concerns by completely stripping all embedded information from your images. The removal process is thorough, eliminating EXIF, IPTC, XMP, and any other embedded metadata while leaving the actual image pixels completely unchanged. Your photos retain their full visual quality, dimensions, and appearance – only the invisible metadata is removed. This creates privacy-safe versions of your images suitable for public sharing without risk of exposing personal information.
            </p>

            <p className="text-muted-foreground leading-relaxed">
              For photographers and digital asset managers, our metadata viewer serves as a powerful analysis tool for understanding and organizing image collections. Quickly check camera settings to understand how a great shot was achieved. Verify that copyright information is properly embedded before distributing images. Confirm GPS coordinates for geotagging projects. Compare settings across multiple images to identify patterns in your shooting style. The detailed, organized display of all metadata fields makes analysis quick and straightforward.
            </p>

            <p className="text-muted-foreground leading-relaxed">
              Understanding camera settings through EXIF data is invaluable for photography education and improvement. By examining the aperture, shutter speed, ISO, and lens settings of successful images, photographers can learn what technical parameters produce specific effects. Our tool makes this analysis accessible to everyone, displaying settings in clear, understandable terms rather than cryptic codes. Whether you're learning photography or reverse-engineering the settings of an admired image, our metadata viewer provides the insights you need.
            </p>

            <p className="text-muted-foreground leading-relaxed">
              The authentication and verification capabilities of metadata analysis are increasingly important in an era of digital manipulation. Original, unedited photographs typically contain consistent, complete metadata that matches the apparent characteristics of the image. Edited or manipulated images often show telltale signs in their metadata – mismatched software stamps, inconsistent timestamps, or gaps where expected data is missing. While not foolproof, metadata analysis is a valuable first step in assessing image authenticity.
            </p>

            <p className="text-muted-foreground leading-relaxed">
              Privacy and security are fundamental to our tool's architecture. Every operation – viewing metadata, analyzing fields, removing data – occurs entirely within your web browser using client-side JavaScript processing. Your images are never uploaded to any server, stored in any cloud, or transmitted to any third party. This local processing approach provides absolute assurance that your photos and their potentially sensitive metadata remain completely private throughout the analysis and removal process.
            </p>

            <p className="text-muted-foreground leading-relaxed">
              Our tool supports all major image formats that commonly contain metadata, including JPEG (the most common format for photographs), TIFF (popular in professional workflows), PNG (which can contain certain metadata types), and various RAW formats from different camera manufacturers. The comprehensive format support ensures you can analyze and clean metadata from virtually any image file you encounter in your digital workflow.
            </p>

            <p className="text-muted-foreground leading-relaxed">
              Whether you're a privacy-conscious individual who wants to share photos without exposing personal information, a professional photographer managing image rights and technical data, a journalist verifying image authenticity, or simply curious about the hidden data in your photos, our metadata tool provides the visibility and control you need. The combination of comprehensive viewing, complete removal capabilities, and ironclad privacy makes it the ideal solution for all your image metadata needs.
            </p>
          </div>
        </section>

        {/* How to Use Section */}
        <section className="mt-12 space-y-6">
          <h2 className="text-3xl font-bold text-foreground">How to View and Remove Metadata</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { step: "1", title: "Upload Image", desc: "Drag and drop your image or click to browse. We support JPEG, PNG, TIFF, and other common formats." },
              { step: "2", title: "View Metadata", desc: "Instantly see all embedded data including EXIF, IPTC, XMP, GPS location, and camera settings." },
              { step: "3", title: "Analyze Data", desc: "Review the information for insights, privacy concerns, or verification purposes." },
              { step: "4", title: "Remove & Download", desc: "Strip all metadata for privacy, then download the clean image with full quality preserved." }
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
          <h2 className="text-3xl font-bold text-foreground">Why Use Our Metadata Tool?</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              { icon: FileText, title: "Complete Metadata View", desc: "See all EXIF, IPTC, XMP data including camera settings, GPS location, copyright, and more." },
              { icon: Lock, title: "Privacy Protection", desc: "Remove all metadata including GPS coordinates to protect your location and personal information." },
              { icon: Info, title: "Detailed Analysis", desc: "Understand camera settings, verify authenticity, and manage digital asset information." },
              { icon: Zap, title: "Instant Processing", desc: "Browser-based processing means instant results. View and remove metadata in seconds." },
              { icon: Eye, title: "Clear Display", desc: "Organized, readable presentation of all metadata fields. Easy to understand and analyze." },
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
          <h2 className="text-3xl font-bold text-foreground">Key Benefits of Metadata Management</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              "Protect your location privacy",
              "Remove personal identifiers",
              "View camera settings",
              "Verify image authenticity",
              "Manage copyright information",
              "Analyze photo collections",
              "Learn photography techniques",
              "Clean images for sharing",
              "Understand editing history"
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
                  Ironically, a tool for protecting privacy must itself be privacy-focused. Our metadata tool operates entirely within your web browser using client-side JavaScript. Your images and their metadata are processed locally and never uploaded to any external server.
                </p>
              </div>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              {[
                { title: "Zero Server Uploads", desc: "All metadata viewing and removal happens 100% locally. No image data leaves your device." },
                { title: "No Data Collection", desc: "We don't track, store, or analyze any information about your images or metadata." },
                { title: "No Account Required", desc: "Use our metadata tool freely without registration, login, or personal information." },
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

export default ImageMetadataPage;
