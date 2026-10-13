import { useMemo, useState, useEffect } from 'react';
import { Link, navigate } from '../router.jsx';
import { PRODUCTS, CATEGORIES, COLLECTIONS, COLOR_HEX } from '../data/products.js';
import { searchProducts } from '../components/SearchOverlay.jsx';
import ProductCard from '../components/ProductCard.jsx';
import { CloseIcon } from '../components/Icons.jsx';

const PRICE_BANDS = [
  ['under5', 'Under Rs 5,000', (p) => p.price < 5000],
  ['5to7', 'Rs 5,000 to 7,000', (p) => p.price >= 5000 && p.price <= 7000],
  ['over7', 'Over Rs 7,000', (p) => p.price > 7000],
];

const SORTS = [
  ['featured', 'Featured'],
  ['new', 'Newest'],
  ['best', 'Best sellers'],
  ['low', 'Price, low to high'],
  ['high', 'Price, high to low'],
];

export default function Shop({ params }) {
  const cat = params.get('cat');
  const collection = params.get('collection');
  const type = params.get('type');
  const sale = params.get('sale') === '1';
  const q = params.get('q') || '';
  const [sort, setSort] = useState(params.get('sort') || 'featured');
  const [colors, setColors] = useState([]);
  const [price, setPrice] = useState(null);
  const [filtersOpen, setFiltersOpen] = useState(false);

  useEffect(() => {
    setSort(params.get('sort') || 'featured');
    setColors([]);
    setPrice(null);
  }, [params.toString()]); // eslint-disable-line react-hooks/exhaustive-deps

  const base = useMemo(() => {
    let list = q ? searchProducts(q) : PRODUCTS;
    if (cat) list = list.filter((p) => p.category === cat);
    if (collection) list = list.filter((p) => p.collection === collection);
    if (type) list = list.filter((p) => p.type === type);
    if (sale) list = list.filter((p) => p.compareAt);
    return list;
  }, [cat, collection, type, sale, q]);

  const allColors = useMemo(() => [...new Set(base.flatMap((p) => p.colors))], [base]);

  const list = useMemo(() => {
    let l = base;
    if (colors.length) l = l.filter((p) => p.colors.some((c) => colors.includes(c)));
    if (price) l = l.filter(PRICE_BANDS.find((b) => b[0] === price)[2]);
    const s = [...l];
    if (sort === 'new') s.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0) || a.order - b.order);
    else if (sort === 'best') s.sort((a, b) => (b.bestseller ? 1 : 0) - (a.bestseller ? 1 : 0) || a.order - b.order);
    else if (sort === 'low') s.sort((a, b) => a.price - b.price);
    else if (sort === 'high') s.sort((a, b) => b.price - a.price);
    return s;
  }, [base, colors, price, sort]);

  const title = q
    ? `Results for “${q}”`
    : sale
    ? 'Sale'
    : collection
    ? COLLECTIONS[collection]?.label
    : type
    ? `${CATEGORIES[cat]?.label || ''} ${type.toLowerCase()}`.trim()
    : cat
    ? CATEGORIES[cat]?.label
    : 'All styles';
  const blurb = sale
    ? 'A few favourites at lower prices while sizes last.'
    : collection
    ? COLLECTIONS[collection]?.blurb
    : cat
    ? CATEGORIES[cat]?.blurb
    : 'Every frock, blouse and party dress in the Liyara collection.';

  const setParam = (key, val) => {
    const p = new URLSearchParams(params);
    if (val) p.set(key, val);
    else p.delete(key);
    navigate('/shop' + (p.toString() ? '?' + p : ''));
  };

  const activeChips = [
    cat && ['cat', CATEGORIES[cat]?.label],
    collection && ['collection', COLLECTIONS[collection]?.label],
    type && ['type', type],
    sale && ['sale', 'On sale'],
    q && ['q', `“${q}”`],
  ].filter(Boolean);

  return (
    <div className="shop">
      <header className="shop__head">
        <nav className="crumbs" aria-label="Breadcrumb"><Link to="/">Home</Link><span aria-hidden="true">/</span><span>{title}</span></nav>
        <h1>{title}</h1>
        <p>{blurb}</p>
        <div className="shop__cats" role="list">
          <Link role="listitem" to="/shop" className={'pill' + (!cat && !collection && !sale && !q ? ' is-on' : '')}>All</Link>
          {Object.entries(CATEGORIES).map(([k, c]) => (
            <Link role="listitem" key={k} to={`/shop?cat=${k}`} className={'pill' + (cat === k && !collection ? ' is-on' : '')}>{c.label}</Link>
          ))}
          {Object.entries(COLLECTIONS).map(([k, c]) => (
            <Link role="listitem" key={k} to={`/shop?collection=${k}`} className={'pill' + (collection === k ? ' is-on' : '')}>{c.label}</Link>
          ))}
          <Link role="listitem" to="/shop?sale=1" className={'pill pill--sale' + (sale ? ' is-on' : '')}>Sale</Link>
        </div>
      </header>

      <div className="shop__toolbar">
        <button className="btn btn--ghost btn--sm shop__filter-btn" onClick={() => setFiltersOpen(true)}>
          Filter{colors.length + (price ? 1 : 0) ? ` (${colors.length + (price ? 1 : 0)})` : ''}
        </button>
        <p className="shop__count">{list.length} {list.length === 1 ? 'style' : 'styles'}</p>
        <label className="sort">
          <span>Sort</span>
          <select value={sort} onChange={(e) => setSort(e.target.value)}>
            {SORTS.map(([v, l]) => <option key={v} value={v}>{l}</option>)}
          </select>
        </label>
      </div>

      {activeChips.length > 0 && (
        <div className="shop__active">
          {activeChips.map(([k, label]) => (
            <button key={k} className="chip chip--x" onClick={() => setParam(k, null)}>
              {label} <CloseIcon width={14} height={14} />
            </button>
          ))}
        </div>
      )}

      <div className="shop__layout">
        <div className={'drawer-scrim drawer-scrim--mobile' + (filtersOpen ? ' is-open' : '')} onClick={() => setFiltersOpen(false)} />
        <aside className={'filters' + (filtersOpen ? ' is-open' : '')} aria-label="Filters">
          <div className="filters__head">
            <h2>Filter</h2>
            <button className="icon-btn" aria-label="Close filters" onClick={() => setFiltersOpen(false)}><CloseIcon /></button>
          </div>
          <fieldset>
            <legend>Colour</legend>
            <div className="filters__colors">
              {allColors.map((c) => {
                const on = colors.includes(c);
                return (
                  <button
                    key={c}
                    className={'color-opt' + (on ? ' is-on' : '')}
                    aria-pressed={on}
                    onClick={() => setColors(on ? colors.filter((x) => x !== c) : [...colors, c])}
                  >
                    <span className="swatch" style={{ '--sw': COLOR_HEX[c] || '#ccc' }} />
                    {c}
                  </button>
                );
              })}
            </div>
          </fieldset>
          <fieldset>
            <legend>Price</legend>
            {PRICE_BANDS.map(([k, label]) => (
              <label key={k} className="radio">
                <input type="radio" name="price" checked={price === k} onChange={() => setPrice(k)} />
                {label}
              </label>
            ))}
            {price && <button className="link-btn" onClick={() => setPrice(null)}>Any price</button>}
          </fieldset>
          <div className="filters__foot">
            <button className="btn btn--ghost btn--sm" onClick={() => { setColors([]); setPrice(null); }}>Clear</button>
            <button className="btn btn--primary btn--sm" onClick={() => setFiltersOpen(false)}>Show {list.length}</button>
          </div>
        </aside>

        <div className="grid">
          {list.map((p, i) => <ProductCard key={p.slug} product={p} priority={i < 4} />)}
          {list.length === 0 && (
            <div className="grid__empty">
              <p>No styles match these filters.</p>
              <button className="btn btn--primary" onClick={() => { setColors([]); setPrice(null); navigate('/shop'); }}>Show all styles</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
