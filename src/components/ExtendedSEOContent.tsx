import { ToolSEOContent } from "@/data/toolsSEOData";
import { BookOpen, TrendingUp, Globe, Award, Layers, Sparkles } from "lucide-react";

interface Props {
  seoContent: ToolSEOContent;
}

// Tiny deterministic hash so each slug yields a stable, unique variant
const hash = (s: string) => {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) | 0;
  return Math.abs(h);
};

const pick = <T,>(arr: T[], seed: number, offset = 0) =>
  arr[(seed + offset) % arr.length];

const industries = [
  "e-commerce stores", "digital marketing agencies", "publishing houses",
  "education platforms", "freelance designers", "mobile app developers",
  "real-estate portals", "travel bloggers", "news websites",
  "social-media managers", "small businesses", "non-profit organisations",
];

const workflows = [
  "content production pipelines", "design hand-off processes",
  "asset delivery to CDNs", "client review cycles",
  "weekly social-media batches", "monthly campaign launches",
  "search-engine optimisation audits", "accessibility reviews",
];

const benefitsLong = [
  "saves significant bandwidth on mobile networks",
  "improves Core Web Vitals scores measured by Google",
  "reduces storage costs across cloud buckets",
  "shortens the visitor-to-conversion path on landing pages",
  "lifts ranking signals tied to page speed and user experience",
  "makes hand-off between teams faster and less error-prone",
];

const ExtendedSEOContent = ({ seoContent }: Props) => {
  const seed = hash(seoContent.slug);
  const name = seoContent.title;
  const cat = seoContent.category;
  const kw = seoContent.keywords || [];
  const primary = kw[0] || name.toLowerCase();
  const secondary = kw[1] || cat.toLowerCase();
  const tertiary = kw[2] || "online tool";

  const ind1 = pick(industries, seed);
  const ind2 = pick(industries, seed, 3);
  const ind3 = pick(industries, seed, 7);
  const wf1 = pick(workflows, seed, 1);
  const wf2 = pick(workflows, seed, 4);
  const bn1 = pick(benefitsLong, seed, 2);
  const bn2 = pick(benefitsLong, seed, 5);

  const accent = seoContent.gradientFrom;

  return (
    <section className="py-12 bg-secondary/20 border-t border-border">
      <div className="container mx-auto px-4 max-w-4xl space-y-8">
        <div className="flex items-center gap-3">
          <div
            className="w-10 h-10 flex items-center justify-center rounded-lg"
            style={{ background: `linear-gradient(135deg, ${seoContent.gradientFrom}, ${seoContent.gradientTo})` }}
          >
            <BookOpen className="w-5 h-5 text-white" />
          </div>
          <h2 className="text-2xl md:text-3xl font-bold">Complete Guide to {name}</h2>
        </div>

        <article className="prose prose-invert max-w-none space-y-4 text-muted-foreground leading-relaxed">
          <p>
            Modern teams treat {primary} as a non-negotiable step in their {wf1}.
            The {name} you are using right now was built specifically for that
            reality: a focused, in-browser utility that handles {secondary} without
            forcing you to install desktop software, learn complex menus, or upload
            files to a third-party processing queue. Everything happens locally in
            your browser session, which means your work stays private from the
            moment you drag a file in to the moment you download the result.
          </p>

          <p>
            The reason {name} has become a daily companion for {ind1} and {ind2} is
            that it removes friction from a chore that used to require expensive
            licences. Where a traditional editor might charge a recurring monthly
            fee just to perform {tertiary}, this free {cat.toLowerCase()} utility
            delivers comparable quality with zero subscription. That difference
            adds up quickly: across a quarter of regular usage, {bn1} and {bn2}
            in ways that are easy to measure in analytics dashboards.
          </p>
        </article>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-card border border-border rounded-xl p-6">
            <div className="flex items-center gap-2 mb-3">
              <TrendingUp className="w-5 h-5" style={{ color: accent }} />
              <h3 className="font-semibold text-foreground">Why this matters for SEO</h3>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Search engines reward sites that serve correctly-prepared media. By
              running {primary} through {name} before publishing, you ship pages
              that load faster on 4G, score higher on Lighthouse, and surface in
              image search with cleaner thumbnails. The same processed asset can be
              reused across blog posts, product galleries, and social previews
              without re-editing, which keeps your visual identity consistent.
            </p>
          </div>

          <div className="bg-card border border-border rounded-xl p-6">
            <div className="flex items-center gap-2 mb-3">
              <Globe className="w-5 h-5" style={{ color: accent }} />
              <h3 className="font-semibold text-foreground">Built for every device</h3>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              The {name} interface adapts to phones, tablets, and desktops. Touch
              users get large drop zones and tappable controls; keyboard users get
              focus rings and shortcut hints. Whether you are travelling with a
              Chromebook or working from a dual-monitor studio, the rendering and
              processing engines stay identical, so your output never changes shape
              based on the hardware you happen to be holding.
            </p>
          </div>

          <div className="bg-card border border-border rounded-xl p-6">
            <div className="flex items-center gap-2 mb-3">
              <Layers className="w-5 h-5" style={{ color: accent }} />
              <h3 className="font-semibold text-foreground">How it fits a real workflow</h3>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              A typical session with {name} starts with a folder of raw assets
              exported from a camera, a screenshot tool, or a design app. You drop
              the batch into the tool, choose your target settings once, and let
              the engine process the entire queue. The processed files land in your
              downloads folder ready for {wf2}, with original filenames preserved
              so version control and asset libraries stay tidy.
            </p>
          </div>

          <div className="bg-card border border-border rounded-xl p-6">
            <div className="flex items-center gap-2 mb-3">
              <Award className="w-5 h-5" style={{ color: accent }} />
              <h3 className="font-semibold text-foreground">Trusted by professionals</h3>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {ind3.charAt(0).toUpperCase() + ind3.slice(1)} have integrated {name}
              into their standard operating procedures because it is predictable.
              The same input produces the same output every time, no surprise
              quality drops, no watermarks, no hidden upsells. That predictability
              is what makes the tool safe to recommend to clients and to embed in
              documentation aimed at junior team members.
            </p>
          </div>
        </div>

        <article className="space-y-4 text-muted-foreground leading-relaxed">
          <h3 className="text-xl font-semibold text-foreground flex items-center gap-2">
            <Sparkles className="w-5 h-5" style={{ color: accent }} />
            Getting the most out of {name}
          </h3>
          <p>
            A few habits separate casual users from power users. First, batch
            similar files together so you only configure settings once. Second,
            keep the original copies in a separate folder; even though processed
            results are excellent, having the source available means you can
            re-export at a different size or format later without redoing creative
            work. Third, pair {name} with other utilities from the {cat} category
            on this site — chaining two simple tools is almost always faster and
            cleaner than reaching for a heavyweight desktop suite.
          </p>
          <p>
            If you are publishing content for {ind1}, treat {primary} as part of
            your editorial checklist. Just as you would proofread copy and verify
            outbound links, processing media through {name} should be a final step
            before hitting publish. Readers may never consciously notice the
            difference, but their browsers will, and so will the crawlers that
            decide how your pages rank tomorrow.
          </p>
          <p>
            We update {name} regularly based on feedback from real users. If you
            hit a workflow that feels rough, or you would love to see support for
            an additional format, the contact link in the footer reaches a human
            who actually reads the messages. Tools like this exist because the
            community contributes ideas, edge cases, and the occasional bug report
            — every one of them is welcome, and many have shaped the version of
            the {cat.toLowerCase()} suite you are using right now.
          </p>
        </article>
      </div>
    </section>
  );
};

export default ExtendedSEOContent;
