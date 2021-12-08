import React, {Component} from 'react'
import "bootstrap/dist/css/bootstrap.min.css";
import { FaUserEdit, FaTrash } from "react-icons/fa";
import Swal from "sweetalert2";
import axios from "axios";
import "./MiPerfil.css"
import Cookies from "universal-cookie";
import { Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";


const cookies = new Cookies();
const url = "http://localhost:8000/api/avatar"
const usuario = `http://localhost:8000/api/${cookies.get("Cargo")}`

class MiPerfil extends Component {
    state = {
      modalInsertar: false,
      modalEliminar: false,
      tipoModal: "",
      data: [],
      user: [],
      photo: "",
      photos:"",
      form: {
        _id:"",
        RU: "",
        image: null
    }
    }

    componentDidMount() {
      this.peticionGet();
    }

    peticionGet=()=>{
      axios.get(usuario)
      .then((response) => {
        this.setState({user: response.data.filter(e => e.RU === cookies.get("RU"))});
      })
      .catch((error)=>{
        console.log(error);
      })
      axios.get(url).then(response=>{
        this.setState({data: response.data});
      }).catch(error=>{
        console.log(error.message);
      })

      
      }
    
      peticionPost=async()=>{
        delete this.state.form?._id;
        const fd = new FormData();
        fd.append("image", this.state.form?.image)
        fd.append("_id", this.state.form?._id,)
        fd.append("RU", cookies.get("RU"))
       await axios.post(`${url}/create`,
        fd
        ).then(response=>{
          this.modalInsertar();
          this.peticionGet();
        }).catch(error=>{
          console.log(error.message);
        })
      }

      peticionDelete=()=>{
        axios.delete(`${url}/delete/${this.state.form._id}`).then(response=>{
          this.peticionGet();
        })
      }

      modalInsertar=()=>{
        this.setState({modalInsertar: !this.state.modalInsertar});
      }

      seleccionarAvatar=(avatar)=>{
        this.setState({
          tipoModal: 'actualizar',
          form: {
            _id: avatar._id,
            RU: avatar.RU,
            image: avatar.image,
          }
        })
      }

      modalEliminar = () => {
        Swal.fire({
          title: `¡Espera!`,
          text: `¿Esta seguro de eliminar su foto de perfil?`,
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

    
    

      handleChange=async e=>{
        e.persist();
        await this.setState({
          form:{
            ...this.state.form,
            image: e.target.files[0]
          }
        });
        }
      
    
    
    
    render (){
      const { user  } = this.state;
      return (
        <div id="Perfil">
        <div className="contenedor">
          <section>
            <img
              className="photo"
              src={this.state.photo!==""? this.state.photo[0]?.image : "https://i.imgur.com/ddiph8r.jpeg"}
              alt=""
            />
            <div className="options">
              <button className="btn btn-dark" onClick={()=>{this.setState({form: null, tipoModal: "insertar"}); this.modalInsertar()}}><FaUserEdit/> Editar</button>{"  "}<button className="btn btn-dark" onClick={this.click}><FaTrash/>Eliminar</button>
            </div>
          </section>
          <section id="data">
            <div id='user-input'>
              <span>Nombre</span>
              <span>{user[0]?.Nombre}</span>
            </div>
            <div id='user-input'>
              <span>Apellido Paterno</span>
              <span>{user[0]?.Ap_Paterno}</span>
            </div>
            <div id='user-input'>
              <span>Apellido Materno</span>
              <span>{user[0]?.Ap_Materno}</span>
            </div>
            <div id='user-input'>
              <span>CI</span>
              <span>{user[0]?.CI}</span>
            </div>
            <div id='user-input'>
              <span>RU</span>
              <span>{user[0]?.RU}</span>
            </div>
            <div id='user-input'>
              <span>Email</span>
              <span>{user[0]?.Email}</span>
            </div>
            <div id='user-input'>
              <span>Telefono</span>
              <span>{user[0]?.Telefono}</span>
            </div>
            <div id='user-input'>
              <span>Nombre de Usuario</span>
              <span>{user[0]?.username}</span>
            </div>
            <div id='user-input'>
              <span>Contraseña</span>
              <span>********</span>
            </div>
            <div id='user-input'>
              <span>Cargo</span>
              <span>{user[0]?.Cargo}</span>
            </div>
          </section>
        </div>

        <Modal centered isOpen={this.state.modalInsertar}>
          <ModalHeader style={{display: 'block'}}>
          <span style={{float: 'right'}} onClick={()=>this.modalInsertar()}>x</span>
          </ModalHeader>
          <ModalBody>
            <div className="form-group">
            <label>Seleccionar archivo...</label>
            <input className="form-control" type="file" name= "image" onChange={this.handleChange} />
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

      
    )

    }
}
export default MiPerfil;
