import { Link } from 'react-router-dom';

function HeroBanner({ spotlight, totalGifts }) {
  if (!spotlight) {
    return null;
  }

  return (
    <section className="hero-banner card-panel">
      <div className="hero-banner__copy">
        <span className="eyebrow">Whimsical gift discovery</span>
        <h1>Unwrap a more magical way to browse gifts.</h1>
        <p>
          GiftWrapped comes preloaded with {totalGifts} curated gift ideas, wrapped in ribbons,
          powered by dynamic search, and styled to feel like opening a present.
        </p>
        <div className="hero-banner__actions">
          <Link className="primary-button" to="/main">
            Browse all gifts
          </Link>
          <Link className="secondary-button" to={`/gifts/${spotlight.id}`}>
            View spotlight gift
          </Link>
        </div>
      </div>

      <div className="hero-banner__spotlight">
        <div className="spotlight-pill">Spotlight pick</div>
        <img src={spotlight.image} alt={spotlight.name} />
        <h2>{spotlight.name}</h2>
        <p>{spotlight.description}</p>
        <div className="spotlight-meta">
          <span>{spotlight.category}</span>
          <span>${spotlight.price.toFixed(2)}</span>
          <span>{spotlight.rating} ★</span>
        </div>
      </div>
    </section>
  );
}

export default HeroBanner;
