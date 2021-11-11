//Menu principal de administrador
import React, { Component } from "react";
import Cookies from "universal-cookie";
import Navegador from "./NavBar/Navegador";



const cookies = new Cookies();

class Menu extends Component {
  cerrarSesion = () => {
    cookies.remove("_id", { path: "/" });
    cookies.remove("Nombre", { path: "/" });
    cookies.remove("Ap_Paterno", { path: "/" });
    cookies.remove("Ap_Materno", { path: "/" });
    cookies.remove("RU", { path: "/" });
    cookies.remove("Cargo", { path: "/" });
    cookies.remove("username", { path: "/" });
    window.location.href = "../Login";
  };

  componentDidMount() {
    if (!cookies.get("_id")) {
      window.location.href = "../Login";
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
