import { Helmet } from "react-helmet-async";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import UniversalFacebookTools from "@/components/facebook/UniversalFacebookTools";
import { Link } from "react-router-dom";
import { toolCategories } from "@/data/toolsData";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { 
  MessageSquare, 
  User, 
  Hash, 
  Lightbulb, 
  MessageCircle, 
  Type, 
  AtSign, 
  Calculator, 
  Megaphone, 
  MousePointer, 
  Calendar, 
  Clock, 
  Target, 
  Heading, 
  AlignLeft,
  CheckCircle,
  Shield,
  Zap,
  Users,
  TrendingUp,
  Globe
} from "lucide-react";

const toolIcons: Record<string, React.ElementType> = {
  "facebook-caption-generator": MessageSquare,
  "facebook-bio-generator": User,
  "facebook-hashtag-generator": Hash,
  "facebook-post-idea-generator": Lightbulb,
  "facebook-comment-generator": MessageCircle,
  "facebook-story-text-generator": Type,
  "facebook-page-name-generator": AtSign,
  "facebook-engagement-rate-calculator": Calculator,
  "facebook-ad-copy-generator": Megaphone,
  "facebook-cta-generator": MousePointer,
  "facebook-content-calendar-generator": Calendar,
  "facebook-posting-time-analyzer": Clock,
  "facebook-audience-interest-finder": Target,
  "facebook-ad-headline-generator": Heading,
  "facebook-post-formatter": AlignLeft,
};

const faqs = [
  { question: "Are these Facebook tools completely free?", answer: "Yes, all our Facebook tools are 100% free to use with no hidden charges, subscriptions, or premium features. You can use them unlimited times without paying anything." },
  { question: "Do I need to create an account to use these tools?", answer: "No, you don't need to create an account or sign up. All tools work instantly without any registration or login required." },
  { question: "Are my generated captions and bios unique?", answer: "Yes, our tools generate fresh, unique content each time based on proven engagement formulas. While they follow best practices, each output is uniquely crafted for your needs." },
  { question: "How does the engagement rate calculator work?", answer: "Simply enter your total followers and your post's likes, comments, and shares. The tool calculates your engagement rate as a percentage, helping you understand how well your content performs." },
  { question: "Can I edit the generated content?", answer: "Absolutely! We encourage you to customize any generated content to match your personal voice and brand style. The generated text is a starting point for your creativity." },
  { question: "Do these tools work on mobile devices?", answer: "Yes, all our Facebook tools are fully responsive and work perfectly on smartphones, tablets, and desktop computers." },
  { question: "Is my data safe when using these tools?", answer: "Your privacy is our priority. We don't store any data you enter. All processing happens in real-time, and no information is retained after you leave the page." },
  { question: "What types of captions can I generate?", answer: "You can generate captions for personal updates, business announcements, promotional content, inspirational posts, funny content, questions, quotes, and much more." },
  { question: "How accurate is the posting time analyzer?", answer: "Our posting time recommendations are based on extensive research and general best practices. However, we recommend testing different times with your specific audience for optimal results." },
  { question: "Can I use these tools for business pages?", answer: "Yes, our tools work great for both personal profiles and business pages. We have professional templates specifically designed for business and marketing content." }
];

