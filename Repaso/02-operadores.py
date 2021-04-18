#Operadores Aritmeticos
#Todos los operadores solamente funcinan en variables numericas
#typeError es cuando qetamos queriendo hacer algon uy no  se puede con ese tipo de variale
var1 = 27
var2 = 5

resultado = var1 + var2
print("El Resultado es:", resultado)

resultado = var1 - var2 #Resta
resultado = var1 * var2 #Multiplicacion
resultado = var1 / var2 #Division
print("La division es:",resultado)
resultado = var1 % var2 #Modulo | su resultado solo es hasta la parte entera
print("El modulo es", resultado)
resultado = var1 // var2 #Cociente | su resultado solo es hasta la parte entera
print("El cociente es:",resultado)
resultado = var1 ** var2 #Exponente
print("El exponente es:",resultado)

#OPERADORES DE ASIGNACION
#Igual (=)
#Incremento
resultado = resultado + var1
resultado += var1
# Decremento
resultado -= var1
# Multiplicacion
resultado *= var1
# Division
resultado /= var1
# Potencia
resultado **= var1

#Operadores de Comparacion
# = asignacion

print(5 == 4)

# == comparacion, para saber si el valor de la izq es igual al valor de la derecha (retorna un True o False (bool))
# con la fuente de vsc
# != para saber si el valor de la izq es diferente al valor de la derecha
print(5 != 4)

# < > es menor | es mayor
print(10 > 5)

# >=, <=, es mayor o igual, es menor o igual
print(10 >= 10)