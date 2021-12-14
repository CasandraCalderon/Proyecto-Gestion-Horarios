import React from 'react'
import PresentCard from '../../../PresentCard/PresentCard';
import "./Programacion.css"
import Cookies from "universal-cookie";
import axios from "axios";

const cookies = new Cookies();

const url = "http://localhost:8000/api/estudiante";
const urlMaterias = "http://localhost:8000/api/materia"
const urlDocentes = "http://localhost:8000/api/docente"
class Programacion extends React.Component {
  state = {
    data: [],
    horario: [],
    materias: [],
    docentes: []
  };
  componentDidMount() {
    this.peticionGet();
  }
  peticionGet= ()=>{
    axios.get(url).then(response=>{
      this.setState({data: response.data.filter(e => e._id === cookies.get("_id"))});
      this.peticionGetMaterias();
    }).catch(error=>{
      console.log(error.message);
    })
    axios.get(urlDocentes).then(response=>{
      this.setState({docentes: response.data});
    }).catch(error=>{
      console.log(error.message);
    })
    }
    peticionGetMaterias=()=>{
      axios.get(urlMaterias).then(response=>{
          this.setState({materias: response.data.filter(e=> e.Semestre === this.state.data[0].Semestre)});
        }).catch(error=>{
          console.log(error.message);
        })
        axios.get(`http://localhost:8000/api/${this.state.data[0]?.Semestre}S`).then(response=>{
          this.setState({horario: response.data});
        }).catch(error=>{
          console.log(error.message);
        })
  }
  render() {
    return (
      <div id="Programacion">
        <PresentCard />
        <table class="table table-striped text-center container">
    <thead>
      <tr>
        <th scope="col">Materia</th>
        <th scope="col">Sigla</th>
        <th scope="col">Docente</th>
      </tr>
    </thead>
    <tbody>
            {this.state.materias
              .map(materia=>{
                
                return(
                    <tr key={materia._id}>
                        <td >{materia.Nombre}</td>
                        <td >{materia.Sigla}</td>
                        {this.state.horario.find(e => e.Materia.includes(materia.Sigla))? this.state.horario.filter(e => e.Materia.includes(materia.Sigla)).forEach(e => 
                          <td >{e.Docente}</td>
                        ) : <td >No asignado</td>}
              </tr>
              )
            })}
          </tbody>
  </table>
      </div>
    )
  }
}
export default Programacion;