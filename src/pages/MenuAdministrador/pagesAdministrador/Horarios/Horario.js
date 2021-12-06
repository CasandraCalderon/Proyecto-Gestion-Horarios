import React from "react";
import "./Horario.css"
import { Table } from "react-bootstrap";
import { Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import Swal from 'sweetalert2'
import axios from "axios";
import PresentCard from "../../../PresentCard/PresentCard";
import VerDisponibilidad from "./VerDisponibilidad";




const urlMaterias = "http://localhost:8000/api/materia"
const urlDocentes = "http://localhost:8000/api/Docente"
const urlAulas = "http://localhost:8000/api/aula"
const urlSemestres = "http://localhost:8000/api/semestres"
class Horario extends React.Component {
  state = {
    data: [],
    Materias: [],
    Docentes: [],
    formD : {
      _id : [],
      DisOcupada : [],
    },
    Aulas: [],
    Semestres : [],
    modalInsertar: false,
    modalEliminar: false,
    modalVerDisponibilidad: false,
    verificar: false,
    tipoModal: "",
    Primero : [],
    Segundo : [],
    Tercero : [],
    Cuarto: [],
    Quinto : [],
    form: {
      _id: "",
      Dia: '',
      Materia: "",
      Docente: "",
      Aula: "",
      Turno: ""
    },
  };
  componentDidMount() {
    axios.get(urlMaterias)
    .then((response) => {
      this.setState({Materias: response.data});
    })
    .catch((error) => {
      console.log(error);
    });
    axios.get(urlDocentes)
    .then((response) => {
      this.setState({Docentes: response.data});
    })
    .catch((error) => {
      console.log(error);
    });
    axios.get(urlAulas)
    .then((response) => {
      this.setState({Aulas: response.data});
    })
    .catch((error) => {
      console.log(error);
    });
    axios.get(urlSemestres)
    .then((response) => {
      this.setState({Semestres: response.data});
    })
    .catch((error) => {
      console.log(error);
    });
    this.peticionGet();
  }

  peticionGet=()=>{
    let {url} = this.props; 
    axios.get(`http://localhost:8000/api/${url}`).then(response=>{
      this.setState({data: response.data});
      this.setState({Primero : this.state.data.filter(elemento => elemento.Turno === "PRIMER TURNO")})
      this.setState({Segundo : this.state.data.filter(elemento => elemento.Turno === "SEGUNDO TURNO")})
      this.setState({Tercero : this.state.data.filter(elemento => elemento.Turno === "TERCER TURNO")})
      this.setState({Cuarto : this.state.data.filter(elemento => elemento.Turno === "CUARTO TURNO")})
      this.setState({Quinto : this.state.data.filter(elemento => elemento.Turno === "QUINTO TURNO")})
      this.setState({verificar:false})
    }).catch(error=>{
      console.log(error.message);
    })
    }

    peticionPost=async()=>{
      let {url} = this.props; 
      delete this.state.form._id;
     await axios.post(`http://localhost:8000/api/${url}/create`,
      {
        _id: this.state.form._id,
        Dia: this.state.form.Dia,
        Materia: this.state.form.Materia,
        Docente: this.state.form.Docente,
        Aula: this.state.form.Aula,
        Turno: this.state.form.Turno,
      }
      ).then(response=>{
        if(response.data.message==="Este horario ya esta ocupado"){
          this.alert1();
        }
        else{
          this.modalInsertar();
          this.peticionGet();
        }
      }).catch(error=>{
        console.log(error.message);
      })
    }

    peticionPut=()=>{
        let {url} = this.props;
      axios.put(`http://localhost:8000/api/${url}/edit/${this.state.form._id}`, 
      {
        _id: this.state.form._id,
        Dia: this.state.form.Dia,
        Materia: this.state.form.Materia,
        Docente: this.state.form.Docente,
        Aula: this.state.form.Aula,
        Turno: this.state.form.Turno,
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
          Turno: aula.Turno,
        }
      })
    }

    peticionDelete=()=>{
        let {url} = this.props;
      axios.delete(`http://localhost:8000/api/${url}/delete/${this.state.form._id}`).then(response=>{
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

      modalInsertar=()=>{
        this.setState({modalInsertar: !this.state.modalInsertar});
      }
      verificar=()=> {
        this.state.form.Turno === "PRIMER TURNO"? this.state.Docentes.filter(elemento => elemento.RU === this.state.form.Docente).forEach(elemento => 
          {if (elemento.Disponibilidad.includes(`1${this.state.form.Dia}`) && !elemento.DisOcupada.includes(`1${this.state.form.Dia}`)){
            elemento.DisOcupada.push(`1${this.state.form.Dia}`);
            this.getDocentes(elemento.DisOcupada, elemento._id);
          }else {
            this.alert();
          }}) 
          : this.state.form.Turno === "SEGUNDO TURNO"? this.state.Docentes.filter(elemento => elemento.RU === this.state.form.Docente).forEach(elemento => 
            {if (elemento.Disponibilidad.includes(`1${this.state.form.Dia}`) && !elemento.DisOcupada.includes(`2${this.state.form.Dia}`)){
              elemento.DisOcupada.push(`2${this.state.form.Dia}`);
              this.getDocentes(elemento.DisOcupada, elemento._id);
            }else {
              this.alert();
            }}) :
            this.state.form.Turno === "TERCER TURNO"? this.state.Docentes.filter(elemento => elemento.RU === this.state.form.Docente).forEach(elemento => 
              {if (elemento.Disponibilidad.includes(`3${this.state.form.Dia}`) && !elemento.DisOcupada.includes(`3${this.state.form.Dia}`)){
                elemento.DisOcupada.push(`3${this.state.form.Dia}`);
                this.getDocentes(elemento.DisOcupada, elemento._id);
              }else {
                this.alert();
              }}) : this.state.form.Turno === "CUARTO TURNO"? this.state.Docentes.filter(elemento => elemento.RU === this.state.form.Docente).forEach(elemento => 
                {if (elemento.Disponibilidad.includes(`4${this.state.form.Dia}`) && !elemento.DisOcupada.includes(`4${this.state.form.Dia}`)){
                  elemento.DisOcupada.push(`4${this.state.form.Dia}`);
                  this.getDocentes(elemento.DisOcupada, elemento._id);
                }else {
                  this.alert();
                }}) : this.state.form.Turno === "QUINTO TURNO"? this.state.Docentes.filter(elemento => elemento.RU === this.state.form.Docente).forEach(elemento => 
                  {if (elemento.Disponibilidad.includes(`5${this.state.form.Dia}`) && !elemento.DisOcupada.includes(`5${this.state.form.Dia}`)){
                    elemento.DisOcupada.push(`5${this.state.form.Dia}`);
                    this.getDocentes(elemento.DisOcupada, elemento._id);
                  }else {
                    this.alert();
                  }}) : console.log("No escogio un turno");
      }
      
      getDocentes=(Dias, ID)=>{
        axios.put(`${urlDocentes}/edit/${ID}`,
        {
          DisOcupada : Dias
        }
        ).then(response=>{
          this.state.modalEliminar? this.peticionDelete() : this.state.verificar? this.peticionGet() :
        this.peticionPost() 
      })
      }

      actDias =()=> {
        this.state.form.Turno === "PRIMER TURNO"? this.state.Docentes.filter(elemento => elemento.RU === this.state.form.Docente).forEach(elemento =>{
          elemento.DisOcupada.splice(elemento.DisOcupada.indexOf(`1${this.state.form.Dia}`),1);
          this.setState({verificar:true})
          this.getDocentes(elemento.DisOcupada, elemento._id);
            
          }) : this.state.form.Turno === "SEGUNDO TURNO"? this.state.Docentes.filter(elemento => elemento.RU === this.state.form.Docente).forEach(elemento =>{
            elemento.DisOcupada.splice(elemento.DisOcupada.indexOf(`1${this.state.form.Dia}`),1);
            this.setState({verificar:true})
            this.getDocentes(elemento.DisOcupada, elemento._id);
              
            }) : this.state.form.Turno === "TERCER TURNO"? this.state.Docentes.filter(elemento => elemento.RU === this.state.form.Docente).forEach(elemento =>{
              elemento.DisOcupada.splice(elemento.DisOcupada.indexOf(`1${this.state.form.Dia}`),1);
              this.setState({verificar:true})
              this.getDocentes(elemento.DisOcupada, elemento._id);
                
              }) : this.state.form.Turno === "CUARTO TURNO"? this.state.Docentes.filter(elemento => elemento.RU === this.state.form.Docente).forEach(elemento =>{
                elemento.DisOcupada.splice(elemento.DisOcupada.indexOf(`1${this.state.form.Dia}`),1);
                this.setState({verificar:true})
                this.getDocentes(elemento.DisOcupada, elemento._id);
                  
                }) : this.state.form.Turno === "QUINTO TURNO"? this.state.Docentes.filter(elemento => elemento.RU === this.state.form.Docente).forEach(elemento =>{
                  elemento.DisOcupada.splice(elemento.DisOcupada.indexOf(`1${this.state.form.Dia}`),1);
                  this.setState({verificar:true})
                  this.getDocentes(elemento.DisOcupada, elemento._id);
                    
                  }) :console.log('chale no se pudo');
      }

      alert1=()=>{
        Swal.fire({
          title: `Este dia ya esta ocupado por otra materia`,
          text: `Por favor, elija otro dia disponible`,
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Ver disponibilidad'
        }).then((result) => {
          if (result.isConfirmed) {
            this.actDias();
            this.setState({modalVerDisponibilidad:true})
            this.setState({modalEliminar: false})
          } else {
            this.actDias();
            this.setState({modalVerDisponibilidad:false})
          }
        })
      }
      


      alert=()=>{
        Swal.fire({
          title: 'Docente no disponible para ese dia',
          text: `¿Desea ver que horarios tiene disponible?`,
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Si'
        }).then((result) => {
          if (result.isConfirmed) {
            this.setState({modalVerDisponibilidad:true})
          }
        })
      }

      click=()=>{
        let {semestre} = this.props;
        return(semestre)
      }
      

  render() {
    return (
      <div id="fondoHorario">
      <PresentCard />
      <div className="text-left container">
            <br />
          <button className="btn btn-dark" onClick={()=>{this.setState({form: null, tipoModal: 'insertar'}); this.modalInsertar()}}>Agregar Clase</button>
          </div>
          <br />
        <Table id='Hora' className="text-left container" striped bordered hover>
          <thead>
            <tr className="text-center">
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
            <tr className="text-center">
              <td id="turno">7:45-10:00</td>
                {this.state.Primero.find(elemento => elemento.Dia==='Lunes')? this.state.Primero.filter(elemento => elemento.Dia === 'Lunes').map(elemento => {
                  if(elemento.Dia==='Lunes'){
                    return <td key= {elemento._id}>{elemento.Materia}<br />{elemento.Aula}<br />
                    <button className="btn btn-danger" onClick={()=>{this.seleccionarAula(elemento); this.setState({modalEliminar: true})}}><FontAwesomeIcon icon={faTrashAlt}/></button></td>
                  }
                }): <td>Vacio</td>}

                {this.state.Primero.find(elemento => elemento.Dia==='Martes')? this.state.Primero.filter(elemento => elemento.Dia === 'Martes').map(elemento => {
                  if(elemento.Dia==='Martes'){
                    return <td key= {elemento._id}>{elemento.Materia}<br />{elemento.Aula}<br />
                    <button className="btn btn-danger" onClick={()=>{this.seleccionarAula(elemento); this.setState({modalEliminar: true})}}><FontAwesomeIcon icon={faTrashAlt}/></button></td>
                  }
                }): <td>Vacio</td>}

                {this.state.Primero.find(elemento => elemento.Dia==='Miercoles')? this.state.Primero.filter(elemento => elemento.Dia === 'Miercoles').map(elemento => {
                  if(elemento.Dia==='Miercoles'){
                    return <td key= {elemento._id}>{elemento.Materia}<br />{elemento.Aula}<br />
                    <button className="btn btn-danger" onClick={()=>{this.seleccionarAula(elemento); this.setState({modalEliminar: true})}}><FontAwesomeIcon icon={faTrashAlt}/></button></td>
                  }
                }): <td>Vacio</td>}

                {this.state.Primero.find(elemento => elemento.Dia==='Jueves')? this.state.Primero.filter(elemento => elemento.Dia === 'Jueves').map(elemento => {
                  if(elemento.Dia==='Jueves'){
                    return <td key= {elemento._id}>{elemento.Materia}<br />{elemento.Aula}<br />
                    <button className="btn btn-danger" onClick={()=>{this.seleccionarAula(elemento); this.setState({modalEliminar: true})}}><FontAwesomeIcon icon={faTrashAlt}/></button></td>
                  }
                }): <td>Vacio</td>}

                {this.state.Primero.find(elemento => elemento.Dia==='Viernes')? this.state.Primero.filter(elemento => elemento.Dia === 'Viernes').map(elemento => {
                  if(elemento.Dia==='Viernes'){
                    return <td key= {elemento._id}>{elemento.Materia}<br />{elemento.Aula}<br />
                    <button className="btn btn-danger" onClick={()=>{this.seleccionarAula(elemento); this.setState({modalEliminar: true})}}><FontAwesomeIcon icon={faTrashAlt}/></button></td>
                  }
                }): <td>Vacio</td>}

                {this.state.Primero.find(elemento => elemento.Dia==='Sabado')? this.state.Primero.filter(elemento => elemento.Dia === 'Sabado').map(elemento => {
                  if(elemento.Dia==='Sabado'){
                    return <td key= {elemento._id}>{elemento.Materia}<br />{elemento.Aula}<br />
                    <button className="btn btn-danger" onClick={()=>{this.seleccionarAula(elemento); this.setState({modalEliminar: true})}}><FontAwesomeIcon icon={faTrashAlt}/></button></td>
                  }
                }): <td>Vacio</td>}
              
            </tr>
          </tbody>
          <tbody>
            <tr className="text-center">
              <td id="turno">10:00-12:15</td>
              {this.state.Segundo.find(elemento => elemento.Dia==='Lunes')? this.state.Segundo.filter(elemento => elemento.Dia === 'Lunes').map(elemento => {
                  if(elemento.Dia==='Lunes'){
                    return <td key= {elemento._id}>{elemento.Materia}<br />{elemento.Aula}<br />
                    <button className="btn btn-danger" onClick={()=>{this.seleccionarAula(elemento); this.setState({modalEliminar: true})}}><FontAwesomeIcon icon={faTrashAlt}/></button></td>
                  }
                }): <td>Vacio</td>}

                {this.state.Segundo.find(elemento => elemento.Dia==='Martes')? this.state.Segundo.filter(elemento => elemento.Dia === 'Martes').map(elemento => {
                  if(elemento.Dia==='Martes'){
                    return <td key= {elemento._id}>{elemento.Materia}<br />{elemento.Aula}<br />
                    <button className="btn btn-danger" onClick={()=>{this.seleccionarAula(elemento); this.setState({modalEliminar: true})}}><FontAwesomeIcon icon={faTrashAlt}/></button></td>
                  }
                }): <td>Vacio</td>}

                {this.state.Segundo.find(elemento => elemento.Dia==='Miercoles')? this.state.Segundo.filter(elemento => elemento.Dia === 'Miercoles').map(elemento => {
                  if(elemento.Dia==='Miercoles'){
                    return <td key= {elemento._id}>{elemento.Materia}<br />{elemento.Aula}<br />
                    <button className="btn btn-danger" onClick={()=>{this.seleccionarAula(elemento); this.setState({modalEliminar: true})}}><FontAwesomeIcon icon={faTrashAlt}/></button></td>
                  }
                }): <td>Vacio</td>}

                {this.state.Segundo.find(elemento => elemento.Dia==='Jueves')? this.state.Segundo.filter(elemento => elemento.Dia === 'Jueves').map(elemento => {
                  if(elemento.Dia==='Jueves'){
                    return <td key= {elemento._id}>{elemento.Materia}<br />{elemento.Aula}<br />
                    <button className="btn btn-danger" onClick={()=>{this.seleccionarAula(elemento); this.setState({modalEliminar: true})}}><FontAwesomeIcon icon={faTrashAlt}/></button></td>
                  }
                }): <td>Vacio</td>}

                {this.state.Segundo.find(elemento => elemento.Dia==='Viernes')? this.state.Segundo.filter(elemento => elemento.Dia === 'Viernes').map(elemento => {
                  if(elemento.Dia==='Viernes'){
                    return <td key= {elemento._id}>{elemento.Materia}<br />{elemento.Aula}<br />
                    <button className="btn btn-danger" onClick={()=>{this.seleccionarAula(elemento); this.setState({modalEliminar: true})}}><FontAwesomeIcon icon={faTrashAlt}/></button></td>
                  }
                }): <td>Vacio</td>}

                {this.state.Segundo.find(elemento => elemento.Dia==='Sabado')? this.state.Segundo.filter(elemento => elemento.Dia === 'Sabado').map(elemento => {
                  if(elemento.Dia==='Sabado'){
                    return <td key= {elemento._id}>{elemento.Materia}<br />{elemento.Aula}<br />
                    <button className="btn btn-danger" onClick={()=>{this.seleccionarAula(elemento); this.setState({modalEliminar: true})}}><FontAwesomeIcon icon={faTrashAlt}/></button></td>
                  }
                }): <td>Vacio</td>}
            </tr>
          </tbody>
          <tbody>
            <tr className="text-center">
              <td id="turno">12:15-14:00</td>
              <td>RECESO</td>
              <td>RECESO</td>
              <td>RECESO</td>
              <td>RECESO</td>
              <td>RECESO</td>
              <td>RECESO</td>
            </tr>
          </tbody>
          <tbody>
            <tr className="text-center">
              <td id="turno">14:00-16:15</td>
              {this.state.Tercero.find(elemento => elemento.Dia==='Lunes')? this.state.Tercero.filter(elemento => elemento.Dia === 'Lunes').map(elemento => {
                  if(elemento.Dia==='Lunes'){
                    return <td key= {elemento._id}>{elemento.Materia}<br />{elemento.Aula}<br />
                    <button className="btn btn-danger" onClick={()=>{this.seleccionarAula(elemento); this.setState({modalEliminar: true})}}><FontAwesomeIcon icon={faTrashAlt}/></button></td>
                  }
                }): <td>Vacio</td>}

                {this.state.Tercero.find(elemento => elemento.Dia==='Martes')? this.state.Tercero.filter(elemento => elemento.Dia === 'Martes').map(elemento => {
                  if(elemento.Dia==='Martes'){
                    return <td key= {elemento._id}>{elemento.Materia}<br />{elemento.Aula}<br />
                    <button className="btn btn-danger" onClick={()=>{this.seleccionarAula(elemento); this.setState({modalEliminar: true})}}><FontAwesomeIcon icon={faTrashAlt}/></button></td>
                  }
                }): <td>Vacio</td>}

                {this.state.Tercero.find(elemento => elemento.Dia==='Miercoles')? this.state.Tercero.filter(elemento => elemento.Dia === 'Miercoles').map(elemento => {
                  if(elemento.Dia==='Miercoles'){
                    return <td key= {elemento._id}>{elemento.Materia}<br />{elemento.Aula}<br />
                    <button className="btn btn-danger" onClick={()=>{this.seleccionarAula(elemento); this.setState({modalEliminar: true})}}><FontAwesomeIcon icon={faTrashAlt}/></button></td>
                  }
                }): <td>Vacio</td>}

                {this.state.Tercero.find(elemento => elemento.Dia==='Jueves')? this.state.Tercero.filter(elemento => elemento.Dia === 'Jueves').map(elemento => {
                  if(elemento.Dia==='Jueves'){
                    return <td key= {elemento._id}>{elemento.Materia}<br />{elemento.Aula}<br />
                    <button className="btn btn-danger" onClick={()=>{this.seleccionarAula(elemento); this.setState({modalEliminar: true})}}><FontAwesomeIcon icon={faTrashAlt}/></button></td>
                  }
                }): <td>Vacio</td>}

                {this.state.Tercero.find(elemento => elemento.Dia==='Viernes')? this.state.Tercero.filter(elemento => elemento.Dia === 'Viernes').map(elemento => {
                  if(elemento.Dia==='Viernes'){
                    return <td key= {elemento._id}>{elemento.Materia}<br />{elemento.Aula}<br />
                    <button className="btn btn-danger" onClick={()=>{this.seleccionarAula(elemento); this.setState({modalEliminar: true})}}><FontAwesomeIcon icon={faTrashAlt}/></button></td>
                  }
                }): <td>Vacio</td>}

                {this.state.Tercero.find(elemento => elemento.Dia==='Sabado')? this.state.Tercero.filter(elemento => elemento.Dia === 'Sabado').map(elemento => {
                  if(elemento.Dia==='Sabado'){
                    return <td key= {elemento._id}>{elemento.Materia}<br />{elemento.Aula}<br />
                    <button className="btn btn-danger" onClick={()=>{this.seleccionarAula(elemento); this.setState({modalEliminar: true})}}><FontAwesomeIcon icon={faTrashAlt}/></button></td>
                  }
                }): <td>Vacio</td>}
            </tr>
          </tbody>
          <tbody>
            <tr className="text-center">
              <td id="turno">16:15-18:30</td>
              {this.state.Cuarto.find(elemento => elemento.Dia==='Lunes')? this.state.Cuarto.filter(elemento => elemento.Dia === 'Lunes').map(elemento => {
                  if(elemento.Dia==='Lunes'){
                    return <td key= {elemento._id}>{elemento.Materia}<br />{elemento.Aula}<br />
                    <button className="btn btn-danger" onClick={()=>{this.seleccionarAula(elemento); this.setState({modalEliminar: true})}}><FontAwesomeIcon icon={faTrashAlt}/></button></td>
                  }
                }): <td>Vacio</td>}

                {this.state.Cuarto.find(elemento => elemento.Dia==='Martes')? this.state.Cuarto.filter(elemento => elemento.Dia === 'Martes').map(elemento => {
                  if(elemento.Dia==='Martes'){
                    return <td key= {elemento._id}>{elemento.Materia}<br />{elemento.Aula}<br />
                    <button className="btn btn-danger" onClick={()=>{this.seleccionarAula(elemento); this.setState({modalEliminar: true})}}><FontAwesomeIcon icon={faTrashAlt}/></button></td>
                  }
                }): <td>Vacio</td>}

                {this.state.Cuarto.find(elemento => elemento.Dia==='Miercoles')? this.state.Cuarto.filter(elemento => elemento.Dia === 'Miercoles').map(elemento => {
                  if(elemento.Dia==='Miercoles'){
                    return <td key= {elemento._id}>{elemento.Materia}<br />{elemento.Aula}<br />
                    <button className="btn btn-danger" onClick={()=>{this.seleccionarAula(elemento); this.setState({modalEliminar: true})}}><FontAwesomeIcon icon={faTrashAlt}/></button></td>
                  }
                }): <td>Vacio</td>}

                {this.state.Cuarto.find(elemento => elemento.Dia==='Jueves')? this.state.Cuarto.filter(elemento => elemento.Dia === 'Jueves').map(elemento => {
                  if(elemento.Dia==='Jueves'){
                    return <td key= {elemento._id}>{elemento.Materia}<br />{elemento.Aula}<br />
                    <button className="btn btn-danger" onClick={()=>{this.seleccionarAula(elemento); this.setState({modalEliminar: true})}}><FontAwesomeIcon icon={faTrashAlt}/></button></td>
                  }
                }): <td>Vacio</td>}

                {this.state.Cuarto.find(elemento => elemento.Dia==='Viernes')? this.state.Cuarto.filter(elemento => elemento.Dia === 'Viernes').forEa(elemento => {
                  if(elemento.Dia==='Viernes'){
                    return <td key= {elemento._id}>{elemento.Materia}<br />{elemento.Aula}<br />
                    <button className="btn btn-danger" onClick={()=>{this.seleccionarAula(elemento); this.setState({modalEliminar: true})}}><FontAwesomeIcon icon={faTrashAlt}/></button></td>
                  }
                }): <td>Vacio</td>}

                {this.state.Cuarto.find(elemento => elemento.Dia==='Sabado')? this.state.Cuarto.filter(elemento => elemento.Dia === 'Sabado').map(elemento => {
                  if(elemento.Dia==='Sabado'){
                    return <td key= {elemento._id}>{elemento.Materia}<br />{elemento.Aula}<br />
                    <button className="btn btn-danger" onClick={()=>{this.seleccionarAula(elemento); this.setState({modalEliminar: true})}}><FontAwesomeIcon icon={faTrashAlt}/></button></td>
                  }
                }): <td>Vacio</td>}
            </tr>
          </tbody>
          <tbody>
            <tr className="text-center">
              <td id="turno">18:30-20:00</td>
              {this.state.Quinto.find(elemento => elemento.Dia==='Lunes')? this.state.Quinto.filter(elemento => elemento.Dia === 'Lunes').map(elemento => {
                  if(elemento.Dia==='Lunes'){
                    return <td key= {elemento._id}>{elemento.Materia}<br />{elemento.Aula}<br />
                    <button className="btn btn-danger" onClick={()=>{this.seleccionarAula(elemento); this.setState({modalEliminar: true})}}><FontAwesomeIcon icon={faTrashAlt}/></button></td>
                  }
                }): <td>Vacio</td>}

                {this.state.Quinto.find(elemento => elemento.Dia==='Martes')? this.state.Quinto.filter(elemento => elemento.Dia === 'Martes').map(elemento => {
                  if(elemento.Dia==='Martes'){
                    return <td key= {elemento._id}>{elemento.Materia}<br />{elemento.Aula}<br />
                    <button className="btn btn-danger" onClick={()=>{this.seleccionarAula(elemento); this.setState({modalEliminar: true})}}><FontAwesomeIcon icon={faTrashAlt}/></button></td>
                  }
                }): <td>Vacio</td>}

                {this.state.Quinto.find(elemento => elemento.Dia==='Miercoles')? this.state.Quinto.filter(elemento => elemento.Dia === 'Miercoles').map(elemento => {
                  if(elemento.Dia==='Miercoles'){
                    return <td key= {elemento._id}>{elemento.Materia}<br />{elemento.Aula}<br />
                    <button className="btn btn-danger" onClick={()=>{this.seleccionarAula(elemento); this.setState({modalEliminar: true})}}><FontAwesomeIcon icon={faTrashAlt}/></button></td>
                  }
                }): <td>Vacio</td>}

                {this.state.Quinto.find(elemento => elemento.Dia==='Jueves')? this.state.Quinto.filter(elemento => elemento.Dia === 'Jueves').map(elemento => {
                  if(elemento.Dia==='Jueves'){
                    return <td key= {elemento._id}>{elemento.Materia}<br />{elemento.Aula}<br />
                    <button className="btn btn-danger" onClick={()=>{this.seleccionarAula(elemento); this.setState({modalEliminar: true})}}><FontAwesomeIcon icon={faTrashAlt}/></button></td>
                  }
                }): <td>Vacio</td>}

                {this.state.Quinto.find(elemento => elemento.Dia==='Viernes')? this.state.Quinto.filter(elemento => elemento.Dia === 'Viernes').map(elemento => {
                  if(elemento.Dia==='Viernes'){
                    return <td key= {elemento._id}>{elemento.Materia}<br />{elemento.Aula}<br />
                    <button className="btn btn-danger" onClick={()=>{this.seleccionarAula(elemento); this.setState({modalEliminar: true})}}><FontAwesomeIcon icon={faTrashAlt}/></button></td>
                  }
                }): <td>Vacio</td>}

                {this.state.Quinto.find(elemento => elemento.Dia==='Sabado')? this.state.Quinto.filter(elemento => elemento.Dia === 'Sabado').map(elemento => {
                  if(elemento.Dia==='Sabado'){
                    return <td key= {elemento._id}>{elemento.Materia}<br />{elemento.Aula}<br />
                    <button className="btn btn-danger" onClick={()=>{this.seleccionarAula(elemento); this.setState({modalEliminar: true})}}><FontAwesomeIcon icon={faTrashAlt}/></button></td>
                  }
                }): <td>Vacio</td>}
            </tr>
          </tbody>
        </Table>

        <Modal isOpen={this.state.modalInsertar}>
        <ModalHeader style={{display: 'block'}}>
            <span style={{float: 'right'}} onClick={()=>this.modalInsertar()}>x</span>
        </ModalHeader>
        <ModalBody>
            <div className="form-group">
              <label htmlFor="Dia">Dia</label>
              <select name="Dia" className="form-select" id="TipoSala" onChange={this.handleChange}>
              <option >Seleccionar Dia...</option>
                <option value='Lunes'>Lunes</option>
                <option value='Martes'>Martes</option>
                <option value='Miercoles'>Miercoles</option>
                <option value='Jueves'>Jueves</option>
                <option value='Viernes'>Viernes</option>
                <option value='Sabado'>Sabado</option>
              </select>
              <br/>
              <label htmlFor="Materia">Materia</label>
              <select name="Materia" className="form-select" id="Materia" onChange={this.handleChange}>
                <option>Selecionar Materia...</option>
                {this.state.Materias.filter(elemento => elemento.Semestre === this.click()).map(elemento => (
                <option key={elemento._id} value={elemento._Nombre}>{elemento.Nombre} ({elemento.Sigla})</option>
                )
                )}
                </select>
                <br/>
              <label htmlFor="Docente">Docente</label>
              <select name="Docente" className="form-select" id="Docente" onChange={this.handleChange}>
                <option>Selecionar Docente...</option>
                {this.state.Docentes.map(elemento => (
                <option key={elemento._id} value={elemento.RU}>{elemento.Nombre} {elemento.Ap_Paterno} {elemento.Ap_Materno}</option>
                )
                )}
                </select>
                <br/>
                <label htmlFor="Aula">Aula</label>
              <select name="Aula" className="form-select" id="Aula" onChange={this.handleChange}>
                <option>Selecionar Aula...</option>
                {this.state.Aulas.map(elemento => (
                <option key={elemento._id} value={elemento._Nombre}>{elemento.Nombre} ({elemento.TipoSala})</option>
                )
                )}
                </select>
                <br/>
                <label htmlFor="Turno">Turno</label>
              <select name="Turno" className="form-select" id="Turno" onChange={this.handleChange}>
                <option>Selecionar Turno...</option>
                <option value='PRIMER TURNO'>PRIMER TURNO</option>
                <option value='SEGUNDO TURNO'>SEGUNDO TURNO</option>
                <option value='TERCER TURNO'>TERCER TURNO</option>
                <option value='CUARTO TURNO'>CUARTO TURNO</option>
                <option value='QUINTO TURNO'>QUINTO TURNO</option>
                </select>
            </div>
        </ModalBody>
        <ModalFooter>
                      {this.state.tipoModal==='insertar'?
                        <button className="btn btn-dark" onClick={()=>this.verificar()}>
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
                   ¿Estás seguro que deseas eliminar esta Clase?
                </ModalBody>
                <ModalFooter>
                  <button className="btn btn-danger" onClick={()=>this.actDias()}>Sí</button>
                  <button className="btn btn-secundary" onClick={()=>this.setState({modalEliminar: false})}>No</button>
                </ModalFooter>
              </Modal>

              <Modal isOpen={this.state.modalVerDisponibilidad} centered fullscreen="" size="xl">
                <ModalHeader>
                  <h2>Ver Disponibilidad</h2>
                </ModalHeader>
                <ModalBody>
                   <VerDisponibilidad RU={this.state.form?.Docente}/>
                </ModalBody>
                <ModalFooter>
                  <button className="btn btn-secundary" onClick={()=>this.setState({modalVerDisponibilidad: false})}>Cerrar</button>
                </ModalFooter>
              </Modal>

      </div>
    );
  }
}
export default Horario;