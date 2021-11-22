import React, { Component } from "react";
import { Table } from "react-bootstrap";
import { Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

const url = "http://localhost:8000/api/primerTurno"
const urlMaterias = "http://localhost:8000/api/materia"
const urlDocentes = "http://localhost:8000/api/Docente"
const urlAulas = "http://localhost:8000/api/aula"
const urlSemestres = "http://localhost:8000/api/semestres"
class Primero extends Component {
  state = {
    data: [],
    Materias: [],
    Docentes: [],
    Aulas: [],
    Semestres : [],
    modalInsertar: false,
    modalEliminar: false,
    tipoModal: "",
    Primero : [],
    Segundo : [],
    form: {
      _id: "",
      Dia: '',
      Materia: "",
      Docente: "",
      Aula: "",
      Turno: ""
    },
  };

  componentDidMount() {
    axios.get(urlMaterias)
    .then((response) => {
      console.log(response);
      this.setState({Materias: response.data});
    })
    .catch((error) => {
      console.log(error);
    });
    axios.get(urlDocentes)
    .then((response) => {
      console.log(response);
      this.setState({Docentes: response.data});
    })
    .catch((error) => {
      console.log(error);
    });
    axios.get(urlAulas)
    .then((response) => {
      console.log(response);
      this.setState({Aulas: response.data});
    })
    .catch((error) => {
      console.log(error);
    });
    axios.get(urlSemestres)
    .then((response) => {
      console.log(response);
      this.setState({Semestres: response.data});
    })
    .catch((error) => {
      console.log(error);
    });
    this.peticionGet();
  }

  peticionGet=()=>{
    axios.get(url).then(response=>{
      this.setState({data: response.data});
      this.setState({Primero : this.state.data.filter(elemento => elemento.Turno === "PRIMER TURNO")})
      this.setState({Segundo : this.state.data.filter(elemento => elemento.Turno === "SEGUNDO TURNO")})
    }).catch(error=>{
      console.log(error.message);
    })
    }

    peticionPost=async()=>{
      delete this.state.form._id;
     await axios.post(`${url}/create`,
      {
        _id: this.state.form._id,
        Dia: this.state.form.Dia,
        Materia: this.state.form.Materia,
        Docente: this.state.form.Docente,
        Aula: this.state.form.Aula,
        Turno: this.state.form.Turno,
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
        Dia: this.state.form.Dia,
        Materia: this.state.form.Materia,
        Docente: this.state.form.Docente,
        Aula: this.state.form.Aula,
        Turno: this.state.form.Turno,
      }
      ).then(response=>{
          this.modalInsertar();
          this.peticionGet();
      })
    }

    seleccionarAula=(aula)=>{
      this.setState({
        tipoModal: 'actualizar',
        form: {
          _id: aula._id,
          Dia: aula.Dia,
          Materia: aula.Materia,
          Docente: aula.Docente,
          Aula: aula.Aula,
          Turno: aula.Turno,
        }
      })
    }

    peticionDelete=()=>{
      axios.delete(`${url}/delete/${this.state.form._id}`).then(response=>{
        this.setState({modalEliminar: false});
        this.peticionGet();
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

      modalInsertar=()=>{
        this.setState({modalInsertar: !this.state.modalInsertar});
      }
  
  render() {
    return (
      <>
      <div className="text-left container">
            <br />
          <button className="btn btn-dark" onClick={()=>{this.setState({form: null, tipoModal: 'insertar'}); this.modalInsertar()}}>Agregar Aula</button>
          </div>
          <br />
        <Table id='Hora' className="text-left container" striped bordered hover>
          <thead>
            <tr className="text-center">
              <th>Hora</th>
              <th>Lunes</th>
              <th>Martes</th>
              <th>Miercoles</th>
              <th>Jueves</th>
              <th>Viernes</th>
              <th>Sabado</th>
            </tr>
          </thead>
          <tbody>
            <tr className="text-center">
              <td>7:45-10:00</td>
                {this.state.Primero.find(elemento => elemento.Dia==='Lunes')? this.state.Primero.filter(elemento => elemento.Dia === 'Lunes').map(elemento => {
                  if(elemento.Dia==='Lunes'){
                    return <td key= {elemento._id}>{elemento.Materia}<br />{elemento.Docente}<br />{elemento.Aula}<br /><button className="btn btn-dark" onClick={()=>{this.seleccionarAula(elemento); this.modalInsertar()}}><FontAwesomeIcon icon={faEdit}/></button>
                    {"   "}
                    <button className="btn btn-danger" onClick={()=>{this.seleccionarAula(elemento); this.setState({modalEliminar: true})}}><FontAwesomeIcon icon={faTrashAlt}/></button></td>
                  }
                }): <td>Vacio</td>}

                {this.state.Primero.find(elemento => elemento.Dia==='Martes')? this.state.Primero.filter(elemento => elemento.Dia === 'Martes').map(elemento => {
                  if(elemento.Dia==='Martes'){
                    return <td key= {elemento._id}>{elemento.Materia}<br />{elemento.Docente}<br />{elemento.Aula}<br /><button className="btn btn-dark" onClick={()=>{this.seleccionarAula(elemento); this.modalInsertar()}}><FontAwesomeIcon icon={faEdit}/></button>
                    {"   "}
                    <button className="btn btn-danger" onClick={()=>{this.seleccionarAula(elemento); this.setState({modalEliminar: true})}}><FontAwesomeIcon icon={faTrashAlt}/></button></td>
                  }
                }): <td>Vacio</td>}

                {this.state.Primero.find(elemento => elemento.Dia==='Miercoles')? this.state.Primero.filter(elemento => elemento.Dia === 'Miercoles').map(elemento => {
                  if(elemento.Dia==='Miercoles'){
                    return <td key= {elemento._id}>{elemento.Materia}<br />{elemento.Docente}<br />{elemento.Aula}<br /><button className="btn btn-dark" onClick={()=>{this.seleccionarAula(elemento); this.modalInsertar()}}><FontAwesomeIcon icon={faEdit}/></button>
                    {"   "}
                    <button className="btn btn-danger" onClick={()=>{this.seleccionarAula(elemento); this.setState({modalEliminar: true})}}><FontAwesomeIcon icon={faTrashAlt}/></button></td>
                  }
                }): <td>Vacio</td>}

                {this.state.Primero.find(elemento => elemento.Dia==='Jueves')? this.state.Primero.filter(elemento => elemento.Dia === 'Jueves').map(elemento => {
                  if(elemento.Dia==='Jueves'){
                    return <td key= {elemento._id}>{elemento.Materia}<br />{elemento.Docente}<br />{elemento.Aula}<br /><button className="btn btn-dark" onClick={()=>{this.seleccionarAula(elemento); this.modalInsertar()}}><FontAwesomeIcon icon={faEdit}/></button>
                    {"   "}
                    <button className="btn btn-danger" onClick={()=>{this.seleccionarAula(elemento); this.setState({modalEliminar: true})}}><FontAwesomeIcon icon={faTrashAlt}/></button></td>
                  }
                }): <td>Vacio</td>}

                {this.state.Primero.find(elemento => elemento.Dia==='Viernes')? this.state.Primero.filter(elemento => elemento.Dia === 'Viernes').map(elemento => {
                  if(elemento.Dia==='Viernes'){
                    return <td key= {elemento._id}>{elemento.Materia}<br />{elemento.Docente}<br />{elemento.Aula}<br /><button className="btn btn-dark" onClick={()=>{this.seleccionarAula(elemento); this.modalInsertar()}}><FontAwesomeIcon icon={faEdit}/></button>
                    {"   "}
                    <button className="btn btn-danger" onClick={()=>{this.seleccionarAula(elemento); this.setState({modalEliminar: true})}}><FontAwesomeIcon icon={faTrashAlt}/></button></td>
                  }
                }): <td>Vacio</td>}

                {this.state.Primero.find(elemento => elemento.Dia==='Sabado')? this.state.Primero.filter(elemento => elemento.Dia === 'Sabado').map(elemento => {
                  if(elemento.Dia==='Sabado'){
                    return <td key= {elemento._id}>{elemento.Materia}<br />{elemento.Docente}<br />{elemento.Aula}<br /><button className="btn btn-dark" onClick={()=>{this.seleccionarAula(elemento); this.modalInsertar()}}><FontAwesomeIcon icon={faEdit}/></button>
                    {"   "}
                    <button className="btn btn-danger" onClick={()=>{this.seleccionarAula(elemento); this.setState({modalEliminar: true})}}><FontAwesomeIcon icon={faTrashAlt}/></button></td>
                  }
                }): <td>Vacio</td>}
              
            </tr>
          </tbody>
          <tbody>
            <tr className="text-center">
              <td>10:00-12:15</td>
              {this.state.Segundo.find(elemento => elemento.Dia==='Lunes')? this.state.Segundo.filter(elemento => elemento.Dia === 'Lunes').map(elemento => {
                  if(elemento.Dia==='Lunes'){
                    return <td key= {elemento._id}>{elemento.Materia}<br />{elemento.Docente}<br />{elemento.Aula}<br /><button className="btn btn-dark" onClick={()=>{this.seleccionarAula(elemento); this.modalInsertar()}}><FontAwesomeIcon icon={faEdit}/></button>
                    {"   "}
                    <button className="btn btn-danger" onClick={()=>{this.seleccionarAula(elemento); this.setState({modalEliminar: true})}}><FontAwesomeIcon icon={faTrashAlt}/></button></td>
                  }
                }): <td>Vacio</td>}

                {this.state.Segundo.find(elemento => elemento.Dia==='Martes')? this.state.Segundo.filter(elemento => elemento.Dia === 'Martes').map(elemento => {
                  if(elemento.Dia==='Martes'){
                    return <td key= {elemento._id}>{elemento.Materia}<br />{elemento.Docente}<br />{elemento.Aula}<br /><button className="btn btn-dark" onClick={()=>{this.seleccionarAula(elemento); this.modalInsertar()}}><FontAwesomeIcon icon={faEdit}/></button>
                    {"   "}
                    <button className="btn btn-danger" onClick={()=>{this.seleccionarAula(elemento); this.setState({modalEliminar: true})}}><FontAwesomeIcon icon={faTrashAlt}/></button></td>
                  }
                }): <td>Vacio</td>}

                {this.state.Segundo.find(elemento => elemento.Dia==='Miercoles')? this.state.Segundo.filter(elemento => elemento.Dia === 'Miercoles').map(elemento => {
                  if(elemento.Dia==='Miercoles'){
                    return <td key= {elemento._id}>{elemento.Materia}<br />{elemento.Docente}<br />{elemento.Aula}<br /><button className="btn btn-dark" onClick={()=>{this.seleccionarAula(elemento); this.modalInsertar()}}><FontAwesomeIcon icon={faEdit}/></button>
                    {"   "}
                    <button className="btn btn-danger" onClick={()=>{this.seleccionarAula(elemento); this.setState({modalEliminar: true})}}><FontAwesomeIcon icon={faTrashAlt}/></button></td>
                  }
                }): <td>Vacio</td>}

                {this.state.Segundo.find(elemento => elemento.Dia==='Jueves')? this.state.Segundo.filter(elemento => elemento.Dia === 'Jueves').map(elemento => {
                  if(elemento.Dia==='Jueves'){
                    return <td key= {elemento._id}>{elemento.Materia}<br />{elemento.Docente}<br />{elemento.Aula}<br /><button className="btn btn-dark" onClick={()=>{this.seleccionarAula(elemento); this.modalInsertar()}}><FontAwesomeIcon icon={faEdit}/></button>
                    {"   "}
                    <button className="btn btn-danger" onClick={()=>{this.seleccionarAula(elemento); this.setState({modalEliminar: true})}}><FontAwesomeIcon icon={faTrashAlt}/></button></td>
                  }
                }): <td>Vacio</td>}

                {this.state.Segundo.find(elemento => elemento.Dia==='Viernes')? this.state.Segundo.filter(elemento => elemento.Dia === 'Viernes').map(elemento => {
                  if(elemento.Dia==='Viernes'){
                    return <td key= {elemento._id}>{elemento.Materia}<br />{elemento.Docente}<br />{elemento.Aula}<br /><button className="btn btn-dark" onClick={()=>{this.seleccionarAula(elemento); this.modalInsertar()}}><FontAwesomeIcon icon={faEdit}/></button>
                    {"   "}
                    <button className="btn btn-danger" onClick={()=>{this.seleccionarAula(elemento); this.setState({modalEliminar: true})}}><FontAwesomeIcon icon={faTrashAlt}/></button></td>
                  }
                }): <td>Vacio</td>}

                {this.state.Segundo.find(elemento => elemento.Dia==='Sabado')? this.state.Segundo.filter(elemento => elemento.Dia === 'Sabado').map(elemento => {
                  if(elemento.Dia==='Sabado'){
                    return <td key= {elemento._id}>{elemento.Materia}<br />{elemento.Docente}<br />{elemento.Aula}<br /><button className="btn btn-dark" onClick={()=>{this.seleccionarAula(elemento); this.modalInsertar()}}><FontAwesomeIcon icon={faEdit}/></button>
                    {"   "}
                    <button className="btn btn-danger" onClick={()=>{this.seleccionarAula(elemento); this.setState({modalEliminar: true})}}><FontAwesomeIcon icon={faTrashAlt}/></button></td>
                  }
                }): <td>Vacio</td>}
            </tr>
          </tbody>
          <tbody>
            <tr className="text-center">
              <td>12:15-14:00</td>
              <td>RECESO</td>
              <td>RECESO</td>
              <td>RECESO</td>
              <td>RECESO</td>
              <td>RECESO</td>
              <td>RECESO</td>
            </tr>
          </tbody>
          <tbody>
            <tr>
              <td>14:00-16:15</td>
            </tr>
          </tbody>
          <tbody>
            <tr>
              <td>16:15-18:30</td>
            </tr>
          </tbody>
          <tbody>
            <tr>
              <td>18:30-20:00</td>
            </tr>
          </tbody>
        </Table>

        <Modal isOpen={this.state.modalInsertar}>
        <ModalHeader style={{display: 'block'}}>
            <span style={{float: 'right'}} onClick={()=>this.modalInsertar()}>x</span>
        </ModalHeader>
        <ModalBody>
            <div className="form-group">
              <label htmlFor="Dia">Dia</label>
              <select name="Dia" className="form-select" id="TipoSala" onChange={this.handleChange}>
              <option >Seleccionar Dia...</option>
                <option value='Lunes'>Lunes</option>
                <option value='Martes'>Martes</option>
                <option value='Miercoles'>Miercoles</option>
                <option value='Jueves'>Jueves</option>
                <option value='Viernes'>Viernes</option>
                <option value='Sabado'>Sabado</option>
              </select>
              <br/>
              <label htmlFor="Materia">Materia</label>
              <select name="Materia" className="form-select" id="Materia" onChange={this.handleChange}>
                <option>Selecionar Materia...</option>
                {this.state.Materias.filter(elemento => elemento.Semestre === 'PRIMER SEMESTRE').map(elemento => (
                <option key={elemento._id} value={elemento._Nombre}>{elemento.Nombre} ({elemento.Sigla})</option>
                )
                )}
                </select>
                <br/>
              <label htmlFor="Docente">Docente</label>
              <select name="Docente" className="form-select" id="Docente" onChange={this.handleChange}>
                <option>Selecionar Docente...</option>
                {this.state.Docentes.map(elemento => (
                <option key={elemento._id} value={elemento._Nombre}>{elemento.Nombre} {elemento.Ap_Paterno} {elemento.Ap_Materno}</option>
                )
                )}
                </select>
                <br/>
                <label htmlFor="Aula">Aula</label>
              <select name="Aula" className="form-select" id="Aula" onChange={this.handleChange}>
                <option>Selecionar Aula...</option>
                {this.state.Aulas.filter(elemento => elemento.Nombre.includes('1')).map(elemento => (
                <option key={elemento._id} value={elemento._Nombre}>{elemento.Nombre} ({elemento.TipoSala})</option>
                )
                )}
                </select>
                <br/>
                <label htmlFor="Turno">Turno</label>
              <select name="Turno" className="form-select" id="Turno" onChange={this.handleChange}>
                <option>Selecionar Turno...</option>
                <option value='PRIMER TURNO'>PRIMER TURNO</option>
                <option value='SEGUNDO TURNO'>SEGUNDO TURNO</option>
                <option value='TERCER TURNO'>TERCER TURNO</option>
                <option value='CUARTO TURNO'>CUARTO TURNO</option>
                <option value='QUINTO TURNO'>QUINTO TURNO</option>
                </select>
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
                   ¿Estás seguro que deseas eliminar esta Clase?
                </ModalBody>
                <ModalFooter>
                  <button className="btn btn-danger" onClick={()=>this.peticionDelete()}>Sí</button>
                  <button className="btn btn-secundary" onClick={()=>this.setState({modalEliminar: false})}>No</button>
                </ModalFooter>
              </Modal>
      </>
    );
  }
}
export default Primero;
