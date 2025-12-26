import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { ArrowRight, BookOpen, Shield, HelpCircle, Lightbulb, CheckCircle, Lock, Globe, Zap, Users } from "lucide-react";
import { toolCategories, Category } from "@/data/toolsData";
import { CategorySEOContent } from "@/data/categorySEOData";
import HreflangTags from "@/components/HreflangTags";

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
    longDescription,
    howToUse,
    benefits,
    faqs,
    gradientFrom,
    gradientTo
  } = seoContent;
  
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

  // Get other image categories for internal linking
  const otherCategories = toolCategories
    .filter(cat => cat.id !== category.id && cat.id !== "tag-tools")
    .slice(0, 6);

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
          {/* Hero Section */}
          <section 
            className="py-6 sm:py-8 md:py-12 relative overflow-hidden"
            style={{
              background: `linear-gradient(135deg, ${gradientFrom}20 0%, ${gradientTo}20 100%)`
            }}
          >
            <div 
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] sm:w-[400px] md:w-[600px] h-[300px] sm:h-[400px] md:h-[600px] rounded-full blur-3xl"
              style={{ backgroundColor: `${gradientFrom}15` }}
            />
            
            <div className="container mx-auto px-4 sm:px-6 relative z-10">
              <div className="text-center max-w-3xl mx-auto mb-6 sm:mb-8">
                <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4">
                  {h1 || category.name}
                </h1>
                <p className="text-sm sm:text-base md:text-lg text-muted-foreground px-2">
                  {shortDescription}
                </p>
              </div>
              
              {/* Main Tool Component (if provided) */}
              {children && (
                <div className="max-w-4xl mx-auto mb-8 sm:mb-12">
                  {children}
                </div>
              )}

              {/* Tools Grid */}
              <div className="max-w-5xl mx-auto">
                <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-center">Choose Your Tool</h2>
                <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4">
                  {category.tools.map((tool) => (
                    <Link
                      key={tool.id}
                      to={`/${tool.slug}`}
                      className="group bg-card rounded-xl p-4 sm:p-5 border border-border hover:border-primary/50 transition-all duration-300 hover-lift touch-target"
                    >
                      <h3 className="font-semibold text-sm sm:text-base mb-1 sm:mb-2 group-hover:text-primary transition-colors">
                        {tool.name}
                      </h3>
                      <p className="text-xs sm:text-sm text-muted-foreground mb-2 sm:mb-3 line-clamp-2">{tool.description}</p>
                      <div className="flex items-center gap-1 text-primary text-xs sm:text-sm font-medium">
                        <span>Use Tool</span>
                        <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Comprehensive About Section - 500+ words */}
          <section className="py-8 sm:py-12 md:py-16 px-4 sm:px-6">
            <div className="container mx-auto max-w-4xl">
              <div className="flex items-center gap-3 mb-6">
                <div 
                  className="w-10 h-10 rounded-lg flex items-center justify-center"
                  style={{ background: `linear-gradient(135deg, ${gradientFrom}, ${gradientTo})` }}
                >
                  <BookOpen className="w-5 h-5 text-white" />
                </div>
                <h2 className="text-xl sm:text-2xl md:text-3xl font-bold">What is {category.name}?</h2>
              </div>
              
              <div className="bg-card rounded-2xl border border-border p-6 sm:p-8 space-y-6">
                <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                  {longDescription}
                </p>
                
                <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                  Our {category.name.toLowerCase()} tools are meticulously designed to provide professional-grade functionality while maintaining an intuitive user interface that anyone can use. Whether you are a seasoned graphic designer working on complex projects, a social media manager preparing content for multiple platforms, a student working on educational materials, or simply someone who wants to enhance personal photos, our comprehensive suite of tools caters to all skill levels and requirements.
                </p>
                
                <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                  The technology behind our {category.name.toLowerCase()} platform leverages advanced browser-based processing capabilities, utilizing modern web technologies such as HTML5 Canvas, WebGL acceleration, and optimized JavaScript algorithms. This approach ensures that all image processing happens directly on your device, eliminating the need to upload sensitive files to remote servers. The result is faster processing times, enhanced privacy protection, and the ability to work offline once the page is loaded.
                </p>
                
                <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                  We understand that different users have different needs. A photographer might need precise control over image quality and format conversion, while a blogger might prioritize quick processing and ease of use. Our tools are built to accommodate these varying requirements, offering both simplified one-click operations for beginners and advanced customization options for professionals who need granular control over their image processing workflow.
                </p>
                
                <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                  The importance of proper {category.name.toLowerCase()} cannot be overstated in today's digital landscape. Images are the cornerstone of online communication, marketing, and personal expression. From e-commerce product photos that need to be optimized for fast loading while maintaining visual appeal, to social media content that must meet specific platform requirements, to professional portfolios that demand the highest quality output – our tools provide the solutions you need to achieve your goals efficiently and effectively.
                </p>

                {/* Key Advantages */}
                <div className="grid sm:grid-cols-2 gap-4 pt-4">
                  <div className="flex items-start gap-3">
                    <Zap className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: gradientFrom }} />
                    <div>
                      <h4 className="font-semibold text-sm">Lightning Fast Processing</h4>
                      <p className="text-xs text-muted-foreground">Process images instantly without waiting for server uploads</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Globe className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: gradientFrom }} />
                    <div>
                      <h4 className="font-semibold text-sm">Works Everywhere</h4>
                      <p className="text-xs text-muted-foreground">Compatible with all modern browsers on any device</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Lock className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: gradientFrom }} />
                    <div>
                      <h4 className="font-semibold text-sm">100% Private</h4>
                      <p className="text-xs text-muted-foreground">Your files never leave your device</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Users className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: gradientFrom }} />
                    <div>
                      <h4 className="font-semibold text-sm">No Account Required</h4>
                      <p className="text-xs text-muted-foreground">Start using immediately without registration</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Benefits */}
          <section className="py-8 sm:py-12 md:py-16 px-4 sm:px-6 bg-secondary/30">
            <div className="container mx-auto max-w-5xl">
              <div className="flex items-center gap-3 mb-6 sm:mb-8 justify-center">
                <div 
                  className="w-10 h-10 rounded-lg flex items-center justify-center"
                  style={{ background: `linear-gradient(135deg, ${gradientFrom}, ${gradientTo})` }}
                >
                  <CheckCircle className="w-5 h-5 text-white" />
                </div>
                <h2 className="text-xl sm:text-2xl md:text-3xl font-bold">Key Benefits</h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {benefits.map((benefit, i) => (
                  <div 
                    key={i} 
                    className="bg-card rounded-xl p-4 sm:p-5 border border-border flex items-start gap-3"
                  >
                    <div 
                      className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 text-white font-bold text-sm"
                      style={{ background: `linear-gradient(135deg, ${gradientFrom}, ${gradientTo})` }}
                    >
                      {i + 1}
                    </div>
                    <span className="text-sm text-muted-foreground pt-1">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* How to Use - Comprehensive Guide */}
          <section className="py-8 sm:py-12 md:py-16 px-4 sm:px-6">
            <div className="container mx-auto max-w-4xl">
              <div className="flex items-center gap-3 mb-6">
                <div 
                  className="w-10 h-10 rounded-lg flex items-center justify-center"
                  style={{ background: `linear-gradient(135deg, ${gradientFrom}, ${gradientTo})` }}
                >
                  <Lightbulb className="w-5 h-5 text-white" />
                </div>
                <h2 className="text-xl sm:text-2xl md:text-3xl font-bold">How to Use {category.name}</h2>
              </div>
              
              <div className="bg-card rounded-2xl border border-border p-6 sm:p-8 mb-6">
                <p className="text-sm sm:text-base text-muted-foreground leading-relaxed mb-6">
                  Using our {category.name.toLowerCase()} tools is straightforward and intuitive. We have designed the entire workflow to minimize complexity while maximizing functionality. Below you will find a comprehensive step-by-step guide that will help you get the most out of our tools, whether you are a first-time user or an experienced professional looking to optimize your workflow.
                </p>
                
                <div className="space-y-4">
                  {howToUse.map((step, i) => (
                    <div key={i} className="flex gap-3 sm:gap-4 items-start">
                      <div 
                        className="w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center text-sm sm:text-base font-bold flex-shrink-0 text-white"
                        style={{ background: `linear-gradient(135deg, ${gradientFrom}, ${gradientTo})` }}
                      >
                        {i + 1}
                      </div>
                      <div className="bg-secondary/50 rounded-xl p-4 flex-1">
                        <p className="text-sm text-muted-foreground">{step}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Additional Usage Tips */}
              <div className="bg-secondary/30 rounded-2xl border border-border p-6 sm:p-8">
                <h3 className="font-semibold text-lg mb-4">Pro Tips for Best Results</h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: gradientFrom }} />
                    <span className="text-sm text-muted-foreground">For optimal performance, use images under 50MB. Larger files may take longer to process depending on your device capabilities.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: gradientFrom }} />
                    <span className="text-sm text-muted-foreground">Always keep a backup of your original images before making permanent edits or conversions.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: gradientFrom }} />
                    <span className="text-sm text-muted-foreground">Use the preview feature to check your changes before downloading the final result.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: gradientFrom }} />
                    <span className="text-sm text-muted-foreground">For batch processing needs, you can process multiple images one after another without refreshing the page.</span>
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* Privacy Section */}
          <section className="py-8 sm:py-12 md:py-16 px-4 sm:px-6 bg-secondary/30">
            <div className="container mx-auto max-w-4xl">
              <div className="flex items-center gap-3 mb-6">
                <div 
                  className="w-10 h-10 rounded-lg flex items-center justify-center"
                  style={{ background: `linear-gradient(135deg, ${gradientFrom}, ${gradientTo})` }}
                >
                  <Shield className="w-5 h-5 text-white" />
                </div>
                <h2 className="text-xl sm:text-2xl md:text-3xl font-bold">Privacy & Security</h2>
              </div>
              
              <div className="bg-card rounded-2xl border border-border p-6 sm:p-8 space-y-6">
                <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                  At MultiTools, we take your privacy extremely seriously. In an age where data breaches and privacy violations are increasingly common, we have built our platform with a fundamentally different approach: your files never leave your device. This is not just a feature – it is the core architectural principle behind everything we build.
                </p>
                
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="bg-green-500/10 border border-green-500/20 rounded-xl p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Lock className="w-5 h-5 text-green-500" />
                      <h4 className="font-semibold text-green-400">100% Client-Side Processing</h4>
                    </div>
                    <p className="text-xs text-muted-foreground">All image processing happens directly in your browser using your device's computing power. Your files are never uploaded to any server.</p>
                  </div>
                  <div className="bg-green-500/10 border border-green-500/20 rounded-xl p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Shield className="w-5 h-5 text-green-500" />
                      <h4 className="font-semibold text-green-400">No Data Collection</h4>
                    </div>
                    <p className="text-xs text-muted-foreground">We do not collect, store, or transmit any of your images or personal data. Your files remain completely private.</p>
                  </div>
                  <div className="bg-green-500/10 border border-green-500/20 rounded-xl p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Globe className="w-5 h-5 text-green-500" />
                      <h4 className="font-semibold text-green-400">Works Offline</h4>
                    </div>
                    <p className="text-xs text-muted-foreground">Once loaded, our tools work even without an internet connection, further ensuring your files stay on your device.</p>
                  </div>
                  <div className="bg-green-500/10 border border-green-500/20 rounded-xl p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <CheckCircle className="w-5 h-5 text-green-500" />
                      <h4 className="font-semibold text-green-400">No Account Required</h4>
                    </div>
                    <p className="text-xs text-muted-foreground">Use all our tools without creating an account or providing any personal information whatsoever.</p>
                  </div>
                </div>
                
                <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                  This privacy-first approach means you can confidently process sensitive documents, personal photos, confidential business materials, and any other files without worrying about data leaks or unauthorized access. Whether you are a healthcare professional handling patient-related images, a lawyer working with confidential documents, or simply a privacy-conscious individual, our tools provide the security and peace of mind you need.
                </p>
                
                <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                  We believe that powerful image tools should not come at the cost of your privacy. That is why we have invested significant effort in developing sophisticated client-side algorithms that deliver professional-grade results while keeping your data exactly where it belongs – on your device, under your control.
                </p>
              </div>
            </div>
          </section>

          {/* FAQs - Comprehensive Section */}
          <section className="py-8 sm:py-12 md:py-16 px-4 sm:px-6">
            <div className="container mx-auto max-w-4xl">
              <div className="flex items-center gap-3 mb-6">
                <div 
                  className="w-10 h-10 rounded-lg flex items-center justify-center"
                  style={{ background: `linear-gradient(135deg, ${gradientFrom}, ${gradientTo})` }}
                >
                  <HelpCircle className="w-5 h-5 text-white" />
                </div>
                <h2 className="text-xl sm:text-2xl md:text-3xl font-bold">Frequently Asked Questions</h2>
              </div>
              
              <p className="text-sm sm:text-base text-muted-foreground mb-6">
                Below you will find answers to the most common questions about our {category.name.toLowerCase()} tools. If you have a question that is not addressed here, please feel free to reach out to our support team.
              </p>
              
              <Accordion type="single" collapsible className="space-y-2">
                {faqs.map((faq, i) => (
                  <AccordionItem key={i} value={`faq-${i}`} className="bg-card border border-border rounded-lg sm:rounded-xl px-3 sm:px-4">
                    <AccordionTrigger className="text-left hover:no-underline text-sm sm:text-base py-3 sm:py-4">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-xs sm:text-sm text-muted-foreground pb-3 sm:pb-4">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
                
                {/* Additional Common FAQs */}
                <AccordionItem value="faq-general-1" className="bg-card border border-border rounded-lg sm:rounded-xl px-3 sm:px-4">
                  <AccordionTrigger className="text-left hover:no-underline text-sm sm:text-base py-3 sm:py-4">
                    Is this tool really free to use?
                  </AccordionTrigger>
                  <AccordionContent className="text-xs sm:text-sm text-muted-foreground pb-3 sm:pb-4">
                    Yes, absolutely! All our {category.name.toLowerCase()} tools are completely free to use with no hidden costs, no watermarks, and no limitations on the number of files you can process. We believe everyone should have access to professional-grade image tools.
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="faq-general-2" className="bg-card border border-border rounded-lg sm:rounded-xl px-3 sm:px-4">
                  <AccordionTrigger className="text-left hover:no-underline text-sm sm:text-base py-3 sm:py-4">
                    What file formats are supported?
                  </AccordionTrigger>
                  <AccordionContent className="text-xs sm:text-sm text-muted-foreground pb-3 sm:pb-4">
                    Our tools support all major image formats including JPG/JPEG, PNG, WebP, GIF, BMP, TIFF, and more. The specific formats available may vary depending on the tool you are using, but we strive to support the widest range of formats possible.
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="faq-general-3" className="bg-card border border-border rounded-lg sm:rounded-xl px-3 sm:px-4">
                  <AccordionTrigger className="text-left hover:no-underline text-sm sm:text-base py-3 sm:py-4">
                    Can I use these tools on my mobile device?
                  </AccordionTrigger>
                  <AccordionContent className="text-xs sm:text-sm text-muted-foreground pb-3 sm:pb-4">
                    Yes! Our tools are fully responsive and work on all modern devices including smartphones, tablets, laptops, and desktop computers. The interface automatically adapts to your screen size for the best possible experience.
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="faq-general-4" className="bg-card border border-border rounded-lg sm:rounded-xl px-3 sm:px-4">
                  <AccordionTrigger className="text-left hover:no-underline text-sm sm:text-base py-3 sm:py-4">
                    What is the maximum file size I can process?
                  </AccordionTrigger>
                  <AccordionContent className="text-xs sm:text-sm text-muted-foreground pb-3 sm:pb-4">
                    The default maximum file size is 50MB per image. This limit ensures smooth performance across all devices. For very large files, processing time may vary depending on your device's capabilities.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </section>

          {/* Why Choose Us Article */}
          <section className="py-8 sm:py-12 md:py-16 px-4 sm:px-6 bg-secondary/30">
            <div className="container mx-auto max-w-4xl">
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-4 sm:mb-6">Why Choose Our {category.name} Tools?</h2>
              <div className="bg-card rounded-2xl p-6 sm:p-8 border border-border">
                <div className="prose prose-invert max-w-none space-y-4">
                  <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                    Our {category.name.toLowerCase()} tools are designed with simplicity and power in mind. 
                    Every tool works directly in your browser, meaning your files never leave your device. 
                    This ensures complete privacy and faster processing times compared to server-based alternatives.
                  </p>
                  <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                    Whether you are a professional photographer, designer, marketer, or casual user, 
                    our tools provide the perfect balance of functionality and ease of use. 
                    No sign-up required, no watermarks, no hidden fees – just powerful image tools at your fingertips.
                  </p>
                  <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                    We continuously update our tools to support the latest image formats and technologies, 
                    ensuring you always have access to cutting-edge features without the complexity of 
                    professional desktop software. Our commitment to innovation means you get the best tools available, completely free.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Internal Links */}
          <section className="py-8 sm:py-12 md:py-16 px-4 sm:px-6">
            <div className="container mx-auto max-w-5xl">
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-4 sm:mb-6">Explore More Image Tools</h2>
              <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4">
                {otherCategories.map((cat) => (
                  <Link
                    key={cat.id}
                    to={`/${cat.slug}`}
                    className="bg-card rounded-lg sm:rounded-xl p-3 sm:p-4 border border-border hover:border-primary/50 transition-colors group touch-target"
                  >
                    <h3 className="text-sm sm:text-base font-semibold group-hover:text-primary transition-colors">{cat.name}</h3>
                    <p className="text-xs sm:text-sm text-muted-foreground mt-1 line-clamp-2">{cat.description}</p>
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

export default CategoryPageLayout;