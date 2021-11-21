import React, { Component } from "react";
import "./IAulas.css";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import PresentCard from "../../../PresentCard/PresentCard";


const url = "http://localhost:8000/api/aula";
const urlPlantas =  axios.get("http://localhost:8000/api/planta");
const urlSalas = axios.get("http://localhost:8000/api/tipoAula");
class IAulas extends Component {
  //Almacenar estado
  state = {
    data: [],
    Plantas: [],
    Salas: [],
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

  componentDidMount() {
    axios.get(urlPlantas)
    .then((response) => {
      console.log(response);
      this.setState({Plantas: response.data});
    })
    .catch((error) => {
      console.log(error);
    });
    axios.get(urlSalas)
    .then((response) => {
      console.log(response);
      this.setState({Salas: response.data});
    })
    .catch((error) => {
      console.log(error);
    });
    this.peticionGet();
  }

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
              <th id="Pri">Nombre</th>
              <th id="Pri">Planta</th>
              <th id="Pri">Tipo sala</th>
              <th id="Pri">Capacidad</th>
              <th id="Pri">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {this.state.data.map(aula=>{
                
                return(
                    <tr key={aula._id}>
                        <td id="Pri">{aula.Nombre}</td>
                        <td id="Pri">{aula.Piso}</td>
                        <td id="Pri">{aula.TipoSala}</td>
                        <td id="Pri">{aula.Capacidad}</td>
                        <td id="Pri">
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
                        <label htmlFor="Piso">Planta</label>
                        <select name="Piso" className="form-select" id="Piso" onChange={this.handleChange}>
                          <option>Selecionar planta...</option>
                          {this.state.Plantas.map(elemento => (
                            <option key={elemento._id} value={elemento._Nombre}>{elemento.Nombre}</option>
                            )
                          )}
                        </select>
                        <br />
                        <label htmlFor="TipoSala">Sala</label>
                        <select name="TipoSala" className="form-select" id="TipoSala" onChange={this.handleChange}>
                          <option>Selecionar tipo de sala...</option>
                          {this.state.Salas.map(elemento => (
                            <option key={elemento._id} value={elemento._Nombre}>{elemento.Nombre}</option>
                            )
                          )}
                        </select>
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
