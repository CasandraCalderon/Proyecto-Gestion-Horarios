import React from "react";
import "../../../../css/Horario.css"
import { Table } from "react-bootstrap";
import { Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import Swal from 'sweetalert2'
import axios from "axios";
import PresentCard from "../../../PresentCard/PresentCard";
import VerDisponibilidad from "./VerDisponibilidad";
import Turno from "./Turno";
import Formulario from "./Formulario";

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

    seleccionarAula= (aula)=>{
      this.setState({
        tipoModal: 'actualizar',
        form: {
          _id: aula?._id,
          Dia: aula?.Dia,
          Materia: aula?.Materia,
          Docente: aula?.Docente,
          Aula: aula?.Aula,
          Turno: aula?.Turno,
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

      actDias =async()=> {
        console.log(this.state.form)
        await this.state.form.Turno === "PRIMER TURNO"? this.state.Docentes.filter(elemento => elemento.RU === this.state.form.Docente).forEach(elemento =>{
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
          <Turno Turno = {this.state.Primero} Hora = "07:45-10:00" seleccionar={this.seleccionarAula} eliminar= {()=>this.setState({modalEliminar: true})}/>
          <Turno Turno = {this.state.Segundo} Hora = "10:00-12:15" seleccionar={this.seleccionarAula} eliminar= {()=>this.setState({modalEliminar: true})}/>
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
          <Turno Turno = {this.state.Tercero} Hora = "14:00-16:15" seleccionar={this.seleccionarAula} eliminar= {()=>this.setState({modalEliminar: true})}/>
          <Turno Turno = {this.state.Cuarto} Hora = "16:15-18:30" seleccionar={this.seleccionarAula} eliminar= {()=>this.setState({modalEliminar: true})}/>
          <Turno Turno = {this.state.Quinto} Hora = "18:30-20:00" seleccionar={this.seleccionarAula} eliminar= {()=>this.setState({modalEliminar: true})}/>
        </Table>

        <Modal isOpen={this.state.modalInsertar}>
        <ModalHeader style={{display: 'block'}}>
            <span style={{float: 'right'}} onClick={()=>this.modalInsertar()}>x</span>
        </ModalHeader>
        <ModalBody>
          <Formulario onChange = {this.handleChange} materias={this.state.Materias} docentes={this.state.Docentes} aulas={this.state.Aulas} click={this.click}/>
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