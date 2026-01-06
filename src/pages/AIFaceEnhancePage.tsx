import { Helmet } from "react-helmet-async";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AIFaceEnhance from "@/components/AIFaceEnhance";
import HreflangTags from "@/components/HreflangTags";

export default function AIFaceEnhancePage() {
  return (
    <>
      <Helmet>
        <title>AI Face Enhancer - HD Portrait Enhancement Like Remini | MultiTools</title>
        <meta
          name="description"
          content="Enhance portrait photos with AI. Smooth skin, brighten eyes, restore to 4K HD quality. Professional face enhancement like Remini - free online tool."
        />
        <meta name="keywords" content="face enhancer, portrait enhancement, skin smoothing, eye brightening, HD photo restore, Remini alternative, AI photo editor, 4K upscale" />
      </Helmet>
      <HreflangTags path="/ai-face-enhance" />

      <div className="min-h-screen flex flex-col bg-background">
        <Header />
        <main className="flex-1 container mx-auto px-4 py-8">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-8">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-violet-500/10 to-purple-500/10 text-violet-600 dark:text-violet-400 text-sm font-medium mb-4">
                ✨ Remini-Like AI Enhancement
              </div>
              <h1 className="text-3xl md:text-4xl font-bold mb-4">
                AI Face Enhancement
              </h1>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                Transform your portraits with professional-grade AI enhancement. 
                Smooth skin, brighten eyes, and restore photos to stunning 4K quality.
              </p>
            </div>

            <AIFaceEnhance />

            <div className="mt-12 grid md:grid-cols-3 gap-6">
              <div className="p-6 rounded-xl bg-gradient-to-br from-violet-500/5 to-purple-500/5 border border-violet-500/10">
                <h3 className="font-semibold mb-2">🎨 Full Enhancement</h3>
                <p className="text-sm text-muted-foreground">
                  Complete portrait perfection - skin smoothing, eye enhancement, and professional lighting all in one.
                </p>
              </div>
              <div className="p-6 rounded-xl bg-gradient-to-br from-cyan-500/5 to-blue-500/5 border border-cyan-500/10">
                <h3 className="font-semibold mb-2">👁️ Eye Enhancement</h3>
                <p className="text-sm text-muted-foreground">
                  Brighten whites, enhance iris color, add catchlights, and make eyes look more vibrant and alive.
                </p>
              </div>
              <div className="p-6 rounded-xl bg-gradient-to-br from-emerald-500/5 to-teal-500/5 border border-emerald-500/10">
                <h3 className="font-semibold mb-2">📸 HD/4K Restore</h3>
                <p className="text-sm text-muted-foreground">
                  Upscale and restore old or low-quality photos to stunning high-resolution quality.
                </p>
              </div>
            </div>

            <div className="mt-8 p-6 rounded-xl bg-secondary/30 border border-border">
              <h2 className="text-xl font-semibold mb-4">How It Works</h2>
              <div className="grid md:grid-cols-4 gap-4 text-center">
                <div>
                  <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center mx-auto mb-2 font-bold">1</div>
                  <p className="text-sm">Upload a portrait photo</p>
                </div>
                <div>
                  <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center mx-auto mb-2 font-bold">2</div>
                  <p className="text-sm">Choose enhancement mode</p>
                </div>
                <div>
                  <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center mx-auto mb-2 font-bold">3</div>
                  <p className="text-sm">AI enhances your photo</p>
                </div>
                <div>
                  <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center mx-auto mb-2 font-bold">4</div>
                  <p className="text-sm">Download HD result</p>
                </div>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
}
