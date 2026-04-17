import { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, Lock, RefreshCw } from 'lucide-react'
import PageTransition from '../components/layout/PageTransition'
import { useProject } from '../context/ProjectContext'
import { FASES_ESTANDAR } from '../data/obras'
import { supabase, hasSupabase } from '../lib/supabase'

const ADMIN_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD ?? 'luminal2024'
const STORAGE_KEY    = 'lum_admin_auth'

function formatDateTime(iso) {
  if (!iso) return '—'
  const d = new Date(iso)
  return d.toLocaleDateString('es-ES', {
    day: '2-digit', month: '2-digit', year: 'numeric',
  }) + ' ' + d.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' })
}

// ───────────────────────────────────────────────────────────────────────────
// Login
// ───────────────────────────────────────────────────────────────────────────

function Login({ onSuccess }) {
  const [password, setPassword] = useState('')
  const [error,    setError]    = useState('')

  function handleSubmit(e) {
    e.preventDefault()
    if (password === ADMIN_PASSWORD) {
      try { sessionStorage.setItem(STORAGE_KEY, '1') } catch { /* ignore */ }
      onSuccess()
    } else {
      setError('Contraseña incorrecta')
    }
  }

  return (
    <div className="absolute inset-0 flex items-center justify-center px-6"
      style={{ backgroundColor: 'var(--color-bg)' }}>
      <form onSubmit={handleSubmit}
        className="flex flex-col items-center gap-5"
        style={{ minWidth: 260 }}>
        <div className="flex items-center justify-center"
          style={{
            width: 44, height: 44,
            border: '1px solid var(--color-accent)',
            color: 'var(--color-accent)',
          }}>
          <Lock size={18} />
        </div>
        <p className="label-luxury"
          style={{ fontSize: '0.55rem', letterSpacing: '0.22em', color: 'rgba(91,143,168,0.75)' }}>
          LUMINAL · ADMIN
        </p>
        <input type="password"
          value={password}
          onChange={e => { setPassword(e.target.value); setError('') }}
          placeholder="Contraseña"
          autoFocus
          style={{
            backgroundColor: 'transparent',
            border: '1px solid rgba(91,143,168,0.35)',
            color: 'var(--color-text)',
            fontSize: '0.85rem',
            padding: '10px 14px',
            outline: 'none',
            textAlign: 'center',
            width: 220,
            fontFamily: 'inherit',
          }} />
        {error && (
          <p style={{ fontSize: '0.55rem', color: 'rgba(220,70,70,0.85)' }}>{error}</p>
        )}
        <button type="submit"
          className="label-luxury px-6 py-3 transition-all duration-300"
          style={{
            backgroundColor: 'var(--color-accent)',
            color: 'var(--color-bg)',
            fontSize: '0.6rem',
            letterSpacing: '0.2em',
          }}>
          ENTRAR →
        </button>
      </form>
    </div>
  )
}

// ───────────────────────────────────────────────────────────────────────────
// Tab: Obras
// ───────────────────────────────────────────────────────────────────────────

