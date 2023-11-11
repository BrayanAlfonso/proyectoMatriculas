import { LitElement, html } from "lit-element";
import WCMainProfesoresStyle from "./WCMainProfesoresStyle";
import { wcCursosView } from "../WCCurso/wcCursosView";
import { SalonesViews } from "../WCSalon/wcSalonViews";

export class WCMainProfesoresView extends LitElement {

    constructor() {
        super();
        this.nombre = '';
        this.documento = '';
        this.edad = '';
        this.materia = '';
        this.jornada = '';
        this.curso = '';
        this.main=''
        this.selectedView = 'profesores';

    }

    static get properties() {
        return {
            nombre: { type: String },
            documento: { type: String },
            profesores:{type: Array},
            salones:{type: Array},
            cursos:{type: Array},
            edad: { type: String },
            materia: { type: String },
            jornada: { type: String },
            curso: { type: String },
            main:{type:String},
            selectedView: { type: String }
        }
    }

    static get scopedElements(){
        return {
            "cursos-views":wcCursosView,
            "salones-views":SalonesViews
        };
    }


    static get styles(){
        return[WCMainProfesoresStyle]
    }

    mostrarCursos(x){
        if(x){
            let main = this.shadowRoot.getElementById("main")
            main.innerHTML=``
            this.main= html`<cursos-views .cursos="${this.cursos}" .profesores="${this.profesores}" .salones="${this.salones}"></cursos-views>`

        }else{
            this.main= html``
        }
        return this.main
    }

    mostrarSalones(x){
        if(x){
            let main = this.shadowRoot.getElementById("main")
            main.innerHTML=``
            this.main= html`<salones-views .salones="${this.salones}"></salones-views>`

        }else{
            this.main= html``
        }
        return this.main
    }
    mostrarMainProfesores(x){
        if(x){
            let main = this.shadowRoot.getElementById("main")
            main.innerHTML=``
            this.main = html`<wc-mainprofesoresview .profesores="${this.profesores}" .salones="${this.salones}" .cursos="${this.cursos}"></wc-mainprofesoresview>`
        }else{
            this.main=html``
        }
        return this.main
        
    }

    cargarProfesores() {
        const data = localStorage.getItem('profesores');
        return data ? JSON.parse(data) : [];
    }

    guardarProfesores() {
        localStorage.setItem('profesores', JSON.stringify(this.profesores));
        localStorage.setItem('salones', JSON.stringify(this.salones));
    }

    registrarProfesor() {
        if (this.documento && this.nombre && this.edad && this.materia && this.jornada && this.curso) {
            const nuevoProfesor = {
                documento: this.documento,
                nombre: this.nombre,
                edad: this.edad,
                materia: this.materia,
                jornada: this.jornada,
                curso: this.curso
            };
            this.profesores.push(nuevoProfesor);
            console.log(this.profesores,this.salones)
            this.guardarProfesores();

            this.documento = '';
            this.nombre = '';
            this.edad = '';
            this.materia = '';
            this.jornada = '';
            this.curso = '';

            this.requestUpdate();
        }
        this.cerrarModal()
    }


    actualizarProfesor(profesor) {
        console.log(profesor);
        let arregloProfesor = this.profesores.find((arregloProfesor) => arregloProfesor.documento === profesor)
        console.log(arregloProfesor);
        let documentoA = this.shadowRoot.querySelector(`#documentoActualizar${profesor}`).value
        let nombreA = this.shadowRoot.querySelector(`#nombreActualizar${profesor}`).value
        let edadA = this.shadowRoot.querySelector(`#edadActualizar${profesor}`).value
        let materiaA = this.shadowRoot.querySelector(`#materiaActualizar${profesor}`).value
        let jornadaA = this.shadowRoot.querySelector(`#jornadaActualizar${profesor}`).value
        let cursoA = this.shadowRoot.querySelector(`#cursoActualizar${profesor}`).value

        console.log(documentoA, nombreA, edadA, materiaA, jornadaA, cursoA)

        arregloProfesor.documento = documentoA
        arregloProfesor.nombre = nombreA
        arregloProfesor.edad = edadA
        arregloProfesor.materia = materiaA
        arregloProfesor.jornada = jornadaA
        arregloProfesor.curso = cursoA

        this.requestUpdate()
    }


