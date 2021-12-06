import React from 'react'

export const verDisponibilidad = (props) => {
    return (
        <div>
            {this.state.data.filter(docente => docente.RU === props.RU).map(usuario=>{
              return(
                  <div key={usuario._id}>
                {usuario.Disponibilidad.length === 0? <button className="btn btn-dark" onClick={()=>{this.seleccionarUsuario(usuario); this.modalInsertar()}}>Modificar Disponibilidad</button> :
                <button className="btn btn-dark" disabled>Modificar Disponibilidad</button>}
                  <br /> <br />       
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
                    <th scope="row" className="text-center">7:45-10:00</th>
                    <td id={(usuario.Disponibilidad || []).includes('1Lunes')? "Disponible" : "NoDisponible"}>Primer Turno</td>
                    <td id={(usuario.Disponibilidad || []).includes('1Martes')? "Disponible" : "NoDisponible"}>Primer Turno</td>
                    <td id={(usuario.Disponibilidad || []).includes('1Miercoles')? "Disponible" : "NoDisponible"}>Primer Turno</td> 
                    <td id={(usuario.Disponibilidad || []).includes('1Jueves')? "Disponible" : "NoDisponible"}>Primer Turno</td> 
                    <td id={(usuario.Disponibilidad || []).includes('1Viernes')? "Disponible" : "NoDisponible"}>Primer Turno</td> 
                    <td id={(usuario.Disponibilidad || []).includes('1Sabado')? "Disponible" : "NoDisponible"}>Primer Turno</td>     
                </tr>
                <tr>
                    <th scope="row" className="text-center">10:00-12:15</th>
                    <td id={(usuario.Disponibilidad || []).includes('2Lunes')? "Disponible" : "NoDisponible"}>Segundo Turno</td>
                    <td id={(usuario.Disponibilidad || []).includes('2Martes')? "Disponible" : "NoDisponible"}>Segundo Turno</td>
                    <td id={(usuario.Disponibilidad || []).includes('2Miercoles')? "Disponible" : "NoDisponible"}>Segundo Turno</td> 
                    <td id={(usuario.Disponibilidad || []).includes('2Jueves')? "Disponible" : "NoDisponible"}>Segundo Turno</td> 
                    <td id={(usuario.Disponibilidad || []).includes('2Viernes')? "Disponible" : "NoDisponible"}>Segundo Turno</td> 
                    <td id={(usuario.Disponibilidad || []).includes('2Sabado')? "Disponible" : "NoDisponible"}>Segundo Turno</td>     
                </tr>
                <tr className= "text-center" id="Receso">
                    <th scope="row">12:15-14:00</th>
                    <td>RECESO</td>
                    <td>RECESO</td>
                    <td>RECESO</td>
                    <td>RECESO</td>
                    <td>RECESO</td>
                    <td>RECESO</td>
                </tr>
                <tr>
                    <th scope="row" className="text-center">14:00-16:15</th>
                    <td id={(usuario.Disponibilidad || []).includes('3Lunes')? "Disponible" : "NoDisponible"}>Tercer Turno</td>
                    <td id={(usuario.Disponibilidad || []).includes('3Martes')? "Disponible" : "NoDisponible"}>Tercer Turno</td>
                    <td id={(usuario.Disponibilidad|| []).includes('3Miercoles')? "Disponible" : "NoDisponible"}>Tercer Turno</td> 
                    <td id={(usuario.Disponibilidad || []).includes('3Jueves')? "Disponible" : "NoDisponible"}>Tercer Turno</td> 
                    <td id={(usuario.Disponibilidad || []).includes('3Viernes')? "Disponible" : "NoDisponible"}>Tercer Turno</td> 
                    <td id={(usuario.Disponibilidad || []).includes('3Sabado')? "Disponible" : "NoDisponible"}>Tercer Turno</td>     
                </tr>
                <tr>
                    <th scope="row" className="text-center">16:15-18:30</th>
                    <td id={(usuario.Disponibilidad || []).includes('4Lunes')? "Disponible" : "NoDisponible"}>Cuarto Turno</td>
                    <td id={(usuario.Disponibilidad || []).includes('4Martes')? "Disponible" : "NoDisponible"}>Cuarto Turno</td>
                    <td id={(usuario.Disponibilidad || []).includes('4Miercoles')? "Disponible" : "NoDisponible"}>Cuarto Turno</td> 
                    <td id={(usuario.Disponibilidad || []).includes('4Jueves')? "Disponible" : "NoDisponible"}>Cuarto Turno</td> 
                    <td id={(usuario.Disponibilidad || []).includes('4Viernes')? "Disponible" : "NoDisponible"}>Cuarto Turno</td> 
                    <td id={(usuario.Disponibilidad || []).includes('4Sabado')? "Disponible" : "NoDisponible"}>Cuarto Turno</td>     
                </tr>
                <tr>
                    <th scope="row" className="text-center">18:30-20:00</th>
                    <td id={(usuario.Disponibilidad || []).includes('5Lunes')? "Disponible" : "NoDisponible"}>Quinto Turno</td>
                    <td id={(usuario.Disponibilidad || []).includes('5Martes')? "Disponible" : "NoDisponible"}>Quinto Turno</td>
                    <td id={(usuario.Disponibilidad || []).includes('5Miercoles')? "Disponible" : "NoDisponible"}>Quinto Turno</td> 
                    <td id={(usuario.Disponibilidad || []).includes('5Jueves')? "Disponible" : "NoDisponible"}>Quinto Turno</td> 
                    <td id={(usuario.Disponibilidad || []).includes('5Viernes')? "Disponible" : "NoDisponible"}>Quinto Turno</td> 
                    <td id={(usuario.Disponibilidad || []).includes('5Sabado')? "Disponible" : "NoDisponible"}>Quinto Turno</td>     
                </tr>

            </tbody>
                    </table>
                    </div>
            )
        })}
        </div>
    )
}
