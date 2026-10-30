import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { financeCalcs } from "@/lib/financeCalculators";

const FinanceCalculatorsPage = () => {
  const cats = [...new Set(financeCalcs.map((c) => c.category))];
  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Indian Finance Calculators – SIP, EMI, Tax, GST | Convert</title>
        <meta name="description" content="Free Indian finance calculators: SIP, EMI, income tax, GST, FD, PPF, salary and more with instant results." />
      </Helmet>
      <Header />
      <main className="w-full px-4 sm:px-6 lg:px-10 py-8">
        <h1 className="text-3xl font-bold text-foreground mb-6">Indian Finance Calculators</h1>
        {cats.map((cat) => (
          <section key={cat} className="mb-8">
            <h2 className="text-xl font-semibold text-foreground mb-3">{cat}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {financeCalcs.filter((c) => c.category === cat).map((c) => (
                <Link key={c.slug} to={`/${c.slug}`} className="rounded-xl border border-border bg-card p-4 hover:border-primary transition-colors">
                  <div className="font-semibold text-foreground">{c.name}</div>
                  <div className="text-sm text-muted-foreground">{c.desc}</div>
                </Link>
              ))}
            </div>
          </section>
        ))}
      </main>
      <Footer />
    </div>
  );
};
export default FinanceCalculatorsPage;
