import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { 
  ChevronRight, CheckCircle, HelpCircle, ArrowRight, Lightbulb, BookOpen, 
  Star, Users, Shield, Sparkles, Zap, Target, Briefcase, GraduationCap, 
  Palette, Code, User, FileText, ExternalLink
} from "lucide-react";
import { ToolSEOContent } from "@/data/toolsSEOData";
import { getComprehensiveSEOContent, ComprehensiveSEOContent } from "@/data/comprehensiveSEOContent";
import { getToolGuideData } from "@/data/toolGuideData";
import HowToUseGuide from "@/components/HowToUseGuide";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import HreflangTags from "@/components/HreflangTags";
import RelatedArticles from "@/components/RelatedArticles";

interface SEOToolPageProps {
  seoContent: ToolSEOContent;
  children: React.ReactNode;
}

const getUserIcon = (userType: string) => {
  const type = userType.toLowerCase();
  if (type.includes('student') || type.includes('education')) return GraduationCap;
  if (type.includes('developer') || type.includes('programmer')) return Code;
  if (type.includes('designer') || type.includes('creative')) return Palette;
  if (type.includes('business') || type.includes('professional') || type.includes('marketer')) return Briefcase;
  if (type.includes('blogger') || type.includes('content') || type.includes('writer')) return FileText;
  return User;
};

