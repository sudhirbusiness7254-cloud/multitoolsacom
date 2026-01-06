import { Helmet } from "react-helmet-async";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AIColorize from "@/components/AIColorize";
import HreflangTags from "@/components/HreflangTags";

export default function AIColorizePage() {
  return (
    <>
      <Helmet>
        <title>AI Photo Colorization - Colorize Black & White Photos | ImageToolsForge</title>
        <meta
          name="description"
          content="Automatically colorize black and white photos using AI. Transform old photos with natural, vibrant, vintage, or cinematic color styles."
        />
        <meta name="keywords" content="colorize photos, black and white to color, AI colorization, photo restoration, old photo colorize" />
      </Helmet>
      <HreflangTags path="/ai-colorize" />

      <div className="min-h-screen flex flex-col bg-background">
        <Header />
        <main className="flex-1 container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <h1 className="text-3xl md:text-4xl font-bold mb-4">
                AI Photo Colorization
              </h1>
              <p className="text-muted-foreground text-lg">
                Bring old black & white photos to life with AI-powered colorization
              </p>
            </div>

            <AIColorize />

            <div className="mt-12 prose prose-sm max-w-none dark:prose-invert">
              <h2>How It Works</h2>
              <p>
                Our AI colorization tool uses advanced machine learning to analyze black and white photos
                and intelligently add realistic colors. Choose from different color styles to match your preference.
              </p>
              <h3>Color Styles</h3>
              <ul>
                <li><strong>Natural:</strong> Realistic, period-appropriate colors</li>
                <li><strong>Vibrant:</strong> Rich, lively colors that pop</li>
                <li><strong>Vintage:</strong> Warm, nostalgic tones</li>
                <li><strong>Cinematic:</strong> Dramatic movie-like grading</li>
              </ul>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
}
