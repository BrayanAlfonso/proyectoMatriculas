import { LitElement, html, render } from 'lit-element';
import stylesScss from './wcCursosStyle';

export class wcCursosView extends LitElement {
  constructor() {
    super();
    this.cursoIdActual = null; 
    this.asientos2=[]
    
      this.asientosPorCurso = {};
  }

  
  static get properties() {
    return {
      cursos: { type: Array },
      profesores: { type: Array },
      salones: { type: Array },
      Estudiantes: { type: Array },
      asientos: { type: Array },
      asientos2:{type:Array}
    }
  }
  
  

  saveCursosToLocalStorage(cursos) {
    localStorage.setItem('cursos', JSON.stringify(cursos));
  }

  static get styles() {
    return [stylesScss];
  }
  abrirAgregarCurso() {
    const modal = this.shadowRoot.querySelector(`#modalAgregarCurso`);
    modal.style.display = "block";
    modal.style.background = "rgb(0,0,0,0.7)";

  }

  cerrarAgregarCurso() {
    const modal = this.shadowRoot.querySelector(`#modalAgregarCurso`);
    modal.style.display = "none";
    modal.style.background = "none";
  }

  abrirActualizar(cursoId) {
    const curso = this.cursos.find((c) => c.ID === cursoId);
    console.log(curso, cursoId)
    if (curso) {
      this.shadowRoot.getElementById(`profesorActual${cursoId}`).value = curso.PROFESOR;
      this.shadowRoot.getElementById(`capacidadActual${cursoId}`).value = curso.CAPACIDAD;
      this.shadowRoot.getElementById(`jornadaActual${cursoId}`).value = curso.JORNADA;
      this.shadowRoot.getElementById(`salonActual${cursoId}`).value = curso.SALON;

      this.cursoIdActual = cursoId;
      const modal = this.shadowRoot.querySelector(`#modalActualizar${cursoId}`);
      modal.style.display = "block";
    } else {
      console.error('Curso no encontrado para actualizar.');
    }
  }
  
  cerrarActualizar(id) {
    const modal = this.shadowRoot.querySelector(`#modalActualizar${id}`);
    modal.style.display = "none";
    modal.style.background = "none";
  }

  encontrarIndice(matriz, valor) {
    if (matriz && matriz.length) {
      for (let i = 0; i < matriz.length; i++) {
        const fila = matriz[i];
        if (fila && fila.length) {
          for (let j = 0; j < fila.length; j++) {
            if (fila[j] === valor) {
              return { fila: i, columna: j };
            }
          }
        }
      }
    }
    return null; // Si el valor no se encuentra o la matriz es inválida
  }

  
  asignarAsiento(idCurso) {
    this.generarDisposicionSillas(6,5,idCurso)
    const asientosCursoActual = this.asientosPorCurso[idCurso];
    console.log(asientosCursoActual)
    const estudianteSeleccionado = this.shadowRoot.getElementById(`estudianteSeleccionadoCurso${idCurso}`).value;
    const asientoSeleccionado = this.shadowRoot.getElementById(`asientoSeleccionadoCurso${idCurso}`).value;

    // Encontrar al estudiante y el asiento seleccionados
    const estudiante = this.Estudiantes.find((est) => est.nombreE === estudianteSeleccionado);

    if (estudiante) {
      estudiante.asignado = 1;

      // Cambiar el color del asiento a gris
      const asientoElement = this.shadowRoot.getElementById(`asiento${asientoSeleccionado}${idCurso}`);
      if (asientoElement) {
        asientoElement.style.backgroundColor = 'gray';
      }

      // Encontrar el índice del asiento en la matriz de asientos del curso actual
      const indice = this.encontrarIndice(asientosCursoActual, asientoSeleccionado);

      if (indice) {
        // Eliminar el asiento de la matriz de asientos del curso
        asientosCursoActual[indice.fila].splice(indice.columna, 1);
      }

      this.actualizarSelectores(idCurso); // Actualizar selectores después de la asignación
    }
  }
  
  

