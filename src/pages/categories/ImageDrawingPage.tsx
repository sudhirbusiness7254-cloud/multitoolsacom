import CategoryPageLayout from "@/components/CategoryPageLayout";
import { getCategoryBySlug } from "@/data/toolsData";
import DragDropUpload from "@/components/DragDropUpload";
import { useState } from "react";

const ImageDrawingPage = () => {
  const category = getCategoryBySlug("image-drawing")!;
  const [file, setFile] = useState<File | null>(null);

  return (
    <CategoryPageLayout
      category={category}
      metaTitle="Image Drawing Tools - Paint, Shapes, Signatures, Stickers | Free Online"
      metaDescription="Free online image drawing tools. Draw on photos, add shapes, create signatures, apply stickers and emojis. Annotate screenshots and images. Browser-based editing."
      keywords={[
        "draw on image",
        "paint tool",
        "add shapes",
        "signature pad",
        "add stickers",
        "add emojis",
        "image annotation",
        "photo drawing",
        "free drawing tool"
      ]}
      introduction="Our Image Drawing Tools let you annotate, mark up, and creatively enhance your images. Use the paint tool for freehand drawing. Add shapes like arrows, circles, and rectangles for annotations. Create digital signatures for documents. Apply stickers and emojis for fun and expressive images. All tools work directly in your browser with an intuitive interface."
      article={`Drawing and annotation tools transform static images into dynamic communication tools. Whether you're marking up documents, creating tutorials, or adding fun elements to photos, our suite has you covered.

Paint Tool provides freehand drawing with adjustable brush sizes and colors. Draw attention to specific areas, create hand-drawn highlights, or add artistic touches. The brush responds smoothly to mouse or touch input for natural drawing.

Draw Shapes adds geometric elements to your images. Rectangles highlight areas of interest. Circles draw attention to specific elements. Arrows point to important features. Lines connect related elements. All shapes are customizable with color, stroke width, and fill options.

Signature Pad creates smooth, professional-looking signatures. Use a mouse, trackpad, or touch screen to sign directly. Export signatures with transparent backgrounds for use on documents, contracts, and forms.

Add Stickers provides a library of decorative elements. Choose from hundreds of stickers for various themes and occasions. Resize and position stickers anywhere on your image. Perfect for social media content and fun photo enhancement.

Add Emojis embeds emoji characters onto your images. Express emotions, add reactions, or create meme-style content. Emojis are sized and positioned precisely where you want them.

All drawing tools support undo/redo for easy corrections. Layers allow complex compositions with elements that can be rearranged. Final images export at full resolution with all drawings permanently applied.`}
      features={[
        "Freehand paint tool",
        "Geometric shape tools",
        "Professional signature pad",
        "Sticker library",
        "Emoji overlay",
        "Adjustable brush settings",
        "Undo/redo support",
        "Layer management"
      ]}
      benefits={[
        "Annotate screenshots easily",
        "Create tutorials and guides",
        "Sign documents digitally",
        "Add fun elements to photos",
        "No software needed",
        "Works on touch devices",
        "Free unlimited use",
        "Instant saving"
      ]}
      howToUse={[
        "Select the drawing tool you want to use.",
        "Upload your base image.",
        "Use drawing tools to add your elements.",
        "Adjust size, color, and position as needed.",
        "Download your annotated image."
      ]}
      faqs={[
        {
          question: "Can I use these tools on a tablet or phone?",
          answer: "Yes! All tools support touch input. Drawing on tablets and phones works naturally with finger or stylus input."
        },
        {
          question: "How do I create a signature with transparent background?",
          answer: "Use the Signature Pad tool and enable 'Transparent Background' option. Export as PNG to preserve transparency for document overlays."
        },
        {
          question: "Can I undo mistakes while drawing?",
          answer: "Yes, all tools support undo (Ctrl+Z) and redo (Ctrl+Y). You can step back through your entire drawing history."
        },
        {
          question: "Are the stickers free to use commercially?",
          answer: "Our sticker library includes royalty-free options suitable for personal and commercial use. Check specific sticker sets for any usage restrictions."
        },
        {
          question: "Can I add text to images?",
          answer: "Yes, use our text annotation feature within the drawing tools. Customize font, size, color, and position for any text overlay needs."
        },
        {
          question: "How do I draw straight lines?",
          answer: "Use the Shape tool and select 'Line'. Hold Shift while drawing to constrain to perfectly straight horizontal, vertical, or 45-degree lines."
        },
        {
          question: "Can I save and continue editing later?",
          answer: "Currently, each session is independent. Once you download, the drawing is flattened. Save your original if you might need to start over."
        },
        {
          question: "Are my drawings processed on a server?",
          answer: "No, all drawing and editing happens locally in your browser. Your images stay on your device."
        }
      ]}
      useCases={[
        "Annotating screenshots for support",
        "Creating tutorial images",
        "Adding signatures to documents",
        "Making fun social media content",
        "Marking up design feedback",
        "Creating meme images",
        "Highlighting important areas",
        "Adding arrows and callouts"
      ]}
    >
      <div className="space-y-4">
        <DragDropUpload onFileSelect={setFile} accept="image/*" />
        {file && (
          <div className="bg-card rounded-xl p-4 border border-border text-center">
            <p className="text-muted-foreground mb-3">Select a drawing tool below</p>
            <p className="text-sm text-primary">Uploaded: {file.name}</p>
          </div>
        )}
      </div>
    </CategoryPageLayout>
  );
};

export default ImageDrawingPage;
