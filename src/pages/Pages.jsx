import { useState } from 'react';
import { Link } from '../router.jsx';
import { useStore } from '../state/store.jsx';
import { PRODUCTS, getProduct, FREE_DELIVERY_FROM, formatLKR } from '../data/products.js';
import { SITE } from '../data/site.js';
import ProductCard from '../components/ProductCard.jsx';
import { ChartTable, FitFinder, WOMEN_CHART, TEEN_CHART, KIDS_CHART } from '../components/SizeGuide.jsx';
import { HeartIcon } from '../components/Icons.jsx';

export function Wishlist() {
  const { wishlist } = useStore();
  const items = wishlist.map(getProduct).filter(Boolean);
  return (
    <div className="page">
      <h1>Wishlist</h1>
      {items.length ? (
        <>
          <p className="page__lede">{items.length} saved {items.length === 1 ? 'style' : 'styles'}. Saved items stay on this device.</p>
          <div className="grid grid--4">{items.map((p) => <ProductCard key={p.slug} product={p} />)}</div>
        </>
      ) : (
        <div className="empty">
          <HeartIcon width={36} height={36} />
          <p>Tap the heart on any dress to save it here.</p>
          <Link to="/shop" className="btn btn--primary">Browse the collection</Link>
        </div>
      )}
    </div>
  );
}

export function About() {
  const a = getProduct('botanica-tiered-maxi').images[0];
  const b = getProduct('wildflower-embroidered-shirt-blouse').images[2];
  return (
    <div className="page about">
      <div className="about__intro">
        <h1>Made for the women we know, and the girls they dress.</h1>
        <p className="page__lede">
          Liyara began with one embroidered blouse and a simple idea: everyday clothes can carry the care of handwork. Today we make frocks, shirt dresses and lace party dresses for women, teens and little ones, in sizes that grow with the family.
        </p>
      </div>
      <div className="about__split">
        <img src={a.src} alt="Botanica Tiered Maxi with hand embroidery" loading="lazy" />
        <div>
          <h2>What we make</h2>
          <p>Breathable dresses for warm days, with pockets wherever we can fit them. Embroidery stitched bloom by bloom. Lace party frocks for birthdays, weddings and avurudu.</p>
          <h2>How we work</h2>
          <p>Small batches, so new drops arrive often and sell out quickly. If a style you love is gone, message us. We restock the favourites.</p>
        </div>
      </div>
      <div className="about__split about__split--flip">
        <img src={b.src} alt="Wildflower Embroidered Shirt Blouse in ivory" loading="lazy" />
        <div>
          <h2>Mothers and daughters</h2>
          <p>Many of our lace dresses come in matching colours across women, teens and kids, so the whole family can dress for the occasion together.</p>
          <Link to="/shop?collection=lace-edit" className="btn btn--primary">Shop the Lace Edit</Link>
        </div>
      </div>
    </div>
  );
}

const HELP = {
  delivery: {
    label: 'Delivery',
    body: [
      ['Where do you deliver?', 'Anywhere in Sri Lanka, through our courier partners.'],
      ['How long does it take?', 'Usually 2 to 4 working days. Colombo and suburbs are often next day.'],
      ['How much is delivery?', `Free on orders over ${formatLKR(FREE_DELIVERY_FROM)}. Otherwise a flat Rs 400.`],
      ['Do you ship overseas?', 'Not yet online. Message us and we will quote international shipping.'],
    ],
  },
  returns: {
    label: 'Returns and exchanges',
    body: [
      ['Can I exchange a size?', 'Yes, within 7 days of delivery. Items must be unworn, unwashed and have their tags.'],
      ['How do I start an exchange?', `Email ${SITE.email} with your order number and the size you need. We will arrange the pickup.`],
      ['Who pays for the exchange delivery?', 'Your first size exchange is free. After that a Rs 400 delivery fee applies.'],
      ['Can I get a refund?', 'We refund faulty or wrongly sent items in full. Other items can be exchanged for another size or store credit.'],
    ],
  },
  payments: {
    label: 'Payments',
    body: [
      ['What can I pay with?', 'Visa and Mastercard, Koko, Mintpay, bank transfer and cash on delivery.'],
      ['How does pay in 3 work?', 'Choose Koko or Mintpay at checkout. You pay a third today and the rest over the next two months, interest-free.'],
      ['Is cash on delivery available everywhere?', 'Yes, for orders anywhere in Sri Lanka.'],
    ],
  },
};

