// A tiny hash router: URLs look like /#/shop?cat=women so the built site works on any static host.
import { useEffect, useState, useCallback } from 'react';

function parse() {
  const hash = window.location.hash.replace(/^#/, '') || '/';
  const [path, query = ''] = hash.split('?');
  return { path: path || '/', params: new URLSearchParams(query) };
}

export function useRoute() {
  const [route, setRoute] = useState(parse);
  useEffect(() => {
    const on = () => setRoute(parse());
    window.addEventListener('hashchange', on);
    return () => window.removeEventListener('hashchange', on);
  }, []);
  return route;
}

export function navigate(to) {
  window.location.hash = to;
}

export function Link({ to, children, onClick, ...rest }) {
  const handle = useCallback(
    (e) => {
      if (onClick) onClick(e);
    },
    [onClick]
  );
  return (
    <a href={'#' + to} onClick={handle} {...rest}>
      {children}
    </a>
  );
}

// Match "/product/:slug" style patterns.
export function match(pattern, path) {
  const p = pattern.split('/').filter(Boolean);
  const s = path.split('/').filter(Boolean);
  if (p.length !== s.length) return null;
  const out = {};
  for (let i = 0; i < p.length; i++) {
    if (p[i].startsWith(':')) out[p[i].slice(1)] = decodeURIComponent(s[i]);
    else if (p[i] !== s[i]) return null;
  }
  return out;
}
