"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Usuario = exports.Rol = exports.productoEstante = exports.Producto = exports.Estante = exports.Categoria = void 0;

var _categoria = _interopRequireDefault(require("../models/categoria"));

var _estante = _interopRequireDefault(require("../models/estante"));

var _productos = _interopRequireDefault(require("../models/productos"));

var _productoEstante = _interopRequireDefault(require("../models/productoEstante"));

var _rol = _interopRequireDefault(require("../models/rol"));

var _usuario = _interopRequireDefault(require("../models/usuario"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// creamos las variables con la referencias a sus modelso correspondientes
// al momento de llamarlos lo que vaa suceder es que se va a crear la tabla en la base de datos
// adicionalmente a ello almacenamos su resultado para poder crear posteriormenten sus relaciones
const Categoria = (0, _categoria.default)();
exports.Categoria = Categoria;
const Estante = (0, _estante.default)();
exports.Estante = Estante;
const Producto = (0, _productos.default)();
exports.Producto = Producto;
const productoEstante = (0, _productoEstante.default)();
exports.productoEstante = productoEstante;
const Rol = (0, _rol.default)();
exports.Rol = Rol;
const Usuario = (0, _usuario.default)(); // https://sequelize.org/master/manual/assocs.html
// uan vez definida todos los modelos ahora pasamos a crear sus relaciones
// Una categoria tiene muchos estantes
// Si no queremos perder toda la informacion de toda la base datos, por solamente resetear una tabla o varias tabals,
// Usuario.sync({ force: true });
// 

exports.Usuario = Usuario;
Categoria.hasMany(Estante, {
  foreignKey: {
    name: 'categorias_id',
    allowNull: false
  }
}); // Un estante pertenece a una categoria

Estante.belongsTo(Categoria, {
  foreignKey: "categorias_id"
});
Estante.hasMany(productoEstante, {
  foreignKey: {
    name: "estantes_id",
    allowNull: false
  }
});
productoEstante.belongsTo(Estante, {
  foreignKey: "estantes_id"
});
Producto.hasMany(productoEstante, {
  foreignKey: {
    name: "productos_id",
    allowNull: false
  }
});
productoEstante.belongsTo(Producto, {
  foreignKey: "productos_id"
});
Rol.hasMany(Usuario, {
  foreignKey: {
    name: "roles_id",
    allowNull: false
  }
});
Usuario.belongsTo(Rol, {
  foreignKey: "roles_id"
}); // Usuario.sync({ force: true });
// Para hacer copia de seguridad