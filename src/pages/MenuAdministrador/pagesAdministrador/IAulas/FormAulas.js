import React from 'react'

const FormAulas = (props) => {
    return (
        <>
            <div className="form-group">
            {props.error?.includes("vacios") && <div id="alertHelp" className="form-text">{props.error}</div>}
                        <label htmlFor="Nombre">Nombre</label>
                        <input className="form-control" type="text" name="Nombre" id="Nombre" onChange={props.handleChange} value={props.form?props.form.Nombre: ''}/>
                        {props.error?.includes("ambiente")? <div id="emailHelp" className="form-text text-danger">{props.error}</div> : <br/> }
                        <label htmlFor="Piso">Planta</label>
                        <select name="Piso" className="form-select" id="Piso" onChange={props.handleChange}>
                          <option>Seleccionar planta...</option>
                          <option>PLANTA BAJA</option>
                          <option>PRIMER PISO</option>
                          <option>SEGUNDO PISO</option>
                          <option>TERCER PISO</option>
                          <option>CUARTO PISO</option>
                        </select>
                        <br />
                        <label htmlFor="TipoSala">Salon</label>
                        <select name="TipoSala" className="form-select" id="TipoSala" onChange={props.handleChange}>
                          <option>Seleccionar tipo de salon...</option>
                          <option>SALA NORMAL</option>
                          <option>LABORATORIO</option>
                          <option>SALA DE COMPUTACION</option>
                        </select>
                        <br />
                        <label htmlFor="Capacidad">Capacidad</label>
                        <input className="form-control" type="number" name="Capacidad" id="Capacidad" onChange={props.handleChange} value={props.form?props.form.Capacidad:''}/>
                        <br />
                      </div>
        </>
    )
}
export default FormAulas;
