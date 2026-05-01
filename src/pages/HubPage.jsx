import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { RotateCcw } from 'lucide-react'
import Stars from '../components/space/Stars'
import Planet from '../components/space/Planet'
import { ASTEROIDES } from '../data/asteroides'
import { usePrincipito } from '../context/PrincipitoContext'

export default function HubPage() {
  const navigate = useNavigate()
  const { visited, isVisited, reset } = usePrincipito()
  const total       = ASTEROIDES.length
  const completados = visited.size
  const allDone     = completados === total

  return (
    <div className="absolute inset-0 overflow-hidden"
      style={{ background: 'radial-gradient(ellipse at 50% 40%, #1B2845 0%, #0A1429 55%, #050A18 100%)' }}>

      <Stars count={120} seed={42} />

      {/* Encabezado */}
      <div className="absolute top-0 left-0 right-0 z-10 flex items-center justify-between px-5 sm:px-10 py-5">
        <p className="label-luxury"
          style={{ fontSize: 'clamp(0.42rem, 1.6vw, 0.5rem)', color: 'rgba(212,165,116,0.7)', letterSpacing: '0.28em' }}>
          ANTOINE DE SAINT-EXUPÉRY
        </p>
        {completados > 0 && (
          <button onClick={reset} data-cursor="hover"
            className="flex items-center gap-1.5 label-luxury transition-colors duration-300"
            style={{ fontSize: '0.45rem', color: 'rgba(245,237,216,0.4)', letterSpacing: '0.18em' }}
            onMouseEnter={e => e.currentTarget.style.color = 'var(--color-accent)'}
            onMouseLeave={e => e.currentTarget.style.color = 'rgba(245,237,216,0.4)'}>
            <RotateCcw size={11} /> REINICIAR
          </button>
        )}
      </div>

      {/* Título central */}
      <div className="absolute top-[12%] left-0 right-0 text-center px-6 z-10">
        <motion.h1
          initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.4, ease: [0.43, 0.13, 0.23, 0.96] }}
          className="display-serif"
          style={{
            fontSize: 'clamp(2.2rem, 7vw, 4.4rem)',
            color: 'var(--color-text)',
            fontWeight: 500,
            fontStyle: 'italic',
          }}>
          El Principito
        </motion.h1>
        <motion.div
          initial={{ width: 0 }} animate={{ width: 56 }}
          transition={{ duration: 1.0, delay: 0.6 }}
          className="h-px mx-auto my-3"
          style={{ backgroundColor: 'var(--color-accent)' }}
        />
        <motion.p
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.0 }}
          className="label-luxury"
          style={{
            fontSize: 'clamp(0.45rem, 1.6vw, 0.55rem)',
            letterSpacing: 'clamp(0.16em, 0.8vw, 0.24em)',
            color: 'rgba(245,237,216,0.55)',
          }}>
          ELIGE UN PLANETA · {completados} / {total}
        </motion.p>
      </div>

      {/* Sistema solar de asteroides */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative" style={{ width: 'min(92vw, 760px)', height: 'min(70vh, 540px)', marginTop: '4%' }}>
          {ASTEROIDES.map((a, i) => {
            const wasVisited = isVisited(a.id)
            return (
              <motion.button
                key={a.id}
                onClick={() => navigate(`/asteroide/${a.id}`)}
                data-cursor="hover"
                initial={{ opacity: 0, scale: 0.6 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.7, delay: 0.4 + i * 0.12, ease: [0.43, 0.13, 0.23, 0.96] }}
                className="absolute group p-2"
                style={{
                  left: `${a.posicion.x}%`,
                  top:  `${a.posicion.y}%`,
                  transform: 'translate(-50%, -50%)',
                }}
                whileHover={{ scale: 1.08 }}
              >
                <div className="flex flex-col items-center gap-1" style={{ maxWidth: 110 }}>
                  <Planet
                    color={a.color}
                    size={a.tamaño}
                    visited={wasVisited}
                    withRing={a.id === 'geografo'}
                  />
                  <p className="label-luxury transition-all duration-300"
                    style={{
                      fontSize: 'clamp(0.38rem, 1.3vw, 0.45rem)',
                      letterSpacing: '0.18em',
                      color: wasVisited ? 'var(--color-accent)' : 'rgba(212,165,116,0.55)',
                      fontFamily: 'Montserrat, sans-serif',
                      marginTop: 6,
                    }}>
                    {a.numero}
                  </p>
                  <p className="display-serif transition-all duration-300 text-center"
                    style={{
                      fontSize: 'clamp(0.72rem, 1.7vw, 0.9rem)',
                      fontStyle: 'italic',
                      letterSpacing: '0.02em',
                      lineHeight: 1.15,
                      color: wasVisited ? 'rgba(245,237,216,0.95)' : 'rgba(245,237,216,0.7)',
                      marginTop: -1,
                    }}>
                    {a.titulo}
                  </p>
                </div>
              </motion.button>
            )
          })}
        </div>
      </div>

      {/* Pie */}
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 0.55 }}
        transition={{ duration: 1, delay: 1.6 }}
        className="absolute bottom-0 left-0 right-0 text-center px-6 pb-5">
        {allDone ? (
          <p className="display-serif"
            style={{
              fontSize: 'clamp(0.85rem, 2vw, 1.05rem)',
              fontStyle: 'italic',
              color: 'var(--color-accent)',
            }}>
            Has recorrido los siete mundos. Lo esencial es invisible a los ojos.
          </p>
        ) : (
          <p className="label-luxury"
            style={{
              fontSize: 'clamp(0.4rem, 1.4vw, 0.45rem)',
              letterSpacing: '0.22em',
              color: 'rgba(245,237,216,0.35)',
            }}>
            ADAPTACIÓN INTERACTIVA · TEXTOS ORIGINALES DE SAINT-EXUPÉRY
          </p>
        )}
      </motion.div>
    </div>
  )
}
