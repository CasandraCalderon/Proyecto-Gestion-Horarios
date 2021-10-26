import React, { Component } from 'react';
import './IAdministrador.css';
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import md5 from 'md5';

const url="http://localhost:3001/usuarios";

class IAdminstrador extends Component {
state={
  data:[],
  modalInsertar: false,
  modalEliminar: false,
  form:{
    id: "",
    Nombress: "",
    Apellidos: "",
    CI: "",
    CorreoElectronico: "",
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
    delete this.state.form.id;
   await axios.post(url,
    {
      id: this.state.form.id,
      Nombres: this.state.form.Nombres,
      Apellidos: this.state.form.Apellidos,
      CI: this.state.form.CI,
      CorreoElectronico: this.state.form.CorreoElectronico,
      RU: this.state.form.RU,
      Cargo: this.state.form.Cargo,
      Usuario: this.state.form.Usuario,
      Contraseña: md5(this.state.form.Contraseña)
    }
    ).then(response=>{
      this.modalInsertar();
      this.peticionGet();
    }).catch(error=>{
      console.log(error.message);
    })
  }

peticionPut=()=>{
    axios.put(`${url}/${this.state.form.id}`, 
    {
        id: this.state.form.id,
        Nombres: this.state.form.Nombres,
        Apellidos: this.state.form.Apellidos,
        CI: this.state.form.CI,
        CorreoElectronico: this.state.form.CorreoElectronico,
        RU: this.state.form.RU,
        Cargo: this.state.form.Cargo,
        Usuario: this.state.form.Usuario,
        Contraseña: md5(this.state.form.Contraseña)
    }
    ).then(response=>{
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

seleccionarUsuario=(usuario)=>{
  this.setState({
    tipoModal: 'actualizar',
    form: {
      id: usuario.id,
      Nombres: usuario.Nombres,
      Apellidos: usuario.Apellidos,
      CI: usuario.CI,
      CorreoElectronico: usuario.CorreoElectronico,
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
        <tr className="P">
          <th className="S">ID</th>
          <th className="S">Nombres</th>
          <th className="S">Correo Electronico</th>
          <th className="S">RU</th>
          <th className="S">Acciones</th>
        </tr>
      </thead>
      <tbody>
        {this.state.data.map(usuario=>{
            
          if( usuario.Cargo==="ADMINISTRADOR"){
            return(
                <tr key={usuario.id} className="P">
                    <td className="S">{usuario.id}</td>
                    <td className="S">{usuario.Nombres} {usuario.Apellidos}</td>
                    <td className="S">{usuario.CorreoElectronico}</td>
                    <td className="S">{usuario.RU}</td>
                    <td className="S">
                <button className="btn btn-dark" onClick={()=>{this.seleccionarUsuario(usuario); this.modalInsertar()}}><FontAwesomeIcon icon={faEdit}/></button>
                {"   "}
                <button className="btn btn-danger" onClick={()=>{this.seleccionarUsuario(usuario); this.setState({modalEliminar: true})}}><FontAwesomeIcon icon={faTrashAlt}/></button>
                </td>
          </tr>
          )
        }})}
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
                    <label htmlFor="Nombres">Nombres</label>
                    <input className="form-control" type="text" name="Nombres" id="Nombres" onChange={this.handleChange} value={form?form.Nombres: ''}/>
                    <br />
                    <label htmlFor="Nombres">Apellidos</label>
                    <input className="form-control" type="text" name="Apellidos" id="Apellidos" onChange={this.handleChange} value={form?form.Apellidos: ''}/>
                    <br />
                    <label htmlFor="RU">CI</label>
                    <input className="form-control" type="text" name="CI" id="CI" onChange={this.handleChange} value={form?form.CI:''}/>
                    <br />
                    <label htmlFor="Nombres">Correo Electronico</label>
                    <input className="form-control" type="text" name="CorreoElectronico" id="CorreoElectronico" onChange={this.handleChange} value={form?form.CorreoElectronico: ''}/>
                    <br />
                    <label htmlFor="RU">RU</label>
                    <input className="form-control" type="text" name="RU" id="RU" onChange={this.handleChange} value={form?form.RU:''}/>
                    <br />
                    <label htmlFor="Nombres">Cargo</label>
                    <input className="form-control" type="text" name="Cargo" id="Cargo"  onChange={this.handleChange} value={form?form.Cargo: ''}/>
                    <br />
                    <label htmlFor="Nombres">Usuario</label>
                    <input className="form-control" type="text" name="Usuario" id="Usuario" onChange={this.handleChange} value={form?form.Usuario: ''}/>
                    <br />
                    <label htmlFor="Nombres">Contraseña</label>
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
               Estás seguro que deseas eliminar a la usuario {form && form.Nombres}
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