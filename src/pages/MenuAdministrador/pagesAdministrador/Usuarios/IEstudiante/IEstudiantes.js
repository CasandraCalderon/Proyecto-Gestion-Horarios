import React, { Component } from 'react';
import './IEstudiantes.css';
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
//import md5 from 'md5';

const url="http://localhost:8000/api/estudiante";

class IEstudiantes extends Component {
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
      Semestre: "",
      username: "",
      password: "",
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
      delete this.state.form._id;
     await axios.post(`${url}/create`,
      {
        _id: this.state.form._id,
        Nombre: this.state.form.Nombre,
        Ap_Paterno: this.state.form.Ap_Paterno,
        Ap_Materno: this.state.form.Ap_Materno,
        CI: this.state.form.CI,
        Email: this.state.form.Email,
        RU: this.state.form.RU,
        Cargo: this.state.form.Cargo,
        Semestre: this.state.form.Semestre,
        username: this.state.form.username,
        password: this.state.form.password
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
          Ap_Paterno: this.state.form.Ap_Paterno,
          Ap_Materno: this.state.form.Ap_Materno,
          CI: this.state.form.CI,
          Email: this.state.form.Email,
          RU: this.state.form.RU,
          Cargo: this.state.form.Cargo,
          Semestre: this.state.form.Semestre,
          username: this.state.form.username,
          password: this.state.form.password
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
        Semestre:usuario.Semestre,
        username: usuario.username,
        password: usuario.password,
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
      <div className="text-left container">
          <br />
        <button className="btn btn-dark" onClick={()=>{this.setState({form: null, tipoModal: 'insertar'}); this.modalInsertar()}}>Agregar Estudiante</button>
        </div>
        <br />
      <table className="table table-fixed text-center container">
        <thead className="row">
          <tr>
            <th className="Segunda">Nombres</th>
            <th className="Segunda">Apellido Paterno</th>
            <th className="Segunda">Apellido Materno</th>
            <th className="Segunda">Correo Electronico</th>
            <th className="Segunda">RU</th>
            <th className="Segunda">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {this.state.data.map(usuario=>{
              
              return(
                  <tr key={usuario._id}>
                      <td className="Segunda">{usuario.Nombre}</td>
                      <td className="Segunda">{usuario.Ap_Paterno}</td>
                      <td className="Segunda">{usuario.Ap_Materno}</td>
                      <td className="Segunda">{usuario.Email}</td>
                      <td className="Segunda">{usuario.RU}</td>
                      <td className="Segunda">
                  <button className="btn btn-dark" onClick={()=>{this.seleccionarUsuario(usuario); this.modalInsertar()}}><FontAwesomeIcon icon={faEdit}/></button>
                  {"   "}
                  <button className="btn btn-danger" onClick={()=>{this.seleccionarUsuario(usuario); this.setState({modalEliminar: true})}}><FontAwesomeIcon icon={faTrashAlt}/></button>
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
                      <label htmlFor="Nombre">Nombres</label>
                      <input className="form-control" type="text" name="Nombre" id="Nombre" onChange={this.handleChange} value={form?form.Nombre: ''}/>
                      <br />
                      <label htmlFor="Ap_Paterno">Apellido Paterno</label>
                      <input className="form-control" type="text" name="Ap_Paterno" id="Ap_Paterno" onChange={this.handleChange} value={form?form.Ap_Paterno: ''}/>
                      <br />
                      <label htmlFor="Ap_Materno">Apellido Materno</label>
                      <input className="form-control" type="text" name="Ap_Materno" id="Ap_Materno" onChange={this.handleChange} value={form?form.Ap_Materno: ''}/>
                      <br />
                      <label htmlFor="RU">CI</label>
                      <input className="form-control" type="text" name="CI" id="CI" onChange={this.handleChange} value={form?form.CI:''}/>
                      <br />
                      <label htmlFor="Email">Correo Electronico</label>
                      <input className="form-control" type="text" name="Email" id="Email" onChange={this.handleChange} value={form?form.Email: ''}/>
                      <br />
                      <label htmlFor="RU">RU</label>
                      <input className="form-control" type="text" name="RU" id="RU" onChange={this.handleChange} value={form?form.RU:''}/>
                      <br />
                      <label htmlFor="Cargo">Cargo</label>
                      <input className="form-control" type="text" name="Cargo" id="Cargo" onChange={this.handleChange} value= {form?form.Cargo: ''}/>
                      <br />
                      <label htmlFor="Cargo">Semestre</label>
                      <input className="form-control" type="text" name="Semestre" id="Semestre" onChange={this.handleChange} value= {form?form.Semestre: ''}/>
                      <br />
                      <label htmlFor="username">Usuario</label>
                      <input className="form-control" type="text" name="username" id="username" onChange={this.handleChange} value={form?form.username: ''}/>
                      <br />
                      <label htmlFor="password">Contraseña</label>
                      <input className="form-control" type="password" name="password" id="password" onChange={this.handleChange} value={form?form.password: ''}/>
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
                 ¿Estás seguro que deseas eliminar este Estudiante?? {form && form.Nombres}
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
export default IEstudiantes;