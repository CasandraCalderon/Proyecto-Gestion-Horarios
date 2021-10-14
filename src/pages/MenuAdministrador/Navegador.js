import React from "react";
import { Nav, Navbar, NavDropdown, NavLink } from "react-bootstrap";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Administrador from "./Administrador";
import Home from "./Home";
export default class Navegador extends React.Component {
  render() {
    let {Nombre, Apellidos, RU, Cargo} = this.props;
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
              <Nav>
                <NavLink as={Link} to={"/menu"}>
                  Inicio
                </NavLink>
                <NavDropdown title="Usuarios">
                  <NavDropdown.Item as={Link} to={"/administrador"}>
                    Administradores
                  </NavDropdown.Item>
                  <NavDropdown.Item as={Link} to={"/Docentes"}>Docentes</NavDropdown.Item>
                  <NavDropdown.Item as={Link} to={"/Estudiantes"}>Estudiantes</NavDropdown.Item>
                </NavDropdown>
                <NavLink as={Link} to={"/Aulas"}>Aulas</NavLink>
                <NavLink as={Link} to={"/Materias"}>Materias</NavLink>
                <NavLink as={Link} to={"/Horarios"}>Horarios</NavLink>
                <NavLink as={Link} to={"/Reportes"}>Reportes</NavLink>
                <NavLink as={Link} to={"/cerrar"}>Cerrar Sesion</NavLink>
              </Nav>
            </Navbar.Collapse>
          </Navbar>
        </div>
        <div>
          <Switch>
            <Route path="/menu">
              <Home Nombre = {Nombre} Apellidos = {Apellidos} RU={RU} Cargo={Cargo}/>
            </Route>
            <Route path="/administrador">
              <Administrador />
            </Route>
            <Route path="/Docentes">
              <Administrador />
            </Route>
            <Route path="/Estudiantes">
              <Administrador />
            </Route>
            <Route path="/Aulas">
              <Administrador />
            </Route>
            <Route path="/Materias">
              <Administrador />
            </Route>
            <Route path="/Horarios">
              <Administrador />
            </Route>
            <Route path="/Reportes">
              <Administrador />
            </Route>
            <Route path="/cerrar">
              <Administrador />
            </Route>
          </Switch>
        </div>
      </Router>
    );
  }
}
