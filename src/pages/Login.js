import React, { Component } from "react";
import "../css/Login.css";
import userLogin from "../img/userLogin.png";
import Swal from 'sweetalert2'
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { InputGroup, InputGroupText, Input, Alert, FormFeedback, ButtonGroup } from "reactstrap";
import { FaUser, FaChalkboardTeacher } from "react-icons/fa";
import { RiAdminLine } from "react-icons/ri";
import { IoIosBook } from "react-icons/io"
import { RiLockPasswordLine } from "react-icons/ri";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import Cookies from "universal-cookie";

const baseAdministradores = "http://localhost:8000/api/admin/login";
const baseDocentes = "http://localhost:8000/api/docente/login"
const baseEstudiantes = "http://localhost:8000/api/estudiante/login"
const cookies = new Cookies();
class Login extends Component {
  state = {
    admin: false,
    docente: false,
    estudiante: false,
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
        .post(this.state.admin===true? baseAdministradores: this.state.docente===true? baseDocentes : baseEstudiantes, {
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
          if (respuesta.Cargo === 'ADMINISTRADOR') {
            window.location.href = "./menu";
          } else if(respuesta.Cargo === 'DOCENTE'){
            window.location.href = "./menuDocentes";
          } else if (respuesta.Cargo === 'ESTUDIANTE'){
            window.location.href = "./menuEstudiantes";
          }
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

  clickAdmin = () =>{
    this.setState({admin : true})
    this.setState({docente : false})
    this.setState({estudiante : false})
  }

  clickDocente = () => {
    this.setState({admin : false})
    this.setState({docente : true})
    this.setState({estudiante : false})
  }

  clickEstudiante = () => {
    this.setState({estudiante : true})
    this.setState({admin : false})
    this.setState({docente : false})
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
          <br/>
          <div id='Group'>
          <ButtonGroup>
          <Button id="buttons"
            color="primary"
            onClick={this.clickAdmin}
          >
            <RiAdminLine size={30} />
          </Button>
          <Button id="buttons"
            color="primary"
            onClick={this.clickDocente}
          >
            <FaChalkboardTeacher size={30} />
          </Button>
          <Button id="buttons"
            color="primary"
            onClick={function noRefCheck(){}}
          >
            <IoIosBook size={30} />
          </Button>
        </ButtonGroup>
          </div>
          <Row>
            <Col
              lg={5}
              md={10}
              sm={12}
              className="mx-auto" id= "form"
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
                  <div className="alert">{this.state.errorUser}</div>
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
                  
                  <div className="alert">{this.state.errorPassword}</div>
                 
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
