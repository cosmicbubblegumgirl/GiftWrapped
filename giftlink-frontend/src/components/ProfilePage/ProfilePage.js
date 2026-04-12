import { useEffect, useMemo, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { api } from '../../lib/api';
import GiftCard from '../GiftCard/GiftCard';

function ProfilePage() {
  const { user, token, refreshProfile } = useAuth();
  const [gifts, setGifts] = useState([]);

  useEffect(() => {
    api.get('/api/gifts').then((data) => setGifts(data));
  }, []);

  useEffect(() => {
    if (token) {
      refreshProfile().catch(() => null);
    }
  }, [token, refreshProfile]);

  const wishlist = useMemo(() => {
    const saved = JSON.parse(localStorage.getItem('giftwrappedWishlist') || '[]');
    return gifts.filter((gift) => saved.includes(gift.id));
  }, [gifts]);

  if (!user) {
    return <section className="page-section card-panel">Please log in to view your profile.</section>;
  }

  return (
    <div className="page-section stack-lg">
      <section className="card-panel">
        <span className="eyebrow">Profile</span>
        <h1>{user.name}</h1>
        <p>{user.email}</p>
        <p>This page can be used after login to verify the navbar username.</p>
      </section>

      <section className="section-heading">
        <div>
          <span className="eyebrow">Saved gifts</span>
          <h2>{wishlist.length} wishlist items</h2>
        </div>
      </section>

      <section className="gift-grid">
        {wishlist.length ? wishlist.map((gift) => <GiftCard key={gift.id} gift={gift} />) : <div className="card-panel">Save gifts from the main page and they will appear here.</div>}
      </section>
    </div>
  );
}

export default ProfilePage;
