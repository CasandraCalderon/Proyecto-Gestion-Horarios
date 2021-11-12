import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Login from "../pages/Login";
import Menu from "../pages/MenuAdministrador/Menu";
import IAdminstrador from "../pages/MenuAdministrador/pagesAdministrador/Usuarios/IAdministrador/IAdminstrador";
import MenuDocentes from "../pages/MenuDocentes/MenuDocentes";
import MenuEstudiantes from "../pages/MenuEstudiantes/MenuEstudiantes";



function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/Login" component={Login} />
        <Route exact path="/menu" component={Menu} />
        <Route exact path="/Usuarios/Administrador" component={IAdminstrador} />
        <Route exact path="/menuDocentes" component={MenuDocentes} />
        <Route exact path="/menuEstudiantes" component={MenuEstudiantes} />
      </Switch>
    </BrowserRouter>
  );
}

export default Routes;
