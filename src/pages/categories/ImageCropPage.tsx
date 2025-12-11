import { useState } from "react";
import { Helmet } from "react-helmet-async";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import UniversalImageCropper from "@/components/UniversalImageCropper";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { ArrowRight, Crop, Square, Circle, RectangleHorizontal, Grid } from "lucide-react";
import { getCategoryBySlug, toolCategories } from "@/data/toolsData";
import { Link } from "react-router-dom";

type CropMode = "free" | "1:1" | "4:3" | "16:9" | "3:2" | "9:16" | "circle";

const cropTools = [
  { id: "manual-crop", name: "Manual Crop", mode: "free" as CropMode, description: "Manually crop image with custom selection", icon: <Crop className="w-5 h-5" /> },
  { id: "aspect-ratio-crop", name: "Aspect Ratio Crop", mode: "16:9" as CropMode, description: "Crop image to specific aspect ratio", icon: <RectangleHorizontal className="w-5 h-5" /> },
  { id: "circle-crop", name: "Circle Crop", mode: "circle" as CropMode, description: "Crop image into a circle shape", icon: <Circle className="w-5 h-5" /> },
  { id: "square-crop", name: "Square Crop", mode: "1:1" as CropMode, description: "Crop image into a square shape", icon: <Square className="w-5 h-5" /> },
  { id: "free-selection-crop", name: "Free Selection Crop", mode: "free" as CropMode, description: "Crop image with free-form selection", icon: <Grid className="w-5 h-5" /> },
];

const ImageCropPage = () => {
  const category = getCategoryBySlug("image-crop")!;
  const [selectedMode, setSelectedMode] = useState<CropMode>("free");
  const [key, setKey] = useState(0);

  const handleToolClick = (mode: CropMode) => {
    setSelectedMode(mode);
    setKey(prev => prev + 1); // Reset component
    // Scroll to cropper
    document.getElementById("cropper-section")?.scrollIntoView({ behavior: "smooth" });
  };

  const canonicalUrl = `https://multitools.com/${category.slug}`;
  const metaTitle = "Image Crop Tools - Crop Images Online Free | Circle, Square, Aspect Ratio";
  const metaDescription = "Free online image cropper. Crop images manually, by aspect ratio, in circles or squares. Perfect for profile pictures, social media, and more.";

  const faqs = [
    { question: "How do I create a circular profile picture?", answer: "Use our Circle Crop tool. Upload your image, adjust the circular selection to frame your subject, and download. The result will have a transparent background for perfect display on any platform." },
    { question: "What aspect ratios are available?", answer: "We offer common presets including 1:1, 4:3, 3:2, 16:9, 9:16, and more. You can also enter custom ratios for specific requirements." },
    { question: "Will cropping reduce image quality?", answer: "No, cropping uses the original image data without recompression. The cropped area maintains full original quality." },
    { question: "Are my images stored on your servers?", answer: "No, all processing happens in your browser. Images are never uploaded, ensuring complete privacy and security." }
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
                <p className="text-lg text-muted-foreground">Crop images with precision. Choose from manual, aspect ratio, circle, or square cropping modes.</p>
              </div>

              {/* Tool Selection Cards */}
              <div className="max-w-4xl mx-auto mb-8">
                <h2 className="text-xl font-bold mb-4 text-center">Choose Your Tool</h2>
                <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-3">
                  {cropTools.map((tool) => (
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

              {/* Universal Cropper */}
              <div id="cropper-section" className="max-w-4xl mx-auto">
                <UniversalImageCropper key={key} initialMode={selectedMode} />
              </div>
            </div>
          </section>

          {/* Introduction */}
          <section className="py-12 px-4">
            <div className="container mx-auto max-w-4xl">
              <h2 className="text-2xl md:text-3xl font-bold mb-6">What is Image Crop?</h2>
              <p className="text-muted-foreground leading-relaxed">Our Image Crop Tools offer versatile cropping options for any need. Create perfect circles for profile pictures, crop to specific aspect ratios for social media, or use manual cropping for complete control.</p>
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

export default ImageCropPage;
