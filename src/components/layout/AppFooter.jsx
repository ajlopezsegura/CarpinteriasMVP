import { useLocation, useNavigate } from 'react-router-dom'
import { useLang } from '../../context/LangContext'

const STEPS = [
  { path: '/empresa',  label: 'EMPRESA',   labelEN: 'COMPANY'  },
  { path: '/sistemas', label: 'SISTEMAS',  labelEN: 'SYSTEMS'  },
  { path: '/contacto', label: 'CONTACTO',  labelEN: 'CONTACT'  },
]

export default function AppFooter() {
  const location   = useLocation()
  const navigate   = useNavigate()
  const { lang }   = useLang()

  // Hide footer on cover, detail pages, admin, privacy, obra
  const hide = location.pathname === '/'
    || location.pathname.startsWith('/admin')
    || location.pathname.startsWith('/privacy')
    || location.pathname.startsWith('/obra')
    || location.pathname.startsWith('/sistemas/')

  if (hide) return null

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 pointer-events-none">
      <div className="flex items-center justify-center gap-2 sm:gap-4 pb-4 pointer-events-auto"
        style={{ fontFamily: 'Montserrat, sans-serif' }}>
        {STEPS.map(step => {
          const active = location.pathname === step.path
          const isCTA  = step.path === '/contacto'
          return (
            <button
              key={step.path}
              onClick={() => navigate(step.path)}
              data-cursor="hover"
              className="label-luxury transition-all duration-300 px-3 sm:px-4 py-2"
              style={{
                fontSize: '0.55rem',
                letterSpacing: '0.18em',
                border: isCTA
                  ? `1px solid var(--color-accent)`
                  : `1px solid ${active ? 'var(--color-accent)' : 'rgba(91,143,168,0.18)'}`,
                backgroundColor: isCTA
                  ? 'var(--color-accent)'
                  : active ? 'rgba(91,143,168,0.08)' : 'rgba(30,37,48,0.75)',
                color: isCTA
                  ? 'var(--color-bg)'
                  : active ? 'var(--color-accent)' : 'rgba(240,237,232,0.55)',
                backdropFilter: isCTA ? 'none' : 'blur(8px)',
              }}>
              {isCTA
                ? (lang === 'es' ? 'PRESUPUESTO' : 'QUOTE')
                : (lang === 'es' ? step.label : step.labelEN)
              }
            </button>
          )
        })}
      </div>
    </div>
  )
}
