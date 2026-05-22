import React from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';

export default function Navbar({ cart = [], searchQuery, setSearchQuery }) {
  const navigate = useNavigate();
  
  // Calculate total items in the cart
  const cartCount = cart.reduce((sum, item) => sum + item.qty, 0);
  
  // Calculate total price of items in the cart
  const cartTotal = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    navigate('/products');
  };

  return (
    <header className="w-100">
      {/* Top Bar */}
      <div className="top-bar">
        <div className="container d-flex justify-content-between align-items-center">
          <div className="support-text">
            Call for Customer support: <span>020 38989565</span>
          </div>
          <div className="top-links">
            <Link to="/login">My Account</Link>
            <a href="#" onClick={(e) => e.preventDefault()}>Wishlist</a>
            <Link to="/cart">To Checkout</Link>
          </div>
        </div>
      </div>

      {/* Middle Bar */}
      <div className="middle-bar">
        <div className="container d-flex justify-content-between align-items-center">
          {/* Logo Area */}
          <Link to="/" className="logo-area text-decoration-none">
            <h1 className="logo-text">
              HOT<span style={{ color: '#da1c22', fontWeight: 400 }}>SPRING</span>
              <sup style={{ fontSize: '12px', color: '#777' }}>&reg;</sup>
            </h1>
            <p className="logo-subtext">Portable Spas</p>
          </Link>

          {/* Cart Area */}
          <div 
            className="cart-dropdown d-flex justify-content-between align-items-center" 
            style={{ width: '240px' }}
            onClick={() => navigate('/cart')}
          >
            <div className="d-flex align-items-center">
              <i className="fa-solid fa-cart-shopping cart-icon-bg"></i>
              <span className="fw-semibold">
                My Cart: {cartCount} item{cartCount !== 1 ? 's' : ''} (${cartTotal.toFixed(2)})
              </span>
            </div>
            <i className="fa-solid fa-chevron-down text-muted small ms-2"></i>
          </div>
        </div>
      </div>

      {/* Bottom Nav Bar (Red) */}
      <nav className="navbar navbar-expand-lg bottom-nav p-0">
        <div className="container">
          <button 
            className="navbar-toggler text-white my-2 border-0" 
            type="button" 
            data-bs-toggle="collapse" 
            data-bs-target="#mainNav"
            aria-controls="mainNav" 
            aria-expanded="false" 
            aria-label="Toggle navigation"
          >
            <i className="fa-solid fa-bars"></i>
          </button>
          
          <div className="collapse navbar-collapse" id="mainNav">
            <ul className="navbar-nav me-auto">
              <li className="nav-item">
                <NavLink 
                  className={({ isActive }) => `nav-link ${isActive ? 'active-route' : ''}`} 
                  to="/"
                >
                  HOME
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink 
                  className={({ isActive }) => `nav-link ${isActive ? 'active-route' : ''}`} 
                  to="/products"
                >
                  PRODUCTS
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink 
                  className={({ isActive }) => `nav-link ${isActive ? 'active-route' : ''}`} 
                  to="/about"
                >
                  ABOUT US
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink 
                  className={({ isActive }) => `nav-link ${isActive ? 'active-route' : ''}`} 
                  to="/contact"
                >
                  CONTACT US
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink 
                  className={({ isActive }) => `nav-link ${isActive ? 'active-route' : ''}`} 
                  to="/login"
                >
                  LOGIN
                </NavLink>
              </li>
            </ul>
            
            <form onSubmit={handleSearchSubmit} className="search-container ms-auto my-2 my-lg-0">
              <input 
                type="text" 
                className="search-input form-control" 
                placeholder="Search Spas..." 
                aria-label="Search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button className="search-btn" type="submit">SEARCH</button>
            </form>
          </div>
        </div>
      </nav>
    </header>
  );
}
