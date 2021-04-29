import { Categoria, categoria } from "../config/relaciones";
export const crearCategoria = async (req, res) => {
    // crear una categoria
    // retornar un estado si se creo exitosamente
    // retornar un estado  si hubo algun error
    // mandar un screenshot del codigo y del postman
    try {
        // antes de agregar la nueva categoria primero validar que no existe, si existe, entoces no guardar y retornar
        // un status BAD REQUEST(400) indicando que la categoria ya existe
        const { categoriaNombre } = req.body;
        const coincidencia = await Categoria.findOne({
            where: {
                categoriaNombre,
            },
        });
        if (coincidencia) {
            return res.status(400).json({
                sucess: false,
                content: null,
                message: "Categoria ya existe",
            })
        }
        const nuevaCategoria = await Categoria.create(req.body);  // es una promesa, con la palabra await espera
        res.status(201).json({
            sucess: true,
            content: nuevaCategoria,
            message: "Categoria creada exitosamente"
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            content: error,
            message: "Error al crear la categoria",
        });
    }
};

// const mipromesa = new Promise((resolve, reject) => {
//     resolve('Todo bien')
//     reject('Todo mal')
// });

// mipromesa
//     .then((rpta) => {
//         console.log(rpta);
//     })
//     .catch((error) => {
//         console.log(error);
//     });