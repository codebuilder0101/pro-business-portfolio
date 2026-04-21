import { useEffect } from 'react';
import siteData from '../data/siteData';
import PageHero from '../components/PageHero';
import CTASection from '../components/CTASection';
import { useAosObserver } from '../hooks/useScrollEffects';

export default function Sobre() {
  const aosRef = useAosObserver();
  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <div ref={aosRef}>
      <PageHero
        title=""
        titleGold="Sobre Nós"
        description="Conheça nossa história, missão e os valores que nos tornam referência."
        breadcrumb="Sobre Nós"
      />
      <section className="about-full">
        <div className="container">
          <div className="about-full-grid">
            <div className="about-img-wrapper" data-aos="fade-right">
              <div className="about-img-placeholder"><i className="fas fa-landmark"></i></div>
              <div className="about-experience-badge">
                <span className="exp-number">{siteData.yearsExperience}+</span>
                <span className="exp-text">Anos de<br />Experiência</span>
              </div>
            </div>
            <div className="about-full-text" data-aos="fade-left">
              <span className="section-tag">Nossa História</span>
              <h2>Tradição e <span className="text-gold">Inovação</span></h2>
              <p>Sua empresa merece a segurança de quem conhece cada engrenagem da administração pública. Após 12 anos de atuação na linha de frente como Pregoeiro, decidi inverter a mesa: agora, uso esse know-how exclusivo para defender os interesses da sua empresa.</p>
              <p>Entendemos as armadilhas dos editais e as brechas dos concorrentes como ninguém. Nossa equipe oferece um suporte técnico de alta performance, transformando a burocracia das licitações em uma jornada estratégica e vencedora para o seu negócio.</p>
              {/* <p>Com mais de {siteData.processesHandled} processos atendidos e uma taxa de sucesso de {siteData.successRate}%, demonstramos nosso compromisso com resultados concretos e a satisfação dos nossos clientes.</p> */}
            </div>
          </div>
        </div>
      </section>

      <section className="values-section">
        <div className="container">
          <div className="section-header" data-aos="fade-up">
            <span className="section-tag">Nossos Pilares</span>
            <h2 className="section-title">Missão, Visão e <span className="text-gold">Valores</span></h2>
          </div>
          <div className="values-grid">
            {[
              { icon: 'fas fa-bullseye', title: 'Missão', desc: 'Oferecer assessoria jurídica especializada e estratégica, contribuindo para o crescimento sustentável dos nossos clientes.' },
              { icon: 'fas fa-eye', title: 'Visão', desc: 'Ser reconhecido como escritório de referência no Brasil, pela qualidade e inovação nos serviços prestados.' },
              { icon: 'fas fa-gem', title: 'Ética', desc: 'Atuamos com total transparência, integridade e compromisso com a legalidade em todos os processos.' },
              { icon: 'fas fa-users', title: 'Compromisso', desc: 'Dedicação total aos interesses dos nossos clientes, com atendimento personalizado e foco em resultados concretos.' },
            ].map((v, i) => (
              <div className="value-card" data-aos="fade-up" data-aos-delay={i * 100} key={i}>
                <div className="service-icon"><i className={v.icon}></i></div>
                <h3>{v.title}</h3>
                <p>{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTASection
        title="Pronto para ter uma assessoria"
        titleGold="especializada?"
        description="Entre em contato e descubra como podemos ajudar você."
      />
    </div>
  );
}
