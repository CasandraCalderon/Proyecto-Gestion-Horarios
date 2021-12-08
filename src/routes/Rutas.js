import React, {Fragment} from "react";
import { Route, Routes} from "react-router-dom";
import Login from "../pages/Login";
import Menu from "../pages/MenuAdministrador/Menu";
import MenuDocentes from "../pages/MenuDocentes/MenuDocentes";
import MenuEstudiantes from "../pages/MenuEstudiantes/MenuEstudiantes";



function Rutas() {
  return (
    <Fragment>
      <Routes>
        <Route exact path="/*" element={<Login/>} />
        <Route exact path="/menu/*" element={<Menu/>} />
        <Route exact path="/menuDocentes/*" element={<MenuDocentes/>} />
        <Route exact path="/menuEstudiantes" element={<MenuEstudiantes/>} />
      </Routes>
    </Fragment>
  );
}

export default Rutas;