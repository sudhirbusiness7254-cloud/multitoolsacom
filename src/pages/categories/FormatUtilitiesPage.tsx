import CategoryPageLayout from "@/components/CategoryPageLayout";
import { getCategoryBySlug } from "@/data/toolsData";
import DragDropUpload from "@/components/DragDropUpload";
import { useState } from "react";

const FormatUtilitiesPage = () => {
  const category = getCategoryBySlug("image-format-utilities")!;
  const [file, setFile] = useState<File | null>(null);

  return (
    <CategoryPageLayout
      category={category}
      metaTitle="Image Format Utilities - Grayscale, Transparency, Merge Images | Free Online"
      metaDescription="Free image format utilities. Convert to grayscale or black & white, add/remove transparency, flatten layers, merge images. Browser-based processing for complete privacy."
      keywords={[
        "grayscale image",
        "black and white converter",
        "add transparency",
        "remove transparency",
        "flatten image",
        "merge images",
        "image utilities",
        "photo effects",
        "free image tools"
      ]}
      introduction="Our Format Utilities provide essential image manipulation capabilities. Convert photos to grayscale or pure black and white for classic aesthetics. Add or remove transparency for web graphics. Flatten layered images or merge multiple images into one. These fundamental tools are indispensable for designers, photographers, and content creators working with various image requirements."
      article={`Image format utilities are the building blocks of digital image manipulation. These fundamental operations enable creative workflows and solve common image challenges.

Grayscale Conversion removes all color information, leaving only luminance values. This creates classic, timeless images that emphasize form, contrast, and composition. Grayscale is also useful for reducing file size and preparing images for black and white printing.

Black & White Conversion takes grayscale further by reducing images to pure black or white pixels. This high-contrast effect is perfect for logos, line art, stencils, and creating bold graphic statements. Adjustable threshold controls let you fine-tune where the cutoff between black and white occurs.

Add Transparency creates alpha channel support for images. Convert solid backgrounds to transparent for overlays, web graphics, and design compositions. Our intelligent background detection can automatically identify and remove common background types.

Remove Transparency replaces transparent areas with a solid color of your choice. This is necessary when converting to formats that don't support transparency (like JPEG) or when you need a specific background color.

Flatten Image combines all visible layers into a single background layer. This is essential for preparing files for web, print, or formats that don't support layers. The visual appearance is preserved while simplifying the file structure.

Merge Images combines multiple separate images into a single file. Create panoramas, comparison images, collages, or simply join images horizontally or vertically.`}
      features={[
        "Grayscale conversion",
        "Black & white with threshold control",
        "Add alpha transparency",
        "Remove/replace transparency",
        "Flatten to single layer",
        "Merge multiple images",
        "Batch processing",
        "Format conversion"
      ]}
      benefits={[
        "Essential utilities in one place",
        "Professional results",
        "No Photoshop needed",
        "Free unlimited use",
        "Fast processing",
        "Works everywhere",
        "Complete privacy",
        "High quality output"
      ]}
      howToUse={[
        "Select the utility tool you need from the options below.",
        "Upload your image using drag and drop or file browser.",
        "Adjust settings specific to your chosen operation.",
        "Preview the result before downloading.",
        "Save your processed image in your preferred format."
      ]}
      faqs={[
        {
          question: "What's the difference between grayscale and black & white?",
          answer: "Grayscale preserves a full range of gray tones from black to white. Black & white (also called 1-bit) uses only pure black and pure white with no gray in between."
        },
        {
          question: "How do I make a transparent background?",
          answer: "Use our Add Transparency tool. It can automatically detect and remove solid color backgrounds, or you can manually specify the color to make transparent."
        },
        {
          question: "What formats support transparency?",
          answer: "PNG, WebP, and GIF support transparency. JPEG does not support transparency - any transparent areas will be filled with a background color."
        },
        {
          question: "Can I merge more than two images?",
          answer: "Yes, our Merge Images tool supports combining multiple images at once. You can arrange them horizontally, vertically, or in custom layouts."
        },
        {
          question: "What does flattening an image do?",
          answer: "Flattening merges all layers into a single background layer. This simplifies the file and is necessary for some formats that don't support layers."
        },
        {
          question: "Will grayscale conversion reduce file size?",
          answer: "Yes, typically. Grayscale images have one channel instead of three (RGB), which can reduce file size significantly while maintaining apparent detail."
        },
        {
          question: "Can I undo these operations?",
          answer: "Operations are applied to a copy of your image - your original is never modified. Keep your original file if you need to make changes later."
        },
        {
          question: "Is the processing done online or locally?",
          answer: "All processing happens locally in your browser. Your images are never uploaded to any server, ensuring complete privacy and fast performance."
        }
      ]}
      useCases={[
        "Creating classic black & white photos",
        "Preparing web graphics with transparency",
        "Converting logos to grayscale",
        "Merging comparison images",
        "Preparing images for print",
        "Creating stencil art from photos",
        "Simplifying complex layered files",
        "Batch processing image collections"
      ]}
    >
      <div className="space-y-4">
        <DragDropUpload onFileSelect={setFile} accept="image/*" />
        {file && (
          <div className="bg-card rounded-xl p-4 border border-border text-center">
            <p className="text-muted-foreground mb-3">Select a utility tool below</p>
            <p className="text-sm text-primary">Uploaded: {file.name}</p>
          </div>
        )}
      </div>
    </CategoryPageLayout>
  );
};

export default FormatUtilitiesPage;
