// con js puro
// const {Server} = require('./config/server')
// con babelrc
import { Server } from "./config/Server";
const objServer = new Server();
objServer.iniciarServidor()
