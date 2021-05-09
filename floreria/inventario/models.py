from django.db import models

# Create your models here.


class AlmacenModel(models.Model):
    # aca iran las columnas en forma de atributos de la clase
    almacenId = models.AutoField(
        unique=True,  # Para que sea unico
        primary_key=True,  # Para que sea PK
        null=False,  # Para que no admita nulos
        # Campos que sirven para el panel administrativo de django
        verbose_name="Id del Almacen"
        db_column="id",  # Para que su nombre de la base datos sea diferente al del atributo
    )  # le indicamos que el atributo Id será un campo INTEGER y Autoincrementable. NOTA: Solamente puede haber un autoincrementable por modelo (no puede haber mas de uno)
    almacenNombre = models.CharField(
        max_length=30,  # Es obligatorio para cuando sea un CharField
        db_column="nombre",
        verbose_name="Nombre del Almacen",
        # Es un campo de ayuda que nos brinda una mejor informacion en el panel administrativo
        help_text="Nombrecito del Almacen",
    )

    almacenDireccion = models.TextField(
        db_column="direccion",
        # NOTA: solamente usar verbose_name, help_text para cuando vayamos a utilizar el panel administrativo, caso contrario su uso en nulo
        verbose_name="Direccion del almacen",
        help_text="Direccion expresada en texto indicado Calle Numero, Distrito, Provincia"
    )

    almacenEstado = models.BooleanField(
        # Para indicar un valor por defecto en caso el cliente (frontend) no me lo diese, evitar que esa columna quede con un valor vacio
        default=True,
        null=False,
        db_column="estado",
        verbose_name="Estado del Almacen",
        help_text="Estado de disponibilidad de almacen",

    )

    class Meta:
        # La calse META es una clase propia de la clases en python y sirve para pasasr metadaos (configuraciones adicionales) a la clase en la cual se esta haciendo la herencia ( eneste caso estamos heredando de la clase Model)
        # Para cambiar el nombre de la tabla en la BD:
        db_table = "almacenes",
        # Para cuando querramos leer la informacion de la BD que nos devuelva en eun orden especifico, es este caso le estamos diciendo que retorne ordenado por la columna nombbre en forma ascendente
        ordering = ["nombre", ]
        # sSirve par que dos o mas columnas no se pueda repetir su misma informacion de todas esas columas
        unique_together = [["nombre", "direccion"]]
        # ! Los siguientes campos para el panel administrativo:
        # se vera en el listado de los modelos en el panel administrativo
        verbose_name = "almacen"
        # se vera en el listado pero de una manera plural ya que puede contener varios registros
        verbose_name_plural = "almacenes"
