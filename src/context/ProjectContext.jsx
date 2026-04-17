import { createContext, useContext, useEffect, useState } from 'react'
import { supabase, hasSupabase } from '../lib/supabase'
import { SISTEMAS_DEMO } from '../data/sistemas'
import { OBRAS_DEMO } from '../data/obras'

const ProjectContext = createContext(null)

const EMPRESA = {
  name:   'Luminal',
  nameEN: 'Luminal',
  slogan:   'Carpintería de aluminio y PVC',
  sloganEN: 'Aluminum and PVC carpentry',
  tagline:   'Ventanas, puertas y cerramientos de alta eficiencia',
  taglineEN: 'High-efficiency windows, doors and enclosures',
  stats: [
    { value: '+20',   label: 'Años de experiencia',   labelEN: 'Years of experience'     },
    { value: '+1200', label: 'Obras entregadas',       labelEN: 'Projects delivered'      },
    { value: 'A+',    label: 'Clasificación térmica',  labelEN: 'Thermal classification'  },
    { value: '5',     label: 'Años de garantía',       labelEN: 'Year warranty'           },
  ],
  materiales: [
    {
      id: 'aluminio',
      nombre: 'Aluminio',
      nombreEN: 'Aluminum',
      descripcion: 'Perfiles extruidos con rotura de puente térmico. Estética minimalista y máxima durabilidad.',
      descripcionEN: 'Extruded profiles with thermal break. Minimalist aesthetic and maximum durability.',
    },
    {
      id: 'pvc',
      nombre: 'PVC',
      nombreEN: 'PVC',
      descripcion: 'Sistemas multicámara con excelente aislamiento térmico y acústico a precio competitivo.',
      descripcionEN: 'Multi-chamber systems with excellent thermal and acoustic insulation at a competitive price.',
    },
    {
      id: 'vidrio',
      nombre: 'Vidrios técnicos',
      nombreEN: 'Technical glass',
      descripcion: 'Vidrios de baja emisividad, control solar, seguridad laminada y acústico certificado.',
      descripcionEN: 'Low-emissivity, solar control, laminated safety and certified acoustic glass.',
    },
  ],
}

export function ProjectProvider({ children }) {
  const [sistemas, setSistemas] = useState(SISTEMAS_DEMO)
  const [obras, setObras]       = useState(OBRAS_DEMO)
  const [loading, setLoading]   = useState(hasSupabase)

  useEffect(() => {
    if (!hasSupabase) { setLoading(false); return }
    let cancelled = false

    async function load() {
      try {
        const [sistRes, obrasRes] = await Promise.all([
          supabase.from('sistemas').select('*').order('orden', { ascending: true }),
          supabase.from('obras').select('*').order('created_at', { ascending: false }),
        ])
        if (cancelled) return
        if (!sistRes.error && sistRes.data?.length > 0) setSistemas(sistRes.data)
        if (!obrasRes.error && obrasRes.data?.length > 0) setObras(obrasRes.data)
      } catch { /* keep demo data */ }
      finally {
        if (!cancelled) setLoading(false)
      }
    }
    load()

    return () => { cancelled = true }
  }, [])

  return (
    <ProjectContext.Provider value={{ empresa: EMPRESA, sistemas, obras, setObras, loading }}>
      {children}
    </ProjectContext.Provider>
  )
}

export function useProject() {
  const ctx = useContext(ProjectContext)
  if (!ctx) throw new Error('useProject must be used within ProjectProvider')
  return ctx
}
