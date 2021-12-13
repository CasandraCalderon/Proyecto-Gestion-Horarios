import React from "react";
import { Nav, Navbar, NavLink } from "react-bootstrap";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { BsFillCalendarWeekFill } from "react-icons/bs";
import { AiFillHome  } from "react-icons/ai";
import { RiNewspaperFill } from "react-icons/ri";
import { FaCalendarCheck } from "react-icons/fa";
import { BiExit } from "react-icons/bi";
import escudo from "../../../img/escudo.png";
import Swal from "sweetalert2";
export default class NavBarDocente extends React.Component {
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
      <div id="PAdmin">
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
              <Nav>
                <NavLink as={Link} to={"InicioDocente"}>
                  <AiFillHome /> Inicio
                </NavLink>
                <NavLink as={Link} to={"verHorarios"}><BsFillCalendarWeekFill /> Ver Horarios</NavLink>
                <NavLink as={Link} to={"Disponibilidad"}><FaCalendarCheck /> Disponibilidad</NavLink>
                <NavLink as={Link} to={"miPerfil"}><RiNewspaperFill /> Mi Perfil</NavLink>
              </Nav>
            </Navbar.Collapse>
            <button id= "Exit" onClick={this.salir} type="button" className="btn btn-secondary"><BiExit size={30}/></button>
          </Navbar>
      </div>
    );
  }
}