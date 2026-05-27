import type { ComponenteArquitectura } from '../entidades/ComponenteArquitectura'

export interface RepositorioComponentes {
  obtenerTodos(): Promise<ComponenteArquitectura[]>

  guardar(componente: ComponenteArquitectura): Promise<void>
}