export function Help({ params }) {
  const [tab, setTab] = useState(HELP[params.get('tab')] ? params.get('tab') : 'delivery');
  return (
    <div className="page help">
      <h1>Delivery, returns and payments</h1>
      <div className="tabs" role="tablist">
        {Object.entries(HELP).map(([k, v]) => (
          <button key={k} role="tab" aria-selected={tab === k} className={'pill' + (tab === k ? ' is-on' : '')} onClick={() => setTab(k)}>{v.label}</button>
        ))}
      </div>
      <dl className="faq">
        {HELP[tab].body.map(([q, a]) => (
          <div key={q}><dt>{q}</dt><dd>{a}</dd></div>
        ))}
      </dl>
      <p>Still have a question? <Link to="/contact">Contact us</Link>.</p>
    </div>
  );
}

export function SizeGuidePage({ params }) {
  const tabs = { women: WOMEN_CHART, teens: TEEN_CHART, kids: KIDS_CHART };
  const [tab, setTab] = useState(tabs[params.get('tab')] ? params.get('tab') : 'women');
  return (
    <div className="page">
      <h1>Size guide</h1>
      <p className="page__lede">All measurements are in inches, taken flat on the garment.</p>
      <div className="tabs" role="tablist">
        {Object.entries(tabs).map(([k, c]) => (
          <button key={k} role="tab" aria-selected={tab === k} className={'pill' + (tab === k ? ' is-on' : '')} onClick={() => setTab(k)}>{c.title}</button>
        ))}
      </div>
      <FitFinder key={tab} category={tab} />
      <ChartTable chart={tabs[tab]} />
      <p className="hint">{tabs[tab].note}</p>
      <h2 className="page__h2">How to measure</h2>
      <ul className="ticks">
        <li>Bust or chest: around the fullest part, keeping the tape level.</li>
        <li>Waist: around the narrowest part of the natural waist.</li>
        <li>Length: from the highest point of the shoulder down to the hem.</li>
      </ul>
    </div>
  );
}

export function Contact() {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  return (
    <div className="page contact">
      <h1>Contact us</h1>
      <p className="page__lede">Questions about sizing, an order or a custom request? We usually reply within a day.</p>
      <div className="contact__grid">
        <div className="contact__info">
          <p><b>Email</b><br /><a href={`mailto:${SITE.email}`}>{SITE.email}</a></p>
          {SITE.phone && <p><b>Phone</b><br /><a href={`tel:${SITE.phone.replace(/\s/g, '')}`}>{SITE.phone}</a></p>}
          {SITE.whatsapp && <p><b>WhatsApp</b><br /><a href={`https://wa.me/${SITE.whatsapp}`} target="_blank" rel="noreferrer">Message us on WhatsApp</a></p>}
          <p><b>Instagram</b><br /><a href={SITE.instagram} target="_blank" rel="noreferrer">Follow new drops</a></p>
        </div>
        {sent ? (
          <p className="contact__sent" role="status">Your email app should open with your message. If it didn't, write to us at {SITE.email}.</p>
        ) : (
          <form
            className="contact__form"
            onSubmit={(e) => {
              e.preventDefault();
              const body = encodeURIComponent(`${form.message}\n\n${form.name}\n${form.email}`);
              window.location.href = `mailto:${SITE.email}?subject=${encodeURIComponent('Message from ' + form.name)}&body=${body}`;
              setSent(true);
            }}
          >
            <div className="field"><label htmlFor="c-name">Name</label><input id="c-name" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} /></div>
            <div className="field"><label htmlFor="c-email">Email</label><input id="c-email" type="email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} /></div>
            <div className="field"><label htmlFor="c-msg">Message</label><textarea id="c-msg" rows={5} required value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} /></div>
            <button className="btn btn--primary" type="submit">Send message</button>
          </form>
        )}
      </div>
    </div>
  );
}

export { PRODUCTS };
