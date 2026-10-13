import { useEffect, useState } from 'react';
import { Link, useRoute } from '../router.jsx';
import { useStore } from '../state/store.jsx';
import { ANNOUNCEMENTS } from '../data/site.js';
import { PRODUCTS, COLLECTIONS } from '../data/products.js';
import Logo from './Logo.jsx';
import { SearchIcon, HeartIcon, BagIcon, MenuIcon, CloseIcon, ChevronIcon } from './Icons.jsx';

const pick = (slug) => PRODUCTS.find((p) => p.slug === slug);

const MENU = [
  {
    key: 'women',
    label: 'Women',
    to: '/shop?cat=women',
    columns: [
      { title: 'Shop', links: [['New in', '/shop?cat=women&sort=new'], ['Best sellers', '/shop?cat=women&sort=best'], ['Dresses', '/shop?cat=women&type=Dresses'], ['Blouses', '/shop?cat=women&type=Blouses'], ['All women', '/shop?cat=women']] },
      { title: 'Collections', links: Object.entries(COLLECTIONS).filter(([k]) => k !== 'lace-edit').map(([k, c]) => [c.label, `/shop?collection=${k}`]).concat([['The Lace Edit', '/shop?collection=lace-edit&cat=women']]) },
    ],
    features: [
      { p: pick('sunflower-meadow-embroidered-maxi'), label: 'The Garden Edit', to: '/shop?collection=garden-embroidery' },
      { p: pick('aria-everyday-a-line-dress'), label: 'Aria, in 8 colours', to: '/product/aria-everyday-a-line-dress', img: 0 },
    ],
  },
  {
    key: 'teens',
    label: 'Teens',
    to: '/shop?cat=teens',
    columns: [{ title: 'Ages 7 to 15', links: [['Party dresses', '/shop?cat=teens'], ['Size guide', '/size-guide?tab=teens']] }],
    features: [
      { p: pick('rose-lace-ball-gown'), label: 'Rosé Lace Ball Gown', to: '/product/rose-lace-ball-gown' },
      { p: pick('peach-lace-skater-dress'), label: 'Peach Lace Skater', to: '/product/peach-lace-skater-dress' },
    ],
  },
  {
    key: 'kids',
    label: 'Kids',
    to: '/shop?cat=kids',
    columns: [{ title: 'Ages 1 to 6', links: [['Party dresses', '/shop?cat=kids'], ['On sale', '/shop?cat=kids&sale=1'], ['Size guide', '/size-guide?tab=kids']] }],
    features: [
      { p: pick('little-pearl-lace-party-dress'), label: 'Little Pearl', to: '/product/little-pearl-lace-party-dress' },
      { p: pick('bella-bow-lace-midi'), label: 'Bella Bow', to: '/product/bella-bow-lace-midi' },
    ],
  },
  { key: 'lace', label: 'Lace Edit', to: '/shop?collection=lace-edit' },
  { key: 'sale', label: 'Sale', to: '/shop?sale=1' },
];

function Announcement() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI((n) => (n + 1) % ANNOUNCEMENTS.length), 4200);
    return () => clearInterval(t);
  }, []);
  return (
    <div className="announce" role="region" aria-label="Store announcements">
      <p key={i} className="announce__msg">{ANNOUNCEMENTS[i]}</p>
    </div>
  );
}

