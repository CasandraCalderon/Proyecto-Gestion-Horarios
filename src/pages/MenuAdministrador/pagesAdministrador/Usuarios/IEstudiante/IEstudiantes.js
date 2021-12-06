import React, { Component } from "react";
import "./IEstudiantes.css";
import Swal from "sweetalert2";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { AiFillPrinter } from "react-icons/ai";
import { Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import PresentCard from "../../../../PresentCard/PresentCard";
import jsPDF from 'jspdf'
import 'jspdf-autotable'


const url = "http://localhost:8000/api/estudiante";
const urlSemestres = "http://localhost:8000/api/semestres";
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

class IEstudiantes extends Component {
  state = {
    data: [],
    modalInsertar: false,
    busqueda1: "Filtrar todos los semestres",
    busquedaRU: "",
    busqueda: "",
    Semestres: [],
    form: {
      _id: "",
      Nombre: "",
      Ap_Paterno: "",
      Ap_Materno: "",
      CI: "",
      Email: "",
      Telefono: "",
      RU: "",
      Cargo: "",
      Semestre: "",
      username: "",
      password: "",
    },
  };

  peticionGet = () => {
    axios
      .get(url)
      .then((response) => {
        this.setState({ data: response.data });
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  peticionPost = async () => {
    delete this.state.form._id;
    await axios
      .post(`${url}/create`, {
        _id: this.state.form._id,
        Nombre: this.state.form.Nombre,
        Ap_Paterno: this.state.form.Ap_Paterno,
        Ap_Materno: this.state.form.Ap_Materno,
        CI: this.state.form.CI,
        Email: this.state.form.Email,
        Telefono: this.state.form.Telefono,
        RU: this.state.form.RU,
        Cargo: "ESTUDIANTE",
        Semestre: this.state.form.Semestre,
        username: `${this.state.form.Nombre}_${this.state.form.Ap_Paterno}`,
        password: `${this.state.form.Ap_Paterno}${this.state.form.CI}`,
      })
      .then((response) => {
        this.modalInsertar();
        this.peticionGet();
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  peticionPut = () => {
    axios
      .put(`${url}/edit/${this.state.form._id}`, {
        id: this.state.form._id,
        Nombre: this.state.form.Nombre,
        Ap_Paterno: this.state.form.Ap_Paterno,
        Ap_Materno: this.state.form.Ap_Materno,
        CI: this.state.form.CI,
        Email: this.state.form.Email,
        Telefono: this.state.form.Telefono,
        RU: this.state.form.RU,
        Cargo: this.state.form.Cargo,
        Semestre: this.state.form.Semestre,
        username: `${this.state.form.Ap_Paterno}_${this.state.form.RU}`,
        password: this.state.form.password,
      })
      .then((response) => {
        this.modalInsertar();
        this.peticionGet();
        Swal.fire({
          title: "Estudiante actualizado correctamente",
          icon: "success",
          showConfirmButton: false,
          timer: 1500,
        });
      });
  };

  peticionDelete = () => {
    axios.delete(`${url}/delete/${this.state.form._id}`).then((response) => {
      this.setState({ modalEliminar: false });
      this.peticionGet();
    });
  };

  modalInsertar = () => {
    this.setState({ modalInsertar: !this.state.modalInsertar });
  };

  seleccionarUsuario = (usuario) => {
    this.setState({
      tipoModal: "actualizar",
      form: {
        _id: usuario._id,
        Nombre: usuario.Nombre,
        Ap_Paterno: usuario.Ap_Paterno,
        Ap_Materno: usuario.Ap_Materno,
        CI: usuario.CI,
        Email: usuario.Email,
        Telefono: usuario.Telefono,
        RU: usuario.RU,
        Cargo: usuario.Cargo,
        Semestre: usuario.Semestre,
        username: usuario.username,
        password: usuario.password,
      },
    });
  };

  handleChange = async (e) => {
    e.persist();
    await this.setState({
      form: {
        ...this.state.form,
        [e.target.name]: e.target.value,
      },
    });
  };

  componentDidMount() {
    axios
      .get(urlSemestres)
      .then((response) => {
        console.log(response);
        this.setState({ Semestres: response.data });
      })
      .catch((error) => {
        console.log(error);
      });
    this.peticionGet();
  }

  modalEliminar = () => {
    Swal.fire({
      title: `¡Espera!`,
      text: `¿Esta seguro de eliminar a ${this.state.form.Nombre} ${this.state.form.Ap_Paterno} ${this.state.form.Ap_Materno}?`,
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
      } else {
        this.setState({ modalEliminar: false });
      }
    });
  };

  onChange = async (e) => {
    e.persist();
    await this.setState({
      ...this.state.busquedaRU,
      [e.target.name]: e.target.value,
    });
    console.log(this.state.busquedaRU);
  };

  onChange1 = async (e) => {
    e.persist();
    await this.setState({
      ...this.state.busqueda1,
      [e.target.name]: e.target.value,
    });
  };

  seleccionarBusqueda = () => {
    this.setState({ busqueda: this.state.busquedaRU });
  };
  DownloadPdf=()=>{
    const doc= new jsPDF()
    doc.text("LISTA DE ESTUDIANTES",20,10)
    doc.autoTable({
        theme: "grid",
        columns:columns.map(col => ({ ...col, dataKey: col.field })),
        body: this.state.data
    })
    doc.save("estudiantes.pdf")
  }

  render() {
    const { form } = this.state;
    return (
      <div id="fondo">
        <PresentCard />
        <div className="text-left container">
          <br />
          <button
            className="btn btn-dark"
            onClick={() => {
              this.setState({ form: null, tipoModal: "insertar" });
              this.modalInsertar();
            }}
          >
            Agregar Estudiante
          </button>
          <div className="barraBusqueda">
            <select
              className="textField"
              placeholder="Buscar Semestre"
              type="text"
              name="busqueda1"
              id="busqueda1"
              onChange={this.onChange1}
              value={this.state.busqueda1}
            >
              <option>Filtrar todos los semestres</option>
              {this.state.Semestres.map((elemento) => (
                  <option key={elemento._id} value={elemento._Nombre}>
                    {elemento.Nombre}
                  </option>
                ))}
              
            </select>{"   "}

            <input
              className="textField"
              placeholder="Buscar por RU"
              type="text"
              name="busquedaRU"
              id="busquedaRU"
              onChange={this.onChange}
              value={this.state.busquedaRU}
            />
            <button
              type="button"
              className="btn btn-dark"
              onClick={this.seleccionarBusqueda}
            >
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
              <th id="texto">RU</th>
              <th id="texto">Nombres</th>
              <th id="texto">Apellido Paterno</th>
              <th id="texto">Apellido Materno</th>
              <th id="texto">Correo Electronico</th>
              <th id="texto">Telefono</th>
              <th id="texto">Semestre</th>
              <th id="texto">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {this.state.data
              .filter((elemento) =>
                this.state.busqueda !== ""?
                   this.state.busqueda.includes(elemento.RU): this.state.busqueda1 !== "Filtrar todos los semestres"?
                   elemento.Semestre === this.state.busqueda1 : this.state.busqueda !== "" &&  this.state.busqueda1 !== "Filtrar todos los semestres"? 
                   this.state.busqueda===elemento.RU && elemento.Semestre === this.state.busqueda1
                  : elemento.Cargo === "ESTUDIANTE"
              )
              .map((usuario) => {
                return (
                  <tr key={usuario._id}>
                    <td id="texto">{usuario.RU}</td>
                    <td id="texto">{usuario.Nombre}</td>
                    <td id="texto">{usuario.Ap_Paterno}</td>
                    <td id="texto">{usuario.Ap_Materno}</td>
                    <td id="texto">{usuario.Email}</td>
                    <td id="texto">{usuario.Telefono}</td>
                    <td id="texto">{usuario.Semestre}</td>
                    <td id="texto">
                      <button
                        className="btn btn-dark"
                        onClick={() => {
                          this.seleccionarUsuario(usuario);
                          this.modalInsertar();
                        }}
                      >
                        <FontAwesomeIcon icon={faEdit} />
                      </button>
                      {"   "}
                      <button
                        className="btn btn-danger"
                        onClick={() => {
                          this.seleccionarUsuario(usuario);
                          this.modalEliminar();
                        }}
                      >
                        <FontAwesomeIcon icon={faTrashAlt} />
                      </button>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>

        <Modal isOpen={this.state.modalInsertar}>
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
              <label htmlFor="RU">RU</label>
              <input
                className="form-control"
                type="text"
                name="RU"
                id="RU"
                onChange={this.handleChange}
                value={form ? form.RU : ""}
              />
              <br />
              <label htmlFor="Nombre">Nombres</label>
              <input
                className="form-control"
                type="text"
                name="Nombre"
                id="Nombre"
                onChange={this.handleChange}
                value={form ? form.Nombre : ""}
              />
              <br />
              <label htmlFor="Ap_Paterno">Apellido Paterno</label>
              <input
                className="form-control"
                type="text"
                name="Ap_Paterno"
                id="Ap_Paterno"
                onChange={this.handleChange}
                value={form ? form.Ap_Paterno : ""}
              />
              <br />
              <label htmlFor="Ap_Materno">Apellido Materno</label>
              <input
                className="form-control"
                type="text"
                name="Ap_Materno"
                id="Ap_Materno"
                onChange={this.handleChange}
                value={form ? form.Ap_Materno : ""}
              />
              <br />
              <label htmlFor="RU">CI</label>
              <input
                className="form-control"
                type="text"
                name="CI"
                id="CI"
                onChange={this.handleChange}
                value={form ? form.CI : ""}
              />
              <br />
              <label htmlFor="Email">Correo Electronico</label>
              <input
                className="form-control"
                type="text"
                name="Email"
                id="Email"
                onChange={this.handleChange}
                value={form ? form.Email : ""}
              />
              <br />
              <label htmlFor="Telefono">Telefono</label>
              <input
                className="form-control"
                type="text"
                name="Telefono"
                id="Telefono"
                onChange={this.handleChange}
                value={form ? form.Telefono : ""}
              />
              <br />
              <label htmlFor="Semestre">Semestre</label>
              <select
                name="Semestre"
                className="form-select"
                id="Semestre"
                onChange={this.handleChange}
              >
                <option>Seleccionar semestre...</option>
                {this.state.Semestres.map((elemento) => (
                  <option key={elemento._id} value={elemento._Nombre}>
                    {elemento.Nombre}
                  </option>
                ))}
              </select>
            </div>
          </ModalBody>

          <ModalFooter>
            {this.state.tipoModal === "insertar" ? (
              <button
                className="btn btn-dark"
                onClick={() => this.peticionPost()}
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
      </div>
    );
  }
}
export default IEstudiantes;
