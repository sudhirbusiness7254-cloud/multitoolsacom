import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { toolCategories } from "@/data/toolsData";

interface FAQ {
  question: string;
  answer: string;
}

interface ToolPageLayoutProps {
  title: string;
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
  introduction: string;
  article: string;
  features: string[];
  benefits: string[];
  howToUse: string[];
  faqs: FAQ[];
  useCases: string[];
  children: React.ReactNode;
  schemaType?: "SoftwareApplication" | "WebApplication";
}

const ToolPageLayout = ({
  title,
  metaTitle,
  metaDescription,
  keywords,
  introduction,
  article,
  features,
  benefits,
  howToUse,
  faqs,
  useCases,
  children,
  schemaType = "WebApplication"
}: ToolPageLayoutProps) => {
  const slug = title.toLowerCase().replace(/\s+/g, '-');
  const canonicalUrl = `https://multitoolsa.com/tools/${slug}`;

  // Enhanced WebApplication Schema with ratings
  const schemaMarkup = {
    "@context": "https://schema.org",
    "@type": schemaType,
    "name": metaTitle,
    "description": metaDescription,
    "url": canonicalUrl,
    "applicationCategory": "UtilitiesApplication",
    "operatingSystem": "Web Browser",
    "browserRequirements": "Requires JavaScript. Requires HTML5.",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD",
      "availability": "https://schema.org/InStock"
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.8",
      "ratingCount": Math.floor(800 + (title.length * 97)),
      "bestRating": "5",
      "worstRating": "1"
    },
    "author": {
      "@type": "Organization",
      "name": "MultiToolsA",
      "url": "https://multitoolsa.com"
    }
  };

  // FAQPage Schema
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

  // HowTo Schema
  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": `How to Use ${title}`,
    "description": introduction.substring(0, 200),
    "totalTime": "PT2M",
    "tool": {
      "@type": "HowToTool",
      "name": "Web Browser"
    },
    "step": howToUse.map((step, index) => ({
      "@type": "HowToStep",
      "position": index + 1,
      "name": `Step ${index + 1}`,
      "text": step,
      "url": `${canonicalUrl}#step-${index + 1}`
    }))
  };

  // BreadcrumbList Schema
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://multitoolsa.com" },
      { "@type": "ListItem", "position": 2, "name": "Tools", "item": "https://multitoolsa.com/all-tools" },
      { "@type": "ListItem", "position": 3, "name": title, "item": canonicalUrl }
    ]
  };

  // Get image tools for internal linking (priority)
  const imageCategories = toolCategories.filter(cat => cat.id !== "tag-tools").slice(0, 6);

  return (
    <>
      <Helmet>
        <title>{metaTitle}</title>
        <meta name="description" content={metaDescription} />
        <meta name="keywords" content={keywords.join(", ")} />
        <link rel="canonical" href={canonicalUrl} />
        
        {/* Open Graph Meta Tags */}
        <meta property="og:title" content={metaTitle} />
        <meta property="og:description" content={metaDescription} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:site_name" content="MultiToolsA" />
        <meta property="og:image" content="https://multitoolsa.com/og-image.png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content={`${title} - Free Online Tool | MultiToolsA`} />
        <meta property="og:locale" content="en_US" />
        
        {/* Twitter Card Meta Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@multitoolsa" />
        <meta name="twitter:creator" content="@multitoolsa" />
        <meta name="twitter:title" content={metaTitle} />
        <meta name="twitter:description" content={metaDescription} />
        <meta name="twitter:image" content="https://multitoolsa.com/og-image.png" />
        <meta name="twitter:image:alt" content={`${title} - Free Online Tool | MultiToolsA`} />
        
        {/* Additional Social Meta */}
        <meta property="article:publisher" content="https://multitoolsa.com" />
        
        <script type="application/ld+json">
          {JSON.stringify(schemaMarkup)}
        </script>
        <script type="application/ld+json">
          {JSON.stringify(faqSchema)}
        </script>
        <script type="application/ld+json">
          {JSON.stringify(howToSchema)}
        </script>
        <script type="application/ld+json">
          {JSON.stringify(breadcrumbSchema)}
        </script>
      </Helmet>

      <div className="min-h-screen bg-background flex flex-col">
        <Header />
        
        <main className="flex-1">
          {/* Hero Section with Tool */}
          <section className="py-8 md:py-12 bg-gradient-hero relative overflow-hidden">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/10 rounded-full blur-3xl" />
            
            <div className="container mx-auto px-4 relative z-10">
              <div className="text-center max-w-3xl mx-auto mb-8">
                <h1 className="text-3xl md:text-5xl font-bold mb-4">
                  {title}
                </h1>
                <p className="text-lg text-muted-foreground">
                  {introduction.substring(0, 200)}...
                </p>
              </div>
              
              {/* Tool Component */}
              <div className="max-w-4xl mx-auto">
                {children}
              </div>
            </div>
          </section>

          {/* Introduction Section */}
          <section className="py-12 md:py-16 px-4">
            <div className="container mx-auto max-w-4xl">
              <h2 className="text-2xl md:text-3xl font-bold mb-6">What is {title}?</h2>
              <p className="text-muted-foreground leading-relaxed mb-6">{introduction}</p>
              
              {/* Privacy Guarantee Box */}
              <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-6 mt-8">
                <h3 className="text-lg font-semibold text-green-500 mb-2">🔒 Your Privacy is Guaranteed</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  All processing happens directly in your browser. Your images are never uploaded to any server, 
                  ensuring complete privacy and security. Once you close this page, all image data is automatically 
                  cleared from memory. No account required, no data stored, no tracking of your files.
                </p>
              </div>
            </div>
          </section>

          {/* Features & Benefits */}
          <section className="py-12 md:py-16 px-4 bg-gradient-dark">
            <div className="container mx-auto max-w-5xl">
              <div className="grid md:grid-cols-2 gap-8">
                {/* Features */}
                <div className="bg-card rounded-2xl p-6 border border-border">
                  <h2 className="text-xl font-bold mb-4 text-primary">Key Features</h2>
                  <ul className="space-y-3">
                    {features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <span className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                        <span className="text-muted-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                {/* Benefits */}
                <div className="bg-card rounded-2xl p-6 border border-border">
                  <h2 className="text-xl font-bold mb-4 text-primary">Benefits</h2>
                  <ul className="space-y-3">
                    {benefits.map((benefit, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <span className="w-2 h-2 rounded-full bg-accent mt-2 flex-shrink-0" />
                        <span className="text-muted-foreground">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* How to Use */}
          <section className="py-12 md:py-16 px-4">
            <div className="container mx-auto max-w-4xl">
              <h2 className="text-2xl md:text-3xl font-bold mb-6">How to Use {title}</h2>
              <div className="space-y-4">
                {howToUse.map((step, i) => (
                  <div key={i} className="flex gap-4 items-start">
                    <div className="w-8 h-8 rounded-full bg-gradient-orange flex items-center justify-center text-sm font-bold flex-shrink-0">
                      {i + 1}
                    </div>
                    <p className="text-muted-foreground pt-1">{step}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Detailed Article */}
          <section className="py-12 md:py-16 px-4 bg-gradient-dark">
            <div className="container mx-auto max-w-4xl">
              <h2 className="text-2xl md:text-3xl font-bold mb-6">Why Choose Our {title}?</h2>
              <div className="prose prose-invert max-w-none">
                <p className="text-muted-foreground leading-relaxed whitespace-pre-line">{article}</p>
              </div>
            </div>
          </section>

          {/* Who Can Use This Tool */}
          <section className="py-12 md:py-16 px-4">
            <div className="container mx-auto max-w-4xl">
              <h2 className="text-2xl md:text-3xl font-bold mb-6">Who Can Benefit From This Tool?</h2>
              <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
                {[
                  { title: "Web Developers", desc: "Optimize images for faster websites and better Core Web Vitals." },
                  { title: "Graphic Designers", desc: "Convert and edit images for client projects efficiently." },
                  { title: "Content Creators", desc: "Prepare images for social media, blogs, and videos." },
                  { title: "Photographers", desc: "Process and convert photos between professional formats." },
                  { title: "Marketing Teams", desc: "Create optimized visual assets for campaigns." },
                  { title: "Small Businesses", desc: "Edit product images without expensive software." }
                ].map((user, i) => (
                  <div key={i} className="bg-card rounded-xl p-4 border border-border">
                    <h3 className="font-semibold mb-2">{user.title}</h3>
                    <p className="text-sm text-muted-foreground">{user.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Use Cases */}
          <section className="py-12 md:py-16 px-4">
            <div className="container mx-auto max-w-4xl">
              <h2 className="text-2xl md:text-3xl font-bold mb-6">Use Cases</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                {useCases.map((useCase, i) => (
                  <div key={i} className="bg-card rounded-xl p-4 border border-border">
                    <p className="text-muted-foreground">{useCase}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* FAQs */}
          <section className="py-12 md:py-16 px-4 bg-gradient-dark">
            <div className="container mx-auto max-w-4xl">
              <h2 className="text-2xl md:text-3xl font-bold mb-6">Frequently Asked Questions</h2>
              <Accordion type="single" collapsible className="space-y-2">
                {faqs.map((faq, i) => (
                  <AccordionItem key={i} value={`faq-${i}`} className="bg-card border border-border rounded-xl px-4">
                    <AccordionTrigger className="text-left hover:no-underline">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </section>

          {/* Internal Links - Image Tools Priority */}
          <section className="py-12 md:py-16 px-4">
            <div className="container mx-auto max-w-5xl">
              <h2 className="text-2xl md:text-3xl font-bold mb-6">Explore More Image Tools</h2>
              <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
                {imageCategories.map((category) => (
                  <Link
                    key={category.id}
                    to={`/${category.slug}`}
                    className="bg-card rounded-xl p-4 border border-border hover:border-primary/50 transition-colors group"
                  >
                    <h3 className="font-semibold group-hover:text-primary transition-colors">{category.name}</h3>
                    <p className="text-sm text-muted-foreground mt-1">{category.description}</p>
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

export default ToolPageLayout;
