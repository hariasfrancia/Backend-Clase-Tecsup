// Datatypes => https://sequelize.org/master/manual/model-basics.html#data-types
import { DataTypes } from "sequelize";
import { conexion } from "../config/sequelize";

// Opciones para poner a la columnas: https://sequelize.org/master/manual/model-basics.html#column-options
// export default producto_model = () =>
export default () =>
    conexion.define(
        "producto", // nombre del modelo
        {
            productoId: {
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true,
                unique: true,
                autoIncrement: true,
                field: 'id',
            },
            productoNombre: {
                type: DataTypes.STRING(45),
                field: "nombre",
            },
            productoPrecio: {
                type: DataTypes.DECIMAL(5, 2),
                field: "precio",
            },
        },
        {
            tableName: "productos",
            timestamps: true, // su valor por defecto es true
            // esto son campos de auditoria, se cran dos columna reatedAt, updatedAt, el
            // createdAt => se va a registrar la hora actual en la cual se creo ese ServiceWorkerRegistration,
            // updateAp => va a guardar la hora actual cuando cualquier campo se registre se modifique
            createdAt: "fecha_creacion",
            updatedAt: "ultima_modificacion",
        }
    );

