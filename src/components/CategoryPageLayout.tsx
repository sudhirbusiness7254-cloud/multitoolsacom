import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { ArrowRight, Users, Briefcase, Target, Shield, ChevronRight, Zap, CheckCircle, Sparkles, Star, Award } from "lucide-react";
import { toolCategories, Category } from "@/data/toolsData";
import { CategorySEOContent } from "@/data/categorySEOData";
import HreflangTags from "@/components/HreflangTags";
import RelatedArticles from "@/components/RelatedArticles";
import { getTemplateConfig, categoryColorSchemes } from "@/components/seo-templates/TemplateStyles";
import { getHeadingClasses, getCardClasses, getBadgeClasses } from "@/components/seo-templates/UniqueContentStyles";
import InContentAd from "@/components/ads/InContentAd";

// Import unique hero banners for each category
import heroConverter from "@/assets/heroes/hero-image-converter.jpg";
import heroCompression from "@/assets/heroes/hero-image-compression.jpg";
import heroResize from "@/assets/heroes/hero-image-resize.jpg";
import heroCrop from "@/assets/heroes/hero-image-crop.jpg";
import heroRotateFlip from "@/assets/heroes/hero-rotate-flip.jpg";
import heroFilters from "@/assets/heroes/hero-photo-filters.jpg";
import heroWatermark from "@/assets/heroes/hero-watermark.jpg";
import heroPdf from "@/assets/heroes/hero-pdf-tools.jpg";
import heroMetadata from "@/assets/heroes/hero-metadata.jpg";
import heroSecurity from "@/assets/heroes/hero-security.jpg";
import heroCombine from "@/assets/heroes/hero-combine.jpg";
import heroQr from "@/assets/heroes/hero-qr-tools.jpg";
import heroDocument from "@/assets/heroes/hero-document.jpg";
import heroDrawing from "@/assets/heroes/hero-drawing.jpg";
import heroOptimization from "@/assets/heroes/hero-optimization.jpg";
import heroFormatUtilities from "@/assets/heroes/hero-format-utilities.jpg";

// Map category slugs to hero images
const categoryHeroImages: Record<string, string> = {
  "image-converter": heroConverter,
  "image-compression": heroCompression,
  "image-resize": heroResize,
  "image-crop": heroCrop,
  "image-rotate-flip": heroRotateFlip,
  "photo-filters": heroFilters,
  "watermark-tools": heroWatermark,
  "pdf-tools": heroPdf,
  "image-metadata": heroMetadata,
  "image-security": heroSecurity,
  "image-combine": heroCombine,
  "image-qr": heroQr,
  "image-to-document": heroDocument,
  "image-drawing": heroDrawing,
  "image-optimization": heroOptimization,
  "format-utilities": heroFormatUtilities,
};

// Map categories to animation variants for visual diversity
const categoryAnimationVariants: Record<string, "particles" | "waves" | "bubbles" | "stars" | "geometric"> = {
  "image-converter": "particles",
  "image-compression": "geometric",
  "image-resize": "waves",
  "image-crop": "geometric",
  "image-rotate-flip": "particles",
  "photo-filters": "bubbles",
  "watermark-tools": "stars",
  "pdf-tools": "geometric",
  "image-metadata": "particles",
  "image-security": "stars",
  "image-combine": "waves",
  "image-qr": "geometric",
  "image-to-document": "particles",
  "image-drawing": "bubbles",
  "image-optimization": "waves",
  "format-utilities": "geometric",
};

import AnimatedHeroBackground from "@/components/AnimatedHeroBackground";

interface CategoryPageLayoutProps {
  category: Category;
  seoContent: CategorySEOContent;
  children?: React.ReactNode;
}

