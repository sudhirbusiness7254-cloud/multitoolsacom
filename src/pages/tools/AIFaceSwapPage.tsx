import { Helmet } from "react-helmet-async";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HreflangTags from "@/components/HreflangTags";
import AIFaceSwap from "@/components/ai-tools/AIFaceSwap";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const AIFaceSwapPage = () => {
  return (
    <>
      <Helmet>
        <title>AI Face Swap - Free Online Face Swapping Tool | MultiToolsA</title>
        <meta 
          name="description" 
          content="Swap faces between photos instantly using AI. Free online face swap tool with no watermarks. Upload two photos and swap faces in seconds." 
        />
        <meta name="keywords" content="face swap, AI face swap, face swap online, swap faces, face changer, face swap free, deepfake" />
        <link rel="canonical" href="https://multitoolsa.com/ai-face-swap" />
        
        <meta property="og:title" content="AI Face Swap - Free Online Face Swapping Tool" />
        <meta property="og:description" content="Swap faces between photos instantly using AI. Free, no watermarks, no signup required." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://multitoolsa.com/ai-face-swap" />
      </Helmet>
      <HreflangTags path="/ai-face-swap" />

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
              <h1 className="text-3xl md:text-4xl font-bold mb-4">AI Face Swap</h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Swap faces between two photos using advanced AI technology. Upload a source face and a target photo to create realistic face swaps instantly.
              </p>
            </div>
            
            {/* Tool */}
            <AIFaceSwap />
            
            {/* Info Section */}
            <div className="mt-12 grid md:grid-cols-3 gap-6">
              <div className="bg-card rounded-xl p-6 border border-border">
                <h3 className="font-semibold mb-2">🚀 Instant Processing</h3>
                <p className="text-sm text-muted-foreground">
                  Our AI processes face swaps in seconds, giving you realistic results almost instantly.
                </p>
              </div>
              <div className="bg-card rounded-xl p-6 border border-border">
                <h3 className="font-semibold mb-2">🎯 High Accuracy</h3>
                <p className="text-sm text-muted-foreground">
                  Advanced face detection ensures accurate alignment and natural-looking results.
                </p>
              </div>
              <div className="bg-card rounded-xl p-6 border border-border">
                <h3 className="font-semibold mb-2">🔒 Privacy First</h3>
                <p className="text-sm text-muted-foreground">
                  Your images are processed securely and never stored on our servers.
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

export default AIFaceSwapPage;
