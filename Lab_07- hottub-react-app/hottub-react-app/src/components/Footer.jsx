import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email.trim() && email.includes('@')) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 5000);
    }
  };

  return (
    <div className="w-100 mt-5">
      {/* Brands Banner before Footer */}
      <div className="container">
        <div className="footer-brands d-flex justify-content-between align-items-center flex-wrap gap-3">
          {/* Placeholders for brand logos */}
          <img src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=200&h=60" alt="Promo" style={{ height: '40px', objectFit: 'contain' }} />
          <div className="fw-bold text-dark" style={{ fontSize: '18px', letterSpacing: '1px' }}>OCEANIC SPA</div>
          <div className="fw-bold text-muted" style={{ fontSize: '18px', letterSpacing: '1px' }}>CALDERA SPAS</div>
          <div className="fw-bold text-danger" style={{ fontSize: '18px', letterSpacing: '1px' }}>ISLAND SPAS</div>
        </div>
      </div>

      {/* Main Dark Footer */}
      <footer className="footer-dark w-100">
        <div className="container">
          <div className="row">
            {/* Contact Us */}
            <div className="col-md-3 mb-4">
              <h6>CONTACT US</h6>
              <p className="mb-2">yoursitename.com</p>
              <p className="mb-3">CALL 24/7: <span className="fs-6 fw-bold text-danger">888 - 201 - 8899</span></p>
              <p className="mb-1 text-muted">Your Address:</p>
              <p className="mb-0">5000N. Ford avenue</p>
              <p className="mb-0">New York, NY 20145</p>
              <p className="mb-3">United States</p>
              <p>Email: <a href="mailto:serviceemail@yoursitename.com">serviceemail@yoursitename.com</a></p>
              
              <div className="social-icons d-flex mt-3">
                <a href="#" className="social-tw" onClick={(e) => e.preventDefault()}><i className="fa-brands fa-twitter"></i></a>
                <a href="#" className="social-fb" onClick={(e) => e.preventDefault()}><i className="fa-brands fa-facebook-f"></i></a>
                <a href="#" className="social-in" onClick={(e) => e.preventDefault()}><i className="fa-brands fa-linkedin-in"></i></a>
                <a href="#" className="social-gp" onClick={(e) => e.preventDefault()}><i className="fa-brands fa-google-plus-g"></i></a>
                <a href="#" className="social-yt" onClick={(e) => e.preventDefault()}><i className="fa-brands fa-youtube"></i></a>
                <a href="#" className="social-pi" onClick={(e) => e.preventDefault()}><i className="fa-brands fa-pinterest-p"></i></a>
              </div>
            </div>
            
            {/* Information */}
            <div className="col-md-3 mb-4">
              <h6>INFORMATION</h6>
              <ul>
                <li><Link to="/about">ABOUT US</Link></li>
                <li><a href="#" onClick={(e) => e.preventDefault()}>CUSTOMER SERVICE</a></li>
                <li><a href="#" onClick={(e) => e.preventDefault()}>PRIVACY POLICY</a></li>
                <li><a href="#" onClick={(e) => e.preventDefault()}>SITE MAP</a></li>
                <li><a href="#" onClick={(e) => e.preventDefault()}>SEARCH TERMS</a></li>
                <li><Link to="/contact">CONTACT US</Link></li>
              </ul>
            </div>
            
            {/* My Account */}
            <div className="col-md-3 mb-4">
              <h6>MY ACCOUNT</h6>
              <ul>
                <li><Link to="/login">SIGN IN</Link></li>
                <li><Link to="/cart">VIEW CART</Link></li>
                <li><a href="#" onClick={(e) => e.preventDefault()}>MY WISHLIST</a></li>
              </ul>
            </div>
            
            {/* Newsletter */}
            <div className="col-md-3 mb-4">
              <h6>SIGNUP FOR A NEWSLETTER</h6>
              <p className="mb-2 small text-muted">SIGN UP FOR OUR NEWSLETTER:</p>
              
              <form onSubmit={handleSubscribe}>
                <input 
                  type="email" 
                  className="newsletter-input form-control mt-2" 
                  placeholder="Your Email Address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <button type="submit" className="btn-red w-100">SUBSCRIBE</button>
              </form>

              {subscribed && (
                <div className="alert alert-success mt-3 py-2 px-3 small border-0 text-center" style={{ background: 'rgba(25, 135, 84, 0.2)', color: '#2ec4b6' }}>
                  Thank you for subscribing!
                </div>
              )}
              
              <h6 className="mt-4 mb-2" style={{ fontSize: '11px' }}>PAYMENT SOLUTIONS</h6>
              <div className="d-flex gap-1 bg-white p-1 d-inline-block rounded-1">
                {/* CC placeholders with FontAwesome */}
                <div className="text-dark d-flex gap-2 px-2 py-1 align-items-center" style={{ fontSize: '16px' }}>
                  <i className="fa-brands fa-cc-visa text-primary"></i>
                  <i className="fa-brands fa-cc-mastercard text-danger"></i>
                  <i className="fa-brands fa-cc-amex text-info"></i>
                  <i className="fa-brands fa-cc-paypal" style={{ color: '#003087' }}></i>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
      
      {/* Copyright Bar */}
      <div className="copyright-bar text-center">
        <div className="container">
          &copy; {new Date().getFullYear()} Hottubspaservice.com. All Rights Reserved.
        </div>
      </div>
    </div>
  );
}
