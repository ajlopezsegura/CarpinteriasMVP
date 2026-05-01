// Ilustraciones SVG originales — composiciones propias en estilo line-art
// onírico, inspiradas en la iconografía del cuento. Trazos múltiples con
// distintas opacidades para evocar la calidad acuarela.
//
// Todas usan currentColor para heredar el color del padre.

// ───────────────────────────────────────────────────────────────────────
// Ilustraciones grandes (escenas)
// ───────────────────────────────────────────────────────────────────────

export function BoaWithElephant({ size = 280 }) {
  return (
    <svg width={size} height={size * 0.55} viewBox="0 0 400 220" fill="none"
      stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"
      style={{ overflow: 'visible' }}>
      {/* Sombra base */}
      <ellipse cx="200" cy="200" rx="170" ry="6" opacity="0.15" fill="currentColor" stroke="none" />

      {/* Boa exterior — el "sombrero" */}
      <path d="M 30 175 Q 30 90 105 90 Q 165 90 195 130 Q 230 95 280 95 Q 335 95 365 145 Q 380 175 365 188 Q 350 197 335 188 Q 325 175 312 175 L 60 175 Q 30 175 30 175 Z"
        strokeWidth="1.8" />
      {/* Doble línea interior para sensación acuarela */}
      <path d="M 32 173 Q 33 93 105 92 Q 165 93 195 130"
        strokeWidth="0.8" opacity="0.5" />
      <path d="M 230 96 Q 280 94 365 145"
        strokeWidth="0.8" opacity="0.5" />

      {/* Elefante dentro — silueta tenue */}
      <g opacity="0.45" strokeDasharray="2.5 2.5">
        {/* cabeza */}
        <path d="M 88 170 Q 80 145 95 130 Q 115 120 130 130 Q 140 138 138 152 L 138 170"
          strokeWidth="1" />
        {/* trompa */}
        <path d="M 78 168 Q 70 158 75 148 Q 80 142 88 145" strokeWidth="1" />
        {/* oreja */}
        <path d="M 130 130 Q 145 122 150 134" strokeWidth="1" />
        {/* cuerpo */}
        <path d="M 138 165 Q 175 155 220 162 Q 260 165 290 168" strokeWidth="1" />
        {/* patas */}
        <line x1="100" y1="170" x2="100" y2="175" strokeWidth="1" />
        <line x1="135" y1="170" x2="135" y2="175" strokeWidth="1" />
        <line x1="195" y1="170" x2="195" y2="175" strokeWidth="1" />
        <line x1="240" y1="170" x2="240" y2="175" strokeWidth="1" />
        {/* cola */}
        <path d="M 290 165 L 298 162" strokeWidth="1" />
      </g>

      {/* Suelo — hierba sugerida */}
      <g opacity="0.25" strokeWidth="0.8">
        <line x1="20" y1="180" x2="25" y2="175" />
        <line x1="380" y1="180" x2="385" y2="175" />
      </g>
    </svg>
  )
}

