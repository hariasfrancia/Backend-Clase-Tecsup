"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.conexion = void 0;

var _sequelize = require("sequelize");

// creamos una variable
const conexion = process.env.JAWSDB_URL ? new _sequelize.Sequelize(process.env.JAWSDB_URL, {
  dialect: "mysql",
  timezone: "-05:00",
  logging: false,
  dialectOptions: {
    dateStrings: true
  }
}) : new _sequelize.Sequelize("almacen", // database name
"root", // username
"root", // password
{
  dialect: "mysql",
  // tambien podemos usar dialectos para pgadmin, sqlserver, sqlite3, mariadb, mysql
  // /* one of 'mysql' | 'mariadb' | 'postgres' | 'mssql' */ para sqlite se usa connection URI
  host: "127.0.0.1",
  port: 3306,
  timezone: "-05:00",
  // no funciona en SQLITE
  dialectOptions: {
    // sirve para que al momento de mostrar las fechas, automaticamente las convierta en string y no tener que hacer una conversion manual
    dateStrings: true
  },
  logging: false
}); // export const conexion = process.env.JAWSDB_URL ? new Sequelize new Sequelize(
//     "almacen",//database name
//     "root", //username
//     "root", // password
//     {
//         dialect: "mysql", // tambien podemos usar dialectos para pgadmin,sqlserver,sqlite3,mariaadb,mysql 
//         // /*one of 'mysql | 'mariadb' | postgres 'mysql */ para sqllite se usa conexion URI
//         host: "127.0.0.1",
//         port: 3306,
//         timezone: "-05:00", //no funciona en SQLITE
//         dialectOptions: {
//             //sirve para que al momento de mostrar las fechgas, automaticamente las convierta a string y no tener que hacer una converison manual
//             dateStrings: true,
//         },
//         // logging: true,
//         logging: false,
//     }
// );

exports.conexion = conexion;