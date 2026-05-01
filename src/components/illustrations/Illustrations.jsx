// Ilustraciones SVG originales en estilo line-art editorial.
// Inspiradas en el espíritu de las acuarelas del libro pero NO copia de las
// originales de Saint-Exupéry — composiciones propias.
//
// Todas usan currentColor para heredar el color del padre (gold accent o cream).

export function BoaWithElephant({ size = 220 }) {
  return (
    <svg width={size} height={size * 0.55} viewBox="0 0 400 220"
      stroke="currentColor" strokeWidth="1.6" fill="none" strokeLinecap="round" strokeLinejoin="round"
      style={{ overflow: 'visible' }}>
      <path d="M 30 170 Q 30 95 110 95 Q 175 95 195 130 Q 220 100 260 100 Q 300 100 330 125 Q 365 155 365 175 Q 365 195 340 195 Q 320 195 320 180 Q 320 165 305 165 L 60 165 Q 30 165 30 170 Z" />
      <path d="M 30 170 Q 30 95 110 95" opacity="0.6" />
      <line x1="195" y1="130" x2="220" y2="100" opacity="0.4" strokeDasharray="2 3" />
    </svg>
  )
}

export function TinyPlanetWithRose({ size = 90 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100"
      stroke="currentColor" strokeWidth="1.4" fill="none" strokeLinecap="round" strokeLinejoin="round">
      {/* planet */}
      <circle cx="50" cy="68" r="22" />
      {/* rose stem */}
      <path d="M 50 47 Q 50 40 52 35 Q 53 32 54 30" />
      {/* rose */}
      <circle cx="55" cy="28" r="5" />
      <circle cx="53" cy="28" r="2.5" opacity="0.6" />
      {/* leaves */}
      <path d="M 50 42 Q 45 40 43 38" opacity="0.7" />
      <path d="M 51 44 Q 56 42 58 40" opacity="0.7" />
      {/* baobab seedling */}
      <path d="M 38 56 Q 36 50 34 48" opacity="0.5" />
      {/* volcanoes */}
      <path d="M 58 56 L 62 50 L 66 56" opacity="0.5" />
    </svg>
  )
}

export function PrinceSilhouette({ size = 80 }) {
  return (
    <svg width={size} height={size * 1.4} viewBox="0 0 60 84"
      stroke="currentColor" strokeWidth="1.4" fill="none" strokeLinecap="round" strokeLinejoin="round">
      {/* head */}
      <circle cx="30" cy="14" r="9" />
      {/* hair tuft */}
      <path d="M 25 6 Q 28 2 32 5" />
      {/* scarf flying */}
      <path d="M 22 25 Q 12 27 8 22 Q 6 19 10 17" />
      <path d="M 22 26 Q 14 30 10 28" opacity="0.7" />
      {/* body / coat */}
      <path d="M 22 23 L 18 56 L 28 60 L 32 60 L 42 56 L 38 23" />
      <path d="M 22 23 Q 30 27 38 23" />
      {/* belt */}
      <line x1="22" y1="42" x2="38" y2="42" opacity="0.6" />
      {/* legs */}
      <path d="M 24 60 L 22 78" />
      <path d="M 36 60 L 38 78" />
      {/* boots */}
      <path d="M 21 78 L 26 78" strokeWidth="2" />
      <path d="M 36 78 L 41 78" strokeWidth="2" />
      {/* sword */}
      <line x1="42" y1="40" x2="50" y2="62" opacity="0.7" />
    </svg>
  )
}

// ─── Iconos por planeta (pequeños, se montan encima del planeta) ───────────

