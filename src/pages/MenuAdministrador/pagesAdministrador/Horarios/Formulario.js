import React from 'react'

const Formulario = (props) => {
    return (
        <>
        <div className="form-group">
        {props.error?.includes("vacios") && <div id="alertHelp">{props.error}</div>}
              <label htmlFor="Dia">Dia</label>
              <select name="Dia" className="form-select" id="TipoSala" onChange={props.onChange}>
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
              <select name="Materia" className="form-select" id="Materia" onChange={props.onChange}>
                <option>Seleccionar Materia...</option>
                {props.materias.filter(elemento => elemento.Semestre === props.click()).map(elemento => (
                <option key={elemento._id} value={elemento._Nombre}>{elemento.Nombre} ({elemento.Sigla})</option>
                )
                )}
                </select>
                <br/>
              <label htmlFor="Docente">Docente</label>
              <select name="Docente" className="form-select" id="Docente" onChange={props.onChange}>
                <option>Seleccionar Docente...</option>
                {props.docentes.map(elemento => (
                <option key={elemento._id} value={elemento._id}>{elemento.Nombre} {elemento.Ap_Paterno} {elemento.Ap_Materno}</option>
                )
                )}
                </select>
                <br/>
                <label htmlFor="Aula">Aula</label>
              <select name="Aula" className="form-select" id="Aula" onChange={props.onChange}>
                <option>Seleccionar Aula...</option>
                {props.aulas.map(elemento => (
                <option key={elemento._id} value={elemento._Nombre}>{elemento.Nombre} ({elemento.TipoSala})</option>
                )
                )}
                </select>
                <br/>
                <label htmlFor="Turno">Turno</label>
              <select name="Turno" className="form-select" id="Turno" onChange={props.onChange}>
                <option>Seleccionar Turno...</option>
                <option value='PRIMER TURNO'>PRIMER TURNO</option>
                <option value='SEGUNDO TURNO'>SEGUNDO TURNO</option>
                <option value='TERCER TURNO'>TERCER TURNO</option>
                <option value='CUARTO TURNO'>CUARTO TURNO</option>
                <option value='QUINTO TURNO'>QUINTO TURNO</option>
                </select>
            </div>
            
        </>
    )
}
export default Formulario;