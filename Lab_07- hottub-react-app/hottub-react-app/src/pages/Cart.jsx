import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Cart({ cart = [], onUpdateQty, onRemoveFromCart, onClearCart }) {
  const [zipCode, setZipCode] = useState('');
  const [shippingCost, setShippingCost] = useState(0);
  const [checkoutComplete, setCheckoutComplete] = useState(false);

  const cartSubtotal = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
  const totalItems = cart.reduce((sum, item) => sum + item.qty, 0);

  const handleCalculateShipping = (e) => {
    e.preventDefault();
    if (zipCode.trim()) {
      // Simulate shipping calculation
      setShippingCost(150.00); // flat shipping cost for bulky spa products
    }
  };

  const handleCheckout = () => {
    if (cart.length === 0) return;
    setCheckoutComplete(true);
    onClearCart();
  };

  if (checkoutComplete) {
    return (
      <div className="w-100 p-5 bg-white border rounded text-center">
        <div className="mb-4">
          <i className="fa-solid fa-circle-check text-success" style={{ fontSize: '72px' }}></i>
        </div>
        <h3 className="fw-bold text-dark mb-3">Order Confirmed!</h3>
        <p className="text-muted mb-4 mx-auto" style={{ maxWidth: '500px' }}>
          Thank you for your purchase with Hotspring Portable Spas. We have received your order and will contact you shortly to coordinate shipment and delivery details.
        </p>
        <Link to="/" className="btn btn-danger px-4 py-2 fw-semibold">
          GO BACK TO HOMEPAGE
        </Link>
      </div>
    );
  }

  return (
    <div className="w-100 p-4 bg-white border rounded text-start">
      {/* Breadcrumb */}
      <div className="small text-muted mb-4">
        <Link to="/" className="text-primary">Home</Link> &gt; Shopping Cart
      </div>

      <h3 className="fw-bold text-dark mb-4 border-bottom pb-2">Your Shopping Cart</h3>

      {cart.length === 0 ? (
        <div className="text-center py-5">
          <i className="fa-solid fa-cart-arrow-down text-muted mb-3" style={{ fontSize: '56px' }}></i>
          <h5 className="text-muted fw-bold">Your Cart is Empty</h5>
          <p className="text-muted small">You haven't added any premium hot tubs to your cart yet.</p>
          <Link to="/products" className="btn btn-danger btn-sm px-4 mt-3">
            SHOP SPA CATALOGUE
          </Link>
        </div>
      ) : (
        <div className="row">
          {/* Cart Table List */}
          <div className="col-lg-8 mb-4">
            <div className="table-responsive border rounded bg-light p-2">
              <table className="table table-borderless align-middle mb-0" style={{ fontSize: '13px' }}>
                <thead>
                  <tr className="border-bottom">
                    <th scope="col" style={{ width: '100px' }}>Product</th>
                    <th scope="col">Name</th>
                    <th scope="col" className="text-center">Price</th>
                    <th scope="col" className="text-center" style={{ width: '120px' }}>Quantity</th>
                    <th scope="col" className="text-center">Total</th>
                    <th scope="col" className="text-center">Remove</th>
                  </tr>
                </thead>
                <tbody>
                  {cart.map(item => (
                    <tr key={item.id} className="border-bottom">
                      <td>
                        <img 
                          src={item.image} 
                          alt={item.name} 
                          className="rounded border p-1 bg-white" 
                          style={{ width: '70px', height: '50px', objectFit: 'cover' }} 
                        />
                      </td>
                      <td className="fw-bold text-dark text-uppercase">{item.name}</td>
                      <td className="text-center fw-semibold text-muted">${item.price.toFixed(2)}</td>
                      <td className="text-center">
                        <div className="input-group input-group-sm justify-content-center">
                          <button 
                            className="btn btn-outline-secondary px-2" 
                            type="button"
                            onClick={() => onUpdateQty(item.id, item.qty - 1)}
                          >
                            -
                          </button>
                          <span className="input-group-text bg-white px-3 fw-semibold">{item.qty}</span>
                          <button 
                            className="btn btn-outline-secondary px-2" 
                            type="button"
                            onClick={() => onUpdateQty(item.id, item.qty + 1)}
                          >
                            +
                          </button>
                        </div>
                      </td>
                      <td className="text-center fw-bold text-danger">${(item.price * item.qty).toFixed(2)}</td>
                      <td className="text-center">
                        <button 
                          className="btn btn-sm text-danger border-0" 
                          onClick={() => onRemoveFromCart(item.id)}
                        >
                          <i className="fa-solid fa-trash-can fs-6"></i>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            {/* Clear Cart Button */}
            <div className="mt-3 text-start">
              <button className="btn btn-outline-danger btn-sm fw-semibold" onClick={onClearCart}>
                CLEAR SHOPPING CART
              </button>
            </div>
          </div>

          {/* Cart Summaries */}
          <div className="col-lg-4">
            <div className="border rounded bg-light p-4">
              <h5 className="fw-bold text-dark border-bottom pb-2 mb-3">Order Summary</h5>
              
              <div className="d-flex justify-content-between mb-2" style={{ fontSize: '13px' }}>
                <span className="text-muted">Subtotal ({totalItems} item{totalItems !== 1 ? 's' : ''}):</span>
                <span className="fw-bold text-dark">${cartSubtotal.toFixed(2)}</span>
              </div>
              
              <div className="d-flex justify-content-between mb-3" style={{ fontSize: '13px' }}>
                <span className="text-muted">Estimated Shipping:</span>
                <span className="fw-bold text-dark">
                  {shippingCost > 0 ? `$${shippingCost.toFixed(2)}` : 'Calculated next'}
                </span>
              </div>

              {/* Estimate Shipping Form */}
              <form onSubmit={handleCalculateShipping} className="mb-4 border-top border-bottom py-3">
                <label className="fw-bold small text-muted mb-2">ESTIMATE SHIPPING</label>
                <div className="d-flex gap-2">
                  <input 
                    type="text" 
                    className="form-control form-control-sm" 
                    placeholder="Enter Zip/Postal Code"
                    value={zipCode}
                    onChange={(e) => setZipCode(e.target.value)}
                    required
                  />
                  <button type="submit" className="btn btn-dark btn-sm text-uppercase">APPLY</button>
                </div>
              </form>

              <div className="d-flex justify-content-between mb-4 border-bottom pb-2">
                <span className="fw-bold text-dark fs-6">Order Total:</span>
                <span className="fw-bold text-danger fs-5">${(cartSubtotal + shippingCost).toFixed(2)}</span>
              </div>

              <button 
                className="btn-red w-100 py-3 fw-bold border-0 text-center" 
                style={{ fontSize: '15px', letterSpacing: '0.5px' }}
                onClick={handleCheckout}
              >
                PROCEED TO CHECKOUT
              </button>

              <div className="text-center mt-3">
                <Link to="/products" className="small text-primary text-decoration-none">
                  Continue Spa Shopping &gt;
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
