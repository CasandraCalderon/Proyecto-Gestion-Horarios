import React, { Component } from "react";
import "../css/Login.css";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
//import md5 from "md5";
import Cookies from "universal-cookie";

const baseAdministradores = "http://localhost:8000/api/admin";
const baseDocentes = "http://localhost:8000/api/docente"
const baseEstudiantes = "http://localhost:8000/api/estudiante"
const cookies = new Cookies();

class Login extends Component {
  state = {
    form: {
      username: "",
      password: "",
    },
  };

  handleChange = async (e) => {
    await this.setState({
      form: {
        ...this.state.form,
        [e.target.name]: e.target.value,
      },
    });
  };

  iniciarSesion = async () => {
    await Promise.all([axios
      .get(baseAdministradores, {
        params: {
          Usuario: this.state.form.username,
          Contraseña: this.state.form.password,
        },
      })
      .then((response) => {
        return response.data;
      })
      .then((response) => {
        if (response.length > 0) {
          var respuesta = response[0];
          cookies.set("_id", respuesta._id, { path: "/" });
          cookies.set("Nombre", respuesta.Nombre, { path: "/" });
          cookies.set("Ap_Paterno", respuesta.Ap_Paterno, { path: "/" });
          cookies.set("Ap_Materno", respuesta.Ap_Materno, { path: "/" });
          cookies.set("RU", respuesta.RU, { path: "/" });
          cookies.set("Cargo", respuesta.Cargo, { path: "/" });
          if(respuesta.Cargo === "ADMINISTRADOR") {
            alert(`Bienvenido ${respuesta.Nombre} ${respuesta.Ap_Paterno} ${respuesta.Cargo}`);
            window.location.href = "./menu";
          }
        }
      })
      .catch((error) => {
        console.log(error);
      }), axios
      .get(baseDocentes, {
        params: {
          Usuario: this.state.form.username,
          Contraseña: this.state.form.password,
        },
      })
      .then((response) => {
        return response.data;
      })
      .then((response) => {
        if (response.length > 0) {
          var respuesta = response[0];
          cookies.set("_id", respuesta._id, { path: "/" });
          cookies.set("Nombres", respuesta.Nombres, { path: "/" });
          cookies.set("Apellidos", respuesta.Apellidos, { path: "/" });
          cookies.set("RU", respuesta.RU, { path: "/" });
          cookies.set("Cargo", respuesta.Cargo, { path: "/" });
          if(respuesta.Cargo === "DOCENTE") {
            alert(`Bienvenido ${respuesta.Nombre} ${respuesta.Ap_Paterno} ${respuesta.Cargo}`);
            window.location.href = "./menu";
          }
        }
      })
      .catch((error) => {
        console.log(error);
      }), axios
      .get(baseEstudiantes, {
        params: {
          Usuario: this.state.form.username,
          Contraseña: this.state.form.password,
        },
      })
      .then((response) => {
        return response.data;
      })
      .then((response) => {
        if (response.length > 0) {
          var respuesta = response[0];
          cookies.set("_id", respuesta._id, { path: "/" });
          cookies.set("Nombres", respuesta.Nombres, { path: "/" });
          cookies.set("Apellidos", respuesta.Apellidos, { path: "/" });
          cookies.set("RU", respuesta.RU, { path: "/" });
          cookies.set("Cargo", respuesta.Cargo, { path: "/" });
          if(respuesta.Cargo === "ESTUDIANTE") {
            alert(`Bienvenido ${respuesta.Nombre} ${respuesta.Ap_Paterno} ${respuesta.Cargo}`);
            window.location.href = "./MenuEstudiantes";
          }
        }
      })
      .catch((error) => {
        console.log(error);
      })]);
  };



  render() {
    return (
      <div className="containerPrincipal">
        <div className="containerSecundario">
          <div className="form-group">
            <label>Usuario: </label>
            <br />
            <input
              type="text"
              className="form-control"
              name="username"
              onChange={this.handleChange}
            />
            <br />
            <label>Contraseña: </label>
            <br />
            <input
              type="password"
              className="form-control"
              name="password"
              onChange={this.handleChange}
            />
            <br />
            <button
              className="btn btn-dark"
              onClick={() => this.iniciarSesion()}
            >
              Iniciar Sesión
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
