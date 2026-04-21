import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import siteData from '../data/siteData';
import PageHero from '../components/PageHero';
import CTASection from '../components/CTASection';
import { useAosObserver } from '../hooks/useScrollEffects';
import blogCardImg from '../assets/logo.png';

export default function Blog() {
  const aosRef = useAosObserver();
  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <div ref={aosRef}>
      <PageHero
        title="Notícias do"
        titleGold="Mercado"
        description="Artigos, análises e novidades sobre o mercado de licitações."
        breadcrumb="Mercado"
      />
      <section className="blog-page">
        <div className="container">
          <div className="blog-page-grid">
            <div className="blog-posts">
              {siteData.blogPosts.map((post, i) => (
                <article className="blog-post-card" data-aos="fade-up" data-aos-delay={i * 50} key={post.id}>
                  <div className="blog-card-image">
                    <img src={blogCardImg} alt={post.title} style={{ width: '100%', height: '200px', objectFit: 'cover', display: 'block' }} />
                    <span className="blog-category">{post.category}</span>
                  </div>
                  <div className="blog-card-content">
                    <div className="blog-meta">
                      <span><i className="far fa-calendar-alt"></i> {post.date}</span>
                      <span><i className="far fa-clock"></i> {post.readTime}</span>
                    </div>
                    <h3>{post.title}</h3>
                    <p>{post.summary}</p>
                    <span className="read-more" style={{ cursor: 'pointer' }}>Ler Artigo Completo <i className="fas fa-arrow-right"></i></span>
                  </div>
                </article>
              ))}
            </div>
            <aside className="blog-sidebar">
              <div className="sidebar-widget">
                <h4>Buscar</h4>
                <div className="search-box">
                  <input type="text" placeholder="Buscar artigos..." />
                  <button type="button"><i className="fas fa-search"></i></button>
                </div>
              </div>
              <div className="sidebar-widget">
                <h4>Categorias</h4>
                <ul>
                  {siteData.blogCategories.map((cat, i) => (
                    <li key={i}><a href="#"><i className="fas fa-chevron-right"></i> {cat}</a></li>
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
