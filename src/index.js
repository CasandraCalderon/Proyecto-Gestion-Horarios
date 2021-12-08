import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import Rutas from "./routes/Rutas";
import store from './store/index';

const element = (
  <Provider store={store}>
    <BrowserRouter>
      <Rutas />
    </BrowserRouter>
  </Provider>
);

const container = document.getElementById("root");

ReactDOM.render(element, container);
