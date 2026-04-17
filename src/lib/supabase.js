import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY

// Fallback no-op client: si faltan env vars, la app sigue funcionando sin
// errores. Todas las llamadas devuelven { data: null, error: null }.
function createNoopClient() {
  const chain = {
    select:  () => Promise.resolve({ data: [], error: null }),
    insert:  () => Promise.resolve({ data: null, error: null }),
    upsert:  () => Promise.resolve({ data: null, error: null }),
    update:  () => Promise.resolve({ data: null, error: null }),
    delete:  () => Promise.resolve({ data: null, error: null }),
    eq:      () => chain,
    order:   () => chain,
    single:  () => Promise.resolve({ data: null, error: null }),
  }
  return {
    from:  () => chain,
    auth:  { signIn: () => Promise.resolve({ data: null, error: null }) },
  }
}

export const supabase = supabaseUrl && supabaseKey
  ? createClient(supabaseUrl, supabaseKey)
  : createNoopClient()

export const hasSupabase = Boolean(supabaseUrl && supabaseKey)
