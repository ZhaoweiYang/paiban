// Brand mark and payment-card acceptance marks (inline SVG, no external requests).

let uid = 0;

/** ShiftKumo mark: a cloud carrying three shift bars on a coral→violet tile. */
export function logoMark(size = 32) {
  const id = `skg${uid++}`;
  return `<svg class="logo-mark" width="${size}" height="${size}" viewBox="0 0 32 32" aria-hidden="true" focusable="false"><defs><linearGradient id="${id}" x1="0" y1="0" x2="32" y2="32" gradientUnits="userSpaceOnUse"><stop stop-color="#ff7a59"/><stop offset=".55" stop-color="#ec4d8a"/><stop offset="1" stop-color="#8b5cf6"/></linearGradient></defs><rect width="32" height="32" rx="9" fill="url(#${id})"/><path d="M10.2 21.5h11.6a4.3 4.3 0 0 0 .55-8.57 6.3 6.3 0 0 0-12.1 1.62 3.5 3.5 0 0 0-.05 6.95Z" fill="#fff"/><rect x="11.2" y="15.2" width="5.6" height="2" rx="1" fill="#ec4d8a"/><rect x="13.6" y="18.2" width="7.6" height="2" rx="1" fill="#8b5cf6"/><rect x="18.4" y="15.2" width="3" height="2" rx="1" fill="#ff7a59"/></svg>`;
}

export function logo(brand) {
  return `${logoMark(30)}<span class="logo-word">Shift<span>Kumo</span></span><span class="sr-only">${brand}</span>`;
}

const CARD = {
  visa: {
    name: 'Visa',
    svg: '<rect width="48" height="32" rx="5" fill="#fff"/><path d="M19.6 21.2h-2.7l1.7-10.4h2.7zm9.7-10.1a6.7 6.7 0 0 0-2.4-.4c-2.7 0-4.5 1.4-4.5 3.4 0 1.5 1.3 2.3 2.4 2.8 1 .5 1.4.8 1.4 1.3 0 .7-.8 1-1.6 1a5.5 5.5 0 0 1-2.5-.5l-.4-.2-.3 2.2c.6.3 1.8.5 3 .5 2.8 0 4.6-1.4 4.7-3.5 0-1.2-.7-2-2.3-2.8-.9-.5-1.5-.8-1.5-1.3s.5-.9 1.5-.9a4.8 4.8 0 0 1 2 .4l.2.1zm7 -.3h-2.1c-.6 0-1.1.2-1.4.9l-4 9.5h2.8l.6-1.6h3.5l.3 1.6h2.5zm-3.3 6.7 1.1-2.9.3-.8.2.9.6 2.8zM16.4 10.8l-2.6 7.1-.3-1.4a8 8 0 0 0-3.8-4.4l2.4 9.1h2.9l4.3-10.4z" fill="#1a1f71"/><path d="M11.3 10.8H6.9l-.1.2c3.4.9 5.7 2.9 6.6 5.4l-1-4.8c-.1-.6-.6-.8-1.1-.8" fill="#f7a600"/>',
  },
  mastercard: {
    name: 'Mastercard',
    svg: '<rect width="48" height="32" rx="5" fill="#fff"/><circle cx="19.5" cy="16" r="8" fill="#eb001b"/><circle cx="28.5" cy="16" r="8" fill="#f79e1b"/><path d="M24 9.4a8 8 0 0 1 0 13.2 8 8 0 0 1 0-13.2" fill="#ff5f00"/>',
  },
  amex: {
    name: 'American Express',
    svg: '<rect width="48" height="32" rx="5" fill="#006fcf"/><text x="24" y="19.6" text-anchor="middle" font-family="Arial,Helvetica,sans-serif" font-size="9.6" font-weight="700" letter-spacing=".4" fill="#fff">AMEX</text>',
  },
  jcb: {
    name: 'JCB',
    svg: '<rect width="48" height="32" rx="5" fill="#fff"/><rect x="9" y="7" width="9.4" height="18" rx="3" fill="#0e4c96"/><rect x="19.3" y="7" width="9.4" height="18" rx="3" fill="#e21836"/><rect x="29.6" y="7" width="9.4" height="18" rx="3" fill="#007b40"/><g font-family="Arial,Helvetica,sans-serif" font-size="8" font-weight="700" fill="#fff" text-anchor="middle"><text x="13.7" y="19">J</text><text x="24" y="19">C</text><text x="34.3" y="19">B</text></g>',
  },
  discover: {
    name: 'Discover',
    svg: '<rect width="48" height="32" rx="5" fill="#fff"/><path d="M28 32h15a5 5 0 0 0 5-5V18c-6 6-13 11-20 14" fill="#f48120"/><text x="4.5" y="19" font-family="Arial,Helvetica,sans-serif" font-size="6.6" font-weight="700" fill="#231f20">DISC</text><circle cx="24.4" cy="16.7" r="3.3" fill="#f48120"/><text x="28.3" y="19" font-family="Arial,Helvetica,sans-serif" font-size="6.6" font-weight="700" fill="#231f20">VER</text>',
  },
  diners: {
    name: 'Diners Club',
    svg: '<rect width="48" height="32" rx="5" fill="#fff"/><circle cx="24" cy="16" r="10" fill="#0079be"/><circle cx="24" cy="16" r="7.4" fill="#fff"/><path d="M22.4 10.9a5.4 5.4 0 0 0 0 10.2zm3.2 0v10.2a5.4 5.4 0 0 0 0-10.2" fill="#0079be"/>',
  },
  unionpay: {
    name: 'UnionPay',
    svg: '<rect width="48" height="32" rx="5" fill="#fff"/><path d="M11 6h9l-4.5 20H7z" fill="#e21836"/><path d="M19 6h9l-4.5 20h-8z" fill="#00447c"/><path d="M27 6h10l-4.5 20h-9z" fill="#007b84"/><text x="21.5" y="18.6" text-anchor="middle" font-family="Arial,Helvetica,sans-serif" font-size="5.2" font-weight="700" fill="#fff" font-style="italic" textLength="22" lengthAdjust="spacingAndGlyphs">UnionPay</text>',
  },
};

export function cardLogo(id) {
  const c = CARD[id];
  return `<svg class="card-logo" viewBox="0 0 48 32" width="48" height="32" role="img" aria-label="${c.name}"><title>${c.name}</title>${c.svg}</svg>`;
}

export const cardName = (id) => CARD[id].name;

export function cardRow(ids) {
  return `<ul class="card-row">${ids.map((id) => `<li>${cardLogo(id)}</li>`).join('')}</ul>`;
}
