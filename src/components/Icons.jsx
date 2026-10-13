const base = { width: 22, height: 22, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 1.6, strokeLinecap: 'round', strokeLinejoin: 'round', 'aria-hidden': true };

export const SearchIcon = (p) => (
  <svg {...base} {...p}><circle cx="11" cy="11" r="6.5" /><path d="M16 16l4.5 4.5" /></svg>
);
export const HeartIcon = ({ filled, ...p }) => (
  <svg {...base} {...p} fill={filled ? 'currentColor' : 'none'}>
    <path d="M12 20s-7.5-4.4-7.5-10A4.3 4.3 0 0 1 12 7.2 4.3 4.3 0 0 1 19.5 10c0 5.6-7.5 10-7.5 10z" />
  </svg>
);
export const BagIcon = (p) => (
  <svg {...base} {...p}><path d="M5 8h14l-1 12H6L5 8z" /><path d="M9 8V6.5a3 3 0 0 1 6 0V8" /></svg>
);
export const UserIcon = (p) => (
  <svg {...base} {...p}><circle cx="12" cy="8.5" r="3.5" /><path d="M5 20c1-3.6 3.8-5.5 7-5.5s6 1.9 7 5.5" /></svg>
);
export const CloseIcon = (p) => (
  <svg {...base} {...p}><path d="M6 6l12 12M18 6L6 18" /></svg>
);
export const MenuIcon = (p) => (
  <svg {...base} {...p}><path d="M4 7h16M4 12h16M4 17h10" /></svg>
);
export const ChevronIcon = ({ dir = 'right', ...p }) => {
  const r = { right: 0, down: 90, left: 180, up: 270 }[dir];
  return (
    <svg {...base} {...p} style={{ transform: `rotate(${r}deg)` }}><path d="M9 6l6 6-6 6" /></svg>
  );
};
export const TruckIcon = (p) => (
  <svg {...base} {...p}><path d="M3 7h11v9H3zM14 10h4l3 3v3h-7" /><circle cx="7" cy="17.5" r="1.6" /><circle cx="17" cy="17.5" r="1.6" /></svg>
);
export const SwapIcon = (p) => (
  <svg {...base} {...p}><path d="M5 9h13l-3-3M19 15H6l3 3" /></svg>
);
export const CardIcon = (p) => (
  <svg {...base} {...p}><rect x="3" y="6" width="18" height="12" rx="2" /><path d="M3 10h18M7 15h3" /></svg>
);
export const CashIcon = (p) => (
  <svg {...base} {...p}><rect x="3" y="7" width="18" height="10" rx="1.5" /><circle cx="12" cy="12" r="2.2" /></svg>
);
export const RulerIcon = (p) => (
  <svg {...base} {...p}><path d="M3 16L16 3l5 5L8 21z" /><path d="M7 12l2 2M10 9l2 2M13 6l2 2" /></svg>
);
export const MinusIcon = (p) => (<svg {...base} {...p}><path d="M6 12h12" /></svg>);
export const PlusIcon = (p) => (<svg {...base} {...p}><path d="M12 6v12M6 12h12" /></svg>);
export const CheckIcon = (p) => (<svg {...base} {...p}><path d="M5 12.5l4.5 4.5L19 7.5" /></svg>);

// Small embroidered daisy used as the brand mark.
export const Bloom = ({ size = 18, petal = 'var(--sun)', centre = 'var(--leaf-deep)' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true">
    {[0, 45, 90, 135, 180, 225, 270, 315].map((a) => (
      <ellipse key={a} cx="12" cy="6" rx="2.4" ry="4.4" fill={petal} transform={`rotate(${a} 12 12)`} />
    ))}
    <circle cx="12" cy="12" r="3" fill={centre} />
  </svg>
);
