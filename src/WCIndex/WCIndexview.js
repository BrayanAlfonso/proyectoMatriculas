import { LitElement, html } from "lit-element";
import WCIndexStyle from "./WCIndexStyle";
import { WCMainEstudiantesView } from "../WCMainEstudiantes/WCMainEstudiantesView";
import { WCMainProfesoresView } from "../WCMainProfesores/WCMainProfesoresView";
import { WCLoginView } from "../WCLogin/WCLoginView";
import { wcCursosView } from "../WCCurso/wcCursosView"; // Asegúrate de proporcionar la ruta correcta al componente


export class WCIndexview extends LitElement{
    constructor(){
        super();
        this.main="";
        this.mainProfesores="";
        this.arreglos={
            Estudiantes:[
                {
                nombreE: 'Joel Sebastian',
                documentoE: '1029141439',
                edadE: '18',
                cursoE: '1',
                discapacidadE: 'Ninguna',
                acudienteE: 'N.A.R.P',
                epsE: 'Sanitas',
                direccionE: 'Calle 45 Sur 17-32',
                certifEstudioE: 'si',
                telefonoE: '2343232421',
                jornada: 'Diurna',
                asignado:0
                },
                {
                    nombreE: 'Pedro',
                    documentoE: '21212112',
                    edadE: '18',
                    cursoE: '2',
                    discapacidadE: 'Ninguna',
                    acudienteE: 'N.A.R.P',
                    epsE: 'Sanitas',
                    direccionE: 'Calle 45 Sur 17-32',
                    certifEstudioE: 'si',
                    telefonoE: '2343232421',
                    jornada: 'Diurna',
                    asignado:0
                    },
                {
                    nombreE: 'Hector',
                    documentoE: '142151145',
                    edadE: '18',
                    cursoE: '3',
                    discapacidadE: 'Ninguna',
                    acudienteE: 'N.A.R.P',
                    epsE: 'Sanitas',
                    direccionE: 'Calle 45 Sur 17-32',
                    certifEstudioE: 'si',
                    telefonoE: '2343232421',
                    jornada: 'Diurna',
                    asignado:0
                    },
                {
                    nombreE: 'paola',
                    documentoE: '515151515',
                    edadE: '18',
                    cursoE: '2',
                    discapacidadE: 'Ninguna',
                    acudienteE: 'N.A.R.P',
                    epsE: 'Sanitas',
                    direccionE: 'Calle 45 Sur 17-32',
                    certifEstudioE: 'si',
                    telefonoE: '2343232421',
                    jornada: 'Diurna',
                    asignado:0
                    },
                {
                    nombreE: 'Lina',
                    documentoE: '51515151',
                    edadE: '18',
                    cursoE: '3',
                    discapacidadE: 'Ninguna',
                    acudienteE: 'N.A.R.P',
                    epsE: 'Sanitas',
                    direccionE: 'Calle 45 Sur 17-32',
                    certifEstudioE: 'si',
                    telefonoE: '2343232421',
                    jornada: 'Diurna',
                    asignado:0
                    }
            ],
            Profesores:[
                {
                documento: '1019762839',
                nombre:'Brayan',
                edad:'18',
                materia:'Programación',
                jornada: 'Tarde',
                curso: '4',
                contraseña: 'Brayan123'
                }
            ],
            acudientes:[
                {
                    documento:"12345678",
                    nombre:"Carlos",
                    parentesco:"Padre",
                    edad:"40",
                    telefono:"32244588"
                }
            ],
            salones:[
                {
                    id:1,
                    piso:"4",
                    estado:"activo"
                },
                {
                    id:2,
                    piso:"6",
                    estado:"desactivo"
                }
            ] ,
            cursos: [
                { ID: 1,
                    PROFESOR: 'Juan Pérez', 
                    CAPACIDAD: '30', 
                    JORNADA: 'Mañana',
                    SALON: '101' },
                { ID: 2, 
                    PROFESOR: 'Ana López',
                    CAPACIDAD: '30',
                    JORNADA: 'Tarde', 
                    SALON: '201' },
                { ID: 3, 
                    PROFESOR: 'Juan',
                    CAPACIDAD: '30',
                    JORNADA: 'Mañana', 
                    SALON: '301' }
            ]
        }
        this.mostrarCards(1)
        
    }

    static get scopedElements(){
        return {
            "wc-mainestudiantes":WCMainEstudiantesView,
            "wc-mainprofesoresview":WCMainProfesoresView,
            "wc-loginview":WCLoginView,
            "my-acudiente":WCACudienteview,
            "cursos-views":wcCursosView
        };
    }

