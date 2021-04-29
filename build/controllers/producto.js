"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.listarProductos = exports.crearProducto = void 0;

var _relaciones = require("../config/relaciones");

// CRUD
const crearProducto = async (req, res) => {
  // crear nuevo producto, las conexiones con la base de datos son asuincronas, usamos await
  // Cuando creamos un nuevo registro, este retornara el registro creado en la base datos
  // En sequealiza hay 2 formas de crear (agregar) un nuevo registro y es:
  // await Modelo.create(data) => va a crear el nuevo regostro en la bd y retorna su data creada
  // Modelo.buil() => tadavia no crea el regostro en la BD, hace la validacion de que todos los campos se cumplan,  va de la mano con -save() este si retorna una promesa y esto se usa para hacer un pre-configuracion de los campos antes de guardarlos en la BD.
  try {
    // Validacion
    // https://eloquentjs-es.thedojo.mx/09_regexp.html#h_NUFOUyK+lw
    const validacion = new RegExp(/^[a-zA-Z ]+$/); // expresion regular para todas solamente texto

    if (validacion.test(req.body.productoNombre)) {
      const nuevoProducto = await _relaciones.Producto.create(req.body);
      return res.status(201).json({
        success: true,
        content: nuevoProducto,
        message: "Producto creado exitosamente"
      });
    } else {
      return res.status(400).json({
        success: false,
        content: null,
        message: "Nombre del producto incorrecto"
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      content: error,
      message: "Hubo un error al registrar un producto"
    });
  }
};

exports.crearProducto = crearProducto;

const listarProductos = async (req, res) => {
  try {
    const productos = await _relaciones.Producto.findAll();
    return res.json({
      success: true,
      content: productos,
      message: null
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      content: error,
      message: "Error al devover los productos"
    });
  }
};

exports.listarProductos = listarProductos;