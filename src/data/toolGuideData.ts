// Visual How-to-Use Guide Data for All Tools
// Each tool has unique, human-written content following AdSense guidelines

import { ToolGuideData } from "@/components/HowToUseGuide";

export const toolGuideDataMap: Record<string, ToolGuideData> = {
  // ============================================
  // IMAGE CONVERTER TOOLS
  // ============================================
  
  // Generic Image Converter (main page without specific conversion)
  "image-converter": {
    slug: "image-converter",
    supportedFormats: ["JPG", "JPEG", "PNG", "WEBP", "GIF", "BMP", "TIFF", "SVG", "HEIC", "RAW"],
    maxFileSize: "50MB per image",
    processingNote: "Instant (1-4 seconds)",
    privacyBehavior: "100% browser-based, no uploads",
    steps: [
      {
        step: 1,
        title: "Upload Your Image",
        description: "Drag and drop your image file onto the upload area, or click 'Browse' to select from your device. The tool accepts all major image formats including JPG, PNG, WEBP, GIF, TIFF, HEIC, and RAW files.",
        tip: "Switch to 'Batch Mode' tab at the top if you need to convert multiple images at once.",
        screenshotAlt: "Image upload interface with drag-and-drop zone",
        screenshotType: "upload" as const
      },
      {
        step: 2,
        title: "Choose Output Format",
        description: "Select your desired output format from the dropdown menu. Each format has specific benefits: JPG for small file sizes, PNG for transparency, WEBP for modern web optimization, and more.",
        tip: "WEBP typically offers the best balance of quality and file size for web use.",
        screenshotAlt: "Format selection dropdown showing available options",
        screenshotType: "format" as const
      },
      {
        step: 3,
        title: "Start the Conversion",
        description: "Click the 'Convert' button to begin processing. The conversion happens entirely in your browser—your image never leaves your device. Watch the progress indicator for status updates.",
        screenshotAlt: "Convert button with processing state indicator",
        screenshotType: "convert" as const
      },
      {
        step: 4,
        title: "Download Converted Image",
        description: "Once complete, click 'Download' to save your converted image. The file will have the same name as your original but with the new format extension. You can also convert another image immediately.",
        warning: "Remember to check the file size of your converted image—some formats produce larger files than others.",
        screenshotAlt: "Download button showing completed conversion",
        screenshotType: "download" as const
      }
    ],
    proTips: [
      "Use JPG for photographs and images with gradients—it offers excellent compression",
      "Choose PNG when you need transparency or for images with text and sharp edges",
      "WEBP is ideal for websites as it provides superior compression with good quality",
      "GIF works best for simple animations with limited colors",
      "Keep original files as backup before converting, especially for one-time format changes"
    ],
    commonMistakes: [
      "Converting to PNG for simple photos—this creates unnecessarily large files",
      "Using JPG for images with transparency—the transparent areas will become white or black",
      "Repeatedly converting between lossy formats (JPG, WEBP)—this degrades quality each time",
      "Not checking the output file size before using the converted image"
    ]
  },

  "jpg-to-png": {
    slug: "jpg-to-png",
    supportedFormats: ["JPG", "JPEG"],
    maxFileSize: "50MB per image",
    processingNote: "Instant (1-3 seconds)",
    privacyBehavior: "100% browser-based",
    steps: [
      {
        step: 1,
        title: "Select Your JPG Image",
        description: "Click the upload zone or drag your JPG file directly onto it. You can also tap 'Browse Files' on mobile devices to access your camera roll or file manager.",
        tip: "For batch conversions, select multiple files at once by holding Ctrl (Windows) or Cmd (Mac) while clicking.",
        screenshotAlt: "Upload interface showing drag-and-drop zone with file browser button",
        screenshotType: "upload" as const
      },
      {
        step: 2,
        title: "Preview and Verify",
        description: "Your image appears in the preview area. Check that it's the correct file and notice the current file size displayed. The preview shows exactly how your image will look after conversion.",
        screenshotAlt: "Image preview panel displaying uploaded JPG with file details",
        screenshotType: "preview" as const
      },
      {
        step: 3,
        title: "Click Convert to PNG",
        description: "Press the 'Convert to PNG' button to begin. The conversion happens instantly in your browser—your image never leaves your device. Watch for the success notification.",
        tip: "PNG format adds transparency support, but the original white background stays white unless you remove it separately.",
        screenshotAlt: "Convert button highlighted with progress indicator",
        screenshotType: "convert" as const
      },
      {
        step: 4,
        title: "Download Your PNG File",
        description: "Once complete, click 'Download' to save the PNG to your device. The file automatically downloads with the same name plus '.png' extension.",
        warning: "PNG files are typically larger than JPG. If file size is a concern, consider using our PNG compressor afterward.",
        screenshotAlt: "Download button with completed conversion status",
        screenshotType: "download" as const
      }
    ],
    proTips: [
      "Use JPG to PNG when you need to add transparent backgrounds later using editing software",
      "PNG is ideal for graphics with text, logos, or sharp edges that need crisp rendering",
      "Keep your original JPG files as backup—conversion is one-way in terms of format benefits",
      "For photos meant only for viewing, PNG may be unnecessarily large; JPG works fine"
    ],
    commonMistakes: [
      "Expecting white backgrounds to become transparent automatically—you need background removal tools for that",
      "Converting very large JPG files without considering the increased PNG file size",
      "Using PNG for simple photographs where JPG compression artifacts aren't visible"
    ]
  },

  "png-to-jpg": {
    slug: "png-to-jpg",
    supportedFormats: ["PNG"],
    maxFileSize: "50MB per image",
    processingNote: "Instant (1-3 seconds)",
    privacyBehavior: "Processed locally",
    steps: [
      {
        step: 1,
        title: "Upload Your PNG File",
        description: "Drag your PNG image into the upload area or click to browse. The tool accepts PNG files of any dimension or color depth, including those with transparency.",
        tip: "If your PNG has a transparent background, choose a fill color in the next step.",
        screenshotAlt: "Upload area accepting PNG files with format indicator"
      },
      {
        step: 2,
        title: "Choose Background Color",
        description: "For PNGs with transparency, select the color that will replace transparent areas. White is the default, but you can pick any color that suits your needs using the color picker.",
        warning: "Transparency cannot be preserved in JPG format—this step is mandatory for transparent PNGs.",
        screenshotAlt: "Color picker showing background replacement options"
      },
      {
        step: 3,
        title: "Adjust Quality Settings",
        description: "Use the quality slider to balance file size against image clarity. Higher percentages (80-100%) retain more detail but create larger files. For web use, 75-85% offers an excellent balance.",
        tip: "Preview the estimated file size before downloading to ensure it meets your requirements.",
        screenshotAlt: "Quality slider with real-time file size estimation"
      },
      {
        step: 4,
        title: "Convert and Download",
        description: "Click 'Convert to JPG' and wait briefly for processing. Your optimized JPG file will be ready for download within seconds, significantly smaller than the original PNG.",
        screenshotAlt: "Completed conversion with download button and size comparison"
      }
    ],
    proTips: [
      "Set quality between 75-85% for the best balance of size and visual quality for web images",
      "Use this conversion when sharing photos via email to avoid attachment size limits",
      "JPG is universally compatible—perfect when recipients might have older devices or software",
      "For images you plan to edit multiple times, keep the PNG original to avoid cumulative quality loss"
    ],
    commonMistakes: [
      "Forgetting that transparent areas will become solid color—preview carefully before downloading",
      "Setting quality too low for images with fine details or text",
      "Converting graphics or logos that benefit from PNG's lossless compression"
    ]
  },

  "jpg-to-webp": {
    slug: "jpg-to-webp",
    supportedFormats: ["JPG", "JPEG"],
    maxFileSize: "50MB per image",
    processingNote: "Instant (2-4 seconds)",
    privacyBehavior: "Never uploaded",
    steps: [
      {
        step: 1,
        title: "Add Your JPG Image",
        description: "Upload a JPG or JPEG file by clicking the upload zone or dragging it directly. WebP conversion works best with photographic content, though any JPG can be converted.",
        screenshotAlt: "File upload interface ready for JPG input"
      },
      {
        step: 2,
        title: "Review Image Details",
        description: "The preview displays your image along with its current file size. Notice how WebP typically achieves 25-34% smaller sizes compared to JPG at equivalent visual quality.",
        tip: "WebP is supported in all modern browsers including Chrome, Firefox, Safari, and Edge.",
        screenshotAlt: "Preview showing original JPG with size metrics"
      },
      {
        step: 3,
        title: "Select Compression Level",
        description: "Choose between lossy compression (smaller files) or lossless (no quality loss). For photographs, lossy at 80-90% quality delivers excellent results with significant size savings.",
        screenshotAlt: "Compression options with quality slider"
      },
      {
        step: 4,
        title: "Generate WebP File",
        description: "Click 'Convert to WebP' to process. The modern WebP encoder creates an optimized file quickly. Download your new WebP image once the conversion completes.",
        warning: "Some older software may not open WebP files. Keep JPG copies for compatibility with legacy applications.",
        screenshotAlt: "Conversion complete with WebP output ready"
      }
    ],
    proTips: [
      "Use WebP for all web images to improve page load speed and Core Web Vitals scores",
      "Serve WebP with JPG fallback using HTML picture element for maximum browser support",
      "WebP supports both transparency and animation—consider it a hybrid of PNG and GIF capabilities",
      "Google PageSpeed Insights specifically recommends WebP for next-gen image optimization"
    ],
    commonMistakes: [
      "Assuming all platforms support WebP—email clients and some social media may require JPG/PNG",
      "Not providing fallback images for users on older browsers or systems",
      "Over-compressing and losing too much quality in pursuit of smaller files"
    ]
  },

  "webp-to-jpg": {
    slug: "webp-to-jpg",
    supportedFormats: ["WebP"],
    maxFileSize: "50MB per image",
    processingNote: "Instant (1-3 seconds)",
    privacyBehavior: "Local processing only",
    steps: [
      {
        step: 1,
        title: "Upload WebP Image",
        description: "Drop your WebP file into the upload zone or browse to select it. This tool handles both lossy and lossless WebP files seamlessly.",
        tip: "If you downloaded an image from the web and it won't open in your software, it's likely WebP—this tool solves that.",
        screenshotAlt: "Upload zone accepting WebP format files"
      },
      {
        step: 2,
        title: "Preview Conversion",
        description: "See your WebP image rendered in the preview area. Verify it's the correct file before proceeding with the format change.",
        screenshotAlt: "WebP image displayed in preview panel"
      },
      {
        step: 3,
        title: "Set JPG Quality",
        description: "Adjust the output quality using the slider. For most uses, 85% provides an excellent balance. Higher values preserve more detail but increase file size.",
        warning: "WebP images with transparency will have transparent areas replaced with a solid background color.",
        screenshotAlt: "Quality adjustment slider with output preview"
      },
      {
        step: 4,
        title: "Download JPG Result",
        description: "Complete the conversion and download your universally-compatible JPG file. It will open in any image viewer, editor, or platform without issues.",
        screenshotAlt: "Download interface with JPG file ready"
      }
    ],
    proTips: [
      "Use this when you need to upload images to platforms that don't accept WebP format",
      "JPG is the safest format for email attachments—guaranteed compatibility everywhere",
      "Keep WebP versions for web use and convert to JPG only when compatibility requires it",
      "If your WebP has transparency, choose white background for document use or match your target background"
    ],
    commonMistakes: [
      "Converting WebP to JPG unnecessarily when the target platform supports WebP",
      "Forgetting to check transparency—unexpected solid backgrounds can ruin designs",
      "Setting quality too low when the original WebP was already heavily compressed"
    ]
  },

  // ============================================
  // COMPRESSION TOOLS
  // ============================================
  
  "jpeg-compressor": {
    slug: "jpeg-compressor",
    supportedFormats: ["JPG", "JPEG"],
    maxFileSize: "50MB per image",
    processingNote: "1-5 seconds based on size",
    privacyBehavior: "Browser-only processing",
    steps: [
      {
        step: 1,
        title: "Load Your JPEG Image",
        description: "Upload the JPEG file you want to compress by dragging it to the upload area or clicking to browse. The tool shows the original file size immediately after upload.",
        tip: "You can upload multiple images for batch compression—process up to 20 files simultaneously.",
        screenshotAlt: "Upload interface displaying file size of selected JPEG",
        screenshotType: "upload" as const
      },
      {
        step: 2,
        title: "Choose Compression Level",
        description: "Move the quality slider to set your target compression. The preview updates in real-time showing the estimated output size. Lower values create smaller files but may introduce visible artifacts.",
        screenshotAlt: "Compression slider showing quality percentage and estimated output size",
        screenshotType: "compress" as const
      },
      {
        step: 3,
        title: "Preview Comparison",
        description: "Toggle between original and compressed versions to compare quality. Zoom into detailed areas to check for compression artifacts. Most images look identical at 70-80% quality.",
        tip: "Focus on areas with gradients, text, or fine details—these show compression effects first.",
        screenshotAlt: "Side-by-side comparison of original and compressed image",
        screenshotType: "preview" as const
      },
      {
        step: 4,
        title: "Compress and Save",
        description: "Click 'Compress' to finalize. The optimized JPEG downloads automatically. Check the size reduction displayed—you'll typically see 40-70% savings.",
        warning: "Compression is permanent. Keep original files if you might need higher quality later.",
        screenshotAlt: "Compression results showing before/after file sizes",
        screenshotType: "download" as const
      }
    ],
    proTips: [
      "For web images, 70-80% quality is usually indistinguishable from the original to most viewers",
      "Product photos for e-commerce work well at 75-85% to balance quality with page speed",
      "Compress images before uploading to websites—this improves SEO and user experience",
      "Email attachments at 60-70% quality are usually sufficient and help avoid size limits"
    ],
    commonMistakes: [
      "Compressing the same image multiple times—quality degrades with each compression cycle",
      "Using very low quality for images containing important text or fine patterns",
      "Not testing compressed images on the actual target platform before deploying"
    ]
  },

  "png-compressor": {
    slug: "png-compressor",
    supportedFormats: ["PNG"],
    maxFileSize: "50MB per image",
    processingNote: "2-8 seconds (varies by complexity)",
    privacyBehavior: "Zero data transmission",
    steps: [
      {
        step: 1,
        title: "Select PNG for Compression",
        description: "Upload your PNG file through drag-and-drop or file browser. PNG compression works especially well on graphics, screenshots, and images with solid color areas.",
        screenshotAlt: "PNG file upload interface with format verification",
        screenshotType: "upload" as const
      },
      {
        step: 2,
        title: "Pick Compression Method",
        description: "Choose between lossless (no quality loss) or lossy (maximum size reduction) compression. Lossless typically reduces files by 20-40%, while lossy can achieve 60-80% reduction.",
        tip: "For graphics with limited colors like logos and icons, lossless compression is very effective.",
        screenshotAlt: "Compression mode selector with method descriptions",
        screenshotType: "compress" as const
      },
      {
        step: 3,
        title: "Review Results",
        description: "The compressor analyzes your image and applies optimizations. Preview the result to ensure quality meets your standards. Transparency is always preserved.",
        warning: "Lossy compression may cause slight banding in gradient areas—check these carefully.",
        screenshotAlt: "Compression preview with preserved transparency indicator",
        screenshotType: "preview" as const
      },
      {
        step: 4,
        title: "Download Optimized PNG",
        description: "Download your compressed PNG with full transparency intact. The file works identically to the original but loads faster on websites and takes less storage space.",
        screenshotAlt: "Download button with size savings displayed",
        screenshotType: "download" as const
      }
    ],
    proTips: [
      "Screenshots and diagrams often compress by 50%+ without any visible difference",
      "Use lossless compression for images you'll edit later to avoid quality degradation",
      "PNG compression is ideal for UI elements, icons, and any graphics with transparency",
      "Combine with resolution reduction for even greater file size savings when appropriate"
    ],
    commonMistakes: [
      "Using lossy mode on images with subtle gradients where banding would be visible",
      "Expecting PNG compression to match JPEG compression ratios—PNG prioritizes quality",
      "Compressing already-optimized PNGs expecting significant additional reduction"
    ]
  },

  // ============================================
  // RESIZE TOOLS
  // ============================================
  
  "exact-resize": {
    slug: "exact-resize",
    supportedFormats: ["JPG", "PNG", "WebP", "GIF", "BMP"],
    maxFileSize: "50MB per image",
    processingNote: "Instant (1-2 seconds)",
    privacyBehavior: "Client-side only",
    steps: [
      {
        step: 1,
        title: "Add Your Image",
        description: "Upload any image by dragging it to the upload zone. The tool displays current dimensions (width × height in pixels) once the image loads.",
        screenshotAlt: "Image upload with original dimensions displayed",
        screenshotType: "upload" as const
      },
      {
        step: 2,
        title: "Enter Target Dimensions",
        description: "Type the exact width and height you need in pixels. Enable 'Lock Aspect Ratio' to maintain proportions automatically when you change one dimension.",
        tip: "Common sizes: Instagram square (1080×1080), Facebook cover (820×312), Twitter header (1500×500).",
        screenshotAlt: "Dimension input fields with aspect ratio lock toggle",
        screenshotType: "resize" as const
      },
      {
        step: 3,
        title: "Choose Resize Quality",
        description: "Select the resampling algorithm. 'Lanczos' provides the sharpest results for downscaling. 'Bilinear' offers smoother results for enlargement.",
        warning: "Enlarging images beyond 150% of original size often results in visible blur or pixelation.",
        screenshotAlt: "Resampling algorithm dropdown with quality options",
        screenshotType: "preview" as const
      },
      {
        step: 4,
        title: "Resize and Download",
        description: "Click 'Resize' to process. Download the resized image immediately. The output format matches your input unless you change it.",
        screenshotAlt: "Resize confirmation with new dimensions preview",
        screenshotType: "download" as const
      }
    ],
    proTips: [
      "Always resize larger images down rather than small images up for best quality",
      "Use exact dimensions for consistent branding across all marketing materials",
      "Resize before adding text overlays to ensure text appears at the intended size",
      "Check platform requirements—exact dimensions avoid cropping surprises"
    ],
    commonMistakes: [
      "Stretching images by unlocking aspect ratio when it should stay locked",
      "Enlarging small images expecting them to remain sharp",
      "Not accounting for retina displays that need 2× resolution images"
    ]
  },

  "percentage-resize": {
    slug: "percentage-resize",
    supportedFormats: ["JPG", "PNG", "WebP", "GIF", "BMP", "TIFF"],
    maxFileSize: "50MB per image",
    processingNote: "Instant processing",
    privacyBehavior: "No server upload",
    steps: [
      {
        step: 1,
        title: "Upload Image File",
        description: "Add your image via drag-and-drop or file selection. Current dimensions appear in the preview, helping you understand how the percentage change will affect size.",
        screenshotAlt: "Upload area with current image dimensions visible",
        screenshotType: "upload" as const
      },
      {
        step: 2,
        title: "Set Scale Percentage",
        description: "Enter a percentage value. 50% halves both dimensions (quarters the total pixels). 200% doubles dimensions (quadruples pixels). The preview updates showing new dimensions.",
        tip: "For quick halving or doubling, use 50% or 200%. For subtle adjustments, try 80% or 120%.",
        screenshotAlt: "Percentage input with calculated new dimensions",
        screenshotType: "resize" as const
      },
      {
        step: 3,
        title: "Preview New Size",
        description: "See the calculated output dimensions before processing. This helps avoid surprises, especially when working with specific size requirements.",
        screenshotAlt: "Dimension preview showing original vs. new sizes",
        screenshotType: "preview" as const
      },
      {
        step: 4,
        title: "Apply and Download",
        description: "Execute the resize and download your scaled image. Percentage resizing maintains perfect proportions automatically.",
        screenshotAlt: "Download interface after successful resize",
        screenshotType: "download" as const
      }
    ],
    proTips: [
      "Reduce high-resolution photos to 25-50% for email sharing while keeping them viewable",
      "Use 75% for a subtle size reduction that's barely noticeable in quality",
      "Process batches of images at the same percentage for consistent relative sizing",
      "Screenshot at 2× then resize to 50% for sharper-than-normal images on standard displays"
    ],
    commonMistakes: [
      "Scaling up low-resolution images expecting quality improvement",
      "Confusing percentage of size with percentage of quality/compression",
      "Applying percentage resize multiple times instead of calculating the target once"
    ]
  },

  // ============================================
  // CROP TOOLS
  // ============================================
  
  "manual-crop": {
    slug: "manual-crop",
    supportedFormats: ["JPG", "PNG", "WebP", "GIF", "BMP"],
    maxFileSize: "50MB per image",
    processingNote: "Real-time preview",
    privacyBehavior: "Fully offline capable",
    steps: [
      {
        step: 1,
        title: "Load Image for Cropping",
        description: "Upload your image to see it in the crop editor. The full image displays with a crop selection box ready for positioning.",
        screenshotAlt: "Full image displayed with initial crop selection overlay",
        screenshotType: "upload" as const
      },
      {
        step: 2,
        title: "Position Crop Area",
        description: "Click and drag to draw a selection box around the area you want to keep. Drag the edges or corners to fine-tune the selection precisely.",
        tip: "Hold Shift while dragging corners to maintain a square selection.",
        screenshotAlt: "Crop selection being adjusted with drag handles visible",
        screenshotType: "crop" as const
      },
      {
        step: 3,
        title: "Fine-Tune Selection",
        description: "Use the input fields to enter exact pixel values for crop position and size if you need precise control. The preview updates as you type.",
        warning: "Areas outside the crop selection will be permanently removed from the output image.",
        screenshotAlt: "Precise dimension inputs with updated crop preview",
        screenshotType: "preview" as const
      },
      {
        step: 4,
        title: "Crop and Save",
        description: "Click 'Apply Crop' to create your cropped image. Download the result immediately or continue editing with other tools.",
        screenshotAlt: "Cropped result preview with download option",
        screenshotType: "download" as const
      }
    ],
    proTips: [
      "Crop before resizing for better quality—reduce data before scaling",
      "Use rule of thirds by mentally dividing your crop into a 3×3 grid for better composition",
      "Remove distracting elements at photo edges to improve focus on the main subject",
      "Crop portraits to standard photo ratios (4:5, 5:7) for professional printing"
    ],
    commonMistakes: [
      "Cropping too tightly without leaving breathing room around subjects",
      "Accidentally removing important elements at the edges of the frame",
      "Not considering the final use case aspect ratio before cropping"
    ]
  },

  "circle-crop": {
    slug: "circle-crop",
    supportedFormats: ["JPG", "PNG", "WebP"],
    maxFileSize: "50MB per image",
    processingNote: "Instant with transparency",
    privacyBehavior: "Browser-only",
    steps: [
      {
        step: 1,
        title: "Upload Portrait Image",
        description: "Add your image, ideally a portrait or headshot. The tool automatically detects face positions to suggest optimal circle placement when possible.",
        tip: "For profile pictures, center the face in the original image before uploading.",
        screenshotAlt: "Image upload with face detection indicator"
      },
      {
        step: 2,
        title: "Position the Circle",
        description: "A circular overlay appears on your image. Drag to reposition and resize to frame your subject perfectly. The preview shows exactly what will be included.",
        screenshotAlt: "Circular crop overlay positioned over portrait"
      },
      {
        step: 3,
        title: "Adjust Circle Size",
        description: "Resize the circle using corner handles or enter a specific diameter in pixels. Larger circles include more background; smaller ones focus tightly on the subject.",
        screenshotAlt: "Circle resize handles with diameter input"
      },
      {
        step: 4,
        title: "Export Circular Image",
        description: "Choose PNG format for transparent corners (recommended) or JPG with a background color. Download your circular profile image ready for use.",
        warning: "JPG format cannot have transparent corners—choose PNG for true circular appearance on different backgrounds.",
        screenshotAlt: "Export options showing format selection"
      }
    ],
    proTips: [
      "Export as PNG to maintain transparent corners for use on any background color",
      "Center your subject's eyes roughly in the upper third of the circle for natural appearance",
      "Use circle crop for consistent profile pictures across all your social media platforms",
      "Add a slight margin around faces—too-tight crops feel uncomfortable to viewers"
    ],
    commonMistakes: [
      "Exporting as JPG expecting transparent corners—JPG fills corners with solid color",
      "Centering on the nose instead of eyes, creating awkward-looking portraits",
      "Making the circle too small and cutting off the top of the head or chin"
    ]
  },

  // ============================================
  // ROTATE & FLIP TOOLS
  // ============================================
  
  "rotate-90": {
    slug: "rotate-90",
    supportedFormats: ["JPG", "PNG", "WebP", "GIF", "BMP", "TIFF"],
    maxFileSize: "50MB per image",
    processingNote: "Instant rotation",
    privacyBehavior: "Local processing",
    steps: [
      {
        step: 1,
        title: "Upload Sideways Image",
        description: "Add the image that needs rotation. Common scenarios include photos taken with a rotated phone or scanned documents that loaded incorrectly.",
        screenshotAlt: "Sideways image loaded in rotation tool",
        screenshotType: "upload" as const
      },
      {
        step: 2,
        title: "Select Rotation Direction",
        description: "Click 'Rotate 90° Clockwise' or 'Rotate 90° Counter-clockwise' depending on which way your image needs to turn to appear correct.",
        tip: "If you need 180° rotation, apply the 90° rotation twice or use our dedicated 180° rotate tool.",
        screenshotAlt: "Rotation buttons showing clockwise and counter-clockwise options",
        screenshotType: "rotate" as const
      },
      {
        step: 3,
        title: "Verify Orientation",
        description: "Check the preview to confirm the image now displays correctly. Apply additional rotation if needed—you can rotate multiple times.",
        screenshotAlt: "Corrected image orientation in preview",
        screenshotType: "preview" as const
      },
      {
        step: 4,
        title: "Download Corrected Image",
        description: "Save your properly oriented image. The rotation is lossless for most formats, preserving original image quality.",
        screenshotAlt: "Download button with rotated image ready",
        screenshotType: "download" as const
      }
    ],
    proTips: [
      "Fix phone photos that saved with wrong orientation due to sensor issues",
      "Rotate scanned documents for proper reading orientation",
      "Chain multiple 90° rotations for any angle that's a multiple of 90",
      "Use custom rotation tool instead if you need angles like 45° or 15°"
    ],
    commonMistakes: [
      "Rotating in the wrong direction and needing to rotate three more times to correct",
      "Not checking if the camera app's auto-rotate was the actual issue",
      "Confusing rotation with flip—rotation turns, flip mirrors"
    ]
  },

  "flip-horizontal": {
    slug: "flip-horizontal",
    supportedFormats: ["JPG", "PNG", "WebP", "GIF", "BMP"],
    maxFileSize: "50MB per image",
    processingNote: "Instant flip",
    privacyBehavior: "No data leaves device",
    steps: [
      {
        step: 1,
        title: "Add Your Image",
        description: "Upload the image you want to flip horizontally (mirror left-to-right). This is commonly used for selfies, design symmetry, or fixing camera mirror effects.",
        screenshotAlt: "Original image loaded for horizontal flip"
      },
      {
        step: 2,
        title: "Apply Horizontal Flip",
        description: "Click 'Flip Horizontal' to mirror the image along the vertical axis. What was on the left appears on the right, and vice versa.",
        tip: "Flipping selfies makes them appear as others see you, rather than as you see yourself in a mirror.",
        screenshotAlt: "Image after horizontal flip applied"
      },
      {
        step: 3,
        title: "Compare Before and After",
        description: "Toggle between original and flipped versions to see the difference. This helps verify the flip achieves what you intended.",
        warning: "Text in flipped images will appear reversed and unreadable.",
        screenshotAlt: "Comparison view showing original and flipped versions"
      },
      {
        step: 4,
        title: "Save Flipped Image",
        description: "Download your mirrored image. The flip operation preserves all original image quality.",
        screenshotAlt: "Download interface for flipped image"
      }
    ],
    proTips: [
      "Flip selfies to show yourself as others see you rather than mirror-reversed",
      "Create symmetrical designs by flipping and combining with the original",
      "Fix product photos where items need to face the opposite direction for layout purposes",
      "Use for creating before/after comparisons in presentations"
    ],
    commonMistakes: [
      "Flipping images with text, making the text unreadable",
      "Forgetting that logos and branding will be reversed",
      "Confusing horizontal flip (left-right) with vertical flip (top-bottom)"
    ]
  },

  // ============================================
  // WATERMARK TOOLS
  // ============================================
  
  "text-watermark": {
    slug: "text-watermark",
    supportedFormats: ["JPG", "PNG", "WebP"],
    maxFileSize: "50MB per image",
    processingNote: "Real-time preview",
    privacyBehavior: "Completely offline",
    steps: [
      {
        step: 1,
        title: "Upload Image to Protect",
        description: "Add the image you want to watermark. Consider what areas are most important—watermarks should discourage theft without ruining the viewing experience.",
        screenshotAlt: "Original image loaded for watermarking",
        screenshotType: "upload" as const
      },
      {
        step: 2,
        title: "Enter Watermark Text",
        description: "Type your watermark content—typically your name, business name, website, or copyright notice. The text appears immediately on the preview.",
        tip: "Keep watermark text short and recognizable—'© 2024 YourName' works well.",
        screenshotAlt: "Text input field with watermark preview on image",
        screenshotType: "watermark" as const
      },
      {
        step: 3,
        title: "Customize Appearance",
        description: "Adjust font, size, color, opacity, and position. Lower opacity (20-40%) protects without overwhelming. Position strategically where cropping would be difficult.",
        warning: "Very light watermarks can be removed easily—balance visibility with aesthetics.",
        screenshotAlt: "Watermark styling options with positioned result",
        screenshotType: "preview" as const
      },
      {
        step: 4,
        title: "Choose Pattern or Single",
        description: "Select single placement for subtle marking or tiled pattern for stronger protection. Tiled patterns make removal significantly harder.",
        screenshotAlt: "Pattern options showing single vs. tiled watermark"
      },
      {
        step: 5,
        title: "Apply and Download",
        description: "Process the watermark and download your protected image. The watermark is permanently embedded into the image file.",
        screenshotAlt: "Final watermarked image ready for download",
        screenshotType: "download" as const
      }
    ],
    proTips: [
      "Position watermarks where they'd be hard to crop out without losing the main subject",
      "Use semi-transparent watermarks (30-50% opacity) for professional appearance",
      "Match watermark color to complement rather than clash with image colors",
      "Create a diagonal tiled pattern for maximum protection against removal"
    ],
    commonMistakes: [
      "Placing watermarks in easily-croppable corners where they provide no protection",
      "Using opaque watermarks that make images unusable for legitimate preview purposes",
      "Choosing fonts that are hard to read or don't represent your brand well"
    ]
  },

  // ============================================
  // DOCUMENT CONVERSION TOOLS
  // ============================================
  
  "image-to-pdf": {
    slug: "image-to-pdf",
    supportedFormats: ["JPG", "PNG", "WebP", "BMP", "GIF", "TIFF"],
    maxFileSize: "50MB total",
    processingNote: "3-10 seconds",
    privacyBehavior: "No cloud upload",
    steps: [
      {
        step: 1,
        title: "Add Images for PDF",
        description: "Upload one or more images that will become pages in your PDF. Drag multiple files at once or add them one by one. The order shown is the page order.",
        tip: "Drag images to reorder them before conversion if the page sequence matters.",
        screenshotAlt: "Multiple images uploaded showing page order"
      },
      {
        step: 2,
        title: "Arrange Page Order",
        description: "Drag and drop image thumbnails to rearrange page sequence. Each image becomes one PDF page in the order displayed.",
        screenshotAlt: "Drag-and-drop reordering of image pages"
      },
      {
        step: 3,
        title: "Configure PDF Settings",
        description: "Choose page size (A4, Letter, or match image dimensions), orientation, and margins. These settings apply to all pages consistently.",
        tip: "Use 'Fit to Image' sizing if your images have varying dimensions.",
        screenshotAlt: "PDF configuration options for page size and margins"
      },
      {
        step: 4,
        title: "Generate PDF Document",
        description: "Click 'Create PDF' to compile your images into a single PDF document. Large collections may take a few extra seconds to process.",
        screenshotAlt: "PDF generation progress indicator"
      },
      {
        step: 5,
        title: "Download Your PDF",
        description: "Save the completed PDF file. Open it in any PDF reader to verify all pages appear correctly before sharing or archiving.",
        warning: "Very high-resolution images create large PDFs—consider compressing images first for smaller file size.",
        screenshotAlt: "PDF download button with file size shown"
      }
    ],
    proTips: [
      "Scan documents at 300 DPI for readable text, 150 DPI for simple graphics",
      "Compress images before PDF conversion for smaller final file size",
      "Use consistent page orientation throughout for professional documents",
      "Add a blank white image as a separator between document sections"
    ],
    commonMistakes: [
      "Including images at 600+ DPI unnecessarily, creating massive PDF files",
      "Forgetting to check page order before generating—reordering afterward means redoing the conversion",
      "Mixing portrait and landscape images without setting orientation per-page"
    ]
  },

  "image-to-base64": {
    slug: "image-to-base64",
    supportedFormats: ["JPG", "PNG", "WebP", "GIF", "SVG", "BMP", "ICO"],
    maxFileSize: "5MB recommended",
    processingNote: "Instant encoding",
    privacyBehavior: "Local encoding only",
    steps: [
      {
        step: 1,
        title: "Upload Small Image",
        description: "Add an image to convert to Base64 string. This is typically used for small images like icons, logos, or thumbnails that you want to embed directly in code.",
        tip: "Base64 increases file size by ~33%—only use for small images where reducing HTTP requests matters.",
        screenshotAlt: "Image upload with file size display"
      },
      {
        step: 2,
        title: "View Generated Code",
        description: "The Base64 string appears immediately. This text representation contains all image data in a format that can be embedded directly in HTML, CSS, or JavaScript.",
        screenshotAlt: "Base64 output showing encoded string"
      },
      {
        step: 3,
        title: "Select Output Format",
        description: "Choose between raw Base64 string, Data URI (for direct src usage), or CSS background-image syntax depending on where you'll use the encoded image.",
        screenshotAlt: "Output format options with syntax examples"
      },
      {
        step: 4,
        title: "Copy Code to Clipboard",
        description: "Click 'Copy' to grab the complete code. Paste it directly into your HTML, CSS, or JavaScript file where needed.",
        warning: "Base64 strings are very long—don't manually try to type or edit them.",
        screenshotAlt: "Copy button with success confirmation"
      }
    ],
    proTips: [
      "Use for small icons and logos under 10KB to reduce HTTP requests",
      "Base64 images load instantly without separate file requests—useful for critical UI elements",
      "Include the correct MIME type in Data URI (e.g., 'data:image/png;base64,...')",
      "For larger images, regular file references are more efficient than Base64"
    ],
    commonMistakes: [
      "Encoding large images that bloat page size beyond the benefit of fewer requests",
      "Forgetting the Data URI prefix when using in image src attributes",
      "Not considering that Base64 images can't be cached separately by browsers"
    ]
  },

  // ============================================
  // PHOTO FILTER TOOLS
  // ============================================
  
  "brightness-adjust": {
    slug: "brightness-adjust",
    supportedFormats: ["JPG", "PNG", "WebP"],
    maxFileSize: "50MB per image",
    processingNote: "Real-time adjustment",
    privacyBehavior: "No external processing",
    steps: [
      {
        step: 1,
        title: "Upload Photo",
        description: "Add the photo you want to brighten or darken. Underexposed (too dark) or overexposed (too bright) photos are perfect candidates for this tool.",
        screenshotAlt: "Original photo loaded with brightness adjustment needed"
      },
      {
        step: 2,
        title: "Move Brightness Slider",
        description: "Drag the slider right to increase brightness (lighten) or left to decrease (darken). Changes preview in real-time on your image.",
        tip: "Small adjustments (±10-20%) usually look more natural than extreme changes.",
        screenshotAlt: "Brightness slider with real-time preview"
      },
      {
        step: 3,
        title: "Fine-Tune Result",
        description: "Compare with the original using the comparison toggle. Pay attention to highlight areas that might become too bright (blown out) or shadows that become too dark.",
        warning: "Extreme brightness increases can reveal image noise hidden in dark areas.",
        screenshotAlt: "Before/after comparison of brightness adjustment"
      },
      {
        step: 4,
        title: "Save Brightened Image",
        description: "Download your corrected photo with the new brightness level. The adjustment is applied permanently to the saved file.",
        screenshotAlt: "Download button with corrected image preview"
      }
    ],
    proTips: [
      "Combine brightness adjustment with contrast for more impactful corrections",
      "Slightly overexposed photos often look more appealing for portraits",
      "Fix underexposed indoor photos by increasing brightness 15-30%",
      "Use histogram display (if available) to avoid clipping highlights or shadows"
    ],
    commonMistakes: [
      "Over-brightening to the point of losing detail in bright areas (blown highlights)",
      "Making images so dark that important details become invisible",
      "Not considering how the image will look on different screens with varying brightness"
    ]
  },

  "sepia-effect": {
    slug: "sepia-effect",
    supportedFormats: ["JPG", "PNG", "WebP"],
    maxFileSize: "50MB per image",
    processingNote: "Instant application",
    privacyBehavior: "Client-side filter",
    steps: [
      {
        step: 1,
        title: "Add Your Photo",
        description: "Upload a photo to apply the sepia vintage effect. This filter works well on portraits, landscapes, and nostalgic subject matter.",
        screenshotAlt: "Original color photo loaded for sepia conversion"
      },
      {
        step: 2,
        title: "Apply Sepia Filter",
        description: "Click to apply the classic sepia tone that gives photos an aged, vintage appearance reminiscent of early photography.",
        tip: "Sepia works best on photos with good contrast—flat images may look muddy.",
        screenshotAlt: "Photo with sepia effect applied"
      },
      {
        step: 3,
        title: "Adjust Intensity",
        description: "Use the intensity slider to control how strong the sepia effect appears. Lower values create subtle warmth while higher values produce a strong vintage look.",
        screenshotAlt: "Intensity slider showing effect strength options"
      },
      {
        step: 4,
        title: "Download Vintage Photo",
        description: "Save your sepia-toned image. The warm brown tones evoke nostalgia and work well for creative projects, historical themes, or artistic presentations.",
        screenshotAlt: "Final sepia photo ready for download"
      }
    ],
    proTips: [
      "Increase contrast slightly before applying sepia for more dramatic results",
      "Use sepia at 50-70% intensity for a subtle vintage warmth rather than heavy brown tones",
      "Pair sepia photos with vintage-styled typography for cohesive nostalgic designs",
      "Add a slight vignette after sepia for an authentic old photograph look"
    ],
    commonMistakes: [
      "Applying sepia to already low-contrast images, making them appear flat and lifeless",
      "Using 100% sepia intensity when subtler application looks more sophisticated",
      "Forgetting that sepia removes all original color information permanently"
    ]
  },

  // ============================================
  // QR CODE TOOLS
  // ============================================
  
  "qr-generator": {
    slug: "qr-generator",
    supportedFormats: ["PNG", "SVG", "JPG"],
    maxFileSize: "N/A (text input)",
    processingNote: "Instant generation",
    privacyBehavior: "Generated in browser",
    steps: [
      {
        step: 1,
        title: "Enter Content Data",
        description: "Type or paste the content for your QR code: URL, text, phone number, email, or WiFi credentials. The QR code generates as you type.",
        tip: "URLs should include 'https://' for reliable scanning on all devices.",
        screenshotAlt: "Content input field with real-time QR preview"
      },
      {
        step: 2,
        title: "Customize QR Design",
        description: "Choose colors for the code and background. Add corner styling or rounded modules for a modern look. Preview updates instantly with each change.",
        warning: "Maintain high contrast between code and background—low contrast QR codes fail to scan.",
        screenshotAlt: "Color and style customization options"
      },
      {
        step: 3,
        title: "Add Logo (Optional)",
        description: "Upload a small logo to place in the center of your QR code. The error correction compensates for the covered area, but keep logos small.",
        tip: "Keep the logo under 30% of QR code size for reliable scanning.",
        screenshotAlt: "Logo upload option with centered placement"
      },
      {
        step: 4,
        title: "Set Size and Format",
        description: "Choose output size (pixels or inches) and format. SVG for unlimited scaling, PNG for standard use, JPG if transparency isn't needed.",
        screenshotAlt: "Size and format selection options"
      },
      {
        step: 5,
        title: "Download QR Code",
        description: "Generate and download your custom QR code. Test it with your phone camera before printing or distributing.",
        screenshotAlt: "Download button with final QR code preview"
      }
    ],
    proTips: [
      "Always test QR codes by scanning before printing or distributing",
      "Use higher error correction when adding logos or for printed materials that may get damaged",
      "URL shorteners reduce QR complexity and improve scan reliability",
      "For print, generate at 300+ DPI for crisp reproduction"
    ],
    commonMistakes: [
      "Creating QR codes with too little contrast between colors—fails to scan",
      "Adding logos that are too large, blocking too much of the code pattern",
      "Not testing the QR code before mass printing materials",
      "Generating QR codes at low resolution for large print applications"
    ]
  },

  // ============================================
  // METADATA TOOLS
  // ============================================
  
  "view-metadata": {
    slug: "view-metadata",
    supportedFormats: ["JPG", "PNG", "WebP", "TIFF", "HEIC"],
    maxFileSize: "50MB per image",
    processingNote: "Instant extraction",
    privacyBehavior: "Never transmitted",
    steps: [
      {
        step: 1,
        title: "Upload Image File",
        description: "Add an image to view its hidden metadata. JPEG photos from cameras contain the most extensive metadata including camera settings and GPS.",
        screenshotAlt: "Image upload for metadata extraction"
      },
      {
        step: 2,
        title: "View EXIF Data",
        description: "See camera make, model, exposure settings, ISO, focal length, and other capture details. This information helps understand how the photo was taken.",
        tip: "Camera EXIF data is valuable for learning photography—study settings of shots you like.",
        screenshotAlt: "EXIF data display showing camera information"
      },
      {
        step: 3,
        title: "Check GPS Location",
        description: "If present, see where the photo was taken on a map. GPS data is common in smartphone photos unless location services were disabled.",
        warning: "GPS metadata can reveal your home location or other private places—consider removing before sharing.",
        screenshotAlt: "Map showing GPS coordinates from image"
      },
      {
        step: 4,
        title: "Review All Properties",
        description: "Browse complete metadata including file size, dimensions, color profile, creation date, and any embedded comments or copyright information.",
        screenshotAlt: "Full metadata property list display"
      }
    ],
    proTips: [
      "Check GPS data before sharing photos publicly to protect your privacy",
      "Use EXIF data to learn what camera settings work well for different situations",
      "Verify authentic photo dates when metadata preservation matters",
      "Some social media platforms strip metadata—check if privacy-sensitive data persists"
    ],
    commonMistakes: [
      "Assuming all images contain metadata—many screenshots and edited images have none",
      "Sharing photos without checking if GPS coordinates reveal private locations",
      "Expecting metadata from images downloaded from social media (usually stripped)"
    ]
  },

  "remove-metadata": {
    slug: "remove-metadata",
    supportedFormats: ["JPG", "PNG", "WebP", "TIFF"],
    maxFileSize: "50MB per image",
    processingNote: "Instant removal",
    privacyBehavior: "Local processing",
    steps: [
      {
        step: 1,
        title: "Upload Image to Clean",
        description: "Add the image containing metadata you want to remove. The tool displays current metadata so you can see what will be stripped.",
        screenshotAlt: "Image upload showing current metadata summary"
      },
      {
        step: 2,
        title: "Select Data to Remove",
        description: "Choose what to remove: GPS location, camera info, timestamps, or all metadata. Removing GPS is most important for privacy while sharing.",
        tip: "Keep timestamps if you want photos to sort by capture date in galleries.",
        screenshotAlt: "Checkboxes for metadata removal options"
      },
      {
        step: 3,
        title: "Preview Cleaned Result",
        description: "See which metadata will remain after processing. Verify the essential data you want to keep isn't being removed.",
        screenshotAlt: "Before/after metadata comparison"
      },
      {
        step: 4,
        title: "Download Clean Image",
        description: "Save your privacy-protected image with selected metadata removed. The image quality remains identical—only hidden data changes.",
        warning: "Metadata removal is permanent. Keep original files if you might need the data later.",
        screenshotAlt: "Download button for cleaned image"
      }
    ],
    proTips: [
      "Always strip GPS from photos before posting on public forums or selling online",
      "Remove all metadata from professional images to prevent revealing camera equipment",
      "Keep metadata in your archive copies but remove from shared versions",
      "Batch process multiple images for efficiency when preparing albums for sharing"
    ],
    commonMistakes: [
      "Removing all metadata when only GPS removal was needed for privacy",
      "Not keeping original files with full metadata for personal archives",
      "Forgetting to process all images in a batch before sharing"
    ]
  },

  // ============================================
  // PDF TOOLS
  // ============================================
  
  "merge-pdf": {
    slug: "merge-pdf",
    supportedFormats: ["PDF"],
    maxFileSize: "100MB total",
    processingNote: "5-30 seconds",
    privacyBehavior: "Browser-only merge",
    steps: [
      {
        step: 1,
        title: "Add PDF Files",
        description: "Upload two or more PDF files you want to combine into a single document. Drag and drop multiple files at once for convenience.",
        screenshotAlt: "Multiple PDF files being uploaded",
        screenshotType: "upload" as const
      },
      {
        step: 2,
        title: "Arrange Document Order",
        description: "Drag file thumbnails to set the order they'll appear in the merged PDF. The first file becomes pages 1+, second follows, and so on.",
        tip: "Number your source files before uploading to make ordering easier.",
        screenshotAlt: "PDF thumbnails being reordered via drag-and-drop",
        screenshotType: "pdf" as const
      },
      {
        step: 3,
        title: "Preview Combined Pages",
        description: "Expand each PDF to see its pages and verify content. Rearrange if any file is out of sequence before finalizing the merge.",
        screenshotAlt: "Expanded view showing pages from each PDF",
        screenshotType: "preview" as const
      },
      {
        step: 4,
        title: "Merge and Download",
        description: "Click 'Merge PDFs' to combine all documents. Large files may take a moment to process. Download your single consolidated PDF file.",
        warning: "Merged file size equals the sum of all source files—consider compressing afterward.",
        screenshotAlt: "Merge button with progress indicator",
        screenshotType: "download" as const
      }
    ],
    proTips: [
      "Combine related documents (resume sections, report chapters) for easier sharing",
      "Merge scanned pages with digital pages into unified documents",
      "Create portfolio PDFs by combining project documents in sequence",
      "Compress the merged PDF afterward if file size becomes too large"
    ],
    commonMistakes: [
      "Forgetting to check page order before downloading—reordering requires reprocessing",
      "Merging too many large files without considering final file size limits",
      "Not previewing to catch accidentally included wrong documents"
    ]
  },

  "compress-pdf": {
    slug: "compress-pdf",
    supportedFormats: ["PDF"],
    maxFileSize: "100MB per file",
    processingNote: "5-30 seconds",
    privacyBehavior: "Local compression",
    steps: [
      {
        step: 1,
        title: "Upload Large PDF",
        description: "Add the PDF file you need to reduce in size. Common sources of large PDFs include scanned documents, image-heavy reports, and presentations.",
        screenshotAlt: "PDF upload showing original file size",
        screenshotType: "upload" as const
      },
      {
        step: 2,
        title: "Select Compression Level",
        description: "Choose Low (max quality), Medium (balanced), or High (smallest size) compression. Higher compression reduces quality of embedded images more aggressively.",
        tip: "For email attachments, Medium typically provides 50-70% size reduction with acceptable quality.",
        screenshotAlt: "Compression level selector with estimated output sizes",
        screenshotType: "compress" as const
      },
      {
        step: 3,
        title: "Preview Quality",
        description: "If available, preview the compressed PDF to check image quality remains acceptable for your needs before downloading.",
        warning: "High compression on image-heavy PDFs may create noticeably blurry images.",
        screenshotAlt: "Quality preview of compressed PDF pages",
        screenshotType: "preview" as const
      },
      {
        step: 4,
        title: "Download Compressed PDF",
        description: "Save your reduced-size PDF. The compression percentage shows how much space you saved compared to the original.",
        screenshotAlt: "Download with size comparison statistics",
        screenshotType: "download" as const
      }
    ],
    proTips: [
      "Use Medium compression for most email and web sharing needs",
      "High compression works well for text-heavy documents with few images",
      "Compress scanned documents to reduce storage requirements significantly",
      "Keep original PDFs when high image quality might be needed later"
    ],
    commonMistakes: [
      "Applying maximum compression to portfolios or photography documents where image quality matters",
      "Compressing already-compressed PDFs expecting significant additional reduction",
      "Choosing aggressive compression for documents that will be printed"
    ]
  },

  "split-pdf": {
    slug: "split-pdf",
    supportedFormats: ["PDF"],
    maxFileSize: "100MB per file",
    processingNote: "3-15 seconds",
    privacyBehavior: "Processed locally",
    steps: [
      {
        step: 1,
        title: "Upload Source PDF",
        description: "Add the PDF document you want to divide into separate files. The tool displays all pages as thumbnails for easy selection.",
        screenshotAlt: "PDF uploaded with page thumbnails displayed"
      },
      {
        step: 2,
        title: "Select Split Method",
        description: "Choose to extract specific pages, split at every N pages, or extract ranges. Each method suits different needs.",
        tip: "Use page ranges like '1-3, 7, 10-15' to extract multiple non-consecutive sections at once.",
        screenshotAlt: "Split method options with range input"
      },
      {
        step: 3,
        title: "Specify Page Ranges",
        description: "Enter the page numbers or ranges to extract. Click page thumbnails to select/deselect individual pages quickly.",
        screenshotAlt: "Page selection with highlighted chosen pages"
      },
      {
        step: 4,
        title: "Split and Download",
        description: "Process the split and download your extracted pages. Multiple ranges create multiple output files packaged in a zip.",
        warning: "Verify page numbers match the PDF's numbering, not the printed page numbers on the document.",
        screenshotAlt: "Download options for split PDF sections"
      }
    ],
    proTips: [
      "Extract just the pages you need to share instead of sending entire documents",
      "Split large manuals into chapter files for easier navigation",
      "Remove unwanted pages (like cover pages or blank pages) by extracting only what's needed",
      "Create separate files for each recipient when different people need different sections"
    ],
    commonMistakes: [
      "Confusing PDF page numbers with the page numbers printed on the document",
      "Splitting without preserving the original file, then needing pages you didn't extract",
      "Downloading individual pages when a range would be more practical"
    ]
  },

  // ============================================
  // ADDITIONAL IMAGE CONVERTER TOOLS
  // ============================================
  
  "png-to-webp": {
    slug: "png-to-webp",
    supportedFormats: ["PNG"],
    maxFileSize: "50MB per image",
    processingNote: "Instant (2-4 seconds)",
    privacyBehavior: "Fully local",
    steps: [
      {
        step: 1,
        title: "Upload PNG File",
        description: "Drag your PNG image into the upload area or click to browse. This tool converts PNG files while optionally preserving transparency in WebP format.",
        screenshotAlt: "PNG file upload interface"
      },
      {
        step: 2,
        title: "Choose Compression Mode",
        description: "Select lossless for perfect quality or lossy for smaller files. WebP lossless is typically 26% smaller than PNG with identical quality.",
        tip: "Use lossless mode for graphics and logos where every pixel matters.",
        screenshotAlt: "Compression mode selection"
      },
      {
        step: 3,
        title: "Convert to WebP",
        description: "Click the convert button to transform your PNG. The process maintains alpha transparency while significantly reducing file size.",
        screenshotAlt: "Conversion in progress"
      },
      {
        step: 4,
        title: "Download Optimized File",
        description: "Save your WebP image. Notice the size reduction compared to the original PNG while transparency remains intact.",
        screenshotAlt: "Download with size comparison"
      }
    ],
    proTips: [
      "WebP provides better compression than PNG while maintaining transparency support",
      "Use for web graphics, icons, and UI elements to improve page load speed",
      "Modern browsers including Safari now fully support WebP transparency",
      "Keep PNG originals for editing since WebP has less software support"
    ],
    commonMistakes: [
      "Using lossy compression on graphics where lossless is more appropriate",
      "Assuming all graphics software can edit WebP files—many still cannot",
      "Not testing on Safari if targeting older iOS versions"
    ]
  },

  "webp-to-png": {
    slug: "webp-to-png",
    supportedFormats: ["WebP"],
    maxFileSize: "50MB per image",
    processingNote: "Instant conversion",
    privacyBehavior: "Browser-only",
    steps: [
      {
        step: 1,
        title: "Add WebP Image",
        description: "Upload the WebP file you need to convert. This is useful when you need a format with broader editing software support.",
        screenshotAlt: "WebP upload interface"
      },
      {
        step: 2,
        title: "Verify Image Preview",
        description: "Check the preview to confirm it's the correct file. Transparency will be preserved in the PNG output.",
        screenshotAlt: "Image preview with transparency indicator"
      },
      {
        step: 3,
        title: "Convert to PNG",
        description: "Process the conversion to create a universally compatible PNG file. All transparency data transfers seamlessly.",
        tip: "PNG output will be larger than WebP—this is expected due to format differences.",
        screenshotAlt: "Conversion progress"
      },
      {
        step: 4,
        title: "Save PNG File",
        description: "Download your PNG image, ready for use in any application or editor that doesn't support WebP.",
        screenshotAlt: "Download completed PNG"
      }
    ],
    proTips: [
      "Convert WebP to PNG when you need to edit in software like older Photoshop versions",
      "PNG ensures compatibility with all image editing applications",
      "Use this for printing since print shops may not accept WebP files",
      "Maintain transparency when converting graphics with alpha channels"
    ],
    commonMistakes: [
      "Converting for web use when WebP is already optimal",
      "Expecting PNG to be smaller than WebP—it will be larger",
      "Losing animated WebP frames if the file was animated"
    ]
  },

  "gif-to-png": {
    slug: "gif-to-png",
    supportedFormats: ["GIF"],
    maxFileSize: "50MB per image",
    processingNote: "Instant (first frame)",
    privacyBehavior: "Local processing",
    steps: [
      {
        step: 1,
        title: "Upload GIF Image",
        description: "Add your GIF file to convert. Note that for animated GIFs, only the first frame will be extracted as a static PNG image.",
        warning: "Animated GIFs will lose animation—only the first frame becomes the PNG.",
        screenshotAlt: "GIF upload area"
      },
      {
        step: 2,
        title: "Preview Frame",
        description: "See which frame will be converted. For static GIFs, the image appears as expected. For animated ones, verify the first frame is suitable.",
        screenshotAlt: "Frame preview display"
      },
      {
        step: 3,
        title: "Convert Static Image",
        description: "Transform the GIF frame into PNG format with improved color depth (millions vs. 256 colors in GIF) and transparency support.",
        tip: "PNG supports full alpha transparency unlike GIF's binary transparency.",
        screenshotAlt: "Conversion button"
      },
      {
        step: 4,
        title: "Download PNG Result",
        description: "Save your PNG with enhanced color fidelity. The image now supports smooth gradients and true transparency.",
        screenshotAlt: "PNG download ready"
      }
    ],
    proTips: [
      "PNG offers millions of colors vs. GIF's 256 color limit for better gradients",
      "Use for extracting key frames from animated GIFs as static images",
      "PNG provides smoother transparency edges compared to GIF's harsh binary transparency",
      "Convert old web graphics from GIF to PNG for better quality"
    ],
    commonMistakes: [
      "Expecting animated GIFs to become animated PNGs—animation is lost",
      "Not selecting the best frame before conversion for animated GIFs",
      "Converting to PNG when the original GIF file size is already optimal"
    ]
  },

  "gif-to-jpg": {
    slug: "gif-to-jpg",
    supportedFormats: ["GIF"],
    maxFileSize: "50MB per image",
    processingNote: "Instant conversion",
    privacyBehavior: "No uploads",
    steps: [
      {
        step: 1,
        title: "Select GIF File",
        description: "Upload your GIF image. For animated GIFs, the first frame becomes your JPG. Static GIFs convert entirely.",
        screenshotAlt: "GIF selection interface"
      },
      {
        step: 2,
        title: "Set Background Color",
        description: "If your GIF has transparency, choose a background color to replace transparent areas since JPG cannot store transparency.",
        tip: "White works best for most document and web contexts.",
        screenshotAlt: "Background color picker"
      },
      {
        step: 3,
        title: "Adjust Quality",
        description: "Set the JPG quality level. Higher quality creates larger files but preserves more detail from the original GIF.",
        screenshotAlt: "Quality slider control"
      },
      {
        step: 4,
        title: "Get Your JPG",
        description: "Download the converted image in universally compatible JPG format ready for any use.",
        screenshotAlt: "JPG download button"
      }
    ],
    proTips: [
      "JPG files are typically much smaller than GIFs for the same image",
      "Use this to extract poster images from animated GIFs for previews",
      "JPG works in all email clients while some block GIFs",
      "Choose a background color that matches where the image will be displayed"
    ],
    commonMistakes: [
      "Forgetting that transparent GIF areas become solid color in JPG",
      "Using JPG for graphics with flat colors where GIF might be smaller",
      "Over-compressing and losing detail from already-limited GIF quality"
    ]
  },

  "bmp-to-jpg": {
    slug: "bmp-to-jpg",
    supportedFormats: ["BMP"],
    maxFileSize: "100MB per image",
    processingNote: "Instant processing",
    privacyBehavior: "Client-side only",
    steps: [
      {
        step: 1,
        title: "Load BMP File",
        description: "Upload your uncompressed BMP image. BMP files are often extremely large, making conversion to JPG highly beneficial.",
        tip: "BMP to JPG conversion can reduce file sizes by 90% or more.",
        screenshotAlt: "BMP file upload showing original size"
      },
      {
        step: 2,
        title: "Set Compression Level",
        description: "Adjust JPG quality to balance file size and image clarity. Even at 90% quality, you'll see dramatic size reduction from BMP.",
        screenshotAlt: "Quality adjustment slider"
      },
      {
        step: 3,
        title: "Convert Image",
        description: "Process the conversion from uncompressed BMP to efficiently compressed JPG format.",
        screenshotAlt: "Conversion in progress"
      },
      {
        step: 4,
        title: "Download Compact JPG",
        description: "Save your compressed JPG file. Compare the dramatic size difference—BMP files often shrink to 5-10% of original size.",
        screenshotAlt: "Size comparison and download"
      }
    ],
    proTips: [
      "BMP to JPG conversion is ideal for reducing storage requirements significantly",
      "Old scanner software often outputs BMP—convert for efficient sharing",
      "JPG is universally compatible while BMP may not open on all devices",
      "Even high-quality JPG (95%) will be vastly smaller than BMP"
    ],
    commonMistakes: [
      "Not converting BMP files and wasting storage space with uncompressed images",
      "Using too-low quality for BMP files that contain important details",
      "Expecting transparency support—BMP transparency converts to solid background"
    ]
  },

  "bmp-to-png": {
    slug: "bmp-to-png",
    supportedFormats: ["BMP"],
    maxFileSize: "100MB per image",
    processingNote: "Instant lossless",
    privacyBehavior: "Local conversion",
    steps: [
      {
        step: 1,
        title: "Upload BMP Image",
        description: "Add your BMP file. BMP stores uncompressed data, resulting in large files. PNG provides compression while maintaining quality.",
        screenshotAlt: "BMP upload interface"
      },
      {
        step: 2,
        title: "Preview Image",
        description: "Verify the image looks correct before conversion. What you see is exactly what you'll get in PNG format.",
        screenshotAlt: "Image preview panel"
      },
      {
        step: 3,
        title: "Convert to PNG",
        description: "Transform BMP to PNG using lossless compression. File size reduces significantly without any quality degradation.",
        tip: "PNG compression is lossless—your image quality remains identical to the BMP.",
        screenshotAlt: "Convert button with progress"
      },
      {
        step: 4,
        title: "Save PNG File",
        description: "Download your PNG with perfect quality in a much smaller file size. PNG also adds transparency capability if needed.",
        screenshotAlt: "Download completed PNG"
      }
    ],
    proTips: [
      "PNG provides lossless compression unlike JPG, preserving exact BMP quality",
      "Choose PNG over JPG when you need to preserve sharp edges and text",
      "PNG adds transparency capability that BMP doesn't have",
      "Great for screenshots and graphics originally saved as BMP"
    ],
    commonMistakes: [
      "Choosing JPG when lossless quality preservation is needed",
      "Not converting old BMP files that waste storage space",
      "Expecting dramatic compression for already-simple images"
    ]
  },

  "tiff-to-jpg": {
    slug: "tiff-to-jpg",
    supportedFormats: ["TIFF", "TIF"],
    maxFileSize: "100MB per image",
    processingNote: "2-5 seconds",
    privacyBehavior: "Processed locally",
    steps: [
      {
        step: 1,
        title: "Upload TIFF File",
        description: "Add your TIFF image. TIFF is common in professional photography and scanning but creates very large files. JPG makes them shareable.",
        screenshotAlt: "TIFF upload area"
      },
      {
        step: 2,
        title: "Select Page (Multi-page TIFF)",
        description: "If your TIFF contains multiple pages, select which page to convert. Each page can be converted separately.",
        tip: "Scanned documents often create multi-page TIFFs—convert page by page as needed.",
        screenshotAlt: "Page selector for multi-page TIFF"
      },
      {
        step: 3,
        title: "Choose Quality",
        description: "Set JPG compression quality. For TIFF files from professional cameras, use 90%+ to preserve detail. For documents, 80% works well.",
        screenshotAlt: "Quality setting slider"
      },
      {
        step: 4,
        title: "Download JPG",
        description: "Get your converted JPG file at a fraction of the original TIFF size while maintaining excellent visual quality.",
        screenshotAlt: "JPG ready for download"
      }
    ],
    proTips: [
      "TIFF from professional cameras should be converted at 90%+ quality",
      "Convert multi-page TIFF documents to individual JPGs for easier sharing",
      "JPG is universally viewable while TIFF requires specialized software",
      "Archive original TIFFs for editing; use JPG for sharing and web"
    ],
    commonMistakes: [
      "Converting professional TIFF photos at too-low quality settings",
      "Expecting to convert all pages of multi-page TIFF in one operation",
      "Discarding original TIFF files that may be needed for professional printing"
    ]
  },

  "tiff-to-png": {
    slug: "tiff-to-png",
    supportedFormats: ["TIFF", "TIF"],
    maxFileSize: "100MB per image",
    processingNote: "2-5 seconds",
    privacyBehavior: "No cloud upload",
    steps: [
      {
        step: 1,
        title: "Add TIFF Image",
        description: "Upload your TIFF file. PNG provides lossless conversion while being more widely compatible than TIFF for web and digital use.",
        screenshotAlt: "TIFF file selection"
      },
      {
        step: 2,
        title: "Handle Multi-page Files",
        description: "For multi-page TIFFs, choose the specific page to convert. Each page becomes a separate PNG file.",
        screenshotAlt: "Page selection interface"
      },
      {
        step: 3,
        title: "Process Conversion",
        description: "Convert TIFF to PNG format. The conversion is lossless, preserving every detail from the original TIFF.",
        tip: "PNG maintains TIFF quality with better compression and web compatibility.",
        screenshotAlt: "Conversion processing"
      },
      {
        step: 4,
        title: "Save PNG Output",
        description: "Download your losslessly converted PNG. Use it in any web context or application that accepts PNG format.",
        screenshotAlt: "PNG download ready"
      }
    ],
    proTips: [
      "PNG is ideal when you need TIFF quality with web compatibility",
      "Use for converting scanned artwork where quality loss is unacceptable",
      "PNG works in all browsers while TIFF has limited web support",
      "Preserve layer data? Note that PNG flattens multi-layer TIFFs"
    ],
    commonMistakes: [
      "Expecting PNG to be smaller than TIFF—both use lossless compression",
      "Trying to preserve TIFF layers in PNG—layers get flattened",
      "Converting when TIFF is specifically required by a print vendor"
    ]
  },

  "svg-to-png": {
    slug: "svg-to-png",
    supportedFormats: ["SVG"],
    maxFileSize: "10MB per file",
    processingNote: "Instant rasterization",
    privacyBehavior: "Browser rendering",
    steps: [
      {
        step: 1,
        title: "Upload SVG Vector",
        description: "Add your SVG file. SVG is a vector format that scales infinitely, but sometimes you need a raster PNG version.",
        tip: "SVG to PNG is often needed for apps and platforms that don't support vector graphics.",
        screenshotAlt: "SVG upload interface"
      },
      {
        step: 2,
        title: "Set Output Dimensions",
        description: "Choose the PNG size in pixels. Since SVG is vector, you can output at any resolution without quality loss. Enter larger sizes for print use.",
        screenshotAlt: "Dimension input with scale preview"
      },
      {
        step: 3,
        title: "Preserve Transparency",
        description: "Toggle transparent background on or off. PNG supports transparency, allowing your SVG elements to appear on any colored background.",
        screenshotAlt: "Transparency toggle option"
      },
      {
        step: 4,
        title: "Render and Download",
        description: "Generate your PNG at the specified dimensions. The vector artwork is rasterized at perfect quality for the chosen size.",
        screenshotAlt: "PNG render complete"
      }
    ],
    proTips: [
      "Render at 2× display size for sharp retina/HiDPI screens",
      "Use transparent background for logos that appear on various colors",
      "For print, export at 300 DPI (multiply display pixels by 3.125)",
      "Keep SVG originals—you can always re-render at different sizes"
    ],
    commonMistakes: [
      "Rendering at too small a size then being unable to scale up without blur",
      "Forgetting to enable transparency for graphics meant to overlay content",
      "Discarding the SVG source file after PNG conversion"
    ]
  },

  "svg-to-jpg": {
    slug: "svg-to-jpg",
    supportedFormats: ["SVG"],
    maxFileSize: "10MB per file",
    processingNote: "Instant rendering",
    privacyBehavior: "Local only",
    steps: [
      {
        step: 1,
        title: "Load SVG File",
        description: "Upload your SVG vector graphic. This tool renders it as a JPG raster image at your specified resolution.",
        screenshotAlt: "SVG file upload"
      },
      {
        step: 2,
        title: "Specify Size",
        description: "Enter output dimensions in pixels. Choose sizes appropriate for your intended use—larger for print, smaller for web.",
        screenshotAlt: "Size specification inputs"
      },
      {
        step: 3,
        title: "Set Background Color",
        description: "Since JPG doesn't support transparency, choose the background color for any transparent areas in your SVG.",
        tip: "Match the background color to wherever the image will be displayed.",
        screenshotAlt: "Background color picker"
      },
      {
        step: 4,
        title: "Convert to JPG",
        description: "Render your SVG to JPG at the chosen dimensions and quality. Download the rasterized image file.",
        screenshotAlt: "JPG output ready"
      }
    ],
    proTips: [
      "Use white background for document and email use cases",
      "JPG creates smaller files than PNG when transparency isn't needed",
      "Render at your exact target size—JPG shouldn't be scaled after creation",
      "For icons, PNG is usually better; use JPG for illustrations without transparency"
    ],
    commonMistakes: [
      "Not considering that transparent areas become solid color",
      "Rendering at the wrong size and then scaling (causes blur)",
      "Using JPG when PNG transparency would be beneficial"
    ]
  },

  "heic-to-jpg": {
    slug: "heic-to-jpg",
    supportedFormats: ["HEIC", "HEIF"],
    maxFileSize: "50MB per image",
    processingNote: "2-5 seconds",
    privacyBehavior: "Local conversion",
    steps: [
      {
        step: 1,
        title: "Upload iPhone Photo",
        description: "Add your HEIC file from your iPhone or other Apple device. HEIC is Apple's default photo format but isn't universally compatible.",
        tip: "Transfer HEIC files via AirDrop, iCloud, or direct cable connection.",
        screenshotAlt: "HEIC file upload"
      },
      {
        step: 2,
        title: "View Photo Preview",
        description: "See your photo in the preview area. Verify it's the correct image before converting to the universally compatible JPG format.",
        screenshotAlt: "HEIC preview display"
      },
      {
        step: 3,
        title: "Select Quality Level",
        description: "Choose JPG quality. For sharing, 80-85% provides excellent quality with reasonable file size. For archiving, use 90%+.",
        screenshotAlt: "Quality slider"
      },
      {
        step: 4,
        title: "Download Universal JPG",
        description: "Save your JPG file that works on Windows, Android, web, and all platforms that couldn't open the original HEIC.",
        warning: "HEIC's HDR and depth data may not fully transfer to JPG format.",
        screenshotAlt: "JPG download ready"
      }
    ],
    proTips: [
      "HEIC to JPG is essential for sharing Apple photos with non-Apple users",
      "Windows and Android devices can't natively view HEIC files",
      "Convert before uploading to websites or services that require JPG",
      "Batch convert your photo library for cross-platform accessibility"
    ],
    commonMistakes: [
      "Not checking if the recipient's device can view HEIC before sending",
      "Over-compressing iPhone photos meant for printing",
      "Deleting HEIC originals that contain additional depth/HDR data"
    ]
  },

  "heic-to-png": {
    slug: "heic-to-png",
    supportedFormats: ["HEIC", "HEIF"],
    maxFileSize: "50MB per image",
    processingNote: "2-5 seconds",
    privacyBehavior: "Browser processing",
    steps: [
      {
        step: 1,
        title: "Add HEIC Photo",
        description: "Upload your HEIC image from Apple devices. PNG conversion provides lossless quality preservation.",
        screenshotAlt: "HEIC upload area"
      },
      {
        step: 2,
        title: "Preview Content",
        description: "Check your photo in the preview. PNG will maintain perfect quality without compression artifacts.",
        screenshotAlt: "Photo preview panel"
      },
      {
        step: 3,
        title: "Convert Losslessly",
        description: "Process the conversion to PNG format. All visual quality from the HEIC is perfectly preserved.",
        tip: "PNG is larger than JPG but preserves quality for editing or archiving.",
        screenshotAlt: "Conversion progress"
      },
      {
        step: 4,
        title: "Save PNG File",
        description: "Download your losslessly converted PNG file, compatible with all devices and editing software.",
        screenshotAlt: "PNG download button"
      }
    ],
    proTips: [
      "Use PNG when you plan to edit the photo further—no quality loss",
      "PNG is better for screenshots within HEIC containers",
      "Larger file size than JPG but perfect for quality-critical uses",
      "PNG supports transparency if the HEIC contains any"
    ],
    commonMistakes: [
      "Using PNG when smaller JPG files would be acceptable",
      "Not considering storage implications of larger PNG files",
      "Expecting PNG to be smaller than the HEIC original"
    ]
  },

  "raw-to-jpg": {
    slug: "raw-to-jpg",
    supportedFormats: ["CR2", "NEF", "ARW", "DNG", "RAF", "ORF", "RW2"],
    maxFileSize: "100MB per file",
    processingNote: "5-15 seconds",
    privacyBehavior: "Local processing",
    steps: [
      {
        step: 1,
        title: "Upload RAW File",
        description: "Add your camera RAW file (CR2, NEF, ARW, DNG, etc.). RAW files contain maximum sensor data but need processing for sharing.",
        tip: "Different camera brands use different RAW formats—all common types are supported.",
        screenshotAlt: "RAW file upload"
      },
      {
        step: 2,
        title: "Preview Processed Image",
        description: "See the RAW data rendered as a viewable image. Basic development settings are applied automatically.",
        screenshotAlt: "RAW preview with basic processing"
      },
      {
        step: 3,
        title: "Set Output Quality",
        description: "Choose JPG quality for export. Professional work often uses 95%, while web sharing can use 80-85% effectively.",
        screenshotAlt: "Quality selection"
      },
      {
        step: 4,
        title: "Export JPG",
        description: "Download your processed and compressed JPG file, ready for sharing, printing, or uploading anywhere.",
        warning: "For professional editing, use dedicated RAW software—this tool provides quick conversion.",
        screenshotAlt: "JPG export complete"
      }
    ],
    proTips: [
      "Quick RAW to JPG conversion is useful for client previews",
      "Keep RAW files for full editing capability in Lightroom/Capture One",
      "Use 95% quality for prints, 85% for web galleries",
      "Batch convert when you need many RAW files as shareable JPGs quickly"
    ],
    commonMistakes: [
      "Deleting RAW files after conversion—RAW allows far more editing flexibility",
      "Expecting full color grading control in a basic converter",
      "Not using dedicated RAW software for professional color work"
    ]
  },

  "raw-to-png": {
    slug: "raw-to-png",
    supportedFormats: ["CR2", "NEF", "ARW", "DNG", "RAF", "ORF", "RW2"],
    maxFileSize: "100MB per file",
    processingNote: "5-15 seconds",
    privacyBehavior: "No external upload",
    steps: [
      {
        step: 1,
        title: "Load RAW Photo",
        description: "Upload your camera RAW file for lossless PNG conversion. Supports Canon, Nikon, Sony, Adobe DNG, and other RAW formats.",
        screenshotAlt: "RAW file selection"
      },
      {
        step: 2,
        title: "View Rendered Preview",
        description: "See your RAW data processed into a viewable image. Check that exposure and colors look acceptable.",
        screenshotAlt: "Rendered RAW preview"
      },
      {
        step: 3,
        title: "Process to PNG",
        description: "Convert your RAW file to PNG format with lossless compression. No quality is lost in the output file.",
        tip: "PNG files will be large—consider JPG if lossless quality isn't essential.",
        screenshotAlt: "Processing indicator"
      },
      {
        step: 4,
        title: "Download PNG",
        description: "Save your losslessly converted PNG file. Ideal for further editing in software that doesn't support RAW.",
        screenshotAlt: "PNG ready for download"
      }
    ],
    proTips: [
      "Use PNG when the destination software can't read RAW but you need lossless quality",
      "PNG is larger than JPG but preserves quality for additional editing steps",
      "Good intermediate format when moving between incompatible editing tools",
      "Keep original RAW for maximum flexibility in professional workflows"
    ],
    commonMistakes: [
      "Creating unnecessarily large PNG files when JPG would suffice",
      "Using this for professional color work instead of proper RAW software",
      "Expecting PNG to contain the same editing flexibility as RAW"
    ]
  },

  // ============================================
  // ADDITIONAL COMPRESSION TOOLS
  // ============================================

  "webp-compressor": {
    slug: "webp-compressor",
    supportedFormats: ["WebP"],
    maxFileSize: "50MB per image",
    processingNote: "1-4 seconds",
    privacyBehavior: "Client-side only",
    steps: [
      {
        step: 1,
        title: "Add WebP Image",
        description: "Upload your WebP file for additional compression. Even though WebP is already efficient, further optimization is often possible.",
        screenshotAlt: "WebP file upload"
      },
      {
        step: 2,
        title: "Choose Compression Mode",
        description: "Select lossy for maximum size reduction or lossless to maintain exact quality. Adjust the quality slider for lossy mode.",
        tip: "WebP lossy at 80% quality is often visually indistinguishable from 100%.",
        screenshotAlt: "Compression mode selection"
      },
      {
        step: 3,
        title: "Compare Results",
        description: "Preview the compressed version alongside the original. Check for acceptable quality before finalizing.",
        screenshotAlt: "Before/after comparison"
      },
      {
        step: 4,
        title: "Download Optimized",
        description: "Save your further-compressed WebP file with the new smaller size.",
        screenshotAlt: "Compressed WebP download"
      }
    ],
    proTips: [
      "Compress WebP files exported from other tools at unnecessarily high quality",
      "Use for WebP images received that are larger than needed",
      "Lossy recompression can introduce artifacts—use lossless when possible",
      "Target 80-90% quality for web use to balance size and quality"
    ],
    commonMistakes: [
      "Repeatedly compressing the same file, degrading quality each time",
      "Using lossy compression on already heavily compressed images",
      "Expecting significant reduction from already-optimized WebP files"
    ]
  },

  "gif-compressor": {
    slug: "gif-compressor",
    supportedFormats: ["GIF"],
    maxFileSize: "50MB per file",
    processingNote: "3-15 seconds (varies by animation)",
    privacyBehavior: "Local optimization",
    steps: [
      {
        step: 1,
        title: "Upload GIF File",
        description: "Add your GIF image or animation. Large animated GIFs especially benefit from compression optimization.",
        tip: "Animated GIFs with many frames compress more than static GIFs.",
        screenshotAlt: "GIF upload interface"
      },
      {
        step: 2,
        title: "Select Optimization Level",
        description: "Choose compression strength. Light optimization preserves quality; heavy optimization maximizes size reduction but may reduce smoothness.",
        screenshotAlt: "Optimization level slider"
      },
      {
        step: 3,
        title: "Preview Animated Result",
        description: "Watch the optimized GIF play to verify animation quality and smoothness remain acceptable.",
        warning: "Heavy compression may reduce frame count, affecting animation smoothness.",
        screenshotAlt: "Animated preview playback"
      },
      {
        step: 4,
        title: "Download Smaller GIF",
        description: "Save your compressed GIF file. Size reduction varies based on content complexity and chosen optimization level.",
        screenshotAlt: "Download with size comparison"
      }
    ],
    proTips: [
      "Reduce colors to 128 or 64 if visually acceptable for major size savings",
      "Remove duplicate frames that don't change between states",
      "Consider converting to video (MP4/WebM) for very large GIFs",
      "Crop and resize before compressing for maximum size reduction"
    ],
    commonMistakes: [
      "Over-compressing and creating visible dithering or banding",
      "Reducing frame rate too much, making animation choppy",
      "Using GIF for photographic content where video would be better"
    ]
  },

  "tiff-compressor": {
    slug: "tiff-compressor",
    supportedFormats: ["TIFF", "TIF"],
    maxFileSize: "100MB per file",
    processingNote: "3-10 seconds",
    privacyBehavior: "Browser processing",
    steps: [
      {
        step: 1,
        title: "Upload TIFF File",
        description: "Add your TIFF image for compression. TIFF supports various compression schemes, allowing size reduction while staying in TIFF format.",
        screenshotAlt: "TIFF file upload"
      },
      {
        step: 2,
        title: "Select Compression Type",
        description: "Choose LZW for lossless general use, ZIP for best lossless compression, or JPEG for lossy but smallest size.",
        tip: "LZW compression is universally supported and lossless.",
        screenshotAlt: "Compression type selection"
      },
      {
        step: 3,
        title: "Process Compression",
        description: "Apply the selected compression to your TIFF file. Lossless options preserve exact image data.",
        screenshotAlt: "Compression progress"
      },
      {
        step: 4,
        title: "Download Compressed TIFF",
        description: "Save your smaller TIFF file. It remains in TIFF format for compatibility with professional software.",
        screenshotAlt: "Compressed TIFF ready"
      }
    ],
    proTips: [
      "LZW compression works well for graphics and screenshots",
      "Use ZIP compression for maximum lossless reduction",
      "JPEG compression within TIFF creates smallest files but is lossy",
      "Compressed TIFFs remain compatible with professional software"
    ],
    commonMistakes: [
      "Using JPEG compression when lossless quality is required",
      "Expecting compression to match JPG file sizes",
      "Not verifying that the compressed TIFF opens correctly in target software"
    ]
  },

  // ============================================
  // ADDITIONAL RESIZE TOOLS
  // ============================================

  "fit-to-width": {
    slug: "fit-to-width",
    supportedFormats: ["JPG", "PNG", "WebP", "GIF", "BMP"],
    maxFileSize: "50MB per image",
    processingNote: "Instant",
    privacyBehavior: "No uploads",
    steps: [
      {
        step: 1,
        title: "Add Your Image",
        description: "Upload the image you need to resize to a specific width. The height will adjust automatically to maintain proportions.",
        screenshotAlt: "Image upload showing original dimensions"
      },
      {
        step: 2,
        title: "Enter Target Width",
        description: "Type the exact width in pixels you need. The tool calculates the proportional height automatically.",
        tip: "Common widths: 800px (blog), 1200px (social), 1920px (full HD).",
        screenshotAlt: "Width input with calculated height shown"
      },
      {
        step: 3,
        title: "Preview New Size",
        description: "See the calculated dimensions before applying. Verify the new size meets your requirements.",
        screenshotAlt: "Dimension preview"
      },
      {
        step: 4,
        title: "Resize and Download",
        description: "Apply the resize and download your image at the new width with perfectly maintained aspect ratio.",
        screenshotAlt: "Resized image download"
      }
    ],
    proTips: [
      "Use for creating consistent column widths in blog layouts",
      "Resize product images to match your e-commerce template width",
      "Create social media images at platform-specific widths",
      "Aspect ratio is preserved automatically—no stretching"
    ],
    commonMistakes: [
      "Entering width larger than original, causing quality loss",
      "Not considering that height changes proportionally",
      "Forgetting to check the final dimensions meet platform requirements"
    ]
  },

  "fit-to-height": {
    slug: "fit-to-height",
    supportedFormats: ["JPG", "PNG", "WebP", "GIF", "BMP"],
    maxFileSize: "50MB per image",
    processingNote: "Instant",
    privacyBehavior: "Local only",
    steps: [
      {
        step: 1,
        title: "Upload Image",
        description: "Add the image to resize based on height. Width adjusts proportionally to prevent distortion.",
        screenshotAlt: "Image upload interface"
      },
      {
        step: 2,
        title: "Set Target Height",
        description: "Enter your desired height in pixels. The width is calculated automatically to maintain aspect ratio.",
        tip: "Useful for matching row heights in galleries or grid layouts.",
        screenshotAlt: "Height input with auto-calculated width"
      },
      {
        step: 3,
        title: "Review Dimensions",
        description: "Check that the resulting width works for your layout before applying the resize.",
        screenshotAlt: "Dimension preview display"
      },
      {
        step: 4,
        title: "Apply and Save",
        description: "Execute the resize and download your height-constrained image with preserved proportions.",
        screenshotAlt: "Download ready"
      }
    ],
    proTips: [
      "Use for creating uniform row heights in masonry galleries",
      "Match heights for side-by-side image comparisons",
      "Create consistent thumbnail strips with matching heights",
      "Combine with cropping for exact dimensions when needed"
    ],
    commonMistakes: [
      "Expecting both dimensions to be exact—width will vary based on aspect ratio",
      "Enlarging small images beyond their quality limit",
      "Not cropping when exact width AND height are both required"
    ]
  },

  "fit-to-box": {
    slug: "fit-to-box",
    supportedFormats: ["JPG", "PNG", "WebP", "GIF", "BMP"],
    maxFileSize: "50MB per image",
    processingNote: "Instant",
    privacyBehavior: "Client-side",
    steps: [
      {
        step: 1,
        title: "Load Image",
        description: "Upload the image to fit within maximum dimensions. The image resizes to fit entirely within the specified box.",
        screenshotAlt: "Image upload"
      },
      {
        step: 2,
        title: "Set Box Dimensions",
        description: "Enter maximum width and height. The image scales to fit entirely within these bounds while maintaining aspect ratio.",
        tip: "Image won't exceed either dimension—it fits completely inside the box.",
        screenshotAlt: "Width and height box inputs"
      },
      {
        step: 3,
        title: "Preview Fit",
        description: "See how your image fits within the box. One dimension matches the limit; the other may be smaller.",
        screenshotAlt: "Fit preview visualization"
      },
      {
        step: 4,
        title: "Download Fitted Image",
        description: "Save your image that fits completely within the specified maximum dimensions.",
        screenshotAlt: "Download button"
      }
    ],
    proTips: [
      "Perfect for thumbnail generation with maximum size constraints",
      "Use for email signatures with size limits on both dimensions",
      "Ensure images fit within app containers without overflow",
      "Combine with padding if you need exact box dimensions as output"
    ],
    commonMistakes: [
      "Expecting both dimensions to match—only one will match, other will be smaller",
      "Confusing 'fit' with 'fill'—fit contains the whole image, fill might crop",
      "Setting box smaller than needed and losing detail"
    ]
  },

  // ============================================
  // ADDITIONAL CROP TOOLS
  // ============================================

  "aspect-ratio-crop": {
    slug: "aspect-ratio-crop",
    supportedFormats: ["JPG", "PNG", "WebP", "GIF", "BMP"],
    maxFileSize: "50MB per image",
    processingNote: "Real-time preview",
    privacyBehavior: "Browser only",
    steps: [
      {
        step: 1,
        title: "Upload Your Photo",
        description: "Add the image you need to crop to a specific aspect ratio. Common ratios include 16:9, 4:3, 1:1, and 9:16.",
        screenshotAlt: "Image upload for ratio cropping"
      },
      {
        step: 2,
        title: "Select Aspect Ratio",
        description: "Choose from preset ratios (16:9, 4:3, 1:1, 3:2) or enter a custom ratio. The crop box locks to this ratio.",
        tip: "16:9 for YouTube thumbnails, 1:1 for Instagram, 9:16 for Stories.",
        screenshotAlt: "Ratio selection dropdown"
      },
      {
        step: 3,
        title: "Position Crop Box",
        description: "Drag and resize the locked-ratio crop box to frame your subject perfectly within the constraint.",
        screenshotAlt: "Crop box positioned on image"
      },
      {
        step: 4,
        title: "Crop and Save",
        description: "Apply the crop to get your perfectly ratio-constrained image ready for its intended platform.",
        screenshotAlt: "Cropped image download"
      }
    ],
    proTips: [
      "Use 16:9 for video thumbnails and widescreen displays",
      "1:1 square crop works for most social media profile pictures",
      "4:5 is Instagram's preferred portrait ratio",
      "Match the ratio to your final display context"
    ],
    commonMistakes: [
      "Using the wrong ratio for the target platform",
      "Cropping too tightly and cutting off important elements",
      "Not considering mobile vs. desktop display ratios"
    ]
  },

  "square-crop": {
    slug: "square-crop",
    supportedFormats: ["JPG", "PNG", "WebP", "GIF", "BMP"],
    maxFileSize: "50MB per image",
    processingNote: "Instant",
    privacyBehavior: "Local processing",
    steps: [
      {
        step: 1,
        title: "Add Image",
        description: "Upload the photo you want to crop to a perfect square (1:1 ratio). Ideal for profile pictures and social media.",
        screenshotAlt: "Image upload for square crop"
      },
      {
        step: 2,
        title: "Position Square Selection",
        description: "A square crop overlay appears. Drag to reposition and resize to capture the best square portion of your image.",
        tip: "Center faces in portraits for balanced profile pictures.",
        screenshotAlt: "Square overlay on image"
      },
      {
        step: 3,
        title: "Adjust Size",
        description: "Resize the square selection to include more or less of the original image while maintaining perfect 1:1 proportions.",
        screenshotAlt: "Resize handles on square"
      },
      {
        step: 4,
        title: "Create Square Image",
        description: "Apply the crop and download your perfectly square image.",
        screenshotAlt: "Square crop result"
      }
    ],
    proTips: [
      "Square format works on nearly all social platforms",
      "Position the subject slightly off-center for visual interest",
      "Use for consistent product photo grids in e-commerce",
      "Profile pictures typically look best with the face centered"
    ],
    commonMistakes: [
      "Cutting off the top of heads in portrait square crops",
      "Making the square too small and losing important context",
      "Not considering that some platforms may add circular masking"
    ]
  },

  "free-selection-crop": {
    slug: "free-selection-crop",
    supportedFormats: ["JPG", "PNG", "WebP"],
    maxFileSize: "50MB per image",
    processingNote: "Real-time",
    privacyBehavior: "Fully local",
    steps: [
      {
        step: 1,
        title: "Upload Image",
        description: "Add the image for free-form cropping. This tool allows irregular crop shapes, not just rectangles.",
        screenshotAlt: "Image upload"
      },
      {
        step: 2,
        title: "Draw Selection",
        description: "Use the lasso or polygon tool to draw around the area you want to keep. Click points to create your selection boundary.",
        tip: "Take your time with the selection—accuracy matters for clean results.",
        screenshotAlt: "Polygon selection being drawn"
      },
      {
        step: 3,
        title: "Refine Edges",
        description: "Adjust individual points of your selection to fine-tune the boundary. Add or remove points as needed.",
        screenshotAlt: "Point adjustment on selection"
      },
      {
        step: 4,
        title: "Crop with Transparency",
        description: "Apply the crop. Areas outside your selection become transparent (requires PNG output for transparency).",
        warning: "Export as PNG to preserve transparency. JPG will add a background color.",
        screenshotAlt: "Free-form cropped result"
      }
    ],
    proTips: [
      "Use for cutting out subjects from backgrounds",
      "Create stickers and irregular-shaped graphics",
      "Export as PNG to maintain transparent edges",
      "Zoom in for precise selection around detailed edges"
    ],
    commonMistakes: [
      "Exporting as JPG and losing the transparent background",
      "Rushing the selection and getting jagged edges",
      "Not zooming in enough for detailed selections"
    ]
  },

  // ============================================
  // ADDITIONAL ROTATE/FLIP TOOLS
  // ============================================

  "rotate-180": {
    slug: "rotate-180",
    supportedFormats: ["JPG", "PNG", "WebP", "GIF", "BMP", "TIFF"],
    maxFileSize: "50MB per image",
    processingNote: "Instant",
    privacyBehavior: "Local only",
    steps: [
      {
        step: 1,
        title: "Upload Upside-Down Image",
        description: "Add the image that needs to be flipped completely around. This is common with scanned photos placed incorrectly.",
        screenshotAlt: "Inverted image upload"
      },
      {
        step: 2,
        title: "Apply 180° Rotation",
        description: "Click the rotate button to flip the image completely upside-down—or right-side up if it was inverted.",
        tip: "This is equivalent to both a vertical and horizontal flip combined.",
        screenshotAlt: "Rotation applied"
      },
      {
        step: 3,
        title: "Verify Orientation",
        description: "Check that the image now displays correctly oriented. The top is now the bottom and vice versa.",
        screenshotAlt: "Correctly oriented image"
      },
      {
        step: 4,
        title: "Save Corrected Image",
        description: "Download your properly oriented image file.",
        screenshotAlt: "Download button"
      }
    ],
    proTips: [
      "Use for scanned documents placed upside-down on the scanner",
      "Fix photos taken with the camera held upside-down",
      "Corrects images from cameras with faulty orientation sensors",
      "Creates mirror-opposite effect (left-right AND up-down swap)"
    ],
    commonMistakes: [
      "Confusing 180° rotation with horizontal or vertical flip only",
      "Using 180° when only 90° rotation was needed",
      "Not checking if the original auto-orientation was just disabled"
    ]
  },

  "rotate-270": {
    slug: "rotate-270",
    supportedFormats: ["JPG", "PNG", "WebP", "GIF", "BMP", "TIFF"],
    maxFileSize: "50MB per image",
    processingNote: "Instant",
    privacyBehavior: "No data sent",
    steps: [
      {
        step: 1,
        title: "Add Rotated Image",
        description: "Upload the image that needs 270° clockwise rotation (same as 90° counter-clockwise).",
        screenshotAlt: "Image needing rotation"
      },
      {
        step: 2,
        title: "Rotate 270 Degrees",
        description: "Apply the rotation to turn the image three-quarters of the way around clockwise.",
        tip: "270° clockwise = 90° counter-clockwise—same result, different direction.",
        screenshotAlt: "Rotation controls"
      },
      {
        step: 3,
        title: "Check Result",
        description: "Verify the image orientation is now correct. The original right side is now at the top.",
        screenshotAlt: "Rotated result preview"
      },
      {
        step: 4,
        title: "Download Image",
        description: "Save your correctly oriented image file.",
        screenshotAlt: "Download interface"
      }
    ],
    proTips: [
      "Use when 90° clockwise was the wrong direction",
      "Quicker than clicking 90° three times for the same result",
      "Width and height dimensions swap (like any 90° rotation)",
      "Common fix for phone photos with incorrect orientation tags"
    ],
    commonMistakes: [
      "Confusing rotation direction with flip direction",
      "Not realizing 270° clockwise = 90° counter-clockwise",
      "Forgetting that rotated images have swapped width/height"
    ]
  },

  "custom-rotate": {
    slug: "custom-rotate",
    supportedFormats: ["JPG", "PNG", "WebP"],
    maxFileSize: "50MB per image",
    processingNote: "Real-time preview",
    privacyBehavior: "Browser-based",
    steps: [
      {
        step: 1,
        title: "Upload Image",
        description: "Add the image that needs rotation by a specific angle. This tool allows any rotation from 0° to 360°.",
        screenshotAlt: "Image upload for custom rotation"
      },
      {
        step: 2,
        title: "Set Rotation Angle",
        description: "Enter the exact degree of rotation or use the slider for visual adjustment. Preview updates in real-time.",
        tip: "Small angles (1-5°) are perfect for straightening crooked photos.",
        screenshotAlt: "Angle slider and input"
      },
      {
        step: 3,
        title: "Choose Background Handling",
        description: "Decide how to handle the empty corners created by rotation: transparent, color fill, or auto-crop to hide them.",
        screenshotAlt: "Background options"
      },
      {
        step: 4,
        title: "Apply and Download",
        description: "Finalize the rotation and download your precisely angled image.",
        warning: "Non-90° rotations may slightly reduce quality due to pixel interpolation.",
        screenshotAlt: "Rotated image ready"
      }
    ],
    proTips: [
      "Use for straightening horizon lines in landscape photos",
      "Small angle adjustments (1-3°) fix slightly crooked scans",
      "Choose transparent background for layered compositions",
      "Auto-crop removes empty corners but reduces image area"
    ],
    commonMistakes: [
      "Over-rotating and making the image look tilted the other direction",
      "Not considering the empty corners created by non-90° rotations",
      "Using custom rotation when simple 90° increments would work"
    ]
  },

  "flip-vertical": {
    slug: "flip-vertical",
    supportedFormats: ["JPG", "PNG", "WebP", "GIF", "BMP"],
    maxFileSize: "50MB per image",
    processingNote: "Instant",
    privacyBehavior: "Local processing",
    steps: [
      {
        step: 1,
        title: "Upload Image",
        description: "Add the image you want to flip vertically (mirror along the horizontal axis). Top becomes bottom, bottom becomes top.",
        screenshotAlt: "Image for vertical flip"
      },
      {
        step: 2,
        title: "Apply Vertical Flip",
        description: "Click to flip the image upside-down while keeping left and right sides in their original positions.",
        tip: "Different from 180° rotation—text would still read left-to-right after vertical flip.",
        screenshotAlt: "Vertical flip applied"
      },
      {
        step: 3,
        title: "Compare Results",
        description: "Toggle between original and flipped versions to verify the flip achieves your intended result.",
        screenshotAlt: "Before/after comparison"
      },
      {
        step: 4,
        title: "Download Flipped Image",
        description: "Save your vertically mirrored image file.",
        warning: "Text and logos will appear upside-down—this is expected behavior.",
        screenshotAlt: "Download button"
      }
    ],
    proTips: [
      "Use for creating reflection effects below objects",
      "Fix images scanned face-down that came out inverted",
      "Create symmetrical designs by combining with original",
      "Different from rotation—horizontal axis is the mirror line"
    ],
    commonMistakes: [
      "Confusing vertical flip with horizontal flip—different results",
      "Expecting text to remain readable after vertical flip",
      "Using vertical flip when 180° rotation was actually needed"
    ]
  },

  "mirror-effect": {
    slug: "mirror-effect",
    supportedFormats: ["JPG", "PNG", "WebP"],
    maxFileSize: "50MB per image",
    processingNote: "1-3 seconds",
    privacyBehavior: "Fully local",
    steps: [
      {
        step: 1,
        title: "Add Base Image",
        description: "Upload the image to create a mirror reflection effect. The tool duplicates and flips to create symmetrical compositions.",
        screenshotAlt: "Base image upload"
      },
      {
        step: 2,
        title: "Choose Mirror Direction",
        description: "Select horizontal (left-right reflection) or vertical (top-bottom reflection) mirroring style.",
        tip: "Horizontal creates side-by-side symmetry; vertical creates reflection below like water.",
        screenshotAlt: "Direction selection"
      },
      {
        step: 3,
        title: "Adjust Blend and Fade",
        description: "Configure how the reflection blends with the original. Add fade effects for realistic water-like reflections.",
        screenshotAlt: "Blend and fade controls"
      },
      {
        step: 4,
        title: "Generate and Save",
        description: "Create your mirror effect composition and download the combined image.",
        screenshotAlt: "Mirror effect result"
      }
    ],
    proTips: [
      "Add fade to vertical mirrors for realistic water reflection look",
      "Horizontal mirrors create interesting architectural symmetry",
      "Combine with color adjustment on the reflection for depth",
      "Use solid-color backgrounds for cleanest symmetry effects"
    ],
    commonMistakes: [
      "Not adding fade to reflections, making them look artificial",
      "Creating overly busy compositions by mirroring complex images",
      "Forgetting that the final image will be twice as large in one dimension"
    ]
  },

  // ============================================
  // ADDITIONAL WATERMARK TOOLS
  // ============================================

  "image-watermark": {
    slug: "image-watermark",
    supportedFormats: ["JPG", "PNG", "WebP"],
    maxFileSize: "50MB per image",
    processingNote: "Instant preview",
    privacyBehavior: "No data transmission",
    steps: [
      {
        step: 1,
        title: "Upload Main Image",
        description: "Add the photo you want to watermark. This is the image that will display your logo or watermark graphic.",
        screenshotAlt: "Main image upload"
      },
      {
        step: 2,
        title: "Add Watermark Logo",
        description: "Upload your logo or watermark image. PNG with transparent background works best for professional results.",
        tip: "Use PNG logos with transparency for seamless integration.",
        screenshotAlt: "Logo upload interface"
      },
      {
        step: 3,
        title: "Position and Size",
        description: "Drag to position the watermark and resize using corner handles. Place where cropping would be difficult.",
        screenshotAlt: "Watermark positioning"
      },
      {
        step: 4,
        title: "Adjust Opacity",
        description: "Set transparency level. 30-50% creates subtle branding while remaining visible.",
        screenshotAlt: "Opacity slider"
      },
      {
        step: 5,
        title: "Apply Watermark",
        description: "Finalize and download your branded image with the watermark permanently embedded.",
        warning: "Watermark is permanent—keep original unwatermarked versions for editing.",
        screenshotAlt: "Final watermarked image"
      }
    ],
    proTips: [
      "Use your logo PNG with transparency for professional watermarks",
      "Position over important areas that are hard to crop out",
      "Lower opacity looks more professional than full opacity",
      "Consider tiled pattern for maximum protection"
    ],
    commonMistakes: [
      "Using JPEG logos that have white boxes instead of transparency",
      "Placing watermarks in corners where they're easily cropped",
      "Making watermarks too large or too opaque, ruining the image"
    ]
  },

  // ============================================
  // IMAGE COMBINE TOOLS
  // ============================================

  "merge-horizontally": {
    slug: "merge-horizontally",
    supportedFormats: ["JPG", "PNG", "WebP", "GIF"],
    maxFileSize: "50MB total",
    processingNote: "2-5 seconds",
    privacyBehavior: "Browser-only",
    steps: [
      {
        step: 1,
        title: "Add First Image",
        description: "Upload the leftmost image in your horizontal merge. This will appear on the left side of the final composition.",
        screenshotAlt: "First image upload"
      },
      {
        step: 2,
        title: "Add Additional Images",
        description: "Upload more images to place side-by-side. Drag to reorder their left-to-right sequence.",
        tip: "Images with matching heights create the cleanest horizontal joins.",
        screenshotAlt: "Multiple image uploads"
      },
      {
        step: 3,
        title: "Configure Alignment",
        description: "Choose how to handle height differences: align top, center, or bottom. Add optional spacing between images.",
        screenshotAlt: "Alignment options"
      },
      {
        step: 4,
        title: "Merge Images",
        description: "Combine all images into a single horizontal strip and download the merged result.",
        screenshotAlt: "Merged horizontal image"
      }
    ],
    proTips: [
      "Match image heights beforehand for seamless joins",
      "Use for creating panorama-style compilations",
      "Add consistent spacing for gallery-style presentations",
      "Center alignment works best for mixed-height images"
    ],
    commonMistakes: [
      "Merging images with vastly different heights without adjustment",
      "Forgetting to check left-to-right order before merging",
      "Creating extremely wide images that are hard to display"
    ]
  },

  "merge-vertically": {
    slug: "merge-vertically",
    supportedFormats: ["JPG", "PNG", "WebP", "GIF"],
    maxFileSize: "50MB total",
    processingNote: "2-5 seconds",
    privacyBehavior: "Local processing",
    steps: [
      {
        step: 1,
        title: "Upload Top Image",
        description: "Add the image that will appear at the top of your vertical stack.",
        screenshotAlt: "Top image upload"
      },
      {
        step: 2,
        title: "Add More Images",
        description: "Upload additional images to stack below. Drag to reorder their top-to-bottom sequence.",
        tip: "Matching widths creates the cleanest vertical joins.",
        screenshotAlt: "Additional image uploads"
      },
      {
        step: 3,
        title: "Set Alignment",
        description: "Choose how to handle width differences: align left, center, or right. Add optional gaps between images.",
        screenshotAlt: "Alignment configuration"
      },
      {
        step: 4,
        title: "Stack and Download",
        description: "Combine all images into a single vertical strip and save the merged result.",
        screenshotAlt: "Vertical merged result"
      }
    ],
    proTips: [
      "Great for creating long infographics from sections",
      "Use for mobile-friendly content that scrolls vertically",
      "Center alignment handles mixed widths gracefully",
      "Add divider images between sections for visual separation"
    ],
    commonMistakes: [
      "Stacking images with different widths without alignment consideration",
      "Creating extremely tall images that are impractical to view",
      "Forgetting to check top-to-bottom order before merging"
    ]
  },

  "collage-maker": {
    slug: "collage-maker",
    supportedFormats: ["JPG", "PNG", "WebP"],
    maxFileSize: "50MB total",
    processingNote: "3-10 seconds",
    privacyBehavior: "No uploads required",
    steps: [
      {
        step: 1,
        title: "Upload Collage Photos",
        description: "Add 2-9 photos for your collage. The tool arranges them into attractive grid layouts automatically.",
        tip: "Select photos with similar color tones for cohesive collages.",
        screenshotAlt: "Multiple photo upload"
      },
      {
        step: 2,
        title: "Choose Layout",
        description: "Select from grid, freestyle, or themed layout templates. Each layout positions your photos differently.",
        screenshotAlt: "Layout template selection"
      },
      {
        step: 3,
        title: "Adjust Individual Photos",
        description: "Drag photos to swap positions. Resize or crop individual images within their frames as needed.",
        screenshotAlt: "Photo adjustment interface"
      },
      {
        step: 4,
        title: "Customize Style",
        description: "Set border width, spacing, background color, and rounded corners for your collage style.",
        screenshotAlt: "Style customization options"
      },
      {
        step: 5,
        title: "Generate Collage",
        description: "Create and download your completed photo collage ready for sharing.",
        screenshotAlt: "Completed collage"
      }
    ],
    proTips: [
      "Use 3-4 photos for clean, focused collages",
      "Consistent lighting across photos creates professional results",
      "Add subtle borders between photos for defined separation",
      "Square output dimensions work best for social media"
    ],
    commonMistakes: [
      "Including too many photos, making each one too small to appreciate",
      "Mixing very different photo styles that clash visually",
      "Using busy backgrounds that compete with the photos"
    ]
  },

  "before-after-maker": {
    slug: "before-after-maker",
    supportedFormats: ["JPG", "PNG", "WebP"],
    maxFileSize: "50MB per image",
    processingNote: "2-5 seconds",
    privacyBehavior: "Client-side only",
    steps: [
      {
        step: 1,
        title: "Upload 'Before' Image",
        description: "Add the original 'before' state image. This typically appears on the left side of the comparison.",
        screenshotAlt: "Before image upload"
      },
      {
        step: 2,
        title: "Upload 'After' Image",
        description: "Add the transformed 'after' state image. For best results, use images with matching dimensions and angles.",
        tip: "Same camera angle and lighting makes comparisons more impactful.",
        screenshotAlt: "After image upload"
      },
      {
        step: 3,
        title: "Choose Comparison Style",
        description: "Select side-by-side, slider overlay, or fade transition style for presenting the before/after.",
        screenshotAlt: "Comparison style options"
      },
      {
        step: 4,
        title: "Add Labels (Optional)",
        description: "Include 'Before' and 'After' text labels to clearly identify each version.",
        screenshotAlt: "Label customization"
      },
      {
        step: 5,
        title: "Create Comparison",
        description: "Generate your before/after comparison image and download it for presentations or social sharing.",
        screenshotAlt: "Final comparison image"
      }
    ],
    proTips: [
      "Match camera angles and lighting for fair comparisons",
      "Side-by-side works best for dramatic transformations",
      "Slider style engages viewers with interactive reveals",
      "Label clearly—don't assume viewers know which is which"
    ],
    commonMistakes: [
      "Using different angles that make comparison unfair",
      "Swapping before/after positions causing confusion",
      "Not matching image dimensions, creating misaligned comparisons"
    ]
  },

  // ============================================
  // METADATA TOOLS (expanded)
  // ============================================

  "view-exif": {
    slug: "view-exif",
    supportedFormats: ["JPG", "PNG", "WebP", "TIFF", "HEIC"],
    maxFileSize: "50MB per image",
    processingNote: "Instant",
    privacyBehavior: "Never transmitted",
    steps: [
      {
        step: 1,
        title: "Upload Photo",
        description: "Add an image to view its complete EXIF metadata. Camera photos contain the most extensive information.",
        screenshotAlt: "Image upload for EXIF viewing"
      },
      {
        step: 2,
        title: "Browse Camera Data",
        description: "See camera make/model, lens info, shutter speed, aperture, ISO, and other capture settings.",
        tip: "Study EXIF from photos you admire to learn what settings create great shots.",
        screenshotAlt: "Camera EXIF data display"
      },
      {
        step: 3,
        title: "Check Location Data",
        description: "If present, view GPS coordinates where the photo was taken. See the location plotted on a map.",
        warning: "GPS data can reveal private locations—be aware before sharing photos.",
        screenshotAlt: "GPS map view"
      },
      {
        step: 4,
        title: "Export Metadata Report",
        description: "Download a text summary of all metadata for documentation or analysis purposes.",
        screenshotAlt: "Metadata export option"
      }
    ],
    proTips: [
      "Learn photography by studying EXIF from successful shots",
      "Verify photo authenticity by checking capture dates",
      "Check GPS before sharing to protect location privacy",
      "Some social platforms strip metadata—original files contain more"
    ],
    commonMistakes: [
      "Assuming all images have EXIF—many don't, especially edited ones",
      "Sharing photos without checking embedded GPS coordinates",
      "Expecting metadata from social media downloads—usually stripped"
    ]
  },

  "remove-exif": {
    slug: "remove-exif",
    supportedFormats: ["JPG", "PNG", "WebP", "TIFF"],
    maxFileSize: "50MB per image",
    processingNote: "Instant",
    privacyBehavior: "Local processing",
    steps: [
      {
        step: 1,
        title: "Upload Image",
        description: "Add the photo containing metadata you want to remove. View current metadata before stripping.",
        screenshotAlt: "Image upload with metadata preview"
      },
      {
        step: 2,
        title: "Choose What to Remove",
        description: "Select all metadata, or specifically GPS, camera info, or timestamps. Selective removal lets you keep useful data.",
        tip: "Remove GPS for privacy while keeping timestamps for organization.",
        screenshotAlt: "Removal options"
      },
      {
        step: 3,
        title: "Preview Clean Image",
        description: "Verify which metadata will remain after stripping. Confirm settings are correct before processing.",
        screenshotAlt: "Before/after metadata comparison"
      },
      {
        step: 4,
        title: "Download Clean Image",
        description: "Save your privacy-protected image with selected metadata removed. Image quality is unchanged.",
        warning: "Metadata removal is permanent—keep originals if you need the data later.",
        screenshotAlt: "Clean image download"
      }
    ],
    proTips: [
      "Always strip GPS from photos shared publicly online",
      "Remove all metadata when selling stock photos",
      "Keep timestamps if you organize photos by date",
      "Batch process multiple images for efficiency"
    ],
    commonMistakes: [
      "Removing all metadata when only GPS needed stripping",
      "Not keeping original files with full metadata for personal archives",
      "Forgetting to process all images before sharing a batch"
    ]
  },

  // ============================================
  // SECURITY TOOLS
  // ============================================

  "manual-face-blur": {
    slug: "manual-face-blur",
    supportedFormats: ["JPG", "PNG", "WebP"],
    maxFileSize: "50MB per image",
    processingNote: "Real-time",
    privacyBehavior: "Processed locally",
    steps: [
      {
        step: 1,
        title: "Upload Image",
        description: "Add the photo containing faces you want to blur for privacy protection.",
        screenshotAlt: "Image upload"
      },
      {
        step: 2,
        title: "Select Faces to Blur",
        description: "Click or draw over each face area you want to obscure. Create circular or rectangular blur regions.",
        tip: "Cover the entire face area including distinctive features for effective anonymization.",
        screenshotAlt: "Face selection interface"
      },
      {
        step: 3,
        title: "Adjust Blur Intensity",
        description: "Set how strong the blur effect should be. Higher intensity provides more privacy but creates a more obvious effect.",
        screenshotAlt: "Blur intensity slider"
      },
      {
        step: 4,
        title: "Save Protected Image",
        description: "Download your image with faces blurred for privacy-compliant sharing.",
        warning: "Blur is permanent—keep unblurred originals for personal archives.",
        screenshotAlt: "Blurred image ready"
      }
    ],
    proTips: [
      "Use circular blur regions for face shapes",
      "Higher blur for complete anonymity, lower for subtle privacy",
      "Cover ears and unique hairstyles for thorough protection",
      "Test by zooming in to ensure features aren't recognizable"
    ],
    commonMistakes: [
      "Blurring too small an area, leaving recognizable features visible",
      "Using too light a blur that can be reversed with software",
      "Forgetting about reflective surfaces that might show faces"
    ]
  },

  "hide-area": {
    slug: "hide-area",
    supportedFormats: ["JPG", "PNG", "WebP"],
    maxFileSize: "50MB per image",
    processingNote: "Instant",
    privacyBehavior: "No data transmission",
    steps: [
      {
        step: 1,
        title: "Add Image",
        description: "Upload the image containing sensitive information you need to hide—like license plates, addresses, or personal data.",
        screenshotAlt: "Image with sensitive data"
      },
      {
        step: 2,
        title: "Draw Over Sensitive Areas",
        description: "Click and drag to create solid blocks over information you want to hide. Create multiple rectangles as needed.",
        tip: "Solid blocks are more secure than blur—impossible to reverse.",
        screenshotAlt: "Drawing hide boxes"
      },
      {
        step: 3,
        title: "Choose Cover Style",
        description: "Select solid color (most secure), pixelation, or blur for the hidden areas. Pick a color that looks natural.",
        screenshotAlt: "Cover style options"
      },
      {
        step: 4,
        title: "Download Censored Image",
        description: "Save your image with sensitive areas permanently hidden.",
        warning: "Hidden data is permanently removed—cannot be recovered from the saved file.",
        screenshotAlt: "Censored image download"
      }
    ],
    proTips: [
      "Solid black or matching background color looks most natural",
      "Solid fills are impossible to reverse unlike blur",
      "Cover slightly beyond the sensitive data boundaries",
      "Check for reflections or shadows that might reveal hidden info"
    ],
    commonMistakes: [
      "Using semi-transparent overlays that can be seen through",
      "Missing secondary instances of sensitive data in the image",
      "Using colors that draw attention to the hidden areas"
    ]
  },

  "image-encrypt": {
    slug: "image-encrypt",
    supportedFormats: ["JPG", "PNG", "WebP", "GIF", "BMP"],
    maxFileSize: "50MB per image",
    processingNote: "2-5 seconds",
    privacyBehavior: "All local—zero transmission",
    steps: [
      {
        step: 1,
        title: "Select Image to Protect",
        description: "Upload the image you want to encrypt. The encryption makes the image completely unviewable without the password.",
        screenshotAlt: "Image selection for encryption"
      },
      {
        step: 2,
        title: "Create Strong Password",
        description: "Enter a password for encryption. Use a strong, unique password you can remember—it cannot be recovered if lost.",
        warning: "If you forget the password, the image cannot be decrypted. There is no recovery option.",
        screenshotAlt: "Password entry field"
      },
      {
        step: 3,
        title: "Encrypt Image",
        description: "Process the encryption using AES-256, the same standard used by governments and banks.",
        tip: "AES-256 encryption is virtually unbreakable with current technology.",
        screenshotAlt: "Encryption progress"
      },
      {
        step: 4,
        title: "Download Encrypted File",
        description: "Save your encrypted image. It appears as random noise and requires the password plus this tool to decrypt.",
        screenshotAlt: "Encrypted file download"
      }
    ],
    proTips: [
      "Use unique passwords for different images",
      "Store passwords separately from encrypted files",
      "Encrypted files can be safely stored in cloud storage",
      "Keep unencrypted backups in secure locations"
    ],
    commonMistakes: [
      "Using simple, guessable passwords",
      "Forgetting the password with no backup",
      "Storing password and encrypted file together"
    ]
  },

  "image-decrypt": {
    slug: "image-decrypt",
    supportedFormats: ["Encrypted Image Files"],
    maxFileSize: "50MB per file",
    processingNote: "2-5 seconds",
    privacyBehavior: "Local decryption",
    steps: [
      {
        step: 1,
        title: "Upload Encrypted Image",
        description: "Add the encrypted image file you want to decrypt. It will appear as random noise or solid color until decrypted.",
        screenshotAlt: "Encrypted file upload"
      },
      {
        step: 2,
        title: "Enter Decryption Password",
        description: "Type the exact password used during encryption. Passwords are case-sensitive and must match exactly.",
        tip: "Double-check caps lock and special characters in your password.",
        screenshotAlt: "Password entry"
      },
      {
        step: 3,
        title: "Decrypt Image",
        description: "Process the decryption. If the password is correct, your original image will be restored.",
        warning: "Wrong passwords will fail decryption—there is no 'close enough' matching.",
        screenshotAlt: "Decryption progress"
      },
      {
        step: 4,
        title: "Download Original Image",
        description: "Save your decrypted image, now restored to its original viewable state.",
        screenshotAlt: "Decrypted image ready"
      }
    ],
    proTips: [
      "Try common password variations if initial attempt fails",
      "Check for accidental spaces before or after the password",
      "Encryption uses the same password for decrypt—no separate keys",
      "Keep a password manager to avoid losing access to files"
    ],
    commonMistakes: [
      "Entering password with incorrect capitalization",
      "Including extra spaces that weren't in the original password",
      "Trying to decrypt files encrypted with different tools"
    ]
  },

  // ============================================
  // QR TOOLS (expanded)
  // ============================================

  "image-to-qr-code": {
    slug: "image-to-qr-code",
    supportedFormats: ["URL/Text Input"],
    maxFileSize: "N/A",
    processingNote: "Instant",
    privacyBehavior: "Generated locally",
    steps: [
      {
        step: 1,
        title: "Enter URL or Content",
        description: "Type or paste the URL, text, or data you want to encode into a QR code. URLs should include 'https://'.",
        tip: "Shorter content creates simpler, more reliably scannable QR codes.",
        screenshotAlt: "Content input field"
      },
      {
        step: 2,
        title: "Customize Design",
        description: "Choose colors for the code modules and background. Add corner styles for visual appeal while maintaining scannability.",
        warning: "Maintain high contrast between code and background for reliable scanning.",
        screenshotAlt: "Color and style options"
      },
      {
        step: 3,
        title: "Add Center Logo (Optional)",
        description: "Upload a small logo to display in the center. Error correction compensates for the covered area.",
        screenshotAlt: "Logo upload option"
      },
      {
        step: 4,
        title: "Set Size and Download",
        description: "Choose output resolution and format (PNG or SVG). Download your custom QR code ready for use.",
        screenshotAlt: "Size selection and download"
      }
    ],
    proTips: [
      "Test every QR code by scanning before printing",
      "Use SVG for infinitely scalable QR codes",
      "Keep logos small (under 20% of QR area) for reliability",
      "URL shorteners create simpler, more robust QR codes"
    ],
    commonMistakes: [
      "Low contrast colors making codes unscannable",
      "Logos too large, blocking essential code data",
      "Not testing before mass printing materials"
    ]
  },

  "qr-code-to-image": {
    slug: "qr-code-to-image",
    supportedFormats: ["JPG", "PNG", "WebP", "GIF"],
    maxFileSize: "10MB per image",
    processingNote: "Instant",
    privacyBehavior: "Local scanning",
    steps: [
      {
        step: 1,
        title: "Upload QR Code Image",
        description: "Add an image containing a QR code. The tool scans and extracts the encoded data.",
        tip: "Clear, focused images with good contrast scan most reliably.",
        screenshotAlt: "QR code image upload"
      },
      {
        step: 2,
        title: "View Decoded Content",
        description: "See the URL, text, or data encoded in the QR code. Links are displayed and can be verified before clicking.",
        warning: "Don't click unknown URLs—verify the destination is trustworthy first.",
        screenshotAlt: "Decoded content display"
      },
      {
        step: 3,
        title: "Copy or Open Content",
        description: "Copy the decoded text to clipboard or, for URLs, choose to open them after verification.",
        screenshotAlt: "Action buttons"
      },
      {
        step: 4,
        title: "Scan More Codes",
        description: "Upload additional QR code images to decode. Each scan is independent and secure.",
        screenshotAlt: "Ready for next scan"
      }
    ],
    proTips: [
      "Verify URLs before clicking—phishing attacks use malicious QR codes",
      "Crop images closely around the QR code for better recognition",
      "Clean, high-contrast photos scan most reliably",
      "Use for safely checking QR codes before visiting unknown links"
    ],
    commonMistakes: [
      "Clicking decoded URLs without verifying they're legitimate",
      "Using blurry or low-resolution images that fail to scan",
      "Expecting to decode damaged or partially obscured QR codes"
    ]
  },

  // ============================================
  // OPTIMIZATION TOOLS
  // ============================================

  "optimize-for-web": {
    slug: "optimize-for-web",
    supportedFormats: ["JPG", "PNG", "WebP", "GIF"],
    maxFileSize: "50MB per image",
    processingNote: "2-5 seconds",
    privacyBehavior: "Browser processing",
    steps: [
      {
        step: 1,
        title: "Upload Image",
        description: "Add the image you want optimized for fast web loading. The tool analyzes and applies the best optimization strategy.",
        screenshotAlt: "Image upload for optimization"
      },
      {
        step: 2,
        title: "Select Target Quality",
        description: "Choose optimization level: Balanced (recommended), Quality-focused, or Size-focused depending on your priorities.",
        tip: "Balanced mode works well for most websites and social media.",
        screenshotAlt: "Quality preset selection"
      },
      {
        step: 3,
        title: "Preview Optimization",
        description: "Compare original and optimized versions side-by-side. Check that quality meets your standards at the reduced size.",
        screenshotAlt: "Before/after comparison"
      },
      {
        step: 4,
        title: "Download Optimized Image",
        description: "Save your web-ready image. The optimization reduces file size while maintaining visual quality for fast page loads.",
        screenshotAlt: "Optimized image download"
      }
    ],
    proTips: [
      "Optimize all images before uploading to websites",
      "Smaller images improve Google PageSpeed scores",
      "WebP format often provides best web optimization results",
      "Test optimized images on both desktop and mobile"
    ],
    commonMistakes: [
      "Over-optimizing critical images where quality matters most",
      "Not testing optimized images on the actual website",
      "Ignoring retina display requirements (need 2× resolution)"
    ]
  },

  "reduce-file-size": {
    slug: "reduce-file-size",
    supportedFormats: ["JPG", "PNG", "WebP", "GIF"],
    maxFileSize: "100MB per file",
    processingNote: "1-5 seconds",
    privacyBehavior: "Local reduction",
    steps: [
      {
        step: 1,
        title: "Upload Large Image",
        description: "Add the image file you need to make smaller. The tool shows current file size and estimates reduction potential.",
        screenshotAlt: "Large file upload with size display"
      },
      {
        step: 2,
        title: "Set Target Size or Quality",
        description: "Either specify a maximum file size target or adjust quality percentage. The tool calculates the best settings.",
        tip: "Targeting a specific size is useful for email attachments with limits.",
        screenshotAlt: "Size/quality target settings"
      },
      {
        step: 3,
        title: "Apply Reduction",
        description: "Process the image with optimized compression settings to reach your target while preserving maximum quality.",
        screenshotAlt: "Reduction progress"
      },
      {
        step: 4,
        title: "Download Smaller File",
        description: "Save your reduced-size image. View the size comparison showing how much space you saved.",
        screenshotAlt: "Size comparison and download"
      }
    ],
    proTips: [
      "Set target sizes to match email attachment limits (typically 10-25MB)",
      "Combine with dimension reduction for maximum size savings",
      "PNG to JPG conversion can dramatically reduce file sizes",
      "Quality above 75% is usually visually indistinguishable for photos"
    ],
    commonMistakes: [
      "Setting unrealistic size targets that require extreme quality loss",
      "Not considering dimension reduction as an additional option",
      "Repeatedly compressing the same file, degrading quality each time"
    ]
  },

  // ============================================
  // DRAWING TOOLS
  // ============================================

  "paint-tool": {
    slug: "paint-tool",
    supportedFormats: ["JPG", "PNG", "WebP"],
    maxFileSize: "50MB per image",
    processingNote: "Real-time",
    privacyBehavior: "Fully local",
    steps: [
      {
        step: 1,
        title: "Upload Base Image",
        description: "Add an image to paint on, or start with a blank canvas. The paint tools work as overlays on your image.",
        screenshotAlt: "Image upload or blank canvas"
      },
      {
        step: 2,
        title: "Select Brush Tools",
        description: "Choose from various brush types: solid, spray, marker, highlighter. Adjust size and opacity for your needs.",
        tip: "Use lower opacity for subtle highlights; full opacity for solid strokes.",
        screenshotAlt: "Brush tool selection"
      },
      {
        step: 3,
        title: "Pick Colors",
        description: "Select colors from the palette, color picker, or sample directly from your image using the eyedropper tool.",
        screenshotAlt: "Color selection interface"
      },
      {
        step: 4,
        title: "Draw and Edit",
        description: "Paint on your image. Use undo/redo to fix mistakes. Add multiple layers of drawing as needed.",
        screenshotAlt: "Active painting on image"
      },
      {
        step: 5,
        title: "Save Your Work",
        description: "Download your painted image. Choose PNG for transparency or JPG for smaller file size.",
        screenshotAlt: "Save painted image"
      }
    ],
    proTips: [
      "Use transparent canvas for stickers and overlays",
      "Layer multiple brush strokes for depth and dimension",
      "Eyedropper tool helps match colors from the base image",
      "Start with lighter opacity and build up for natural effects"
    ],
    commonMistakes: [
      "Not saving work frequently—browser crashes lose progress",
      "Using too-large brush sizes for detailed work",
      "Forgetting to switch to eraser tool and painting unwanted marks"
    ]
  },

  "draw-shapes": {
    slug: "draw-shapes",
    supportedFormats: ["JPG", "PNG", "WebP"],
    maxFileSize: "50MB per image",
    processingNote: "Real-time",
    privacyBehavior: "Browser only",
    steps: [
      {
        step: 1,
        title: "Load Image",
        description: "Upload an image to add shapes to, such as diagrams, annotations, or design elements.",
        screenshotAlt: "Image ready for shapes"
      },
      {
        step: 2,
        title: "Select Shape Type",
        description: "Choose from rectangles, circles, ellipses, lines, arrows, polygons, or stars. Each has customizable properties.",
        tip: "Hold Shift while drawing for perfect squares and circles.",
        screenshotAlt: "Shape selection toolbar"
      },
      {
        step: 3,
        title: "Customize Appearance",
        description: "Set fill color, stroke color, stroke width, and opacity. Toggle between filled and outlined shapes.",
        screenshotAlt: "Shape styling options"
      },
      {
        step: 4,
        title: "Draw and Position",
        description: "Click and drag to create shapes. After drawing, drag to reposition or grab handles to resize.",
        screenshotAlt: "Shape drawing in action"
      },
      {
        step: 5,
        title: "Export Annotated Image",
        description: "Download your image with shapes embedded. All shapes are flattened into the final image.",
        screenshotAlt: "Final image with shapes"
      }
    ],
    proTips: [
      "Use arrows to direct attention in tutorials and guides",
      "Circle important elements for emphasis in screenshots",
      "Combine filled and outlined shapes for visual variety",
      "Use semi-transparent shapes for highlighting without obscuring"
    ],
    commonMistakes: [
      "Shapes obscuring important image content",
      "Using too many different colors, creating visual chaos",
      "Not aligning shapes properly for professional-looking results"
    ]
  },

  "signature-pad": {
    slug: "signature-pad",
    supportedFormats: ["JPG", "PNG", "WebP", "PDF"],
    maxFileSize: "50MB per file",
    processingNote: "Real-time",
    privacyBehavior: "No data stored",
    steps: [
      {
        step: 1,
        title: "Upload Document or Image",
        description: "Add the document or image that needs your signature. Position it where you can see the signature area.",
        screenshotAlt: "Document upload"
      },
      {
        step: 2,
        title: "Draw Your Signature",
        description: "Use your mouse, trackpad, or touchscreen to draw your signature. The pad captures natural handwriting movements.",
        tip: "Use a stylus or finger on touchscreens for more natural signatures.",
        screenshotAlt: "Signature drawing pad"
      },
      {
        step: 3,
        title: "Position Signature",
        description: "Drag your signature to the correct location on the document. Resize as needed to fit the signature line.",
        screenshotAlt: "Signature positioning"
      },
      {
        step: 4,
        title: "Finalize and Download",
        description: "Apply the signature and download your signed document. The signature is embedded permanently.",
        warning: "Ensure you have authority to sign before applying signatures to documents.",
        screenshotAlt: "Signed document ready"
      }
    ],
    proTips: [
      "Practice your signature a few times before the final version",
      "Use clear button to start over if the signature isn't right",
      "Touchscreen devices give more natural signature feel",
      "Save signature as PNG with transparency for reuse"
    ],
    commonMistakes: [
      "Signing documents without proper authorization",
      "Making signatures too small to be visible when document is printed",
      "Not positioning signature on the correct line"
    ]
  },

  // ============================================
  // PDF TOOLS (expanded)
  // ============================================

  "word-to-pdf": {
    slug: "word-to-pdf",
    supportedFormats: ["DOCX", "DOC"],
    maxFileSize: "50MB per file",
    processingNote: "5-15 seconds",
    privacyBehavior: "Local conversion",
    steps: [
      {
        step: 1,
        title: "Upload Word Document",
        description: "Add your DOCX or DOC file. The converter handles text, images, tables, and formatting from Word documents.",
        screenshotAlt: "Word file upload"
      },
      {
        step: 2,
        title: "Preview Conversion",
        description: "See how your document will appear as PDF. Check that formatting, fonts, and layout look correct.",
        tip: "Complex formatting may render slightly differently—preview catches issues early.",
        screenshotAlt: "PDF preview"
      },
      {
        step: 3,
        title: "Convert to PDF",
        description: "Process the conversion. Text remains searchable and selectable in the resulting PDF.",
        screenshotAlt: "Conversion progress"
      },
      {
        step: 4,
        title: "Download PDF",
        description: "Save your PDF file ready for sharing. PDFs maintain consistent appearance across all devices and platforms.",
        screenshotAlt: "PDF ready for download"
      }
    ],
    proTips: [
      "PDF format ensures your document looks identical everywhere",
      "Use for sending documents when you don't want recipients to edit",
      "PDF preserves fonts even on devices that don't have them installed",
      "Convert before printing for consistent results across printers"
    ],
    commonMistakes: [
      "Not checking preview—complex formatting may need adjustment",
      "Expecting interactive Word features (like form fields) to work in PDF",
      "Sending Word files when PDF would prevent unwanted editing"
    ]
  },

  // ============================================
  // CATEGORY PAGE GUIDES
  // ============================================

  "image-compression": {
    slug: "image-compression",
    supportedFormats: ["JPEG", "PNG", "WebP", "GIF", "TIFF"],
    maxFileSize: "50MB per image",
    processingNote: "Instant (1-5 seconds)",
    privacyBehavior: "100% browser-based processing",
    steps: [
      {
        step: 1,
        title: "Upload Your Image",
        description: "Drag and drop your image onto the upload area, or click to browse files. Switch to 'Batch Mode' to compress multiple images at once.",
        tip: "For batch compression, you can add up to 20 images simultaneously.",
        screenshotAlt: "Image upload interface with drag-and-drop zone",
        screenshotType: "upload" as const
      },
      {
        step: 2,
        title: "Adjust Quality Settings",
        description: "Use the quality slider to set your target compression level. Lower values create smaller files but may reduce image quality. The preview updates in real-time.",
        screenshotAlt: "Quality slider showing compression percentage",
        screenshotType: "compress" as const
      },
      {
        step: 3,
        title: "Preview Results",
        description: "Compare the original and compressed versions. Check file size reduction and image quality. Most images look identical at 70-80% quality.",
        tip: "Focus on gradient areas and fine details when evaluating quality loss.",
        screenshotAlt: "Before/after comparison of compressed image",
        screenshotType: "preview" as const
      },
      {
        step: 4,
        title: "Download Compressed Image",
        description: "Click 'Download' to save your optimized image. You'll see the file size reduction percentage and can immediately compress another image.",
        warning: "Compression is permanent—keep original files if you need highest quality later.",
        screenshotAlt: "Download button with size savings displayed",
        screenshotType: "download" as const
      }
    ],
    proTips: [
      "Use 70-80% quality for web images—most viewers can't tell the difference from originals",
      "Compress images before uploading to websites to improve page load speed and SEO",
      "JPEG works best for photographs; PNG for graphics with transparency",
      "For email attachments, aim for under 1MB per image to avoid delivery issues"
    ],
    commonMistakes: [
      "Compressing the same image multiple times—quality degrades with each cycle",
      "Using very low quality settings for images with text or fine patterns",
      "Not checking the compressed image on your actual use case before deployment"
    ]
  },

  "image-resize": {
    slug: "image-resize",
    supportedFormats: ["JPEG", "PNG", "WebP", "GIF", "BMP", "TIFF"],
    maxFileSize: "50MB per image",
    processingNote: "Instant (1-2 seconds)",
    privacyBehavior: "Fully client-side processing",
    steps: [
      {
        step: 1,
        title: "Upload Your Image",
        description: "Drag and drop your image onto the upload area. The tool displays the original dimensions immediately. Use 'Batch Mode' for multiple images.",
        screenshotAlt: "Image upload showing original dimensions",
        screenshotType: "upload" as const
      },
      {
        step: 2,
        title: "Choose Resize Mode",
        description: "Select from multiple resize modes: Exact dimensions for precise control, Percentage for proportional scaling, or Fit to Width/Height for responsive sizing.",
        tip: "Use 'Lock Aspect Ratio' to maintain proportions and avoid distortion.",
        screenshotAlt: "Resize mode selection with dimension inputs",
        screenshotType: "resize" as const
      },
      {
        step: 3,
        title: "Enter Target Size",
        description: "Specify your desired dimensions or percentage. The preview updates to show the new size. Common presets like social media sizes are available for quick selection.",
        screenshotAlt: "Dimension inputs with live preview",
        screenshotType: "preview" as const
      },
      {
        step: 4,
        title: "Download Resized Image",
        description: "Click 'Resize' to process and download your image. The output maintains the original format unless you specify otherwise.",
        warning: "Enlarging images beyond original size may cause quality loss.",
        screenshotAlt: "Download button with new dimensions shown",
        screenshotType: "download" as const
      }
    ],
    proTips: [
      "Always resize larger images down rather than small images up for best quality",
      "Use exact dimensions for consistent branding across marketing materials",
      "Common social media sizes: Instagram (1080×1080), Facebook cover (820×312), LinkedIn banner (1584×396)",
      "Resize before adding text overlays to ensure text appears at intended size"
    ],
    commonMistakes: [
      "Stretching images by unlocking aspect ratio when it should stay locked",
      "Enlarging low-resolution images expecting them to remain sharp",
      "Not considering retina displays that need 2× resolution images"
    ]
  },

  "pdf-tools": {
    slug: "pdf-tools",
    supportedFormats: ["PDF", "Word (DOC/DOCX)", "Images (JPG/PNG/WebP)"],
    maxFileSize: "100MB total",
    processingNote: "3-30 seconds depending on file size",
    privacyBehavior: "Processed entirely in your browser",
    steps: [
      {
        step: 1,
        title: "Select a PDF Tool",
        description: "Choose the operation you need: Merge PDFs to combine files, Compress to reduce size, Split to extract pages, or Convert from Word/images to PDF.",
        screenshotAlt: "PDF tools selection interface",
        screenshotType: "upload" as const
      },
      {
        step: 2,
        title: "Upload Your Files",
        description: "Drag and drop PDF files onto the upload area. For merge operations, add multiple files and arrange them in your preferred order using drag handles.",
        tip: "You can upload multiple files at once by selecting them together.",
        screenshotAlt: "PDF file upload with ordering controls",
        screenshotType: "pdf" as const
      },
      {
        step: 3,
        title: "Configure Options",
        description: "Adjust settings based on your chosen tool. For compression, select quality level. For splitting, specify page ranges. For merging, verify file order.",
        screenshotAlt: "PDF tool configuration options",
        screenshotType: "preview" as const
      },
      {
        step: 4,
        title: "Process and Download",
        description: "Click the action button to process your files. Download the result when complete. Large files may take a few seconds to process.",
        warning: "Very large PDFs or many files may take longer to process.",
        screenshotAlt: "PDF processing complete with download button",
        screenshotType: "download" as const
      }
    ],
    proTips: [
      "Merge related documents before sharing to keep everything organized in one file",
      "Use medium compression for email attachments—balances size and quality",
      "Split large PDFs to extract only the pages you need to share",
      "Convert Word to PDF before sending important documents to preserve formatting"
    ],
    commonMistakes: [
      "Forgetting to check page order before merging—reordering requires reprocessing",
      "Using maximum compression on image-heavy PDFs where quality matters",
      "Not previewing split results to verify correct pages were extracted"
    ]
  }
};

// Helper function to get guide data for a tool
export const getToolGuideData = (slug: string): ToolGuideData | undefined => {
  return toolGuideDataMap[slug];
};

// Get all available tool slugs with guide data
export const getToolsWithGuides = (): string[] => {
  return Object.keys(toolGuideDataMap);
};