export function TinyPlanetWithRose({ size = 130 }) {
  return (
    <svg width={size} height={size * 1.15} viewBox="0 0 130 150" fill="none"
      stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
      {/* Halo onírico */}
      <circle cx="65" cy="100" r="42" opacity="0.10" strokeWidth="14" />
      <circle cx="65" cy="100" r="38" opacity="0.18" strokeWidth="6" />

      {/* Planeta */}
      <circle cx="65" cy="100" r="32" strokeWidth="1.6" />
      <path d="M 35 100 Q 45 95 55 100 Q 65 105 75 100 Q 85 95 95 100"
        strokeWidth="0.9" opacity="0.55" />
      {/* sombra inferior */}
      <path d="M 38 110 Q 65 122 92 110" strokeWidth="0.8" opacity="0.35" />

      {/* Volcanes */}
      <path d="M 50 75 L 55 68 L 60 75 Q 55 73 50 75 Z" strokeWidth="1.2" />
      <path d="M 70 73 L 76 65 L 82 73 Q 76 71 70 73 Z" strokeWidth="1.2" />
      <path d="M 85 80 L 89 75 L 93 80 Q 89 78 85 80 Z" strokeWidth="1" opacity="0.7" />

      {/* Tallo de la rosa */}
      <path d="M 65 75 Q 67 60 70 45 Q 71 35 75 28" strokeWidth="1.4" />
      {/* Hojas */}
      <path d="M 68 60 Q 60 56 56 60 Q 60 64 68 60" strokeWidth="1.1" opacity="0.85" />
      <path d="M 71 48 Q 80 44 84 49 Q 80 53 71 48" strokeWidth="1.1" opacity="0.85" />

      {/* Rosa — capas */}
      <circle cx="76" cy="22" r="8" strokeWidth="1.4" />
      <circle cx="76" cy="22" r="5.5" strokeWidth="1" opacity="0.7" />
      <circle cx="76" cy="22" r="3" strokeWidth="0.9" opacity="0.5" />
      <path d="M 70 18 Q 76 12 82 18" strokeWidth="0.8" opacity="0.4" />
      <path d="M 76 14 L 76 17" strokeWidth="0.8" opacity="0.4" />

      {/* Fanal — campana de cristal */}
      <path d="M 56 30 Q 56 8 76 6 Q 96 8 96 30 L 92 30 L 60 30 Z"
        strokeWidth="0.9" opacity="0.35" strokeDasharray="2 2.5" />
      <line x1="58" y1="30" x2="94" y2="30" strokeWidth="0.7" opacity="0.35" />

      {/* Estrellas decorativas */}
      <g fill="currentColor" stroke="none" opacity="0.7">
        <circle cx="25" cy="40" r="1" />
        <circle cx="110" cy="55" r="1.2" />
        <circle cx="20" cy="80" r="0.9" />
        <circle cx="115" cy="125" r="1" />
      </g>
    </svg>
  )
}

export function PrinceSilhouette({ size = 110 }) {
  return (
    <svg width={size} height={size * 1.45} viewBox="0 0 80 116" fill="none"
      stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
      {/* halo */}
      <circle cx="40" cy="20" r="22" opacity="0.08" strokeWidth="14" />

      {/* Cabeza */}
      <circle cx="40" cy="20" r="11" strokeWidth="1.6" />
      {/* Mechones de pelo */}
      <path d="M 32 13 Q 36 4 41 7" strokeWidth="1.3" />
      <path d="M 36 9 Q 40 3 44 7" strokeWidth="1.2" opacity="0.7" />
      <path d="M 44 10 Q 48 5 50 10" strokeWidth="1.3" />

      {/* Bufanda volando */}
      <path d="M 30 30 Q 16 32 8 26 Q 4 22 8 18 Q 14 18 18 22"
        strokeWidth="1.5" />
      <path d="M 30 32 Q 18 36 10 32" strokeWidth="1" opacity="0.65" />
      <path d="M 28 33 Q 14 40 8 36" strokeWidth="0.9" opacity="0.45" />

      {/* Cuello */}
      <line x1="36" y1="30" x2="36" y2="34" strokeWidth="1.2" />
      <line x1="44" y1="30" x2="44" y2="34" strokeWidth="1.2" />

      {/* Abrigo */}
      <path d="M 30 34 Q 25 50 22 78 L 32 82 L 48 82 L 58 78 Q 55 50 50 34 Z"
        strokeWidth="1.6" />
      {/* Botones */}
      <circle cx="40" cy="48" r="1" fill="currentColor" stroke="none" />
      <circle cx="40" cy="58" r="1" fill="currentColor" stroke="none" />
      <circle cx="40" cy="68" r="1" fill="currentColor" stroke="none" />
      {/* Pliegues */}
      <path d="M 32 38 Q 31 52 30 70" strokeWidth="0.7" opacity="0.4" />
      <path d="M 48 38 Q 49 52 50 70" strokeWidth="0.7" opacity="0.4" />

      {/* Cinturón */}
      <path d="M 24 76 Q 40 82 56 76" strokeWidth="1.4" />

      {/* Piernas */}
      <path d="M 33 82 L 30 104" strokeWidth="1.4" />
      <path d="M 47 82 L 50 104" strokeWidth="1.4" />

      {/* Botas */}
      <path d="M 27 104 L 35 104 L 35 109 L 27 109 Z" strokeWidth="1.5" />
      <path d="M 45 104 L 53 104 L 53 109 L 45 109 Z" strokeWidth="1.5" />

      {/* Espada */}
      <line x1="56" y1="60" x2="68" y2="86" strokeWidth="1.2" opacity="0.7" />
      <path d="M 64 80 L 70 84 L 67 88" strokeWidth="0.9" opacity="0.5" />
    </svg>
  )
}

