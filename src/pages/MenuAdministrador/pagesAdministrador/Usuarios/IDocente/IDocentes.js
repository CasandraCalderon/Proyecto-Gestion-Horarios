import React, { Component } from 'react';
import './IDocentes.css';
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { FaCalendarCheck } from "react-icons/fa";
import { AiFillPrinter } from "react-icons/ai";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import PresentCard from '../../../../PresentCard/PresentCard';
import Swal from 'sweetalert2'
import jsPDF from 'jspdf'
import 'jspdf-autotable'
import VerDisponibilidad from '../../Horarios/VerDisponibilidad';
import FormUsuario from '../Forms/FormUsuario';

const url="http://localhost:8000/api/docente";
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

class IDocentes extends Component {
  state={
    data:[],
    error:"",
    modalInsertar: false,
    modalVer: false,
    modalDisponibilidad: false,
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
      Telefono : "",
      Cargo: "",
      username: "",
      password: "",
      Disponibilidad: "",
      DisOcupada:"",
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
      delete this.state.form?._id;
     await axios.post(`${url}/create`,
      {
        _id: this.state.form?._id,
        Nombre: this.state.form?.Nombre,
        Ap_Paterno: this.state.form?.Ap_Paterno,
        Ap_Materno: this.state.form?.Ap_Materno,
        CI: this.state.form?.CI,
        Email: this.state.form?.Email,
        RU: this.state.form?.RU,
        Telefono: this.state.form?.Telefono,
        Cargo: "DOCENTE",
        username: this.state.form?.RU,
        password: `${this.state.form?.Ap_Paterno}${this.state.form?.CI}`,
        Disponibilidad: this.state.form?.Disponibilidad,
        DisOcupada: this.state.form?.DisOcupada
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
          Ap_Paterno: this.state.form.Ap_Paterno,
          Ap_Materno: this.state.form.Ap_Materno,
          CI: this.state.form.CI,
          Email: this.state.form.Email,
          RU: this.state.form.RU,
          Telefono: this.state.form.Telefono,
          Cargo: this.state.form.Cargo,
          username: this.state.form.username,
          password: this.state.form.password,
          Disponibilidad: this.state.form.Disponibilidad,
          DisOcupada: this.state.form.DisOcupada
      }
      ).then(response=>{
        this.modalInsertar();
        this.peticionGet();
        Swal.fire({
          title: 'Docente actualizado correctamente',
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
        this.peticionGet();
      })
    }

    peticionDisponibilidad=()=>{
      axios.put(`${url}/edit/${this.state.form._id}`, 
      {
          _id: this.state.form._id,
          Nombre: this.state.form.Nombre,
          Ap_Paterno: this.state.form.Ap_Paterno,
          Ap_Materno: this.state.form.Ap_Materno,
          CI: this.state.form.CI,
          Email: this.state.form.Email,
          RU: this.state.form.RU,
          Telefono: this.state.form.Telefono,
          Cargo: this.state.form.Cargo,
          username: this.state.form.username,
          password: this.state.form.password,
          Disponibilidad: this.state.form.Disponibilidad,
          DisOcupada: this.state.form.DisOcupada
      }
      ).then(response=>{
        this.setState({modalDisponibilidad: false});
        this.peticionGet();
      })
    }

    peticionReset=()=> {
      this.setState({
        ...this.state,
        form:{
          ...this.state.form, Disponibilidad: [], DisOcupada: []
        }
      })
      this.modalVer();
      this.modalDisponibilidad();
    };
  
  modalDisponibilidad=()=>{
    this.setState({modalDisponibilidad: !this.state.modalDisponibilidad});
  }

  modalInsertar=()=>{
    this.setState({modalInsertar: !this.state.modalInsertar});
  }

  modalVer=()=>{
    this.setState({modalVer: !this.state.modalVer});
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
        Telefono: usuario.Telefono,
        Cargo:usuario.Cargo,
        username: usuario.username,
        password: usuario.password,
        Disponibilidad: usuario.Disponibilidad,
        DisOcupada: usuario.DisOcupada
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
    alertCreate= () =>{
      Swal.fire({
        icon: 'success',
        title: `Usuario creado correctamente`,
        showConfirmButton: false,
        timer: 1500
      })
    }

    DownloadPdf=()=>{
      const doc= new jsPDF()
      doc.text("Lista de Docentes",20,10)
      doc.autoTable({
          theme: "grid",
          columns:columns.map(col => ({ ...col, dataKey: col.field })),
          body: this.state.data
      })
      doc.save("docentes.pdf")
    }
    render(){
      const {form}=this.state;
    return (
      <div id="fondo">
        <PresentCard/>
      <div className="text-left container">
          <br />
        <button className="btn btn-dark" onClick={()=>{this.setState({form: null, tipoModal: 'insertar'}); this.modalInsertar()}}>Agregar Docente</button>
        <div className="barraBusqueda">
        <input autocomplete="off" className="textField" placeholder="Buscar por RU" type="text" name="busquedaRU" id="busquedaRU" onChange={this.onChange} value={this.state.busquedaRU}/>
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
            <th className="Sec">RU</th>
            <th className="Sec">Nombres</th>
            <th className="Sec">Apellido Paterno</th>
            <th className="Sec">Apellido Materno</th>
            <th className="Sec">Correo Electronico</th>
            <th className="Sec">Telefono</th>
            <th className="Sec">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {this.state.data.filter(elemento => this.state.busqueda!==''? this.state.busqueda.includes(elemento.RU) : elemento.Cargo === "DOCENTE").map(usuario=>{    
              return(
                  <tr key={usuario._id}>
                      <td className="Sec">{usuario.RU}</td>
                      <td className="Sec">{usuario.Nombre}</td>
                      <td className="Sec">{usuario.Ap_Paterno}</td>
                      <td className="Sec">{usuario.Ap_Materno}</td>
                      <td className="Sec">{usuario.Email}</td>
                      <td className="Sec">{usuario.Telefono}</td>
                      <td className="Sec">
                  <button className="btn btn-success" onClick={()=>{this.seleccionarUsuario(usuario); this.modalVer()}}><FaCalendarCheck/></button>
                  {"   "}
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
                  <FormUsuario handleChange={this.handleChange} form={form} error={this.state.error}/>
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
  
  
            

          <Modal isOpen={this.state.modalVer} centered fullscreen="" size="xl">
            <ModalHeader>
                Disponibilidad de {form && form.username}
              </ModalHeader>
              <ModalBody>
              <VerDisponibilidad RU={form?.RU}/>
              </ModalBody>
              
              <ModalFooter>
                <button className="btn btn-dark" onClick={()=>this.setState({modalVer: false})}>Cerrar</button>
                <button className="btn btn-danger" onClick={()=>this.peticionReset()}>Resetear disponibilidad</button>
              </ModalFooter>
          </Modal>

          <Modal isOpen={this.state.modalDisponibilidad}>
                <ModalBody>
                   ¿Desea resetear la disponibilidad de {form && form.username}?
                </ModalBody>
                <ModalFooter>
                  <button className="btn btn-danger" onClick={()=>this.peticionDisponibilidad()}>Sí</button>
                  <button className="btn btn-secundary" onClick={()=>this.setState({modalDisponibilidad: false})}>No</button>
                </ModalFooter>
              </Modal>
    </div>
    
  
  
  
    );
  }
  }
export default IDocentes;