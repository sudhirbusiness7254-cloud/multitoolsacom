import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { 
  ChevronRight, CheckCircle, HelpCircle, ArrowRight, Lightbulb, BookOpen, 
  Star, Users, Shield, Sparkles, Zap, Target, Briefcase, GraduationCap, 
  Palette, Code, User, FileText, ExternalLink, Clock, Award, TrendingUp,
  Lock, Eye, Layers, Settings, Wand2, ImageIcon
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
import { getTemplateConfig, categoryColorSchemes } from "@/components/seo-templates/TemplateStyles";
import { 
  getHeadingClasses, 
  getCardClasses, 
  getSectionClasses, 
  getBadgeClasses,
  getIntroStyle,
  getListStyle
} from "@/components/seo-templates/UniqueContentStyles";
import InContentAd from "@/components/ads/InContentAd";
import NativeBannerAd from "@/components/ads/NativeBannerAd";
import ToolSideAd from "@/components/ads/ToolSideAd";
import MobileNativeAd from "@/components/ads/MobileNativeAd";

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

// Unique section icons based on template style
const getSectionIcon = (section: string, style: string) => {
  const iconMap: Record<string, Record<string, React.ElementType>> = {
    intro: { magazine: BookOpen, technical: FileText, creative: Wand2, professional: BookOpen, minimalist: Eye, tutorial: Lightbulb, utility: Settings, security: Shield },
    features: { magazine: Zap, technical: Settings, creative: Sparkles, professional: Award, minimalist: Layers, tutorial: Star, utility: Zap, security: Lock },
    howto: { magazine: Lightbulb, technical: Clock, creative: Wand2, professional: Target, minimalist: ArrowRight, tutorial: Lightbulb, utility: Settings, security: Shield },
    benefits: { magazine: CheckCircle, technical: TrendingUp, creative: Star, professional: Award, minimalist: CheckCircle, tutorial: CheckCircle, utility: TrendingUp, security: Shield },
    usecases: { magazine: Target, technical: Code, creative: Palette, professional: Briefcase, minimalist: Target, tutorial: Target, utility: Code, security: Lock },
    who: { magazine: Users, technical: Users, creative: Users, professional: Briefcase, minimalist: User, tutorial: GraduationCap, utility: Users, security: Users },
    faq: { magazine: HelpCircle, technical: HelpCircle, creative: Sparkles, professional: HelpCircle, minimalist: HelpCircle, tutorial: Lightbulb, utility: HelpCircle, security: Shield },
    privacy: { magazine: Shield, technical: Lock, creative: Shield, professional: Shield, minimalist: Lock, tutorial: Shield, utility: Lock, security: Shield },
    why: { magazine: Sparkles, technical: TrendingUp, creative: Star, professional: Award, minimalist: Lightbulb, tutorial: Lightbulb, utility: Zap, security: Shield }
  };
  return iconMap[section]?.[style] || BookOpen;
};

// Unique section titles based on template style and category
const getSectionTitle = (section: string, style: string, toolName: string): string => {
  const titleVariants: Record<string, Record<string, string>> = {
    intro: {
      magazine: `Discover ${toolName}`,
      technical: `Technical Overview: ${toolName}`,
      creative: `Unleash Your Creativity with ${toolName}`,
      professional: `About ${toolName}`,
      minimalist: `Overview`,
      tutorial: `Getting Started`,
      utility: `Tool Documentation`,
      security: `Secure ${toolName}`
    },
    features: {
      magazine: `Powerful Features`,
      technical: `Feature Specifications`,
      creative: `What Makes This Special`,
      professional: `Core Capabilities`,
      minimalist: `Features`,
      tutorial: `Tool Capabilities`,
      utility: `Functionality`,
      security: `Security Features`
    },
    howto: {
      magazine: `How It Works`,
      technical: `Step-by-Step Instructions`,
      creative: `Create Magic in Seconds`,
      professional: `Usage Guide`,
      minimalist: `Quick Guide`,
      tutorial: `Complete Tutorial`,
      utility: `Operating Instructions`,
      security: `Secure Processing Steps`
    },
    benefits: {
      magazine: `Why You'll Love It`,
      technical: `Performance Benefits`,
      creative: `Transform Your Work`,
      professional: `Business Advantages`,
      minimalist: `Benefits`,
      tutorial: `What You'll Gain`,
      utility: `Operational Benefits`,
      security: `Protected Advantages`
    },
    usecases: {
      magazine: `Real-World Applications`,
      technical: `Implementation Scenarios`,
      creative: `Creative Possibilities`,
      professional: `Business Applications`,
      minimalist: `Use Cases`,
      tutorial: `Practical Examples`,
      utility: `Typical Applications`,
      security: `Secure Use Cases`
    },
    who: {
      magazine: `Perfect For`,
      technical: `Target Users`,
      creative: `Who Will Love This`,
      professional: `Ideal Users`,
      minimalist: `For`,
      tutorial: `Who Should Use This`,
      utility: `User Profiles`,
      security: `Trusted By`
    },
    faq: {
      magazine: `Common Questions`,
      technical: `Technical FAQ`,
      creative: `Your Questions Answered`,
      professional: `Frequently Asked Questions`,
      minimalist: `FAQ`,
      tutorial: `Help & Support`,
      utility: `Troubleshooting`,
      security: `Security FAQ`
    },
    privacy: {
      magazine: `Your Privacy Matters`,
      technical: `Data Security Protocol`,
      creative: `Safe & Secure`,
      professional: `Privacy Commitment`,
      minimalist: `Privacy`,
      tutorial: `Privacy Protection`,
      utility: `Data Handling`,
      security: `Maximum Security`
    },
    why: {
      magazine: `The Importance Factor`,
      technical: `Technical Significance`,
      creative: `Why This Matters`,
      professional: `Strategic Value`,
      minimalist: `Why It Matters`,
      tutorial: `Understanding the Importance`,
      utility: `Operational Significance`,
      security: `Critical Importance`
    }
  };
  return titleVariants[section]?.[style] || section.charAt(0).toUpperCase() + section.slice(1);
};

const SEOToolPage = ({ seoContent, children }: SEOToolPageProps) => {
  // Get comprehensive content if available
  const comprehensiveContent = getComprehensiveSEOContent(seoContent.slug);
  
  // Get visual guide data if available
  const guideData = getToolGuideData(seoContent.slug);
  
  // Get unique template configuration for this category
  const templateConfig = getTemplateConfig(seoContent.categorySlug);
  const colorScheme = categoryColorSchemes[seoContent.categorySlug];
  const headingClasses = getHeadingClasses(templateConfig);
  const cardClasses = getCardClasses(templateConfig);
  const sectionClasses = getSectionClasses(templateConfig, seoContent.categorySlug);
  const badgeClasses = getBadgeClasses(seoContent.categorySlug);
  const introStyle = getIntroStyle(templateConfig);
  const listStyle = getListStyle(templateConfig);
  
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

  // Render introduction section based on template style
  const renderIntroSection = () => {
    const content = hasComprehensive && comprehensiveContent.introduction 
      ? comprehensiveContent.introduction 
      : seoContent.longDescription;
    
    const IconComponent = getSectionIcon('intro', templateConfig.style);
    const title = getSectionTitle('intro', templateConfig.style, seoContent.title);
    
    return (
      <article className={`${sectionClasses} mb-8`}>
        <div className="flex items-center gap-3 mb-4">
          <div 
            className={`w-10 h-10 flex items-center justify-center ${templateConfig.iconStyle === 'circle' ? 'rounded-full' : templateConfig.iconStyle === 'square' ? 'rounded-none' : 'rounded-lg'}`}
            style={{ background: `linear-gradient(135deg, ${seoContent.gradientFrom}, ${seoContent.gradientTo})` }}
          >
            <IconComponent className="w-5 h-5 text-white" />
          </div>
          <h2 className={`text-2xl md:text-3xl ${headingClasses}`}>{title}</h2>
        </div>
        <div className={introStyle.columns ? 'md:columns-2 gap-8' : ''}>
          {introStyle.firstLetter ? (
            <p className="text-muted-foreground leading-relaxed first-letter:text-5xl first-letter:font-bold first-letter:float-left first-letter:mr-2" style={{ ['--first-letter-color' as string]: seoContent.gradientFrom }}>
              {content}
            </p>
          ) : introStyle.quote ? (
            <blockquote className="border-l-4 pl-6 italic text-muted-foreground" style={{ borderColor: seoContent.gradientFrom }}>
              {content}
            </blockquote>
          ) : (
            <p className="text-muted-foreground leading-relaxed text-lg">{content}</p>
          )}
        </div>
      </article>
    );
  };

  // Render features section with unique styling
  const renderFeaturesSection = () => {
    if (!hasComprehensive || comprehensiveContent.keyFeatures.length === 0) {
      if (!seoContent.keyFeatures || seoContent.keyFeatures.length === 0) return null;
    }
    
    const IconComponent = getSectionIcon('features', templateConfig.style);
    const title = getSectionTitle('features', templateConfig.style, seoContent.title);
    
    return (
      <div className={`${cardClasses} p-6 md:p-8 mb-8`}>
        <div className="flex items-center gap-3 mb-6">
          <div 
            className={`w-10 h-10 flex items-center justify-center ${templateConfig.iconStyle === 'circle' ? 'rounded-full' : templateConfig.iconStyle === 'square' ? 'rounded-none' : 'rounded-lg'}`}
            style={{ background: `linear-gradient(135deg, ${seoContent.gradientFrom}, ${seoContent.gradientTo})` }}
          >
            <IconComponent className="w-5 h-5 text-white" />
          </div>
          <h2 className={`text-xl md:text-2xl ${headingClasses}`}>{title}</h2>
        </div>
        
        {hasComprehensive && comprehensiveContent.keyFeatures.length > 0 ? (
          <div className={listStyle === 'cards' ? 'grid md:grid-cols-2 gap-4' : 'space-y-4'}>
            {comprehensiveContent.keyFeatures.map((feature, index) => (
              <div key={index} className={listStyle === 'cards' ? 'bg-secondary/50 rounded-xl p-4' : 'flex items-start gap-4'}>
                {listStyle === 'timeline' && (
                  <div className="flex flex-col items-center">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: seoContent.gradientFrom }} />
                    {index < comprehensiveContent.keyFeatures.length - 1 && (
                      <div className="w-0.5 h-full bg-border mt-1" />
                    )}
                  </div>
                )}
                <div className="flex items-start gap-3 flex-1">
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
    );
  };

  // Render how-to section with unique styling
  const renderHowToSection = () => {
    const IconComponent = getSectionIcon('howto', templateConfig.style);
    const title = getSectionTitle('howto', templateConfig.style, seoContent.title);
    
    return (
      <div className={`${cardClasses} p-6 md:p-8 mb-8`}>
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
                className={`w-10 h-10 flex items-center justify-center ${templateConfig.iconStyle === 'circle' ? 'rounded-full' : templateConfig.iconStyle === 'square' ? 'rounded-none' : 'rounded-lg'}`}
                style={{ background: `linear-gradient(135deg, ${seoContent.gradientFrom}, ${seoContent.gradientTo})` }}
              >
                <IconComponent className="w-5 h-5 text-white" />
              </div>
              <h2 className={`text-xl md:text-2xl ${headingClasses}`}>{title}</h2>
            </div>
            
            {hasComprehensive && comprehensiveContent.howToUse.length > 0 ? (
              <ol className={listStyle === 'timeline' ? 'relative border-l-2 ml-4 pl-8' : 'space-y-6'} style={listStyle === 'timeline' ? { borderColor: seoContent.gradientFrom } : {}}>
                {comprehensiveContent.howToUse.map((stepItem, index) => (
                  <li key={index} className={listStyle === 'timeline' ? 'relative pb-8 last:pb-0' : 'flex gap-4'}>
                    {listStyle === 'timeline' ? (
                      <>
                        <div 
                          className="absolute -left-[2.1rem] w-6 h-6 rounded-full flex items-center justify-center text-white text-xs font-bold"
                          style={{ background: `linear-gradient(135deg, ${seoContent.gradientFrom}, ${seoContent.gradientTo})` }}
                        >
                          {stepItem.step}
                        </div>
                        <div>
                          <h3 className="font-semibold text-foreground mb-1">{stepItem.title}</h3>
                          <p className="text-muted-foreground">{stepItem.description}</p>
                        </div>
                      </>
                    ) : (
                      <>
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
                      </>
                    )}
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
    );
  };

  // Render why important section
  const renderWhySection = () => {
    const content = hasComprehensive ? comprehensiveContent.whyImportant : seoContent.whyImportant;
    if (!content) return null;
    
    const IconComponent = getSectionIcon('why', templateConfig.style);
    const title = getSectionTitle('why', templateConfig.style, seoContent.title);
    
    return (
      <div className={`${cardClasses} p-6 md:p-8 mb-8`}>
        <div className="flex items-center gap-3 mb-4">
          <div 
            className={`w-10 h-10 flex items-center justify-center ${templateConfig.iconStyle === 'circle' ? 'rounded-full' : templateConfig.iconStyle === 'square' ? 'rounded-none' : 'rounded-lg'}`}
            style={{ background: `linear-gradient(135deg, ${seoContent.gradientFrom}, ${seoContent.gradientTo})` }}
          >
            <IconComponent className="w-5 h-5 text-white" />
          </div>
          <h2 className={`text-xl md:text-2xl ${headingClasses}`}>{title}</h2>
        </div>
        <p className="text-muted-foreground leading-relaxed">{content}</p>
      </div>
    );
  };

  // Render benefits section
  const renderBenefitsSection = () => {
    const IconComponent = getSectionIcon('benefits', templateConfig.style);
    const title = getSectionTitle('benefits', templateConfig.style, seoContent.title);
    
    return (
      <div className={`${cardClasses} p-6 md:p-8 mb-8`}>
        <div className="flex items-center gap-3 mb-6">
          <div 
            className={`w-10 h-10 flex items-center justify-center ${templateConfig.iconStyle === 'circle' ? 'rounded-full' : templateConfig.iconStyle === 'square' ? 'rounded-none' : 'rounded-lg'}`}
            style={{ background: `linear-gradient(135deg, ${seoContent.gradientFrom}, ${seoContent.gradientTo})` }}
          >
            <IconComponent className="w-5 h-5 text-white" />
          </div>
          <h2 className={`text-xl md:text-2xl ${headingClasses}`}>{title}</h2>
        </div>
        
        {hasComprehensive && comprehensiveContent.benefitsText && (
          <p className="text-muted-foreground leading-relaxed mb-6">
            {comprehensiveContent.benefitsText}
          </p>
        )}
        
        <ul className={listStyle === 'cards' ? 'grid md:grid-cols-2 gap-3' : 'space-y-3'}>
          {(hasComprehensive ? comprehensiveContent.benefits : seoContent.benefits).map((benefit, index) => (
            <li key={index} className={`flex items-start gap-3 ${listStyle === 'cards' ? 'bg-secondary/30 rounded-lg p-3' : ''}`}>
              <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: seoContent.gradientFrom }} />
              <span className="text-foreground">{benefit}</span>
            </li>
          ))}
        </ul>
      </div>
    );
  };

  // Render who can use section
  const renderWhoSection = () => {
    if (!hasComprehensive && (!seoContent.whoCanUse || seoContent.whoCanUse.length === 0)) return null;
    
    const IconComponent = getSectionIcon('who', templateConfig.style);
    const title = getSectionTitle('who', templateConfig.style, seoContent.title);
    
    return (
      <div className={`${cardClasses} p-6 md:p-8 mb-8`}>
        <div className="flex items-center gap-3 mb-6">
          <div 
            className={`w-10 h-10 flex items-center justify-center ${templateConfig.iconStyle === 'circle' ? 'rounded-full' : templateConfig.iconStyle === 'square' ? 'rounded-none' : 'rounded-lg'}`}
            style={{ background: `linear-gradient(135deg, ${seoContent.gradientFrom}, ${seoContent.gradientTo})` }}
          >
            <IconComponent className="w-5 h-5 text-white" />
          </div>
          <h2 className={`text-xl md:text-2xl ${headingClasses}`}>{title}</h2>
        </div>
        
        {hasComprehensive && comprehensiveContent.whoCanUse.length > 0 ? (
          <div className={`grid ${listStyle === 'cards' ? 'md:grid-cols-2 lg:grid-cols-3' : 'md:grid-cols-2'} gap-4`}>
            {comprehensiveContent.whoCanUse.map((user, index) => {
              const UserIconComponent = getUserIcon(user.title);
              return (
                <div key={index} className="bg-secondary/50 rounded-xl p-4">
                  <div className="flex items-start gap-3">
                    <UserIconComponent className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: seoContent.gradientFrom }} />
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
    );
  };

  // Render use cases section
  const renderUseCasesSection = () => {
    if (!hasComprehensive || !comprehensiveContent.useCases || comprehensiveContent.useCases.length === 0) return null;
    
    const IconComponent = getSectionIcon('usecases', templateConfig.style);
    const title = getSectionTitle('usecases', templateConfig.style, seoContent.title);
    
    return (
      <div className={`${cardClasses} p-6 md:p-8 mb-8`}>
        <div className="flex items-center gap-3 mb-6">
          <div 
            className={`w-10 h-10 flex items-center justify-center ${templateConfig.iconStyle === 'circle' ? 'rounded-full' : templateConfig.iconStyle === 'square' ? 'rounded-none' : 'rounded-lg'}`}
            style={{ background: `linear-gradient(135deg, ${seoContent.gradientFrom}, ${seoContent.gradientTo})` }}
          >
            <IconComponent className="w-5 h-5 text-white" />
          </div>
          <h2 className={`text-xl md:text-2xl ${headingClasses}`}>{title}</h2>
        </div>
        <div className={`grid ${listStyle === 'cards' ? 'md:grid-cols-2' : 'md:grid-cols-3'} gap-4`}>
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
    );
  };

  // Render FAQ section
  const renderFAQSection = () => {
    const IconComponent = getSectionIcon('faq', templateConfig.style);
    const title = getSectionTitle('faq', templateConfig.style, seoContent.title);
    
    return (
      <div className={`${cardClasses} p-6 md:p-8 mb-8`}>
        <div className="flex items-center gap-3 mb-6">
          <div 
            className={`w-10 h-10 flex items-center justify-center ${templateConfig.iconStyle === 'circle' ? 'rounded-full' : templateConfig.iconStyle === 'square' ? 'rounded-none' : 'rounded-lg'}`}
            style={{ background: `linear-gradient(135deg, ${seoContent.gradientFrom}, ${seoContent.gradientTo})` }}
          >
            <IconComponent className="w-5 h-5 text-white" />
          </div>
          <h2 className={`text-xl md:text-2xl ${headingClasses}`}>{title}</h2>
        </div>
        <Accordion type="single" collapsible className="w-full">
          {(hasComprehensive ? comprehensiveContent.faqs : seoContent.faqs).map((faq, index) => (
            <AccordionItem key={index} value={`faq-${index}`} className={templateConfig.style === 'professional' ? 'border-l-2 pl-4 mb-2' : ''} style={templateConfig.style === 'professional' ? { borderColor: seoContent.gradientFrom } : {}}>
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
    );
  };

  // Render privacy section
  const renderPrivacySection = () => {
    const privacyContent = hasComprehensive && comprehensiveContent.privacyNote 
      ? comprehensiveContent.privacyNote 
      : (seoContent.privacyNote || "Your privacy is our priority. We do not store your files or data. All processing happens securely in your browser, and files are never uploaded to external servers. Your information remains completely private and is automatically cleared after use.");
    
    const title = getSectionTitle('privacy', templateConfig.style, seoContent.title);
    
    // Different privacy section designs based on template
    const privacyStyles: Record<string, string> = {
      magazine: 'bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/20',
      technical: 'bg-gray-50 dark:bg-gray-900 border-l-4 border-green-500',
      creative: 'bg-gradient-to-br from-teal-500/10 via-green-500/10 to-emerald-500/10 rounded-3xl',
      professional: 'bg-white dark:bg-gray-900 border-2 border-green-200 dark:border-green-800',
      minimalist: 'bg-green-50/50 dark:bg-green-900/20',
      tutorial: 'bg-gradient-to-r from-blue-500/10 to-green-500/10 border border-blue-200',
      utility: 'bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700',
      security: 'bg-gradient-to-br from-red-500/10 via-orange-500/10 to-yellow-500/10 border-2 border-red-200'
    };
    
    return (
      <div className={`${privacyStyles[templateConfig.style] || privacyStyles.magazine} rounded-2xl p-6 md:p-8 mb-8`}>
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-xl bg-green-500/20 flex items-center justify-center flex-shrink-0">
            <Shield className="w-6 h-6 text-green-600" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-green-700 dark:text-green-400 mb-2">{title}</h2>
            <p className="text-muted-foreground leading-relaxed">{privacyContent}</p>
          </div>
        </div>
      </div>
    );
  };

  // Map section names to render functions
  const sectionRenderers: Record<string, () => React.ReactNode> = {
    intro: renderIntroSection,
    features: renderFeaturesSection,
    howto: renderHowToSection,
    why: renderWhySection,
    benefits: renderBenefitsSection,
    who: renderWhoSection,
    usecases: renderUseCasesSection,
    faq: renderFAQSection,
    privacy: renderPrivacySection
  };

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

          {/* Hero Section - Tool First */}
          <section className="py-6 md:py-10">
            <div className="container mx-auto px-4 max-w-6xl">
              {/* Title with unique badge style per category */}
              <div className="text-center mb-6">
                <div className={`inline-flex items-center gap-2 mb-4 ${badgeClasses}`}>
                  <Star className="w-4 h-4" />
                  <span className="text-sm font-medium">Free Online Tool</span>
                </div>
                <h1 className={`text-3xl md:text-4xl lg:text-5xl mb-4 ${headingClasses}`}>
                  {comprehensiveContent?.h1 || seoContent.h1}
                </h1>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  {seoContent.shortDescription}
                </p>
              </div>

              {/* Tool Component with Side Ads on Desktop */}
              <div className="mb-12">
                {/* Desktop: Tool with ads on both sides */}
                <div className="hidden lg:flex gap-4 justify-center items-start">
                  {/* Left Side Ad */}
                  <div className="flex-shrink-0 sticky top-24">
                    <ToolSideAd />
                  </div>
                  
                  {/* Tool Component */}
                  <div className="flex-1 max-w-4xl">
                    {children}
                  </div>
                  
                  {/* Right Side Ad */}
                  <div className="flex-shrink-0 sticky top-24">
                    <ToolSideAd />
                  </div>
                </div>
                
                {/* Mobile/Tablet: Tool only */}
                <div className="lg:hidden">
                  {children}
                </div>
                
                {/* Mobile/Tablet Native Ad - Below tool dropdown */}
                <MobileNativeAd className="mt-4" />
                
                {/* Native Banner Ad - Below tool/drag-drop area (Desktop) */}
                <div className="mt-6 hidden lg:block">
                  <NativeBannerAd />
                </div>
              </div>

              {/* Ad placement after tool */}
              <InContentAd className="mb-8 hidden lg:flex" />
              
              {/* Quick benefits below tool - unique style per category */}
              <div className={`text-left max-w-4xl mx-auto ${sectionClasses}`}>
                <h2 className={`text-xl mb-3 flex items-center gap-2 ${headingClasses}`}>
                  <BookOpen className="w-5 h-5" style={{ color: seoContent.gradientFrom }} />
                  What is {seoContent.title}?
                </h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  {hasComprehensive && comprehensiveContent.introduction 
                    ? comprehensiveContent.introduction.substring(0, 300) + '...'
                    : seoContent.longDescription.substring(0, 300) + '...'}
                </p>
                
                {/* Quick benefits list with unique styling */}
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
          </section>

          {/* Article Content - Sections rendered in unique order per template */}
          <section className={`py-12 ${templateConfig.style === 'creative' ? 'bg-gradient-to-b from-background to-secondary/30' : templateConfig.style === 'professional' ? 'bg-secondary/20' : 'bg-secondary/30'}`}>
            <div className="container mx-auto px-4 max-w-4xl">
              
              {/* Render sections in template-specific order */}
              {templateConfig.sectionOrder.map((section) => (
                <div key={section}>
                  {sectionRenderers[section]?.()}
                </div>
              ))}

              {/* Conclusion - Always at end */}
              {(hasComprehensive && comprehensiveContent.conclusion) || seoContent.conclusion ? (
                <div className={`${cardClasses} p-6 md:p-8 mb-8`}>
                  <div className="flex items-center gap-3 mb-4">
                    <div 
                      className={`w-10 h-10 flex items-center justify-center ${templateConfig.iconStyle === 'circle' ? 'rounded-full' : templateConfig.iconStyle === 'square' ? 'rounded-none' : 'rounded-lg'}`}
                      style={{ background: `linear-gradient(135deg, ${seoContent.gradientFrom}, ${seoContent.gradientTo})` }}
                    >
                      <Star className="w-5 h-5 text-white" />
                    </div>
                    <h2 className={`text-xl md:text-2xl ${headingClasses}`}>
                      {templateConfig.style === 'creative' ? 'Start Creating Now' : 
                       templateConfig.style === 'technical' ? 'Summary' :
                       templateConfig.style === 'professional' ? 'Final Thoughts' :
                       'Conclusion'}
                    </h2>
                  </div>
                  <p className="text-muted-foreground leading-relaxed">
                    {hasComprehensive ? comprehensiveContent.conclusion : seoContent.conclusion}
                  </p>
                </div>
              ) : null}

              {/* Mobile Native Ad between content sections */}
              <div className="lg:hidden">
                <MobileNativeAd />
              </div>
              
              {/* Desktop Ad between content sections */}
              <InContentAd className="my-8 hidden lg:flex" />
              
              {/* Mobile Native Ad - Middle of page */}
              <div className="lg:hidden">
                <MobileNativeAd />
              </div>
              
              {/* Desktop Native Banner Ad - Middle of page */}
              <div className="hidden lg:block">
                <NativeBannerAd />
              </div>

              {/* Related Articles from Blog */}
              <RelatedArticles 
                toolSlug={seoContent.slug} 
                title={templateConfig.style === 'technical' ? 'Technical Documentation' : 
                       templateConfig.style === 'creative' ? 'Inspiration & Ideas' :
                       'Helpful Guides & Tutorials'}
                maxItems={3}
              />

              {/* Mobile Native Ad before related tools */}
              <div className="lg:hidden my-6">
                <MobileNativeAd />
              </div>
              
              {/* Desktop Ad before related tools */}
              <InContentAd className="my-8 hidden lg:flex" />

              {/* Related Tools - Unique style per template */}
              <div className={`${cardClasses} p-6 md:p-8`}>
                <h2 className={`text-xl md:text-2xl mb-4 ${headingClasses}`}>
                  {templateConfig.style === 'creative' ? 'More Creative Tools' :
                   templateConfig.style === 'technical' ? 'Related Utilities' :
                   templateConfig.style === 'professional' ? 'Complementary Solutions' :
                   'Related Tools You May Also Like'}
                </h2>
                <p className="text-muted-foreground mb-6">
                  {templateConfig.style === 'creative' ? 'Explore more ways to enhance your creative projects.' :
                   templateConfig.style === 'technical' ? 'Additional tools for your workflow.' :
                   'Explore more free tools from our collection.'}
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
                        className={`w-10 h-10 flex items-center justify-center flex-shrink-0 ${templateConfig.iconStyle === 'circle' ? 'rounded-full' : templateConfig.iconStyle === 'square' ? 'rounded-none' : 'rounded-lg'}`}
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
                
                {/* Category navigation */}
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

          {/* Native Banner Ad - Less intrusive placement */}
          <div className="container mx-auto px-4 max-w-4xl">
            <NativeBannerAd />
          </div>

          {/* CTA Section - Unique per template */}
          <section className={`py-12 ${templateConfig.style === 'creative' ? 'bg-gradient-to-r' : ''}`} style={templateConfig.style === 'creative' ? { backgroundImage: `linear-gradient(135deg, ${seoContent.gradientFrom}10, ${seoContent.gradientTo}10)` } : {}}>
            <div className="container mx-auto px-4 max-w-4xl text-center">
              <h2 className={`text-2xl md:text-3xl mb-4 ${headingClasses}`}>
                {templateConfig.style === 'creative' ? 'Ready to Create?' :
                 templateConfig.style === 'technical' ? 'Explore More Tools' :
                 templateConfig.style === 'professional' ? 'Discover Our Full Suite' :
                 'Explore More Tools'}
              </h2>
              <p className="text-muted-foreground mb-6">
                {templateConfig.style === 'creative' ? 'Unleash your creativity with our complete collection of free tools.' :
                 templateConfig.style === 'technical' ? 'Access our comprehensive toolkit for all your image processing needs.' :
                 'Discover our complete collection of free image tools to enhance your workflow.'}
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

          {/* Native Banner Ad - Before Footer */}
          <div className="container mx-auto px-4 max-w-4xl py-6">
            <NativeBannerAd />
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default SEOToolPage;
