import './style.css'

import { crearFormulario } from './infraestructura/ui/ui'

import { LocalStorageRepo } from './infraestructura/adaptadores/localStorageRepo'

import { agregarComponente } from './core/casos-uso/agregarComponente'

import { validarPatron } from './core/casos-uso/validarPatron'

const app = document.querySelector<HTMLDivElement>('#app')

if (app) {
  app.innerHTML = crearFormulario()
}

const formulario = document.querySelector<HTMLFormElement>('#form-componente')

const mensaje = document.querySelector<HTMLParagraphElement>('#mensaje')

const lista = document.querySelector<HTMLDivElement>('#lista-componentes')

const repositorio = new LocalStorageRepo()

async function renderizarComponentes() {
  if (!lista) return

  const componentes = await repositorio.obtenerTodos()

  lista.innerHTML = componentes
    .map((componente) => {
      return `
        <div class="card">
          <h3>${componente.nombre}</h3>
          <p><strong>Tipo:</strong> ${componente.tipo}</p>
          <p>${componente.descripcion}</p>
          <p>
            <strong>Dependencias:</strong>
            ${
              componente.dependencias.length > 0
                ? componente.dependencias.join(', ')
                : 'Ninguna'
            }
          </p>
          <button class="btn-eliminar" data-id="${componente.id}">Eliminar</button>
        </div>
      `
    })
    .join('')

    const botonesEliminar = document.querySelectorAll<HTMLButtonElement>(
      '.btn-eliminar'
    )

    botonesEliminar.forEach((boton) => {

      boton.addEventListener('click', async () => {

        const id = boton.dataset.id

        if (!id) {
          return
        }

        await repositorio.eliminar(id)

        renderizarComponentes()
      })
    })

}

renderizarComponentes()

formulario?.addEventListener('submit', async (event) => {
  event.preventDefault()

  const nombreInput = document.querySelector<HTMLInputElement>('#nombre')
  const tipoInput = document.querySelector<HTMLSelectElement>('#tipo')
  const descripcionInput = document.querySelector<HTMLTextAreaElement>('#descripcion')
  const dependenciasInput = document.querySelector<HTMLInputElement>('#dependencias')

  const resultado = await agregarComponente(
    {
      nombre: nombreInput?.value || '',
      tipo: (tipoInput?.value as
        | 'frontend'
        | 'backend'
        | 'database'
        | 'api'
        | 'microservice'),

      descripcion: descripcionInput?.value || '',

      dependencias:
        dependenciasInput?.value
          .split(',')
          .map(dep => dep.trim())
          .filter(dep => dep.length > 0) || []
          },
          repositorio
        )

  const componentesExistentes = await repositorio.obtenerTodos()

  const erroresArquitectura = validarPatron(
    resultado.datos!,
    componentesExistentes
  )

  if (erroresArquitectura.length > 0) {

    if (mensaje) {
      mensaje.textContent = erroresArquitectura.join(' | ')
    }

    return
  }

  if (!resultado.exito) {
    if (mensaje) {
      mensaje.textContent = resultado.error || 'Error desconocido'
      mensaje.className = 'mensaje error'
    }

    return
  }

  if (mensaje) {
    mensaje.textContent = 'Componente agregado correctamente'
    mensaje.className = 'mensaje exito'
  }

  formulario.reset()

  renderizarComponentes()
})