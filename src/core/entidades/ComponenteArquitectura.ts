export type TipoComponente =
  | 'frontend'
  | 'backend'
  | 'database'
  | 'api'
  | 'microservice'

export interface ComponenteArquitectura {
  id: string
  nombre: string
  tipo: TipoComponente
  descripcion: string
  dependencias: string[]
}

export type ComponenteSinId = Omit<ComponenteArquitectura, 'id'>

export type ComponenteParcial = Partial<ComponenteArquitectura>

export type ComponenteSoloLectura = Readonly<ComponenteArquitectura>