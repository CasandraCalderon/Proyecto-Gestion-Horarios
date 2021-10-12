import React from 'react'
export const PresentCard = (props) => {
    return (
        <div className="card mb-3">
          <div className="row g-0">
            <div className="col-md-8">
              <div className="card-body">
                <h5 className="card-title"> {props.Nombre} {props.Apellidos} </h5>
                <p className="card-text">RU: {props.RU}</p>
                <p className="card-text">{props.Cargo}</p>
              </div>
            </div>
          </div>
        </div>
    )
}
