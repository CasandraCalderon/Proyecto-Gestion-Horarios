import React from 'react'
import "bootstrap/dist/css/bootstrap.min.css";
import "../../../../css/InicioDocente.css"
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
        <body className="d-flex flex-column" id="PInicioDocentes">
        <main className="flex-shrink-0">
            <header className="py-5">
                <div className="container px-5">
                    <div className="row justify-content-center">
                        <div className="col-lg-8 col-xxl-6">
                        <br/><br/>
                            <div className="text-center my-5">
                                <h1 className="fw-bolder mb-3">Bienvenid@ {cookies.get("Nombre")} {cookies.get("Ap_Paterno")} {cookies.get("Ap_Materno")}</h1>
                                <p className="lead fw-normal text-muted mb-4">En esta plataforma podras tener acceso facil y sencillo a la informacion de tus horarios, optimizando con su modificacion tu disponibilidad de tiempos.</p>
                                <a className="btn btn-warning btn-lg" href="#scroll-target">Ver mas</a>
                            </div>
                        </div>
                        <div className="col-lg-8 col-xxl-6">
                            <div className="text-center my-5">
                            <img className="img-fluid rounded mb-5 mb-lg-0" src={imgInicio? imgInicio : <h1>Cargando...</h1>} alt="..." id="imgEstudiante"/>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
            
            <section className="py-5 bg-light" id="scroll-target">
                <div className="container px-5 my-5">
                    <div className="row gx-5 align-items-center">
                        <div className="col-lg-6"><img className="img-fluid rounded mb-5 mb-lg-0" src={img2? img2 : <h1>Cargando...</h1>} alt="..." id="imgEstudiante"/></div>
                        <div className="col-lg-6">
                            <h2 className="fw-bolder">Optimiza tus horarios</h2>
                            <p className="lead fw-normal text-muted mb-0">De acuerdo a tu tiempo y actividades, ten control de la disponibilidad de tus horarios.</p>
                        </div>
                    </div>
                </div>
            </section>
            
            <section className="py-5">
                <div className="container px-5 my-5">
                    <div className="row gx-5 align-items-center">
                        <div className="col-lg-6 order-first order-lg-last"><img className="img-fluid rounded mb-5 mb-lg-0" src={img1? img1 : <h1>Cargando...</h1>} alt="..." id="imgEstudiante"/></div>
                        <div className="col-lg-6">
                            <h2 className="fw-bolder">Visualiza tus horarios</h2>
                            <p className="lead fw-normal text-muted mb-0">De forma sensilla y oportuna puedes tener acceso a la visualizacion de tus horarios asignados para un mejor control de tus tiempos en materia.</p>
                        </div>
                    </div>
                </div>
            </section>

            <section className="py-5 bg-light" id="scroll-target">
                <div className="container px-5 my-5">
                    <div className="row gx-5 align-items-center">
                        <div className="col-lg-6"><img className="img-fluid rounded mb-5 mb-lg-0" src={img3? img3 : <h1>Cargando...</h1>} alt="..." id="imgEstudiante"/></div>
                        <div className="col-lg-6">
                            <h2 className="fw-bolder">Herramienta virtual segura y confiable</h2>
                            <p className="lead fw-normal text-muted mb-0">Esta plataforma virtual que te ofrece la carrera de Ingenieria de Sistemas es una herramienta en la que puedes confiar para mejorar tu servicio Docente.</p>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    </body>
    <footer id="sticky-footer" className="flex-shrink-0 py-4 bg-dark text-white-50">
    <div className="container text-center">
      <small>Copyright ?? 2021 - Universidad Aut??noma Tom??s Fr??as (UATF Virtual - Data Center)</small>
    </div>
  </footer>
      </>
    
    )
}
export default InicioDocente;
