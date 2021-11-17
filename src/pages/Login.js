import React, { Component } from "react";
import "../css/Login.css";
import userLogin from "../img/userLogin.png";
import Swal from 'sweetalert2'
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { InputGroup, InputGroupText, Input } from "reactstrap";
import { FaUser } from "react-icons/fa";
import { RiLockPasswordLine } from "react-icons/ri";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import Cookies from "universal-cookie";

const baseAdministradores = "http://localhost:8000/api/admin/login";
//const baseDocentes = "http://localhost:8000/api/docente"
//const baseEstudiantes = "http://localhost:8000/api/estudiante"
const cookies = new Cookies();
class Login extends Component {
  state = {
    errorUser : '',
    errorPassword : '',
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
    console.log(this.state.form);
  };
  iniciarSesion = async (e) => {
    e.preventDefault();
    let response ="";
    try{
      response = await axios
      .post(baseAdministradores, {
          username: this.state.form.username,
          password: this.state.form.password,
      })
    } catch (e) {
      console.log(e)
    }
    console.log(response);
    if(response.data.message === 'LOGUEADO') {
      var respuesta = response.data.user;
      cookies.set("_id", respuesta._id, { path: "/" });
      cookies.set("Nombre", respuesta.Nombre, { path: "/" });
      cookies.set("Ap_Paterno", respuesta.Ap_Paterno, { path: "/" });
      cookies.set("Ap_Materno", respuesta.Ap_Materno, { path: "/" });
      cookies.set("RU", respuesta.RU, { path: "/" });
      cookies.set("Cargo", respuesta.Cargo, { path: "/" });
      cookies.set("username", respuesta.username, { path: "/" });
      cookies.set("Semestre", respuesta.Semestre, { path: "/" });
      cookies.set("image", respuesta.image, { path: "/" });
      Swal.fire(
        {icon: 'success',
        title: `Bienvenido ${respuesta.Cargo}`,
        text: `${respuesta.Nombre} ${respuesta.Ap_Paterno} ${respuesta.Ap_Materno}`,
        confirmButtonText: 'OK',
        allowOutsideClick: false
      })
      .then(resultado => {
        if (resultado.value) {
            window.location.href = "./menu";
        }
    });
    } else if (response.data.message === 'Usuario no encontrado') {
      this.setState({errorUser: response.data.message});
      this.setState({errorPassword: ''});
    } else if (response.data.message === 'Contraseña incorrecta') {
      this.setState({errorPassword: response.data.message});
      this.setState({errorUser: ''});
    }
  }
  
  render() {
    return (
      <div id="Principal">
        <Container>
          <div className="padre">
            <h1 className="hijo">
              <img src={userLogin} id="imageLogin" alt="..." />
              <br />
              Iniciar Sesion
            </h1>
          </div>
          <Row>
            <Col
              lg={5}
              md={10}
              sm={12}
              className="mx-auto my-5 p-5 m-auto rounded-lg" id= "form"
            >
              <Form >
                <Form.Group controlId="formBasicEmail">
                  <InputGroup>
                    <InputGroupText>
                      <FaUser size={20} />
                    </InputGroupText>
                    <Input
                      placeholder="Username"
                      name="username"
                      onChange={this.handleChange}
                    />
                  </InputGroup>
                  <p>{this.state.errorUser}</p>
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                  <InputGroup>
                    <InputGroupText>
                    <RiLockPasswordLine size={20} />
                    </InputGroupText>
                    <Input
                      type= "password"
                      placeholder="Password"
                      name="password"
                      onChange={this.handleChange}
                    />
                  </InputGroup>
                  <p>{this.state.errorPassword}</p>
                </Form.Group>

                <button
                id= 'botonPersonalizado'
                onClick={this.iniciarSesion}    
                >
                  Login
                </button>
              </Form>
            </Col>
            <h6 className="Copyright">
            Copyright © 2021 - Universidad Autónoma Tomás Frías (UATF Virtual - Data Center)
            </h6>
          </Row>
        </Container>
      </div>
    );
  }
}

export default Login;
