// Config-driven Indian finance calculators. Each calculator computes results live from its inputs.
export type Field =
  | { key: string; label: string; def: number; suffix?: string; step?: number; type?: "number" }
  | { key: string; label: string; def: number; type: "select"; options: { label: string; value: number }[] };

export interface Result { label: string; value: string; highlight?: boolean }
export interface FinanceCalc {
  slug: string; name: string; desc: string; category: string;
  fields: Field[]; compute?: (v: Record<string, number>) => Result[]; custom?: "xirr";
}

export const inr = (n: number) =>
  isFinite(n) ? "₹" + Math.round(n).toLocaleString("en-IN") : "—";
const pct = (n: number) => (isFinite(n) ? n.toFixed(2) + "%" : "—");
const num = (n: number, d = 1) => (isFinite(n) ? n.toFixed(d) : "—");

const sipFV = (p: number, r: number, months: number) => {
  const i = r / 1200;
  return i === 0 ? p * months : p * ((Math.pow(1 + i, months) - 1) / i) * (1 + i);
};
const emi = (P: number, r: number, months: number) => {
  const i = r / 1200;
  return i === 0 ? P / months : (P * i * Math.pow(1 + i, months)) / (Math.pow(1 + i, months) - 1);
};
const slabTax = (income: number, slabs: [number, number][]) => {
  let tax = 0, prev = 0;
  for (const [limit, rate] of slabs) {
    if (income > prev) tax += (Math.min(income, limit) - prev) * rate;
    prev = limit;
  }
  return tax;
};
// FY 2025-26 (AY 2026-27) rules
export const newRegimeTax = (gross: number) => {
  const taxable = Math.max(0, gross - 75000);
  let tax = slabTax(taxable, [[400000, 0], [800000, 0.05], [1200000, 0.1], [1600000, 0.15], [2000000, 0.2], [2400000, 0.25], [Infinity, 0.3]]);
  if (taxable <= 1200000) tax = 0;
  return { taxable, tax: tax * 1.04 };
};
export const oldRegimeTax = (gross: number, deductions: number) => {
  const taxable = Math.max(0, gross - 50000 - deductions);
  let tax = slabTax(taxable, [[250000, 0], [500000, 0.05], [1000000, 0.2], [Infinity, 0.3]]);
  if (taxable <= 500000) tax = 0;
  return { taxable, tax: tax * 1.04 };
};

const loanFields = (amt: number, rate: number, yrs: number): Field[] => [
  { key: "p", label: "Loan amount", def: amt, suffix: "₹" },
  { key: "r", label: "Interest rate (p.a.)", def: rate, suffix: "%", step: 0.1 },
  { key: "y", label: "Tenure", def: yrs, suffix: "years" },
];
const loanCompute = (v: Record<string, number>): Result[] => {
  const e = emi(v.p, v.r, v.y * 12), total = e * v.y * 12;
  return [
    { label: "Monthly EMI", value: inr(e), highlight: true },
    { label: "Total interest", value: inr(total - v.p) },
    { label: "Total payment", value: inr(total) },
  ];
};

