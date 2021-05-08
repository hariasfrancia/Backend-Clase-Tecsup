// libreria que permite manipular nuestro storage de firebase
import { Storage } from "@google-cloud/storage";
// Inicializamos el objeto de firebase para poder conectarnos al almacenamiento (bucket)
const storage = new Storage({
    projectId: "codigoonine2-haf",
    keyFilename: "./credenciales_firebase.json",
});

// Ahora creamos ela instancia de nuestro storage
const bucket = storage.bucket("codigoonine2-haf.appspot.com")

export const subirArchivo = (archivo) => {
    return new Promise((resuelto, rechazo) => {
        // validamos que tengamos un archivo que subir
        if (!archivo) return rechazo("No se encontro el archivo");
        // Definimos el nombre del archivo con el cual se guardara en firebase storage
        const file = bucket.file(archivo.originalname);
        // Agregamos la configuración adicional de nuestro archivo como su extensión y formato
        const blobStream = file.createWriteStream({
            metadata: {
                contentType: archivo.mimetype,
            }
        });
        // Ahora el porceso de subida se genera en un segundo plano mediante el cual se controla en estados
        blobStream.on("error", (error) => {
            // Ingresara cuando el archivo tuvo problema para subirse a firebase
            return rechazo(error);
        });
        blobStream.on("finish", () => {
            // Ingresara a este arrow function cuando el archivo termine de subir eoxtosamente
            // getSignedUrl sirve para que nos brinde firebase una ruta para acceder a nuestro archivo fuera del storage
            file.getSignedUrl({
                action: "read",
                expires: "12-31-2021",
            }).then((link) => {
                return resuelto(link);
            }).catch((error) => {
                return rechazo(error);
            });
        });
        // culmino el proceso de conexion con firebase
        // le mando el contenido del archivo
        // en si este es el inicio y fin de la conexion con firebase, luego recien viene los estado de mas arriba
        blobStream.end(archivo.buffer);
    });
};

const eliminarArchivo = (nombreArchivo) => bucket.file(nombreArchivo).delete();