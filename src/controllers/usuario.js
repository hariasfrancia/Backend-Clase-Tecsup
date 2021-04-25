import { Usuario } from "../config/relaciones";

export const registro = async (req, res) => {
    try {
        // vamos a utilizar la creacion en dos pasos
        const { password } = req.body;
        const nuevoUsuario = Usuario.build(req.body);
        // con esto ya hemos encriptado la contraseña de texto plano a un HASH
        nuevoUsuario.setearPassword(password);
        await nuevoUsuario.save();
        return res.status(201).json({
            success: true,
            content: nuevoUsuario,
            message: "Usuario creado exitosamente",
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            content: error,
            message: "Error al crear el usuario",
        });
    }
};

export const login = async (req, res) => {
    const { email, password } = req.body;
    // ver si hay un usuario con ese correo
    try {
        const usuarioEncontrado = await Usuario.findOne({
            where: {
                usuarioCorreo: email,
            },
        });
        if (!usuarioEncontrado) {
            return res.status(404).json({
                success: false,
                content: null,
                message: "Usuario no encontrado",
            });
        }
        const resultado = usuarioEncontrado.validarPassword(password);
        if (resultado) {
            return res.json({
                success: true,
                content: usuarioEncontrado.generarJWT(),
                message: "Bienvenido",
            });
        } else {
            return res.status(400).json({
                success: false,
                content: null,
                message: "Contraseña incorrecta",
            });
        }
    } catch (error) {
        return res.status(500).json({
            success: false,
            content: error,
            message: "Error al hacer el login",
        });
    }
};
// import { Usuario } from "../config/relaciones";
// import { usuario_router } from "../routes/usuario";

// export const registro = async (req, res) => {
//     try {
//         //  vamos utilizar la creacion en 2 pasos
//         const { password } = req.body;
//         const nuevoUsuario = Usuario.build(req.body);
//         // con esto ya hemos encriptado la contraseña de texto plano ea un HASH
//         nuevoUsuario.setearPassword(password);
//         await nuevoUsuario.save();
//         return res.status(201).json({
//             success: true,
//             content: nuevoUsuario,
//             message: "Usuario creado exitosamente"
//         });
//     } catch (error) {
//         console.log(error)
//         return res.status(500).json({
//             success: false,
//             content: error,
//             message: "Error al crear usuario"
//         });
//     }
// };

// export const login = async (req, res) => {
//     const { email, password } = req.body
//     // ver si hayun usuario con ese correo
//     try {
//         const usuarioEncontrado = await usuario.findOne({
//             where: {
//                 usuarioCorreo: email,
//             },
//         });
//         if (!usuarioEncontrado) {
//             return res.status(404).json({
//                 success: false,
//                 content: null,
//                 message: "Usuario no encontrado",
//             });
//         }
//         const resultado = usuarioEncontrado.validarPassword(password)
//         if (resultado) {
//             return res.json({
//                 success: true,
//                 content: null,
//                 message: "Bienvenido",
//             });
//         } else {
//             return res.status(400).json({
//                 success: false,
//                 content: null,
//                 message: "Contraseña incorrecto",
//             });
//         }
//     } catch (error) {
//         return res.status(500).json({
//             success: false,
//             content: error,
//             message: "Error al hacer login",
//         })
//     }
// };