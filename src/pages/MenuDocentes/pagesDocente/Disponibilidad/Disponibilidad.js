import React, { Component } from 'react'
import "bootstrap/dist/css/bootstrap.min.css";
import { Table, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import "./Disponibilidad.css"
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import Cookies from "universal-cookie";
import PresentCard from '../../../PresentCard/PresentCard';
import VerDisponibilidad from '../../../MenuAdministrador/pagesAdministrador/Horarios/VerDisponibilidad';


const url = "http://localhost:8000/api/docente";
const cookies = new Cookies();



class Disponibilidad extends Component {
    state={
      data:[],
      modalInsertar: false,
      modalEliminar: false,
      form:{
        _id: "",
        Nombre: "",
        Ap_Paterno: "",
        Ap_Materno: "",
        CI: "",
        Email: "",
        RU: "",
        Cargo: "",
        Usuario: "",
        username: "",
        password: "",
        Disponibilidad: "",
      }
    }
    
    peticionGet=()=>{
    axios.get(url).then(response=>{
      this.setState({data: response.data});
    }).catch(error=>{
      console.log(error.message);
    })
    }
    
    peticionPut=()=>{
        axios.put(`${url}/edit/${this.state.form._id}`, 
        {
            id: this.state.form._id,
            Nombre: this.state.form.Nombre,
            Ap_Paterno: this.state.form.Ap_Paterno,
            Ap_Materno: this.state.form.Ap_Materno,
            CI: this.state.form.CI,
            Email: this.state.form.Email,
            RU: this.state.form.RU,
            Cargo: this.state.form.Cargo,
            username: this.state.form.username,
            password: this.state.form.password,
            Disponibilidad: this.state.form.Disponibilidad
        }
        ).then(response=>{
            this.setState({modalEliminar: false});
          this.peticionGet();
        })
      }
      
    
    modalInsertar=()=>{
      this.setState({modalInsertar: !this.state.modalInsertar});
    }
    modalEliminar=()=>{
        this.setState({modalEliminar: !this.state.modalEliminar});
    }
    
    seleccionarUsuario=(usuario)=>{
      this.setState({
        tipoModal: 'actualizar',
        form: {
          _id: usuario._id,
          Nombre: usuario.Nombre,
          Ap_Paterno: usuario.Ap_Paterno,
          Ap_Materno: usuario.Ap_Materno,
          CI: usuario.CI,
          Email: usuario.Email,
          RU: usuario.RU,
          Cargo:usuario.Cargo,
          username: usuario.username,
          password: usuario.password,
          Disponibilidad: usuario.Disponibilidad,
        }
      })
    }
    
    verificar=()=>{
        const datos = [];
        if(document.getElementById('1Lunes').checked){datos.push('1Lunes')}
        if(document.getElementById('1Martes').checked){datos.push('1Martes')}
        if(document.getElementById('1Miercoles').checked){datos.push('1Miercoles')}
        if(document.getElementById('1Jueves').checked){datos.push('1Jueves')}
        if(document.getElementById('1Viernes').checked){datos.push('1Viernes')}
        if(document.getElementById('1Sabado').checked){datos.push('1Sabado')}

        if(document.getElementById('2Lunes').checked){datos.push('2Lunes')}
        if(document.getElementById('2Martes').checked){datos.push('2Martes')}
        if(document.getElementById('2Miercoles').checked){datos.push('2Miercoles')}
        if(document.getElementById('2Jueves').checked){datos.push('2Jueves')}
        if(document.getElementById('2Viernes').checked){datos.push('2Viernes')}
        if(document.getElementById('2Sabado').checked){datos.push('2Sabado')}

        if(document.getElementById('3Lunes').checked){datos.push('3Lunes')}
        if(document.getElementById('3Martes').checked){datos.push('3Martes')}
        if(document.getElementById('3Miercoles').checked){datos.push('3Miercoles')}
        if(document.getElementById('3Jueves').checked){datos.push('3Jueves')}
        if(document.getElementById('3Viernes').checked){datos.push('3Viernes')}
        if(document.getElementById('3Sabado').checked){datos.push('3Sabado')}

        if(document.getElementById('4Lunes').checked){datos.push('4Lunes')}
        if(document.getElementById('4Martes').checked){datos.push('4Martes')}
        if(document.getElementById('4Miercoles').checked){datos.push('4Miercoles')}
        if(document.getElementById('4Jueves').checked){datos.push('4Jueves')}
        if(document.getElementById('4Viernes').checked){datos.push('4Viernes')}
        if(document.getElementById('4Sabado').checked){datos.push('4Sabado')}

        if(document.getElementById('5Lunes').checked){datos.push('5Lunes')}
        if(document.getElementById('5Martes').checked){datos.push('5Martes')}
        if(document.getElementById('5Miercoles').checked){datos.push('5Miercoles')}
        if(document.getElementById('5Jueves').checked){datos.push('5Jueves')}
        if(document.getElementById('5Viernes').checked){datos.push('5Viernes')}
        if(document.getElementById('5Sabado').checked){datos.push('5Sabado')}
        this.days(datos);
        this.modalInsertar();
    }

    handleChange=async e=>{
    e.persist();
    await this.setState({
      form:{
        ...this.state.form,
        [e.target.name]: e.target.value
      }
    });
    console.log(this.state.form);
    }
      componentDidMount() {
        this.peticionGet();
      }
    
    
    days = datos => {
        this.setState({
          ...this.state,
          modalInsertar: false,
          modalEliminar : true,
          form:{
            ...this.state.form, Disponibilidad: datos
          }
        })
        this.modalEliminar();
        console.log(this.state.form);

      };
      
    
      render(){
    
    
      return (
        <div>
            <PresentCard />
        <div className="text-left container">
        <br />
        {this.state.data.filter(docente => docente.RU === cookies.get("RU")).map(usuario=>{
              return(
                  <div key={usuario._id}>
                {usuario.Disponibilidad.length === 0? <button className="btn btn-dark" onClick={()=>{this.seleccionarUsuario(usuario); this.modalInsertar()}}>Modificar Disponibilidad</button> :
                <button className="btn btn-dark" disabled>Modificar Disponibilidad</button>} 
                    </div>
            )
        })}
        <br /> <br />       
                  <VerDisponibilidad RU={cookies.get("RU")}/>
        </div>
        
        <Modal isOpen={this.state.modalInsertar} centered fullscreen="" size="xl">
                    <ModalHeader style={{display: 'block'}}>
                      <span style={{float: 'right'}} onClick={()=>this.modalInsertar()}>x</span>
                    </ModalHeader>
                    <ModalHeader>
                MODIFICAR DISPONIBILIDAD
            </ModalHeader>

            <ModalBody>
            <Table bordered>
                <thead className="thead-dark text-center">
                <tr>
                <th scope="col">Hora</th>
                <th scope="col">Lunes</th>
                <th scope="col">Martes</th>
                <th scope="col">Miercoles</th>
                <th scope="col">Jueves</th>
                <th scope="col">Viernes</th>
                <th scope="col">Sabado</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                <th scope="row" className="text-center" id="turno">7:45-10:00</th>
                <td>
                    <div className="form-check">
                        <input className="form-check-input" type="checkbox" id="1Lunes"/>
                        <label className="form-check-label" htmlFor="gridCheck">Primer turno</label>
                    </div>    
                </td>
                <td>
                    <div className="form-check">
                        <input className="form-check-input" type="checkbox" id="1Martes" />
                        <label className="form-check-label" htmlFor="gridCheck">Primer turno</label>
                    </div>    
                </td>
                <td>
                    <div className="form-check">
                        <input className="form-check-input" type="checkbox" id="1Miercoles" />
                        <label className="form-check-label" htmlFor="gridCheck">Primer turno</label>
                    </div>    
                </td>
                <td>
                    <div className="form-check">
                        <input className="form-check-input" type="checkbox" id="1Jueves" />
                        <label className="form-check-label" htmlFor="gridCheck">Primer turno</label>
                    </div>    
                </td>
                <td>
                    <div className="form-check">
                        <input className="form-check-input" type="checkbox" id="1Viernes" />
                        <label className="form-check-label" htmlFor="gridCheck">Primer turno</label>
                    </div>    
                </td>
                <td>
                    <div className="form-check">
                        <input className="form-check-input" type="checkbox" id="1Sabado" />
                        <label className="form-check-label" htmlFor="gridCheck">Primer turno</label>
                    </div>    
                </td>
                </tr>
                <tr>
                <th scope="row" className="text-center" id="turno">10:00-12:15</th>
                <td>
                    <div className="form-check">
                        <input className="form-check-input" type="checkbox" id="2Lunes" />
                        <label className="form-check-label" htmlFor="gridCheck">Segundo Turno</label>
                    </div>    
                </td>
                <td>
                    <div className="form-check">
                        <input className="form-check-input" type="checkbox" id="2Martes" />
                        <label className="form-check-label" htmlFor="gridCheck">Segundo Turno</label>
                    </div>    
                </td>
                <td>
                    <div className="form-check">
                        <input className="form-check-input" type="checkbox" id="2Miercoles" />
                        <label className="form-check-label" htmlFor="gridCheck">Segundo Turno</label>
                    </div>    
                </td>
                <td>
                    <div className="form-check">
                        <input className="form-check-input" type="checkbox" id="2Jueves" />
                        <label className="form-check-label" htmlFor="gridCheck">Segundo Turno</label>
                    </div>    
                </td>
                <td>
                    <div className="form-check">
                        <input className="form-check-input" type="checkbox" id="2Viernes" />
                        <label className="form-check-label" htmlFor="gridCheck">Segundo Turno</label>
                    </div>    
                </td>
                <td>
                    <div className="form-check">
                        <input className="form-check-input" type="checkbox" id="2Sabado" />
                        <label className="form-check-label" htmlFor="gridCheck">Segundo Turno</label>
                    </div>    
                </td>
                </tr>
                <tr className= "text-center" id="Receso">
                <th scope="row" id="turno">12:15-14:00</th>
                <td>RECESO</td>
                <td>RECESO</td>
                <td>RECESO</td>
                <td>RECESO</td>
                <td>RECESO</td>
                <td>RECESO</td>
                </tr>
                <tr>
                <th scope="row" className="text-center" id="turno">14:00-16:15</th>
                <td>
                    <div className="form-check">
                        <input className="form-check-input" type="checkbox" id="3Lunes" />
                        <label className="form-check-label" htmlFor="gridCheck">Tercer Turno</label>
                    </div>    
                </td>
                <td>
                    <div className="form-check">
                        <input className="form-check-input" type="checkbox" id="3Martes" />
                        <label className="form-check-label" htmlFor="gridCheck">Tercer Turno</label>
                    </div>    
                </td>
                <td>
                    <div className="form-check">
                        <input className="form-check-input" type="checkbox" id="3Miercoles" />
                        <label className="form-check-label" htmlFor="gridCheck">Tercer Turnoo</label>
                    </div>    
                </td>
                <td>
                    <div className="form-check">
                        <input className="form-check-input" type="checkbox" id="3Jueves" />
                        <label className="form-check-label" htmlFor="gridCheck">Tercer Turno</label>
                    </div>    
                </td>
                <td>
                    <div className="form-check">
                        <input className="form-check-input" type="checkbox" id="3Viernes" />
                        <label className="form-check-label" htmlFor="gridCheck">Tercer Turno</label>
                    </div>    
                </td>
                <td>
                    <div className="form-check">
                        <input className="form-check-input" type="checkbox" id="3Sabado" />
                        <label className="form-check-label" htmlFor="gridCheck">Tercer Turno</label>
                    </div>    
                </td>
                </tr>
                <tr>
                <th scope="row" className="text-center" id="turno">16:15-18:30</th>
                <td>
                    <div className="form-check">
                        <input className="form-check-input" type="checkbox" id="4Lunes" />
                        <label className="form-check-label" htmlFor="gridCheck">Cuarto Turno</label>
                    </div>    
                </td>
                <td>
                    <div className="form-check">
                        <input className="form-check-input" type="checkbox" id="4Martes" />
                        <label className="form-check-label" htmlFor="gridCheck">Cuarto Turno</label>
                    </div>    
                </td>
                <td>
                    <div className="form-check">
                        <input className="form-check-input" type="checkbox" id="4Miercoles" />
                        <label className="form-check-label" htmlFor="gridCheck">Cuarto Turno</label>
                    </div>    
                </td>
                <td>
                    <div className="form-check">
                        <input className="form-check-input" type="checkbox" id="4Jueves" />
                        <label className="form-check-label" htmlFor="gridCheck">Cuarto Turno</label>
                    </div>    
                </td>
                <td>
                    <div className="form-check">
                        <input className="form-check-input" type="checkbox" id="4Viernes" />
                        <label className="form-check-label" htmlFor="gridCheck">Cuarto Turno</label>
                    </div>    
                </td>
                <td>
                    <div className="form-check">
                        <input className="form-check-input" type="checkbox" id="4Sabado" />
                        <label className="form-check-label" htmlFor="gridCheck">Cuarto Turno</label>
                    </div>    
                </td>
                </tr>
                <tr>
                <th scope="row" className="text-center" id="turno">18:30-20:00</th>
                <td>
                    <div className="form-check">
                        <input className="form-check-input" type="checkbox" id="5Lunes" />
                        <label className="form-check-label" htmlFor="gridCheck">Quinto Turno</label>
                    </div>    
                </td>
                <td>
                    <div className="form-check">
                        <input className="form-check-input" type="checkbox" id="5Martes" />
                        <label className="form-check-label" htmlFor="gridCheck">Quinto Turno</label>
                    </div>    
                </td>
                <td>
                    <div className="form-check">
                        <input className="form-check-input" type="checkbox" id="5Miercoles" />
                        <label className="form-check-label" htmlFor="gridCheck">Quinto Turno</label>
                    </div>    
                </td>
                <td>
                    <div className="form-check">
                        <input className="form-check-input" type="checkbox" id="5Jueves" />
                        <label className="form-check-label" htmlFor="gridCheck">Quinto Turno</label>
                    </div>    
                </td>
                <td>
                    <div className="form-check">
                        <input className="form-check-input" type="checkbox" id="5Viernes" />
                        <label className="form-check-label" htmlFor="gridCheck">Quinto Turno</label>
                    </div>    
                </td>
                <td>
                    <div className="form-check">
                        <input className="form-check-input" type="checkbox" id="5Sabado" />
                        <label className="form-check-label" htmlFor="gridCheck">Quinto Turno</label>
                    </div>    
                </td>
                </tr>
                </tbody>
            </Table>
            </ModalBody>
    
                    <ModalFooter>
                      <button className="btn btn-success" onClick={()=>this.verificar()}>
                        Actualizar
                      </button>
      
                        <button className="btn btn-danger" onClick={()=>this.modalInsertar()}>Cancelar</button>
                    </ModalFooter>
              </Modal>
    
    
              <Modal isOpen={this.state.modalEliminar}>
                <ModalBody>
                   ¿Desea guardar los cambios?
                </ModalBody>
                <ModalFooter>
                  <button className="btn btn-danger" onClick={()=>{this.peticionPut(); window.location.reload();}}>Sí</button>
                  <button className="btn btn-secundary" onClick={()=>this.setState({modalEliminar: false})}>No</button>
                </ModalFooter>
              </Modal>
      </div>
      
    
    
    
      );
    }
    }
  export default Disponibilidad;