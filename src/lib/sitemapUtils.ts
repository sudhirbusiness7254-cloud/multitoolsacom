import { toolCategories } from "@/data/toolsData";
import { blogPosts } from "@/data/blogData";

export interface SitemapUrl {
  loc: string;
  lastmod: string;
  changefreq: "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never";
  priority: string;
}

const getCurrentDate = (): string => {
  return new Date().toISOString().split('T')[0];
};

export const generateSitemapUrls = (): SitemapUrl[] => {
  const today = getCurrentDate();
  const urls: SitemapUrl[] = [];
  const baseUrl = "https://multitoolsa.com";

  // Main pages
  urls.push({ loc: baseUrl, lastmod: today, changefreq: "daily", priority: "1.0" });
  urls.push({ loc: `${baseUrl}/all-tools`, lastmod: today, changefreq: "weekly", priority: "0.9" });
  urls.push({ loc: `${baseUrl}/image-converter`, lastmod: today, changefreq: "weekly", priority: "0.9" });
  urls.push({ loc: `${baseUrl}/image-editor`, lastmod: today, changefreq: "weekly", priority: "0.9" });
  urls.push({ loc: `${baseUrl}/blog`, lastmod: today, changefreq: "weekly", priority: "0.8" });

  // Trust pages
  urls.push({ loc: `${baseUrl}/about`, lastmod: today, changefreq: "monthly", priority: "0.6" });
  urls.push({ loc: `${baseUrl}/contact`, lastmod: today, changefreq: "monthly", priority: "0.6" });
  urls.push({ loc: `${baseUrl}/privacy`, lastmod: today, changefreq: "yearly", priority: "0.4" });
  urls.push({ loc: `${baseUrl}/terms`, lastmod: today, changefreq: "yearly", priority: "0.4" });
  urls.push({ loc: `${baseUrl}/faq`, lastmod: today, changefreq: "monthly", priority: "0.7" });

  // Educational pages
  urls.push({ loc: `${baseUrl}/how-tools-work`, lastmod: today, changefreq: "monthly", priority: "0.7" });
  urls.push({ loc: `${baseUrl}/advertiser-disclosure`, lastmod: today, changefreq: "yearly", priority: "0.4" });
  urls.push({ loc: `${baseUrl}/image-formats-guide`, lastmod: today, changefreq: "monthly", priority: "0.7" });
  urls.push({ loc: `${baseUrl}/tutorials`, lastmod: today, changefreq: "weekly", priority: "0.7" });

  // Blog posts (dynamic from data)
  for (const post of blogPosts) {
    urls.push({
      loc: `${baseUrl}/blog/${post.id}`,
      lastmod: today,
      changefreq: "monthly",
      priority: "0.7"
    });
  }

  // Category pages (dynamic from data)
  for (const category of toolCategories) {
    urls.push({
      loc: `${baseUrl}/${category.slug}`,
      lastmod: today,
      changefreq: "weekly",
      priority: "0.8"
    });
  }

  // Tool pages (dynamic from data)
  for (const category of toolCategories) {
    for (const tool of category.tools) {
      urls.push({
        loc: `${baseUrl}/tools/${tool.slug}`,
        lastmod: today,
        changefreq: "monthly",
        priority: "0.6"
      });
    }
  }

  return urls;
};

export const generateSitemapXml = (): string => {
  const urls = generateSitemapUrls();
  
  const escapeXml = (str: string): string => {
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&apos;');
  };

  let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
        http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">`;

  for (const url of urls) {
    xml += `
  <url>
    <loc>${escapeXml(url.loc)}</loc>
    <lastmod>${url.lastmod}</lastmod>
    <changefreq>${url.changefreq}</changefreq>
    <priority>${url.priority}</priority>
  </url>`;
  }

  xml += `
</urlset>`;

  return xml;
};

// Get total counts for SEO stats display
export const getSitemapStats = () => {
  const allTools = toolCategories.flatMap(cat => cat.tools);
  return {
    totalCategories: toolCategories.length,
    totalTools: allTools.length,
    totalBlogPosts: blogPosts.length,
    totalPages: 14 + toolCategories.length + allTools.length + blogPosts.length
  };
};