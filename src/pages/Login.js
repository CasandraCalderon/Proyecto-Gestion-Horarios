import React, { Component } from "react";
import "../css/Login.css";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import md5 from "md5";
import Cookies from "universal-cookie";

const baseUrl = "http://localhost:3001/usuarios";
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
    await axios
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
          cookies.set("Correo Electronico", respuesta.CorreoElectronico, {
            path: "/",
          });
          cookies.set("RU", respuesta.RU, { path: "/" });
          cookies.set("Usuario", respuesta.Usuario, { path: "/" });
          cookies.set("Cargo", respuesta.Cargo, { path: "/" });
          alert(`Bienvenido ${respuesta.Nombres} ${respuesta.Apellidos}`);
          if (respuesta.Cargo === "Administrador") {
            window.location.href = "./menu";
          } else if (respuesta.Cargo === "Docente") {
            window.location.href = "./menuDocentes";
          } else {
            window.location.href = "./menuEstudiantes";
          }
        } else {
          alert("El usuario o la contraseña no son correctos");
          document.location.reload();
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  componentDidMount() {
    if (cookies.get("Usuario")) {
      if (cookies.get("Cargo") === "Administrador") {
        window.location.href = "./menu";
      } else if (cookies.get("Cargo") === "Docente") {
        window.location.href = "./menuDocentes";
      } else {
        window.location.href = "./menuEstudiantes";
      }
    }
  }

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
              className="btn btn-primary"
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
