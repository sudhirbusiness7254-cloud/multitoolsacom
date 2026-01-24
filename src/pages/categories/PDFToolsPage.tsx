import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { AdBottom, AdVideo, AdInline, AdExoticFat } from "@/components/ads/AdContainer";
import { 
  FileText, Minimize2, FileUp, Image, Scissors, Zap, Shield, Globe, Download,
  BookOpen, Lightbulb, HelpCircle, Lock, Users, CheckCircle, Sparkles, Star
} from "lucide-react";
import UniversalPDFTools from "@/components/pdf/UniversalPDFTools";
import HowToUseGuide from "@/components/HowToUseGuide";
import { getToolGuideData } from "@/data/toolGuideData";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import HreflangTags from "@/components/HreflangTags";

const pdfTools = [
  { slug: "merge-pdf", name: "Merge PDF", description: "Combine multiple PDF files into one", icon: FileText, color: "from-red-500 to-red-600" },
  { slug: "compress-pdf", name: "Compress PDF", description: "Reduce PDF file size", icon: Minimize2, color: "from-orange-500 to-orange-600" },
  { slug: "word-to-pdf", name: "Word to PDF", description: "Convert Word documents to PDF", icon: FileUp, color: "from-blue-500 to-blue-600" },
  { slug: "image-to-pdf", name: "Image to PDF", description: "Convert images to PDF", icon: Image, color: "from-purple-500 to-purple-600" },
  { slug: "split-pdf", name: "Split PDF", description: "Extract pages from PDF", icon: Scissors, color: "from-pink-500 to-pink-600" },
];

