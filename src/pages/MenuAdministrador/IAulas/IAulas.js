import React, { Component } from "react";
import './IAulas.css';
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import Select from "react-select";

const url = "http://localhost:3002/aulas";
const options = [
  { value: "PLANTA BAJA", label: "PLANTA BAJA" },
  { value: "PRIMER PISO", label: "PRIMER PISO" },
  { value: "SEGUNDO PISO", label: "SEGUNDO PISO" },
  { value: "TERCER PISO", label: "TERCER PISO" },
  { value: "CUARTO PISO", label: "CUARTO PISO" }
];
const op_salas = [
  { value: "SALA COMUN", label: "SALA COMUN" },
  { value: "LABORATORIO", label: "LABORATORIO" },
  { value: "SALA DE COMPUTACION", label: "SALA DE COMPUTACION" }
];
class IAulas extends Component {
  //Almacenar estado
  state={
    data:[],
    modalInsertar: false,
    modalEliminar: false,
    selectedOption: null,
    form:{
      id: '',
      Nombre: '',
      Piso: '',
      Capacidad: '',
      TipoSala: '',
      tipoModal: ''
    }
  }

  peticionGet=()=>{
  axios.get(url).then(response=>{
    this.setState({...this.state, data: response.data});
  }).catch(error=>{
    console.log(error.message);
  })
  }
  
  peticionPost=async()=>{
    delete this.state.form.id;
   await axios.post(url,this.state.form).then(response=>{
      this.modalInsertar();
      this.peticionGet();
    }).catch(error=>{
      console.log(error.message);
    })
  }
  
  peticionPut=()=>{
    axios.put(`${url}/${this.state.form.id}`, this.state.form).then(response=>{
      this.modalInsertar();
      this.peticionGet();
    })

  }
  
  peticionDelete=()=>{
    axios.delete(`${url}/${this.state.form.id}`).then(response=>{
      this.setState({...this.state, modalEliminar: false});
      this.peticionGet();
    })
  }
  
  modalInsertar=()=>{
    this.setState({modalInsertar: !this.state.modalInsertar});
  }
  
  seleccionarAula=(aulas)=>{
    this.setState({
      ...this.state, 
      tipoModal: 'actualizar',
      form: {
        id: aulas.id,
        Nombre: aulas.Nombre,
        Piso: aulas.Piso,
        Capacidad: aulas.Capacidad,
        TipoSala: aulas.TipoSala
      }
    })
  }
  
  handleChange=async e=>{
  e.persist();
  await this.setState({
    ...this.state, 
    form:{
      ...this.state.form,
      [e.target.name]: e.target.value
    }
  });
  console.log(this.state.form);
  }
  
  handleChango = selectedOption => {
    //this.setState({ ...this.state, selectedOption });
    this.setState({
      ...this.state, 
      form:{
        ...this.state.form, Piso: selectedOption.value
      }
    })
    console.log(this.state.form);
  };

  optionsSalas = selectedOpSalas => {
    //this.setState({ ...this.state, selectedOpSalas });
    this.setState({
      ...this.state, 
      form:{
        ...this.state.form, TipoSala: selectedOpSalas.value
      }
    })
    console.log(this.state.form);
  };


    componentDidMount() {
      this.peticionGet();
    }
  
  
    render(){
      const {form}=this.state;
      const { selectedOption } = this.state;
      const { selectedOpSalas } = this.state;
    return (
      <div>
      <br />
      <div className="text-left container">
      <button className="btn btn-dark" onClick={()=>{this.setState({form: null, tipoModal: 'insertar'}); this.modalInsertar()}}>Agregar Materia</button>
    </div>


    <br />
      <table className="table table-fixed text-center container">
        <thead className="row">
          <tr className="Pri">
            <th className="Seg">ID</th>
            <th className="Seg">Nombre</th>
            <th className="Seg">Piso</th>
            <th className="Seg">Capacidad de Alumnos</th>
            <th className="Seg">Tipo de Sala</th>
            <th className="Seg">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {this.state.data.map(aulas=> {
            return(
              <tr key={aulas.id} className="Pri">
            <td className="Seg">{aulas.id}</td>
            <td className="Seg">{aulas.Nombre}</td>
            <td className="Seg">{aulas.Piso}</td>
            <td className="Seg">{aulas.Capacidad}</td>
            <td className="Seg">{aulas.TipoSala}</td>
            <td>
                  <button className="btn btn-dark" onClick={()=>{this.seleccionarAula(aulas); this.modalInsertar()}}><FontAwesomeIcon icon={faEdit}/></button>
                  {"   "}
                  <button className="btn btn-danger" onClick={()=>{this.seleccionarAula(aulas); this.setState({modalEliminar: true})}}><FontAwesomeIcon icon={faTrashAlt}/></button>
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
                      <label htmlFor="id">ID</label>
                      <input className="form-control" type="text" name="id" id="id" readOnly onChange={this.handleChange} value={form?form.id: this.state.data.length+1}/>
                      <br />
                      <label htmlFor="Nombre">Nombre</label>
                      <input className="form-control" type="text" name="Nombre" id="Nombre" onChange={this.handleChange} value={form?form.Nombre: ''}/>
                      <br />
                    
                      <label htmlFor="Piso">Piso</label>
                      <Select value={form? form.Piso: selectedOption} onChange={this.handleChango} options={options} />
                      
                      <br />
                      <label htmlFor="Capacidad">Capacidad de alumnos</label>
                        <input className="form-control" type="number" name="Capacidad" id="Capacidad" onChange={this.handleChange} value={form? form.Capacidad: ''}/>
                        <br />
                        <label htmlFor="TipoSala">Sala</label>
                        <Select value={form? form.TipoSala: selectedOpSalas} onChange={this.optionsSalas} options={op_salas} />
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
                 Estás seguro que deseas eliminar esta Aula? {form && form.Nombre}
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
