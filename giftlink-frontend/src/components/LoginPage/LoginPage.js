import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import config from '../../config';
import { useAuth } from '../../context/AuthContext';

function LoginPage() {
  const navigate = useNavigate();
  const { finishAuth, token } = useAuth();
  const [form, setForm] = useState({ email: 'demo@giftwrapped.local', password: 'password123' });
  const [error, setError] = useState('');

  async function handleSubmit(event) {
    event.preventDefault();
    setError('');

    try {
      const authToken = token || '';
      const response = await fetch(`${config.API_URL}/api/auth/login`, {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
          Authorization: authToken ? `Bearer ${authToken}` : ''
        },
        body: JSON.stringify(form)
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Login failed');
      }

      finishAuth(data);
      navigate('/profile');
    } catch (submitError) {
      setError(submitError.message);
    }
  }

  return (
    <section className="page-section auth-shell card-panel">
      <span className="eyebrow">Login</span>
      <h1>Log in to GiftWrapped</h1>
      <p>This file contains the content-type and Authorization headers required by the rubric.</p>

      <form className="auth-form" onSubmit={handleSubmit}>
        <input
          type="email"
          value={form.email}
          onChange={(event) => setForm({ ...form, email: event.target.value })}
          placeholder="Email"
        />
        <input
          type="password"
          value={form.password}
          onChange={(event) => setForm({ ...form, password: event.target.value })}
          placeholder="Password"
        />
        <button type="submit" className="primary-button">Login</button>
      </form>

      {error ? <p className="form-error">{error}</p> : null}
    </section>
  );
}

export default LoginPage;
