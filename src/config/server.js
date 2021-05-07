import express from "express";
import { json } from "body-parser";
// Sirver para utilizar las variables del archivo .env
require("dotenv").config();

export class Server {
    constructor() {
        this.app = express();
        this.puerto = process.env.PORT || 5000;
        this.bodyParser();
        this.CORS();
        this.rutas();
    }
    CORS() {
        this.app.use((req, res, next) => {
            // Perimitir los origenes(dominios) par  que puedan consultar a mi API
            res.header("Access-Control-Allow-Origin", "*")
            // Permite las cabeceras siguientes
            res.header("Access-Control-Allow-Header", "Content-Type, Authorization")
            // Permite los metodos siguientes
            res.header("Access-Control-Allow-Methods", "GET, POST, PUT")
            // Si todo cumple con lo estipulado anteriormente
            next();
        })
    }
    bodyParser() {
        this.app.use(json())
    }
    rutas() {
        this.app.get("/", (req, res) => {
            res.send("Bienvenido a mi API 😂");
        });
    }
    start() {
        this.app.listen(this.puerto, () => {
            console.log(
                `Servidor corriendo exitosamente en el puerto ${this.puerto}`
            );
        });
    }
}