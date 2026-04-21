import { Link } from 'react-router-dom';
import siteData from '../data/siteData';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-col">
            <div className="footer-logo">
              <div className="logo-icon"><i className="fas fa-balance-scale"></i></div>
              <div className="logo-text">
                <span className="logo-name">{siteData.firmName}</span>
                <span className="logo-tagline">Advocacia</span>
              </div>
            </div>
            <p className="footer-desc">
              Assessoria jurídica especializada em {siteData.specialization}. Atuação estratégica para garantir a segurança jurídica dos nossos clientes.
            </p>
            <div className="footer-social">
              <a href="#" aria-label="Instagram"><i className="fab fa-instagram"></i></a>
              <a href="#" aria-label="LinkedIn"><i className="fab fa-linkedin-in"></i></a>
              <a href="#" aria-label="Facebook"><i className="fab fa-facebook-f"></i></a>
            </div>
          </div>
          <div className="footer-col">
            <h4>Links Rápidos</h4>
            <ul>
              <li><Link to="/">Início</Link></li>
              <li><Link to="/sobre">O Escritório</Link></li>
              <li><Link to="/servicos">Serviços</Link></li>
              {siteData.includeBlog && <li><Link to="/blog">Blog</Link></li>}
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
