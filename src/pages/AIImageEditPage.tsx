import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AIImageEdit from "@/components/AIImageEdit";
import HreflangTags from "@/components/HreflangTags";
import { Helmet } from "react-helmet-async";

const AIImageEditPage = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Helmet>
        <title>AI Image Editor - Edit Photos with Natural Language | MultiTools</title>
        <meta name="description" content="Edit images using natural language instructions. Transform photos with AI - change styles, add effects, modify colors, and more. Free AI image editing tool." />
        <meta name="keywords" content="AI image editor, edit photos with AI, AI photo editing, natural language image editor, transform images" />
        <link rel="canonical" href="https://multitools.app/ai-image-edit" />
      </Helmet>
      <HreflangTags path="/ai-image-edit" />
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <AIImageEdit />
      </main>
      <Footer />
    </div>
  );
};

export default AIImageEditPage;
