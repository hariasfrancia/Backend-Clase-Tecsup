"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = _interopRequireDefault(require("express"));

var _bodyParser = require("body-parser");

var _sequelize = require("./sequelize");

var _producto = require("../routes/producto");

var _usuario = require("../routes/usuario");

var _categoria = require("../routes/categoria");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class Server {
  constructor() {
    this.app = (0, _express.default)(); // Definimos el puerto que por lo general es una variable de entoron (esto solo se da en servidores de produccion como HEROKU, DIGITAL OCEN, AZURE) en el caso que no encontrase esa variable de entorno estara el definido (8000)

    this.port = process.env.PORT || 8001;
    this.bodyParser();
    this.rutas();
  }

  bodyParser() {
    // Serive para configurar la forma en la cual el API REST vva a recibir datos del front mediante el body
    this.app.use((0, _bodyParser.json)());
  }

  rutas() {
    this.app.use(_producto.producto_router);
    this.app.use(_usuario.usuario_router);
    this.app.use(_categoria.categoria_router);
  }

  start() {
    //Sirver para levantar el servidor en el cual le tenemos que pasar el puerto y si todo es exitoso ingresaremos al callback (segundo parametro)
    this.app.listen(this.port, async () => {
      console.log(`Servidor corriendo en: http//:127.0.0.1:${this.port}`); // esto va a tratar de conectarse con el servido usando las credenciales definidas anteriormente
      // alter => si hubo algun cambio en la BD volvera a generar SOLAMENTE esos cambios
      // force => RESETEA (borra) toda la BD y su contenido y lo vuelve a crear de 0, NUNCA USAR ESTO EN MODO PRODUCCION

      try {
        // await conexion.sync({ force: true }); => { force: true } con esto se resetea y vuelve a crear la base datos
        await _sequelize.conexion.sync();
        console.log("Base de datos sincronizada correctamente");
      } catch (error) {
        console.log(error);
      }
    });
  }

}

exports.default = Server;