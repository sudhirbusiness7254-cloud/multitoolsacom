import CategoryPageLayout from "@/components/CategoryPageLayout";
import { getCategoryBySlug } from "@/data/toolsData";
import DragDropUpload from "@/components/DragDropUpload";
import { useState } from "react";

const ImageRotateFlipPage = () => {
  const category = getCategoryBySlug("image-rotate-flip")!;
  const [file, setFile] = useState<File | null>(null);

  return (
    <CategoryPageLayout
      category={category}
      metaTitle="Rotate & Flip Images Online Free - 90°, 180°, Custom Angle, Mirror Effect"
      metaDescription="Free online image rotation and flip tools. Rotate images 90°, 180°, 270°, or any custom angle. Flip horizontally, vertically, or create mirror effects. Instant processing."
      keywords={[
        "rotate image",
        "flip image",
        "image rotation",
        "rotate photo online",
        "flip horizontal",
        "flip vertical",
        "mirror image",
        "rotate 90 degrees",
        "custom rotation"
      ]}
      introduction="Our Rotate & Flip Tools let you quickly correct image orientation or create artistic effects. Rotate images by standard angles (90°, 180°, 270°) or specify any custom degree. Flip images horizontally or vertically, or apply mirror effects for creative compositions. All processing is instant and happens in your browser for maximum privacy."
      article={`Proper image orientation is crucial for professional presentation. Whether your camera captured an image sideways, or you want to create artistic mirror effects, our rotation and flip tools have you covered.

Standard rotation options cover the most common needs. Rotate 90° clockwise or counterclockwise to fix landscape/portrait orientation. Rotate 180° to flip images upside down. These quick operations are perfect for correcting camera orientation issues.

Custom Rotate offers precision for exact angle requirements. Specify any degree from 0 to 360 for perfect alignment. This is essential for straightening horizons, aligning architectural elements, or creating dynamic compositions at non-standard angles.

Flip Horizontal creates a mirror image along the vertical axis. This is commonly used for creating symmetrical designs, correcting selfie mirrors, or artistic compositions. The left side becomes the right, and vice versa.

Flip Vertical mirrors the image along the horizontal axis, swapping top and bottom. While less common, this is useful for reflection effects and specific design requirements.

Mirror Effect combines elements of both operations to create reflection-style compositions. Apply partial mirroring or full symmetrical effects for creative and artistic purposes.

All operations preserve image quality and metadata. The original pixel data is transformed without recompression, ensuring lossless operations for formats that support it.`}
      features={[
        "Quick 90°, 180°, 270° rotation",
        "Custom angle rotation (any degree)",
        "Horizontal flip (mirror)",
        "Vertical flip",
        "Combined mirror effects",
        "Lossless transformation",
        "Batch processing support",
        "Real-time preview"
      ]}
      benefits={[
        "Fix orientation instantly",
        "No quality loss",
        "Works on all devices",
        "Completely free",
        "No software needed",
        "Private processing",
        "Quick one-click operations",
        "Professional results"
      ]}
      howToUse={[
        "Select the rotation or flip operation you need.",
        "Upload your image via drag and drop.",
        "For custom rotation, enter your desired angle.",
        "Preview the transformation in real-time.",
        "Download your correctly oriented image."
      ]}
      faqs={[
        {
          question: "Does rotating an image reduce quality?",
          answer: "No, our rotation uses lossless transformation. The original image data is preserved, simply rearranged without recompression."
        },
        {
          question: "Can I rotate by any angle, not just 90 degrees?",
          answer: "Yes! Our Custom Rotate tool lets you specify any angle from 0 to 360 degrees with decimal precision."
        },
        {
          question: "What's the difference between flip and rotate?",
          answer: "Rotate turns the image around its center point. Flip creates a mirror image by reversing it along an axis (horizontal or vertical)."
        },
        {
          question: "How do I straighten a crooked photo?",
          answer: "Use Custom Rotate to fine-tune the angle. Most crooked photos need only 1-5 degrees of adjustment to straighten horizons."
        },
        {
          question: "Can I undo a rotation?",
          answer: "Simply rotate in the opposite direction or by the complementary angle. For example, undo 90° clockwise by rotating 270° clockwise (or 90° counterclockwise)."
        },
        {
          question: "What happens to image dimensions when rotating?",
          answer: "90° and 270° rotations swap width and height. Custom angles may increase canvas size to fit the rotated image without cropping."
        },
        {
          question: "Can I rotate multiple images at once?",
          answer: "Yes, our batch processing feature allows applying the same rotation or flip to multiple images simultaneously."
        },
        {
          question: "Are my photos uploaded to a server?",
          answer: "No, all transformations happen locally in your browser. Your images remain private and are never uploaded anywhere."
        }
      ]}
      useCases={[
        "Fixing camera orientation",
        "Straightening crooked photos",
        "Creating mirror selfies",
        "Preparing images for print",
        "Artistic compositions",
        "Correcting upside-down scans",
        "Creating symmetrical designs",
        "Batch orientation fixes"
      ]}
    >
      <div className="space-y-4">
        <DragDropUpload onFileSelect={setFile} accept="image/*" />
        {file && (
          <div className="bg-card rounded-xl p-4 border border-border text-center">
            <p className="text-muted-foreground mb-3">Select a rotate/flip tool below</p>
            <p className="text-sm text-primary">Uploaded: {file.name}</p>
          </div>
        )}
      </div>
    </CategoryPageLayout>
  );
};

export default ImageRotateFlipPage;
