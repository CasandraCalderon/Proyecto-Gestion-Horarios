import React, { Component } from "react";
import { Navbar } from "react-bootstrap";
import Cookies from "universal-cookie";
import NavBarEstudiantes from "./navBar/NavBarEstudiantes";


const cookies = new Cookies();
class MenuEstudiantes extends Component {
  cerrarSesion = () => {
    cookies.remove("_id", { path: "/" });
    cookies.remove("Nombre", { path: "/" });
    cookies.remove("Ap_Paterno", { path: "/" });
    cookies.remove("Ap_Materno", { path: "/" });
    cookies.remove("RU", { path: "/" });
    cookies.remove("Cargo", { path: "/" });
    cookies.remove("Semestre", { path: "/" });
    cookies.remove("username", { path: "/" });
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
        <NavBarEstudiantes cerrar={this.cerrarSesion}/>
      </div>
    );
  }
}
export default MenuEstudiantes;