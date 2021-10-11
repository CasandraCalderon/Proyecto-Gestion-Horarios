import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Login from "../pages/Login";
import Menu from "../pages/MenuAdministrador/Menu";
import MenuDocentes from "../pages/MenuDocentes/MenuDocentes";
import MenuEstudiantes from "../pages/MenuEstudiantes/MenuEstudiantes";

function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Login} />
        <Route exact path="/menu" component={Menu} />
        <Route exact path="/menuDocentes" component={MenuDocentes} />
        <Route exact path="/menuEstudiantes" component={MenuEstudiantes} />
      </Switch>
    </BrowserRouter>
  );
}

export default Routes;
