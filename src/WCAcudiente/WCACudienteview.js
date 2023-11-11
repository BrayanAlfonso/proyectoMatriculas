import { LitElement, html } from "lit-element";
import WCACudienteStyle from "./WCACudienteStyle";


export class WCACudienteview extends LitElement {

  constructor() {
    super();
    this.documento = '';
    this.nombre = '';
    this.parentesco = '';
    this.edad = '';
    this.telefono = '';
  }

  static get properties() {
    return {
      acudientes: { type: Array },
      documento: { type: String },
      nombre: { type: String },
      parentesco: { type: String },
      edad: { type: String },
      telefono: { type: String },
    }
  }

  static get styles(){
    return[WCACudienteStyle]
}

  
  cargaAcudientes() {
    const data = localStorage.getItem('acudientes');
    return data ? JSON.parse(data) : [];
  }

  guardarAcudientes() {
    localStorage.setItem('acudientes', JSON.stringify(this.acudientes));
  }

  registrarAcudiente() {
    if (this.documento && this.nombre && this.parentesco && this.edad && this.telefono) {
      const nuevoAcudiente = {
        documento: this.documento,
        nombre: this.nombre,
        parentesco: this.parentesco,
        edad: this.edad,
        telefono: this.telefono
      };
      this.acudientes.push(nuevoAcudiente);
      this.guardarAcudientes();

      this.documento = '';
      this.nombre = '';
      this.parentesco = '';
      this.edad = '';
      this.telefono = '';

      this.requestUpdate();
    }
    this.cerrarModal()
  }

  actualizarAcudiente(acudiente) {
    console.log(acudiente);
    let arregloAcudiente = this.acudientes.find((arregloAcudiente)=>arregloAcudiente.documento === acudiente)
    console.log(arregloAcudiente);
    let documento = this.shadowRoot.querySelector(`#documentoActualizar${acudiente}`).value
    let nombre = this.shadowRoot.querySelector(`#nombreActualizar${acudiente}`).value
    let parentesco = this.shadowRoot.querySelector(`#parentescoActulizar${acudiente}`).value
    let edad = this.shadowRoot.querySelector(`#edadActualizar${acudiente}`).value
    let telefono = this.shadowRoot.querySelector(`#telefonoActualizar${acudiente}`).value

    console.log(documento, nombre,parentesco,edad,telefono)

    arregloAcudiente.documento = documento
    arregloAcudiente.nombre = nombre
    arregloAcudiente.parentesco = parentesco
    arregloAcudiente.edad = edad
    arregloAcudiente.telefono = telefono

    this.requestUpdate()
    this.cerrarModalActualizar(acudiente)
  }
  
  eliminarAcudiente(idacudiente) {
    const indice = this.acudientes.findIndex(acudiente => acudiente.documento === idacudiente);
    if (indice !== -1) {
        this.acudientes.splice(indice, 1);
        this.requestUpdate()
    } else {
        console.log("Acudiente no encontrado");
    }
  }
  
abrirModal() {  
  const miModal = this.shadowRoot.querySelector("#modalRegistro");
  miModal.style.display = "block";
  miModal.style.background="rgb(0,0,0,0.7)";
}

cerrarModal() {
  const miModal = this.shadowRoot.querySelector("#modalRegistro");
  miModal.style.display = "none";
  miModal.style.background="none"
}

abrirModalActualizar(id) {
    const miModal = this.shadowRoot.querySelector(`#modalActualizar${id}`);
    miModal.style.display = "block";
    miModal.style.background="rgb(0,0,0,0.7)"
}

