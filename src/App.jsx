import { useEffect } from 'react';
import { useRoute, match } from './router.jsx';
import { StoreProvider, useStore } from './state/store.jsx';
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import CartDrawer from './components/CartDrawer.jsx';
import SearchOverlay from './components/SearchOverlay.jsx';
import Home from './pages/Home.jsx';
import Shop from './pages/Shop.jsx';
import Product from './pages/Product.jsx';
import Checkout from './pages/Checkout.jsx';
import NotFound from './pages/NotFound.jsx';
import { Wishlist, About, Help, SizeGuidePage, Contact } from './pages/Pages.jsx';
import { getProduct } from './data/products.js';
import { SITE } from './data/site.js';

function Page() {
  const { path, params } = useRoute();
  let m;
  if (path === '/') return <Home />;
  if (path === '/shop') return <Shop params={params} />;
  if ((m = match('/product/:slug', path))) return <Product key={m.slug} slug={m.slug} params={params} />;
  if (path === '/checkout') return <Checkout />;
  if (path === '/wishlist') return <Wishlist />;
  if (path === '/about') return <About />;
  if (path === '/help') return <Help key={params.toString()} params={params} />;
  if (path === '/size-guide') return <SizeGuidePage key={params.toString()} params={params} />;
  if (path === '/contact') return <Contact />;
  return <NotFound />;
}

function Toast() {
  const { toast } = useStore();
  return (
    <div className="toast-region" role="status" aria-live="polite">
      {toast && <div key={toast.key} className="toast">{toast.msg}</div>}
    </div>
  );
}

function Shell() {
  const { path } = useRoute();
  useEffect(() => {
    window.scrollTo(0, 0);
    const m = match('/product/:slug', path);
    const p = m && getProduct(m.slug);
    document.title = p ? `${p.name} | ${SITE.fullName}` : `${SITE.fullName} | ${SITE.tagline}`;
  }, [path]);
  return (
    <>
      <a className="skip" href="#main">Skip to content</a>
      <Header />
      <main id="main" tabIndex={-1}>
        <Page />
      </main>
      <Footer />
      <CartDrawer />
      <SearchOverlay />
      <Toast />
    </>
  );
}

export default function App() {
  return (
    <StoreProvider>
      <Shell />
    </StoreProvider>
  );
}