    eliminarProfesor(profesorDocumento) {
        const indice = this.profesores.findIndex(profesor => profesor.documento === profesorDocumento);
        if (indice !== -1) {
            this.profesores.splice(indice, 1); // Elimina 1 elemento a partir del índice encontrado
            this.requestUpdate()
        } else {
            console.log("Profesor no encontrado");
        }
    }
    

    abrirModal() {
        const miModal = this.shadowRoot.querySelector("#modalRegistro");
        miModal.style.display = "block";
        miModal.style.background="rgb(0,0,0,0.7)"
        
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



    navigate(location) {
        Router.go(location);

    }


    buscarDatos() {
        const documento = this.shadowRoot.querySelector("#documento").value;
        const nombre = this.shadowRoot.querySelector("#nombre").value;

        const profesorEncontrado = this.profesores.find(
            (profesor) => profesor.documento === documento && profesor.nombre === nombre
        );

        if (profesorEncontrado) {
            this.resultados = html`
      <div class="col-12 mt-3 d-flex flex-grow-1">
        <div class="h-100 bg-white border p-3">
          <h1>Usuario Encontrado</h1>
          <p><strong>Documento:</strong> ${profesorEncontrado.documento}</p>
          <p><strong>Nombre:</strong> ${profesorEncontrado.nombre}</p>
          <p><strong>Edad:</strong> ${profesorEncontrado.edad}</p>
          <p><strong>Materia:</strong> ${profesorEncontrado.materia}</p>
          <p><strong>Jornada:</strong> ${profesorEncontrado.jornada}</p>
          <p><strong>Curso:</strong> ${profesorEncontrado.curso}</p>
        </div>
      </div>
    `;
        } else {
            this.resultados = html`
      <div class="col-12 mt-3 d-flex flex-grow-1">
        <div class="h-100 bg-white border p-3">
          <h1>Profesor no encontrado</h1>
        </div>
      </div>
    `;
        }
        this.requestUpdate();
    }

    static get scopedElements() {
        return {
            "my-profesor": MyElement,
        };
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
                            <h1 class="mb-0">Profesores</h1>
                            <button class="input-1 bg-success text-light p-2 mx-5" href="javascript:;" @click="${this.abrirModal}">
                            <i class="bi-person-plus-fill me-1"></i> Nuevo</button>
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
                                            <label for="nombre" class="form-label">Nombre de profesor</label>
                                            <input type="text" class="form-control" id="nombre" .value="${this.nombre}" @input="${(e) => (this.nombre = e.target.value)}">
                                        </div>
                                        <div class="mb-3">
                                            <label for="identificacion" class="form-label">Documento</label>
                                            <input type="text" class="form-control" id="identificacion" .value="${this.documento}" @input="${(e) => (this.documento = e.target.value)}">
                                        </div>
                                        <div class="mb-3">
                                            <label for="campana" class="form-label">Edad</label>
                                            <input type="text" class="form-control" id="campana" .value="${this.edad}" @input="${(e) => (this.edad = e.target.value)}">
                                        </div>
                                        <div class="mb-3">
                                            <label for="telefono" class="form-label">Materia</label>
                                            <input type="text" class="form-control" id="telefono" .value="${this.materia}" @input="${(e) => (this.materia = e.target.value)}">
                                        </div>
                                        <div class="mb-3">
                                            <label for="telefono" class="form-label">Jornada</label>
                                            <input type="text" class="form-control" id="telefono" .value="${this.jornada}" @input="${(e) => (this.jornada = e.target.value)}">
                                        </div>
                                        <div class="mb-3">
                                            <label for="estado" class="form-label">Curso</label>
                                            <input type="text" class="form-control" id="estado" .value="${this.curso}" @input="${(e) => (this.curso = e.target.value)}">
                                        </div>
                                        <button type="button" class="bg-blue1 text-white" @click="${this.registrarProfesor}">Enviar</button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    ${this.profesores.map(
        (profesor) => html`
            <div class="d-flex mx-5 my-3 border-content3-01 p-3">
                <div class="d-flex border-list justify-content-center align-items-center">
                    <div class="d-flex justify-content-center align-items-center m-3 my-1 rounder bg-light">
                        <i class="m-5 fa-solid fa-user fa-2xl"></i>
                    </div>
                </div>
        
                <div class="d-flex flex-column w-100 m-3 border-list2">
                    <div>
                        <h1 class="my-1 w-75">${profesor.nombre}</h1>
                    </div>
                    <div class="d-flex">
                        <div class="d-flex flex-column justify-content-center m-2 mu-1 w-33">
                            
                            <p><strong>Documento: </strong>${profesor.documento}</p>
                            <p><strong>Edad: </strong>${profesor.edad}</p>
                        </div>
                        <div class="d-flex flex-column justify-content-center m-2 w-33">
                            <p><strong>Materia: </strong>${profesor.materia}</p>
                            <p><strong>Jornada: </strong>${profesor.jornada}</p>
                            <p><strong>Curso: </strong>${profesor.curso}</p>
                        </div>
                        <div>
                            <div class="d-flex flex-column m-3 h-65 vw-50 ">
                                <button type="button" class="m-1 input-1 bg-danger text-light"><i class="fa-regular fa-trash-can" @click="${() => this.eliminarProfesor(profesor.documento)}"> Eliminar</i></button>
                            </div>
                            <div class="d-flex flex-column m-3 h-65 vw-50 ">
                                <button type="button" class="m-1 input-1 bg-info text-light"><i class="fa-regular fa-trash-can" @click="${()=>this.abrirModalActualizar(profesor.documento)}"> Actualizar</i></button>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        
        <div class="modal" id="modalActualizar${profesor.documento}" tabindex="-1" role="dialog" style="display: none;">
            <div class="modal-dialog modal-dialog-centered bg-transparent" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">Formulario de Actualización</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" @click="${(e)=>this.cerrarModalActualizar(profesor.documento)}"></button>
                    </div>
                    <div class="modal-body">
                        <form id="actualizarForm">
                            <div class="mb-3">
                                <label for="nombre" class="form-label">Nombre de profesor</label>
                                <input type="text" class="form-control" id="nombreActualizar${profesor.documento}" .value="${profesor.nombre}">
                            </div>
                            <div class="mb-3">
                                <label for="identificacion" class="form-label">Documento</label>
                                <input type="text" class="form-control" id="documentoActualizar${profesor.documento}" .value="${profesor.documento}">
                            </div>
                            <div class="mb-3">
                                <label for="campana" class="form-label">Edad</label>
                                <input type="text" class="form-control" id="edadActualizar${profesor.documento}" .value="${profesor.edad}">
                            </div>
                            <div class="mb-3">
                                <label for="telefono" class="form-label">Materia</label>
                                <input type="text" class="form-control" id="materiaActualizar${profesor.documento}" .value="${profesor.materia}" >
                            </div>
                            <div class="mb-3">
                                <label for="telefono" class="form-label">Jornada</label>
                                <input type="text" class="form-control" id="jornadaActualizar${profesor.documento}" .value="${profesor.jornada}" >
                            </div>
                            <div class="mb-3">
                                <label for="estado" class="form-label">Curso</label>
                                <input type="text" class="form-control" id="cursoActualizar${profesor.documento}" .value="${profesor.curso}">
                            </div>
                            <button type="button" class="btn btn-primary" @click="${() => this.actualizarProfesor(profesor.documento)}">Actualizar</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
        
        `
        )}
</div>
`
    }
}

customElements.define('wc-mainprofesoresview', WCMainProfesoresView)