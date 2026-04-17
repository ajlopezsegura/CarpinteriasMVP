import { createContext, useContext, useState, useEffect, useCallback, useRef } from 'react'
import { useLocation } from 'react-router-dom'
import { supabase } from '../lib/supabase'

const SessionContext = createContext(null)
const PROJECT_SLUG   = import.meta.env.VITE_PROJECT_SLUG ?? 'luminal'
const EXCLUDED       = ['/admin', '/privacy']

function generateId() {
  return Math.random().toString(36).slice(2) + Date.now().toString(36)
}

function getOrCreateVisitorId() {
  try {
    const stored = localStorage.getItem('lum_vid')
    if (stored) return stored
    const id = generateId()
    localStorage.setItem('lum_vid', id)
    return id
  } catch {
    return generateId()
  }
}

function incrementVisitNumber() {
  try {
    const n = Number(localStorage.getItem('lum_visits') ?? '0') + 1
    localStorage.setItem('lum_visits', String(n))
    return n
  } catch {
    return 1
  }
}

export function SessionProvider({ children }) {
  const location = useLocation()

  const [sessionId] = useState(() => {
    const stored = sessionStorage.getItem('lum_sid')
    if (stored) return stored
    const id = generateId()
    sessionStorage.setItem('lum_sid', id)
    return id
  })

  const [visitorId]    = useState(() => getOrCreateVisitorId())
  const [visitNumber]  = useState(() => incrementVisitNumber())
  const [referrer]     = useState(() => document.referrer || null)
  const [userLang]     = useState(() => navigator.language || null)
  const [screenSize]   = useState(() => `${window.innerWidth}x${window.innerHeight}`)

  const [trail, setTrail]   = useState([])
  const enterTime           = useRef(Date.now())
  const prevPage            = useRef(null)
  const trailRef            = useRef([])

  useEffect(() => { trailRef.current = trail }, [trail])

  useEffect(() => {
    const now  = Date.now()
    const page = location.pathname

    if (EXCLUDED.some(p => page.startsWith(p))) return

    if (prevPage.current && !EXCLUDED.some(p => prevPage.current.startsWith(p))) {
      const duration_ms = now - enterTime.current
      setTrail(prev => {
        const copy = [...prev]
        for (let i = copy.length - 1; i >= 0; i--) {
          if (copy[i].type === 'page_view' && copy[i].page === prevPage.current) {
            copy[i] = { ...copy[i], duration_ms }
            break
          }
        }
        return copy
      })
    }

    prevPage.current  = page
    enterTime.current = now

    setTrail(prev => {
      const last = prev[prev.length - 1]
      if (last?.type === 'page_view' && last?.page === page) return prev
      return [...prev, { type: 'page_view', page, ts: now, duration_ms: null }]
    })
  }, [location.pathname])

  const saveSession = useCallback(async (converted = false) => {
    const t = trailRef.current
    if (t.length === 0) return
    try {
      await supabase.from('page_sessions').upsert({
        session_id:   sessionId,
        visitor_id:   visitorId,
        visit_number: visitNumber,
        referrer,
        user_lang:    userLang,
        screen_size:  screenSize,
        project_slug: PROJECT_SLUG,
        trail:        t,
        pages_count:  t.filter(e => e.type === 'page_view').length,
        converted,
        updated_at:   new Date().toISOString(),
      }, { onConflict: 'session_id' })
    } catch { /* analytics never breaks the app */ }
  }, [sessionId, visitorId, visitNumber, referrer, userLang, screenSize])

  useEffect(() => {
    function onHide() {
      if (document.visibilityState === 'hidden') saveSession(false)
    }
    document.addEventListener('visibilitychange', onHide)
    return () => document.removeEventListener('visibilitychange', onHide)
  }, [saveSession])

  const trackEvent = useCallback((type, data = {}) => {
    setTrail(prev => [...prev, { type, ...data, ts: Date.now() }])
  }, [])

  const markConverted = useCallback(() => saveSession(true), [saveSession])

  return (
    <SessionContext.Provider value={{ sessionId, visitorId, trail, trackEvent, markConverted }}>
      {children}
    </SessionContext.Provider>
  )
}

export function useSession() {
  const ctx = useContext(SessionContext)
  if (!ctx) throw new Error('useSession must be used within SessionProvider')
  return ctx
}
