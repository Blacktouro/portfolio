import { useEffect, useRef, useState } from "react";
import { content, links, stack } from "./content.js";
import { pathFor, findProject, findArticle, sortedArticles } from "./routes.js";
import "./extra.css";

const API = "/api";

function getToken() {
  try { return sessionStorage.getItem("token"); } catch { return null; }
}
function setToken(t) {
  try { t ? sessionStorage.setItem("token", t) : sessionStorage.removeItem("token"); } catch {}
}

async function api(path, options = {}) {
  const token = getToken();
  const res = await fetch(API + path, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    },
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    const err = new Error(data.error || "");
    err.status = res.status;
    throw err;
  }
  return data;
}

export default function App({ route }) {
  const lang = route.lang;
  const c = content[lang];
  const ui = c.ui;
  const [user, setUser] = useState(null);
  const [loginOpen, setLoginOpen] = useState(false);

  // A sessão só é verificada no browser, depois de a página (pré-renderizada) aparecer
  useEffect(() => {
    if (!getToken()) return;
    api("/me").then((d) => setUser(d.user)).catch(() => setToken(null));
  }, []);

  useEffect(() => {
    try { localStorage.setItem("lang", lang); } catch {}
  }, [lang]);

  function logout() {
    setToken(null);
    setUser(null);
  }

  const home = pathFor(lang, "home");
  let page;
  if (user) page = <Projects user={user} ui={ui} onExpired={logout} />;
  else if (route.kind === "home") page = <Home c={c} ui={ui} lang={lang} onLogin={() => setLoginOpen(true)} />;
  else if (route.kind === "project") page = <ProjectPage p={findProject(lang, route.slug)} c={c} ui={ui} lang={lang} />;
  else if (route.kind === "articles") page = <ArticlesIndex ui={ui} lang={lang} c={c} />;
  else if (route.kind === "article") page = <ArticlePage a={findArticle(route.slug)} ui={ui} lang={lang} c={c} />;
  else page = <NotFound ui={ui} lang={lang} />;

  return (
    <>
      <a className="skip" href="#conteudo">{lang === "pt" ? "Saltar para o conteúdo" : "Skip to content"}</a>
      <header className="topbar">
        <a className="mark" href={home} aria-label={ui.home}>
          <span className="sun" aria-hidden="true" />
          {c.name}
        </a>
        <nav className="topbar-actions" aria-label={lang === "pt" ? "Principal" : "Main"}>
          <a className="nav-link" href={`${home}#projetos`}>{ui.navProjects}</a>
          <a className="nav-link" href={pathFor(lang, "articles")}>{ui.navArticles}</a>
          <a className="btn ghost lang-toggle" href={route.alt} hrefLang={lang === "pt" ? "en" : "pt-PT"} aria-label={ui.switchLabel}>
            {ui.switchTo}
          </a>
          {user ? (
            <button className="btn ghost" onClick={logout}>{ui.logout}</button>
          ) : (
            <button className="btn ghost" onClick={() => setLoginOpen(true)}>{ui.login}</button>
          )}
        </nav>
      </header>

      <div id="conteudo">{page}</div>

      {loginOpen && (
        <LoginDialog
          ui={ui}
          onClose={() => setLoginOpen(false)}
          onSuccess={(u) => { setUser(u); setLoginOpen(false); window.scrollTo(0, 0); }}
        />
      )}

      <footer className="footer">
        <span>{c.name} · {c.location}</span>
        <span className="footer-links">
          <a href={links.github} rel="me noopener" target="_blank">GitHub</a>
          {links.linkedin && <a href={links.linkedin} rel="me noopener" target="_blank">LinkedIn</a>}
          <a href={`mailto:${links.email}`}>{links.email}</a>
        </span>
      </footer>
    </>
  );
}

function waLink(text) {
  return `https://wa.me/${links.whatsapp}?text=${encodeURIComponent(text)}`;
}

function ChatIcon() {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 11.5a8.5 8.5 0 0 1-12.6 7.4L3 20.5l1.6-5.2A8.5 8.5 0 1 1 21 11.5z" />
      <path d="M8.5 11.5h.01M12 11.5h.01M15.5 11.5h.01" />
    </svg>
  );
}

