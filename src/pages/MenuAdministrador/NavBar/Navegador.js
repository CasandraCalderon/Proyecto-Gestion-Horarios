import React from "react";
import './Navegador.css'
import { Nav, Navbar, NavDropdown, NavLink } from "react-bootstrap";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { BiExit } from "react-icons/bi";
import { AiTwotoneHome } from "react-icons/ai";
import { GiBookshelf } from "react-icons/gi";
import { HiDocumentReport } from "react-icons/hi";
import { BsFillDoorClosedFill } from "react-icons/bs";
import escudo from "../../../img/escudo.png";
import Administrador from "../Administrador";
import IAulas from "../pagesAdministrador/IAulas/IAulas";
import IMaterias from "../pagesAdministrador/IMaterias/IMaterias";
import Inicio from "../pagesAdministrador/Inicio/Inicio";
import IAdminstrador from "../pagesAdministrador/Usuarios/IAdministrador/IAdminstrador";
import IDocentes from "../pagesAdministrador/Usuarios/IDocente/IDocentes";
import IEstudiantes from "../pagesAdministrador/Usuarios/IEstudiante/IEstudiantes";
import InicioHorarios from "../pagesAdministrador/Horarios/InicioHorarios";
import Swal from "sweetalert2";
//import Cookies from "universal-cookie";

//const cookies = new Cookies();
export default class Navegador extends React.Component {
  salir=()=> {
    let {cerrar} = this.props;
    Swal.fire({
      title: '¿Esta seguro que quiere salir de su sesion?',
      icon : 'question',
      showCancelButton: true,
      confirmButtonText: 'Si',
    }).then((result) => {
      if (result.isConfirmed) {
        cerrar();
      }
    })
  }
  render() {
    return (
      <div id= "PAdmin">
      <Router>
        <div>
          <Navbar
            variant="dark"
            sticky="top"
            expend="sm"
            collapseOnSelect
            id = "navBar"
          >
            <Navbar.Brand><img src={escudo} width="80" height="80" alt="..." /></Navbar.Brand>
            <Navbar.Toggle />
            <Navbar.Collapse>
              <Nav id="textNav">
                <NavLink as={Link} to={"/Inicio"}>
                  <AiTwotoneHome/> Inicio
                </NavLink>
                <NavDropdown title='Usuarios'>
                  <div id= "navDrop">
                  <NavDropdown.Item  as={Link} to={"/Usuarios/Administrador"}>
                    Administradores
                  </NavDropdown.Item>
                  <NavDropdown.Item as={Link} to={"/Usuarios/Docentes"}>Docentes</NavDropdown.Item>
                  <NavDropdown.Item as={Link} to={"/Usuarios/Estudiantes"}>Estudiantes</NavDropdown.Item>
                  </div>
                </NavDropdown>
                <NavLink as={Link} to={"/Aulas"}> <BsFillDoorClosedFill/> Aulas</NavLink>
                <NavLink as={Link} to={"/Materias"}><GiBookshelf/> Materias</NavLink>
                <NavLink as={Link} to={"/Horarios"}><GiBookshelf/> Horarios</NavLink>
                <NavLink as={Link} to={"/Reportes"}><HiDocumentReport/> Reportes</NavLink>
              </Nav>
            </Navbar.Collapse>
            <button id= "Exit" onClick={this.salir} type="button" className="btn btn-secondary"><BiExit size={30}/></button>
          </Navbar>
        </div>
        <div>
          <Switch>
            <Route path="/Inicio">
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
            <Route path="/Horarios">
              <InicioHorarios />
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
      </div>
    );
  }
}
