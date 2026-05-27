export interface Respuesta<T> {
  exito: boolean
  datos?: T
  error?: string
}