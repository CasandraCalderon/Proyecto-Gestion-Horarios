import React, { Component } from "react";
import './IMaterias.css';
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Swal from 'sweetalert2'
import { faEdit, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { AiFillPrinter } from "react-icons/ai";
import { Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import PresentCard from "../../../PresentCard/PresentCard";
import jsPDF from 'jspdf'
import 'jspdf-autotable'
import FormMateria from "./FormMateria";


const url = "http://localhost:8000/api/materia";
const urlSemestres= "http://localhost:8000/api/semestres";
const columns = [
  {title: "Sigla", field: "Sigla"},
  {title: "Nombre", field: "Nombre"},
  {title: "Semestre", field: "Semestre"},
  {title: "CantHSemanas", field: "CantHSemanas"},
]

class IMaterias extends Component {
  //Almacenar estado
  state = {
    data: [],
    error: "",
    Docentes: [],
    Semestres: [],
    Aulas: [],
    modalInsertar: false,
    modalEliminar: false,
    selectedOption: null,
    busqueda1: "Filtrar todos los semestres",
    busquedaRU: "",
    busqueda: "",
    tipoModal: "",
    form: {
      _id: "",
      Nombre: "",
      Sigla: "",
      Semestre: "",
      CantHSemanas: "",
    },
  };

  componentDidMount() {
    axios.get(urlSemestres)
    .then((response) => {
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
    }).catch(error=>{
      console.log(error.message);
    })
    }
    
    peticionPost=async()=>{
        delete this.state.form?._id;
       await axios.post(`${url}/create`,
        {
          _id: this.state.form?._id,
          Nombre: this.state.form?.Nombre,
          Sigla: this.state.form?.Sigla,
          Semestre: this.state.form?.Semestre,
          CantHSemanas: this.state.form?.CantHSemanas,
        }
        ).then(response=>{
          if("error" in response.data === true){
            this.setState({error: response.data.error});
          } else {
            this.setState({error: ""});
            this.modalInsertar();
            this.alertCreate();
            this.peticionGet();
          }
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
          CantHSemanas: this.state.form.CantHSemanas,
        }
        ).then(response=>{
          this.modalInsertar();
          this.peticionGet();
          Swal.fire({
            title: 'Materia actualizada correctamente',
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
    
    seleccionarMateria=(materia)=>{
      this.setState({
        tipoModal: 'actualizar',
        form: {
          _id: materia._id,
          Nombre: materia.Nombre,
          Sigla: materia.Sigla,
          Semestre: materia.Semestre,
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
    }
    onChange = async (e) => {
      e.persist();
      await this.setState({
        ...this.state.busquedaRU,
        [e.target.name]: e.target.value,
      });
    };
  
    onChange1 = async (e) => {
      e.persist();
      await this.setState({
        ...this.state.busqueda1,
        [e.target.name]: e.target.value,
      });
    };
  
    seleccionarBusqueda = () => {
      this.setState({ busqueda: this.state.busquedaRU });
    };
    modalEliminar = () => {
      Swal.fire({
        title: `¡Espera!`,
        text: `¿Esta seguro de eliminar la clase de ${this.state.form.Nombre}?`,
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
    alertCreate= () =>{
      Swal.fire({
        icon: 'success',
        title: `Materia creada correctamente`,
        showConfirmButton: false,
        timer: 1500
      })
    }
    DownloadPdf=()=>{
      const doc= new jsPDF()
      doc.text("MATERIAS REGISTRADAS",20,10)
      doc.autoTable({
          theme: "striped",
          columns:columns.map(col => ({ ...col, dataKey: col.field })),
          body: this.state.data
      })
      doc.save("materias.pdf")
    }
      render(){
        const {form}=this.state;
      return (
        <div id="fondo">
          <PresentCard />
        <div className="text-left container">
            <br />
          <button className="btn btn-dark" onClick={()=>{this.setState({form: null, tipoModal: 'insertar'}); this.modalInsertar()}}>Agregar Materia</button>
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
              <option>Filtrar todos los semestres</option>
              <option value="PRIMERO">PRIMER SEMESTRE</option>
                          <option value="SEGUNDO">SEGUNDO SEMESTRE</option>
                          <option value="TERCERO">TERCER SEMESTRE</option>
                          <option value="CUARTO">CUARTO SEMESTRE</option>
                          <option value="QUINTO">QUINTO SEMESTRE</option>
                          <option value="SEXTO">SEXTO SEMESTRE</option>
                          <option value="SEPTIMO">SEPTIMO SEMESTRE</option>
                          <option value="OCTAVO">OCTAVO SEMESTRE</option>
              
            </select>{"   "}

            <input
              className="textField"
              placeholder="Buscar por Sigla"
              type="text"
              name="busquedaRU"
              id="busquedaRU"
              onChange={this.onChange}
              value={this.state.busquedaRU}
              autocomplete="off"
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
            <button className="btn btn-dark" onClick={()=>this.DownloadPdf()}>Imprimir <AiFillPrinter size={20}/></button>
          </div>
          </div>
          <br />
        <table className="table table-fixed text-center container">
          <thead className="row">
            <tr>
              <th id="Primero">Sigla</th>
              <th id="Primero">Nombre</th>
              <th id="Primero">Semestre</th>
              <th id="Primero">CantHSemanas</th>
              <th id="Primero">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {this.state.data
              .filter((elemento) =>
                this.state.busqueda !== ""?
                   this.state.busqueda.includes(elemento.Sigla): this.state.busqueda1 === "Filtrar todos los semestres"?
                   typeof (elemento.Nombre) === "string": 
                   elemento.Semestre === this.state.busqueda1
              ).map(materia=>{
                
                return(
                    <tr key={materia._id}>
                        <td id="Primero">{materia.Sigla}</td>
                        <td id="Primero">{materia.Nombre}</td>
                        <td id="Primero">{materia.Semestre}</td>
                        <td id="Primero">{materia.CantHSemanas}</td>
                        <td id="Primero">
                    <button className="btn btn-dark" onClick={()=>{this.seleccionarMateria(materia); this.modalInsertar()}}><FontAwesomeIcon icon={faEdit}/></button>
                    {"   "}
                    <button className="btn btn-danger" onClick={()=>{this.seleccionarMateria(materia); this.modalEliminar()}}><FontAwesomeIcon icon={faTrashAlt}/></button>
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
                      <FormMateria handleChange={this.handleChange} form={form} error={this.state.error} Semestres={this.state.Semestres}/>
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