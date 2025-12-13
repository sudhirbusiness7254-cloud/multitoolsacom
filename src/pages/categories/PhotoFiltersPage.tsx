import { useState } from "react";
import { Helmet } from "react-helmet-async";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import UniversalPhotoFilters from "@/components/UniversalPhotoFilters";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { getCategoryBySlug, toolCategories } from "@/data/toolsData";
import { Link } from "react-router-dom";

const PhotoFiltersPage = () => {
  const category = getCategoryBySlug("photo-filters")!;
  const otherCategories = toolCategories.filter(cat => cat.id !== category.id && cat.id !== "tag-tools").slice(0, 6);

  const faqs = [
    { question: "Can I apply multiple filters?", answer: "Yes, download your filtered image and upload again to apply additional filters." },
    { question: "Will filters reduce quality?", answer: "Our filters process at full resolution without additional compression." },
  ];

  return (
    <>
      <Helmet>
        <title>Photo Filters & Effects - Free Online Photo Editor</title>
        <meta name="description" content="Free online photo filters. Adjust brightness, contrast, apply sepia, vintage, blur effects and more." />
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
              <div className="max-w-4xl mx-auto">
                <UniversalPhotoFilters />
              </div>
            </div>
          </section>
          <section className="py-12 px-4 bg-gradient-dark">
            <div className="container mx-auto max-w-4xl">
              <h2 className="text-2xl font-bold mb-6">FAQs</h2>
              <Accordion type="single" collapsible className="space-y-2">
                {faqs.map((faq, i) => (
                  <AccordionItem key={i} value={`faq-${i}`} className="bg-card border border-border rounded-xl px-4">
                    <AccordionTrigger>{faq.question}</AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">{faq.answer}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
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

export default PhotoFiltersPage;
