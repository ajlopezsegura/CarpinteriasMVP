import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import Stars from '../components/space/Stars'
import { TinyPlanetWithRose, FoxLargeIllustration, StarBurst } from '../components/illustrations/Illustrations'

const ESCENAS = [
  {
    texto: 'Y al cabo de un año, la posición [del lugar donde el principito había caído] era exactamente la misma. La estrella que veía cada noche era la suya. Cuando los astrónomos descubrieron por primera vez el asteroide B-612, lo midieron y lo dibujaron con todo cuidado.',
    ilustracion: 'planeta',
    cierre: false,
  },
  {
    texto: 'Junto al pozo había una vieja pared de piedra en ruinas. Cuando volví, al día siguiente, vi de lejos a mi principito sentado en lo alto, con las piernas colgando. Y le oí decir: «¿No te acuerdas, entonces? ¡No es aquí, exactamente!»',
    ilustracion: null,
    cierre: false,
  },
  {
    texto: 'Cuando consolé al principito, vi entonces a la serpiente al pie de la pared. Era una de esas serpientes amarillas que te ejecutan en treinta segundos.',
    ilustracion: null,
    cierre: false,
  },
  {
    texto: '—Tú comprendes... es demasiado lejos. No puedo llevar este cuerpo. Es demasiado pesado.\n\n—Pero será como una vieja corteza abandonada. No son tristes las viejas cortezas...',
    ilustracion: null,
    cierre: false,
  },
  {
    texto: '—Cuando mires al cielo, por la noche, como yo habitaré en una de ellas, como yo reiré en una de ellas, será para ti como si todas las estrellas riesen. Tú tendrás, tú solo, estrellas que saben reír.',
    ilustracion: 'estrellas',
    cierre: false,
  },
  {
    texto: 'Y cuando te hayas consolado (siempre se consuela uno), te alegrarás de haberme conocido. Serás siempre mi amigo. Tendrás ganas de reír conmigo. Y a veces abrirás tu ventana, así, para tomar el fresco...',
    ilustracion: 'zorro',
    cierre: false,
  },
  {
    texto: 'He aquí, para mí, el más bello y más triste paisaje del mundo. Es el mismo paisaje de la página anterior, pero lo he dibujado por última vez para mostrároslo bien. Es aquí donde el principito apareció sobre la Tierra, y luego desapareció.',
    ilustracion: null,
    cierre: false,
  },
  {
    texto: 'No se ve bien sino con el corazón.\nLo esencial es invisible a los ojos.',
    ilustracion: null,
    cierre: true,
  },
]

export default function FinalPage() {
  const navigate = useNavigate()
  const [pagina, setPagina] = useState(0)
  const current = ESCENAS[pagina]
  const isLast  = pagina === ESCENAS.length - 1

  return (
    <div className="absolute inset-0 overflow-hidden flex flex-col"
      style={{ background: 'radial-gradient(ellipse at 50% 30%, #2A1E45 0%, #0A1429 55%, #050A18 100%)' }}>

      <Stars count={current.cierre ? 200 : 110} seed={current.cierre ? 7 : 3} />

      {/* Header */}
      <div className="relative z-10 flex items-center justify-between px-5 sm:px-10 py-4 flex-shrink-0">
        <button onClick={() => navigate('/cielo')} data-cursor="hover"
          className="label-luxury transition-colors duration-300"
          style={{ fontSize: '0.45rem', color: 'rgba(245,237,216,0.4)', letterSpacing: '0.22em' }}>
          ← EL CIELO
        </button>
        <p className="label-luxury"
          style={{ fontSize: '0.42rem', color: 'rgba(212,165,116,0.5)', letterSpacing: '0.22em' }}>
          EPÍLOGO
        </p>
      </div>

      {/* Body */}
      <div className="relative z-10 flex-1 min-h-0 flex flex-col justify-center px-6 sm:px-10 py-6">
        <div className="max-w-xl mx-auto w-full">

          <AnimatePresence mode="wait">
            <motion.div
              key={pagina}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.7 }}
              className="flex flex-col items-center text-center gap-8">

              {current.ilustracion === 'planeta' && (
                <div style={{ color: 'var(--color-accent)' }}>
                  <TinyPlanetWithRose size={120} />
                </div>
              )}
              {current.ilustracion === 'zorro' && (
                <div style={{ color: 'var(--color-accent)' }}>
                  <FoxLargeIllustration size={Math.min(260, window.innerWidth * 0.7)} />
                </div>
              )}
              {current.ilustracion === 'estrellas' && (
                <div className="flex gap-3" style={{ color: 'var(--color-accent)' }}>
                  <motion.div animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 2, repeat: Infinity }}>
                    <StarBurst size={20} />
                  </motion.div>
                  <motion.div animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 2.5, repeat: Infinity, delay: 0.5 }}>
                    <StarBurst size={28} />
                  </motion.div>
                  <motion.div animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 1.8, repeat: Infinity, delay: 1 }}>
                    <StarBurst size={22} />
                  </motion.div>
                </div>
              )}

              <p className="prose-tale"
                style={{
                  fontSize: current.cierre ? 'clamp(1.1rem, 3vw, 1.5rem)' : 'clamp(0.95rem, 2.3vw, 1.1rem)',
                  lineHeight: 1.85,
                  color: current.cierre ? 'var(--color-accent)' : 'rgba(245,237,216,0.88)',
                  textAlign: 'center',
                  fontStyle: current.cierre ? 'italic' : 'normal',
                  whiteSpace: 'pre-line',
                  letterSpacing: current.cierre ? '0.02em' : '0',
                }}>
                {current.texto}
              </p>

              {current.cierre && (
                <motion.p
                  initial={{ opacity: 0 }} animate={{ opacity: 0.5 }}
                  transition={{ duration: 1.5, delay: 1.2 }}
                  className="label-luxury"
                  style={{
                    fontSize: 'clamp(0.42rem, 1.4vw, 0.48rem)',
                    letterSpacing: '0.28em',
                    color: 'rgba(245,237,216,0.45)',
                    marginTop: 16,
                  }}>
                  — ANTOINE DE SAINT-EXUPÉRY, 1943 —
                </motion.p>
              )}
            </motion.div>
          </AnimatePresence>

          {/* Navegación */}
          <div className="flex items-center justify-between mt-12">
            <div className="flex gap-1.5">
              {ESCENAS.map((_, i) => (
                <span key={i}
                  style={{
                    width: 6, height: 6, borderRadius: '50%',
                    backgroundColor: i === pagina ? 'var(--color-accent)' : 'rgba(212,165,116,0.25)',
                    transition: 'background-color 0.3s',
                  }} />
              ))}
            </div>
            {!isLast ? (
              <button onClick={() => setPagina(p => p + 1)} data-cursor="hover"
                className="label-luxury px-5 py-3 transition-all duration-300"
                style={{
                  fontSize: '0.55rem',
                  letterSpacing: '0.2em',
                  color: 'var(--color-accent)',
                  fontFamily: 'Montserrat, sans-serif',
                }}>
                CONTINUAR ↓
              </button>
            ) : (
              <button onClick={() => navigate('/cielo')} data-cursor="hover"
                className="label-luxury px-5 py-3 transition-all duration-300"
                style={{
                  fontSize: '0.55rem',
                  letterSpacing: '0.2em',
                  border: '1px solid var(--color-accent)',
                  color: 'var(--color-accent)',
                  fontFamily: 'Montserrat, sans-serif',
                }}>
                ← VOLVER AL CIELO
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