  actualizarSelectores(idCurso) {
    const estudianteSelector = this.shadowRoot.getElementById(`estudianteSeleccionadoCurso${idCurso}`);
    const asientoSelector = this.shadowRoot.getElementById(`asientoSeleccionadoCurso${idCurso}`);

    estudianteSelector.innerHTML = '';
    asientoSelector.innerHTML = '';

    const asientos = this.asientosPorCurso[idCurso];
    const estudiantesDisponibles = this.Estudiantes.filter((estudiante) => estudiante.asignado == 0 && estudiante.cursoE == idCurso);

    asientos.flat().forEach((asiento) => {
      const option = document.createElement('option');
      option.value = asiento;
      option.textContent = asiento;
      asientoSelector.appendChild(option);
    });

    estudiantesDisponibles.forEach((estudiante) => {
      const option = document.createElement('option');
      option.value = estudiante.nombreE;
      option.textContent = estudiante.nombreE;
      estudianteSelector.appendChild(option);
    });
  }
  

  abrirSillas(idCurso) {
    console.log(idCurso)
    // Resto de tu código...

    const modal = this.shadowRoot.querySelector(`#modalSillas${idCurso}`);
    modal.style.display = "block";
    modal.style.background = "rgb(0,0,0,0.7)";

  }

  cerrarSillas(idCurso){
    const modal = this.shadowRoot.querySelector(`#modalSillas${idCurso}`);
    modal.style.display = "none";
    modal.style.background = "none";
  }
  
  generarDisposicionSillas(numFilas, numColumnas, cursoID) {
    const letras = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const asientosCurso = [];

    for (let fila = 0; fila < numFilas; fila++) {
      const filaAsientos = [];

      for (let columna = 0; columna < numColumnas; columna++) {
        const asiento = `${letras.charAt(fila)}${columna + 1}`;
        filaAsientos.push(asiento);
      }

      asientosCurso.push(filaAsientos);
    }

    // Guardar la disposición de asientos para el curso específico
    this.asientosPorCurso[cursoID] = asientosCurso;
    return asientosCurso;
  }

  generarDisposicionSillas2(numFilas, numColumnas) {
    const letras = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'; // Cadena de letras para los asientos

  
    for (let fila = 0; fila < numFilas; fila++) {
      const filaAsientos = [];
  
      for (let columna = 0; columna < numColumnas; columna++) {
        const asiento = `${letras.charAt(fila)}${columna + 1}`;
        filaAsientos.push(asiento);
      }
  
      this.asientos2.push(filaAsientos);
    }
  
    return this.asientos2;
  }

  
  

