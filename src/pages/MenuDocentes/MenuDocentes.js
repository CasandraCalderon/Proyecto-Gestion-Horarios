import React, { Component } from "react";
import Cookies from "universal-cookie";
import NavBarDocente from "./NavBarDocente";



const cookies = new Cookies();

class MenuDocentes extends Component {
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
          <NavBarDocente cerrar={this.cerrarSesion}/>
        <br />
      </div>
    );
  }
}

export default MenuDocentes;