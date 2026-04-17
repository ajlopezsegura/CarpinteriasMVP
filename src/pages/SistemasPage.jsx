import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ChevronLeft } from 'lucide-react'
import PageTransition from '../components/layout/PageTransition'
import LangToggle from '../components/ui/LangToggle'
import { useProject } from '../context/ProjectContext'
import { useLang } from '../context/LangContext'
import { CATEGORIAS } from '../data/sistemas'

export default function SistemasPage() {
  const navigate       = useNavigate()
  const { sistemas }   = useProject()
  const { lang }       = useLang()
  const [activeCat, setActiveCat] = useState('todas')

  const filtered = useMemo(() => {
    if (activeCat === 'todas') return sistemas
    return sistemas.filter(s => s.categoria === activeCat)
  }, [sistemas, activeCat])

  return (
    <PageTransition>
      <div className="absolute inset-0 flex flex-col overflow-hidden"
        style={{ backgroundColor: 'var(--color-bg)' }}>

        {/* Header */}
        <div className="flex-shrink-0 flex items-center justify-between px-6 sm:px-10 py-4"
          style={{ borderBottom: '1px solid rgba(91,143,168,0.12)' }}>
          <button onClick={() => navigate('/')} data-cursor="hover"
            className="flex items-center gap-2 label-luxury transition-colors duration-300"
            style={{ color: 'rgba(240,237,232,0.45)', fontSize: '0.6rem' }}
            onMouseEnter={e => e.currentTarget.style.color = 'var(--color-accent)'}
            onMouseLeave={e => e.currentTarget.style.color = 'rgba(240,237,232,0.45)'}>
            <ChevronLeft size={14} />
            {lang === 'es' ? 'Inicio' : 'Home'}
          </button>
          <span className="label-luxury text-text/40 hidden sm:block" style={{ fontSize: '0.55rem' }}>
            LUMINAL · {lang === 'es' ? 'CATÁLOGO' : 'CATALOGUE'}
          </span>
          <LangToggle />
        </div>

        {/* Body */}
        <div className="flex-1 min-h-0 overflow-y-auto pb-24">
          <div className="max-w-6xl mx-auto px-6 sm:px-10 py-8 sm:py-12">

            {/* Title */}
            <motion.div
              initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-8 sm:mb-10">
              <p className="label-luxury mb-3"
                style={{ fontSize: '0.5rem', color: 'rgba(91,143,168,0.65)', letterSpacing: '0.22em' }}>
                {lang === 'es' ? 'NUESTROS SISTEMAS' : 'OUR SYSTEMS'}
              </p>
              <h1 className="display-heading text-text"
                style={{ fontSize: 'clamp(1.6rem, 5vw, 2.6rem)', letterSpacing: '0.08em' }}>
                {lang === 'es' ? 'CATÁLOGO' : 'CATALOGUE'}
              </h1>
              <p className="font-sans font-light mt-3 text-text/55"
                style={{ fontSize: '0.85rem', lineHeight: 1.7, maxWidth: 620 }}>
                {lang === 'es'
                  ? 'Selecciona una categoría para explorar los sistemas de ventanas, puertas, cerramientos y fachadas que ofrecemos.'
                  : 'Select a category to explore our windows, doors, enclosures and façade systems.'
                }
              </p>
            </motion.div>

            {/* Filter chips */}
            <div className="flex flex-wrap gap-2 mb-8 sm:mb-10">
              {CATEGORIAS.map(cat => {
                const active = activeCat === cat.id
                return (
                  <button key={cat.id} onClick={() => setActiveCat(cat.id)} data-cursor="hover"
                    className="label-luxury px-4 py-2 transition-all duration-200"
                    style={{
                      fontSize: '0.55rem',
                      border: `1px solid ${active ? 'var(--color-accent)' : 'rgba(91,143,168,0.2)'}`,
                      backgroundColor: active ? 'rgba(91,143,168,0.10)' : 'transparent',
                      color: active ? 'var(--color-accent)' : 'rgba(240,237,232,0.45)',
                    }}>
                    {lang === 'es' ? cat.label : cat.labelEN}
                  </button>
                )
              })}
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
              {filtered.map((s, i) => (
                <motion.button
                  key={s.id}
                  onClick={() => navigate(`/sistemas/${s.slug}`)}
                  data-cursor="hover"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: i * 0.05 }}
                  className="text-left group"
                  style={{
                    border: '1px solid rgba(91,143,168,0.15)',
                    backgroundColor: 'var(--color-bg-card)',
                  }}
                >
                  <div className="overflow-hidden" style={{ aspectRatio: '4 / 3' }}>
                    <img
                      src={s.imagen}
                      alt={s.nombre}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      style={{ opacity: 0.9 }}
                      loading="lazy"
                    />
                  </div>
                  <div className="p-4 sm:p-5 flex flex-col gap-2">
                    <p className="label-luxury"
                      style={{ fontSize: '0.48rem', color: 'rgba(91,143,168,0.65)' }}>
                      {s.material?.toUpperCase()} · {s.categoria?.toUpperCase()}
                    </p>
                    <p className="display-heading text-text"
                      style={{ fontSize: '0.95rem', letterSpacing: '0.05em', lineHeight: 1.2 }}>
                      {s.nombre}
                    </p>
                    <p className="font-sans font-light mt-1 text-text/50"
                      style={{ fontSize: '0.72rem', lineHeight: 1.6 }}>
                      {s.descripcion?.slice(0, 90)}{s.descripcion?.length > 90 ? '…' : ''}
                    </p>
                    <div className="flex items-center gap-2 mt-3 pt-3"
                      style={{ borderTop: '1px solid rgba(91,143,168,0.1)' }}>
                      {s.caracteristicas?.clasificacion_termica && (
                        <span className="label-luxury px-2 py-0.5"
                          style={{ fontSize: '0.42rem', color: 'var(--color-accent)', border: '1px solid rgba(91,143,168,0.3)' }}>
                          {s.caracteristicas.clasificacion_termica}
                        </span>
                      )}
                      {s.caracteristicas?.rotura_puente_termico && (
                        <span className="label-luxury"
                          style={{ fontSize: '0.42rem', color: 'rgba(240,237,232,0.35)' }}>
                          {lang === 'es' ? 'RPT' : 'THERMAL BREAK'}
                        </span>
                      )}
                      <span className="ml-auto label-luxury"
                        style={{ fontSize: '0.5rem', color: 'var(--color-accent)' }}>
                        {lang === 'es' ? 'VER FICHA →' : 'VIEW DETAIL →'}
                      </span>
                    </div>
                  </div>
                </motion.button>
              ))}
            </div>

            {filtered.length === 0 && (
              <div className="py-16 text-center">
                <p className="label-luxury" style={{ color: 'rgba(240,237,232,0.35)' }}>
                  {lang === 'es' ? 'No hay sistemas en esta categoría' : 'No systems in this category'}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </PageTransition>
  )
}
