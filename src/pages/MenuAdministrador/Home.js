import React from 'react'

const Home = (props) => {
    let {Nombre, Apellidos, RU, Cargo} = props;
    return (
        <div className="card mb-3">
          <div className="row g-0">
            <div className="col-md-8">
              <div className="card-body">
                <h5 className="card-title"> {Nombre} {Apellidos} </h5>
                <p className="card-text">RU: {RU}</p>
                <p className="card-text">{Cargo}</p>
              </div>
            </div>
          </div>
        </div>
    )
}
export default Home;