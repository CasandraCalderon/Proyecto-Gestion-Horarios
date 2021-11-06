import React from "react";
import { Nav, Navbar, NavDropdown, NavLink } from "react-bootstrap";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import PresentCard from "../../PresentCard/PresentCard";
import Administrador from "../Administrador";
import IAulas from "../pagesAdministrador/IAulas/IAulas";
import IMaterias from "../pagesAdministrador/IMaterias/IMaterias";
import Inicio from "../pagesAdministrador/Inicio/Inicio";
import IAdminstrador from "../pagesAdministrador/Usuarios/IAdministrador/IAdminstrador";
import IDocentes from "../pagesAdministrador/Usuarios/IDocente/IDocentes";
import IEstudiantes from "../pagesAdministrador/Usuarios/IEstudiante/IEstudiantes";
export default class Navegador extends React.Component {
  render() {
    let {cerrar} = this.props;
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
        <PresentCard />
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
