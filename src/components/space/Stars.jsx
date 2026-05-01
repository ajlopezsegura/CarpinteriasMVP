import { useMemo } from 'react'

// Genera un campo de estrellas aleatorias pero estables (mismo seed cada render).
function seededRandom(seed) {
  let s = seed
  return () => {
    s = (s * 9301 + 49297) % 233280
    return s / 233280
  }
}

export default function Stars({ count = 80, seed = 42 }) {
  const stars = useMemo(() => {
    const rnd = seededRandom(seed)
    return Array.from({ length: count }).map((_, i) => ({
      id: i,
      x:    rnd() * 100,
      y:    rnd() * 100,
      size: rnd() * 1.6 + 0.4,
      delay: rnd() * 6,
      duration: rnd() * 4 + 3,
    }))
  }, [count, seed])

  return (
    <div className="absolute inset-0 pointer-events-none" aria-hidden>
      {stars.map(s => (
        <span key={s.id}
          style={{
            position: 'absolute',
            left: `${s.x}%`,
            top:  `${s.y}%`,
            width:  s.size,
            height: s.size,
            borderRadius: '50%',
            backgroundColor: 'rgba(245,237,216,0.9)',
            boxShadow: '0 0 6px rgba(232,193,138,0.45)',
            animation: `twinkle ${s.duration}s ease-in-out ${s.delay}s infinite`,
          }} />
      ))}
    </div>
  )
}
