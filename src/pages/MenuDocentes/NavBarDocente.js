import React from "react";
import { Nav, Navbar, NavLink } from "react-bootstrap";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import PresentCard from "../PresentCard/PresentCard";
import Disponibilidad from "./pagesDocente/Disponibilidad/Disponibilidad";
import InicioDocente from "./pagesDocente/InicioDocente";
import verHorarios from "./pagesDocente/VerHorarios/verHorarios";



export default class NavBarDocente extends React.Component {
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
                <NavLink as={Link} to={"/InicioDocente"}>
                  Inicio
                </NavLink>
                <NavLink as={Link} to={"/verHorarios"}>Ver Horarios</NavLink>
                <NavLink as={Link} to={"/Disponibilidad"}>Disponibilidad</NavLink>
              </Nav>
            </Navbar.Collapse>
            <button onClick={() => cerrar()} type="button" className="btn btn-secondary">Cerrar Sesion</button>
          </Navbar>
        </div>
        <PresentCard />
        <div>
          <Switch>
            <Route path="/InicioDocente">
              <InicioDocente />
            </Route>
            <Route path="/verHorarios">
              <verHorarios />
            </Route>
            <Route path="/Disponibilidad">
              <Disponibilidad />
            </Route>
          </Switch>
        </div>
      </Router>
      </>
    );
  }
}