import { useEffect, useState } from "react";
import "./outreach.css";

// Painel privado: emails enviados a potenciais clientes,
// se responderam, que valor foi proposto e se aceitaram.

const today = () => new Date().toISOString().slice(0, 10);
const EMPTY = { business: "", email: "", sentAt: today(), subject: "", notes: "" };
const FOLLOW_UP_DAYS = 5;

const euro = (n) =>
  new Intl.NumberFormat("pt-PT", { style: "currency", currency: "EUR", maximumFractionDigits: 2 }).format(n || 0);

function daysSince(date) {
  if (!date) return 0;
  return Math.floor((Date.now() - new Date(date + "T00:00:00").getTime()) / 86400000);
}

function fmtDate(d) {
  if (!d) return "";
  const [y, m, day] = d.split("-");
  return `${day}/${m}/${y}`;
}

export default function Outreach({ api, onExpired }) {
  const [list, setList] = useState(null);
  const [error, setError] = useState("");
  const [form, setForm] = useState(EMPTY);
  const [adding, setAdding] = useState(false);
  const [saving, setSaving] = useState(false);
  const [filter, setFilter] = useState("todos");

  function fail(e) {
    if (e.status === 401) onExpired();
    else setError(e.message || "Erro no servidor.");
  }

  useEffect(() => {
    api("/outreach").then(setList).catch(fail);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function add(e) {
    e.preventDefault();
    setSaving(true);
    setError("");
    try {
      const created = await api("/outreach", { method: "POST", body: JSON.stringify(form) });
      setList((l) => [...(l || []), created]);
      setForm({ ...EMPTY, sentAt: form.sentAt, subject: form.subject });
      setAdding(false);
    } catch (err) {
      fail(err);
    } finally {
      setSaving(false);
    }
  }

  async function update(id, patch) {
    setList((l) => l.map((x) => (x.id === id ? { ...x, ...patch } : x)));
    try {
      const saved = await api(`/outreach/${id}`, { method: "PUT", body: JSON.stringify(patch) });
      setList((l) => l.map((x) => (x.id === id ? saved : x)));
    } catch (err) {
      fail(err);
      api("/outreach").then(setList).catch(() => {});
    }
  }

  async function remove(item) {
    if (!window.confirm(`Apagar o contacto "${item.business}"?`)) return;
    try {
      await api(`/outreach/${item.id}`, { method: "DELETE" });
      setList((l) => l.filter((x) => x.id !== item.id));
    } catch (err) {
      fail(err);
    }
  }

  const items = list || [];
  const replied = items.filter((x) => x.replied);
  const quoted = items.filter((x) => x.amount != null);
  const accepted = items.filter((x) => x.accepted === "sim");
  const acceptedTotal = accepted.reduce((s, x) => s + (x.amount || 0), 0);
  const rate = items.length ? Math.round((replied.length / items.length) * 100) : 0;

  const filters = {
    todos: ["Todos", () => true],
    semResposta: ["Sem resposta", (x) => !x.replied],
    respondeu: ["Respondeu, a decidir", (x) => x.replied && x.accepted === "pendente"],
    aceite: ["Aceites", (x) => x.accepted === "sim"],
    recusado: ["Recusados", (x) => x.accepted === "nao"],
  };
  const shown = [...items]
    .filter(filters[filter][1])
    .sort((a, b) => (b.sentAt || "").localeCompare(a.sentAt || ""));

  return (
    <section className="outreach" aria-labelledby="outreach-title">
      <div className="outreach-head">
        <h2 id="outreach-title">Emails enviados</h2>
        <button className="btn solid" onClick={() => setAdding((v) => !v)}>
          {adding ? "Fechar" : "+ Novo email"}
        </button>
      </div>

      {list && (
        <dl className="o-stats">
          <div><dt>Enviados</dt><dd>{items.length}</dd></div>
          <div><dt>Responderam</dt><dd>{replied.length} <small>({rate}%)</small></dd></div>
          <div><dt>Com proposta</dt><dd>{quoted.length}</dd></div>
          <div><dt>Aceites</dt><dd>{accepted.length}</dd></div>
          <div><dt>Valor aceite</dt><dd>{euro(acceptedTotal)}</dd></div>
        </dl>
      )}

      {adding && (
        <form className="o-form" onSubmit={add}>
          <label>Empresa
            <input value={form.business} onChange={(e) => setForm({ ...form, business: e.target.value })} required autoFocus />
          </label>
          <label>Email
            <input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
          </label>
          <label>Enviado em
            <input type="date" value={form.sentAt} onChange={(e) => setForm({ ...form, sentAt: e.target.value })} required />
          </label>
          <label>Assunto / versão
            <input value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })} placeholder="ex.: Curto e direto" />
          </label>
          <label className="wide">Notas
            <input value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} placeholder="ex.: escola de surf em Baleal" />
          </label>
          <div className="wide o-form-actions">
            <button type="submit" className="btn solid" disabled={saving}>{saving ? "A guardar…" : "Guardar"}</button>
          </div>
        </form>
      )}

      {error && <p className="error" role="alert">{error}</p>}
      {!list && !error && <p className="lead">A carregar…</p>}

      {list && items.length > 0 && (
        <div className="o-filters" role="group" aria-label="Filtrar">
          {Object.keys(filters).map((f) => (
            <button key={f} aria-pressed={filter === f} className={`o-chip ${filter === f ? "active" : ""}`} onClick={() => setFilter(f)}>
              {filters[f][0]}
            </button>
          ))}
        </div>
      )}

      {list && items.length === 0 && !adding && (
        <p className="prose o-empty">Ainda não registaste nenhum email. Carrega em “+ Novo email”.</p>
      )}

      <ul className="o-list">
        {shown.map((x) => {
          const late = !x.replied && daysSince(x.sentAt) >= FOLLOW_UP_DAYS;
          return (
            <li key={x.id} className={`o-item ${x.accepted === "sim" ? "won" : ""} ${x.accepted === "nao" ? "lost" : ""}`}>
              <div className="o-main">
                <strong className="o-name">{x.business}</strong>
                <span className="o-meta">
                  {x.email && <a href={`mailto:${x.email}`}>{x.email}</a>}
                  <span>Enviado {fmtDate(x.sentAt)} · {daysSince(x.sentAt) === 0 ? "hoje" : daysSince(x.sentAt) === 1 ? "ontem" : `há ${daysSince(x.sentAt)} dias`}</span>
                  {x.subject && <span>“{x.subject}”</span>}
                </span>
                {late && <span className="o-flag">Sem resposta há {daysSince(x.sentAt)} dias — fazer follow-up</span>}
                <input
                  className="o-notes"
                  defaultValue={x.notes}
                  placeholder="Notas…"
                  aria-label={`Notas de ${x.business}`}
                  onBlur={(e) => e.target.value !== x.notes && update(x.id, { notes: e.target.value })}
                />
              </div>

              <div className="o-controls">
                <label className="o-check">
                  <input type="checkbox" checked={!!x.replied} onChange={(e) => update(x.id, { replied: e.target.checked })} />
                  Respondeu
                </label>
                <label className="o-field">
                  Valor (€)
                  <input
                    type="number"
                    min="0"
                    step="0.01"
                    inputMode="decimal"
                    defaultValue={x.amount ?? ""}
                    key={`a-${x.id}-${x.amount}`}
                    onBlur={(e) => {
                      const v = e.target.value === "" ? null : Number(e.target.value);
                      if (v !== x.amount) update(x.id, { amount: v });
                    }}
                  />
                </label>
                <label className="o-field">
                  Aceitou?
                  <select value={x.accepted} onChange={(e) => update(x.id, { accepted: e.target.value })}>
                    <option value="pendente">Pendente</option>
                    <option value="sim">Sim</option>
                    <option value="nao">Não</option>
                  </select>
                </label>
                <button className="o-delete" onClick={() => remove(x)} aria-label={`Apagar ${x.business}`} title="Apagar">×</button>
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
