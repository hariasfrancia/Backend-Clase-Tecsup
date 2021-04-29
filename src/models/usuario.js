import { DataTypes } from "sequelize";
import { conexion } from "../config/sequelize";
import { compareSync, hashSync } from "bcrypt";
import { sign } from "jsonwebtoken";

export default () => {
    let usuario = conexion.define(
        "usuario",
        {
            usuarioId: {
                field: 'id',
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
                unique: true,
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
                unique: true,
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
    /**Aqui ira la encriptacion y algunos otros metodos PROPIOS DEL MODELO */
    usuario.prototype.setearPassword = function (password) {
        const hash = hashSync(password, 10);
        this.usuarioPassword = hash;
    };
    usuario.prototype.validarPassword = function (password) {
        return compareSync(password, this.usuarioPassword); // verifica si es o no la contraseña onc el hash guardado en la BAseDatos, si la contraseña es correcta retornara TRUE casocontrario FALSE
    };
    usuario.prototype.generarJWT = function () {
        const payload = {
            usuarioId: this.usuarioId,
            usuarioCorreo: this.usuarioCorreo,
        };
        // 
        const password = "password";
        return sign(payload, password, { expiresIn: "1h" });
    };

    return usuario;
};


