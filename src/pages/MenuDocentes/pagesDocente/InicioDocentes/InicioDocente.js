import React from 'react'
import "bootstrap/dist/css/bootstrap.min.css";
import "./InicioDocente.css"
import imgInicio from '../../../../img/imgDocente.jpg';
import img1 from '../../../../img/2815767.jpg';
import img2 from '../../../../img/2473724.jpg';
import img3 from '../../../../img/19197642.jpg';
import Cookies from "universal-cookie";
const cookies = new Cookies();
const InicioDocente = () => {
    return (
        <>
        <br/><br/><br/>
        <body class="d-flex flex-column" id="PInicioDocentes">
        <main class="flex-shrink-0">
            <header class="py-5">
                <div class="container px-5">
                    <div class="row justify-content-center">
                        <div class="col-lg-8 col-xxl-6">
                        <br/><br/>
                            <div class="text-center my-5">
                                <h1 class="fw-bolder mb-3">Bienvenid@ {cookies.get("Nombre")} {cookies.get("Ap_Paterno")} {cookies.get("Ap_Materno")}</h1>
                                <p class="lead fw-normal text-muted mb-4">En esta plataforma cuenta con una herramienta que permite organizar los horarios de la Universidad Autonoma Tomas Frias de la carrera de Ingenieria de sistemas de forma eficiente y segura</p>
                                <a class="btn btn-warning btn-lg" href="#scroll-target">Ver mas</a>
                            </div>
                        </div>
                        <div class="col-lg-8 col-xxl-6">
                            <div class="text-center my-5">
                            <img class="img-fluid rounded mb-5 mb-lg-0" src={imgInicio? imgInicio : <h1>Cargando...</h1>} alt="..." id="imgEstudiante"/>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
            
            <section class="py-5 bg-light" id="scroll-target">
                <div class="container px-5 my-5">
                    <div class="row gx-5 align-items-center">
                        <div class="col-lg-6"><img class="img-fluid rounded mb-5 mb-lg-0" src={img2? img2 : <h1>Cargando...</h1>} alt="..." id="imgEstudiante"/></div>
                        <div class="col-lg-6">
                            <h2 class="fw-bolder">Control de usuarios</h2>
                            <p class="lead fw-normal text-muted mb-0">Contara con el control de informacion de los diferentes usuarios que sean necesarios para la creacion de horarios ademas de poder agregar y modificar su informacion de manera segura.</p>
                        </div>
                    </div>
                </div>
            </section>
            
            <section class="py-5">
                <div class="container px-5 my-5">
                    <div class="row gx-5 align-items-center">
                        <div class="col-lg-6 order-first order-lg-last"><img class="img-fluid rounded mb-5 mb-lg-0" src={img1? img1 : <h1>Cargando...</h1>} alt="..." id="imgEstudiante"/></div>
                        <div class="col-lg-6">
                            <h2 class="fw-bolder">Control de Ambientes y Materias</h2>
                            <p class="lead fw-normal text-muted mb-0">Tendra acceso a la creacion de listas para los distintos ambientes que presenta la carrera de ingenieria de sistemas ademas de poder agrergar las distintas materias que se lleva en dicha institucion.</p>
                        </div>
                    </div>
                </div>
            </section>

            <section class="py-5 bg-light" id="scroll-target">
                <div class="container px-5 my-5">
                    <div class="row gx-5 align-items-center">
                        <div class="col-lg-6"><img class="img-fluid rounded mb-5 mb-lg-0" src={img3? img3 : <h1>Cargando...</h1>} alt="..." id="imgEstudiante"/></div>
                        <div class="col-lg-6">
                            <h2 class="fw-bolder">Control de usuarios</h2>
                            <p class="lead fw-normal text-muted mb-0">Contara con el control de informacion de los diferentes usuarios que sean necesarios para la creacion de horarios ademas de poder agregar y modificar su informacion de manera segura.</p>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    </body>
    <footer id="sticky-footer" class="flex-shrink-0 py-4 bg-dark text-white-50">
    <div class="container text-center">
      <small>Copyright © 2021 - Universidad Autónoma Tomás Frías (UATF Virtual - Data Center)</small>
    </div>
  </footer>
      </>
    
    )
}
export default InicioDocente;
