import React, { Component } from 'react';
import './IEstudiantes.css';
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTextHeight, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import md5 from 'md5';

const url="http://localhost:3001/usuarios";

class IEstudiantes extends Component {
state={
  data:[],
  modalInsertar: false,
  modalEliminar: false,
  form:{
    id: '',
    Nombres: '',
    Apellidos: '',
    CI: '',
    CorreoElectronico:'',
    RU:'',
    Cargo:'',
    Usuario:'',
    Contraseña:'',
    tipoModal: ''
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
 await axios.post(url, {
   id:this.state.form.id,
   Nombres:this.state.form.Nombres,
   Apellidos:this.state.form.Apellidos,
   CI:this.state.form.CI,
   CorreoElectronico:this.state.form.CorreoElectronico,
   RU:this.state.form.RU,
   Cargo:this.state.form.Cargo,
   Usuario:this.state.form.Usuario,
   Contraseña:md5(this.state.form.Contraseña),

 }).then(response=>{
    this.modalInsertar();
    this.peticionGet();
  }).catch(error=>{
    console.log(error.message);
  })
}

peticionPut=()=>{
  axios.put(`${url}/${this.state.form.id}`, {
    id:this.state.form.id,
    Nombres:this.state.form.Nombres,
    Apellidos:this.state.form.Apellidos,
    CI:this.state.form.CI,
    CorreoElectronico:this.state.form.CorreoElectronico,
    RU:this.state.form.RU,
    Cargo:this.state.form.Cargo,
    Usuario:this.state.form.Usuario,
    Contraseña:md5(this.state.form.Contraseña),
 
  }).then(response=>{
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

seleccionarEstudiante=(Estudiante)=>{
  this.setState({
    tipoModal: 'actualizar',
    form: {
      id: Estudiante.id,
      Nombres: Estudiante.Nombres,
      Apellidos: Estudiante.Apellidos,
      CI: Estudiante.CI,
      CorreoElectronico: Estudiante.CorreoElectronico,
      RU: Estudiante.RU,
      Cargo: Estudiante.Cargo,
      Usuario: Estudiante.Usuario,
      Contraseña:Estudiante.Contraseña
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
        <tr className="Primera">
          <th className="Segunda">ID</th>
          <th className="Segunda">Nombres</th>
          <th className="Segunda">Apellidos</th>
          <th className="Segunda">CI</th>
          <th className="Segunda">CorreoElectronico</th>
          <th className="Segunda">RU</th>
          <th className="Segunda">Usuario</th>
          <th className="Segunda">Acciones</th>
        </tr>
      </thead>
      <tbody>
        {this.state.data.filter(Estudiante => Estudiante.Cargo ==="ESTUDIANTE").map(Estudiante=> {
          return(
            <tr key={Estudiante.id} className="Primera">
          <td className="Segunda">{Estudiante.id}</td>
          <td className="Segunda">{Estudiante.Nombres}</td>
          <td className="Segunda">{Estudiante.Apellidos}</td>
          <td className="Segunda">{Estudiante.CI}</td>
          <td className="Segunda">{Estudiante.CorreoElectronico}</td>
          <td className="Segunda">{Estudiante.RU}</td>
          <td className="Segunda">{Estudiante.Usuario}</td>
          
          <td className="Segunda">
                <button className="btn btn-dark" onClick={()=>{this.seleccionarEstudiante(Estudiante); this.modalInsertar()}}><FontAwesomeIcon icon={faEdit}/></button>
                {"   "}
                <button className="btn btn-danger" onClick={()=>{this.seleccionarEstudiante(Estudiante); this.setState({modalEliminar: true})}}><FontAwesomeIcon icon={faTrashAlt}/></button>
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
                    <label htmlFor="Nombres">Nombres</label>
                    <input className="form-control" type="text" name="Nombres" id="Nombres" onChange={this.handleChange} value={form?form.Nombres: ''}/>
                    <br />
                    <label htmlFor="Apellidos">Apellidos</label>
                    <input className="form-control" type="text" name="Apellidos" id="Apellidos" onChange={this.handleChange} value={form?form.Apellidos: ''}/>
                    <br />
                    <label htmlFor="CI">CI</label>
                    <input className="form-control" type="text" name="CI" id="CI"  onChange={this.handleChange} value={form?form.CI:''}/>
                    <br/>
                    <label htmlFor="CorreoElectronico">CorreoElectronico</label>
                    <input className="form-control" type="text" name="CorreoElectronico" id="CorreoElectronico" onChange={this.handleChange} value={form?form.CorreoElectronico:''}/>
                    <br />
                    <label htmlFor="RU">RU</label>
                    <input className="form-control" type="text" name="RU" id="RU"  onChange={this.handleChange} value={form?form.RU: ''}/>
                    <br/>
                    <label htmlFor="Cargo">Cargo</label>
                    <input className="form-control" type="text" name="Cargo" id="Cargo" onChange={this.handleChange} value={form?form.Cargo: ''}/>
                    <br />
                    <label htmlFor="Usuario">Usuario</label>
                    <input className="form-control" type="text" name="Usuario" id="Usuario" onChange={this.handleChange} value={form?form.Usuario: ''}/>
                    <br />
                    <label htmlFor="Contraseña">Contraseña</label>
                    <input className="form-control" type="text" name="Contraseña" id="Contraseña" onChange={this.handleChange} value={form?form.Contraseña: ''}/>
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
               Estás seguro que deseas eliminar al estudiante.? {form && form.Nombres}
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