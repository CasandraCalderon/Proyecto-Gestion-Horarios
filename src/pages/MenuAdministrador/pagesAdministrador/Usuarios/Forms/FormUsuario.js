import React from 'react'


const FormUsuario = (props) => {

    
    return (
        <>
                    
                    <div>
                    {props.error?.includes("vacios") && <div id="alertHelp" className="form-text">{props.error}</div>}
                    <label htmlFor="RU">RU</label>
                    <input autocomplete="off" className="form-control" type="text" name="RU" id="RU" placeholder = "0000" onChange={props.handleChange} value={props.form?props.form.RU:''}/>
                    {props.error?.includes("RU")? <div id="emailHelp" className="form-text text-danger">{props.error}</div> : <br/> }
                    </div>
                    <div>
                    <label htmlFor="Nombre">Nombres</label>
                    <input autocomplete="off" className="form-control" type="text" name="Nombre" id="Nombre" onChange={props.handleChange} value={props.form?props.form.Nombre: ''}/>
                    <br/>
                    </div>
                    <div>
                    <label htmlFor="Ap_Paterno">Apellido Paterno</label>
                    <input autocomplete="off" className="form-control" type="text" name="Ap_Paterno" id="Ap_Paterno" onChange={props.handleChange} value={props.form?props.form.Ap_Paterno: ''}/>
                    <br/>
                    </div>
                    <div>
                    <label htmlFor="Ap_Materno">Apellido Materno</label>
                    <input autocomplete="off" className="form-control" type="text" name="Ap_Materno" id="Ap_Materno" onChange={props.handleChange} value={props.form?props.form.Ap_Materno: ''}/>
                    <br/>
                    </div>
                    <div>
                    <label htmlFor="CI">CI</label>
                    <input autocomplete="off" className="form-control" type="text" name="CI" id="CI" onChange={props.handleChange} value={props.form?props.form.CI:''}/>
                    {props.error?.includes("CI")? <div id="emailHelp" className="form-text text-danger">{props.error}</div> : <br/>}
                    </div>
                    <div>
                    <label htmlFor="Telefono">Telefono</label>
                    <input autocomplete="off" className="form-control" type="text" name="Telefono" id="Telefono" onChange={props.handleChange} value={props.form?props.form.Telefono:''}/>
                    {props.error?.includes("telefono")? <div id="emailHelp" className="form-text text-danger">{props.error}</div> :  <br/>}
                    </div>
                    <div>
                    <label htmlFor="Email">Correo Electronico</label>
                    <input autocomplete="off" className="form-control" type="text" name="Email" id="Email" placeholder = "example@example.com" onChange={props.handleChange} value={props.form?props.form.Email: ''}/>
                    {props.error?.includes("Correo")? <div id="emailHelp" className="form-text text-danger">{props.error}</div> : <br/> }
                    </div>
                  
        </>
    )
}
export default FormUsuario;
