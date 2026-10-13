import { useRef, useState } from 'react';
import { Link } from '../router.jsx';
import { useStore } from '../state/store.jsx';
import { PRODUCTS, CATEGORIES, getProduct, formatLKR, COLOR_HEX, objPos } from '../data/products.js';
import ProductCard from '../components/ProductCard.jsx';
import { ChevronIcon, TruckIcon, SwapIcon, CardIcon, CashIcon } from '../components/Icons.jsx';

function Hero() {
  const a = getProduct('wildflower-embroidered-shirt-blouse');
  const b = getProduct('sunflower-meadow-embroidered-maxi');
  const c = getProduct('little-pearl-lace-party-dress');
  return (
    <section className="hero">
      <div className="hero__text">
        <h1 className="hero__title">
          <span>Stitched by hand,</span>
          <span>worn every day.</span>
        </h1>
        <p className="hero__lede">
          Embroidered frocks, easy shirt dresses and soft lace for women, teens and little ones. Sizes from age 1 to XL.
        </p>
        <div className="hero__ctas">
          <Link to="/shop?cat=women" className="btn btn--primary">Shop women</Link>
          <Link to="/shop?cat=kids" className="btn btn--ghost">Shop kids &amp; teens</Link>
        </div>
      </div>

      <div className="hero__art">
        <svg className="stitch" viewBox="0 0 600 640" preserveAspectRatio="none" aria-hidden="true">
          <defs>
            <mask id="stitch-reveal">
              <path className="stitch__draw" d="M-20 120 C 140 40, 220 220, 300 300 S 520 300, 560 440 S 420 640, 240 600" fill="none" stroke="#fff" strokeWidth="14" />
            </mask>
          </defs>
          <path d="M-20 120 C 140 40, 220 220, 300 300 S 520 300, 560 440 S 420 640, 240 600" fill="none" stroke="var(--sun)" strokeWidth="4" strokeLinecap="round" strokeDasharray="14 11" mask="url(#stitch-reveal)" />
        </svg>
        <Link to={`/product/${a.slug}?color=Forest%20Green`} className="hero__photo hero__photo--a">
          <img src={a.images[1].src} alt="Woman in the Wildflower Embroidered Shirt Blouse in forest green, by a lake" fetchpriority="high" />
          <span className="hero__caption">Wildflower Blouse</span>
        </Link>
        <Link to={`/product/${b.slug}`} className="hero__photo hero__photo--b">
          <img src={b.images[0].src} alt="Woman in the mint green Sunflower Meadow Embroidered Maxi" />
          <span className="hero__caption">Sunflower Meadow Maxi</span>
        </Link>
        <Link to={`/product/${c.slug}`} className="hero__photo hero__photo--c">
          <img src={c.images[0].src} alt="Little girl in the navy Little Pearl Lace Party Dress" />
          <span className="hero__caption">Little Pearl</span>
        </Link>
      </div>
    </section>
  );
}

function Assurances() {
  const items = [
    [TruckIcon, 'Free island-wide delivery', 'On orders over Rs 10,000'],
    [CashIcon, 'Cash on delivery', 'Pay when your parcel arrives'],
    [CardIcon, 'Pay in 3', 'Interest-free with Koko or Mintpay'],
    [SwapIcon, '7-day size exchange', 'Wrong fit? We will swap it'],
  ];
  return (
    <section className="promise" aria-label="Shopping with Liyara">
      {items.map(([Icon, t, d]) => (
        <div key={t} className="promise__item">
          <Icon />
          <div>
            <p className="promise__t">{t}</p>
            <p className="promise__d">{d}</p>
          </div>
        </div>
      ))}
    </section>
  );
}

function Rail({ title, intro, products, link, linkLabel }) {
  const ref = useRef();
  const scroll = (dir) => ref.current?.scrollBy({ left: dir * ref.current.clientWidth * 0.8, behavior: 'smooth' });
  return (
    <section className="rail">
      <div className="section-head">
        <div>
          <h2>{title}</h2>
          {intro && <p>{intro}</p>}
        </div>
        <div className="rail__ctrl">
          {link && <Link to={link} className="text-link">{linkLabel}</Link>}
          <button className="round-btn" aria-label="Scroll left" onClick={() => scroll(-1)}><ChevronIcon dir="left" width={18} height={18} /></button>
          <button className="round-btn" aria-label="Scroll right" onClick={() => scroll(1)}><ChevronIcon width={18} height={18} /></button>
        </div>
      </div>
      <div className="rail__track" ref={ref}>
        {products.map((p) => (
          <div className="rail__item" key={p.slug}><ProductCard product={p} /></div>
        ))}
      </div>
    </section>
  );
}

function WhoTiles() {
  const tiles = [
    ['women', getProduct('bloom-print-button-front-maxi').images[0]],
    ['teens', getProduct('rose-lace-ball-gown').images[0]],
    ['kids', getProduct('bella-bow-lace-midi').images[1]],
  ];
  return (
    <section className="who">
      {tiles.map(([cat, img]) => {
        const n = PRODUCTS.filter((p) => p.category === cat).length;
        return (
          <Link key={cat} to={`/shop?cat=${cat}`} className="who__tile">
            <img src={img.src} alt="" loading="lazy" style={objPos(img)} />
            <div className="who__text">
              <h3>{CATEGORIES[cat].label}</h3>
              <p>{CATEGORIES[cat].blurb}</p>
              <span className="who__count">{n} styles</span>
            </div>
          </Link>
        );
      })}
    </section>
  );
}

