import express from "express"
import { Server as ServerHttp } from "http"
import socketio from "socket.io"
import { json } from "body-parser"


export default class Server {
    constructor() {
        this.app = express();
        this.puerto = process.env.PORT || 5000;
        this.httpServer = new ServerHttp(this.app);
        this.io = socketio(this.httpServer, {
            cors: {
                // https://socket.io/docs/v4/handling-cors/
                origin: "*", //"Access-Control-Allow-Origin" ° para indicar que servicio pueden entrara mi API
                methods: ["GET", "POST", "PUT"], //"Access-Control-Allow-Methods" para indicar que metodos puede ser consultados mediante mi servicio REST
                allowedHeaders: ["content-Type", "Authorization"], //"Access-Control-Allow-Headers", | para indicar que tip ode cabeceras pueden ser enviadas a mi servicio REST
            },
        });
        this.cors();
        this.bodyParser();
        this.rutas();
        this.configuracionSockets();
    }
    rutas() {
        this.app.get("/", (req, res) => {
            res.json({
                message: "Bienvenido a mi API de socket🔌",
            });
        });
    }
    bodyParser() {
        this.app.use(json());
    }
    cors() {
        this.app.use((req, res, next) => {
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Headers", "Content-Type", "Authorization");
            res.header("Access-Control-Allow-Methods", "GET, POST, PUT");
            next();
        })
    }
    configuracionSockets() {
        const usuarios = [];
        const mensajes = [];
        this.io.on("connect", (cliente) => {
            // el metodo CONNECT se llmara cuadno un cliente se conecte al servicio de SOCKETS
            console.log("SE CONECTO EL CLIENTE:");
            console.log(cliente.id);
        });
    }
    start() {
        this.httpServer.listen(this.puerto, () => {
            console.log(
                `Servidor de sockets 🔌 corriendo exitosamente en el puerto ${this.puerto}`
            );
        });
    }
}