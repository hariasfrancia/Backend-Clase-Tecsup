// Un usuario puede tener varios telefonos, sin embargo, un telefono pertenece a u nsolo usaurio, ahcer le modelado den bd no relacional (mongodb)o
// El usuario tiene:
// * nombre (required)
// * apellido (required)
// * dirección
// * fotografia
// * sexo (required)
//  ! el telefono no tiene:
// * codigo de ciudad
// * numero de telefono (required, solo numerico)
//  No se necesita time stamps para ninguno de los casos

import { Schema, model } from "mongoose";

const telefonoSchema = new Schema({
    codigo_ciudad: {
        type: Schema.Types.Number,

    },
    numero: {
        type: Schema.Types.Number,
        unique: true,
        required: true,
    }
},
    {
        _id: false,// Sirve para qu en ese esquma no se genere automaticamente el identificador unico
        timestamps: false,
    }
);

const usuarioSchema = new Schema({
    nombre: {
        required: true,
        type: Schema.Types.String,
        maxlength: 50,
        minlength: 10,
    },
    apellido: {
        required: true,
        type: Schema.Types.String,
    },
    direccion: Schema.Types.String,
    fotografia: Schema.Types.String,
    sexo: {
        required: true,
        type: Schema.Types.String,
    },
    telefonos: [telefonoSchema],
},
    {
        timestamps: false,
    }
);

export const Usuario = model("usuario", usuarioSchema);