import { Link } from 'react-router-dom';
import siteData from '../data/siteData';
import { useAosObserver } from '../hooks/useScrollEffects';

export default function CTASection({ title, titleGold, description }) {
  const aosRef = useAosObserver();
  return (
    <section className="cta-section" ref={aosRef}>
      <div className="cta-overlay"></div>
      <div className="container cta-content" data-aos="fade-up">
        <h2>{title} <span className="text-gold">{titleGold}</span></h2>
        <p>{description}</p>
        <div className="cta-buttons">
          <a href={siteData.whatsappLink()} className="btn btn-primary btn-lg" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-whatsapp"></i> Falar no WhatsApp
          </a>
          <Link to="/contato" className="btn btn-outline btn-lg">
            <i className="fas fa-envelope"></i> Enviar Mensagem
          </Link>
        </div>
      </div>
    </section>
  );
}