  render() {
    const disposicionSillas = this.generarDisposicionSillas(6, 5);
    const disposicionSillas2 = this.generarDisposicionSillas2(6, 5);
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
                            <h1 class="mb-0">Lista de Cursos</h1>
                            <button class="input-1 bg-success text-light p-2 mx-5" href="javascript:;" @click=${(e)=>this.abrirAgregarCurso()}>
                            <i class="bi-person-plus-fill me-1"></i> Nuevo</button>
                    </div>

                    
                    <div class="modal " id="modalAgregarCurso" tabindex="-1" role="dialog" style="display: none;">
                        <div class="modal-dialog modal-dialog-centered bg-transparent" role="document">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h5 class="modal-title" id="exampleModalLabel">Formulario de Registro</h5>
                                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" @click="${()=>this.cerrarAgregarCurso()}"></button>
                                </div>
                                <div class="modal-body">
                                  <div class="d-flex flex-column">
                                  <label for="profesor">Profesor:</label>
                                  <select class=" p-2 border-10 border-1" id="profesor" name="profesor" placeholder="profesor">
                                  ${this.profesores.map(profe=>
                                    html`
                                    <option value="${profe.nombre}">${profe.nombre}</option>
                                    `
                                    )}
                                  </select>
                                </div>
                                <div class="d-flex flex-column">
                                  <label for="capacidad">Capacidad:</label>
                                  <input class=" p-2 border-10 border-1" id="capacidad" name="capacidad" placeholder="capacidad">
                                </div>
                                <div class="d-flex flex-column">
                                  <label for="jornada">Jornada:</label>
                                  <select class="p-2 border-10 border-1" id="jornada" name="jornada">
                                  <option value="Tarde">Tarde</option>
                                  <option value="Mañana">Mañana</option>
                                  </select> 
                                </div>
                                <div class="d-flex flex-column">
                                  <label for="salon">Salon:</label>
                                  <select class="p-2 border-10 border-1" id="salon" name="salon">
                                    ${this.salones.map(salon=> html`
                                  <option value="${salon.id}">${salon.id}</option>`)}
                                  </select>
                                </div>
                              </div>
                              <div class="d-flex justify-content-center aling-items-center m-3">
                                <button class="bg-icon text-white p-2 border-10" @click=${(e)=>this.agregarCurso()}>Agregar</buttton>
                              </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    ${this.cursos.map(
        (curso) => html`
            <div class="d-flex mx-5 my-3 border-content3-01 p-3">
                <div class="d-flex border-list justify-content-center align-items-center">
                    <div class="d-flex justify-content-center align-items-center m-3 my-1 rounder bg-light">
                        <i class="m-5 fa-solid fa-user fa-2xl"></i>
                    </div>
                </div>
        
                <div class="d-flex flex-column w-100 m-3 border-list2">
                    <div>
                        <h1 class="my-1 w-75">curso numero ${curso.ID}</h1>
                    </div>
                    <div class="d-flex">
                        <div class="d-flex flex-column justify-content-center m-2 mu-1 w-33"> 
                            <p><strong>Profesor: </strong>${curso.PROFESOR}</p>
                            <p><strong>capacidad: </strong>${curso.CAPACIDAD}</p>
                        </div>
                        <div class="d-flex flex-column justify-content-center m-2 w-33">
                            <p><strong>Jornada: </strong>${curso.JORNADA}</p>
                            <p><strong>Salon: </strong>${curso.SALON}</p>
                        </div>
                        <div>
                            <div class="d-flex flex-column m-3 h-65 vw-50 ">
                                <button type="button" class="m-1 input-1 bg-danger text-light"><i class="fa-regular fa-trash-can" @click="${() => this.borrarCurso(curso.ID)}"> Eliminar</i></button>
                            </div>   
                            <div class="d-flex flex-column m-3 h-65 vw-50 ">
                                <button type="button" class="m-1 input-1 bg-info text-light"><i class="fa-regular fa-trash-can" @click="${()=> this.abrirActualizar(curso.ID)}"> Actualizar</i></button>
                            </div>
                            <div class="d-flex flex-column m-3 h-65 vw-50 ">
                              <button type="button" class="m-1 input-1 bg-secondary text-light"><i class="fa-regular fa-trash-can" @click="${()=>this.abrirSillas(curso.ID)}"> Ver disponibilidad</i></button>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        
            <div class="modal" id="modalActualizar${curso.ID}" tabindex="-1" role="dialog" style="display: none;">
            <div class="modal-dialog modal-dialog-centered bg-transparent" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">Formulario de Actualización</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" @click="${(e)=>this.cerrarActualizar(curso.ID)}"></button>
                    </div>
                    <div class="modal-body">
                        <div class="d-flex flex-column">
                        <label for="profesor">Profesor:</label>
                        <input class="p-2 border-10 border-1" id="profesorActual${curso.ID}" name="profesorActual" .value="${curso.PROFESOR}" placeholder="profesor">
                      </div>
                      <div class="d-flex flex-column">
                        <label for="capacidad">Capacidad:</label>
                        <input class="p-2 border-10 border-1" id="capacidadActual${curso.ID}" name="capacidadActual" .value="${curso.CAPACIDAD}" placeholder="capacidad">
                      </div>
                      <div class="d-flex flex-column">
                        <label for="jornada">Jornada:</label>
                        <select class="p-2 border-10 border-1" id="jornadaActual${curso.ID}" name="jornadaActual" value="${curso.JORNADA}">
                          <option value="Tarde">Tarde</option>
                          <option value="Mañana">Mañana</option>
                        </select> 
                      </div>
                      <div class="d-flex flex-column">
                        <label for="salon">Salon:</label>
                        <select class="p-2 border-10 border-1" id="salonActual${curso.ID}" name="salonActual" .value="${curso.SALON}" placeholder="salon">
                          ${this.salones.map((salon)=> html`
                          <option value="${salon.id}">Salon número ${salon.id}</option>`)}
                        </select>
                      </div>
                    </div>
                    <div class="d-flex justify-content-center align-items-center m-3">
                      <button class="bg-icon text-white p-2 border-10" @click=${(e) => this.actualizarCurso(curso.ID)}>Actualizar</button>
                    </div>
                    </div>
                </div>
            </div>
        </div>
        

        <div class="modal" id="modalSillas${curso.ID}" tabindex="-1" role="dialog" style="display: none;">
        <div class="modal-dialog modal-dialog-centered bg-transparent" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">Sillas disponibles en el salon ${curso.SALON}</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" @click="${(e)=>this.cerrarSillas(curso.ID)}"></button>
                </div>
                <div class="modal-body" id="modal-body-${curso.ID}">
                <div class="cinema-seats d-flex">
                ${disposicionSillas2.map(fila =>
                  html`
                    <div class="row ">
                      ${fila.map(asiento =>
                        html`
                          <div class="seat p-2 w-75" id="asiento${asiento}${curso.ID}">${asiento}</div>
                        `
                      )}
                    </div>
                  `
                )}
              </div>
              <div class="m-3">
                <label>
                  Estudiante:
                </label>
                <select class="form-select" id="estudianteSeleccionadoCurso${curso.ID}">
                ${this.Estudiantes.filter(Estudiante=>Estudiante.cursoE==curso.ID).map(Estudiante=>html`
                <option value="${Estudiante.nombreE}">${Estudiante.nombreE}</option>`)}
                </select>
              </div>
        
              <div class="m-3">
                <label>
                  Asiento:
                </label>
                <select class="form-select" id="asientoSeleccionadoCurso${curso.ID}">
                ${disposicionSillas.map(fila =>
                  html`
                      ${fila.map(asiento =>
                        html`
                        <option value="${asiento}">${asiento}</option>
                        `
                      )}
                  `
                )}
                </select>
              </div>
              <div>
                <button class="m-1 input-1 bg-success text-light p-2" @click="${(e)=>this.asignarAsiento(curso.ID)}">Asignar</button>
              </div>
                </div>
            </div>
        </div>
    </div>
        `
        )}
    `;
  }
  limpiarFormulario() {
    this.shadowRoot.getElementById('profesor').value = '';
    this.shadowRoot.getElementById('capacidad').value = '';
    this.shadowRoot.getElementById('jornada').value = '';
    this.shadowRoot.getElementById('salon').value = '';
  }
  
  agregarCurso() {
    
    const profesor = this.shadowRoot.getElementById('profesor').value;
    const capacidad = this.shadowRoot.getElementById('capacidad').value;
    const jornada = this.shadowRoot.getElementById('jornada').value;
    const salon = this.shadowRoot.getElementById('salon').value;

    const nuevoCurso = {
      ID: this.cursos.length + 1, 
      PROFESOR: profesor,
      CAPACIDAD: capacidad,
      JORNADA: jornada,
      SALON: salon, 
    };
      this.cursos.push(nuevoCurso)

      this.asientosPorCurso[nuevoCurso.ID] = this.generarDisposicionSillas(6, 5);
      this.saveCursosToLocalStorage(this.cursos);
      this.requestUpdate();
      this.limpiarFormulario();

      this.cerrarAgregarCurso();
  }

  actualizarCurso(id) {
   
    const profesorActual = this.shadowRoot.getElementById(`profesorActual${id}`).value;
    const capacidadActual = this.shadowRoot.getElementById(`capacidadActual${id}`).value;
    const jornadaActual = this.shadowRoot.getElementById(`jornadaActual${id}`).value;
    const salonActual = this.shadowRoot.getElementById(`salonActual${id}`).value;
  

    if (this.cursoIdActual !== null) {
     
      const indiceCurso = this.cursos.findIndex((curso) => curso.ID === this.cursoIdActual);
  
      if (indiceCurso !== -1) {

        this.cursos[indiceCurso].PROFESOR = profesorActual;
        this.cursos[indiceCurso].CAPACIDAD = capacidadActual;
        this.cursos[indiceCurso].JORNADA = jornadaActual;
        this.cursos[indiceCurso].SALON = salonActual;
  
        this.cerrarActualizar(this.cursoIdActual);
  
        this.saveCursosToLocalStorage(this.cursos);
        this.cursoIdActual = null;
        this.requestUpdate('cursos');
      } else {
        console.error('Curso no encontrado para actualizar.');
      }
    } else {
      console.error('No se ha seleccionado un curso para actualizar.');
    }
  }
  
  
  borrarCurso(id) {
    this.cursos = this.cursos.filter(curso => curso.ID !== id);
    this.requestUpdate('cursos');
  }
}

customElements.define('cursos-views', wcCursosView);
