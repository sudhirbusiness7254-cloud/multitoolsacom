import CategoryPageLayout from "@/components/CategoryPageLayout";
import { getCategoryBySlug } from "@/data/toolsData";
import DragDropUpload from "@/components/DragDropUpload";
import { useState } from "react";

const ImageResizePage = () => {
  const category = getCategoryBySlug("image-resize")!;
  const [file, setFile] = useState<File | null>(null);

  return (
    <CategoryPageLayout
      category={category}
      metaTitle="Image Resize Tools - Resize Images Online Free | Exact, Percentage, Fit"
      metaDescription="Free online image resizer. Resize images by exact dimensions, percentage, or fit to width/height. Maintain aspect ratio, no quality loss. Instant browser-based processing."
      keywords={[
        "image resize",
        "resize image online",
        "image resizer",
        "resize photo",
        "change image size",
        "exact resize",
        "percentage resize",
        "fit to width",
        "free image resize"
      ]}
      introduction="Our Image Resize Tools give you complete control over your image dimensions. Whether you need exact pixel dimensions for social media, percentage-based scaling for batch operations, or intelligent fitting that maintains aspect ratio, we have the right tool for your needs. All processing happens in your browser for instant results and complete privacy. Resize images without losing quality using our advanced algorithms."
      article={`Image resizing is one of the most common tasks in digital media workflows. Whether you're a photographer, web developer, social media manager, or casual user, you'll inevitably need to adjust image dimensions for various purposes.

Our Exact Resize tool lets you specify precise width and height in pixels. This is essential for meeting specific requirements like social media post dimensions, website headers, or print specifications. You can choose to maintain aspect ratio or force exact dimensions with cropping.

Percentage-based resizing is perfect for batch operations or when you need proportional scaling. Simply specify a percentage, and the image scales uniformly. This maintains the original proportions while achieving the desired file size reduction.

Fit to Width and Fit to Height tools are ideal when one dimension is critical but the other can be flexible. Common use cases include website columns, mobile displays, or document margins where width is constrained but height can vary.

Fit to Box combines the best of both worlds. Specify maximum dimensions, and the image scales to fit within those bounds while maintaining aspect ratio. This ensures your image never exceeds specified limits while preserving its proportions.

Our Resize Without Quality Loss tool uses advanced interpolation algorithms to minimize artifacts during resizing. While some quality loss is inevitable when enlarging images, our algorithms produce the best possible results using techniques similar to professional photo editing software.

All resizing operations preserve important metadata and color profiles when appropriate. The output format matches your input, or you can choose to convert during the resize process.`}
      features={[
        "Exact pixel dimension resizing",
        "Percentage-based scaling",
        "Fit to specific width or height",
        "Fit to box with aspect ratio",
        "Quality-preserving algorithms",
        "Batch resize capability",
        "Multiple output formats",
        "Instant preview"
      ]}
      benefits={[
        "Perfect dimensions every time",
        "No quality loss on standard resizing",
        "Works on any device",
        "Completely free to use",
        "No watermarks added",
        "Privacy protected",
        "Fast browser processing",
        "Professional results"
      ]}
      howToUse={[
        "Select the resize method that fits your needs from the tools below.",
        "Upload your image using drag and drop or file browser.",
        "Enter your desired dimensions or percentage.",
        "Preview the result in real-time.",
        "Download your perfectly resized image."
      ]}
      faqs={[
        {
          question: "Will resizing reduce my image quality?",
          answer: "Reducing image size typically doesn't affect quality. Enlarging images may cause some quality loss, but our algorithms minimize this using advanced interpolation techniques."
        },
        {
          question: "Can I resize images for Instagram, Facebook, or Twitter?",
          answer: "Yes! Use our Exact Resize tool with the specific dimensions each platform requires. We provide preset options for popular social media dimensions."
        },
        {
          question: "What's the difference between Fit to Width and Fit to Box?",
          answer: "Fit to Width sets only the width, allowing height to adjust proportionally. Fit to Box ensures the image fits within both a maximum width AND height while maintaining aspect ratio."
        },
        {
          question: "Can I maintain aspect ratio when resizing?",
          answer: "Yes, most of our tools have an option to lock aspect ratio. When enabled, changing one dimension automatically adjusts the other proportionally."
        },
        {
          question: "Is there a limit on how large I can make an image?",
          answer: "There's no hard limit, but very large images may strain your browser. We recommend keeping output under 10,000 pixels on either dimension for best performance."
        },
        {
          question: "Can I resize multiple images at once?",
          answer: "Yes, our batch resize feature lets you upload and resize multiple images with the same settings, saving time on repetitive tasks."
        },
        {
          question: "What formats are supported?",
          answer: "We support all major image formats including JPG, PNG, WebP, GIF, BMP, and TIFF. Output format can match input or be converted during resize."
        },
        {
          question: "Are my images uploaded to a server?",
          answer: "No, all processing happens locally in your browser. Your images never leave your device, ensuring complete privacy."
        }
      ]}
      useCases={[
        "Preparing images for social media",
        "Creating website thumbnails",
        "Resizing photos for email attachments",
        "Meeting print dimension requirements",
        "Optimizing images for web performance",
        "Creating consistent product photos",
        "Preparing images for documents",
        "Batch resizing photo collections"
      ]}
    >
      <div className="space-y-4">
        <DragDropUpload onFileSelect={setFile} accept="image/*" />
        {file && (
          <div className="bg-card rounded-xl p-4 border border-border text-center">
            <p className="text-muted-foreground mb-3">Select a resize method below</p>
            <p className="text-sm text-primary">Uploaded: {file.name}</p>
          </div>
        )}
      </div>
    </CategoryPageLayout>
  );
};

export default ImageResizePage;
