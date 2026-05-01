import { useEffect, useMemo, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft } from 'lucide-react'
import Stars from '../components/space/Stars'
import Planet from '../components/space/Planet'
import * as Icons from '../components/illustrations/Illustrations'
import { ASTEROIDES } from '../data/asteroides'
import { usePrincipito } from '../context/PrincipitoContext'

function usePlanetSize() {
  const [size, setSize] = useState(() => Math.min(180, (typeof window !== 'undefined' ? window.innerWidth : 800) * 0.35))
  useEffect(() => {
    function update() { setSize(Math.min(180, window.innerWidth * 0.35)) }
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [])
  return size
}

export default function AsteroidPage() {
  const { id }       = useParams()
  const navigate     = useNavigate()
  const { markVisited, isVisited } = usePrincipito()
  const [revealed, setRevealed] = useState(0)
  const [showInteraction, setShowInteraction] = useState(false)
  const [respondido, setRespondido] = useState(false)
  const planetSize   = usePlanetSize()

  const asteroide = useMemo(
    () => ASTEROIDES.find(a => a.id === id),
    [id]
  )

  // Mark as visited al cargar
  useEffect(() => {
    if (asteroide) markVisited(asteroide.id)
  }, [asteroide, markVisited])

  // Reset al navegar
  useEffect(() => {
    setRevealed(0)
    setShowInteraction(false)
    setRespondido(false)
  }, [id])

  if (!asteroide) {
    return (
      <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center"
        style={{ backgroundColor: 'var(--color-bg)' }}>
        <p className="label-luxury mb-4" style={{ color: 'rgba(245,237,216,0.5)' }}>
          Planeta desconocido
        </p>
        <button onClick={() => navigate('/cielo')} data-cursor="hover"
          className="label-luxury px-5 py-3"
          style={{ border: '1px solid var(--color-accent)', color: 'var(--color-accent)' }}>
          ← VOLVER AL CIELO
        </button>
      </div>
    )
  }

  const totalLineas = asteroide.pasaje.length
  const isLastReveal = revealed >= totalLineas

  function revelarSiguiente() {
    if (revealed < totalLineas) {
      setRevealed(r => r + 1)
    } else if (asteroide.interaccion && !showInteraction) {
      setShowInteraction(true)
    }
  }

  return (
    <div className="absolute inset-0 overflow-hidden"
      style={{ background: `radial-gradient(ellipse at 50% 30%, ${asteroide.color}22 0%, #0A1429 60%, #050A18 100%)` }}>

      <Stars count={70} seed={asteroide.id.length * 17} />

      {/* Header */}
      <div className="absolute top-0 left-0 right-0 z-20 flex items-center justify-between px-5 sm:px-10 py-5">
        <button onClick={() => navigate('/cielo')} data-cursor="hover"
          className="flex items-center gap-1.5 label-luxury transition-colors duration-300"
          style={{ fontSize: '0.5rem', color: 'rgba(245,237,216,0.55)', letterSpacing: '0.18em' }}
          onMouseEnter={e => e.currentTarget.style.color = 'var(--color-accent)'}
          onMouseLeave={e => e.currentTarget.style.color = 'rgba(245,237,216,0.55)'}>
          <ChevronLeft size={14} /> EL CIELO
        </button>
        <p className="label-luxury text-right"
          style={{ fontSize: '0.45rem', color: 'var(--color-accent)', letterSpacing: '0.22em' }}>
          ASTEROIDE {asteroide.numero}
        </p>
      </div>

      {/* Planeta flotante grande arriba */}
      <div className="absolute left-0 right-0 flex justify-center pointer-events-none"
        style={{ top: 'clamp(10%, 14vh, 16%)' }}>
        <motion.div
          initial={{ scale: 0.4, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.2, ease: [0.43, 0.13, 0.23, 0.96] }}>
          {(() => {
            const IconComp = Icons[asteroide.icono]
            return (
              <Planet
                color={asteroide.color}
                size={planetSize}
                visited={isVisited(asteroide.id)}
                withRing={asteroide.id === 'geografo'}
                character={IconComp ? <IconComp size={planetSize * 0.32} /> : null}
              />
            )
          })()}
        </motion.div>
      </div>

      {/* Contenido */}
      <div className="absolute inset-0 flex flex-col items-center justify-end pb-10 px-5 sm:px-10 pt-[clamp(36%,40vh,42%)]">
        <div className="w-full max-w-2xl">

          {/* Título */}
          <motion.div
            initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-center mb-6">
            <h1 className="display-serif"
              style={{
                fontSize: 'clamp(1.6rem, 5vw, 2.4rem)',
                fontStyle: 'italic',
                color: 'var(--color-text)',
                letterSpacing: '0.02em',
                lineHeight: 1.15,
              }}>
              {asteroide.titulo}
            </h1>
            <p className="prose-tale mt-2"
              style={{
                fontSize: 'clamp(0.78rem, 1.8vw, 0.9rem)',
                color: 'rgba(212,165,116,0.75)',
                fontStyle: 'italic',
                fontWeight: 400,
              }}>
              {asteroide.subtitulo}
            </p>
          </motion.div>

          {/* Pasajes */}
          <div className="flex flex-col gap-3 sm:gap-4 mb-6">
            <AnimatePresence>
              {asteroide.pasaje.slice(0, revealed).map((linea, i) => (
                <motion.p key={i}
                  initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  className="prose-tale"
                  style={{
                    fontSize: 'clamp(0.9rem, 2.3vw, 1.05rem)',
                    lineHeight: 1.85,
                    textAlign: linea.startsWith('—') || linea.startsWith('«') ? 'left' : 'left',
                  }}>
                  {linea}
                </motion.p>
              ))}
            </AnimatePresence>
          </div>

          {/* Interacción al final */}
          <AnimatePresence>
            {showInteraction && asteroide.interaccion && !respondido && (
              <motion.div
                initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.5 }}
                className="flex flex-col items-center gap-4 mt-2"
                style={{ borderTop: '1px solid rgba(212,165,116,0.18)', paddingTop: 24 }}>
                <p className="display-serif text-center"
                  style={{
                    fontSize: 'clamp(0.95rem, 2.4vw, 1.15rem)',
                    fontStyle: 'italic',
                    color: 'rgba(245,237,216,0.85)',
                  }}>
                  {asteroide.interaccion.pregunta}
                </p>
                <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-2 sm:gap-3 w-full">
                  {asteroide.interaccion.opciones.map((opcion, i) => (
                    <button key={i}
                      onClick={() => setRespondido(true)}
                      data-cursor="hover"
                      className="label-luxury px-4 py-3 transition-all duration-300"
                      style={{
                        fontSize: 'clamp(0.5rem, 1.6vw, 0.55rem)',
                        letterSpacing: '0.15em',
                        border: '1px solid rgba(212,165,116,0.45)',
                        color: 'rgba(245,237,216,0.85)',
                        backgroundColor: 'transparent',
                        fontFamily: 'Montserrat, sans-serif',
                      }}
                      onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--color-accent)'; e.currentTarget.style.backgroundColor = 'rgba(212,165,116,0.08)' }}
                      onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(212,165,116,0.45)'; e.currentTarget.style.backgroundColor = 'transparent' }}>
                      {opcion}
                    </button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <AnimatePresence>
            {respondido && asteroide.interaccion && (
              <motion.div
                initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
                className="mt-6"
                style={{ borderTop: '1px solid rgba(212,165,116,0.18)', paddingTop: 20 }}>
                <p className="prose-tale"
                  style={{
                    fontSize: 'clamp(0.9rem, 2.2vw, 1.02rem)',
                    fontStyle: 'italic',
                    color: 'rgba(212,165,116,0.95)',
                    textAlign: 'center',
                    lineHeight: 1.85,
                  }}>
                  {asteroide.interaccion.respuesta}
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* CTA */}
          <div className="flex justify-center mt-8">
            {!isLastReveal ? (
              <motion.button
                key="next"
                initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                onClick={revelarSiguiente}
                data-cursor="hover"
                className="label-luxury px-6 py-3 transition-all duration-300"
                style={{
                  fontSize: '0.55rem',
                  letterSpacing: '0.2em',
                  border: '1px solid var(--color-accent)',
                  color: 'var(--color-accent)',
                  backgroundColor: 'transparent',
                  fontFamily: 'Montserrat, sans-serif',
                }}
                onMouseEnter={e => { e.currentTarget.style.backgroundColor = 'var(--color-accent)'; e.currentTarget.style.color = 'var(--color-bg)' }}
                onMouseLeave={e => { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.color = 'var(--color-accent)' }}>
                {revealed === 0 ? 'COMENZAR' : 'CONTINUAR ↓'}
              </motion.button>
            ) : asteroide.interaccion && !showInteraction ? (
              <button
                onClick={revelarSiguiente}
                data-cursor="hover"
                className="label-luxury px-6 py-3 transition-all duration-300"
                style={{
                  fontSize: '0.55rem',
                  letterSpacing: '0.2em',
                  border: '1px solid var(--color-accent)',
                  color: 'var(--color-accent)',
                  fontFamily: 'Montserrat, sans-serif',
                }}>
                ¿QUÉ HARÁS?
              </button>
            ) : (
              <button
                onClick={() => navigate('/cielo')}
                data-cursor="hover"
                className="label-luxury px-6 py-3 transition-all duration-300"
                style={{
                  fontSize: '0.55rem',
                  letterSpacing: '0.2em',
                  backgroundColor: 'var(--color-accent)',
                  color: 'var(--color-bg)',
                  fontFamily: 'Montserrat, sans-serif',
                }}
                onMouseEnter={e => e.currentTarget.style.backgroundColor = 'var(--color-accent-light)'}
                onMouseLeave={e => e.currentTarget.style.backgroundColor = 'var(--color-accent)'}>
                ← VOLVER AL CIELO
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
