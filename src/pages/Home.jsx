import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import siteData from '../data/siteData';
import { useAosObserver, useCounterAnimation } from '../hooks/useScrollEffects';
import CTASection from '../components/CTASection';
import { supabase } from '../lib/supabase';
import heroBg from '../assets/hero-bg.jpg';
import aboutPhoto from '../assets/photo.png';
import portraitImg from '../assets/photo2.png';
import blogCardImg from '../assets/logo.png';

function formatDate(iso) {
  if (!iso) return '';
  try {
    return new Date(iso).toLocaleDateString('pt-BR', { day: '2-digit', month: 'short', year: 'numeric' });
  } catch {
    return iso;
  }
}

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
  const [latestPosts, setLatestPosts] = useState([]);

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

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const { data } = await supabase
        .from('news')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(3);
      if (!cancelled) setLatestPosts(data || []);
    })();
    return () => { cancelled = true; };
  }, []);

  return (
    <div ref={aosRef}>
      {/* HERO */}
      <section className="hero" style={{ backgroundImage: `url(${heroBg})` }}>
        <div className="hero-scrim"></div>
        <div className="hero-overlay"></div>
        <div className="hero-particles" ref={particlesRef}></div>
        <div className="container hero-content">
          <div className="hero-badge" data-aos="fade-down">
            <i className="fas fa-shield-alt"></i> {siteData.tagline}
          </div>
          {/* <h1>Este é o nosso WhatsApp comercial.<br/>
+1 (262) 620-5233<br/>
Para sua comodidade, usamos o WhatsApp como principal canal de atendimento.<br/>
Fique à vontade para nos enviar uma mensagem estaremos esperando por você por lá.</h1> */}
          <h1 data-aos="fade-up">Transforme o Governo no<br /><span className="text-gold">Maior Cliente da Sua Empresa</span></h1>
          <p className="hero-subtitle" data-aos="fade-up" data-aos-delay="100">
            Aumente seu faturamento com segurança, previsibilidade e garantia de pagamento.
          </p>
          <div className="hero-buttons" data-aos="fade-up" data-aos-delay="200">
            <a href={siteData.whatsappLink('Olá! Quero vender para o Governo.')} className="btn btn-primary" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-whatsapp"></i> Quero vender para o Governo
            </a>
            <Link to="/mercado" className="btn btn-outline">
              Conheça o Mercado <i className="fas fa-arrow-right"></i>
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
                <img src={aboutPhoto} alt={siteData.firmName} className="about-img" />
                <div className="about-experience-badge">
                  <span className="exp-number">{siteData.yearsExperience}+</span>
                  <span className="exp-text">Anos de<br />Experiência</span>
                </div>
              </div>
            </div>
            <div className="about-text" data-aos="fade-left">
              <span className="section-tag">Sobre Nós</span>
              <h2 className="section-title">Referência em <span className="text-gold">{siteData.specialization}</span></h2>
              <p>Sua empresa merece a segurança de quem conhece cada engrenagem da administração pública. Após 12 anos de atuação na linha de frente como Pregoeiro, decidi inverter a mesa: agora, uso esse know-how exclusivo para defender os interesses da sua empresa.</p>
              <p>Entendemos as armadilhas dos editais e as brechas dos concorrentes como ninguém. Nossa equipe oferece um suporte técnico de alta performance, transformando a burocracia das licitações em uma jornada estratégica e vencedora para o seu negócio.</p>
              <div className="about-features">
                <div className="about-feature"><i className="fas fa-check-circle"></i><span>Inteligência em Editais</span></div>
                <div className="about-feature"><i className="fas fa-check-circle"></i><span>Presença Nacional</span></div>
                <div className="about-feature"><i className="fas fa-check-circle"></i><span>Estratégia Anti-Recurso</span></div>
                <div className="about-feature"><i className="fas fa-check-circle"></i><span>Foco no Contrato</span></div>
              </div>
              <Link to="/sobre" className="btn btn-primary">Sobre Nós <i className="fas fa-arrow-right"></i></Link>
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
              <h2 className="section-title">A expertise de quem já esteve do outro lado da mesa</h2>
              <div className="why-items">
                {[
                  { icon: 'fas fa-bullseye', title: 'Estratégia de Pregoeiro (Foco em Resultados)', desc: 'Diferente de assessorias comuns, nossa estratégia é moldada por 12 anos de experiência na condução de certames públicos. Não entregamos apenas documentos; entregamos a inteligência necessária para vencer disputas, antecipando movimentos de concorrentes e decisões dos órgãos.' },
                  { icon: 'fas fa-clock', title: 'Agilidade e Rigor com Prazos', desc: 'Em licitações, um minuto decide um contrato. Garantimos o monitoramento ininterrupto de chats e publicações, com uma estrutura pronta para respostas imediatas. Nossa agilidade é o que garante que sua empresa nunca perca um lance de desempate ou um prazo recursal.' },
                  { icon: 'fas fa-graduation-cap', title: 'Autoridade Técnica Especializada', desc: 'Nossa equipe não apenas segue a lei; nós a dominamos. Estamos em constante atualização com a Lei de Licitações e com a jurisprudência mais recente do TCU e TCEs. Oferecemos um suporte técnico jurídico que entende o seu nicho de mercado.' },
                  { icon: 'fas fa-map-marker-alt', title: 'Atuação em Todo o Território Nacional', desc: 'Operamos com excelência em todos os portais de compras do Brasil (ComprasGov, licitacoes-e, BLL e outros). Oferecemos suporte remoto de alta tecnologia para empresas de qualquer estado, garantindo que a distância nunca seja um obstáculo para a vitória no certame.' },
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
              <img src={portraitImg} alt="Elcio Brack" style={{ width: '100%', aspectRatio: '4/5', objectFit: 'cover', borderRadius: 'var(--radius-lg)', display: 'block' }} />
            </div>
          </div>
        </div>
      </section>

      {/* BLOG PREVIEW */}
      {siteData.includeBlog && latestPosts.length > 0 && (
        <section className="section blog-preview-section">
          <div className="container">
            <div className="section-header">
              <span className="section-tag">Visão do Especialista</span>
              <h2 className="section-title">Análises <span className="text-gold">Estratégicas</span></h2>
              <p className="section-desc">O mercado de licitações sob o olhar de quem conhece os bastidores. Artigos, notícias e análises técnicas para empresas que buscam vencer com segurança.</p>
            </div>
            <div className="blog-grid">
              {latestPosts.map((post) => (
                <Link
                  to={`/mercado/${post.id}`}
                  key={post.id}
                  style={{ textDecoration: 'none', color: 'inherit', cursor: 'pointer', display: 'block' }}
                >
                  <article className="blog-card">
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
                      <span className="read-more">Ler Artigo <i className="fas fa-arrow-right"></i></span>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
            <div className="blog-cta">
              <Link to="/mercado" className="btn btn-outline">Ver Todas as Análises <i className="fas fa-arrow-right"></i></Link>
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
