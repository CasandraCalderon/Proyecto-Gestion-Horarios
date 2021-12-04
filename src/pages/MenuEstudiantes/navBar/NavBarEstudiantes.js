import React from "react";




export default class NavBarEstudiantes extends React.Component {
  render() {
    let {cerrar} = this.props;
    return (
      <>
      
            <button onClick={() => cerrar()} type="button" className="btn btn-secondary">Cerrar Sesion</button>
          
      </>
    );
  }
}