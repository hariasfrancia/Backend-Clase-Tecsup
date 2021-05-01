import { compareSync, hashSync } from "bcrypt";
import { Usuario } from "../models/usuario";

// se einstala la libreria: yarn add bcrypt
export const registro = async (req, res) => {
    // Hay dos formas de hacer una creacion:
    // *Forma1:
    const objUsuario = new Usuario(req.body);
    // *Aca encriptamos la contraseña
    const pwdHash = hashSync(req.body.password, 10);
    objUsuario.password = pwdHash;
    // *fin de la encriptacion
    // ?La 1era forma todavia no guarda la BD, solamente construye el objeto, luego tendremos que llamar a su metodo .save() para que se guarde en la BD
    try {
        const nuevoUsuario = await objUsuario.save();
        return res.status(201).json({
            success: true,
            content: nuevoUsuario,
            message: "Usuario creado exitosamente",
        });
    } catch (error) {
        return res.status(400).json({
            success: false,
            content: error,
            message: "Error al guardar el usuario",
        });
    }

    // Forma2:
    // const nuevoUsuario = await Usuario.create(req.body)
    // Forma3:
    // Isertar varios registros

};
export const login = async (req, res) => {
    const { email, password } = req.body;
    const usuario = await Usuario.findOne({
        usuarioCorreo: email
    });
    // * PRIMERA FORMA
    // await Usuario.findOne({
    //     usuarioCorreo: {$regex: "."+email+"*."}
    // })
    // * SEGUNDA FORMA
    // * Esto retorna un array de coincidencias
    // await Usuario.where({
    //     usuarioCorreo: email
    // })
    // * TERCERA FORMA
    // ? encuentrame todos los usuarios que su correosea email y que su fecha de nacimiento sea mayor 2000-01-01
    // await Usuario.where("usuarioCorreo").equals(email).where("usuarioFechanacimiento").gt("2000-01-01")
    if (!usuario) {
        /**
     * ! EN VEZ DE REALIZAR EL RETO 20 y 21 hacer lo siguiente
     * TODO: Primer parte: implementar jwt
     * ? 1. la password de la token guardarla en el archivo .env
     * ? 2. usar process.env.JWT_SECRET
     * TODO: SEGUNDA PARTE: crear una ruta para crear y devolver todas las tareas de un usuario pero proteger la ruta con un JWT
     * TODO: TERCERA PARTE: subirlo a un REPO en github y compartir el repo
     */
        return res.status(404).json({
            success: false,
            content: null,
            message: "Usuario no existe",
        });
    }
    const resultado = compareSync(password, usuario.usuarioPassword);
    if (resultado) {
        return res.json({
            success: true,
            content: null,
            message: "Bienvenido",
        });
    }
    return res.status(401).json({
        success: false,
        content: null,
        message: "Credenciales incorrectas",
    });
};

export const mostrarUsuario = (req, res) => { };