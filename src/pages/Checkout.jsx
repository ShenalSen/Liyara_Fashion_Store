import { useState } from 'react';
import { Link } from '../router.jsx';
import { useStore } from '../state/store.jsx';
import { formatLKR, FREE_DELIVERY_FROM } from '../data/products.js';
import { CheckIcon } from '../components/Icons.jsx';

const DISTRICTS = ['Ampara', 'Anuradhapura', 'Badulla', 'Batticaloa', 'Colombo', 'Galle', 'Gampaha', 'Hambantota', 'Jaffna', 'Kalutara', 'Kandy', 'Kegalle', 'Kilinochchi', 'Kurunegala', 'Mannar', 'Matale', 'Matara', 'Monaragala', 'Mullaitivu', 'Nuwara Eliya', 'Polonnaruwa', 'Puttalam', 'Ratnapura', 'Trincomalee', 'Vavuniya'];

const PAY = [
  ['cod', 'Cash on delivery', 'Pay the courier when your parcel arrives.'],
  ['koko', 'Koko, pay in 3', 'Three interest-free instalments. You will be sent to Koko to finish.'],
  ['mintpay', 'Mintpay, pay in 3', 'Three interest-free instalments. You will be sent to Mintpay to finish.'],
  ['bank', 'Bank transfer', 'We will send our bank details by email. Orders ship once payment clears.'],
];

const STEPS = ['Contact', 'Delivery', 'Payment'];

