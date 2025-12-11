import CategoryPageLayout from "@/components/CategoryPageLayout";
import { getCategoryBySlug } from "@/data/toolsData";
import DragDropUpload from "@/components/DragDropUpload";
import { useState } from "react";

const PhotoFiltersPage = () => {
  const category = getCategoryBySlug("photo-filters")!;
  const [file, setFile] = useState<File | null>(null);

  return (
    <CategoryPageLayout
      category={category}
      metaTitle="Photo Filters & Effects - Brightness, Contrast, Sepia, Vintage | Free Online"
      metaDescription="Free online photo filters and effects. Adjust brightness, contrast, saturation. Apply blur, sharpen, sepia, vintage effects. Professional photo editing in your browser."
      keywords={[
        "photo filters",
        "photo effects",
        "brightness adjust",
        "contrast adjust",
        "sepia filter",
        "vintage filter",
        "blur effect",
        "sharpen image",
        "free photo editor"
      ]}
      introduction="Our Photo Filters suite offers professional-grade adjustments and creative effects for your images. Fine-tune brightness, contrast, and saturation for perfect exposure. Apply artistic effects like sepia, vintage, and pixelate for creative expression. Sharpen details or add blur for focus effects. All filters process instantly in your browser with real-time preview and no quality loss."
      article={`Photo filters transform ordinary images into stunning visuals. Our comprehensive filter suite covers both essential adjustments and creative effects that professionals and enthusiasts need.

Brightness and Contrast are the foundational adjustments for any photo. Brightness controls overall lightness, while contrast determines the difference between light and dark areas. Together, they correct exposure issues and add visual impact.

Saturation controls color intensity. Increase saturation for vibrant, punchy colors, or decrease for muted, subtle tones. Pushing saturation to zero creates true grayscale images.

Sharpen Filter enhances edge definition and detail. This is essential for images that appear slightly soft, especially after resizing. Careful sharpening makes photos pop without creating unnatural halos.

Blur filters create soft focus effects. Standard blur softens the entire image, while Gaussian Blur creates a natural, photographic softness. Use blur for dreamy effects, privacy protection, or background separation.

Special effects add creative flair. Sepia creates warm, antique tones reminiscent of old photographs. Vintage Filter adds film-like characteristics with subtle color shifts and vignetting. Pixelate creates retro, digital mosaic effects.

Emboss and Smooth filters offer textural modifications. Emboss creates a raised, 3D appearance useful for artistic effects. Smooth reduces noise and minor imperfections for cleaner results.

Warm and Cool Tone filters shift the color temperature of your images. Warm adds golden, sunset-like hues, while cool adds blue, crisp tones. These are essential for mood setting and color correction.`}
      features={[
        "Brightness and contrast control",
        "Saturation and vibrance adjustment",
        "Professional sharpening",
        "Multiple blur options",
        "Sepia and vintage effects",
        "Warm and cool tone filters",
        "Pixelate and emboss effects",
        "Real-time preview"
      ]}
      benefits={[
        "Professional editing tools",
        "Instant processing",
        "No software installation",
        "Completely free",
        "No watermarks",
        "Works on any device",
        "Privacy protected",
        "High quality results"
      ]}
      howToUse={[
        "Choose the filter or adjustment you want to apply.",
        "Upload your photo via drag and drop or file selection.",
        "Adjust the intensity slider to fine-tune the effect.",
        "Preview changes in real-time before saving.",
        "Download your enhanced photo."
      ]}
      faqs={[
        {
          question: "Can I apply multiple filters to one image?",
          answer: "Yes, download your filtered image and upload it again to apply additional filters. Each filter stacks on top of previous edits."
        },
        {
          question: "Will filters reduce my image quality?",
          answer: "Our filters process at full resolution without additional compression. Quality is maintained as long as you don't repeatedly re-compress the image."
        },
        {
          question: "What's the difference between blur and Gaussian blur?",
          answer: "Standard blur applies a simple average filter. Gaussian blur uses a mathematically weighted distribution for more natural, photographic softness."
        },
        {
          question: "How do I make my photo look vintage?",
          answer: "Use our Vintage Filter for instant film-like effects, or combine Sepia with reduced saturation and slight warm tone for a custom vintage look."
        },
        {
          question: "Can I undo filter changes?",
          answer: "Filters are applied to a copy of your image. Your original remains unchanged. To start over, simply re-upload your original file."
        },
        {
          question: "What's the best brightness/contrast for most photos?",
          answer: "Every photo is different, but small adjustments (±10-20%) often work well. Use the histogram if available to avoid clipping highlights or shadows."
        },
        {
          question: "How can I fix a blurry photo?",
          answer: "Use the Sharpen Filter to enhance edge definition. While it can't recover completely out-of-focus images, it improves slightly soft photos significantly."
        },
        {
          question: "Are these filters similar to Instagram or Photoshop?",
          answer: "Yes, our filters use professional algorithms similar to major photo editing applications. Results are comparable to industry-standard tools."
        }
      ]}
      useCases={[
        "Enhancing social media photos",
        "Correcting exposure problems",
        "Creating vintage-style images",
        "Preparing product photography",
        "Artistic photo effects",
        "Color correction workflows",
        "Batch photo enhancement",
        "Quick photo fixes"
      ]}
    >
      <div className="space-y-4">
        <DragDropUpload onFileSelect={setFile} accept="image/*" />
        {file && (
          <div className="bg-card rounded-xl p-4 border border-border text-center">
            <p className="text-muted-foreground mb-3">Select a filter below</p>
            <p className="text-sm text-primary">Uploaded: {file.name}</p>
          </div>
        )}
      </div>
    </CategoryPageLayout>
  );
};

export default PhotoFiltersPage;
