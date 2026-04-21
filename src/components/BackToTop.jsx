import { useScrollHeader } from '../hooks/useScrollEffects';

export default function BackToTop() {
  const { showBackToTop } = useScrollHeader();
  return (
    <a
      href="#"
      className={`back-to-top${showBackToTop ? ' visible' : ''}`}
      aria-label="Voltar ao topo"
      onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
    >
      <i className="fas fa-chevron-up"></i>
    </a>
  );
}
