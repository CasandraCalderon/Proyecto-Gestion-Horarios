import React from "react";
import { Link } from "react-router-dom";
import "./Navegador.css";

const Navegador = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="collapse navbar-collapse">
        <ul className="navbar-nav">
          <li className="nav-item">
            <Link className="nav-link active" to='/'>
              Inicio
            </Link>
          </li>
          <li className="nav-item">
            <Link
              className="nav-link dropdown-toggle"
              to='/'
              id="navbarDropdownMenuLink"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              Usuarios
            </Link>
            <ul
              className="dropdown-menu"
            >
              <li>
                <Link className="dropdown-item" to='/'>
                  Administrador
                </Link>
              </li>
              <li>
                <Link className="dropdown-item" to='/'>
                  Docente
                </Link>
              </li>
              <li>
                <Link className="dropdown-item" to='/'>
                  Estudiante
                </Link>
              </li>
            </ul>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to='/'>
              Aulas
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to='/'>
              Materias
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to='/'>
              Horarios
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to='/'>
              Reportes
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to='/'>
              Cerrar Sesion
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};
export default Navegador;
