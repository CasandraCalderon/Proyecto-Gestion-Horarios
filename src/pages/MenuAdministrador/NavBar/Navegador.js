import React from "react";
import './Navegador.css'
import { Nav, Navbar, NavDropdown, NavLink } from "react-bootstrap";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { BiExit } from "react-icons/bi";
import escudo from "../../../img/escudo.png";
import PresentCard from "../../PresentCard/PresentCard";
import Administrador from "../Administrador";
import Primero from "../pagesAdministrador/Horarios/Primero/Primero";
import Segundo from "../pagesAdministrador/Horarios/Segundo/Segundo";
import Tercero from "../pagesAdministrador/Horarios/Tercero/Tercero";
import IAulas from "../pagesAdministrador/IAulas/IAulas";
import IMaterias from "../pagesAdministrador/IMaterias/IMaterias";
import Inicio from "../pagesAdministrador/Inicio/Inicio";
import IAdminstrador from "../pagesAdministrador/Usuarios/IAdministrador/IAdminstrador";
import IDocentes from "../pagesAdministrador/Usuarios/IDocente/IDocentes";
import IEstudiantes from "../pagesAdministrador/Usuarios/IEstudiante/IEstudiantes";
//import Cookies from "universal-cookie";

//const cookies = new Cookies();
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
            <Navbar.Brand><img src={escudo} width="80" height="80" alt="..." /></Navbar.Brand>
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
                <NavDropdown title="Horarios">
                  <NavDropdown.Item as={Link} to={"/primero"}>
                    Primer Semestre
                  </NavDropdown.Item>
                  <NavDropdown.Item as={Link} to={"/segundo"}>Segundo Semestre</NavDropdown.Item>
                  <NavDropdown.Item as={Link} to={"/tercero"}>Tercer Semestre</NavDropdown.Item>
                </NavDropdown>
                <NavLink as={Link} to={"/Reportes"}>Reportes</NavLink>
              </Nav>
            </Navbar.Collapse>
            <button onClick={() => cerrar()} type="button" className="btn btn-secondary"><BiExit size={20}/></button>
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
            <Route path="/primero">
              <Primero />
            </Route>
            <Route path="/segundo">
              <Segundo />
            </Route>
            <Route path="/tercero">
              <Tercero />
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
