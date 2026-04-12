function FilterBar({ filters, setFilters }) {
  function update(key, value) {
    setFilters((current) => ({ ...current, [key]: value }));
  }

  return (
    <div className="filter-bar card-panel">
      <input
        type="text"
        placeholder="Search gifts, categories, recipients..."
        value={filters.q}
        onChange={(event) => update('q', event.target.value)}
      />

      <select value={filters.category} onChange={(event) => update('category', event.target.value)}>
        <option value="">All categories</option>
        <option value="Cozy Home">Cozy Home</option>
        <option value="Desk Delight">Desk Delight</option>
        <option value="Self-Care">Self-Care</option>
        <option value="Kitchen Joy">Kitchen Joy</option>
        <option value="Tech Trinkets">Tech Trinkets</option>
        <option value="Garden Glow">Garden Glow</option>
        <option value="Reading Nook">Reading Nook</option>
        <option value="Party Sparkle">Party Sparkle</option>
        <option value="Kids Wonder">Kids Wonder</option>
        <option value="Pet Parade">Pet Parade</option>
        <option value="Travel Treasure">Travel Treasure</option>
        <option value="Artful Keepsake">Artful Keepsake</option>
      </select>

      <select value={filters.recipient} onChange={(event) => update('recipient', event.target.value)}>
        <option value="">All recipients</option>
        <option value="homebodies">Homebodies</option>
        <option value="students">Students</option>
        <option value="best friends">Best friends</option>
        <option value="hosts">Hosts</option>
        <option value="gamers">Gamers</option>
        <option value="plant parents">Plant parents</option>
        <option value="bookworms">Bookworms</option>
        <option value="party planners">Party planners</option>
        <option value="kids">Kids</option>
        <option value="pet parents">Pet parents</option>
        <option value="travelers">Travelers</option>
        <option value="artists">Artists</option>
      </select>

      <select value={filters.sort} onChange={(event) => update('sort', event.target.value)}>
        <option value="featured">Featured</option>
        <option value="rating">Top rated</option>
        <option value="price-asc">Price: low to high</option>
        <option value="price-desc">Price: high to low</option>
        <option value="name">Name</option>
      </select>
    </div>
  );
}

export default FilterBar;
