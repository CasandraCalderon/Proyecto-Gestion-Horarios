import React from 'react'
import "bootstrap/dist/css/bootstrap.min.css";
import './PresentCard.css';
import avatar from '../../img/programador.png'
import avatar1 from '../../img/gerente.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser} from "@fortawesome/free-solid-svg-icons";
import Cookies from "universal-cookie";

const cookies = new Cookies();
const PresentCard = () => {
    return (
      <div>
        <br /><br />
          <div className="card col-md-6 offset-md-3 text-white bg-dark mb-3" id= 'card'>
            <div className="row no-gutters">
              <div className="col-md-2">
                <img src={cookies.get("image") === "ADMINISTRADOR"? avatar : avatar1} className="card-img" alt="..."/>
              </div>
              <div className="col-md-8">
                <div className="text-center" id="cardText">
                <br /><br />
                  <h3 className="card-title"><FontAwesomeIcon icon={faUser} /> {cookies.get("Nombre")} {cookies.get("Ap_Paterno")} {cookies.get("Ap_Materno")}</h3>
                  <h4 className="card-title">RU: {cookies.get("RU")}</h4>
                  <p className="cargo">{cookies.get("Cargo")}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
    )
}
export default PresentCard;