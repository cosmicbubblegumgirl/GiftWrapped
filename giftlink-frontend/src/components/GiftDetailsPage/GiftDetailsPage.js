import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { api } from '../../lib/api';

function GiftDetailsPage() {
  const { id } = useParams();
  const [gift, setGift] = useState(null);
  const [message, setMessage] = useState('');

  useEffect(() => {
    api
      .get(`/api/gifts/${id}`)
      .then((data) => setGift(data))
      .catch((error) => setMessage(error.message));
  }, [id]);

  if (message) {
    return <section className="page-section card-panel">{message}</section>;
  }

  if (!gift) {
    return <section className="page-section card-panel">Opening the present...</section>;
  }

  return (
    <div className="page-section">
      <section className="detail-layout card-panel">
        <div className="detail-layout__media">
          <img src={gift.image} alt={gift.name} />
        </div>
        <div className="detail-layout__content">
          <span className="eyebrow">Gift details page</span>
          <h1>{gift.name}</h1>
          <p>{gift.description}</p>
          <div className="detail-price-row">
            <strong>${gift.price.toFixed(2)}</strong>
            <span>{gift.rating} ★</span>
            <span>{gift.stock} in stock</span>
            <span>{gift.category}</span>
          </div>
          <div className="detail-tags">
            {gift.tags.map((tag) => (
              <span key={tag}>{tag}</span>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default GiftDetailsPage;
