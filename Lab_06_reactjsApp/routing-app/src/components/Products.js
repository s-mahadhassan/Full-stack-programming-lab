import React from 'react';

const Products = ({ onAddToCart }) => {
  const catalog = [
    {
      id: 'p1',
      title: 'AeroGlide Ergonomic Mouse',
      desc: 'Precision lightweight design featuring 26K DPI optical sensor and magnetic switches.',
      price: '$89.00',
      icon: '🖱️'
    },
    {
      id: 'p2',
      title: 'Vortex Mechanical Keyboard',
      desc: 'Hot-swappable tactile switches with pre-lubed stabilizers, sound damping foam, and customizable RGB.',
      price: '$149.00',
      icon: '⌨️'
    },
    {
      id: 'p3',
      title: 'EchoShield Noise-Canceling Headphones',
      desc: 'Active hybrid noise-canceling headsets containing 40mm dynamics for professional fidelity.',
      price: '$299.00',
      icon: '🎧'
    },
    {
      id: 'p4',
      title: 'Horizon Pro Ultra-Wide Monitor',
      desc: '34-inch curved panoramic OLED screen, 240Hz refresh rate, delivering magnificent colors.',
      price: '$849.00',
      icon: '🖥️'
    }
  ];

  return (
    <div className="page-wrapper products-page fade-in">
      <div className="products-header">
        <span className="section-badge">Premium Hardware</span>
        <h1 className="page-title">Featured Gear</h1>
        <p className="page-subtitle">Elevate your daily development workspace with our top-tier devices.</p>
      </div>

      <div className="products-grid">
        {catalog.map(prod => (
          <div key={prod.id} className="product-card">
            <div className="product-visual">
              <span className="product-emoji">{prod.icon}</span>
            </div>
            <div className="product-body">
              <div className="product-meta">
                <h3 className="product-title">{prod.title}</h3>
                <span className="product-price">{prod.price}</span>
              </div>
              <p className="product-description">{prod.desc}</p>
              <button 
                className="add-to-cart-btn"
                onClick={() => onAddToCart(prod.title)}
              >
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;