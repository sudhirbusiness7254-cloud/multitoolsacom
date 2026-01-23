import { Helmet } from "react-helmet-async";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HreflangTags from "@/components/HreflangTags";
import BirthdayWishesGenerator from "@/components/ai-tools/BirthdayWishesGenerator";
import { Cake, Sparkles, Heart, Users, Baby, Briefcase, Laugh, Download, Share2, Palette } from "lucide-react";

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

  return (
    <>
      <Helmet>
        <title>AI Birthday Wishes Generator - Create Stunning Birthday Cards Free</title>
        <meta name="description" content="Create beautiful AI-generated birthday cards with your photo. 50+ templates including professional, funny, family, and kids designs. Free, no watermarks, 4K quality." />
        <link rel="canonical" href="https://multitoolsa.com/birthday-wishes-generator" />
        <meta property="og:title" content="AI Birthday Wishes Generator - Create Stunning Birthday Cards" />
        <meta property="og:description" content="Upload your photo and create beautiful AI-generated birthday cards. 50+ templates, personalized messages, 4K quality output." />
        <meta property="og:type" content="website" />
      </Helmet>
      <HreflangTags path="/birthday-wishes-generator" />
      
      <div className="min-h-screen bg-background flex flex-col">
        <Header />
        
        <main className="flex-1">
          {/* Hero Section */}
          <section className="py-12 px-4 bg-gradient-to-br from-pink-500/10 via-purple-500/10 to-orange-500/10">
            <div className="container mx-auto max-w-4xl text-center">
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
          </section>

          {/* Main Tool */}
          <section className="py-8 px-4">
            <div className="container mx-auto">
              <BirthdayWishesGenerator />
            </div>
          </section>

          {/* Categories */}
          <section className="py-12 px-4 bg-secondary/30">
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
          <section className="py-12 px-4">
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
          <section className="py-12 px-4 bg-secondary/30">
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

          {/* FAQ */}
          <section className="py-12 px-4">
            <div className="container mx-auto max-w-3xl">
              <h2 className="text-2xl font-bold text-center mb-8">Frequently Asked Questions</h2>
              <div className="space-y-4">
                <div className="p-4 rounded-xl bg-card border border-border">
                  <h3 className="font-semibold mb-2">Is this tool really free?</h3>
                  <p className="text-sm text-muted-foreground">Yes! You can create and download birthday cards completely free with no watermarks.</p>
                </div>
                <div className="p-4 rounded-xl bg-card border border-border">
                  <h3 className="font-semibold mb-2">Will my photo be cropped?</h3>
                  <p className="text-sm text-muted-foreground">No, we preserve the full image. Your photo will be beautifully framed within the template without cutting any important parts.</p>
                </div>
                <div className="p-4 rounded-xl bg-card border border-border">
                  <h3 className="font-semibold mb-2">What quality are the downloaded images?</h3>
                  <p className="text-sm text-muted-foreground">All cards are generated in high resolution (4K quality) suitable for both social media sharing and professional printing.</p>
                </div>
                <div className="p-4 rounded-xl bg-card border border-border">
                  <h3 className="font-semibold mb-2">Are the designs original?</h3>
                  <p className="text-sm text-muted-foreground">Yes! Each design is uniquely generated by AI based on your photo and chosen template. No two cards are exactly alike.</p>
                </div>
                <div className="p-4 rounded-xl bg-card border border-border">
                  <h3 className="font-semibold mb-2">Can I use these for commercial purposes?</h3>
                  <p className="text-sm text-muted-foreground">The cards are intended for personal use. For commercial use, please contact us for licensing options.</p>
                </div>
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