    static get properties(){
        return{
            main:{
                type: String
            },
            mainProfesores:{
                type: String
            }
        }
    }

    static get styles(){
        return[WCIndexStyle]
    }

    mostrarCards(x){
        if(x){
            this.main = html`
            <div class="d-flex flex-row w-100 justify-content-center">
                <div class="card m-5">
                    <div class="m-3">Matricula a tu hijo aqui!</div>
                    <div class="card w-100 h-100 bg-secondary">
                    <img src="./src/img/Estudiantes.jpg" alt="Estudiantes" class="h-100">
                        <div class="card-info">
                            <h2>Formulario de matricula</h2>
                            <button @click=${(e)=>this.mostrarMainEstudiantes(1)}>Aquí!</button>
                        </div>
                    </div>
                </div>
                
                <div class="card m-5">
                    <div class="m-3">Registrate como acudiente aqui!</div>
                    <div class="card w-100 h-100 bg-primary">
                        <img src="./src/img/Acudientes.jpg" alt="Acudientes" class="h-100">
                        <div class="card-info">
                            <h2>Formulario de registro</h2>
                            <button @click=${(e)=>this.mostrarAcudiente(1)}>Aquí!</button>
                        </div>
                    </div>
                </div>
            </div>
            `
        }else{
            this.main=html``
        }
    }


    mostrarMenu(){
        const sideMenu = this.shadowRoot.querySelector("#sideMenu");
        sideMenu.classList.remove("left-25")
        sideMenu.classList.add("left-3x")
        console.log(sideMenu)
    }

    ocultarMenu(){
        const sideMenu = this.shadowRoot.querySelector("#sideMenu");
        sideMenu.classList.add("left-25")
        sideMenu.classList.remove("left-3x")
    
    }
    
    mostrarMainEstudiantes(x){
        if(x){
            this.main = html`<wc-mainestudiantes .Estudiantes="${this.arreglos.Estudiantes}" .salones="${this.arreglos.salones}" .profesores="${this.arreglos.Profesores}" .cursos="${this.arreglos.cursos}" .acudientes="${this.arreglos.acudientes}"></wc-mainestudiantes>`
            this.requestUpdate()
        }else{
            this.main=html``
        }
        this.ocultarMenu()
        return this.main
        
    }


    mostrarLogin(x){
        if(x){
            this.main = html `<wc-loginview class="w-100 h-100" .salones="${this.arreglos.salones}" .profesores="${this.arreglos.Profesores}" .cursos="${this.arreglos.cursos}" .Estudiantes="${this.arreglos.Estudiantes}"></wc-loginview>`
        }else{
            this.main=html``
        }
        this.ocultarMenu()
        return this.main
    }

    mostrarAcudiente(x){
        if(x){
            this.main = html `<my-acudiente .acudientes="${this.arreglos.acudientes}"></my-acudiente>`
        }else{
            this.main=html``
        }
        this.ocultarMenu()
        return this.main
    }

    render(){
        return html`
        <style>
        @import url('https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css');
        @import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css');
        </style>

        <div class="d-flex vh-100">
            <div class="bg-dark d-flex justify-content-center position-fixed w-3 z-index-1 vh-100 vw-100" @click=${(e)=>this.mostrarMenu()}>
                <i class="fas fa-house mt-5" style="color: #ffffff;"></i>
            </div>
            <div class="bg-dark w-25 vh-100 position-absolute left-25 animation" id="sideMenu">
                <div class="m-3">
                    <button class="p-3 text-white bg-transparent border-0 m-3" @click=${(e)=>this.mostrarMainEstudiantes(1)}>Matriculate aqui como estudiante!</button>
                    <button class="p-3 text-white bg-transparent border-0 m-3" @click=${(e)=>this.mostrarAcudiente(1)}>Inscribite aqui como acudiente para tu hijo!</button>
                    <button class="p-3 text-white bg-transparent border-0 m-3" @click=${(e)=>this.mostrarLogin(1)}>Login!</button>
                </div>
            </div>
            <div class="d-flex flex-column">
                <div class="d-flex justify-content-start p-5 border-content vw-100">
                    <h1 class="fs-3 fw-bold m-4 mx-3">MATRICULAS COLEGIO | ESTUDIANTES</h1>
                </div>
                <div class=" d-flex justify-content-center align-items-center flex-column p-3 border-content2 vh-100 vw-100" @click=${(e)=>this.ocultarMenu()}>

                ${this.main}

                </div>
            </div>
        `
    }
}

customElements.define('wc-indexview',WCIndexview)