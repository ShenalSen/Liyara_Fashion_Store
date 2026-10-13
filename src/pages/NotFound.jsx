import { Link } from '../router.jsx';
import { PRODUCTS } from '../data/products.js';
import ProductCard from '../components/ProductCard.jsx';

export default function NotFound() {
  return (
    <div className="page">
      <h1>We couldn't find that page</h1>
      <p className="page__lede">The link may be old, or the style may have sold out. Here are a few favourites instead.</p>
      <div className="grid grid--4">
        {PRODUCTS.filter((p) => p.bestseller).slice(0, 4).map((p) => <ProductCard key={p.slug} product={p} />)}
      </div>
      <p><Link to="/shop" className="btn btn--primary">Browse all styles</Link></p>
    </div>
  );
}
