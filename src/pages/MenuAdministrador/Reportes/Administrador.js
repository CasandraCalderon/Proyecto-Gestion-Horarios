import React, { Component } from 'react';
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import {CSVLink} from 'react-csv';


const url="http://localhost:3001/usuarios";


class Administrador extends Component {
  //se alm todos lo datos
state={
  data:[],
  form:{
    id: '',
    Nombres: '',
    Apellidos: '',
    CorreoElectronico: '',
    Cargo: '',
  }
}

//extraemos datos de la api
peticionGet=()=>{
axios.get(url).then(response=>{
  this.setState({data: response.data.filter(usuario => usuario.Cargo === "DOCENTE")});
}).catch(error=>{
  console.log(error.message);
})
}

componentDidMount() {
    this.peticionGet();
  }
  

  render(){
    const {data}=this.state;
  return (
    <div className="text-center" >
        
        <CSVLink data={data} filename={"Lista de Docentes"}><button className="btn btn-success ">Exportar a Excel</button></CSVLink>
    
     <br /><br />
    <table className="table">
      <thead>
        <tr>
          <th>Nombres</th>
          <th>Apellidos</th>
          <th>CorreoElectronico</th>
          <th>Cargo</th>
        </tr>
      </thead>
      <tbody>
        {this.state.data.map(usuario=>{
          return(
    
         <tr key={usuario.id}>
          <td>{usuario.Nombres}</td>
          <td>{usuario.Apellidos}</td>
          <td>{usuario.CorreoElectronico}</td>
          <td>{usuario.Cargo}</td>
          </tr>
          
          )
        })}
      </tbody>
    </table>
          
  </div>
  );
}
}
export default Administrador;