export default function Header() {
  const { count, wishlist, setCartOpen, setSearchOpen } = useStore();
  const { path } = useRoute();
  const [open, setOpen] = useState(null); // mega menu key
  const [mobile, setMobile] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [bump, setBump] = useState(false);

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 40);
    on();
    window.addEventListener('scroll', on, { passive: true });
    return () => window.removeEventListener('scroll', on);
  }, []);

  useEffect(() => {
    setOpen(null);
    setMobile(false);
  }, [path]);

  useEffect(() => {
    if (!count) return;
    setBump(true);
    const t = setTimeout(() => setBump(false), 450);
    return () => clearTimeout(t);
  }, [count]);

  useEffect(() => {
    document.body.style.overflow = mobile ? 'hidden' : '';
  }, [mobile]);

  return (
    <>
      <Announcement />
      <header className={'header' + (scrolled ? ' header--scrolled' : '')} onMouseLeave={() => setOpen(null)}>
        <div className="header__inner">
          <button className="icon-btn header__burger" aria-label="Open menu" onClick={() => setMobile(true)}>
            <MenuIcon />
          </button>
          <Logo />
          <nav className="nav" aria-label="Main">
            {MENU.map((m) => (
              <div key={m.key} className="nav__item" onMouseEnter={() => setOpen(m.columns ? m.key : null)}>
                <Link
                  to={m.to}
                  className={'nav__link' + (m.key === 'sale' ? ' nav__link--sale' : '')}
                  aria-expanded={m.columns ? open === m.key : undefined}
                  onFocus={() => setOpen(m.columns ? m.key : null)}
                >
                  {m.label}
                </Link>
              </div>
            ))}
          </nav>
          <div className="header__actions">
            <button className="icon-btn" aria-label="Search" onClick={() => setSearchOpen(true)}>
              <SearchIcon />
            </button>
            <Link to="/wishlist" className="icon-btn" aria-label={`Wishlist, ${wishlist.length} items`}>
              <HeartIcon />
              {wishlist.length > 0 && <span className="badge">{wishlist.length}</span>}
            </Link>
            <button className={'icon-btn' + (bump ? ' bump' : '')} aria-label={`Bag, ${count} items`} onClick={() => setCartOpen(true)}>
              <BagIcon />
              {count > 0 && <span className="badge badge--sun">{count}</span>}
            </button>
          </div>
        </div>

        {MENU.filter((m) => m.columns).map((m) => (
          <div key={m.key} className={'mega' + (open === m.key ? ' mega--open' : '')} aria-hidden={open !== m.key}>
            <div className="mega__inner">
              <div className="mega__cols">
                {m.columns.map((c) => (
                  <div key={c.title}>
                    <p className="mega__title">{c.title}</p>
                    <ul>
                      {c.links.map(([label, to]) => (
                        <li key={label}>
                          <Link to={to} tabIndex={open === m.key ? 0 : -1}>{label}</Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
              <div className="mega__features">
                {m.features.map((f) => (
                  <Link key={f.label} to={f.to} className="mega__feature" tabIndex={open === m.key ? 0 : -1}>
                    <img src={f.p.images[f.img || 0].src} alt="" loading="lazy" />
                    <span>{f.label}</span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        ))}
      </header>

      <div className={'drawer-scrim' + (mobile ? ' is-open' : '')} onClick={() => setMobile(false)} />
      <aside className={'mobile-nav' + (mobile ? ' is-open' : '')} aria-label="Menu" aria-hidden={!mobile}>
        <div className="mobile-nav__top">
          <Logo />
          <button className="icon-btn" aria-label="Close menu" onClick={() => setMobile(false)}>
            <CloseIcon />
          </button>
        </div>
        <ul className="mobile-nav__list">
          {MENU.map((m) => (
            <li key={m.key}>
              <Link to={m.to}>
                {m.label}
                <ChevronIcon width={18} height={18} />
              </Link>
            </li>
          ))}
          <li><Link to="/wishlist">Wishlist <ChevronIcon width={18} height={18} /></Link></li>
          <li><Link to="/size-guide">Size guide <ChevronIcon width={18} height={18} /></Link></li>
          <li><Link to="/about">Our story <ChevronIcon width={18} height={18} /></Link></li>
          <li><Link to="/help">Delivery and returns <ChevronIcon width={18} height={18} /></Link></li>
          <li><Link to="/contact">Contact <ChevronIcon width={18} height={18} /></Link></li>
        </ul>
      </aside>
    </>
  );
}
