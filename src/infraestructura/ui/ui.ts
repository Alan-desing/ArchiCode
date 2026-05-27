export function crearFormulario(): string {
  return `
    <div class="container">

      <h1>ArchiCode</h1>

      <form id="form-componente">

        <input
          type="text"
          id="nombre"
          placeholder="Nombre del componente"
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
          placeholder="Descripción"
        ></textarea>

        <input
        type="text"
        id="dependencias"
        placeholder="Dependencias separadas por coma"
        />

        <button type="submit">
          Agregar componente
        </button>

      </form>

      <p id="mensaje"></p>

      <div id="lista-componentes"></div>

    </div>
  `
}