import React from 'react'
//import {Document, Page, View} from "@react-pdf/renderer"
import jsPDF from 'jspdf'
import 'jspdf-autotable'
const Documento = ({docentes}) => {
  const DownloadPdf=()=>{
    const doc= new jsPDF()
    doc.text("Lista de Docentes",20,10)
    doc.save("table.pdf")
  }
    return (
        <div>
          <button onClick={()=>DownloadPdf()}>PDF</button>
        </div>
    )
}
export default Documento;
