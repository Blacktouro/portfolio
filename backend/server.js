import express from "express";
import jwt from "jsonwebtoken";
import crypto from "node:crypto";
import fs from "node:fs/promises";

const {
  ADMIN_USER,
  ADMIN_PASSWORD,
  JWT_SECRET,
  SESSION_HOURS = "12",
} = process.env;

if (!ADMIN_USER || !ADMIN_PASSWORD || !JWT_SECRET) {
  console.error("Falta ADMIN_USER, ADMIN_PASSWORD ou JWT_SECRET no .env");
  process.exit(1);
}

const PROJECTS_FILE = "/app/data/projects.json";
const BOARDS_FILE = "/app/storage/whiteboards.json"; // pasta com escrita (ver docker-compose.yml)
const MAX_BOARDS = 200;
const app = express();
app.use(express.json({ limit: "10kb" }));

// Compara strings sem revelar o tamanho/tempo
function safeEqual(a, b) {
  const ha = crypto.createHash("sha256").update(String(a)).digest();
  const hb = crypto.createHash("sha256").update(String(b)).digest();
  return crypto.timingSafeEqual(ha, hb);
}

// Proteção simples contra força bruta: 5 tentativas falhadas -> 15 min bloqueado
const attempts = new Map();
const MAX_TRIES = 5;
const LOCK_MS = 15 * 60 * 1000;

function clientIp(req) {
  return req.headers["x-real-ip"] || req.socket.remoteAddress || "unknown";
}

app.post("/login", (req, res) => {
  const ip = clientIp(req);
  const rec = attempts.get(ip);
  if (rec && rec.until > Date.now()) {
    const min = Math.ceil((rec.until - Date.now()) / 60000);
    return res.status(429).json({ error: `Demasiadas tentativas. Tenta outra vez daqui a ${min} min.` });
  }

  const { username = "", password = "" } = req.body || {};
  const ok = safeEqual(username, ADMIN_USER) && safeEqual(password, ADMIN_PASSWORD);

  if (!ok) {
    const count = (rec && rec.until <= Date.now() ? 0 : rec?.count || 0) + 1;
    attempts.set(ip, { count, until: count >= MAX_TRIES ? Date.now() + LOCK_MS : 0 });
    return res.status(401).json({ error: "Utilizador ou password errados." });
  }

  attempts.delete(ip);
  const token = jwt.sign({ sub: ADMIN_USER }, JWT_SECRET, {
    expiresIn: `${Number(SESSION_HOURS) || 12}h`,
  });
  res.json({ token, user: ADMIN_USER });
});

function requireAuth(req, res, next) {
  const header = req.headers.authorization || "";
  const token = header.startsWith("Bearer ") ? header.slice(7) : null;
  if (!token) return res.status(401).json({ error: "Sessão em falta." });
  try {
    req.user = jwt.verify(token, JWT_SECRET);
    next();
  } catch {
    res.status(401).json({ error: "Sessão expirada. Entra outra vez." });
  }
}

async function readProjects() {
  const raw = await fs.readFile(PROJECTS_FILE, "utf8");
  return JSON.parse(raw);
}

app.get("/me", requireAuth, (req, res) => res.json({ user: req.user.sub }));

app.get("/projects", requireAuth, async (_req, res) => {
  try {
    res.json(await readProjects());
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Não consegui ler backend/data/projects.json." });
  }
});

// Verifica se cada projeto está a responder
app.get("/projects/status", requireAuth, async (_req, res) => {
  try {
    const projects = await readProjects();
    const results = await Promise.all(
      projects.map(async (p) => {
        const target = p.healthUrl || p.url;
        if (!target) return { id: p.id, online: null };
        try {
          const r = await fetch(target, {
            method: "GET",
            redirect: "follow",
            signal: AbortSignal.timeout(4000),
          });
          return { id: p.id, online: r.status < 500 };
        } catch {
          return { id: p.id, online: false };
        }
      })
    );
    res.json(results);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Não consegui verificar os projetos." });
  }
});

/* ---------- Whiteboards (só no painel privado) ---------- */

async function readBoards() {
  try {
    return JSON.parse(await fs.readFile(BOARDS_FILE, "utf8"));
  } catch (e) {
    if (e.code === "ENOENT") return [];
    throw e;
  }
}

async function writeBoards(list) {
  const tmp = `${BOARDS_FILE}.tmp`;
  await fs.writeFile(tmp, JSON.stringify(list, null, 2));
  await fs.rename(tmp, BOARDS_FILE); // escreve primeiro num ficheiro temporário para nunca ficar meio gravado
}

function cleanBoard(body) {
  const title = String(body?.title || "").trim().slice(0, 80);
  const note = String(body?.note || "").trim().slice(0, 200);
  let url;
  try {
    url = new URL(String(body?.url || "").trim());
  } catch {
    return { error: "O link não é válido." };
  }
  if (url.protocol !== "https:") return { error: "O link tem de começar por https://" };
  if (!title) return { error: "Falta o título." };
  return { title, note, url: url.toString() };
}

app.get("/whiteboards", requireAuth, async (_req, res) => {
  try {
    res.json(await readBoards());
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Não consegui ler os whiteboards." });
  }
});

app.post("/whiteboards", requireAuth, async (req, res) => {
  const b = cleanBoard(req.body);
  if (b.error) return res.status(400).json({ error: b.error });
  try {
    const list = await readBoards();
    if (list.length >= MAX_BOARDS) return res.status(400).json({ error: `Máximo de ${MAX_BOARDS} whiteboards.` });
    const item = { id: crypto.randomUUID(), ...b, added: new Date().toISOString() };
    list.unshift(item);
    await writeBoards(list);
    res.status(201).json(item);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Não consegui guardar. A pasta backend/storage tem permissões de escrita?" });
  }
});

app.delete("/whiteboards/:id", requireAuth, async (req, res) => {
  try {
    const list = await readBoards();
    const next = list.filter((b) => b.id !== req.params.id);
    if (next.length === list.length) return res.status(404).json({ error: "Whiteboard não encontrado." });
    await writeBoards(next);
    res.json({ ok: true });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Não consegui apagar." });
  }
});

app.get("/health", (_req, res) => res.json({ ok: true }));

app.listen(3000, () => console.log("Backend a correr na porta 3000"));
