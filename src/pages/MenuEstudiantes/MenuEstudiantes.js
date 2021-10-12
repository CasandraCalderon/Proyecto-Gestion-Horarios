import React, { Component } from "react";
import Cookies from "universal-cookie";
import { PresentCard } from "../PresentCard";

const cookies = new Cookies();

class MenuEstudiantes extends Component {
  cerrarSesion = () => {
    cookies.remove("id", { path: "/" });
    cookies.remove("Nombres", { path: "/" });
    cookies.remove("Apellidos", { path: "/" });
    cookies.remove("Correo Electronico", { path: "/" });
    cookies.remove("RU", { path: "/" });
    cookies.remove("Usuario", { path: "/" });
    cookies.remove("Cargo", { path: "/" });
    window.location.href = "./";
  };

  componentDidMount() {
    if (!cookies.get("Usuario")) {
      window.location.href = "./";
    }
  }

  render() {
    return (
      <div>
        < PresentCard Nombre={cookies.get("Nombres")} Apellidos={cookies.get("Apellidos")} RU={cookies.get("RU")} Cargo= {cookies.get("Cargo")}/>
        <br />
        <button onClick={() => this.cerrarSesion()}>Cerrar Sesión</button>
      </div>
    );
  }
}

export default MenuEstudiantes;