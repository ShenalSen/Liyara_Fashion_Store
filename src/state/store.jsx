import { createContext, useContext, useEffect, useMemo, useReducer, useState, useCallback, useRef } from 'react';
import { getProduct } from '../data/products.js';

const StoreCtx = createContext(null);

const load = (key, fallback) => {
  try {
    const v = localStorage.getItem(key);
    return v ? JSON.parse(v) : fallback;
  } catch {
    return fallback;
  }
};
const save = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    /* storage unavailable */
  }
};

const lineId = (slug, color, size) => `${slug}|${color}|${size}`;

function cartReducer(state, action) {
  switch (action.type) {
    case 'add': {
      const id = lineId(action.slug, action.color, action.size);
      const found = state.find((l) => l.id === id);
      if (found) return state.map((l) => (l.id === id ? { ...l, qty: Math.min(10, l.qty + action.qty) } : l));
      return [...state, { id, slug: action.slug, color: action.color, size: action.size, qty: action.qty }];
    }
    case 'qty':
      return state
        .map((l) => (l.id === action.id ? { ...l, qty: Math.max(0, Math.min(10, action.qty)) } : l))
        .filter((l) => l.qty > 0);
    case 'remove':
      return state.filter((l) => l.id !== action.id);
    case 'clear':
      return [];
    default:
      return state;
  }
}

export function StoreProvider({ children }) {
  const [cart, dispatch] = useReducer(cartReducer, null, () => load('liyara-cart', []));
  const [wishlist, setWishlist] = useState(() => load('liyara-wishlist', []));
  const [cartOpen, setCartOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [sizeGuide, setSizeGuide] = useState(null); // category string or null
  const [toast, setToast] = useState(null);
  const toastTimer = useRef();

  useEffect(() => save('liyara-cart', cart), [cart]);
  useEffect(() => save('liyara-wishlist', wishlist), [wishlist]);

  const notify = useCallback((msg) => {
    clearTimeout(toastTimer.current);
    setToast({ msg, key: Date.now() });
    toastTimer.current = setTimeout(() => setToast(null), 2600);
  }, []);

  const lines = useMemo(
    () =>
      cart
        .map((l) => {
          const product = getProduct(l.slug);
          if (!product) return null;
          const image = product.images.find((im) => im.color === l.color) || product.images[0];
          return { ...l, product, image, total: product.price * l.qty };
        })
        .filter(Boolean),
    [cart]
  );
  const subtotal = lines.reduce((s, l) => s + l.total, 0);
  const count = lines.reduce((s, l) => s + l.qty, 0);

  const value = {
    lines,
    subtotal,
    count,
    addToCart: (slug, color, size, qty = 1, { open = true } = {}) => {
      dispatch({ type: 'add', slug, color, size, qty });
      if (open) setCartOpen(true);
      else notify('Added to bag');
    },
    setQty: (id, qty) => dispatch({ type: 'qty', id, qty }),
    removeLine: (id) => dispatch({ type: 'remove', id }),
    clearCart: () => dispatch({ type: 'clear' }),
    wishlist,
    isWished: (slug) => wishlist.includes(slug),
    toggleWish: (slug) => {
      const on = wishlist.includes(slug);
      notify(on ? 'Removed from wishlist' : 'Saved to wishlist');
      setWishlist(on ? wishlist.filter((s) => s !== slug) : [...wishlist, slug]);
    },
    cartOpen,
    setCartOpen,
    searchOpen,
    setSearchOpen,
    sizeGuide,
    setSizeGuide,
    toast,
    notify,
  };

  return <StoreCtx.Provider value={value}>{children}</StoreCtx.Provider>;
}

export const useStore = () => useContext(StoreCtx);
