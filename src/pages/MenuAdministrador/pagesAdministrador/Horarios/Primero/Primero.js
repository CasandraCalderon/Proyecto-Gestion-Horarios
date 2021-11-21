import React, { Component } from "react";
import { Table } from "react-bootstrap";
import { Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

const url = "http://localhost:8000/api/primerTurno"

class Primero extends Component {
  state = {
    data: [],
    modalInsertar: false,
    modalEliminar: false,
    Primero : [],
    Dia: '',
    form: {
      _id: "",
      Dia: false,
      Materia: "",
      Docente: "",
      Aula: "",
      Semestre: ""
    },
  };

  componentDidMount() {
    this.peticionGet();
  }

  peticionGet=()=>{
    axios.get(url).then(response=>{
      this.setState({data: response.data});
      this.setState({Primero : this.state.data.filter(elemento => elemento.Semestre === "PRIMERO")})
    }).catch(error=>{
      console.log(error.message);
    })
    }

    peticionPost=async()=>{
      delete this.state.form._id;
     await axios.post(`${url}/create`,
      {
        _id: this.state.form._id,
        Dia: this.state.form.Dia,
        Materia: this.state.form.Materia,
        Docente: this.state.form.Docente,
        Aula: this.state.form.Aula,
        Semestre: this.state.form.Semestre,
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
        _id: this.state.form._id,
        Dia: this.state.form.Dia,
        Materia: this.state.form.Materia,
        Docente: this.state.form.Docente,
        Aula: this.state.form.Aula,
        Semestre: this.state.form.Semestre,
      }
      ).then(response=>{
          this.modalInsertar();
          this.peticionGet();
      })
    }

    seleccionarAula=(aula)=>{
      this.setState({
        tipoModal: 'actualizar',
        form: {
          _id: aula._id,
          Dia: aula.Dia,
          Materia: aula.Materia,
          Docente: aula.Docente,
          Aula: aula.Aula,
          Semestre: aula.Semestre,
        }
      })
    }

    peticionDelete=()=>{
      axios.delete(`${url}/delete/${this.state.form._id}`).then(response=>{
        this.setState({modalEliminar: false});
        this.peticionGet();
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

      comprobar= async() => {
        const result = this.state.Primero.filter(word => word.Dia.length > 5);
        await console.log(result);
      }
  
  render() {
    //const [Dia] = this.state.Primero;
    return (
      <>
        <Table id='Hora' striped bordered hover>
          <thead>
            <tr>
              <th>Hora</th>
              <th>Lunes</th>
              <th>Martes</th>
              <th>Miercoles</th>
              <th>Jueves</th>
              <th>Viernes</th>
              <th>Sabado</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>

                {this.state.Primero.find(elemento => elemento.Dia==='Lunes')? this.state.Primero.filter(elemento => elemento.Dia === 'Lunes').map(elemento => {
                  if(elemento.Dia==='Lunes'){
                    return <td>{elemento.Dia}<br />{elemento.Materia}<br />{elemento.Docente}<br /><button className="btn btn-dark" ><FontAwesomeIcon icon={faEdit}/></button></td>
                  }
                }): <td>Vacio</td>}

                {this.state.Primero.find(elemento => elemento.Dia==='Martes')? this.state.Primero.filter(elemento => elemento.Dia === 'Martes').map(elemento => {
                  if(elemento.Dia==='Martes'){
                    return <td>{elemento.Dia}<br />{elemento.Materia}<br />{elemento.Docente}<br /><button className="btn btn-dark" ><FontAwesomeIcon icon={faEdit}/></button></td>
                  }
                }): <td>Vacio</td>}

                {this.state.Primero.find(elemento => elemento.Dia==='Miercoles')? this.state.Primero.filter(elemento => elemento.Dia === 'Miercoles').map(elemento => {
                  if(elemento.Dia==='Miercoles'){
                    return <td>{elemento.Dia}<br />{elemento.Materia}<br />{elemento.Docente}<br /><button className="btn btn-dark" ><FontAwesomeIcon icon={faEdit}/></button></td>
                  }
                }): <td>Vacio</td>}

                {this.state.Primero.find(elemento => elemento.Dia==='Jueves')? this.state.Primero.filter(elemento => elemento.Dia === 'Jueves').map(elemento => {
                  if(elemento.Dia==='Jueves'){
                    return <td>{elemento.Dia}<br />{elemento.Materia}<br />{elemento.Docente}<br /><button className="btn btn-dark" ><FontAwesomeIcon icon={faEdit}/></button></td>
                  }
                }): <td>Vacio</td>}

                {this.state.Primero.find(elemento => elemento.Dia==='Viernes')? this.state.Primero.filter(elemento => elemento.Dia === 'Viernes').map(elemento => {
                  if(elemento.Dia==='Viernes'){
                    return <td>{elemento.Dia}<br />{elemento.Materia}<br />{elemento.Docente}<br /><button className="btn btn-dark" ><FontAwesomeIcon icon={faEdit}/></button></td>
                  }
                }): <td>Vacio</td>}

                {this.state.Primero.find(elemento => elemento.Dia==='Sabado')? this.state.Primero.filter(elemento => elemento.Dia === 'Sabado').map(elemento => {
                  if(elemento.Dia==='Sabado'){
                    return <td>{elemento.Dia}<br />{elemento.Materia}<br />{elemento.Docente}<br /><button className="btn btn-dark" ><FontAwesomeIcon icon={faEdit}/></button></td>
                  }
                }): <td>Vacio</td>}

              
            </tr>
          </tbody>
          <tbody>
            <tr>
              <td>2</td>
              <td className="Pri">
                    <button className="btn btn-dark" ><FontAwesomeIcon icon={faEdit}/></button>
                    {"   "}
                    <button className="btn btn-danger" ><FontAwesomeIcon icon={faTrashAlt}/></button>
                    {"   "}
                    <button className="btn btn-danger" ><FontAwesomeIcon icon={faTrashAlt}/></button>
                    </td>
            </tr>
          </tbody>
          <tbody>
            <tr>
              <td>3</td>
            </tr>
          </tbody>
          <tbody>
            <tr>
              <td>4</td>
            </tr>
          </tbody>
          <tbody>
            <tr>
              <td>5</td>
            </tr>
          </tbody>
        </Table>
      </>
    );
  }
}
export default Primero;
