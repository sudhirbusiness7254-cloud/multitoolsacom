import { useMemo, useState } from "react";
import { Link, useParams, Navigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { financeCalcs, FinanceCalc, xirr } from "@/lib/financeCalculators";
import { Plus, Trash2 } from "lucide-react";

const XirrCalc = () => {
  const [rows, setRows] = useState([
    { date: "2022-01-01", amount: -100000 },
    { date: "2023-01-01", amount: -50000 },
    { date: "2025-01-01", amount: 200000 },
  ]);
  const r = useMemo(
    () => xirr(rows.filter((x) => x.date && x.amount).map((x) => ({ amount: x.amount, date: new Date(x.date) })).sort((a, b) => a.date.getTime() - b.date.getTime())),
    [rows]
  );
  const upd = (i: number, k: "date" | "amount", v: string) =>
    setRows((rs) => rs.map((x, j) => (j === i ? { ...x, [k]: k === "amount" ? Number(v) : v } : x)));
  return (
    <div className="grid lg:grid-cols-2 gap-6">
      <div className="space-y-3">
        <p className="text-sm text-muted-foreground">Investments as negative, withdrawals / current value as positive.</p>
        {rows.map((x, i) => (
          <div key={i} className="flex gap-2">
            <Input type="date" value={x.date} onChange={(e) => upd(i, "date", e.target.value)} aria-label="Date" />
            <Input type="number" value={x.amount} onChange={(e) => upd(i, "amount", e.target.value)} aria-label="Amount" />
            <Button variant="ghost" size="icon" aria-label="Remove row" onClick={() => setRows((rs) => rs.filter((_, j) => j !== i))}><Trash2 className="h-4 w-4" /></Button>
          </div>
        ))}
        <Button variant="outline" onClick={() => setRows((rs) => [...rs, { date: "", amount: 0 }])}><Plus className="h-4 w-4 mr-1" />Add cash flow</Button>
      </div>
      <div className="rounded-xl bg-primary/10 border border-primary/30 p-6 flex flex-col justify-center">
        <div className="text-sm text-muted-foreground">XIRR</div>
        <div className="text-4xl font-bold text-primary">{isFinite(r) ? r.toFixed(2) + "%" : "—"}</div>
      </div>
    </div>
  );
};

export const CalcWidget = ({ calc }: { calc: FinanceCalc }) => {
  const [vals, setVals] = useState<Record<string, number>>(() => Object.fromEntries(calc.fields.map((f) => [f.key, f.def])));
  if (calc.custom === "xirr") return <XirrCalc />;
  let results: ReturnType<NonNullable<FinanceCalc["compute"]>> = [];
  try { results = calc.compute!(vals); } catch { results = []; }
  return (
    <div className="grid lg:grid-cols-2 gap-6">
      <div className="space-y-4">
        {calc.fields.map((f) => (
          <label key={f.key} className="block">
            <span className="text-sm font-medium text-foreground">{f.label}</span>
            {f.type === "select" ? (
              <select className="mt-1 w-full h-10 rounded-md border border-input bg-background px-3 text-sm" value={vals[f.key]} onChange={(e) => setVals({ ...vals, [f.key]: Number(e.target.value) })}>
                {f.options.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
              </select>
            ) : (
              <div className="mt-1 flex items-center gap-2">
                <Input type="number" step={f.step ?? 1} min={0} value={Number.isNaN(vals[f.key]) ? "" : vals[f.key]} onChange={(e) => setVals({ ...vals, [f.key]: e.target.value === "" ? 0 : Number(e.target.value) })} />
                {f.suffix && <span className="text-sm text-muted-foreground w-14">{f.suffix}</span>}
              </div>
            )}
          </label>
        ))}
      </div>
      <div className="rounded-xl bg-muted/40 border border-border p-6 space-y-4">
        {results.map((r) => (
          <div key={r.label} className={r.highlight ? "rounded-lg bg-primary/10 border border-primary/30 p-4" : "flex justify-between border-b border-border pb-2"}>
            <span className={r.highlight ? "block text-sm text-muted-foreground" : "text-sm text-muted-foreground"}>{r.label}</span>
            <span className={r.highlight ? "block text-3xl font-bold text-primary" : "font-semibold text-foreground"}>{r.value}</span>
          </div>
        ))}
        <p className="text-xs text-muted-foreground">Estimates only, not financial or tax advice. Tax rules: FY 2025-26.</p>
      </div>
    </div>
  );
};

const FinanceCalculatorPage = ({ slug: propSlug }: { slug?: string }) => {
  const params = useParams();
  const slug = propSlug ?? params.slug;
  const calc = financeCalcs.find((c) => c.slug === slug);
  if (!calc) return <Navigate to="/finance-calculators" replace />;
  const related = financeCalcs.filter((c) => c.category === calc.category && c.slug !== calc.slug);
  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>{calc.name} – Free Online | Convert</title>
        <meta name="description" content={`${calc.name}: ${calc.desc} Free, instant results.`} />
        <link rel="canonical" href={`https://multitoolsacom.lovable.app/${calc.slug}`} />
      </Helmet>
      <Header />
      <main className="w-full px-4 sm:px-6 lg:px-10 py-8">
        <nav className="text-sm text-muted-foreground mb-3"><Link to="/finance-calculators" className="hover:text-primary">Finance Calculators</Link> / {calc.name}</nav>
        <h1 className="text-3xl font-bold text-foreground mb-1">{calc.name}</h1>
        <p className="text-muted-foreground mb-6">{calc.desc}</p>
        <div className="rounded-2xl border border-border bg-card p-4 sm:p-6"><CalcWidget key={calc.slug} calc={calc} /></div>
        {related.length > 0 && (
          <div className="mt-8 flex flex-wrap gap-2">
            {related.map((r) => <Link key={r.slug} to={`/${r.slug}`} className="px-3 py-1.5 rounded-full border border-border text-sm hover:border-primary hover:text-primary">{r.name}</Link>)}
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};
export default FinanceCalculatorPage;
