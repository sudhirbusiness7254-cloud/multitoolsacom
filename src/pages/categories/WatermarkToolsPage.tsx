import CategoryPageLayout from "@/components/CategoryPageLayout";
import { getCategoryBySlug } from "@/data/toolsData";
import DragDropUpload from "@/components/DragDropUpload";
import { useState } from "react";

const WatermarkToolsPage = () => {
  const category = getCategoryBySlug("watermark-tools")!;
  const [file, setFile] = useState<File | null>(null);

  return (
    <CategoryPageLayout
      category={category}
      metaTitle="Watermark Tools - Add Text & Logo Watermarks to Images | Free Online"
      metaDescription="Free online watermark tools. Add text or logo watermarks to protect your images. Customize font, color, opacity, and position. Batch watermarking supported."
      keywords={[
        "add watermark",
        "text watermark",
        "logo watermark",
        "image watermark",
        "watermark generator",
        "protect images",
        "batch watermark",
        "custom watermark",
        "free watermark tool"
      ]}
      introduction="Our Watermark Tools help you protect and brand your images professionally. Add text watermarks with custom fonts and colors, or overlay your logo with adjustable opacity. Position watermarks exactly where you want them, and apply to multiple images at once. All processing happens locally in your browser, so your images stay private while you add your unique mark."
      article={`Watermarking is essential for photographers, artists, and businesses who need to protect their visual content and establish brand presence. Our comprehensive watermark suite provides all the tools you need.

Text Watermarks are perfect for adding copyright notices, photographer credits, or brand names. Choose from a variety of fonts, sizes, and styles. Customize the color to match your brand or contrast with the image.

Logo Watermarks let you overlay your business logo or personal mark on images. Maintain brand consistency across all your visual content. Logos are resized proportionally and positioned precisely.

Font customization offers extensive typography options. Select from web-safe fonts or popular Google Fonts. Adjust size, weight, and style to achieve the perfect look for your watermark.

Color options include solid colors, gradients, or even semi-transparent fills. Choose colors that complement your images while remaining visible enough to deter unauthorized use.

Opacity control is crucial for professional watermarks. High opacity provides maximum protection but may distract from the image. Lower opacity creates subtle branding that doesn't overwhelm the visual. Find the right balance for your needs.

Position settings let you place watermarks anywhere on your image. Common positions include corners and center, but you can specify exact pixel coordinates for precision placement. Tiled patterns offer maximum protection.

Batch processing applies consistent watermarks across multiple images, saving hours of manual work. Perfect for photographers watermarking entire shoots or businesses branding product catalogs.`}
      features={[
        "Text watermark creation",
        "Logo/image watermarks",
        "Custom font selection",
        "Full color customization",
        "Adjustable opacity",
        "Precise positioning",
        "Tiled watermark patterns",
        "Batch processing"
      ]}
      benefits={[
        "Protect your images",
        "Build brand recognition",
        "Deter unauthorized use",
        "Professional appearance",
        "Save time with batch mode",
        "Complete customization",
        "Free unlimited use",
        "Private processing"
      ]}
      howToUse={[
        "Choose text or logo watermark from the tools below.",
        "Upload your image that needs watermarking.",
        "Enter your watermark text or upload your logo.",
        "Customize font, color, opacity, and position.",
        "Preview and download your watermarked image."
      ]}
      faqs={[
        {
          question: "What's the best opacity for a watermark?",
          answer: "It depends on your goal. For strong protection, use 60-80% opacity. For subtle branding, 20-40% is common. Preview different levels to find your preference."
        },
        {
          question: "Where should I position my watermark?",
          answer: "Common positions are bottom corners or center. For maximum protection, use tiled patterns or position over the main subject. Balance protection with aesthetics."
        },
        {
          question: "Can I use my own logo file?",
          answer: "Yes, upload PNG logos with transparent backgrounds for best results. JPG logos work too but will have visible backgrounds."
        },
        {
          question: "What fonts are available for text watermarks?",
          answer: "We offer web-safe fonts and popular Google Fonts including serif, sans-serif, and decorative options. The selection covers most professional and creative needs."
        },
        {
          question: "Can I watermark multiple images at once?",
          answer: "Yes, our batch processing feature applies the same watermark settings to multiple images, maintaining consistency and saving time."
        },
        {
          question: "Will watermarks affect image quality?",
          answer: "Watermarking adds data to your image but doesn't compress it further. The underlying image quality remains unchanged."
        },
        {
          question: "Can watermarks be removed from my images?",
          answer: "While no watermark is completely removal-proof, properly placed watermarks with moderate opacity are difficult to remove without damaging the image."
        },
        {
          question: "Are my images uploaded to a server?",
          answer: "No, all watermarking happens locally in your browser. Your images and logos remain on your device."
        }
      ]}
      useCases={[
        "Protecting photography portfolios",
        "Branding product images",
        "Adding copyright notices",
        "Creating proof images for clients",
        "Watermarking stock photos",
        "Branding social media content",
        "Protecting artwork",
        "Adding credentials to documents"
      ]}
    >
      <div className="space-y-4">
        <DragDropUpload onFileSelect={setFile} accept="image/*" />
        {file && (
          <div className="bg-card rounded-xl p-4 border border-border text-center">
            <p className="text-muted-foreground mb-3">Select a watermark tool below</p>
            <p className="text-sm text-primary">Uploaded: {file.name}</p>
          </div>
        )}
      </div>
    </CategoryPageLayout>
  );
};

export default WatermarkToolsPage;
