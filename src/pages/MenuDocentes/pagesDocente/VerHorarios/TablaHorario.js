import React from 'react'

const TablaHorario = (props) => {
    return (
        <>
            <tbody>
            <tr className="text-center">
              <td id="turno">{props.Hora}</td>
                {props.Turno.find(elemento => elemento.Dia==='Lunes')? props.Turno.filter(elemento => elemento.Dia === 'Lunes').map(elemento => {
                  if(elemento.Dia==='Lunes'){
                    return <td key= {elemento._id}>{elemento.Materia}<br />{elemento.Aula}<br />
                    </td>
                  }
                }): <td>Vacio</td>}

                {props.Turno.find(elemento => elemento.Dia==='Martes')? props.Turno.filter(elemento => elemento.Dia === 'Martes').map(elemento => {
                  if(elemento.Dia==='Martes'){
                    return <td key= {elemento._id}>{elemento.Materia}<br />{elemento.Aula}<br />
                   </td>
                  }
                }): <td>Vacio</td>}

                {props.Turno.find(elemento => elemento.Dia==='Miercoles')? props.Turno.filter(elemento => elemento.Dia === 'Miercoles').map(elemento => {
                  if(elemento.Dia==='Miercoles'){
                    return <td key= {elemento._id}>{elemento.Materia}<br />{elemento.Aula}<br />
                    </td>
                  }
                }): <td>Vacio</td>}

                {props.Turno.find(elemento => elemento.Dia==='Jueves')? props.Turno.filter(elemento => elemento.Dia === 'Jueves').map(elemento => {
                  if(elemento.Dia==='Jueves'){
                    return <td key= {elemento._id}>{elemento.Materia}<br />{elemento.Aula}<br />
                    </td>
                  }
                }): <td>Vacio</td>}

                {props.Turno.find(elemento => elemento.Dia==='Viernes')? props.Turno.filter(elemento => elemento.Dia === 'Viernes').map(elemento => {
                  if(elemento.Dia==='Viernes'){
                    return <td key= {elemento._id}>{elemento.Materia}<br />{elemento.Aula}<br />
                    </td>
                  }
                }): <td>Vacio</td>}

                {props.Turno.find(elemento => elemento.Dia==='Sabado')? props.Turno.filter(elemento => elemento.Dia === 'Sabado').map(elemento => {
                  if(elemento.Dia==='Sabado'){
                    return <td key= {elemento._id}>{elemento.Materia}<br />{elemento.Aula}<br />
                    </td>
                  }
                }): <td>Vacio</td>}
              
            </tr>
          </tbody>
        </>
    )
}
export default TablaHorario;
