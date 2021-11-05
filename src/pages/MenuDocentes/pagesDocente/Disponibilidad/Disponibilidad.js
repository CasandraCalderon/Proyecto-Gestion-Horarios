import React, { useState } from 'react'
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Table, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import "./Disponibilidad.css"
import axios from "axios";

const url = "http://localhost:3002/disponibilidad";
const Disponibilidad = () => {
    const [Primero, setPrimero] = useState([{name: "1Lunes", value: false}, {name: "1Martes", value: false}, {name: "1Miercoles", value: false}, {name: "1Jueves", value: false}, {name: "1Viernes", value: false}, {name: "1Sabado", value: false}]);
    const [Segundo, setSegundo] = useState([{name: "2Lunes", value: false}, {name: "2Martes", value: false}, {name: "2Miercoles", value: false}, {name: "2Jueves", value: false}, {name: "2Viernes", value: false}, {name: "2Sabado", value: false}]);
    const [Tercero, setTercero] = useState([{name: "3Lunes", value: false}, {name: "3Martes", value: false}, {name: "3Miercoles", value: false}, {name: "3Jueves", value: false}, {name: "3Viernes", value: false}, {name: "3Sabado", value: false}]);
    const [Cuarto, setCuarto] = useState([{name: "4Lunes", value: false}, {name: "4Martes", value: false}, {name: "4Miercoles", value: false}, {name: "4Jueves", value: false}, {name: "4Viernes", value: false}, {name: "4Sabado", value: false}]);
    const [Quinto, setQuinto] = useState([{name: "5Lunes", value: false}, {name: "5Martes", value: false}, {name: "5Miercoles", value: false}, {name: "5Jueves", value: false}, {name: "5Viernes", value: false}, {name: "5Sabado", value: false}]);
    const [data, setData] = useState({Docente: 'Ramos', Disponibilidad: ['1Lunes', '3Lunes']});

    const [insertar, setInsertar] = useState(false);

    const peticionGet=async()=>{
        await axios.get(url).then(response=>{
            setData(response.data)
        })
    }

    


	const modalAbrir = () => {
        setInsertar(!insertar);
        console.log(insertar);
    };

	const onSubmit = () => {
        const days = Primero.concat(Segundo);
		console.log(days);
	}

    const {Disponibilidad} = data;
    console.log(Disponibilidad);

	return (
        <>
        <div className="container text-left">
            <Button
                color="dark"
                size=""
                onClick={modalAbrir}
            >
                Modificar disponibilidad
            </Button>
        </div>
        <br />
        <div>
        <table className="table table-bordered container">
            <thead className="thead-dark text-center">
                    <tr>
                    <th scope="col">Hora</th>
                    <th scope="col">Lunes</th>
                    <th scope="col">Martes</th>
                    <th scope="col">Miercoles</th>
                    <th scope="col">Jueves</th>
                    <th scope="col">Viernes</th>
                    <th scope="col">Sabado</th>
                    </tr>
            </thead>
            <tbody className= "text-center">
                <tr>
                    <th scope="row" className="text-center">7:45-10:00</th>
                    {Primero.map((day) => {
                        return(
                            <td key={day.name} id={day.value? "Disponible" : "NoDisponible"}>Primer Turno</td>
                        )
                    })}    
                </tr>
                <tr>
                    <th scope="row" className="text-center">10:00-12:15</th>
                    {Segundo.map((day) => {
                        return(
                            <td key={day.name} id={day.value? "Disponible" : "NoDisponible"}>Segundo Turno</td>
                        )
                    })}    
                </tr>
                <tr>
                    <th scope="row" className="text-center">12:15-14:00</th>
                    <td>RECESO</td>
                    <td>RECESO</td>
                    <td>RECESO</td>
                    <td>RECESO</td>
                    <td>RECESO</td>
                    <td>RECESO</td>
                </tr>
                <tr>
                    <th scope="row" className="text-center">14:00-16:15</th>
                    {Tercero.map((day) => {
                        return(
                            <td key={day.name} id={day.value? "Disponible" : "NoDisponible"}>Tercer Turno</td>
                        )
                    })}    
                </tr>
                <tr>
                    <th scope="row" className="text-center">16:15-18:30</th>
                    {Cuarto.map((day) => {
                        return(
                            <td key={day.name} id={day.value? "Disponible" : "NoDisponible"}>Cuarto Turno</td>
                        )
                    })}
                </tr>
                <tr>
                    <th scope="row" className="text-center">18:30-20:00</th>
                    {Quinto.map((day) => {
                        return(
                            <td key={day.name} id={day.value? "Disponible" : "NoDisponible"}>Quinto Turno</td>
                        )
                    })}
                </tr>
            </tbody>
        </table>
        </div>

        <Modal isOpen={insertar} centered fullscreen="" size="xl">
            <ModalHeader>
                MODIFICAR DISPONIBILIDAD
            </ModalHeader>

            <ModalBody>
            <Table bordered>
                <thead className="thead-dark text-center">
                <tr>
                <th scope="col">Hora</th>
                <th scope="col">Lunes</th>
                <th scope="col">Martes</th>
                <th scope="col">Miercoles</th>
                <th scope="col">Jueves</th>
                <th scope="col">Viernes</th>
                <th scope="col">Sabado</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                <th scope="row" className="text-center">7:45-10:00</th>
                <td>
                    <div className="form-check">
                        <input className="form-check-input" type="checkbox" id="gridCheck" />
                        <label className="form-check-label" htmlFor="gridCheck">Primer turno</label>
                    </div>    
                </td>
                <td>
                    <div className="form-check">
                        <input className="form-check-input" type="checkbox" id="gridCheck" />
                        <label className="form-check-label" htmlFor="gridCheck">Primer turno</label>
                    </div>    
                </td>
                <td>
                    <div className="form-check">
                        <input className="form-check-input" type="checkbox" id="gridCheck" />
                        <label className="form-check-label" htmlFor="gridCheck">Primer turno</label>
                    </div>    
                </td>
                <td>
                    <div className="form-check">
                        <input className="form-check-input" type="checkbox" id="gridCheck" />
                        <label className="form-check-label" htmlFor="gridCheck">Primer turno</label>
                    </div>    
                </td>
                <td>
                    <div className="form-check">
                        <input className="form-check-input" type="checkbox" id="gridCheck" />
                        <label className="form-check-label" htmlFor="gridCheck">Primer turno</label>
                    </div>    
                </td>
                <td>
                    <div className="form-check">
                        <input className="form-check-input" type="checkbox" id="gridCheck" />
                        <label className="form-check-label" htmlFor="gridCheck">Primer turno</label>
                    </div>    
                </td>
                </tr>
                <tr>
                <th scope="row" className="text-center">10:00-12:15</th>
                <td>
                    <div className="form-check">
                        <input className="form-check-input" type="checkbox" id="gridCheck" />
                        <label className="form-check-label" htmlFor="gridCheck">Segundo Turno</label>
                    </div>    
                </td>
                <td>
                    <div className="form-check">
                        <input className="form-check-input" type="checkbox" id="gridCheck" />
                        <label className="form-check-label" htmlFor="gridCheck">Segundo Turno</label>
                    </div>    
                </td>
                <td>
                    <div className="form-check">
                        <input className="form-check-input" type="checkbox" id="gridCheck" />
                        <label className="form-check-label" htmlFor="gridCheck">Segundo Turno</label>
                    </div>    
                </td>
                <td>
                    <div className="form-check">
                        <input className="form-check-input" type="checkbox" id="gridCheck" />
                        <label className="form-check-label" htmlFor="gridCheck">Segundo Turno</label>
                    </div>    
                </td>
                <td>
                    <div className="form-check">
                        <input className="form-check-input" type="checkbox" id="gridCheck" />
                        <label className="form-check-label" htmlFor="gridCheck">Segundo Turno</label>
                    </div>    
                </td>
                <td>
                    <div className="form-check">
                        <input className="form-check-input" type="checkbox" id="gridCheck" />
                        <label className="form-check-label" htmlFor="gridCheck">Segundo Turno</label>
                    </div>    
                </td>
                </tr>
                <tr className= "text-center">
                <th scope="row">12:15-14:00</th>
                <td>RECESO</td>
                <td>RECESO</td>
                <td>RECESO</td>
                <td>RECESO</td>
                <td>RECESO</td>
                <td>RECESO</td>
                </tr>
                <tr>
                <th scope="row" className="text-center">14:00-16:15</th>
                <td>
                    <div className="form-check">
                        <input className="form-check-input" type="checkbox" id="gridCheck" />
                        <label className="form-check-label" htmlFor="gridCheck">Tercer Turno</label>
                    </div>    
                </td>
                <td>
                    <div className="form-check">
                        <input className="form-check-input" type="checkbox" id="gridCheck" />
                        <label className="form-check-label" htmlFor="gridCheck">Tercer Turno</label>
                    </div>    
                </td>
                <td>
                    <div className="form-check">
                        <input className="form-check-input" type="checkbox" id="gridCheck" />
                        <label className="form-check-label" htmlFor="gridCheck">Tercer Turnoo</label>
                    </div>    
                </td>
                <td>
                    <div className="form-check">
                        <input className="form-check-input" type="checkbox" id="gridCheck" />
                        <label className="form-check-label" htmlFor="gridCheck">Tercer Turno</label>
                    </div>    
                </td>
                <td>
                    <div className="form-check">
                        <input className="form-check-input" type="checkbox" id="gridCheck" />
                        <label className="form-check-label" htmlFor="gridCheck">Tercer Turno</label>
                    </div>    
                </td>
                <td>
                    <div className="form-check">
                        <input className="form-check-input" type="checkbox" id="gridCheck" />
                        <label className="form-check-label" htmlFor="gridCheck">Tercer Turno</label>
                    </div>    
                </td>
                </tr>
                <tr>
                <th scope="row" className="text-center">16:15-18:30</th>
                <td>
                    <div className="form-check">
                        <input className="form-check-input" type="checkbox" id="gridCheck" />
                        <label className="form-check-label" htmlFor="gridCheck">Cuarto Turno</label>
                    </div>    
                </td>
                <td>
                    <div className="form-check">
                        <input className="form-check-input" type="checkbox" id="gridCheck" />
                        <label className="form-check-label" htmlFor="gridCheck">Cuarto Turno</label>
                    </div>    
                </td>
                <td>
                    <div className="form-check">
                        <input className="form-check-input" type="checkbox" id="gridCheck" />
                        <label className="form-check-label" htmlFor="gridCheck">Cuarto Turno</label>
                    </div>    
                </td>
                <td>
                    <div className="form-check">
                        <input className="form-check-input" type="checkbox" id="gridCheck" />
                        <label className="form-check-label" htmlFor="gridCheck">Cuarto Turno</label>
                    </div>    
                </td>
                <td>
                    <div className="form-check">
                        <input className="form-check-input" type="checkbox" id="gridCheck" />
                        <label className="form-check-label" htmlFor="gridCheck">Cuarto Turno</label>
                    </div>    
                </td>
                <td>
                    <div className="form-check">
                        <input className="form-check-input" type="checkbox" id="gridCheck" />
                        <label className="form-check-label" htmlFor="gridCheck">Cuarto Turno</label>
                    </div>    
                </td>
                </tr>
                <tr>
                <th scope="row" className="text-center">18:30-20:00</th>
                <td>
                    <div className="form-check">
                        <input className="form-check-input" type="checkbox" id="gridCheck" />
                        <label className="form-check-label" htmlFor="gridCheck">Quinto Turno</label>
                    </div>    
                </td>
                <td>
                    <div className="form-check">
                        <input className="form-check-input" type="checkbox" id="gridCheck" />
                        <label className="form-check-label" htmlFor="gridCheck">Quinto Turno</label>
                    </div>    
                </td>
                <td>
                    <div className="form-check">
                        <input className="form-check-input" type="checkbox" id="gridCheck" />
                        <label className="form-check-label" htmlFor="gridCheck">Quinto Turno</label>
                    </div>    
                </td>
                <td>
                    <div className="form-check">
                        <input className="form-check-input" type="checkbox" id="gridCheck" />
                        <label className="form-check-label" htmlFor="gridCheck">Quinto Turno</label>
                    </div>    
                </td>
                <td>
                    <div className="form-check">
                        <input className="form-check-input" type="checkbox" id="gridCheck" />
                        <label className="form-check-label" htmlFor="gridCheck">Quinto Turno</label>
                    </div>    
                </td>
                <td>
                    <div className="form-check">
                        <input className="form-check-input" type="checkbox" id="gridCheck" />
                        <label className="form-check-label" htmlFor="gridCheck">Quinto Turno</label>
                    </div>    
                </td>
                </tr>
                </tbody>
            </Table>
            </ModalBody>

            <ModalFooter>
            <div>
                <Button
                    active
                    color="success"
                    size=""
                >
                    Actualizar
                </Button>
                </div>
                <div>
                    <Button
                        active
                        color="danger"
                        size=""
                        onClick={modalAbrir}
                    >
                        Cancelar
                    </Button>
                    </div>
            </ModalFooter>
        </Modal>
        
		
        <button onClick={onSubmit}>CLICK</button>
        </>
	)
}

export default Disponibilidad;
