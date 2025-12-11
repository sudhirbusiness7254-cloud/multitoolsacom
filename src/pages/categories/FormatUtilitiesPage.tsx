import { useState } from "react";
import { Helmet } from "react-helmet-async";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import UniversalFormatUtility from "@/components/UniversalFormatUtility";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { ArrowRight, Palette, Circle, Droplets, Eraser, Layers, Combine } from "lucide-react";
import { getCategoryBySlug, toolCategories } from "@/data/toolsData";
import { Link } from "react-router-dom";

type UtilityMode = "grayscale" | "blackwhite" | "add-transparency" | "remove-transparency" | "invert" | "sepia";

const formatTools = [
  { id: "grayscale", name: "Grayscale Conversion", mode: "grayscale" as UtilityMode, description: "Convert image to grayscale", icon: <Palette className="w-5 h-5" /> },
  { id: "blackwhite", name: "Black & White", mode: "blackwhite" as UtilityMode, description: "Convert image to pure black and white", icon: <Circle className="w-5 h-5" /> },
  { id: "add-transparency", name: "Add Transparency", mode: "add-transparency" as UtilityMode, description: "Add transparency to image", icon: <Droplets className="w-5 h-5" /> },
  { id: "remove-transparency", name: "Remove Transparency", mode: "remove-transparency" as UtilityMode, description: "Remove transparency from image", icon: <Eraser className="w-5 h-5" /> },
  { id: "invert", name: "Invert Colors", mode: "invert" as UtilityMode, description: "Create negative of image", icon: <Layers className="w-5 h-5" /> },
  { id: "sepia", name: "Sepia Effect", mode: "sepia" as UtilityMode, description: "Apply vintage sepia tone", icon: <Combine className="w-5 h-5" /> },
];

const FormatUtilitiesPage = () => {
  const category = getCategoryBySlug("image-format-utilities")!;
  const [selectedMode, setSelectedMode] = useState<UtilityMode>("grayscale");
  const [key, setKey] = useState(0);

  const handleToolClick = (mode: UtilityMode) => {
    setSelectedMode(mode);
    setKey(prev => prev + 1);
    document.getElementById("tool-section")?.scrollIntoView({ behavior: "smooth" });
  };

  const canonicalUrl = `https://multitools.com/${category.slug}`;
  const metaTitle = "Image Format Utilities - Grayscale, Transparency, Invert Colors | Free Online";
  const metaDescription = "Free image format utilities. Convert to grayscale or black & white, add/remove transparency, invert colors, apply sepia. Browser-based processing.";

  const faqs = [
    { question: "What's the difference between grayscale and black & white?", answer: "Grayscale preserves a full range of gray tones from black to white. Black & white uses only pure black and pure white with no gray in between." },
    { question: "How do I make a transparent background?", answer: "Use our Add Transparency tool. Select the color you want to remove (usually white or a solid color) and adjust the tolerance level." },
    { question: "What formats support transparency?", answer: "PNG, WebP, and GIF support transparency. JPEG does not support transparency - any transparent areas will be filled with a background color." },
    { question: "Is the processing done locally?", answer: "Yes, all processing happens locally in your browser. Your images are never uploaded to any server, ensuring complete privacy." }
  ];

  const otherCategories = toolCategories.filter(cat => cat.id !== category.id && cat.id !== "tag-tools").slice(0, 6);

  return (
    <>
      <Helmet>
        <title>{metaTitle}</title>
        <meta name="description" content={metaDescription} />
        <link rel="canonical" href={canonicalUrl} />
      </Helmet>

      <div className="min-h-screen bg-background flex flex-col">
        <Header />
        
        <main className="flex-1">
          {/* Hero Section */}
          <section className="py-8 md:py-12 bg-gradient-hero relative overflow-hidden">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/10 rounded-full blur-3xl" />
            
            <div className="container mx-auto px-4 relative z-10">
              <div className="text-center max-w-3xl mx-auto mb-8">
                <h1 className="text-3xl md:text-5xl font-bold mb-4">{category.name}</h1>
                <p className="text-lg text-muted-foreground">Essential image utilities. Convert to grayscale, add transparency, invert colors, and more.</p>
              </div>

              {/* Universal Tool First */}
              <div id="tool-section" className="max-w-4xl mx-auto mb-8">
                <UniversalFormatUtility key={key} initialMode={selectedMode} />
              </div>

              {/* Tool Selection Cards Below */}
              <div className="max-w-4xl mx-auto">
                <h2 className="text-xl font-bold mb-4 text-center">Choose Your Tool</h2>
                <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-3">
                  {formatTools.map((tool) => (
                    <button
                      key={tool.id}
                      onClick={() => handleToolClick(tool.mode)}
                      className={`group text-left bg-card rounded-xl p-4 border transition-all duration-300 hover-lift ${
                        selectedMode === tool.mode ? "border-primary bg-primary/10" : "border-border hover:border-primary/50"
                      }`}
                    >
                      <div className="flex items-center gap-3 mb-2">
                        <div className={`${selectedMode === tool.mode ? "text-primary" : "text-muted-foreground"}`}>
                          {tool.icon}
                        </div>
                        <h3 className="font-semibold group-hover:text-primary transition-colors">{tool.name}</h3>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">{tool.description}</p>
                      <div className="flex items-center gap-1 text-primary text-sm font-medium">
                        <span>Use Tool</span>
                        <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Introduction */}
          <section className="py-12 px-4">
            <div className="container mx-auto max-w-4xl">
              <h2 className="text-2xl md:text-3xl font-bold mb-6">What are Format Utilities?</h2>
              <p className="text-muted-foreground leading-relaxed">Our Format Utilities provide essential image manipulation capabilities. Convert photos to grayscale or pure black and white for classic aesthetics. Add or remove transparency for web graphics. Invert colors or apply vintage sepia effects. These fundamental tools are indispensable for designers and content creators.</p>
            </div>
          </section>

          {/* FAQs */}
          <section className="py-12 px-4 bg-gradient-dark">
            <div className="container mx-auto max-w-4xl">
              <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>
              <Accordion type="single" collapsible className="space-y-2">
                {faqs.map((faq, i) => (
                  <AccordionItem key={i} value={`faq-${i}`} className="bg-card border border-border rounded-xl px-4">
                    <AccordionTrigger className="text-left hover:no-underline">{faq.question}</AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">{faq.answer}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </section>

          {/* Other Categories */}
          <section className="py-12 px-4">
            <div className="container mx-auto max-w-5xl">
              <h2 className="text-2xl font-bold mb-6">Explore More Image Tools</h2>
              <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
                {otherCategories.map((cat) => (
                  <Link key={cat.id} to={`/${cat.slug}`} className="bg-card rounded-xl p-4 border border-border hover:border-primary/50 transition-colors group">
                    <h3 className="font-semibold group-hover:text-primary transition-colors">{cat.name}</h3>
                    <p className="text-sm text-muted-foreground mt-1">{cat.description}</p>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default FormatUtilitiesPage;
