import { useMemo } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ChevronLeft, Check, Clock, Circle, MapPin, User, Package } from 'lucide-react'
import PageTransition from '../components/layout/PageTransition'
import LangToggle from '../components/ui/LangToggle'
import { useProject } from '../context/ProjectContext'
import { useLang } from '../context/LangContext'

function formatDate(iso, lang) {
  if (!iso) return '—'
  const d = new Date(iso)
  return d.toLocaleDateString(lang === 'es' ? 'es-ES' : 'en-GB', {
    day: '2-digit', month: 'short', year: 'numeric',
  })
}

function ProgressRing({ percent }) {
  const size    = 160
  const stroke  = 6
  const radius  = (size - stroke) / 2
  const circ    = 2 * Math.PI * radius
  const offset  = circ - (percent / 100) * circ

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg width={size} height={size} style={{ transform: 'rotate(-90deg)' }}>
        <circle cx={size / 2} cy={size / 2} r={radius}
          fill="none" stroke="rgba(91,143,168,0.15)" strokeWidth={stroke} />
        <motion.circle cx={size / 2} cy={size / 2} r={radius}
          fill="none" stroke="var(--color-accent)" strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={circ}
          initial={{ strokeDashoffset: circ }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 1.4, ease: [0.43, 0.13, 0.23, 0.96] }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <p className="display-heading"
          style={{ fontSize: '2.2rem', color: 'var(--color-text)', letterSpacing: '0.02em' }}>
          {percent}<span style={{ fontSize: '1.1rem', color: 'var(--color-accent)' }}>%</span>
        </p>
      </div>
    </div>
  )
}

