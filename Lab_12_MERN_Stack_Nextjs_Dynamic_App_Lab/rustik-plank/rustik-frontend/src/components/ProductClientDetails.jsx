"use client";
import { useState } from 'react';

export default function ProductClientDetails({ product }) {
  const [qty, setQty] = useState(1);
  const [activeTab, setActiveTab] = useState('desc');

  const updateQty = (delta) => {
    setQty(prev => Math.max(1, prev + delta));
  };

  return (
    <>
      <div className="product-detail-layout">
        <div>
          <div className="product-detail-img">
            {product.image && product.image !== '/images/placeholder.png' ? (
               <img src={product.image} alt={product.title} style={{ width: '100%', height: '100%', objectFit: 'contain', padding: '20px' }} />
            ) : (
               <div style={{ width: '100%', height: '100%', background: 'linear-gradient(135deg, #d4b896, #c8a882)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '60px', opacity: '0.4', color: '#6b4a2a' }}>
                 <i className="fas fa-image"></i>
               </div>
            )}
          </div>
          <div style={{ display: 'flex', gap: '8px', marginTop: '10px' }}>
            <div style={{ width: '80px', height: '60px', background: 'linear-gradient(135deg,#d4b896,#c8a882)', border: '2px solid var(--orange)', cursor: 'pointer' }}></div>
            <div style={{ width: '80px', height: '60px', background: 'linear-gradient(135deg,#c4a882,#b89070)', border: '1px solid #ddd', cursor: 'pointer' }}></div>
            <div style={{ width: '80px', height: '60px', background: 'linear-gradient(135deg,#b89070,#a87e58)', border: '1px solid #ddd', cursor: 'pointer' }}></div>
          </div>
        </div>

        <div className="product-detail-info">
          <h2>{product.title}</h2>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
            <span style={{ color: '#f5a623', fontSize: '14px' }}>
              <i className="fas fa-star"></i><i className="fas fa-star"></i><i className="fas fa-star"></i><i className="fas fa-star"></i><i className="far fa-star"></i>
            </span>
            <span style={{ fontSize: '12px', color: '#999' }}>(24 reviews)</span>
          </div>

          <div className="det-price">£<span style={{ fontSize: '32px' }}>{Math.floor(product.price)}</span>.{(product.price % 1).toFixed(2).substring(2)}</div>
          {product.oldPrice && <div style={{ fontSize: '12px', color: '#aaa', textDecoration: 'line-through', marginTop: '-14px', marginBottom: '14px' }}>£{product.oldPrice}</div>}

          <p>{product.description}</p>

          <div style={{ marginBottom: '16px', fontSize: '13px' }}>
            <div style={{ marginBottom: '6px' }}><strong>Availability:</strong> <span style={{ color: 'green' }}>In Stock</span></div>
            <div style={{ marginBottom: '6px' }}><strong>Category:</strong> {product.category}</div>
            <div style={{ marginBottom: '6px' }}><strong>Material:</strong> Reclaimed Oak</div>
            <div><strong>Dimensions:</strong> 80cm × 90cm × 100cm</div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
            <label style={{ fontSize: '13px', fontWeight: 'bold' }}>Qty:</label>
            <div style={{ display: 'flex', border: '1px solid #ccc' }}>
              <button onClick={() => updateQty(-1)} style={{ padding: '6px 12px', border: 'none', background: '#f5f5f5', cursor: 'pointer', fontSize: '16px' }}>−</button>
              <input type="number" value={qty} readOnly style={{ width: '50px', textAlign: 'center', border: 'none', borderLeft: '1px solid #ccc', borderRight: '1px solid #ccc', outline: 'none', fontSize: '13px' }} />
              <button onClick={() => updateQty(1)} style={{ padding: '6px 12px', border: 'none', background: '#f5f5f5', cursor: 'pointer', fontSize: '16px' }}>+</button>
            </div>
          </div>

          <div className="det-actions">
            <button className="btn-add-cart" style={{ padding: '12px 24px', fontSize: '13px' }}>
              Add to Cart &nbsp;<i className="fas fa-shopping-cart"></i>
            </button>
            <button style={{ padding: '12px 24px', fontSize: '13px', border: '1px solid #ccc', background: 'none', cursor: 'pointer', color: '#555', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '1px' }}>
              <i className="far fa-heart"></i> Wishlist
            </button>
          </div>
        </div>
      </div>

      <div className="product-tabs" style={{ border: '1px solid #ddd', marginBottom: '30px' }}>
        <div className="tabs-header" style={{ display: 'flex', borderBottom: '1px solid #ddd', background: '#f9f9f9' }}>
          {['desc', 'spec', 'rev'].map(t => (
            <button
              key={t}
              onClick={() => setActiveTab(t)}
              style={{
                padding: '12px 24px', border: 'none',
                background: activeTab === t ? 'var(--orange)' : 'none',
                color: activeTab === t ? '#fff' : '#555',
                fontSize: '13px', fontWeight: activeTab === t ? 'bold' : 'normal',
                cursor: 'pointer', borderRight: t !== 'rev' ? '1px solid #ddd' : 'none'
              }}
            >
              {t === 'desc' ? 'Description' : t === 'spec' ? 'Specifications' : 'Reviews (24)'}
            </button>
          ))}
        </div>
        <div style={{ padding: '20px' }}>
          {activeTab === 'desc' && (
            <div>
              <p style={{ fontSize: '13px', color: '#666', lineHeight: '1.9' }}>
                Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.
                <br /><br />
                Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu.
              </p>
            </div>
          )}
          {activeTab === 'spec' && (
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px' }}>
              <tbody>
                <tr style={{ borderBottom: '1px solid #eee' }}><td style={{ padding: '8px', color: '#777', width: '200px' }}>Material</td><td style={{ padding: '8px', color: '#333' }}>Reclaimed Oak</td></tr>
                <tr style={{ borderBottom: '1px solid #eee', background: '#fafafa' }}><td style={{ padding: '8px', color: '#777' }}>Width</td><td style={{ padding: '8px', color: '#333' }}>80 cm</td></tr>
              </tbody>
            </table>
          )}
          {activeTab === 'rev' && (
            <div>
              <div style={{ borderBottom: '1px solid #eee', paddingBottom: '16px', marginBottom: '16px' }}>
                <div style={{ fontWeight: 'bold', marginBottom: '4px' }}>John M. <span style={{ color: '#f5a623' }}>★★★★★</span></div>
                <div style={{ fontSize: '12px', color: '#999', marginBottom: '6px' }}>Verified Buyer</div>
                <p style={{ fontSize: '13px', color: '#666' }}>Absolutely beautiful piece. Delivery was prompt...</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
