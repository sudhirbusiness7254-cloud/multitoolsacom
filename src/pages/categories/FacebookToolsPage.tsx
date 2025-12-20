import { Helmet } from "react-helmet-async";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import UniversalFacebookTools from "@/components/facebook/UniversalFacebookTools";
import { Link } from "react-router-dom";
import { toolCategories } from "@/data/toolsData";

const FacebookToolsPage = () => {
  const facebookCategory = toolCategories.find(cat => cat.id === "facebook-tools");
  const tools = facebookCategory?.tools || [];

  return (
    <>
      <Helmet>
        <title>Free Facebook Tools - Downloaders, Generators & Calculators | MultiTools</title>
        <meta name="description" content="Free online Facebook tools: story downloader, profile picture downloader, caption generator, bio generator, hashtag generator, engagement calculator, and more." />
        <link rel="canonical" href="https://multitools.app/facebook-tools" />
        <meta property="og:title" content="Free Facebook Tools - Downloaders, Generators & Calculators" />
        <meta property="og:description" content="All-in-one Facebook toolkit: download stories, profile pictures, generate captions, bios, hashtags, calculate engagement, and optimize your social presence." />
        <meta property="og:type" content="website" />
      </Helmet>
      
      <div className="min-h-screen bg-background">
        <Header />
        
        <main className="container mx-auto px-4 py-8">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Free Facebook Tools
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Download Facebook content, generate engaging captions, optimize your posts, and grow your presence with our comprehensive Facebook toolkit.
            </p>
          </div>

          {/* Universal Tool */}
          <div className="mb-12">
            <UniversalFacebookTools />
          </div>

          {/* All Tools Grid */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-foreground mb-6 text-center">All Facebook Tools</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {tools.map((tool) => (
                <Link
                  key={tool.id}
                  to={`/${tool.slug}`}
                  className="p-4 bg-card border border-border rounded-lg hover:border-primary hover:shadow-lg transition-all group"
                >
                  <h3 className="font-medium text-foreground group-hover:text-primary transition-colors text-sm">
                    {tool.name}
                  </h3>
                  <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                    {tool.description}
                  </p>
                </Link>
              ))}
            </div>
          </div>

          {/* Benefits */}
          <div className="bg-card border border-border rounded-xl p-8 mb-12">
            <h2 className="text-2xl font-bold text-foreground mb-6 text-center">Why Use Our Facebook Tools?</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-2xl">🚀</span>
                </div>
                <h3 className="font-semibold text-foreground mb-2">100% Free</h3>
                <p className="text-sm text-muted-foreground">All tools are completely free with no hidden charges or premium tiers.</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-2xl">⚡</span>
                </div>
                <h3 className="font-semibold text-foreground mb-2">Fast & Easy</h3>
                <p className="text-sm text-muted-foreground">Get results instantly with our user-friendly interface and quick processing.</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-2xl">🔒</span>
                </div>
                <h3 className="font-semibold text-foreground mb-2">Secure</h3>
                <p className="text-sm text-muted-foreground">Your data is never stored. Everything processes in your browser.</p>
              </div>
            </div>
          </div>
        </main>
        
        <Footer />
      </div>
    </>
  );
};

export default FacebookToolsPage;
