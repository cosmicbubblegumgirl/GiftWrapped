/* jshint esversion: 11, node: true */
function filterGifts(gifts, query = {}) {
  const q = String(query.q || '').trim().toLowerCase();
  const category = String(query.category || '').trim().toLowerCase();
  const recipient = String(query.recipient || '').trim().toLowerCase();
  const occasion = String(query.occasion || '').trim().toLowerCase();
  const sort = String(query.sort || 'featured');

  let results = [...gifts];

  if (q) {
    results = results.filter((gift) => {
      const haystack = [gift.name, gift.category, gift.recipient, gift.occasion, gift.description, ...(gift.tags || [])]
        .join(' ')
        .toLowerCase();
      return haystack.includes(q);
    });
  }

  if (category) {
    results = results.filter((gift) => gift.category.toLowerCase() === category);
  }

  if (recipient) {
    results = results.filter((gift) => gift.recipient.toLowerCase() === recipient);
  }

  if (occasion) {
    results = results.filter((gift) => gift.occasion.toLowerCase() === occasion);
  }

  switch (sort) {
    case 'price-asc':
      results.sort((a, b) => a.price - b.price);
      break;
    case 'price-desc':
      results.sort((a, b) => b.price - a.price);
      break;
    case 'name':
      results.sort((a, b) => a.name.localeCompare(b.name));
      break;
    case 'rating':
      results.sort((a, b) => b.rating - a.rating);
      break;
    default:
      results.sort((a, b) => b.rating - a.rating || a.price - b.price);
  }

  return results;
}

module.exports = {
  filterGifts
};
