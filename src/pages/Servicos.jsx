import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import siteData from '../data/siteData';
import PageHero from '../components/PageHero';
import CTASection from '../components/CTASection';
import { useAosObserver } from '../hooks/useScrollEffects';

export default function Servicos() {
  const aosRef = useAosObserver();
  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <div ref={aosRef}>
      <PageHero
        title="Nossos"
        titleGold="Serviços"
        description="Conheça nossas áreas de atuação e como podemos ajudar você."
        breadcrumb="Serviços"
      />
      <section className="services-full">
        <div className="container">
          {siteData.services.map((service, i) => (
            <div className="service-detail" key={i} data-aos="fade-up">
              <div className="service-detail-icon">
                <i className={service.icon}></i>
              </div>
              <div className="service-detail-content">
                <h3>{service.title}</h3>
                <p>{service.fullDesc}</p>
                <ul>
                  {service.features.map((f, j) => (
                    <li key={j}><i className="fas fa-check-circle"></i> {f}</li>
                  ))}
                </ul>
                <a href={siteData.whatsappLink(`Olá! Gostaria de saber mais sobre ${service.title}.`)} className="btn btn-primary" target="_blank" rel="noopener noreferrer">
                  <i className="fab fa-whatsapp"></i> Consultar
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      <CTASection
        title="Precisa de"
        titleGold="Assessoria Jurídica?"
        description="Entre em contato e descubra como podemos ajudar você com soluções jurídicas personalizadas."
      />
    </div>
  );
}
