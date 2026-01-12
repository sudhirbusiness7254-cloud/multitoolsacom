// Visual How-to-Use Guide Data for All Tools
// Each tool has unique, human-written content following AdSense guidelines

import { ToolGuideData } from "@/components/HowToUseGuide";

export const toolGuideDataMap: Record<string, ToolGuideData> = {
  // ============================================
  // IMAGE CONVERTER TOOLS
  // ============================================
  
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
        screenshotAlt: "Upload interface showing drag-and-drop zone with file browser button"
      },
      {
        step: 2,
        title: "Preview and Verify",
        description: "Your image appears in the preview area. Check that it's the correct file and notice the current file size displayed. The preview shows exactly how your image will look after conversion.",
        screenshotAlt: "Image preview panel displaying uploaded JPG with file details"
      },
      {
        step: 3,
        title: "Click Convert to PNG",
        description: "Press the 'Convert to PNG' button to begin. The conversion happens instantly in your browser—your image never leaves your device. Watch for the success notification.",
        tip: "PNG format adds transparency support, but the original white background stays white unless you remove it separately.",
        screenshotAlt: "Convert button highlighted with progress indicator"
      },
      {
        step: 4,
        title: "Download Your PNG File",
        description: "Once complete, click 'Download' to save the PNG to your device. The file automatically downloads with the same name plus '.png' extension.",
        warning: "PNG files are typically larger than JPG. If file size is a concern, consider using our PNG compressor afterward.",
        screenshotAlt: "Download button with completed conversion status"
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
        screenshotAlt: "Upload interface displaying file size of selected JPEG"
      },
      {
        step: 2,
        title: "Choose Compression Level",
        description: "Move the quality slider to set your target compression. The preview updates in real-time showing the estimated output size. Lower values create smaller files but may introduce visible artifacts.",
        screenshotAlt: "Compression slider showing quality percentage and estimated output size"
      },
      {
        step: 3,
        title: "Preview Comparison",
        description: "Toggle between original and compressed versions to compare quality. Zoom into detailed areas to check for compression artifacts. Most images look identical at 70-80% quality.",
        tip: "Focus on areas with gradients, text, or fine details—these show compression effects first.",
        screenshotAlt: "Side-by-side comparison of original and compressed image"
      },
      {
        step: 4,
        title: "Compress and Save",
        description: "Click 'Compress' to finalize. The optimized JPEG downloads automatically. Check the size reduction displayed—you'll typically see 40-70% savings.",
        warning: "Compression is permanent. Keep original files if you might need higher quality later.",
        screenshotAlt: "Compression results showing before/after file sizes"
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
        screenshotAlt: "PNG file upload interface with format verification"
      },
      {
        step: 2,
        title: "Pick Compression Method",
        description: "Choose between lossless (no quality loss) or lossy (maximum size reduction) compression. Lossless typically reduces files by 20-40%, while lossy can achieve 60-80% reduction.",
        tip: "For graphics with limited colors like logos and icons, lossless compression is very effective.",
        screenshotAlt: "Compression mode selector with method descriptions"
      },
      {
        step: 3,
        title: "Review Results",
        description: "The compressor analyzes your image and applies optimizations. Preview the result to ensure quality meets your standards. Transparency is always preserved.",
        warning: "Lossy compression may cause slight banding in gradient areas—check these carefully.",
        screenshotAlt: "Compression preview with preserved transparency indicator"
      },
      {
        step: 4,
        title: "Download Optimized PNG",
        description: "Download your compressed PNG with full transparency intact. The file works identically to the original but loads faster on websites and takes less storage space.",
        screenshotAlt: "Download button with size savings displayed"
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
        screenshotAlt: "Image upload with original dimensions displayed"
      },
      {
        step: 2,
        title: "Enter Target Dimensions",
        description: "Type the exact width and height you need in pixels. Enable 'Lock Aspect Ratio' to maintain proportions automatically when you change one dimension.",
        tip: "Common sizes: Instagram square (1080×1080), Facebook cover (820×312), Twitter header (1500×500).",
        screenshotAlt: "Dimension input fields with aspect ratio lock toggle"
      },
      {
        step: 3,
        title: "Choose Resize Quality",
        description: "Select the resampling algorithm. 'Lanczos' provides the sharpest results for downscaling. 'Bilinear' offers smoother results for enlargement.",
        warning: "Enlarging images beyond 150% of original size often results in visible blur or pixelation.",
        screenshotAlt: "Resampling algorithm dropdown with quality options"
      },
      {
        step: 4,
        title: "Resize and Download",
        description: "Click 'Resize' to process. Download the resized image immediately. The output format matches your input unless you change it.",
        screenshotAlt: "Resize confirmation with new dimensions preview"
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
        screenshotAlt: "Upload area with current image dimensions visible"
      },
      {
        step: 2,
        title: "Set Scale Percentage",
        description: "Enter a percentage value. 50% halves both dimensions (quarters the total pixels). 200% doubles dimensions (quadruples pixels). The preview updates showing new dimensions.",
        tip: "For quick halving or doubling, use 50% or 200%. For subtle adjustments, try 80% or 120%.",
        screenshotAlt: "Percentage input with calculated new dimensions"
      },
      {
        step: 3,
        title: "Preview New Size",
        description: "See the calculated output dimensions before processing. This helps avoid surprises, especially when working with specific size requirements.",
        screenshotAlt: "Dimension preview showing original vs. new sizes"
      },
      {
        step: 4,
        title: "Apply and Download",
        description: "Execute the resize and download your scaled image. Percentage resizing maintains perfect proportions automatically.",
        screenshotAlt: "Download interface after successful resize"
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
        screenshotAlt: "Full image displayed with initial crop selection overlay"
      },
      {
        step: 2,
        title: "Position Crop Area",
        description: "Click and drag to draw a selection box around the area you want to keep. Drag the edges or corners to fine-tune the selection precisely.",
        tip: "Hold Shift while dragging corners to maintain a square selection.",
        screenshotAlt: "Crop selection being adjusted with drag handles visible"
      },
      {
        step: 3,
        title: "Fine-Tune Selection",
        description: "Use the input fields to enter exact pixel values for crop position and size if you need precise control. The preview updates as you type.",
        warning: "Areas outside the crop selection will be permanently removed from the output image.",
        screenshotAlt: "Precise dimension inputs with updated crop preview"
      },
      {
        step: 4,
        title: "Crop and Save",
        description: "Click 'Apply Crop' to create your cropped image. Download the result immediately or continue editing with other tools.",
        screenshotAlt: "Cropped result preview with download option"
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
        screenshotAlt: "Sideways image loaded in rotation tool"
      },
      {
        step: 2,
        title: "Select Rotation Direction",
        description: "Click 'Rotate 90° Clockwise' or 'Rotate 90° Counter-clockwise' depending on which way your image needs to turn to appear correct.",
        tip: "If you need 180° rotation, apply the 90° rotation twice or use our dedicated 180° rotate tool.",
        screenshotAlt: "Rotation buttons showing clockwise and counter-clockwise options"
      },
      {
        step: 3,
        title: "Verify Orientation",
        description: "Check the preview to confirm the image now displays correctly. Apply additional rotation if needed—you can rotate multiple times.",
        screenshotAlt: "Corrected image orientation in preview"
      },
      {
        step: 4,
        title: "Download Corrected Image",
        description: "Save your properly oriented image. The rotation is lossless for most formats, preserving original image quality.",
        screenshotAlt: "Download button with rotated image ready"
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
        screenshotAlt: "Original image loaded for watermarking"
      },
      {
        step: 2,
        title: "Enter Watermark Text",
        description: "Type your watermark content—typically your name, business name, website, or copyright notice. The text appears immediately on the preview.",
        tip: "Keep watermark text short and recognizable—'© 2024 YourName' works well.",
        screenshotAlt: "Text input field with watermark preview on image"
      },
      {
        step: 3,
        title: "Customize Appearance",
        description: "Adjust font, size, color, opacity, and position. Lower opacity (20-40%) protects without overwhelming. Position strategically where cropping would be difficult.",
        warning: "Very light watermarks can be removed easily—balance visibility with aesthetics.",
        screenshotAlt: "Watermark styling options with positioned result"
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
        screenshotAlt: "Final watermarked image ready for download"
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
        screenshotAlt: "Multiple PDF files being uploaded"
      },
      {
        step: 2,
        title: "Arrange Document Order",
        description: "Drag file thumbnails to set the order they'll appear in the merged PDF. The first file becomes pages 1+, second follows, and so on.",
        tip: "Number your source files before uploading to make ordering easier.",
        screenshotAlt: "PDF thumbnails being reordered via drag-and-drop"
      },
      {
        step: 3,
        title: "Preview Combined Pages",
        description: "Expand each PDF to see its pages and verify content. Rearrange if any file is out of sequence before finalizing the merge.",
        screenshotAlt: "Expanded view showing pages from each PDF"
      },
      {
        step: 4,
        title: "Merge and Download",
        description: "Click 'Merge PDFs' to combine all documents. Large files may take a moment to process. Download your single consolidated PDF file.",
        warning: "Merged file size equals the sum of all source files—consider compressing afterward.",
        screenshotAlt: "Merge button with progress indicator"
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
        screenshotAlt: "PDF upload showing original file size"
      },
      {
        step: 2,
        title: "Select Compression Level",
        description: "Choose Low (max quality), Medium (balanced), or High (smallest size) compression. Higher compression reduces quality of embedded images more aggressively.",
        tip: "For email attachments, Medium typically provides 50-70% size reduction with acceptable quality.",
        screenshotAlt: "Compression level selector with estimated output sizes"
      },
      {
        step: 3,
        title: "Preview Quality",
        description: "If available, preview the compressed PDF to check image quality remains acceptable for your needs before downloading.",
        warning: "High compression on image-heavy PDFs may create noticeably blurry images.",
        screenshotAlt: "Quality preview of compressed PDF pages"
      },
      {
        step: 4,
        title: "Download Compressed PDF",
        description: "Save your reduced-size PDF. The compression percentage shows how much space you saved compared to the original.",
        screenshotAlt: "Download with size comparison statistics"
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
