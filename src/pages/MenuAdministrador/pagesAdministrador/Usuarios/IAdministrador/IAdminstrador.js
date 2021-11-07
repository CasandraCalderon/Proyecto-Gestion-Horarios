import React, { Component } from 'react';
import './IAdministrador.css';
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import md5 from 'md5';

const url="http://localhost:8000/api/admin";

class IAdminstrador extends Component {
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
    Contraseña: ""
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
      Usuario: this.state.form.Usuario,
      Contraseña: this.state.form.Contraseña
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
        Usuario: this.state.form.Usuario,
        Contraseña: this.state.form.Contraseña
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
      Usuario: usuario.Usuario,
      Contraseña: usuario.Contraseña,
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
      <button className="btn btn-dark" onClick={()=>{this.setState({form: null, tipoModal: 'insertar'}); this.modalInsertar()}}>Agregar Administrador</button>
      </div>
      <br />
    <table className="table table-fixed text-center container">
      <thead className="row">
        <tr>
          <th className="S">Nombres</th>
          <th className="S">Apellido Paterno</th>
          <th className="S">Apellido Materno</th>
          <th className="S">Correo Electronico</th>
          <th className="S">RU</th>
          <th className="S">Acciones</th>
        </tr>
      </thead>
      <tbody>
        {this.state.data.map(usuario=>{
            
            return(
                <tr key={usuario._id}>
                    <td className="S">{usuario.Nombre}</td>
                    <td className="S">{usuario.Ap_Paterno}</td>
                    <td className="S">{usuario.Ap_Materno}</td>
                    <td className="S">{usuario.Email}</td>
                    <td className="S">{usuario.RU}</td>
                    <td className="S">
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
                    <label htmlFor="Usuario">Usuario</label>
                    <input className="form-control" type="text" name="Usuario" id="Usuario" onChange={this.handleChange} value={form?form.Usuario: ''}/>
                    <br />
                    <label htmlFor="Contraseña">Contraseña</label>
                    <input className="form-control" type="password" name="Contraseña" id="Contraseña" onChange={this.handleChange} value={form?form.Contraseña: ''}/>
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
               ¿Estás seguro que deseas eliminar este Administrador? {form && form.Nombres}
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
export default IAdminstrador;