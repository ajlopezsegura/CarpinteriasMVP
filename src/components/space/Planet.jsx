import { motion } from 'framer-motion'

export default function Planet({ color, size, visited = false, withRing = false, animated = true, character = null }) {
  const ringRotation = withRing ? -22 : 0

  return (
    <div className="relative" style={{ width: size, height: size }}>
      {/* Halo exterior si visitado */}
      {visited && (
        <div className="absolute inset-0 rounded-full"
          style={{
            boxShadow: '0 0 32px rgba(212,165,116,0.55), 0 0 64px rgba(212,165,116,0.18)',
          }} />
      )}

      {/* Cuerpo del planeta */}
      <motion.div
        className="absolute inset-0 rounded-full"
        style={{
          background: `radial-gradient(circle at 30% 30%, ${color}, ${color}aa 55%, ${color}66 100%)`,
          border: `1px solid ${color}`,
          boxShadow: `inset -${size * 0.08}px -${size * 0.08}px ${size * 0.18}px rgba(0,0,0,0.6)`,
        }}
        animate={animated ? {
          rotate: [0, 4, -4, 0],
          y: [0, -3, 0, 3, 0],
        } : {}}
        transition={animated ? {
          duration: 12, repeat: Infinity, ease: 'easeInOut',
        } : {}}
      />

      {/* Anillo opcional (planeta del geógrafo) */}
      {withRing && (
        <div
          className="absolute left-1/2 top-1/2"
          style={{
            width: size * 1.55,
            height: size * 0.18,
            borderRadius: '50%',
            border: '1px solid rgba(212,165,116,0.55)',
            transform: `translate(-50%, -50%) rotate(${ringRotation}deg)`,
            backgroundColor: 'transparent',
          }}
        />
      )}

      {/* Crater suave */}
      <div className="absolute rounded-full pointer-events-none"
        style={{
          left:   `${size * 0.55}px`,
          top:    `${size * 0.62}px`,
          width:  `${size * 0.18}px`,
          height: `${size * 0.18}px`,
          backgroundColor: 'rgba(0,0,0,0.18)',
        }} />

      {/* Personaje encima del planeta */}
      {character && (
        <div
          className="absolute pointer-events-none"
          style={{
            left: '50%',
            top:  `-${size * 0.35}px`,
            transform: 'translateX(-50%)',
            color: visited ? 'var(--color-accent-light)' : 'var(--color-accent)',
            opacity: visited ? 1 : 0.85,
          }}>
          {character}
        </div>
      )}
    </div>
  )
}
