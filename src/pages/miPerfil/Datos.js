import React from 'react'
import "../../css/MiPerfil.css";
const Datos = (props) => {
    return (
        <>
        <div id="user-input">
              <span>Nombre</span>
              <span>{props.user[0]?.Nombre}</span>
            </div>
            <div id="user-input">
              <span>Apellido Paterno</span>
              <span>{props.user[0]?.Ap_Paterno}</span>
            </div>
            <div id="user-input">
              <span>Apellido Materno</span>
              <span>{props.user[0]?.Ap_Materno}</span>
            </div>
            <div id="user-input">
              <span>CI</span>
              <span>{props.user[0]?.CI}</span>
            </div>
            <div id="user-input">
              <span>RU</span>
              <span>{props.user[0]?.RU}</span>
            </div>
            <div id="user-input">
              <span>Email</span>
              <span>{props.user[0]?.Email}</span>
            </div>
            <div id="user-input">
              <span>Telefono</span>
              <span>{props.user[0]?.Telefono}</span>
            </div>
            <div id="user-input">
              <span>Nombre de Usuario</span>
              <span>{props.user[0]?.username}</span>
            </div>
            <div id="user-input">
              <span>Contraseña</span>
              <span>********</span>
            </div>
            <div id="user-input">
              <span>Cargo</span>
              <span>{props.user[0]?.Cargo}</span>
            </div>
        </>
            
          
    )
}
export default Datos;
