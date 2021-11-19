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
                <p>Estas son las funciones que se le permite realizar: <br/> Administracion de usuarios</p>
            </div>
        </div>
    )
}
export default Inicio;