  cerrarModalActualizar(id) {
    console.log("modal cerrado")
    const miModal = this.shadowRoot.querySelector(`#modalActualizar${id}`);
    miModal.style.display = "none";
    miModal.style.background="none"
  }

buscarDatos() {
  const documento = this.shadowRoot.querySelector("#documento").value;
  const nombre = this.shadowRoot.querySelector("#nombre").value;

  const acudienteEncontrado = this.acudientes.find(
    (acudiente) => acudiente.documento === documento && acudiente.nombre === nombre
  );

  if (acudienteEncontrado) {
    this.resultados = html`
      <div class="col-12 mt-3 d-flex flex-grow-1">
        <div class="h-100 bg-white border p-3">
          <h1>Usuario Encontrado</h1>
          <p><strong>Documento:</strong> ${acudienteEncontrado.documento}</p>
          <p><strong>Nombre:</strong> ${acudienteEncontrado.nombre}</p>
          <p><strong>Edad:</strong> ${acudienteEncontrado.parentesco}</p>
          <p><strong>Materia:</strong> ${acudienteEncontrado.edad}</p>
          <p><strong>Jornada:</strong> ${acudienteEncontrado.telefono}</p>
        </div>
      </div>
    `;
  } else {
    this.resultados = html`
      <div class="col-12 mt-3 d-flex flex-grow-1">
        <div class="h-100 bg-white border p-3">
          <h1>Acudiente No Encontrado</h1>
        </div>
      </div>
    `;
  }
  this.requestUpdate();
}

static get scopedElements(){
  return{
    "my-acudiente": MyElement,
  };
}

render() {
  return html`
    <style>
      @import url("https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css");
      @import url("https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css");
      :host {
        display: flex;
        justify-content: center;
        align-items: center;
        min-height: 100vh;
      }
    
      .container {
        width: 100%;
        max-width: 1200px;
      }
    </style>





    <div class="d-flex flex-column p-5 border-content2 vh-100 vw-100" id="main">
    <div class=" d-flex flex-column ">
    <!-- Sección a la derecha -->
    <div class="container-fluid">
        <div class="page-header">
            <div class="row align-items-center justify-content-between">
                <div class="m-3 d-flex align-items-center justify-content-between">
                        <h1 class="mb-0">Listado acudientes</h1>
                        <button class="input-1 bg-success text-light p-2 mx-5" href="javascript:;" @click="${this.abrirModal}">
                        Nuevo acudiente<i class="fas fa-plus fa-beat-fade"></i></button>
                </div>

                
                <div class="modal " id="modalRegistro" tabindex="-1" role="dialog" style="display: none;">
                    <div class="modal-dialog modal-dialog-centered bg-transparent" role="document">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="exampleModalLabel">Formulario de Registro</h5>
                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" @click="${this.cerrarModal}"></button>
                            </div>
                            <div class="modal-body">
                              <form id="registroForm">
                              <div class="mb-3">
                                  <label for="documento" class="form-label">Documento De Acudiente</label>
                                  <input type="text" class="form-control" id="documento" .value="${this.documento}" @input="${(e) => (this.documento = e.target.value)}">
                              </div>
                              <div class="mb-3">
                                  <label for="nombre" class="form-label">Nombre</label>
                                  <input type="text" class="form-control" id="nombre" .value="${this.nombre}" @input="${(e) => (this.nombre = e.target.value)}">
                              </div>
                              <div class="mb-3">
                                  <label for="parentesco" class="form-label">Parentesco</label>
                                  <input type="text" class="form-control" id="parentesco" .value="${this.parentesco}" @input="${(e) => (this.parentesco = e.target.value)}">
                              </div>
                              <div class="mb-3">
                                  <label for="edad" class="form-label">Edad</label>
                                  <input type="text" class="form-control" id="edad" .value="${this.edad}" @input="${(e) => (this.edad = e.target.value)}">
                              </div>
                              <div class="mb-3">
                                  <label for="telefono" class="form-label">Telefono</label>
                                  <input type="text" class="form-control" id="telefono" .value="${this.telefono}" @input="${(e) => (this.telefono = e.target.value)}">
                              </div>
                              <button type="button" class="btn btn-primary" @click="${this.registrarAcudiente}">Enviar</button>
                          </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
${this.acudientes.map(
  (acudiente) => html`
        <div class="d-flex mx-5 my-3 border-content3-01 p-3">
            <div class="d-flex border-list justify-content-center align-items-center">
                <div class="d-flex justify-content-center align-items-center m-3 my-1 rounder bg-light">
                    <i class="m-5 fa-solid fa-user fa-2xl"></i>
                </div>
            </div>
    
            <div class="d-flex flex-column w-100 m-3 border-list2">
                <div>
                    <h1 class="my-1 w-75">${acudiente.nombre}</h1>
                </div>
                <div class="d-flex">
                    <div class="d-flex flex-column justify-content-center m-2 mu-1 w-33">
                        
                        <p><strong>Documento: </strong>${acudiente.documento}</p>
                        <p><strong>Parentesco: </strong>${acudiente.parentesco}</p>
                    </div>
                    <div class="d-flex flex-column justify-content-center m-2 w-33">
                        <p><strong>Edad: </strong>${acudiente.edad}</p>
                        <p><strong>Telefono: </strong>${acudiente.telefono}</p>
                    </div>
                    <div>
                        <div class="d-flex flex-column m-3 h-65 vw-50 ">
                            <button type="button" class="m-1 input-1 bg-danger text-light"><i class="fa-regular fa-trash-can" @click="${() => this.eliminarAcudiente(acudiente.documento)}"> Eliminar</i></button>
                        </div>
                        <div class="d-flex flex-column m-3 h-65 vw-50 ">
                            <button type="button" class="m-1 input-1 bg-info text-light"><i class="fa-regular fa-trash-can" @click="${() => { console.log(acudiente); this.abrirModalActualizar(acudiente.documento); }}"> Actualizar</i></button>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    
    <div class="modal" id="modalActualizar${acudiente.documento}" tabindex="-1" role="dialog" style="display: none;">
        <div class="modal-dialog modal-dialog-centered bg-transparent" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">Formulario de Actualización</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" @click="${(e)=>this.cerrarModalActualizar(acudiente.documento)}"></button>
                </div>
                <div class="modal-body">
                        <form id="actualizarForm">
                        <div class="mb-3">
                            <label for="documento" class="form-label"> Documento De Acudiente</label>
                            <input type="text" class="form-control" id="documentoActualizar${acudiente.documento}" .value="${acudiente.documento}">
                        </div>
                        <div class="mb-3">
                            <label for="nombre" class="form-label">Documento</label>
                            <input type="text" class="form-control" id="nombreActualizar${acudiente.documento}" .value="${acudiente.nombre}">
                        </div>
                        <div class="mb-3">
                            <label for="parentesco" class="form-label">Parentesco</label>
                            <input type="text" class="form-control" id="parentescoActulizar${acudiente.documento}" .value="${acudiente.parentesco}">
                        </div>
                        <div class="mb-3">
                            <label for="edad" class="form-label">Edad</label>
                            <input type="text" class="form-control" id="edadActualizar${acudiente.documento}" .value="${acudiente.edad}" >
                        </div>
                        <div class="mb-3">
                            <label for="telefono" class="form-label">Telefono</label>
                            <input type="text" class="form-control" id="telefonoActualizar${acudiente.documento}" .value="${acudiente.telefono}" >
                        </div>

                        <button type="button" class="btn btn-primary" @click="${() => this.actualizarAcudiente(acudiente.documento)}">Actualizar</button>
                    </form>
                </div>
            </div>
        </div>
    </div>
    
    `
    )}
</div>

  `;
}
}

customElements.define('my-acudiente', WCACudienteview)