import { useEffect, useMemo, useRef, useState } from 'react';
import { Link } from '../router.jsx';
import { useStore } from '../state/store.jsx';
import { getProduct, PRODUCTS, formatLKR, COLOR_HEX, CATEGORIES, COLLECTIONS, FREE_DELIVERY_FROM, objPos } from '../data/products.js';
import ProductCard from '../components/ProductCard.jsx';
import SizeGuideModal from '../components/SizeGuide.jsx';
import { QtyStepper } from '../components/CartDrawer.jsx';
import { HeartIcon, RulerIcon, TruckIcon, SwapIcon, ChevronIcon } from '../components/Icons.jsx';
import NotFound from './NotFound.jsx';

function Gallery({ images, name }) {
  const [i, setI] = useState(0);
  const [zoom, setZoom] = useState(null);
  const track = useRef();
  useEffect(() => {
    setI(0);
    track.current?.scrollTo({ left: 0 });
  }, [images]);
  const go = (n) => {
    setI(n);
    const el = track.current;
    if (el) el.scrollTo({ left: el.clientWidth * n, behavior: 'smooth' });
  };
  return (
    <div className="gallery">
      {images.length > 1 && (
        <div className="gallery__thumbs" role="tablist" aria-label="Product photos">
          {images.map((im, n) => (
            <button key={im.src} role="tab" aria-selected={n === i} aria-label={`Photo ${n + 1}`} className={n === i ? 'is-on' : ''} onClick={() => go(n)}>
              <img src={im.src} alt="" loading="lazy" style={objPos(im)} />
            </button>
          ))}
        </div>
      )}
      <div
        className="gallery__track"
        ref={track}
        onScroll={(e) => {
          const el = e.currentTarget;
          const n = Math.round(el.scrollLeft / el.clientWidth);
          if (n !== i) setI(n);
        }}
      >
        {images.map((im, n) => (
          <div
            key={im.src}
            className={'gallery__slide' + (zoom && n === i ? ' is-zoom' : '')}
            onMouseMove={(e) => {
              const r = e.currentTarget.getBoundingClientRect();
              setZoom({ x: ((e.clientX - r.left) / r.width) * 100, y: ((e.clientY - r.top) / r.height) * 100 });
            }}
            onMouseLeave={() => setZoom(null)}
          >
            <img
              src={im.src}
              alt={`${name}, ${im.color}, photo ${n + 1}`}
              style={{ ...objPos(im), ...(zoom && n === i ? { transformOrigin: `${zoom.x}% ${zoom.y}%` } : {}) }}
              loading={n === 0 ? 'eager' : 'lazy'}
            />
          </div>
        ))}
      </div>
      {images.length > 1 && (
        <div className="gallery__dots" aria-hidden="true">
          {images.map((im, n) => <span key={im.src} className={n === i ? 'is-on' : ''} />)}
        </div>
      )}
    </div>
  );
}

function Accordion({ title, children, open: initial = false }) {
  const [open, setOpen] = useState(initial);
  return (
    <div className={'acc' + (open ? ' is-open' : '')}>
      <button className="acc__btn" aria-expanded={open} onClick={() => setOpen(!open)}>
        {title}
        <ChevronIcon dir={open ? 'up' : 'down'} width={18} height={18} />
      </button>
      <div className="acc__body" hidden={!open}>{children}</div>
    </div>
  );
}

const useRecentlyViewed = (slug) => {
  const [list, setList] = useState([]);
  useEffect(() => {
    let prev = [];
    try { prev = JSON.parse(localStorage.getItem('liyara-recent') || '[]'); } catch { /* ignore */ }
    const next = [slug, ...prev.filter((s) => s !== slug)].slice(0, 8);
    try { localStorage.setItem('liyara-recent', JSON.stringify(next)); } catch { /* ignore */ }
    setList(prev.filter((s) => s !== slug));
  }, [slug]);
  return list;
};