const SEOToolPage = ({ seoContent, children }: SEOToolPageProps) => {
  // Get comprehensive content if available
  const comprehensiveContent = getComprehensiveSEOContent(seoContent.slug);
  
  // Get visual guide data if available
  const guideData = getToolGuideData(seoContent.slug);
  
  // Determine the correct URL path based on category
  const isPDFTool = seoContent.categorySlug === "pdf-tools";
  const toolPath = isPDFTool ? `/${seoContent.slug}` : `/tools/${seoContent.slug}`;
  const canonicalUrl = `https://multitoolsa.com${toolPath}`;
  
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": seoContent.title,
    "description": seoContent.metaDescription,
    "url": canonicalUrl,
    "applicationCategory": "MultimediaApplication",
    "operatingSystem": "Web Browser",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "featureList": seoContent.benefits.join(", ")
  };

  const faqStructuredData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": (comprehensiveContent?.faqs || seoContent.faqs).map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };

  const breadcrumbData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://multitoolsa.com" },
      { "@type": "ListItem", "position": 2, "name": seoContent.category, "item": `https://multitoolsa.com/${seoContent.categorySlug}` },
      { "@type": "ListItem", "position": 3, "name": seoContent.title, "item": canonicalUrl }
    ]
  };

  // Use comprehensive content if available, otherwise fall back to basic content
  const hasComprehensive = !!comprehensiveContent;
  const hasVisualGuide = !!guideData;

  return (
    <>
      <Helmet>
        <title>{comprehensiveContent?.metaTitle || seoContent.metaTitle}</title>
        <meta name="description" content={comprehensiveContent?.metaDescription || seoContent.metaDescription} />
        <meta name="keywords" content={(comprehensiveContent?.keywords || seoContent.keywords).join(", ")} />
        <link rel="canonical" href={canonicalUrl} />
        
        {/* Ensure pages are indexable */}
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
        <meta name="googlebot" content="index, follow" />
        
        <meta property="og:title" content={comprehensiveContent?.metaTitle || seoContent.metaTitle} />
        <meta property="og:description" content={comprehensiveContent?.metaDescription || seoContent.metaDescription} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:site_name" content="MultiToolsA" />
        <meta property="og:image" content="https://multitoolsa.com/screenshot.png" />
        
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={comprehensiveContent?.metaTitle || seoContent.metaTitle} />
        <meta name="twitter:description" content={comprehensiveContent?.metaDescription || seoContent.metaDescription} />
        <meta name="twitter:image" content="https://multitoolsa.com/screenshot.png" />
        
        <script type="application/ld+json">{JSON.stringify(structuredData)}</script>
        <script type="application/ld+json">{JSON.stringify(faqStructuredData)}</script>
        <script type="application/ld+json">{JSON.stringify(breadcrumbData)}</script>
      </Helmet>
      <HreflangTags path={toolPath} />

      <div className="min-h-screen bg-background flex flex-col">
        <Header />
        
        <main className="flex-1">
          {/* Breadcrumb */}
          <nav className="container mx-auto px-4 py-4" aria-label="Breadcrumb">
            <ol className="flex items-center gap-2 text-sm text-muted-foreground">
              <li><Link to="/" className="hover:text-primary transition-colors">Home</Link></li>
              <ChevronRight className="w-4 h-4" />
              <li><Link to={`/${seoContent.categorySlug}`} className="hover:text-primary transition-colors">{seoContent.category}</Link></li>
              <ChevronRight className="w-4 h-4" />
              <li className="text-foreground font-medium">{seoContent.title}</li>
            </ol>
          </nav>

          {/* Hero Section with SEO Content Above the Fold */}
          <section className="py-6 md:py-10">
            <div className="container mx-auto px-4 max-w-6xl">
              {/* Title and Description - Always visible first */}
              <div className="text-center mb-6">
                <div 
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-4"
                  style={{ 
                    background: `linear-gradient(135deg, ${seoContent.gradientFrom}20, ${seoContent.gradientTo}20)`,
                    border: `1px solid ${seoContent.gradientFrom}40`
                  }}
                >
                  <Star className="w-4 h-4" style={{ color: seoContent.gradientFrom }} />
                  <span className="text-sm font-medium" style={{ color: seoContent.gradientFrom }}>Free Online Tool</span>
                </div>
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
                  {comprehensiveContent?.h1 || seoContent.h1}
                </h1>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-4">
                  {seoContent.shortDescription}
                </p>
                
                {/* SEO-rich description visible immediately on page load */}
                <div className="text-left max-w-3xl mx-auto bg-card rounded-xl border border-border p-6 mb-8">
                  <h2 className="text-xl font-semibold mb-3 flex items-center gap-2">
                    <BookOpen className="w-5 h-5" style={{ color: seoContent.gradientFrom }} />
                    What is {seoContent.title}?
                  </h2>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    {hasComprehensive && comprehensiveContent.introduction 
                      ? comprehensiveContent.introduction 
                      : seoContent.longDescription}
                  </p>
                  
                  {/* Quick benefits list - visible above fold */}
                  <div className="grid grid-cols-2 gap-2 mt-4">
                    {(hasComprehensive ? comprehensiveContent.benefits.slice(0, 4) : seoContent.benefits.slice(0, 4)).map((benefit, index) => (
                      <div key={index} className="flex items-center gap-2 text-sm">
                        <CheckCircle className="w-4 h-4 flex-shrink-0" style={{ color: seoContent.gradientFrom }} />
                        <span>{benefit}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Tool Component */}
              <div className="mb-12">
                {children}
              </div>
            </div>
          </section>

          {/* Article Content */}
          <section className="py-12 bg-secondary/30">
            <div className="container mx-auto px-4 max-w-4xl">
              
              {/* Section 1: Introduction */}
              {hasComprehensive && comprehensiveContent.introduction && (
                <article className="prose prose-lg max-w-none mb-12">
                  <div className="flex items-center gap-3 mb-4">
                    <div 
                      className="w-10 h-10 rounded-lg flex items-center justify-center"
                      style={{ background: `linear-gradient(135deg, ${seoContent.gradientFrom}, ${seoContent.gradientTo})` }}
                    >
                      <FileText className="w-5 h-5 text-white" />
                    </div>
                    <h2 className="text-2xl md:text-3xl font-bold m-0">Introduction</h2>
                  </div>
                  <p className="text-muted-foreground leading-relaxed text-lg">{comprehensiveContent.introduction}</p>
                </article>
              )}

              {/* Section 2: About This Tool */}
              <article className="prose prose-lg max-w-none mb-12">
                <div className="flex items-center gap-3 mb-4">
                  <div 
                    className="w-10 h-10 rounded-lg flex items-center justify-center"
                    style={{ background: `linear-gradient(135deg, ${seoContent.gradientFrom}, ${seoContent.gradientTo})` }}
                  >
                    <BookOpen className="w-5 h-5 text-white" />
                  </div>
                  <h2 className="text-2xl md:text-3xl font-bold m-0">About {seoContent.title}</h2>
                </div>
                <p className="text-muted-foreground leading-relaxed">
                  {hasComprehensive ? comprehensiveContent.aboutTool : seoContent.longDescription}
                </p>
              </article>

              {/* Section 3: How to Use - Visual Guide or Fallback */}
              <div className="bg-card rounded-2xl border border-border p-6 md:p-8 mb-8">
                {hasVisualGuide ? (
                  <HowToUseGuide 
                    guideData={guideData}
                    toolName={seoContent.title}
                    gradientFrom={seoContent.gradientFrom}
                    gradientTo={seoContent.gradientTo}
                  />
                ) : (
                  <>
                    <div className="flex items-center gap-3 mb-6">
                      <div 
                        className="w-10 h-10 rounded-lg flex items-center justify-center"
                        style={{ background: `linear-gradient(135deg, ${seoContent.gradientFrom}, ${seoContent.gradientTo})` }}
                      >
                        <Lightbulb className="w-5 h-5 text-white" />
                      </div>
                      <h2 className="text-xl md:text-2xl font-bold">How to Use {seoContent.title}</h2>
                    </div>
                    
                    {hasComprehensive && comprehensiveContent.howToUse.length > 0 ? (
                      <ol className="space-y-6">
                        {comprehensiveContent.howToUse.map((stepItem, index) => (
                          <li key={index} className="flex gap-4">
                            <span 
                              className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm"
                              style={{ background: `linear-gradient(135deg, ${seoContent.gradientFrom}, ${seoContent.gradientTo})` }}
                            >
                              {stepItem.step}
                            </span>
                            <div className="flex-1">
                              <h3 className="font-semibold text-foreground mb-1">{stepItem.title}</h3>
                              <p className="text-muted-foreground">{stepItem.description}</p>
                            </div>
                          </li>
                        ))}
                      </ol>
                    ) : (
                      <ol className="space-y-4">
                        {seoContent.howToUse.map((step, index) => (
                          <li key={index} className="flex gap-4">
                            <span 
                              className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-sm"
                              style={{ background: `linear-gradient(135deg, ${seoContent.gradientFrom}, ${seoContent.gradientTo})` }}
                            >
                              {index + 1}
                            </span>
                            <span className="text-foreground pt-1">{step}</span>
                          </li>
                        ))}
                      </ol>
                    )}
                  </>
                )}
              </div>

              {/* Section 4: Why This Tool Is Important */}
              <div className="bg-card rounded-2xl border border-border p-6 md:p-8 mb-8">
                <div className="flex items-center gap-3 mb-4">
                  <div 
                    className="w-10 h-10 rounded-lg flex items-center justify-center"
                    style={{ background: `linear-gradient(135deg, ${seoContent.gradientFrom}, ${seoContent.gradientTo})` }}
                  >
                    <Sparkles className="w-5 h-5 text-white" />
                  </div>
                  <h2 className="text-xl md:text-2xl font-bold">Why This Tool is Important</h2>
                </div>
                <p className="text-muted-foreground leading-relaxed">
                  {hasComprehensive ? comprehensiveContent.whyImportant : seoContent.whyImportant}
                </p>
              </div>

              {/* Section 5: Key Features - Enhanced with descriptions */}
              <div className="bg-card rounded-2xl border border-border p-6 md:p-8 mb-8">
                <div className="flex items-center gap-3 mb-6">
                  <div 
                    className="w-10 h-10 rounded-lg flex items-center justify-center"
                    style={{ background: `linear-gradient(135deg, ${seoContent.gradientFrom}, ${seoContent.gradientTo})` }}
                  >
                    <Zap className="w-5 h-5 text-white" />
                  </div>
                  <h2 className="text-xl md:text-2xl font-bold">Key Features</h2>
                </div>
                
                {hasComprehensive && comprehensiveContent.keyFeatures.length > 0 ? (
                  <div className="grid md:grid-cols-2 gap-4">
                    {comprehensiveContent.keyFeatures.map((feature, index) => (
                      <div key={index} className="bg-secondary/50 rounded-xl p-4">
                        <div className="flex items-start gap-3">
                          <Zap className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: seoContent.gradientFrom }} />
                          <div>
                            <h3 className="font-semibold text-foreground mb-1">{feature.title}</h3>
                            <p className="text-sm text-muted-foreground">{feature.description}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  seoContent.keyFeatures && seoContent.keyFeatures.length > 0 && (
                    <ul className="grid md:grid-cols-2 gap-3">
                      {seoContent.keyFeatures.map((feature, index) => (
                        <li key={index} className="flex items-start gap-3">
                          <Zap className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: seoContent.gradientFrom }} />
                          <span className="text-foreground">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  )
                )}
              </div>

              {/* Section 6: Benefits - Enhanced with intro text */}
              <div className="bg-card rounded-2xl border border-border p-6 md:p-8 mb-8">
                <div className="flex items-center gap-3 mb-6">
                  <div 
                    className="w-10 h-10 rounded-lg flex items-center justify-center"
                    style={{ background: `linear-gradient(135deg, ${seoContent.gradientFrom}, ${seoContent.gradientTo})` }}
                  >
                    <CheckCircle className="w-5 h-5 text-white" />
                  </div>
                  <h2 className="text-xl md:text-2xl font-bold">Benefits of Using This Tool</h2>
                </div>
                
                {hasComprehensive && comprehensiveContent.benefitsText && (
                  <p className="text-muted-foreground leading-relaxed mb-6">
                    {comprehensiveContent.benefitsText}
                  </p>
                )}
                
                <ul className="grid md:grid-cols-2 gap-3">
                  {(hasComprehensive ? comprehensiveContent.benefits : seoContent.benefits).map((benefit, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: seoContent.gradientFrom }} />
                      <span className="text-foreground">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Section 7: Who Can Use - Enhanced with descriptions */}
              <div className="bg-card rounded-2xl border border-border p-6 md:p-8 mb-8">
                <div className="flex items-center gap-3 mb-6">
                  <div 
                    className="w-10 h-10 rounded-lg flex items-center justify-center"
                    style={{ background: `linear-gradient(135deg, ${seoContent.gradientFrom}, ${seoContent.gradientTo})` }}
                  >
                    <Users className="w-5 h-5 text-white" />
                  </div>
                  <h2 className="text-xl md:text-2xl font-bold">Who Can Use This Tool</h2>
                </div>
                
                {hasComprehensive && comprehensiveContent.whoCanUse.length > 0 ? (
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {comprehensiveContent.whoCanUse.map((user, index) => {
                      const IconComponent = getUserIcon(user.title);
                      return (
                        <div key={index} className="bg-secondary/50 rounded-xl p-4">
                          <div className="flex items-start gap-3">
                            <IconComponent className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: seoContent.gradientFrom }} />
                            <div>
                              <h3 className="font-semibold text-foreground mb-1">{user.title}</h3>
                              <p className="text-sm text-muted-foreground">{user.description}</p>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  seoContent.whoCanUse && seoContent.whoCanUse.length > 0 && (
                    <ul className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
                      {seoContent.whoCanUse.map((user, index) => (
                        <li key={index} className="flex items-center gap-3 bg-secondary/50 rounded-lg px-4 py-3">
                          <Users className="w-4 h-4 flex-shrink-0" style={{ color: seoContent.gradientFrom }} />
                          <span className="text-foreground font-medium">{user}</span>
                        </li>
                      ))}
                    </ul>
                  )
                )}
              </div>

              {/* Section 8: Common Use Cases */}
              {hasComprehensive && comprehensiveContent.useCases && comprehensiveContent.useCases.length > 0 && (
                <div className="bg-card rounded-2xl border border-border p-6 md:p-8 mb-8">
                  <div className="flex items-center gap-3 mb-6">
                    <div 
                      className="w-10 h-10 rounded-lg flex items-center justify-center"
                      style={{ background: `linear-gradient(135deg, ${seoContent.gradientFrom}, ${seoContent.gradientTo})` }}
                    >
                      <Target className="w-5 h-5 text-white" />
                    </div>
                    <h2 className="text-xl md:text-2xl font-bold">Common Use Cases</h2>
                  </div>
                  <div className="grid md:grid-cols-2 gap-4">
                    {comprehensiveContent.useCases.map((useCase, index) => (
                      <div key={index} className="bg-secondary/50 rounded-xl p-4">
                        <div className="flex items-start gap-3">
                          <Target className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: seoContent.gradientFrom }} />
                          <div>
                            <h3 className="font-semibold text-foreground mb-1">{useCase.title}</h3>
                            <p className="text-sm text-muted-foreground">{useCase.description}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Section 9: FAQ Section - Enhanced */}
              <div className="bg-card rounded-2xl border border-border p-6 md:p-8 mb-8">
                <div className="flex items-center gap-3 mb-6">
                  <div 
                    className="w-10 h-10 rounded-lg flex items-center justify-center"
                    style={{ background: `linear-gradient(135deg, ${seoContent.gradientFrom}, ${seoContent.gradientTo})` }}
                  >
                    <HelpCircle className="w-5 h-5 text-white" />
                  </div>
                  <h2 className="text-xl md:text-2xl font-bold">Frequently Asked Questions</h2>
                </div>
                <Accordion type="single" collapsible className="w-full">
                  {(hasComprehensive ? comprehensiveContent.faqs : seoContent.faqs).map((faq, index) => (
                    <AccordionItem key={index} value={`faq-${index}`}>
                      <AccordionTrigger className="text-left font-medium hover:no-underline">
                        {faq.question}
                      </AccordionTrigger>
                      <AccordionContent className="text-muted-foreground leading-relaxed">
                        {faq.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>

              {/* Section 10: Privacy & Security Note */}
              <div className="bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/20 rounded-2xl p-6 md:p-8 mb-8">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-green-500/20 flex items-center justify-center flex-shrink-0">
                    <Shield className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-green-700 dark:text-green-400 mb-2">Privacy & Security</h2>
                    <p className="text-muted-foreground leading-relaxed">
                      {hasComprehensive && comprehensiveContent.privacyNote 
                        ? comprehensiveContent.privacyNote 
                        : (seoContent.privacyNote || "Your privacy is our priority. We do not store your files or data. All processing happens securely in your browser, and files are never uploaded to external servers. Your information remains completely private and is automatically cleared after use.")}
                    </p>
                  </div>
                </div>
              </div>

              {/* Section 11: Conclusion */}
              {(hasComprehensive && comprehensiveContent.conclusion) || seoContent.conclusion ? (
                <div className="bg-card rounded-2xl border border-border p-6 md:p-8 mb-8">
                  <div className="flex items-center gap-3 mb-4">
                    <div 
                      className="w-10 h-10 rounded-lg flex items-center justify-center"
                      style={{ background: `linear-gradient(135deg, ${seoContent.gradientFrom}, ${seoContent.gradientTo})` }}
                    >
                      <Star className="w-5 h-5 text-white" />
                    </div>
                    <h2 className="text-xl md:text-2xl font-bold">Conclusion</h2>
                  </div>
                  <p className="text-muted-foreground leading-relaxed">
                    {hasComprehensive ? comprehensiveContent.conclusion : seoContent.conclusion}
                  </p>
                </div>
              ) : null}

              {/* Section 12: Related Articles from Blog */}
              <RelatedArticles 
                toolSlug={seoContent.slug} 
                title="Helpful Guides & Tutorials"
                maxItems={3}
              />

              {/* Section 13: Related Tools - Enhanced with more links */}
              <div className="bg-card rounded-2xl border border-border p-6 md:p-8">
                <h2 className="text-xl md:text-2xl font-bold mb-4">Related Tools You May Also Like</h2>
                <p className="text-muted-foreground mb-6">
                  Explore more free tools from our collection. Each tool is designed to work seamlessly with others for a complete image editing workflow.
                </p>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {(hasComprehensive && comprehensiveContent.relatedTools.length > 0 
                    ? comprehensiveContent.relatedTools.slice(0, 6)
                    : seoContent.relatedTools.slice(0, 6)
                  ).map((tool) => (
                    <Link
                      key={tool}
                      to={`/tools/${tool}`}
                      className="group flex items-center gap-3 p-4 bg-secondary/50 rounded-xl hover:bg-secondary transition-all hover:-translate-y-0.5"
                    >
                      <div 
                        className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                        style={{ background: `linear-gradient(135deg, ${seoContent.gradientFrom}, ${seoContent.gradientTo})` }}
                      >
                        <ExternalLink className="w-5 h-5 text-white" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <span className="font-medium text-sm block truncate group-hover:text-primary transition-colors">
                          {tool.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}
                        </span>
                        <span className="text-xs text-muted-foreground">Free Tool</span>
                      </div>
                    </Link>
                  ))}
                </div>
                
                {/* Additional category navigation */}
                <div className="mt-6 pt-6 border-t border-border">
                  <p className="text-sm text-muted-foreground mb-3">Explore by category:</p>
                  <div className="flex flex-wrap gap-2">
                    <Link to="/image-converter" className="text-sm px-3 py-1 bg-primary/10 text-primary rounded-full hover:bg-primary/20 transition-colors">Image Converter</Link>
                    <Link to="/image-compression" className="text-sm px-3 py-1 bg-primary/10 text-primary rounded-full hover:bg-primary/20 transition-colors">Compression</Link>
                    <Link to="/image-resize" className="text-sm px-3 py-1 bg-primary/10 text-primary rounded-full hover:bg-primary/20 transition-colors">Resize</Link>
                    <Link to="/image-crop" className="text-sm px-3 py-1 bg-primary/10 text-primary rounded-full hover:bg-primary/20 transition-colors">Crop</Link>
                    <Link to="/pdf-tools" className="text-sm px-3 py-1 bg-primary/10 text-primary rounded-full hover:bg-primary/20 transition-colors">PDF Tools</Link>
                    <Link to="/all-tools" className="text-sm px-3 py-1 bg-secondary text-foreground rounded-full hover:bg-secondary/80 transition-colors">View All Tools →</Link>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="py-12">
            <div className="container mx-auto px-4 max-w-4xl text-center">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">Explore More Tools</h2>
              <p className="text-muted-foreground mb-6">
                Discover our complete collection of free image tools to enhance your workflow
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link 
                  to={`/${seoContent.categorySlug}`}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-medium text-white transition-colors"
                  style={{ background: `linear-gradient(135deg, ${seoContent.gradientFrom}, ${seoContent.gradientTo})` }}
                >
                  More {seoContent.category} Tools
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link 
                  to="/"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-secondary rounded-lg font-medium hover:bg-secondary/80 transition-colors"
                >
                  All Tools
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default SEOToolPage;
