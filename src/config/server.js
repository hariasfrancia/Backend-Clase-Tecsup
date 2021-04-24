import express from "express";
import { json } from "body-parser";
import { conexion } from "./sequelize";
import { Categoria } from "./sequelize";
import * as prueba from "./relaciones";


export default class Server {
    constructor() {
        this.app = express();
        // Definimos el puerto que por lo general es una variable de entoron (esto solo se da en servidores de produccion como HEROKU, DIGITAL OCEN, AZURE) en el caso que no encontrase esa variable de entorno estara el definido (8000)
        this.port = process.env.PORT || 8000;
        this.bodyParser();
    }
    bodyParser() {
        // Serive para configurar la forma en la cual el API REST vva a recibir datos del front mediante el body
        this.app.use(json());
    }
    start() {
        //Sirver para levantar el servidor en el cual le tenemos que pasar el puerto y si todo es exitoso ingresaremos al callback (segundo parametro)
        this.app.listen(this.port, async () => {
            console.log(`Servidor corriendo en: http//:127.0.0.1:${this.port}`);
            // esto va a tratar de conectarse con el servido usando las credenciales definidas anteriormente
            // alter => si hubo algun cambio en la BD volvera a generar SOLAMENTE esos cambios
            // force => RESETEA (borra) toda la BD y su contenido y lo vuelve a crear de 0, NUNCA USAR ESTO EN MODO PRODUCCION
            try {
                // await conexion.sync({ force: true }); => { force: true } con esto se resetea y vuelve a crear la base datos
                await conexion.sync({ force: true });
                console.log("Base de datos sincronizada correctamente");
            } catch (error) {
                console.log(error);
            }
        })
    }
}