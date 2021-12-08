import React, {Fragment} from "react";
import { Route, Routes} from "react-router-dom";
import { useSelector } from 'react-redux'
import Login from "../pages/Login";
import Menu from "../pages/MenuAdministrador/Menu";
import MenuDocentes from "../pages/MenuDocentes/MenuDocentes";
import MenuEstudiantes from "../pages/MenuEstudiantes/MenuEstudiantes";



function Rutas() {
  const token = useSelector(state => state.token);
  const isAuth = useSelector(state => state.isAuth);
  console.log('el token es:' + token);
  console.log('esta autenticado?: ' + isAuth);
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