const CategoryPageLayout = ({
  category,
  seoContent,
  children
}: CategoryPageLayoutProps) => {
  const {
    metaTitle,
    metaDescription,
    h1,
    shortDescription,
    howToUse,
    benefits,
    faqs,
    gradientFrom,
    gradientTo
  } = seoContent;
  
  // Get unique template configuration for this category
  const templateConfig = getTemplateConfig(category.slug);
  const headingClasses = getHeadingClasses(templateConfig);
  const cardClasses = getCardClasses(templateConfig);
  const badgeClasses = getBadgeClasses(category.slug);
  
  // Extended unique content per category
  const categoryUniqueContent = getCategoryUniqueContent(category.slug);
  
  const canonicalUrl = `https://multitoolsa.com/${category.slug}`;

  const schemaMarkup = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": metaTitle,
    "description": metaDescription,
    "url": canonicalUrl,
    "applicationCategory": "UtilitiesApplication",
    "operatingSystem": "Web Browser",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    }
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };

  // Get related categories for internal linking
  const relatedCategories = toolCategories
    .filter(cat => cat.id !== category.id && cat.id !== "tag-tools")
    .slice(0, 4);

  // Table of Contents sections
  const tocSections = [
    { id: "tools", label: "Available Tools" },
    { id: "who-uses", label: "Who Uses This" },
    { id: "use-cases", label: "Real Use Cases" },
    { id: "how-to", label: "How It Works" },
    { id: "faq", label: "FAQ" }
  ];

  return (
    <>
      <Helmet>
        <title>{metaTitle}</title>
        <meta name="description" content={metaDescription} />
        <link rel="canonical" href={canonicalUrl} />
        
        <meta property="og:title" content={metaTitle} />
        <meta property="og:description" content={metaDescription} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={canonicalUrl} />
        
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={metaTitle} />
        <meta name="twitter:description" content={metaDescription} />
        
        <script type="application/ld+json">
          {JSON.stringify(schemaMarkup)}
        </script>
        <script type="application/ld+json">
          {JSON.stringify(faqSchema)}
        </script>
      </Helmet>
      <HreflangTags path={`/${category.slug}`} />

      <div className="min-h-screen bg-background flex flex-col">
        <Header />
        
        <main className="flex-1">
          {/* Hero Section - Unique per Template with Animated Hero Banner */}
          <section 
            className={`py-8 sm:py-12 relative overflow-hidden ${
              templateConfig.style === 'creative' ? 'bg-gradient-to-br' :
              templateConfig.style === 'professional' ? 'bg-gradient-to-r' :
              'bg-gradient-to-b'
            }`}
          >
            {/* Animated Background with Hero Image */}
            <AnimatedHeroBackground
              gradientFrom={gradientFrom}
              gradientTo={gradientTo}
              heroImage={categoryHeroImages[category.slug]}
              categoryName={category.name}
              variant={categoryAnimationVariants[category.slug] || "particles"}
            />
            <div className="container mx-auto px-4 sm:px-6 relative z-10">
              <div className="text-center max-w-2xl mx-auto mb-6">
                {/* Unique badge per category */}
                <div className={`inline-flex items-center gap-2 mb-4 ${badgeClasses}`}>
                  {templateConfig.style === 'creative' ? <Sparkles className="w-4 h-4" /> :
                   templateConfig.style === 'professional' ? <Award className="w-4 h-4" /> :
                   <Star className="w-4 h-4" />}
                  <span className="text-sm font-medium">Free Online Tools</span>
                </div>
                
                <h1 className={`text-2xl sm:text-3xl md:text-4xl mb-3 ${headingClasses}`}>
                  {h1 || category.name}
                </h1>
                <p className="text-sm sm:text-base text-muted-foreground">
                  {shortDescription}
                </p>
              </div>
              
              {/* Quick Navigation - Table of Contents with unique styling */}
              <nav className="flex flex-wrap justify-center gap-2 mb-8" aria-label="Page sections">
                {tocSections.map((section, index) => (
                  <a
                    key={section.id}
                    href={`#${section.id}`}
                    className={`text-xs sm:text-sm px-3 py-1.5 transition-colors ${
                      templateConfig.cardStyle === 'sharp' ? 'rounded-none border-l-2' :
                      templateConfig.cardStyle === 'floating' ? 'rounded-xl shadow-sm' :
                      'rounded-full'
                    } bg-background/80 border border-border hover:border-primary/50`}
                    style={templateConfig.cardStyle === 'sharp' ? { borderLeftColor: gradientFrom } : {}}
                  >
                    {section.label}
                  </a>
                ))}
              </nav>
            </div>
          </section>

          {/* Main Tool Component (if provided) */}
          {children && (
            <section className="py-6 px-4 sm:px-6">
              <div className="container mx-auto max-w-4xl">
                {children}
              </div>
            </section>
          )}

          {/* Tools Grid - Unique card styling per template */}
          <section id="tools" className="py-8 sm:py-12 px-4 sm:px-6 scroll-mt-20">
            <div className="container mx-auto max-w-5xl">
              <h2 className={`text-xl sm:text-2xl mb-6 text-center ${headingClasses}`}>
                {templateConfig.style === 'creative' ? 'Explore Your Options' :
                 templateConfig.style === 'technical' ? 'Available Utilities' :
                 templateConfig.style === 'professional' ? 'Select Your Solution' :
                 'Choose Your Tool'}
              </h2>
              <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4`}>
                {category.tools.map((tool, index) => (
                  <Link
                    key={tool.id}
                    to={`/${tool.slug}`}
                    className={`group ${cardClasses} p-5 hover:border-primary/50 transition-all duration-300 hover:shadow-lg ${
                      templateConfig.style === 'creative' ? 'hover:-translate-y-1' : ''
                    }`}
                    style={templateConfig.cardStyle === 'sharp' ? { borderLeftColor: gradientFrom } : {}}
                  >
                    <h3 className={`text-base mb-2 group-hover:text-primary transition-colors ${
                      templateConfig.headingStyle === 'technical' ? 'font-mono text-sm uppercase tracking-wide' :
                      templateConfig.headingStyle === 'elegant' ? 'font-serif' :
                      'font-semibold'
                    }`}>
                      {tool.name}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                      {tool.description}
                    </p>
                    
                    {/* Who should use this */}
                    <div className="text-xs text-muted-foreground/80 mb-3 flex items-start gap-1.5">
                      <Users className="w-3.5 h-3.5 mt-0.5 flex-shrink-0" style={{ color: gradientFrom }} />
                      <span>{getToolAudience(tool.slug)}</span>
                    </div>
                    
                    <div className="flex items-center gap-1 text-primary text-sm font-medium">
                      <span>{templateConfig.style === 'professional' ? 'Open Tool' : 
                             templateConfig.style === 'creative' ? 'Try Now' : 'Use Now'}</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>

          {/* Ad placement after tools */}
          <div className="container mx-auto max-w-4xl px-4">
            <InContentAd />
          </div>

          {/* Who Uses This Category - Trust Signal */}
          <section id="who-uses" className="py-8 sm:py-12 px-4 sm:px-6 bg-secondary/30 scroll-mt-20">
            <div className="container mx-auto max-w-4xl">
              <div className="flex items-center gap-3 mb-6">
                <div 
                  className="w-10 h-10 rounded-lg flex items-center justify-center"
                  style={{ background: `linear-gradient(135deg, ${gradientFrom}, ${gradientTo})` }}
                >
                  <Briefcase className="w-5 h-5 text-white" />
                </div>
                <h2 className="text-xl sm:text-2xl font-bold">Who Uses {category.name}?</h2>
              </div>
              
              <div className="grid sm:grid-cols-2 gap-4">
                {categoryUniqueContent.targetAudiences.map((audience, i) => (
                  <div key={i} className="bg-card rounded-xl p-4 border border-border">
                    <h3 className="font-semibold text-sm mb-1" style={{ color: gradientFrom }}>
                      {audience.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">{audience.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Real-World Use Cases */}
          <section id="use-cases" className="py-8 sm:py-12 px-4 sm:px-6 scroll-mt-20">
            <div className="container mx-auto max-w-4xl">
              <div className="flex items-center gap-3 mb-6">
                <div 
                  className="w-10 h-10 rounded-lg flex items-center justify-center"
                  style={{ background: `linear-gradient(135deg, ${gradientFrom}, ${gradientTo})` }}
                >
                  <Target className="w-5 h-5 text-white" />
                </div>
                <h2 className="text-xl sm:text-2xl font-bold">Real-World Use Cases</h2>
              </div>
              
              <div className="bg-card rounded-xl border border-border p-6">
                <ul className="space-y-3">
                  {categoryUniqueContent.useCases.map((useCase, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: gradientFrom }} />
                      <div>
                        <span className="font-medium text-sm">{useCase.scenario}:</span>
                        <span className="text-sm text-muted-foreground ml-1">{useCase.solution}</span>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
              
              {/* When NOT to use */}
              <div className="mt-6 bg-amber-500/10 border border-amber-500/20 rounded-xl p-4">
                <h3 className="font-semibold text-sm text-amber-500 mb-2">When to Use Alternative Tools</h3>
                <p className="text-sm text-muted-foreground">{categoryUniqueContent.whenNotToUse}</p>
              </div>
            </div>
          </section>

          {/* Ad placement between sections */}
          <div className="container mx-auto max-w-4xl px-4">
            <InContentAd />
          </div>

          {/* How It Works - Simplified */}
          <section id="how-to" className="py-8 sm:py-12 px-4 sm:px-6 bg-secondary/30 scroll-mt-20">
            <div className="container mx-auto max-w-4xl">
              <div className="flex items-center gap-3 mb-6">
                <div 
                  className="w-10 h-10 rounded-lg flex items-center justify-center"
                  style={{ background: `linear-gradient(135deg, ${gradientFrom}, ${gradientTo})` }}
                >
                  <Zap className="w-5 h-5 text-white" />
                </div>
                <h2 className="text-xl sm:text-2xl font-bold">How It Works</h2>
              </div>
              
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {howToUse.slice(0, 4).map((step, i) => (
                  <div key={i} className="bg-card rounded-xl p-4 border border-border text-center">
                    <div 
                      className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold mx-auto mb-3 text-white"
                      style={{ background: `linear-gradient(135deg, ${gradientFrom}, ${gradientTo})` }}
                    >
                      {i + 1}
                    </div>
                    <p className="text-sm text-muted-foreground">{step}</p>
                  </div>
                ))}
              </div>
              
              {/* Key Benefits - Compact */}
              <div className="mt-8 flex flex-wrap justify-center gap-2">
                {benefits.slice(0, 6).map((benefit, i) => (
                  <span 
                    key={i} 
                    className="text-xs px-3 py-1.5 rounded-full bg-card border border-border"
                  >
                    ✓ {benefit}
                  </span>
                ))}
              </div>
            </div>
          </section>

          {/* Privacy - Minimal */}
          <section className="py-6 px-4 sm:px-6">
            <div className="container mx-auto max-w-4xl">
              <div className="bg-green-500/10 border border-green-500/20 rounded-xl p-4 flex items-start gap-3">
                <Shield className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-sm text-green-400 mb-1">Your Files Stay Private</h3>
                  <p className="text-sm text-muted-foreground">
                    All processing happens in your browser. Files are never uploaded to any server. 
                    No account needed, no data collected.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* FAQ - Essential Questions Only */}
          <section id="faq" className="py-8 sm:py-12 px-4 sm:px-6 bg-secondary/30 scroll-mt-20">
            <div className="container mx-auto max-w-4xl">
              <h2 className="text-xl sm:text-2xl font-bold mb-6">Frequently Asked Questions</h2>
              
              <Accordion type="single" collapsible className="space-y-2">
                {faqs.slice(0, 5).map((faq, i) => (
                  <AccordionItem key={i} value={`faq-${i}`} className="bg-card border border-border rounded-xl px-4">
                    <AccordionTrigger className="text-left hover:no-underline text-sm py-4">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-sm text-muted-foreground pb-4">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </section>

          {/* Related Blog Articles */}
          <section className="py-6 sm:py-8 px-4 sm:px-6">
            <div className="container mx-auto max-w-4xl">
              <RelatedArticles 
                categorySlug={category.slug} 
                title="Learn More About This Topic"
                maxItems={2}
              />
            </div>
          </section>

          {/* Related Categories - Internal Links */}
          <section className="py-8 sm:py-12 px-4 sm:px-6">
            <div className="container mx-auto max-w-4xl">
              <h2 className="text-lg font-bold mb-4">Explore Related Tools</h2>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {relatedCategories.map((cat) => (
                  <Link
                    key={cat.id}
                    to={`/${cat.slug}`}
                    className="bg-card rounded-lg p-3 border border-border hover:border-primary/50 transition-colors group"
                  >
                    <span className="text-sm font-medium group-hover:text-primary transition-colors flex items-center gap-1">
                      {cat.name}
                      <ChevronRight className="w-3 h-3" />
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </>
  );
};

// Unique content per category - avoids template repetition
function getCategoryUniqueContent(slug: string) {
  const content: Record<string, {
    targetAudiences: { title: string; description: string }[];
    useCases: { scenario: string; solution: string }[];
    whenNotToUse: string;
  }> = {
    "image-compression": {
      targetAudiences: [
        { title: "Web Developers", description: "Optimize images for faster page loads and better Core Web Vitals scores." },
        { title: "E-commerce Managers", description: "Reduce product image sizes without losing visual appeal for shoppers." },
        { title: "Bloggers & Content Creators", description: "Keep your site fast while using high-quality visuals." },
        { title: "Email Marketers", description: "Ensure images load quickly in email clients across all devices." }
      ],
      useCases: [
        { scenario: "Website speed optimization", solution: "Compress hero images and product photos to under 100KB while maintaining clarity" },
        { scenario: "Email campaign preparation", solution: "Reduce newsletter images to ensure delivery and fast loading" },
        { scenario: "Social media scheduling", solution: "Batch compress images for consistent quality across posts" },
        { scenario: "Storage management", solution: "Shrink photo libraries by 70% without visible quality loss" }
      ],
      whenNotToUse: "If you need lossless archival quality for print production or medical imaging, use our lossless PNG format instead of lossy JPEG compression."
    },
    "image-resize": {
      targetAudiences: [
        { title: "Social Media Managers", description: "Create correctly-sized images for Instagram, Facebook, LinkedIn, and Twitter." },
        { title: "Print Designers", description: "Prepare images with exact dimensions for brochures, banners, and posters." },
        { title: "App Developers", description: "Generate multiple icon sizes and responsive image assets." },
        { title: "Photographers", description: "Batch resize client deliverables to meet specific requirements." }
      ],
      useCases: [
        { scenario: "Instagram profile photo", solution: "Resize to exactly 320x320 pixels for crisp display on all devices" },
        { scenario: "LinkedIn banner update", solution: "Use fit-to-width mode for perfect 1584px banner width" },
        { scenario: "App icon generation", solution: "Create 512x512, 256x256, and 128x128 versions from one source" },
        { scenario: "Print preparation", solution: "Scale images to exact print dimensions at 300 DPI" }
      ],
      whenNotToUse: "For cropping specific portions of an image, use our Image Crop tool instead. Resizing scales the entire image; cropping removes unwanted areas."
    },
    "image-crop": {
      targetAudiences: [
        { title: "Profile Picture Creators", description: "Crop photos into circles or squares for social media profiles." },
        { title: "Product Photographers", description: "Remove backgrounds and focus on products for e-commerce listings." },
        { title: "Real Estate Agents", description: "Crop property photos to highlight best features for listings." },
        { title: "Graphic Designers", description: "Extract specific elements from larger compositions." }
      ],
      useCases: [
        { scenario: "LinkedIn headshot", solution: "Crop a full photo into a professional 1:1 square focusing on face and shoulders" },
        { scenario: "YouTube thumbnail", solution: "Use 16:9 aspect ratio crop to frame the most engaging part of your image" },
        { scenario: "Pinterest pin creation", solution: "Crop to 2:3 vertical format optimized for Pinterest feed" },
        { scenario: "Facebook cover photo", solution: "Precise cropping to 820x312 dimensions for perfect banner fit" }
      ],
      whenNotToUse: "If you need to scale the entire image without removing any content, use our Image Resize tool. Cropping removes portions; resizing keeps everything."
    },
    "image-converter": {
      targetAudiences: [
        { title: "Website Developers", description: "Convert legacy formats to WebP for modern browser optimization." },
        { title: "Graphic Designers", description: "Switch between PNG and JPEG based on transparency and quality needs." },
        { title: "IT Professionals", description: "Batch convert old BMP and TIFF archives to modern formats." },
        { title: "iPhone Users", description: "Convert HEIC photos to widely-compatible JPEG or PNG." }
      ],
      useCases: [
        { scenario: "HEIC to JPEG conversion", solution: "Make iPhone photos shareable on Windows PCs and older devices" },
        { scenario: "PNG to WebP migration", solution: "Reduce website image sizes by 25-35% with WebP conversion" },
        { scenario: "Transparency preservation", solution: "Convert from JPEG to PNG when you need transparent backgrounds" },
        { scenario: "Archive digitization", solution: "Convert scanned TIFF documents to searchable PDF format" }
      ],
      whenNotToUse: "Converting from a lossy format (JPEG) to lossless (PNG) won't restore lost quality. Start with original high-quality sources when possible."
    },
    "image-rotate-flip": {
      targetAudiences: [
        { title: "Photographers", description: "Fix orientation issues from camera sensors or portrait/landscape mistakes." },
        { title: "Document Scanners", description: "Correct upside-down or sideways scanned documents." },
        { title: "Social Media Users", description: "Flip selfies or create mirror effects for creative posts." },
        { title: "Architects & Engineers", description: "Rotate technical drawings and blueprints to correct orientation." }
      ],
      useCases: [
        { scenario: "Phone photo correction", solution: "Rotate photos that appear sideways due to EXIF orientation issues" },
        { scenario: "Scanned document fix", solution: "Rotate scanned PDFs and images to readable orientation" },
        { scenario: "Mirror selfie effect", solution: "Flip photos horizontally to reverse the camera mirror effect" },
        { scenario: "Before/after comparisons", solution: "Flip images to create symmetrical comparison layouts" }
      ],
      whenNotToUse: "For complex perspective corrections or lens distortion fixes, you'll need advanced editing software. This tool handles simple rotation and flipping only."
    },
    "image-format-utilities": {
      targetAudiences: [
        { title: "Print Professionals", description: "Convert color images to grayscale for newspaper or technical printing." },
        { title: "Web Developers", description: "Add or remove transparency from images for different contexts." },
        { title: "Archivists", description: "Standardize image formats and color modes across collections." },
        { title: "Artists & Photographers", description: "Apply sepia, invert colors, or create black-and-white versions." }
      ],
      useCases: [
        { scenario: "Logo transparency", solution: "Remove white backgrounds to create PNG logos with transparent backgrounds" },
        { scenario: "Print-ready conversion", solution: "Convert color photos to grayscale for newspaper publication" },
        { scenario: "Vintage photo effect", solution: "Apply sepia toning to create nostalgic, aged appearance" },
        { scenario: "Negative creation", solution: "Invert colors to create artistic negatives or check for errors" }
      ],
      whenNotToUse: "For complex color grading with multiple adjustments, use our Photo Filters tool. Format utilities handle single-step transformations."
    },
    "photo-filters": {
      targetAudiences: [
        { title: "Social Media Influencers", description: "Apply consistent filters to maintain brand aesthetic across posts." },
        { title: "Amateur Photographers", description: "Enhance photos with one-click professional-looking adjustments." },
        { title: "Marketing Teams", description: "Create cohesive visual styles for campaign materials." },
        { title: "Hobbyist Editors", description: "Experiment with artistic effects without complex software." }
      ],
      useCases: [
        { scenario: "Instagram feed consistency", solution: "Apply the same warmth and contrast settings to all feed images" },
        { scenario: "Underexposed photo fix", solution: "Adjust brightness and contrast to rescue dark indoor photos" },
        { scenario: "Vintage aesthetic", solution: "Combine sepia, grain, and vignette for authentic retro look" },
        { scenario: "Product enhancement", solution: "Boost saturation and sharpen details for e-commerce listings" }
      ],
      whenNotToUse: "For precise color correction with histogram controls, you'll need professional software. Our filters provide quick, effective adjustments for common needs."
    },
    "watermark-tools": {
      targetAudiences: [
        { title: "Photographers", description: "Protect portfolio images with subtle, professional watermarks." },
        { title: "Stock Image Contributors", description: "Add watermarks to preview images before sale." },
        { title: "Business Owners", description: "Brand marketing images with company logos." },
        { title: "Content Creators", description: "Prevent unauthorized use of original visual content." }
      ],
      useCases: [
        { scenario: "Portfolio protection", solution: "Add semi-transparent logo watermark to client previews" },
        { scenario: "Social media branding", solution: "Consistently watermark all posts with your handle or logo" },
        { scenario: "Document authenticity", solution: "Add text watermarks like 'CONFIDENTIAL' or 'DRAFT' to documents" },
        { scenario: "Proof sheet creation", solution: "Tile watermarks across event photos for client review" }
      ],
      whenNotToUse: "Watermarks can be cropped or edited out by determined users. For maximum protection, consider lower resolution previews alongside watermarks."
    },
    "image-combine": {
      targetAudiences: [
        { title: "Real Estate Agents", description: "Create property collages showing multiple rooms in one image." },
        { title: "Social Media Creators", description: "Build before/after comparisons and multi-image posts." },
        { title: "Event Photographers", description: "Combine ceremony, reception, and portrait shots into layouts." },
        { title: "E-commerce Sellers", description: "Show products from multiple angles in single listing images." }
      ],
      useCases: [
        { scenario: "Before/after showcase", solution: "Combine transformation photos side-by-side with matching dimensions" },
        { scenario: "Product gallery", solution: "Merge front, side, and detail shots into single product image" },
        { scenario: "Social media collage", solution: "Arrange 4-6 images in grid layout for Instagram carousel covers" },
        { scenario: "Comparison graphic", solution: "Stack competitor vs. your product images vertically for marketing" }
      ],
      whenNotToUse: "For layered compositions with overlapping images and blending, you need a full image editor. Our tool creates clean grids and arrangements."
    },
    "image-drawing": {
      targetAudiences: [
        { title: "Educators", description: "Annotate diagrams, maps, and educational materials with circles and arrows." },
        { title: "Bug Reporters", description: "Mark up screenshots to clearly indicate issues for developers." },
        { title: "Reviewers & Editors", description: "Highlight areas requiring attention in design mockups." },
        { title: "Social Media Users", description: "Add fun doodles, text, and shapes to photos." }
      ],
      useCases: [
        { scenario: "Bug report clarity", solution: "Draw circles and arrows pointing to UI issues in screenshots" },
        { scenario: "Design feedback", solution: "Add text notes and highlights to mockup review images" },
        { scenario: "Tutorial creation", solution: "Number steps and draw attention to important interface elements" },
        { scenario: "Property highlighting", solution: "Circle and label features in real estate listing photos" }
      ],
      whenNotToUse: "For detailed digital artwork or painting, use dedicated drawing apps. This tool excels at quick annotations and simple markup."
    },
    "image-security": {
      targetAudiences: [
        { title: "HR Professionals", description: "Redact personal information from documents before sharing." },
        { title: "Legal Teams", description: "Obscure sensitive content in evidence or case materials." },
        { title: "Privacy-Conscious Users", description: "Blur faces or identifying details in photos." },
        { title: "Healthcare Workers", description: "Anonymize patient information in medical images." }
      ],
      useCases: [
        { scenario: "Social media privacy", solution: "Blur faces of people who haven't consented to photo sharing" },
        { scenario: "Document redaction", solution: "Black out SSNs, addresses, and financial information" },
        { scenario: "License plate removal", solution: "Pixelate vehicle plates in street photography" },
        { scenario: "Screenshot sanitization", solution: "Hide personal data before sharing troubleshooting screenshots" }
      ],
      whenNotToUse: "For complete, forensically-secure redaction, use dedicated redaction software that removes underlying data. Browser tools work on the visual layer only."
    },
    "image-optimization": {
      targetAudiences: [
        { title: "SEO Specialists", description: "Improve Core Web Vitals with properly optimized images." },
        { title: "Performance Engineers", description: "Reduce page weight for faster load times globally." },
        { title: "Mobile Developers", description: "Prepare images that work well on bandwidth-limited connections." },
        { title: "UX Designers", description: "Balance visual quality with performance for best user experience." }
      ],
      useCases: [
        { scenario: "Core Web Vitals improvement", solution: "Optimize images to achieve LCP under 2.5 seconds" },
        { scenario: "Mobile-first optimization", solution: "Create smaller variants for mobile devices with limited bandwidth" },
        { scenario: "CDN preparation", solution: "Prepare optimized images in multiple sizes for responsive delivery" },
        { scenario: "Email weight reduction", solution: "Keep total email size under 100KB for reliable delivery" }
      ],
      whenNotToUse: "If original quality is more important than file size (print, archival), skip optimization. Always keep original high-quality backups."
    },
    "image-qr": {
      targetAudiences: [
        { title: "Marketing Teams", description: "Create QR codes linking to campaigns, landing pages, and promotions." },
        { title: "Restaurant Owners", description: "Generate menu QR codes for contactless dining experiences." },
        { title: "Event Organizers", description: "Build QR codes for tickets, registration, and information." },
        { title: "Small Business Owners", description: "Add payment and contact QR codes to marketing materials." }
      ],
      useCases: [
        { scenario: "Digital menu access", solution: "Generate QR code linking to your online menu PDF or webpage" },
        { scenario: "Business card enhancement", solution: "Create vCard QR with contact details for easy phone saving" },
        { scenario: "WiFi sharing", solution: "Generate QR that automatically connects guests to your network" },
        { scenario: "Payment collection", solution: "Create PayPal or Venmo payment request QR codes" }
      ],
      whenNotToUse: "For dynamic QR codes that can be updated after printing, you need a subscription QR service. Our static QR codes are permanent once created."
    },
    "image-to-document": {
      targetAudiences: [
        { title: "Teachers & Students", description: "Convert photos of notes, diagrams, or worksheets into shareable documents." },
        { title: "Administrative Staff", description: "Transform scanned images into editable PDF documents." },
        { title: "Researchers", description: "Compile image collections into organized PDF reports." },
        { title: "Sales Teams", description: "Create presentation slides from product photos." }
      ],
      useCases: [
        { scenario: "Photo album PDF", solution: "Combine vacation or event photos into a shareable PDF document" },
        { scenario: "Presentation creation", solution: "Convert product images into PowerPoint slides with one click" },
        { scenario: "Documentation", solution: "Turn screenshots into organized PDF manuals or guides" },
        { scenario: "Report compilation", solution: "Merge charts and diagrams into professional Word documents" }
      ],
      whenNotToUse: "For OCR (extracting text from images), you'll need specialized OCR tools. Our converters embed images as-is without text extraction."
    },
    "image-metadata": {
      targetAudiences: [
        { title: "Privacy Advocates", description: "Remove GPS and camera data before sharing photos online." },
        { title: "Photographers", description: "View and manage EXIF data including camera settings and dates." },
        { title: "Journalists", description: "Verify image authenticity and origin through metadata analysis." },
        { title: "Legal Professionals", description: "Extract metadata for evidence documentation and verification." }
      ],
      useCases: [
        { scenario: "Social media privacy", solution: "Strip GPS location data before posting travel photos" },
        { scenario: "Photo organization", solution: "View date taken and camera info to sort mixed photo libraries" },
        { scenario: "Authenticity check", solution: "Verify if a photo has been edited by examining metadata" },
        { scenario: "Legal evidence", solution: "Extract and document metadata for court proceedings" }
      ],
      whenNotToUse: "For deep forensic analysis of manipulated images, professional forensic tools are needed. Our tool reads standard EXIF/metadata fields."
    },
    "pdf-tools": {
      targetAudiences: [
        { title: "Office Workers", description: "Merge, split, and compress PDFs for everyday document management." },
        { title: "Students", description: "Combine lecture slides, notes, and readings into single documents." },
        { title: "Legal Professionals", description: "Extract specific pages from lengthy legal documents." },
        { title: "HR Teams", description: "Merge application materials into single candidate files." }
      ],
      useCases: [
        { scenario: "Contract combination", solution: "Merge multiple PDF attachments into one document for signing" },
        { scenario: "Chapter extraction", solution: "Split specific pages from a large manual for quick reference" },
        { scenario: "Email-ready files", solution: "Compress large PDFs to under 10MB for email attachment" },
        { scenario: "Report assembly", solution: "Combine cover page, content, and appendices into final PDF" }
      ],
      whenNotToUse: "For editing text within PDFs, you need a PDF editor with OCR. Our tools handle document structure (merge, split, compress) not content editing."
    }
  };
  
  return content[slug] || {
    targetAudiences: [
      { title: "General Users", description: "Anyone needing quick, free image processing." },
      { title: "Professionals", description: "Designers, developers, and marketers." },
      { title: "Small Businesses", description: "Cost-effective image solutions." },
      { title: "Students", description: "Free tools for educational projects." }
    ],
    useCases: [
      { scenario: "Quick edits", solution: "Fast browser-based processing without software installation" },
      { scenario: "Privacy needs", solution: "All processing happens locally on your device" },
      { scenario: "Multi-device access", solution: "Works on any device with a modern browser" },
      { scenario: "Batch processing", solution: "Handle multiple files efficiently" }
    ],
    whenNotToUse: "For complex professional workflows requiring advanced features, consider dedicated software alongside our quick-access tools."
  };
}

// Tool-specific audience descriptions
function getToolAudience(slug: string): string {
  const audiences: Record<string, string> = {
    "jpeg-to-png": "Web designers, developers needing transparency",
    "png-to-jpeg": "Photographers, those sharing via email",
    "webp-to-png": "Users needing broader compatibility",
    "png-to-webp": "Website owners, performance optimizers",
    "heic-to-jpg": "iPhone users, cross-platform sharers",
    "gif-to-png": "Graphic designers, print preparers",
    "bmp-to-png": "Legacy file converters, archivists",
    "tiff-to-jpeg": "Print professionals, document managers",
    "svg-to-png": "Web developers, presentation creators",
    "exact-resize": "Social media managers, platform-specific posters",
    "percentage-resize": "Batch processors, uniform scaling needs",
    "fit-to-width": "Blog writers, email template designers",
    "fit-to-height": "App developers, UI designers",
    "fit-to-box": "E-commerce sellers, gallery curators",
    "quality-resize": "Performance optimizers, web developers",
    "jpeg-compressor": "Photographers, website owners",
    "png-compressor": "Designers working with graphics",
    "webp-compressor": "Modern web developers",
    "gif-compressor": "Social media, animation creators",
    "tiff-compressor": "Print and archive professionals",
    "universal-compressor": "Anyone needing quick compression",
    "manual-crop": "Creative directors, custom compositions",
    "aspect-ratio-crop": "Social media managers, platform posters",
    "circle-crop": "Profile picture creators, avatar makers",
    "square-crop": "Thumbnail creators, grid layouts",
    "image-to-pdf": "Document creators, report builders",
    "image-to-docx": "Content writers, documentation teams",
    "image-to-pptx": "Presenters, educators",
    "image-to-base64": "Web developers, email template creators",
    "image-to-html": "Web developers, email designers"
  };
  
  return audiences[slug] || "General users, hobbyists, professionals";
}

export default CategoryPageLayout;