export function FoxLargeIllustration({ size = 220 }) {
  return (
    <svg width={size} height={size * 0.75} viewBox="0 0 220 165" fill="none"
      stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
      {/* Suelo */}
      <line x1="0" y1="138" x2="220" y2="138" strokeWidth="0.9" opacity="0.4" />

      {/* Trigo (las espigas que el zorro recordará por su color) */}
      <g opacity="0.45" strokeWidth="0.9">
        {Array.from({ length: 22 }).map((_, i) => {
          const x = 6 + i * 10
          const h = 6 + (i % 4) * 3
          return (
            <g key={i}>
              <line x1={x} y1="138" x2={x} y2={138 - h} />
              <line x1={x - 2} y1={138 - h + 2} x2={x} y2={138 - h - 1} />
              <line x1={x + 2} y1={138 - h + 2} x2={x} y2={138 - h - 1} />
            </g>
          )
        })}
      </g>

      {/* Zorro sentado */}
      <g transform="translate(140,80)">
        {/* Cola enrollada */}
        <path d="M -10 56 Q -34 60 -32 30 Q -26 18 -14 28" strokeWidth="1.5" />
        <path d="M -32 36 Q -38 50 -28 56" strokeWidth="1" opacity="0.55" />

        {/* Cuerpo */}
        <path d="M -14 28 Q -2 18 14 28 L 17 60 Q 10 64 0 64 Q -10 64 -16 60 Z"
          strokeWidth="1.6" />
        <path d="M -10 38 Q 0 36 12 40" strokeWidth="0.8" opacity="0.45" />

        {/* Cabeza triangular */}
        <path d="M -10 14 L -14 -2 L -2 8 L 6 -2 L 14 8 L 16 22 Q 4 30 -8 22 Z"
          strokeWidth="1.6" />
        {/* Orejas */}
        <line x1="-13" y1="-1" x2="-9" y2="-9" strokeWidth="1.2" />
        <line x1="13" y1="-1" x2="9" y2="-9" strokeWidth="1.2" />
        <line x1="-12" y1="0" x2="-7" y2="-6" strokeWidth="0.6" opacity="0.55" />
        <line x1="12" y1="0" x2="7" y2="-6" strokeWidth="0.6" opacity="0.55" />

        {/* Ojos */}
        <ellipse cx="-4" cy="14" rx="1.4" ry="1.7" fill="currentColor" stroke="none" />
        <ellipse cx="8" cy="14" rx="1.4" ry="1.7" fill="currentColor" stroke="none" />
        {/* brillo */}
        <circle cx="-4.5" cy="13.5" r="0.4" fill="white" stroke="none" opacity="0.8" />
        <circle cx="7.5" cy="13.5" r="0.4" fill="white" stroke="none" opacity="0.8" />

        {/* Hocico y nariz */}
        <path d="M -2 22 L 2 25 L 6 22" strokeWidth="1" />
        <ellipse cx="2" cy="22" rx="1.3" ry="0.9" fill="currentColor" stroke="none" />

        {/* Bigotes */}
        <line x1="-4" y1="22" x2="-12" y2="20" strokeWidth="0.5" opacity="0.5" />
        <line x1="-4" y1="24" x2="-12" y2="25" strokeWidth="0.5" opacity="0.5" />
        <line x1="8" y1="22" x2="16" y2="20" strokeWidth="0.5" opacity="0.5" />
        <line x1="8" y1="24" x2="16" y2="25" strokeWidth="0.5" opacity="0.5" />

        {/* Patas delanteras juntas */}
        <line x1="-4" y1="60" x2="-4" y2="65" strokeWidth="1.2" />
        <line x1="4" y1="60" x2="4" y2="65" strokeWidth="1.2" />
      </g>

      {/* Principito a la izquierda, mirando al zorro */}
      <g transform="translate(60,75)">
        {/* halo */}
        <circle cx="0" cy="-6" r="14" opacity="0.08" strokeWidth="6" />
        {/* Cabeza */}
        <circle cx="0" cy="-6" r="7" strokeWidth="1.4" />
        <path d="M -5 -11 Q -2 -16 2 -13" strokeWidth="1" />
        <path d="M 4 -12 Q 7 -16 8 -11" strokeWidth="1" />
        {/* Bufanda volando */}
        <path d="M -7 4 Q -16 6 -19 2" strokeWidth="1.2" />
        <path d="M -7 6 Q -18 11 -22 7" strokeWidth="0.8" opacity="0.55" />
        {/* Cuerpo */}
        <path d="M -6 4 L -10 36 L -3 40 L 3 40 L 10 36 L 6 4 Z" strokeWidth="1.4" />
        <line x1="-6" y1="22" x2="6" y2="22" strokeWidth="0.7" opacity="0.4" />
        {/* Botones */}
        <circle cx="0" cy="14" r="0.8" fill="currentColor" stroke="none" />
        <circle cx="0" cy="22" r="0.8" fill="currentColor" stroke="none" />
        {/* Piernas */}
        <line x1="-3" y1="40" x2="-4" y2="55" strokeWidth="1.2" />
        <line x1="3" y1="40" x2="4" y2="55" strokeWidth="1.2" />
      </g>
    </svg>
  )
}

