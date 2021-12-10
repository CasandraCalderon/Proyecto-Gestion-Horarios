import React, {Component} from 'react'
import "bootstrap/dist/css/bootstrap.min.css";
import './PresentCard.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser} from "@fortawesome/free-solid-svg-icons";
import Cookies from "universal-cookie";
import axios from "axios";

const url = "http://localhost:8000/api/avatar"
const cookies = new Cookies();

class PresentCard extends Component {
  state = {
    data : []
  }
  componentDidMount() {
    this.peticionGet();
  }
  peticionGet=()=>{
    axios.get(url).then(response=>{
      this.setState({data: response.data.filter(e => e.RU === cookies.get("RU"))});
      console.log(this.state.data)
    }).catch(error=>{
      console.log(error.message);
    })

    }
  render() {
    return (
      <div>
        <br /><br /><br /><br /><br />
          <div className="card col-md-6 offset-md-3 text-white bg-dark mb-3" id= 'card'>
            <div className="row no-gutters">
              <div className="col-md-2">
                <img src={this.state.data.length !== 0? `http://localhost:8000/${this.state.data[0]?.image}` : "http://localhost:8000/uploads/gerente.png" } className="card-img" alt="..."/>
              </div>
              <div className="col-md-8">
                <div className="text-center" id="cardText">
                <br /><br />
                  <h4 className="card-title"><FontAwesomeIcon icon={faUser} /> {cookies.get("Nombre")} {cookies.get("Ap_Paterno")} {cookies.get("Ap_Materno")}</h4>
                  <h4 className="card-title">RU: {cookies.get("RU")}</h4>
                  <p className="cargo">{cookies.get("Cargo")}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
    )
  }
    
}
export default PresentCard;