import CategoryPageLayout from "@/components/CategoryPageLayout";
import { getCategoryBySlug } from "@/data/toolsData";
import UniversalImageCropper from "@/components/UniversalImageCropper";

const ImageCropPage = () => {
  const category = getCategoryBySlug("image-crop")!;

  return (
    <CategoryPageLayout
      category={category}
      metaTitle="Image Crop Tools - Crop Images Online Free | Circle, Square, Aspect Ratio"
      metaDescription="Free online image cropper. Crop images manually, by aspect ratio, in circles or squares. Perfect for profile pictures, social media, and more. Browser-based processing."
      keywords={[
        "image crop",
        "crop image online",
        "photo cropper",
        "circle crop",
        "square crop",
        "aspect ratio crop",
        "free image cropper",
        "crop profile picture",
        "manual crop"
      ]}
      introduction="Our Image Crop Tools offer versatile cropping options for any need. Create perfect circles for profile pictures, crop to specific aspect ratios for social media, or use manual cropping for complete control. Each tool processes your images locally in the browser, ensuring privacy and instant results. No uploads, no watermarks, completely free for unlimited use."
      article={`Cropping is essential for focusing attention on the important parts of an image and meeting specific dimension requirements. Our comprehensive cropping suite handles every scenario you might encounter.

Manual Crop provides complete freedom to select any rectangular area of your image. Simply draw a selection box around the area you want to keep. This is perfect when you need precise control over the final composition.

Aspect Ratio Crop is designed for situations where specific proportions are required. Whether it's 16:9 for video thumbnails, 4:3 for traditional photos, or 1:1 for Instagram posts, you can lock the ratio while adjusting the crop area.

Circle Crop is essential for profile pictures and avatars. Most social media platforms display profile images in circular formats. Our tool creates perfect circles with transparent backgrounds, ready for immediate use.

Square Crop simplifies creating 1:1 images for platforms like Instagram. The tool automatically centers your selection and ensures perfect proportions for grid layouts and profile photos.

Free Selection Crop offers polygon-based selection for creative cropping needs. Create custom shapes beyond simple rectangles, useful for artistic projects and unique design requirements.

All our cropping tools maintain maximum image quality by using the original image data. There's no recompression unless you specifically change formats. Transparent backgrounds are preserved in formats that support them.`}
      features={[
        "Manual rectangular cropping",
        "Preset aspect ratio options",
        "Circle and oval cropping",
        "Perfect square cropping",
        "Free-form polygon selection",
        "Real-time preview",
        "Transparent background support",
        "High-quality output"
      ]}
      benefits={[
        "Perfect profile pictures",
        "Social media ready images",
        "Precise composition control",
        "No quality loss",
        "Instant processing",
        "Works on all devices",
        "Free with no limits",
        "Complete privacy"
      ]}
      howToUse={[
        "Select the crop mode (Free, 1:1, 4:3, 16:9, Circle, etc.).",
        "Upload your image via drag and drop or file selection.",
        "Drag the crop area to position it perfectly.",
        "Use corner handles to resize the crop selection.",
        "Click Crop Image and download your result."
      ]}
      faqs={[
        {
          question: "How do I create a circular profile picture?",
          answer: "Use our Circle Crop tool. Upload your image, adjust the circular selection to frame your subject, and download. The result will have a transparent background for perfect display on any platform."
        },
        {
          question: "What aspect ratios are available?",
          answer: "We offer common presets including 1:1, 4:3, 3:2, 16:9, 9:16, and more. You can also enter custom ratios for specific requirements."
        },
        {
          question: "Can I crop and resize at the same time?",
          answer: "Yes, after cropping you can specify output dimensions. The tool will resize the cropped area to your desired size."
        },
        {
          question: "Will cropping reduce image quality?",
          answer: "No, cropping uses the original image data without recompression. The cropped area maintains full original quality."
        },
        {
          question: "How does circle crop handle the background?",
          answer: "Circle crop creates a transparent background outside the circle. The output is a PNG file with alpha transparency for seamless use on any background."
        },
        {
          question: "Can I undo a crop after downloading?",
          answer: "Once downloaded, the crop is permanent. We recommend keeping your original file. Our tool never modifies your original image."
        },
        {
          question: "What's the maximum image size for cropping?",
          answer: "Processing is done locally, so limits depend on your device. Most devices handle images up to 50MP without issues."
        },
        {
          question: "Are my images stored on your servers?",
          answer: "No, all processing happens in your browser. Images are never uploaded, ensuring complete privacy and security."
        }
      ]}
      useCases={[
        "Creating profile pictures",
        "Preparing Instagram posts",
        "Making YouTube thumbnails",
        "Cropping product photos",
        "Preparing images for print",
        "Creating avatar images",
        "Focusing on image subjects",
        "Removing unwanted borders"
      ]}
    >
      <UniversalImageCropper />
    </CategoryPageLayout>
  );
};

export default ImageCropPage;
