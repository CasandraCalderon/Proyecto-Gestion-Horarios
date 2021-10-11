import React, { Component } from "react";
import Cookies from "universal-cookie";
import Navegador from "./Navegador";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";


const cookies = new Cookies();

class Menu extends Component {
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
    console.log("id: " + cookies.get("id"));
    console.log("Nombres: " + cookies.get("Nombres"));
    console.log("Apellidos: " + cookies.get("Apellidos"));
    console.log("Correo Electronico: " + cookies.get("Correo Electronico"));
    console.log("RU: " + cookies.get("RU"));
    console.log("Usuario: " + cookies.get("Usuario"));
    console.log("Cargo: " + cookies.get("Cargo"));
    return (
      <div>
        <Router>
          <Navegador />
        </Router>
        <br />
        <button onClick={() => this.cerrarSesion()}>Cerrar Sesión</button>
      </div>
    );
  }
}

export default Menu;
