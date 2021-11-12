import React, { Component } from "react";
import { Navbar } from "react-bootstrap";
import Cookies from "universal-cookie";
<<<<<<< HEAD
import './MenuEstudiantes.css';
import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTextHeight, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import styled from 'styled-components';
import Axios from "axios";
=======
import NavBarEstudiantes from "./navBar/NavBarEstudiantes";
>>>>>>> eef5143993b4892f7e63c3c3e5ae351ab6b4f41f



const url = "http://localhost:3003/Materias";
const cookies = new Cookies();

class MenuEstudiantes extends Component {
  state={
    data:[],
    form:{
      id:'',
      Nombre:'',
      Sigla:'',

    }
  };
  cerrarSesion = () => {
    cookies.remove("_id", { path: "/" });
    cookies.remove("Nombre", { path: "/" });
    cookies.remove("Ap_Paterno", { path: "/" });
    cookies.remove("Ap_Materno", { path: "/" });
    cookies.remove("RU", { path: "/" });
    cookies.remove("Cargo", { path: "/" });
<<<<<<< HEAD
    window.location.href = "./";
   
=======
    cookies.remove("username", { path: "/" });
    window.location.href = "./login";
>>>>>>> eef5143993b4892f7e63c3c3e5ae351ab6b4f41f
  };

  componentDidMount() {
    if (!cookies.get("_id")) {
      window.location.href = "./login";
    }
  }
  peticionGet=()=>{
    Axios.get(url).then(response=>{
      this.setState({data: Response.data});
    }).catch(error=>{
      console.log(error.message);
    })
    
  }
  componentDidMount(){
    this.peticionGet();
  }

  abrirModal=()=>{
    this.setState({abierto: !this.state.abierto})
  }

  render() {
    return (
<<<<<<< HEAD
      <>
      <div className="tex-center" >
      
        <br/>
              
				<button className="btn btn-success" onClick={()=> this.abrirModal()}>Programar Materia</button>
			         
				<button className="btn btn-success">Ver Horario</button>

        <button className="btn btn-success" onClick={() => this.cerrarSesion()}>Cerrar Sesión</button>
			  
        
=======
      <div>
        <NavBarEstudiantes cerrar={this.cerrarSesion}/>
>>>>>>> eef5143993b4892f7e63c3c3e5ae351ab6b4f41f
      </div>
      <Modal isOpen={this.state.abierto}>
        <ModalHeader>
          Programar Materias

        </ModalHeader>
        <ModalBody>
          <table>
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Sigla</th>
              </tr>
            </thead>
            <tbody>
              {this.state.data.map(materias=>{
                return(
                  <tr key={materias.id}>
                    <td>{materias.Nombre}</td>
                    <td>{materias.Sigla}</td>
                  </tr>
                ) 
              })}
            </tbody>
            <button className="btn btn-secondary">programar</button> 

          </table>
          <table>
            <thead>
              <tr>
                <th>sigla</th>
                <th>Materia</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>SIS-838</td>
                <td>GESTION DE CALIDAD</td>
              </tr>
            </tbody>
            <button className="btn btn-secondary">programar</button>
            
          </table>
                  
          

        </ModalBody>
        <ModalFooter>
           
           <button className="btn btn-light" onClick={()=> this.abrirModal()}>cancelar</button>
        </ModalFooter>
      </Modal>
      </>
    );
  }
}

export default MenuEstudiantes;

