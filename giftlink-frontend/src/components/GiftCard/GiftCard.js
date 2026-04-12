import { Link } from 'react-router-dom';
import { useState } from 'react';

function GiftCard({ gift, onToggleWishlist, isWishlisted = false }) {
  const [wishlisted, setWishlisted] = useState(isWishlisted);

  function handleWishlist() {
    const next = !wishlisted;
    setWishlisted(next);
    if (onToggleWishlist) {
      onToggleWishlist(gift.id, next);
    }
  }

  return (
    <article className="gift-card card-panel">
      <div className="gift-card__image-shell">
        <button className="wishlist-button" onClick={handleWishlist} type="button">
          {wishlisted ? '♥' : '♡'}
        </button>

        <Link to={`/gifts/${gift.id}`} className="gift-card__image-link">
          <div className="gift-card__wrap-lid" />
          <div className="gift-card__wrap-box" />
          <div className="gift-card__ribbon gift-card__ribbon--vertical" />
          <div className="gift-card__ribbon gift-card__ribbon--horizontal" />
          <div className="gift-card__bow">🎀</div>
          <img src={gift.image} alt={gift.name} className="gift-card__image" />
          <div className="gift-card__hover-label">Hover to unwrap</div>
        </Link>
      </div>

      <div className="gift-card__body">
        <div className="gift-card__topline">
          <span>{gift.category}</span>
          <span>{gift.rating} ★</span>
        </div>
        <h3>{gift.name}</h3>
        <p>{gift.description}</p>
        <div className="gift-card__meta">
          <strong>${gift.price.toFixed(2)}</strong>
          <span>{gift.stock} in stock</span>
        </div>
        <div className="gift-card__tags">
          {gift.colors.slice(0, 3).map((color) => (
            <span key={color}>{color}</span>
          ))}
        </div>
      </div>
    </article>
  );
}

export default GiftCard;
