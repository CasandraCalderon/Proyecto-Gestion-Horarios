import React from "react";
import PresentCard from "../../PresentCard/PresentCard";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { ReDocente } from "./ReDocente/ReDocente";
import { ReEstudiantes } from "./ReEstudiantes/ReEstudiantes";


export const Reportes = () => {
  return (
    <div>
      <PresentCard />
      <div className="container">
        <Router>
          <Link to="/ReDocentes">
            <button type="button">DOCENTES!</button>
          </Link>
          <Link to="/ReEstudiantes">
            <button type="button">ESTUDIANTES!</button>
          </Link>
          <Switch>
            <Route path="/ReDocentes">
              <ReDocente />
            </Route>
            <Route path="/ReEstudiantes">
              <ReEstudiantes />
            </Route>
          </Switch>
        </Router>
      </div>
    </div>
  );
};
