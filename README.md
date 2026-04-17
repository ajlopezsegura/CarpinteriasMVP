# Luminal — Carpintería de Aluminio y PVC (MVP)

App de presentación + portal de seguimiento de obra para el sector de carpintería
de aluminio y PVC. Basada en la arquitectura del template Las Conchas, adaptada
a esta vertical.

## Stack
React 18 · Vite · Tailwind CSS · Framer Motion · Supabase · React Router (HashRouter)

## Rutas implementadas (MVP mínimo)
- `/` — Portada con CTA a sistemas, presupuesto y acceso oculto a seguimiento por código
- `/sistemas` — Catálogo filtrable por categoría (ventanas, puertas, cerramientos, fachadas, complementos)
- `/sistemas/:slug` — Ficha técnica con imagen, descripción, acabados y especificaciones
- `/contacto` — Formulario de presupuesto (leads) con política de privacidad
- `/privacy` — Política de privacidad RGPD

## Pendiente de próximas iteraciones
- `/empresa` — Quiénes somos + stats + materiales
- `/obra/:codigo` — Portal cliente con timeline de fases y progreso
- `/admin` — Panel de obras, presupuestos y actividad

## Desarrollo local
```bash
npm install
npm run dev
```
Abre `http://localhost:5173`.

## Deploy
Push a `main` dispara el workflow `.github/workflows/deploy.yml` que publica
en GitHub Pages. Activa Pages en **Settings → Pages → Source: GitHub Actions**.

## Variables de entorno
Crear `.env.local` (local) o configurar como secrets del repo (CI):
```
VITE_SUPABASE_URL=https://<project>.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=<anon-key>
VITE_PROJECT_SLUG=luminal
VITE_ADMIN_PASSWORD=luminal2024
```
Sin env vars, la app funciona igual — Supabase se sustituye por un cliente
no-op que deja pasar todo sin errores.

## Schema Supabase (pendiente de crear)
```
sistemas       (id, slug, nombre, categoria, material, imagen, descripcion,
                caracteristicas jsonb, colores text[], orden int)
obras          (id, codigo, cliente, descripcion, direccion, sistemas text[],
                fase_actual, fases jsonb, acceso_codigo, created_at)
leads          (id, nombre, telefono, email, sistema, mensaje, session_trail jsonb,
                source, project_slug, created_at)
page_sessions  (session_id, visitor_id, visit_number, referrer, user_lang,
                screen_size, project_slug, trail jsonb, pages_count, converted,
                updated_at)
```

## Códigos de obra demo (cuando se implemente `/obra/:codigo`)
- `MTZ001` — Familia Martínez (en instalación)
- `ALA002` — Comunidad Alameda (en fabricación)
- `VIS003` — Hotel Vistazul (completada)

## Admin password por defecto
`luminal2024` (configurable con `VITE_ADMIN_PASSWORD`).
