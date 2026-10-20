// Rotas do site e metatags (SEO) de cada página.
// Cada rota é pré-renderizada em HTML no build (ver prerender.mjs).
import { content, links, seo } from "./content.js";
import { articles } from "./articles.js";

export const SITE = "https://andrecardoso.dev";
const PERSON_ID = `${SITE}/#person`;

const prefix = { pt: "", en: "/en" };
const seg = {
  pt: { projects: "projetos", articles: "artigos" },
  en: { projects: "projects", articles: "articles" },
};
const other = (lang) => (lang === "pt" ? "en" : "pt");

export function pathFor(lang, kind, slug) {
  const p = prefix[lang];
  if (kind === "home") return `${p}/`;
  if (kind === "articles") return `${p}/${seg[lang].articles}/`;
  if (kind === "project") return `${p}/${seg[lang].projects}/${slug}/`;
  if (kind === "article") return `${p}/${seg[lang].articles}/${slug}/`;
  return "/";
}

function route(lang, kind, slug) {
  return { lang, kind, slug, path: pathFor(lang, kind, slug), alt: pathFor(other(lang), kind, slug) };
}

export const NOT_FOUND = { lang: "pt", kind: "404", path: "/404.html", alt: "/en/" };

export function allRoutes() {
  const list = [];
  for (const lang of ["pt", "en"]) {
    list.push(route(lang, "home"));
    for (const p of content[lang].cases) list.push(route(lang, "project", p.slug));
    list.push(route(lang, "articles"));
    for (const a of articles) list.push(route(lang, "article", a.slug));
  }
  return list;
}

export function matchRoute(pathname) {
  let p = decodeURI(pathname || "/");
  if (!p.endsWith("/") && !p.endsWith(".html")) p += "/";
  return allRoutes().find((r) => r.path === p) || NOT_FOUND;
}

export function findProject(lang, slug) {
  return content[lang].cases.find((p) => p.slug === slug);
}
export function findArticle(slug) {
  return articles.find((a) => a.slug === slug);
}
export function sortedArticles() {
  return [...articles].sort((a, b) => b.date.localeCompare(a.date));
}

/* ---------- <head> ---------- */

const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
const json = (o) => JSON.stringify(o).replace(/</g, "\\u003c");
const abs = (path) => SITE + path;

function crumbs(items) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: items.map(([name, path], i) => ({ "@type": "ListItem", position: i + 1, name, item: abs(path) })),
  };
}

const authorRef = { "@type": "Person", "@id": PERSON_ID, name: "André Cardoso", url: `${SITE}/` };

function homeGraph(lang) {
  const c = content[lang];
  return [
    {
      "@type": "WebSite",
      "@id": `${SITE}/#website`,
      url: `${SITE}/`,
      name: "André Cardoso",
      inLanguage: ["pt-PT", "en"],
      publisher: { "@id": PERSON_ID },
    },
    {
      "@type": "ProfilePage",
      url: abs(pathFor(lang, "home")),
      name: seo[lang].title,
      inLanguage: lang === "pt" ? "pt-PT" : "en",
      isPartOf: { "@id": `${SITE}/#website` },
      mainEntity: { "@id": PERSON_ID },
      dateModified: new Date().toISOString().slice(0, 10),
    },
    {
      "@type": "Person",
      "@id": PERSON_ID,
      name: "André Cardoso",
      url: `${SITE}/`,
      image: `${SITE}/og-image.png`,
      jobTitle: lang === "pt" ? "Sysadmin Linux e DevOps" : "Linux Sysadmin and DevOps Engineer",
      description: seo[lang].description,
      email: `mailto:${links.email}`,
      telephone: `+${links.whatsapp}`,
      address: { "@type": "PostalAddress", addressLocality: "Peniche", addressCountry: "PT" },
      sameAs: [links.github, links.linkedin].filter(Boolean),
      knowsLanguage: ["pt-PT", "en"],
      knowsAbout: ["DevOps", "Linux server administration", "Docker", "Docker Compose", "CI/CD", "Jenkins", "nginx", "Cloudflare", "Wazuh", "SIEM", "Server hardening", "Monitoring", "Self-hosting", "RPA", "OpenRPA", "SAP", "React", "Node.js", "Python"],
    },
    {
      "@type": "ItemList",
      name: c.ui.casesTitle,
      itemListElement: c.cases.map((p, i) => ({
        "@type": "ListItem",
        position: i + 1,
        url: abs(pathFor(lang, "project", p.slug)),
        name: p.title,
      })),
    },
  ];
}

