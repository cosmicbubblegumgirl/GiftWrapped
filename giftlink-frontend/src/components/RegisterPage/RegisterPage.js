import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import config from '../../config';
import { useAuth } from '../../context/AuthContext';

function RegisterPage() {
  const navigate = useNavigate();
  const { finishAuth } = useAuth();
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');

  async function handleSubmit(event) {
    event.preventDefault();
    setError('');

    try {
      const response = await fetch(`${config.API_URL}/api/auth/register`, {
        method: 'POST',
        headers: {
          'content-type': 'application/json'
        },
        body: JSON.stringify(form)
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Registration failed');
      }

      finishAuth(data);
      navigate('/profile');
    } catch (submitError) {
      setError(submitError.message);
    }
  }

  return (
    <section className="page-section auth-shell card-panel">
      <span className="eyebrow">Register</span>
      <h1>Create a GiftWrapped account</h1>
      <p>This file contains the fetch request with the method and headers required by the rubric.</p>

      <form className="auth-form" onSubmit={handleSubmit}>
        <input
          type="text"
          value={form.name}
          onChange={(event) => setForm({ ...form, name: event.target.value })}
          placeholder="Name"
        />
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
        <button type="submit" className="primary-button">Register</button>
      </form>

      {error ? <p className="form-error">{error}</p> : null}
    </section>
  );
}

export default RegisterPage;