function ServiceIcon({ name }) {
  const common = { viewBox: "0 0 24 24", width: 28, height: 28, fill: "none", stroke: "currentColor", strokeWidth: 1.8, strokeLinecap: "round", strokeLinejoin: "round", "aria-hidden": true };
  if (name === "shield") return (
    <svg {...common}><path d="M12 3l7 3v5c0 4.5-3 8.2-7 10-4-1.8-7-5.5-7-10V6l7-3z" /><path d="M9 12l2 2 4-4" /></svg>
  );
  if (name === "spark") return (
    <svg {...common}><path d="M12 3v4M12 17v4M3 12h4M17 12h4" /><path d="M12 8l1.5 2.5L16 12l-2.5 1.5L12 16l-1.5-2.5L8 12l2.5-1.5z" /></svg>
  );
  return (
    <svg {...common}><rect x="4" y="4" width="16" height="6" rx="1.5" /><rect x="4" y="14" width="16" height="6" rx="1.5" /><path d="M8 7h.01M8 17h.01M12 7h4M12 17h4" /></svg>
  );
}

/* Ilustrações originais para os cartões de projeto */
function CaseArt({ kind }) {
  if (kind === "data") return (
    <svg viewBox="0 0 400 220" role="img" aria-hidden="true" preserveAspectRatio="xMidYMid slice">
      <rect width="400" height="220" fill="#123a5c" />
      <rect x="60" y="40" width="110" height="150" rx="12" fill="#e9f2fb" />
      {[64, 82, 100, 118].map((y) => <rect key={y} x="76" y={y} width={y % 36 ? 78 : 56} height="8" rx="4" fill="#9db7d1" />)}
      <rect x="76" y="140" width="78" height="34" rx="6" fill="#ffd166" />
      <path d="M185 115h30" stroke="#ffd166" strokeWidth="4" strokeLinecap="round" />
      <path d="M207 105l10 10-10 10" stroke="#ffd166" strokeWidth="4" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      {[[240, 120], [270, 90], [300, 140], [330, 70]].map(([x, h], i) =>
        <rect key={i} x={x} y={190 - h} width="22" height={h} rx="4" fill={i === 3 ? "#5fd3b4" : "#7fb2e5"} />)}
      <path d="M240 60l30 22 30-14 40 -24" stroke="#ff7a6b" strokeWidth="3" fill="none" strokeLinecap="round" />
    </svg>
  );
  if (kind === "clock") return (
    <svg viewBox="0 0 400 220" role="img" aria-hidden="true" preserveAspectRatio="xMidYMid slice">
      <rect width="400" height="220" fill="#1f4d36" />
      <circle cx="200" cy="110" r="72" fill="#f3fbf5" />
      <circle cx="200" cy="110" r="72" fill="none" stroke="#8fe3a8" strokeWidth="8" />
      {Array.from({ length: 12 }, (_, i) => {
        const a = (i * Math.PI) / 6;
        return <line key={i} x1={200 + 56 * Math.sin(a)} y1={110 - 56 * Math.cos(a)} x2={200 + 64 * Math.sin(a)} y2={110 - 64 * Math.cos(a)} stroke="#1f4d36" strokeWidth={i % 3 ? 2 : 4} strokeLinecap="round" />;
      })}
      <path d="M200 110V68M200 110l30 18" stroke="#1f4d36" strokeWidth="6" strokeLinecap="round" />
      <circle cx="200" cy="110" r="6" fill="#ff7a6b" />
      <rect x="300" y="150" width="60" height="34" rx="8" fill="#8fe3a8" />
      <path d="M315 167l8 8 16-16" stroke="#1f4d36" strokeWidth="4" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
  if (kind === "security") return (
    <svg viewBox="0 0 400 220" role="img" aria-hidden="true" preserveAspectRatio="xMidYMid slice">
      <rect width="400" height="220" fill="#0f3b3a" />
      {[90, 65, 40].map((r) => <circle key={r} cx="200" cy="110" r={r} fill="none" stroke="#5fd3b4" strokeOpacity="0.35" />)}
      <path d="M200 110 L290 110 A90 90 0 0 0 263.6 46.4 Z" fill="#5fd3b4" fillOpacity="0.18" />
      <line x1="110" y1="110" x2="290" y2="110" stroke="#5fd3b4" strokeOpacity="0.2" />
      <line x1="200" y1="20" x2="200" y2="200" stroke="#5fd3b4" strokeOpacity="0.2" />
      <circle cx="252" cy="70" r="5" fill="#ff7a6b" />
      <circle cx="140" cy="150" r="4" fill="#ff7a6b" />
      <circle cx="268" cy="152" r="4" fill="#ffd166" />
      <path d="M200 88l20 8v14c0 12-8.5 22-20 27-11.5-5-20-15-20-27V96l20-8z" fill="#5fd3b4" />
      <path d="M192 112l6 6 11-12" stroke="#0f3b3a" strokeWidth="4" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
  if (kind === "web") return (
    <svg viewBox="0 0 400 220" role="img" aria-hidden="true" preserveAspectRatio="xMidYMid slice">
      <rect width="400" height="220" fill="#f6b73c" />
      <circle cx="340" cy="40" r="70" fill="#ffd77a" />
      <rect x="70" y="40" width="260" height="150" rx="10" fill="#fffaf0" />
      <rect x="70" y="40" width="260" height="26" rx="10" fill="#2b2118" />
      <rect x="70" y="56" width="260" height="10" fill="#2b2118" />
      {[88, 102, 116].map((x) => <circle key={x} cx={x} cy="53" r="4" fill="#f6b73c" />)}
      <rect x="135" y="47" width="150" height="12" rx="6" fill="#4a3a2c" />
      <path d="M145 50.5v-1.5a3 3 0 0 1 6 0v1.5" stroke="#8fe3a8" strokeWidth="1.6" fill="none" />
      <rect x="143.5" y="50.5" width="9" height="6" rx="1" fill="#8fe3a8" />
      <rect x="92" y="84" width="120" height="14" rx="4" fill="#2b2118" />
      <rect x="92" y="106" width="170" height="8" rx="4" fill="#c9b79c" />
      <rect x="92" y="120" width="140" height="8" rx="4" fill="#c9b79c" />
      <rect x="92" y="146" width="70" height="22" rx="11" fill="#f6b73c" />
      <rect x="252" y="132" width="56" height="44" rx="6" fill="#2b2118" />
      <path d="M262 146h36M262 156h24M262 166h30" stroke="#f6b73c" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
  return (
    <svg viewBox="0 0 400 220" role="img" aria-hidden="true" preserveAspectRatio="xMidYMid slice">
      <rect width="400" height="220" fill="#2e2156" />
      {[[120,70,200,110],[120,150,200,110],[200,110,285,60],[200,110,290,160],[285,60,290,160],[120,70,120,150]].map(([a,b,c,d],i) =>
        <line key={i} x1={a} y1={b} x2={c} y2={d} stroke="#b7a4ff" strokeOpacity="0.5" strokeWidth="2" />)}
      {[[120,70,10],[120,150,10],[285,60,9],[290,160,11]].map(([x,y,r],i) =>
        <circle key={i} cx={x} cy={y} r={r} fill="#b7a4ff" />)}
      <circle cx="200" cy="110" r="26" fill="#ffd166" />
      <path d="M200 96v28M186 110h28" stroke="#2e2156" strokeWidth="4" strokeLinecap="round" />
    </svg>
  );
}

function CaseCard({ p, ui, lang }) {
  const href = pathFor(lang, "project", p.slug);
  return (
    <article className={`case-card art-${p.art || "web"}`}>
      <a className="case-media" href={href} tabIndex={-1} aria-hidden="true">
        {p.image ? <img src={p.image} alt="" loading="lazy" width="400" height="220" /> : <CaseArt kind={p.art} />}
      </a>
      <div className="case-content">
        <h3><a href={href}>{p.title}</a></h3>
        <p className="case-summary">{p.summary}</p>
        {p.tags?.length > 0 && (
          <ul className="chips" aria-label={ui.stackLabel}>
            {p.tags.map((t) => <li key={t}>{t}</li>)}
          </ul>
        )}
        <p className="case-links">
          <a href={href}>{ui.details} →</a>
          {p.url && <a href={p.url} target="_blank" rel="noopener">{ui.visit} ↗</a>}
          {p.repo && <a href={p.repo} target="_blank" rel="noopener">{ui.code} ↗</a>}
        </p>
      </div>
    </article>
  );
}

function Home({ c, ui, lang, onLogin }) {
  const [first, ...rest] = c.name.split(" ");
  const wa = waLink(ui.waText);

  return (
    <main>
      <section className="hero">
        <h1 className="hero-name">
          <span>{ui.hello}</span>
          <span className="big">{first}</span>
          <span className="big indent">{rest.join(" ")}.</span>
        </h1>
        <div className="hero-side">
          <p className="lead">{c.tagline}</p>
          <div className="actions">
            <a className="btn solid" href="#projetos">{ui.seeWork}</a>
            <a className="btn wa" href={wa} target="_blank" rel="noreferrer"><ChatIcon /> {ui.whatsapp}</a>
            <a className="btn ghost" href={links.github} target="_blank" rel="noopener me">GitHub</a>
            {links.linkedin && <a className="btn ghost" href={links.linkedin} target="_blank" rel="noopener me">LinkedIn</a>}
          </div>
        </div>
      </section>

      <section className="block">
        <h2>{ui.servicesTitle}</h2>
        <div className="service-grid">
          {c.services.map((s) => (
            <article className={`service-card icon-${s.icon}`} key={s.title}>
              <span className="service-icon"><ServiceIcon name={s.icon} /></span>
              <h3>{s.title}</h3>
              <p>{s.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="block" id="projetos">
        <h2>{ui.casesTitle}</h2>
        <div className="case-grid">
          {c.cases.map((p) => <CaseCard key={p.slug} p={p} ui={ui} lang={lang} />)}
        </div>
      </section>

      <section className="block">
        <h2>{ui.latestArticles}</h2>
        <ArticleList lang={lang} ui={ui} />
        <p className="case-links"><a href={pathFor(lang, "articles")}>{ui.allArticles} →</a></p>
      </section>

      <section className="block">
        <h2>{ui.aboutTitle}</h2>
        <p className="prose">{c.about}</p>
      </section>

      <section className="block">
        <h2>{ui.skillsTitle}</h2>
        <dl className="skills">
          {c.skills.map((s) => (
            <div key={s.title}>
              <dt>{s.title}</dt>
              <dd>{s.text}</dd>
            </div>
          ))}
        </dl>
        <ul className="chips" aria-label={ui.stackLabel}>
          {stack.map((t) => <li key={t}>{t}</li>)}
        </ul>
      </section>

      <section className="block">
        <h2>{ui.likesTitle}</h2>
        <ul className="likes">
          {c.likes.map((l) => <li key={l}>{l}</li>)}
        </ul>
      </section>

      <ContactCard ui={ui} onLogin={onLogin} />

      <a className="wa-float" href={wa} target="_blank" rel="noreferrer" aria-label={ui.whatsapp}>
        <ChatIcon />
      </a>
    </main>
  );
}

function LoginDialog({ ui, onClose, onSuccess }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const firstInput = useRef(null);

  useEffect(() => {
    firstInput.current?.focus();
    const onKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  async function submit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const data = await api("/login", {
        method: "POST",
        body: JSON.stringify({ username, password }),
      });
      setToken(data.token);
      onSuccess(data.user);
    } catch (err) {
      setError(err.message || ui.serverError);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="overlay" onMouseDown={(e) => e.target === e.currentTarget && onClose()}>
      <form className="dialog" onSubmit={submit} role="dialog" aria-modal="true" aria-labelledby="login-title">
        <h2 id="login-title">{ui.privateText}</h2>
        <label>
          {ui.user}
          <input ref={firstInput} value={username} onChange={(e) => setUsername(e.target.value)} autoComplete="username" required />
        </label>
        <label>
          {ui.password}
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} autoComplete="current-password" required />
        </label>
        {error && <p className="error" role="alert">{error}</p>}
        <div className="dialog-actions">
          <button type="button" className="btn ghost" onClick={onClose}>{ui.cancel}</button>
          <button type="submit" className="btn solid" disabled={loading}>
            {loading ? ui.loggingIn : ui.login}
          </button>
        </div>
      </form>
    </div>
  );
}

function Projects({ user, ui, onExpired }) {
  const [projects, setProjects] = useState(null);
  const [status, setStatus] = useState({});
  const [error, setError] = useState("");

  useEffect(() => {
    api("/projects")
      .then(setProjects)
      .catch((e) => (e.status === 401 ? onExpired() : setError(e.message || ui.serverError)));
    api("/projects/status")
      .then((list) => setStatus(Object.fromEntries(list.map((s) => [s.id, s.online]))))
      .catch(() => {});
  }, [onExpired, ui.serverError]);

  return (
    <main className="projects">
      <div className="projects-head">
        <h1>{ui.greeting(user)}</h1>
        <p className="lead">{projects ? ui.projectCount(projects.length) : ui.loading}</p>
      </div>

      {error && <p className="error">{error}</p>}

      {projects && projects.length === 0 && (
        <p className="prose">{ui.noProjects} <code>backend/data/projects.json</code>.</p>
      )}

      {projects && projects.length > 0 && (
        <ul className="project-list">
          {projects.map((p) => {
            const s = status[p.id];
            const label = s === undefined ? ui.checking : s ? ui.online : s === false ? ui.offline : ui.noLink;
            return (
              <li key={p.id}>
                <a href={p.url} target="_blank" rel="noreferrer" className="project">
                  <span className={`dot ${s === true ? "on" : s === false ? "off" : ""}`} title={label} aria-label={label} />
                  <span className="p-main">
                    <span className="p-name">{p.name}</span>
                    <span className="p-desc">{p.description}</span>
                    {p.tags?.length > 0 && (
                      <span className="p-tags">{p.tags.map((t) => <span key={t}>{t}</span>)}</span>
                    )}
                  </span>
                  <span className="p-url">{p.url?.replace(/^https?:\/\//, "")}</span>
                </a>
              </li>
            );
          })}
        </ul>
      )}
    </main>
  );
}

function ContactCard({ ui, onLogin, title, text }) {
  return (
    <section className="contact-card" id="contacto">
      <div>
        <h2>{title || ui.contactTitle}</h2>
        <p>{text || ui.contactText}</p>
      </div>
      <div className="contact-options">
        <a className="contact-option wa-option" href={waLink(ui.waText)} target="_blank" rel="noreferrer">
          <ChatIcon />
          <span><strong>{ui.whatsapp}</strong><span>{links.whatsappDisplay}</span></span>
        </a>
        <a className="contact-option" href={`mailto:${links.email}`}>
          <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="5" width="18" height="14" rx="2" /><path d="M3 7l9 6 9-6" /></svg>
          <span><strong>Email</strong><span>{links.email}</span></span>
        </a>
        {links.calendar && (
          <a className="contact-option" href={links.calendar} target="_blank" rel="noreferrer">
            <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><rect x="3" y="5" width="18" height="16" rx="2" /><path d="M3 10h18M8 3v4M16 3v4" /></svg>
            <span><strong>{ui.bookCall}</strong></span>
          </a>
        )}
      </div>
      {onLogin && <button className="private-link" onClick={onLogin}>{ui.privateText}</button>}
    </section>
  );
}

function Crumbs({ items }) {
  return (
    <nav className="crumbs" aria-label="Breadcrumb">
      <ol>
        {items.map(([label, href], i) => (
          <li key={i}>{href ? <a href={href}>{label}</a> : <span aria-current="page">{label}</span>}</li>
        ))}
      </ol>
    </nav>
  );
}

function fmtDate(d, lang) {
  const [y, m, day] = d.split("-").map(Number);
  const months = lang === "pt"
    ? ["janeiro", "fevereiro", "março", "abril", "maio", "junho", "julho", "agosto", "setembro", "outubro", "novembro", "dezembro"]
    : ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  return lang === "pt" ? `${day} de ${months[m - 1]} de ${y}` : `${day} ${months[m - 1]} ${y}`;
}

function ArticleList({ lang, ui }) {
  return (
    <ul className="article-list">
      {sortedArticles().map((a) => (
        <li key={a.slug}>
          <a href={pathFor(lang, "article", a.slug)}>
            <strong>{a[lang].title}</strong>
            <span>{a[lang].description}</span>
            <small><time dateTime={a.date}>{fmtDate(a.date, lang)}</time> · {ui.minRead(a.minutes)}</small>
          </a>
        </li>
      ))}
    </ul>
  );
}

function ProjectPage({ p, c, ui, lang }) {
  const home = pathFor(lang, "home");
  const art = p.article && findArticle(p.article);
  const others = c.cases.filter((x) => x.slug !== p.slug).slice(0, 3);
  return (
    <main className="page">
      <Crumbs items={[[c.name, home], [ui.navProjects, `${home}#projetos`], [p.title]]} />
      <article className="detail">
        <header className="detail-head">
          <h1>{p.title}</h1>
          <p className="lead">{p.summary}</p>
          <ul className="chips" aria-label={ui.stackUsed}>
            {p.tags.map((t) => <li key={t}>{t}</li>)}
          </ul>
          {(p.url || p.repo) && (
            <p className="actions">
              {p.url && <a className="btn solid" href={p.url} target="_blank" rel="noopener">{ui.visit} ↗</a>}
              {p.repo && <a className="btn ghost" href={p.repo} target="_blank" rel="noopener">{ui.code} ↗</a>}
            </p>
          )}
        </header>
        <div className={`detail-art art-${p.art || "web"}`}>
          {p.image ? <img src={p.image} alt={p.title} width="800" height="440" /> : <CaseArt kind={p.art} />}
        </div>
        <section className="prose">
          <h2>{ui.problem}</h2>
          <p>{p.problem}</p>
          <h2>{ui.solution}</h2>
          <p>{p.solution}</p>
          <h2>{ui.result}</h2>
          <p>{p.result}</p>
        </section>
        {art && (
          <aside className="related">
            <span>{ui.relatedArticle}</span>
            <a href={pathFor(lang, "article", art.slug)}>{art[lang].title} →</a>
          </aside>
        )}
      </article>

      <section className="block">
        <h2>{ui.backToProjects}</h2>
        <div className="case-grid">
          {others.map((x) => <CaseCard key={x.slug} p={x} ui={ui} lang={lang} />)}
        </div>
      </section>

      <ContactCard ui={ui} title={ui.ctaTitle} text={ui.ctaText} />
    </main>
  );
}

function ArticlesIndex({ ui, lang, c }) {
  return (
    <main className="page">
      <Crumbs items={[[c.name, pathFor(lang, "home")], [ui.articlesTitle]]} />
      <header className="detail-head">
        <h1>{ui.articlesTitle}</h1>
        <p className="lead">{ui.articlesLead}</p>
      </header>
      <ArticleList lang={lang} ui={ui} />
    </main>
  );
}

function Block({ b }) {
  if (b.h2) return <h2>{b.h2}</h2>;
  if (b.p) return <p>{b.p}</p>;
  if (b.ul) return <ul>{b.ul.map((x) => <li key={x}>{x}</li>)}</ul>;
  if (b.ol) return <ol>{b.ol.map((x) => <li key={x}>{x}</li>)}</ol>;
  if (b.code) return <pre className={`code lang-${b.lang || "text"}`}><code>{b.code}</code></pre>;
  if (b.note) return <p className="note">{b.note}</p>;
  return null;
}

function ArticlePage({ a, ui, lang, c }) {
  const t = a[lang];
  const proj = a.project && findProject(lang, a.project);
  return (
    <main className="page">
      <Crumbs items={[[c.name, pathFor(lang, "home")], [ui.articlesTitle, pathFor(lang, "articles")], [t.title]]} />
      <article className="detail">
        <header className="detail-head">
          <h1>{t.title}</h1>
          <p className="lead">{t.description}</p>
          <p className="meta">
            {ui.published} <time dateTime={a.date}>{fmtDate(a.date, lang)}</time> · {ui.minRead(a.minutes)} · {c.name}
          </p>
        </header>
        <div className="prose article-body">
          {t.body.map((b, i) => <Block key={i} b={b} />)}
        </div>
        {proj && (
          <aside className="related">
            <span>{ui.relatedProject}</span>
            <a href={pathFor(lang, "project", proj.slug)}>{proj.title} →</a>
          </aside>
        )}
      </article>
      <ContactCard ui={ui} title={ui.ctaTitle} text={ui.ctaText} />
    </main>
  );
}

function NotFound({ ui, lang }) {
  return (
    <main className="page">
      <header className="detail-head">
        <h1>{ui.notFoundTitle}</h1>
        <p className="lead">{ui.notFoundText}</p>
        <p className="actions"><a className="btn solid" href={pathFor(lang, "home")}>{ui.notFoundLink}</a></p>
      </header>
    </main>
  );
}
