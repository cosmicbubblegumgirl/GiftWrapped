import { useEffect, useState } from 'react';
import FilterBar from '../FilterBar/FilterBar';
import GiftCard from '../GiftCard/GiftCard';
import { api } from '../../lib/api';

function SearchPage() {
  const [filters, setFilters] = useState({
    q: '',
    category: '',
    recipient: '',
    sort: 'featured'
  });
  const [results, setResults] = useState([]);

  useEffect(() => {
    const params = new URLSearchParams();
    Object.entries(filters).forEach(([key, value]) => {
      if (value) {
        params.set(key, value);
      }
    });

    api.get(`/api/search?${params.toString()}`).then((data) => setResults(data.results));
  }, [filters]);

  return (
    <div className="page-section stack-lg">
      <section className="card-panel">
        <span className="eyebrow">Search results</span>
        <h1>Search by keyword, category, recipient, and sort order.</h1>
        <p>This page is ready for the assignment search-results screenshot.</p>
      </section>

      <FilterBar filters={filters} setFilters={setFilters} />

      <section className="section-heading">
        <div>
          <span className="eyebrow">Matching gifts</span>
          <h2>{results.length} gifts found</h2>
        </div>
      </section>

      <section className="gift-grid">
        {results.map((gift) => (
          <GiftCard key={gift.id} gift={gift} />
        ))}
      </section>
    </div>
  );
}

export default SearchPage;