export function CrownIcon({ size = 22 }) {
  return (
    <svg width={size} height={size * 0.7} viewBox="0 0 30 21"
      stroke="currentColor" strokeWidth="1.6" fill="none" strokeLinecap="round" strokeLinejoin="round">
      <path d="M 3 18 L 5 7 L 11 13 L 15 4 L 19 13 L 25 7 L 27 18 Z" />
      <line x1="3" y1="18" x2="27" y2="18" strokeWidth="2.2" />
      <circle cx="5" cy="6" r="1.2" fill="currentColor" />
      <circle cx="15" cy="3" r="1.2" fill="currentColor" />
      <circle cx="25" cy="6" r="1.2" fill="currentColor" />
    </svg>
  )
}

export function TopHatIcon({ size = 22 }) {
  return (
    <svg width={size} height={size * 0.95} viewBox="0 0 24 23"
      stroke="currentColor" strokeWidth="1.6" fill="none" strokeLinecap="round" strokeLinejoin="round">
      <rect x="7" y="2" width="10" height="14" />
      <line x1="3" y1="16" x2="21" y2="16" strokeWidth="2.2" />
      <line x1="7" y1="6" x2="17" y2="6" opacity="0.55" />
    </svg>
  )
}

export function BottleIcon({ size = 22 }) {
  return (
    <svg width={size * 0.6} height={size} viewBox="0 0 14 24"
      stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round">
      <path d="M 5 2 L 5 7 L 2 11 L 2 22 L 12 22 L 12 11 L 9 7 L 9 2 Z" />
      <line x1="5" y1="2" x2="9" y2="2" strokeWidth="2" />
      <line x1="2" y1="14" x2="12" y2="14" opacity="0.55" />
    </svg>
  )
}

export function NumbersIcon({ size = 26 }) {
  return (
    <svg width={size} height={size * 0.75} viewBox="0 0 30 22"
      stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round">
      <text x="15" y="15" textAnchor="middle" fontFamily="EB Garamond, serif"
        fontSize="13" fontStyle="italic" fill="currentColor" stroke="none">
        501.622.731
      </text>
      <line x1="2" y1="20" x2="28" y2="20" opacity="0.55" />
    </svg>
  )
}

export function LampIcon({ size = 24 }) {
  return (
    <svg width={size * 0.5} height={size} viewBox="0 0 12 26"
      stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round">
      {/* post */}
      <line x1="6" y1="12" x2="6" y2="24" />
      {/* base */}
      <line x1="3" y1="24" x2="9" y2="24" strokeWidth="2.2" />
      {/* lamp head */}
      <path d="M 3 4 L 6 1 L 9 4 L 9 11 L 3 11 Z" />
      {/* glow */}
      <circle cx="6" cy="7" r="1.8" fill="currentColor" opacity="0.7" stroke="none" />
    </svg>
  )
}

export function BookIcon({ size = 24 }) {
  return (
    <svg width={size} height={size * 0.78} viewBox="0 0 26 20"
      stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round">
      <path d="M 2 4 Q 7 3 13 5 Q 19 3 24 4 L 24 17 Q 19 16 13 18 Q 7 16 2 17 Z" />
      <line x1="13" y1="5" x2="13" y2="18" />
      <line x1="6" y1="9" x2="10" y2="9.5" opacity="0.6" />
      <line x1="6" y1="12" x2="10" y2="12.5" opacity="0.5" />
      <line x1="16" y1="9.5" x2="20" y2="9" opacity="0.6" />
      <line x1="16" y1="12.5" x2="20" y2="12" opacity="0.5" />
    </svg>
  )
}

export function FoxIcon({ size = 26 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 30 30"
      stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round">
      {/* head triangle */}
      <path d="M 6 14 L 4 8 L 9 12 L 15 9 L 21 12 L 26 8 L 24 14 L 21 18 Q 15 22 9 18 Z" />
      {/* eyes */}
      <circle cx="11" cy="14" r="1.2" fill="currentColor" stroke="none" />
      <circle cx="19" cy="14" r="1.2" fill="currentColor" stroke="none" />
      {/* nose */}
      <path d="M 13 18 L 15 19 L 17 18" />
      {/* tail hint */}
      <path d="M 6 14 Q 2 18 5 23" opacity="0.55" />
    </svg>
  )
}

