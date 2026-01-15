import { Helmet } from "react-helmet-async";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HreflangTags from "@/components/HreflangTags";
import AIImageRestorer from "@/components/ai-tools/AIImageRestorer";

const AIImageRestorerPage = () => (
  <>
    <Helmet>
      <title>AI Image Restorer - Restore Old Photos Free</title>
      <meta name="description" content="Free AI Image Restorer. Restore old, damaged, or low-quality photos using AI. Fix scratches, fading, and noise." />
      <link rel="canonical" href="https://multitoolsa.com/ai-image-restorer" />
    </Helmet>
    <HreflangTags path="/ai-image-restorer" />
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <main className="flex-1 py-8 px-4">
        <div className="container mx-auto max-w-4xl text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">AI Image Restorer</h1>
          <p className="text-muted-foreground">Restore old, damaged, or low-quality photos using AI</p>
        </div>
        <AIImageRestorer />
      </main>
      <Footer />
    </div>
  </>
);

export default AIImageRestorerPage;
