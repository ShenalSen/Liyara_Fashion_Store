// Liyara product catalogue.
// Prices are in LKR. Edit names, prices, sizes and details here — the whole site updates.
import images from './images.json';

const WOMEN_SIZES = ['M', 'L', 'XL'];
const TEEN_SIZES = ['7-8 yrs', '9-10 yrs', '11-12 yrs', '13-14 yrs', '15 yrs'];
const KIDS_SIZES = ['1-2 yrs', '2-3 yrs', '3-4 yrs', '4-5 yrs', '5-6 yrs'];

export const CATEGORIES = {
  women: { label: 'Women', blurb: 'Frocks, shirt dresses and blouses for work, weekends and family days.' },
  teens: { label: 'Teens', blurb: 'Lace dresses for birthdays, concerts and every celebration from 7 to 15.' },
  kids: { label: 'Kids', blurb: 'Soft lace party frocks with bows and puff sleeves for ages 1 to 6.' },
};

export const COLLECTIONS = {
  'garden-embroidery': {
    label: 'The Garden Edit',
    blurb: 'Sunflowers, ferns and wild blooms, embroidered by hand on cotton.',
  },
  'effortless-elegance': {
    label: 'Effortless Elegance',
    blurb: 'Breathable everyday dresses with flattering fits and real pockets.',
  },
  'lace-edit': {
    label: 'The Lace Edit',
    blurb: 'Tiered lace in blush, seafoam and turquoise, for mothers and daughters.',
  },
  'everyday-ease': {
    label: 'Everyday Ease',
    blurb: 'Easy shirt dresses and tiered maxis you will reach for every week.',
  },
};

// Colour swatches (hex) used for the swatch dots.
export const COLOR_HEX = {
  'Midnight Black': '#1d1d1f', Black: '#1d1d1f', 'Forest Green': '#2f6b3e', 'Ivory Folk': '#f4f1e8',
  'Ivory Sunflower': '#f6f0dc', 'Pebble Grey': '#b9b4aa', 'Powder Blue': '#bcd6e8', 'Ivory Sakura': '#f7eef0',
  White: '#ffffff', Lavender: '#b9a6dd', 'Sky Blue': '#9cc5ea', Sand: '#d9c9ae', Teal: '#14a39a',
  Maroon: '#7d1a2a', Navy: '#1d2c63', Olive: '#5a6a2b', Marigold: '#d98a14', Fuchsia: '#e0337a',
  'Dusty Rose': '#b9787a', Coral: '#dd6670', 'Mint Green': '#9fd88a', Turquoise: '#22b3b8',
  Blush: '#f1c3bb', Seafoam: '#79c9b5', Mint: '#a8dcc7', Peach: '#f6c1a8', 'Blush Pink': '#efc1c0',
};

