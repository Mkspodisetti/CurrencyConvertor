import { Link, useLocation } from 'react-router-dom';
import Logo from './Logo';

const Navbar = () => {
  const location = useLocation();

  return (
    <div className="navbar-container">
      <nav className="navbar">
        <div className="logo-container">
          <Logo />
          <span className="app-name">Currency Converter</span>
        </div>
        <ul className="nav-links">
          <li className={location.pathname === '/' ? 'active' : ''}>
            <Link to="/">Home</Link>
          </li>
          <li className={location.pathname === '/about' ? 'active' : ''}>
            <Link to="/about">About</Link>
          </li>
          <div className="nav-slider"></div>
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;