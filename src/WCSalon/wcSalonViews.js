import { LitElement, html } from 'lit-element';
import stylesScss from './wcSalonStyle';

export class SalonesViews extends LitElement {
  constructor() {
    super();
    this.salonIdActual = null;

  }


  static get properties() {
    return {
      salones: { type: Array },
    }
  }

  static get styles() {
    return [stylesScss];
  }

  abrirAgregarSalon() {
    const modal = this.shadowRoot.querySelector(`#modalAgregarSalon`);
    modal.style.display = "block";
    modal.style.background = "rgb(0,0,0,0.7)";
  }

  cerrarAgregarSalon() {
    const modal = this.shadowRoot.querySelector(`#modalAgregarSalon`);
    modal.style.display = "none";
    modal.style.background = "none";
  }

  abrirActualizarSalon(salonId) {
    console.log(salonId)
    const salon = this.salones.find((s) => s.id === salonId);

    if (salon) {
      this.shadowRoot.getElementById('piso').value = salon.piso;
      this.salonIdActual = salonId;
      const modal = this.shadowRoot.querySelector(`#modalActualizar${salonId}`);
      modal.style.display = "block";
    } else {
      console.error('Salon no encontrado para actualizar.');
    }
  }

  cerrarActualizarSalon(idSalon) {
    console.log(idSalon)
    const modal = this.shadowRoot.querySelector(`#modalActualizar${idSalon}`);
    modal.style.display = "none";
    modal.style.background = "none";
  }

  render() {
    return html`
    <style>
      @import url('https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css');
      @import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css');
    </style>
    <div class="d-flex flex-column m-5 vh-50 border-content3-01" id="main">
    <div class=" d-flex flex-column ">
    <!-- Sección a la derecha -->
    <div class="container-fluid">
        <div class="page-header">
            <div class="row align-items-center justify-content-between">
                <div class="m-3 d-flex align-items-center justify-content-between">
                        <h1 class="mb-0">Lista de Salones</h1>
                            <button class="input-1 bg-success text-light p-2 mx-5" href="javascript:;" @click="${()=>this.abrirAgregarSalon()}">
                            <i class="bi-person-plus-fill me-1"></i> Agregar salon</button>
                    </div>

                    
                    <div class="modal" id="modalAgregarSalon" tabindex="-1" role="dialog" style="display: none;">
                        <div class="modal-dialog modal-dialog-centered bg-transparent" role="document">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h5 class="modal-title" id="exampleModalLabel">Formulario de Registro</h5>
                                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" @click="${()=>this.cerrarAgregarSalon()}"></button>
                                </div>
                                <div class="modal-body">
                                  <div class="d-flex flex-column">
                                    <label for="profesor">Id salon:</label>
                                    <input class=" p-2 border-10 border-1" id="salon" name="salon" placeholder="salon">
                                  </div>
                                  <div class="d-flex flex-column">
                                    <label for="capacidad">Piso:</label>
                                    <input class=" p-2 border-10 border-1" id="piso" name="piso" placeholder="piso">
                                  </div>
                                </div>
                                <div class="d-flex justify-content-center aling-items-center m-3">
                                  <button class="bg-icon text-white p-2 border-10" @click=${(e)=>this.agregarSalon()}>Agregar</buttton>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    ${this.salones.map(
        (salon) => html`
            <div class="d-flex mx-5 my-3 border-content3-01 p-3">
                <div class="d-flex border-list justify-content-center align-items-center">
                    <div class="d-flex justify-content-center align-items-center m-3 my-1 rounder bg-light">
                        <i class="m-5 fa-solid fa-user fa-2xl"></i>
                    </div>
                </div>
        
                <div class="d-flex flex-column w-100 m-3 border-list2">
                    <div>
                        <h1 class="my-1 w-75">Salon numero ${salon.id}</h1>
                    </div>
                    <div class="d-flex">
                        <div class="d-flex flex-column justify-content-center m-2 mu-1 w-33">
                            <p><strong>Documento: </strong>${salon.piso}</p>
                        </div>
                        <div class="d-flex flex-column justify-content-center m-2 w-33">
                        <p><strong>Edad: </strong>${salon.estado}</p>
                        </div>
                        <div>
                            <div class="d-flex flex-column m-3 h-65 vw-50 ">
                                <button type="button" class="m-1 input-1 bg-danger text-light"><i class="fa-regular fa-trash-can" @click="${() => this.borrarSalon(salon.id)}"> Eliminar</i></button>
                            </div>
                            <div class="d-flex flex-column m-3 h-65 vw-50 ">
                                <button type="button" class="m-1 input-1 bg-info text-light"><i class="fa-regular fa-trash-can" @click="${()=>this.abrirActualizarSalon(salon.id)}"> Actualizar</i></button>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        
        <div class="modal" id="modalActualizar${salon.id}" tabindex="-1" role="dialog" style="display: none;">
            <div class="modal-dialog modal-dialog-centered bg-transparent" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">Formulario de Actualización</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" @click="${(e)=>this.cerrarActualizarSalon(salon.id)}"></button>
                    </div>
                    <div class="modal-body">
                        <form id="actualizarForm">
                            <div class="mb-3">
                                <label for="nombre" class="form-label">Piso:</label>
                                <input type="text" class="form-control" id="pisoActualizar${salon.id}" .value="${salon.piso}">
                            </div>
                            <button type="button" class="btn btn-primary" @click="${() => this.actualizarSalon()}">Actualizar</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
        
        `
        )}
    `;
  }

