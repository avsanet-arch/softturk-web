// Softturk işareti: dalga üzerinde iki yelkenli tekne
export function Isaret({ boyut = 36 }: { boyut?: number }) {
  return (
    <svg width={boyut} height={boyut} viewBox="0 0 48 48" aria-hidden="true">
      <defs>
        <linearGradient id="gs-g" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#14b8c4" />
          <stop offset="1" stopColor="#0b4f74" />
        </linearGradient>
      </defs>
      <rect width="48" height="48" rx="13" fill="url(#gs-g)" />
      <path d="M23 9v20H11.5z" fill="#fff" />
      <path d="M25.5 12v17h9.5z" fill="#fff" opacity=".82" />
      <path d="M9 31.5h30l-4 5.5H13z" fill="#ffd27a" />
      <path d="M6 40.5c3 0 3-1.6 6-1.6s3 1.6 6 1.6 3-1.6 6-1.6 3 1.6 6 1.6 3-1.6 6-1.6 3 1.6 6 1.6" stroke="#fff" strokeWidth="2" fill="none" strokeLinecap="round" opacity=".9" />
    </svg>
  );
}

export function Logo() {
  return (
    <span className="logo">
      <Isaret />
      <span className="logo-yazi">
        Soft<b>turk</b>
      </span>
    </span>
  );
}
