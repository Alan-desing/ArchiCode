import type {
  ComponenteArquitectura,
  ComponenteSinId
} from '../entidades/ComponenteArquitectura'

import type { RepositorioComponentes } from '../puertos/repositorioComponentes'

import type { Respuesta } from '../entidades/Respuesta'

import { componenteSchema } from '../../infraestructura/validacion/componenteSchema'

export async function agregarComponente(
  datos: ComponenteSinId,
  repositorio: RepositorioComponentes
): Promise<Respuesta<ComponenteArquitectura>> {

  const validacion = componenteSchema.safeParse(datos)

  if (!validacion.success) {
    return {
      exito: false,
      error: validacion.error.issues[0].message
    }
  }

  const nuevoComponente: ComponenteArquitectura = {
    id: crypto.randomUUID(),
    ...validacion.data
  }

  await repositorio.guardar(nuevoComponente)

  return {
    exito: true,
    datos: nuevoComponente
  }
}