export default function Product({ slug, params }) {
  const p = getProduct(slug);
  const { addToCart, isWished, toggleWish, setSizeGuide } = useStore();
  const [color, setColor] = useState(() => {
    const c = params.get('color');
    return p && p.colors.includes(c) ? c : p?.colors[0];
  });
  const [size, setSize] = useState(null);
  const [qty, setQty] = useState(1);
  const [error, setError] = useState(false);
  const [stuck, setStuck] = useState(false);
  const buyRef = useRef();
  const recent = useRecentlyViewed(slug);

  useEffect(() => {
    if (!p) return;
    const c = params.get('color');
    setColor(p.colors.includes(c) ? c : p.colors[0]);
    setSize(null);
    setQty(1);
    setError(false);
  }, [slug]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    const el = buyRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setStuck(!e.isIntersecting && e.boundingClientRect.top < 0));
    io.observe(el);
    return () => io.disconnect();
  }, [slug]);

  const images = useMemo(() => {
    if (!p) return [];
    const mine = p.images.filter((im) => im.color === color);
    const rest = p.images.filter((im) => im.color !== color);
    return [...mine, ...rest];
  }, [p, color]);

  if (!p) return <NotFound />;

  const wished = isWished(p.slug);
  const add = () => {
    if (!size) {
      setError(true);
      return;
    }
    addToCart(p.slug, color, size, qty);
  };

  const sameCollection = PRODUCTS.filter((x) => x.collection === p.collection && x.slug !== p.slug);
  const related = (sameCollection.length >= 4 ? sameCollection : [...sameCollection, ...PRODUCTS.filter((x) => x.category === p.category && x.slug !== p.slug && x.collection !== p.collection)]).slice(0, 4);
  const recentProducts = recent.map(getProduct).filter(Boolean).slice(0, 4);

  return (
    <div className="pdp">
      <nav className="crumbs" aria-label="Breadcrumb">
        <Link to="/">Home</Link><span aria-hidden="true">/</span>
        <Link to={`/shop?cat=${p.category}`}>{CATEGORIES[p.category].label}</Link><span aria-hidden="true">/</span>
        <span>{p.name}</span>
      </nav>

      <div className="pdp__main">
        <Gallery images={images} name={p.name} />

        <div className="pdp__info">
          <Link to={`/shop?collection=${p.collection}`} className="pdp__collection">{COLLECTIONS[p.collection].label}</Link>
          <h1>{p.name}</h1>
          <p className="pdp__price">
            <span>{formatLKR(p.price)}</span>
            {p.compareAt && <><s>{formatLKR(p.compareAt)}</s><span className="tag tag--sale">Save {formatLKR(p.compareAt - p.price)}</span></>}
          </p>
          <p className="pdp__bnpl">or 3 × <b>{formatLKR(Math.ceil(p.price / 3))}</b> interest-free with Koko or Mintpay</p>
          <p className="pdp__short">{p.short}</p>

          <div className="pdp__opt">
            <p className="pdp__label">Colour: <b>{color}</b></p>
            <div className="swatches swatches--lg" role="radiogroup" aria-label="Colour">
              {p.colors.map((c) => (
                <button
                  key={c}
                  role="radio"
                  aria-checked={c === color}
                  aria-label={c}
                  title={c}
                  className={'swatch' + (c === color ? ' is-on' : '')}
                  style={{ '--sw': COLOR_HEX[c] || '#ccc' }}
                  onClick={() => setColor(c)}
                />
              ))}
            </div>
          </div>

          <div className="pdp__opt">
            <div className="pdp__label-row">
              <p className="pdp__label">Size{size && <>: <b>{size}</b></>}</p>
              <button className="link-btn link-btn--icon" onClick={() => setSizeGuide(p.category)}>
                <RulerIcon width={18} height={18} /> Size guide and fit finder
              </button>
            </div>
            <div className={'sizes' + (error ? ' sizes--error' : '')} role="radiogroup" aria-label="Size" aria-describedby={error ? 'size-err' : undefined}>
              {p.sizes.map((s) => (
                <button key={s} role="radio" aria-checked={size === s} className={'size' + (size === s ? ' is-on' : '')} onClick={() => { setSize(s); setError(false); }}>
                  {s}
                </button>
              ))}
            </div>
            {error && <p id="size-err" className="field-error" role="alert">Choose a size to add this to your bag.</p>}
          </div>

          <div className="pdp__buy" ref={buyRef}>
            <QtyStepper value={qty} onChange={(q) => setQty(Math.max(1, q))} label="Quantity" />
            <button className="btn btn--primary btn--grow" onClick={add}>Add to bag</button>
            <button className={'wish-btn' + (wished ? ' is-on' : '')} aria-pressed={wished} aria-label={wished ? 'Remove from wishlist' : 'Save to wishlist'} onClick={() => toggleWish(p.slug)}>
              <HeartIcon filled={wished} />
            </button>
          </div>

          <ul className="pdp__perks">
            <li><TruckIcon width={20} height={20} /> Free island-wide delivery over {formatLKR(FREE_DELIVERY_FROM)}. Usually 2 to 4 working days.</li>
            <li><SwapIcon width={20} height={20} /> Wrong size? Exchange it within 7 days.</li>
          </ul>

          <div className="pdp__acc">
            <Accordion title="Details" open>
              <ul className="ticks">{p.details.map((d) => <li key={d}>{d}</li>)}</ul>
            </Accordion>
            <Accordion title="Fabric and care">
              <p>{p.fabric}</p>
              <p>{p.care}</p>
            </Accordion>
            <Accordion title="Size and fit">
              <p>{p.category === 'women' ? 'Available in M, L and XL. Compare your bust measurement with the size chart; the fit finder will suggest a size.' : `Sized by age (${p.sizes[0]} to ${p.sizes[p.sizes.length - 1]}). If your child is between ages, choose the larger size.`}</p>
              <button className="link-btn" onClick={() => setSizeGuide(p.category)}>Open the size chart</button>
            </Accordion>
            <Accordion title="Delivery and returns">
              <p>We deliver across Sri Lanka in 2 to 4 working days. Delivery is free on orders over {formatLKR(FREE_DELIVERY_FROM)}, otherwise Rs 400. Cash on delivery is available.</p>
              <p>Unworn items with tags can be exchanged for another size within 7 days. <Link to="/help?tab=returns">Read the full policy</Link>.</p>
            </Accordion>
          </div>
        </div>
      </div>

      {related.length > 0 && (
        <section className="pdp__more">
          <h2>Complete the look</h2>
          <div className="grid grid--4">{related.map((x) => <ProductCard key={x.slug} product={x} />)}</div>
        </section>
      )}
      {recentProducts.length > 0 && (
        <section className="pdp__more">
          <h2>Recently viewed</h2>
          <div className="grid grid--4">{recentProducts.map((x) => <ProductCard key={x.slug} product={x} />)}</div>
        </section>
      )}

      <div className={'sticky-buy' + (stuck ? ' is-on' : '')} aria-hidden={!stuck}>
        <img src={images[0].src} alt="" />
        <div className="sticky-buy__info">
          <p>{p.name}</p>
          <p><b>{formatLKR(p.price)}</b>, {color}{size ? `, ${size}` : ''}</p>
        </div>
        <button className="btn btn--primary" tabIndex={stuck ? 0 : -1} onClick={() => { if (!size) { buyRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' }); setError(true); } else add(); }}>
          {size ? 'Add to bag' : 'Choose size'}
        </button>
      </div>

      <SizeGuideModal onPick={(s) => { if (p.sizes.includes(s)) { setSize(s); setError(false); } }} />
    </div>
  );
}
