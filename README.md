# Liyara Fashion Store

A React storefront for Liyara: hand-embroidered frocks, shirt dresses and lace party dresses for women, teens and kids.

Built with React 18 and Vite. No backend is needed to run it; the cart, wishlist and recently viewed items are saved in the browser.

## Run it

You need [Node.js](https://nodejs.org) 18 or newer.

```bash
cd C:\F-DRIVE\GIT\Liyara_Fashion_Store
npm install
npm run dev
```

Open the address Vite prints (usually http://localhost:5173).

## Build for hosting

```bash
npm run build
```

This creates a `dist` folder. Upload its contents to any static host (Netlify, Vercel, GitHub Pages, cPanel hosting). Links use `#/` routes, so no server setup is needed.

To preview the built site locally: `npm run preview`.

## What's inside

| Page | What it does |
| --- | --- |
| Home | Hero with animated running stitch, delivery promises, New in, shop by Women/Teens/Kids, "Look closer" embroidery hotspots, Lace rail, Aria colour picker, Most loved |
| Shop (`#/shop`) | Category and collection pills, colour and price filters (bottom sheet on mobile), sort, search results |
| Product (`#/product/<slug>`) | Photo gallery with hover zoom and swipe, colour swatches that switch photos, sizes, size guide with fit finder, quantity, wishlist, sticky add-to-bag bar, details accordions, Complete the look, Recently viewed |
| Bag | Slide-out drawer with free-delivery progress bar and suggestions |
| Checkout (`#/checkout`) | 3 steps: contact, delivery (all 25 districts), payment (cash on delivery, Koko, Mintpay, bank transfer) |
| Also | Wishlist, Size guide, Delivery/Returns/Payments help, Our story, Contact, search overlay, 404 |

## Editing the store

| To change | Edit |
| --- | --- |
| Product names, prices, sale prices, descriptions, sizes | `src/data/products.js` |
| Which photo belongs to which product and colour | `src/data/images.json` |
| Size charts | `src/data/sizeCharts.js` |
| Email, phone, WhatsApp, social links, announcement bar | `src/data/site.js` |
| Colours and fonts | top of `src/styles.css` |

Product photos are in `public/products/<product-slug>/`, converted to WebP and resized from the originals in `Assets/`.

## Before going live

- Replace the placeholder email and add your phone/WhatsApp in `src/data/site.js`.
- Confirm prices, fabric descriptions and delivery fee (Rs 400, free over Rs 10,000).
- Checkout currently confirms the order on screen only. To take real orders, connect it to a payment gateway (PayHere, Koko, Mintpay) or a backend such as Shopify, or send orders to email/WhatsApp.
