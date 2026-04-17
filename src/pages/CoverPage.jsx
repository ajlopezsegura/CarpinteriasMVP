import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import PageTransition from '../components/layout/PageTransition'
import LangToggle from '../components/ui/LangToggle'
import { useProject } from '../context/ProjectContext'
import { useLang } from '../context/LangContext'

export default function CoverPage() {
  const navigate     = useNavigate()
  const { empresa }  = useProject()
  const { lang }     = useLang()
  const [codigo, setCodigo]   = useState('')
  const [showObra, setShowObra] = useState(false)
  const [error,   setError]   = useState('')

  const slogan  = lang === 'es' ? empresa.slogan  : empresa.sloganEN
  const tagline = lang === 'es' ? empresa.tagline : empresa.taglineEN

  function handleObraSubmit(e) {
    e.preventDefault()
    const c = codigo.trim().toUpperCase()
    if (!c) { setError(lang === 'es' ? 'Introduce un código' : 'Enter a code'); return }
    navigate(`/obra/${c}`)
  }

  return (
    <PageTransition>
      <div className="absolute inset-0 overflow-hidden"
        style={{
          background: 'linear-gradient(160deg, #141A24 0%, #1E2530 50%, #2A3444 100%)',
        }}>

        {/* Language toggle */}
        <div className="absolute top-4 right-4 sm:top-6 sm:right-6 z-10">
          <LangToggle />
        </div>

        {/* Gradient overlay pattern */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse at 70% 30%, rgba(91,143,168,0.10) 0%, transparent 60%)',
          }}
        />

        {/* Content — centered */}
        <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center">

          <motion.p
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.0, delay: 0.3, ease: [0.43, 0.13, 0.23, 0.96] }}
            className="label-luxury mb-8 sm:mb-12"
            style={{
              color: 'rgba(91,143,168,0.9)',
              fontSize: 'clamp(0.48rem, 2vw, 0.6rem)',
              letterSpacing: 'clamp(0.14em, 0.8vw, 0.28em)',
              fontWeight: 700,
            }}
          >
            CARPINTERÍA DE ALUMINIO · PVC
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.6, ease: [0.43, 0.13, 0.23, 0.96] }}
            className="display-heading text-text"
            style={{ fontSize: 'clamp(3rem, 12vw, 9rem)', letterSpacing: 'clamp(0.06em, 2vw, 0.18em)', lineHeight: 1 }}
          >
            LUMINAL
          </motion.h1>

          <motion.div
            initial={{ width: 0 }}
            animate={{ width: 56 }}
            transition={{ duration: 0.9, delay: 1.3, ease: [0.43, 0.13, 0.23, 0.96] }}
            className="h-px my-6 sm:my-8"
            style={{ backgroundColor: 'var(--color-accent)' }}
          />

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.6 }}
            className="label-luxury text-text/60"
            style={{ fontSize: '0.65rem', letterSpacing: '0.22em', maxWidth: 520 }}
          >
            {tagline}
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 2.0 }}
            className="mt-12 sm:mt-16 flex flex-col sm:flex-row gap-3 sm:gap-4"
          >
            <button
              onClick={() => navigate('/sistemas')}
              data-cursor="hover"
              className="label-luxury border transition-all duration-700 min-h-[44px] px-8 flex items-center justify-center gap-3"
              style={{
                borderColor: 'var(--color-accent)',
                color: 'var(--color-bg)',
                backgroundColor: 'var(--color-accent)',
                fontSize: '0.6rem',
              }}
              onMouseEnter={e => { e.currentTarget.style.backgroundColor = 'var(--color-accent-light)' }}
              onMouseLeave={e => { e.currentTarget.style.backgroundColor = 'var(--color-accent)' }}
            >
              {lang === 'es' ? 'VER SISTEMAS' : 'VIEW SYSTEMS'}
              <motion.span
                animate={{ x: [0, 4, 0] }}
                transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
                style={{ display: 'inline-block' }}
              >
                →
              </motion.span>
            </button>

            <button
              onClick={() => navigate('/contacto')}
              data-cursor="hover"
              className="label-luxury border transition-all duration-700 min-h-[44px] px-8 flex items-center justify-center gap-3"
              style={{
                borderColor: 'rgba(91,143,168,0.45)',
                color: 'var(--color-text)',
                fontSize: '0.6rem',
              }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--color-accent)'; e.currentTarget.style.backgroundColor = 'rgba(91,143,168,0.10)' }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(91,143,168,0.45)'; e.currentTarget.style.backgroundColor = 'transparent' }}
            >
              {lang === 'es' ? 'PRESUPUESTO' : 'GET QUOTE'}
            </button>
          </motion.div>

          {/* Access by obra code (hidden toggle) */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 2.4 }}
            className="mt-12 sm:mt-16"
          >
            {!showObra ? (
              <button
                onClick={() => setShowObra(true)}
                data-cursor="hover"
                className="label-luxury transition-colors duration-300"
                style={{ color: 'rgba(240,237,232,0.30)', fontSize: '0.5rem', letterSpacing: '0.22em' }}
                onMouseEnter={e => e.currentTarget.style.color = 'var(--color-accent)'}
                onMouseLeave={e => e.currentTarget.style.color = 'rgba(240,237,232,0.30)'}
              >
                {lang === 'es' ? '¿ERES CLIENTE? SEGUIMIENTO DE OBRA →' : 'CLIENT? PROJECT TRACKING →'}
              </button>
            ) : (
              <form onSubmit={handleObraSubmit} className="flex flex-col items-center gap-3">
                <p className="label-luxury" style={{ color: 'rgba(91,143,168,0.8)', fontSize: '0.5rem', letterSpacing: '0.22em' }}>
                  {lang === 'es' ? 'CÓDIGO DE OBRA' : 'PROJECT CODE'}
                </p>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={codigo}
                    onChange={e => { setCodigo(e.target.value); setError('') }}
                    placeholder="MTZ001"
                    autoFocus
                    style={{
                      backgroundColor: 'transparent',
                      border: '1px solid rgba(91,143,168,0.35)',
                      color: 'var(--color-text)',
                      fontSize: '0.85rem',
                      letterSpacing: '0.15em',
                      padding: '10px 14px',
                      outline: 'none',
                      width: 140,
                      textAlign: 'center',
                      fontFamily: 'inherit',
                      textTransform: 'uppercase',
                    }}
                  />
                  <button type="submit" data-cursor="hover"
                    className="label-luxury px-4 transition-all duration-300"
                    style={{
                      border: '1px solid var(--color-accent)',
                      color: 'var(--color-accent)',
                      fontSize: '0.55rem',
                    }}
                    onMouseEnter={e => { e.currentTarget.style.backgroundColor = 'var(--color-accent)'; e.currentTarget.style.color = 'var(--color-bg)' }}
                    onMouseLeave={e => { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.color = 'var(--color-accent)' }}>
                    →
                  </button>
                </div>
                {error && (
                  <p style={{ fontSize: '0.55rem', color: 'rgba(220,70,70,0.75)' }}>{error}</p>
                )}
                <button
                  type="button"
                  onClick={() => { setShowObra(false); setCodigo(''); setError('') }}
                  className="label-luxury"
                  style={{ color: 'rgba(240,237,232,0.30)', fontSize: '0.5rem' }}>
                  {lang === 'es' ? 'Cancelar' : 'Cancel'}
                </button>
              </form>
            )}
          </motion.div>
        </div>

        {/* Bottom studio label */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.25 }}
          transition={{ duration: 1, delay: 2.8 }}
          className="absolute bottom-4 left-1/2 -translate-x-1/2 label-luxury text-center px-4"
          style={{
            fontSize: 'clamp(0.38rem, 1.6vw, 0.45rem)',
            letterSpacing: 'clamp(0.12em, 0.6vw, 0.25em)',
            color: 'rgba(240,237,232,0.35)',
            whiteSpace: 'nowrap',
            maxWidth: '95vw',
          }}
        >
          {slogan?.toUpperCase()}
        </motion.p>
      </div>
    </PageTransition>
  )
}
