from flask import Flask, request
app = Flask(__name__)
supermercados = []

# !Solicitar informacion (traeme todos los supermercados, un super) => GET
# !Crear un nuevo Supermercado => POST
# !Acutalizar un Item en su totalidad => PUT
# !Eliminar por completo un Item => DELETE
# !Actualizacion Parcial (solamente quiero actualizar nombre, direccion) => PATCH
# {
#     "nombre": "Plaza B",
#     "direccion": "av. del sol 123",
#     "capacidad": 2000
# }
# !si no declaramos el metodo a acceder este sera GET predeterminadamente

@app.route("/")
def ruta_inicial():
    return 'Servidor funcionando exitosamente'

@app.route("/supermercados", methods=['GET', 'POST'])
def manejo_supermercados():
    # return 'Entro al manejo de supermercados'
    # El motodo get_json() convierte lo que llega adel front (body) a un diccionario para poder utilizar sin roblemas
    print(request.method)
    if request.method == 'GET':
        return { #Se coloca en json 
            "success": True,
            "content": supermercados,
            "message": None, # se retorna vacio
        }
    elif request.method == 'POST':
        print(request.get_json()) #! para leerlo el json desde el front, lo convierte el json a un diccionario
        supermercados.append(request.get_json())    #! mediante el metodo append lo agrego a mi lista de supermercados
        return {                                    #! retorno un mensaje a front
            "success": True,                        #! la info a sido gurardade exitosamente
            "content": request.get_json(),          #! retorno la misma informacion que me manda el front
            "message": "Supermercado creado exitosamente",
        }, 201                                      #! codigo de estado de creacion
    else:
        return 'Nunca debería ingresar aquí....🤣🤣🤣🤣'
# Uso de metodos en Flask

# !Dos formas de recibir el parametro por la URL
# !127.0.0.1/supermercados/  <- id del supermercado
@app.route("/supermercados/<int:id_super>", methods=['GET','PUT','DELETE','PATCH'])
def manejo_supermercado(id_super):
    print(id_super)
    return 'ok'


# !127.0.0.1/supermercados/?nombre=supera&capacidad=1000     ....... recibe dos parametros: el nombre y la capacidad
app.run(debug=True)