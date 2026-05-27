import type { ComponenteArquitectura } from '../../core/entidades/ComponenteArquitectura'
import type { RepositorioComponentes } from '../../core/puertos/repositorioComponentes'

export class LocalStorageRepo implements RepositorioComponentes {
  private readonly STORAGE_KEY = 'componentes'

  async obtenerTodos(): Promise<ComponenteArquitectura[]> {
    const datos = localStorage.getItem(this.STORAGE_KEY)

    if (!datos) {
      return []
    }

    return JSON.parse(datos)
  }

  async guardar(componente: ComponenteArquitectura): Promise<void> {
    const componentes = await this.obtenerTodos()

    componentes.push(componente)

    localStorage.setItem(
      this.STORAGE_KEY,
      JSON.stringify(componentes)
    )
  }

  async eliminar(id: string): Promise<void> {

    const componentes = await this.obtenerTodos()

    const actualizados = componentes.filter(
        componente => componente.id !== id
    )

    localStorage.setItem(
        this.STORAGE_KEY,
        JSON.stringify(actualizados)
    )
  }
}