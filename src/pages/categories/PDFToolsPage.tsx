import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { FileText, Minimize2, FileUp, Image, Scissors } from "lucide-react";

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
      </Helmet>
      
      <div className="min-h-screen bg-background">
        <Header />
        
        <main className="container mx-auto px-4 py-12">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Free Online <span className="text-primary">PDF Tools</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              All the tools you need to work with PDFs. Merge, compress, split, convert - completely free and secure.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {pdfTools.map((tool) => (
              <Link
                key={tool.slug}
                to={`/${tool.slug}`}
                className="group bg-card border border-border rounded-2xl p-6 hover:shadow-lg transition-all hover:-translate-y-1"
              >
                <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${tool.color} flex items-center justify-center mb-4`}>
                  <tool.icon className="w-7 h-7 text-white" />
                </div>
                <h2 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                  {tool.name}
                </h2>
                <p className="text-muted-foreground">{tool.description}</p>
              </Link>
            ))}
          </div>

          <section className="mt-16 max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold mb-6">Why Use Our PDF Tools?</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-card border border-border rounded-xl p-6">
                <h3 className="font-semibold mb-2">100% Free</h3>
                <p className="text-muted-foreground">All tools are completely free with no hidden costs or watermarks.</p>
              </div>
              <div className="bg-card border border-border rounded-xl p-6">
                <h3 className="font-semibold mb-2">Secure & Private</h3>
                <p className="text-muted-foreground">Files are processed in your browser. Nothing is uploaded to servers.</p>
              </div>
              <div className="bg-card border border-border rounded-xl p-6">
                <h3 className="font-semibold mb-2">No Registration</h3>
                <p className="text-muted-foreground">Use all tools instantly without creating an account.</p>
              </div>
              <div className="bg-card border border-border rounded-xl p-6">
                <h3 className="font-semibold mb-2">Works Everywhere</h3>
                <p className="text-muted-foreground">Works on any device - desktop, tablet, or mobile.</p>
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
