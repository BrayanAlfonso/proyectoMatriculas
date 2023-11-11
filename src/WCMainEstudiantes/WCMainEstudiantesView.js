import { LitElement, html } from "lit-element";
import WCMainEstudiantesStyle from "./WCMainEstudiantesStyle";

export class WCMainEstudiantesView extends LitElement{

    constructor(){
        super();
        this.Estudiantes=[
            {
            nombreE: 'Joel Sebastian',
            documentoE: '1029141439',
            edadE: '18',
            cursoE: '11',
            discapacidadE: 'Ninguna',
            acudienteE: 'N.A.R.P',
            epsE: 'Sanitas',
            direccionE: 'Calle 45 Sur 17-32',
            certifEstudioE: 'si',
            telefonoE: '2343232421',
            jornada: 'Diurna'
            }
        ];
        this.nombreE='',
        this.documentoE='',
        this.edadE='',
        this.cursoE='',
        this.discapacidadE='',
        this.acudienteE='',
        this.epsE='',
        this.direccionE='',
        this.certifEstudioE='',
        this.telefonoE='',
        this.jornada=''
    }

    static get styles(){
        return[WCMainEstudiantesStyle]
    }

    static get properties() {
        return {
          Estudiantes: { type: Array },
          nombreE: { type: String },
          documentoE: { type: String },
          edadE: { type: String },
          cursoE: { type: String },
          discapacidadE: { type: String },
          acudienteE: { type: String },
          epsE: { type: String },
          direccionE: { type: String },
          certifEstudioE: { type: String },
          telefonoE: { type: String },
          jornada: { type: String }
        }
    }

    //LOCALSTORAGE

    cargaEstudiantes() {
        const data = localStorage.getItem('Estudiantes');
        return data ? JSON.parse(data) : [];
    }
    
    guardarEstudiantes() {
        localStorage.setItem('Estudiantes', JSON.stringify(this.Estudiantes));
    }

    //CRUD

    registrarEstudiante() {
        if (this.nombreE && this.direccionE && this.edadE && this.cursoE && this.discapacidadE && this.acudienteE && this.epsE && this.direccionE && this.certifEstudioE && this.telefonoE && this.jornada) {
            const nuevoEstudiante = {
                nombreE: this.nombreE,
                documentoE: this.documentoE,
                edadE: this.edadE,
                cursoE: this.cursoE,
                discapacidadE: this.discapacidadE,
                acudienteE: this.acudienteE,
                epsE: this.epsE,
                direccionE: this.direccionE,
                certifEstudioE: this.certifEstudioE,
                telefonoE: this.telefonoE,
                jornada: this.jornada
            };
            this.Estudiantes.push(nuevoEstudiante);
            this.guardarEstudiantes();
        
            this.nombreE = '';
            this.documentoE = '';
            this.edadE = '';
            this.cursoE = '';
            this.discapacidadE = '';
            this.acudienteE = '';
            this.epsE = '';
            this.direccionE = '';
            this.certifEstudioE = '';
            this.telefonoE = '';
            this.jornada = '';
        
            this.requestUpdate();
            this.cerrarModal();
        }
    }

