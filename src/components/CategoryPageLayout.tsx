import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { ArrowRight } from "lucide-react";
import { toolCategories, Category } from "@/data/toolsData";
import { CategorySEOContent } from "@/data/categorySEOData";

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
  
  const canonicalUrl = `https://multitools.com/${category.slug}`;

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

          {/* Introduction Section */}
          <section className="py-8 sm:py-12 md:py-16 px-4 sm:px-6">
            <div className="container mx-auto max-w-4xl">
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-4 sm:mb-6">What is {category.name}?</h2>
              <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">{longDescription}</p>
            </div>
          </section>

          {/* Benefits */}
          <section className="py-8 sm:py-12 md:py-16 px-4 sm:px-6 bg-gradient-dark">
            <div className="container mx-auto max-w-5xl">
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-6 sm:mb-8 text-center">Key Benefits</h2>
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

          {/* How to Use */}
          <section className="py-8 sm:py-12 md:py-16 px-4 sm:px-6">
            <div className="container mx-auto max-w-4xl">
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-4 sm:mb-6">How to Use {category.name}</h2>
              <div className="space-y-3 sm:space-y-4">
                {howToUse.map((step, i) => (
                  <div key={i} className="flex gap-3 sm:gap-4 items-start">
                    <div 
                      className="w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center text-sm sm:text-base font-bold flex-shrink-0 text-white"
                      style={{ background: `linear-gradient(135deg, ${gradientFrom}, ${gradientTo})` }}
                    >
                      {i + 1}
                    </div>
                    <div className="bg-card rounded-xl p-4 flex-1 border border-border">
                      <p className="text-sm text-muted-foreground">{step}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Why Choose Us Article */}
          <section className="py-8 sm:py-12 md:py-16 px-4 sm:px-6 bg-gradient-dark">
            <div className="container mx-auto max-w-4xl">
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-4 sm:mb-6">Why Choose Our {category.name} Tools?</h2>
              <div className="bg-card rounded-2xl p-6 sm:p-8 border border-border">
                <div className="prose prose-invert max-w-none">
                  <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                    Our {category.name.toLowerCase()} tools are designed with simplicity and power in mind. 
                    Every tool works directly in your browser, meaning your files never leave your device. 
                    This ensures complete privacy and faster processing times compared to server-based alternatives.
                  </p>
                  <p className="text-sm sm:text-base text-muted-foreground leading-relaxed mt-4">
                    Whether you're a professional photographer, designer, marketer, or casual user, 
                    our tools provide the perfect balance of functionality and ease of use. 
                    No sign-up required, no watermarks, no hidden fees – just powerful image tools at your fingertips.
                  </p>
                  <p className="text-sm sm:text-base text-muted-foreground leading-relaxed mt-4">
                    We continuously update our tools to support the latest image formats and technologies, 
                    ensuring you always have access to cutting-edge features without the complexity of 
                    professional desktop software.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* FAQs */}
          <section className="py-8 sm:py-12 md:py-16 px-4 sm:px-6">
            <div className="container mx-auto max-w-4xl">
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-4 sm:mb-6">Frequently Asked Questions</h2>
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
              </Accordion>
            </div>
          </section>

          {/* Internal Links */}
          <section className="py-8 sm:py-12 md:py-16 px-4 sm:px-6 bg-gradient-dark">
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
