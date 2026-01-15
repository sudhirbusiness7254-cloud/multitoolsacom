import { Helmet } from "react-helmet-async";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HreflangTags from "@/components/HreflangTags";
import AIPhotoEnhancer from "@/components/ai-tools/AIPhotoEnhancer";

const AIPhotoEnhancerPage = () => (
  <>
    <Helmet>
      <title>AI Photo Enhancer - Improve Image Quality Free | Like Remini</title>
      <meta name="description" content="Free AI Photo Enhancer tool. Improve image quality, sharpness, and clarity automatically. Better than Remini - no signup required." />
      <link rel="canonical" href="https://multitoolsa.com/ai-photo-enhancer" />
    </Helmet>
    <HreflangTags path="/ai-photo-enhancer" />
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <main className="flex-1 py-8 px-4">
        <div className="container mx-auto max-w-4xl text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">AI Photo Enhancer</h1>
          <p className="text-muted-foreground">Improve image quality, sharpness, and clarity automatically using AI</p>
        </div>
        <AIPhotoEnhancer />
      </main>
      <Footer />
    </div>
  </>
);

export default AIPhotoEnhancerPage;