const PDFToolsPage = () => {
  const guideData = getToolGuideData("pdf-tools");
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Is it safe to upload my PDFs?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, your files are processed securely in your browser and are never uploaded to our servers. They are automatically deleted after processing."
        }
      },
      {
        "@type": "Question",
        "name": "Are these PDF tools really free?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, all PDF tools are 100% free with no hidden costs, watermarks, or registration required."
        }
      },
      {
        "@type": "Question",
        "name": "What file formats are supported?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "We support PDF files for most operations, Word documents (DOC, DOCX) for conversion, and common image formats (JPG, PNG, WEBP, GIF) for image to PDF conversion."
        }
      },
      {
        "@type": "Question",
        "name": "Can I merge PDFs with different page sizes?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, our merge tool can combine PDFs with different page sizes into a single document while preserving each page's original dimensions and formatting."
        }
      }
    ]
  };

  return (
    <>
      <Helmet>
        <title>PDF Tools - Free Online PDF Editor & Converter | MultiTools</title>
        <meta name="description" content="Free online PDF tools: merge, compress, split PDFs, convert Word to PDF, and more. Fast, secure, no signup required." />
        <link rel="canonical" href="https://multitoolsa.com/pdf-tools" />
        <meta property="og:title" content="PDF Tools - Free Online PDF Editor & Converter" />
        <meta property="og:description" content="All-in-one PDF tools: merge, compress, split, convert. 100% free, no signup required." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://multitoolsa.com/pdf-tools" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            "name": "PDF Tools",
            "description": "Free online PDF tools for merging, compressing, splitting, and converting PDFs",
            "url": "https://multitoolsa.com/pdf-tools",
            "applicationCategory": "UtilitiesApplication",
            "operatingSystem": "Web Browser",
            "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" }
          })}
        </script>
        <script type="application/ld+json">
          {JSON.stringify(faqSchema)}
        </script>
      </Helmet>
      <HreflangTags path="/pdf-tools" />
      
      <div className="min-h-screen bg-background flex flex-col">
        <Header />
        
        <main className="flex-1">
          {/* Hero Section */}
          <section className="py-8 md:py-12 lg:py-16 bg-gradient-to-b from-red-500/5 to-orange-500/5">
            <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16">
              <div className="text-center mb-8">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-500/10 border border-red-500/30 mb-4">
                  <FileText className="w-4 h-4 text-red-500" />
                  <span className="text-sm font-medium text-red-500">5 Free PDF Tools</span>
                </div>
                <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-4">
                  Free Online <span className="text-red-500">PDF Tools</span>
                </h1>
                <p className="text-base sm:text-lg lg:text-xl text-muted-foreground max-w-3xl mx-auto">
                  All the tools you need to work with PDFs. Merge, compress, split, convert - completely free and secure. Just drag and drop your files!
                </p>
              </div>

              {/* Universal PDF Tools Component */}
              <div className="w-full max-w-6xl mx-auto">
                <UniversalPDFTools />
                
                {/* ExoticFat Ads - Primary Monetization */}
                <AdExoticFat className="mt-6" />
                <AdExoticFat className="mt-4" />
                {/* Ads below tool */}
                <AdInline className="mt-4" />
                <AdBottom className="mt-4" />
                <AdVideo className="mt-4" />
              </div>
            </div>
          </section>

          {/* Comprehensive About Section - 700+ words */}
          <section className="py-12 md:py-20 px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16">
            <div className="w-full max-w-6xl mx-auto">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-red-500 to-orange-500 flex items-center justify-center">
                  <BookOpen className="w-5 h-5 text-white" />
                </div>
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold">About Our PDF Tools</h2>
              </div>
              
              <div className="bg-card rounded-2xl border border-border p-6 sm:p-8 space-y-6">
                <p className="text-muted-foreground leading-relaxed">
                  Welcome to our comprehensive suite of online PDF tools, the ultimate solution for all your PDF document management needs. In today's digital workplace, PDF files have become the universal standard for sharing documents, contracts, reports, presentations, and countless other important files. Our platform provides a complete set of tools designed to help you work with PDFs efficiently, securely, and without the need for expensive software subscriptions or complex desktop applications.
                </p>
                
                <p className="text-muted-foreground leading-relaxed">
                  The Portable Document Format (PDF) was created by Adobe in 1993 and has since become the gold standard for document sharing across industries, platforms, and devices. PDFs preserve the exact layout, fonts, and formatting of documents regardless of the software, hardware, or operating system used to view them. This reliability makes PDFs indispensable for business contracts, legal documents, academic papers, user manuals, and official publications. However, working with PDFs has traditionally required specialized and often expensive software. Our free online tools eliminate this barrier, putting professional PDF capabilities in the hands of everyone.
                </p>
                
                <p className="text-muted-foreground leading-relaxed">
                  Our PDF toolkit includes five essential tools that cover the most common PDF operations. The Merge PDF tool allows you to combine multiple PDF documents into a single file, perfect for consolidating reports, creating comprehensive portfolios, or assembling multi-chapter documents from separate files. The Compress PDF tool reduces file sizes significantly without noticeable quality loss, making it easier to share documents via email, upload to websites, or store in cloud services with limited space. The Split PDF tool enables you to extract specific pages or page ranges from larger documents, ideal for sharing relevant sections without distributing entire files. The Word to PDF converter transforms Microsoft Word documents into professional PDF format while preserving all formatting, fonts, and layout elements. Finally, the Image to PDF tool converts photographs, scans, and graphics into PDF documents, perfect for creating professional presentations or archiving visual content.
                </p>
                
                <p className="text-muted-foreground leading-relaxed">
                  What sets our PDF tools apart is our unwavering commitment to user privacy and data security. Unlike many online PDF services that upload your files to remote servers for processing, our tools utilize advanced browser-based technology to perform all operations directly on your device. This means your sensitive documents, confidential contracts, personal files, and private information never leave your computer. The processing happens entirely within your web browser using sophisticated JavaScript libraries and WebAssembly modules, ensuring both speed and security. This architecture is particularly valuable for professionals handling sensitive materials such as lawyers working with client documents, healthcare providers managing patient records, financial advisors processing confidential statements, or businesses protecting proprietary information.
                </p>
                
                <p className="text-muted-foreground leading-relaxed">
                  The technology powering our PDF tools represents the cutting edge of browser-based document processing. We utilize the pdf-lib library for PDF manipulation, which provides reliable, cross-platform PDF operations without server dependencies. For Word to PDF conversion, we employ mammoth.js to accurately parse Word documents while preserving formatting elements. Our compression algorithms intelligently balance file size reduction with quality preservation, ensuring your documents remain professional and readable. All these technologies work together seamlessly to provide a fast, reliable, and user-friendly experience that rivals desktop software costing hundreds of dollars.
                </p>
                
                <p className="text-muted-foreground leading-relaxed">
                  Our PDF tools serve a diverse range of users across various industries and use cases. Business professionals use our tools to merge quarterly reports, compress large presentations for email distribution, and convert proposals from Word to PDF for client delivery. Students rely on our platform to combine research materials, compress assignments for submission, and convert notes to PDF for easier sharing with classmates. Legal professionals use our tools to merge case documents, extract relevant pages for court filings, and ensure confidential materials are processed securely. Real estate agents combine property documents, compress photo-heavy listings, and create professional PDF packages for clients. Teachers and educators merge lesson materials, create PDF handouts from Word documents, and compile educational resources. The versatility of our tools makes them valuable for virtually anyone who works with documents.
                </p>
                
                <p className="text-muted-foreground leading-relaxed">
                  We have designed our user interface with simplicity and efficiency as primary goals. Every tool features an intuitive drag-and-drop interface that requires no learning curve or technical expertise. Simply drag your files onto the designated area, configure any desired options, and click a single button to process your documents. The results are available for immediate download, and you can process additional files without refreshing the page. Our responsive design ensures a seamless experience across all devices, from desktop computers with large monitors to smartphones and tablets, allowing you to work with PDFs wherever you are.
                </p>

                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-4">
                  <div className="flex items-start gap-3">
                    <Zap className="w-5 h-5 flex-shrink-0 mt-0.5 text-red-500" />
                    <div>
                      <h4 className="font-semibold text-sm">Instant Processing</h4>
                      <p className="text-xs text-muted-foreground">Process PDFs in seconds with client-side technology</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Globe className="w-5 h-5 flex-shrink-0 mt-0.5 text-red-500" />
                    <div>
                      <h4 className="font-semibold text-sm">Universal Compatibility</h4>
                      <p className="text-xs text-muted-foreground">Works on all modern browsers and devices</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Lock className="w-5 h-5 flex-shrink-0 mt-0.5 text-red-500" />
                    <div>
                      <h4 className="font-semibold text-sm">Complete Privacy</h4>
                      <p className="text-xs text-muted-foreground">Your files never leave your device</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Users className="w-5 h-5 flex-shrink-0 mt-0.5 text-red-500" />
                    <div>
                      <h4 className="font-semibold text-sm">No Registration</h4>
                      <p className="text-xs text-muted-foreground">Start using immediately without an account</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* How to Use Section - Using HowToUseGuide Component */}
          <section className="py-12 md:py-20 bg-secondary/30 px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16">
            <div className="w-full max-w-6xl mx-auto">
              {guideData && (
                <HowToUseGuide 
                  guideData={guideData}
                  toolName="PDF Tools"
                  gradientFrom="#ef4444"
                  gradientTo="#ea580c"
                />
              )}
            </div>
          </section>

          {/* Why Use Our Tools Section */}
          <section className="py-12 md:py-20 px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16">
            <div className="w-full">
              <div className="flex items-center gap-3 mb-8 justify-center">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-red-500 to-orange-500 flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold">Why Use Our PDF Tools?</h2>
              </div>
              
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
                <div className="bg-card border border-border rounded-xl p-4 lg:p-6 text-center">
                  <div className="w-10 h-10 lg:w-12 lg:h-12 rounded-full bg-green-500/10 flex items-center justify-center mx-auto mb-3 lg:mb-4">
                    <Download className="w-5 h-5 lg:w-6 lg:h-6 text-green-500" />
                  </div>
                  <h3 className="font-semibold text-sm lg:text-base mb-2">100% Free</h3>
                  <p className="text-xs lg:text-sm text-muted-foreground">All tools are completely free with no hidden costs, watermarks, or file limits.</p>
                </div>
                <div className="bg-card border border-border rounded-xl p-4 lg:p-6 text-center">
                  <div className="w-10 h-10 lg:w-12 lg:h-12 rounded-full bg-blue-500/10 flex items-center justify-center mx-auto mb-3 lg:mb-4">
                    <Shield className="w-5 h-5 lg:w-6 lg:h-6 text-blue-500" />
                  </div>
                  <h3 className="font-semibold text-sm lg:text-base mb-2">Secure & Private</h3>
                  <p className="text-xs lg:text-sm text-muted-foreground">Files are processed in your browser. Nothing is uploaded to servers.</p>
                </div>
                <div className="bg-card border border-border rounded-xl p-4 lg:p-6 text-center">
                  <div className="w-10 h-10 lg:w-12 lg:h-12 rounded-full bg-purple-500/10 flex items-center justify-center mx-auto mb-3 lg:mb-4">
                    <Zap className="w-5 h-5 lg:w-6 lg:h-6 text-purple-500" />
                  </div>
                  <h3 className="font-semibold text-sm lg:text-base mb-2">No Registration</h3>
                  <p className="text-xs lg:text-sm text-muted-foreground">Use all tools instantly without creating an account.</p>
                </div>
                <div className="bg-card border border-border rounded-xl p-4 lg:p-6 text-center">
                  <div className="w-10 h-10 lg:w-12 lg:h-12 rounded-full bg-orange-500/10 flex items-center justify-center mx-auto mb-3 lg:mb-4">
                    <Globe className="w-5 h-5 lg:w-6 lg:h-6 text-orange-500" />
                  </div>
                  <h3 className="font-semibold text-sm lg:text-base mb-2">Works Everywhere</h3>
                  <p className="text-xs lg:text-sm text-muted-foreground">Works on any device - desktop, tablet, or mobile.</p>
                </div>
              </div>
            </div>
          </section>

          {/* Benefits Section */}
          <section className="py-12 md:py-20 bg-secondary/30 px-4">
            <div className="container mx-auto max-w-5xl">
              <div className="flex items-center gap-3 mb-8 justify-center">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-red-500 to-orange-500 flex items-center justify-center">
                  <CheckCircle className="w-5 h-5 text-white" />
                </div>
                <h2 className="text-2xl md:text-3xl font-bold">Key Benefits</h2>
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {[
                  "Merge unlimited PDF files into one document",
                  "Compress PDFs by up to 80% without quality loss",
                  "Extract specific pages from any PDF",
                  "Convert Word documents while preserving formatting",
                  "Create PDFs from multiple image formats",
                  "Process files instantly in your browser",
                  "No software installation required",
                  "Works offline after page loads",
                  "Mobile-friendly responsive interface"
                ].map((benefit, i) => (
                  <div key={i} className="bg-card rounded-xl p-4 border border-border flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-red-500 to-orange-500 flex items-center justify-center flex-shrink-0 text-white font-bold text-sm">
                      {i + 1}
                    </div>
                    <span className="text-sm text-muted-foreground pt-1">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* All Tools Grid */}
          <section className="py-12 px-4">
            <div className="container mx-auto max-w-5xl">
              <h2 className="text-2xl font-bold text-center mb-8">All PDF Tools</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {pdfTools.map((tool) => (
                  <Link
                    key={tool.slug}
                    to={`/${tool.slug}`}
                    className="group bg-card border border-border rounded-2xl p-6 hover:shadow-lg transition-all hover:-translate-y-1"
                  >
                    <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${tool.color} flex items-center justify-center mb-4`}>
                      <tool.icon className="w-7 h-7 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                      {tool.name}
                    </h3>
                    <p className="text-muted-foreground">{tool.description}</p>
                  </Link>
                ))}
              </div>
            </div>
          </section>

          {/* Privacy & Security Section */}
          <section className="py-12 md:py-20 bg-secondary/30 px-4">
            <div className="container mx-auto max-w-4xl">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-red-500 to-orange-500 flex items-center justify-center">
                  <Shield className="w-5 h-5 text-white" />
                </div>
                <h2 className="text-2xl md:text-3xl font-bold">Privacy & Security</h2>
              </div>
              
              <div className="bg-card rounded-2xl border border-border p-6 sm:p-8 space-y-6">
                <p className="text-muted-foreground leading-relaxed">
                  Your document privacy is our highest priority. In an age where data breaches and privacy violations are increasingly common, we have built our PDF tools with a fundamentally different approach that keeps you in complete control of your files. Unlike traditional online PDF services that require uploading your documents to remote servers, our tools process everything directly in your browser using advanced client-side technology.
                </p>
                
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="bg-green-500/10 border border-green-500/20 rounded-xl p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Lock className="w-5 h-5 text-green-500" />
                      <h4 className="font-semibold text-green-400">100% Client-Side Processing</h4>
                    </div>
                    <p className="text-xs text-muted-foreground">All PDF operations happen in your browser. Your documents are never transmitted to any server.</p>
                  </div>
                  <div className="bg-green-500/10 border border-green-500/20 rounded-xl p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Shield className="w-5 h-5 text-green-500" />
                      <h4 className="font-semibold text-green-400">Zero Data Collection</h4>
                    </div>
                    <p className="text-xs text-muted-foreground">We do not collect, store, or analyze any of your documents or personal data.</p>
                  </div>
                  <div className="bg-green-500/10 border border-green-500/20 rounded-xl p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Globe className="w-5 h-5 text-green-500" />
                      <h4 className="font-semibold text-green-400">Works Offline</h4>
                    </div>
                    <p className="text-xs text-muted-foreground">Once loaded, our tools work without internet connection for complete privacy.</p>
                  </div>
                  <div className="bg-green-500/10 border border-green-500/20 rounded-xl p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <CheckCircle className="w-5 h-5 text-green-500" />
                      <h4 className="font-semibold text-green-400">No Account Required</h4>
                    </div>
                    <p className="text-xs text-muted-foreground">Use all features without creating an account or providing personal information.</p>
                  </div>
                </div>
                
                <p className="text-muted-foreground leading-relaxed">
                  This architecture is particularly valuable for professionals handling sensitive materials. Lawyers can process client contracts with confidence. Healthcare providers can work with patient documents securely. Financial advisors can handle confidential statements privately. Businesses can protect proprietary information while still benefiting from powerful PDF tools. Your documents remain exactly where they should be - on your device, under your control.
                </p>
              </div>
            </div>
          </section>

          {/* FAQ Section */}
          <section className="py-12 md:py-20 px-4">
            <div className="container mx-auto max-w-4xl">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-red-500 to-orange-500 flex items-center justify-center">
                  <HelpCircle className="w-5 h-5 text-white" />
                </div>
                <h2 className="text-2xl md:text-3xl font-bold">Frequently Asked Questions</h2>
              </div>
              
              <p className="text-muted-foreground mb-6">
                Find answers to the most common questions about our PDF tools. If you have additional questions, please feel free to contact our support team.
              </p>

              <Accordion type="single" collapsible className="space-y-2">
                {faqSchema.mainEntity.map((faq, index) => (
                  <AccordionItem key={index} value={`item-${index}`} className="bg-card border border-border rounded-xl px-4">
                    <AccordionTrigger className="text-left font-semibold text-sm sm:text-base">
                      {faq.name}
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground text-sm">
                      {faq.acceptedAnswer.text}
                    </AccordionContent>
                  </AccordionItem>
                ))}
                
                <AccordionItem value="faq-5" className="bg-card border border-border rounded-xl px-4">
                  <AccordionTrigger className="text-left font-semibold text-sm sm:text-base">
                    What is the maximum file size I can process?
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground text-sm">
                    Our tools support PDF files up to 50MB in size. For very large files, processing time may vary depending on your device's capabilities. Most PDFs are processed within seconds.
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="faq-6" className="bg-card border border-border rounded-xl px-4">
                  <AccordionTrigger className="text-left font-semibold text-sm sm:text-base">
                    Can I use these tools on my mobile phone?
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground text-sm">
                    Absolutely! All our PDF tools are fully responsive and work perfectly on smartphones and tablets. You can merge, compress, split, and convert PDFs directly from your mobile device.
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="faq-7" className="bg-card border border-border rounded-xl px-4">
                  <AccordionTrigger className="text-left font-semibold text-sm sm:text-base">
                    How much can the compression tool reduce file size?
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground text-sm">
                    Compression results vary depending on the original PDF content. PDFs with many images can see reductions of 50-80%. Text-heavy documents may see smaller reductions. Our tool intelligently balances file size with visual quality.
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="faq-8" className="bg-card border border-border rounded-xl px-4">
                  <AccordionTrigger className="text-left font-semibold text-sm sm:text-base">
                    Will my PDF formatting be preserved?
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground text-sm">
                    Yes, our tools preserve all formatting, fonts, images, and layout elements. When merging PDFs, each page maintains its original appearance. When converting from Word, we carefully preserve all document styling.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </section>
        </main>
        
        <Footer />
      </div>
    </>
  );
};

export default PDFToolsPage;