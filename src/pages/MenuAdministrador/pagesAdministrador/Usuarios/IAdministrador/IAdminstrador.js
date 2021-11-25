import React, { Component } from 'react';
import './IAdministrador.css';
import Swal from 'sweetalert2'
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import PresentCard from '../../../../PresentCard/PresentCard';

//import md5 from 'md5';

const url="http://localhost:8000/api/admin";

class IAdminstrador extends Component {
state={
  data:[],
  modalInsertar: false,
  form:{
    _id: "",
    Nombre: "",
    Ap_Paterno: "",
    Ap_Materno: "",
    CI: "",
    Email: "",
    RU: "",
    Cargo: "",
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
      username: this.state.form.username,
      password: this.state.form.password,
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
        username: this.state.form.username,
        password: this.state.form.password,
    }
    ).then(response=>{
        this.modalInsertar();
      this.peticionGet();
      Swal.fire({
        title: 'Administrador actualizado correctamente',
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
  
modalEliminar = () => {
  Swal.fire({
    title: `¡Espera!`,
    text: `¿Esta seguro de eliminar a ${this.state.form.Nombre} ${this.state.form.Ap_Paterno} ${this.state.form.Ap_Materno}?`,
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

  render(){
    const {form}=this.state;
  return (
    <div>
      <PresentCard />
    <div className="text-left container">
        <br />
      <button className="btn btn-dark" onClick={()=>{this.setState({form: null, tipoModal: 'insertar'}); this.modalInsertar()}}>Agregar Administrador</button>
      </div>
      <br />
    <table className="table table-fixed text-center container">
      <thead className="row">
        <tr>
          <th id="S">Nombres</th>
          <th id="S">Apellido Paterno</th>
          <th id="S">Apellido Materno</th>
          <th id="S">Correo Electronico</th>
          <th id="S">RU</th>
          <th id="S">Acciones</th>
        </tr>
      </thead>
      <tbody>
        {this.state.data.map(usuario=>{
            
            return(
                <tr key={usuario._id}>
                    <td id="S">{usuario.Nombre}</td>
                    <td id="S">{usuario.Ap_Paterno}</td>
                    <td id="S">{usuario.Ap_Materno}</td>
                    <td id="S">{usuario.Email}</td>
                    <td id="S">{usuario.RU}</td>
                    <td id="S">
                <button className="btn btn-dark" onClick={()=>{this.seleccionarUsuario(usuario); this.modalInsertar()}}><FontAwesomeIcon icon={faEdit}/></button>
                {"   "}
                <button className="btn btn-danger" onClick={()=>{this.seleccionarUsuario(usuario); this.modalEliminar()}}><FontAwesomeIcon icon={faTrashAlt}/></button>
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
                    <label htmlFor="username">Usuario</label>
                    <input className="form-control" type="text" name="username" id="username" onChange={this.handleChange} value={form?form.username: ''}/>
                    <br />
                    {form?.password?
                    <div>
                    <label htmlFor="password">Contraseña</label>
                    <input className="form-control" type="password" name="password" id="password" onChange={this.handleChange} readOnly value={form?form.password: ''}/>
                    </div>:
                    <div>
                    <label htmlFor="password">Contraseña</label>
                    <input className="form-control" type="password" name="password" id="password" onChange={this.handleChange} value={form?form.password: ''}/>
                    </div>
                    }
                    
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
export default IAdminstrador;