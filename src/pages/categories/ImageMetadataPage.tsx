import { Helmet } from "react-helmet-async";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import UniversalImageMetadata from "@/components/UniversalImageMetadata";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { CheckCircle, Shield, Zap, FileText, Lock, Eye, Settings, Info, Trash2, Calendar, Copy, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import ToolSideAd from "@/components/ads/ToolSideAd";
import MobileToolAd from "@/components/ads/MobileToolAd";
import NativeBannerAd from "@/components/ads/NativeBannerAd";
import InContentAd from "@/components/ads/InContentAd";

const ImageMetadataPage = () => {
  const faqs = [
    {
      question: "What is image metadata and why is it important?",
      answer: "Image metadata is hidden information embedded within image files. It includes camera settings (EXIF), copyright information (IPTC), and technical details (XMP). This data is valuable for photographers organizing collections, verifying image authenticity, and managing digital assets."
    },
    {
      question: "What types of metadata can I view?",
      answer: "Our tool displays EXIF data (camera model, lens, exposure settings, date/time, GPS location), IPTC data (copyright, creator, captions, keywords), XMP data (editing history, color profiles), and basic file information (dimensions, file size, format)."
    },
    {
      question: "Can I remove metadata from my images?",
      answer: "Yes! Our metadata removal tool strips all embedded metadata from your images, including potentially sensitive GPS location data. This is essential for privacy when sharing photos online or protecting your personal information."
    },
    {
      question: "Why would I want to remove image metadata?",
      answer: "Metadata can contain sensitive information like GPS coordinates revealing where photos were taken, device identifiers, and personal details. Removing metadata before sharing images online protects your privacy and prevents potential security risks."
    },
    {
      question: "Does metadata removal affect image quality?",
      answer: "No, metadata removal only strips the embedded information without touching the actual image pixels. Your image quality, dimensions, and appearance remain completely unchanged after metadata is removed."
    },
    {
      question: "What metadata can reveal my location?",
      answer: "GPS coordinates embedded in EXIF data can reveal exactly where a photo was taken. Many smartphones automatically add this location data. Our tool shows you this information and lets you remove it to protect your privacy."
    },
    {
      question: "Which image formats contain metadata?",
      answer: "JPEG, TIFF, and PNG files commonly contain metadata. RAW formats from cameras also include extensive EXIF data. Our tool can read and remove metadata from all major image formats."
    },
    {
      question: "Is my image data kept private during analysis?",
      answer: "Absolutely. All metadata viewing and removal happens directly in your browser. Your images are never uploaded to any server, ensuring complete privacy for your photos and their embedded information."
    }
  ];

  const metadataTools = [
    {
      slug: "view-exif",
      name: "View EXIF Data",
      icon: Eye,
      description: "Extract and view complete EXIF metadata from any image including camera settings, GPS location, and timestamps",
      color: "#3B82F6"
    },
    {
      slug: "remove-exif",
      name: "Remove EXIF Data",
      icon: Trash2,
      description: "Strip all metadata from images to protect your privacy before sharing photos online",
      color: "#EF4444"
    },
    {
      slug: "edit-exif-datetime",
      name: "Edit Date/Time",
      icon: Calendar,
      description: "Modify the date and time stamps in your image metadata for organization purposes",
      color: "#10B981"
    },
    {
      slug: "copy-exif",
      name: "Copy EXIF Data",
      icon: Copy,
      description: "Transfer EXIF metadata from one image to another for consistent organization",
      color: "#8B5CF6"
    }
  ];

  return (
    <>
      <Helmet>
        <title>Free Image Metadata Tools - View, Edit, Remove EXIF Data Online | MultiTools</title>
        <meta name="description" content="View, edit, and remove image metadata (EXIF, IPTC, XMP) online for free. Protect your privacy by stripping location and camera data from photos. Instant results." />
        <meta name="keywords" content="image metadata, exif viewer, remove exif, edit exif, photo metadata, gps location, camera settings, privacy protection" />
        <link rel="canonical" href="https://multitools.com/image-metadata" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            "name": "Free Online Image Metadata Tools",
            "description": "View and remove image metadata (EXIF, IPTC, XMP) online for free. Protect your privacy by stripping location and camera data from photos.",
            "url": "https://multitools.com/image-metadata",
            "applicationCategory": "MultimediaApplication",
            "operatingSystem": "Any",
            "offers": {
              "@type": "Offer",
              "price": "0",
              "priceCurrency": "USD"
            },
            "featureList": [
              "EXIF data viewing",
              "IPTC metadata display",
              "GPS location extraction",
              "Metadata removal",
              "Privacy protection",
              "Client-side processing"
            ]
          })}
        </script>
      </Helmet>

      <div className="min-h-screen bg-background flex flex-col">
        <Header />
        
        <main className="flex-1">
          {/* Hero Section */}
          <section className="py-12 md:py-20 bg-gradient-hero relative overflow-hidden">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/10 rounded-full blur-3xl" />
            
            <div className="w-full max-w-[1400px] mx-auto relative z-10">
              <div className="text-center max-w-4xl mx-auto mb-10">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/30 mb-6">
                  <Info className="w-4 h-4 text-primary" />
                  <span className="text-sm font-medium text-primary">Free Privacy Tools</span>
                </div>
                
                <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                  Image Metadata Tools
                </h1>
                
                <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
                  View, edit, and remove image metadata for privacy. Instant results processed locally in your browser.
                </p>
              </div>

              {/* Desktop: Tool with ads on both sides */}
              <div className="hidden xl:flex gap-4 justify-center items-start">
                {/* Left Side Ad */}
                <div className="flex-shrink-0 sticky top-24">
                  <ToolSideAd />
                </div>
                
                {/* Tool Component */}
                <div className="flex-1 max-w-4xl">
                  <UniversalImageMetadata />
                </div>
                
                {/* Right Side Ad */}
                <div className="flex-shrink-0 sticky top-24">
                  <ToolSideAd />
                </div>
              </div>
              
              {/* Mobile/Tablet/Laptop: Tool only */}
              <div className="xl:hidden">
                <UniversalImageMetadata />
              </div>
              
              {/* Mobile Ad - Below tool */}
              <MobileToolAd />
            </div>
          </section>

          {/* Native Banner Ad */}
          <div className="container mx-auto max-w-4xl px-4">
            <NativeBannerAd />
          </div>

          {/* Tools Grid */}
          <section className="py-12 md:py-16 px-4 bg-secondary/30">
            <div className="container mx-auto max-w-6xl">
              <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">Choose Your Tool</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
                {metadataTools.map((tool) => (
                  <Link
                    key={tool.slug}
                    to={`/${tool.slug}`}
                    className="group bg-card rounded-xl p-5 border border-border hover:border-primary/50 transition-all hover:-translate-y-1 hover:shadow-lg"
                  >
                    <div 
                      className="w-12 h-12 rounded-lg flex items-center justify-center mb-4"
                      style={{ backgroundColor: `${tool.color}20` }}
                    >
                      <tool.icon className="w-6 h-6" style={{ color: tool.color }} />
                    </div>
                    <h3 className="font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                      {tool.name}
                    </h3>
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {tool.description}
                    </p>
                    <div className="flex items-center gap-1 mt-3 text-primary text-sm font-medium">
                      Use Tool <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>

          {/* Comprehensive About Section - View EXIF */}
          <section className="py-12 md:py-16 px-4">
            <div className="container mx-auto max-w-4xl">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-blue-500/20 flex items-center justify-center">
                  <Eye className="w-6 h-6 text-blue-500" />
                </div>
                <h2 className="text-2xl md:text-3xl font-bold">View EXIF Data - Complete Guide</h2>
              </div>
              
              <div className="prose prose-lg max-w-none dark:prose-invert space-y-6">
                <p className="text-muted-foreground leading-relaxed">
                  Every digital photograph carries a hidden wealth of information that most people never see. This invisible data, known as EXIF (Exchangeable Image File Format) metadata, is automatically embedded into every photo taken by digital cameras and smartphones. Understanding and accessing this metadata opens up a world of possibilities for photographers, investigators, privacy advocates, and anyone who works with digital images professionally or personally.
                </p>
                
                <p className="text-muted-foreground leading-relaxed">
                  EXIF data encompasses a comprehensive range of technical information recorded at the exact moment a photograph is captured. This includes fundamental camera settings such as aperture size, shutter speed, and ISO sensitivity, which determine how light enters the camera and how the image is exposed. For photographers seeking to improve their craft, this information is invaluable because it allows them to analyze what settings produced successful images and replicate those conditions in future shoots.
                </p>
                
                <p className="text-muted-foreground leading-relaxed">
                  Beyond exposure settings, EXIF metadata contains detailed device information including the camera manufacturer, model name, and even serial number. Lens information is also recorded, documenting the focal length used and, for interchangeable lens cameras, the specific lens model attached. This technical documentation proves essential for photographers tracking which equipment produced their best work, and for photo editors verifying that images came from authentic sources.
                </p>
                
                <p className="text-muted-foreground leading-relaxed">
                  Perhaps the most privacy-sensitive component of EXIF data is GPS coordinates. Modern smartphones and many cameras with built-in GPS receivers automatically embed precise geographic coordinates showing exactly where each photograph was taken. While this geo-tagging feature is useful for organizing travel photos or documenting locations professionally, it can inadvertently reveal sensitive information such as home addresses, workplace locations, or daily routines when photos are shared publicly.
                </p>
                
                <p className="text-muted-foreground leading-relaxed">
                  Timestamps represent another crucial category of EXIF information. The original capture date and time are recorded with precision, along with any subsequent modification dates. For archival purposes, this temporal data enables accurate organization of photo collections chronologically. For forensic purposes, timestamps can help verify when events occurred or detect potential manipulation of evidence.
                </p>
                
                <p className="text-muted-foreground leading-relaxed">
                  Our EXIF viewer extracts and presents all this metadata in a clear, organized format that makes analysis straightforward. The tool reads directly from image files without modification, ensuring your originals remain untouched. All processing occurs locally within your web browser, meaning your photographs are never uploaded to any external server, preserving complete privacy throughout the analysis process.
                </p>
                
                <p className="text-muted-foreground leading-relaxed">
                  Professional photographers rely on EXIF data to refine their technique over time. By reviewing the settings that produced their most successful images, they can identify patterns and preferences that inform future shooting decisions. Wedding photographers, wildlife photographers, and studio professionals alike benefit from this post-capture analysis capability that our free tool provides.
                </p>
                
                <p className="text-muted-foreground leading-relaxed">
                  Journalists and fact-checkers use EXIF viewers to verify the authenticity of submitted photographs. By examining metadata, they can confirm when and where images were actually taken, helping to identify manipulated or misattributed photos. In an era of widespread digital misinformation, this verification capability serves an important role in maintaining journalistic integrity.
                </p>
                
                <p className="text-muted-foreground leading-relaxed">
                  Privacy-conscious individuals use EXIF viewers to audit their own photos before sharing them online. By understanding exactly what information is embedded in their images, they can make informed decisions about whether to strip metadata before posting to social media or sending to others. This awareness is the first step in maintaining digital privacy in an increasingly connected world.
                </p>
                
                <p className="text-muted-foreground leading-relaxed">
                  Whether you are a photographer analyzing your technique, a journalist verifying sources, or simply curious about the hidden data in your photos, our EXIF viewer provides instant, comprehensive access to all embedded metadata. The tool supports all major image formats including JPEG, PNG, TIFF, and RAW files from various camera manufacturers. Start exploring the hidden information in your photographs today with our free, unlimited, privacy-focused metadata viewer.
                </p>
              </div>
            </div>
          </section>

          {/* Remove EXIF Section */}
          <section className="py-12 md:py-16 px-4 bg-secondary/30">
            <div className="container mx-auto max-w-4xl">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-red-500/20 flex items-center justify-center">
                  <Trash2 className="w-6 h-6 text-red-500" />
                </div>
                <h2 className="text-2xl md:text-3xl font-bold">Remove EXIF Data - Privacy Protection Guide</h2>
              </div>
              
              <div className="prose prose-lg max-w-none dark:prose-invert space-y-6">
                <p className="text-muted-foreground leading-relaxed">
                  In the digital age where photographs are shared across countless platforms and with numerous contacts, protecting your privacy has become more important than ever. Every photo you take with a smartphone or digital camera contains hidden metadata that can reveal far more about you than you might realize, including your precise location, the devices you own, and patterns of your daily life. Our EXIF removal tool provides essential protection by stripping all this hidden data from your images before you share them.
                </p>
                
                <p className="text-muted-foreground leading-relaxed">
                  GPS coordinates embedded in photographs represent one of the most significant privacy risks of modern digital photography. When you take a photo with your smartphone, it often records your exact latitude and longitude down to a few meters of accuracy. This means photos taken at your home reveal your home address. Photos at your workplace reveal where you work. Vacation photos create a map of your travels. When these images are shared publicly on social media, forums, or marketplaces, anyone with basic technical knowledge can extract this location data.
                </p>
                
                <p className="text-muted-foreground leading-relaxed">
                  Beyond location, EXIF metadata contains device identifiers that can be used to track photos back to a specific camera or phone. Camera serial numbers and unique device identifiers are embedded in every image, creating a digital fingerprint that links all photos from the same device together. For those seeking to share images anonymously or maintain separation between different contexts of their life, this tracking capability poses a genuine concern.
                </p>
                
                <p className="text-muted-foreground leading-relaxed">
                  Timestamps in metadata create detailed timelines of your activities. The exact date and time of every photograph is recorded, which can reveal when you were at specific locations, your work schedule, sleep patterns inferred from photo-taking gaps, and other behavioral information. While this data is useful for personal photo organization, it may be information you prefer not to share with the world.
                </p>
                
                <p className="text-muted-foreground leading-relaxed">
                  Our EXIF removal tool completely strips all embedded metadata from your photographs, creating clean files that contain only the visual image itself. The process removes EXIF data including camera settings and GPS, IPTC data containing captions and keywords, XMP data with editing history, and any other embedded information. The result is a metadata-free image that reveals nothing about when, where, or how it was created.
                </p>
                
                <p className="text-muted-foreground leading-relaxed">
                  Importantly, metadata removal does not affect image quality. Our tool removes only the hidden data, leaving the actual image pixels completely untouched. Your photographs look exactly the same after processing, just without the privacy-compromising information attached. As a bonus, the resulting files are often slightly smaller because they no longer contain the embedded data.
                </p>
                
                <p className="text-muted-foreground leading-relaxed">
                  Social media platforms vary widely in their handling of image metadata. Some platforms like Facebook strip most EXIF data during upload, while others may preserve all or part of it. Platform policies can change, and you may not always know how a particular service handles metadata. By removing metadata yourself before uploading, you ensure consistent privacy protection regardless of where you share your images.
                </p>
                
                <p className="text-muted-foreground leading-relaxed">
                  Professional photographers often remove metadata from client deliverables to prevent revealing their equipment choices or business location. Journalists use metadata stripping to protect sources who submit photographs anonymously. Parents remove location data from photos of children before sharing with extended family. Businesses clean corporate images of internal metadata before publication. The use cases for privacy-focused metadata removal span every context where photos are shared.
                </p>
                
                <p className="text-muted-foreground leading-relaxed">
                  Our tool processes images entirely within your web browser, adding an extra layer of privacy protection. Your photographs are never uploaded to any external server during the metadata removal process. This means your images remain completely private even while being cleaned of their embedded data. When you close the browser, all processed files are cleared from memory automatically.
                </p>
                
                <p className="text-muted-foreground leading-relaxed">
                  Take control of your digital privacy by removing hidden metadata from photos before sharing them. Whether you are posting to social media, listing items on online marketplaces, sending photos via email, or publishing images on websites, our free EXIF removal tool provides the protection you need. Start stripping metadata from your images today and share with confidence knowing your personal information stays private.
                </p>
              </div>
            </div>
          </section>

          {/* Edit Date/Time Section */}
          <section className="py-12 md:py-16 px-4">
            <div className="container mx-auto max-w-4xl">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-green-500/20 flex items-center justify-center">
                  <Calendar className="w-6 h-6 text-green-500" />
                </div>
                <h2 className="text-2xl md:text-3xl font-bold">Edit EXIF Date/Time - Organization Guide</h2>
              </div>
              
              <div className="prose prose-lg max-w-none dark:prose-invert space-y-6">
                <p className="text-muted-foreground leading-relaxed">
                  Accurate timestamps are fundamental to organizing digital photo collections effectively. When photos are sorted chronologically, they tell the story of events in proper sequence, making it easy to find specific moments and understand the flow of occasions. However, camera clocks can be incorrect, time zones cause confusion when traveling, and various technical issues can result in photos with wrong or missing date and time information. Our EXIF date/time editor provides the solution, allowing you to correct, adjust, or set timestamp metadata to ensure your photo library is properly organized.
                </p>
                
                <p className="text-muted-foreground leading-relaxed">
                  One of the most common timestamp problems photographers encounter is incorrect camera clock settings. When a camera battery is replaced or when a device is reset, the internal clock often reverts to a default date far in the past. Photos taken before the clock is corrected end up with timestamps years or even decades off from reality. These incorrectly dated images sort to the wrong position in photo libraries, disrupting the chronological flow that most organization systems rely upon.
                </p>
                
                <p className="text-muted-foreground leading-relaxed">
                  Travel photography presents another common timestamp challenge. When crossing time zones, cameras may remain set to home time while the actual local time differs by hours. Photos from a Tokyo vacation might all show California time, or European trip images might display Australian timestamps. While the relative order of photos from a single trip remains correct, they may interleave incorrectly with photos from other dates or appear at the wrong time of day when viewed.
                </p>
                
                <p className="text-muted-foreground leading-relaxed">
                  Scanned photographs and digitized prints typically lack original capture dates entirely. When scanning old family photos, photo albums, or prints from film cameras, the resulting digital files carry only the scan date, not the original date the photograph was taken. To properly integrate these historical images into a digital photo library, the EXIF date must be edited to reflect when the photos were actually captured, whether that was decades ago or relatively recent.
                </p>
                
                <p className="text-muted-foreground leading-relaxed">
                  Event photographers who work with multiple cameras sometimes find that timestamps are not synchronized across devices. When photos from different cameras are merged into a single collection, the interleaving of images can be incorrect if one camera was even a few minutes ahead or behind the others. Adjusting timestamps with a consistent offset across all images from one camera resolves this synchronization issue.
                </p>
                
                <p className="text-muted-foreground leading-relaxed">
                  Our date/time editing tool provides precise control over EXIF timestamp metadata. You can set a specific date and time for individual images, apply an offset to shift timestamps forward or backward by a specified amount, or synchronize multiple images to a reference point. The tool modifies only the timestamp fields while leaving all other metadata and the image itself unchanged.
                </p>
                
                <p className="text-muted-foreground leading-relaxed">
                  Photo management software like Apple Photos, Google Photos, and Adobe Lightroom use EXIF timestamps as the primary sorting criterion. When these timestamps are correct, your photo library organizes itself chronologically, placing events in proper sequence and making navigation intuitive. When timestamps are wrong, photos appear in the wrong place, disrupting the organizational structure and making specific images difficult to find.
                </p>
                
                <p className="text-muted-foreground leading-relaxed">
                  For photographers documenting events professionally, accurate timestamps serve as a form of evidence. Wedding photographers need photos to reflect the actual timeline of the ceremony and reception. Legal photographers require timestamps that accurately represent when documentation occurred. Corporate event photographers may need to prove the sequence of presentations or activities. Correct metadata ensures the photographic record is reliable.
                </p>
                
                <p className="text-muted-foreground leading-relaxed">
                  The ability to edit EXIF date/time is also useful for creative projects where you want to control the apparent chronology of images. Photo projects with specific narrative structures may benefit from controlled timestamp sequencing. Archival projects digitizing historical materials need dates that reflect original creation rather than scanning. Personal projects organizing memories can use accurate dates to enhance the storytelling quality of photo collections.
                </p>
                
                <p className="text-muted-foreground leading-relaxed">
                  Our browser-based tool processes your images locally, ensuring that your photographs remain private throughout the editing process. No uploads to external servers are required. The edited images with corrected timestamps can be downloaded immediately and will sort properly in any photo management application that respects EXIF metadata. Take control of your photo organization by correcting timestamps today.
                </p>
              </div>
            </div>
          </section>

          {/* Copy EXIF Section */}
          <section className="py-12 md:py-16 px-4 bg-secondary/30">
            <div className="container mx-auto max-w-4xl">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-purple-500/20 flex items-center justify-center">
                  <Copy className="w-6 h-6 text-purple-500" />
                </div>
                <h2 className="text-2xl md:text-3xl font-bold">Copy EXIF Data - Metadata Transfer Guide</h2>
              </div>
              
              <div className="prose prose-lg max-w-none dark:prose-invert space-y-6">
                <p className="text-muted-foreground leading-relaxed">
                  Photo editing and processing often strips valuable metadata from images, leaving edited versions without the camera settings, timestamps, and location data that the originals contained. Our EXIF copying tool solves this problem by allowing you to transfer metadata from source images to destination images, restoring important information to processed photos and maintaining the integrity of your photo library organization.
                </p>
                
                <p className="text-muted-foreground leading-relaxed">
                  When you edit a photograph using many image editing applications, the exported or saved version often loses some or all of its original EXIF data. This happens because some editors do not preserve metadata, others offer export options that exclude it, and certain file format conversions inherently strip metadata. The result is processed images that sort incorrectly in photo libraries, lack camera setting information, and appear to have been created at the time of editing rather than the time of capture.
                </p>
                
                <p className="text-muted-foreground leading-relaxed">
                  Professional photography workflows commonly involve editing images in dedicated software before final delivery or archival. Wedding photographers edit hundreds of images per event, portrait photographers perfect skin tones and lighting, and landscape photographers enhance colors and contrast. When these edited images lose their original metadata, the photographers lose the ability to track which camera settings produced which results, and their filing systems based on capture date become disrupted.
                </p>
                
                <p className="text-muted-foreground leading-relaxed">
                  Our EXIF copying tool addresses this workflow gap by enabling metadata transfer between images. By selecting a source image that retains original metadata and a destination image that lacks it, you can copy all relevant EXIF fields from source to destination. This restores the camera settings, timestamp, GPS location, and other metadata to your edited images without requiring you to re-edit or re-export.
                </p>
                
                <p className="text-muted-foreground leading-relaxed">
                  The tool offers flexibility in what metadata fields are transferred. Some workflows require copying only timestamps to maintain chronological organization. Others need complete metadata transfer including all camera settings for technical reference. Some users want to copy GPS coordinates to geotagged processed images. The selective copying capability accommodates diverse workflow requirements.
                </p>
                
                <p className="text-muted-foreground leading-relaxed">
                  Batch processing of scanned photographs is another scenario where EXIF copying proves valuable. When digitizing a roll of film or a collection of prints from a single event, you may want all resulting images to share the same date information. By setting up one image with the correct date and copying that metadata to all others, you can efficiently timestamp an entire collection without editing each file individually.
                </p>
                
                <p className="text-muted-foreground leading-relaxed">
                  Photographers working with multiple camera bodies sometimes need to synchronize metadata across their fleet. If one camera has more accurate GPS or better clock synchronization, its metadata can serve as a reference for correcting images from other cameras. Copying EXIF data from reference images to those needing correction streamlines this synchronization process.
                </p>
                
                <p className="text-muted-foreground leading-relaxed">
                  For archival and cataloging purposes, consistent metadata across image versions is valuable. When you have an original file with complete metadata and various processed versions for different purposes, copying the original metadata to the processed versions ensures that all versions sort together chronologically and retain searchable camera and location information regardless of which version you access.
                </p>
                
                <p className="text-muted-foreground leading-relaxed">
                  The tool processes images locally in your browser, maintaining privacy for both source and destination images. No files are uploaded to external servers during the metadata copying process. The destination image is modified only in its metadata fields, with the actual image pixels remaining completely unchanged. This non-destructive approach means you can safely copy metadata without any risk to your image quality.
                </p>
                
                <p className="text-muted-foreground leading-relaxed">
                  Whether you are restoring metadata to edited photos, synchronizing timestamps across multiple images, or maintaining organizational consistency in your photo library, our EXIF copying tool provides the functionality you need. The free, unlimited tool works with all common image formats and handles all standard EXIF fields. Start copying metadata today and ensure your processed images retain the valuable information that makes photo management effective.
                </p>
              </div>
            </div>
          </section>

          {/* How to Use Section */}
          <section className="py-12 md:py-16 px-4">
            <div className="container mx-auto max-w-4xl">
              <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">How to Use Metadata Tools</h2>
              <div className="grid md:grid-cols-4 gap-6">
                {[
                  { step: "1", title: "Upload Image", desc: "Drag and drop your image or click to browse. We support JPEG, PNG, TIFF, and other common formats.", icon: FileText },
                  { step: "2", title: "View Metadata", desc: "Instantly see all embedded data including EXIF, IPTC, XMP, GPS location, and camera settings.", icon: Eye },
                  { step: "3", title: "Choose Action", desc: "Select to view, remove, edit, or copy metadata based on your needs.", icon: Settings },
                  { step: "4", title: "Download", desc: "Save your processed image with metadata removed or modified as needed.", icon: CheckCircle }
                ].map((item) => (
                  <div key={item.step} className="bg-card border border-border rounded-xl p-6 text-center">
                    <div className="w-12 h-12 bg-primary/10 text-primary rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                      {item.step}
                    </div>
                    <h3 className="text-lg font-semibold text-foreground mb-2">{item.title}</h3>
                    <p className="text-muted-foreground text-sm">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Benefits Section */}
          <section className="py-12 md:py-16 px-4 bg-secondary/30">
            <div className="container mx-auto max-w-4xl">
              <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">Why Use Our Metadata Tools?</h2>
              <div className="grid md:grid-cols-2 gap-6">
                {[
                  { icon: FileText, title: "Complete Metadata View", desc: "See all EXIF, IPTC, XMP data including camera settings, GPS location, copyright, and more." },
                  { icon: Lock, title: "Privacy Protection", desc: "Remove all metadata including GPS coordinates to protect your location and personal information." },
                  { icon: Info, title: "Detailed Analysis", desc: "Understand camera settings, verify authenticity, and manage digital asset information." },
                  { icon: Zap, title: "Instant Processing", desc: "Browser-based processing means instant results. View and remove metadata in seconds." },
                  { icon: Eye, title: "Clear Display", desc: "Organized, readable presentation of all metadata fields. Easy to understand and analyze." },
                  { icon: Shield, title: "Complete Privacy", desc: "Images never leave your device. All processing happens locally in your browser." }
                ].map((item, index) => (
                  <div key={index} className="flex gap-4 p-6 bg-card border border-border rounded-xl">
                    <div className="flex-shrink-0">
                      <item.icon className="w-8 h-8 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-foreground mb-2">{item.title}</h3>
                      <p className="text-muted-foreground">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Key Benefits Grid */}
          <section className="py-12 md:py-16 px-4">
            <div className="container mx-auto max-w-4xl">
              <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">Key Benefits of Metadata Management</h2>
              <div className="grid md:grid-cols-3 gap-4">
                {[
                  "Protect your location privacy",
                  "Remove personal identifiers",
                  "View camera settings",
                  "Verify image authenticity",
                  "Manage copyright information",
                  "Analyze photo collections",
                  "Learn photography techniques",
                  "Clean images for sharing",
                  "Understand editing history"
                ].map((benefit, index) => (
                  <div key={index} className="flex items-center gap-3 p-4 bg-card border border-border rounded-lg">
                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                    <span className="text-foreground">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Privacy Section */}
          <section className="py-12 md:py-16 px-4 bg-secondary/30">
            <div className="container mx-auto max-w-4xl">
              <div className="bg-card border border-border rounded-xl p-8">
                <div className="flex items-start gap-4 mb-6">
                  <Lock className="w-10 h-10 text-primary flex-shrink-0" />
                  <div>
                    <h3 className="text-xl font-semibold text-foreground mb-2">Your Photos Stay Private</h3>
                    <p className="text-muted-foreground">
                      All metadata viewing and removal happens directly in your browser using client-side JavaScript. Your images are never uploaded to any external server. This ensures complete privacy for your photos and their embedded information.
                    </p>
                  </div>
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                  {[
                    { title: "Zero Server Uploads", desc: "All metadata viewing and removal happens 100% locally. No image data leaves your device." },
                    { title: "No Data Collection", desc: "We do not track, store, or analyze any information about your images or metadata." },
                    { title: "No Account Required", desc: "Use our metadata tool freely without registration, login, or personal information." },
                    { title: "Automatic Cleanup", desc: "When you close the browser tab, all processed images are automatically cleared from memory." }
                  ].map((item, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <Shield className="w-5 h-5 text-green-500 flex-shrink-0 mt-1" />
                      <div>
                        <h4 className="font-semibold text-foreground">{item.title}</h4>
                        <p className="text-muted-foreground text-sm">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* FAQ Section */}
          <section className="py-12 md:py-16 px-4">
            <div className="container mx-auto max-w-4xl">
              <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">Frequently Asked Questions</h2>
              <Accordion type="single" collapsible className="w-full">
                {faqs.map((faq, index) => (
                  <AccordionItem key={index} value={`item-${index}`}>
                    <AccordionTrigger className="text-left">{faq.question}</AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">{faq.answer}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default ImageMetadataPage;
