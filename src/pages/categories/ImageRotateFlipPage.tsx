import { useState } from "react";
import { Helmet } from "react-helmet-async";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import UniversalRotateFlip from "@/components/UniversalRotateFlip";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { ArrowRight, RotateCw, RotateCcw, FlipHorizontal, FlipVertical, RotateCcwSquare, RotateCcwIcon } from "lucide-react";
import { getCategoryBySlug, toolCategories } from "@/data/toolsData";
import { Link } from "react-router-dom";

type TransformMode = "rotate-90" | "rotate-180" | "rotate-270" | "custom" | "flip-h" | "flip-v";

const rotateFlipTools = [
  { id: "rotate-90", name: "Rotate 90°", mode: "rotate-90" as TransformMode, description: "Rotate image 90 degrees clockwise", icon: <RotateCw className="w-5 h-5" /> },
  { id: "rotate-180", name: "Rotate 180°", mode: "rotate-180" as TransformMode, description: "Rotate image 180 degrees", icon: <RotateCcwSquare className="w-5 h-5" /> },
  { id: "rotate-270", name: "Rotate 270°", mode: "rotate-270" as TransformMode, description: "Rotate image 270 degrees", icon: <RotateCcw className="w-5 h-5" /> },
  { id: "custom-rotate", name: "Custom Rotate", mode: "custom" as TransformMode, description: "Rotate image by custom angle", icon: <RotateCcwIcon className="w-5 h-5" /> },
  { id: "flip-horizontal", name: "Flip Horizontal", mode: "flip-h" as TransformMode, description: "Flip image horizontally", icon: <FlipHorizontal className="w-5 h-5" /> },
  { id: "flip-vertical", name: "Flip Vertical", mode: "flip-v" as TransformMode, description: "Flip image vertically", icon: <FlipVertical className="w-5 h-5" /> },
];

const ImageRotateFlipPage = () => {
  const category = getCategoryBySlug("image-rotate-flip")!;
  const [selectedMode, setSelectedMode] = useState<TransformMode>("rotate-90");
  const [key, setKey] = useState(0);

  const handleToolClick = (mode: TransformMode) => {
    setSelectedMode(mode);
    setKey(prev => prev + 1);
    document.getElementById("tool-section")?.scrollIntoView({ behavior: "smooth" });
  };

  const canonicalUrl = `https://multitools.com/${category.slug}`;
  const metaTitle = "Rotate & Flip Images Online Free - 90°, 180°, Custom Angle, Mirror Effect";
  const metaDescription = "Free online image rotation and flip tools. Rotate images 90°, 180°, 270°, or any custom angle. Flip horizontally, vertically, or create mirror effects.";

  const faqs = [
    { question: "Does rotating an image reduce quality?", answer: "No, our rotation uses lossless transformation. The original image data is preserved, simply rearranged without recompression." },
    { question: "Can I rotate by any angle?", answer: "Yes! Our Custom Rotate tool lets you specify any angle from -180 to 180 degrees with precision." },
    { question: "What's the difference between flip and rotate?", answer: "Rotate turns the image around its center point. Flip creates a mirror image by reversing it along an axis." },
    { question: "Are my photos uploaded to a server?", answer: "No, all transformations happen locally in your browser. Your images remain private." }
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
                <p className="text-lg text-muted-foreground">Rotate and flip images instantly. Fix orientation, create mirror effects, or rotate by any angle.</p>
              </div>

              {/* Universal Tool First */}
              <div id="tool-section" className="max-w-4xl mx-auto mb-8">
                <UniversalRotateFlip key={key} initialMode={selectedMode} />
              </div>

              {/* Tool Selection Cards Below */}
              <div className="max-w-4xl mx-auto">
                <h2 className="text-xl font-bold mb-4 text-center">Choose Your Tool</h2>
                <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-3">
                  {rotateFlipTools.map((tool) => (
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
              <h2 className="text-2xl md:text-3xl font-bold mb-6">What is Rotate & Flip?</h2>
              <p className="text-muted-foreground leading-relaxed">Our Rotate & Flip Tools let you quickly correct image orientation or create artistic effects. Rotate images by standard angles or specify any custom degree. Flip horizontally or vertically for mirror effects.</p>
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

export default ImageRotateFlipPage;
