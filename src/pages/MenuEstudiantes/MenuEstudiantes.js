import React, { Component } from "react";
import Cookies from "universal-cookie";


const cookies = new Cookies();

class MenuEstudiantes extends Component {
  cerrarSesion = () => {
    cookies.remove("id", { path: "/" });
    cookies.remove("Nombres", { path: "/" });
    cookies.remove("Apellidos", { path: "/" });
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
        
        <br />
        <button onClick={() => this.cerrarSesion()}>Cerrar Sesión</button>
      </div>
    );
  }
}

export default MenuEstudiantes;