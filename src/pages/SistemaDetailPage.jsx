import { useMemo } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ChevronLeft, Check } from 'lucide-react'
import PageTransition from '../components/layout/PageTransition'
import LangToggle from '../components/ui/LangToggle'
import { useProject } from '../context/ProjectContext'
import { useLang } from '../context/LangContext'

const SPEC_LABELS = {
  rotura_puente_termico:   { es: 'Rotura de puente térmico', en: 'Thermal break'           },
  clasificacion_termica:   { es: 'Clasificación térmica',    en: 'Thermal classification'  },
  clasificacion_acustica:  { es: 'Clasificación acústica',   en: 'Acoustic classification' },
  clasificacion_seguridad: { es: 'Clasificación seguridad',  en: 'Security classification' },
  transmitancia:           { es: 'Transmitancia (Uw)',        en: 'Transmittance (Uw)'      },
  permeabilidad_aire:      { es: 'Permeabilidad al aire',     en: 'Air permeability'        },
  estanqueidad_agua:       { es: 'Estanqueidad al agua',      en: 'Water tightness'         },
  cerradura:               { es: 'Cerradura',                 en: 'Lock'                    },
  apertura:                { es: 'Apertura',                  en: 'Opening'                 },
  perfileria_vertical:     { es: 'Perfilería vertical',       en: 'Vertical profiles'       },
  vidrio:                  { es: 'Vidrio',                    en: 'Glass'                   },
  control_solar:           { es: 'Control solar',             en: 'Solar control'           },
  motorizacion:            { es: 'Motorización',              en: 'Motorization'            },
  aislamiento:             { es: 'Aislamiento',               en: 'Insulation'              },
  ruido_motor:             { es: 'Ruido del motor',           en: 'Motor noise'             },
  garantia_motor:          { es: 'Garantía del motor',        en: 'Motor warranty'          },
}

function formatValue(val, lang) {
  if (val === true)  return lang === 'es' ? 'Sí' : 'Yes'
  if (val === false) return lang === 'es' ? 'No' : 'No'
  return val
}