export default function ObraPage() {
  const { codigo } = useParams()
  const navigate   = useNavigate()
  const { obras }  = useProject()
  const { lang }   = useLang()

  const obra = useMemo(
    () => obras.find(o => o.codigo?.toUpperCase() === codigo?.toUpperCase()),
    [obras, codigo]
  )

  if (!obra) {
    return (
      <PageTransition>
        <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center"
          style={{ backgroundColor: 'var(--color-bg)' }}>
          <p className="label-luxury mb-2"
            style={{ fontSize: '0.6rem', letterSpacing: '0.22em', color: 'rgba(91,143,168,0.65)' }}>
            {lang === 'es' ? 'CÓDIGO NO ENCONTRADO' : 'CODE NOT FOUND'}
          </p>
          <h1 className="display-heading text-text mb-6"
            style={{ fontSize: 'clamp(1.2rem, 4vw, 1.8rem)' }}>
            {codigo}
          </h1>
          <p className="font-sans font-light text-text/55 mb-8 max-w-md"
            style={{ fontSize: '0.85rem', lineHeight: 1.7 }}>
            {lang === 'es'
              ? 'No encontramos ninguna obra con este código. Verifica el código o contacta con nosotros.'
              : "We couldn't find a project with this code. Check the code or contact us."}
          </p>
          <div className="flex gap-3">
            <button onClick={() => navigate('/')} data-cursor="hover"
              className="label-luxury px-5 py-3 transition-all duration-300"
              style={{ border: '1px solid rgba(91,143,168,0.35)', color: 'rgba(91,143,168,0.75)', fontSize: '0.58rem' }}>
              ← {lang === 'es' ? 'INICIO' : 'HOME'}
            </button>
            <button onClick={() => navigate('/contacto')} data-cursor="hover"
              className="label-luxury px-5 py-3 transition-all duration-300"
              style={{ backgroundColor: 'var(--color-accent)', color: 'var(--color-bg)', fontSize: '0.58rem' }}>
              {lang === 'es' ? 'CONTACTAR →' : 'CONTACT →'}
            </button>
          </div>
        </div>
      </PageTransition>
    )
  }

  const totalFases      = obra.fases.length
  const completadas     = obra.fases.filter(f => f.estado === 'completada').length
  const enCurso         = obra.fases.filter(f => f.estado === 'en_curso').length > 0
  const percent         = Math.round(((completadas + (enCurso ? 0.5 : 0)) / totalFases) * 100)
  const faseActualObj   = obra.fases[obra.fase_actual] ?? null
  const finalizado      = percent === 100

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
            {lang === 'es' ? 'OBRA' : 'PROJECT'} · {obra.codigo}
          </span>
          <LangToggle />
        </div>

        {/* Body */}
        <div className="flex-1 min-h-0 overflow-y-auto pb-20">
          <div className="max-w-5xl mx-auto px-6 sm:px-10 py-10">

            {/* Top: codigo + cliente + progress */}
            <motion.div
              initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col lg:flex-row items-start lg:items-center gap-8 lg:gap-12 mb-10">
              <div className="flex-1">
                <p className="label-luxury mb-2"
                  style={{ fontSize: '0.5rem', letterSpacing: '0.22em', color: 'rgba(91,143,168,0.65)' }}>
                  {lang === 'es' ? 'CÓDIGO DE OBRA' : 'PROJECT CODE'}
                </p>
                <h1 className="display-heading text-text mb-4"
                  style={{ fontSize: 'clamp(1.8rem, 5vw, 2.8rem)', letterSpacing: '0.08em' }}>
                  {obra.codigo}
                </h1>
                <p className="label-luxury"
                  style={{ fontSize: '0.6rem', color: 'var(--color-accent)', letterSpacing: '0.15em' }}>
                  {finalizado
                    ? (lang === 'es' ? '● FINALIZADA' : '● COMPLETED')
                    : (lang === 'es' ? `● EN CURSO · ${faseActualObj?.nombre?.toUpperCase()}` : `● IN PROGRESS · ${faseActualObj?.nombre?.toUpperCase()}`)
                  }
                </p>
              </div>
              <div className="flex-shrink-0">
                <ProgressRing percent={percent} />
              </div>
            </motion.div>

            {/* Info cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
              <motion.div
                initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.15 }}
                className="p-5"
                style={{ border: '1px solid rgba(91,143,168,0.15)', backgroundColor: 'var(--color-bg-card)' }}>
                <div className="flex items-center gap-2 mb-2" style={{ color: 'var(--color-accent)' }}>
                  <User size={13} />
                  <p className="label-luxury" style={{ fontSize: '0.48rem', letterSpacing: '0.2em' }}>
                    {lang === 'es' ? 'CLIENTE' : 'CLIENT'}
                  </p>
                </div>
                <p className="font-sans text-text"
                  style={{ fontSize: '0.88rem', lineHeight: 1.5 }}>
                  {obra.cliente}
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.22 }}
                className="p-5"
                style={{ border: '1px solid rgba(91,143,168,0.15)', backgroundColor: 'var(--color-bg-card)' }}>
                <div className="flex items-center gap-2 mb-2" style={{ color: 'var(--color-accent)' }}>
                  <MapPin size={13} />
                  <p className="label-luxury" style={{ fontSize: '0.48rem', letterSpacing: '0.2em' }}>
                    {lang === 'es' ? 'DIRECCIÓN' : 'ADDRESS'}
                  </p>
                </div>
                <p className="font-sans text-text/80"
                  style={{ fontSize: '0.8rem', lineHeight: 1.5 }}>
                  {obra.direccion}
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.29 }}
                className="p-5"
                style={{ border: '1px solid rgba(91,143,168,0.15)', backgroundColor: 'var(--color-bg-card)' }}>
                <div className="flex items-center gap-2 mb-2" style={{ color: 'var(--color-accent)' }}>
                  <Package size={13} />
                  <p className="label-luxury" style={{ fontSize: '0.48rem', letterSpacing: '0.2em' }}>
                    {lang === 'es' ? 'SISTEMAS' : 'SYSTEMS'}
                  </p>
                </div>
                <ul className="flex flex-col gap-1">
                  {obra.sistemas.map(s => (
                    <li key={s} className="font-sans text-text/80"
                      style={{ fontSize: '0.75rem', lineHeight: 1.4 }}>
                      · {s}
                    </li>
                  ))}
                </ul>
              </motion.div>
            </div>

            {/* Descripción */}
            {obra.descripcion && (
              <motion.div
                initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.35 }}
                className="mb-10">
                <p className="label-luxury mb-3"
                  style={{ fontSize: '0.5rem', color: 'rgba(91,143,168,0.65)', letterSpacing: '0.2em' }}>
                  {lang === 'es' ? 'DESCRIPCIÓN' : 'DESCRIPTION'}
                </p>
                <p className="font-sans font-light text-text/65"
                  style={{ fontSize: '0.88rem', lineHeight: 1.85, maxWidth: 720 }}>
                  {obra.descripcion}
                </p>
              </motion.div>
            )}

            {/* Timeline de fases */}
            <div>
              <p className="label-luxury mb-5"
                style={{ fontSize: '0.5rem', color: 'rgba(91,143,168,0.65)', letterSpacing: '0.2em' }}>
                {lang === 'es' ? 'FASES DEL PROYECTO' : 'PROJECT PHASES'}
              </p>
              <div className="flex flex-col">
                {obra.fases.map((f, i) => {
                  const isCompletada = f.estado === 'completada'
                  const isEnCurso    = f.estado === 'en_curso'
                  const isUltima     = i === obra.fases.length - 1

                  return (
                    <motion.div key={f.nombre}
                      initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: 0.1 * i }}
                      className="relative flex items-start gap-4 py-4"
                      style={{ borderTop: i === 0 ? 'none' : '1px solid rgba(91,143,168,0.1)' }}>

                      {/* Status icon */}
                      <div className="relative flex-shrink-0 flex items-center justify-center"
                        style={{ width: 32, height: 32 }}>
                        {isCompletada && (
                          <div className="flex items-center justify-center"
                            style={{
                              width: 28, height: 28, borderRadius: '50%',
                              backgroundColor: 'var(--color-accent)',
                              color: 'var(--color-bg)',
                            }}>
                            <Check size={15} strokeWidth={3} />
                          </div>
                        )}
                        {isEnCurso && (
                          <div className="flex items-center justify-center relative"
                            style={{
                              width: 28, height: 28, borderRadius: '50%',
                              border: '2px solid var(--color-accent)',
                              color: 'var(--color-accent)',
                            }}>
                            <Clock size={13} />
                            <motion.div
                              className="absolute inset-0 rounded-full"
                              style={{ border: '2px solid var(--color-accent)', borderRadius: '50%' }}
                              animate={{ opacity: [0.6, 0.1, 0.6], scale: [1, 1.25, 1] }}
                              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                            />
                          </div>
                        )}
                        {!isCompletada && !isEnCurso && (
                          <Circle size={28} style={{ color: 'rgba(91,143,168,0.25)' }} />
                        )}
                        {/* vertical connector */}
                        {!isUltima && (
                          <div
                            className="absolute left-1/2 -translate-x-1/2"
                            style={{
                              top: 32, bottom: -16, width: 1,
                              backgroundColor: isCompletada ? 'rgba(91,143,168,0.45)' : 'rgba(91,143,168,0.12)',
                            }}
                          />
                        )}
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0 flex items-start justify-between gap-3">
                        <div>
                          <p className="display-heading"
                            style={{
                              fontSize: '0.95rem', letterSpacing: '0.04em',
                              color: isCompletada || isEnCurso ? 'var(--color-text)' : 'rgba(240,237,232,0.35)',
                            }}>
                            {f.nombre}
                          </p>
                          {f.nota && (
                            <p className="font-sans font-light text-text/50 mt-1"
                              style={{ fontSize: '0.72rem', lineHeight: 1.55 }}>
                              {f.nota}
                            </p>
                          )}
                        </div>
                        <p className="label-luxury flex-shrink-0"
                          style={{
                            fontSize: '0.5rem', letterSpacing: '0.15em',
                            color: isCompletada ? 'var(--color-accent)'
                                 : isEnCurso    ? 'var(--color-accent)'
                                 : 'rgba(240,237,232,0.3)',
                          }}>
                          {isEnCurso
                            ? (lang === 'es' ? 'EN CURSO' : 'IN PROGRESS')
                            : formatDate(f.fecha, lang).toUpperCase()
                          }
                        </p>
                      </div>
                    </motion.div>
                  )
                })}
              </div>
            </div>

            {/* Footer note */}
            <div className="mt-12 pt-6"
              style={{ borderTop: '1px solid rgba(91,143,168,0.12)' }}>
              <p className="label-luxury text-center"
                style={{ fontSize: '0.55rem', color: 'rgba(240,237,232,0.4)', letterSpacing: '0.15em', lineHeight: 1.7 }}>
                {lang === 'es'
                  ? '¿TIENES ALGUNA DUDA SOBRE EL PROGRESO DE LA OBRA?'
                  : 'QUESTIONS ABOUT THE PROGRESS?'}
              </p>
              <div className="flex justify-center mt-4">
                <button onClick={() => navigate('/contacto')} data-cursor="hover"
                  className="label-luxury px-5 py-3 transition-all duration-300"
                  style={{ border: '1px solid rgba(91,143,168,0.35)', color: 'rgba(91,143,168,0.75)', fontSize: '0.58rem' }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--color-accent)'; e.currentTarget.style.color = 'var(--color-accent)' }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(91,143,168,0.35)'; e.currentTarget.style.color = 'rgba(91,143,168,0.75)' }}>
                  {lang === 'es' ? 'CONTACTAR CON LUMINAL →' : 'CONTACT LUMINAL →'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageTransition>
  )
}
