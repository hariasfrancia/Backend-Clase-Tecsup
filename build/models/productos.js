"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _sequelize = require("sequelize");

var _sequelize2 = require("../config/sequelize");

// Datatypes => https://sequelize.org/master/manual/model-basics.html#data-types
// Opciones para poner a la columnas: https://sequelize.org/master/manual/model-basics.html#column-options
// export default producto_model = () =>
var _default = () => _sequelize2.conexion.define("producto", // nombre del modelo
{
  productoId: {
    type: _sequelize.DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    unique: true,
    autoIncrement: true,
    field: 'id'
  },
  productoNombre: {
    type: _sequelize.DataTypes.STRING(45),
    field: "nombre"
  },
  productoPrecio: {
    type: _sequelize.DataTypes.DECIMAL(5, 2),
    field: "precio"
  }
}, {
  tableName: "productos",
  timestamps: true,
  // su valor por defecto es true
  // esto son campos de auditoria, se cran dos columna reatedAt, updatedAt, el
  // createdAt => se va a registrar la hora actual en la cual se creo ese ServiceWorkerRegistration,
  // updateAp => va a guardar la hora actual cuando cualquier campo se registre se modifique
  createdAt: "fecha_creacion",
  updatedAt: "ultima_modificacion"
});

exports.default = _default;