import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { financeCalcs } from "@/lib/financeCalculators";
import {
  TrendingUp, TrendingDown, ArrowUpRight, Coins, Wallet, Target, LineChart, CalendarClock, Flame,
  Receipt, Scale, Percent, Undo2, FileMinus, Home, BarChart3, CalendarCheck, Banknote, BadgePercent,
  Landmark, Repeat, PiggyBank, Briefcase, Umbrella, Gift, Building2, User, Car, FastForward, BadgeCheck,
  KeyRound, PieChart, Tag, Crosshair, ShoppingBag, ShieldCheck, Gem, CreditCard, Goal, ArrowRight, LucideIcon,
} from "lucide-react";

const icons: Record<string, LucideIcon> = {
  "sip-calculator": TrendingUp, "step-up-sip-calculator": ArrowUpRight, "lumpsum-calculator": Coins,
  "swp-calculator": Wallet, "sip-goal-calculator": Target, "cagr-calculator": LineChart,
  "xirr-calculator": CalendarClock, "inflation-calculator": Flame,
  "income-tax-calculator": Receipt, "tax-regime-comparison": Scale, "gst-calculator": Percent,
  "gst-reverse-calculator": Undo2, "tds-calculator": FileMinus, "hra-exemption-calculator": Home,
  "capital-gains-tax-calculator": BarChart3, "advance-tax-calculator": CalendarCheck,
  "salary-calculator-india": Banknote, "salary-hike-calculator": BadgePercent, "fd-calculator": Landmark,
  "rd-calculator": Repeat, "ppf-calculator": PiggyBank, "epf-calculator": Briefcase,
  "nps-calculator": Umbrella, "gratuity-calculator": Gift,
  "home-loan-emi-calculator": Building2, "personal-loan-emi-calculator": User, "car-loan-emi-calculator": Car,
  "loan-prepayment-calculator": FastForward, "home-loan-eligibility-calculator": BadgeCheck,
  "rent-vs-buy-calculator": KeyRound,
  "profit-margin-calculator": PieChart, "markup-calculator": Tag, "break-even-calculator": Crosshair,
  "discount-calculator": ShoppingBag, "emergency-fund-calculator": ShieldCheck, "net-worth-calculator": Gem,
  "debt-payoff-calculator": CreditCard, "savings-goal-calculator": Goal,
};

// Brand-style gradient palette, matching the site's existing colorful category icons
const gradients = [
  ["#3B82F6", "#06B6D4"], ["#22C55E", "#10B981"], ["#F97316", "#EAB308"], ["#A855F7", "#EC4899"],
  ["#EF4444", "#F97316"], ["#14B8A6", "#0EA5E9"], ["#6366F1", "#8B5CF6"], ["#F43F5E", "#E879F9"],
];
const catColor: Record<string, string> = {
  Investment: "#16A34A", "Income Tax & GST": "#DC2626", "Salary & Savings": "#2563EB",
  "Loan & EMI": "#EA580C", "Business & Personal Finance": "#9333EA",
};

const FinanceCalculatorsPage = () => {
  const cats = [...new Set(financeCalcs.map((c) => c.category))];
  let idx = 0;
  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Indian Finance Calculators – SIP, EMI, Tax, GST | Convert</title>
        <meta name="description" content="Free Indian finance calculators: SIP, EMI, income tax, GST, FD, PPF, salary and more with instant results." />
      </Helmet>
      <Header />
      <main className="w-full px-4 sm:px-6 lg:px-10 py-8">
        <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-2">Indian Finance Calculators</h1>
        <p className="text-muted-foreground mb-8">{financeCalcs.length} free calculators with instant results.</p>
        {cats.map((cat) => (
          <section key={cat} className="mb-10">
            <h2 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
              <span className="w-2 h-6 rounded-full" style={{ background: catColor[cat] }} />{cat}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {financeCalcs.filter((c) => c.category === cat).map((c) => {
                const Icon = icons[c.slug] ?? Coins;
                const [from, to] = gradients[idx++ % gradients.length];
                return (
                  <Link key={c.slug} to={`/${c.slug}`} className="group rounded-2xl border border-border bg-card p-5 hover:shadow-lg hover:-translate-y-0.5 hover:border-primary/50 transition-all">
                    <div className="w-14 h-14 rounded-xl flex items-center justify-center mb-4 shadow-md" style={{ background: `linear-gradient(135deg, ${from}, ${to})` }}>
                      <Icon className="w-7 h-7 text-primary-foreground" />
                    </div>
                    <div className="font-semibold text-lg text-foreground mb-1">{c.name}</div>
                    <div className="text-sm text-muted-foreground mb-4">{c.desc}</div>
                    <span className="text-sm text-primary font-medium inline-flex items-center gap-1">Calculate now <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" /></span>
                  </Link>
                );
              })}
            </div>
          </section>
        ))}
      </main>
      <Footer />
    </div>
  );
};
export default FinanceCalculatorsPage;
