import { createContext, useContext, useEffect, useState, useCallback } from 'react'

const PrincipitoContext = createContext(null)
const STORAGE_KEY = 'principito_visited'

export function PrincipitoProvider({ children }) {
  const [visited, setVisited] = useState(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      return raw ? new Set(JSON.parse(raw)) : new Set()
    } catch { return new Set() }
  })

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify([...visited]))
    } catch { /* ignore */ }
  }, [visited])

  const markVisited = useCallback((id) => {
    setVisited(prev => {
      if (prev.has(id)) return prev
      const next = new Set(prev)
      next.add(id)
      return next
    })
  }, [])

  const reset = useCallback(() => {
    setVisited(new Set())
    try { localStorage.removeItem(STORAGE_KEY) } catch { /* ignore */ }
  }, [])

  const isVisited = (id) => visited.has(id)

  return (
    <PrincipitoContext.Provider value={{ visited, markVisited, isVisited, reset }}>
      {children}
    </PrincipitoContext.Provider>
  )
}

export function usePrincipito() {
  const ctx = useContext(PrincipitoContext)
  if (!ctx) throw new Error('usePrincipito must be used within PrincipitoProvider')
  return ctx
}
