import { Link } from 'react-router-dom';
import siteData from '../data/siteData';
import logo from '../assets/logo-light.png';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-col">
            <div className="footer-logo">
              <div className="logo-icon" style={{ background: 'transparent', padding: 0, width: 'auto', height: '56px', minWidth: '48px', borderRadius: 0, overflow: 'visible' }}>
                <img src={logo} alt={siteData.firmName} style={{ height: '100%', width: 'auto', objectFit: 'contain', display: 'block' }} />
              </div>
              <div className="logo-text">
                <span className="logo-name">{siteData.firmName}</span>
                <span className="logo-tagline">Licitações</span>
              </div>
            </div>
            <p className="footer-desc">
              Consultoria especializada em {siteData.specialization}. Transforme o Governo no maior cliente da sua empresa com segurança, previsibilidade e garantia de pagamento.
            </p>
            <div className="footer-social">
              <a href="https://www.instagram.com/ebracklicitacoes" aria-label="Instagram"><i className="fab fa-instagram"></i></a>
              <a href="https://www.linkedin.com/in/elcio-brack" aria-label="LinkedIn"><i className="fab fa-linkedin-in"></i></a>
              <a href="https://www.facebook.com/elcio.brack" aria-label="Facebook"><i className="fab fa-facebook-f"></i></a>
            </div>
          </div>
          <div className="footer-col">
            <h4>Links Rápidos</h4>
            <ul>
              <li><Link to="/">Início</Link></li>
              <li><Link to="/sobre">Sobre Nós</Link></li>
              <li><Link to="/servicos">Serviços</Link></li>
              {siteData.includeBlog && <li><Link to="/mercado">
Visão do Especialista</Link></li>}
              <li><Link to="/contato">Contato</Link></li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>Serviços</h4>
            <ul>
              {siteData.services.map((s, i) => (
                <li key={i}><Link to="/servicos">{s.title}</Link></li>
              ))}
            </ul>
          </div>
          <div className="footer-col">
            <h4>Contato</h4>
            <ul className="footer-contact">
              <li><i className="fas fa-map-marker-alt"></i> {siteData.address}</li>
              <li><i className="fas fa-phone-alt"></i> {siteData.phone}</li>
              <li><i className="fas fa-envelope"></i> {siteData.email}</li>
              <li><i className="far fa-clock"></i> Seg - Sex: 08h às 18h</li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2026 {siteData.firmName}. Todos os direitos reservados.</p>
          <p>OAB {siteData.oabNumber} | Desenvolvido com compromisso e dedicação</p>
        </div>
      </div>
    </footer>
  );
}
