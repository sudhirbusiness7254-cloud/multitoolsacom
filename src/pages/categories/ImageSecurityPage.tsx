import { Helmet } from "react-helmet-async";
import CategoryPageLayout from "@/components/CategoryPageLayout";
import UniversalImageSecurity from "@/components/UniversalImageSecurity";
import { getCategoryBySlug } from "@/data/toolsData";
import { getCategorySEOContent } from "@/data/categorySEOData";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { CheckCircle, Shield, Zap, EyeOff, Lock, Eye, Settings, ShieldCheck } from "lucide-react";
import { AdVideo, AdInline } from "@/components/ads/AdContainer";

const ImageSecurityPage = () => {
  const category = getCategoryBySlug("image-security")!;
  const seoContent = getCategorySEOContent("image-security")!;

  const faqs = [
    {
      question: "What security options are available for my images?",
      answer: "Our tool offers blur effects to obscure sensitive areas, pixelation for strong anonymization, complete blackout to hide regions entirely, and face detection assistance. Each method provides different levels of privacy protection."
    },
    {
      question: "When should I use blur vs. pixelation?",
      answer: "Blur creates a soft, natural-looking obscuration ideal for maintaining aesthetic appeal while hiding details. Pixelation creates a more obvious 'censored' look with stronger privacy protection as it completely destroys detail. Choose based on your aesthetic and security needs."
    },
    {
      question: "How do I select areas to obscure?",
      answer: "Simply click and drag on your image to select rectangular areas. You can select multiple areas to obscure different regions. Touch support is available for mobile devices. Adjust your selection before applying the effect."
    },
    {
      question: "Can I blur faces in photos?",
      answer: "Yes! You can manually select faces by drawing rectangles over them, or use our assisted selection mode. This is perfect for protecting identity in photos shared publicly, complying with privacy regulations, or respecting individuals' privacy."
    },
    {
      question: "What intensity levels are available?",
      answer: "Our tools offer adjustable intensity levels from subtle to maximum. Light blur/pixelation may still allow recognition, while maximum settings ensure complete anonymization. Preview different levels before saving to find the right balance."
    },
    {
      question: "Is the obscuring permanent and irreversible?",
      answer: "Yes, once applied and saved, blur, pixelation, and blackout effects are permanent. The original image data in obscured areas is destroyed and cannot be recovered. Always keep a backup of your original image if needed."
    },
    {
      question: "What image formats are supported?",
      answer: "We support all major image formats including JPEG, PNG, WebP, GIF, and TIFF. The output preserves your input format while permanently applying the security effects."
    },
    {
      question: "Are my images kept private during processing?",
      answer: "Absolutely. All security processing happens directly in your browser. Your sensitive images are never uploaded to any server, ensuring complete privacy while you're protecting privacy within the images themselves."
    }
  ];

  return (
    <>
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            "name": "Free Online Image Security Tool",
            "description": "Blur, pixelate, and hide sensitive areas in images online for free. Protect faces, license plates, and private information with our browser-based tool.",
            "url": window.location.href,
            "applicationCategory": "MultimediaApplication",
            "operatingSystem": "Any",
            "offers": {
              "@type": "Offer",
              "price": "0",
              "priceCurrency": "USD"
            },
            "featureList": [
              "Blur sensitive areas",
              "Pixelate for anonymization",
              "Blackout regions",
              "Face obscuring",
              "Adjustable intensity",
              "Client-side processing"
            ]
          })}
        </script>
      </Helmet>

      <CategoryPageLayout category={category} seoContent={seoContent}>
        <UniversalImageSecurity />
        {/* Video Ad - Below Tool Output */}
        <AdVideo className="mt-6" />

        {/* Comprehensive About Section - 1000+ words */}
        <section className="mt-16 space-y-8">
          <div className="prose prose-lg max-w-none dark:prose-invert">
            <h2 className="text-3xl font-bold text-foreground mb-6">About Our Free Online Image Security Tool</h2>
            
            <p className="text-muted-foreground leading-relaxed">
              Welcome to our comprehensive image security and privacy tool, designed to protect sensitive information and personal identities within your photographs. In an age of widespread digital sharing, the ability to obscure faces, license plates, document contents, and other private information has become essential for responsible image publishing. Our free online tool provides professional-grade blur, pixelation, and blackout capabilities that permanently protect sensitive areas while maintaining the overall usability and context of your images.
            </p>

            <p className="text-muted-foreground leading-relaxed">
              The need for image security tools has grown dramatically alongside the expansion of social media, news publishing, and digital documentation. Privacy regulations like GDPR in Europe and similar laws worldwide require explicit consent before publishing identifiable images of individuals. Street photographers, journalists, real estate agents, and everyday social media users all encounter situations where publishing unmodified images could violate privacy expectations or legal requirements. Our tool makes compliance and courtesy simple by providing effective, permanent anonymization.
            </p>

            <p className="text-muted-foreground leading-relaxed">
              Our blur functionality applies a Gaussian blur effect that softly obscures selected areas while maintaining a natural, aesthetically pleasing appearance. Blur is ideal when you want to hide details without creating an obviously "censored" look – for example, softening background faces in event photography, obscuring names on documents while keeping the document readable, or gently hiding identifying details in real estate photos. Adjustable blur intensity lets you dial in exactly the right level, from subtle softening to complete obscuration.
            </p>

            <p className="text-muted-foreground leading-relaxed">
              Pixelation provides a more aggressive anonymization approach, reducing selected areas to a grid of large pixels that completely destroys fine detail. This creates the classic "pixelated face" effect familiar from news broadcasts and documentaries. Pixelation is preferred when you need to ensure recognition is absolutely impossible, when you want to clearly signal that content has been redacted, or when dealing with particularly sensitive content that requires maximum protection. Variable pixelation intensity controls how large the pixel blocks become.
            </p>

            <p className="text-muted-foreground leading-relaxed">
              Complete blackout offers the ultimate privacy protection, replacing selected areas with solid black (or other colors) that completely conceals the underlying content. Blackout leaves no trace of what was originally present, making it ideal for redacting document contents, removing proprietary information from screenshots, or any situation where even the general shape or color of the original content should not be visible. This is the method typically used for legal document redaction.
            </p>

            <p className="text-muted-foreground leading-relaxed">
              The selection interface makes it easy to identify and mark areas for protection. Simply click and drag to create rectangular selections over the areas you want to obscure. Multiple selections can be made to handle images with several sensitive areas – multiple faces in a crowd, a license plate and a house number in the same photo, or scattered personal information throughout a document. Each selection can be adjusted before effects are applied, ensuring precise coverage without obscuring more than necessary.
            </p>

            <p className="text-muted-foreground leading-relaxed">
              Face protection is one of the most common use cases for image security tools. Whether you're a street photographer respecting the privacy of incidental subjects, a parent sharing family photos while protecting children's identities, a journalist documenting events without exposing vulnerable individuals, or a business publishing workplace photos that include non-consenting employees, our tool makes face anonymization quick and effective. The selection interface is optimized for selecting face-sized rectangular areas.
            </p>

            <p className="text-muted-foreground leading-relaxed">
              License plate and vehicle identification obscuring serves important privacy functions. Real estate photos shouldn't reveal the plates of neighbors' vehicles. Street photography shouldn't create databases of vehicle locations. Selling a car online shouldn't expose your license information until after the sale. Quick plate selection and blur or pixelation protects this commonly overlooked privacy vector while keeping the rest of your images fully visible.
            </p>

            <p className="text-muted-foreground leading-relaxed">
              Document and screen content protection addresses the growing need to share screenshots and document photos without exposing sensitive information. Obscure personal information on forms before sharing for support purposes. Hide proprietary data when creating software tutorials. Redact confidential sections while sharing the relevant portions of documents. Our tools provide the precision needed for clean, professional-looking redaction that clearly indicates removed content while preserving document context.
            </p>

            <p className="text-muted-foreground leading-relaxed">
              Understanding that security is about permanence, all obscuring effects are destructive – the original pixel data in protected areas is permanently replaced. Unlike cosmetic filters that can be removed, our blur, pixelation, and blackout effects genuinely destroy the underlying information. This means properly protected images are truly safe to share; there's no hidden layer, no reversible effect, no metadata containing the original. What you see is all that exists.
            </p>

            <p className="text-muted-foreground leading-relaxed">
              Privacy during the protection process is equally important as privacy in the output. Our tool operates entirely within your web browser using client-side JavaScript processing. The sensitive images you're working to protect never leave your device – they're not uploaded to any server, stored in any cloud, or accessible to any third party. This local processing approach means you can work with the most sensitive content confident that your privacy protection workflow is itself private.
            </p>

            <p className="text-muted-foreground leading-relaxed">
              Mobile and touch support brings our security tools to tablets and smartphones, where many photos are captured and initially processed. Draw selection rectangles with your finger, preview effects in real-time, and save protected images directly from your mobile device. The same professional capabilities available on desktop work seamlessly on touch devices, making privacy protection possible wherever you are.
            </p>
          </div>
        </section>

        {/* How to Use Section */}
        <section className="mt-12 space-y-6">
          <h2 className="text-3xl font-bold text-foreground">How to Protect Sensitive Image Areas</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { step: "1", title: "Upload Image", desc: "Drag and drop your image or click to browse. We support JPEG, PNG, WebP, GIF, and TIFF formats." },
              { step: "2", title: "Select Areas", desc: "Click and drag to select rectangular regions containing sensitive content like faces or text." },
              { step: "3", title: "Choose Effect", desc: "Select blur, pixelation, or blackout. Adjust intensity levels to achieve desired protection." },
              { step: "4", title: "Download", desc: "Save your protected image. The obscuring is permanent – original data is destroyed." }
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
        </section>

        {/* Why Use Section */}
        <section className="mt-12 space-y-6">
          <h2 className="text-3xl font-bold text-foreground">Why Use Our Image Security Tool?</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              { icon: EyeOff, title: "Multiple Protection Methods", desc: "Choose from blur, pixelation, or complete blackout based on your aesthetic and security needs." },
              { icon: ShieldCheck, title: "Permanent Protection", desc: "Effects are destructive and irreversible. Original data is truly destroyed, not just hidden." },
              { icon: Settings, title: "Adjustable Intensity", desc: "Fine-tune protection levels from subtle to maximum. Preview before applying to find the right balance." },
              { icon: Zap, title: "Instant Processing", desc: "Browser-based processing means instant results. Protect images in seconds, not minutes." },
              { icon: Eye, title: "Real-Time Preview", desc: "See exactly how protected areas will look before saving. Adjust selections with immediate feedback." },
              { icon: Shield, title: "Complete Privacy", desc: "Sensitive images never leave your device. All processing happens locally in your browser." }
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
        </section>

        {/* Key Benefits Section */}
        <section className="mt-12 space-y-6">
          <h2 className="text-3xl font-bold text-foreground">Key Benefits of Image Security</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              "Protect personal identity",
              "Comply with privacy laws",
              "Blur faces in photos",
              "Hide license plates",
              "Redact document content",
              "Protect minors in images",
              "Professional anonymization",
              "Irreversible protection",
              "Respect privacy rights"
            ].map((benefit, index) => (
              <div key={index} className="flex items-center gap-3 p-4 bg-card border border-border rounded-lg">
                <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                <span className="text-foreground">{benefit}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Privacy & Security Section */}
        <section className="mt-12 space-y-6">
          <h2 className="text-3xl font-bold text-foreground">Privacy & Security Guarantee</h2>
          <div className="bg-card border border-border rounded-xl p-8">
            <div className="flex items-start gap-4 mb-6">
              <Lock className="w-10 h-10 text-primary flex-shrink-0" />
              <div>
                <h3 className="text-xl font-semibold text-foreground mb-2">Your Sensitive Images Stay Private</h3>
                <p className="text-muted-foreground">
                  When working with images that require privacy protection, the last thing you need is privacy risk during processing. Our security tool operates entirely within your web browser. Your sensitive images are processed locally and never uploaded to any server.
                </p>
              </div>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              {[
                { title: "Zero Server Uploads", desc: "All security processing happens 100% locally. No sensitive images ever leave your device." },
                { title: "No Data Collection", desc: "We don't track, store, or analyze any information about your images or protection activities." },
                { title: "No Account Required", desc: "Use our security tool freely without registration, login, or personal information." },
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
        </section>

        {/* FAQ Section */}
        <section className="mt-12 space-y-6">
          <h2 className="text-3xl font-bold text-foreground">Frequently Asked Questions</h2>
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`} className="border border-border rounded-lg mb-3 px-4">
                <AccordionTrigger className="text-left text-foreground hover:no-underline">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </section>
      </CategoryPageLayout>
    </>
  );
};

export default ImageSecurityPage;
