import React, { useEffect, Fragment } from 'react';
import Cookies from "universal-cookie";
import NavBarEstudiantes from "./navBar/NavBarEstudiantes";
import {Routes, Route} from "react-router-dom";
import { useNavigate } from "react-router-dom";
import InicioEstudiantes from './pagesEstudiantes/inicioEstudiantes/InicioEstudiantes';
import HorariosEstudiantes from './pagesEstudiantes/horarios/HorariosEstudiantes';
import Programacion from './pagesEstudiantes/programacion/Programacion';
import MiPerfil from '../miPerfil/MiPerfil';


const cookies = new Cookies();

const MenuEstudiantes = () => {
  const history = useNavigate();
  const cerrarSesion = () => {
    cookies.remove("_id", { path: "/" });
    cookies.remove("Nombre", { path: "/" });
    cookies.remove("Ap_Paterno", { path: "/" });
    cookies.remove("Ap_Materno", { path: "/" });
    cookies.remove("RU", { path: "/" });
    cookies.remove("CI", { path: "/" });
    cookies.remove("Telefono", { path: "/" });
    cookies.remove("Email", { path: "/" });
    cookies.remove("Cargo", { path: "/" });
    cookies.remove("username", { path: "/" });
    history("/");
  };

  useEffect(() => {
    if (!cookies.get("_id")) {
      history("/");
    }
  });
    return (
      <Fragment>
      <NavBarEstudiantes cerrar={cerrarSesion}/>
      <br/>
      <Routes>
        <Route path="InicioEstudiante" element={<InicioEstudiantes />}>
        </Route>
        <Route path="verHorarios"element={<HorariosEstudiantes />}>
        </Route>
        <Route path="Programacion" element={<Programacion />}>
        </Route>
        <Route path="miPerfil" element={<MiPerfil />}>
        </Route>
  </Routes>
  </Fragment>
    );
  
}
export default MenuEstudiantes;