    actualizarEstudiante(Estudiante) {
        console.log(Estudiante);
        let arregloEstudiante = this.Estudiantes.find((arregloEstudiante)=>arregloEstudiante.documentoE === Estudiante)
        console.log(arregloEstudiante);
        let nombreE = this.shadowRoot.querySelector('#nombreEActualizar').value;
        let documentoE = this.shadowRoot.querySelector('#documentoEActualizar').value;
        let edadE = this.shadowRoot.querySelector('#edadEActulizar').value;
        let cursoE = this.shadowRoot.querySelector('#cursoEActualizar').value;
        let discapacidadE = this.shadowRoot.querySelector('#discapacidadEActualizar').value;
        let acudienteE = this.shadowRoot.querySelector('#acudienteEActualizar').value;
        let epsE = this.shadowRoot.querySelector('#epsEActualizar').value;
        let direccionE = this.shadowRoot.querySelector('#direccionEActualizar').value;
        let certifEstudioE = this.shadowRoot.querySelector('#certifEstudioEActualizar').value;
        let telefonoE = this.shadowRoot.querySelector('#telefonoEActualizar').value;
        let jornada = this.shadowRoot.querySelector('#jornadaActualizar').value;

        arregloEstudiante.nombreE = nombreE
        arregloEstudiante.documentoE = documentoE
        arregloEstudiante.edadE = edadE
        arregloEstudiante.cursoE = cursoE
        arregloEstudiante.discapacidadE = discapacidadE
        arregloEstudiante.acudienteE = acudienteE
        arregloEstudiante.epsE = epsE
        arregloEstudiante.direccionE = direccionE
        arregloEstudiante.certifEstudioE = certifEstudioE
        arregloEstudiante.telefonoE = telefonoE
        arregloEstudiante.jornada = jornada
    
        this.requestUpdate()
        this.cerrarModalActualizar()
    }

    eliminarEstudiante(Estudiante) {
        if (Estudiante && Estudiante.documentoE) {
          this.Estudiantes = this.Estudiantes.filter(p => p.documentoE !== Estudiante.documentoE);
          this.guardarEstudiantes();
        } else {
          console.log("Error Al Eliminar el Estudiante");
        }
    }

    //MODALES

    abrirModal() {  
        const miModal = this.shadowRoot.querySelector("#modalRegistro");
        miModal.style.display = "block";

    }
      
    cerrarModal() {
        const miModal = this.shadowRoot.querySelector("#modalRegistro");
        miModal.style.display = "none";
    }
      
    abrirModalActualizar() {
        const miModal = this.shadowRoot.querySelector("#modalActualizar");
        miModal.style.display = "block";
    }
      
    cerrarModalActualizar() {
        console.log("modal cerrado")
        const miModal = this.shadowRoot.querySelector("#modalActualizar");
        miModal.style.display = "none";
    }
    
    abrirModalConsulta() {
        const miModal = this.shadowRoot.querySelector("#modalConsulta");
        miModal.style.display = "block";
    }
      
    cerrarModalConsulta() {
        console.log("modal cerrado")
        const miModal = this.shadowRoot.querySelector("#modalConsulta");
        miModal.style.display = "none";
    }

    //Element

    static get scopedElements(){
        return{
            "estudiante-element": EstudianteElement,
        };
    }

