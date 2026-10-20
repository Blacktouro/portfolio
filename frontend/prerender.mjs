// Gera um ficheiro HTML completo por página (SEO: o Google recebe o texto sem precisar de JavaScript)
import fs from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";

const dist = path.resolve("dist");
const ssrDir = path.resolve("dist-ssr");
const template = fs.readFileSync(path.join(dist, "index.html"), "utf8");
const { render, routes, sitemap } = await import(pathToFileURL(path.join(ssrDir, "entry-server.js")).href);

for (const route of routes) {
  const { html, head } = render(route);
  const page = template
    .replace('lang="__LANG__"', `lang="${route.lang === "pt" ? "pt-PT" : "en"}"`)
    .replace("<!--app-head-->", head)
    .replace("<!--app-html-->", html);
  const file = route.path.endsWith(".html")
    ? path.join(dist, route.path)
    : path.join(dist, route.path, "index.html");
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, page);
  console.log("  ✓", route.path);
}

fs.writeFileSync(path.join(dist, "sitemap.xml"), sitemap());
fs.rmSync(ssrDir, { recursive: true, force: true });
console.log(`Pré-renderizadas ${routes.length} páginas + sitemap.xml`);
