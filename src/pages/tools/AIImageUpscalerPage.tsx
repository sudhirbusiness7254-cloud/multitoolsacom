import { Helmet } from "react-helmet-async";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HreflangTags from "@/components/HreflangTags";
import AIImageUpscaler from "@/components/ai-tools/AIImageUpscaler";

const AIImageUpscalerPage = () => (
  <>
    <Helmet>
      <title>AI Image Upscaler - Increase Resolution 2x/4x Free</title>
      <meta name="description" content="Free AI Image Upscaler. Increase image resolution up to 4x using AI super-resolution. No signup required." />
      <link rel="canonical" href="https://multitoolsa.com/ai-image-upscaler" />
    </Helmet>
    <HreflangTags path="/ai-image-upscaler" />
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <main className="flex-1 py-8 px-4">
        <div className="container mx-auto max-w-4xl text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">AI Image Upscaler</h1>
          <p className="text-muted-foreground">Increase image resolution up to 4x using AI super-resolution</p>
        </div>
        <AIImageUpscaler />
      </main>
      <Footer />
    </div>
  </>
);

export default AIImageUpscalerPage;