export function headFor(r) {
  const lang = r.lang;
  const c = content[lang];
  const ui = c.ui;
  const home = [c.name, pathFor(lang, "home")];
  let title, description, type = "website", graph = [], image = `${SITE}/og-image.png`;
  let index = true;

  if (r.kind === "home") {
    title = seo[lang].title;
    description = seo[lang].description;
    type = "profile";
    graph = homeGraph(lang);
  } else if (r.kind === "project") {
    const p = findProject(lang, r.slug);
    title = `${p.title} | André Cardoso`;
    description = `${p.summary} ${p.tags.join(", ")}.`;
    type = "article";
    graph = [
      crumbs([home, [ui.navProjects, `${pathFor(lang, "home")}#projetos`], [p.title, r.path]]),
      {
        "@type": p.url ? "WebApplication" : "CreativeWork",
        name: p.title,
        description: p.summary,
        url: p.url || abs(r.path),
        ...(p.url ? { applicationCategory: "WebApplication", operatingSystem: "Web" } : {}),
        keywords: p.tags.join(", "),
        inLanguage: lang === "pt" ? "pt-PT" : "en",
        author: authorRef,
        ...(p.repo ? { codeRepository: p.repo } : {}),
      },
    ];
  } else if (r.kind === "articles") {
    title = `${ui.articlesTitle} | André Cardoso`;
    description = ui.articlesLead;
    graph = [
      crumbs([home, [ui.articlesTitle, r.path]]),
      {
        "@type": "CollectionPage",
        name: ui.articlesTitle,
        url: abs(r.path),
        hasPart: sortedArticles().map((a) => ({ "@type": "BlogPosting", headline: a[lang].title, url: abs(pathFor(lang, "article", a.slug)) })),
      },
    ];
  } else if (r.kind === "article") {
    const a = findArticle(r.slug);
    const t = a[lang];
    title = `${t.title} | André Cardoso`;
    description = t.description;
    type = "article";
    graph = [
      crumbs([home, [ui.articlesTitle, pathFor(lang, "articles")], [t.title, r.path]]),
      {
        "@type": "BlogPosting",
        headline: t.title,
        description: t.description,
        datePublished: a.date,
        dateModified: a.updated || a.date,
        inLanguage: lang === "pt" ? "pt-PT" : "en",
        keywords: a.tags.join(", "),
        image,
        url: abs(r.path),
        mainEntityOfPage: abs(r.path),
        author: authorRef,
        publisher: authorRef,
      },
    ];
  } else {
    title = `${ui.notFoundTitle} | André Cardoso`;
    description = ui.notFoundText;
    index = false;
  }

  const tags = [
    `<title>${esc(title)}</title>`,
    `<meta name="description" content="${esc(description)}" />`,
    `<meta name="robots" content="${index ? "index, follow, max-image-preview:large" : "noindex"}" />`,
  ];
  if (index) {
    const hl = (l) => (l === "pt" ? "pt-PT" : "en");
    tags.push(
      `<link rel="canonical" href="${abs(r.path)}" />`,
      `<link rel="alternate" hreflang="${hl(lang)}" href="${abs(r.path)}" />`,
      `<link rel="alternate" hreflang="${hl(other(lang))}" href="${abs(r.alt)}" />`,
      `<link rel="alternate" hreflang="x-default" href="${abs(lang === "pt" ? r.path : r.alt)}" />`,
      `<meta property="og:type" content="${type}" />`,
      `<meta property="og:url" content="${abs(r.path)}" />`,
      `<meta property="og:site_name" content="André Cardoso" />`,
      `<meta property="og:title" content="${esc(title)}" />`,
      `<meta property="og:description" content="${esc(description)}" />`,
      `<meta property="og:image" content="${image}" />`,
      `<meta property="og:image:width" content="1200" />`,
      `<meta property="og:image:height" content="630" />`,
      `<meta property="og:image:alt" content="André Cardoso — DevOps, Linux and server security" />`,
      `<meta property="og:locale" content="${lang === "pt" ? "pt_PT" : "en_GB"}" />`,
      `<meta property="og:locale:alternate" content="${lang === "pt" ? "en_GB" : "pt_PT"}" />`,
      `<meta name="twitter:card" content="summary_large_image" />`,
      `<meta name="twitter:title" content="${esc(title)}" />`,
      `<meta name="twitter:description" content="${esc(description)}" />`,
      `<meta name="twitter:image" content="${image}" />`,
    );
    if (r.kind === "article") {
      const a = findArticle(r.slug);
      tags.push(`<meta property="article:published_time" content="${a.date}" />`, `<meta property="article:author" content="André Cardoso" />`);
    }
  }
  if (graph.length) {
    tags.push(`<script type="application/ld+json">${json({ "@context": "https://schema.org", "@graph": graph })}</script>`);
  }
  return tags.join("\n    ");
}

/* ---------- sitemap.xml ---------- */

export function sitemap() {
  const today = new Date().toISOString().slice(0, 10);
  const urls = allRoutes().map((r) => {
    const a = r.kind === "article" ? findArticle(r.slug) : null;
    const lastmod = a ? a.updated || a.date : today;
    const hl = (l) => (l === "pt" ? "pt-PT" : "en");
    return `  <url>
    <loc>${abs(r.path)}</loc>
    <lastmod>${lastmod}</lastmod>
    <xhtml:link rel="alternate" hreflang="${hl(r.lang)}" href="${abs(r.path)}" />
    <xhtml:link rel="alternate" hreflang="${hl(other(r.lang))}" href="${abs(r.alt)}" />
  </url>`;
  });
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls.join("\n")}
</urlset>
`;
}
