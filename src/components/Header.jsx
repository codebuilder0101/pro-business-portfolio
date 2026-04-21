import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useScrollHeader } from '../hooks/useScrollEffects';
import siteData from '../data/siteData';
import logo from '../assets/logo.png';

export default function Header() {
  const { isScrolled } = useScrollHeader();
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { to: '/', label: 'Início' },
    { to: '/sobre', label: 'O Escritório' },
    { to: '/servicos', label: 'Serviços' },
    ...(siteData.includeBlog ? [{ to: '/mercado', label: 'Mercado' }] : []),
    { to: '/contato', label: 'Contato' },
  ];

  return (
    <header className={`header${isScrolled ? ' scrolled' : ''}`} id="header">
      <div className="container header-inner">
        <Link to="/" className="logo">
          <div className="logo-icon" style={{ background: 'transparent', padding: 0, width: 'auto', height: '48px', minWidth: '48px', borderRadius: '8px', overflow: 'hidden' }}>
            <img src={logo} alt={siteData.firmName} style={{ height: '100%', width: 'auto', objectFit: 'contain', display: 'block' }} />
          </div>
          <div className="logo-text">
            <span className="logo-name">{siteData.firmName}</span>
            <span className="logo-tagline">Licitações</span>
          </div>
        </Link>
        <nav className={`nav${menuOpen ? ' active' : ''}`} id="nav">
          {navLinks.map(link => (
            <Link
              key={link.to}
              to={link.to}
              className={`nav-link${location.pathname === link.to ? ' active' : ''}`}
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <a href={siteData.whatsappLink()} className="btn btn-header" target="_blank" rel="noopener noreferrer">
          <i className="fab fa-whatsapp"></i> Fale Conosco
        </a>
        <button
          className={`hamburger${menuOpen ? ' active' : ''}`}
          aria-label="Abrir menu"
          onClick={() => {
            setMenuOpen(!menuOpen);
            document.body.style.overflow = !menuOpen ? 'hidden' : '';
          }}
        >
          <span></span><span></span><span></span>
        </button>
      </div>
    </header>
  );
}
