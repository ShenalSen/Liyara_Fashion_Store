import { useState } from 'react';
import { Link } from '../router.jsx';
import { useStore } from '../state/store.jsx';
import { formatLKR, COLOR_HEX, objPos } from '../data/products.js';
import { HeartIcon, PlusIcon } from './Icons.jsx';

export default function ProductCard({ product: p, priority = false }) {
  const { addToCart, isWished, toggleWish } = useStore();
  const [color, setColor] = useState(p.colors[0]);
  const [quick, setQuick] = useState(false);

  const forColor = p.images.filter((im) => im.color === color);
  const main = forColor[0] || p.images[0];
  const alt = forColor[1] || p.images.find((im) => im !== main && im.color === color);
  const wished = isWished(p.slug);
  const href = `/product/${p.slug}?color=${encodeURIComponent(color)}`;

  return (
    <article className="card">
      <div className="card__media">
        <Link to={href} className="card__imglink" aria-label={p.name}>
          <img src={main.src} alt={`${p.name} in ${color}`} loading={priority ? 'eager' : 'lazy'} width={main.w} height={main.h} style={objPos(main)} />
          {alt && <img className="card__alt" src={alt.src} alt="" loading="lazy" aria-hidden="true" style={objPos(alt)} />}
        </Link>
        <div className="card__tags">
          {p.compareAt && <span className="tag tag--sale">Save {Math.round((1 - p.price / p.compareAt) * 100)}%</span>}
          {p.isNew && <span className="tag">New</span>}
          {p.bestseller && <span className="tag tag--best">Best seller</span>}
        </div>
        <button
          className={'card__wish' + (wished ? ' is-on' : '')}
          aria-pressed={wished}
          aria-label={wished ? `Remove ${p.name} from wishlist` : `Save ${p.name} to wishlist`}
          onClick={() => toggleWish(p.slug)}
        >
          <HeartIcon filled={wished} width={18} height={18} />
        </button>

        <div className={'card__quick' + (quick ? ' is-open' : '')}>
          {quick ? (
            <>
              <p className="card__quick-label">Pick a size to add</p>
              <div className="card__sizes">
                {p.sizes.map((s) => (
                  <button
                    key={s}
                    className="chip"
                    onClick={() => {
                      addToCart(p.slug, color, s, 1, { open: false });
                      setQuick(false);
                    }}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </>
          ) : (
            <button className="card__quick-btn" onClick={() => setQuick(true)}>
              <PlusIcon width={16} height={16} /> Quick add
            </button>
          )}
        </div>
      </div>

      <div className="card__body">
        <Link to={href} className="card__name">{p.name}</Link>
        <p className="card__price">
          <span>{formatLKR(p.price)}</span>
          {p.compareAt && <s>{formatLKR(p.compareAt)}</s>}
        </p>
        {p.colors.length > 1 && (
          <div className="swatches" role="radiogroup" aria-label="Colour">
            {p.colors.slice(0, 6).map((c) => (
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
            {p.colors.length > 6 && <span className="swatches__more">+{p.colors.length - 6}</span>}
          </div>
        )}
      </div>
    </article>
  );
}
