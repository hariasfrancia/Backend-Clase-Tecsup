import express from "express"
import { json } from "body-parser"

export default class Server {
    constructor(){
        this.app = express();
        // Definimos el puerto que por lo general es una variable de entoron (esto solo se da en servidores de produccion como HEROKU, DIGITAL OCEN, AZURE) en el caso que no encontrase esa variable de entorno estara el definido (8000)
        this.port = process.env.PORT || 8000;
        this.bodyParser();
    }
    bodyParser(){
        // Serive para configurar la forma en la cual el API REST vva a recibir datos del front mediante el body
        this.app.use(json());
    }
    start(){
        //Sirver para levantar el servidor en el cual le tenemos que pasar el puerto y si todo es exitoso ingresaremos al callback (segundo parametro)
        this.app.listen(this.port, () => {
            console.log(`Servidor corriendo en: http//:127.0.0.1:${this.port}`);
        })
    }
}