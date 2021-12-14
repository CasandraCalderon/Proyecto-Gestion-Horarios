import React from 'react'

const FormMateria = (props) => {
    return (
        <>
            <div className="form-group">
            {props.error?.includes("vacios") && <div id="alertHelp" className="form-text">{props.error}</div>}
                      <label htmlFor="Nombre">Nombre</label>
                        <input className="form-control" type="text" name="Nombre" id="Nombre" onChange={props.handleChange} value={props.form?props.form.Nombre: ''}/>
                        {props.error?.includes("nombre")? <div id="emailHelp" className="form-text text-danger">{props.error}</div> : <br/> }
                        <label htmlFor="Sigla">Sigla</label>
                        <input className="form-control" type="text" name="Sigla" id="Sigla" onChange={props.handleChange} value={props.form?props.form.Sigla: ''}/>
                        {props.error?.includes("sigla")? <div id="emailHelp" className="form-text text-danger">{props.error}</div> : <br/> }
                        <label htmlFor="Semestre">Semestre</label>
                        <select name="Semestre" className="form-select" id="Semestre" onChange={props.handleChange}>
                          <option>Seleccionar semestre...</option>
                          <option value="PRIMERO">PRIMER SEMESTRE</option>
                          <option value="SEGUNDO">SEGUNDO SEMESTRE</option>
                          <option value="TERCERO">TERCER SEMESTRE</option>
                          <option value="CUARTO">CUARTO SEMESTRE</option>
                          <option value="QUINTO">QUINTO SEMESTRE</option>
                          <option value="SEXTO">SEXTO SEMESTRE</option>
                          <option value="SEPTIMO">SEPTIMO SEMESTRE</option>
                          <option value="OCTAVO">OCTAVO SEMESTRE</option>
                        </select>
                        <br />
                        <label htmlFor="CantHSemanas">Cantidad de horas a la semanas</label>
                        <input className="form-control" type="number" name="CantHSemanas" id="CantHSemanas" onChange={props.handleChange} value={props.form?props.form.CantHSemanas:''}/>
                        <br />
                      </div>
        </>
    )
}
export default FormMateria;