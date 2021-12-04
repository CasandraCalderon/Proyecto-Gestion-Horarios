import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom';

import Rutas from "./routes/Rutas";


const element = (
  <BrowserRouter>
    <Rutas />
  </BrowserRouter>
);

const container = document.getElementById('root');

ReactDOM.render(element, container);