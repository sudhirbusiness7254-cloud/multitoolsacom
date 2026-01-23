import { Helmet } from "react-helmet-async";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HreflangTags from "@/components/HreflangTags";
import BirthdayWishesGenerator from "@/components/ai-tools/BirthdayWishesGenerator";
import { Link } from "react-router-dom";
import { ArrowLeft, Cake, Sparkles, Heart, Users, Baby, Briefcase, Laugh, Download, Share2, Palette, Shield, CheckCircle, Gift, PartyPopper, Star } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const BirthdayWishesGeneratorPage = () => {
  const features = [
    {
      icon: <Sparkles className="w-6 h-6" />,
      title: "AI-Generated Designs",
      description: "Unique birthday cards created by advanced AI, never copied or duplicated"
    },
    {
      icon: <Palette className="w-6 h-6" />,
      title: "50+ Templates",
      description: "Professional, funny, casual, family, and kids templates to choose from"
    },
    {
      icon: <Heart className="w-6 h-6" />,
      title: "Personalized Messages",
      description: "AI writes custom birthday wishes that feel warm and genuine"
    },
    {
      icon: <Download className="w-6 h-6" />,
      title: "4K Quality Output",
      description: "High-resolution images perfect for printing and social media"
    },
    {
      icon: <Share2 className="w-6 h-6" />,
      title: "Social Media Ready",
      description: "Optimized for WhatsApp, Instagram, Facebook sharing"
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "No Watermarks",
      description: "Download clean, professional cards without any branding"
    },
  ];

  const categories = [
    { icon: <Briefcase className="w-8 h-8" />, name: "Professional", desc: "Elegant & formal designs", color: "from-amber-500 to-yellow-500" },
    { icon: <Laugh className="w-8 h-8" />, name: "Comedy", desc: "Funny & playful cards", color: "from-pink-500 to-red-500" },
    { icon: <Users className="w-8 h-8" />, name: "Friends", desc: "Casual & warm wishes", color: "from-cyan-500 to-blue-500" },
    { icon: <Heart className="w-8 h-8" />, name: "Family", desc: "Heartfelt & loving", color: "from-rose-500 to-pink-500" },
    { icon: <Baby className="w-8 h-8" />, name: "Kids", desc: "Cartoon & playful", color: "from-purple-500 to-indigo-500" },
  ];

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Is this birthday card generator really free?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes! You can create and download birthday cards completely free with no watermarks or hidden fees."
        }
      },
      {
        "@type": "Question",
        "name": "Will my photo be cropped?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "No, we preserve your full image. Your photo is beautifully framed within the template without cutting any important parts."
        }
      },
      {
        "@type": "Question",
        "name": "What quality are the downloaded cards?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "All cards are generated in high resolution (4K quality) suitable for both social media sharing and professional printing."
        }
      }
    ]
  };

  return (
    <>
      <Helmet>
        <title>AI Birthday Wishes Generator - Create Stunning Birthday Cards Free | MultiToolsA</title>
        <meta name="description" content="Create beautiful AI-generated birthday cards with your photo. 50+ templates including professional, funny, family, and kids designs. Free, no watermarks, 4K quality." />
        <meta name="keywords" content="birthday card generator, birthday wishes, birthday card maker, free birthday card, personalized birthday card, AI birthday card, birthday greeting" />
        <link rel="canonical" href="https://multitoolsa.com/birthday-wishes-generator" />
        <meta property="og:title" content="AI Birthday Wishes Generator - Create Stunning Birthday Cards" />
        <meta property="og:description" content="Upload your photo and create beautiful AI-generated birthday cards. 50+ templates, personalized messages, 4K quality output." />
        <meta property="og:type" content="website" />
        
        <script type="application/ld+json">
          {JSON.stringify(faqSchema)}
        </script>
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            "name": "AI Birthday Wishes Generator",
            "description": "Free AI-powered birthday card generator with personalized messages and beautiful designs",
            "url": "https://multitoolsa.com/birthday-wishes-generator",
            "applicationCategory": "DesignApplication",
            "operatingSystem": "Any",
            "offers": {
              "@type": "Offer",
              "price": "0",
              "priceCurrency": "USD"
            }
          })}
        </script>
      </Helmet>
      <HreflangTags path="/birthday-wishes-generator" />
      
      <div className="min-h-screen bg-background flex flex-col">
        <Header />
        
        <main className="flex-1">
          {/* Hero Section */}
          <section className="py-12 px-4 bg-gradient-to-br from-pink-500/10 via-purple-500/10 to-orange-500/10">
            <div className="container mx-auto max-w-4xl">
              <div className="mb-6">
                <Link 
                  to="/ai-image-tools" 
                  className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Back to AI Image Tools
                </Link>
              </div>
              
              <div className="text-center">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-pink-500/10 text-pink-600 dark:text-pink-400 mb-6">
                  <Cake className="w-5 h-5" />
                  <span className="text-sm font-medium">AI-Powered Birthday Cards</span>
                </div>
                <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-pink-500 via-purple-500 to-orange-500 bg-clip-text text-transparent">
                  Birthday Wishes Generator
                </h1>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  Upload your photo and create stunning, personalized birthday cards with AI-generated designs and heartfelt messages. Perfect for sharing on social media or printing.
                </p>
              </div>
            </div>
          </section>

          {/* Main Tool */}
          <section className="py-8 px-4">
            <div className="container mx-auto">
              <BirthdayWishesGenerator />
            </div>
          </section>

          {/* About Section */}
          <section className="py-12 md:py-16 px-4 bg-secondary/30">
            <div className="container mx-auto max-w-4xl">
              <h2 className="text-2xl md:text-4xl font-bold text-center mb-8">About Birthday Wishes Generator</h2>
              
              <div className="prose prose-lg dark:prose-invert max-w-none space-y-6">
                <p>
                  Creating the perfect birthday card has never been easier. Our AI-powered Birthday Wishes Generator combines your personal photos with beautiful templates and heartfelt AI-generated messages to create stunning, one-of-a-kind birthday cards that truly celebrate the special person in your life.
                </p>
                
                <p>
                  Unlike generic store-bought cards or basic online templates, our generator uses artificial intelligence to craft personalized messages that match the relationship and occasion. Whether you need a professional greeting for a colleague, a hilarious card for your best friend, a heartfelt message for family, or a colorful design for a child's birthday, we have templates and messages that fit perfectly.
                </p>
                
                <p>
                  The process is simple: upload a photo of the birthday person, choose a template category that matches the relationship, optionally add the person's name for personalization, and our AI generates a beautiful card with a custom birthday message. The result is a high-quality, 4K resolution image ready for sharing on WhatsApp, Instagram, Facebook, or printing for a physical card.
                </p>
                
                <h3 className="text-xl font-semibold mt-8">Why Personalized Birthday Cards Matter</h3>
                
                <p>
                  In an age of quick texts and generic emojis, a personalized birthday card stands out. It shows you took the time to create something special for the recipient. Studies show that personalized gifts and greetings are remembered longer and create stronger emotional connections. Our tool makes creating that personal touch quick and effortless while still producing professional-quality results.
                </p>
                
                <p>
                  Whether you're creating cards for friends, family, coworkers, or clients, our Birthday Wishes Generator helps you express your sentiments in a visually stunning way that the recipient will treasure and share.
                </p>
              </div>
            </div>
          </section>

          {/* Categories */}
          <section className="py-12 px-4">
            <div className="container mx-auto max-w-5xl">
              <h2 className="text-2xl font-bold text-center mb-8">5 Template Categories</h2>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                {categories.map((cat) => (
                  <div key={cat.name} className="text-center p-6 rounded-xl bg-card border border-border hover:shadow-lg transition-shadow">
                    <div className={`w-16 h-16 mx-auto rounded-full bg-gradient-to-br ${cat.color} flex items-center justify-center text-white mb-3`}>
                      {cat.icon}
                    </div>
                    <h3 className="font-semibold">{cat.name}</h3>
                    <p className="text-xs text-muted-foreground mt-1">{cat.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Features */}
          <section className="py-12 px-4 bg-gradient-dark">
            <div className="container mx-auto max-w-5xl">
              <h2 className="text-2xl font-bold text-center mb-8">Why Use Our Birthday Card Generator?</h2>
              <div className="grid md:grid-cols-3 gap-6">
                {features.map((feature) => (
                  <div key={feature.title} className="p-6 rounded-xl bg-card border border-border">
                    <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-pink-500/20 to-purple-500/20 flex items-center justify-center text-pink-500 mb-4">
                      {feature.icon}
                    </div>
                    <h3 className="font-semibold mb-2">{feature.title}</h3>
                    <p className="text-sm text-muted-foreground">{feature.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* How It Works */}
          <section className="py-12 px-4">
            <div className="container mx-auto max-w-4xl">
              <h2 className="text-2xl font-bold text-center mb-8">How It Works</h2>
              <div className="grid md:grid-cols-3 gap-8">
                <div className="text-center">
                  <div className="w-12 h-12 mx-auto rounded-full bg-gradient-to-r from-pink-500 to-purple-500 text-white flex items-center justify-center text-xl font-bold mb-4">1</div>
                  <h3 className="font-semibold mb-2">Upload Photo</h3>
                  <p className="text-sm text-muted-foreground">Upload a photo of the birthday person. We'll keep the full image without cropping.</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 mx-auto rounded-full bg-gradient-to-r from-purple-500 to-orange-500 text-white flex items-center justify-center text-xl font-bold mb-4">2</div>
                  <h3 className="font-semibold mb-2">Choose Template</h3>
                  <p className="text-sm text-muted-foreground">Pick from 50+ templates across 5 categories. Add personalization if you want.</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 mx-auto rounded-full bg-gradient-to-r from-orange-500 to-pink-500 text-white flex items-center justify-center text-xl font-bold mb-4">3</div>
                  <h3 className="font-semibold mb-2">Download & Share</h3>
                  <p className="text-sm text-muted-foreground">Get your 4K quality birthday card instantly. Share on WhatsApp, Instagram, or print it!</p>
                </div>
              </div>
            </div>
          </section>

          {/* Use Cases */}
          <section className="py-12 md:py-16 px-4 bg-secondary/30">
            <div className="container mx-auto max-w-5xl">
              <h2 className="text-2xl md:text-4xl font-bold text-center mb-10">Perfect For Every Occasion</h2>
              
              <div className="grid md:grid-cols-3 gap-6">
                {[
                  { icon: Gift, title: "Personal Celebrations", desc: "Create heartfelt cards for friends and family birthdays that show you care and put thought into their special day." },
                  { icon: Briefcase, title: "Professional Greetings", desc: "Send polished, professional birthday wishes to colleagues, clients, and business contacts with elegant templates." },
                  { icon: PartyPopper, title: "Kids' Parties", desc: "Design colorful, fun cards for children's birthdays featuring cartoon styles and playful themes they'll love." },
                  { icon: Heart, title: "Long-Distance Love", desc: "When you can't be there in person, send a personalized digital card that bridges the distance with warmth." },
                  { icon: Star, title: "Social Media Posts", desc: "Create shareable birthday posts for Instagram, Facebook, and Twitter that celebrate your loved ones publicly." },
                  { icon: Users, title: "Group Wishes", desc: "Perfect for team birthday cards or when you want to include a special photo in group birthday greetings." }
                ].map((item, i) => (
                  <div key={i} className="bg-card rounded-xl p-6 border border-border">
                    <div className="w-12 h-12 rounded-xl bg-pink-500/10 flex items-center justify-center mb-4">
                      <item.icon className="w-6 h-6 text-pink-500" />
                    </div>
                    <h3 className="font-semibold text-lg mb-2">{item.title}</h3>
                    <p className="text-sm text-muted-foreground">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Benefits */}
          <section className="py-12 md:py-16 px-4">
            <div className="container mx-auto max-w-4xl">
              <h2 className="text-2xl md:text-4xl font-bold text-center mb-8">Why Choose Our Generator</h2>
              
              <div className="grid md:grid-cols-2 gap-6">
                {[
                  { title: "Completely Free", desc: "No cost, no subscription, no hidden fees - create unlimited cards" },
                  { title: "No Watermarks", desc: "Download clean, professional cards without any branding" },
                  { title: "Photo Preservation", desc: "Your uploaded photo stays intact - no unwanted cropping" },
                  { title: "4K Resolution", desc: "Print-ready quality suitable for physical cards or large displays" },
                  { title: "Instant Creation", desc: "Generate beautiful cards in seconds, not hours" },
                  { title: "No Account Needed", desc: "Start creating immediately without signing up" },
                  { title: "50+ Templates", desc: "Wide variety across 5 categories for every relationship" },
                  { title: "AI-Personalized Messages", desc: "Heartfelt wishes generated to match the occasion" }
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold">{item.title}</h4>
                      <p className="text-sm text-muted-foreground">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Privacy & Security */}
          <section className="py-12 md:py-16 px-4 bg-secondary/30">
            <div className="container mx-auto max-w-4xl">
              <div className="bg-card rounded-2xl p-8 border border-border">
                <div className="flex items-center gap-3 mb-6">
                  <Shield className="w-8 h-8 text-green-500" />
                  <h2 className="text-2xl font-bold">Privacy & Security</h2>
                </div>
                
                <div className="prose prose-lg dark:prose-invert max-w-none">
                  <p>
                    Your photos and personal information are protected. We process birthday cards in your browser whenever possible, and any server processing is done securely with immediate deletion. We never store your photos or share them with third parties.
                  </p>
                  
                  <ul className="mt-4">
                    <li>Photos processed locally in your browser when possible</li>
                    <li>No server-side storage of uploaded images</li>
                    <li>No account required - no personal data collected</li>
                    <li>Secure, encrypted connections for all transfers</li>
                    <li>Photos never used for AI training or shared</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* FAQ */}
          <section className="py-12 px-4 bg-gradient-dark">
            <div className="container mx-auto max-w-4xl">
              <h2 className="text-2xl font-bold text-center mb-8">Frequently Asked Questions</h2>
              
              <Accordion type="single" collapsible className="space-y-4">
                <AccordionItem value="1" className="bg-card border border-border rounded-xl px-6">
                  <AccordionTrigger>Is this tool really free?</AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    Yes! You can create and download birthday cards completely free with no watermarks. There are no premium tiers, no subscriptions, and no hidden fees. Create as many cards as you like.
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="2" className="bg-card border border-border rounded-xl px-6">
                  <AccordionTrigger>Will my photo be cropped?</AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    No, we preserve the full image. Your photo will be beautifully framed within the template without cutting any important parts. We use smart framing that adapts to your photo's aspect ratio.
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="3" className="bg-card border border-border rounded-xl px-6">
                  <AccordionTrigger>What quality are the downloaded images?</AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    All cards are generated in high resolution (4K quality) suitable for both social media sharing and professional printing. You can print them as physical cards, posters, or share digitally without quality loss.
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="4" className="bg-card border border-border rounded-xl px-6">
                  <AccordionTrigger>Are the designs original?</AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    Yes! Each design is uniquely generated based on your photo and chosen template. The AI creates personalized decorations and layouts, so no two cards are exactly alike.
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="5" className="bg-card border border-border rounded-xl px-6">
                  <AccordionTrigger>Can I use these for commercial purposes?</AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    The cards are intended for personal use - sending to friends, family, and colleagues. For commercial use (selling printed cards, using in commercial promotions), please contact us for licensing options.
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="6" className="bg-card border border-border rounded-xl px-6">
                  <AccordionTrigger>How do I share the birthday card?</AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    After downloading, you can share directly to WhatsApp, Instagram, Facebook, email, or any other platform. The high-resolution image is optimized for all major social media platforms.
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="7" className="bg-card border border-border rounded-xl px-6">
                  <AccordionTrigger>Can I print the birthday card?</AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    Yes! The 4K resolution output is perfect for printing. You can print at home, use a local print shop, or use online printing services. The quality is suitable for standard card sizes up to poster size.
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="8" className="bg-card border border-border rounded-xl px-6">
                  <AccordionTrigger>What photo formats are supported?</AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    We support all major image formats including JPG, JPEG, PNG, WebP, and more. For best results, use a clear, high-resolution photo where the birthday person is visible and well-lit.
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="9" className="bg-card border border-border rounded-xl px-6">
                  <AccordionTrigger>Can I customize the birthday message?</AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    Yes! You can add the recipient's name for personalization, and the AI generates appropriate messages based on the template category you choose. Each category has unique messages suited to that relationship type.
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="10" className="bg-card border border-border rounded-xl px-6">
                  <AccordionTrigger>Do you store my photos?</AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    No. Your photos are processed to create the birthday card and immediately discarded. We never store, save, or use your photos for any other purpose. Your privacy is fully protected.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </section>

          {/* Related Tools */}
          <section className="py-12 md:py-16 px-4">
            <div className="container mx-auto max-w-4xl">
              <h2 className="text-2xl font-bold text-center mb-8">Related AI Tools</h2>
              
              <div className="grid md:grid-cols-3 gap-4">
                <Link to="/ai-photo-enhancer" className="bg-card rounded-xl p-6 border border-border hover:border-primary transition-colors">
                  <h3 className="font-semibold mb-2">AI Photo Enhancer</h3>
                  <p className="text-sm text-muted-foreground">Improve photo quality before creating your card</p>
                </Link>
                <Link to="/ai-face-beautify" className="bg-card rounded-xl p-6 border border-border hover:border-primary transition-colors">
                  <h3 className="font-semibold mb-2">AI Face Beautify</h3>
                  <p className="text-sm text-muted-foreground">Enhance facial features for the perfect photo</p>
                </Link>
                <Link to="/ai-image-restorer" className="bg-card rounded-xl p-6 border border-border hover:border-primary transition-colors">
                  <h3 className="font-semibold mb-2">AI Image Restorer</h3>
                  <p className="text-sm text-muted-foreground">Restore old photos for nostalgic birthday cards</p>
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

export default BirthdayWishesGeneratorPage;
