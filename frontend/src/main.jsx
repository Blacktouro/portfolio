import React from "react";
import { createRoot, hydrateRoot } from "react-dom/client";
import App from "./App.jsx";
import { matchRoute } from "./routes.js";
import "./styles.css";

const root = document.getElementById("root");
const app = (
  <React.StrictMode>
    <App route={matchRoute(window.location.pathname)} />
  </React.StrictMode>
);

// No site publicado o HTML já vem pré-renderizado e o React só o "acorda".
// Em "npm run dev" a página vem vazia e é desenhada no browser.
if (root.firstElementChild) hydrateRoot(root, app);
else createRoot(root).render(app);
