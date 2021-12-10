import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaUserEdit, FaTrash } from "react-icons/fa";
import Swal from "sweetalert2";
import axios from "axios";
import "./MiPerfil.css";
import Cookies from "universal-cookie";
import { Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import Datos from "./Datos";

const cookies = new Cookies();
const url = "http://localhost:8000/api/avatar";
const usuario = `http://localhost:8000/api/${cookies.get("Cargo")}`;

class MiPerfil extends Component {
  state = {
    modalInsertar: false,
    modalEliminar: false,
    modalDatos: false,
    tipoModal: "",
    prueba: false,
    data: [],
    user: [],
    form: {
      _id: "",
      RU: "",
      image: null,
    },
    formData : {
      Email : "",
      Telefono : "",
      username : "",
    }
  };

  componentDidMount() {
    this.peticionGet();
  }

  peticionGet = () => {
    axios
      .get(usuario)
      .then((response) => {
        this.setState({
          user: response.data.filter((e) => e.RU === cookies.get("RU")),
        });
      })
      .catch((error) => {
        console.log(error);
      });
    axios
      .get(url)
      .then((response) => {
        this.setState({
          data: response.data.filter((e) => e.RU === cookies.get("RU")),
        });
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  peticionPutUser() {
    axios.put(`${usuario}/edit/${this.state.user[0]?._id}`, {
      Email: this.state.formData.Email,
      Telefono : this.state.formData.Telefono,
      username: this.state.formData.username,
    }).then(response=>{
      this.setState({modalDatos : false});
      this.peticionGet();
    Swal.fire({
      title: 'Usuario actualizado correctamente',
      icon: 'success',
      showConfirmButton: false,
      timer: 1500
    })
  })

  }

  peticionPost = async () => {
    delete this.state.form?._id;
    const fd = new FormData();
    fd.append("image", this.state.form?.image);
    fd.append("_id", this.state.form?._id);
    fd.append("RU", cookies.get("RU"));
    await axios
      .post(`${url}/create`, fd)
      .then((response) => {
        this.setState({ modalInsertar: false });
        this.peticionGet();
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  peticionDelete = () => {
    axios
      .delete(`${url}/delete/${this.state.data[0]?._id}`)
      .then((response) => {
        this.peticionGet();
      });
  };

  modalInsertar = () => {
    this.setState({ modalInsertar: !this.state.modalInsertar });
  };

  modalDatos = () => {
    this.setState({ modalDatos: !this.state.modalInsertar });
  };

  seleccionarAvatar = (avatar) => {
    this.setState({
      tipoModal: "actualizar",
      form: {
        _id: avatar._id,
        RU: avatar.RU,
        image: avatar.image,
      },
    });
  };

  modalEliminar = () => {
    Swal.fire({
      title: `¡Espera!`,
      text: `¿Esta seguro de eliminar su foto de perfil?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si",
    }).then((result) => {
      if (result.isConfirmed) {
        this.peticionDelete();
        Swal.fire(
          "¡Eliminado!",
          "Su solicitud se ejecuto de manera exitosa",
          "success"
        );
      }
    });
  };

  AlertEditado = () => {
    Swal.fire(
      "Foto de perfil actualizada",
      "Su solicitud se ejecuto de manera exitosa",
      "success"
    );
  };

  alertAgregado = () => {
    Swal.fire(
      "Foto de perfil agregada",
      "Su solicitud se ejecuto de manera exitosa",
      "success"
    );
  };

  peticionPut = () => {
    this.peticionDelete();
    this.peticionPost();
    this.AlertEditado();
    this.modalInsertar();
  };

  actualizar = () => {
    this.modalInsertar();
  };

  handleChange = async (e) => {
    e.persist();
    await this.setState({
      form: {
        ...this.state.form,
        image: e.target.files[0],
      },
    });
  };

  handleChangeForm=async e=>{
    e.persist();
    await this.setState({
      formData:{
        ...this.state.formData,
        [e.target.name]: e.target.value
      }
    });
    }

    seleccionarUsuario=(usuario)=>{
      this.setState({
        formData: {
          Email: usuario.Email,
          Telefono: usuario.Telefono,
          username: usuario.username,
        }
      })
    }

  render() {
    return (
      <div id="Perfil">
        <div className="contenedor">
          <section>
            <img
              className="photo"
              src={
                this.state.data.length !== 0
                  ? `http://localhost:8000/${this.state.data[0]?.image}`
                  : "http://localhost:8000/uploads/gerente.png"
              }
              alt=""
            />
            <div className="options">
              {this.state.data.length !== 0 ? (
                <button
                  className="btn btn-dark"
                  onClick={() => {
                    this.setState({ form: null, tipoModal: "actualizar" });
                    this.actualizar();
                  }}
                >
                  <FaUserEdit /> Editar
                </button>
              ) : (
                <button
                  className="btn btn-dark"
                  onClick={() => {
                    this.setState({ form: null, tipoModal: "insertar" });
                    this.modalInsertar();
                  }}
                >
                  <FaUserEdit />
                  Agregar
                </button>
              )}{" "}
              {this.state.data.length !== 0 ? (
                <button
                  className="btn btn-dark"
                  onClick={() => this.modalEliminar()}
                >
                  <FaTrash />
                  Eliminar
                </button>
              ) : (
                console.log("prueba")
              )}
            </div>
          </section>
          <section id="data">
          <Datos user = {this.state.user}/>
          <button
                  className="btn btn-dark"
                  onClick={() => {this.modalDatos(); this.seleccionarUsuario(this.state.user[0])
                    
                  }}
                >
                  <FaUserEdit />{" "}
                   Editar datos
                </button>
          </section>
        </div>

        <Modal centered isOpen={this.state.modalInsertar}>
          <ModalHeader style={{ display: "block" }}>
            <span
              style={{ float: "right" }}
              onClick={() => this.modalInsertar()}
            >
              x
            </span>
          </ModalHeader>
          <ModalBody>
            <div className="form-group">
              <label>Seleccionar archivo...</label>
              <input
                className="form-control"
                type="file"
                name="image"
                onChange={this.handleChange}
              />
            </div>
          </ModalBody>
          <ModalFooter>
            {this.state.tipoModal === "insertar" ? (
              <button
                className="btn btn-dark"
                onClick={() => {
                  this.peticionPost();
                  this.alertAgregado();
                }}
              >
                Insertar
              </button>
            ) : (
              <button
                className="btn btn-success"
                onClick={() => this.peticionPut()}
              >
                Actualizar
              </button>
            )}
            <button
              className="btn btn-danger"
              onClick={() => this.modalInsertar()}
            >
              Cancelar
            </button>
          </ModalFooter>
        </Modal>

        <Modal isOpen={this.state.modalDatos}>
                <ModalHeader style={{display: 'block'}}>
                  <span style={{float: 'right'}} onClick={()=>this.setState({modalDatos : false})}>x</span>
                </ModalHeader>
                <ModalBody>
                  <form className="form-group">
                    <div>
                    <label htmlFor="Email">Correo Electronico</label>
                    <input className="form-control" type="text" name="Email" id="Email" placeholder = "example@example.com" onChange={this.handleChangeForm} value={this.state.formData.Email}/>
                    </div>
                    <br/>
                    <div>
                    <label htmlFor="Telefono">Telefono</label>
                    <input className="form-control" type="text" name="Telefono" id="Telefono" onChange={this.handleChangeForm} value={this.state.formData.Telefono}/>
                    </div>
                    <br/>
                    <div>
                    <label htmlFor="username">Nombre de usuario</label>
                    <input className="form-control" type="text" name="username" id="username" onChange={this.handleChangeForm} value={this.state.formData.username}/>
                    </div>
        
                    
                    
                  </form>
                </ModalBody>

                <ModalFooter>
                  <button className="btn btn-success" onClick={()=>this.peticionPutUser()}>
                    Actualizar
                  </button>

                    <button className="btn btn-danger" onClick={()=>this.setState({modalDatos : false})}>Cancelar</button>
                </ModalFooter>
          </Modal>
      </div>
    );
  }
}
export default MiPerfil;
