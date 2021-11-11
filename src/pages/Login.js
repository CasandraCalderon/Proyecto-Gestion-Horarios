import React, { Component } from "react";
import "../css/Login.css";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
//import md5 from "md5";
import Cookies from "universal-cookie";



const baseAdministradores = "http://localhost:8000/api/admin";
//const baseDocentes = "http://localhost:8000/api/docente"
//const baseEstudiantes = "http://localhost:8000/api/estudiante"
const cookies = new Cookies();

class Login extends Component {
  state = {
    form: {
      username: "",
      password: "",
    },
  };

  handleChange = async e => {
    await this.setState({
      form: {
        ...this.state.form,
        [e.target.name]: e.target.value,
      },
    });
    console.log(this.state.form);
  };

  iniciarSesion = async () => {
    await axios.get(baseAdministradores, {
        params: {
          username: this.state.form.username,
          password: this.state.form.password,
        },
      })
      .then(response => {
        return response.data;
      })
      .then(response => {
        if (response.length > 0) {
          var respuesta = response[0];
          cookies.set("_id", respuesta._id, { path: "/" });
          cookies.set("Nombre", respuesta.Nombre, { path: "/" });
          cookies.set("Ap_Paterno", respuesta.Ap_Paterno, { path: "/" });
          cookies.set("Ap_Materno", respuesta.Ap_Materno, { path: "/" });
          cookies.set("RU", respuesta.RU, { path: "/" });
          cookies.set("Cargo", respuesta.Cargo, { path: "/" });
          cookies.set("username", respuesta.username, { path: "/" });
          alert(`Bienvenido ${respuesta.Nombre} ${respuesta.Ap_Paterno} ${respuesta.Cargo}`);
          //window.location.href = "./menuDocentes";
          window.location.href = "./menu";   
        }else {
          alert('El usuario o la contraseña no son correctos');
          document.location.reload();
        }
      })
      .catch(error => {
        console.log(error);
      });
  };

  componentDidMount() {
    if (cookies.get("username")) {
        //window.location.href = "./menuDocentes";
        window.location.href = "./menu";
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
