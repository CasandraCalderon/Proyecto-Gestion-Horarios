import React, { useEffect, Fragment } from 'react';
import Cookies from "universal-cookie";
import NavBarDocente from "./NavBarDocente/NavBarDocente";
import {Routes, Route} from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Disponibilidad from "./pagesDocente/Disponibilidad/Disponibilidad";
import InicioDocente from "./pagesDocente/InicioDocentes/InicioDocente";
import VerHorarios from './pagesDocente/verHorarios/VerHorarios';
import MiPerfil from '../miPerfil/MiPerfil';


const cookies = new Cookies();

const MenuDocentes = () => {
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
          <NavBarDocente cerrar={cerrarSesion}/>
          <br/>
          <Routes>
            <Route path="InicioDocente" element={<InicioDocente />}>
            </Route>
            <Route path="verHorarios"element={<VerHorarios />}>
            </Route>
            <Route path="Disponibilidad" element={< Disponibilidad />}>
            </Route>
            <Route path="miPerfil" element={< MiPerfil />}>
            </Route>
      </Routes>
      </Fragment>
    );
  
}

export default MenuDocentes;