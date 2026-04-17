import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import LuxuryCursor      from './components/cursor/LuxuryCursor'
import AppFooter         from './components/layout/AppFooter'
import CoverPage         from './pages/CoverPage'
import EmpresaPage       from './pages/EmpresaPage'
import SistemasPage      from './pages/SistemasPage'
import SistemaDetailPage from './pages/SistemaDetailPage'
import ObraPage          from './pages/ObraPage'
import ContactPage       from './pages/ContactPage'
import AdminPage         from './pages/AdminPage'
import PrivacyPage       from './pages/PrivacyPage'
import { useProject }    from './context/ProjectContext'

export default function App() {
  const location    = useLocation()
  const { loading } = useProject()

  if (loading) {
    return (
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        className="fixed inset-0 flex items-center justify-center"
        style={{ backgroundColor: 'var(--color-bg)' }}>
        <div className="flex flex-col items-center gap-4">
          <div style={{
            width: 32, height: 32, border: '1px solid rgba(91,143,168,0.3)',
            borderTopColor: 'var(--color-accent)', borderRadius: '50%',
            animation: 'spin 1s linear infinite',
          }} />
          <style>{`@keyframes spin { to { transform: rotate(360deg) } }`}</style>
        </div>
      </motion.div>
    )
  }

  return (
    <>
      <LuxuryCursor />
      <AppFooter />
      <AnimatePresence mode="wait" initial={false}>
        <Routes location={location} key={location.pathname}>
          <Route path="/"                   element={<CoverPage />} />
          <Route path="/empresa"            element={<EmpresaPage />} />
          <Route path="/sistemas"           element={<SistemasPage />} />
          <Route path="/sistemas/:slug"     element={<SistemaDetailPage />} />
          <Route path="/obra/:codigo"       element={<ObraPage />} />
          <Route path="/contacto"           element={<ContactPage />} />
          <Route path="/admin"              element={<AdminPage />} />
          <Route path="/privacy"            element={<PrivacyPage />} />
        </Routes>
      </AnimatePresence>
    </>
  )
}