  saveSalonesToLocalStorage(salones) {
    localStorage.setItem('salones', JSON.stringify(salones));
  }

  limpiarFormulario() {
    this.shadowRoot.getElementById('salon').value = '';
    this.shadowRoot.getElementById('piso').value = '';
  }


  agregarSalon() {
    
    const salon = this.shadowRoot.getElementById('salon').value;
    const piso = this.shadowRoot.getElementById('piso').value;

    const nuevoSalon = {
      id: salon, 
      piso: piso,
      estado: 'activo',
    };
    this.salones.push(nuevoSalon)
      this.saveSalonesToLocalStorage(this.salones);
      this.requestUpdate();
      this.limpiarFormulario();
      this.cerrarAgregarSalon();
  }

  toggleEstado(salon) {
    salon.ESTADO = salon.ESTADO === "Activo" ? "Inactivo" : "Activo";
    this.saveSalonesToLocalStorage(this.salones);
    this.requestUpdate('salones');
  }

  borrarSalon(id) {
    const indice = this.salones.findIndex(salon => salon.id === id);
    if (indice !== -1) {
        this.salones.splice(indice, 1); // Elimina 1 elemento a partir del índice encontrado
        this.requestUpdate()
    } else {
        console.log("Salon no encontrado");
    }
  }

  actualizarSalon() {
    const pisoActual = this.shadowRoot.getElementById(`pisoActualizar${this.salonIdActual}`).value;

    if (this.salonIdActual !== null) {
      const indiceSalon = this.salones.findIndex((salon) => salon.id === this.salonIdActual);

      if (indiceSalon !== -1) {
        this.salones[indiceSalon].piso = pisoActual;

        this.cerrarActualizarSalon(this.salonIdActual);
        this.saveSalonesToLocalStorage(this.salones);
        this.salonIdActual = null;
        this.requestUpdate('salones');
      } else {
        console.error('Salon no encontrado para actualizar.');
      }
    } else {
      console.error('No se ha seleccionado un salon para actualizar.');
    }
  }

  saveSalonesToLocalStorage(salones) {
    localStorage.setItem('salones', JSON.stringify(salones));
  }

  getSalonesFromLocalStorage() {
    const salones = localStorage.getItem('salones');
    return salones ? JSON.parse(salones) : [];
  }
}

customElements.define('salones-views', SalonesViews);