function ObrasTab() {
  const { obras, setObras } = useProject()
  const [expanded, setExpanded] = useState(null)

  async function updateFase(obraId, faseIndex) {
    setObras(prev => prev.map(o => {
      if (o.id !== obraId) return o
      const newFases = o.fases.map((f, i) => ({
        ...f,
        estado: i < faseIndex ? 'completada' : i === faseIndex ? 'en_curso' : 'pendiente',
        fecha:  i <= faseIndex && !f.fecha ? new Date().toISOString() : f.fecha,
      }))
      const patch = { ...o, fase_actual: faseIndex, fases: newFases }
      if (hasSupabase) {
        supabase.from('obras').update({ fase_actual: faseIndex, fases: newFases }).eq('id', o.id)
      }
      return patch
    }))
  }

  if (obras.length === 0) {
    return <p className="label-luxury text-text/40 py-10 text-center">Sin obras registradas</p>
  }

  return (
    <div className="flex flex-col gap-3">
      {obras.map(o => {
        const isOpen   = expanded === o.id
        const percent  = Math.round((o.fases.filter(f => f.estado === 'completada').length / o.fases.length) * 100)
        const faseActN = o.fases[o.fase_actual]?.nombre ?? '—'
        return (
          <div key={o.id}
            style={{ border: '1px solid rgba(91,143,168,0.15)', backgroundColor: 'var(--color-bg-card)' }}>
            <button onClick={() => setExpanded(isOpen ? null : o.id)}
              className="w-full flex items-center justify-between gap-3 p-4 text-left">
              <div className="flex flex-col items-start gap-1 min-w-0 flex-1">
                <p className="label-luxury"
                  style={{ fontSize: '0.48rem', color: 'var(--color-accent)', letterSpacing: '0.2em' }}>
                  {o.codigo}
                </p>
                <p className="display-heading text-text truncate max-w-full"
                  style={{ fontSize: '0.9rem', letterSpacing: '0.04em' }}>
                  {o.cliente}
                </p>
                <p className="label-luxury sm:hidden mt-0.5"
                  style={{ fontSize: '0.44rem', color: 'var(--color-accent)', letterSpacing: '0.12em' }}>
                  {faseActN.toUpperCase()}
                </p>
              </div>
              <div className="flex items-center gap-3 sm:gap-5 flex-shrink-0">
                <div className="text-right hidden sm:block">
                  <p className="label-luxury" style={{ fontSize: '0.45rem', color: 'rgba(240,237,232,0.4)' }}>
                    FASE ACTUAL
                  </p>
                  <p className="label-luxury" style={{ fontSize: '0.55rem', color: 'var(--color-accent)' }}>
                    {faseActN.toUpperCase()}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <div style={{
                    width: 40, height: 4,
                    backgroundColor: 'rgba(91,143,168,0.15)',
                  }}>
                    <div style={{
                      width: `${percent}%`, height: '100%',
                      backgroundColor: 'var(--color-accent)',
                      transition: 'width 0.4s ease',
                    }} />
                  </div>
                  <p className="label-luxury"
                    style={{ fontSize: '0.55rem', color: 'var(--color-accent)', width: 30, textAlign: 'right' }}>
                    {percent}%
                  </p>
                </div>
              </div>
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.25 }}
                  style={{ overflow: 'hidden', borderTop: '1px solid rgba(91,143,168,0.1)' }}>
                  <div className="p-4 flex flex-col gap-3">
                    <div>
                      <p className="label-luxury mb-1"
                        style={{ fontSize: '0.42rem', color: 'rgba(240,237,232,0.4)' }}>
                        DIRECCIÓN
                      </p>
                      <p className="font-sans text-text/75" style={{ fontSize: '0.8rem' }}>
                        {o.direccion}
                      </p>
                    </div>
                    <div>
                      <p className="label-luxury mb-1"
                        style={{ fontSize: '0.42rem', color: 'rgba(240,237,232,0.4)' }}>
                        SISTEMAS
                      </p>
                      <p className="font-sans text-text/75" style={{ fontSize: '0.78rem' }}>
                        {o.sistemas.join(' · ')}
                      </p>
                    </div>
                    <div className="mt-2">
                      <p className="label-luxury mb-3"
                        style={{ fontSize: '0.45rem', color: 'var(--color-accent)', letterSpacing: '0.2em' }}>
                        AVANZAR FASE
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {FASES_ESTANDAR.map((nombre, i) => {
                          const active = i === o.fase_actual
                          const done   = i < o.fase_actual
                          return (
                            <button key={nombre}
                              onClick={() => updateFase(o.id, i)}
                              className="label-luxury px-3 py-2 transition-all duration-200"
                              style={{
                                fontSize: '0.5rem',
                                border: `1px solid ${active ? 'var(--color-accent)' : done ? 'rgba(91,143,168,0.3)' : 'rgba(91,143,168,0.15)'}`,
                                backgroundColor: active ? 'rgba(91,143,168,0.12)' : 'transparent',
                                color: active ? 'var(--color-accent)' : done ? 'rgba(91,143,168,0.75)' : 'rgba(240,237,232,0.4)',
                              }}>
                              {i + 1}. {nombre}
                            </button>
                          )
                        })}
                      </div>
                    </div>
                    <a href={`#/obra/${o.codigo}`} target="_blank" rel="noopener noreferrer"
                      className="label-luxury mt-3 inline-block transition-all duration-300"
                      style={{ fontSize: '0.5rem', color: 'rgba(91,143,168,0.7)' }}>
                      VER PORTAL CLIENTE →
                    </a>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )
      })}
    </div>
  )
}

// ───────────────────────────────────────────────────────────────────────────
// Tab: Presupuestos (leads)
// ───────────────────────────────────────────────────────────────────────────

