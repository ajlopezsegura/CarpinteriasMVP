import { useMemo, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, Check } from 'lucide-react'
import PageTransition from '../components/layout/PageTransition'
import LangToggle from '../components/ui/LangToggle'
import { useProject } from '../context/ProjectContext'
import { useLang } from '../context/LangContext'
import { useSession } from '../context/SessionContext'
import { supabase } from '../lib/supabase'

const PROJECT_SLUG = import.meta.env.VITE_PROJECT_SLUG ?? 'luminal'

const labelSty = { fontSize: '0.5rem', letterSpacing: '0.2em', color: 'rgba(91,143,168,0.55)' }

function fieldStyle(hasError) {
  return {
    width: '100%', backgroundColor: 'transparent', border: 'none',
    borderBottom: `1px solid ${hasError ? 'rgba(220,70,70,0.6)' : 'rgba(91,143,168,0.28)'}`,
    color: 'var(--color-text)', fontSize: '0.8rem', padding: '8px 0 6px',
    outline: 'none', fontFamily: 'inherit', transition: 'border-color 0.2s',
  }
}

function Field({ label, error, children }) {
  return (
    <div className="flex flex-col gap-1">
      <span className="label-luxury"
        style={{ fontSize: '0.44rem', letterSpacing: '0.15em', color: 'rgba(91,143,168,0.55)' }}>
        {label}
      </span>
      {children}
      {error && (
        <span style={{ fontSize: '0.48rem', color: 'rgba(220,70,70,0.75)', fontFamily: 'inherit' }}>
          {error}
        </span>
      )}
    </div>
  )
}

