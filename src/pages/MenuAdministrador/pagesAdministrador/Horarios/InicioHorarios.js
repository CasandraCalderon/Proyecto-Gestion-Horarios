import React, {Fragment} from "react";
import {Routes, Route} from "react-router-dom";
import PresentCard from "../../../PresentCard/PresentCard";
import NavBarHorarios from "./NavBarHorarios";
import Primero from "./Primero/Primero";
import Segundo from "./Segundo/Segundo";
import Tercero from "./Tercero/Tercero";
const InicioHorarios = () => {
  return (
    <Fragment>
        <PresentCard />
        <NavBarHorarios />
        <Routes>
            <Route path="Primero" element={<Primero />}>
            </Route>
            <Route path="Segundo" element={<Segundo />}>
            </Route>
            <Route path="Tercero" element={<Tercero />}>
            </Route>
          </Routes>
    </Fragment>
  );
};
export default InicioHorarios;