export function DesertNightScene({ size = 260 }) {
  return (
    <svg width={size} height={size * 0.6} viewBox="0 0 260 156" fill="none"
      stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
      {/* Estrellas */}
      <g fill="currentColor" stroke="none">
        <circle cx="30" cy="20" r="0.9" opacity="0.8" />
        <circle cx="70" cy="35" r="1.1" opacity="0.9" />
        <circle cx="120" cy="18" r="0.8" opacity="0.7" />
        <circle cx="180" cy="28" r="1.2" />
        <circle cx="220" cy="42" r="0.9" opacity="0.8" />
        <circle cx="50" cy="60" r="0.7" opacity="0.6" />
        <circle cx="200" cy="65" r="0.8" opacity="0.7" />
        {/* Estrella destacada */}
        <path d="M 145 50 L 147 56 L 153 58 L 147 60 L 145 66 L 143 60 L 137 58 L 143 56 Z"
          opacity="1" />
      </g>

      {/* Línea de horizonte ondulada (dunas) */}
      <path d="M 0 110 Q 40 95 75 105 Q 115 118 155 102 Q 195 88 230 100 Q 250 106 260 100"
        strokeWidth="1.6" />
      <path d="M 0 115 Q 40 102 75 110 Q 115 122 155 108 Q 195 94 230 105 Q 250 110 260 106"
        strokeWidth="0.8" opacity="0.45" />

      {/* Pozo en el horizonte */}
      <g transform="translate(125,98)">
        <line x1="-5" y1="0" x2="-5" y2="-12" strokeWidth="1.2" />
        <line x1="5" y1="0" x2="5" y2="-12" strokeWidth="1.2" />
        <line x1="-7" y1="-12" x2="7" y2="-12" strokeWidth="1.4" />
        <line x1="0" y1="-11" x2="0" y2="-2" strokeWidth="0.8" opacity="0.55" />
        <ellipse cx="0" cy="3" rx="6" ry="1.5" strokeWidth="1" />
      </g>

      {/* Principito sentado al lado del pozo */}
      <g transform="translate(108,103)">
        <circle cx="0" cy="-6" r="4" strokeWidth="1.2" />
        <path d="M -4 -10 Q -1 -13 2 -11" strokeWidth="0.9" />
        <path d="M -3 -2 L -5 14 L -1 16 L 1 16 L 5 14 L 3 -2 Z" strokeWidth="1.2" />
        <line x1="-3" y1="16" x2="-4" y2="22" strokeWidth="1" />
        <line x1="3" y1="16" x2="4" y2="22" strokeWidth="1" />
      </g>

      {/* Suelo onírico */}
      <line x1="0" y1="156" x2="260" y2="156" strokeWidth="0.7" opacity="0.3" />
    </svg>
  )
}

