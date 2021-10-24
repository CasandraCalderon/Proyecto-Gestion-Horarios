import React, { useState, useEffect } from 'react';
import './IDocentes.css';
import MaterialTable from "material-table";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from 'axios';
import {Modal, TextField, Button} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';

const columns= [
  { title: 'Nombre', field: 'Nombre' },
  { title: 'Piso', field: 'Piso' },
  { title: 'Capacidad', field: 'Capacidad', type: 'numeric'},
  { title: 'TipoSala', field: 'TipoSala'}
];
const baseUrl="http://localhost:3002/aulas";


const useStyles = makeStyles((theme) => ({
  modal: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)'
  },
  iconos:{
    cursor: 'pointer'
  }, 
  inputMaterial:{
    width: '100%'
  }
}));

function IDocentes() {
  const styles= useStyles();
  const [data, setData]= useState([]);
  const [modalInsertar, setModalInsertar]= useState(false);
  const [modalEditar, setModalEditar]= useState(false);
  const [modalEliminar, setModalEliminar]= useState(false);
  const [aulaSeleccionado, setAulaSeleccionado]=useState({
    Nombre: "",
    Piso: "",
    Capacidad: "",
    TipoSala: ""
  })

  const handleChange=e=>{
    const {name, value}=e.target;
    setAulaSeleccionado(prevState=>({
      ...prevState,
      [name]: value
    }));
  }

  const peticionGet=async()=>{
    await axios.get(baseUrl)
    .then(response=>{
     setData(response.data);
    }).catch(error=>{
      console.log(error);
    })
  }

  const peticionPost=async()=>{
    await axios.post(baseUrl, aulaSeleccionado)
    .then(response=>{
      setData(data.concat(response.data));
      abrirCerrarModalInsertar();
    }).catch(error=>{
      console.log(error);
    })
  }

  const peticionPut=async()=>{
    await axios.put(baseUrl+"/"+aulaSeleccionado.id, aulaSeleccionado)
    .then(response=>{
      var dataNueva= data;
      dataNueva.map(aula=>{
        if(aula.id===aulaSeleccionado.id){
          aula.Nombre=aulaSeleccionado.Nombre;
          aula.Piso=aulaSeleccionado.Piso;
          aula.Capacidad=aulaSeleccionado.Capacidad;
          aula.TipoSala=aulaSeleccionado.TipoSala;
        }
      });
      setData(dataNueva);
      abrirCerrarModalEditar();
    }).catch(error=>{
      console.log(error);
    })
  }

  const peticionDelete=async()=>{
    await axios.delete(baseUrl+"/"+aulaSeleccionado.id)
    .then(response=>{
      setData(data.filter(aula=>aula.id!==aulaSeleccionado.id));
      abrirCerrarModalEliminar();
    }).catch(error=>{
      console.log(error);
    })
  }

  const seleccionarAula=(aula, caso)=>{
    setAulaSeleccionado(aula);
    (caso==="Editar")?abrirCerrarModalEditar()
    :
    abrirCerrarModalEliminar()
  }

  const abrirCerrarModalInsertar=()=>{
    setModalInsertar(!modalInsertar);
  }

  
  const abrirCerrarModalEditar=()=>{
    setModalEditar(!modalEditar);
  }

  const abrirCerrarModalEliminar=()=>{
    setModalEliminar(!modalEliminar);
  }

  useEffect(()=>{
    peticionGet();
  }, [])

  const bodyInsertar=(
    <div className={styles.modal}>
      <h3>Agregar Nuevo Aula</h3>
      <TextField className={styles.inputMaterial} label="Nombre" name="Nombre" onChange={handleChange}/>
      <br />
      <TextField className={styles.inputMaterial} label="Piso" name="Piso" onChange={handleChange}/>          
<br />
<TextField className={styles.inputMaterial} label="Capacidad" name="Capacidad" onChange={handleChange}/>
      <br />
<TextField className={styles.inputMaterial} label="TipoSala" name="TipoSala" onChange={handleChange}/>
      <br /><br />
      <div align="right">
        <Button color="primary" onClick={()=>peticionPost()}>Insertar</Button>
        <Button onClick={()=>abrirCerrarModalInsertar()}>Cancelar</Button>
      </div>
    </div>
  )

  const bodyEditar=(
    <div className={styles.modal}>
      <h3>Editar Aula</h3>
      <TextField className={styles.inputMaterial} label="Nombre" name="Nombre" onChange={handleChange} value={aulaSeleccionado&&aulaSeleccionado.Nombre}/>
      <br />
      <TextField className={styles.inputMaterial} label="Piso" name="Piso" onChange={handleChange} value={aulaSeleccionado&&aulaSeleccionado.Piso}/>          
<br />
<TextField className={styles.inputMaterial} label="Capacidad" name="Capacidad" onChange={handleChange} value={aulaSeleccionado&&aulaSeleccionado.Capacidad}/>
      <br />
<TextField className={styles.inputMaterial} label="TipoSala" name="TipoSala" onChange={handleChange} value={aulaSeleccionado&&aulaSeleccionado.TipoSala}/>
      <br /><br />
      <div align="right">
        <Button color="primary" onClick={()=>peticionPut()}>Editar</Button>
        <Button onClick={()=>abrirCerrarModalEditar()}>Cancelar</Button>
      </div>
    </div>
  )

  const bodyEliminar=(
    <div className={styles.modal}>
      <p>Estás seguro que deseas eliminar esta aula <b>{aulaSeleccionado && aulaSeleccionado.Nombre}</b>? </p>
      <div align="right">
        <Button color="secondary" onClick={()=>peticionDelete()}>Sí</Button>
        <Button onClick={()=>abrirCerrarModalEliminar()}>No</Button>

      </div>

    </div>
  )

  return (
    <div className="App">
      <br />
      <Button onClick={()=>abrirCerrarModalInsertar()}>Insertar Aula</Button>
      <br /><br />
     <MaterialTable
          columns={columns}
          data={data}
          title="Aulasss"  
          actions={[
            {
              icon: 'edit',
              tooltip: 'Editar Aula',
              onClick: (event, rowData) => seleccionarAula(rowData, "Editar")
            },
            {
              icon: 'delete',
              tooltip: 'Eliminar Artista',
              onClick: (event, rowData) => seleccionarAula(rowData, "Eliminar")
            }
          ]}
          options={{
            actionsColumnIndex: -1,
          }}
          localization={{
            header:{
              actions: "Acciones"
            }
          }}
        />


        <Modal
        open={modalInsertar}
        onClose={abrirCerrarModalInsertar}>
          {bodyInsertar}
        </Modal>

        
        <Modal
        open={modalEditar}
        onClose={abrirCerrarModalEditar}>
          {bodyEditar}
        </Modal>

        <Modal
        open={modalEliminar}
        onClose={abrirCerrarModalEliminar}>
          {bodyEliminar}
        </Modal>
    </div>
  );
}

export default IDocentes;