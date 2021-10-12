import React, { Component } from "react";
import Cookies from "universal-cookie";
import NavBarDocente from "./NavBarDocente";
import { PresentCard } from "../PresentCard";

const cookies = new Cookies();

class MenuDocentes extends Component {
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
          <NavBarDocente cerrarSesion={this.cerrarSesion}/>
        < PresentCard Nombre={cookies.get("Nombres")} Apellidos={cookies.get("Apellidos")} RU={cookies.get("RU")} Cargo= {cookies.get("Cargo")}/>
        <br />
      </div>
    );
  }
}

export default MenuDocentes;