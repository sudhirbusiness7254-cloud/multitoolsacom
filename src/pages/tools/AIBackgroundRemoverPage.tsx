import { Helmet } from "react-helmet-async";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HreflangTags from "@/components/HreflangTags";
import AIBackgroundRemover from "@/components/ai-tools/AIBackgroundRemover";

const AIBackgroundRemoverPage = () => (
  <>
    <Helmet>
      <title>AI Background Remover - Remove Image Background Free</title>
      <meta name="description" content="Free AI Background Remover. Remove backgrounds from images automatically in your browser. No signup required." />
      <link rel="canonical" href="https://multitoolsa.com/ai-background-remover" />
    </Helmet>
    <HreflangTags path="/ai-background-remover" />
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <main className="flex-1 py-8 px-4">
        <div className="container mx-auto max-w-4xl text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">AI Background Remover</h1>
          <p className="text-muted-foreground">Remove backgrounds from images automatically using AI</p>
        </div>
        <AIBackgroundRemover />
      </main>
      <Footer />
    </div>
  </>
);

export default AIBackgroundRemoverPage;
