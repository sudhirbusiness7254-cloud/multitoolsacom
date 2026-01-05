import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AIImageEnhance from "@/components/AIImageEnhance";
import HreflangTags from "@/components/HreflangTags";
import { Helmet } from "react-helmet-async";

const AIImageEnhancePage = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Helmet>
        <title>AI Image Enhancement - Enhance Photos with AI | MultiTools</title>
        <meta name="description" content="Enhance your images with AI. Improve quality, sharpen details, fix lighting, denoise, and upscale photos automatically using artificial intelligence." />
        <meta name="keywords" content="AI image enhancement, enhance photos, improve image quality, sharpen images, AI photo editor, upscale images" />
        <link rel="canonical" href="https://multitools.app/ai-image-enhance" />
      </Helmet>
      <HreflangTags path="/ai-image-enhance" />
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <AIImageEnhance />
      </main>
      <Footer />
    </div>
  );
};

export default AIImageEnhancePage;
