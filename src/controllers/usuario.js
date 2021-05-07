export const crearUsuario = (req, res) => {
    // si subimos un solo archivo (sigle) usaremos el parametro <<file>>, caso contrario, si subimos varios archivos (array) usaremos el parametro <<req.files>>
    console.log(req.file);
    return res.json({
        success: true,
    })
};