function PresupuestosTab() {
  const [leads,   setLeads]   = useState([])
  const [loading, setLoading] = useState(hasSupabase)
  const [error,   setError]   = useState(null)

  useEffect(() => {
    if (!hasSupabase) { setLoading(false); return }
    load()
  }, [])

  async function load() {
    setLoading(true); setError(null)
    try {
      const { data, error } = await supabase.from('leads').select('*').order('created_at', { ascending: false })
      if (error) throw error
      setLeads(data ?? [])
    } catch (err) {
      setError(err?.message ?? 'Error')
    } finally {
      setLoading(false)
    }
  }

  if (!hasSupabase) {
    return (
      <div className="py-12 text-center">
        <p className="label-luxury mb-3" style={{ fontSize: '0.55rem', color: 'rgba(240,237,232,0.45)' }}>
          SUPABASE NO CONFIGURADO
        </p>
        <p className="font-sans text-text/50" style={{ fontSize: '0.8rem', lineHeight: 1.7, maxWidth: 480, margin: '0 auto' }}>
          Configura las variables <code style={{ color: 'var(--color-accent)' }}>VITE_SUPABASE_URL</code> y{' '}
          <code style={{ color: 'var(--color-accent)' }}>VITE_SUPABASE_PUBLISHABLE_KEY</code>{' '}
          para ver los presupuestos reales enviados desde el formulario.
        </p>
      </div>
    )
  }

  if (loading) {
    return <p className="label-luxury text-text/40 py-10 text-center">Cargando…</p>
  }

  if (error) {
    return <p className="label-luxury py-10 text-center" style={{ color: 'rgba(220,70,70,0.85)' }}>{error}</p>
  }

  if (leads.length === 0) {
    return <p className="label-luxury text-text/40 py-10 text-center">Sin presupuestos todavía</p>
  }

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between mb-2">
        <p className="label-luxury" style={{ fontSize: '0.5rem', color: 'rgba(240,237,232,0.45)' }}>
          {leads.length} {leads.length === 1 ? 'PRESUPUESTO' : 'PRESUPUESTOS'}
        </p>
        <button onClick={load}
          className="flex items-center gap-2 label-luxury transition-colors duration-300"
          style={{ fontSize: '0.5rem', color: 'rgba(91,143,168,0.7)' }}>
          <RefreshCw size={11} /> REFRESCAR
        </button>
      </div>
      {leads.map(l => (
        <div key={l.id}
          className="p-4 grid grid-cols-1 md:grid-cols-4 gap-3"
          style={{ border: '1px solid rgba(91,143,168,0.15)', backgroundColor: 'var(--color-bg-card)' }}>
          <div>
            <p className="label-luxury" style={{ fontSize: '0.42rem', color: 'rgba(240,237,232,0.35)' }}>NOMBRE</p>
            <p className="font-sans text-text" style={{ fontSize: '0.82rem' }}>{l.nombre}</p>
            <p className="font-sans text-text/55" style={{ fontSize: '0.7rem' }}>
              {formatDateTime(l.created_at)}
            </p>
          </div>
          <div>
            <p className="label-luxury" style={{ fontSize: '0.42rem', color: 'rgba(240,237,232,0.35)' }}>CONTACTO</p>
            <p className="font-sans text-text/80" style={{ fontSize: '0.75rem' }}>{l.email}</p>
            <p className="font-sans text-text/80" style={{ fontSize: '0.75rem' }}>{l.telefono}</p>
          </div>
          <div>
            <p className="label-luxury" style={{ fontSize: '0.42rem', color: 'rgba(240,237,232,0.35)' }}>SISTEMA</p>
            <p className="font-sans" style={{ fontSize: '0.75rem', color: l.sistema ? 'var(--color-accent)' : 'rgba(240,237,232,0.35)' }}>
              {l.sistema ?? '—'}
            </p>
          </div>
          <div>
            <p className="label-luxury" style={{ fontSize: '0.42rem', color: 'rgba(240,237,232,0.35)' }}>MENSAJE</p>
            <p className="font-sans text-text/70" style={{ fontSize: '0.72rem', lineHeight: 1.45 }}>
              {l.mensaje ?? '—'}
            </p>
          </div>
        </div>
      ))}
    </div>
  )
}

// ───────────────────────────────────────────────────────────────────────────
// Tab: Actividad (sessions)
// ───────────────────────────────────────────────────────────────────────────

