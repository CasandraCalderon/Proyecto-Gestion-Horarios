import React, { Component } from 'react';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

class Menu extends Component {
    cerrarSesion=()=>{
        cookies.remove('id', {path: "/"});
        cookies.remove('Nombres', {path: "/"});
        cookies.remove('Apellidos', {path: "/"});
        cookies.remove('Correo Electronico', {path: "/"});
        cookies.remove('RU', {path: "/"});
        cookies.remove('Usuario', {path: "/"});
        window.location.href='./';
    }

    componentDidMount() {
        if(!cookies.get('Usuario')){
            window.location.href="./";
        }
    }

    render() {
        console.log('id: '+ cookies.get('id'));
        console.log('Nombres: '+cookies.get('Nombres'));
        console.log('Apellidos: '+cookies.get('Apellidos'));
        console.log('Correo Electronico: '+cookies.get('Correo Electronico'));
        console.log('RU: '+cookies.get('RU'));
        console.log('Usuario: '+cookies.get('Usuario'));
        return (
            <div>
                Menu Principal

                <br />
                <button onClick={()=>this.cerrarSesion()}>Cerrar Sesión</button>
            </div>
        );
    }
}

export default Menu;