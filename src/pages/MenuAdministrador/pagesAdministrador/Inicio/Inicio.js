import React from 'react'
import "bootstrap/dist/css/bootstrap.min.css";
import "./Inicio.css"
import PresentCard from '../../../PresentCard/PresentCard';
import imgInicio from '../../../../img/imgInicio.jpg';
import Cookies from "universal-cookie";

const cookies = new Cookies();
const Inicio = () => {
    return (
        <div id='PInicio'>
            <PresentCard />
            <div id = "imagenInicio">
            <img id = 'imgInicio' src={imgInicio} alt="..."/>
            </div>
            <div id = "Contenido">
                <h1>Bienvenid@ {cookies.get("Nombre")}</h1>
                <p id="ContenidoInicio">Aqui podras administrar toda la gestion de horarios de la Universidad Autonoma Tomas Frias de la carrera de Ingenieria de sistemas</p>
                <p>Estas son las funciones que se le permite realizar: </p>
                <p>Control y administracion de usuarios <br/> Control y administracion de Aulas de la institucion <br/> Control y administracion de las diferentes materias que presenta la carrera <br/> Creacion y control de horarios de los distintos semestres <br/> Descarga de reportes sobre Usuarios, Materias y aulas registradas que presenta la plataforma</p>
            </div>
        </div>
    )
}
export default Inicio;