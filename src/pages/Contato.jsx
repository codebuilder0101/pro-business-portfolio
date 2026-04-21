import { useState, useEffect } from 'react';
import siteData from '../data/siteData';
import PageHero from '../components/PageHero';
import { useAosObserver } from '../hooks/useScrollEffects';

export default function Contato() {
  const aosRef = useAosObserver();
  useEffect(() => { window.scrollTo(0, 0); }, []);

  const [form, setForm] = useState({ name: '', email: '', phone: '', subject: '', message: '' });
  const [status, setStatus] = useState({ type: '', message: '' });
  const [sending, setSending] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSending(true);
    setStatus({ type: '', message: '' });

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nome: form.name,
          email: form.email,
          telefone: form.phone,
          assunto: form.subject,
          mensagem: form.message
        })
      });
      const data = await res.json();

      if (data.success) {
        setStatus({ type: 'success', message: data.message });
        setForm({ name: '', email: '', phone: '', subject: '', message: '' });
        // Also open WhatsApp
        const msg = `Olá! Meu nome é ${form.name}.\nAssunto: ${form.subject}\nTelefone: ${form.phone}\nE-mail: ${form.email}\n\n${form.message}`;
        window.open(siteData.whatsappLink(msg), '_blank');
      } else {
        setStatus({ type: 'error', message: data.errors ? data.errors.join(', ') : 'Erro ao enviar mensagem.' });
      }
    } catch {
      // Fallback to WhatsApp only if API is unavailable
      const msg = `Olá! Meu nome é ${form.name}.\nAssunto: ${form.subject}\nTelefone: ${form.phone}\nE-mail: ${form.email}\n\n${form.message}`;
      window.open(siteData.whatsappLink(msg), '_blank');
      setStatus({ type: 'success', message: 'Redirecionado para o WhatsApp.' });
    } finally {
      setSending(false);
    }
  };

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  return (
    <div ref={aosRef}>
      <PageHero
        title="Entre em"
        titleGold="Contato"
        description="Estamos prontos para atender você. Entre em contato e agende uma consulta."
        breadcrumb="Contato"
      />
      <section className="contact-page">
        <div className="container">
          <div className="contact-grid">
            <div className="contact-info-cards" data-aos="fade-right">
              {[
                { icon: 'fab fa-whatsapp', title: 'WhatsApp', text: siteData.whatsappNumber, link: siteData.whatsappLink() },
                { icon: 'fas fa-phone-alt', title: 'Telefone', text: siteData.phone },
                { icon: 'fas fa-envelope', title: 'E-mail', text: siteData.email },
                { icon: 'fas fa-map-marker-alt', title: 'Endereço', text: `${siteData.address} - ${siteData.cityState}` },
              ].map((card, i) => (
                <div className="contact-info-card" key={i}>
                  <div className="service-icon"><i className={card.icon}></i></div>
                  <div>
                    <h4>{card.title}</h4>
                    {card.link ? (
                      <p><a href={card.link} target="_blank" rel="noopener noreferrer" style={{ color: 'inherit' }}>{card.text}</a></p>
                    ) : (
                      <p>{card.text}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
            <div className="contact-form-wrapper" data-aos="fade-left">
              <h3>Envie sua Mensagem</h3>
              <p>Preencha o formulário abaixo e entraremos em contato pelo WhatsApp.</p>
              <form onSubmit={handleSubmit} id="contactForm">
                <div className="form-row">
                  <div className="form-group">
                    <label>Nome Completo</label>
                    <input type="text" name="name" value={form.name} onChange={handleChange} required placeholder="Seu nome" />
                  </div>
                  <div className="form-group">
                    <label>E-mail</label>
                    <input type="email" name="email" value={form.email} onChange={handleChange} required placeholder="seu@email.com" />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>Telefone</label>
                    <input type="tel" name="phone" value={form.phone} onChange={handleChange} required placeholder="(00) 00000-0000" />
                  </div>
                  <div className="form-group">
                    <label>Assunto</label>
                    <select name="subject" value={form.subject} onChange={handleChange} required>
                      <option value="">Selecione</option>
                      {siteData.services.map((s, i) => (
                        <option key={i} value={s.title}>{s.title}</option>
                      ))}
                      <option value="Outro">Outro</option>
                    </select>
                  </div>
                </div>
                <div className="form-group">
                  <label>Mensagem</label>
                  <textarea name="message" value={form.message} onChange={handleChange} required placeholder="Descreva sua necessidade..." rows="5"></textarea>
                </div>
                {status.message && (
                  <div className={`form-status ${status.type}`} style={{
                    padding: '12px 16px',
                    borderRadius: '8px',
                    marginBottom: '16px',
                    background: status.type === 'success' ? 'rgba(39, 174, 96, 0.15)' : 'rgba(231, 76, 60, 0.15)',
                    color: status.type === 'success' ? '#27ae60' : '#e74c3c',
                    border: `1px solid ${status.type === 'success' ? 'rgba(39, 174, 96, 0.3)' : 'rgba(231, 76, 60, 0.3)'}`
                  }}>
                    <i className={status.type === 'success' ? 'fas fa-check-circle' : 'fas fa-exclamation-circle'}></i>{' '}
                    {status.message}
                  </div>
                )}
                <button type="submit" className="btn btn-primary btn-lg" style={{ width: '100%', justifyContent: 'center' }} disabled={sending}>
                  <i className="fab fa-whatsapp"></i> {sending ? 'Enviando...' : 'Enviar via WhatsApp'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      <section className="map-section">
        <div className="map-placeholder">
          <i className="fas fa-map-marker-alt"></i>
          <p>{siteData.address} - {siteData.cityState}</p>
          <p style={{ fontSize: '0.85rem' }}>Para adicionar o Google Maps, substitua este bloco por um iframe do Google Maps.</p>
        </div>
      </section>
    </div>
  );
}
