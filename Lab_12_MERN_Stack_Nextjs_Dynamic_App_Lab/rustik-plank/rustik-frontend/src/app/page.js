import TopBar from '@/components/TopBar';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ProductCard from '@/components/ProductCard';

export const revalidate = 0; // Ensure data is always fresh

async function fetchProducts() {
  try {
    const res = await fetch('http://127.0.0.1:5000/api/products', { cache: 'no-store' });
    if (!res.ok) {
      throw new Error('Failed to fetch data');
    }
    return res.json();
  } catch (err) {
    console.error(err);
    return [];
  }
}

export default async function Home() {
  const products = await fetchProducts();

  const featured = products.filter(p => p.section === 'Featured');
  const special = products.filter(p => p.section === 'Special');
  const popular = products.filter(p => p.section === 'Popular');
  const hotDeals = products.filter(p => p.section === 'HotDeal');

  return (
    <>
      <TopBar />
      <Header />

      {/* HERO SLIDER */}
      <section className="hero">
        <div className="hero-inner">
          <div className="hero-product">
            <img id="hero-product-img" src="/images/rustik_plant.png" alt="Featured Furniture" />
          </div>
          <div className="hero-content">
            <div className="hero-icon">
              <i className="fas fa-gem" style={{ color: 'var(--orange)', fontSize: '36px' }}></i>
            </div>
            <p id="hero-text" className="hero-text">
              This is Photoshop's version of Lorem Ipsum. Proin gravida nibh vel velit auctor aliquet. Aenean sollicitudin, lorem quis bibendum auctor, nisi elit consequat ipsum, nec sagittis sem nibh id elit.
            </p>
            <div className="our-price">Our Price</div>
            <div className="hero-price">
              <span className="currency">£</span>
              <span id="hero-price-main">129</span>
              <span id="hero-price-cents" className="cents">.99</span>
            </div>
            <button className="btn-add-cart">
              Add To &nbsp;<i className="fas fa-shopping-cart"></i>
            </button>
          </div>
        </div>
        <div className="slider-arrows">
          <div className="slider-arrow" id="slider-prev"><i className="fas fa-chevron-left"></i></div>
          <div className="slider-arrow" id="slider-next"><i className="fas fa-chevron-right"></i></div>
        </div>
      </section>

      {/* CATEGORY BANNERS */}
      <section className="category-banners">
        <div className="cat-banner chairs">
          <div className="cat-placeholder"><i className="fas fa-chair"></i></div>
          <div className="cat-banner-label">
            <div className="cat-title">Chairs</div>
            <div className="cat-sub">Collection</div>
          </div>
        </div>
        <div className="cat-banner beds">
          <div className="cat-placeholder"><i className="fas fa-bed"></i></div>
          <div className="cat-banner-label">
            <div className="cat-title">Beds</div>
            <div className="cat-sub">Collection</div>
          </div>
        </div>
        <div className="cat-banner tables">
          <div className="cat-placeholder"><i className="fas fa-table"></i></div>
          <div className="cat-banner-label">
            <div className="cat-title">Tabales</div>
            <div className="cat-sub">Collection</div>
          </div>
        </div>
      </section>

      {/* PRODUCTS GRID */}
      <section className="products-section">
        <div className="products-grid">
          
          <div className="product-column">
            <div className="product-col-header">Featured</div>
            {featured.slice(0, 4).map(p => <ProductCard key={p._id || Math.random()} product={p} />)}
            <div className="see-all-bar"><a href="#">See All Feature</a></div>
          </div>

          <div className="product-column">
            <div className="product-col-header">Special</div>
            {special.slice(0, 4).map(p => <ProductCard key={p._id || Math.random()} product={p} />)}
            <div className="see-all-bar"><a href="#">See All Special</a></div>
          </div>

          <div className="product-column">
            <div className="product-col-header">Popular</div>
            {popular.slice(0, 4).map(p => <ProductCard key={p._id || Math.random()} product={p} />)}
            <div className="see-all-bar"><a href="#">See All Popular</a></div>
          </div>

        </div>
      </section>

      {/* HOT DEAL */}
      <section className="hot-deal-section">
        <h2>Hot Deal</h2>
        <div className="hot-deal-grid">
          {hotDeals.slice(0, 2).map((deal, idx) => (
             <div key={idx} className={`hot-deal-card deal-card-${deal.dealStyle || 1}`}>
                {deal.dealStyle === 1 ? (
                  <>
                    <div className="deal-overlay">
                      <div className="deal-title">{deal.title}</div>
                      <div className="deal-sub">{deal.description}</div>
                    </div>
                    <div className="deal-badge">
                      <span className="pct">{deal.dealDiscount}</span>
                      <span className="off">{deal.dealText}</span>
                    </div>
                  </>
                ) : (
                  <div className="deal-overlay">
                    <div className="deal-title">{deal.title}</div>
                    <div className="sale-label">{deal.dealText}</div>
                    <div className="sale-pct">{deal.dealDiscount}</div>
                  </div>
                )}
             </div>
          ))}
        </div>
      </section>

      {/* BUY ONLINE BANNER */}
      <section className="buy-online-banner">
        <div className="buy-online-inner">
          <div className="buy-online-left">
            <div className="buy-title">Buy Online</div>
            <div className="buy-sub">Pick Up In Store</div>
          </div>
          <div className="buy-online-right">
            <p>Now Available In Our Store System</p>
            <small>Available on select products. <a href="#">Learn More</a></small>
          </div>
        </div>
      </section>

      {/* LATEST UPDATES */}
      <section className="latest-section">
        <h2>Latest Updates</h2>
        <div className="latest-grid">
          <article className="latest-card">
            <div className="card-img"><i className="fas fa-image"></i></div>
            <div className="card-cat">Lorem ipsum</div>
            <div className="card-title">Beautiful Handcrafted Bedroom Sets</div>
            <p className="card-body">Lorem ipsum dolor sit amet, consectetuer adipiscing elit...</p>
            <a href="#" className="btn-read-more">Read More</a>
          </article>
          <article className="latest-card">
            <div className="card-img"><i className="fas fa-image"></i></div>
            <div className="card-cat">Lorem ipsum</div>
            <div className="card-title">Reclaimed Wood Dining Tables</div>
            <p className="card-body">Lorem ipsum dolor sit amet, consectetuer adipiscing elit...</p>
            <a href="#" className="btn-read-more">Read More</a>
          </article>
          <article className="latest-card">
            <div className="card-img"><i className="fas fa-image"></i></div>
            <div className="card-cat">Lorem ipsum</div>
            <div className="card-title">Designer Chair Collection 2024</div>
            <p className="card-body">Lorem ipsum dolor sit amet, consectetuer adipiscing elit...</p>
            <a href="#" className="btn-read-more">Read More</a>
          </article>
        </div>
      </section>

      <Footer />
    </>
  );
}
