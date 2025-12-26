import { Helmet } from "react-helmet-async";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ImageEditor from "@/components/ImageEditor/ImageEditor";
import HreflangTags from "@/components/HreflangTags";

const ImageEditorPage = () => {
  return (
    <>
      <Helmet>
        <title>Image Editor - Crop, Rotate, Flip & Adjust Online | Free</title>
        <meta
          name="description"
          content="Free online image editor with crop, rotate, flip, and adjustment tools. Real-time preview, undo/redo, keyboard shortcuts. No upload needed - works in your browser."
        />
        <meta
          name="keywords"
          content="image editor, crop image, rotate image, flip image, photo editor, online editor, free image editor, brightness, contrast, saturation"
        />
        <link rel="canonical" href="https://multitoolsa.com/image-editor" />
        <meta property="og:title" content="Image Editor - Crop, Rotate, Flip & Adjust Online | Free" />
        <meta property="og:description" content="Free online image editor with crop, rotate, flip, and adjustment tools. Real-time preview, undo/redo, keyboard shortcuts." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://multitoolsa.com/image-editor" />
      </Helmet>
      <HreflangTags path="/image-editor" />

      <div className="min-h-screen bg-background flex flex-col">
        <Header />

        <main className="flex-1">
          {/* Hero Section */}
          <section className="py-12 px-4 text-center">
            <div className="max-w-4xl mx-auto">
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
                Image Editor
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Powerful image editing right in your browser. Crop, rotate, flip, and adjust
                your images with real-time preview. No uploads, no watermarks, completely free.
              </p>
            </div>
          </section>

          {/* Editor Section */}
          <section className="pb-16 px-4">
            <div className="max-w-6xl mx-auto">
              <ImageEditor />
            </div>
          </section>

          {/* Features Section */}
          <section className="py-16 px-4 bg-card/50">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-2xl font-bold text-foreground text-center mb-8">
                Powerful Editing Features
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  {
                    title: "Crop & Resize",
                    description: "Freeform or preset aspect ratios (1:1, 4:3, 16:9). Precise control with numeric inputs.",
                  },
                  {
                    title: "Rotate & Flip",
                    description: "Rotate 90° left/right or flip horizontally/vertically. Keyboard shortcuts included.",
                  },
                  {
                    title: "Adjustments",
                    description: "Fine-tune brightness, contrast, and saturation with intuitive sliders.",
                  },
                  {
                    title: "Export Options",
                    description: "Save as JPEG, PNG, or WebP. Control quality and preserve metadata.",
                  },
                ].map((feature) => (
                  <div
                    key={feature.title}
                    className="bg-card rounded-xl p-6 border border-border"
                  >
                    <h3 className="font-semibold text-foreground mb-2">{feature.title}</h3>
                    <p className="text-sm text-muted-foreground">{feature.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Keyboard Shortcuts */}
          <section className="py-16 px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl font-bold text-foreground text-center mb-8">
                Keyboard Shortcuts
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {[
                  { key: "Ctrl+Z", action: "Undo" },
                  { key: "Ctrl+Y", action: "Redo" },
                  { key: "R", action: "Rotate Right" },
                  { key: "L", action: "Rotate Left" },
                  { key: "F", action: "Flip Horizontal" },
                  { key: "V", action: "Flip Vertical" },
                  { key: "Enter", action: "Apply Crop" },
                  { key: "Esc", action: "Cancel" },
                  { key: "Ctrl+V", action: "Paste Image" },
                ].map((shortcut) => (
                  <div
                    key={shortcut.key}
                    className="flex items-center gap-3 bg-card rounded-lg p-3 border border-border"
                  >
                    <kbd className="px-2 py-1 bg-muted rounded text-xs font-mono">
                      {shortcut.key}
                    </kbd>
                    <span className="text-sm text-muted-foreground">{shortcut.action}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default ImageEditorPage;
