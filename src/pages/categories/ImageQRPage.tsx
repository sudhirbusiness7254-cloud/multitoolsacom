import CategoryPageLayout from "@/components/CategoryPageLayout";
import { getCategoryBySlug } from "@/data/toolsData";
import DragDropUpload from "@/components/DragDropUpload";
import { useState } from "react";

const ImageQRPage = () => {
  const category = getCategoryBySlug("image-qr")!;
  const [file, setFile] = useState<File | null>(null);

  return (
    <CategoryPageLayout
      category={category}
      metaTitle="Image QR Code Tools - Create & Read QR Codes from Images | Free Online"
      metaDescription="Free online QR code tools. Generate QR codes from image URLs, decode QR codes from images. Create scannable codes, extract embedded information. Instant processing."
      keywords={[
        "QR code generator",
        "QR code reader",
        "image to QR",
        "QR to image",
        "create QR code",
        "scan QR code",
        "decode QR",
        "free QR tool",
        "QR code maker"
      ]}
      introduction="Our Image QR Tools bridge the gap between images and QR codes. Generate QR codes that link to your images or image URLs. Read and decode QR codes from screenshots and photos. Create scannable codes for marketing, sharing, and information access. Decode existing QR codes to extract their content. All processing happens instantly in your browser."
      article={`QR codes have become ubiquitous in our digital world. From marketing materials to restaurant menus, from payment systems to social media sharing, QR codes provide instant access to digital content. Our tools help you create and decode these versatile codes.

Image to QR Code generates scannable QR codes from various inputs. Enter a URL to an image, and we create a QR code that opens that image when scanned. You can also encode text, links, contact information, or any data up to QR code limits.

The generated QR codes are customizable. Choose size, error correction level, and even add styling like colors and logos (with appropriate error correction). Download in various formats including PNG, SVG, and PDF for different use cases.

QR Code to Image reads existing QR codes from any image file. Upload a screenshot, photo, or scan containing a QR code, and our tool extracts the encoded information. This works even with partially obscured or damaged QR codes thanks to error correction algorithms.

QR codes support various data types: plain text, URLs, email addresses, phone numbers, WiFi credentials, calendar events, and more. Our decoder identifies the content type and displays it appropriately.

Error correction is a key feature of QR codes. Even if up to 30% of a QR code is damaged or obscured, it can still be read. Our generator lets you choose error correction levels based on your use case—higher correction for physical prints, lower for clean digital displays.

All QR operations process locally in your browser. There's no server involved, ensuring your encoded data stays private and decoding happens instantly.`}
      features={[
        "QR code generation",
        "QR code reading/decoding",
        "Multiple content types",
        "Customizable styling",
        "Error correction options",
        "Multiple output formats",
        "Batch processing",
        "Instant results"
      ]}
      benefits={[
        "Create marketing QR codes",
        "Decode unknown QR codes",
        "Professional quality output",
        "Works with damaged codes",
        "No app needed to decode",
        "Free unlimited use",
        "Privacy protected",
        "Instant processing"
      ]}
      howToUse={[
        "Choose to create or read a QR code.",
        "For creation, enter your URL or content to encode.",
        "Customize size, color, and error correction as needed.",
        "For reading, upload an image containing a QR code.",
        "Download your QR code or view the decoded content."
      ]}
      faqs={[
        {
          question: "What can I encode in a QR code?",
          answer: "URLs, plain text, email addresses, phone numbers, WiFi credentials, contact cards (vCard), calendar events, and more. Each has specific formatting for proper scanning."
        },
        {
          question: "What size should my QR code be?",
          answer: "For scanning, minimum 2cm (0.8 inches) for close-up scanning. Larger for distance scanning. Our tool recommends sizes based on intended use."
        },
        {
          question: "Can I add a logo to my QR code?",
          answer: "Yes, with high error correction enabled. The logo covers some data, but error correction compensates. Keep logos small for reliable scanning."
        },
        {
          question: "Why isn't my QR code scanning?",
          answer: "Common issues: too small, poor contrast, too much data encoded, damaged print. Try regenerating with higher error correction or simpler content."
        },
        {
          question: "Can I decode QR codes from screenshots?",
          answer: "Yes! Upload any image containing a QR code. Our decoder works with screenshots, photos, scans, and digital images."
        },
        {
          question: "What's error correction level and which should I use?",
          answer: "Error correction allows QR codes to be read even when damaged. Low (7%), Medium (15%), Quartile (25%), High (30%). Use higher for physical prints, lower for digital."
        },
        {
          question: "Is my encoded data stored anywhere?",
          answer: "No, all processing happens locally in your browser. Your content is never uploaded or stored on any server."
        },
        {
          question: "Can I create QR codes for images hosted online?",
          answer: "Yes, enter the image URL and we generate a QR code that links directly to that image. Scanners will open the image in a browser."
        }
      ]}
      useCases={[
        "Creating marketing materials",
        "Sharing image links easily",
        "Decoding unknown QR codes",
        "Making WiFi sharing codes",
        "Creating contact cards",
        "Building menus and catalogs",
        "Event ticket validation",
        "Product labeling"
      ]}
    >
      <div className="space-y-4">
        <DragDropUpload onFileSelect={setFile} accept="image/*" />
        {file && (
          <div className="bg-card rounded-xl p-4 border border-border text-center">
            <p className="text-muted-foreground mb-3">Select a QR tool below</p>
            <p className="text-sm text-primary">Uploaded: {file.name}</p>
          </div>
        )}
      </div>
    </CategoryPageLayout>
  );
};

export default ImageQRPage;
