import { LitElement, html } from "lit-element";
import { wcCursosView } from "../WCCurso/wcCursosView";
import { SalonesViews } from "../WCSalon/wcSalonViews";
import { WCMainProfesoresView } from "../WCMainProfesores/WCMainProfesoresView";
import navbarstyles from "./navbarstyles";


export class NavBar extends LitElement {
    static get properties() {
        return {
            selectedView: { type: String },
            profesores:{type: Array},
            salones:{type: Array},
            Estudiantes:{type: Array},
            cursos:{type: Array},
        };
    }


    static get styles(){
        return[navbarstyles]
    }


    static get scopedElements(){
        return {
            "cursos-views":wcCursosView,
            "salones-views":SalonesViews,
            "wc-mainprofesoresview":WCMainProfesoresView
        };
    }

    constructor() {
        super();
        this.selectedView = 'profesores';
    }

    render() {
        return html`
        <style>
            @import url('https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css');
            @import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css');
        </style>

            <nav id="nav" class="d-flex m-5 border-content3 ">
            <div class="d-flex list-unstyled m-3 w-100 justify-content-around">
                <li class="mx-3"><button class="m-1 input-1 bg-success text-light p-2" @click="${() => this.changeView('salones')}">Registrar salon</button></li>
                <li class="mx-3"><button class="m-1 input-1 bg-success text-light p-2" @click="${() => this.changeView('cursos')}">Registrar curso</button></li>
                <li class="mx-3"><button class="m-1 input-1 bg-success text-light p-2" @click="${() => this.changeView('profesores')}">Profesores</button></li>
            </div>
            </nav>
            ${this.renderSelectedView()}
        `;
    }

    changeView(view) {
        this.selectedView = view;
    }

    renderSelectedView() {
        switch (this.selectedView) {
            case 'salones':
                return html`<salones-views .profesores="${this.profesores}" .salones="${this.salones}" .cursos="${this.cursos}"></salones-views>`;
            case 'cursos':
                return html`<cursos-views .profesores="${this.profesores}" .salones="${this.salones}" .cursos="${this.cursos}" .Estudiantes="${this.Estudiantes}"></cursos-views>`;
            case 'profesores':
            default:
                return html`<wc-mainprofesoresview .profesores="${this.profesores}" .salones="${this.salones}" .cursos="${this.cursos}"></wc-mainprofesoresview>`;
        }
    }
}

customElements.define('nav-bar', NavBar);
