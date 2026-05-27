export function crearFormulario(): string {
  return `
    <div class="container">

      <h1>ArchiCode</h1>

      <form id="form-componente">

        <input
          type="text"
          id="nombre"
          placeholder="Nombre del componente (mínimo 3 caracteres)"
        />

        <select id="tipo">
          <option value="frontend">Frontend</option>
          <option value="backend">Backend</option>
          <option value="database">Database</option>
          <option value="api">API</option>
          <option value="microservice">Microservice</option>
        </select>

        <textarea
          id="descripcion"
          placeholder="Descripción del componente (mínimo 10 caracteres)"
        ></textarea>

        <input
        type="text"
        id="dependencias"
        placeholder="Dependencias separadas por coma"
        />

        <small class="info">
            Las dependencias deben escribirse exactamente igual al nombre del componente existente.
        </small>

        <button type="submit">
          Agregar componente
        </button>

      </form>

      <p id="mensaje"></p>

      <div id="lista-componentes"></div>

    </div>
  `
}