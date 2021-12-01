import React, { Component } from "react";
import "./IAulas.css";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import Swal from 'sweetalert2'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { AiFillPrinter } from "react-icons/ai";
import { Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import PresentCard from "../../../PresentCard/PresentCard";
import jsPDF from 'jspdf'
import 'jspdf-autotable'

const url = "http://localhost:8000/api/aula";
const columns = [
  {title: "Nombre", field: "Nombre"},
  {title: "Planta", field: "Piso"},
  {title: "Tipo Sala", field: "TipoSala"},
  {title: "Capacidad", field: "Capacidad"},
]
class IAulas extends Component {
  //Almacenar estado
  state = {
    data: [],
    modalInsertar: false,
    selectedOption: null,
    busqueda1: "Filtrar todas las salas",
    busqueda2: "",
    busqueda: "",
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
          Swal.fire({
            title: 'Aula actualizada correctamente',
            icon: 'success',
            showConfirmButton: false,
            timer: 1500
          })
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
    
    onChange = async (e) => {
      e.persist();
      await this.setState({
        ...this.state.busquedaRU,
        [e.target.name]: e.target.value,
      });
      console.log(this.state.busquedaRU);
    };
  
    onChange1 = async (e) => {
      e.persist();
      await this.setState({
        ...this.state.busqueda1,
        [e.target.name]: e.target.value,
      });
    };
  
    seleccionarBusqueda = () => {
      this.setState({ busqueda: this.state.busqueda2 });
    };
    
    modalEliminar = () => {
      Swal.fire({
        title: `¡Espera!`,
        text: `¿Esta seguro de eliminar ${this.state.form.Nombre}?`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si'
      }).then((result) => {
        if (result.isConfirmed) {
          this.peticionDelete()
          Swal.fire(
            '¡Eliminado!',
            'Su solicitud se ejecuto de manera exitosa',
            'success'
          )
        } else {
          this.setState({modalEliminar: false})
        }
      })
    }
    DownloadPdf=()=>{
      const doc= new jsPDF()
      doc.text("AULAS REGISTRADAS",20,10)
      doc.autoTable({
          theme: "striped",
          columns:columns.map(col => ({ ...col, dataKey: col.field })),
          body: this.state.data
      })
      doc.save("aulas.pdf")
    }
    
      render(){
        const {form}=this.state;
      return (
        <div>
          <PresentCard />
        <div className="text-left container">
            <br />
          <button className="btn btn-dark" onClick={()=>{this.setState({form: null, tipoModal: 'insertar'}); this.modalInsertar()}}>Agregar Aula</button>
          <div className="barraBusqueda">
            <select
              className="textField"
              placeholder="Buscar Semestre"
              type="text"
              name="busqueda1"
              id="busqueda1"
              onChange={this.onChange1}
              value={this.state.busqueda1}
            >
              <option>Filtrar todas las salas</option>
              <option>SALA NORMAL</option>
              <option>LABORATORIO</option>
              <option>SALA DE COMPUTACION</option>
              
            </select>{"   "}

            <input
              className="textField"
              placeholder="Buscar por Nombre"
              type="text"
              name="busqueda2"
              id="busqueda2"
              onChange={this.onChange}
              value={this.state.busqueda2}
            />
            <button
              type="button"
              className="btn btn-dark"
              onClick={this.seleccionarBusqueda}
            >
              {" "}
              <FontAwesomeIcon icon={faSearch} />
            </button>
            {" "}
            <button className="btn btn-dark" onClick={()=>this.DownloadPdf()}><AiFillPrinter size={20}/></button>
          </div>
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
            {this.state.data
              .filter((elemento) =>
                this.state.busqueda !== ""?
                   this.state.busqueda.includes(elemento.Nombre): this.state.busqueda1 === "Filtrar todas las salas"?
                   typeof (elemento.Nombre) === "string": 
                   elemento.TipoSala === this.state.busqueda1 
              ).map(aula=>{
                
                return(
                    <tr key={aula._id}>
                        <td id="Pri">{aula.Nombre}</td>
                        <td id="Pri">{aula.Piso}</td>
                        <td id="Pri">{aula.TipoSala}</td>
                        <td id="Pri">{aula.Capacidad}</td>
                        <td id="Pri">
                    <button className="btn btn-dark" onClick={()=>{this.seleccionarAula(aula); this.modalInsertar()}}><FontAwesomeIcon icon={faEdit}/></button>
                    {"   "}
                    <button className="btn btn-danger" onClick={()=>{this.seleccionarAula(aula); this.modalEliminar()}}><FontAwesomeIcon icon={faTrashAlt}/></button>
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
                          <option>PLANTA BAJA</option>
                          <option>PRIMER PISO</option>
                          <option>SEGUNDO PISO</option>
                          <option>TERCER PISO</option>
                          <option>CUARTO PISO</option>
                          
                        </select>
                        <br />
                        <label htmlFor="TipoSala">Sala</label>
                        <select name="TipoSala" className="form-select" id="TipoSala" onChange={this.handleChange}>
                          <option>Selecionar tipo de sala...</option>
                          <option>SALA NORMAL</option>
                          <option>LABORATORIO</option>
                          <option>SALA DE COMPUTACION</option>
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
      </div>
      
    
    
    
      );
    }
    }
export default IAulas;