    render() {
        return html`
        <style>
            @import url('https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css');
            @import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css');
        </style>


        <!-- CUERPO -->

        <div class="d-flex flex-column p-5 border-content2 vh-100 vw-100">
            <div class="d-flex m-3 border-content3">              

                <!-- BOTONES -->
                

                <div class="col">
                    <div class="d-flex m-3 h-65 vw-25 ">
                        <button type="button" id="botonAbrirModal" class="m-1 input-1 bg-success text-light"><i class="fa-solid fa-plus" @click="${this.abrirModal}"> Crear</i></button>
                    </div>

                    <div class="modal" id="modalRegistro" tabindex="-1" role="dialog" style="display: none;">
                        <div class="modal-dialog" role="document">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h5 class="modal-title" id="exampleModalLabel">Formulario de Registro</h5>
                                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" @click="${this.cerrarModal}"></button>
                                    </div>
                                    <div class="modal-body">
                                        <form id="registroForm">
                                            <div class="mb-3">
                                                <label for="nombreE" class="form-label">Nombre</label>
                                                <input type="text" class="form-control" id="documento" .value="${this.nombreE}" @input="${(e) => (this.nombreE = e.target.value)}">
                                            </div>
                                            <div class="mb-3">
                                                <label for="documentoE" class="form-label">Documento</label>
                                                <input type="text" class="form-control" id="nombre" .value="${this.documentoE}" @input="${(e) => (this.documentoE = e.target.value)}">
                                            </div>
                                            <div class="mb-3">
                                                <label for="edadE" class="form-label">Edad</label>
                                                <input type="text" class="form-control" id="edadE" .value="${this.edadE}" @input="${(e) => (this.edadE = e.target.value)}">
                                            </div>
                                            <div class="mb-3">
                                                <label for="cursoE" class="form-label">Curso</label>
                                                <input type="text" class="form-control" id="cursoE" .value="${this.cursoE}" @input="${(e) => (this.cursoE = e.target.value)}">
                                            </div>
                                            <div class="mb-3">
                                                <label for="discapacidadE" class="form-label">Discapacidad</label>
                                                <input type="text" class="form-control" id="discapacidadE" .value="${this.discapacidadE}" @input="${(e) => (this.discapacidadE = e.target.value)}">
                                            </div>
                                            <div class="mb-3">
                                                <label for="acudienteE" class="form-label">Acudiente</label>
                                                <input type="text" class="form-control" id="acudienteE" .value="${this.acudienteE}" @input="${(e) => (this.acudienteE = e.target.value)}">
                                            </div>
                                            <div class="mb-3">
                                                <label for="epsE" class="form-label">EPS</label>
                                                <input type="text" class="form-control" id="epsE" .value="${this.epsE}" @input="${(e) => (this.epsE = e.target.value)}">
                                            </div>
                                            <div class="mb-3">
                                                <label for="direccionE" class="form-label">Dirección</label>
                                                <input type="text" class="form-control" id="direccionE" .value="${this.direccionE}" @input="${(e) => (this.direccionE = e.target.value)}">
                                            </div>
                                            <div class="mb-3">
                                                <label for="certifEstudioE" class="form-label">Certificados</label>
                                                <input type="text" class="form-control" id="cetifEstudioE" .value="${this.certifEstudioE}" @input="${(e) => (this.certifEstudioE = e.target.value)}">
                                            </div>
                                            <div class="mb-3">
                                                <label for="telefonoE" class="form-label">Telefono</label>
                                                <input type="text" class="form-control" id="telefonoE" .value="${this.telefonoE}" @input="${(e) => (this.telefonoE = e.target.value)}">
                                            </div>
                                            <div class="mb-3">
                                                <label for="jornada" class="form-label">Jornada</label>
                                                <input type="text" class="form-control" id="jornada" .value="${this.jornada}" @input="${(e) => (this.jornada = e.target.value)}">
                                            </div>
                                                <button type="button" class="btn btn-primary" @click="${this.registrarEstudiante}">Enviar</button>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            
                <div class="d-flex flex-column m-3 vh-50 border-content3-01">

                <!-- LISTA -->
                    
                            <!-- LISTA - INFO -->

                    ${this.Estudiantes.map(
                        (Estudiante) => html`
                            
                    <div class="d-flex">
                        <div class="d-flex h-65 vw-7 m-3">

                            <!-- LISTA - ICON-PROFILE -->

                            <div class="d-flex border-list">
                                <div class="d-flex justify-content-center align-item-center m-3 my-1 rounder aling-item-center">
                                    <i class="m-5 fa-solid fa-user fa-2xl"></i>
                                </div>
                            </div>

                        </div>
                        <div class="d-flex h-65 vw-93 m-3">
                        <div class="d-flex vw-100 border-list2">
                                <div class="d-flex flex-column w-50 justify-content-center m-2 mu-1 ">
                                    <h4 class="my-1 w-75"><strong>${Estudiante.nombreE}</strong></h4>
                                    <p><strong>Curso: </strong>${Estudiante.cursoE}</p>
                                    <p><strong>Edad: </strong>${Estudiante.edadE}</p>
                                </div>
                                <div class="d-flex flex-column w-25 justify-content-center m-2 ">
                                    <p><strong>Jornada: </strong>${Estudiante.jornada}</p>
                                </div>
                                <div class="d-flex flex-column w-25 justify-content-center m-2 ">
                                    <div class="d-flex flex-column m-3 h-65 vw-50 ">
                                        <button type="button" class="m-1 input-1 bg-danger text-light"><i class="fa-regular fa-trash-can" @click="${() => this.eliminarEstudiante(Estudiante)}"> Eliminar</i></button>
                                    </div>
                                    <div class="d-flex flex-column m-3 h-65 vw-50 ">
                                        <button type="button" class="m-1 input-1 bg-info text-light"><i class="fa-regular fa-trash-can" @click="${this.abrirModalActualizar}"> Actualizar</i></button>
                                    </div>

                                    <div class="modal" id="modalActualizar" tabindex="-1" role="dialog" style="display: none;">
                                        <div class="modal-dialog" role="document">
                                            <div class="modal-content">
                                                <div class="modal-header">
                                                    <h5 class="modal-title" id="exampleModalLabel">Actualizar Estudiante</h5>
                                                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" @click="${this.cerrarModalActualizar}"></button>
                                                    </div>
                                                    <div class="modal-body">
                                                        <form id="actualizarForm">
                                                            <div class="mb-3">
                                                                <label for="nombreE" class="form-label">Nombre</label>
                                                                <input type="text" class="form-control" id="nombreEActualizar" .value="${Estudiante.nombreE}">
                                                            </div>
                                                            <div class="mb-3">
                                                                <label for="documentoE" class="form-label">Documento</label>
                                                                <input type="text" class="form-control" id="documentoEActualizar" .value="${Estudiante.documentoE}">
                                                            </div>
                                                            <div class="mb-3">
                                                                <label for="edadE" class="form-label">Edad</label>
                                                                <input type="text" class="form-control" id="edadEActulizar" .value="${Estudiante.edadE}" >
                                                            </div>
                                                            <div class="mb-3">
                                                                <label for="cursoE" class="form-label">Curso</label>
                                                                <input type="text" class="form-control" id="cursoEActualizar" .value="${Estudiante.cursoE}">
                                                            </div>
                                                            <div class="mb-3">
                                                                <label for="discapacidadE" class="form-label">Discapacidad</label>
                                                                <input type="text" class="form-control" id="discapacidadEActualizar" .value="${Estudiante.discapacidadE}">
                                                            </div>
                                                            <div class="mb-3">
                                                                <label for="acudienteE" class="form-label">Acudiente</label>
                                                                <input type="text" class="form-control" id="acudienteEActualizar" .value="${Estudiante.acudienteE}">
                                                            </div>
                                                            <div class="mb-3">
                                                                <label for="epsE" class="form-label">EPS</label>
                                                                <input type="text" class="form-control" id="epsEActualizar" .value="${Estudiante.epsE}">
                                                            </div>
                                                            <div class="mb-3">
                                                                <label for="direccionE" class="form-label">Dirección</label>
                                                                <input type="text" class="form-control" id="direccionEActualizar" .value="${Estudiante.direccionE}">
                                                            </div>
                                                            <div class="mb-3">
                                                                <label for="certifEstudioE" class="form-label">Certificados</label>
                                                                <input type="text" class="form-control" id="certifEstudioEActualizar" .value="${Estudiante.certifEstudioE}">
                                                            </div>
                                                            <div class="mb-3">
                                                                <label for="telefonoE" class="form-label">Telefono</label>
                                                                <input type="text" class="form-control" id="telefonoEActualizar" .value="${Estudiante.telefonoE}">
                                                            </div>
                                                            <div class="mb-3">
                                                                <label for="jornada" class="form-label">Jornada</label>
                                                                <input type="text" class="form-control" id="jornadaActualizar" .value="${Estudiante.jornada}">
                                                            </div>
                                                                <button type="button" class="btn btn-primary" @click="${() => this.actualizarEstudiante(Estudiante.documentoE)}">Enviar</button>
                                                        </form>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="d-flex flex-column m-3 my-3 h-65 vw-50 ">
                                            <button type="button" class="m-1 input-1 bg-warning text-light"><i class="fa-regular fa-trash-can" @click="${this.abrirModalConsulta}"> Ver Info</i></button>
                                        </div>
                                        <div class="modal" id="modalConsulta" tabindex="-1" role="dialog" style="display: none;">
                                            <div class="modal-dialog" role="document">
                                                <div class="modal-content">
                                                    <div class="modal-header">
                                                        <h5 class="modal-title" id="exampleModalLabel">Información del Estudiante</h5>
                                                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" @click="${this.cerrarModalConsulta}"></button>
                                                        </div>
                                                        <div class="modal-body">
                                                            <form id="consultarForm">
                                                                <div class="mb-3">
                                                                    <label for="nombreE" class="form-label">Nombre</label>
                                                                    <input type="text" class="form-control" id="nombreEActualizar" .value="${Estudiante.nombreE}">
                                                                </div>
                                                                <div class="mb-3">
                                                                    <label for="documentoE" class="form-label">Documento</label>
                                                                    <input type="text" class="form-control" id="documentoEActualizar" .value="${Estudiante.documentoE}">
                                                                </div>
                                                                <div class="mb-3">
                                                                    <label for="edadE" class="form-label">Edad</label>
                                                                    <input type="text" class="form-control" id="edadEActulizar" .value="${Estudiante.edadE}" >
                                                                </div>
                                                                <div class="mb-3">
                                                                    <label for="cursoE" class="form-label">Curso</label>
                                                                    <input type="text" class="form-control" id="cursoEActualizar" .value="${Estudiante.cursoE}">
                                                                </div>
                                                                <div class="mb-3">
                                                                    <label for="discapacidadE" class="form-label">Discapacidad</label>
                                                                    <input type="text" class="form-control" id="discapacidadEActualizar" .value="${Estudiante.discapacidadE}">
                                                                </div>
                                                                <div class="mb-3">
                                                                    <label for="acudienteE" class="form-label">Acudiente</label>
                                                                    <input type="text" class="form-control" id="acudienteEActualizar" .value="${Estudiante.acudienteE}">
                                                                </div>
                                                                <div class="mb-3">
                                                                    <label for="epsE" class="form-label">EPS</label>
                                                                    <input type="text" class="form-control" id="epsEActualizar" .value="${Estudiante.epsE}">
                                                                </div>
                                                                <div class="mb-3">
                                                                    <label for="direccionE" class="form-label">Dirección</label>
                                                                    <input type="text" class="form-control" id="direccionEActualizar" .value="${Estudiante.direccionE}">
                                                                </div>
                                                                <div class="mb-3">
                                                                    <label for="certifEstudioE" class="form-label">Certificados</label>
                                                                    <input type="text" class="form-control" id="certifEstudioEActualizar" .value="${Estudiante.certifEstudioE}">
                                                                </div>
                                                                <div class="mb-3">
                                                                    <label for="telefonoE" class="form-label">Telefono</label>
                                                                    <input type="text" class="form-control" id="telefonoEActualizar" .value="${Estudiante.telefonoE}">
                                                                </div>
                                                                <div class="mb-3">
                                                                    <label for="jornada" class="form-label">Jornada</label>
                                                                    <input type="text" class="form-control" id="jornadaActualizar" .value="${Estudiante.jornada}">
                                                                </div>
                                                                    <button type="button" class="btn btn-primary" @click="${this.cerrarModalConsulta}">Cerrar</button>
                                                            </form>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>   
                            </div>
                        </div>
                    </div>
                </div>
                        `
                    )}
            </div>
        </div>

        `;
    }
}

customElements.define("wc-mainestudiantes",WCMainEstudiantesView)