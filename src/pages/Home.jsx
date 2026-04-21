import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import siteData from '../data/siteData';
import { useAosObserver, useCounterAnimation } from '../hooks/useScrollEffects';
import CTASection from '../components/CTASection';
import heroBg from '../assets/hero-bg.jpg';
import aboutPhoto from '../assets/legal-bids-hero.jpg';

function StatCounter({ target, suffix, label }) {
  const { count, ref } = useCounterAnimation(target);
  return (
    <div className="stat" ref={ref}>
      <span className="stat-number">{count}</span>
      <span className={suffix === '%' ? 'stat-percent' : 'stat-plus'}>{suffix}</span>
      <span className="stat-label" dangerouslySetInnerHTML={{ __html: label }} />
    </div>
  );
}

export default function Home() {
  const aosRef = useAosObserver();
  const particlesRef = useRef(null);

  useEffect(() => {
    const container = particlesRef.current;
    if (!container) return;
    for (let i = 0; i < 30; i++) {
      const particle = document.createElement('div');
      particle.classList.add('particle');
      particle.style.left = Math.random() * 100 + '%';
      particle.style.animationDelay = Math.random() * 8 + 's';
      particle.style.animationDuration = (6 + Math.random() * 6) + 's';
      const size = (2 + Math.random() * 3) + 'px';
      particle.style.width = size;
      particle.style.height = size;
      container.appendChild(particle);
    }
    return () => { container.innerHTML = ''; };
  }, []);

  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <div ref={aosRef}>
      {/* HERO */}
      <section className="hero" style={{ backgroundImage: `url(${heroBg})` }}>
        <div className="hero-scrim"></div>
        <div className="hero-overlay"></div>
        <div className="hero-particles" ref={particlesRef}></div>
        <div className="container hero-content">
          <div className="hero-badge" data-aos="fade-down">
            <i className="fas fa-shield-alt"></i> Especialistas em {siteData.specialization}
          </div>
          <h1 data-aos="fade-up">{siteData.firmName}<br /><span className="text-gold">{siteData.tagline}</span></h1>
          <p className="hero-subtitle" data-aos="fade-up" data-aos-delay="100">
            Soluções jurídicas estratégicas e personalizadas. Experiência, dedicação e resultados comprovados para você.
          </p>
          <div className="hero-buttons" data-aos="fade-up" data-aos-delay="200">
            <a href={siteData.whatsappLink('Olá! Gostaria de agendar uma consulta.')} className="btn btn-primary" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-whatsapp"></i> Agende uma Consulta
            </a>
            <Link to="/servicos" className="btn btn-outline">
              Nossos Serviços <i className="fas fa-arrow-right"></i>
            </Link>
          </div>
          <div className="hero-stats" data-aos="fade-up" data-aos-delay="300">
            <StatCounter target={siteData.processesHandled} suffix="+" label="Processos<br/>Atendidos" />
            <div className="stat-divider"></div>
            <StatCounter target={siteData.yearsExperience} suffix="+" label="Anos de<br/>Experiência" />
            <div className="stat-divider"></div>
            <StatCounter target={siteData.successRate} suffix="%" label="Taxa de<br/>Sucesso" />
          </div>
        </div>
        <div className="hero-scroll">
          <a href="#about" onClick={(e) => { e.preventDefault(); document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' }); }}>
            <i className="fas fa-chevron-down"></i>
          </a>
        </div>
      </section>

      {/* ABOUT PREVIEW */}
      <section className="section about-preview" id="about">
        <div className="container">
          <div className="about-grid">
            <div className="about-image" data-aos="fade-right">
              <div className="about-img-wrapper">
                <img src={aboutPhoto} alt="Advogado em seu escritório" className="about-img" />
                <div className="about-experience-badge">
                  <span className="exp-number">{siteData.yearsExperience}+</span>
                  <span className="exp-text">Anos de<br />Experiência</span>
                </div>
              </div>
            </div>
            <div className="about-text" data-aos="fade-left">
              <span className="section-tag">Sobre Nós</span>
              <h2 className="section-title">Referência em <span className="text-gold">{siteData.specialization}</span></h2>
              <p>Somos um escritório especializado em {siteData.specialization}. Nossa equipe possui ampla experiência e conhecimento técnico, oferecendo suporte completo e personalizado para cada cliente.</p>
              <p>Atuamos de forma estratégica e preventiva, garantindo que nossos clientes estejam sempre em conformidade com a legislação vigente e alcancem os melhores resultados.</p>
              <div className="about-features">
                <div className="about-feature"><i className="fas fa-check-circle"></i><span>Atendimento personalizado</span></div>
                <div className="about-feature"><i className="fas fa-check-circle"></i><span>Equipe especializada</span></div>
                <div className="about-feature"><i className="fas fa-check-circle"></i><span>Atuação em todo o Brasil</span></div>
                <div className="about-feature"><i className="fas fa-check-circle"></i><span>Resultados comprovados</span></div>
              </div>
              <Link to="/sobre" className="btn btn-primary">Conheça o Escritório <i className="fas fa-arrow-right"></i></Link>
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section className="section services-section">
        <div className="container">
          <div className="section-header" data-aos="fade-up">
            <span className="section-tag">Nossos Serviços</span>
            <h2 className="section-title">Áreas de <span className="text-gold">Atuação</span></h2>
            <p className="section-desc">Oferecemos soluções jurídicas completas e personalizadas para atender às suas necessidades.</p>
          </div>
          <div className="services-grid">
            {siteData.services.map((service, i) => (
              <div className="service-card" data-aos="fade-up" data-aos-delay={i * 100} key={i}>
                <div className="service-icon"><i className={service.icon}></i></div>
                <h3>{service.title}</h3>
                <p>{service.shortDesc}</p>
                <Link to="/servicos" className="service-link">Saiba Mais <i className="fas fa-arrow-right"></i></Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section className="section why-section">
        <div className="container">
          <div className="why-grid">
            <div className="why-content" data-aos="fade-right">
              <span className="section-tag">Por que nos escolher</span>
              <h2 className="section-title">Diferenciais do nosso <span className="text-gold">Escritório</span></h2>
              <div className="why-items">
                {[
                  { icon: 'fas fa-bullseye', title: 'Foco em Resultados', desc: 'Nossa atuação é orientada para resultados concretos, com estratégias personalizadas para cada cliente e situação.' },
                  { icon: 'fas fa-clock', title: 'Agilidade e Prazos', desc: 'Garantimos respostas rápidas e cumprimento rigoroso de todos os prazos legais e acordados.' },
                  { icon: 'fas fa-graduation-cap', title: 'Conhecimento Técnico', desc: 'Equipe constantemente atualizada com as mudanças legislativas e jurisprudência dos tribunais.' },
                  { icon: 'fas fa-map-marker-alt', title: 'Atuação Nacional', desc: 'Atendemos clientes de todo o Brasil, com suporte remoto eficiente e presencial quando necessário.' },
                ].map((item, i) => (
                  <div className="why-item" key={i}>
                    <div className="why-icon"><i className={item.icon}></i></div>
                    <div>
                      <h4>{item.title}</h4>
                      <p>{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="why-image" data-aos="fade-left">
              <div className="why-img-placeholder"><i className="fas fa-university"></i></div>
            </div>
          </div>
        </div>
      </section>

      {/* BLOG PREVIEW */}
      {siteData.includeBlog && (
        <section className="section blog-preview-section">
          <div className="container">
            <div className="section-header" data-aos="fade-up">
              <span className="section-tag">Blog & Notícias</span>
              <h2 className="section-title">Artigos <span className="text-gold">Jurídicos</span></h2>
              <p className="section-desc">Fique atualizado sobre as principais novidades, mudanças legislativas e análises jurídicas relevantes.</p>
            </div>
            <div className="blog-grid">
              {siteData.blogPosts.slice(0, 3).map((post, i) => (
                <article className="blog-card" data-aos="fade-up" data-aos-delay={i * 100} key={post.id}>
                  <div className="blog-card-image">
                    <div className="blog-img-placeholder"><i className={post.icon}></i></div>
                    <span className="blog-category">{post.category}</span>
                  </div>
                  <div className="blog-card-content">
                    <div className="blog-meta">
                      <span><i className="far fa-calendar-alt"></i> {post.date}</span>
                      <span><i className="far fa-clock"></i> {post.readTime}</span>
                    </div>
                    <h3><Link to="/blog">{post.title}</Link></h3>
                    <p>{post.summary}</p>
                    <Link to="/blog" className="read-more">Ler Artigo <i className="fas fa-arrow-right"></i></Link>
                  </div>
                </article>
              ))}
            </div>
            <div className="blog-cta" data-aos="fade-up">
              <Link to="/blog" className="btn btn-outline">Ver Todos os Artigos <i className="fas fa-arrow-right"></i></Link>
            </div>
          </div>
        </section>
      )}

      <CTASection
        title="Precisa de"
        titleGold="Assessoria Jurídica?"
        description="Entre em contato agora mesmo e descubra como podemos ajudar você com soluções jurídicas personalizadas."
      />
    </div>
  );
}
