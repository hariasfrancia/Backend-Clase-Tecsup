import { Sequelize } from "sequelize";
// creamos una variable
export const conexion = new Sequelize(
    "almacen",//database name
    "root", //username
    "root", // password
    {
        dialect: "mysql", // tambien podemos usar dialectos para pgadmin,sqlserver,sqlite3,mariaadb,mysql 
        // /*one of 'mysql | 'mariadb' | postgres 'mysql */ para sqllite se usa conexion URI
        host: "127.0.0.1",
        port: 3306,
        timezone: "-05:00", //no funciona en SQLITE
        dialectOptions: {
            //sirve para que al momento de mostrar las fechgas, automaticamente las convierta a string y no tener que hacer una converison manual
            dateStrings: true,
        },
        logging: false,
    }
);