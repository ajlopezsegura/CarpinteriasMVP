import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ChevronLeft } from 'lucide-react'
import PageTransition from '../components/layout/PageTransition'
import LangToggle from '../components/ui/LangToggle'
import { useProject } from '../context/ProjectContext'
import { useLang } from '../context/LangContext'

export default function EmpresaPage() {
  const navigate    = useNavigate()
  const { empresa } = useProject()
  const { lang }    = useLang()

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
            LUMINAL · {lang === 'es' ? 'EMPRESA' : 'COMPANY'}
          </span>
          <LangToggle />
        </div>

        {/* Body */}
        <div className="flex-1 min-h-0 overflow-y-auto pb-24">

          {/* Hero */}
          <section className="relative px-6 sm:px-10 py-12 sm:py-20 overflow-hidden"
            style={{
              background: 'linear-gradient(160deg, #141A24 0%, #1E2530 55%, #2A3444 100%)',
            }}>
            <div
              className="absolute inset-0 pointer-events-none"
              style={{ background: 'radial-gradient(ellipse at 80% 20%, rgba(91,143,168,0.12) 0%, transparent 60%)' }}
            />
            <div className="relative max-w-4xl mx-auto">
              <motion.p
                initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7 }}
                className="label-luxury mb-4"
                style={{ color: 'rgba(91,143,168,0.9)', fontSize: '0.55rem', letterSpacing: '0.28em' }}>
                {lang === 'es' ? 'QUIÉNES SOMOS' : 'WHO WE ARE'}
              </motion.p>
              <motion.h1
                initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, delay: 0.2 }}
                className="display-heading text-text"
                style={{ fontSize: 'clamp(1.8rem, 6vw, 3.4rem)', letterSpacing: '0.06em', lineHeight: 1.05 }}>
                {lang === 'es'
                  ? <>DISEÑAMOS LUZ,<br/>FABRICAMOS CONFORT.</>
                  : <>WE DESIGN LIGHT,<br/>WE BUILD COMFORT.</>}
              </motion.h1>
              <motion.div
                initial={{ width: 0 }} animate={{ width: 48 }}
                transition={{ duration: 0.8, delay: 0.8 }}
                className="h-px my-6"
                style={{ backgroundColor: 'var(--color-accent)' }}
              />
              <motion.p
                initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 1.0 }}
                className="font-sans font-light text-text/70"
                style={{ fontSize: 'clamp(0.85rem, 2vw, 1.05rem)', lineHeight: 1.8, maxWidth: 640 }}>
                {lang === 'es'
                  ? 'Somos una empresa familiar con más de dos décadas fabricando e instalando carpintería de aluminio y PVC para viviendas, comunidades y edificios singulares. Cada obra es un compromiso: eficiencia energética, estética y durabilidad.'
                  : 'We are a family business with more than two decades manufacturing and installing aluminium and PVC carpentry for homes, communities and landmark buildings. Every project is a commitment: energy efficiency, aesthetics and durability.'
                }
              </motion.p>
            </div>
          </section>

          {/* Stats */}
          <section className="px-6 sm:px-10 py-12 sm:py-16">
            <div className="max-w-5xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
              {empresa.stats.map((s, i) => (
                <motion.div key={s.label}
                  initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 * i }}
                  className="flex flex-col items-center text-center py-6"
                  style={{ borderTop: '1px solid rgba(91,143,168,0.18)' }}>
                  <p className="display-heading"
                    style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', color: 'var(--color-accent)', letterSpacing: '0.02em' }}>
                    {s.value}
                  </p>
                  <p className="label-luxury mt-3"
                    style={{ fontSize: '0.52rem', color: 'rgba(240,237,232,0.55)', letterSpacing: '0.18em' }}>
                    {lang === 'es' ? s.label : s.labelEN}
                  </p>
                </motion.div>
              ))}
            </div>
          </section>

          {/* Materiales */}
          <section className="px-6 sm:px-10 py-10 sm:py-14"
            style={{ borderTop: '1px solid rgba(91,143,168,0.12)' }}>
            <div className="max-w-5xl mx-auto">
              <p className="label-luxury mb-3"
                style={{ fontSize: '0.5rem', letterSpacing: '0.22em', color: 'rgba(91,143,168,0.65)' }}>
                {lang === 'es' ? 'TRABAJAMOS CON' : 'WE WORK WITH'}
              </p>
              <h2 className="display-heading text-text mb-10"
                style={{ fontSize: 'clamp(1.4rem, 4vw, 2rem)', letterSpacing: '0.06em' }}>
                {lang === 'es' ? 'MATERIALES' : 'MATERIALS'}
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6">
                {empresa.materiales.map((m, i) => (
                  <motion.div key={m.id}
                    initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 * i }}
                    className="p-6 sm:p-8 flex flex-col gap-3"
                    style={{
                      border: '1px solid rgba(91,143,168,0.18)',
                      backgroundColor: 'var(--color-bg-card)',
                    }}>
                    <p className="label-luxury"
                      style={{ fontSize: '0.48rem', color: 'rgba(91,143,168,0.75)', letterSpacing: '0.2em' }}>
                      0{i + 1}
                    </p>
                    <h3 className="display-heading text-text"
                      style={{ fontSize: '1.3rem', letterSpacing: '0.05em' }}>
                      {(lang === 'es' ? m.nombre : m.nombreEN)?.toUpperCase()}
                    </h3>
                    <div className="h-px w-8" style={{ backgroundColor: 'var(--color-accent)' }} />
                    <p className="font-sans font-light text-text/60"
                      style={{ fontSize: '0.8rem', lineHeight: 1.75 }}>
                      {lang === 'es' ? m.descripcion : m.descripcionEN}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* CTA final */}
          <section className="px-6 sm:px-10 py-14 sm:py-16"
            style={{ borderTop: '1px solid rgba(91,143,168,0.12)' }}>
            <div className="max-w-3xl mx-auto text-center flex flex-col items-center gap-6">
              <p className="label-luxury"
                style={{ fontSize: '0.5rem', letterSpacing: '0.22em', color: 'rgba(91,143,168,0.65)' }}>
                {lang === 'es' ? '¿TIENES UN PROYECTO EN MENTE?' : 'HAVE A PROJECT IN MIND?'}
              </p>
              <h2 className="display-heading text-text"
                style={{ fontSize: 'clamp(1.3rem, 4vw, 1.9rem)', letterSpacing: '0.05em' }}>
                {lang === 'es' ? 'HABLEMOS DE ÉL' : "LET'S TALK ABOUT IT"}
              </h2>
              <div className="flex flex-col sm:flex-row gap-3 mt-2">
                <button onClick={() => navigate('/sistemas')} data-cursor="hover"
                  className="label-luxury px-6 py-3 transition-all duration-300"
                  style={{
                    border: '1px solid rgba(91,143,168,0.45)',
                    color: 'var(--color-text)',
                    fontSize: '0.58rem',
                  }}>
                  {lang === 'es' ? 'VER SISTEMAS' : 'VIEW SYSTEMS'}
                </button>
                <button onClick={() => navigate('/contacto')} data-cursor="hover"
                  className="label-luxury px-6 py-3 transition-all duration-300"
                  style={{
                    backgroundColor: 'var(--color-accent)',
                    color: 'var(--color-bg)',
                    fontSize: '0.58rem',
                  }}>
                  {lang === 'es' ? 'SOLICITAR PRESUPUESTO →' : 'REQUEST A QUOTE →'}
                </button>
              </div>
            </div>
          </section>
        </div>
      </div>
    </PageTransition>
  )
}
