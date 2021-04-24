import categoria_model from "../models/categoria";
import estante_model from "../models/estante";
import producto_model from "../models/productos";
import producto_estante_model from "../models/productoEstante";
import rol_model from "../models/rol";
import usuario_model from "../models/usuario";


// creamos las variables con la referencias a sus modelso correspondientes
// al momento de llamarlos lo que vaa suceder es que se va a crear la tabla en la base de datos
// adicionalmente a ello almacenamos su resultado para poder crear posteriormenten sus relaciones
export const Categoria = categoria_model();
export const Estante = estante_model();
export const Producto = producto_model();
export const productoEstante = producto_estante_model()
export const Rol = rol_model()
export const Usuario = usuario_model()

// https://sequelize.org/master/manual/assocs.html
// uan vez definida todos los modelos ahora pasamos a crear sus relaciones
// Una categoria tiene muchos estantes

Categoria.hasMany(Estante, {
    foreignKey: {
        name: 'categorias_id',
        allowNull: false,
    },
});
// Un estante pertenece a una categoria
Estante.belongsTo(Categoria, {
    foreignKey: "categorias_id"
})

Estante.hasMany(productoEstante, {
    foreignKey: {
        name: "estantes_id",
        allowNull: false,
    }
});

productoEstante.belongsTo(Estante, {
    foreignKey: "estantes_id",
});
Producto.hasMany(productoEstante, {
    foreignKey: {
        name: "productos_id",
        allowNull: false,
    },
});
productoEstante.belongsTo(Producto, {
    foreignKey: "productos_id",
});

Rol.hasMany(Usuario, {
    foreignKey: {
        name: "roles_id",
        allowNull: false,
    },
});
Usuario.belongsTo(Rol, {
    foreignKey: "roles_id",
});