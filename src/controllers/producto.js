import { Producto } from "../config/relaciones";

// CRUD
export const crearProducto = (req, res) => {
    // crear nuevo producto, las conexiones con la base de datos son asuincronas, usamos await
    // Cuando creamos un nuevo registro, este retornara el registro creado en la base datos
    const nuevoProducto = await Producto.create(req, body);
    return res.status(201).json({
        success: true,
        content: nuevoProducto,
        message: "Producto creado exitosamente",
    });
};