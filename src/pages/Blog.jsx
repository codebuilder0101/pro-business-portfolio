import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import siteData from '../data/siteData';
import PageHero from '../components/PageHero';
import CTASection from '../components/CTASection';
import { useAosObserver } from '../hooks/useScrollEffects';
import { supabase } from '../lib/supabase';
import blogCardImg from '../assets/logo.png';

function formatDate(iso) {
  if (!iso) return '';
  try {
    return new Date(iso).toLocaleDateString('pt-BR', { day: '2-digit', month: 'short', year: 'numeric' });
  } catch {
    return iso;
  }
}

export default function Blog() {
  const aosRef = useAosObserver();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [query, setQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('');

  useEffect(() => { window.scrollTo(0, 0); }, []);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from('news')
        .select('*')
        .order('created_at', { ascending: false });
      if (cancelled) return;
      if (error) setError(error.message);
      else setPosts(data || []);
      setLoading(false);
    })();
    return () => { cancelled = true; };
  }, []);

  const categories = useMemo(() => {
    const set = new Set(posts.map(p => p.category).filter(Boolean));
    return Array.from(set);
  }, [posts]);

  const filtered = useMemo(() => {
    return posts.filter(p => {
      if (activeCategory && p.category !== activeCategory) return false;
      if (query) {
        const q = query.toLowerCase();
        const hay = `${p.title || ''} ${p.category || ''} ${p.summary || ''}`.toLowerCase();
        if (!hay.includes(q)) return false;
      }
      return true;
    });
  }, [posts, query, activeCategory]);

  return (
    <div ref={aosRef}>
      <PageHero
        title="Notícias do"
        titleGold="Mercado"
        description="Artigos, análises e novidades sobre o mercado de licitações."
        breadcrumb="Visão do Especialista"
      />
      <section className="blog-page">
        <div className="container">
          <div className="blog-page-grid">
            <div className="blog-posts">
              {loading && <p>Carregando notícias...</p>}
              {error && <p style={{ color: '#c0392b' }}>Erro ao carregar: {error}</p>}
              {!loading && !error && filtered.length === 0 && <p>Nenhuma notícia encontrada.</p>}
              {filtered.map((post) => (
                <Link
                  to={`/mercado/${post.id}`}
                  key={post.id}
                  className="blog-post-card-link"
                  style={{ textDecoration: 'none', color: 'inherit', cursor: 'pointer', display: 'block' }}
                >
                  <article className="blog-post-card">
                    <div className="blog-card-image">
                      <img src={blogCardImg} alt={post.title} style={{ width: '100%', height: '200px', objectFit: 'cover', display: 'block' }} />
                      {post.category && <span className="blog-category">{post.category}</span>}
                    </div>
                    <div className="blog-card-content">
                      <div className="blog-meta">
                        <span><i className="far fa-calendar-alt"></i> {formatDate(post.created_at)}</span>
                        {post.read_time && <span><i className="far fa-clock"></i> {post.read_time}</span>}
                      </div>
                      <h3>{post.title}</h3>
                      <p>{post.summary}</p>
                      <span className="read-more" style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                        Ler Artigo Completo <i className="fas fa-arrow-right"></i>
                      </span>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
            <aside className="blog-sidebar">
              <div className="sidebar-widget">
                <h4>Buscar</h4>
                <div className="search-box">
                  <input
                    type="text"
                    placeholder="Buscar artigos..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                  />
                  <button type="button"><i className="fas fa-search"></i></button>
                </div>
              </div>
              <div className="sidebar-widget">
                <h4>Categorias</h4>
                <ul>
                  <li>
                    <a href="#" onClick={(e) => { e.preventDefault(); setActiveCategory(''); }}>
                      <i className="fas fa-chevron-right"></i> Todas{activeCategory === '' ? ' ✓' : ''}
                    </a>
                  </li>
                  {categories.map((cat, i) => (
                    <li key={i}>
                      <a href="#" onClick={(e) => { e.preventDefault(); setActiveCategory(cat); }}>
                        <i className="fas fa-chevron-right"></i> {cat}{activeCategory === cat ? ' ✓' : ''}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="sidebar-widget sidebar-cta">
                <h4>Precisa de ajuda?</h4>
                <p>Fale com nossos especialistas e tire suas dúvidas.</p>
                <a href={siteData.whatsappLink()} className="btn btn-primary" target="_blank" rel="noopener noreferrer" style={{ width: '100%', justifyContent: 'center' }}>
                  <i className="fab fa-whatsapp"></i> WhatsApp
                </a>
              </div>
            </aside>
          </div>
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
