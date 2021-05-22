import Server from "../config/server"
import { Usuario } from "../models/usuario"

export const ingresarCoordenada = async (data) => {
    // Creo mi instancia de mi servidors, y gracias a mi patron singleton si ya hay una instancia creada, no creara otra y se reusa la que ya esta creada
    const objServidor = new Server();
    // de la informacion que meesta mandando mi cliente del socket, extraere la posicion x, posicionY y el nombre dle usuario
    const { x, y, usuario_nombre } = data;
    // buscare segun el nombre del usuario, sus coordenadas
    const { coordenadas } = await Usuario.findOne({ nombre: usuario_nombre });
    // agrego a ese registro de coordenadas, las ultimas coordenads mandadas por el socket
    coordenadas.push({
        x,
        y,
    });
    // actualizo el usuario con las nuevas coordenadas ingresadas
    await Usuario.findOneAndUpdate({ nombre: usuario_nombre }, { coordenadas });
    // Ahora buscamos todos los usuarios para devolver con sus coordenadas
    const usuarios = await Usuario.find()
    // Entro el evento para uqe todoas los clientes conectados escuchen loscambiso en tiempo real
    objServidor.io.emit("coordenadas", usuarios);
};