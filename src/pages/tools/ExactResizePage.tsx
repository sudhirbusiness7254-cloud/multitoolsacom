import ToolPageLayout from "@/components/ToolPageLayout";
import ImageResizer from "@/components/ImageResizer";

const ExactResizePage = () => {
  return (
    <ToolPageLayout
      title="Exact Resize"
      metaTitle="Exact Image Resize - Resize to Specific Dimensions Online Free"
      metaDescription="Free online exact image resizer. Resize images to precise pixel dimensions. Perfect for social media, web, and print requirements. Instant browser-based processing."
      keywords={[
        "exact resize",
        "resize image",
        "pixel dimensions",
        "image resizer",
        "specific size",
        "width height resize",
        "free image resize",
        "online resizer"
      ]}
      introduction="Our Exact Resize tool lets you specify precise width and height dimensions for your images. Whether you need specific pixel sizes for social media posts, website headers, or print projects, this tool delivers pixel-perfect results. Lock aspect ratio to maintain proportions or unlock for custom dimensions. All processing happens instantly in your browser."
      article={`Precise image dimensions are often required for various digital and print applications. Social media platforms have specific image size requirements—Instagram posts at 1080x1080, Facebook covers at 820x312, Twitter headers at 1500x500. Our Exact Resize tool makes meeting these requirements effortless.

The tool offers two modes: locked aspect ratio and free resize. With aspect ratio locked, changing one dimension automatically adjusts the other to maintain your image's proportions. This prevents distortion and keeps your images looking natural.

Unlocking aspect ratio gives you complete control. Specify any width and height combination, though be aware this may stretch or compress your image. This is useful when you need to fill exact dimensions and can accommodate some distortion.

Our resize algorithm uses high-quality interpolation for smooth results. Whether you're enlarging or reducing, the output maintains as much detail as possible. For critical work, we recommend starting with the highest quality source images.

The browser-based processing means instant results without uploading to servers. Your images remain completely private, and there are no file size limits imposed by upload restrictions. Large images process quickly on modern devices.

Common use cases include preparing product photos for e-commerce platforms, creating consistent thumbnail sizes, meeting email signature dimensions, and preparing images for specific print sizes. Whatever your exact dimension needs, this tool delivers.`}
      features={[
        "Specify exact width and height in pixels",
        "Lock/unlock aspect ratio",
        "Real-time dimension preview",
        "High-quality interpolation",
        "Supports all image formats",
        "Instant processing",
        "Original quality preservation",
        "Batch processing ready"
      ]}
      benefits={[
        "Meet exact size requirements",
        "Perfect for social media dimensions",
        "No distortion with locked ratio",
        "Fast browser processing",
        "Complete privacy",
        "Free unlimited use",
        "Works on all devices",
        "Professional results"
      ]}
      howToUse={[
        "Drag and drop your image or click to upload.",
        "View the original dimensions displayed.",
        "Enter your desired width and height in pixels.",
        "Toggle aspect ratio lock if needed.",
        "Click 'Resize Image' to process.",
        "Download your perfectly sized image."
      ]}
      faqs={[
        {
          question: "What's the maximum size I can resize to?",
          answer: "You can resize up to 10,000 pixels on either dimension. However, very large outputs depend on your device's memory and may be slow on older devices."
        },
        {
          question: "Will resizing affect my image quality?",
          answer: "Reducing size generally maintains quality. Enlarging beyond the original may show some softness. Our algorithm uses high-quality interpolation to minimize quality loss."
        },
        {
          question: "Can I resize to non-standard dimensions?",
          answer: "Absolutely! Enter any width and height values. With aspect ratio unlocked, you can create any dimension combination you need."
        },
        {
          question: "What formats are supported?",
          answer: "We support JPG, PNG, WebP, GIF, BMP, and TIFF. The output format matches your input format to preserve quality."
        },
        {
          question: "How do I maintain my image proportions?",
          answer: "Keep the 'Aspect Ratio Locked' button enabled. When you change width, height adjusts automatically (and vice versa) to maintain proportions."
        },
        {
          question: "Is there a file size limit?",
          answer: "No server-imposed limits since processing is local. Performance depends on your device, but most handle files up to 50MB easily."
        },
        {
          question: "Can I resize multiple images to the same dimensions?",
          answer: "Currently one at a time, but settings persist. Upload each image and click resize—your dimension settings remain for consistent results."
        },
        {
          question: "Are my images uploaded anywhere?",
          answer: "No, all processing happens locally in your browser. Your images never leave your device, ensuring complete privacy."
        }
      ]}
      useCases={[
        "Social media post dimensions",
        "Website header images",
        "Email signature photos",
        "E-commerce product images",
        "Thumbnail creation",
        "Print size preparation",
        "App icon generation",
        "Profile picture sizing"
      ]}
    >
      <ImageResizer mode="exact" />
    </ToolPageLayout>
  );
};

export default ExactResizePage;
