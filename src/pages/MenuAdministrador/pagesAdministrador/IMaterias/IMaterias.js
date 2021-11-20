import React, { Component } from "react";
import './IMaterias.css';
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import PresentCard from "../../../PresentCard/PresentCard";


const url = "http://localhost:8000/api/materia";
const urlDocentes ="http://localhost:8000/api/docente"
const urlSemestres= "http://localhost:8000/api/semestres";
const urlAulas = "http://localhost:8000/api/tipoAula";

class IMaterias extends Component {
  //Almacenar estado
  state = {
    data: [],
    Docentes: [],
    Semestres: [],
    Aulas: [],
    modalInsertar: false,
    modalEliminar: false,
    selectedOption: null,
    tipoModal: "",
    form: {
      _id: "",
      Nombre: "",
      Sigla: "",
      Semestre: "",
      Docente: "",
      TipoAula: "",
      CantHSemanas: "",
    },
  };

  componentDidMount() {
    axios.get(urlDocentes)
    .then((response) => {
      console.log(response);
      this.setState({Docentes: response.data});
      this.peticionGet();
    })
    .catch((error) => {
      console.log(error);
    });
    axios.get(urlSemestres)
    .then((response) => {
      console.log(response);
      this.setState({Semestres: response.data});
      this.peticionGet();
    })
    .catch((error) => {
      console.log(error);
    });
    axios.get(urlAulas)
    .then((response) => {
      console.log(response);
      this.setState({Aulas: response.data});
      this.peticionGet();
    })
    .catch((error) => {
      console.log(error);
    });
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
          Sigla: this.state.form.Sigla,
          Semestre: this.state.form.Semestre,
          Docente: this.state.form.Docente,
          TipoAula: this.state.form.TipoAula,
          CantHSemanas: this.state.form.CantHSemanas,
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
          _id: this.state.form._id,
          Nombre: this.state.form.Nombre,
          Sigla: this.state.form.Sigla,
          Semestre: this.state.form.Semestre,
          Docente: this.state.form.Docente,
          TipoAula: this.state.form.TipoAula,
          CantHSemanas: this.state.form.CantHSemanas,
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
    
    seleccionarMateria=(materia)=>{
      this.setState({
        tipoModal: 'actualizar',
        form: {
          _id: materia._id,
          Nombre: materia.Nombre,
          Sigla: materia.Sigla,
          Semestre: materia.Semestre,
          Docente: materia.Docente,
          TipoAula: materia.TipoAula,
          CantHSemanas: materia.CantHSemanas,
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
          <button className="btn btn-dark" onClick={()=>{this.setState({form: null, tipoModal: 'insertar'}); this.modalInsertar()}}>Agregar Materia</button>
          </div>
          <br />
        <table className="table table-fixed text-center container">
          <thead className="row">
            <tr>
              <th id="Primero">Nombre</th>
              <th id="Primero">Sigla</th>
              <th id="Primero">Semestre</th>
              <th id="Primero">Docente</th>
              <th id="Primero">Tipo de Aula</th>
              <th id="Primero">CantHSemanas</th>
              <th id="Primero">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {this.state.data.map(materia=>{
                
                return(
                    <tr key={materia._id}>
                        <td id="Primero">{materia.Nombre}</td>
                        <td id="Primero">{materia.Sigla}</td>
                        <td id="Primero">{materia.Semestre}</td>
                        <td id="Primero">{materia.Docente}</td>
                        <td id="Primero">{materia.TipoAula}</td>
                        <td id="Primero">{materia.CantHSemanas}</td>
                        <td id="Primero">
                    <button className="btn btn-dark" onClick={()=>{this.seleccionarMateria(materia); this.modalInsertar()}}><FontAwesomeIcon icon={faEdit}/></button>
                    {"   "}
                    <button className="btn btn-danger" onClick={()=>{this.seleccionarMateria(materia); this.setState({modalEliminar: true})}}><FontAwesomeIcon icon={faTrashAlt}/></button>
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
                        <label htmlFor="Sigla">Sigla</label>
                        <input className="form-control" type="text" name="Sigla" id="Sigla" onChange={this.handleChange} value={form?form.Sigla: ''}/>
                        <br />
                        <label htmlFor="Semestre">Semestre</label>
                        <select name="Semestre" className="form-select" id="Semestre" onChange={this.handleChange}>
                          <option>Selecionar Semestre...</option>
                          {this.state.Semestres.map(elemento => (
                            <option key={elemento._id} value={elemento._Nombre}>{elemento.Nombre}</option>
                            )
                          )}
                        </select>
                        <br />
                        <label htmlFor="Docente">Docente</label>
                        <select name="Docente" className="form-select" id="Docente" onChange={this.handleChange}>
                          <option>Selecionar Docente</option>
                          {this.state.Docentes.map(elemento => (
                            <option key={elemento._id} value={elemento._Nombre}>{elemento.Nombre} {elemento.Ap_Paterno} {elemento.Ap_Materno}</option>
                            )
                          )}
                        </select>
                        <br />
                        <label htmlFor="TipoAula">Tipo de Aula</label>
                        <select name="TipoAula" className="form-select" id="TipoAula" onChange={this.handleChange}>
                          <option>Selecionar tipo de aula...</option>
                          {this.state.Aulas.map(elemento => (
                            <option key={elemento._id} value={elemento._Nombre}>{elemento.Nombre}</option>
                            )
                          )}
                        </select>
                        <br />
                        <label htmlFor="CantHSemanas">CantHSemanas</label>
                        <input className="form-control" type="number" name="CantHSemanas" id="CantHSemanas" onChange={this.handleChange} value={form?form.CantHSemanas:''}/>
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
export default IMaterias;