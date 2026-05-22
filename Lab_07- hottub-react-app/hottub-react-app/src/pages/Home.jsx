import React from 'react';
import ProductCard from '../components/ProductCard';

export default function Home({ products = [], onAddToCart }) {
  // Show first 4 products as "NEW PRODUCTS" on homepage
  const newProducts = products.slice(0, 4);

  return (
    <div className="w-100">
      {/* Hero Section */}
      <div className="position-relative w-100 mb-4 rounded overflow-hidden" style={{ height: '400px', background: '#000' }}>
        <img 
          src="https://images.unsplash.com/photo-1572331165267-854da2ba12fb?auto=format&fit=crop&q=80&w=1200&h=400" 
          alt="Barrier Reef Spa" 
          className="w-100 h-100" 
          style={{ objectFit: 'cover', opacity: 0.7 }} 
        />
        <div className="position-absolute top-0 start-0 w-100 h-100 d-flex align-items-center" style={{ paddingLeft: '50px', background: 'linear-gradient(to right, rgba(0,0,0,0.85), transparent)' }}>
          <div style={{ maxWidth: '450px' }} className="text-start">
            <h2 style={{ color: 'var(--primary-red)', fontSize: '36px', fontWeight: 700, lineHeight: 1.1, marginBottom: '20px' }}>
              Barrier Reef 158 Jet<br /> TV- Stereo - Home Theater<br /> Super Spa
            </h2>
            <p className="text-white small mb-4">
              Extra Large and Deep 8 Person 158 Jet Super Spa, TV-Home Theater Spa System. Engineered for ultimate hydrotherapy comfort.
            </p>
            <div className="text-white fs-2 fw-bold mb-3">$4,899.00</div>
            <button 
              className="btn-red pt-2 pb-2 ps-4 pe-4" 
              style={{ fontSize: '16px' }}
              onClick={() => alert("Barrier Reef 158 Jet Super Spa:\n8 Person Spa with 158 Jets, Dual TV screen, Stereo surround system, Bluetooth controls.")}
            >
              More Details
            </button>
          </div>
        </div>
        
        {/* Carousel indicators */}
        <div className="position-absolute bottom-0 end-0 p-3 d-flex gap-1">
          <span className="rounded-circle bg-white opacity-50" style={{ width: '8px', height: '8px' }}></span>
          <span className="rounded-circle bg-white opacity-50" style={{ width: '8px', height: '8px' }}></span>
          <span className="rounded-circle" style={{ width: '8px', height: '8px', backgroundColor: 'var(--primary-red)' }}></span>
        </div>
      </div>

      {/* Promo Banners */}
      <div className="row g-0 text-white text-center mb-4 rounded overflow-hidden" style={{ minHeight: '180px' }}>
        {/* Promo 1 */}
        <div className="col-md-4 d-flex flex-column justify-content-center p-4" style={{ background: 'linear-gradient(to bottom, #1d436a, #0b1a2d)' }}>
          <h3 className="fw-bold mb-1">5-7 PERSON<br />SPA</h3>
          <p style={{ fontSize: '10px', letterSpacing: '1px', textTransform: 'uppercase' }} className="text-light opacity-75 mb-0">
            Engineered for high comfort family experiences and relaxing retreats.
          </p>
        </div>
        
        {/* Promo 2 */}
        <div className="col-md-4 position-relative d-flex flex-column justify-content-end pb-3 pt-5 px-4" style={{ background: '#2b3945' }}>
          <div className="position-absolute top-0 start-50 translate-middle-x mt-2">
            <img 
              src="https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&q=80&w=120&h=80" 
              alt="Spa Spa" 
              className="rounded border border-secondary"
              style={{ height: '60px', width: '100px', objectFit: 'cover' }}
            />
          </div>
          <h4 className="fw-normal mb-1">TV THEATER SPA</h4>
          <p style={{ fontSize: '10px', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: 0 }} className="text-light opacity-75">
            Premium LCD displays and integrated sound systems.
          </p>
        </div>
        
        {/* Promo 3 */}
        <div className="col-md-4 d-flex flex-column justify-content-center p-4" style={{ backgroundColor: 'var(--primary-red)' }}>
          <h2 className="fw-bold mb-1" style={{ fontSize: '40px', lineHeight: 0.9 }}>SAVE<br />50%</h2>
          <p style={{ fontSize: '10px', letterSpacing: '1px', textTransform: 'uppercase', marginTop: '10px' }} className="text-white opacity-75 mb-0">
            Exclusive showroom clearance deals this weekend only!
          </p>
        </div>
      </div>

      {/* Products Grid */}
      <div className="p-4 bg-white border rounded">
        <h5 className="fw-bold text-dark mt-2 mb-4 text-start border-bottom pb-2" style={{ letterSpacing: '0.5px' }}>
          NEW PRODUCTS
        </h5>
        
        <div className="row g-4">
          {newProducts.map(product => (
            <div className="col-md-3 col-sm-6" key={product.id}>
              <ProductCard product={product} onAddToCart={onAddToCart} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
