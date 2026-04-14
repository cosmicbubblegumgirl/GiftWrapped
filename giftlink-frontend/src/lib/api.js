import config from '../config';
import { fallbackGifts } from './fallbackData';

const LOCAL_USERS_KEY = 'giftwrappedLocalUsers';
const LOCAL_TOKEN_PREFIX = 'local-token:';

function readLocalUsers() {
  try {
    return JSON.parse(localStorage.getItem(LOCAL_USERS_KEY) || '[]');
  } catch (error) {
    return [];
  }
}

function writeLocalUsers(users) {
  localStorage.setItem(LOCAL_USERS_KEY, JSON.stringify(users));
}

function getPathname(path) {
  return path.split('?')[0];
}

function getUserFromToken(token) {
  if (!token || !token.startsWith(LOCAL_TOKEN_PREFIX)) {
    return null;
  }

  const email = token.slice(LOCAL_TOKEN_PREFIX.length);
  return readLocalUsers().find((user) => user.email === email) || null;
}

function searchFallbackGifts(path) {
  const queryString = path.includes('?') ? path.slice(path.indexOf('?') + 1) : '';
  const params = new URLSearchParams(queryString);
  const q = (params.get('q') || '').toLowerCase();
  const category = (params.get('category') || '').toLowerCase();
  const recipient = (params.get('recipient') || '').toLowerCase();
  const sort = params.get('sort') || 'featured';

  let results = fallbackGifts.filter((gift) => {
    const matchesText = !q
      || gift.name.toLowerCase().includes(q)
      || gift.description.toLowerCase().includes(q)
      || gift.tags.some((tag) => String(tag).toLowerCase().includes(q));
    const matchesCategory = !category || gift.category.toLowerCase() === category;
    const matchesRecipient = !recipient || String(gift.recipient).toLowerCase().includes(recipient);

    return matchesText && matchesCategory && matchesRecipient;
  });

  if (sort === 'price-asc') {
    results = [...results].sort((a, b) => a.price - b.price);
  } else if (sort === 'price-desc') {
    results = [...results].sort((a, b) => b.price - a.price);
  } else if (sort === 'rating') {
    results = [...results].sort((a, b) => b.rating - a.rating);
  }

  return { results };
}

function fallbackRequest(path, options) {
  const { method = 'GET', body, token } = options;
  const pathname = getPathname(path);

  if (method === 'GET' && pathname === '/api/gifts') {
    return fallbackGifts;
  }

  if (method === 'GET' && pathname.startsWith('/api/gifts/')) {
    const giftId = pathname.split('/').pop();
    const gift = fallbackGifts.find((item) => String(item.id) === String(giftId));

    if (!gift) {
      throw new Error('Gift not found');
    }

    return gift;
  }

  if (method === 'GET' && pathname === '/api/search') {
    return searchFallbackGifts(path);
  }

  if (method === 'POST' && pathname === '/api/auth/register') {
    const { name, email, password } = body || {};

    if (!name || !email || !password) {
      throw new Error('Name, email, and password are required.');
    }

    const users = readLocalUsers();
    const normalizedEmail = String(email).trim().toLowerCase();
    const existing = users.find((user) => user.email === normalizedEmail);

    if (existing) {
      throw new Error('Email already registered.');
    }

    const newUser = {
      id: `local-${Date.now()}`,
      name: String(name).trim(),
      email: normalizedEmail,
      password: String(password),
      wishlist: []
    };

    users.push(newUser);
    writeLocalUsers(users);

    return {
      token: `${LOCAL_TOKEN_PREFIX}${newUser.email}`,
      user: {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        wishlist: newUser.wishlist
      }
    };
  }

  if (method === 'POST' && pathname === '/api/auth/login') {
    const { email, password } = body || {};
    const normalizedEmail = String(email || '').trim().toLowerCase();
    const user = readLocalUsers().find((entry) => entry.email === normalizedEmail);

    if (!user || user.password !== String(password || '')) {
      throw new Error('Invalid email or password.');
    }

    return {
      token: `${LOCAL_TOKEN_PREFIX}${user.email}`,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        wishlist: user.wishlist || []
      }
    };
  }

  if (method === 'GET' && pathname === '/api/auth/profile') {
    const currentUser = getUserFromToken(token);

    if (!currentUser) {
      throw new Error('User not found.');
    }

    return {
      id: currentUser.id,
      name: currentUser.name,
      email: currentUser.email,
      wishlist: currentUser.wishlist || []
    };
  }

  if (method === 'GET' && pathname === '/api/users') {
    return readLocalUsers().map((user) => ({
      id: user.id,
      name: user.name,
      email: user.email,
      wishlistCount: (user.wishlist || []).length
    }));
  }

  throw new Error('Request failed');
}

function shouldUseFallback(error) {
  if (!config.API_URL || /localhost|127\.0\.0\.1/.test(config.API_URL)) {
    return true;
  }

  const status = Number(error && error.status);
  if ([404, 502, 503, 504].includes(status)) {
    return true;
  }

  return error && error.name === 'TypeError';
}

async function request(path, options = {}) {
  const { method = 'GET', body, token } = options;

  try {
    const response = await fetch(`${config.API_URL}${path}`, {
      method,
      headers: {
        'content-type': 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {})
      },
      ...(body ? { body: JSON.stringify(body) } : {})
    });

    const data = await response.json().catch(() => ({}));

    if (!response.ok) {
      const requestError = new Error(data.error || data.details || 'Request failed');
      requestError.status = response.status;
      throw requestError;
    }

    return data;
  } catch (error) {
    if (shouldUseFallback(error)) {
      return fallbackRequest(path, options);
    }

    throw error;
  }
}

export const api = {
  get: (path, token) => request(path, { method: 'GET', token }),
  post: (path, body, token) => request(path, { method: 'POST', body, token }),
  put: (path, body, token) => request(path, { method: 'PUT', body, token }),
  delete: (path, token) => request(path, { method: 'DELETE', token })
};
