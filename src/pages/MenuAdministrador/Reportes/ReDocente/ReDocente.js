import React, { useState, useEffect } from 'react'
import { Button } from 'reactstrap'
import axios from "axios";
import { Vista } from './Vista';
import Documento from './Documento';
import {PDFDownloadLink} from "@react-pdf/renderer"
import jsPDF from 'jspdf'
import 'jspdf-autotable'


const baseDocentes = "http://localhost:8000/api/docente";
export const ReDocente = () => {
    const [docentes, setDocentes] = useState(null);
    const columns = [
        {title: "Nombre", field: "Nombre"},
        {title: "Ap_Paterno", field: "Ap_Paterno"},
        {title: "Ap_Materno", field: "Ap_Materno"},
        {title: "CI", field: "CI"},
        {title: "Email", field: "Email"},
        {title: "RU", field: "RU"},
        {title: "Telefono", field: "Telefono"},
        {title: "Usuario", field: "username"},
    ]
    const DownloadPdf=()=>{
        const doc= new jsPDF()
        doc.text("Lista de Docentes",20,10)
        doc.autoTable({
            theme: "grid",
            columns:columns.map(col => ({ ...col, dataKey: col.field })),
            body: docentes
        })
        doc.save("table.pdf")
      }
    const Menu = () => {
        return(
            <nav>
            <div>
          <button onClick={()=>DownloadPdf()}>PDF</button>
        </div>
        </nav>
        )
    };
    const peticionGet = () => {
        axios
          .get(baseDocentes)
          .then((response) => {
            setDocentes(response.data);
          })
          .catch((error) => {
            console.log(error.message);
          });
      };
      useEffect(() => {
          peticionGet();
      }, []);
    return (
        <div>
            <Menu/>
            <Vista docentes={docentes}/>

        </div>
    )
}
