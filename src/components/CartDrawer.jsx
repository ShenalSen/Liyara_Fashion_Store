import { useEffect, useRef } from 'react';
import { Link, navigate } from '../router.jsx';
import { useStore } from '../state/store.jsx';
import { formatLKR, FREE_DELIVERY_FROM, PRODUCTS, objPos } from '../data/products.js';
import { CloseIcon, MinusIcon, PlusIcon, BagIcon } from './Icons.jsx';

export function QtyStepper({ value, onChange, label }) {
  return (
    <div className="qty" role="group" aria-label={label}>
      <button aria-label="Decrease quantity" onClick={() => onChange(value - 1)}><MinusIcon width={16} height={16} /></button>
      <span aria-live="polite">{value}</span>
      <button aria-label="Increase quantity" onClick={() => onChange(value + 1)} disabled={value >= 10}><PlusIcon width={16} height={16} /></button>
    </div>
  );
}

export function DeliveryMeter({ subtotal }) {
  const left = FREE_DELIVERY_FROM - subtotal;
  const pct = Math.min(100, (subtotal / FREE_DELIVERY_FROM) * 100);
  return (
    <div className="meter">
      <p>{left > 0 ? <>Add <b>{formatLKR(left)}</b> more for free delivery</> : <>Your order ships free, island-wide</>}</p>
      <div className="meter__track"><div className="meter__fill" style={{ width: pct + '%' }} /></div>
    </div>
  );
}

export default function CartDrawer() {
  const { cartOpen, setCartOpen, lines, subtotal, setQty, removeLine } = useStore();
  const closeRef = useRef();

  useEffect(() => {
    if (cartOpen) closeRef.current?.focus();
    const onKey = (e) => e.key === 'Escape' && setCartOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [cartOpen, setCartOpen]);

  const inCart = new Set(lines.map((l) => l.slug));
  const suggestions = PRODUCTS.filter((p) => p.bestseller && !inCart.has(p.slug)).slice(0, 2);

  return (
    <>
      <div className={'drawer-scrim' + (cartOpen ? ' is-open' : '')} onClick={() => setCartOpen(false)} />
      <aside className={'cart' + (cartOpen ? ' is-open' : '')} aria-label="Shopping bag" aria-hidden={!cartOpen} role="dialog">
        <div className="cart__head">
          <h2>Your bag</h2>
          <button ref={closeRef} className="icon-btn" aria-label="Close bag" onClick={() => setCartOpen(false)}>
            <CloseIcon />
          </button>
        </div>

        {lines.length === 0 ? (
          <div className="cart__empty">
            <BagIcon width={40} height={40} />
            <p>Your bag is empty.</p>
            <button className="btn btn--primary" onClick={() => { setCartOpen(false); navigate('/shop'); }}>
              Start shopping
            </button>
          </div>
        ) : (
          <>
            <DeliveryMeter subtotal={subtotal} />
            <ul className="cart__lines">
              {lines.map((l) => (
                <li key={l.id} className="line">
                  <img src={l.image.src} alt="" style={objPos(l.image)} />
                  <div className="line__info">
                    <Link to={`/product/${l.slug}`} onClick={() => setCartOpen(false)} className="line__name">{l.product.name}</Link>
                    <p className="line__meta">{l.color} / {l.size}</p>
                    <div className="line__row">
                      <QtyStepper value={l.qty} onChange={(q) => setQty(l.id, q)} label={`Quantity for ${l.product.name}`} />
                      <span className="line__price">{formatLKR(l.total)}</span>
                    </div>
                    <button className="link-btn" onClick={() => removeLine(l.id)}>Remove</button>
                  </div>
                </li>
              ))}
            </ul>

            {suggestions.length > 0 && (
              <div className="cart__suggest">
                <p className="cart__suggest-title">Pairs well with</p>
                {suggestions.map((p) => (
                  <Link key={p.slug} to={`/product/${p.slug}`} className="mini" onClick={() => setCartOpen(false)}>
                    <img src={p.images[0].src} alt="" loading="lazy" />
                    <span>{p.name}<br /><b>{formatLKR(p.price)}</b></span>
                  </Link>
                ))}
              </div>
            )}

            <div className="cart__foot">
              <div className="cart__total"><span>Subtotal</span><b>{formatLKR(subtotal)}</b></div>
              <p className="cart__note">Or 3 instalments of {formatLKR(Math.ceil(subtotal / 3))} with Koko or Mintpay. Delivery is worked out at checkout.</p>
              <button className="btn btn--primary btn--block" onClick={() => { setCartOpen(false); navigate('/checkout'); }}>
                Check out
              </button>
              <button className="btn btn--ghost btn--block" onClick={() => setCartOpen(false)}>Keep shopping</button>
            </div>
          </>
        )}
      </aside>
    </>
  );
}
