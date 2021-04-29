"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.watchmen = void 0;

var _jsonwebtoken = require("jsonwebtoken");

// para poder usar las variables declaradas en el archivo .env en eeste archivo debeos declarar lo siguietne
require("dotenv").config();

// import { Usuario } from "../config/relaciones";
const verificarToken = token => {
  try {
    // el metodo usara la contraseña, para ver si la token es la correcta, si tiene tiempo de ida y si es una token valida (tiene una buen formato) caso contrario saltara el catch
    const payload = (0, _jsonwebtoken.verify)(token, process.env.JWT_SECRET); // si la token esta buena no retornara el payload de dicha token

    return payload;
  } catch (error) {
    // si la token no es valida ( oa password no concuerda o si ya exppiro) entrar al catch y bos devolvera u njson con la llave message en la cual indicara la razon del porque
    return error.message;
  }
};

const watchmen = (req, res, next) => {
  if (!req.headers.authorization) {
    // si no esta correctamente autorizado
    return res.status(401).json({
      sucess: false,
      content: null,
      message: "Se necesita una token para esta ruta"
    });
  } // 


  const token = req.headers.authorization.split(" ")[1];
  const resultado = verificarToken(token);

  if (typeof resultado === "object") {
    next();
  } else {
    return res.status(401).json({
      sucess: false,
      content: resultado,
      message: "No estas autorizado para realizar esta solicitud"
    });
  }
};

exports.watchmen = watchmen;