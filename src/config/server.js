import express from "express";
import { json } from "body-parser";
import { connect } from "mongoose";
import { usuario_router } from "../routes/usuario";
require("dotenv").config();

export default class Server {
    constructor() {
        this.app = express();
        // definimos el puerto que por lo general es una variable de entorno (esto solo se da en servidores de produccion como HEROKU, DIGITAL OCEAN, AZURE) en el caso que no encontrase esa variable de entorno usara el numero definido (8000)
        this.port = process.env.PORT || 8000;
        this.bodyParser();
        this.rutas();
    }
    bodyParser() {
        // sirve para configurar la forma en la cual el API REST va a recibir datos del front mediante el body
        this.app.use(json());
    }
    rutas() {
        this.app.get("/", (req, res) => res.send("Bienvenidos a mi API"));
        this.app.use(usuario_router);
    }
    start() {
        // sirve para levantar el servidor en el cual le tenemos que pasar el puerto y si todo es exitoso ingresaremos al callback (segundo parametro)
        this.app.listen(this.port, async () => {
            console.log(`Servidor corriendo en: http://127.0.0.1:${this.port}`);
            try {
                await connect(process.env.MONGO_COMPASS, {
                    useNewUrlParser: true, // sierve para indicar que estamos usanado el nuevo formato de conexion URI
                    useUnifiedTopology: true, // par ainidcar que vamos usar el nuevo formato de administracion de conexiones
                    //si quieren ver mas acerca de las configuraciones disponibles: https://mongoosejs.com/docs/connections.html#options
                });
                console.log("Base de datos conectada correctamente");
            } catch (error) {
                console.log("error");
            }
        });
    }
}