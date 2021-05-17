from flask import Flask
import flask;

#! la variable app sera la instancia de la clase Flask
#! el primer parametro para el contrscutor de la clase Flask tiene que ser el hilo en el cual se esta ejecutando la aplicacion (en el archivo principal de nuestro proyecto)
#! __name__ sircve para definir que nuestra clase aplicacion de flask se va a ejecutar en el archivo principal del proyecto
app = Flask(__name__)

# Usamos un decorador, def una funcion
# Es un controlador que se va ejecutar cuando se llame la ruta 127.0.0.1:5000/
@app.route('/')
def ruta_inicial():
    return {
        "message": "El servidor se ha levantado exitosamente"
    }

app.run(debug=True)