export default function Checkout() {
  const { lines, subtotal, clearCart } = useStore();
  const [step, setStep] = useState(0);
  const [form, setForm] = useState({ email: '', phone: '', first: '', last: '', address: '', city: '', district: 'Colombo', note: '' });
  const [pay, setPay] = useState('cod');
  const [errors, setErrors] = useState({});
  const [order, setOrder] = useState(null);

  const delivery = subtotal >= FREE_DELIVERY_FROM ? 0 : 400;
  const total = subtotal + delivery;
  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  const validate = (s) => {
    const e = {};
    if (s === 0) {
      if (!/\S+@\S+\.\S+/.test(form.email)) e.email = 'Enter an email like name@example.com.';
      if (!/^(\+?94|0)?7\d{8}$/.test(form.phone.replace(/[\s-]/g, ''))) e.phone = 'Enter a Sri Lankan mobile number, like 077 123 4567.';
    }
    if (s === 1) {
      if (!form.first.trim()) e.first = 'Enter your first name.';
      if (!form.last.trim()) e.last = 'Enter your last name.';
      if (form.address.trim().length < 6) e.address = 'Enter your house number and street.';
      if (!form.city.trim()) e.city = 'Enter your town or city.';
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const next = (e) => {
    e.preventDefault();
    if (!validate(step)) return;
    if (step < 2) setStep(step + 1);
    else {
      const id = 'LY' + Math.floor(100000 + Math.random() * 899999);
      setOrder({ id, total, pay, name: form.first, email: form.email, items: lines.length });
      clearCart();
      window.scrollTo(0, 0);
    }
  };

  if (order) {
    return (
      <div className="done">
        <span className="done__icon"><CheckIcon width={32} height={32} /></span>
        <h1>Thank you, {order.name}. Your order is placed.</h1>
        <p>Order <b>{order.id}</b> for {formatLKR(order.total)}. We have sent a confirmation to {order.email}.</p>
        <p>{order.pay === 'cod' ? 'Please keep the exact amount ready for the courier.' : order.pay === 'bank' ? 'Look out for our bank details in your inbox.' : 'You will receive a link to complete your instalment plan.'}</p>
        <Link to="/shop" className="btn btn--primary">Continue shopping</Link>
      </div>
    );
  }

  if (!lines.length) {
    return (
      <div className="done">
        <h1>Your bag is empty</h1>
        <p>Add a dress or two, then come back to check out.</p>
        <Link to="/shop" className="btn btn--primary">Start shopping</Link>
      </div>
    );
  }

  const Field = ({ id, label, type = 'text', ...rest }) => (
    <div className={'field' + (errors[id] ? ' field--error' : '')}>
      <label htmlFor={`co-${id}`}>{label}</label>
      <input id={`co-${id}`} type={type} value={form[id]} onChange={set(id)} aria-invalid={!!errors[id]} aria-describedby={errors[id] ? `co-${id}-err` : undefined} {...rest} />
      {errors[id] && <p id={`co-${id}-err`} className="field-error">{errors[id]}</p>}
    </div>
  );

  return (
    <div className="checkout">
      <div className="checkout__main">
        <h1>Checkout</h1>
        <ol className="steps" aria-label="Checkout progress">
          {STEPS.map((s, i) => (
            <li key={s} className={i === step ? 'is-on' : i < step ? 'is-done' : ''} aria-current={i === step ? 'step' : undefined}>
              <button type="button" disabled={i > step} onClick={() => setStep(i)}>
                <span className="steps__n">{i < step ? <CheckIcon width={14} height={14} /> : i + 1}</span>{s}
              </button>
            </li>
          ))}
        </ol>

        <form onSubmit={next} noValidate>
          {step === 0 && (
            <fieldset className="co-block">
              <legend>How can we reach you?</legend>
              {Field({ id: 'email', label: 'Email', type: 'email', autoComplete: 'email' })}
              {Field({ id: 'phone', label: 'Mobile number', type: 'tel', autoComplete: 'tel', placeholder: '077 123 4567' })}
              <p className="hint">We will text you when your parcel is on its way.</p>
            </fieldset>
          )}
          {step === 1 && (
            <fieldset className="co-block">
              <legend>Where should we deliver?</legend>
              <div className="field-row">
                {Field({ id: 'first', label: 'First name', autoComplete: 'given-name' })}
                {Field({ id: 'last', label: 'Last name', autoComplete: 'family-name' })}
              </div>
              {Field({ id: 'address', label: 'Address', autoComplete: 'street-address' })}
              <div className="field-row">
                {Field({ id: 'city', label: 'Town or city', autoComplete: 'address-level2' })}
                <div className="field">
                  <label htmlFor="co-district">District</label>
                  <select id="co-district" value={form.district} onChange={set('district')}>
                    {DISTRICTS.map((d) => <option key={d}>{d}</option>)}
                  </select>
                </div>
              </div>
              <div className="field">
                <label htmlFor="co-note">Delivery note (optional)</label>
                <textarea id="co-note" rows={2} value={form.note} onChange={set('note')} placeholder="Landmark, gate colour, best time to call" />
              </div>
            </fieldset>
          )}
          {step === 2 && (
            <fieldset className="co-block">
              <legend>How would you like to pay?</legend>
              {PAY.map(([k, t, d]) => (
                <label key={k} className={'pay-opt' + (pay === k ? ' is-on' : '')}>
                  <input type="radio" name="pay" value={k} checked={pay === k} onChange={() => setPay(k)} />
                  <span><b>{t}</b><br />{d}{(k === 'koko' || k === 'mintpay') && <> 3 × {formatLKR(Math.ceil(total / 3))}.</>}</span>
                </label>
              ))}
              <p className="hint">Delivering to {form.first} {form.last}, {form.address}, {form.city}, {form.district}.</p>
            </fieldset>
          )}
          <div className="co-actions">
            {step > 0 && <button type="button" className="btn btn--ghost" onClick={() => setStep(step - 1)}>Back</button>}
            <button type="submit" className="btn btn--primary btn--grow">
              {step === 0 ? 'Continue to delivery' : step === 1 ? 'Continue to payment' : `Place order, ${formatLKR(total)}`}
            </button>
          </div>
        </form>
      </div>

      <aside className="summary" aria-label="Order summary">
        <h2>Order summary</h2>
        <ul>
          {lines.map((l) => (
            <li key={l.id}>
              <span className="summary__img"><img src={l.image.src} alt="" /><span className="summary__qty">{l.qty}</span></span>
              <span className="summary__name">{l.product.name}<br /><small>{l.color} / {l.size}</small></span>
              <span>{formatLKR(l.total)}</span>
            </li>
          ))}
        </ul>
        <dl>
          <div><dt>Subtotal</dt><dd>{formatLKR(subtotal)}</dd></div>
          <div><dt>Delivery</dt><dd>{delivery ? formatLKR(delivery) : 'Free'}</dd></div>
          <div className="summary__total"><dt>Total</dt><dd>{formatLKR(total)}</dd></div>
        </dl>
      </aside>
    </div>
  );
}
