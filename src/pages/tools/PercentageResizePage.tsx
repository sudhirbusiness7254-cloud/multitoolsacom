import ToolPageLayout from "@/components/ToolPageLayout";
import ImageResizer from "@/components/ImageResizer";

const PercentageResizePage = () => {
  return (
    <ToolPageLayout
      title="Percentage Resize"
      metaTitle="Percentage Image Resize - Scale Images by Percentage Online Free"
      metaDescription="Free online percentage image resizer. Scale images up or down by any percentage. Maintain proportions automatically. Instant browser-based processing."
      keywords={[
        "percentage resize",
        "scale image",
        "percentage scale",
        "image scaling",
        "proportional resize",
        "shrink image",
        "enlarge image",
        "free image scaler"
      ]}
      introduction="Our Percentage Resize tool scales your images proportionally by any percentage you choose. Scale down to 50% for half-size images, or scale up to 200% to double the dimensions. This method automatically maintains aspect ratio, ensuring your images never get distorted. Perfect for batch operations where you need consistent scaling across multiple images."
      article={`Percentage-based resizing is the most intuitive way to scale images proportionally. Instead of calculating exact pixel dimensions, simply specify how much larger or smaller you want your image. 50% gives you half the size, 200% doubles it.

This approach is ideal for batch operations. When you have multiple images of different sizes but need them all reduced by the same proportion, percentage scaling delivers consistent results. A 50% reduction on any image produces half the original dimensions while maintaining the exact proportions.

For reducing file sizes while maintaining visual consistency, percentage scaling is often the go-to method. Reducing to 75% or 80% often provides significant file size savings with minimal visual impact. This is perfect for web optimization where you need smaller files without obvious quality loss.

Enlarging images is also possible, though with limitations. Scaling beyond 100% increases dimensions but can introduce softness as the algorithm interpolates new pixels. For best enlargement results, stay under 200% and start with high-quality source images.

Our tool calculates and displays the resulting dimensions in real-time. Before processing, you'll see exactly what pixel dimensions your percentage choice will produce. This preview helps you fine-tune your scaling before committing.

The processing uses high-quality algorithms that minimize artifacts during scaling. Whether reducing or enlarging, the output maintains smooth gradients and sharp edges where appropriate.`}
      features={[
        "Scale by any percentage (1-500%)",
        "Automatic aspect ratio maintenance",
        "Real-time dimension preview",
        "High-quality scaling algorithm",
        "Works with all image formats",
        "Instant processing",
        "No quality slider needed",
        "Consistent batch scaling"
      ]}
      benefits={[
        "Intuitive proportional scaling",
        "Perfect for batch operations",
        "No dimension calculations needed",
        "Consistent results",
        "Fast processing",
        "Complete privacy",
        "Free unlimited use",
        "Professional quality"
      ]}
      howToUse={[
        "Upload your image via drag and drop or file browser.",
        "View the original dimensions displayed.",
        "Enter your desired scale percentage.",
        "See the calculated new dimensions instantly.",
        "Click 'Resize Image' to process.",
        "Download your scaled image."
      ]}
      faqs={[
        {
          question: "What percentages can I use?",
          answer: "Any percentage from 1% to 500%. 100% keeps the original size, below 100% reduces, above 100% enlarges the image."
        },
        {
          question: "Will my image proportions change?",
          answer: "No, percentage scaling always maintains the original aspect ratio. Both width and height scale by the same percentage."
        },
        {
          question: "How much can I enlarge without quality loss?",
          answer: "Some quality loss is inevitable when enlarging. For best results, stay under 200%. Beyond that, artifacts become more noticeable."
        },
        {
          question: "What's a good percentage for web optimization?",
          answer: "It depends on your original size. For large camera photos, 25-50% often works well. Preview the dimensions to ensure they meet your needs."
        },
        {
          question: "Can I scale multiple images by the same percentage?",
          answer: "Yes, the percentage setting persists. Upload each image and click resize for consistent proportional scaling across your batch."
        },
        {
          question: "How is file size affected?",
          answer: "Reducing dimensions significantly reduces file size. A 50% dimension reduction typically results in 75% smaller files."
        },
        {
          question: "Does this work with transparent images?",
          answer: "Yes, transparency is preserved for formats that support it (PNG, WebP, GIF). The transparent areas scale with the rest of the image."
        },
        {
          question: "Are my images processed on a server?",
          answer: "No, all processing happens locally in your browser. Your images remain private and never leave your device."
        }
      ]}
      useCases={[
        "Batch image scaling",
        "Web optimization",
        "Creating image variants",
        "Reducing camera photos",
        "Preparing thumbnails",
        "Email attachment sizing",
        "Document image scaling",
        "Storage optimization"
      ]}
    >
      <ImageResizer mode="percentage" />
    </ToolPageLayout>
  );
};

export default PercentageResizePage;
