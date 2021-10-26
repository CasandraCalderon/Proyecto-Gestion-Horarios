import React from "react";
import { Nav, Navbar, NavDropdown, NavLink } from "react-bootstrap";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Administrador from "./Administrador";
import Home from "./Home";
import IAulas from "./IAulas/IAulas";
import IMaterias from "./IMaterias/IMaterias";
import Inicio from "./Inicio";
import IAdminstrador from "./Usuarios/IAdministrador/IAdminstrador";
import IDocentes from "./Usuarios/IDocente/IDocentes";
import IEstudiantes from "./Usuarios/IEstudiante/IEstudiantes";
export default class Navegador extends React.Component {
  render() {
    let {Nombre, Apellidos, RU, Cargo, cerrar} = this.props;
    return (
      <Router>
        <div>
          <Navbar
            bg="dark"
            variant="dark"
            sticky="top"
            expend="sm"
            collapseOnSelect
          >
            <Navbar.Brand>Logo</Navbar.Brand>
            <Navbar.Toggle />
            <Navbar.Collapse>
              <Nav >
                <NavLink as={Link} to={"/Inicio"}>
                  Inicio
                </NavLink>
                <NavDropdown title="Usuarios">
                  <NavDropdown.Item as={Link} to={"/Usuarios/Administrador"}>
                    Administradores
                  </NavDropdown.Item>
                  <NavDropdown.Item as={Link} to={"/Usuarios/Docentes"}>Docentes</NavDropdown.Item>
                  <NavDropdown.Item as={Link} to={"/Usuarios/Estudiantes"}>Estudiantes</NavDropdown.Item>
                </NavDropdown>
                <NavLink as={Link} to={"/Aulas"}>Aulas</NavLink>
                <NavLink as={Link} to={"/Materias"}>Materias</NavLink>
                <NavLink as={Link} to={"/Horarios"}>Horarios</NavLink>
                <NavLink as={Link} to={"/Reportes"}>Reportes</NavLink>
              </Nav>
            </Navbar.Collapse>
            <button onClick={() => cerrar()} type="button" className="btn btn-secondary">Cerrar Sesion</button>
          </Navbar>
        </div>
        <Home Nombre = {Nombre} Apellidos = {Apellidos} RU={RU} Cargo={Cargo}/>
        <div>
          <Switch>
            <Route path="/menu">
              <Inicio />
            </Route>
            <Route path="/Usuarios/Administrador">
              <IAdminstrador />
            </Route>
            <Route path="/Usuarios/Docentes">
              <IDocentes />
            </Route>
            <Route path="/Usuarios/Estudiantes">
              < IEstudiantes />
            </Route>
            <Route path="/Aulas">
              <IAulas />
            </Route>
            <Route path="/Materias">
              <IMaterias />
            </Route>
            <Route path="/Horarios">
              <Administrador />
            </Route>
            <Route path="/Reportes">
              <Administrador />
            </Route>
          </Switch>
        </div>
      </Router>
    );
  }
}
