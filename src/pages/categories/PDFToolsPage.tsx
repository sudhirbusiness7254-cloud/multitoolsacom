import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { FileText, Minimize2, FileUp, Image, Scissors, Zap, Shield, Globe, Download } from "lucide-react";
import UniversalPDFTools from "@/components/pdf/UniversalPDFTools";

const pdfTools = [
  { slug: "merge-pdf", name: "Merge PDF", description: "Combine multiple PDF files into one", icon: FileText, color: "from-red-500 to-red-600" },
  { slug: "compress-pdf", name: "Compress PDF", description: "Reduce PDF file size", icon: Minimize2, color: "from-orange-500 to-orange-600" },
  { slug: "word-to-pdf", name: "Word to PDF", description: "Convert Word documents to PDF", icon: FileUp, color: "from-blue-500 to-blue-600" },
  { slug: "image-to-pdf", name: "Image to PDF", description: "Convert images to PDF", icon: Image, color: "from-purple-500 to-purple-600" },
  { slug: "split-pdf", name: "Split PDF", description: "Extract pages from PDF", icon: Scissors, color: "from-pink-500 to-pink-600" },
];

const PDFToolsPage = () => {
  return (
    <>
      <Helmet>
        <title>PDF Tools - Free Online PDF Editor & Converter | MultiTools</title>
        <meta name="description" content="Free online PDF tools: merge, compress, split PDFs, convert Word to PDF, and more. Fast, secure, no signup required." />
        <link rel="canonical" href="https://multitools.app/pdf-tools" />
        <meta property="og:title" content="PDF Tools - Free Online PDF Editor & Converter" />
        <meta property="og:description" content="All-in-one PDF tools: merge, compress, split, convert. 100% free, no signup required." />
        <meta property="og:type" content="website" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            "name": "PDF Tools",
            "description": "Free online PDF tools for merging, compressing, splitting, and converting PDFs",
            "url": "https://multitools.app/pdf-tools",
            "applicationCategory": "UtilitiesApplication",
            "operatingSystem": "Web Browser",
            "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" }
          })}
        </script>
      </Helmet>
      
      <div className="min-h-screen bg-background flex flex-col">
        <Header />
        
        <main className="flex-1">
          {/* Hero Section */}
          <section className="py-8 md:py-12 bg-gradient-to-b from-red-500/5 to-orange-500/5">
            <div className="container mx-auto px-4">
              <div className="text-center mb-8">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-500/10 border border-red-500/30 mb-4">
                  <FileText className="w-4 h-4 text-red-500" />
                  <span className="text-sm font-medium text-red-500">5 Free PDF Tools</span>
                </div>
                <h1 className="text-3xl md:text-5xl font-bold mb-4">
                  Free Online <span className="text-red-500">PDF Tools</span>
                </h1>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  All the tools you need to work with PDFs. Merge, compress, split, convert - completely free and secure. Just drag and drop your files!
                </p>
              </div>

              {/* Universal PDF Tools Component */}
              <div className="max-w-6xl mx-auto">
                <UniversalPDFTools />
              </div>
            </div>
          </section>

          {/* Features Section */}
          <section className="py-12 px-4">
            <div className="container mx-auto max-w-5xl">
              <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">Why Use Our PDF Tools?</h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-card border border-border rounded-xl p-6 text-center">
                  <div className="w-12 h-12 rounded-full bg-green-500/10 flex items-center justify-center mx-auto mb-4">
                    <Download className="w-6 h-6 text-green-500" />
                  </div>
                  <h3 className="font-semibold mb-2">100% Free</h3>
                  <p className="text-sm text-muted-foreground">All tools are completely free with no hidden costs or watermarks.</p>
                </div>
                <div className="bg-card border border-border rounded-xl p-6 text-center">
                  <div className="w-12 h-12 rounded-full bg-blue-500/10 flex items-center justify-center mx-auto mb-4">
                    <Shield className="w-6 h-6 text-blue-500" />
                  </div>
                  <h3 className="font-semibold mb-2">Secure & Private</h3>
                  <p className="text-sm text-muted-foreground">Files are processed in your browser. Nothing is uploaded to servers.</p>
                </div>
                <div className="bg-card border border-border rounded-xl p-6 text-center">
                  <div className="w-12 h-12 rounded-full bg-purple-500/10 flex items-center justify-center mx-auto mb-4">
                    <Zap className="w-6 h-6 text-purple-500" />
                  </div>
                  <h3 className="font-semibold mb-2">No Registration</h3>
                  <p className="text-sm text-muted-foreground">Use all tools instantly without creating an account.</p>
                </div>
                <div className="bg-card border border-border rounded-xl p-6 text-center">
                  <div className="w-12 h-12 rounded-full bg-orange-500/10 flex items-center justify-center mx-auto mb-4">
                    <Globe className="w-6 h-6 text-orange-500" />
                  </div>
                  <h3 className="font-semibold mb-2">Works Everywhere</h3>
                  <p className="text-sm text-muted-foreground">Works on any device - desktop, tablet, or mobile.</p>
                </div>
              </div>
            </div>
          </section>

          {/* All Tools Grid */}
          <section className="py-12 px-4 bg-secondary/30">
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

          {/* FAQ Section */}
          <section className="py-12 px-4">
            <div className="container mx-auto max-w-3xl">
              <h2 className="text-2xl font-bold text-center mb-8">Frequently Asked Questions</h2>
              <div className="space-y-4">
                <div className="bg-card border border-border rounded-xl p-6">
                  <h3 className="font-semibold mb-2">Is it safe to upload my PDFs?</h3>
                  <p className="text-muted-foreground">Yes, your files are processed securely in your browser and are never uploaded to our servers. They are automatically deleted after processing.</p>
                </div>
                <div className="bg-card border border-border rounded-xl p-6">
                  <h3 className="font-semibold mb-2">Are these tools really free?</h3>
                  <p className="text-muted-foreground">Yes, all PDF tools are 100% free with no hidden costs, watermarks, or registration required.</p>
                </div>
                <div className="bg-card border border-border rounded-xl p-6">
                  <h3 className="font-semibold mb-2">What file formats are supported?</h3>
                  <p className="text-muted-foreground">We support PDF files for most operations, Word documents (DOC, DOCX) for conversion, and common image formats (JPG, PNG, WEBP, GIF) for image to PDF conversion.</p>
                </div>
              </div>
            </div>
          </section>
        </main>
        
        <Footer />
      </div>
    </>
  );
};

export default PDFToolsPage;