export function SnakeScene({ size = 220 }) {
  return (
    <svg width={size} height={size * 0.5} viewBox="0 0 220 110" fill="none"
      stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
      {/* Suelo */}
      <line x1="0" y1="92" x2="220" y2="92" strokeWidth="0.7" opacity="0.35" />
      {/* Sombra */}
      <ellipse cx="110" cy="96" rx="60" ry="3" opacity="0.18" fill="currentColor" stroke="none" />

      {/* Serpiente — curva ondulante */}
      <path d="M 30 90 Q 50 70 70 78 Q 90 90 110 70 Q 130 50 150 60 Q 170 70 185 50 Q 192 42 200 46"
        strokeWidth="2.5" />
      {/* Doble línea suave */}
      <path d="M 30 88 Q 50 72 70 80 Q 90 92 110 72 Q 130 52 150 62 Q 170 72 185 52 Q 192 44 200 48"
        strokeWidth="0.7" opacity="0.4" />

      {/* Cabeza */}
      <ellipse cx="200" cy="46" rx="6" ry="3.5" strokeWidth="1.6" />
      {/* Ojo */}
      <circle cx="201" cy="44" r="0.9" fill="currentColor" stroke="none" />
      {/* Lengua bífida */}
      <path d="M 206 46 L 213 44 M 213 44 L 213 42 M 213 44 L 215 45" strokeWidth="0.8" />

      {/* Patrón en el cuerpo */}
      <g opacity="0.55" strokeWidth="0.7">
        <line x1="50" y1="78" x2="48" y2="82" />
        <line x1="80" y1="84" x2="78" y2="88" />
        <line x1="115" y1="68" x2="113" y2="72" />
        <line x1="155" y1="60" x2="153" y2="64" />
      </g>
    </svg>
  )
}

export function StarryNightScene({ size = 260 }) {
  return (
    <svg width={size} height={size * 0.55} viewBox="0 0 260 143" fill="none"
      stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
      {/* Estrellas — muchas, distintos tamaños */}
      <g fill="currentColor" stroke="none">
        {Array.from({ length: 35 }).map((_, i) => {
          const seed = (i * 9301 + 49297) % 233280 / 233280
          const x = 10 + (seed * 240)
          const y = 8 + ((seed * 1000) % 100)
          const r = 0.5 + (seed * 1.5)
          return <circle key={i} cx={x} cy={y} r={r} opacity={0.4 + seed * 0.6} />
        })}
        {/* 3 estrellas destacadas — la del Principito */}
        <g>
          <path d="M 70 50 L 72 56 L 78 58 L 72 60 L 70 66 L 68 60 L 62 58 L 68 56 Z" />
          <path d="M 130 35 L 132.5 43 L 140.5 45.5 L 132.5 48 L 130 56 L 127.5 48 L 119.5 45.5 L 127.5 43 Z" />
          <path d="M 195 55 L 197 61 L 203 63 L 197 65 L 195 71 L 193 65 L 187 63 L 193 61 Z" />
        </g>
      </g>

      {/* Aviador mirando al cielo */}
      <g transform="translate(125,115)">
        {/* Cabeza */}
        <circle cx="0" cy="-12" r="5" strokeWidth="1.4" />
        {/* Sombrero/gorra */}
        <path d="M -6 -14 L -7 -18 L 7 -18 L 6 -14" strokeWidth="1.3" />
        {/* Cuerpo */}
        <path d="M -5 -7 L -7 12 L -2 14 L 2 14 L 7 12 L 5 -7 Z" strokeWidth="1.4" />
        {/* Brazos abiertos contemplando */}
        <line x1="-5" y1="-5" x2="-13" y2="-12" strokeWidth="1.2" />
        <line x1="5" y1="-5" x2="13" y2="-12" strokeWidth="1.2" />
        <line x1="-13" y1="-12" x2="-15" y2="-18" strokeWidth="1.1" />
        <line x1="13" y1="-12" x2="15" y2="-18" strokeWidth="1.1" />
        {/* Piernas */}
        <line x1="-2" y1="14" x2="-3" y2="26" strokeWidth="1.2" />
        <line x1="2" y1="14" x2="3" y2="26" strokeWidth="1.2" />
      </g>

      {/* Línea de suelo */}
      <line x1="0" y1="143" x2="260" y2="143" strokeWidth="0.7" opacity="0.3" />
    </svg>
  )
}

// ───────────────────────────────────────────────────────────────────────
// Iconos de personajes (pequeños, encima del planeta)
// ───────────────────────────────────────────────────────────────────────

export function CrownIcon({ size = 24 }) {
  return (
    <svg width={size} height={size * 0.75} viewBox="0 0 32 24" fill="none"
      stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
      <path d="M 3 20 L 5 8 L 11 14 L 16 4 L 21 14 L 27 8 L 29 20 Z" strokeWidth="1.6" />
      <line x1="3" y1="20" x2="29" y2="20" strokeWidth="2.4" />
      <circle cx="5" cy="7" r="1.4" fill="currentColor" stroke="none" />
      <circle cx="16" cy="3" r="1.5" fill="currentColor" stroke="none" />
      <circle cx="27" cy="7" r="1.4" fill="currentColor" stroke="none" />
      {/* Joya central */}
      <path d="M 14 14 L 16 11 L 18 14 L 16 17 Z" strokeWidth="1" opacity="0.7" />
    </svg>
  )
}

