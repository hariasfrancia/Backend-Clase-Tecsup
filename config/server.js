// yarn add express
// const express = require('express')

// y ahora con babel
import express from "express";
import { tareas_router } from "../rutas/tareas";
import { json } from "body-parser";

export class Server{
  constructor(){
    this.app = express()
    // mira en la variables de entorno de la maquina
    this.puerto = process.env.PORT || 8000;
    this.app.use(json()); // sirve para indicar a express que tiene que recibir un json dle front
    this.rutas();
  }

  rutas() {
      this.app.get("/", (req, res) => {
        res.send("Hola, bienvenido a mi API😊");
      });
    //   se crea un midleware (tambien sirve para indicar un conglomerado de rutas)
      this.app.use(tareas_router)
  }
  iniciarServidor(){
    // el metodo listen sirve para levantar el servidor
    this.app.listen(this.puerto,() => {
      console.log(`Servidor corriendo exitosamente: 127.0.0.1:${this.puerto}`);
    });
  }
}

// module.exports = {
//   Server,
// }