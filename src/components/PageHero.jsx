import { Link } from 'react-router-dom';

export default function PageHero({ title, titleGold, description, breadcrumb }) {
  return (
    <section className="page-hero">
      <div className="container">
        <div className="breadcrumb">
          <Link to="/">Início</Link> <span>/</span> <span>{breadcrumb}</span>
        </div>
        <h1>{title} <span className="text-gold">{titleGold}</span></h1>
        <p>{description}</p>
      </div>
    </section>
  );
}
