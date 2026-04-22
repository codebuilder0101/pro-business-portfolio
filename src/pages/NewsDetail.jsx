import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import PageHero from '../components/PageHero';
import CTASection from '../components/CTASection';
import blogCardImg from '../assets/logo.png';

function formatDate(iso) {
  if (!iso) return '';
  try {
    return new Date(iso).toLocaleDateString('pt-BR', { day: '2-digit', month: 'short', year: 'numeric' });
  } catch {
    return iso;
  }
}

export default function NewsDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => { window.scrollTo(0, 0); }, [id]);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      setLoading(true);
      setError('');
      const { data, error } = await supabase
        .from('news')
        .select('*')
        .eq('id', id)
        .maybeSingle();
      if (cancelled) return;
      if (error) setError(error.message);
      else setPost(data);
      setLoading(false);
    })();
    return () => { cancelled = true; };
  }, [id]);

  return (
    <div>
      <PageHero
        title="Notícia do"
        titleGold="Mercado"
        description={post?.title || ''}
        breadcrumb="Mercado"
      />
      <section className="blog-page">
        <div className="container">
          <button onClick={() => navigate('/mercado')} className="btn btn-outline" style={{ marginBottom: 30 }}>
            <i className="fas fa-arrow-left"></i> Voltar para Mercado
          </button>

          {loading && <p>Carregando notícia...</p>}
          {error && <p style={{ color: '#c0392b' }}>Erro: {error}</p>}
          {!loading && !error && !post && (
            <div>
              <p>Notícia não encontrada.</p>
              <Link to="/mercado" className="btn btn-primary">Ver todas as notícias</Link>
            </div>
          )}

          {post && (
            <article className="news-detail">
              <div className="news-detail-image">
                <img
                  src={blogCardImg}
                  alt={post.title}
                  style={{ width: '100%', maxHeight: 420, objectFit: 'cover', display: 'block', borderRadius: 'var(--radius-lg)' }}
                />
                {post.category && (
                  <span className="blog-category" style={{ position: 'absolute', top: 20, left: 20 }}>{post.category}</span>
                )}
              </div>

              <div className="blog-meta" style={{ marginTop: 24 }}>
                <span><i className="far fa-calendar-alt"></i> {formatDate(post.created_at)}</span>
                {post.read_time && <span><i className="far fa-clock"></i> {post.read_time}</span>}
              </div>

              <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: '2.2rem', margin: '16px 0 24px', lineHeight: 1.2 }}>
                {post.title}
              </h1>

              {post.summary && (
                <p style={{ fontSize: '1.1rem', color: '#444', lineHeight: 1.7, marginBottom: 28, fontStyle: 'italic' }}>
                  {post.summary}
                </p>
              )}

              {post.content && (
                <div
                  className="news-detail-content"
                  style={{ fontSize: '1rem', color: '#333', lineHeight: 1.8, whiteSpace: 'pre-wrap' }}
                >
                  {post.content}
                </div>
              )}

              <div style={{ marginTop: 40, paddingTop: 24, borderTop: '1px solid #eee' }}>
                <button onClick={() => navigate('/mercado')} className="btn btn-outline">
                  <i className="fas fa-arrow-left"></i> Voltar para Mercado
                </button>
              </div>
            </article>
          )}
        </div>
      </section>

      <CTASection
        title="Ficou com"
        titleGold="dúvidas?"
        description="Entre em contato e nossa equipe terá prazer em ajudar."
      />
    </div>
  );
}
