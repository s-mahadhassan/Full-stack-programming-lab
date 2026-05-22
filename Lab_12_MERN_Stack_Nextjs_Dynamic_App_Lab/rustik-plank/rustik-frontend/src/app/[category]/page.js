import TopBar from '@/components/TopBar';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ProductCard from '@/components/ProductCard';

export const revalidate = 0;

async function fetchCategoryProducts(category) {
  try {
    const titleCaseCategory = category.charAt(0).toUpperCase() + category.slice(1);
    const res = await fetch(`http://127.0.0.1:5000/api/products?category=${titleCaseCategory}`, { cache: 'no-store' });
    if (!res.ok) return [];
    return res.json();
  } catch (err) {
    console.error(err);
    return [];
  }
}

export default async function CategoryPage({ params }) {
  const resolvedParams = await params;
  const category = resolvedParams?.category || '';
  const products = await fetchCategoryProducts(category);

  return (
    <>
      <TopBar />
      <Header />

      <section className="category-banners" style={{ marginTop: '20px', gridTemplateColumns: '1fr' }}>
        <div className={`cat-banner ${category.toLowerCase()}`} style={{ height: '200px' }}>
          <div className="cat-placeholder"><i className="fas fa-list"></i></div>
          <div className="cat-banner-label">
            <div className="cat-title">{category}</div>
            <div className="cat-sub">Collection</div>
          </div>
        </div>
      </section>

      <section className="products-section">
        <div className="product-col-header" style={{ border: '1px solid var(--border)' }}>
          {category.toUpperCase()} PRODUCTS
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px', border: '1px solid var(--border)', borderTop: 'none', padding: '10px' }}>
          {products.length > 0 ? (
            products.map(p => (
              <ProductCard key={p._id} product={p} />
            ))
          ) : (
            <p style={{ padding: '20px' }}>No products found in this category.</p>
          )}
        </div>
      </section>

      <Footer />
    </>
  );
}
