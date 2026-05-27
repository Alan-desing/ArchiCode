import type { ComponenteArquitectura } from '../entidades/ComponenteArquitectura'

export function validarPatron(
  componente: ComponenteArquitectura,
  componentesExistentes: ComponenteArquitectura[]
): string[] {

  const errores: string[] = []

  // Regla:
  // frontend no debería depender de database

    if (
        componente.tipo === 'frontend'
    ) {

        const dependenciaDatabase = componentesExistentes.find(
        existente =>
            componente.dependencias.includes(existente.nombre) &&
            existente.tipo === 'database'
        )

        if (dependenciaDatabase) {
        errores.push(
            'Un frontend no debería depender directamente de una base de datos'
        )
        }
    }

// database no debería depender de frontend 

    if (
        componente.tipo === 'database'
    ) {

        const dependenciaFrontend = componentesExistentes.find(
            existente =>
            componente.dependencias.includes(existente.nombre) &&
            existente.tipo === 'frontend'
        )

        if (dependenciaFrontend) {
            errores.push(
            'Una base de datos no debería depender de un frontend'
        )
        }
    }

//API no debería depender de frontend

    if (
        componente.tipo === 'api'
    ) {

        const dependenciaFrontend = componentesExistentes.find(
            existente =>
            componente.dependencias.includes(existente.nombre) &&
            existente.tipo === 'frontend'
        )

        if (dependenciaFrontend) {
            errores.push(
            'Una API no debería depender directamente de un frontend'
        )
        }
    }
    
   // Validar dependencias inexistentes

  componente.dependencias.forEach((dependencia) => {

    const existe = componentesExistentes.some(
      componenteExistente =>
        componenteExistente.nombre === dependencia
    )

    if (!existe) {
      errores.push(
        `La dependencia "${dependencia}" no existe`
      )
    }
  })

  // Detectar dependencia circular

  componente.dependencias.forEach((dependencia) => {

    const componenteDependencia = componentesExistentes.find(
      existente => existente.nombre === dependencia
    )

    if (!componenteDependencia) {
      return
    }

    const dependenciaCircular =
      componenteDependencia.dependencias.includes(componente.nombre)

    if (dependenciaCircular) {
      errores.push(
        `Dependencia circular detectada entre "${componente.nombre}" y "${dependencia}"`
      )
    }
  })

  return errores
}