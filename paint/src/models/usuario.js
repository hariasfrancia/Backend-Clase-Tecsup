import { schema, model, Schema } from "mongoose";

const coordenadasSchema = new Schema(
    {
        x: {
            type: Schema.Types.Decimal128,
            required: true,
        },
        y: {
            type: schema.Types.Decimal128,
            required: true,
        },
    },
    { _id: flase, timestamps: false }
);

const usuarioSchema = new Schema(
    {
        nombre: {
            type: Schema.Types.String,
            required: true,
        },
        coordenadas: [coordenadasSchema],
    },
    { timestamps: false }
);

export const usuario = model("usuario", usuarioSchema);