export function TopHatIcon({ size = 22 }) {
  return (
    <svg width={size} height={size * 1.05} viewBox="0 0 26 27" fill="none"
      stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
      {/* Copa */}
      <path d="M 7 4 Q 7 2 9 2 L 17 2 Q 19 2 19 4 L 19 18 L 7 18 Z" strokeWidth="1.6" />
      {/* Cinta */}
      <line x1="7" y1="14" x2="19" y2="14" strokeWidth="1.4" opacity="0.7" />
      <line x1="9" y1="13.5" x2="9" y2="14.5" strokeWidth="0.8" opacity="0.5" />
      {/* Ala */}
      <path d="M 2 18 Q 13 22 24 18" strokeWidth="1.6" />
      <path d="M 2 18 L 24 18" strokeWidth="1.4" />
      {/* Brillo */}
      <line x1="9" y1="6" x2="9" y2="11" strokeWidth="0.8" opacity="0.4" />
    </svg>
  )
}

export function BottleIcon({ size = 22 }) {
  return (
    <svg width={size * 0.55} height={size} viewBox="0 0 14 26" fill="none"
      stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
      {/* Tapón */}
      <rect x="5" y="1" width="4" height="3" strokeWidth="1.2" />
      {/* Cuello */}
      <path d="M 5 4 L 5 8 L 2 12 L 2 23 Q 2 25 4 25 L 10 25 Q 12 25 12 23 L 12 12 L 9 8 L 9 4 Z"
        strokeWidth="1.5" />
      {/* Etiqueta */}
      <rect x="3" y="14" width="8" height="6" strokeWidth="0.9" opacity="0.6" />
      <line x1="4.5" y1="16.5" x2="9.5" y2="16.5" strokeWidth="0.6" opacity="0.55" />
      <line x1="4.5" y1="18" x2="9.5" y2="18" strokeWidth="0.6" opacity="0.55" />
    </svg>
  )
}

export function NumbersIcon({ size = 28 }) {
  return (
    <svg width={size} height={size * 0.7} viewBox="0 0 32 22" fill="none"
      stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
      {/* Estrella central */}
      <path d="M 16 3 L 17 7 L 21 7 L 18 9.5 L 19.5 13.5 L 16 11 L 12.5 13.5 L 14 9.5 L 11 7 L 15 7 Z"
        strokeWidth="1.2" fill="currentColor" />
      {/* Números esquemáticos */}
      <text x="3" y="20" fontFamily="EB Garamond, serif" fontSize="7"
        fontStyle="italic" fill="currentColor" stroke="none">5·0·1</text>
      <text x="20" y="20" fontFamily="EB Garamond, serif" fontSize="7"
        fontStyle="italic" fill="currentColor" stroke="none">7·3·1</text>
    </svg>
  )
}

export function LampIcon({ size = 26 }) {
  return (
    <svg width={size * 0.5} height={size} viewBox="0 0 13 28" fill="none"
      stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
      {/* Poste */}
      <line x1="6.5" y1="13" x2="6.5" y2="25" strokeWidth="1.5" />
      {/* Base */}
      <line x1="3" y1="25" x2="10" y2="25" strokeWidth="2.4" />
      {/* Cabeza del farol */}
      <path d="M 2 5 L 6.5 1 L 11 5 L 11 12 L 2 12 Z" strokeWidth="1.5" />
      {/* Vidrio */}
      <line x1="3.5" y1="6" x2="3.5" y2="11" strokeWidth="0.7" opacity="0.55" />
      <line x1="9.5" y1="6" x2="9.5" y2="11" strokeWidth="0.7" opacity="0.55" />
      {/* Llama */}
      <ellipse cx="6.5" cy="8" rx="1.8" ry="2.5" fill="currentColor" stroke="none" opacity="0.85" />
      {/* Rayos de luz */}
      <line x1="6.5" y1="-2" x2="6.5" y2="0" strokeWidth="0.7" opacity="0.55" />
      <line x1="-1" y1="3" x2="1" y2="4" strokeWidth="0.7" opacity="0.55" />
      <line x1="14" y1="3" x2="12" y2="4" strokeWidth="0.7" opacity="0.55" />
    </svg>
  )
}

