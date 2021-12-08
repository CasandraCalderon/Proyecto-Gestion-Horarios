import React from "react";
import axios from "axios";

const baseDocentes = "http://localhost:8000/api/docente";

export default class VerDisponibilidad extends React.Component {
    state = {
        data: [],
        form: {
            _id: "",
            Nombre: "",
            Piso: "",
            TipoSala: "",
            Capacidad: "",
          },
    }
    peticionGet=()=>{
        axios.get(baseDocentes).then(response=>{
          this.setState({data: response.data});
        }).catch(error=>{
          console.log(error.message);
        })
        }
    componentDidMount() {
        this.peticionGet();
      }

    render() {
        let {RU} = this.props;
    return (
        <div>
            {this.state.data.filter(docente => docente.RU === RU).map(usuario=>{
              return(
                  <div key={usuario._id}>
                    <table className="table table-bordered container">
                        <thead className="thead-dark text-center">
                                <tr>
                                <th scope="col">Hora</th>
                                <th scope="col">Lunes</th>
                                <th scope="col">Martes</th>
                                <th scope="col">Miercoles</th>
                                <th scope="col">Jueves</th>
                                <th scope="col">Viernes</th>
                                <th scope="col">Sabado</th>
                                </tr>
                        </thead>
                        <tbody className= "text-center">
                <tr>
                    <th scope="row" className="text-center" id="turno">7:45-10:00</th>
                    <td id={(usuario.DisOcupada || []).includes('1Lunes')? "Ocupado" : (usuario.Disponibilidad || []).includes('1Lunes')? "Disponible" : "NoDisponible"}>Primer Turno</td>
                    <td id={(usuario.DisOcupada || []).includes('1Martes')? "Ocupado" : (usuario.Disponibilidad || []).includes('1Martes')? "Disponible" : "NoDisponible"}>Primer Turno</td>
                    <td id={(usuario.DisOcupada || []).includes('1Miercoles')? "Ocupado" : (usuario.Disponibilidad || []).includes('1Miercoles')? "Disponible" : "NoDisponible"}>Primer Turno</td>
                    <td id={(usuario.DisOcupada || []).includes('1Jueves')? "Ocupado" : (usuario.Disponibilidad || []).includes('1Jueves')? "Disponible" : "NoDisponible"}>Primer Turno</td>
                    <td id={(usuario.DisOcupada || []).includes('1Viernes')? "Ocupado" : (usuario.Disponibilidad || []).includes('1Viernes')? "Disponible" : "NoDisponible"}>Primer Turno</td>
                    <td id={(usuario.DisOcupada || []).includes('1Sabado')? "Ocupado" : (usuario.Disponibilidad || []).includes('1Sabado')? "Disponible" : "NoDisponible"}>Primer Turno</td>   
                </tr>
                <tr>
                    <th scope="row" className="text-center" id="turno">10:00-12:15</th>
                    <td id={(usuario.DisOcupada || []).includes('2Lunes')? "Ocupado" : (usuario.Disponibilidad || []).includes('2Lunes')? "Disponible" : "NoDisponible"}>Segundo Turno</td>
                    <td id={(usuario.DisOcupada || []).includes('2Martes')? "Ocupado" : (usuario.Disponibilidad || []).includes('2Martes')? "Disponible" : "NoDisponible"}>Segundo Turno</td>
                    <td id={(usuario.DisOcupada || []).includes('2Miercoles')? "Ocupado" : (usuario.Disponibilidad || []).includes('2Miercoles')? "Disponible" : "NoDisponible"}>Segundo Turno</td>
                    <td id={(usuario.DisOcupada || []).includes('2Jueves')? "Ocupado" : (usuario.Disponibilidad || []).includes('2Jueves')? "Disponible" : "NoDisponible"}>Segundo Turno</td>
                    <td id={(usuario.DisOcupada || []).includes('2Viernes')? "Ocupado" : (usuario.Disponibilidad || []).includes('2Viernes')? "Disponible" : "NoDisponible"}>Segundo Turno</td>
                    <td id={(usuario.DisOcupada || []).includes('2Sabado')? "Ocupado" : (usuario.Disponibilidad || []).includes('2Sabado')? "Disponible" : "NoDisponible"}>Segundo Turno</td>    
                </tr>
                <tr className= "text-center" id="Receso" >
                    <th scope="row" id="turno">12:15-14:00</th>
                    <td>RECESO</td>
                    <td>RECESO</td>
                    <td>RECESO</td>
                    <td>RECESO</td>
                    <td>RECESO</td>
                    <td>RECESO</td>
                </tr>
                <tr>
                    <th scope="row" className="text-center" id="turno">14:00-16:15</th>
                    <td id={(usuario.DisOcupada || []).includes('3Lunes')? "Ocupado" : (usuario.Disponibilidad || []).includes('3Lunes')? "Disponible" : "NoDisponible"}>Tercer Turno</td>
                    <td id={(usuario.DisOcupada || []).includes('3Martes')? "Ocupado" : (usuario.Disponibilidad || []).includes('3Martes')? "Disponible" : "NoDisponible"}>Tercer Turno</td>
                    <td id={(usuario.DisOcupada || []).includes('3Miercoles')? "Ocupado" : (usuario.Disponibilidad || []).includes('3Miercoles')? "Disponible" : "NoDisponible"}>Tercer Turno</td>
                    <td id={(usuario.DisOcupada || []).includes('3Jueves')? "Ocupado" : (usuario.Disponibilidad || []).includes('3Jueves')? "Disponible" : "NoDisponible"}>Tercer Turno</td>
                    <td id={(usuario.DisOcupada || []).includes('3Viernes')? "Ocupado" : (usuario.Disponibilidad || []).includes('3Viernes')? "Disponible" : "NoDisponible"}>Tercer Turno</td>
                    <td id={(usuario.DisOcupada || []).includes('3Sabado')? "Ocupado" : (usuario.Disponibilidad || []).includes('3Sabado')? "Disponible" : "NoDisponible"}>Tercer Turno</td>   
                </tr>
                <tr>
                    <th scope="row" className="text-center" id="turno">16:15-18:30</th>
                    <td id={(usuario.DisOcupada || []).includes('4Lunes')? "Ocupado" : (usuario.Disponibilidad || []).includes('4Lunes')? "Disponible" : "NoDisponible"}>Cuarto Turno</td>
                    <td id={(usuario.DisOcupada || []).includes('4Martes')? "Ocupado" : (usuario.Disponibilidad || []).includes('4Martes')? "Disponible" : "NoDisponible"}>Cuarto Turno</td>
                    <td id={(usuario.DisOcupada || []).includes('4Miercoles')? "Ocupado" : (usuario.Disponibilidad || []).includes('4Miercoles')? "Disponible" : "NoDisponible"}>Cuarto Turno</td>
                    <td id={(usuario.DisOcupada || []).includes('4Jueves')? "Ocupado" : (usuario.Disponibilidad || []).includes('4Jueves')? "Disponible" : "NoDisponible"}>Cuarto Turno</td>
                    <td id={(usuario.DisOcupada || []).includes('4Viernes')? "Ocupado" : (usuario.Disponibilidad || []).includes('4Viernes')? "Disponible" : "NoDisponible"}>Cuarto Turno</td>
                    <td id={(usuario.DisOcupada || []).includes('4Sabado')? "Ocupado" : (usuario.Disponibilidad || []).includes('4Sabado')? "Disponible" : "NoDisponible"}>Cuarto Turno</td>      
                </tr>
                <tr>
                    <th scope="row" className="text-center" id="turno">18:30-20:00</th>
                    <td id={(usuario.DisOcupada || []).includes('5Lunes')? "Ocupado" : (usuario.Disponibilidad || []).includes('5Lunes')? "Disponible" : "NoDisponible"}>Quinto Turno</td>
                    <td id={(usuario.DisOcupada || []).includes('5Martes')? "Ocupado" : (usuario.Disponibilidad || []).includes('5Martes')? "Disponible" : "NoDisponible"}>Quinto Turno</td>
                    <td id={(usuario.DisOcupada || []).includes('5Miercoles')? "Ocupado" : (usuario.Disponibilidad || []).includes('5Miercoles')? "Disponible" : "NoDisponible"}>Quinto Turno</td>
                    <td id={(usuario.DisOcupada || []).includes('5Jueves')? "Ocupado" : (usuario.Disponibilidad || []).includes('5Jueves')? "Disponible" : "NoDisponible"}>Quinto Turno</td>
                    <td id={(usuario.DisOcupada || []).includes('5Viernes')? "Ocupado" : (usuario.Disponibilidad || []).includes('5Viernes')? "Disponible" : "NoDisponible"}>Quinto Turno</td>
                    <td id={(usuario.DisOcupada || []).includes('5Sabado')? "Ocupado" : (usuario.Disponibilidad || []).includes('5Sabado')? "Disponible" : "NoDisponible"}>Quinto Turno</td>        
                </tr>

            </tbody>
                    </table>
                    </div>
            )
        })}
        </div>
    )
    }
}

