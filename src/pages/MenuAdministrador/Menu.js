//Menu principal de administrador
import React, { useEffect } from "react";
import Cookies from "universal-cookie";
import Navegador from "./NavBar/Navegador";
import { useHistory } from "react-router-dom";

const cookies = new Cookies();

const Menu = () => {
  const history = useHistory();
  const cerrarSesion = () => {
    cookies.remove("_id", { path: "/" });
    cookies.remove("Nombre", { path: "/" });
    cookies.remove("Ap_Paterno", { path: "/" });
    cookies.remove("Ap_Materno", { path: "/" });
    cookies.remove("RU", { path: "/" });
    cookies.remove("Cargo", { path: "/" });
    cookies.remove("username", { path: "/" });
    history.push("./");
  };

  useEffect(() => {
    if (!cookies.get("_id")) {
      history.push("./");
    }
  });
  return (
    <div>
      <Navegador cerrar={cerrarSesion} />
      <br />
    </div>
  );
};

export default Menu;
