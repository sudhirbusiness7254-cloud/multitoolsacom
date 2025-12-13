import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { toolCategories } from "@/data/toolsData";
import { ArrowRight, Search, Sparkles } from "lucide-react";
import { useState, useMemo } from "react";
import { Input } from "@/components/ui/input";
import { ToolIconWithBackground, getToolIconColor, getToolIconComponent } from "@/lib/toolIcons";

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
    return toolCategories.flatMap((cat, catIndex) => 
      cat.tools.map((tool, toolIndex) => ({
        ...tool,
        gradient: getGradient(catIndex * 10 + toolIndex)
      }))
    );
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
        <title>All Image Tools - 80+ Free Online Image Tools | MultiTools</title>
        <meta name="description" content="Browse our complete collection of 80+ free online image tools. Convert, compress, resize, crop, edit, and enhance images. No signup required." />
        <link rel="canonical" href="https://multitools.com/all-tools" />
      </Helmet>

      <div className="min-h-screen bg-background flex flex-col">
        <Header />
        
        <main className="flex-1">
          {/* Hero */}
          <section className="py-12 md:py-16 bg-gradient-hero">
            <div className="container mx-auto px-4 text-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/30 mb-6">
                <Sparkles className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium text-primary">80+ Free Tools</span>
              </div>
              <h1 className="text-3xl md:text-5xl font-bold mb-4">All Image Tools</h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
                Browse our complete collection of free online image tools
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
          </section>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default AllToolsPage;