export const financeCalcs: FinanceCalc[] = [
  // Investment
  { slug: "sip-calculator", name: "SIP Calculator", category: "Investment", desc: "Future value of monthly mutual fund investments.",
    fields: [{ key: "p", label: "Monthly investment", def: 10000, suffix: "₹" }, { key: "r", label: "Expected return (p.a.)", def: 12, suffix: "%", step: 0.1 }, { key: "y", label: "Time period", def: 10, suffix: "years" }],
    compute: (v) => { const fv = sipFV(v.p, v.r, v.y * 12), inv = v.p * v.y * 12;
      return [{ label: "Maturity value", value: inr(fv), highlight: true }, { label: "Invested amount", value: inr(inv) }, { label: "Estimated returns", value: inr(fv - inv) }]; } },
  { slug: "step-up-sip-calculator", name: "Step-Up SIP Calculator", category: "Investment", desc: "Corpus when you raise your SIP every year.",
    fields: [{ key: "p", label: "Starting monthly SIP", def: 10000, suffix: "₹" }, { key: "s", label: "Annual step-up", def: 10, suffix: "%" }, { key: "r", label: "Expected return (p.a.)", def: 12, suffix: "%", step: 0.1 }, { key: "y", label: "Time period", def: 10, suffix: "years" }],
    compute: (v) => { const i = v.r / 1200; let bal = 0, inv = 0, sip = v.p;
      for (let m = 0; m < v.y * 12; m++) { if (m > 0 && m % 12 === 0) sip *= 1 + v.s / 100; bal = (bal + sip) * (1 + i); inv += sip; }
      return [{ label: "Maturity value", value: inr(bal), highlight: true }, { label: "Invested amount", value: inr(inv) }, { label: "Estimated returns", value: inr(bal - inv) }, { label: "Final monthly SIP", value: inr(sip) }]; } },
  { slug: "lumpsum-calculator", name: "Lumpsum Calculator", category: "Investment", desc: "Future value of a one-time investment.",
    fields: [{ key: "p", label: "Investment amount", def: 100000, suffix: "₹" }, { key: "r", label: "Expected return (p.a.)", def: 12, suffix: "%", step: 0.1 }, { key: "y", label: "Time period", def: 10, suffix: "years" }],
    compute: (v) => { const fv = v.p * Math.pow(1 + v.r / 100, v.y);
      return [{ label: "Maturity value", value: inr(fv), highlight: true }, { label: "Invested amount", value: inr(v.p) }, { label: "Estimated returns", value: inr(fv - v.p) }]; } },
  { slug: "swp-calculator", name: "SWP Calculator", category: "Investment", desc: "Monthly withdrawals and remaining balance.",
    fields: [{ key: "p", label: "Total investment", def: 1000000, suffix: "₹" }, { key: "w", label: "Monthly withdrawal", def: 8000, suffix: "₹" }, { key: "r", label: "Expected return (p.a.)", def: 8, suffix: "%", step: 0.1 }, { key: "y", label: "Time period", def: 10, suffix: "years" }],
    compute: (v) => { const i = v.r / 1200; let bal = v.p, withdrawn = 0, m = 0;
      for (; m < v.y * 12 && bal > 0; m++) { const w = Math.min(v.w, bal); bal -= w; withdrawn += w; bal *= 1 + i; }
      return [{ label: "Final balance", value: inr(bal), highlight: true }, { label: "Total withdrawn", value: inr(withdrawn) }, { label: "Months funded", value: String(m) }]; } },
  { slug: "sip-goal-calculator", name: "SIP Goal Calculator", category: "Investment", desc: "Monthly SIP needed to reach a goal.",
    fields: [{ key: "g", label: "Target amount", def: 5000000, suffix: "₹" }, { key: "r", label: "Expected return (p.a.)", def: 12, suffix: "%", step: 0.1 }, { key: "y", label: "Time period", def: 15, suffix: "years" }],
    compute: (v) => { const sip = v.g / sipFV(1, v.r, v.y * 12);
      return [{ label: "Monthly SIP required", value: inr(sip), highlight: true }, { label: "Total invested", value: inr(sip * v.y * 12) }, { label: "Estimated returns", value: inr(v.g - sip * v.y * 12) }]; } },
  { slug: "cagr-calculator", name: "CAGR Calculator", category: "Investment", desc: "Compound annual growth rate of an investment.",
    fields: [{ key: "a", label: "Initial value", def: 100000, suffix: "₹" }, { key: "b", label: "Final value", def: 250000, suffix: "₹" }, { key: "y", label: "Duration", def: 5, suffix: "years", step: 0.5 }],
    compute: (v) => [{ label: "CAGR", value: pct((Math.pow(v.b / v.a, 1 / v.y) - 1) * 100), highlight: true }, { label: "Absolute return", value: pct((v.b / v.a - 1) * 100) }] },
  { slug: "xirr-calculator", name: "XIRR Calculator", category: "Investment", desc: "Annualized return for dated cash flows.", fields: [], custom: "xirr" },
  { slug: "inflation-calculator", name: "Inflation Calculator", category: "Investment", desc: "Future cost and purchasing power of money.",
    fields: [{ key: "p", label: "Current amount", def: 100000, suffix: "₹" }, { key: "r", label: "Inflation rate (p.a.)", def: 6, suffix: "%", step: 0.1 }, { key: "y", label: "Years", def: 10, suffix: "years" }],
    compute: (v) => { const f = Math.pow(1 + v.r / 100, v.y);
      return [{ label: "Future cost of same goods", value: inr(v.p * f), highlight: true }, { label: "Future purchasing power", value: inr(v.p / f) }]; } },
  // Tax
  { slug: "income-tax-calculator", name: "Income Tax Calculator", category: "Income Tax & GST", desc: "Tax for FY 2025-26 (new or old regime).",
    fields: [{ key: "i", label: "Annual gross income", def: 1500000, suffix: "₹" }, { key: "reg", label: "Tax regime", def: 1, type: "select", options: [{ label: "New regime", value: 1 }, { label: "Old regime", value: 0 }] }, { key: "d", label: "Deductions (80C, 80D etc., old regime only)", def: 150000, suffix: "₹" }],
    compute: (v) => { const t = v.reg === 1 ? newRegimeTax(v.i) : oldRegimeTax(v.i, v.d);
      return [{ label: "Total tax (incl. 4% cess)", value: inr(t.tax), highlight: true }, { label: "Taxable income", value: inr(t.taxable) }, { label: "Effective rate", value: pct((t.tax / v.i) * 100) }, { label: "Monthly in-hand (after tax)", value: inr((v.i - t.tax) / 12) }]; } },
  { slug: "tax-regime-comparison", name: "Old vs New Tax Regime Calculator", category: "Income Tax & GST", desc: "Compare tax under both regimes (FY 2025-26).",
    fields: [{ key: "i", label: "Annual gross income", def: 1500000, suffix: "₹" }, { key: "d", label: "Old regime deductions (80C, 80D, HRA…)", def: 250000, suffix: "₹" }],
    compute: (v) => { const n = newRegimeTax(v.i).tax, o = oldRegimeTax(v.i, v.d).tax;
      return [{ label: "Better option", value: n <= o ? "New regime" : "Old regime", highlight: true }, { label: "New regime tax", value: inr(n) }, { label: "Old regime tax", value: inr(o) }, { label: "You save", value: inr(Math.abs(n - o)) }]; } },
  { slug: "gst-calculator", name: "GST Calculator", category: "Income Tax & GST", desc: "Add GST to a price.",
    fields: [{ key: "a", label: "Amount (excl. GST)", def: 10000, suffix: "₹" }, { key: "r", label: "GST rate", def: 18, type: "select", options: [0, 3, 5, 12, 18, 28, 40].map((x) => ({ label: x + "%", value: x })) }],
    compute: (v) => { const g = (v.a * v.r) / 100;
      return [{ label: "Total (incl. GST)", value: inr(v.a + g), highlight: true }, { label: "GST amount", value: inr(g) }, { label: "CGST", value: inr(g / 2) }, { label: "SGST", value: inr(g / 2) }]; } },
  { slug: "gst-reverse-calculator", name: "GST Reverse Calculator", category: "Income Tax & GST", desc: "Original price from a GST-inclusive amount.",
    fields: [{ key: "a", label: "Amount (incl. GST)", def: 11800, suffix: "₹" }, { key: "r", label: "GST rate", def: 18, type: "select", options: [0, 3, 5, 12, 18, 28, 40].map((x) => ({ label: x + "%", value: x })) }],
    compute: (v) => { const base = v.a / (1 + v.r / 100);
      return [{ label: "Original price", value: inr(base), highlight: true }, { label: "GST included", value: inr(v.a - base) }, { label: "CGST / SGST each", value: inr((v.a - base) / 2) }]; } },
  { slug: "tds-calculator", name: "TDS Calculator", category: "Income Tax & GST", desc: "Estimate TDS for common payment types.",
    fields: [{ key: "a", label: "Payment amount", def: 100000, suffix: "₹" }, { key: "r", label: "Payment type", def: 10, type: "select", options: [{ label: "Professional fees 194J (10%)", value: 10 }, { label: "Technical fees 194J (2%)", value: 2 }, { label: "Contractor – individual 194C (1%)", value: 1 }, { label: "Contractor – company 194C (2%)", value: 2.0001 }, { label: "Rent – land/building 194I (10%)", value: 10.0001 }, { label: "Commission 194H (2%)", value: 2.0002 }, { label: "FD interest 194A (10%)", value: 10.0002 }, { label: "No PAN (20%)", value: 20 }] }],
    compute: (v) => { const r = Math.round(v.r * 100) / 100, t = (v.a * r) / 100;
      return [{ label: "TDS deducted", value: inr(t), highlight: true }, { label: "Net amount paid", value: inr(v.a - t) }, { label: "TDS rate", value: r + "%" }]; } },
  { slug: "hra-exemption-calculator", name: "HRA Exemption Calculator", category: "Income Tax & GST", desc: "Eligible HRA exemption under old regime.",
    fields: [{ key: "b", label: "Annual basic + DA", def: 600000, suffix: "₹" }, { key: "h", label: "Annual HRA received", def: 240000, suffix: "₹" }, { key: "rent", label: "Annual rent paid", def: 240000, suffix: "₹" }, { key: "m", label: "City", def: 1, type: "select", options: [{ label: "Metro (50%)", value: 1 }, { label: "Non-metro (40%)", value: 0 }] }],
    compute: (v) => { const ex = Math.max(0, Math.min(v.h, v.rent - 0.1 * v.b, (v.m ? 0.5 : 0.4) * v.b));
      return [{ label: "HRA exempt", value: inr(ex), highlight: true }, { label: "Taxable HRA", value: inr(v.h - ex) }]; } },
  { slug: "capital-gains-tax-calculator", name: "Capital Gains Tax Calculator", category: "Income Tax & GST", desc: "Tax on listed equity / equity fund gains.",
    fields: [{ key: "buy", label: "Purchase value", def: 500000, suffix: "₹" }, { key: "sell", label: "Sale value", def: 800000, suffix: "₹" }, { key: "lt", label: "Holding period", def: 1, type: "select", options: [{ label: "Long term (> 12 months)", value: 1 }, { label: "Short term (≤ 12 months)", value: 0 }] }],
    compute: (v) => { const g = v.sell - v.buy; const tax = g <= 0 ? 0 : v.lt ? Math.max(0, g - 125000) * 0.125 : g * 0.2;
      return [{ label: "Tax (incl. 4% cess)", value: inr(tax * 1.04), highlight: true }, { label: "Capital gain", value: inr(g) }, { label: "Rate applied", value: v.lt ? "12.5% above ₹1.25L" : "20%" }]; } },
  { slug: "advance-tax-calculator", name: "Advance Tax Calculator", category: "Income Tax & GST", desc: "Advance tax instalments (new regime).",
    fields: [{ key: "i", label: "Estimated annual income", def: 2000000, suffix: "₹" }, { key: "tds", label: "TDS already deducted", def: 100000, suffix: "₹" }],
    compute: (v) => { const due = Math.max(0, newRegimeTax(v.i).tax - v.tds);
      if (due < 10000) return [{ label: "Advance tax payable", value: "Not required (< ₹10,000)", highlight: true }];
      return [{ label: "Total advance tax", value: inr(due), highlight: true }, { label: "By 15 June (15%)", value: inr(due * 0.15) }, { label: "By 15 Sept (45%)", value: inr(due * 0.45) }, { label: "By 15 Dec (75%)", value: inr(due * 0.75) }, { label: "By 15 March (100%)", value: inr(due) }]; } },
  // Salary & savings
  { slug: "salary-calculator-india", name: "CTC to In-Hand Salary Calculator", category: "Salary & Savings", desc: "Monthly take-home from annual CTC (new regime).",
    fields: [{ key: "ctc", label: "Annual CTC", def: 1200000, suffix: "₹" }, { key: "bp", label: "Basic as % of CTC", def: 40, suffix: "%" }, { key: "pt", label: "Professional tax (annual)", def: 2400, suffix: "₹" }],
    compute: (v) => { const basic = (v.ctc * v.bp) / 100, pf = Math.min(basic, 180000) * 0.12, gross = v.ctc - pf;
      const tax = newRegimeTax(gross).tax, net = gross - pf - tax - v.pt;
      return [{ label: "Monthly in-hand", value: inr(net / 12), highlight: true }, { label: "Annual in-hand", value: inr(net) }, { label: "Employee + employer PF", value: inr(pf * 2) }, { label: "Income tax", value: inr(tax) }]; } },
  { slug: "salary-hike-calculator", name: "Salary Hike Calculator", category: "Salary & Savings", desc: "Revised salary after a raise.",
    fields: [{ key: "s", label: "Current salary", def: 800000, suffix: "₹" }, { key: "h", label: "Hike", def: 15, suffix: "%", step: 0.5 }],
    compute: (v) => { const n = v.s * (1 + v.h / 100);
      return [{ label: "New salary", value: inr(n), highlight: true }, { label: "Increase", value: inr(n - v.s) }, { label: "New monthly", value: inr(n / 12) }]; } },
  { slug: "fd-calculator", name: "FD Calculator", category: "Salary & Savings", desc: "Fixed deposit maturity (quarterly compounding).",
    fields: [{ key: "p", label: "Deposit amount", def: 100000, suffix: "₹" }, { key: "r", label: "Interest rate (p.a.)", def: 7, suffix: "%", step: 0.1 }, { key: "y", label: "Tenure", def: 5, suffix: "years", step: 0.5 }],
    compute: (v) => { const m = v.p * Math.pow(1 + v.r / 400, 4 * v.y);
      return [{ label: "Maturity value", value: inr(m), highlight: true }, { label: "Interest earned", value: inr(m - v.p) }]; } },
  { slug: "rd-calculator", name: "RD Calculator", category: "Salary & Savings", desc: "Recurring deposit maturity value.",
    fields: [{ key: "p", label: "Monthly deposit", def: 5000, suffix: "₹" }, { key: "r", label: "Interest rate (p.a.)", def: 7, suffix: "%", step: 0.1 }, { key: "y", label: "Tenure", def: 5, suffix: "years" }],
    compute: (v) => { let m = 0; const n = v.y * 12;
      for (let k = 1; k <= n; k++) m += v.p * Math.pow(1 + v.r / 400, (4 * k) / 12);
      return [{ label: "Maturity value", value: inr(m), highlight: true }, { label: "Total deposited", value: inr(v.p * n) }, { label: "Interest earned", value: inr(m - v.p * n) }]; } },
  { slug: "ppf-calculator", name: "PPF Calculator", category: "Salary & Savings", desc: "Projected Public Provident Fund balance.",
    fields: [{ key: "p", label: "Yearly investment (max ₹1.5L)", def: 150000, suffix: "₹" }, { key: "r", label: "Interest rate", def: 7.1, suffix: "%", step: 0.1 }, { key: "y", label: "Duration (min 15)", def: 15, suffix: "years" }],
    compute: (v) => { const p = Math.min(v.p, 150000); let b = 0;
      for (let k = 0; k < v.y; k++) b = (b + p) * (1 + v.r / 100);
      return [{ label: "Maturity value", value: inr(b), highlight: true }, { label: "Total invested", value: inr(p * v.y) }, { label: "Interest earned", value: inr(b - p * v.y) }]; } },
  { slug: "epf-calculator", name: "EPF Calculator", category: "Salary & Savings", desc: "Employee provident fund accumulation.",
    fields: [{ key: "b", label: "Monthly basic + DA", def: 30000, suffix: "₹" }, { key: "age", label: "Current age", def: 28, suffix: "yrs" }, { key: "ret", label: "Retirement age", def: 58, suffix: "yrs" }, { key: "inc", label: "Annual salary increase", def: 5, suffix: "%" }, { key: "r", label: "EPF interest rate", def: 8.25, suffix: "%", step: 0.05 }, { key: "cur", label: "Current EPF balance", def: 0, suffix: "₹" }],
    compute: (v) => { let bal = v.cur, basic = v.b, contrib = 0; const i = v.r / 1200;
      for (let y = 0; y < v.ret - v.age; y++) { for (let m = 0; m < 12; m++) { const c = basic * 0.12 + basic * 0.0367; bal = bal * (1 + i) + c; contrib += c; } basic *= 1 + v.inc / 100; }
      return [{ label: "Corpus at retirement", value: inr(bal), highlight: true }, { label: "Total contributions", value: inr(contrib) }, { label: "Interest earned", value: inr(bal - contrib - v.cur) }]; } },
  { slug: "nps-calculator", name: "NPS Calculator", category: "Salary & Savings", desc: "Retirement corpus and monthly pension.",
    fields: [{ key: "p", label: "Monthly contribution", def: 5000, suffix: "₹" }, { key: "age", label: "Current age", def: 30, suffix: "yrs" }, { key: "r", label: "Expected return", def: 10, suffix: "%", step: 0.1 }, { key: "a", label: "Annuity purchase (min 40%)", def: 40, suffix: "%" }, { key: "ar", label: "Annuity rate", def: 6, suffix: "%", step: 0.1 }],
    compute: (v) => { const c = sipFV(v.p, v.r, Math.max(0, 60 - v.age) * 12), ann = (c * Math.max(40, v.a)) / 100;
      return [{ label: "Total corpus at 60", value: inr(c), highlight: true }, { label: "Lump sum withdrawal", value: inr(c - ann) }, { label: "Monthly pension", value: inr((ann * v.ar) / 1200) }, { label: "Total invested", value: inr(v.p * Math.max(0, 60 - v.age) * 12) }]; } },
  { slug: "gratuity-calculator", name: "Gratuity Calculator", category: "Salary & Savings", desc: "Gratuity under the Payment of Gratuity Act.",
    fields: [{ key: "b", label: "Last monthly basic + DA", def: 50000, suffix: "₹" }, { key: "y", label: "Years of service", def: 10, suffix: "years", step: 0.5 }],
    compute: (v) => { const yrs = Math.floor(v.y) + (v.y % 1 >= 0.5 ? 1 : 0);
      if (v.y < 5) return [{ label: "Gratuity", value: "Not eligible (< 5 years)", highlight: true }];
      const g = Math.min((v.b * 15 * yrs) / 26, 2000000);
      return [{ label: "Gratuity amount", value: inr(g), highlight: true }, { label: "Years counted", value: String(yrs) }, { label: "Tax-free limit", value: inr(2000000) }]; } },
  // Loans
  { slug: "home-loan-emi-calculator", name: "Home Loan EMI Calculator", category: "Loan & EMI", desc: "EMI, total interest and repayment.", fields: loanFields(5000000, 8.5, 20), compute: loanCompute },
  { slug: "personal-loan-emi-calculator", name: "Personal Loan EMI Calculator", category: "Loan & EMI", desc: "Monthly personal loan repayments.", fields: loanFields(500000, 12, 5), compute: loanCompute },
  { slug: "car-loan-emi-calculator", name: "Car Loan EMI Calculator", category: "Loan & EMI", desc: "Estimated car loan repayments.", fields: loanFields(800000, 9, 5), compute: loanCompute },
  { slug: "loan-prepayment-calculator", name: "Loan Prepayment Calculator", category: "Loan & EMI", desc: "Interest saved by extra monthly payments.",
    fields: [...loanFields(5000000, 8.5, 20), { key: "x", label: "Extra payment per month", def: 5000, suffix: "₹" }],
    compute: (v) => { const e = emi(v.p, v.r, v.y * 12), i = v.r / 1200; let bal = v.p, m = 0, int = 0;
      while (bal > 0 && m < 1200) { const it = bal * i; int += it; bal = bal + it - (e + v.x); m++; }
      const base = e * v.y * 12 - v.p;
      return [{ label: "Interest saved", value: inr(base - int), highlight: true }, { label: "New tenure", value: `${Math.floor(m / 12)} yrs ${m % 12} mo` }, { label: "Months saved", value: String(v.y * 12 - m) }, { label: "Regular EMI", value: inr(e) }]; } },
  { slug: "home-loan-eligibility-calculator", name: "Home Loan Eligibility Calculator", category: "Loan & EMI", desc: "Maximum loan from income and existing EMIs.",
    fields: [{ key: "inc", label: "Net monthly income", def: 100000, suffix: "₹" }, { key: "ex", label: "Existing EMIs", def: 10000, suffix: "₹" }, { key: "foir", label: "Max EMI to income (FOIR)", def: 50, suffix: "%" }, { key: "r", label: "Interest rate", def: 8.5, suffix: "%", step: 0.1 }, { key: "y", label: "Tenure", def: 20, suffix: "years" }],
    compute: (v) => { const e = Math.max(0, (v.inc * v.foir) / 100 - v.ex), loan = e / emi(1, v.r, v.y * 12);
      return [{ label: "Eligible loan amount", value: inr(loan), highlight: true }, { label: "Affordable EMI", value: inr(e) }]; } },
  { slug: "rent-vs-buy-calculator", name: "Rent vs Buy Calculator", category: "Loan & EMI", desc: "Compare net cost of renting vs buying.",
    fields: [{ key: "price", label: "Home price", def: 6000000, suffix: "₹" }, { key: "dp", label: "Down payment", def: 20, suffix: "%" }, { key: "r", label: "Loan rate", def: 8.5, suffix: "%", step: 0.1 }, { key: "rent", label: "Monthly rent", def: 20000, suffix: "₹" }, { key: "ri", label: "Annual rent increase", def: 5, suffix: "%" }, { key: "app", label: "Property appreciation", def: 5, suffix: "%" }, { key: "inv", label: "Investment return (if renting)", def: 10, suffix: "%" }, { key: "y", label: "Time horizon", def: 20, suffix: "years" }],
    compute: (v) => { const down = (v.price * v.dp) / 100, loan = v.price - down, e = emi(loan, v.r, v.y * 12);
      const homeVal = v.price * Math.pow(1 + v.app / 100, v.y), buyCost = down + e * v.y * 12 - homeVal;
      let rentPaid = 0, rent = v.rent, port = down; const mi = v.inv / 1200;
      for (let m = 0; m < v.y * 12; m++) { if (m && m % 12 === 0) rent *= 1 + v.ri / 100; rentPaid += rent; port = port * (1 + mi) + Math.max(0, e - rent); }
      return [{ label: "Better option", value: buyCost < rentPaid - port ? "Buying" : "Renting", highlight: true }, { label: "Net cost of buying", value: inr(buyCost) }, { label: "Net cost of renting", value: inr(rentPaid - port) }, { label: "Home value after period", value: inr(homeVal) }, { label: "Total rent paid", value: inr(rentPaid) }]; } },
  // Business
  { slug: "profit-margin-calculator", name: "Profit Margin Calculator", category: "Business & Personal Finance", desc: "Gross or net profit margin.",
    fields: [{ key: "rev", label: "Revenue", def: 100000, suffix: "₹" }, { key: "cost", label: "Total cost", def: 70000, suffix: "₹" }],
    compute: (v) => [{ label: "Profit margin", value: pct(((v.rev - v.cost) / v.rev) * 100), highlight: true }, { label: "Profit", value: inr(v.rev - v.cost) }, { label: "Markup on cost", value: pct(((v.rev - v.cost) / v.cost) * 100) }] },
  { slug: "markup-calculator", name: "Markup Calculator", category: "Business & Personal Finance", desc: "Selling price from cost and markup.",
    fields: [{ key: "c", label: "Cost price", def: 500, suffix: "₹" }, { key: "m", label: "Markup", def: 40, suffix: "%" }],
    compute: (v) => { const sp = v.c * (1 + v.m / 100);
      return [{ label: "Selling price", value: inr(sp), highlight: true }, { label: "Profit", value: inr(sp - v.c) }, { label: "Margin", value: pct(((sp - v.c) / sp) * 100) }]; } },
  { slug: "break-even-calculator", name: "Break-Even Calculator", category: "Business & Personal Finance", desc: "Units and sales needed to cover costs.",
    fields: [{ key: "f", label: "Fixed costs", def: 100000, suffix: "₹" }, { key: "p", label: "Price per unit", def: 500, suffix: "₹" }, { key: "vc", label: "Variable cost per unit", def: 300, suffix: "₹" }],
    compute: (v) => { const u = v.f / (v.p - v.vc);
      return [{ label: "Break-even units", value: v.p > v.vc ? Math.ceil(u).toLocaleString("en-IN") : "Never (price ≤ cost)", highlight: true }, { label: "Break-even sales", value: v.p > v.vc ? inr(Math.ceil(u) * v.p) : "—" }, { label: "Contribution per unit", value: inr(v.p - v.vc) }]; } },
  { slug: "discount-calculator", name: "Discount Calculator", category: "Business & Personal Finance", desc: "Final price and savings after discount.",
    fields: [{ key: "p", label: "Original price", def: 2000, suffix: "₹" }, { key: "d", label: "Discount", def: 25, suffix: "%" }, { key: "d2", label: "Extra discount", def: 0, suffix: "%" }],
    compute: (v) => { const f = v.p * (1 - v.d / 100) * (1 - v.d2 / 100);
      return [{ label: "Final price", value: inr(f), highlight: true }, { label: "You save", value: inr(v.p - f) }, { label: "Effective discount", value: pct(((v.p - f) / v.p) * 100) }]; } },
  { slug: "emergency-fund-calculator", name: "Emergency Fund Calculator", category: "Business & Personal Finance", desc: "Savings target from monthly expenses.",
    fields: [{ key: "e", label: "Monthly essential expenses", def: 40000, suffix: "₹" }, { key: "m", label: "Months of cover", def: 6, suffix: "months" }, { key: "s", label: "Current savings", def: 50000, suffix: "₹" }, { key: "save", label: "Monthly saving towards it", def: 10000, suffix: "₹" }],
    compute: (v) => { const t = v.e * v.m, gap = Math.max(0, t - v.s);
      return [{ label: "Emergency fund target", value: inr(t), highlight: true }, { label: "Still needed", value: inr(gap) }, { label: "Months to reach", value: v.save > 0 ? String(Math.ceil(gap / v.save)) : "—" }]; } },
  { slug: "net-worth-calculator", name: "Net Worth Calculator", category: "Business & Personal Finance", desc: "Assets minus liabilities.",
    fields: [{ key: "cash", label: "Cash & bank", def: 200000, suffix: "₹" }, { key: "inv", label: "Investments", def: 800000, suffix: "₹" }, { key: "prop", label: "Property & vehicles", def: 3000000, suffix: "₹" }, { key: "oth", label: "Other assets (gold etc.)", def: 200000, suffix: "₹" }, { key: "loans", label: "Loans outstanding", def: 1500000, suffix: "₹" }, { key: "cc", label: "Credit card & other debt", def: 50000, suffix: "₹" }],
    compute: (v) => { const a = v.cash + v.inv + v.prop + v.oth, l = v.loans + v.cc;
      return [{ label: "Net worth", value: inr(a - l), highlight: true }, { label: "Total assets", value: inr(a) }, { label: "Total liabilities", value: inr(l) }, { label: "Debt to assets", value: pct((l / a) * 100) }]; } },
  { slug: "debt-payoff-calculator", name: "Debt Payoff Calculator", category: "Business & Personal Finance", desc: "Time and interest to clear a debt.",
    fields: [{ key: "b", label: "Debt balance", def: 200000, suffix: "₹" }, { key: "r", label: "Interest rate (p.a.)", def: 18, suffix: "%", step: 0.1 }, { key: "p", label: "Monthly payment", def: 10000, suffix: "₹" }],
    compute: (v) => { const i = v.r / 1200; if (v.p <= v.b * i) return [{ label: "Payoff time", value: "Never — payment too low", highlight: true }, { label: "Minimum to reduce debt", value: inr(v.b * i + 1) }];
      let bal = v.b, m = 0, int = 0; while (bal > 0.5 && m < 1200) { const it = bal * i; int += it; bal = bal + it - v.p; m++; }
      return [{ label: "Payoff time", value: `${Math.floor(m / 12)} yrs ${m % 12} mo`, highlight: true }, { label: "Total interest", value: inr(int) }, { label: "Total paid", value: inr(v.b + int) }]; } },
  { slug: "savings-goal-calculator", name: "Savings Goal Calculator", category: "Business & Personal Finance", desc: "Monthly saving needed for a target.",
    fields: [{ key: "g", label: "Goal amount", def: 1000000, suffix: "₹" }, { key: "c", label: "Current savings", def: 100000, suffix: "₹" }, { key: "r", label: "Expected return (p.a.)", def: 7, suffix: "%", step: 0.1 }, { key: "y", label: "Time", def: 5, suffix: "years", step: 0.5 }],
    compute: (v) => { const n = Math.round(v.y * 12), i = v.r / 1200, fvCur = v.c * Math.pow(1 + i, n), need = Math.max(0, v.g - fvCur);
      const m = i === 0 ? need / n : (need * i) / (Math.pow(1 + i, n) - 1);
      return [{ label: "Save per month", value: inr(m), highlight: true }, { label: "Current savings will grow to", value: inr(fvCur) }, { label: "Total you'll deposit", value: inr(m * n) }]; } },
];

export const xirr = (flows: { amount: number; date: Date }[]) => {
  if (flows.length < 2) return NaN;
  const t0 = flows[0].date.getTime();
  const f = (r: number) => flows.reduce((s, c) => s + c.amount / Math.pow(1 + r, (c.date.getTime() - t0) / 31536000000), 0);
  let lo = -0.9999, hi = 10;
  if (f(lo) * f(hi) > 0) return NaN;
  for (let k = 0; k < 200; k++) { const mid = (lo + hi) / 2; if (f(lo) * f(mid) <= 0) hi = mid; else lo = mid; }
  return ((lo + hi) / 2) * 100;
};
export { num };
