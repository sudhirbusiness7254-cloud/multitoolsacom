import CategoryPageLayout from "@/components/CategoryPageLayout";
import { getCategoryBySlug } from "@/data/toolsData";
import DragDropUpload from "@/components/DragDropUpload";
import { useState } from "react";

const ImageCombinePage = () => {
  const category = getCategoryBySlug("image-combine")!;
  const [file, setFile] = useState<File | null>(null);

  return (
    <CategoryPageLayout
      category={category}
      metaTitle="Image Combine Tools - Merge, Collage, Stitch Images Online | Free"
      metaDescription="Free online image combining tools. Merge images horizontally or vertically, create collages, stitch panoramas, make before/after comparisons. No software required."
      keywords={[
        "merge images",
        "combine images",
        "image collage",
        "stitch images",
        "before after maker",
        "photo collage",
        "merge photos",
        "combine pictures",
        "free image merger"
      ]}
      introduction="Our Image Combine Tools help you merge multiple images into stunning compositions. Combine photos horizontally or vertically for comparisons and layouts. Create beautiful collages from your photo collections. Stitch images together for panoramic views. Build engaging before/after comparisons for showcasing transformations. All tools work directly in your browser for instant results."
      article={`Combining multiple images opens up creative possibilities that single images cannot achieve. Our suite of image combining tools covers every merging scenario you might encounter.

Merge Horizontally places images side by side in a row. This is perfect for creating comparison images, showcasing product variations, or building horizontal banners. Images are automatically aligned and scaled to match heights.

Merge Vertically stacks images on top of each other. Use this for vertical banners, social media stories, or creating continuous vertical compositions. Heights remain original while widths are matched.

Collage Maker arranges multiple images in creative grid layouts. Choose from preset templates or customize your own arrangement. Perfect for photo memories, portfolio showcases, or social media multi-image posts.

Stitch Images creates seamless panoramas and extended compositions. Our intelligent edge-matching helps blend images naturally where they meet. While not full panorama stitching software, it handles simple horizontal and vertical joins effectively.

Before/After Maker creates comparison images with slider or split views. Perfect for showing transformations like makeovers, renovations, photo retouching results, or any before/after scenario. The viewer can interact with the comparison to see changes.

All combining operations maintain image quality and offer various output options. Choose your preferred arrangement, spacing, border styles, and background colors. Export in high resolution for print or web-optimized for digital sharing.`}
      features={[
        "Horizontal image merging",
        "Vertical image stacking",
        "Multi-image collages",
        "Panorama stitching",
        "Before/after comparisons",
        "Custom spacing and borders",
        "Background color options",
        "High-resolution output"
      ]}
      benefits={[
        "Create stunning compositions",
        "No design software needed",
        "Instant processing",
        "Completely free",
        "Multiple layout options",
        "Professional results",
        "Works on all devices",
        "Privacy protected"
      ]}
      howToUse={[
        "Select the combining method that fits your needs.",
        "Upload multiple images using drag and drop.",
        "Arrange images in your preferred order.",
        "Adjust spacing, borders, and background as needed.",
        "Download your combined image."
      ]}
      faqs={[
        {
          question: "How many images can I combine at once?",
          answer: "There's no strict limit, but performance depends on your device. Most devices handle 10-20 images without issues. Very large combinations may require more processing time."
        },
        {
          question: "Will my images be resized when combined?",
          answer: "Images are scaled to match dimensions where necessary. For horizontal merge, heights are matched. For vertical merge, widths are matched. You can choose to preserve original sizes at the cost of uneven edges."
        },
        {
          question: "Can I add space between merged images?",
          answer: "Yes, you can specify gap size in pixels between images. You can also add borders and choose a background color for the gaps."
        },
        {
          question: "What's the difference between merge and collage?",
          answer: "Merge places images in a simple row or column. Collage offers more creative layouts with multiple rows, columns, and varied image sizes in a grid pattern."
        },
        {
          question: "Can I create a before/after slider image?",
          answer: "Yes, our Before/After Maker creates comparison images. You can export as a static split image or as an interactive HTML embed with a slider control."
        },
        {
          question: "What output formats are available?",
          answer: "Combined images can be saved as PNG for highest quality or JPEG for smaller file sizes. PNG preserves any transparency in the layout."
        },
        {
          question: "Can I rearrange image order after uploading?",
          answer: "Yes, simply drag images to reorder them in the preview area before combining. The final output follows your arranged order."
        },
        {
          question: "Are my images uploaded to a server?",
          answer: "No, all combining happens locally in your browser. Your photos never leave your device."
        }
      ]}
      useCases={[
        "Creating photo comparisons",
        "Building social media collages",
        "Showcasing product variations",
        "Making before/after transformations",
        "Creating horizontal banners",
        "Building Pinterest-style layouts",
        "Combining screenshots",
        "Making photo memories"
      ]}
    >
      <div className="space-y-4">
        <DragDropUpload onFileSelect={setFile} accept="image/*" />
        {file && (
          <div className="bg-card rounded-xl p-4 border border-border text-center">
            <p className="text-muted-foreground mb-3">Select a combine tool below</p>
            <p className="text-sm text-primary">Uploaded: {file.name}</p>
          </div>
        )}
      </div>
    </CategoryPageLayout>
  );
};

export default ImageCombinePage;