export default function SistemaDetailPage() {
  const { slug }     = useParams()
  const navigate     = useNavigate()
  const { sistemas } = useProject()
  const { lang }     = useLang()

  const sistema = useMemo(
    () => sistemas.find(s => s.slug === slug),
    [sistemas, slug]
  )

  if (!sistema) {
    return (
      <PageTransition>
        <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center"
          style={{ backgroundColor: 'var(--color-bg)' }}>
          <p className="label-luxury mb-4" style={{ color: 'rgba(240,237,232,0.4)' }}>
            {lang === 'es' ? 'Sistema no encontrado' : 'System not found'}
          </p>
          <button onClick={() => navigate('/sistemas')} data-cursor="hover"
            className="label-luxury px-6 py-3 transition-all duration-300"
            style={{ border: '1px solid var(--color-accent)', color: 'var(--color-accent)', fontSize: '0.58rem' }}>
            ← {lang === 'es' ? 'VOLVER AL CATÁLOGO' : 'BACK TO CATALOGUE'}
          </button>
        </div>
      </PageTransition>
    )
  }

  const specEntries = Object.entries(sistema.caracteristicas ?? {})

  return (
    <PageTransition>
      <div className="absolute inset-0 flex flex-col overflow-hidden"
        style={{ backgroundColor: 'var(--color-bg)' }}>

        {/* Header */}
        <div className="flex-shrink-0 flex items-center justify-between px-6 sm:px-10 py-4"
          style={{ borderBottom: '1px solid rgba(91,143,168,0.12)' }}>
          <button onClick={() => navigate('/sistemas')} data-cursor="hover"
            className="flex items-center gap-2 label-luxury transition-colors duration-300"
            style={{ color: 'rgba(240,237,232,0.45)', fontSize: '0.6rem' }}
            onMouseEnter={e => e.currentTarget.style.color = 'var(--color-accent)'}
            onMouseLeave={e => e.currentTarget.style.color = 'rgba(240,237,232,0.45)'}>
            <ChevronLeft size={14} />
            {lang === 'es' ? 'Catálogo' : 'Catalogue'}
          </button>
          <span className="label-luxury text-text/40 hidden sm:block"
            style={{ fontSize: '0.55rem' }}>
            {sistema.material?.toUpperCase()} · {sistema.categoria?.toUpperCase()}
          </span>
          <LangToggle />
        </div>

        {/* Body */}
        <div className="flex-1 min-h-0 overflow-y-auto">
          {/* Hero image */}
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}
            className="relative w-full overflow-hidden"
            style={{ height: 'min(52vh, 520px)' }}>
            <img src={sistema.imagen} alt={sistema.nombre}
              className="absolute inset-0 w-full h-full object-cover"
              style={{ opacity: 0.85 }} />
            <div
              className="absolute inset-0"
              style={{ background: 'linear-gradient(to bottom, rgba(20,26,36,0.15), rgba(30,37,48,0.95))' }} />
            <div className="absolute bottom-0 left-0 right-0 px-6 sm:px-10 py-6 sm:py-8">
              <p className="label-luxury mb-2"
                style={{ fontSize: '0.5rem', color: 'rgba(91,143,168,0.85)', letterSpacing: '0.22em' }}>
                {sistema.material?.toUpperCase()}
              </p>
              <h1 className="display-heading text-text"
                style={{ fontSize: 'clamp(1.6rem, 5vw, 2.8rem)', letterSpacing: '0.06em' }}>
                {sistema.nombre}
              </h1>
            </div>
          </motion.div>

          <div className="max-w-5xl mx-auto px-6 sm:px-10 py-10 grid grid-cols-1 lg:grid-cols-2 gap-10">

            {/* Left: description + CTA */}
            <motion.div
              initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="flex flex-col gap-6">
              <div>
                <p className="label-luxury mb-3"
                  style={{ fontSize: '0.5rem', color: 'rgba(91,143,168,0.65)', letterSpacing: '0.2em' }}>
                  {lang === 'es' ? 'DESCRIPCIÓN' : 'DESCRIPTION'}
                </p>
                <p className="font-sans font-light text-text/70"
                  style={{ fontSize: '0.88rem', lineHeight: 1.85 }}>
                  {sistema.descripcion}
                </p>
              </div>

              {sistema.colores?.length > 0 && (
                <div>
                  <p className="label-luxury mb-3"
                    style={{ fontSize: '0.5rem', color: 'rgba(91,143,168,0.65)', letterSpacing: '0.2em' }}>
                    {lang === 'es' ? 'ACABADOS DISPONIBLES' : 'AVAILABLE FINISHES'}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {sistema.colores.map(c => (
                      <span key={c} className="label-luxury px-3 py-1.5"
                        style={{
                          fontSize: '0.5rem',
                          border: '1px solid rgba(91,143,168,0.25)',
                          color: 'rgba(240,237,232,0.6)',
                        }}>
                        {c}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <div className="pt-4" style={{ borderTop: '1px solid rgba(91,143,168,0.12)' }}>
                <button
                  onClick={() => {
                    try {
                      localStorage.setItem('lum_lead_context', JSON.stringify({
                        source: 'sistema_detail',
                        sistema_slug: sistema.slug,
                        sistema_nombre: sistema.nombre,
                        back_path: `/sistemas/${sistema.slug}`,
                      }))
                    } catch { /* ignore */ }
                    navigate('/contacto')
                  }}
                  data-cursor="hover"
                  className="w-full label-luxury py-4 flex items-center justify-center gap-3 transition-all duration-300"
                  style={{
                    backgroundColor: 'var(--color-accent)',
                    color: 'var(--color-bg)',
                    fontSize: '0.6rem',
                    letterSpacing: '0.2em',
                  }}
                  onMouseEnter={e => e.currentTarget.style.backgroundColor = 'var(--color-accent-light)'}
                  onMouseLeave={e => e.currentTarget.style.backgroundColor = 'var(--color-accent)'}>
                  {lang === 'es' ? 'SOLICITAR PRESUPUESTO' : 'REQUEST A QUOTE'}
                  <span>→</span>
                </button>
              </div>
            </motion.div>

            {/* Right: specs */}
            <motion.div
              initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex flex-col gap-3">
              <p className="label-luxury mb-1"
                style={{ fontSize: '0.5rem', color: 'rgba(91,143,168,0.65)', letterSpacing: '0.2em' }}>
                {lang === 'es' ? 'ESPECIFICACIONES TÉCNICAS' : 'TECHNICAL SPECIFICATIONS'}
              </p>
              <div className="flex flex-col"
                style={{ border: '1px solid rgba(91,143,168,0.12)' }}>
                {specEntries.map(([k, v], i) => {
                  const label = SPEC_LABELS[k]?.[lang] ?? k.replace(/_/g, ' ')
                  return (
                    <div key={k}
                      className="flex items-center justify-between px-4 py-3"
                      style={{
                        borderTop: i === 0 ? 'none' : '1px solid rgba(91,143,168,0.08)',
                      }}>
                      <span className="label-luxury"
                        style={{ fontSize: '0.55rem', color: 'rgba(240,237,232,0.55)' }}>
                        {label}
                      </span>
                      <span className="label-luxury flex items-center gap-1.5"
                        style={{ fontSize: '0.6rem', color: 'var(--color-accent)' }}>
                        {v === true && <Check size={11} />}
                        {v !== true && v !== false && formatValue(v, lang)}
                        {v === false && formatValue(v, lang)}
                      </span>
                    </div>
                  )
                })}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </PageTransition>
  )
}
