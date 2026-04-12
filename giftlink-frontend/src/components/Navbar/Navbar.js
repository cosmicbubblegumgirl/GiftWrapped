import { Link, NavLink } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

function Navbar() {
  const { user, logout } = useAuth();

  return (
    <header className="site-header">
      <div className="brand-mark">
        <Link to="/" className="brand-mark__link">
          <span className="brand-mark__icon">🎁</span>
          <div>
            <strong>GiftWrapped</strong>
            <small>wrapped with wonder</small>
          </div>
        </Link>
      </div>

      <nav className="site-nav">
        <NavLink to="/">Landing</NavLink>
        <NavLink to="/main">Main</NavLink>
        <NavLink to="/search">Search</NavLink>
        <NavLink to="/users">Users</NavLink>
        {user ? <NavLink to="/profile">Profile</NavLink> : <NavLink to="/login">Login</NavLink>}
        {!user ? <NavLink to="/register">Register</NavLink> : null}
        {user ? <span className="user-pill">Hello, {user.name}</span> : null}
        {user ? (
          <button className="nav-button" onClick={logout} type="button">
            Logout
          </button>
        ) : null}
      </nav>
    </header>
  );
}

export default Navbar;
