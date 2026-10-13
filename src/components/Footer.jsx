import { useState } from 'react';
import { Link } from '../router.jsx';
import { SITE } from '../data/site.js';
import Logo from './Logo.jsx';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [done, setDone] = useState(false);
  return (
    <footer className="footer">
      <div className="footer__news">
        <div>
          <h2>First look at every new drop</h2>
          <p>New embroidery, restocks and members-only offers, about twice a month.</p>
        </div>
        {done ? (
          <p className="footer__thanks" role="status">You're on the list. Watch your inbox for the next drop.</p>
        ) : (
          <form
            className="footer__form"
            onSubmit={(e) => {
              e.preventDefault();
              if (/\S+@\S+\.\S+/.test(email)) setDone(true);
            }}
          >
            <label htmlFor="news-email" className="sr-only">Email address</label>
            <input id="news-email" type="email" required placeholder="Your email address" value={email} onChange={(e) => setEmail(e.target.value)} />
            <button className="btn btn--sun" type="submit">Subscribe</button>
          </form>
        )}
      </div>

      <div className="footer__grid">
        <div className="footer__brand">
          <Logo inverse />
          <p>{SITE.tagline}. Designed and finished in {SITE.city}.</p>
          <div className="footer__social">
            <a href={SITE.instagram} target="_blank" rel="noreferrer">Instagram</a>
            <a href={SITE.facebook} target="_blank" rel="noreferrer">Facebook</a>
            <a href={SITE.tiktok} target="_blank" rel="noreferrer">TikTok</a>
          </div>
        </div>
        <div>
          <h3>Shop</h3>
          <ul>
            <li><Link to="/shop?cat=women">Women</Link></li>
            <li><Link to="/shop?cat=teens">Teens</Link></li>
            <li><Link to="/shop?cat=kids">Kids</Link></li>
            <li><Link to="/shop?collection=garden-embroidery">The Garden Edit</Link></li>
            <li><Link to="/shop?sale=1">Sale</Link></li>
          </ul>
        </div>
        <div>
          <h3>Help</h3>
          <ul>
            <li><Link to="/size-guide">Size guide</Link></li>
            <li><Link to="/help">Delivery</Link></li>
            <li><Link to="/help?tab=returns">Returns and exchanges</Link></li>
            <li><Link to="/help?tab=payments">Payments</Link></li>
            <li><Link to="/contact">Contact us</Link></li>
          </ul>
        </div>
        <div>
          <h3>Liyara</h3>
          <ul>
            <li><Link to="/about">Our story</Link></li>
            <li><Link to="/wishlist">Wishlist</Link></li>
            <li><a href={`mailto:${SITE.email}`}>{SITE.email}</a></li>
            {SITE.phone && <li><a href={`tel:${SITE.phone.replace(/\s/g, '')}`}>{SITE.phone}</a></li>}
          </ul>
        </div>
      </div>
      <div className="footer__base">
        <p>© {new Date().getFullYear()} {SITE.fullName}</p>
        <p className="footer__pay">We accept Visa, Mastercard, Koko, Mintpay and cash on delivery</p>
      </div>
    </footer>
  );
}
