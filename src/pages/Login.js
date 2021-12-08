import React, { useState, useEffect } from "react";
import "../css/Login.css";
import userLogin from "../img/userLogin.png";
import Swal from "sweetalert2";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { InputGroup, InputGroupText, Input, ButtonGroup } from "reactstrap";
import { FaUser, FaChalkboardTeacher } from "react-icons/fa";
import { RiAdminLine } from "react-icons/ri";
import { IoIosBook } from "react-icons/io";
import { RiLockPasswordLine } from "react-icons/ri";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";
import { authActions } from '../store/index';
import {useDispatch} from "react-redux"
import axios from "axios";
import Cookies from "universal-cookie";
import img from "../img/IniciarSesion.png";

const baseAdministradores = "http://localhost:8000/api/administrador/login";
const baseDocentes = "http://localhost:8000/api/docente/login";
const baseEstudiantes = "http://localhost:8000/api/estudiante/login";
const cookies = new Cookies();

const Login = () => {
  const history = useNavigate();
  const dispatch = useDispatch();
  const [state, setState] = useState({
    form: {
      username: "",
      password: "",
    },
  });
  const [admin, setAdmin] = useState(false);
  const [docente, setDocente] = useState(false);
  const [estudiante, setEstudiante] = useState(false);
  const [errorUser, setErrorUser] = useState("");
  const [errorPassword, setErrorPassword] = useState("");
  const [cargo, setCargo] = useState("Iniciar como...");

  const handleChange = async (e) => {
    await setState({
      form: {
        ...state.form,
        [e.target.name]: e.target.value,
      },
    });
    console.log(state.form);
  };

  const iniciarSesion = async (e) => {
    e.preventDefault();
    await axios
      .post(
        admin === true
          ? baseAdministradores
          : docente === true
          ? baseDocentes
          : estudiante === true? 
          baseEstudiantes : sinUsuario(),
        {
          username: state.form.username,
          password: state.form.password,
        }
      )
      .then((response) => {
        if (response.data.message === "LOGUEADO") {
          dispatch(authActions.setLogin());
          //localStorage.setItem('token', response.data.token);
          var respuesta = response.data.user;
          cookies.set("_id", respuesta._id, { path: "/" });
          cookies.set("Nombre", respuesta.Nombre, { path: "/" });
          cookies.set("Ap_Paterno", respuesta.Ap_Paterno, { path: "/" });
          cookies.set("Ap_Materno", respuesta.Ap_Materno, { path: "/" });
          cookies.set("RU", respuesta.RU, { path: "/" });
          cookies.set("CI", respuesta.CI, { path: "/" });
          cookies.set("Telefono", respuesta.Telefono, { path: "/" });
          cookies.set("Email", respuesta.Email, { path: "/" });
          cookies.set("Cargo", respuesta.Cargo, { path: "/" });
          cookies.set("username", respuesta.username, { path: "/" });
          cookies.set("Semestre", respuesta.Semestre, { path: "/" });
          cookies.set("image", respuesta.image, { path: "/" });
          Swal.fire({
            icon: "success",
            title: `Bienvenido ${respuesta.Cargo}`,
            text: `${respuesta.Nombre} ${respuesta.Ap_Paterno} ${respuesta.Ap_Materno}`,
            confirmButtonText: "OK",
            allowOutsideClick: false,
          }).then((resultado) => {
            if (resultado.value) {
              if (respuesta.Cargo === "ADMINISTRADOR") {
                history("/menu/Inicio");
              } else if (respuesta.Cargo === "DOCENTE") {
                history("/menuDocentes/InicioDocente");
              } else if (respuesta.Cargo === "ESTUDIANTE") {
                history("./menuEstudiantes");
              }
            }
          });
        } else if (response.data.message === "Usuario no encontrado") {
          setErrorUser(response.data.message);
          setErrorPassword("");
        } else if (response.data.message === "Contraseña incorrecta") {
          setErrorPassword(response.data.message);
          setErrorUser("");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const clickAdmin = () => {
    setAdmin(true);
    setDocente(false);
    setEstudiante(false);
    setCargo("ADMINISTRADOR");
  };

  const clickDocente = () => {
    setAdmin(false);
    setDocente(true);
    setEstudiante(false);
    setCargo("DOCENTE");
  };

  const clickEstudiante = () => {
    setAdmin(false);
    setDocente(false);
    setEstudiante(true);
    setCargo("ESTUDIANTE");
  };

  const sinUsuario = () => {
    Swal.fire({
      title: '¿Iniciar como...?',
      text: 'Por favor, elija que tipo de usuario esta ingresando',
      imageUrl: img,
      imageWidth: 400,
      imageHeight: 200,
      imageAlt: 'Custom image',
    })
  }
  useEffect(() => {
    if (cookies.get("Cargo") === "ADMINISTRADOR") {
      history("/menu/Inicio");
    } else if (cookies.get("Cargo") === "DOCENTE") {
      history("/menuDocentes/InicioDocente");
    } else if (cookies.get("Cargo") === "ESTUDIANTE") {
      history("./menuEstudiantes");
    }
  });

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
        <br />
        <div id="Group">
          <ButtonGroup>
            <Button id="buttons" color="primary" onClick={clickAdmin}>
              <RiAdminLine size={30} />
            </Button>
            <Button id="buttons" color="primary" onClick={clickDocente}>
              <FaChalkboardTeacher size={30} />
            </Button>
            <Button id="buttons" color="primary" onClick={clickEstudiante}>
              <IoIosBook size={30} />
            </Button>
          </ButtonGroup>
        </div>
        <div id="Usuario">
        <p id="cargo">{cargo}</p>
        </div>
        <Row>
          <Col lg={5} md={10} sm={12} className="mx-auto" id="form">
            <Form>
              <Form.Group controlId="formBasicEmail">
                <InputGroup >
                  <InputGroupText>
                    <FaUser size={20} />
                  </InputGroupText>
                  <Input
                    placeholder="Username"
                    name="username"
                    onChange={handleChange}
                  />
                </InputGroup>
                <div className="form-text text-danger"><strong>{errorUser}</strong></div>
              </Form.Group>
              <br/>
              <Form.Group controlId="formBasicPassword">
                <InputGroup>
                  <InputGroupText>
                    <RiLockPasswordLine size={20} />
                  </InputGroupText>
                  <Input
                    type="password"
                    placeholder="Password"
                    name="password"
                    onChange={handleChange}
                  />
                </InputGroup>
                <div className="form-text text-danger"><strong>{errorPassword}</strong></div>
              </Form.Group>
              <br/>
              <button id="botonPersonalizado" onClick={iniciarSesion}>
                Login
              </button>
            </Form>
          </Col>
          <h6 id="Copyright">
            Copyright © 2021 - Universidad Autónoma Tomás Frías (UATF Virtual -
            Data Center)
          </h6>
        </Row>
      </Container>
    </div>
  );
};
export default Login;
