import React from 'react';

export default function ProductCard({ product, onAddToCart }) {
  const { name, description, price, image } = product;

  return (
    <div className="product-card text-center d-flex flex-column h-100">
      <div className="p-2 flex-grow-1 d-flex align-items-center justify-content-center" style={{ minHeight: '160px' }}>
        <img 
          src={image || "https://images.unsplash.com/photo-1572331165267-854da2ba12fb?auto=format&fit=crop&q=80&w=300&h=200"} 
          alt={name} 
          className="img-fluid mb-3 rounded"
          style={{ maxHeight: '150px', objectFit: 'cover', width: '100%' }}
        />
      </div>
      <div className="text-start bg-light p-3 border-top w-100" style={{ margin: '0' }}>
        <h6 style={{ fontSize: '12px', fontWeight: 700, minHeight: '32px' }} className="text-dark text-uppercase">
          {name}
        </h6>
        <p className="text-muted" style={{ fontSize: '11px', lineHeight: 1.3, height: '45px', overflow: 'hidden' }}>
          {description}
        </p>
        <div className="price mb-2">${price.toFixed(2)}</div>
        
        <div className="d-flex align-items-stretch mb-3">
          <div className="bg-dark text-white px-3 d-flex align-items-center" style={{ borderTopLeftRadius: '2px', borderBottomLeftRadius: '2px' }}>
            <i className="fa-solid fa-cart-shopping"></i>
          </div>
          <button 
            className="btn-red flex-grow-1 fw-bold" 
            style={{ borderRadius: '0 2px 2px 0', border: 'none' }}
            onClick={() => onAddToCart(product)}
          >
            ADD TO CART
          </button>
        </div>
        
        <div className="d-flex justify-content-between mt-2 pt-2 border-top">
          <a href="#" className="wish-list-btn fw-bold" onClick={(e) => { e.preventDefault(); alert(`${name} added to Wish List!`); }}>
            ADD TO WISH LIST
          </a>
          <a href="#" className="wish-list-btn text-danger fw-bold" onClick={(e) => { e.preventDefault(); alert(`Specifications for ${name}:\nPrice: $${price.toFixed(2)}\nDescription: ${description}`); }}>
            MORE DETAILS
          </a>
        </div>
      </div>
    </div>
  );
}
