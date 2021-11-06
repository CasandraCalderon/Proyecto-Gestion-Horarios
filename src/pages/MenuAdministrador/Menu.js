//Menu principal de administrador
import React, { Component } from "react";
import Cookies from "universal-cookie";
import Navegador from "./NavBar/Navegador";



const cookies = new Cookies();

class Menu extends Component {
  cerrarSesion = () => {
    cookies.remove("id", { path: "/" });
    cookies.remove("Nombres", { path: "/" });
    cookies.remove("Apellidos", { path: "/" });
    cookies.remove("RU", { path: "/" });
    window.location.href = "./";
  };

  componentDidMount() {
    if (!cookies.get("id")) {
      window.location.href = "./";
    }
  }
  render() {
    return (
      <div>
        < Navegador cerrar={this.cerrarSesion} />
        <br />
      </div>
    );
  }
}

export default Menu;
