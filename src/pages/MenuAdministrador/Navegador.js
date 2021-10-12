import React, {useState} from "react";
import "./Navegador.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Dropdown, DropdownItem, DropdownMenu, DropdownToggle} from "reactstrap";


const Navegador = () => {
  const [dropdown, setDropdowm]=useState(false);
  const abrirCerrarDrop=()=>{
    setDropdowm(!dropdown);
  }
  return (
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="collapse navbar-collapse">
          <ul className="navbar-nav">
            <Dropdown>
              <DropdownToggle>Inicio</DropdownToggle>
            </Dropdown>
            <Dropdown isOpen={dropdown} toggle={abrirCerrarDrop} >
              <DropdownToggle caret>Usuarios</DropdownToggle>
              <DropdownMenu>
                <DropdownItem>Administrador</DropdownItem>
                <DropdownItem>Docentes</DropdownItem>
                <DropdownItem>Estudiantes</DropdownItem>
              </DropdownMenu>
            </Dropdown><Dropdown>
              <DropdownToggle>Aulas</DropdownToggle>
            </Dropdown>
            <Dropdown>
              <DropdownToggle>Materias</DropdownToggle>
            </Dropdown>
            <Dropdown>
              <DropdownToggle>Horarios</DropdownToggle>
            </Dropdown>
            <Dropdown>
              <DropdownToggle>Reportes</DropdownToggle>
            </Dropdown>
            <Dropdown>
              <DropdownToggle>Cerrar Sesion</DropdownToggle>
            </Dropdown>
          </ul>
        </div>
      </nav>
);
  }
  export default Navegador;
