import { useEffect, useMemo, useState } from 'react';
import { api } from '../../lib/api';
import HeroBanner from '../HeroBanner/HeroBanner';

function LandingPage() {
  const [gifts, setGifts] = useState([]);
  const [spotlightIndex, setSpotlightIndex] = useState(0);

  useEffect(() => {
    api.get('/api/gifts').then((data) => setGifts(data));
  }, []);

  useEffect(() => {
    if (!gifts.length) {
      return undefined;
    }

    const timer = setInterval(() => {
      setSpotlightIndex((current) => (current + 1) % Math.min(gifts.length, 12));
    }, 3200);

    return () => clearInterval(timer);
  }, [gifts]);

  const spotlight = gifts[spotlightIndex];
  const stats = useMemo(() => {
    const categories = new Set(gifts.map((gift) => gift.category));
    return {
      total: gifts.length,
      categories: categories.size
    };
  }, [gifts]);

  return (
    <div className="page-section stack-xl">
      <HeroBanner spotlight={spotlight} totalGifts={stats.total} />

      <section className="stats-grid">
        <div className="card-panel stat-card">
          <strong>{stats.total}</strong>
          <span>preloaded gifts</span>
        </div>
        <div className="card-panel stat-card">
          <strong>{stats.categories}</strong>
          <span>gift categories</span>
        </div>
        <div className="card-panel stat-card">
          <strong>Hover</strong>
          <span>to unwrap each present</span>
        </div>
      </section>

      <section className="card-panel landing-copy">
        <span className="eyebrow">Gift-wrapped theme</span>
        <h2>Ribbons, sparkle, soft paper tones, and playful motion.</h2>
        <p>
          This landing page is the screen to use for the assignment screenshot that shows the deployment URL.
        </p>
      </section>
    </div>
  );
}

export default LandingPage;
