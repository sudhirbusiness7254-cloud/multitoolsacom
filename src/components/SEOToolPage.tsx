import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { 
  ChevronRight, CheckCircle, HelpCircle, ArrowRight, Lightbulb, BookOpen, 
  Star, Users, Shield, Sparkles, Zap, Target, Briefcase, GraduationCap, 
  Palette, Code, User, FileText
} from "lucide-react";
import { ToolSEOContent } from "@/data/toolsSEOData";
import { getComprehensiveSEOContent, ComprehensiveSEOContent } from "@/data/comprehensiveSEOContent";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import HreflangTags from "@/components/HreflangTags";

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
  
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": seoContent.title,
    "description": seoContent.metaDescription,
    "url": `https://multitoolsa.com/tools/${seoContent.slug}`,
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
      { "@type": "ListItem", "position": 3, "name": seoContent.title, "item": `https://multitoolsa.com/tools/${seoContent.slug}` }
    ]
  };

  // Use comprehensive content if available, otherwise fall back to basic content
  const hasComprehensive = !!comprehensiveContent;

  return (
    <>
      <Helmet>
        <title>{comprehensiveContent?.metaTitle || seoContent.metaTitle}</title>
        <meta name="description" content={comprehensiveContent?.metaDescription || seoContent.metaDescription} />
        <meta name="keywords" content={(comprehensiveContent?.keywords || seoContent.keywords).join(", ")} />
        <link rel="canonical" href={`https://multitoolsa.com/tools/${seoContent.slug}`} />
        
        <meta property="og:title" content={comprehensiveContent?.metaTitle || seoContent.metaTitle} />
        <meta property="og:description" content={comprehensiveContent?.metaDescription || seoContent.metaDescription} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`https://multitoolsa.com/tools/${seoContent.slug}`} />
        
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={comprehensiveContent?.metaTitle || seoContent.metaTitle} />
        <meta name="twitter:description" content={comprehensiveContent?.metaDescription || seoContent.metaDescription} />
        
        <script type="application/ld+json">{JSON.stringify(structuredData)}</script>
        <script type="application/ld+json">{JSON.stringify(faqStructuredData)}</script>
        <script type="application/ld+json">{JSON.stringify(breadcrumbData)}</script>
      </Helmet>
      <HreflangTags path={`/tools/${seoContent.slug}`} />

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

          {/* Hero Section with Tool */}
          <section className="py-8 md:py-12">
            <div className="container mx-auto px-4 max-w-6xl">
              {/* Title */}
              <div className="text-center mb-8">
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
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  {seoContent.shortDescription}
                </p>
              </div>

              {/* Tool Component */}
              <div className="mb-16">
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

              {/* Section 3: How to Use - Enhanced with detailed steps */}
              <div className="bg-card rounded-2xl border border-border p-6 md:p-8 mb-8">
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

              {/* Section 12: Related Tools */}
              {((hasComprehensive && comprehensiveContent.relatedTools.length > 0) || seoContent.relatedTools.length > 0) && (
                <div className="bg-card rounded-2xl border border-border p-6 md:p-8">
                  <h2 className="text-xl md:text-2xl font-bold mb-6">Related Tools</h2>
                  <div className="flex flex-wrap gap-3">
                    {(hasComprehensive ? comprehensiveContent.relatedTools : seoContent.relatedTools).map((tool) => (
                      <Link
                        key={tool}
                        to={`/${tool}`}
                        className="inline-flex items-center gap-2 px-4 py-2 bg-secondary rounded-lg hover:bg-secondary/80 transition-colors"
                      >
                        <span className="font-medium">{tool.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}</span>
                        <ArrowRight className="w-4 h-4" />
                      </Link>
                    ))}
                  </div>
                </div>
              )}
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
