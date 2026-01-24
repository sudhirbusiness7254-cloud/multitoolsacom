import { useState, useMemo } from "react";
import { Helmet } from "react-helmet-async";
import { Link, useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { AdBottom, AdVideo, AdInline, AdExoticFat } from "@/components/ads/AdContainer";
import { HilltopBanner, HilltopResponsive, HilltopSquare, HilltopAdGrid } from "@/components/ads/HilltopAds";
import { toolCategories } from "@/data/toolsData";
import { ArrowRight, Search, Sparkles, FileText } from "lucide-react";
import { Input } from "@/components/ui/input";
import { ToolIconWithBackground, getToolIconColor, getToolIconComponent } from "@/lib/toolIcons";
import HreflangTags from "@/components/HreflangTags";

// PDF Tools data for inclusion in all tools
const pdfToolsData = [
  { id: "merge-pdf", name: "Merge PDF", slug: "merge-pdf", description: "Combine multiple PDF files into one document", category: "PDF Tools", categorySlug: "pdf-tools", icon: "FileText", keywords: ["merge pdf", "combine pdf", "join pdf", "pdf merger"] },
  { id: "compress-pdf", name: "Compress PDF", slug: "compress-pdf", description: "Reduce PDF file size while maintaining quality", category: "PDF Tools", categorySlug: "pdf-tools", icon: "Minimize2", keywords: ["compress pdf", "reduce pdf size", "pdf compressor", "shrink pdf"] },
  { id: "word-to-pdf", name: "Word to PDF", slug: "word-to-pdf", description: "Convert Word documents (DOCX, DOC) to PDF format", category: "PDF Tools", categorySlug: "pdf-tools", icon: "FileUp", keywords: ["word to pdf", "docx to pdf", "convert word", "doc to pdf"] },
  { id: "image-to-pdf", name: "Image to PDF", slug: "image-to-pdf", description: "Convert and combine images into PDF documents", category: "PDF Tools", categorySlug: "pdf-tools", icon: "Image", keywords: ["image to pdf", "jpg to pdf", "png to pdf", "photo to pdf"] },
  { id: "split-pdf", name: "Split PDF", slug: "split-pdf", description: "Extract pages or split PDF into multiple files", category: "PDF Tools", categorySlug: "pdf-tools", icon: "Scissors", keywords: ["split pdf", "extract pdf pages", "pdf splitter", "divide pdf"] },
];

// Colorful gradient pairs for tools
const toolGradients = [
  { from: "#FF6B6B", to: "#FF8E53" },
  { from: "#4ECDC4", to: "#45B7AA" },
  { from: "#667eea", to: "#764ba2" },
  { from: "#f093fb", to: "#f5576c" },
  { from: "#11998e", to: "#38ef7d" },
  { from: "#00c6ff", to: "#0072ff" },
  { from: "#f857a6", to: "#ff5858" },
  { from: "#6366f1", to: "#8b5cf6" },
  { from: "#ec4899", to: "#f97316" },
  { from: "#3b82f6", to: "#1d4ed8" },
  { from: "#14b8a6", to: "#059669" },
  { from: "#f59e0b", to: "#d97706" },
  { from: "#8b5cf6", to: "#7c3aed" },
  { from: "#ef4444", to: "#dc2626" },
  { from: "#22c55e", to: "#16a34a" },
];

const getGradient = (index: number) => toolGradients[index % toolGradients.length];

const AllToolsPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  
  const allTools = useMemo(() => {
    // Combine image tools with PDF tools
    const imageTools = toolCategories.flatMap((cat, catIndex) => 
      cat.tools.map((tool, toolIndex) => ({
        ...tool,
        gradient: getGradient(catIndex * 10 + toolIndex)
      }))
    );
    
    // Add PDF tools
    const pdfTools = pdfToolsData.map((tool, index) => ({
      ...tool,
      gradient: { from: "#ef4444", to: "#dc2626" } // Red gradient for PDF tools
    }));
    
    return [...imageTools, ...pdfTools];
  }, []);

  const filteredTools = useMemo(() => {
    if (!searchQuery.trim()) return allTools;
    const query = searchQuery.toLowerCase();
    return allTools.filter(tool => 
      tool.name.toLowerCase().includes(query) ||
      tool.description.toLowerCase().includes(query) ||
      tool.category.toLowerCase().includes(query) ||
      tool.keywords.some(k => k.toLowerCase().includes(query))
    );
  }, [allTools, searchQuery]);

  const groupedTools = useMemo(() => {
    const groups: Record<string, typeof filteredTools> = {};
    filteredTools.forEach(tool => {
      if (!groups[tool.category]) {
        groups[tool.category] = [];
      }
      groups[tool.category].push(tool);
    });
    return groups;
  }, [filteredTools]);

  return (
    <>
      <Helmet>
        <title>All Tools - 85+ Free Online Image & PDF Tools | MultiTools</title>
        <meta name="description" content="Browse our complete collection of 85+ free online tools. Convert, compress, resize images. Merge, split, convert PDFs. No signup required." />
        <link rel="canonical" href="https://multitoolsa.com/all-tools" />
      </Helmet>
      <HreflangTags path="/all-tools" />

      <div className="min-h-screen bg-background flex flex-col">
        <Header />
        
        <main className="flex-1">
          {/* Hero */}
          <section className="py-12 md:py-16 bg-gradient-hero">
            <div className="container mx-auto px-4 text-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/30 mb-6">
                <Sparkles className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium text-primary">85+ Free Tools</span>
              </div>
              <h1 className="text-3xl md:text-5xl font-bold mb-4">All Tools</h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
                Browse our complete collection of free online image and PDF tools
              </p>
              
              {/* Search */}
              <div className="max-w-md mx-auto relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search tools..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-12 h-12 text-lg"
                />
              </div>
              
              {/* HilltopAds - After Search */}
              <HilltopBanner theme="huge_income" className="mt-8" />
            </div>
          </section>

          {/* Tools Grid */}
          <section className="py-12 px-4">
            <div className="container mx-auto max-w-7xl">
              {Object.entries(groupedTools).map(([category, tools]) => (
                <div key={category} className="mb-12">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold">{category}</h2>
                    <span className="text-sm text-muted-foreground">{tools.length} tools</span>
                  </div>
                  
                  <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                    {tools.map((tool) => (
                      <Link
                        key={tool.id}
                        to={`/${tool.slug}`}
                        className="group relative bg-card rounded-xl p-4 border border-border hover:border-primary/50 transition-all duration-300 hover:shadow-lg"
                      >
                        <ToolIconWithBackground 
                          toolSlug={tool.slug} 
                          size={40} 
                          iconSize={20}
                          className="mb-3"
                        />
                        
                        <h3 className="font-semibold text-sm mb-1 group-hover:text-primary transition-colors line-clamp-1">
                          {tool.name}
                        </h3>
                        <p className="text-xs text-muted-foreground line-clamp-2">
                          {tool.description}
                        </p>
                        
                        <ArrowRight className="absolute top-4 right-4 w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                      </Link>
                    ))}
                  </div>
                </div>
              ))}

              {filteredTools.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-muted-foreground">No tools found matching "{searchQuery}"</p>
                </div>
              )}
            </div>
            
            {/* HilltopAds Grid - After Tools */}
            <AdExoticFat className="max-w-6xl mx-auto" />
            
            {/* Ads below tools */}
            <div className="max-w-4xl mx-auto mt-6">
              <AdExoticFat />
              <AdExoticFat className="mt-4" />
              <AdExoticFat className="mt-4" />
              <AdExoticFat className="mt-4" />
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default AllToolsPage;