const FacebookToolsPage = () => {
  const facebookCategory = toolCategories.find(cat => cat.id === "facebook-tools");
  const tools = facebookCategory?.tools || [];

  return (
    <>
      <Helmet>
        <title>Free Facebook Tools - Caption Generator, Bio Maker, Hashtags & More | MultiTools</title>
        <meta name="description" content="Free online Facebook tools: caption generator, bio generator, hashtag generator, engagement calculator, ad copy generator, and 15+ more tools. No signup required." />
        <link rel="canonical" href="https://multitools.app/facebook-tools" />
        <meta property="og:title" content="Free Facebook Tools - Caption Generator, Bio Maker, Hashtags & More" />
        <meta property="og:description" content="Complete Facebook toolkit: generate captions, bios, hashtags, calculate engagement, create ad copy, and optimize your social presence with 15+ free tools." />
        <meta property="og:type" content="website" />
        <meta name="keywords" content="facebook tools, facebook caption generator, facebook bio generator, facebook hashtag generator, engagement calculator, facebook ad copy, social media tools, free facebook tools" />
      </Helmet>
      
      <div className="min-h-screen bg-background">
        <Header />
        
        <main className="container mx-auto px-4 py-8">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 mb-4">
              <Globe className="w-4 h-4 text-blue-500" />
              <span className="text-sm font-medium text-blue-500">15+ Free Facebook Tools</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Free Facebook Tools
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Generate engaging captions, create professional bios, find trending hashtags, calculate engagement rates, and optimize your Facebook presence with our comprehensive toolkit.
            </p>
          </div>

          {/* Universal Tool */}
          <div className="mb-12">
            <UniversalFacebookTools />
          </div>

          {/* Article Section */}
          <article className="bg-card border border-border rounded-xl p-6 md:p-8 mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-6">About Our Facebook Tools</h2>
            <div className="prose prose-lg max-w-none text-muted-foreground space-y-4">
              <p>
                Facebook remains one of the most powerful social media platforms with over 2.9 billion monthly active users worldwide. Whether you're a business owner, influencer, marketer, or casual user, creating engaging content consistently can be challenging. Our free Facebook tools are designed to help you overcome these challenges and maximize your social media presence.
              </p>
              <p>
                The art of writing perfect captions, bios, and ad copy requires understanding what resonates with your audience. Our Caption Generator uses proven engagement formulas to create scroll-stopping text that drives likes, comments, and shares. From casual personal updates to professional business announcements, our tool adapts to your specific needs.
              </p>
              <p>
                Your Facebook bio is often the first impression people have of you or your brand. With limited characters to make an impact, every word counts. Our Bio Generator creates professional, catchy, and memorable descriptions that capture who you are or what your business offers. Whether you want something funny, professional, inspiring, or unique, we help you express your personality in just a few words.
              </p>
              <p>
                Hashtags are crucial for expanding your reach beyond your existing followers. Our Hashtag Generator helps you find trending and relevant hashtags that can significantly increase your post visibility. Combined with our Posting Time Analyzer, you can ensure your content reaches the maximum audience at the optimal time.
              </p>
              <p>
                For businesses and marketers, our Ad Copy Generator and Ad Headline Generator help create high-converting advertising content. These tools understand the psychology of persuasion and generate compelling copy that drives clicks and conversions. Pair them with our CTA Generator to create irresistible calls-to-action that guide users toward your desired outcome.
              </p>
              <p>
                Understanding your performance is key to improving your Facebook strategy. Our Engagement Rate Calculator helps you measure how well your content resonates with your audience. By tracking likes, comments, shares, and reach, you can identify what works and refine your approach for better results.
              </p>
            </div>
          </article>

          {/* All Tools Grid */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-foreground mb-6 text-center">All Facebook Tools</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
              {tools.map((tool) => {
                const IconComponent = toolIcons[tool.slug] || MessageSquare;
                return (
                  <Link
                    key={tool.id}
                    to={`/${tool.slug}`}
                    className="p-4 bg-card border border-border rounded-xl hover:border-blue-500/50 hover:shadow-lg hover:shadow-blue-500/10 transition-all group"
                  >
                    <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center mb-3 group-hover:bg-blue-500/20 transition-colors">
                      <IconComponent className="w-5 h-5 text-blue-500" />
                    </div>
                    <h3 className="font-medium text-foreground group-hover:text-blue-500 transition-colors text-sm mb-1">
                      {tool.name.replace('Facebook ', '')}
                    </h3>
                    <p className="text-xs text-muted-foreground line-clamp-2">
                      {tool.description}
                    </p>
                  </Link>
                );
              })}
            </div>
          </div>

          {/* How to Use Section */}
          <div className="bg-card border border-border rounded-xl p-6 md:p-8 mb-12">
            <h2 className="text-2xl font-bold text-foreground mb-6">How to Use Our Facebook Tools</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold">1</div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">Choose Your Tool</h3>
                  <p className="text-sm text-muted-foreground">Select the tool you need from our comprehensive collection above.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold">2</div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">Enter Your Details</h3>
                  <p className="text-sm text-muted-foreground">Provide any relevant context, topic, or data for better results.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold">3</div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">Generate Content</h3>
                  <p className="text-sm text-muted-foreground">Click the generate button to create your content instantly.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold">4</div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">Review & Customize</h3>
                  <p className="text-sm text-muted-foreground">Review the output and personalize it to match your voice.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold">5</div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">Copy & Use</h3>
                  <p className="text-sm text-muted-foreground">Copy your content and paste it directly into Facebook.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold">6</div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">Track Results</h3>
                  <p className="text-sm text-muted-foreground">Use our engagement calculator to measure your success.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Why Use Our Tools */}
          <div className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 border border-blue-500/20 rounded-xl p-6 md:p-8 mb-12">
            <h2 className="text-2xl font-bold text-foreground mb-6 text-center">Why Use Our Facebook Tools?</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="w-14 h-14 bg-blue-500/20 rounded-xl flex items-center justify-center mx-auto mb-3">
                  <Zap className="w-7 h-7 text-blue-500" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">100% Free</h3>
                <p className="text-sm text-muted-foreground">All tools are completely free with no hidden charges, subscriptions, or premium tiers.</p>
              </div>
              <div className="text-center">
                <div className="w-14 h-14 bg-green-500/20 rounded-xl flex items-center justify-center mx-auto mb-3">
                  <TrendingUp className="w-7 h-7 text-green-500" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">Instant Results</h3>
                <p className="text-sm text-muted-foreground">Get results immediately without waiting. All processing happens in real-time.</p>
              </div>
              <div className="text-center">
                <div className="w-14 h-14 bg-purple-500/20 rounded-xl flex items-center justify-center mx-auto mb-3">
                  <Shield className="w-7 h-7 text-purple-500" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">100% Secure</h3>
                <p className="text-sm text-muted-foreground">Your data is never stored or shared. Everything processes in your browser.</p>
              </div>
              <div className="text-center">
                <div className="w-14 h-14 bg-orange-500/20 rounded-xl flex items-center justify-center mx-auto mb-3">
                  <Users className="w-7 h-7 text-orange-500" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">No Signup</h3>
                <p className="text-sm text-muted-foreground">Use all tools instantly without creating an account or signing in.</p>
              </div>
            </div>
          </div>

          {/* Who Can Use */}
          <div className="bg-card border border-border rounded-xl p-6 md:p-8 mb-12">
            <h2 className="text-2xl font-bold text-foreground mb-6">Who Can Use These Tools?</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                { title: "Social Media Managers", desc: "Create and schedule engaging content for multiple client accounts." },
                { title: "Small Business Owners", desc: "Promote your business with professional captions and ad copy." },
                { title: "Influencers & Creators", desc: "Maintain consistent posting with fresh, engaging content ideas." },
                { title: "Marketing Professionals", desc: "Generate high-converting ad copy and track engagement metrics." },
                { title: "Digital Agencies", desc: "Scale content creation for multiple brands and campaigns." },
                { title: "Personal Brand Builders", desc: "Craft the perfect bio and captions to grow your following." }
              ].map((item, index) => (
                <div key={index} className="flex items-start gap-3 p-4 bg-secondary/50 rounded-lg">
                  <CheckCircle className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-foreground">{item.title}</h3>
                    <p className="text-sm text-muted-foreground">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Privacy Section */}
          <div className="bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/20 rounded-xl p-6 md:p-8 mb-12">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-green-500/20 flex items-center justify-center flex-shrink-0">
                <Shield className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-green-700 dark:text-green-400 mb-2">Privacy & Security</h2>
                <p className="text-muted-foreground leading-relaxed">
                  We take your privacy seriously. Our Facebook tools do not store any data you enter, including topics, generated content, or engagement metrics. All processing happens in real-time in your browser, and nothing is retained after you leave the page. We never ask for your Facebook login credentials, and we have no access to your account. Your information remains completely private and secure at all times.
                </p>
              </div>
            </div>
          </div>

          {/* FAQ Section */}
          <div className="bg-card border border-border rounded-xl p-6 md:p-8 mb-12">
            <h2 className="text-2xl font-bold text-foreground mb-6">Frequently Asked Questions</h2>
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`faq-${index}`}>
                  <AccordionTrigger className="text-left font-medium hover:no-underline">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>

          {/* Conclusion */}
          <div className="bg-card border border-border rounded-xl p-6 md:p-8 mb-12">
            <h2 className="text-2xl font-bold text-foreground mb-4">Start Growing Your Facebook Presence Today</h2>
            <p className="text-muted-foreground leading-relaxed">
              Our comprehensive suite of Facebook tools is designed to help you create better content, engage your audience more effectively, and grow your presence on the world's largest social network. Whether you need the perfect caption, a professional bio, trending hashtags, or high-converting ad copy, our free tools deliver instant results without any signup or payment required. Stop struggling with blank screens and start creating content that resonates with your audience. Try our Facebook tools now and experience the difference they can make for your social media strategy.
            </p>
          </div>
        </main>
        
        <Footer />
      </div>
    </>
  );
};

export default FacebookToolsPage;
