import { Router } from "express"
import { crearTarea, listarTareaPorId, listarTareas } from "../controladores/tareas"

export const tareas_router = Router();

tareas_router.route("/tareas").post(crearTarea).post(crearTarea).get(listarTareas);
// Para ahcer un parametro por URL DINAMICO simplemente definimos el nombre de esa variable pero con ":" para que express sepa qu es dinamico
// /tarea/is  => /tarea/id
// /tarea/:id => /tarea/cosa
tareas_router.route("/tarea/:id").get(listarTareaPorId)
