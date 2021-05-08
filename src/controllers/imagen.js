import { subirArchivo } from "../utils/manejadorArchivosFirebase"

export const subirImagen = async (req, res) => {
    // Si subimos un solo archivo (sigle) usaremos el parametro <<req.file>>, caso contrario, si subimos varios archivos (array) usaremos el parametro <<req.file>>
    try {
        const link = await subirArchivo(req.file);
        return res.status(201).json({
            succes: true,
            content: link,
            message: "Imagen subida exitosamente",
        })
    } catch (error) {
        return res.status(500).json({
            succes: false,
            content: error,
            message: "Error al subir la imagen",
        });
    }
};

export const eliminarImagen = async (req, res) => {
    // 127.0.0.1:8000/eliminarImagen?nombre=juane.jpg
    // no usar eliminarImagen, en vez de ello, usar el id del usuario y con ello eliminar el usuario, antes de eliminarlo extraer su url de la imagen y luego sacar el nombre de la imagen y eliminar el usuario y eliminar la imagen de firebase
    console.log(req.query);
    const { nombre } = req.query; // destructuracion de un JSON
    //   const nombre = req.query.nombre;
    try {
        const resultado = await eliminarArchivo(nombre);
        return res.json({
            success: true,
            content: resultado,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            content: error,
        });
    }
};