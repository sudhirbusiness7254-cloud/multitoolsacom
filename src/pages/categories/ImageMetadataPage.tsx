import CategoryPageLayout from "@/components/CategoryPageLayout";
import { getCategoryBySlug } from "@/data/toolsData";
import DragDropUpload from "@/components/DragDropUpload";
import { useState } from "react";

const ImageMetadataPage = () => {
  const category = getCategoryBySlug("image-metadata")!;
  const [file, setFile] = useState<File | null>(null);

  return (
    <CategoryPageLayout
      category={category}
      metaTitle="Image Metadata Tools - View, Edit, Remove EXIF Data | Free Online"
      metaDescription="Free online image metadata tools. View EXIF data, remove metadata for privacy, edit date/time, copy metadata between images. Protect your privacy with one click."
      keywords={[
        "EXIF data",
        "image metadata",
        "view EXIF",
        "remove EXIF",
        "edit metadata",
        "photo metadata",
        "GPS location remove",
        "metadata privacy",
        "free EXIF tool"
      ]}
      introduction="Our Image Metadata Tools give you complete control over your photo's hidden information. View detailed EXIF data including camera settings, GPS coordinates, and timestamps. Remove sensitive metadata before sharing images publicly. Edit date and time information for organization. Copy metadata between images for consistency. Protect your privacy and manage your photo information with ease."
      article={`Digital photos contain much more than just visual data. Embedded metadata, primarily in EXIF format, stores extensive information about when, where, and how your photos were taken. Our metadata tools help you manage this hidden information.

View EXIF provides detailed insight into your photo's metadata. See camera make and model, lens information, aperture, shutter speed, ISO, focal length, and much more. GPS coordinates reveal exactly where the photo was taken. Timestamps show capture date and time down to the second.

Remove EXIF is essential for privacy protection before sharing images online. Photos from smartphones often contain GPS coordinates that reveal your home address, workplace, or other sensitive locations. Removing metadata strips this information while preserving the image quality.

Edit EXIF Date/Time lets you correct timestamps or organize photos chronologically. Useful when camera clocks are wrong, when traveling across time zones, or when you need to backdate scanned photos. Batch editing saves time when processing many images.

Copy EXIF transfers metadata from one image to another. Useful for maintaining consistency when editing or processing photos outside of traditional photo software, or when metadata is lost during format conversion.

All metadata operations preserve image quality. We modify only the metadata sections without recompressing the image data. Your photos remain pixel-perfect while metadata is updated.

Understanding and controlling metadata is increasingly important in our digital world. Whether for privacy, organization, or professional photography workflows, these tools provide the access you need.`}
      features={[
        "Complete EXIF data viewer",
        "One-click metadata removal",
        "Date/time editing",
        "Metadata copying",
        "GPS coordinate display",
        "Camera settings viewer",
        "Batch processing support",
        "Lossless operations"
      ]}
      benefits={[
        "Protect your privacy",
        "Remove GPS locations",
        "Organize photo dates",
        "Understand your photos",
        "No software needed",
        "Instant processing",
        "Free unlimited use",
        "Image quality preserved"
      ]}
      howToUse={[
        "Select the metadata operation you need.",
        "Upload your image containing metadata.",
        "For viewing, examine the detailed metadata display.",
        "For removing, confirm which data to strip.",
        "Download your processed image or metadata report."
      ]}
      faqs={[
        {
          question: "What is EXIF data?",
          answer: "EXIF (Exchangeable Image File Format) is metadata embedded in photos. It includes camera settings, GPS location, date/time, and more. This data is created automatically when you take a photo."
        },
        {
          question: "Why should I remove metadata from photos?",
          answer: "Metadata can reveal sensitive information like your home location, workplace, travel patterns, and camera equipment. Removing it before sharing publicly protects your privacy and security."
        },
        {
          question: "Will removing metadata affect image quality?",
          answer: "No, our removal process only strips metadata without recompressing the image. Visual quality remains identical to the original."
        },
        {
          question: "Can I remove just the GPS data but keep other metadata?",
          answer: "Yes, you can selectively remove specific metadata types. Keep camera information while removing location, or strip everything for complete privacy."
        },
        {
          question: "How do I view where a photo was taken?",
          answer: "Use View EXIF and look for GPS Coordinates. If present, we display latitude and longitude, and can show the location on a map."
        },
        {
          question: "Can I edit the date on old scanned photos?",
          answer: "Yes, use Edit EXIF Date/Time to set any date and time. This helps organize old photos chronologically in your photo library."
        },
        {
          question: "What formats contain EXIF data?",
          answer: "JPEG and TIFF commonly contain EXIF. PNG and WebP have their own metadata formats. RAW files contain extensive camera metadata."
        },
        {
          question: "Are my photos uploaded to view metadata?",
          answer: "No, all processing happens locally in your browser. Your photos and their sensitive metadata never leave your device."
        }
      ]}
      useCases={[
        "Protecting privacy before sharing",
        "Removing GPS from photos",
        "Organizing photo dates",
        "Checking camera settings used",
        "Verifying photo authenticity",
        "Preparing images for publication",
        "Forensic photo analysis",
        "Maintaining metadata consistency"
      ]}
    >
      <div className="space-y-4">
        <DragDropUpload onFileSelect={setFile} accept="image/*" />
        {file && (
          <div className="bg-card rounded-xl p-4 border border-border text-center">
            <p className="text-muted-foreground mb-3">Select a metadata tool below</p>
            <p className="text-sm text-primary">Uploaded: {file.name}</p>
          </div>
        )}
      </div>
    </CategoryPageLayout>
  );
};

export default ImageMetadataPage;
