import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { RotateCcw } from 'lucide-react'
import Stars from '../components/space/Stars'
import Planet from '../components/space/Planet'
import * as Icons from '../components/illustrations/Illustrations'
import { ASTEROIDES } from '../data/asteroides'
import { usePrincipito } from '../context/PrincipitoContext'

export default function HubPage() {
  const navigate = useNavigate()
  const { visited, isVisited, reset } = usePrincipito()
  const total       = ASTEROIDES.length
  const completados = visited.size
  const allDone     = completados === total

  return (
    <div className="absolute inset-0 overflow-hidden flex flex-col"
      style={{ background: 'radial-gradient(ellipse at 50% 30%, #1B2845 0%, #0A1429 55%, #050A18 100%)' }}>

      <Stars count={120} seed={42} />

      {/* Encabezado */}
      <div className="relative z-10 flex items-center justify-between px-5 sm:px-10 py-4 flex-shrink-0">
        <button onClick={() => navigate('/')} data-cursor="hover"
          className="label-luxury transition-colors duration-300"
          style={{ fontSize: '0.45rem', color: 'rgba(245,237,216,0.4)', letterSpacing: '0.22em' }}>
          ← INICIO
        </button>
        {completados > 0 && (
          <button onClick={reset} data-cursor="hover"
            className="flex items-center gap-1.5 label-luxury transition-colors duration-300"
            style={{ fontSize: '0.45rem', color: 'rgba(245,237,216,0.4)', letterSpacing: '0.18em' }}>
            <RotateCcw size={11} /> REINICIAR
          </button>
        )}
      </div>

      {/* Título central */}
      <div className="relative z-10 text-center px-6 mt-2 mb-6 sm:mb-8 flex-shrink-0">
        <motion.p
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="label-luxury mb-2"
          style={{ fontSize: 'clamp(0.42rem, 1.4vw, 0.48rem)', color: 'rgba(212,165,116,0.7)', letterSpacing: '0.28em' }}>
          ANTOINE DE SAINT-EXUPÉRY
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.43, 0.13, 0.23, 0.96] }}
          className="display-serif"
          style={{
            fontSize: 'clamp(1.8rem, 5.5vw, 3.2rem)',
            color: 'var(--color-text)',
            fontWeight: 500,
            fontStyle: 'italic',
          }}>
          El Principito
        </motion.h1>
        <motion.div
          initial={{ width: 0 }} animate={{ width: 48 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="h-px mx-auto my-2"
          style={{ backgroundColor: 'var(--color-accent)' }}
        />
        <motion.p
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="label-luxury"
          style={{
            fontSize: 'clamp(0.4rem, 1.4vw, 0.5rem)',
            letterSpacing: 'clamp(0.16em, 0.6vw, 0.22em)',
            color: 'rgba(245,237,216,0.55)',
          }}>
          ELIGE UN PLANETA · {completados} / {total}
        </motion.p>
      </div>

      {/* Sistema de planetas — grid responsive */}
      <div className="relative z-10 flex-1 min-h-0 overflow-y-auto pb-6">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-x-2 gap-y-12 sm:gap-y-14 max-w-3xl mx-auto px-4 sm:px-8 pt-10 sm:pt-12">
          {ASTEROIDES.map((a, i) => {
            const wasVisited = isVisited(a.id)
            const IconComp   = Icons[a.icono]
            // Asimetría visual: cada planeta se desplaza un poco para
            // romper la rigidez de la rejilla.
            const yOffsets = [-8, 14, -4, 18, -12, 8, 0]
            return (
              <motion.button
                key={a.id}
                onClick={() => navigate(`/asteroide/${a.id}`)}
                data-cursor="hover"
                initial={{ opacity: 0, scale: 0.6 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.7, delay: 0.4 + i * 0.1, ease: [0.43, 0.13, 0.23, 0.96] }}
                className="relative flex flex-col items-center"
                style={{ transform: `translateY(${yOffsets[i] ?? 0}px)` }}
                whileHover={{ scale: 1.06 }}
              >
                <Planet
                  color={a.color}
                  size={a.tamaño}
                  visited={wasVisited}
                  withRing={a.id === 'geografo'}
                  character={IconComp ? <IconComp size={a.id === 'farolero' ? 22 : a.id === 'negocios' ? 28 : 24} /> : null}
                />
                <p className="label-luxury transition-all duration-300"
                  style={{
                    fontSize: 'clamp(0.38rem, 1.3vw, 0.45rem)',
                    letterSpacing: '0.2em',
                    color: wasVisited ? 'var(--color-accent)' : 'rgba(212,165,116,0.5)',
                    fontFamily: 'Montserrat, sans-serif',
                    marginTop: 12,
                  }}>
                  {a.numero}
                </p>
                <p className="display-serif transition-all duration-300 text-center px-1"
                  style={{
                    fontSize: 'clamp(0.7rem, 1.7vw, 0.88rem)',
                    fontStyle: 'italic',
                    letterSpacing: '0.02em',
                    lineHeight: 1.15,
                    color: wasVisited ? 'rgba(245,237,216,0.95)' : 'rgba(245,237,216,0.65)',
                    marginTop: 1,
                    maxWidth: 120,
                  }}>
                  {a.titulo}
                </p>
              </motion.button>
            )
          })}
        </div>

        {/* Botón FINAL cuando todos visitados */}
        {allDone && (
          <motion.div
            initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="flex flex-col items-center mt-12 mb-4 px-6">
            <p className="display-serif text-center mb-4"
              style={{
                fontSize: 'clamp(0.85rem, 2vw, 1.1rem)',
                fontStyle: 'italic',
                color: 'var(--color-accent)',
                lineHeight: 1.5,
              }}>
              Has recorrido los siete mundos.<br/>
              Hay algo más que ver…
            </p>
            <button onClick={() => navigate('/final')} data-cursor="hover"
              className="label-luxury px-6 py-3 transition-all duration-300"
              style={{
                fontSize: '0.6rem',
                letterSpacing: '0.22em',
                backgroundColor: 'var(--color-accent)',
                color: 'var(--color-bg)',
                fontFamily: 'Montserrat, sans-serif',
              }}>
              EL FINAL DEL CUENTO →
            </button>
          </motion.div>
        )}

        {!allDone && (
          <motion.p
            initial={{ opacity: 0 }} animate={{ opacity: 0.45 }}
            transition={{ duration: 1, delay: 1.2 }}
            className="label-luxury text-center px-6 mt-10 mb-3"
            style={{
              fontSize: 'clamp(0.38rem, 1.2vw, 0.42rem)',
              letterSpacing: '0.22em',
              color: 'rgba(245,237,216,0.35)',
            }}>
            ADAPTACIÓN INTERACTIVA · TEXTOS ORIGINALES DE SAINT-EXUPÉRY
          </motion.p>
        )}
      </div>
    </div>
  )
}
