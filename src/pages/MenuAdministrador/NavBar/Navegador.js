import React from "react";
import './Navegador.css'
import { Nav, Navbar, NavDropdown, NavLink } from "react-bootstrap";
import { Link } from "react-router-dom";
import { BiExit } from "react-icons/bi";
import { AiTwotoneHome } from "react-icons/ai";
import { GiBookshelf } from "react-icons/gi";
import { BsFillDoorClosedFill } from "react-icons/bs";
import { RiNewspaperFill } from "react-icons/ri";
import escudo from "../../../img/escudo.png";
import Swal from "sweetalert2";




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
          <Navbar
            variant="dark"
            sticky="top"
            expend="sm"
            collapseOnSelect
            id = "navBar"
          >
            <Navbar.Brand><img src={escudo} width="80" height="80" alt="..."/></Navbar.Brand>
            <Navbar.Toggle />
            <Navbar.Collapse>
              <Nav id="textNav">
                <NavLink as={Link} to={"Inicio"}>
                  <AiTwotoneHome/> Inicio
                </NavLink>
                <NavDropdown title='Usuarios'>
                  <div id= "navDrop">
                  <NavDropdown.Item  as={Link} to={"Administrador"}>
                    Administradores
                  </NavDropdown.Item>
                  <NavDropdown.Item as={Link} to={"Docentes"}>Docentes</NavDropdown.Item>
                  <NavDropdown.Item as={Link} to={"Estudiantes"}>Estudiantes</NavDropdown.Item>
                  </div>
                </NavDropdown>
                <NavLink as={Link} to={"Aulas"}> <BsFillDoorClosedFill/> Aulas</NavLink>
                <NavLink as={Link} to={"Materias"}><GiBookshelf/> Materias</NavLink>

                <NavDropdown title='Horarios'>
                  <div id= "navDrop">
                  <NavDropdown.Item  as={Link} to={"Primero"}>Primer Semestre</NavDropdown.Item>
                  <NavDropdown.Item as={Link} to={"Segundo"}>Segundo Semestre</NavDropdown.Item>
                  <NavDropdown.Item as={Link} to={"Tercero"}>Tercer Semestre</NavDropdown.Item>
                  <NavDropdown.Item as={Link} to={"Cuarto"}>Cuarto Semestre</NavDropdown.Item>
                  <NavDropdown.Item as={Link} to={"Quinto"}>Quinto Semestre</NavDropdown.Item>
                  <NavDropdown.Item as={Link} to={"Sexto"}>Sexto Semestre</NavDropdown.Item>
                  </div>
                </NavDropdown>
                <NavLink as={Link} to={"miPerfil"}><RiNewspaperFill/>Mi perfil</NavLink>
              </Nav>
            </Navbar.Collapse>
            <button id= "Exit" onClick={this.salir} type="button" className="btn btn-secondary"><BiExit size={30}/></button>
          </Navbar>
        </div>
       
    );
  }
}
