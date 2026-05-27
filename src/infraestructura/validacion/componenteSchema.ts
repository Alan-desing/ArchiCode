import { z } from 'zod'

export const componenteSchema = z.object({
  nombre: z
    .string()
    .min(3, 'El nombre debe tener al menos 3 caracteres'),

  tipo: z.enum([
    'frontend',
    'backend',
    'database',
    'api',
    'microservice'
  ]),

  descripcion: z
    .string()
    .min(10, 'La descripción debe tener mínimo 10 caracteres'),

  dependencias: z.array(z.string())
})