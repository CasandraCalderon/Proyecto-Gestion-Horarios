import React from 'react'
import "bootstrap/dist/css/bootstrap.min.css";
import './HomeDocente.css';
import icon from '../icons-docente/gerente.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser} from "@fortawesome/free-solid-svg-icons";
const HomeDocente = (props) => {
    let {Nombre, Apellidos, RU, Cargo} = props;
    return (
      <div>
        <br /><br />
          <div className="card col-md-6 offset-md-3 text-white bg-dark mb-3" id= 'card'>
            <div className="row no-gutters">
              <div className="col-md-4">
                <img src={icon} className="card-img" alt="..."/>
              </div>
              <div className="col-md-8">
                <div className="card-body text-center">
                <br /><br />
                  <h3 className="card-title"><FontAwesomeIcon icon={faUser} /> {Nombre} {Apellidos}</h3>
                  <h4 className="card-title">RU: {RU}</h4>
                  <h5 className="card-title">{Cargo}</h5>
              
                </div>
              </div>
            </div>
          </div>
        </div>
        
    )
}
export default HomeDocente;