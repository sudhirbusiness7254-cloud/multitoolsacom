import { Helmet } from "react-helmet-async";
import CategoryPageLayout from "@/components/CategoryPageLayout";
import UniversalQRTools from "@/components/UniversalQRTools";
import { getCategoryBySlug } from "@/data/toolsData";
import { getCategorySEOContent } from "@/data/categorySEOData";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { CheckCircle, Shield, Zap, QrCode, Lock, Eye, Settings, Scan } from "lucide-react";
import { AdVideo, AdInline, AdExoticFat, AdUnit1, AdUnit2, AdUnit3, AdUnit4, AdUnit5, AdUnit6 } from "@/components/ads/AdContainer";

const ImageQRPage = () => {
  const category = getCategoryBySlug("image-qr")!;
  const seoContent = getCategorySEOContent("image-qr")!;

  const faqs = [
    {
      question: "What is a QR code and how does it work?",
      answer: "A QR (Quick Response) code is a two-dimensional barcode that stores information in a pattern of black and white squares. When scanned with a smartphone camera or QR reader app, the encoded information is instantly decoded and displayed or acted upon."
    },
    {
      question: "What types of information can QR codes contain?",
      answer: "QR codes can encode URLs (website links), plain text, contact information (vCards), WiFi network credentials, email addresses, phone numbers, SMS messages, geographic locations, and more. The type determines what action occurs when scanned."
    },
    {
      question: "Can I customize the appearance of QR codes?",
      answer: "Yes! Our tool lets you customize QR code colors, add logos or images to the center, adjust size and error correction levels, and create visually appealing codes that match your brand while remaining fully scannable."
    },
    {
      question: "What is error correction in QR codes?",
      answer: "Error correction allows QR codes to remain readable even if partially damaged or obscured. Higher levels (H) can recover from up to 30% damage but produce denser codes. Lower levels (L) are more compact. Choose based on where the code will be used."
    },
    {
      question: "Can I read/scan existing QR codes?",
      answer: "Yes, our QR reader can decode any QR code from uploaded images. Simply upload an image containing a QR code and our tool will extract and display the encoded information, whether it's a URL, text, or contact data."
    },
    {
      question: "What size should my QR code be?",
      answer: "Size depends on scanning distance. For close-up scanning (business cards, products), 2-3cm is sufficient. For posters or signs viewed from distance, larger sizes are needed. Our tool generates high-resolution codes that can be scaled to any size."
    },
    {
      question: "Are my QR codes kept private?",
      answer: "Absolutely. All QR code generation and reading happens directly in your browser. The information you encode is never sent to any server. This is especially important for WiFi passwords, contact info, or sensitive URLs."
    },
    {
      question: "What image formats are supported for QR output?",
      answer: "Generated QR codes can be downloaded as PNG (best for web), SVG (best for print/scaling), or JPEG. PNG and SVG are recommended as they preserve the crisp edges essential for reliable scanning."
    }
  ];

  return (
    <>
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            "name": "Free Online QR Code Generator & Reader",
            "description": "Generate and read QR codes online for free. Create custom QR codes for URLs, text, WiFi, and more. Scan QR codes from images.",
            "url": window.location.href,
            "applicationCategory": "MultimediaApplication",
            "operatingSystem": "Any",
            "offers": {
              "@type": "Offer",
              "price": "0",
              "priceCurrency": "USD"
            },
            "featureList": [
              "QR code generation",
              "QR code reading",
              "Custom colors and logos",
              "Multiple data types",
              "Error correction levels",
              "Client-side processing"
            ]
          })}
        </script>
      </Helmet>

      <CategoryPageLayout category={category} seoContent={seoContent}>
        <UniversalQRTools />
        {/* Video Ad - Below Tool Output */}
        <AdVideo className="mt-6" />
        <AdExoticFat className="mt-4" />
        <AdUnit1 className="mt-4" />
        <AdExoticFat className="mt-4" />
        <AdUnit2 className="mt-4" />
        <AdInline className="mt-4" />
        <AdUnit3 className="mt-4" />

        {/* Comprehensive About Section - 1000+ words */}
        <section className="mt-16 space-y-8">
          <div className="prose prose-lg max-w-none dark:prose-invert">
            <h2 className="text-3xl font-bold text-foreground mb-6">About Our Free Online QR Code Generator & Reader</h2>
            
            <p className="text-muted-foreground leading-relaxed">
              Welcome to our comprehensive QR code toolkit, designed to bridge the gap between physical and digital experiences through the power of quick response codes. Whether you're a business owner looking to share website links and contact information effortlessly, a marketer creating interactive print campaigns, an event organizer distributing WiFi credentials, or simply someone who wants to decode a mysterious QR code, our free online tool provides complete QR generation and reading capabilities with professional features and absolute privacy.
            </p>

            <p className="text-muted-foreground leading-relaxed">
              QR codes have transformed from a niche industrial tool into a ubiquitous part of everyday life. Originally developed in 1994 for tracking automotive parts, these two-dimensional barcodes now appear on everything from restaurant menus and product packaging to museum exhibits and business cards. The COVID-19 pandemic accelerated adoption dramatically, with contactless information sharing becoming essential. Today, virtually every smartphone can instantly read QR codes using built-in camera apps, making them the most accessible bridge between physical objects and digital content.
            </p>

            <p className="text-muted-foreground leading-relaxed">
              Our QR code generator supports a comprehensive range of data types, each triggering different actions when scanned. URL codes open websites in the scanner's browser – the most common use case for marketing, product information, and web presence sharing. Text codes display plain text messages, perfect for sharing quotes, instructions, or information that doesn't require internet connectivity. Contact codes (vCards) add complete contact information to phone address books with a single scan, eliminating manual data entry.
            </p>

            <p className="text-muted-foreground leading-relaxed">
              WiFi credential codes represent one of the most practical QR applications, encoding network name, password, and security type so that scanning automatically configures and connects to the network. This is invaluable for businesses sharing guest WiFi, hospitality venues, events, and home networks. Email codes pre-populate email addresses and optionally subject lines and body text, making it easy for customers to contact you. Phone codes initiate calls, and SMS codes prepare text messages – all triggered by a simple scan.
            </p>

            <p className="text-muted-foreground leading-relaxed">
              Understanding error correction is crucial for creating reliable QR codes. QR technology includes built-in redundancy that allows codes to remain readable even when partially obscured, damaged, or modified. Our tool offers four error correction levels: L (7% recovery), M (15% recovery), Q (25% recovery), and H (30% recovery). Higher levels produce denser codes but can survive more damage – essential when printing on surfaces that might be scratched, adding logos to the center, or displaying in environments where wear is expected.
            </p>

            <p className="text-muted-foreground leading-relaxed">
              Customization options let you create QR codes that align with your brand identity while remaining fully functional. Adjust foreground and background colors to match your color scheme – though maintain sufficient contrast for reliable scanning. Add your logo or image to the center, utilizing the error correction capability to maintain readability despite the visual obstruction. Adjust corner radius for rounded aesthetics. These options transform plain black-and-white codes into branded visual elements that complement your design rather than disrupting it.
            </p>

            <p className="text-muted-foreground leading-relaxed">
              Our QR code reader provides the inverse capability – extracting information from existing QR codes. Upload any image containing a QR code, and our detection algorithm locates and decodes the content. This is useful for reading codes from screenshots, scanned documents, photographs, or any situation where direct camera scanning isn't practical. The reader identifies the data type and displays the decoded content, with appropriate actions available based on what was encoded.
            </p>

            <p className="text-muted-foreground leading-relaxed">
              Size and resolution considerations are important for QR code effectiveness. The minimum scannable size depends on viewing distance – codes scanned from close range (business cards, product labels) can be as small as 2cm, while codes on posters or signage viewed from distance need proportionally larger dimensions. Our generator creates high-resolution output that can be scaled to any required size without losing the crisp edges essential for reliable scanning. SVG output provides unlimited scalability for print applications.
            </p>

            <p className="text-muted-foreground leading-relaxed">
              Testing your QR codes before deployment is essential, and our tool facilitates this workflow. Generate a code, then use your smartphone to verify it scans correctly and triggers the intended action. Check that URLs open correctly, contact cards import properly, and WiFi codes successfully connect. This testing step catches errors before expensive printing or wide distribution, ensuring your QR implementation works flawlessly in the real world.
            </p>

            <p className="text-muted-foreground leading-relaxed">
              Privacy and security are fundamental to our QR tool's design. All code generation and reading happens entirely within your web browser using client-side JavaScript. The URLs you encode, the WiFi passwords you embed, the contact information you digitize – none of this sensitive data is ever transmitted to any server. This local processing approach is particularly important for WiFi credentials and other sensitive information that could pose security risks if exposed.
            </p>

            <p className="text-muted-foreground leading-relaxed">
              Output format options ensure your QR codes are optimized for their intended use. PNG format provides pixel-perfect rendering ideal for web use and screen display. SVG format offers infinite scalability perfect for print applications, signage, and any context where the code might be reproduced at various sizes. Both formats maintain the precise geometry essential for reliable scanning across diverse reading devices and conditions.
            </p>

            <p className="text-muted-foreground leading-relaxed">
              Whether you're implementing QR codes for a business initiative, creating interactive educational materials, sharing information in creative contexts, or simply need to decode a code you've encountered, our comprehensive toolkit provides everything you need. The combination of versatile generation options, reliable reading capability, and absolute privacy makes it the ideal solution for all your QR code needs.
            </p>
          </div>
        </section>

        {/* How to Use Section */}
        <section className="mt-12 space-y-6">
          <h2 className="text-3xl font-bold text-foreground">How to Create and Read QR Codes</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { step: "1", title: "Choose Action", desc: "Select whether you want to generate a new QR code or read/decode an existing one from an image." },
              { step: "2", title: "Enter Data", desc: "For generation: enter your URL, text, WiFi credentials, or contact info. For reading: upload an image." },
              { step: "3", title: "Customize", desc: "When generating: adjust colors, add logo, set error correction. Preview your code in real-time." },
              { step: "4", title: "Download/View", desc: "Download your generated QR as PNG or SVG, or view the decoded content from a scanned code." }
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
          <h2 className="text-3xl font-bold text-foreground">Why Use Our QR Code Tool?</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              { icon: QrCode, title: "Generate Any Data Type", desc: "Create QR codes for URLs, text, WiFi, contacts, email, phone, and more. Complete flexibility." },
              { icon: Scan, title: "Read Existing Codes", desc: "Decode QR codes from images instantly. Extract URLs, text, and other encoded information." },
              { icon: Settings, title: "Full Customization", desc: "Custom colors, logo embedding, error correction levels. Create branded, professional codes." },
              { icon: Zap, title: "Instant Processing", desc: "Generate and read QR codes instantly in your browser. No waiting, no uploads." },
              { icon: Eye, title: "Real-Time Preview", desc: "See your QR code update as you type. Verify before downloading." },
              { icon: Shield, title: "Complete Privacy", desc: "All processing happens locally. Sensitive data like WiFi passwords never leaves your device." }
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
          <h2 className="text-3xl font-bold text-foreground">Key Benefits of QR Codes</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              "Share links instantly",
              "Distribute WiFi credentials",
              "Share contact information",
              "Create interactive print",
              "Contactless information",
              "Track marketing campaigns",
              "Simplify complex URLs",
              "Bridge physical-digital gap",
              "Universal compatibility"
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
                <h3 className="text-xl font-semibold text-foreground mb-2">Your Data Stays Private</h3>
                <p className="text-muted-foreground">
                  QR codes often contain sensitive information like WiFi passwords, contact details, and internal URLs. Our QR tool operates entirely within your web browser. The data you encode is processed locally and never transmitted to any external server.
                </p>
              </div>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              {[
                { title: "Zero Server Processing", desc: "All QR generation and reading happens 100% locally. Your data never leaves your device." },
                { title: "Sensitive Data Safe", desc: "WiFi passwords, contact info, and private URLs are processed with complete confidentiality." },
                { title: "No Account Required", desc: "Use our QR tool freely without registration, login, or personal information." },
                { title: "No Data Retention", desc: "Nothing is stored or logged. Close the tab and all data is gone." }
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

export default ImageQRPage;
