import { Helmet } from "react-helmet-async";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import UniversalImageCombine from "@/components/UniversalImageCombine";
import { getCategoryBySlug, toolCategories } from "@/data/toolsData";
import { Link } from "react-router-dom";

const ImageCombinePage = () => {
  const category = getCategoryBySlug("image-combine")!;
  const otherCategories = toolCategories.filter(cat => cat.id !== category.id && cat.id !== "tag-tools").slice(0, 6);

  return (
    <>
      <Helmet>
        <title>Image Combine - Merge, Collage, Stitch Images | Free Online</title>
        <meta name="description" content="Free online image combining tools. Merge images horizontally or vertically, create collages." />
      </Helmet>
      <div className="min-h-screen bg-background flex flex-col">
        <Header />
        <main className="flex-1">
          <section className="py-8 md:py-12 bg-gradient-hero relative overflow-hidden">
            <div className="container mx-auto px-4 relative z-10">
              <div className="text-center max-w-3xl mx-auto mb-8">
                <h1 className="text-3xl md:text-5xl font-bold mb-4">{category.name}</h1>
                <p className="text-lg text-muted-foreground">{category.description}</p>
              </div>
              <div className="max-w-4xl mx-auto"><UniversalImageCombine /></div>
            </div>
          </section>
          <section className="py-12 px-4">
            <div className="container mx-auto max-w-5xl">
              <h2 className="text-2xl font-bold mb-6">Explore More Tools</h2>
              <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
                {otherCategories.map((cat) => (
                  <Link key={cat.id} to={`/${cat.slug}`} className="bg-card rounded-xl p-4 border border-border hover:border-primary/50 transition-colors">
                    <h3 className="font-semibold">{cat.name}</h3>
                    <p className="text-sm text-muted-foreground mt-1">{cat.description}</p>
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

export default ImageCombinePage;
