import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import LuxuryCursor from './components/cursor/LuxuryCursor'
import HubPage      from './pages/HubPage'
import AsteroidPage from './pages/AsteroidPage'

export default function App() {
  const location = useLocation()

  return (
    <>
      <LuxuryCursor />
      <AnimatePresence mode="wait" initial={false}>
        <Routes location={location} key={location.pathname}>
          <Route path="/"                element={<HubPage />} />
          <Route path="/asteroide/:id"   element={<AsteroidPage />} />
        </Routes>
      </AnimatePresence>
    </>
  )
}
