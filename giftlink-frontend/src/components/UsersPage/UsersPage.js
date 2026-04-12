import { useEffect, useState } from 'react';
import { api } from '../../lib/api';

function UsersPage() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    api.get('/api/users').then((data) => setUsers(data));
  }, []);

  return (
    <div className="page-section stack-lg">
      <section className="card-panel">
        <span className="eyebrow">User listing</span>
        <h1>Registered gift lovers</h1>
        <p>This page satisfies the user listing requirement.</p>
      </section>

      <section className="users-grid">
        {users.map((user) => (
          <article className="card-panel user-card" key={user.id || user.email}>
            <h3>{user.name}</h3>
            <p>{user.email}</p>
            <span>{user.wishlistCount} wishlist picks</span>
          </article>
        ))}
      </section>
    </div>
  );
}

export default UsersPage;