const raw = [
  {
    slug: 'wildflower-embroidered-shirt-blouse',
    name: 'Wildflower Embroidered Shirt Blouse',
    category: 'women', type: 'Blouses', collection: 'garden-embroidery',
    price: 6490, isNew: true,
    short: 'A classic button-down covered in hand-stitched sunflowers and meadow blooms.',
    details: [
      'Pointed collar with full button placket',
      'Long sleeves with embroidered cuffs',
      'Dense floral embroidery along the hem',
      'Straight fit that sits at the hip',
    ],
    fabric: 'Woven cotton-feel fabric with thread embroidery.',
    care: 'Hand wash cold, inside out. Do not bleach. Dry in shade. Iron on reverse.',
  },
  {
    slug: 'hana-striped-belted-shirt-dress',
    name: 'Hana Striped Belted Shirt Dress',
    category: 'women', type: 'Dresses', collection: 'everyday-ease',
    price: 5290, compareAt: 6290,
    short: 'A sleeveless pinstripe shirt dress that ties at the waist and swings at the knee.',
    details: ['Sleeveless with a soft collar', 'Button-front bodice', 'Self-tie waist belt', 'Knee-length A-line skirt'],
    fabric: 'Lightweight striped weave.',
    care: 'Machine wash cold on gentle. Do not tumble dry. Warm iron.',
  },
  {
    slug: 'sakura-tiered-maxi-dress',
    name: 'Sakura Tiered Maxi Dress',
    category: 'women', type: 'Dresses', collection: 'everyday-ease',
    price: 6890, isNew: true,
    short: 'White tiered maxi scattered with pink blossom prints and puffed elbow sleeves.',
    details: ['V-neckline with short placket', 'Elbow-length puff sleeves', 'Two tiered, gathered skirt', 'Full-length fit'],
    fabric: 'Soft printed cotton-feel fabric.',
    care: 'Machine wash cold with similar colours. Line dry. Medium iron.',
  },
  {
    slug: 'rosalie-embroidered-belted-midi',
    name: 'Rosalie Embroidered Belted Midi',
    category: 'women', type: 'Dresses', collection: 'effortless-elegance',
    price: 7490,
    short: 'Crisp white midi with red rose embroidery, wooden buttons and a tie belt.',
    details: ['Round neck with full button front', 'Puffed elbow sleeves', 'Self-tie waist belt', 'Soft and breathable, flattering fit, with pockets'],
    fabric: 'Breathable woven fabric with embroidery.',
    care: 'Hand wash cold. Dry in shade. Iron on reverse side of embroidery.',
  },
  {
    slug: 'bloom-print-button-front-maxi',
    name: 'Bloom Print Button-Front Maxi',
    category: 'women', type: 'Dresses', collection: 'effortless-elegance',
    price: 6990, isNew: true,
    short: 'A full, swingy maxi in watercolour florals, available in three soft shades.',
    details: ['Mandarin collar and button front', 'Three-quarter sleeves', 'Chest flap pocket', 'Soft and breathable, flattering fit, with pockets'],
    fabric: 'Lightweight printed fabric.',
    care: 'Machine wash cold on gentle. Line dry in shade. Warm iron.',
  },
  {
    slug: 'ivory-rose-curved-hem-shirt-dress',
    name: 'Ivory Rose Curved-Hem Shirt Dress',
    category: 'women', type: 'Dresses', collection: 'effortless-elegance',
    price: 6790,
    short: 'A relaxed white shirt dress with rose embroidery, side pockets and a curved hem.',
    details: ['Collared button-down', 'Three-quarter sleeves with button tab', 'Curved shirt-tail hem', 'Side pockets'],
    fabric: 'Breathable woven fabric with embroidery.',
    care: 'Hand wash cold. Dry in shade. Iron on reverse side of embroidery.',
  },
  {
    slug: 'celeste-asymmetric-tiered-dress',
    name: 'Celeste Asymmetric Tiered Dress',
    category: 'women', type: 'Dresses', collection: 'effortless-elegance',
    price: 7290,
    short: 'White shirt dress with a diagonal tier and scattered rose embroidery.',
    details: ['Collared button front', 'Elbow-length sleeves', 'Asymmetric tiered skirt', 'Soft and breathable, with pockets'],
    fabric: 'Breathable woven fabric with embroidery.',
    care: 'Hand wash cold. Dry in shade. Iron on reverse side of embroidery.',
  },
  {
    slug: 'aria-everyday-a-line-dress',
    name: 'Aria Everyday A-Line Dress',
    category: 'women', type: 'Dresses', collection: 'effortless-elegance',
    price: 4990, bestseller: true,
    short: 'Our easiest dress: textured A-line with pockets and a curved hem, in eight colours.',
    details: ['Notched round neck with button placket', 'Three-quarter sleeves', 'Deep side pockets', 'Curved high-low hem'],
    fabric: 'Textured, breathable weave.',
    care: 'Machine wash cold with similar colours. Line dry in shade. Warm iron.',
  },
  {
    slug: 'sunflower-meadow-embroidered-maxi',
    name: 'Sunflower Meadow Embroidered Maxi',
    category: 'women', type: 'Dresses', collection: 'garden-embroidery', bestseller: true,
    price: 9890,
    short: 'A full-skirted maxi with ruffle straps and a hand-embroidered sunflower border.',
    details: ['Square neckline', 'Ruffled shoulder straps', 'Fitted bodice, fully flared skirt', 'Embroidered sunflower and fern border'],
    fabric: 'Cotton-feel fabric with thread embroidery.',
    care: 'Hand wash cold, inside out. Do not wring. Dry in shade.',
  },
  {
    slug: 'botanica-embroidered-midi',
    name: 'Botanica Embroidered Midi',
    category: 'women', type: 'Dresses', collection: 'garden-embroidery', isNew: true,
    price: 8490,
    short: 'A white square-neck midi with frill straps and cobalt-and-rose botanical embroidery.',
    details: ['Square neckline', 'Frilled shoulder straps', 'Fit-and-flare silhouette', 'Deep embroidered hem border'],
    fabric: 'Cotton-feel fabric with thread embroidery.',
    care: 'Hand wash cold, inside out. Do not wring. Dry in shade.',
  },
  {
    slug: 'botanica-tiered-maxi',
    name: 'Botanica Tiered Maxi',
    category: 'women', type: 'Dresses', collection: 'garden-embroidery',
    price: 9490,
    short: 'The Botanica embroidery on a V-neck tiered maxi with flutter sleeves.',
    details: ['V-neckline', 'Flutter sleeves', 'Two-tier gathered skirt', 'Embroidered bodice and hem'],
    fabric: 'Cotton-feel fabric with thread embroidery.',
    care: 'Hand wash cold, inside out. Do not wring. Dry in shade.',
  },
  {
    slug: 'lumi-lace-tiered-midi',
    name: 'Lumi Lace Tiered Midi',
    category: 'women', type: 'Dresses', collection: 'lace-edit', isNew: true,
    price: 7890,
    short: 'All-over floral lace in a relaxed V-neck midi with a gathered tier.',
    details: ['V-neckline with gathered yoke', 'Short lace sleeves', 'Relaxed trapeze body', 'Gathered tiered hem, lined'],
    fabric: 'Floral lace with soft lining.',
    care: 'Hand wash cold. Do not wring. Dry flat in shade. Cool iron on reverse.',
  },
  {
    slug: 'little-pearl-lace-party-dress',
    name: 'Little Pearl Lace Party Dress',
    category: 'kids', type: 'Party dresses', collection: 'lace-edit',
    price: 4490, compareAt: 5290,
    short: 'A Peter Pan collar party frock with pearl buttons, puff sleeves and a tulle petticoat.',
    details: ['Peter Pan collar', 'Pearl button bodice', 'Lace puff sleeves', 'Tulle underlayer for volume'],
    fabric: 'Lace overlay with tulle petticoat and soft lining.',
    care: 'Hand wash cold. Dry flat in shade. Do not iron tulle.',
  },
  {
    slug: 'princess-bow-lace-gown',
    name: 'Princess Bow Lace Gown',
    category: 'kids', type: 'Party dresses', collection: 'lace-edit', isNew: true,
    price: 5990,
    short: 'A floor-length tiered lace gown with puff sleeves and a big back bow.',
    details: ['Square neckline', 'Lace puff sleeves', 'Layered tiered skirt', 'Tie bow at the back'],
    fabric: 'Lace with soft lining.',
    care: 'Hand wash cold. Dry flat in shade.',
  },
  {
    slug: 'bella-bow-lace-midi',
    name: 'Bella Bow Lace Midi',
    category: 'kids', type: 'Party dresses', collection: 'lace-edit',
    price: 4990,
    short: 'A twirl-ready lace midi with a square neck, puff sleeves and a back bow.',
    details: ['Square neckline', 'Lace puff sleeves', 'Full circle skirt', 'Tie bow at the back'],
    fabric: 'Lace with soft lining.',
    care: 'Hand wash cold. Dry flat in shade.',
  },
  {
    slug: 'tiara-layered-lace-dress',
    name: 'Tiara Layered Lace Dress',
    category: 'kids', type: 'Party dresses', collection: 'lace-edit',
    price: 5490,
    short: 'Three tiers of scalloped lace finished with a satin waist ribbon and oversized bow.',
    details: ['Scalloped V-neck', 'Flutter cap sleeves', 'Three-tier ruffled skirt', 'Satin sash with large back bow'],
    fabric: 'Lace with satin trim and soft lining.',
    care: 'Hand wash cold. Dry flat in shade. Cool iron on satin only.',
  },
  {
    slug: 'cascade-high-low-lace-dress',
    name: 'Cascade High-Low Lace Dress',
    category: 'kids', type: 'Party dresses', collection: 'lace-edit',
    price: 5790,
    short: 'A smocked lace dress with a layered high-low hem and ruffled puff sleeves.',
    details: ['Square smocked neckline', 'Ruffle-cuff puff sleeves', 'Layered high-low hem', 'Tie bow at the back'],
    fabric: 'Lace with soft lining.',
    care: 'Hand wash cold. Dry flat in shade.',
  },
  {
    slug: 'peach-lace-skater-dress',
    name: 'Peach Lace Skater Dress',
    category: 'teens', type: 'Party dresses', collection: 'lace-edit',
    price: 6490,
    short: 'A knee-length lace skater dress with cap sleeves and a sheer lace back.',
    details: ['Round neckline', 'Lace cap sleeves', 'Sheer lace back with button closure', 'Layered lace skirt'],
    fabric: 'Lace overlay with soft lining.',
    care: 'Hand wash cold. Dry flat in shade.',
  },
  {
    slug: 'rose-lace-ball-gown',
    name: 'Rosé Lace Ball Gown',
    category: 'teens', type: 'Party dresses', collection: 'lace-edit', bestseller: true,
    price: 8990,
    short: 'A full-length blush lace gown with ruffled puff sleeves and a tie-back bow.',
    details: ['Square neckline', 'Ruffle-cuff puff sleeves', 'Tiered floor-length skirt', 'Tie bow at the back'],
    fabric: 'Floral lace with soft lining.',
    care: 'Hand wash cold. Dry flat in shade. Steam, do not iron lace directly.',
  },
];

const sizesFor = (cat) => (cat === 'kids' ? KIDS_SIZES : cat === 'teens' ? TEEN_SIZES : WOMEN_SIZES);

export const PRODUCTS = raw.map((p, i) => {
  const imgs = images[p.slug];
  const colors = [...new Set(imgs.map((im) => im.color))];
  return { ...p, order: i, images: imgs, colors, sizes: sizesFor(p.category) };
});

export const getProduct = (slug) => PRODUCTS.find((p) => p.slug === slug);

export const formatLKR = (n) => 'Rs ' + n.toLocaleString('en-LK');

export const FREE_DELIVERY_FROM = 10000;

// Square source photos carry a text panel on the left; anchor them left so the crop keeps it whole.
export const objPos = (im) => (im && Math.abs(im.w - im.h) < 10 ? { objectPosition: '0% 20%' } : undefined);
