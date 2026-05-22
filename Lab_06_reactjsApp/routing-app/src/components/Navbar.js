import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = ({ cartCount }) => {
  const location = useLocation();

  const isActive = (path) => location.pathname === path ? 'active-link' : '';

  return (
    <nav className="main-navbar">
      <div className="nav-brand">
        <Link to="/" className="brand-logo">
          <span className="logo-spark">✦</span> CoreTech
        </Link>
      </div>
      <div className="nav-links">
        <Link to="/" className={`nav-item ${isActive('/')}`}>Home</Link>
        <Link to="/products" className={`nav-item ${isActive('/products')}`}>Products</Link>
        <Link to="/about" className={`nav-item ${isActive('/about')}`}>About</Link>
        <Link to="/contact" className={`nav-item ${isActive('/contact')}`}>Contact</Link>
      </div>
      <div className="nav-cart">
        <div className="cart-badge">
          🛒 Cart <span className="cart-counter">{cartCount}</span>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;