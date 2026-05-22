import Link from 'next/link';

export default function ProductCard({ product }) {
  // Use font awesome placeholders if no real image
  const getIconForCategory = (cat) => {
    switch(cat?.toLowerCase()) {
      case 'beds': return 'fa-bed';
      case 'cabinets': return 'fa-archive';
      case 'bookcases': return 'fa-book';
      case 'boxes': return 'fa-box';
      case 'chairs': return 'fa-chair';
      case 'tables': return 'fa-table';
      default: return 'fa-image';
    }
  };

  return (
    <div className="product-item">
      <div className="product-item-img-placeholder">
        <i className={`fas ${getIconForCategory(product.category)}`}></i>
      </div>
      <div className="product-item-info">
        <p>{product.title || "This is Photoshop's version Lorem."}</p>
        {product.oldPrice && <span className="old-price">£{product.oldPrice}</span>}
        <span className="price">£{product.price}</span>
        <Link href={`/product/${product._id}`} className="btn-detail">Detail</Link>
      </div>
    </div>
  );
}
