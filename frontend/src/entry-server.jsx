import React from "react";
import { renderToString } from "react-dom/server";
import App from "./App.jsx";
import { allRoutes, headFor, sitemap, NOT_FOUND } from "./routes.js";

export { sitemap };
export const routes = [...allRoutes(), NOT_FOUND];

export function render(route) {
  const html = renderToString(
    <React.StrictMode>
      <App route={route} />
    </React.StrictMode>
  );
  return { html, head: headFor(route) };
}
