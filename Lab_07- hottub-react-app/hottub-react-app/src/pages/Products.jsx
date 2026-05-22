import React, { useState, useMemo } from 'react';
import ProductCard from '../components/ProductCard';

export default function Products({ products = [], onAddToCart, searchQuery = '' }) {
  const [selectedBrand, setSelectedBrand] = useState('All');

  // Filter products by brand and search query
  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      const matchesBrand = selectedBrand === 'All' || product.brand.toLowerCase() === selectedBrand.toLowerCase();
      const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            product.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesBrand && matchesSearch;
    });
  }, [products, selectedBrand, searchQuery]);

  const brands = ['All', 'Hotspring', 'Caldera', 'Oceanic', 'Island'];

  return (
    <div className="w-100 p-4 bg-white border rounded">
      {/* Breadcrumb */}
      <div className="small text-muted mb-4 text-start">
        Home &gt; Spa Catalog &gt; <span className="text-dark fw-bold">{selectedBrand} Spas</span>
      </div>

      <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center border-bottom pb-3 mb-4">
        <h4 className="fw-bold text-dark mb-3 mb-md-0 text-start">
          OUR SPA CATALOG {searchQuery && `(Search results for "${searchQuery}")`}
        </h4>
        
        {/* Brand Filters */}
        <div className="d-flex flex-wrap gap-2">
          {brands.map(brand => (
            <button
              key={brand}
              onClick={() => setSelectedBrand(brand)}
              className={`btn px-3 py-1 btn-sm rounded-pill fw-semibold ${
                selectedBrand === brand 
                  ? 'btn-danger text-white' 
                  : 'btn-outline-secondary'
              }`}
              style={{ fontSize: '12px', transition: 'all 0.2s' }}
            >
              {brand.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      {filteredProducts.length > 0 ? (
        <div className="row g-4">
          {filteredProducts.map(product => (
            <div className="col-md-3 col-sm-6" key={product.id}>
              <ProductCard product={product} onAddToCart={onAddToCart} />
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-5">
          <i className="fa-solid fa-face-frown text-muted mb-3" style={{ fontSize: '48px' }}></i>
          <h5 className="text-muted fw-bold">No Spas Found</h5>
          <p className="text-muted small">We couldn't find any spas matching your selection. Try adjusting your filters or search query!</p>
          <button className="btn btn-danger btn-sm px-4 mt-2" onClick={() => { setSelectedBrand('All'); }}>
            RESET FILTERS
          </button>
        </div>
      )}
    </div>
  );
}
