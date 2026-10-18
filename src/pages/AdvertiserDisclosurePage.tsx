import { Helmet } from "react-helmet-async";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HreflangTags from "@/components/HreflangTags";
import { Link } from "react-router-dom";
import { DollarSign, CheckCircle, Info, Shield, ExternalLink } from "lucide-react";

const AdvertiserDisclosurePage = () => {
  return (
    <>
      <Helmet>
        <title>Advertiser Disclosure - Convert | Advertising & Monetization Policy</title>
        <meta name="description" content="Learn how Convert generates revenue through advertising. Transparent disclosure about Google AdSense, affiliate relationships, and how ads support our free tools." />
        <meta name="keywords" content="advertiser disclosure, advertising policy, Google AdSense, free tools funding, monetization transparency" />
        <link rel="canonical" href="https://multitoolsa.com/advertiser-disclosure" />
        
        <meta property="og:title" content="Advertiser Disclosure - Convert" />
        <meta property="og:description" content="Transparency about how Convert generates revenue through advertising to keep our 100+ tools free for everyone." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://multitoolsa.com/advertiser-disclosure" />
      </Helmet>
      <HreflangTags path="/advertiser-disclosure" />

      <div className="min-h-screen bg-background flex flex-col">
        <Header />
        
        <main className="flex-1 container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/30 mb-6">
                <DollarSign className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium text-primary">Transparency Notice</span>
              </div>
              <h1 className="text-3xl md:text-5xl font-bold mb-4">Advertiser Disclosure</h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                We believe in complete transparency about how Convert generates revenue 
                to keep our 100+ image tools free for everyone.
              </p>
            </div>

            <div className="bg-card rounded-xl p-8 shadow-lg border border-border space-y-8">
              
              <div className="border-b border-border pb-4">
                <p className="text-sm text-muted-foreground">Last updated: January 11, 2026</p>
              </div>

              <section>
                <h2 className="text-2xl font-bold text-foreground mb-4">How We Keep Convert Free</h2>
                <p className="text-muted-foreground mb-4">
                  Convert provides over 100 professional-grade image editing tools completely free of charge. 
                  We don't charge subscription fees, we don't require account registration, and we don't limit 
                  how many images you can process. To sustain this service and continue developing new tools, 
                  we generate revenue through advertising.
                </p>
                <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <Info className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                    <p className="text-muted-foreground text-sm">
                      <strong className="text-foreground">Our Promise:</strong> Advertising revenue allows us to keep all 
                      tools free while maintaining our commitment to privacy—your images are never uploaded, shared, 
                      or used for any advertising purposes.
                    </p>
                  </div>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-foreground mb-4">Google AdSense</h2>
                <p className="text-muted-foreground mb-4">
                  Convert displays advertisements provided by Google AdSense, a third-party advertising service 
                  operated by Google LLC. These advertisements help fund the development, hosting, and maintenance 
                  of our free tools.
                </p>
                
                <h3 className="text-xl font-semibold text-foreground mb-3">How Google AdSense Works</h3>
                <ul className="space-y-3 text-muted-foreground mb-4">
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span>Google serves ads based on content relevance and your browsing interests</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span>Ads may use cookies to personalize content (you can opt out of personalized ads)</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span>We earn revenue when users view or click on advertisements</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span>Ads are clearly distinguishable from our content and tools</span>
                  </li>
                </ul>
                
                <h3 className="text-xl font-semibold text-foreground mb-3">Opting Out of Personalized Ads</h3>
                <p className="text-muted-foreground mb-3">
                  You can control how Google uses your information for advertising purposes:
                </p>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex items-center gap-2">
                    <ExternalLink className="w-4 h-4" />
                    <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                      Google Ads Settings
                    </a> - Control your ad personalization preferences
                  </li>
                  <li className="flex items-center gap-2">
                    <ExternalLink className="w-4 h-4" />
                    <a href="https://optout.aboutads.info/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                      Digital Advertising Alliance
                    </a> - Opt out of interest-based advertising
                  </li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-foreground mb-4">Our Advertising Policies</h2>
                <p className="text-muted-foreground mb-4">
                  We follow strict guidelines to ensure advertising enhances rather than detracts from your experience:
                </p>
                
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="bg-secondary/30 rounded-lg p-4">
                    <h3 className="font-semibold text-foreground mb-2">Clear Separation</h3>
                    <p className="text-sm text-muted-foreground">
                      Advertisements are clearly marked and separated from tool interfaces. 
                      Ads never appear within tool upload areas, buttons, or output sections.
                    </p>
                  </div>
                  <div className="bg-secondary/30 rounded-lg p-4">
                    <h3 className="font-semibold text-foreground mb-2">User Experience First</h3>
                    <p className="text-sm text-muted-foreground">
                      We limit the number and placement of ads to avoid disrupting your workflow. 
                      Tool functionality is never compromised for advertising.
                    </p>
                  </div>
                  <div className="bg-secondary/30 rounded-lg p-4">
                    <h3 className="font-semibold text-foreground mb-2">No Deceptive Ads</h3>
                    <p className="text-sm text-muted-foreground">
                      We don't allow ads that mimic download buttons or interface elements. 
                      The actual download buttons for your processed images are always clear.
                    </p>
                  </div>
                  <div className="bg-secondary/30 rounded-lg p-4">
                    <h3 className="font-semibold text-foreground mb-2">Content Guidelines</h3>
                    <p className="text-sm text-muted-foreground">
                      We work with Google to filter inappropriate ad content. 
                      Report any concerning ads to us and we'll take action.
                    </p>
                  </div>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-foreground mb-4">What We Don't Do</h2>
                <p className="text-muted-foreground mb-4">
                  To maintain your trust, here's what we explicitly don't do with advertising:
                </p>
                <ul className="space-y-3 text-muted-foreground">
                  <li className="flex items-start gap-3">
                    <Shield className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <span><strong>Your images are never used for advertising.</strong> Your files are processed locally and never accessible to us or advertisers.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Shield className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <span><strong>No sponsored tool results.</strong> All tool outputs are based solely on your settings—never influenced by advertisers.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Shield className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <span><strong>No hidden advertising.</strong> All ads are clearly marked. We don't disguise promotional content as editorial.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Shield className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <span><strong>No selling of user data.</strong> We don't sell, share, or monetize your personal information or usage patterns.</span>
                  </li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-foreground mb-4">Future Revenue Considerations</h2>
                <p className="text-muted-foreground mb-4">
                  While advertising currently sustains Convert, we may explore additional revenue streams in the future. 
                  These might include:
                </p>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground mb-4">
                  <li>Optional premium features (core tools will always remain free)</li>
                  <li>API access for developers</li>
                  <li>Enterprise solutions for businesses</li>
                </ul>
                <p className="text-muted-foreground">
                  We commit to updating this disclosure whenever our monetization approach changes significantly.
                </p>
              </section>

              <section className="border-t border-border pt-6">
                <h2 className="text-2xl font-bold text-foreground mb-4">Questions or Concerns</h2>
                <p className="text-muted-foreground mb-4">
                  If you have questions about our advertising practices or want to report an inappropriate ad, please contact us:
                </p>
                <div className="flex flex-wrap gap-4">
                  <Link 
                    to="/contact" 
                    className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
                  >
                    Contact Us
                  </Link>
                  <Link 
                    to="/privacy" 
                    className="inline-flex items-center gap-2 px-4 py-2 bg-secondary text-secondary-foreground rounded-lg hover:bg-secondary/80 transition-colors"
                  >
                    Privacy Policy
                  </Link>
                </div>
              </section>

            </div>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default AdvertiserDisclosurePage;
