import { DataTypes } from "sequelize";
import { conexion } from "../config/sequelize";

export default () =>
    conexion.define(
        "usuario",
        {
            usuarioId: {
                field: 'id',
                type: DataTypes.INTEGER,
            },
            usuarioNombre: {
                field: 'nombre',
                type: DataTypes.STRING(25),
            },
            usuarioApellido: {
                field: 'apellido',
                type: DataTypes.STRING(25),
            },
            usuarioCorreo: {
                field: 'correo',
                type: DataTypes.STRING(25),
                validate: {
                    isEmail: true,
                }
            },
            usuarioPassword: {
                field: 'password',
                type: DataTypes.TEXT,
            },
        },
        {
            tableName: "usuarios",
            timestamps: false,
        }
    );