// ─── Escenas grandes (ilustraciones en las páginas) ──────────────────────

export function FoxLargeIllustration({ size = 200 }) {
  return (
    <svg width={size} height={size * 0.85} viewBox="0 0 200 170"
      stroke="currentColor" strokeWidth="1.4" fill="none" strokeLinecap="round" strokeLinejoin="round">
      {/* ground line */}
      <line x1="0" y1="135" x2="200" y2="135" opacity="0.5" />
      {/* wheat field */}
      {Array.from({ length: 18 }).map((_, i) => (
        <line key={i} x1={i * 11 + 5} y1="135" x2={i * 11 + 5} y2={130 - (i % 3)} opacity="0.4" />
      ))}
      {/* fox sitting */}
      <g transform="translate(125,76)">
        {/* tail (curling) */}
        <path d="M -8 50 Q -28 55 -22 30 Q -18 22 -10 28" />
        {/* body */}
        <path d="M -10 28 Q 0 18 14 28 L 16 56 Q 8 60 0 60 Q -8 60 -12 56 Z" />
        {/* head */}
        <path d="M -6 12 L -10 0 L 0 7 L 8 0 L 12 12 L 14 22 Q 4 28 -6 22 Z" />
        {/* ears */}
        <line x1="-9" y1="0" x2="-7" y2="-5" />
        <line x1="9" y1="0" x2="7" y2="-5" />
        {/* eyes */}
        <circle cx="-3" cy="14" r="1" fill="currentColor" stroke="none" />
        <circle cx="7" cy="14" r="1" fill="currentColor" stroke="none" />
        {/* legs */}
        <line x1="-6" y1="58" x2="-6" y2="62" />
        <line x1="6" y1="58" x2="6" y2="62" />
      </g>
      {/* prince silhouette small */}
      <g transform="translate(58,72)">
        <circle cx="0" cy="0" r="9" />
        <path d="M -7 8 L -9 38 L -3 42 L 3 42 L 9 38 L 7 8" />
        <path d="M -9 14 Q -16 16 -19 13" opacity="0.7" />
      </g>
    </svg>
  )
}

export function LampPostScene({ size = 200 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 200 200"
      stroke="currentColor" strokeWidth="1.4" fill="none" strokeLinecap="round" strokeLinejoin="round">
      {/* tiny planet */}
      <circle cx="100" cy="155" r="35" />
      {/* lamppost */}
      <line x1="100" y1="120" x2="100" y2="80" />
      <line x1="92" y1="80" x2="108" y2="80" strokeWidth="2" />
      {/* lamp */}
      <path d="M 88 80 L 100 60 L 112 80 L 112 92 L 88 92 Z" />
      <circle cx="100" cy="80" r="6" fill="currentColor" stroke="none" opacity="0.55" />
      {/* glow rays */}
      <line x1="100" y1="56" x2="100" y2="48" opacity="0.7" />
      <line x1="86" y1="62" x2="80" y2="56" opacity="0.55" />
      <line x1="114" y1="62" x2="120" y2="56" opacity="0.55" />
      {/* lamplighter (small) */}
      <g transform="translate(135,135)">
        <circle cx="0" cy="-8" r="4" />
        <line x1="0" y1="-4" x2="0" y2="10" />
        <line x1="-4" y1="0" x2="-8" y2="4" />
        <line x1="4" y1="0" x2="8" y2="-2" />
        <line x1="0" y1="10" x2="-4" y2="20" />
        <line x1="0" y1="10" x2="4" y2="20" />
      </g>
    </svg>
  )
}

// Decorative star burst
export function StarBurst({ size = 14 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 14 14"
      fill="currentColor">
      <path d="M 7 0 L 8 6 L 14 7 L 8 8 L 7 14 L 6 8 L 0 7 L 6 6 Z" />
    </svg>
  )
}
