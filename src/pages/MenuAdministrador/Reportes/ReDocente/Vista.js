import React from 'react'
import "./css/Vista.css"
export const Vista = ({docentes}) => {
    return (
        <div>
            <table className="table table-fixed text-center container separate">
          <thead className="row">
            <tr>
              <th className="Segunda">RU</th>
              <th className="Segunda">Nombres</th>
              <th className="Segunda">Apellido Paterno</th>
              <th className="Segunda">Apellido Materno</th>
              <th className="Segunda">Correo Electronico</th>
              <th className="Segunda">Telefono</th>
            </tr>
          </thead>
          <tbody>
            {docentes?.map((usuario) => {
                return (
                  <tr key={usuario._id}>
                    <td className="Segunda">{usuario.RU}</td>
                    <td className="Segunda">{usuario.Nombre}</td>
                    <td className="Segunda">{usuario.Ap_Paterno}</td>
                    <td className="Segunda">{usuario.Ap_Materno}</td>
                    <td className="Segunda">{usuario.Email}</td>
                    <td className="Segunda">{usuario.Telefono}</td>
                  </tr>
                );
              })}
          </tbody>
        </table>
        </div>
    )
}
