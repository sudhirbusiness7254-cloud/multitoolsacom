import CategoryPageLayout from "@/components/CategoryPageLayout";
import { getCategoryBySlug } from "@/data/toolsData";
import DragDropUpload from "@/components/DragDropUpload";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { toast } from "sonner";

const ImageToDocumentPage = () => {
  const category = getCategoryBySlug("image-to-document")!;
  const [file, setFile] = useState<File | null>(null);
  const [format, setFormat] = useState<string>("pdf");

  const handleConvert = () => {
    if (!file) return;
    toast.info("Select a specific tool below for document conversion");
  };

  return (
    <CategoryPageLayout
      category={category}
      metaTitle="Image to Document Converter - Convert Images to PDF, DOCX, HTML | Free Online"
      metaDescription="Free online image to document converter. Convert JPG, PNG images to PDF, DOCX, PPTX, HTML, and BASE64. Fast browser-based conversion with instant download."
      keywords={[
        "image to document",
        "image to pdf",
        "image to docx",
        "jpg to pdf",
        "png to pdf",
        "image to html",
        "base64 encoder",
        "free document converter",
        "online image converter"
      ]}
      introduction="Our Image to Document Converter suite transforms your images into professional document formats. Whether you need to create PDF documents from photos, embed images in Word documents, generate PowerPoint presentations, or encode images as BASE64 for web development, our tools handle it all. Each conversion happens entirely in your browser, ensuring your files remain private and secure. No upload to external servers, no watermarks, completely free."
      article={`Converting images to document formats is essential for many professional and personal workflows. Our comprehensive suite of image-to-document tools covers every common use case you might encounter.

PDF conversion is perhaps the most requested feature. Creating PDFs from images is invaluable for archiving receipts, creating portfolios, or sharing photos in a universally accessible format. Our Image to PDF converter maintains image quality while creating compact, shareable PDF files.

For office productivity, converting images to DOCX format allows seamless integration with Microsoft Word and other word processors. You can quickly insert converted images into reports, proposals, and documentation without worrying about compatibility issues.

PowerPoint presentations often require visual content. Our Image to PPTX tool creates presentation-ready slides from your images, perfect for photo slideshows, marketing materials, or educational content.

Web developers frequently need BASE64-encoded images for inline CSS or HTML embedding. Our encoder and decoder tools make this process effortless, providing copy-ready code snippets for immediate use in your projects.

All conversions happen locally in your browser using modern web technologies. This means faster processing, complete privacy, and no file size limits imposed by server uploads. Your sensitive documents and images never leave your device.`}
      features={[
        "Convert images to PDF documents",
        "Create Word documents from images",
        "Generate PowerPoint presentations",
        "Export images as HTML",
        "BASE64 encoding and decoding",
        "Batch conversion support",
        "Maintain original image quality",
        "Browser-based processing"
      ]}
      benefits={[
        "No software installation required",
        "Complete privacy - files stay local",
        "Free with no watermarks",
        "Works on all devices",
        "Instant processing",
        "Universal format support",
        "Professional output quality",
        "No file size limits"
      ]}
      howToUse={[
        "Choose the document format you need from the tools below.",
        "Drag and drop your image into the upload area or click to browse.",
        "The tool automatically processes your image.",
        "Adjust any settings if available for your chosen format.",
        "Click Download to save your converted document."
      ]}
      faqs={[
        {
          question: "What image formats can I convert to documents?",
          answer: "Our tools support all common image formats including JPG, PNG, WebP, GIF, BMP, and TIFF. Simply upload any image and convert it to your desired document format."
        },
        {
          question: "Will converting to PDF reduce image quality?",
          answer: "No, our PDF converter maintains the original image quality. The resulting PDF will display your image exactly as the original, making it perfect for archiving and sharing."
        },
        {
          question: "Can I convert multiple images at once?",
          answer: "Yes, our batch conversion feature allows you to upload multiple images and convert them together into a single document or separate files."
        },
        {
          question: "What is BASE64 encoding used for?",
          answer: "BASE64 encoding converts images into text strings that can be embedded directly in HTML, CSS, or JSON. This is useful for reducing HTTP requests and embedding small images inline."
        },
        {
          question: "Are my files uploaded to a server?",
          answer: "No, all processing happens locally in your browser. Your images never leave your device, ensuring complete privacy and security."
        },
        {
          question: "Is there a file size limit?",
          answer: "Since processing happens locally, there are no server-imposed limits. Performance depends on your device, but most modern devices handle files up to 50MB easily."
        },
        {
          question: "Can I edit the document after conversion?",
          answer: "PDF and DOCX files can be edited in their respective applications. Our converter creates standard files compatible with all major document editors."
        },
        {
          question: "Does the DOCX converter work with Google Docs?",
          answer: "Yes, the DOCX format is compatible with Microsoft Word, Google Docs, LibreOffice, and other popular word processors."
        }
      ]}
      useCases={[
        "Creating PDF portfolios from images",
        "Archiving receipts and documents",
        "Preparing images for Word reports",
        "Building PowerPoint presentations",
        "Embedding images in web pages",
        "Converting screenshots for documentation",
        "Creating printable photo collections",
        "Generating inline images for emails"
      ]}
    >
      <div className="space-y-4">
        <DragDropUpload onFileSelect={setFile} accept="image/*" />
        {file && (
          <div className="bg-card rounded-xl p-4 border border-border text-center">
            <p className="text-muted-foreground mb-3">Select a specific tool below to convert your image</p>
            <p className="text-sm text-primary">Uploaded: {file.name}</p>
          </div>
        )}
      </div>
    </CategoryPageLayout>
  );
};

export default ImageToDocumentPage;
