import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

export default function AdminLogin() {
  const navigate = useNavigate();
  const { session, signIn } = useAuth();
  const [email, setEmail] = useState(import.meta.env.VITE_ADMIN_EMAIL || '');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => { window.scrollTo(0, 0); }, []);

  useEffect(() => {
    if (session) navigate('/admin', { replace: true });
  }, [session, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSubmitting(true);
    const { error } = await signIn(email, password);
    setSubmitting(false);
    if (error) {
      setError(error.message || 'Erro ao entrar');
      return;
    }
    navigate('/admin', { replace: true });
  };

  return (
    <div style={styles.wrap}>
      <div style={styles.card}>
        <h1 style={styles.title}>Admin Login</h1>
        <p style={styles.subtitle}>Acesso restrito ao painel de notícias.</p>
        <form onSubmit={handleSubmit}>
          <label style={styles.label}>E-mail</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={styles.input}
            autoComplete="email"
          />
          <label style={styles.label}>Senha</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={styles.input}
            autoComplete="current-password"
          />
          {error && <div style={styles.error}>{error}</div>}
          <button type="submit" disabled={submitting} style={styles.button}>
            {submitting ? 'Entrando...' : 'Entrar'}
          </button>
        </form>
      </div>
    </div>
  );
}

const styles = {
  wrap: { minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--color-dark, #0f1222)', padding: 20 },
  card: { width: '100%', maxWidth: 420, background: '#fff', padding: 36, borderRadius: 14, boxShadow: '0 20px 60px rgba(0,0,0,0.4)' },
  title: { fontFamily: 'var(--font-heading)', fontSize: '1.8rem', margin: 0, marginBottom: 6 },
  subtitle: { color: '#666', fontSize: '0.9rem', marginTop: 0, marginBottom: 24 },
  label: { display: 'block', fontSize: '0.85rem', fontWeight: 600, color: '#333', marginTop: 14, marginBottom: 6 },
  input: { width: '100%', padding: '12px 14px', border: '1px solid #ddd', borderRadius: 8, fontSize: '0.95rem', boxSizing: 'border-box' },
  error: { marginTop: 14, padding: '10px 12px', background: 'rgba(231,76,60,0.1)', color: '#c0392b', border: '1px solid rgba(231,76,60,0.3)', borderRadius: 8, fontSize: '0.85rem' },
  button: { width: '100%', marginTop: 20, padding: '14px', background: 'var(--color-gold, #c8a86b)', color: '#111', border: 'none', borderRadius: 8, fontSize: '1rem', fontWeight: 700, cursor: 'pointer' }
};
