import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Login() {
  const navigate = useNavigate();
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loggedInUser, setLoggedInUser] = useState(null);

  // Recommendations data
  const recommendedItems = [
    {
      id: 101,
      name: "Bosch 22 Cu. Ft Stainless Refrigerator",
      model: "B22CS30SNSS",
      price: 2549.15,
      image: "https://images.unsplash.com/photo-1571175482282-466986e287a2?auto=format&fit=crop&q=80&w=100&h=100"
    },
    {
      id: 102,
      name: "Bosch 30\" Stainless Slide-In Range",
      model: "HEI8054U",
      price: 1999.00,
      image: "https://images.unsplash.com/photo-1588854337236-6889d631faa8?auto=format&fit=crop&q=80&w=100&h=100"
    },
    {
      id: 103,
      name: "Bosch Stainless Steel Dishwasher",
      model: "SHX863WD5N",
      price: 899.99,
      image: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&q=80&w=100&h=100"
    },
    {
      id: 104,
      name: "Bosch 1.6 Cu. Ft. Microwave Oven",
      model: "HMV3053U",
      price: 349.00,
      image: "https://images.unsplash.com/photo-1574269909862-7e1d70bb8078?auto=format&fit=crop&q=80&w=100&h=100"
    }
  ];

  // Carousel sliding offset state
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleSlideLeft = () => {
    setCurrentIndex(prev => (prev === 0 ? recommendedItems.length - 1 : prev - 1));
  };

  const handleSlideRight = () => {
    setCurrentIndex(prev => (prev === recommendedItems.length - 1 ? 0 : prev + 1));
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    if (loginEmail && loginPassword) {
      setLoggedInUser(loginEmail);
      alert(`Successfully logged in as: ${loginEmail}`);
      setTimeout(() => {
        navigate('/');
      }, 1000);
    }
  };

  return (
    <div className="w-100 p-5 bg-white border rounded text-start">
      {/* Breadcrumb */}
      <div className="small text-muted mb-4">
        <Link to="/" className="text-primary">Home</Link> &gt; My Account
      </div>
      
      <h3 className="fw-bold mb-4 text-dark text-capitalize">Login Or Create Account</h3>
      
      {loggedInUser ? (
        <div className="alert alert-success py-4 px-3 text-center border-0 mb-5">
          <i className="fa-solid fa-user-check fs-2 mb-3 d-block text-success"></i>
          <h5 className="fw-bold">Welcome Back, {loggedInUser}!</h5>
          <p className="text-muted small mb-0">Redirecting you to the home catalog page...</p>
        </div>
      ) : (
        <div className="bg-light p-4 mb-5 border rounded">
          <div className="row g-4">
            {/* User Login Section */}
            <div className="col-md-6 border-md-end pe-md-5">
              <h6 className="fw-bold mb-3 text-dark">User Login Details</h6>
              <p className="small text-muted mb-4">
                Please sign in below with your login credentials.<br /><br />*Required Fields
              </p>
              
              <form onSubmit={handleLoginSubmit}>
                <div className="row mb-3 align-items-center">
                  <div className="col-sm-3 text-sm-end">
                    <label htmlFor="loginEmail" className="fw-bold small text-dark">Email <span className="text-danger">*</span></label>
                  </div>
                  <div className="col-sm-9">
                    <input 
                      type="email" 
                      className="form-control form-control-sm" 
                      id="loginEmail" 
                      required
                      value={loginEmail}
                      onChange={(e) => setLoginEmail(e.target.value)}
                    />
                  </div>
                </div>
                <div className="row mb-3 align-items-center">
                  <div className="col-sm-3 text-sm-end">
                    <label htmlFor="loginPassword" className="fw-bold small text-dark">Password <span className="text-danger">*</span></label>
                  </div>
                  <div className="col-sm-9">
                    <input 
                      type="password" 
                      className="form-control form-control-sm" 
                      id="loginPassword" 
                      required
                      value={loginPassword}
                      onChange={(e) => setLoginPassword(e.target.value)}
                    />
                  </div>
                </div>
                
                <div className="row mb-3">
                  <div className="col-sm-9 offset-sm-3">
                    <div className="form-check text-start">
                      <input className="form-check-input" type="checkbox" id="rememberMe" />
                      <label className="form-check-label small text-muted" htmlFor="rememberMe">
                        Remember me the next time I visit
                      </label>
                    </div>
                  </div>
                </div>
                
                <div className="row">
                  <div className="col-sm-9 offset-sm-3 d-flex align-items-center justify-content-between flex-wrap gap-2">
                    <button type="submit" className="btn-red pt-2 pb-2 ps-4 pe-4 border-0">SIGN IN</button>
                    <a href="#" className="small text-primary text-decoration-none" onClick={(e) => { e.preventDefault(); alert("Password reset link sent!"); }}>
                      Forgot your password?
                    </a>
                  </div>
                </div>
              </form>
            </div>
            
            {/* New Customer Section */}
            <div className="col-md-6 ps-md-5">
              <h6 className="fw-bold mb-3 text-dark">New Customer</h6>
              <p className="small text-muted mb-3">As a registered Hotspring customer you can:</p>
              <ul className="small text-muted list-unstyled mb-4 text-start">
                <li className="mb-2">&bull; Store billing & shipping information</li>
                <li className="mb-2">&bull; Check your order delivery status</li>
                <li className="mb-2">&bull; Track shipping configurations</li>
                <li className="mb-2">&bull; View your detailed order history</li>
              </ul>
              
              <button 
                type="button" 
                className="btn-red pt-2 pb-2 ps-4 pe-4 border-0"
                onClick={() => alert("Registration form coming soon! Enjoy browsing the spa catalogs.")}
              >
                CREATE NEW ACCOUNT
              </button>
            </div>
          </div>
        </div>
      )}
      
      {/* Related Items Slider */}
      <h6 className="fw-bold mb-3 mt-5 text-dark">Customers Who Viewed Spas Also Viewed</h6>
      <div className="d-flex align-items-center justify-content-between border rounded bg-light p-3">
        <button 
          onClick={handleSlideLeft} 
          className="btn btn-sm btn-outline-danger rounded-circle d-flex align-items-center justify-content-center p-2" 
          style={{ width: '32px', height: '32px' }}
        >
          <i className="fa-solid fa-chevron-left"></i>
        </button>
        
        {/* Rec Grid */}
        <div className="d-flex overflow-hidden mx-3 flex-grow-1">
          <div className="row w-100 g-3">
            {/* Display 2 items at a time dynamically */}
            {[0, 1].map(offset => {
              const idx = (currentIndex + offset) % recommendedItems.length;
              const item = recommendedItems[idx];
              return (
                <div className="col-md-6" key={item.id}>
                  <div className="d-flex align-items-center bg-white p-3 border rounded h-100">
                    <img 
                      src={item.image} 
                      alt={item.name} 
                      className="border me-3 p-1 bg-white rounded" 
                      style={{ width: '80px', height: '80px', objectFit: 'cover' }}
                    />
                    <div className="text-start">
                      <div className="price small text-danger fw-bold" style={{ fontSize: '15px' }}>
                        ${item.price.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                      </div>
                      <div className="text-muted fw-semibold mt-1" style={{ fontSize: '11px', lineHeight: 1.3 }}>
                        {item.name}<br />
                        <span className="text-dark font-monospace small">Model: {item.model}</span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        
        <button 
          onClick={handleSlideRight} 
          className="btn btn-sm btn-outline-danger rounded-circle d-flex align-items-center justify-content-center p-2" 
          style={{ width: '32px', height: '32px' }}
        >
          <i className="fa-solid fa-chevron-right"></i>
        </button>
      </div>
    </div>
  );
}
