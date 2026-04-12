import { useEffect, useMemo, useState } from 'react';
import { api } from '../../lib/api';
import GiftCard from '../GiftCard/GiftCard';

function MainPage() {
  const [gifts, setGifts] = useState([]);
  const [wishlist, setWishlist] = useState(() => JSON.parse(localStorage.getItem('giftwrappedWishlist') || '[]'));

  useEffect(() => {
    api.get('/api/gifts').then((data) => setGifts(data));
  }, []);

  function handleToggleWishlist(id, next) {
    const updated = next ? [...new Set([...wishlist, id])] : wishlist.filter((entry) => entry !== id);
    setWishlist(updated);
    localStorage.setItem('giftwrappedWishlist', JSON.stringify(updated));
  }

  const featured = useMemo(() => gifts.slice(0, 24), [gifts]);

  return (
    <div className="page-section stack-lg">
      <section className="card-panel">
        <span className="eyebrow">Main page</span>
        <h1>Browse all gifts before login</h1>
        <p>
          This page is ready for the assignment screenshot that shows the main page before login.
        </p>
      </section>

      <section className="gift-grid">
        {featured.map((gift) => (
          <GiftCard
            key={gift.id}
            gift={gift}
            onToggleWishlist={handleToggleWishlist}
            isWishlisted={wishlist.includes(gift.id)}
          />
        ))}
      </section>
    </div>
  );
}

export default MainPage;