function ActividadTab() {
  const [sessions, setSessions] = useState([])
  const [loading,  setLoading]  = useState(hasSupabase)
  const [error,    setError]    = useState(null)

  useEffect(() => {
    if (!hasSupabase) { setLoading(false); return }
    load()
  }, [])

  async function load() {
    setLoading(true); setError(null)
    try {
      const { data, error } = await supabase
        .from('page_sessions').select('*').order('updated_at', { ascending: false })
      if (error) throw error
      setSessions(data ?? [])
    } catch (err) {
      setError(err?.message ?? 'Error')
    } finally {
      setLoading(false)
    }
  }

  const stats = useMemo(() => {
    const total     = sessions.length
    const converted = sessions.filter(s => s.converted).length
    const avgPages  = total === 0 ? 0 : (sessions.reduce((a, s) => a + (s.pages_count ?? 0), 0) / total).toFixed(1)
    return { total, converted, avgPages }
  }, [sessions])

  if (!hasSupabase) {
    return (
      <div className="py-12 text-center">
        <p className="label-luxury mb-3" style={{ fontSize: '0.55rem', color: 'rgba(240,237,232,0.45)' }}>
          SUPABASE NO CONFIGURADO
        </p>
        <p className="font-sans text-text/50" style={{ fontSize: '0.8rem', lineHeight: 1.7, maxWidth: 480, margin: '0 auto' }}>
          La analítica de sesiones anónimas requiere Supabase. Sin configurar, los eventos se pierden.
        </p>
      </div>
    )
  }

  if (loading) return <p className="label-luxury text-text/40 py-10 text-center">Cargando…</p>
  if (error)   return <p className="label-luxury py-10 text-center" style={{ color: 'rgba(220,70,70,0.85)' }}>{error}</p>

  return (
    <div className="flex flex-col gap-4">
      {/* Stats */}
      <div className="grid grid-cols-3 gap-2 sm:gap-3">
        {[
          { label: 'VISITAS',         labelMobile: 'VISITAS',   value: stats.total      },
          { label: 'CONVERTIDAS',     labelMobile: 'CONV.',     value: stats.converted  },
          { label: 'PÁGINAS/VISITA',  labelMobile: 'PÁG/VIS',   value: stats.avgPages },
        ].map(s => (
          <div key={s.label} className="p-3 sm:p-4"
            style={{ border: '1px solid rgba(91,143,168,0.15)', backgroundColor: 'var(--color-bg-card)' }}>
            <p className="label-luxury"
              style={{ fontSize: 'clamp(0.38rem, 1.4vw, 0.42rem)', color: 'rgba(240,237,232,0.4)', letterSpacing: '0.12em' }}>
              <span className="hidden sm:inline">{s.label}</span>
              <span className="sm:hidden">{s.labelMobile}</span>
            </p>
            <p className="display-heading mt-1"
              style={{ fontSize: 'clamp(1rem, 3vw, 1.4rem)', color: 'var(--color-accent)' }}>
              {s.value}
            </p>
          </div>
        ))}
      </div>

      {sessions.length === 0 ? (
        <p className="label-luxury text-text/40 py-10 text-center">Sin sesiones registradas</p>
      ) : (
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between mb-1">
            <p className="label-luxury" style={{ fontSize: '0.5rem', color: 'rgba(240,237,232,0.45)' }}>
              ÚLTIMAS SESIONES
            </p>
            <button onClick={load}
              className="flex items-center gap-2 label-luxury"
              style={{ fontSize: '0.5rem', color: 'rgba(91,143,168,0.7)' }}>
              <RefreshCw size={11} /> REFRESCAR
            </button>
          </div>
          {sessions.slice(0, 50).map(s => (
            <div key={s.session_id}
              className="p-3 grid grid-cols-1 md:grid-cols-4 gap-2"
              style={{ border: '1px solid rgba(91,143,168,0.1)', backgroundColor: 'var(--color-bg-card)' }}>
              <div>
                <p className="label-luxury" style={{ fontSize: '0.4rem', color: 'rgba(240,237,232,0.35)' }}>FECHA</p>
                <p className="font-sans" style={{ fontSize: '0.72rem', color: 'rgba(240,237,232,0.75)' }}>
                  {formatDateTime(s.updated_at)}
                </p>
              </div>
              <div>
                <p className="label-luxury" style={{ fontSize: '0.4rem', color: 'rgba(240,237,232,0.35)' }}>VISITA</p>
                <p className="font-sans" style={{ fontSize: '0.72rem', color: 'rgba(240,237,232,0.75)' }}>
                  #{s.visit_number ?? 1}
                </p>
              </div>
              <div>
                <p className="label-luxury" style={{ fontSize: '0.4rem', color: 'rgba(240,237,232,0.35)' }}>PÁGINAS</p>
                <p className="font-sans" style={{ fontSize: '0.72rem', color: 'var(--color-accent)' }}>
                  {s.pages_count ?? 0}
                </p>
              </div>
              <div>
                <p className="label-luxury" style={{ fontSize: '0.4rem', color: 'rgba(240,237,232,0.35)' }}>CONVERSIÓN</p>
                <p className="font-sans"
                  style={{ fontSize: '0.72rem', color: s.converted ? 'var(--color-accent)' : 'rgba(240,237,232,0.35)' }}>
                  {s.converted ? '● SÍ' : '○ NO'}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

// ───────────────────────────────────────────────────────────────────────────
// AdminPage
// ───────────────────────────────────────────────────────────────────────────

const TABS = [
  { id: 'obras',        label: 'OBRAS'        },
  { id: 'presupuestos', label: 'PRESUPUESTOS' },
  { id: 'actividad',    label: 'ACTIVIDAD'    },
]

export default function AdminPage() {
  const navigate = useNavigate()
  const [authed, setAuthed] = useState(() => {
    try { return sessionStorage.getItem(STORAGE_KEY) === '1' } catch { return false }
  })
  const [tab, setTab] = useState('obras')

  function logout() {
    try { sessionStorage.removeItem(STORAGE_KEY) } catch { /* ignore */ }
    setAuthed(false)
  }

  if (!authed) {
    return (
      <PageTransition>
        <Login onSuccess={() => setAuthed(true)} />
      </PageTransition>
    )
  }

  return (
    <PageTransition>
      <div className="absolute inset-0 flex flex-col overflow-hidden"
        style={{ backgroundColor: 'var(--color-bg)' }}>

        {/* Header */}
        <div className="flex-shrink-0 flex items-center justify-between px-6 sm:px-10 py-4"
          style={{ borderBottom: '1px solid rgba(91,143,168,0.12)' }}>
          <button onClick={() => navigate('/')} data-cursor="hover"
            className="flex items-center gap-2 label-luxury transition-colors duration-300"
            style={{ color: 'rgba(240,237,232,0.45)', fontSize: '0.6rem' }}>
            <ChevronLeft size={14} />
            Inicio
          </button>
          <p className="label-luxury text-text/55" style={{ fontSize: '0.55rem', letterSpacing: '0.22em' }}>
            LUMINAL · ADMIN
          </p>
          <button onClick={logout}
            className="label-luxury transition-colors duration-300"
            style={{ color: 'rgba(91,143,168,0.7)', fontSize: '0.55rem' }}>
            SALIR
          </button>
        </div>

        {/* Tabs */}
        <div className="flex-shrink-0 flex items-center gap-0.5 sm:gap-1 px-3 sm:px-10 overflow-x-auto"
          style={{ borderBottom: '1px solid rgba(91,143,168,0.12)' }}>
          {TABS.map(t => {
            const active = tab === t.id
            return (
              <button key={t.id} onClick={() => setTab(t.id)}
                className="label-luxury px-3 sm:px-4 py-3 transition-all duration-200 whitespace-nowrap"
                style={{
                  fontSize: 'clamp(0.46rem, 1.8vw, 0.55rem)',
                  letterSpacing: 'clamp(0.12em, 0.5vw, 0.2em)',
                  color: active ? 'var(--color-accent)' : 'rgba(240,237,232,0.45)',
                  borderBottom: active ? '1px solid var(--color-accent)' : '1px solid transparent',
                  marginBottom: -1,
                }}>
                {t.label}
              </button>
            )
          })}
        </div>

        {/* Body */}
        <div className="flex-1 min-h-0 overflow-y-auto">
          <div className="max-w-5xl mx-auto px-6 sm:px-10 py-8">
            {tab === 'obras'        && <ObrasTab />}
            {tab === 'presupuestos' && <PresupuestosTab />}
            {tab === 'actividad'    && <ActividadTab />}
          </div>
        </div>
      </div>
    </PageTransition>
  )
}
