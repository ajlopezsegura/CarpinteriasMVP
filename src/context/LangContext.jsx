import { createContext, useContext, useState, useCallback } from 'react'

const LangContext = createContext(null)

export function LangProvider({ children }) {
  const [lang, setLang] = useState('es')

  const toggle = useCallback(() => {
    setLang(prev => prev === 'es' ? 'en' : 'es')
  }, [])

  return (
    <LangContext.Provider value={{ lang, toggle }}>
      {children}
    </LangContext.Provider>
  )
}

export function useLang() {
  const ctx = useContext(LangContext)
  if (!ctx) throw new Error('useLang must be used within LangProvider')
  return ctx
}
