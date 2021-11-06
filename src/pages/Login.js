import React, { Component } from "react";
import "../css/Login.css";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import md5 from "md5";
import Cookies from "universal-cookie";

const baseUrl = "http://localhost:3001/usuarios";
const baseDocentes = "http://localhost:3002/docentes"
const baseEstudiantes = "http://localhost:3006/estudiantes"
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
      .get(baseUrl, {
        params: {
          Usuario: this.state.form.username,
          Contraseña: md5(this.state.form.password),
        },
      })
      .then((response) => {
        return response.data;
      })
      .then((response) => {
        if (response.length > 0) {
          var respuesta = response[0];
          cookies.set("id", respuesta.id, { path: "/" });
          cookies.set("Nombres", respuesta.Nombres, { path: "/" });
          cookies.set("Apellidos", respuesta.Apellidos, { path: "/" });
          cookies.set("RU", respuesta.RU, { path: "/" });
          cookies.set("Cargo", respuesta.Cargo, { path: "/" });
          alert(`Bienvenido ${cookies.get("Nombres")} ${cookies.get("Apellidos")}`);
          window.location.href = "./menu";
        }
      })
      .catch((error) => {
        console.log(error);
      }), axios
      .get(baseDocentes, {
        params: {
          Usuario: this.state.form.username,
          Contraseña: md5(this.state.form.password),
        },
      })
      .then((response) => {
        return response.data;
      })
      .then((response) => {
        if (response.length > 0) {
          var respuesta = response[0];
          cookies.set("id", respuesta.id, { path: "/" });
          cookies.set("Nombres", respuesta.Nombres, { path: "/" });
          cookies.set("Apellidos", respuesta.Apellidos, { path: "/" });
          cookies.set("RU", respuesta.RU, { path: "/" });
          cookies.set("Cargo", respuesta.Cargo, { path: "/" });
          alert(`Bienvenido ${cookies.get("Nombres")} ${cookies.get("Apellidos")}`);
          window.location.href = "./MenuDocentes";
        }
      })
      .catch((error) => {
        console.log(error);
      }), axios
      .get(baseEstudiantes, {
        params: {
          Usuario: this.state.form.username,
          Contraseña: md5(this.state.form.password),
        },
      })
      .then((response) => {
        return response.data;
      })
      .then((response) => {
        if (response.length > 0) {
          var respuesta = response[0];
          cookies.set("id", respuesta.id, { path: "/" });
          cookies.set("Nombres", respuesta.Nombres, { path: "/" });
          cookies.set("Apellidos", respuesta.Apellidos, { path: "/" });
          cookies.set("RU", respuesta.RU, { path: "/" });
          cookies.set("Cargo", respuesta.Cargo, { path: "/" });
          alert(`Bienvenido ${cookies.get("Nombres")} ${cookies.get("Apellidos")}`);
          window.location.href = "./MenuEstudiantes";
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
