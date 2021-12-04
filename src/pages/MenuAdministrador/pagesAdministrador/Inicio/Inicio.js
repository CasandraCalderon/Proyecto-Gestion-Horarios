import React from 'react'
import "bootstrap/dist/css/bootstrap.min.css";
import "./Inicio.css"
import PresentCard from '../../../PresentCard/PresentCard';
import { FcApproval } from "react-icons/fc";
import imgInicio from '../../../../img/imgInicio.jpg';
import Cookies from "universal-cookie";

const cookies = new Cookies();
const Inicio = () => {
    return (
        <div id='PInicio'>
            <PresentCard />
            <div id = "imagenInicio">
            <img id = 'imgInicio' src={imgInicio? imgInicio : <h1>Cargando...</h1>} alt="Cargando..."/>
            </div>
            <div id = "Contenido">
                <h1>Bienvenid@ {cookies.get("Nombre")}</h1>
                <p id="ContenidoInicio">Aqui podras administrar toda la gestion de horarios de la Universidad Autonoma Tomas Frias de la carrera de Ingenieria de sistemas <br/> Estas son las funciones que se le permite realizar: </p>
                <p id= "Funciones"><FcApproval/> Control y administracion de usuarios </p>
                <p id= "Funciones"><FcApproval/> Control y administracion de Aulas de la institucion </p>
                <p id= "Funciones"><FcApproval/> Control y administracion de las diferentes materias que presenta la carrera</p> 
                <p id= "Funciones"><FcApproval/> Creacion y control de horarios de los distintos semestres</p> 
                <p id= "Funciones"><FcApproval/> Descarga de reportes sobre Usuarios, Materias y aulas registradas que presenta la plataforma</p>
                <p id= "Funciones"><FcApproval/> Ver su perfil con sus datos personales y poder modificar su avatar</p>
            </div>
        </div>
    )
}
export default Inicio;