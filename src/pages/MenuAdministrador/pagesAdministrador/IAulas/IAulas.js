import React, { Component } from "react";
import "./IAulas.css";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import PresentCard from "../../../PresentCard/PresentCard";


const url = "http://localhost:8000/api/aula";

class IAulas extends Component {
  //Almacenar estado
  state = {
    data: [],
    modalInsertar: false,
    modalEliminar: false,
    selectedOption: null,
    tipoModal: "",
    form: {
      _id: "",
      Nombre: "",
      Piso: "",
      TipoSala: "",
      Capacidad: "",
    },
  };

  peticionGet=()=>{
    axios.get(url).then(response=>{
      this.setState({data: response.data});
    }).catch(error=>{
      console.log(error.message);
    })
    }
    
    peticionPost=async()=>{
        delete this.state.form._id;
       await axios.post(`${url}/create`,
        {
          _id: this.state.form._id,
          Nombre: this.state.form.Nombre,
          Piso: this.state.form.Piso,
          TipoSala: this.state.form.TipoSala,
          Capacidad: this.state.form.Capacidad,
        }
        ).then(response=>{
          this.modalInsertar();
          this.peticionGet();
        }).catch(error=>{
          console.log(error.message);
        })
      }
    
    peticionPut=()=>{
        axios.put(`${url}/edit/${this.state.form._id}`, 
        {
          id: this.state.form._id,
          Nombre: this.state.form.Nombre,
          Piso: this.state.form.Piso,
          TipoSala: this.state.form.TipoSala,
          Capacidad: this.state.form.Capacidad,
        }
        ).then(response=>{
            this.modalInsertar();
          this.peticionGet();
        })
      }
      
      peticionDelete=()=>{
        axios.delete(`${url}/delete/${this.state.form._id}`).then(response=>{
          this.setState({modalEliminar: false});
          this.peticionGet();
        })
      }
    
    modalInsertar=()=>{
      this.setState({modalInsertar: !this.state.modalInsertar});
    }
    
    seleccionarAula=(aula)=>{
      this.setState({
        tipoModal: 'actualizar',
        form: {
          _id: aula._id,
          Nombre: aula.Nombre,
          Piso: aula.Piso,
          TipoSala: aula.TipoSala,
          Capacidad: aula.Capacidad,
        }
      })
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
      
    
      render(){
        const {form}=this.state;
      return (
        <div>
          <PresentCard />
        <div className="text-left container">
            <br />
          <button className="btn btn-dark" onClick={()=>{this.setState({form: null, tipoModal: 'insertar'}); this.modalInsertar()}}>Agregar Aula</button>
          </div>
          <br />
        <table className="table table-fixed text-center container">
          <thead className="row">
            <tr>
              <th className="Pri">Nombre</th>
              <th className="Pri">Piso</th>
              <th className="Pri">Tipo sala</th>
              <th className="Pri">Capacidad</th>
              <th className="Pri">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {this.state.data.map(aula=>{
                
                return(
                    <tr key={aula._id}>
                        <td className="Pri">{aula.Nombre}</td>
                        <td className="Pri">{aula.Piso}</td>
                        <td className="Pri">{aula.TipoSala}</td>
                        <td className="Pri">{aula.Capacidad}</td>
                        <td className="Pri">
                    <button className="btn btn-dark" onClick={()=>{this.seleccionarAula(aula); this.modalInsertar()}}><FontAwesomeIcon icon={faEdit}/></button>
                    {"   "}
                    <button className="btn btn-danger" onClick={()=>{this.seleccionarAula(aula); this.setState({modalEliminar: true})}}><FontAwesomeIcon icon={faTrashAlt}/></button>
                    </td>
              </tr>
              )
            })}
          </tbody>
        </table>
    
    
    
        <Modal isOpen={this.state.modalInsertar}>
                    <ModalHeader style={{display: 'block'}}>
                      <span style={{float: 'right'}} onClick={()=>this.modalInsertar()}>x</span>
                    </ModalHeader>
                    <ModalBody>
                      <div className="form-group">
                        <label htmlFor="Nombre">Nombre</label>
                        <input className="form-control" type="text" name="Nombre" id="Nombre" onChange={this.handleChange} value={form?form.Nombre: ''}/>
                        <br />
                        <label htmlFor="Piso">Piso</label>
                        <input className="form-control" type="text" name="Piso" id="Piso" onChange={this.handleChange} value={form?form.Piso: ''}/>
                        <br />
                        <label htmlFor="Tipo Sala">Tipo Sala</label>
                        <input className="form-control" type="text" name="TipoSala" id="TipoSala" onChange={this.handleChange} value={form?form.TipoSala: ''}/>
                        <br />
                        <label htmlFor="Capacidad">Capacidad</label>
                        <input className="form-control" type="number" name="Capacidad" id="Capacidad" onChange={this.handleChange} value={form?form.Capacidad:''}/>
                        <br />
                      </div>
                    </ModalBody>
    
                    <ModalFooter>
                      {this.state.tipoModal==='insertar'?
                        <button className="btn btn-dark" onClick={()=>this.peticionPost()}>
                        Insertar
                      </button>: <button className="btn btn-success" onClick={()=>this.peticionPut()}>
                        Actualizar
                      </button>
      }
                        <button className="btn btn-danger" onClick={()=>this.modalInsertar()}>Cancelar</button>
                    </ModalFooter>
              </Modal>
    
    
              <Modal isOpen={this.state.modalEliminar}>
                <ModalBody>
                   ¿Estás seguro que deseas eliminar esta Aula? {form && form.Nombre}
                </ModalBody>
                <ModalFooter>
                  <button className="btn btn-danger" onClick={()=>this.peticionDelete()}>Sí</button>
                  <button className="btn btn-secundary" onClick={()=>this.setState({modalEliminar: false})}>No</button>
                </ModalFooter>
              </Modal>
      </div>
      
    
    
    
      );
    }
    }
export default IAulas;
