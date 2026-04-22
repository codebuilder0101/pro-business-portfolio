import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { useAuth } from '../hooks/useAuth';

const EMPTY_FORM = {
  title: '',
  summary: '',
  category: '',
  icon: 'fas fa-newspaper',
  read_time: '5 min de leitura',
  content: ''
};

export default function Admin() {
  const navigate = useNavigate();
  const { session, signOut, changePassword } = useAuth();
  const [posts, setPosts] = useState([]);
  const [fetching, setFetching] = useState(true);
  const [form, setForm] = useState(EMPTY_FORM);
  const [editingId, setEditingId] = useState(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  // Password change state
  const [showPwForm, setShowPwForm] = useState(false);
  const [oldPw, setOldPw] = useState('');
  const [newPw, setNewPw] = useState('');
  const [newPw2, setNewPw2] = useState('');
  const [pwSaving, setPwSaving] = useState(false);
  const [pwMessage, setPwMessage] = useState('');
  const [pwError, setPwError] = useState('');

  useEffect(() => {
    if (!session) navigate('/admin/login', { replace: true });
  }, [session, navigate]);

  useEffect(() => {
    if (session) loadPosts();
  }, [session]);

  async function loadPosts() {
    setFetching(true);
    const { data, error } = await supabase
      .from('news')
      .select('*')
      .order('created_at', { ascending: false });
    if (error) setError(error.message);
    else setPosts(data || []);
    setFetching(false);
  }

  function startEdit(post) {
    setEditingId(post.id);
    setForm({
      title: post.title || '',
      summary: post.summary || '',
      category: post.category || '',
      icon: post.icon || 'fas fa-newspaper',
      read_time: post.read_time || '',
      content: post.content || ''
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function cancelEdit() {
    setEditingId(null);
    setForm(EMPTY_FORM);
    setError('');
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    setSaving(true);
    const payload = { ...form };
    let result;
    if (editingId) {
      result = await supabase.from('news').update(payload).eq('id', editingId).select();
    } else {
      result = await supabase.from('news').insert(payload).select();
    }
    setSaving(false);
    if (result.error) {
      setError(result.error.message);
      return;
    }
    cancelEdit();
    loadPosts();
  }

  async function handleDelete(id) {
    if (!window.confirm('Tem certeza que deseja excluir esta notícia?')) return;
    const { error } = await supabase.from('news').delete().eq('id', id);
    if (error) {
      setError(error.message);
      return;
    }
    loadPosts();
  }

  function handleLogout() {
    signOut();
    navigate('/admin/login', { replace: true });
  }

  async function handleChangePassword(e) {
    e.preventDefault();
    setPwError('');
    setPwMessage('');
    if (newPw !== newPw2) {
      setPwError('As senhas não coincidem.');
      return;
    }
    if (newPw.length < 6) {
      setPwError('A nova senha deve ter ao menos 6 caracteres.');
      return;
    }
    setPwSaving(true);
    const { error, ok } = await changePassword(oldPw, newPw);
    setPwSaving(false);
    if (error) {
      setPwError(error.message);
      return;
    }
    if (ok) {
      setPwMessage('Senha alterada com sucesso.');
      setOldPw(''); setNewPw(''); setNewPw2('');
      setTimeout(() => { setShowPwForm(false); setPwMessage(''); }, 2000);
    }
  }

  if (!session) return null;

  return (
    <div style={styles.page}>
      <div style={styles.topbar}>
        <div>
          <h1 style={styles.h1}>Painel de Notícias</h1>
          <p style={styles.muted}>Logado como {session.email}</p>
        </div>
        <div style={{ display: 'flex', gap: 10 }}>
          <button onClick={() => { setShowPwForm(!showPwForm); setPwError(''); setPwMessage(''); }} style={styles.secondary}>
            {showPwForm ? 'Fechar' : 'Alterar Senha'}
          </button>
          <button onClick={handleLogout} style={styles.logout}>Sair</button>
        </div>
      </div>

      {showPwForm && (
        <div style={styles.pwCard}>
          <h2 style={styles.h2}>Alterar Senha</h2>
          <form onSubmit={handleChangePassword}>
            <label style={styles.label}>Senha atual</label>
            <input type="password" value={oldPw} onChange={(e) => setOldPw(e.target.value)} required style={styles.input} autoComplete="current-password" />
            <label style={styles.label}>Nova senha</label>
            <input type="password" value={newPw} onChange={(e) => setNewPw(e.target.value)} required style={styles.input} autoComplete="new-password" />
            <label style={styles.label}>Confirmar nova senha</label>
            <input type="password" value={newPw2} onChange={(e) => setNewPw2(e.target.value)} required style={styles.input} autoComplete="new-password" />
            {pwError && <div style={styles.error}>{pwError}</div>}
            {pwMessage && <div style={styles.success}>{pwMessage}</div>}
            <div style={styles.formActions}>
              <button type="submit" disabled={pwSaving} style={styles.primary}>
                {pwSaving ? 'Salvando...' : 'Salvar nova senha'}
              </button>
            </div>
          </form>
        </div>
      )}

      <div style={styles.grid}>
        <div style={styles.formCard}>
          <h2 style={styles.h2}>{editingId ? 'Editar Notícia' : 'Nova Notícia'}</h2>
          <form onSubmit={handleSubmit}>
            <label style={styles.label}>Título</label>
            <input type="text" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} required style={styles.input} />

            <label style={styles.label}>Resumo</label>
            <textarea value={form.summary} onChange={(e) => setForm({ ...form, summary: e.target.value })} rows="3" style={styles.textarea} />

            <label style={styles.label}>Categoria</label>
            <input type="text" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} style={styles.input} />

            <label style={styles.label}>Ícone (Font Awesome class)</label>
            <input type="text" value={form.icon} onChange={(e) => setForm({ ...form, icon: e.target.value })} style={styles.input} placeholder="fas fa-newspaper" />

            <label style={styles.label}>Tempo de leitura</label>
            <input type="text" value={form.read_time} onChange={(e) => setForm({ ...form, read_time: e.target.value })} style={styles.input} placeholder="5 min de leitura" />

            <label style={styles.label}>Conteúdo</label>
            <textarea value={form.content} onChange={(e) => setForm({ ...form, content: e.target.value })} rows="8" style={styles.textarea} />

            {error && <div style={styles.error}>{error}</div>}

            <div style={styles.formActions}>
              <button type="submit" disabled={saving} style={styles.primary}>
                {saving ? 'Salvando...' : editingId ? 'Atualizar' : 'Publicar'}
              </button>
              {editingId && (
                <button type="button" onClick={cancelEdit} style={styles.secondary}>Cancelar</button>
              )}
            </div>
          </form>
        </div>

        <div style={styles.listCard}>
          <h2 style={styles.h2}>Notícias ({posts.length})</h2>
          {fetching ? (
            <p style={styles.muted}>Carregando...</p>
          ) : posts.length === 0 ? (
            <p style={styles.muted}>Nenhuma notícia ainda.</p>
          ) : (
            <ul style={styles.list}>
              {posts.map((post) => (
                <li key={post.id} style={styles.listItem}>
                  <div style={{ flex: 1 }}>
                    <div style={styles.itemTitle}>{post.title}</div>
                    <div style={styles.itemMeta}>
                      {post.category && <span style={styles.badge}>{post.category}</span>}
                      <span style={styles.muted}>{new Date(post.created_at).toLocaleDateString('pt-BR')}</span>
                    </div>
                    {post.summary && <div style={styles.itemSummary}>{post.summary}</div>}
                  </div>
                  <div style={styles.itemActions}>
                    <button onClick={() => startEdit(post)} style={styles.iconBtn} title="Editar">
                      <i className="fas fa-edit"></i>
                    </button>
                    <button onClick={() => handleDelete(post.id)} style={{ ...styles.iconBtn, color: '#c0392b' }} title="Excluir">
                      <i className="fas fa-trash"></i>
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}

const styles = {
  page: { maxWidth: 1280, margin: '0 auto', padding: '40px 20px', fontFamily: 'var(--font-body)' },
  topbar: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 30, flexWrap: 'wrap', gap: 16 },
  h1: { fontFamily: 'var(--font-heading)', fontSize: '2rem', margin: 0 },
  h2: { fontFamily: 'var(--font-heading)', fontSize: '1.3rem', marginTop: 0, marginBottom: 20 },
  muted: { color: '#888', fontSize: '0.85rem', margin: '4px 0' },
  logout: { padding: '10px 18px', background: 'transparent', border: '1px solid #ccc', borderRadius: 8, cursor: 'pointer', fontSize: '0.9rem' },
  pwCard: { background: '#fff', padding: 28, borderRadius: 12, boxShadow: '0 4px 20px rgba(0,0,0,0.06)', marginBottom: 24, maxWidth: 520 },
  grid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 30, alignItems: 'start' },
  formCard: { background: '#fff', padding: 28, borderRadius: 12, boxShadow: '0 4px 20px rgba(0,0,0,0.06)' },
  listCard: { background: '#fff', padding: 28, borderRadius: 12, boxShadow: '0 4px 20px rgba(0,0,0,0.06)' },
  label: { display: 'block', fontSize: '0.85rem', fontWeight: 600, marginTop: 14, marginBottom: 6 },
  input: { width: '100%', padding: '10px 12px', border: '1px solid #ddd', borderRadius: 8, fontSize: '0.9rem', boxSizing: 'border-box' },
  textarea: { width: '100%', padding: '10px 12px', border: '1px solid #ddd', borderRadius: 8, fontSize: '0.9rem', boxSizing: 'border-box', fontFamily: 'inherit', resize: 'vertical' },
  error: { marginTop: 14, padding: '10px 12px', background: 'rgba(231,76,60,0.1)', color: '#c0392b', border: '1px solid rgba(231,76,60,0.3)', borderRadius: 8, fontSize: '0.85rem' },
  success: { marginTop: 14, padding: '10px 12px', background: 'rgba(39,174,96,0.1)', color: '#1e874b', border: '1px solid rgba(39,174,96,0.3)', borderRadius: 8, fontSize: '0.85rem' },
  formActions: { marginTop: 20, display: 'flex', gap: 10 },
  primary: { padding: '12px 24px', background: 'var(--color-gold, #c8a86b)', color: '#111', border: 'none', borderRadius: 8, fontWeight: 700, cursor: 'pointer' },
  secondary: { padding: '10px 18px', background: 'transparent', border: '1px solid #ccc', borderRadius: 8, cursor: 'pointer', fontSize: '0.9rem' },
  list: { listStyle: 'none', padding: 0, margin: 0 },
  listItem: { display: 'flex', gap: 16, padding: '16px 0', borderBottom: '1px solid #eee', alignItems: 'flex-start' },
  itemTitle: { fontWeight: 600, marginBottom: 6 },
  itemMeta: { display: 'flex', gap: 10, alignItems: 'center', marginBottom: 6, flexWrap: 'wrap' },
  badge: { background: 'var(--color-gold, #c8a86b)', color: '#111', padding: '2px 8px', borderRadius: 4, fontSize: '0.75rem', fontWeight: 600 },
  itemSummary: { color: '#666', fontSize: '0.85rem', lineHeight: 1.5 },
  itemActions: { display: 'flex', gap: 6, flexShrink: 0 },
  iconBtn: { background: 'transparent', border: '1px solid #ddd', borderRadius: 6, padding: '8px 10px', cursor: 'pointer', fontSize: '0.9rem' }
};
