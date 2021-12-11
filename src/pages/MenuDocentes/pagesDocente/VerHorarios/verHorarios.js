import React from 'react'
import { Table } from "react-bootstrap";
import PresentCard from '../../../PresentCard/PresentCard';
import TablaHorario from './TablaHorario';
import axios from "axios";
import Cookies from "universal-cookie";
const cookies = new Cookies();
const url1= "http://localhost:8000/api/primeroS"
const url2= "http://localhost:8000/api/segundoS"
const url3= "http://localhost:8000/api/terceroS"
class VerHorarios extends React.Component {
    state = {
        data1: [],
        data2: [],
        data3: [],
        Primero : [],
        Segundo : [],
        Tercero : [],
        Cuarto : [],
        Quinto : []
      };

      componentDidMount() {
        this.peticionGet();
      }

      peticionGet=()=>{
        axios.get(url1).then(response=>{
          this.setState({data1: response.data.filter(e => e.Docente === cookies.get("RU"))});
          this.setState({Primero: [...this.state.Primero, ...this.state.data1.filter(e => e.Turno === "PRIMER TURNO")]})
          this.setState({Segundo: [...this.state.Segundo, ...this.state.data1.filter(e => e.Turno === "SEGUNDO TURNO")]})
          this.setState({Tercero: [...this.state.Tercero, ...this.state.data1.filter(e => e.Turno === "TERCER TURNO")]})
          this.setState({Cuarto: [...this.state.Cuarto, ...this.state.data1.filter(e => e.Turno === "CUARTO TURNO")]})
          this.setState({Quinto: [...this.state.Quinto, ...this.state.data1.filter(e => e.Turno === "QUINTO TURNO")]})
        }).catch(error=>{
          console.log(error.message);
        })
        axios.get(url2).then(response=>{
          this.setState({data2: response.data.filter(e => e.Docente === cookies.get("RU"))});
          this.setState({Primero: [...this.state.Primero, ...this.state.data2.filter(e => e.Turno === "PRIMER TURNO")]})
          this.setState({Segundo: [...this.state.Segundo, ...this.state.data2.filter(e => e.Turno === "SEGUNDO TURNO")]})
          this.setState({Tercero: [...this.state.Tercero, ...this.state.data2.filter(e => e.Turno === "TERCER TURNO")]})
          this.setState({Cuarto: [...this.state.Cuarto, ...this.state.data2.filter(e => e.Turno === "CUARTO TURNO")]})
          this.setState({Quinto: [...this.state.Quinto, ...this.state.data2.filter(e => e.Turno === "QUINTO TURNO")]})
        }).catch(error=>{
          console.log(error.message);
        })
        axios.get(url3).then(response=>{
            this.setState({data3: response.data.filter(e => e.Docente === cookies.get("RU"))});
            this.setState({Primero: [...this.state.Primero, ...this.state.data3.filter(e => e.Turno === "PRIMER TURNO")]})
            this.setState({Segundo: [...this.state.Segundo, ...this.state.data3.filter(e => e.Turno === "SEGUNDO TURNO")]})
            this.setState({Tercero: [...this.state.Tercero, ...this.state.data3.filter(e => e.Turno === "TERCER TURNO")]})
            this.setState({Cuarto: [...this.state.Cuarto, ...this.state.data3.filter(e => e.Turno === "CUARTO TURNO")]})
            this.setState({Quinto: [...this.state.Quinto, ...this.state.data3.filter(e => e.Turno === "QUINTO TURNO")]})
          }).catch(error=>{
            console.log(error.message);
          })
        }

    render() {
        return (
            <div id="fondoH">
                <PresentCard />
                <br/>
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
export default VerHorarios;