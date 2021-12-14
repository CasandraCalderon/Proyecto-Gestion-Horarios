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
    }).catch(error=>{
      console.log(error.message);
    })

    }
  render() {
    return (
      <div >
        <br/><br/><br/><br/>
        <div className="row mb-2 justify-content-center">
    <div className="row col-md-5">
      <div className="row no-gutters border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative bg-light text-dark rounded">
        <div className="col-md-8 p-4 d-flex flex-column position-static ">
          <br/><br/>
          <h3 className="mb-0 text-center"><FontAwesomeIcon icon={faUser} /> {cookies.get("Nombre")} {cookies.get("Ap_Paterno")} {cookies.get("Ap_Materno")}</h3>
          <hr size="8px" color="black" />
          <strong className="card-text mb-3 text-center">RU: {cookies.get("RU")}</strong>
          <strong className="btn btn-dark rounded" type="button">{cookies.get("Cargo")}</strong>
        </div>
        <div className="col-md-4 p-4 d-flex flex-column position-static">
        <img className="card-img" src={this.state.data.length !== 0? `http://localhost:8000/${this.state.data[0]?.image}` : "http://localhost:8000/uploads/gerente.png" } alt="..."/>
        </div>
      </div>
    </div>
  </div>
      </div>
      
        
    )
  }
    
}
export default PresentCard;