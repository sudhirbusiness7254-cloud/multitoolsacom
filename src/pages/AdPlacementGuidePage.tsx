import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Helmet } from "react-helmet-async";
import { CheckCircle, XCircle, AlertTriangle, Monitor, Smartphone, Info } from "lucide-react";
import HreflangTags from "@/components/HreflangTags";

const AdPlacementGuidePage = () => {
  return (
    <>
      <Helmet>
        <title>Ad Placement Guidelines - Convert</title>
        <meta name="description" content="Guidelines for advertisement placement on Convert. Learn about safe ad zones, prohibited areas, and best practices for ad integration." />
        <meta name="robots" content="noindex" />
        <link rel="canonical" href="https://multitoolsa.com/ad-placement-guide" />
      </Helmet>
      <HreflangTags path="/ad-placement-guide" />

      <div className="min-h-screen bg-background flex flex-col">
        <Header />
        
        <main className="flex-1 py-12 px-4 sm:px-6">
          <div className="container mx-auto max-w-4xl">
            <div className="text-center mb-12">
              <h1 className="text-3xl sm:text-4xl font-bold mb-4">Ad Placement Guidelines</h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Internal documentation for Google AdSense compliant ad placement. 
                These guidelines ensure ads enhance rather than disrupt user experience.
              </p>
            </div>

            {/* Safe Zones */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <CheckCircle className="w-6 h-6 text-green-500" />
                Safe Ad Zones
              </h2>
              
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-5">
                  <h3 className="font-semibold text-green-600 dark:text-green-400 mb-3">Header Area</h3>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>• Below main navigation, before content</li>
                    <li>• Leaderboard format (728x90 desktop)</li>
                    <li>• Mobile banner (320x100) on smaller screens</li>
                    <li>• Minimum 20px spacing from nav elements</li>
                  </ul>
                </div>
                
                <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-5">
                  <h3 className="font-semibold text-green-600 dark:text-green-400 mb-3">Sidebar (Desktop Only)</h3>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>• Right sidebar on wide screens (1200px+)</li>
                    <li>• Medium Rectangle (300x250)</li>
                    <li>• Sticky behavior allowed with 100px top offset</li>
                    <li>• Hide on tablet and mobile</li>
                  </ul>
                </div>
                
                <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-5">
                  <h3 className="font-semibold text-green-600 dark:text-green-400 mb-3">In-Content (Articles/Blog)</h3>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>• After 2-3 paragraphs of text content</li>
                    <li>• In-article format recommended</li>
                    <li>• Maximum 1 ad per 500 words of content</li>
                    <li>• Clear separation with margins (40px+ above/below)</li>
                  </ul>
                </div>
                
                <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-5">
                  <h3 className="font-semibold text-green-600 dark:text-green-400 mb-3">Footer Area</h3>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>• Above footer links section</li>
                    <li>• After main content ends</li>
                    <li>• Leaderboard or large mobile banner</li>
                    <li>• Minimum 40px spacing from content above</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Prohibited Zones */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <XCircle className="w-6 h-6 text-red-500" />
                Prohibited Ad Zones
              </h2>
              
              <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-6">
                <p className="text-sm text-muted-foreground mb-4">
                  Never place ads in these areas - doing so violates Google AdSense policies and creates poor user experience:
                </p>
                
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <h3 className="font-semibold text-red-600 dark:text-red-400 mb-2">Tool Interface Areas</h3>
                    <ul className="space-y-1 text-sm text-muted-foreground">
                      <li>✗ Inside upload/drop zones</li>
                      <li>✗ Near upload buttons</li>
                      <li>✗ Between tool controls and preview</li>
                      <li>✗ Adjacent to download buttons</li>
                      <li>✗ Within image preview areas</li>
                      <li>✗ Inside settings/options panels</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold text-red-600 dark:text-red-400 mb-2">Interactive Elements</h3>
                    <ul className="space-y-1 text-sm text-muted-foreground">
                      <li>✗ Within modals or dialogs</li>
                      <li>✗ Near form submit buttons</li>
                      <li>✗ Inside navigation menus</li>
                      <li>✗ Covering any functional UI</li>
                      <li>✗ As pop-ups or overlays</li>
                      <li>✗ Before page fully loads</li>
                    </ul>
                  </div>
                </div>
              </div>
            </section>

            {/* Warning Zones */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <AlertTriangle className="w-6 h-6 text-yellow-500" />
                Caution Zones
              </h2>
              
              <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-xl p-6">
                <p className="text-sm text-muted-foreground mb-4">
                  These areas require careful consideration. Ads may be allowed but need proper implementation:
                </p>
                
                <ul className="space-y-3 text-sm">
                  <li className="flex items-start gap-2">
                    <AlertTriangle className="w-4 h-4 text-yellow-500 mt-0.5 flex-shrink-0" />
                    <span className="text-muted-foreground">
                      <strong>Tool pages below the fold:</strong> Only after user has scrolled past the main tool interface. Ensure 100px+ spacing.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <AlertTriangle className="w-4 h-4 text-yellow-500 mt-0.5 flex-shrink-0" />
                    <span className="text-muted-foreground">
                      <strong>Category pages:</strong> Between tool listings is acceptable, but not more than 1 ad per 6 tools shown.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <AlertTriangle className="w-4 h-4 text-yellow-500 mt-0.5 flex-shrink-0" />
                    <span className="text-muted-foreground">
                      <strong>Mobile screens:</strong> Anchor/sticky ads at bottom are allowed, but must not cover more than 30% of viewport height.
                    </span>
                  </li>
                </ul>
              </div>
            </section>

            {/* Device-Specific Guidelines */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-6">Device-Specific Guidelines</h2>
              
              <div className="grid sm:grid-cols-2 gap-6">
                <div className="bg-card border border-border rounded-xl p-5">
                  <div className="flex items-center gap-2 mb-4">
                    <Monitor className="w-5 h-5 text-primary" />
                    <h3 className="font-semibold">Desktop (1024px+)</h3>
                  </div>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>• Maximum 3 ad units per page</li>
                    <li>• Sidebar ads allowed (sticky with offset)</li>
                    <li>• Leaderboard in header/footer zones</li>
                    <li>• In-content ads for articles 1000+ words</li>
                  </ul>
                </div>
                
                <div className="bg-card border border-border rounded-xl p-5">
                  <div className="flex items-center gap-2 mb-4">
                    <Smartphone className="w-5 h-5 text-primary" />
                    <h3 className="font-semibold">Mobile (&lt;768px)</h3>
                  </div>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>• Maximum 2 ad units per page</li>
                    <li>• No sidebar ads</li>
                    <li>• Mobile banner in header zone only</li>
                    <li>• Anchor ads allowed (bottom only)</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Implementation Notes */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <Info className="w-6 h-6 text-blue-500" />
                Implementation Notes
              </h2>
              
              <div className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-6">
                <ul className="space-y-3 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 flex-shrink-0"></span>
                    <span>
                      <strong>Lazy Loading:</strong> All ads should use lazy loading to avoid affecting initial page load performance.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 flex-shrink-0"></span>
                    <span>
                      <strong>Responsive Units:</strong> Use responsive ad units that adapt to container width. Avoid fixed-size units on tool pages.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 flex-shrink-0"></span>
                    <span>
                      <strong>Content Ratio:</strong> Ensure ad space never exceeds 30% of visible content area. More content = more ad units allowed.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 flex-shrink-0"></span>
                    <span>
                      <strong>Loading States:</strong> Show skeleton placeholders for ad slots to prevent layout shift during loading.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 flex-shrink-0"></span>
                    <span>
                      <strong>Ad Labels:</strong> Consider adding small "Advertisement" labels above ad units for transparency.
                    </span>
                  </li>
                </ul>
              </div>
            </section>

            {/* Checklist */}
            <section>
              <h2 className="text-2xl font-bold mb-6">Pre-AdSense Application Checklist</h2>
              
              <div className="bg-card border border-border rounded-xl p-6">
                <ul className="space-y-3">
                  {[
                    "All tool pages have substantial educational content (FAQs, how-to guides, use cases)",
                    "Blog has 10+ original articles with 800+ words each",
                    "About page explains company mission and expertise",
                    "Privacy Policy is complete and accessible",
                    "Terms of Service are in place",
                    "Contact page provides real contact methods",
                    "No duplicate or thin content pages",
                    "Site navigation is clear and intuitive",
                    "Mobile experience is fully functional",
                    "Site has been live for 30+ days with regular traffic",
                    "Ad placement zones are clearly defined and compliant",
                    "How Tools Work page explains technology transparently",
                  ].map((item, index) => (
                    <li key={index} className="flex items-start gap-3 text-sm">
                      <div className="w-5 h-5 border-2 border-muted-foreground/30 rounded flex-shrink-0 mt-0.5"></div>
                      <span className="text-muted-foreground">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </section>
          </div>
        </main>
        
        <Footer />
      </div>
    </>
  );
};

export default AdPlacementGuidePage;
