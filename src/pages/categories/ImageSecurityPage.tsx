import CategoryPageLayout from "@/components/CategoryPageLayout";
import { getCategoryBySlug } from "@/data/toolsData";
import DragDropUpload from "@/components/DragDropUpload";
import { useState } from "react";

const ImageSecurityPage = () => {
  const category = getCategoryBySlug("image-security")!;
  const [file, setFile] = useState<File | null>(null);

  return (
    <CategoryPageLayout
      category={category}
      metaTitle="Image Security Tools - Blur Faces, Hide Areas, Encrypt Images | Free Online"
      metaDescription="Free online image security tools. Blur faces, pixelate sensitive areas, hide information, encrypt and decrypt images. Protect privacy before sharing. Browser-based."
      keywords={[
        "blur faces",
        "pixelate image",
        "hide sensitive info",
        "image encryption",
        "privacy protection",
        "censor image",
        "redact image",
        "face blur",
        "free security tool"
      ]}
      introduction="Our Image Security Tools help you protect privacy and sensitive information in images. Blur faces for anonymity in photos. Pixelate areas to hide personal information. Use solid blocks to completely hide sensitive content. Encrypt entire images for secure storage and sharing. All processing happens locally for maximum security—your images never leave your device."
      article={`Image privacy is increasingly important in our digital world. Whether you're sharing photos online, submitting images for documentation, or storing sensitive visual data, our security tools protect what matters.

Manual Face Blur lets you select and blur faces in photos. While not automatic face detection, it provides precise control over what gets blurred. Use different blur intensities from subtle anonymization to complete obscuring. Perfect for photos where you want to share moments without identifying everyone.

Manual Pixel Blur creates mosaic-style pixelation over selected areas. Pixelation is a recognizable privacy indicator that clearly shows intentional redaction. Choose pixel size from subtle to aggressive. Use for license plates, addresses, screen content, and any sensitive visual information.

Hide Area applies solid blocks over regions you want to completely conceal. Unlike blur or pixelate, this completely removes visual information. Choose any color for the block. This provides the strongest protection when information must be completely invisible.

Image Encrypt transforms your entire image into an unreadable file that can only be viewed with a password. Use this for sensitive images that must be stored or transmitted securely. Without the password, the image appears as random noise.

Image Decrypt reverses the encryption process. Enter the correct password to restore the original image. Failed attempts yield incorrect results, protecting against unauthorized access.

All security operations process locally in your browser. This is crucial for security tools—your sensitive images never travel over the internet or exist on external servers.`}
      features={[
        "Face blurring",
        "Pixelation/mosaic effect",
        "Solid block hiding",
        "Image encryption",
        "Image decryption",
        "Adjustable intensity",
        "Selection tools",
        "Local-only processing"
      ]}
      benefits={[
        "Protect privacy before sharing",
        "Comply with privacy regulations",
        "Anonymize photo subjects",
        "Secure sensitive images",
        "Complete local processing",
        "No server uploads",
        "Free unlimited use",
        "Professional results"
      ]}
      howToUse={[
        "Choose the security operation you need.",
        "Upload your image containing sensitive content.",
        "Select the areas that need protection.",
        "Adjust blur/pixelate intensity or choose hide color.",
        "Download your protected image."
      ]}
      faqs={[
        {
          question: "Can blurred or pixelated areas be recovered?",
          answer: "Properly applied blur and pixelation cannot be reversed. The original information is permanently destroyed. This is why we recommend keeping your original file separately."
        },
        {
          question: "Is image encryption secure enough for sensitive data?",
          answer: "Our encryption uses AES-256, a military-grade standard. With a strong password, encrypted images are essentially impossible to crack."
        },
        {
          question: "Can I blur faces automatically?",
          answer: "Currently, our tool uses manual selection. You draw over faces to blur them. This provides precise control over what gets protected."
        },
        {
          question: "What's the difference between blur, pixelate, and hide?",
          answer: "Blur softens the area, making it hard to identify but somewhat visible. Pixelate creates a mosaic effect, clearly showing redaction. Hide completely covers with a solid block."
        },
        {
          question: "How strong should my encryption password be?",
          answer: "Use at least 12 characters with mixed letters, numbers, and symbols. Longer, random passwords provide the strongest protection."
        },
        {
          question: "What happens if I forget my encryption password?",
          answer: "Without the correct password, encrypted images cannot be recovered. There is no password reset. Store passwords securely."
        },
        {
          question: "Will security operations affect image quality?",
          answer: "Only the protected areas are modified. The rest of your image remains at original quality. Choose appropriate intensity levels for your needs."
        },
        {
          question: "Are my images uploaded during processing?",
          answer: "No, absolutely not. All processing happens locally in your browser. For security tools, this is essential—your sensitive images never leave your device."
        }
      ]}
      useCases={[
        "Anonymizing photos for publication",
        "Protecting children's faces in photos",
        "Hiding personal information",
        "Redacting documents before sharing",
        "Encrypting sensitive images",
        "Protecting license plates",
        "GDPR compliance for faces",
        "Securing confidential images"
      ]}
    >
      <div className="space-y-4">
        <DragDropUpload onFileSelect={setFile} accept="image/*" />
        {file && (
          <div className="bg-card rounded-xl p-4 border border-border text-center">
            <p className="text-muted-foreground mb-3">Select a security tool below</p>
            <p className="text-sm text-primary">Uploaded: {file.name}</p>
          </div>
        )}
      </div>
    </CategoryPageLayout>
  );
};

export default ImageSecurityPage;
