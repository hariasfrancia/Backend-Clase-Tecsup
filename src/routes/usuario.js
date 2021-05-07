import { Router } from "express";
import * as usuario_controller from "../controllers/usuario";
import Multer from "multer";

export const usuario_router = Router()
// configurar el midlleware de multer
const multer = Multer({
    storage: Multer.memoryStorage(), // con esta opcion le indicamos que se almacenara el archivo de manera temporal volatil (RAM) y se guardara en el servidor
    limits: {
        // Es una expresion en uniad de medida BYTES
        // 1 byte * 1024 = 1 kilobyte * 1024 = 1 megabyte * 1024 = 1 terabyte
        fileSize: 5 * 1024 * 1024// 5Mb
    }
})
// https://www.npmjs.com/package/multer#singlefieldname
usuario_router
    .route("/usuarios")
    .post(multer.single("imagen"), usuario_controller.crearUsuario);