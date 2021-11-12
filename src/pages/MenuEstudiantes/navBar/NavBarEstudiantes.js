import React from "react";
import { Nav, Navbar, NavLink } from "react-bootstrap";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import PresentCard from "../../PresentCard/PresentCard";
import Horarios from "../pagesEstudiantes/horarios/Horarios";
import InicioEstudiantes from "../pagesEstudiantes/inicioEstudiantes/InicioEstudiantes";
import Programacion from "../pagesEstudiantes/programacion/Programacion";



export default class NavBarEstudiantes extends React.Component {
  render() {
    let {cerrar} = this.props;
    return (
      <>
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
                <NavLink as={Link} to={"/InicioEstudiantes"}>
                  Inicio
                </NavLink>
                <NavLink as={Link} to={"/programacion"}>Programacion</NavLink>
                <NavLink as={Link} to={"/verHorarios"}>Ver Horarios</NavLink>
              </Nav>
            </Navbar.Collapse>
            <button onClick={() => cerrar()} type="button" className="btn btn-secondary">Cerrar Sesion</button>
          </Navbar>
        </div>
        <PresentCard />
        <div>
          <Switch>
            <Route path="/InicioEstudiantes">
              <InicioEstudiantes />
            </Route>
            <Route path="/programacion">
              <Programacion />
            </Route>
            <Route path="/verHorarios">
              <Horarios />
            </Route>
          </Switch>
        </div>
      </Router>
      </>
    );
  }
}