export function BookIcon({ size = 26 }) {
  return (
    <svg width={size} height={size * 0.78} viewBox="0 0 30 23" fill="none"
      stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
      {/* Cubierta abierta */}
      <path d="M 2 4 Q 8 3 15 5 Q 22 3 28 4 L 28 20 Q 22 18 15 20 Q 8 18 2 20 Z" strokeWidth="1.5" />
      {/* Lomo */}
      <line x1="15" y1="5" x2="15" y2="20" strokeWidth="1.4" />
      {/* Líneas de texto izquierda */}
      <line x1="5" y1="9" x2="12" y2="10" strokeWidth="0.7" opacity="0.6" />
      <line x1="5" y1="11.5" x2="12" y2="12.5" strokeWidth="0.7" opacity="0.55" />
      <line x1="5" y1="14" x2="12" y2="15" strokeWidth="0.7" opacity="0.5" />
      <line x1="5" y1="16.5" x2="11" y2="17.5" strokeWidth="0.7" opacity="0.45" />
      {/* Líneas de texto derecha */}
      <line x1="18" y1="10" x2="25" y2="9" strokeWidth="0.7" opacity="0.6" />
      <line x1="18" y1="12.5" x2="25" y2="11.5" strokeWidth="0.7" opacity="0.55" />
      <line x1="18" y1="15" x2="25" y2="14" strokeWidth="0.7" opacity="0.5" />
      <line x1="19" y1="17.5" x2="25" y2="16.5" strokeWidth="0.7" opacity="0.45" />
    </svg>
  )
}

export function FoxIcon({ size = 30 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none"
      stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
      {/* Cabeza triangular */}
      <path d="M 6 16 L 4 8 L 10 13 L 16 9 L 22 13 L 28 8 L 26 16 Q 22 22 16 23 Q 10 22 6 16 Z"
        strokeWidth="1.5" />
      {/* Orejas */}
      <line x1="5.5" y1="9" x2="7" y2="6" strokeWidth="1.1" />
      <line x1="26.5" y1="9" x2="25" y2="6" strokeWidth="1.1" />
      {/* Ojos */}
      <ellipse cx="11" cy="15" rx="1.2" ry="1.5" fill="currentColor" stroke="none" />
      <ellipse cx="21" cy="15" rx="1.2" ry="1.5" fill="currentColor" stroke="none" />
      {/* Hocico */}
      <path d="M 14 19 L 16 21 L 18 19" strokeWidth="1" />
      <ellipse cx="16" cy="19" rx="1.2" ry="0.8" fill="currentColor" stroke="none" />
      {/* Bigotes */}
      <line x1="13" y1="20" x2="9" y2="20" strokeWidth="0.6" opacity="0.5" />
      <line x1="19" y1="20" x2="23" y2="20" strokeWidth="0.6" opacity="0.5" />
      {/* Pecho/cola sugerido */}
      <path d="M 14 23 Q 16 25 18 23" strokeWidth="0.9" opacity="0.55" />
    </svg>
  )
}

// ───────────────────────────────────────────────────────────────────────
// Adornos
// ───────────────────────────────────────────────────────────────────────

export function StarBurst({ size = 14 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 14 14" fill="currentColor">
      <path d="M 7 0 L 8 6 L 14 7 L 8 8 L 7 14 L 6 8 L 0 7 L 6 6 Z" />
    </svg>
  )
}

export function LampPostScene({ size = 200 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 200 200" fill="none"
      stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="100" cy="155" r="35" strokeWidth="1.5" />
      <line x1="100" y1="120" x2="100" y2="80" strokeWidth="1.4" />
      <line x1="92" y1="80" x2="108" y2="80" strokeWidth="2" />
      <path d="M 88 80 L 100 60 L 112 80 L 112 92 L 88 92 Z" strokeWidth="1.4" />
      <circle cx="100" cy="80" r="6" fill="currentColor" stroke="none" opacity="0.55" />
      <line x1="100" y1="56" x2="100" y2="48" strokeWidth="0.8" opacity="0.7" />
      <line x1="86" y1="62" x2="80" y2="56" strokeWidth="0.8" opacity="0.55" />
      <line x1="114" y1="62" x2="120" y2="56" strokeWidth="0.8" opacity="0.55" />
    </svg>
  )
}
