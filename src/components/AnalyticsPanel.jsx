import { useEffect, useMemo, useState } from 'react';
import { supabase } from '../lib/supabase';

const RANGES = [
  { key: '7', label: 'Últimos 7 dias', days: 7 },
  { key: '30', label: 'Últimos 30 dias', days: 30 },
  { key: '90', label: 'Últimos 90 dias', days: 90 },
  { key: 'all', label: 'Todo o período', days: null }
];

function sinceISO(days) {
  if (!days) return null;
  const d = new Date();
  d.setDate(d.getDate() - days);
  return d.toISOString();
}

function formatDuration(seconds) {
  if (!seconds || seconds <= 0) return '0s';
  if (seconds < 60) return `${seconds}s`;
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  if (m < 60) return `${m}m ${s}s`;
  const h = Math.floor(m / 60);
  return `${h}h ${m % 60}m`;
}

export default function AnalyticsPanel() {
  const [range, setRange] = useState('30');
  const [events, setEvents] = useState([]);
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let cancelled = false;
    (async () => {
      setLoading(true);
      setError('');
      const since = sinceISO(RANGES.find(r => r.key === range)?.days);

      const [ev, ar] = await Promise.all([
        (async () => {
          let q = supabase.from('analytics_events').select('*').order('created_at', { ascending: false });
          if (since) q = q.gte('created_at', since);
          return q.limit(5000);
        })(),
        supabase.from('news').select('id, title')
      ]);
      if (cancelled) return;
      if (ev.error) setError(ev.error.message);
      else setEvents(ev.data || []);
      if (!ar.error) setArticles(ar.data || []);
      setLoading(false);
    })();
    return () => { cancelled = true; };
  }, [range]);

  const metrics = useMemo(() => {
    const totalPageviews = events.length;
    const sessions = new Set(events.map(e => e.session_id));
    const uniqueVisitors = sessions.size;
    const totalDuration = events.reduce((acc, e) => acc + (e.duration_seconds || 0), 0);
    const avgSession = uniqueVisitors > 0 ? Math.round(totalDuration / uniqueVisitors) : 0;

    // Per-article
    const articleTitleById = new Map(articles.map(a => [a.id, a.title]));
    const byArticle = new Map();
    for (const e of events) {
      if (!e.article_id) continue;
      const row = byArticle.get(e.article_id) || {
        articleId: e.article_id,
        title: articleTitleById.get(e.article_id) || `Notícia #${e.article_id}`,
        views: 0,
        reads: 0,
        totalSeconds: 0
      };
      row.views += 1;
      if (e.read_flag) row.reads += 1;
      row.totalSeconds += (e.duration_seconds || 0);
      byArticle.set(e.article_id, row);
    }
    const articleRows = Array.from(byArticle.values())
      .map(r => ({ ...r, avgSeconds: r.views ? Math.round(r.totalSeconds / r.views) : 0, readRate: r.views ? Math.round((r.reads / r.views) * 100) : 0 }))
      .sort((a, b) => b.views - a.views);

    // Per-path (non-article)
    const byPath = new Map();
    for (const e of events) {
      if (e.article_id) continue;
      const key = e.path || '(sem path)';
      byPath.set(key, (byPath.get(key) || 0) + 1);
    }
    const pathRows = Array.from(byPath.entries())
      .map(([path, views]) => ({ path, views }))
      .sort((a, b) => b.views - a.views);

    return { totalPageviews, uniqueVisitors, avgSession, articleRows, pathRows };
  }, [events, articles]);

  return (
    <div style={styles.wrap}>
      <div style={styles.headerRow}>
        <h2 style={styles.h2}>Estatísticas</h2>
        <select value={range} onChange={(e) => setRange(e.target.value)} style={styles.select}>
          {RANGES.map(r => <option key={r.key} value={r.key}>{r.label}</option>)}
        </select>
      </div>

      {loading && <p style={styles.muted}>Carregando...</p>}
      {error && <div style={styles.error}>Erro: {error}</div>}

      {!loading && !error && (
        <>
          <div style={styles.kpiRow}>
            <Kpi label="Visitantes únicos" value={metrics.uniqueVisitors} />
            <Kpi label="Total de pageviews" value={metrics.totalPageviews} />
            <Kpi label="Tempo médio de sessão" value={formatDuration(metrics.avgSession)} />
            <Kpi label="Notícias lidas" value={metrics.articleRows.reduce((a, r) => a + r.reads, 0)} />
          </div>

          <section style={styles.section}>
            <h3 style={styles.h3}>Desempenho por notícia</h3>
            {metrics.articleRows.length === 0 ? (
              <p style={styles.muted}>Nenhuma visualização de notícia no período.</p>
            ) : (
              <div style={{ overflowX: 'auto' }}>
                <table style={styles.table}>
                  <thead>
                    <tr>
                      <th style={styles.th}>Notícia</th>
                      <th style={styles.thNum}>Views</th>
                      <th style={styles.thNum}>Leituras</th>
                      <th style={styles.thNum}>Taxa de leitura</th>
                      <th style={styles.thNum}>Tempo médio</th>
                    </tr>
                  </thead>
                  <tbody>
                    {metrics.articleRows.map(r => (
                      <tr key={r.articleId}>
                        <td style={styles.td}>{r.title}</td>
                        <td style={styles.tdNum}>{r.views}</td>
                        <td style={styles.tdNum}>{r.reads}</td>
                        <td style={styles.tdNum}>
                          <ReadBar pct={r.readRate} />
                        </td>
                        <td style={styles.tdNum}>{formatDuration(r.avgSeconds)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </section>

          <section style={styles.section}>
            <h3 style={styles.h3}>Páginas mais visitadas</h3>
            {metrics.pathRows.length === 0 ? (
              <p style={styles.muted}>Nenhuma visita registrada.</p>
            ) : (
              <table style={styles.table}>
                <thead>
                  <tr>
                    <th style={styles.th}>Caminho</th>
                    <th style={styles.thNum}>Views</th>
                  </tr>
                </thead>
                <tbody>
                  {metrics.pathRows.map(r => (
                    <tr key={r.path}>
                      <td style={styles.td}><code>{r.path}</code></td>
                      <td style={styles.tdNum}>{r.views}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </section>

          <p style={styles.footnote}>
            Métricas calculadas sobre até 5.000 eventos mais recentes. &quot;Leituras&quot; = usuário passou pelo menos {20}s na página e rolou ≥ {60}% do conteúdo.
          </p>
        </>
      )}
    </div>
  );
}

function Kpi({ label, value }) {
  return (
    <div style={styles.kpi}>
      <div style={styles.kpiLabel}>{label}</div>
      <div style={styles.kpiValue}>{value}</div>
    </div>
  );
}

function ReadBar({ pct }) {
  return (
    <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
      <div style={{ width: 80, height: 6, background: '#eee', borderRadius: 3, overflow: 'hidden' }}>
        <div style={{ width: `${pct}%`, height: '100%', background: pct >= 50 ? '#1e874b' : pct >= 20 ? '#c8a86b' : '#c0392b' }} />
      </div>
      <span style={{ fontSize: 12, color: '#666', minWidth: 32, textAlign: 'right' }}>{pct}%</span>
    </div>
  );
}

const styles = {
  wrap: { background: '#fff', padding: 28, borderRadius: 12, boxShadow: '0 4px 20px rgba(0,0,0,0.06)' },
  headerRow: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24, flexWrap: 'wrap', gap: 12 },
  h2: { fontFamily: 'var(--font-heading)', fontSize: '1.4rem', margin: 0 },
  h3: { fontFamily: 'var(--font-heading)', fontSize: '1.05rem', margin: '0 0 14px' },
  select: { padding: '8px 12px', border: '1px solid #ddd', borderRadius: 8, fontSize: '0.9rem', background: '#fff' },
  kpiRow: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 14, marginBottom: 28 },
  kpi: { background: '#fafafa', border: '1px solid #eee', borderRadius: 10, padding: 16 },
  kpiLabel: { fontSize: 12, color: '#888', textTransform: 'uppercase', letterSpacing: 0.5 },
  kpiValue: { fontFamily: 'var(--font-heading)', fontSize: '1.8rem', fontWeight: 700, color: '#111', marginTop: 4 },
  section: { marginBottom: 28 },
  table: { width: '100%', borderCollapse: 'collapse', fontSize: '0.88rem' },
  th: { textAlign: 'left', padding: '10px 12px', borderBottom: '2px solid #eee', color: '#666', fontWeight: 600, fontSize: 12, textTransform: 'uppercase', letterSpacing: 0.5 },
  thNum: { textAlign: 'right', padding: '10px 12px', borderBottom: '2px solid #eee', color: '#666', fontWeight: 600, fontSize: 12, textTransform: 'uppercase', letterSpacing: 0.5 },
  td: { padding: '10px 12px', borderBottom: '1px solid #f2f2f2' },
  tdNum: { padding: '10px 12px', borderBottom: '1px solid #f2f2f2', textAlign: 'right', fontVariantNumeric: 'tabular-nums' },
  muted: { color: '#888', fontSize: '0.9rem' },
  error: { padding: '10px 12px', background: 'rgba(231,76,60,0.1)', color: '#c0392b', border: '1px solid rgba(231,76,60,0.3)', borderRadius: 8, fontSize: '0.85rem' },
  footnote: { fontSize: 12, color: '#888', marginTop: 20 }
};
