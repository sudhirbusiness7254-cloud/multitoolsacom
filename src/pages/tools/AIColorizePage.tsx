import { Helmet } from "react-helmet-async";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HreflangTags from "@/components/HreflangTags";
import AIColorize from "@/components/ai-tools/AIColorize";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const AIColorizePage = () => {
  return (
    <>
      <Helmet>
        <title>AI Colorize Photos - Add Color to Black & White Images | MultiToolsA</title>
        <meta 
          name="description" 
          content="Transform black and white photos into vibrant color images using AI. Free online photo colorization tool. Restore old photos with realistic colors." 
        />
        <meta name="keywords" content="colorize photos, AI colorize, black and white to color, photo colorization, restore old photos, add color to photos" />
        <link rel="canonical" href="https://multitoolsa.com/ai-colorize" />
        
        <meta property="og:title" content="AI Colorize Photos - Add Color to Black & White Images" />
        <meta property="og:description" content="Transform B&W photos into vibrant color images using AI. Free, no watermarks, no signup required." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://multitoolsa.com/ai-colorize" />
      </Helmet>
      <HreflangTags path="/ai-colorize" />

      <div className="min-h-screen bg-background flex flex-col">
        <Header />
        
        <main className="flex-1 py-8 md:py-12 px-4">
          <div className="container mx-auto max-w-5xl">
            {/* Breadcrumb */}
            <div className="mb-6">
              <Link 
                to="/ai-image-tools" 
                className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to AI Image Tools
              </Link>
            </div>
            
            {/* Page Header */}
            <div className="text-center mb-8">
              <h1 className="text-3xl md:text-4xl font-bold mb-4">AI Photo Colorization</h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Breathe new life into old black & white photos. Our AI analyzes your image and adds realistic, vibrant colors automatically.
              </p>
            </div>
            
            {/* Tool */}
            <AIColorize />
            
            {/* Info Section */}
            <div className="mt-12 grid md:grid-cols-3 gap-6">
              <div className="bg-card rounded-xl p-6 border border-border">
                <h3 className="font-semibold mb-2">🎨 Realistic Colors</h3>
                <p className="text-sm text-muted-foreground">
                  AI trained on millions of images to predict accurate, natural-looking colors.
                </p>
              </div>
              <div className="bg-card rounded-xl p-6 border border-border">
                <h3 className="font-semibold mb-2">📸 Restore Memories</h3>
                <p className="text-sm text-muted-foreground">
                  Perfect for restoring old family photos and historical images.
                </p>
              </div>
              <div className="bg-card rounded-xl p-6 border border-border">
                <h3 className="font-semibold mb-2">⚡ Instant Results</h3>
                <p className="text-sm text-muted-foreground">
                  Get colorized photos in seconds with no manual work required.
                </p>
              </div>
            </div>
          </div>
        </main>
        
        <Footer />
      </div>
    </>
  );
};

export default AIColorizePage;
