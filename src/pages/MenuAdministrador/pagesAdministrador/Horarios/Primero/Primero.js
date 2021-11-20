import React, { Component } from "react";
import { Table } from "react-bootstrap";
import { Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
class Primero extends Component {
  state = {
    data: [],
    form: {
      _id: "",
      Nombre: "",
    },
  };
  render() {
    return (
      <>
        <Table id='Hora' striped bordered hover>
          <thead>
            <tr>
              <th>Hora</th>
              <th>Lunes</th>
              <th>Martes</th>
              <th>Miercoles</th>
              <th>Jueves</th>
              <th>Viernes</th>
              <th>Sabado</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              {true===false?
              <td >
    
              <button className="btn btn-dark" ><FontAwesomeIcon icon={faEdit}/></button>
                {"   "}
                <button className="btn btn-danger" ><FontAwesomeIcon icon={faTrashAlt}/></button>
                {"   "}
                <button className="btn btn-danger" ><FontAwesomeIcon icon={faTrashAlt}/></button> </td> :
                <td>
                Vacio
                </td>
              }
            </tr>
          </tbody>
          <tbody>
            <tr>
              <td>2</td>
              <td className="Pri">
                    <button className="btn btn-dark" ><FontAwesomeIcon icon={faEdit}/></button>
                    {"   "}
                    <button className="btn btn-danger" ><FontAwesomeIcon icon={faTrashAlt}/></button>
                    {"   "}
                    <button className="btn btn-danger" ><FontAwesomeIcon icon={faTrashAlt}/></button>
                    </td>
            </tr>
          </tbody>
          <tbody>
            <tr>
              <td>3</td>
            </tr>
          </tbody>
          <tbody>
            <tr>
              <td>4</td>
            </tr>
          </tbody>
          <tbody>
            <tr>
              <td>5</td>
            </tr>
          </tbody>
        </Table>
      </>
    );
  }
}
export default Primero;