// "Look closer": tap the thread dots on the dress to read about each detail.
const SPOTS = [
  { x: 40, y: 18, t: 'Ruffled straps', d: 'Soft frills sit on the shoulder and keep the square neckline in place.' },
  { x: 47, y: 47, t: 'Scattered sunflowers', d: 'Each bloom is stitched individually, so no two dresses are quite the same.' },
  { x: 44, y: 76, t: 'Garden border', d: 'Ferns, cornflowers and sunflowers run around the full hem.' },
];

function LookCloser() {
  const p = getProduct('sunflower-meadow-embroidered-maxi');
  const [active, setActive] = useState(1);
  const img = p.images.find((im) => im.color === 'White');
  return (
    <section className="closer">
      <div className="closer__media">
        <img src={img.src} alt="White Sunflower Meadow maxi dress with an embroidered garden border" loading="lazy" />
        {SPOTS.map((s, i) => (
          <button
            key={s.t}
            className={'spot' + (i === active ? ' is-on' : '')}
            style={{ left: s.x + '%', top: s.y + '%' }}
            aria-label={s.t}
            aria-pressed={i === active}
            onClick={() => setActive(i)}
          />
        ))}
      </div>
      <div className="closer__text">
        <p className="kicker">The Garden Edit</p>
        <h2>Look closer at the stitching</h2>
        <p>Our embroidered pieces are finished by hand, bloom by bloom. Tap the dots on the dress to see the details.</p>
        <ul className="closer__list">
          {SPOTS.map((s, i) => (
            <li key={s.t} className={i === active ? 'is-on' : ''}>
              <button onClick={() => setActive(i)}>
                <span className="closer__t">{s.t}</span>
                <span className="closer__d">{s.d}</span>
              </button>
            </li>
          ))}
        </ul>
        <div className="closer__ctas">
          <Link to={`/product/${p.slug}?color=White`} className="btn btn--primary">Shop the Sunflower Meadow</Link>
          <Link to="/shop?collection=garden-embroidery" className="text-link">See the Garden Edit</Link>
        </div>
      </div>
    </section>
  );
}

function ColourStory() {
  const p = getProduct('aria-everyday-a-line-dress');
  const { addToCart } = useStore();
  const [color, setColor] = useState(p.colors[0]);
  const [size, setSize] = useState(null);
  const img = p.images.find((im) => im.color === color);
  return (
    <section className="colours" style={{ '--tint': COLOR_HEX[color] }}>
      <div className="colours__media">
        {p.images.map((im) => (
          <img key={im.src} src={im.src} alt={im.color === color ? `Aria dress in ${color}` : ''} className={im === img ? 'is-on' : ''} loading="lazy" />
        ))}
      </div>
      <div className="colours__text">
        <h2>One dress, eight colours</h2>
        <p>The Aria is the dress we wear most: breathable, easy to move in, with deep pockets and a curved hem. Pick your colour.</p>
        <div className="colours__swatches" role="radiogroup" aria-label="Aria colour">
          {p.colors.map((c) => (
            <button
              key={c}
              role="radio"
              aria-checked={c === color}
              className={'big-swatch' + (c === color ? ' is-on' : '')}
              style={{ '--sw': COLOR_HEX[c] }}
              onClick={() => setColor(c)}
            >
              <span className="sr-only">{c}</span>
            </button>
          ))}
        </div>
        <p className="colours__name" aria-live="polite">{color} <span>{formatLKR(p.price)}</span></p>
        <div className="sizes" role="radiogroup" aria-label="Size">
          {p.sizes.map((s) => (
            <button key={s} role="radio" aria-checked={size === s} className={'size' + (size === s ? ' is-on' : '')} onClick={() => setSize(s)}>{s}</button>
          ))}
        </div>
        <div className="colours__ctas">
          <button className="btn btn--primary" disabled={!size} onClick={() => addToCart(p.slug, color, size)}>
            {size ? `Add ${color} in ${size}` : 'Choose a size'}
          </button>
          <Link to={`/product/${p.slug}?color=${encodeURIComponent(color)}`} className="text-link">View details</Link>
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  const newIn = PRODUCTS.filter((p) => p.isNew);
  const lace = PRODUCTS.filter((p) => p.category !== 'women' || p.collection === 'lace-edit');
  const best = PRODUCTS.filter((p) => p.bestseller || p.compareAt);
  return (
    <>
      <Hero />
      <Assurances />
      <Rail title="New in" intro="Fresh from the workroom this month." products={newIn} link="/shop?sort=new" linkLabel="Shop all new" />
      <WhoTiles />
      <LookCloser />
      <Rail title="Lace for little ones" intro="Party frocks with bows, pearls and puff sleeves, ages 1 to 15." products={lace} link="/shop?collection=lace-edit" linkLabel="Shop the Lace Edit" />
      <ColourStory />
      <Rail title="Most loved" intro="The pieces our customers come back for." products={best} link="/shop?sort=best" linkLabel="Shop best sellers" />
    </>
  );
}
