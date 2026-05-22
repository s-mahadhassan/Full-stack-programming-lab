import TopBar from '@/components/TopBar';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ProductClientDetails from '@/components/ProductClientDetails';
import Link from 'next/link';

export const revalidate = 0;

async function fetchProduct(id) {
  try {
    const res = await fetch(`http://127.0.0.1:5000/api/products/${id}`, { cache: 'no-store' });
    if (!res.ok) return null;
    return res.json();
  } catch (err) {
    console.error(err);
    return null;
  }
}

export default async function ProductPage({ params }) {
  const resolvedParams = await params;
  const product = await fetchProduct(resolvedParams.id);

  if (!product) {
    return (
      <>
        <TopBar />
        <Header />
        <div style={{ padding: '50px', textAlign: 'center' }}><h2>Product not found</h2></div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <TopBar />
      <Header />

      <div className="page-content">
        <div className="page-inner">
          <div className="breadcrumb">
            <Link href="/">Home</Link>
            <span>›</span>
            <Link href={`/${product.category.toLowerCase()}`}>{product.category}</Link>
            <span>›</span>
            <span>{product.title}</span>
          </div>
          
          <ProductClientDetails product={product} />

        </div>
      </div>

      <Footer />
    </>
  );
}
