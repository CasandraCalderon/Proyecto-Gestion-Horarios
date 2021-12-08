import React from 'react'
import { Nav } from "react-bootstrap";
import {Routes, Route, Link} from "react-router-dom";
const NavBarHorarios = () => {
    return (
        <div>
            <Nav fill variant="tabs" defaultActiveKey="/InicioHorarios">
          <Nav.Item>
            <Nav.Link as={Link} to={"Primero"}>Primer Semestre</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link as={Link} to={"Segundo"}>Segundo Semestre</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link as={Link} to={"Tercero"}>Tercer Semestre</Nav.Link>
          </Nav.Item>
        </Nav>
        </div>
    )
};
export default NavBarHorarios;
