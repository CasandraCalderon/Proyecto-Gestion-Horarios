import React, { Component } from "react";
import './IMaterias.css';
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import Select from "react-select";

const url = "http://localhost:3003/Materias";
const opSemestre = [
  { value: "PRIMERO", label: "PRIMERO" },
  { value: "SEGUNDO", label: "SEGUNDO" },
  { value: "TERCERO", label: "TERCERO" },
  { value: "CUARTO", label: "CUARTO" },
  { value: "QUINTO", label: "QUINTO" }
];
const opAula = [
  { value: "SALA NORMAL", label: "SALA NORMAL" },
  { value: "LABORATORIO", label: "LABORATORIO" },
  { value: "SALA DE COMPUTACION", label: "SALA DE COMPUTACION" }
];
class IMaterias extends Component {
  //Almacenar estado
  state={
    data:[],
    modalInsertar: false,
    modalEliminar: false,
    form:{
      id: '',
      Nombre: '',
      Sigla: '',
      Semestre: null,
      TipoAula: null,
      CantGrupos: '',
      CantHSemanas: ''
    }
  }

  
    
  peticionGet=()=>{
  axios.get(url).then(response=>{
    this.setState({data: response.data});
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
        id: materia.id,
        Nombre: materia.Nombre,
        Sigla: materia.Sigla,
        Semestre: materia.Semestre,
        TipoAula: materia.TipoAula,
        CantGrupos: materia.CantGrupos,
        CantHSemanas: materia.CantHSemanas
      }
    })
  }
  

  handleChange=async e=>{
  e.persist();
  await 
  this.setState({
    form:{
      ...this.state.form,
      [e.target.name]: e.target.value
    }
  });
  console.log(this.state.form);
  }

  OpSemestre = selectSemestre => {
    this.setState({ ...this.state, selectSemestre });
    this.setState({
      ...this.state, 
      form:{
        ...this.state.form, Semestre: selectSemestre.value
      }
    })
    console.log(this.state.form);
  };

  OpAula = selectAula => {
    this.setState({ ...this.state, selectAula });
    this.setState({
      ...this.state, 
      form:{
        ...this.state.form, TipoAula: selectAula.value
      }
    })
    console.log(this.state.form);
  };
  
    componentDidMount() {
      this.peticionGet();
    }
  
  
    render(){
      const {form}=this.state;
      const { selectSemestre } = this.state;
      const { selectAula } = this.state;
    return (
      <div>
      <br />
    <div className="text-left container">
      <button className="btn btn-dark" onClick={()=>{this.setState({form: null, tipoModal: 'insertar'}); this.modalInsertar()}}>Agregar Materia</button>
    </div>
    <br />
      <table className="table table-fixed text-center container">
        <thead className="row">
          <tr className="Primero">
            <th className="Segundo">ID</th>
            <th className="Segundo">Nombre</th>
            <th className="Segundo">Sigla</th>
            <th className="Segundo">Semestre</th>
            <th className="Segundo">Tipo de aula</th>
            <th className="Segundo">Cantidad de Grupos</th>
            <th className="Segundo">Cant. horas Semana</th>
            <th className="Segundo">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {this.state.data.map(materias=> {
            return(
              <tr key={materias.id} className="Primero">
            <td className="Segundo">{materias.id}</td>
            <td className="Segundo">{materias.Nombre}</td>
            <td className="Segundo">{materias.Sigla}</td>
            <td className="Segundo">{materias.Semestre}</td>
            <td className="Segundo">{materias.TipoAula}</td>
            <td className="Segundo">{materias.CantGrupos}</td>
            <td className="Segundo">{materias.CantHSemanas}</td>
            <td>
                  <button className="btn btn-dark" onClick={()=>{this.seleccionarMateria(materias); this.modalInsertar()}}><FontAwesomeIcon icon={faEdit}/></button>
                  {"   "}
                  <button className="btn btn-danger" onClick={()=>{this.seleccionarMateria(materias); this.setState({modalEliminar: true})}}><FontAwesomeIcon icon={faTrashAlt}/></button>
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
                      <label htmlFor="Sigla">Sigla</label>
                      <input className="form-control" type="text" name="Sigla" id="Sigla" onChange={this.handleChange} value={form?form.Sigla: ''}/>
                      <br />
                      <label htmlFor="Semestre">Semestre</label>
                      <Select value={form? form.Semestre: selectSemestre} onChange={this.OpSemestre} options={opSemestre} />
                      <br />
                      <label htmlFor="TipoAula">Tipo de Aula</label>
                      <Select value={form? form.TipoAula: selectAula} onChange={this.OpAula} options={opAula} />
                      <br />
                      <label htmlFor="CantGrupos">Cantidad de grupos</label>
                        <input className="form-control" type="number" name="CantGrupos" id="CantGrupos" onChange={this.handleChange} value={form? form.CantGrupos: ''}/>
                        <br />
                        <label htmlFor="CantHSemanas">Cantidad de horas a la semana</label>
                        <input className="form-control" type="number" name="CantHSemanas" id="CantHSemanas" onChange={this.handleChange} value={form? form.CantHSemanas: ''}/>
                        <br />
                    </div>
                  </ModalBody>
                  <ModalFooter>
                    {this.state.tipoModal==='insertar'?
                      <button className="btn btn-success" onClick={()=>this.peticionPost()}>
                      Insertar
                    </button>: <button className="btn btn-primary" onClick={()=>this.peticionPut()}>
                      Actualizar
                    </button>
    }
                      <button className="btn btn-danger" onClick={()=>this.modalInsertar()}>Cancelar</button>
                  </ModalFooter>
            </Modal>
  
  
            <Modal isOpen={this.state.modalEliminar}>
              <ModalBody>
                 Estás seguro que deseas eliminar esta Materia? {form && form.Nombre}
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
