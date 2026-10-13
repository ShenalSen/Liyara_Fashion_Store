import { useEffect, useMemo, useRef, useState } from 'react';
import { Link } from '../router.jsx';
import { useStore } from '../state/store.jsx';
import { PRODUCTS, formatLKR, CATEGORIES, COLLECTIONS } from '../data/products.js';
import { CloseIcon, SearchIcon } from './Icons.jsx';

const SUGGEST = ['Lace', 'Embroidered', 'Maxi', 'Kids party dress', 'Pockets'];

export function searchProducts(q) {
  const terms = q.toLowerCase().split(/\s+/).filter(Boolean);
  if (!terms.length) return [];
  return PRODUCTS.filter((p) => {
    const hay = [p.name, p.short, p.type, p.colors.join(' '), CATEGORIES[p.category].label, COLLECTIONS[p.collection].label, p.details.join(' '), p.fabric]
      .join(' ')
      .toLowerCase();
    return terms.every((t) => hay.includes(t.replace(/s$/, '')));
  });
}

export default function SearchOverlay() {
  const { searchOpen, setSearchOpen } = useStore();
  const [q, setQ] = useState('');
  const input = useRef();
  const results = useMemo(() => searchProducts(q), [q]);

  useEffect(() => {
    if (searchOpen) setTimeout(() => input.current?.focus(), 60);
    const onKey = (e) => e.key === 'Escape' && setSearchOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [searchOpen, setSearchOpen]);

  const close = () => setSearchOpen(false);

  return (
    <div className={'search' + (searchOpen ? ' is-open' : '')} role="dialog" aria-label="Search" aria-hidden={!searchOpen}>
      <div className="search__panel">
        <div className="search__bar">
          <SearchIcon />
          <input
            ref={input}
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search dresses, lace, colours…"
            aria-label="Search products"
          />
          <button className="icon-btn" aria-label="Close search" onClick={close}><CloseIcon /></button>
        </div>
        {!q && (
          <div className="search__suggest">
            <p>Popular searches</p>
            <div className="search__chips">
              {SUGGEST.map((s) => (
                <button key={s} className="chip" onClick={() => setQ(s)}>{s}</button>
              ))}
            </div>
          </div>
        )}
        {q && (
          <div className="search__results">
            <p className="search__count">{results.length ? `${results.length} ${results.length === 1 ? 'style' : 'styles'} found` : `Nothing matches “${q}”. Try “lace” or “embroidered”.`}</p>
            <ul>
              {results.slice(0, 8).map((p) => (
                <li key={p.slug}>
                  <Link to={`/product/${p.slug}`} onClick={close} className="mini">
                    <img src={p.images[0].src} alt="" loading="lazy" />
                    <span>{p.name}<br /><b>{formatLKR(p.price)}</b></span>
                  </Link>
                </li>
              ))}
            </ul>
            {results.length > 0 && (
              <Link to={`/shop?q=${encodeURIComponent(q)}`} onClick={close} className="btn btn--ghost">See all results</Link>
            )}
          </div>
        )}
      </div>
      <div className="search__scrim" onClick={close} />
    </div>
  );
}
