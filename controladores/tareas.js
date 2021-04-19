// Es el encargado de hacer la logica cuando se llamea determinada ruta y con un determinado metodo(GET,POST,PUT)
const tareas = [];
// CRUD
// siempre todo controladore recibe un REQUEST (req) y un RESPONSE (res), ADICIONALMENTE A ELLO si usamos middlewares recibimos un tercer parametro opcional llamado NEXT (next) que es el encargado de pasar al siguiente controlador
// El request es todo lo que me va a madnar el cliente
// el response es la forma en la cual le voy a responder al cliente, se pude responder mediante un json(.json()) un texto (.send()) un estado (.status())
export const crearTarea = (req, res) =>{
    console.log(req.body);
    tareas.push(req.body);
    return res.json({
        content: tareas[tareas.length -1],
    });
}