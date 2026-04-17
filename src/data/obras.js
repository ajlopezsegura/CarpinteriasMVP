// Datos demo de obras. Si Supabase está configurado, ProjectContext los
// sustituye por los reales de la tabla `obras` (cuando haya datos).

export const FASES_ESTANDAR = [
  'Presupuesto',
  'Pedido',
  'Fabricación',
  'Entrega',
  'Instalación',
  'Finalizado',
]

function buildFases(indiceActual, fechas = []) {
  return FASES_ESTANDAR.map((nombre, i) => {
    let estado
    if (i <  indiceActual) estado = 'completada'
    if (i === indiceActual) estado = 'en_curso'
    if (i >  indiceActual) estado = 'pendiente'
    return {
      nombre,
      estado,
      fecha: fechas[i] ?? null,
      nota:  null,
    }
  })
}

export const OBRAS_DEMO = [
  {
    id: 1,
    codigo: 'MTZ001',
    cliente: 'Familia Martínez',
    descripcion: 'Reforma integral de ventanas y puerta de entrada en vivienda unifamiliar de 180 m² en Pozuelo de Alarcón.',
    direccion: 'C/ Valle del Ésera 14, Pozuelo de Alarcón, Madrid',
    sistemas: [
      'Ventana Aluminio Serie 70',
      'Puerta Entrada Aluminio',
      'Persiana Aluminio Motorizable',
    ],
    fase_actual: 4, // Instalación
    fases: buildFases(4, [
      '2024-09-15',
      '2024-10-02',
      '2024-11-08',
      '2024-12-18',
      null, null,
    ]),
    acceso_codigo: 'MTZ001',
    created_at: '2024-09-15T10:00:00Z',
  },
  {
    id: 2,
    codigo: 'ALA002',
    cliente: 'Comunidad Alameda',
    descripcion: 'Sustitución de ventanas de PVC en las 42 viviendas de la comunidad, fachadas norte y oeste. Mejora de la eficiencia energética del edificio.',
    direccion: 'Avenida de la Alameda 7, Alcobendas, Madrid',
    sistemas: [
      'Ventana PVC Serie 60',
    ],
    fase_actual: 2, // Fabricación
    fases: buildFases(2, [
      '2024-10-10',
      '2024-11-05',
      null, null, null, null,
    ]),
    acceso_codigo: 'ALA002',
    created_at: '2024-10-10T12:00:00Z',
  },
  {
    id: 3,
    codigo: 'VIS003',
    cliente: 'Hotel Vistazul',
    descripcion: 'Cerramiento de terraza-restaurante y muro cortina de la nueva ala sur. Eficiencia energética A+ y control solar para climas cálidos.',
    direccion: 'Paseo Marítimo 102, Marbella, Málaga',
    sistemas: [
      'Cerramiento Terraza Plegable',
      'Fachada Muro Cortina',
    ],
    fase_actual: 5, // Finalizado
    fases: buildFases(5, [
      '2024-03-01',
      '2024-03-20',
      '2024-05-15',
      '2024-07-02',
      '2024-08-10',
      '2024-08-28',
    ]),
    acceso_codigo: 'VIS003',
    created_at: '2024-03-01T09:00:00Z',
  },
]
