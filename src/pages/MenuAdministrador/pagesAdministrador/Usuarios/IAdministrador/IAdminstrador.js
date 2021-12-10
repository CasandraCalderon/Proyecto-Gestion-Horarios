import React, { Component, Fragment } from 'react';
import './IAdministrador.css';
import Swal from 'sweetalert2'
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { AiFillPrinter } from "react-icons/ai";
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import PresentCard from '../../../../PresentCard/PresentCard';
import jsPDF from 'jspdf'
import 'jspdf-autotable'


const url="http://localhost:8000/api/administrador";
const urlAvatar = "http://localhost:8000/api/avatar";
const columns = [
  {title: "Nombre", field: "Nombre"},
  {title: "Ap_Paterno", field: "Ap_Paterno"},
  {title: "Ap_Materno", field: "Ap_Materno"},
  {title: "CI", field: "CI"},
  {title: "Email", field: "Email"},
  {title: "RU", field: "RU"},
  {title: "Telefono", field: "Telefono"},
  {title: "Usuario", field: "username"},
]

class IAdminstrador extends Component {
state={
  data:[],
  avatar:[],
  modalInsertar: false,
  busquedaRU: '', 
  busqueda: '',
  form:{
    _id: "",
    Nombre: "",
    Ap_Paterno: "",
    Ap_Materno: "",
    CI: "",
    Email: "",
    RU: "",
    Telefono: "",
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
axios.get(urlAvatar).then(response=>{
  this.setState({avatar: response.data});
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
      Telefono: this.state.form.Telefono,
      RU: this.state.form.RU,
      Cargo: 'ADMINISTRADOR',
      username: `${this.state.form.Nombre}_${this.state.form.Ap_Paterno}`,
      password: `${this.state.form.Ap_Paterno}${this.state.form.CI}`,
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
        Telefono: this.state.form.Telefono,
        Cargo: this.state.form.Cargo,
        username: `${this.state.form.Nombre}_${this.state.form.Ap_Paterno}`,
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
    this.state.avatar.forEach(e => {
      if(e.RU === this.state.form.RU){
        axios.delete(`${urlAvatar}/delete/${e._id}`).then(response =>{
          this.peticionGet();
        })
      }
    })
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
      Telefono: usuario.Telefono,
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
    text: `¿Esta seguro de eliminar a este Usuario?`,
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
onChange=async e=>{
  e.persist();
  await this.setState({...this.state.busquedaRU, [e.target.name]: e.target.value});
  console.log(this.state.busquedaRU);
}

seleccionarBusqueda= () =>{
  this.setState({busqueda:this.state.busquedaRU})
}
DownloadPdf=()=>{
  const doc= new jsPDF()
  doc.text("LISTA DE ADMINISTRADORES",20,10)
  doc.autoTable({
      theme: "grid",
      columns:columns.map(col => ({ ...col, dataKey: col.field })),
      body: this.state.data
  })
  doc.save("administradores.pdf")
}

  render(){
    const {form}=this.state;
  return (
    <Fragment>
    <div id="fondo">
      <PresentCard />
    <div className="text-left container">
        <br />
      <button className="btn btn-dark" onClick={()=>{this.setState({form: null, tipoModal: 'insertar'}); this.modalInsertar()}}>Agregar Administrador</button>
      <div className="barraBusqueda">
        <input className="textField" placeholder="Buscar por RU" type="text" name="busquedaRU" id="busquedaRU" onChange={this.onChange} value={this.state.busquedaRU}/>
        <button type="button" className="btn btn-dark" onClick={this.seleccionarBusqueda}>
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
          <th id="S">RU</th>
          <th id="S">Nombres</th>
          <th id="S">Apellido Paterno</th>
          <th id="S">Apellido Materno</th>
          <th id="S">Correo Electronico</th>
          <th id="S">Telefono</th>
          <th id="S">Acciones</th>
        </tr>
      </thead>
      <tbody>
        {this.state.data.filter(elemento => this.state.busqueda!==''? this.state.busqueda.includes(elemento.RU) : elemento.Cargo === "ADMINISTRADOR").map(usuario=>{
            
            return(
                <tr key={usuario._id}>
                    <td id="S">{usuario.RU}</td>
                    <td id="S">{usuario.Nombre}</td>
                    <td id="S">{usuario.Ap_Paterno}</td>
                    <td id="S">{usuario.Ap_Materno}</td>
                    <td id="S">{usuario.Email}</td>
                    <td id="S">{usuario.Telefono}</td>
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
                  <form className="form-group">
                    <div>
                    <label htmlFor="RU">RU</label>
                    <input className="form-control" type="text" name="RU" id="RU" placeholder = "0000" onChange={this.handleChange} value={form?form.RU:''}/>
                    {true===true? <div id="emailHelp" className="form-text text-danger">We'll never share your email with anyone else.</div> : console.log("hola")}
                    </div>
                    <br/>
                    <div>
                    <label htmlFor="Nombre">Nombres</label>
                    <input className="form-control" type="text" name="Nombre" id="Nombre" onChange={this.handleChange} value={form?form.Nombre: ''}/>
                    </div>
                    <div>
                    <label htmlFor="Ap_Paterno">Apellido Paterno</label>
                    <input className="form-control" type="text" name="Ap_Paterno" id="Ap_Paterno" onChange={this.handleChange} value={form?form.Ap_Paterno: ''}/>
                    </div>
                    <div>
                    <label htmlFor="Ap_Materno">Apellido Materno</label>
                    <input className="form-control" type="text" name="Ap_Materno" id="Ap_Materno" onChange={this.handleChange} value={form?form.Ap_Materno: ''}/>
                    </div>
                    <div>
                    <label htmlFor="RU">CI</label>
                    <input className="form-control" type="text" name="CI" id="CI" onChange={this.handleChange} value={form?form.CI:''}/>
                    </div>
                    <div>
                    <label htmlFor="Email">Correo Electronico</label>
                    <input className="form-control" type="text" name="Email" id="Email" placeholder = "example@example.com" onChange={this.handleChange} value={form?form.Email: ''}/>
                    </div>
                    <div>
                    <label htmlFor="Telefono">Telefono</label>
                    <input className="form-control" type="text" name="Telefono" id="Telefono" onChange={this.handleChange} value={form?form.Telefono:''}/>
                    </div>
                    
                    
                  </form>
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
        
  </Fragment>
  



  );
}
}
export default IAdminstrador;