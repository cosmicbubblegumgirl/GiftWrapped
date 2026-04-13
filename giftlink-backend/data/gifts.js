/* jshint esversion: 11, node: true */
const { makeGiftImage } = require('../utils/makeGiftImage');

const descriptors = [
  'Starlit',
  'Ribboned',
  'Moonbeam',
  'Velvet',
  'Sparkle',
  'Tinsel',
  'Keepsake',
  'Twinkle',
  'Fable',
  'Darling',
  'Merry',
  'Whisper',
  'Dewdrop',
  'Petal',
  'Gilded'
];

const themes = [
  {
    category: 'Cozy Home',
    icon: '🕯️',
    wrap: '#fff2e5',
    ribbon: '#b23a48',
    accent: '#f2c94c',
    items: ['Candle Set', 'Knit Throw', 'Ceramic Mug'],
    recipients: ['homebodies', 'roommates', 'new homeowners'],
    occasions: ['housewarmings', 'winter birthdays', 'thank-you gifts']
  },
  {
    category: 'Desk Delight',
    icon: '🖋️',
    wrap: '#f6efff',
    ribbon: '#7b5ea7',
    accent: '#f2c94c',
    items: ['Planner Bundle', 'Pen Set', 'Desktop Tray'],
    recipients: ['students', 'teachers', 'coworkers'],
    occasions: ['graduations', 'new jobs', 'study milestones']
  },
  {
    category: 'Self-Care',
    icon: '🛁',
    wrap: '#fef4f8',
    ribbon: '#d16b86',
    accent: '#f2c94c',
    items: ['Spa Box', 'Silk Sleep Set', 'Bath Ritual Kit'],
    recipients: ['best friends', 'sisters', 'busy parents'],
    occasions: ['birthdays', 'care packages', 'rest days']
  },
  {
    category: 'Kitchen Joy',
    icon: '🍰',
    wrap: '#fff7df',
    ribbon: '#d97706',
    accent: '#7b5ea7',
    items: ['Recipe Tin', 'Baker Bundle', 'Tea Time Set'],
    recipients: ['hosts', 'bakers', 'food lovers'],
    occasions: ['bridal showers', 'housewarmings', 'holiday swaps']
  },
  {
    category: 'Tech Trinkets',
    icon: '🎧',
    wrap: '#eef6ff',
    ribbon: '#4f46e5',
    accent: '#f2c94c',
    items: ['Audio Kit', 'Smart Desk Lamp', 'Cable Organizer'],
    recipients: ['gamers', 'creators', 'remote workers'],
    occasions: ['birthdays', 'upgrades', 'work anniversaries']
  },
  {
    category: 'Garden Glow',
    icon: '🌿',
    wrap: '#effbf1',
    ribbon: '#2f855a',
    accent: '#f2c94c',
    items: ['Plant Pot Trio', 'Seed Starter Set', 'Botanical Journal'],
    recipients: ['plant parents', 'gardeners', 'nature lovers'],
    occasions: ['spring gifting', 'welcome gifts', 'celebrations']
  },
  {
    category: 'Reading Nook',
    icon: '📚',
    wrap: '#f9f5ef',
    ribbon: '#6b4f3a',
    accent: '#7b5ea7',
    items: ['Book Sleeve', 'Reading Light', 'Bookmark Wallet'],
    recipients: ['bookworms', 'teens', 'librarians'],
    occasions: ['exam season', 'birthdays', 'book club swaps']
  },
  {
    category: 'Party Sparkle',
    icon: '🎉',
    wrap: '#fff0f5',
    ribbon: '#db2777',
    accent: '#f2c94c',
    items: ['Celebration Box', 'Confetti Kit', 'Mini Photo Booth Set'],
    recipients: ['party planners', 'friends', 'event hosts'],
    occasions: ['birthdays', 'engagements', 'surprise parties']
  },
  {
    category: 'Kids Wonder',
    icon: '🧸',
    wrap: '#fff8e8',
    ribbon: '#f59e0b',
    accent: '#7b5ea7',
    items: ['Story Play Set', 'Puzzle Pack', 'Creative Box'],
    recipients: ['kids', 'nieces', 'nephews'],
    occasions: ['birthdays', 'reward gifts', 'holiday surprises']
  },
  {
    category: 'Pet Parade',
    icon: '🐾',
    wrap: '#f5f3ff',
    ribbon: '#8b5cf6',
    accent: '#f2c94c',
    items: ['Pet Pamper Box', 'Treat Jar Set', 'Walking Essentials'],
    recipients: ['pet parents', 'dog lovers', 'cat lovers'],
    occasions: ['pet birthdays', 'welcome-home gifts', 'celebrations']
  },
  {
    category: 'Travel Treasure',
    icon: '🧳',
    wrap: '#eefaf8',
    ribbon: '#0f766e',
    accent: '#f2c94c',
    items: ['Journey Pouch', 'Travel Journal', 'Passport Wallet'],
    recipients: ['travelers', 'graduates', 'adventurers'],
    occasions: ['farewells', 'gap years', 'getaways']
  },
  {
    category: 'Artful Keepsake',
    icon: '🎨',
    wrap: '#fff4f0',
    ribbon: '#c2410c',
    accent: '#7b5ea7',
    items: ['Sketch Ritual Set', 'Mini Gallery Frame', 'Creative Prompt Deck'],
    recipients: ['artists', 'makers', 'dreamers'],
    occasions: ['creative milestones', 'birthdays', 'thank-you moments']
  }
];

const colors = ['Ribbon Red', 'Plum Velvet', 'Lavender Tissue', 'Mint Wrap', 'Champagne Gold', 'Porcelain Cream'];

const gifts = [];

themes.forEach((theme, themeIndex) => {
  descriptors.forEach((descriptor, descriptorIndex) => {
    const itemType = theme.items[descriptorIndex % theme.items.length];
    const name = `${descriptor} ${itemType}`;
    const recipient = theme.recipients[descriptorIndex % theme.recipients.length];
    const occasion = theme.occasions[descriptorIndex % theme.occasions.length];
    const price = Number((18 + themeIndex * 4.5 + descriptorIndex * 2.15).toFixed(2));
    const rating = Number((4.1 + ((descriptorIndex + themeIndex) % 9) * 0.1).toFixed(1));
    const stock = 4 + ((themeIndex * 3 + descriptorIndex) % 22);
    const giftNumber = gifts.length + 1;
    const id = `gift-${String(giftNumber).padStart(3, '0')}`;

    gifts.push({
      id,
      name,
      category: theme.category,
      itemType,
      recipient,
      occasion,
      price,
      rating,
      stock,
      image: makeGiftImage({
        title: name,
        category: theme.category,
        itemType,
        icon: theme.icon,
        accent: theme.accent,
        wrap: theme.wrap,
        ribbon: theme.ribbon
      }),
      description: `${name} is a whimsical ${theme.category.toLowerCase()} gift designed for ${recipient}. It blends practical charm, wrapped-up delight, and celebratory details that make it perfect for ${occasion}.`,
      tags: [descriptor.toLowerCase(), theme.category.toLowerCase(), itemType.toLowerCase(), recipient, occasion, 'giftwrapped'],
      colors: [
        colors[themeIndex % colors.length],
        colors[(themeIndex + 2) % colors.length],
        colors[(descriptorIndex + 1) % colors.length]
      ]
    });
  });
});

module.exports = gifts;
