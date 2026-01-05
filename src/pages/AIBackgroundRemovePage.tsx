import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AIBackgroundRemove from "@/components/AIBackgroundRemove";
import HreflangTags from "@/components/HreflangTags";
import { Helmet } from "react-helmet-async";

const AIBackgroundRemovePage = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Helmet>
        <title>AI Background Removal - Remove Image Backgrounds | MultiTools</title>
        <meta name="description" content="Remove backgrounds from images instantly with AI. Create transparent backgrounds, replace with white, blur, or add gradients. Free online background remover." />
        <meta name="keywords" content="remove background, background remover, transparent background, AI background removal, remove image background" />
        <link rel="canonical" href="https://multitools.app/ai-background-remove" />
      </Helmet>
      <HreflangTags path="/ai-background-remove" />
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <AIBackgroundRemove />
      </main>
      <Footer />
    </div>
  );
};

export default AIBackgroundRemovePage;
