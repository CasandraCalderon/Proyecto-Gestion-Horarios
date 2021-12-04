import React, {useState, useEffect, useMemo} from 'react'
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import "./Programacion.css"
import Cookies from "universal-cookie";

const url = "http://localhost:8000/api/materia";
const cookies = new Cookies();

const Programacion = () => {
  const [materias, setMaterias] = useState([]);
  const [progMaterias, setProgMaterias] = useState({});
  
  useEffect(()=> {
    axios.get(url)
    .then(res=>{
      const data = res.data;
      setMaterias(data);
    });
  }, []);

  const totalMaterias = useMemo(()=> {
    let aux = {};
    materias.forEach((materia)=>{
      aux = {...aux, [materia.Nombre]: false};
    });
    return aux;
  }, [materias]);

  useEffect(()=> {
    setProgMaterias(totalMaterias);
  }, [totalMaterias]);

  const handleChangeCheckBox = (e) => {
    console.dir(e.target);
    /*setProgMaterias((prevState)=>{
      return {
        ...prevState, [e.target.value]: e.target.checked,
      };
    });
    console.log(progMaterias);*/
  }
  
  return (
    <div>
        <div className="text-left container">
            <br />
          <button className="btn btn-dark" onClick={()=>{this.setState({form: null, tipoModal: 'insertar'}); this.modalInsertar()}}>Agregar Materia</button>
          </div>
          <br />
        <table className="table table-fixed text-center container">
          <thead className="row">
            <tr>
              <th className="Primero">Nombre</th>
              <th className="Primero">Sigla</th>
              <th className="Primero">Semestre</th>
              <th className="Primero">Tipo de Aula</th>
              <th className="Primero">CantHSemanas</th>
              <th className="Primero">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {materias.filter(materia => materia.Semestre === cookies.get("Semestre")).map(materia=>{
                return(
                    <tr key={materia._id}>
                        <td className="Primero">{materia.Sigla}</td>
                        <td className="Primero">{materia.Nombre}</td>
                        <td className="Primero">{materia.Semestre}</td>
                        <td className="Primero">{materia.TipoAula}</td>
                        <td className="Primero">{materia.CantHSemanas}</td>
                        <td className="Primero">
                        <input type="checkbox" value={materia.Nombre} onChange={handleChangeCheckBox}/>
                    </td>
              </tr>
              )
            }
            )}
          </tbody>
        </table>
    </div>    
  )
}
export default Programacion;