import { Helmet } from "react-helmet-async";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HreflangTags from "@/components/HreflangTags";
import AIObjectRemoval from "@/components/ai-tools/AIObjectRemoval";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const AIObjectRemovalPage = () => {
  return (
    <>
      <Helmet>
        <title>AI Object Removal - Remove Unwanted Objects from Photos | MultiToolsA</title>
        <meta 
          name="description" 
          content="Remove unwanted objects, people, text, or watermarks from photos using AI. Free online object removal tool with intelligent background fill." 
        />
        <meta name="keywords" content="remove object from photo, AI object removal, remove watermark, remove person from photo, photo cleanup, erase objects" />
        <link rel="canonical" href="https://multitoolsa.com/ai-object-removal" />
        
        <meta property="og:title" content="AI Object Removal - Remove Unwanted Objects from Photos" />
        <meta property="og:description" content="Remove unwanted objects from photos using AI. Free, intelligent background fill, no watermarks." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://multitoolsa.com/ai-object-removal" />
      </Helmet>
      <HreflangTags path="/ai-object-removal" />

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
              <h1 className="text-3xl md:text-4xl font-bold mb-4">AI Object Removal</h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Remove unwanted objects, people, text, or watermarks from your photos. Simply brush over what you want to remove and let AI fill in the background seamlessly.
              </p>
            </div>
            
            {/* Tool */}
            <AIObjectRemoval />
            
            {/* Info Section */}
            <div className="mt-12 grid md:grid-cols-3 gap-6">
              <div className="bg-card rounded-xl p-6 border border-border">
                <h3 className="font-semibold mb-2">🖌️ Easy Brush Tool</h3>
                <p className="text-sm text-muted-foreground">
                  Simply brush over objects you want to remove - adjustable brush size for precision.
                </p>
              </div>
              <div className="bg-card rounded-xl p-6 border border-border">
                <h3 className="font-semibold mb-2">🪄 Smart Fill</h3>
                <p className="text-sm text-muted-foreground">
                  AI intelligently fills in the removed area to match the surrounding background.
                </p>
              </div>
              <div className="bg-card rounded-xl p-6 border border-border">
                <h3 className="font-semibold mb-2">🎯 Remove Anything</h3>
                <p className="text-sm text-muted-foreground">
                  People, objects, text, watermarks, blemishes - remove anything from your photos.
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

export default AIObjectRemovalPage;
