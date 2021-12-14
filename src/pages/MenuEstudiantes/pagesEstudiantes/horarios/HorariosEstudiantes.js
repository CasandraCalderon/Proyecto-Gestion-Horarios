import React from 'react'
import { Table } from "react-bootstrap";
import "./Horarios.css"
import TablaHorario from '../../../MenuDocentes/pagesDocente/verHorarios/TablaHorario';
import PresentCard from '../../../PresentCard/PresentCard';
import axios from "axios";
import Cookies from "universal-cookie";
const cookies = new Cookies();
const url = "http://localhost:8000/api/estudiante";

class HorariosEstudiantes extends React.Component {
    state = {
        data: [],
        horario: [],
        Primero : [],
        Segundo : [],
        Tercero : [],
        Cuarto : [],
        Quinto : []
      };
      componentDidMount() {
        this.peticionGet();
      }
      peticionGet= ()=>{
        axios.get(url).then(response=>{
          this.setState({data: response.data.filter(e => e._id === cookies.get("_id"))});
          this.peticionGetHorarios();
        }).catch(error=>{
          console.log(error.message);
        })
        }

        peticionGetHorarios=()=>{
            axios.get(`http://localhost:8000/api/${this.state.data[0]?.Semestre}S`).then(response=>{
                this.setState({horario: response.data});
                this.setState({Primero: this.state.horario.filter(e => e.Turno === "PRIMER TURNO")})
                this.setState({Segundo: this.state.horario.filter(e => e.Turno === "SEGUNDO TURNO")})
                this.setState({Tercero: this.state.horario.filter(e => e.Turno === "TERCER TURNO")})
                this.setState({Cuarto: this.state.horario.filter(e => e.Turno === "CUARTO TURNO")})
                this.setState({Quinto: this.state.horario.filter(e => e.Turno === "QUINTO TURNO")})
              }).catch(error=>{
                console.log(error.message);
              })
        }
    render () {
    return (
        <div id="InicioVerHorarios">
            <PresentCard />
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
          <TablaHorario Turno={this.state.Primero} Hora="07:45-10:00"/>
          <TablaHorario Turno={this.state.Segundo} Hora="10:00-12:15"/>
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
          <TablaHorario Turno={this.state.Tercero} Hora="14:00-16:15"/>
          <TablaHorario Turno={this.state.Cuarto} Hora="16:15-18:30"/>
          <TablaHorario Turno={this.state.Quinto} Hora="18:30-20:00"/>
          
        </Table>
        </div>
    )
    }
}
export default HorariosEstudiantes;