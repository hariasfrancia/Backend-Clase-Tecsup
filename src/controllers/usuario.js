import { Usuario } from "../config/relaciones";

export const registro = async (req, res) => {
    try {
        //  vamos utilizar la creacion en 2 pasos
        const { password } = req.body;
        const nuevoUsuario = Usuario.build(req.body);
        // con esto ya hemos encriptado la contraseña de texto plano ea un HASH
        nuevoUsuario.setearPassword(password);
        await nuevoUsuario.save();
        return res.status(201).json({
            success: true,
            content: nuevoUsuario,
            message: "Usuario creado exitosamente"
        });
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success: false,
            content: error,
            message: "Error al crear usuario"
        });
    }
};