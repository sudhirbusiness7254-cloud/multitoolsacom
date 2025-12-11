import CategoryPageLayout from "@/components/CategoryPageLayout";
import { getCategoryBySlug } from "@/data/toolsData";
import DragDropUpload from "@/components/DragDropUpload";
import { useState } from "react";

const ImageOptimizationPage = () => {
  const category = getCategoryBySlug("image-optimization")!;
  const [file, setFile] = useState<File | null>(null);

  return (
    <CategoryPageLayout
      category={category}
      metaTitle="Image Optimization Tools - Reduce Size, Web Optimize | Free Online"
      metaDescription="Free online image optimization tools. Reduce file size, lower resolution, optimize for web. Improve page speed and save bandwidth. Instant browser-based processing."
      keywords={[
        "image optimization",
        "reduce file size",
        "optimize for web",
        "reduce resolution",
        "web performance",
        "image compression",
        "page speed",
        "bandwidth save",
        "free image optimizer"
      ]}
      introduction="Our Image Optimization Tools help you create faster-loading, bandwidth-efficient images. Reduce file size without visible quality loss. Lower resolution for specific use cases. Optimize specifically for web with balanced compression settings. Auto-orient images to fix display issues. Perfect for web developers, bloggers, and anyone who wants faster pages and lower hosting costs."
      article={`Image optimization is crucial for web performance, user experience, and bandwidth costs. Studies show that every second of page load delay reduces conversions significantly. Our optimization tools address these challenges.

Reduce File Size applies intelligent compression to minimize file size while maintaining visual quality. Our algorithms analyze image content and apply optimal compression settings. You can achieve 50-80% file size reduction with imperceptible quality differences.

Reduce Resolution scales images to smaller dimensions. Large images from modern cameras are often far bigger than needed for web display. A 5000x3000 pixel image displayed at 800x480 wastes bandwidth. We resize to your target dimensions efficiently.

Optimize for Web applies a comprehensive optimization pipeline. This includes resolution reduction, intelligent compression, metadata stripping, and format optimization. The result is images specifically tuned for fast web loading.

Auto-Orient Image fixes rotation issues caused by EXIF orientation tags. Some images appear rotated in certain browsers or applications. This tool applies the EXIF rotation to the actual pixels, ensuring consistent display everywhere.

All optimizations can be fine-tuned with quality sliders and option panels. Preview changes in real-time and compare file sizes before committing. Batch processing optimizes entire image sets with consistent settings.

The impact of optimization compounds across a website. A single optimized image might save 500KB. Across a site with hundreds of images, that's hundreds of megabytes of bandwidth saved per visitor.`}
      features={[
        "Smart file size reduction",
        "Resolution reduction",
        "Web-specific optimization",
        "Auto orientation correction",
        "Batch processing",
        "Quality preview comparison",
        "Format optimization",
        "Metadata stripping"
      ]}
      benefits={[
        "Faster page loads",
        "Lower bandwidth costs",
        "Better SEO rankings",
        "Improved user experience",
        "Reduced hosting needs",
        "Mobile-friendly images",
        "No quality loss visible",
        "Free unlimited use"
      ]}
      howToUse={[
        "Select the optimization type you need.",
        "Upload your images for optimization.",
        "Adjust quality/size settings as desired.",
        "Preview the optimized result and file size savings.",
        "Download your web-ready optimized images."
      ]}
      faqs={[
        {
          question: "How much can I reduce file size without quality loss?",
          answer: "Typically 50-80% reduction is achievable with no visible quality difference. The exact amount depends on the original image's compression level and content."
        },
        {
          question: "What resolution should I use for web images?",
          answer: "Most web images don't need more than 2000px on the longest side. For thumbnails, 300-600px is common. Match your resolution to actual display size for best results."
        },
        {
          question: "Does optimization affect print quality?",
          answer: "Optimized images are best for screen display. For print, keep your original high-resolution files. Web-optimized images may appear pixelated when printed large."
        },
        {
          question: "What is auto-orient and when do I need it?",
          answer: "Some photos have rotation stored in metadata rather than applied to pixels. Auto-orient applies this rotation permanently, fixing display issues in applications that don't read EXIF orientation."
        },
        {
          question: "Can I optimize images for WordPress/Shopify/etc?",
          answer: "Yes! Our Optimize for Web setting creates images that work great on any platform. Reduced file sizes improve performance regardless of your CMS or hosting."
        },
        {
          question: "Will optimization remove my watermarks?",
          answer: "No, optimization doesn't affect visible image content. Watermarks, text, and all visual elements remain intact. Only file size and metadata are affected."
        },
        {
          question: "How does this compare to TinyPNG or similar tools?",
          answer: "Our optimization uses similar algorithms. The main advantage is complete privacy since processing happens locally in your browser without uploading files."
        },
        {
          question: "Are my images uploaded to a server?",
          answer: "No, all optimization happens locally in your browser. Your images remain on your device throughout the process."
        }
      ]}
      useCases={[
        "Optimizing website images",
        "Reducing email attachment sizes",
        "Preparing images for CMS upload",
        "Fixing orientation problems",
        "Reducing hosting bandwidth",
        "Improving page load speed",
        "Creating mobile-friendly images",
        "Batch optimizing photo galleries"
      ]}
    >
      <div className="space-y-4">
        <DragDropUpload onFileSelect={setFile} accept="image/*" />
        {file && (
          <div className="bg-card rounded-xl p-4 border border-border text-center">
            <p className="text-muted-foreground mb-3">Select an optimization tool below</p>
            <p className="text-sm text-primary">Uploaded: {file.name}</p>
          </div>
        )}
      </div>
    </CategoryPageLayout>
  );
};

export default ImageOptimizationPage;
