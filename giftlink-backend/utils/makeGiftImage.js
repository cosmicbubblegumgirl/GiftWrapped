/* jshint esversion: 11, node: true */
function makeGiftImage({ title, category, icon, accent, wrap, ribbon }) {
  const safeTitle = title.replace(/&/g, '&amp;');
  const safeCategory = category.replace(/&/g, '&amp;');

  const svg = `
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600">
    <defs>
      <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stop-color="${wrap}" />
        <stop offset="100%" stop-color="#fffdf8" />
      </linearGradient>
      <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
        <feDropShadow dx="0" dy="16" stdDeviation="16" flood-opacity="0.18" />
      </filter>
    </defs>

    <rect width="800" height="600" rx="44" fill="url(#bg)" />
    <circle cx="720" cy="80" r="42" fill="${accent}" opacity="0.12" />
    <circle cx="108" cy="118" r="24" fill="${ribbon}" opacity="0.18" />
    <circle cx="690" cy="500" r="28" fill="${ribbon}" opacity="0.14" />

    <g filter="url(#shadow)">
      <rect x="160" y="180" width="480" height="270" rx="28" fill="#ffffff" />
      <rect x="160" y="180" width="480" height="270" rx="28" fill="${wrap}" opacity="0.48" />
      <rect x="386" y="180" width="28" height="270" rx="12" fill="${ribbon}" />
      <rect x="160" y="294" width="480" height="28" rx="12" fill="${ribbon}" />
      <rect x="246" y="138" width="308" height="76" rx="26" fill="#fffdf9" stroke="${accent}" stroke-width="6" />
      <text x="400" y="192" text-anchor="middle" font-size="44">${icon}</text>
      <path d="M400 154 C365 88 310 118 346 170" fill="none" stroke="${accent}" stroke-width="16" stroke-linecap="round" />
      <path d="M400 154 C435 88 490 118 454 170" fill="none" stroke="${accent}" stroke-width="16" stroke-linecap="round" />
    </g>

    <text x="400" y="498" text-anchor="middle" font-family="Verdana, sans-serif" font-size="34" font-weight="700" fill="#392b44">${safeTitle}</text>
    <text x="400" y="538" text-anchor="middle" font-family="Verdana, sans-serif" font-size="22" fill="#6c5778">${safeCategory}</text>
  </svg>`;

  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
}

module.exports = {
  makeGiftImage
};
