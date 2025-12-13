import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ChevronRight, CheckCircle, HelpCircle, ArrowRight, Lightbulb, BookOpen, Star } from "lucide-react";
import { ToolSEOContent } from "@/data/toolsSEOData";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface SEOToolPageProps {
  seoContent: ToolSEOContent;
  children: React.ReactNode;
}

const SEOToolPage = ({ seoContent, children }: SEOToolPageProps) => {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": seoContent.title,
    "description": seoContent.metaDescription,
    "url": `https://multitools.com/${seoContent.slug}`,
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
    "mainEntity": seoContent.faqs.map(faq => ({
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
      { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://multitools.com" },
      { "@type": "ListItem", "position": 2, "name": seoContent.category, "item": `https://multitools.com/${seoContent.categorySlug}` },
      { "@type": "ListItem", "position": 3, "name": seoContent.title, "item": `https://multitools.com/${seoContent.slug}` }
    ]
  };

  return (
    <>
      <Helmet>
        <title>{seoContent.metaTitle}</title>
        <meta name="description" content={seoContent.metaDescription} />
        <meta name="keywords" content={seoContent.keywords.join(", ")} />
        <link rel="canonical" href={`https://multitools.com/${seoContent.slug}`} />
        
        <meta property="og:title" content={seoContent.metaTitle} />
        <meta property="og:description" content={seoContent.metaDescription} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`https://multitools.com/${seoContent.slug}`} />
        
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={seoContent.metaTitle} />
        <meta name="twitter:description" content={seoContent.metaDescription} />
        
        <script type="application/ld+json">{JSON.stringify(structuredData)}</script>
        <script type="application/ld+json">{JSON.stringify(faqStructuredData)}</script>
        <script type="application/ld+json">{JSON.stringify(breadcrumbData)}</script>
      </Helmet>

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
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">{seoContent.h1}</h1>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">{seoContent.shortDescription}</p>
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
              {/* About This Tool */}
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
                <p className="text-muted-foreground leading-relaxed">{seoContent.longDescription}</p>
              </article>

              {/* How to Use */}
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
              </div>

              {/* Benefits */}
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
                <ul className="grid md:grid-cols-2 gap-3">
                  {seoContent.benefits.map((benefit, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: seoContent.gradientFrom }} />
                      <span className="text-foreground">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Why Important */}
              <div className="bg-card rounded-2xl border border-border p-6 md:p-8 mb-8">
                <h2 className="text-xl md:text-2xl font-bold mb-4">Why {seoContent.title} is Important</h2>
                <p className="text-muted-foreground leading-relaxed">{seoContent.whyImportant}</p>
              </div>

              {/* FAQ Section */}
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
                  {seoContent.faqs.map((faq, index) => (
                    <AccordionItem key={index} value={`faq-${index}`}>
                      <AccordionTrigger className="text-left font-medium">
                        {faq.question}
                      </AccordionTrigger>
                      <AccordionContent className="text-muted-foreground">
                        {faq.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>

              {/* Related Tools */}
              {seoContent.relatedTools.length > 0 && (
                <div className="bg-card rounded-2xl border border-border p-6 md:p-8">
                  <h2 className="text-xl md:text-2xl font-bold mb-6">Related Tools</h2>
                  <div className="flex flex-wrap gap-3">
                    {seoContent.relatedTools.map((tool) => (
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