export default function ContactPage() {
  const navigate                  = useNavigate()
  const { sistemas }              = useProject()
  const { lang }                  = useLang()
  const { trail, markConverted }  = useSession()

  const ctx = useMemo(() => {
    try { return JSON.parse(localStorage.getItem('lum_lead_context') ?? 'null') }
    catch { return null }
  }, [])

  const [fields, setFields] = useState({
    nombre: '', telefono: '', email: '',
    sistema: ctx?.sistema_slug ?? '',
    mensaje: '',
  })
  const [consent,    setConsent]    = useState(false)
  const [errors,     setErrors]     = useState({})
  const [submitting, setSubmitting] = useState(false)
  const [submitted,  setSubmitted]  = useState(false)

  const setField = (k, v) => {
    setFields(f => ({ ...f, [k]: v }))
    if (errors[k]) setErrors(e => ({ ...e, [k]: null }))
  }

  function validate() {
    const errs = {}
    const t = (es, en) => lang === 'es' ? es : en
    if (!fields.nombre.trim())   errs.nombre   = t('Campo obligatorio', 'Required field')
    if (!fields.telefono.trim()) errs.telefono = t('Campo obligatorio', 'Required field')
    else if (fields.telefono.replace(/\D/g, '').length < 7) errs.telefono = t('Teléfono no válido', 'Invalid phone')
    if (!fields.email.trim())    errs.email    = t('Campo obligatorio', 'Required field')
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email)) errs.email = t('Email no válido', 'Invalid email')
    if (!consent) errs.consent = t('Debes aceptar la política de privacidad', 'You must accept the privacy policy')
    return errs
  }

  async function handleSubmit(e) {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length > 0) { setErrors(errs); return }

    setSubmitting(true)

    const payload = {
      project_slug: PROJECT_SLUG,
      nombre:       fields.nombre.trim(),
      telefono:     fields.telefono.trim(),
      email:        fields.email.trim(),
      sistema:      fields.sistema || null,
      mensaje:      fields.mensaje.trim() || null,
      session_trail: trail,
      source:        ctx?.source ?? 'direct',
    }

    try {
      const { error } = await supabase.from('leads').insert(payload)
      if (error) console.error('[Luminal] Lead insert error:', error.message)
      else markConverted()
    } catch (err) {
      console.warn('[Luminal] Could not save lead:', err?.message)
    }

    setSubmitting(false)
    setSubmitted(true)
  }

  const sistemaCtx = ctx?.sistema_nombre
  const backPath   = ctx?.back_path ?? '/sistemas'

  return (
    <PageTransition>
      <div className="absolute inset-0 flex flex-col overflow-hidden"
        style={{ backgroundColor: 'var(--color-bg)' }}>

        {/* Header */}
        <div className="flex-shrink-0 flex items-center justify-between px-6 sm:px-10 py-4"
          style={{ borderBottom: '1px solid rgba(91,143,168,0.12)' }}>
          <button onClick={() => navigate(backPath)} data-cursor="hover"
            className="flex items-center gap-2 label-luxury transition-colors duration-300"
            style={{ color: 'rgba(240,237,232,0.45)', fontSize: '0.6rem' }}
            onMouseEnter={e => e.currentTarget.style.color = 'var(--color-accent)'}
            onMouseLeave={e => e.currentTarget.style.color = 'rgba(240,237,232,0.45)'}>
            <ChevronLeft size={14} />
            {lang === 'es' ? 'Volver' : 'Back'}
          </button>
          <span className="label-luxury text-text/40 hidden sm:block" style={{ fontSize: '0.55rem' }}>
            LUMINAL · {lang === 'es' ? 'PRESUPUESTO' : 'QUOTE'}
          </span>
          <LangToggle />
        </div>

        {/* Body */}
        <div className="flex-1 min-h-0 overflow-y-auto pb-20">
          <div className="max-w-xl mx-auto px-6 sm:px-10 py-10">

            <AnimatePresence mode="wait">
              {submitted ? (
                <motion.div key="success"
                  initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }} transition={{ duration: 0.4 }}
                  className="flex flex-col gap-6">
                  <div className="flex items-start gap-4">
                    <div className="flex items-center justify-center flex-shrink-0"
                      style={{ width: 38, height: 38, border: '1px solid var(--color-accent)' }}>
                      <Check size={16} style={{ color: 'var(--color-accent)' }} />
                    </div>
                    <div>
                      <p className="display-heading text-text"
                        style={{ fontSize: 'clamp(1rem, 2vw, 1.3rem)', letterSpacing: '0.08em' }}>
                        {lang === 'es' ? 'SOLICITUD ENVIADA' : 'REQUEST SENT'}
                      </p>
                      <p className="label-luxury mt-1" style={{ fontSize: '0.5rem', color: 'rgba(91,143,168,0.55)' }}>
                        {lang === 'es' ? 'Te contactaremos en breve' : "We'll be in touch shortly"}
                      </p>
                    </div>
                  </div>
                  <p className="font-sans font-light text-text/55"
                    style={{ fontSize: '0.85rem', lineHeight: 1.85 }}>
                    {lang === 'es'
                      ? 'Hemos recibido tu solicitud de presupuesto. Nuestro equipo revisará el caso y se pondrá en contacto en un máximo de 24 horas laborables.'
                      : 'We have received your quote request. Our team will review the case and contact you within 24 business hours.'}
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3 pt-2">
                    <button onClick={() => navigate('/')} data-cursor="hover"
                      className="flex-1 label-luxury py-3.5 flex items-center justify-center transition-all duration-300"
                      style={{ border: '1px solid rgba(91,143,168,0.3)', color: 'rgba(91,143,168,0.7)', fontSize: '0.55rem' }}>
                      ← {lang === 'es' ? 'INICIO' : 'HOME'}
                    </button>
                    <button onClick={() => navigate('/sistemas')} data-cursor="hover"
                      className="flex-1 label-luxury py-3.5 flex items-center justify-center transition-all duration-300"
                      style={{ border: '1px solid rgba(91,143,168,0.15)', color: 'rgba(240,237,232,0.5)', fontSize: '0.55rem' }}>
                      {lang === 'es' ? 'VER SISTEMAS →' : 'VIEW SYSTEMS →'}
                    </button>
                  </div>
                </motion.div>
              ) : (
                <motion.div key="form"
                  initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                  className="flex flex-col gap-7">

                  <div>
                    <p className="label-luxury mb-2" style={labelSty}>
                      {lang === 'es' ? 'SOLICITAR PRESUPUESTO' : 'REQUEST QUOTE'}
                    </p>
                    <h1 className="display-heading text-text"
                      style={{ fontSize: 'clamp(1.3rem, 4vw, 1.9rem)', letterSpacing: '0.06em' }}>
                      {lang === 'es' ? 'CUÉNTANOS TU PROYECTO' : 'TELL US ABOUT YOUR PROJECT'}
                    </h1>
                    {sistemaCtx && (
                      <p className="label-luxury mt-3"
                        style={{ fontSize: '0.55rem', color: 'var(--color-accent)' }}>
                        {lang === 'es' ? 'Sobre: ' : 'About: '}{sistemaCtx}
                      </p>
                    )}
                  </div>

                  <form onSubmit={handleSubmit} className="flex flex-col gap-5" noValidate>
                    <Field label={lang === 'es' ? 'NOMBRE *' : 'NAME *'} error={errors.nombre}>
                      <input type="text" value={fields.nombre}
                        onChange={e => setField('nombre', e.target.value)}
                        placeholder={lang === 'es' ? 'Tu nombre completo' : 'Your full name'}
                        style={fieldStyle(!!errors.nombre)} />
                    </Field>

                    <Field label={lang === 'es' ? 'TELÉFONO *' : 'PHONE *'} error={errors.telefono}>
                      <input type="tel" value={fields.telefono}
                        onChange={e => setField('telefono', e.target.value)}
                        placeholder="+34 600 000 000"
                        style={fieldStyle(!!errors.telefono)} />
                    </Field>

                    <Field label="EMAIL *" error={errors.email}>
                      <input type="email" value={fields.email}
                        onChange={e => setField('email', e.target.value)}
                        placeholder={lang === 'es' ? 'tu@email.com' : 'your@email.com'}
                        style={fieldStyle(!!errors.email)} />
                    </Field>

                    <Field label={lang === 'es' ? 'SISTEMA DE INTERÉS' : 'SYSTEM OF INTEREST'} error={null}>
                      <select value={fields.sistema}
                        onChange={e => setField('sistema', e.target.value)}
                        style={{
                          ...fieldStyle(false),
                          appearance: 'none',
                          backgroundImage: 'linear-gradient(45deg, transparent 50%, rgba(91,143,168,0.6) 50%), linear-gradient(135deg, rgba(91,143,168,0.6) 50%, transparent 50%)',
                          backgroundPosition: 'calc(100% - 14px) calc(50%), calc(100% - 9px) calc(50%)',
                          backgroundSize: '5px 5px, 5px 5px',
                          backgroundRepeat: 'no-repeat',
                          paddingRight: 24,
                        }}>
                        <option value="" style={{ backgroundColor: 'var(--color-bg-card)' }}>
                          {lang === 'es' ? '— Sin especificar —' : '— Not specified —'}
                        </option>
                        {sistemas.map(s => (
                          <option key={s.slug} value={s.slug} style={{ backgroundColor: 'var(--color-bg-card)' }}>
                            {s.nombre}
                          </option>
                        ))}
                      </select>
                    </Field>

                    <Field label={lang === 'es' ? 'MENSAJE (OPCIONAL)' : 'MESSAGE (OPTIONAL)'} error={null}>
                      <textarea value={fields.mensaje}
                        onChange={e => setField('mensaje', e.target.value)}
                        placeholder={lang === 'es'
                          ? 'Describe tu proyecto: tipo de vivienda, superficie estimada, plazos...'
                          : 'Describe your project: property type, estimated area, timeline...'}
                        rows={4}
                        style={{
                          width: '100%', backgroundColor: 'transparent', resize: 'none', outline: 'none',
                          border: '1px solid rgba(91,143,168,0.18)', color: 'var(--color-text)',
                          fontSize: '0.78rem', padding: '10px', lineHeight: 1.7, fontFamily: 'inherit',
                        }} />
                    </Field>

                    <div className="flex flex-col gap-1.5">
                      <label className="flex items-start gap-3" style={{ userSelect: 'none' }}>
                        <input
                          type="checkbox"
                          checked={consent}
                          onChange={e => {
                            setConsent(e.target.checked)
                            if (errors.consent) setErrors(er => ({ ...er, consent: null }))
                          }}
                          style={{
                            flexShrink: 0, marginTop: 2,
                            width: 14, height: 14,
                            accentColor: 'var(--color-accent)',
                          }}
                        />
                        <span className="font-sans font-light"
                          style={{ fontSize: '0.75rem', color: 'rgba(240,237,232,0.5)', lineHeight: 1.6 }}>
                          {lang === 'es' ? (
                            <>He leído y acepto la{' '}
                              <Link to="/privacy" className="underline" style={{ color: 'rgba(91,143,168,0.8)' }}>
                                política de privacidad
                              </Link>
                            </>
                          ) : (
                            <>I have read and accept the{' '}
                              <Link to="/privacy" className="underline" style={{ color: 'rgba(91,143,168,0.8)' }}>
                                privacy policy
                              </Link>
                            </>
                          )}
                        </span>
                      </label>
                      {errors.consent && (
                        <span style={{ fontSize: '0.48rem', color: 'rgba(220,70,70,0.75)' }}>{errors.consent}</span>
                      )}
                    </div>

                    <button type="submit" data-cursor="hover" disabled={submitting}
                      className="w-full label-luxury py-4 flex items-center justify-center gap-2 transition-opacity duration-200"
                      style={{
                        backgroundColor: 'var(--color-accent)',
                        color: 'var(--color-bg)',
                        fontSize: '0.6rem',
                        letterSpacing: '0.2em',
                        opacity: submitting ? 0.6 : 1,
                      }}>
                      {submitting
                        ? (lang === 'es' ? 'ENVIANDO...' : 'SENDING...')
                        : (lang === 'es' ? 'ENVIAR SOLICITUD' : 'SEND REQUEST')
                      }
                    </button>
                  </form>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </PageTransition>
  )
}
