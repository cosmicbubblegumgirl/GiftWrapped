function resolveApiUrl() {
  const fromEnv = process.env.https://giftwrapped-backend.onrender.com;

  if (typeof window !== 'undefined') {
    const { hostname } = window.location;

    // In Codespaces dev, use same-origin + CRA proxy to avoid cross-port tunnel auth/CORS issues.
    if (hostname.endsWith('.app.github.dev')) {
      if (!fromEnv || /localhost|127\.0\.0\.1/.test(fromEnv)) {
        return '';
      }
    }

    // Local dev also works best with same-origin + CRA proxy.
    if ((hostname === 'localhost' || hostname === '127.0.0.1') && (!fromEnv || /localhost|127\.0\.0\.1/.test(fromEnv))) {
      return '';
    }
  }

  if (fromEnv) {
    return fromEnv;
  }

  return 'http://localhost:5000';
}

const config = {
  API_URL: resolveApiUrl()
};

export default config;
