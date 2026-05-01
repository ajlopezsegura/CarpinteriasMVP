import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import Stars from '../components/space/Stars'
import { BoaWithElephant, TinyPlanetWithRose } from '../components/illustrations/Illustrations'

const PASAJES = [
  {
    texto: 'Cuando yo tenía seis años vi una vez una imagen magnífica en un libro sobre el bosque virgen que se titulaba «Historias vividas». Representaba una serpiente boa que se tragaba a una fiera.',
    ilustracion: 'boa',
  },
  {
    texto: 'Yo medité mucho sobre las aventuras de la jungla y, a mi vez, logré trazar con un lápiz de colores mi primer dibujo. Mi dibujo número 1. Era así:',
    ilustracion: 'boa',
  },
  {
    texto: 'Enseñé mi obra de arte a las personas mayores y les pregunté si mi dibujo les daba miedo. Me respondieron: «¿Por qué habría de asustar un sombrero?» Mi dibujo no representaba un sombrero. Representaba una serpiente boa que digería un elefante.',
    ilustracion: 'boa',
  },
  {
    texto: 'Así viví solo, sin nadie con quien hablar verdaderamente, hasta que tuve una avería en el desierto del Sahara, hace seis años. Me había quedado sin mecánico ni pasajeros y me disponía a intentar yo solo una difícil reparación.',
    ilustracion: null,
  },
  {
    texto: 'Cuando me dormía sobre la arena, a mil millas de toda tierra habitada, fui despertado al amanecer por una vocecita extraña que decía: —Por favor… dibújame un cordero.',
    ilustracion: null,
  },
  {
    texto: 'Y vi al hombrecillo más extraordinario que me miraba con seriedad. Me dijo que venía de un planeta tan pequeño como una casa: el asteroide B-612.',
    ilustracion: 'planeta',
  },
  {
    texto: 'Pero antes de quedarse en la Tierra, había viajado por otros seis pequeños planetas. En cada uno encontró a alguien. Si quieres, puedes visitarlos tú también, en el orden que prefieras.',
    ilustracion: null,
  },
]

export default function IntroPage() {
  const navigate = useNavigate()
  const [pagina, setPagina] = useState(0)
  const isLast = pagina === PASAJES.length - 1
  const current = PASAJES[pagina]

  function siguiente() {
    if (isLast) {
      navigate('/cielo')
    } else {
      setPagina(p => p + 1)
    }
  }

  function saltar() {
    navigate('/cielo')
  }

  return (
    <div className="absolute inset-0 overflow-hidden flex flex-col"
      style={{ background: 'radial-gradient(ellipse at 50% 35%, #1B2845 0%, #0A1429 60%, #050A18 100%)' }}>

      <Stars count={90} seed={9} />

      {/* Header */}
      <div className="relative z-10 flex items-center justify-end px-5 sm:px-10 py-4 flex-shrink-0">
        <button onClick={saltar} data-cursor="hover"
          className="label-luxury transition-colors duration-300"
          style={{ fontSize: '0.45rem', color: 'rgba(245,237,216,0.4)', letterSpacing: '0.22em' }}>
          SALTAR INTRO →
        </button>
      </div>

      {/* Body */}
      <div className="relative z-10 flex-1 min-h-0 flex flex-col justify-center px-6 sm:px-10 pb-12 pt-2">
        <div className="max-w-xl mx-auto w-full">

          {pagina === 0 && (
            <motion.div
              initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2 }}
              className="text-center mb-10 sm:mb-14">
              <p className="label-luxury mb-3"
                style={{ fontSize: 'clamp(0.42rem, 1.5vw, 0.5rem)', color: 'rgba(212,165,116,0.7)', letterSpacing: '0.28em' }}>
                ANTOINE DE SAINT-EXUPÉRY
              </p>
              <h1 className="display-serif"
                style={{
                  fontSize: 'clamp(2.2rem, 8vw, 4.2rem)',
                  fontStyle: 'italic',
                  color: 'var(--color-text)',
                  lineHeight: 1.05,
                }}>
                El Principito
              </h1>
              <div className="h-px w-12 mx-auto mt-4" style={{ backgroundColor: 'var(--color-accent)' }} />
            </motion.div>
          )}

          <AnimatePresence mode="wait">
            <motion.div
              key={pagina}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.6 }}
              className="flex flex-col items-center text-center gap-6">

              {current.ilustracion === 'boa' && (
                <div style={{ color: 'var(--color-accent)' }}>
                  <BoaWithElephant size={Math.min(280, window.innerWidth * 0.7)} />
                </div>
              )}
              {current.ilustracion === 'planeta' && (
                <div style={{ color: 'var(--color-accent)' }}>
                  <TinyPlanetWithRose size={130} />
                </div>
              )}

              <p className="prose-tale"
                style={{
                  fontSize: 'clamp(0.95rem, 2.4vw, 1.1rem)',
                  lineHeight: 1.85,
                  color: 'rgba(245,237,216,0.85)',
                  textAlign: 'left',
                }}>
                {current.texto}
              </p>
            </motion.div>
          </AnimatePresence>

          {/* Navegación */}
          <div className="flex items-center justify-between mt-10">
            <div className="flex gap-1.5">
              {PASAJES.map((_, i) => (
                <span key={i}
                  style={{
                    width: 6, height: 6, borderRadius: '50%',
                    backgroundColor: i === pagina ? 'var(--color-accent)' : 'rgba(212,165,116,0.25)',
                    transition: 'background-color 0.3s',
                  }} />
              ))}
            </div>
            <button onClick={siguiente} data-cursor="hover"
              className="label-luxury px-5 py-3 transition-all duration-300"
              style={{
                fontSize: '0.55rem',
                letterSpacing: '0.2em',
                border: isLast ? '1px solid var(--color-accent)' : 'none',
                backgroundColor: isLast ? 'var(--color-accent)' : 'transparent',
                color: isLast ? 'var(--color-bg)' : 'var(--color-accent)',
                fontFamily: 'Montserrat, sans-serif',
              }}>
              {isLast ? 'ELEGIR PLANETA →' : 'CONTINUAR ↓'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
