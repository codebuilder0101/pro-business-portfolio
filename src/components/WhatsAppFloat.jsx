import siteData from '../data/siteData';

export default function WhatsAppFloat() {
  return (
    <a href={siteData.whatsappLink()} className="whatsapp-float" target="_blank" rel="noopener noreferrer" aria-label="Fale conosco pelo WhatsApp">
      <i className="fab fa-whatsapp"></i>
      <span className="whatsapp-tooltip">Fale Conosco</span>
    </a>
  );
}
