import React from "react";
import { Nav } from "react-bootstrap";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import PresentCard from "../../../PresentCard/PresentCard";
import Primero from "./Primero/Primero";
import Segundo from "./Segundo/Segundo";
import Tercero from "./Tercero/Tercero";
const InicioHorarios = () => {
  return (
    <div>
        <PresentCard />
      <Router>
        <Nav fill variant="tabs" defaultActiveKey="/InicioHorarios">
          <Nav.Item>
            <Nav.Link as={Link} to={"/Primero"}>Primer Semestre</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link as={Link} to={"/Segundo"}>Segundo Semestre</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link as={Link} to={"/Tercero"}>Tercer Semestre</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link as={Link} to={"/Tercero"}>Cuarto Semestre</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link as={Link} to={"/Tercero"}>Quinto Semestre</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link as={Link} to={"/Tercero"}>Sexto Semestre</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link as={Link} to={"/Tercero"}>Septimo Semestre</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link as={Link} to={"/Tercero"}>Octavoo Semestre</Nav.Link>
          </Nav.Item>
        </Nav>
          <Switch>
            <Route path="/Primero">
              <Primero />
            </Route>
            <Route path="/Segundo">
              <Segundo />
            </Route>
            <Route path="/Tercero">
              <Tercero />
            </Route>
          </Switch>
      </Router>
    </div>
  );
};
export default InicioHorarios;
