import React from "react";
import "./NavBarDocente.css";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  Dropdown,
  DropdownToggle,
} from "reactstrap";

const NavBarDocente = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="collapse navbar-collapse">
        <ul className="navbar-nav">
          <Dropdown>
            <DropdownToggle>Inicio</DropdownToggle>
          </Dropdown>
          <Dropdown>
            <DropdownToggle>Ver Horarios</DropdownToggle>
          </Dropdown>
          <Dropdown>
            <DropdownToggle>Disponibilidad</DropdownToggle>
          </Dropdown>
          <Dropdown>
            <DropdownToggle>Cerrar Sesion</DropdownToggle>
          </Dropdown>
        </ul>
      </div>
    </nav>
  );
};
export default NavBarDocente;
