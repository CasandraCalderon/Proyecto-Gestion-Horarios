import React, { Component } from "react";
import Cookies from "universal-cookie";


const cookies = new Cookies();

class MenuEstudiantes extends Component {
  cerrarSesion = () => {
    cookies.remove("_id", { path: "/" });
    cookies.remove("Nombre", { path: "/" });
    cookies.remove("Ap_Paterno", { path: "/" });
    cookies.remove("Ap_Materno", { path: "/" });
    cookies.remove("RU", { path: "/" });
    cookies.remove("Cargo", { path: "/" });
    window.location.href = "./";
  };

  componentDidMount() {
    if (!cookies.get("_id")) {
      window.location.href = "./";
    }
  }

  render() {
    return (
      <div>
        
        <br />
        <button onClick={() => this.cerrarSesion()}>Cerrar Sesión</button>
      </div>
    );
  }
}

export default MenuEstudiantes;