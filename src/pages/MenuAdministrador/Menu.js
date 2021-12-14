//Menu principal de administrador
import React, { useEffect, Fragment } from 'react';
import Cookies from "universal-cookie";
import Navegador from "./NavBar/Navegador";
import {Routes, Route} from "react-router-dom";
import { useNavigate } from "react-router-dom";
import IAulas from "./pagesAdministrador/IAulas/IAulas";
import IMaterias from "./pagesAdministrador/IMaterias/IMaterias";
import Inicio from "./pagesAdministrador/Inicio/Inicio";
import IAdminstrador from "./pagesAdministrador/Usuarios/IAdministrador/IAdminstrador";
import IDocentes from "./pagesAdministrador/Usuarios/IDocente/IDocentes";
import IEstudiantes from "./pagesAdministrador/Usuarios/IEstudiante/IEstudiantes";
import MiPerfil from '../miPerfil/MiPerfil';
import Primero from './pagesAdministrador/Horarios/Primero/Primero';
import Tercero from './pagesAdministrador/Horarios/Tercero/Tercero';
import Segundo from './pagesAdministrador/Horarios/Segundo/Segundo';
import Cuarto from './pagesAdministrador/Horarios/Cuarto/Cuarto';

const cookies = new Cookies();

const Menu = () => {
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
      <Navegador cerrar={cerrarSesion} />
      <br/>
      <Routes>
      <Route path="Inicio" element={<Inicio />}>
            </Route>
            <Route path="Administrador" element={<IAdminstrador />}>
            </Route>
            <Route path="Docentes" element={<IDocentes />}>
            </Route>
            <Route path="Estudiantes" element={< IEstudiantes />}>
            </Route>
            <Route path="Aulas" element={<IAulas />}>
            </Route>
            <Route path="Primero" element={<Primero />}>
            </Route>
            <Route path="Segundo" element={<Segundo />}>
            </Route>
            <Route path="Tercero" element={<Tercero />}>
            </Route>
            <Route path="Cuarto" element={<Cuarto />}>
            </Route>
            <Route path="Materias" element={<IMaterias />}>
            </Route>
            <Route path="miPerfil" element={<MiPerfil />}>
            </Route>
      </Routes>
    </Fragment>
  );
};

export default Menu;

