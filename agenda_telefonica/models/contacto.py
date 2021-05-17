from bd import bd
from sqlalchemy import Column, types


class ContactoModel (bd.Model):
    __tablename__ = "contactos"           #! modifica el nombre de la table en la base datos
    clienteId = Column(
        name="id",
        type_=types.Integer,
        primary_key=True,
        autoincrement=True,
        unique=True,
        nullable=False
    )
    clienteNombre = Column(
        name="nombre",
        type_=types.String(25),
        nullable=False
    )
    clienteApellido = Column(
        name="apellido",
        type_=types.String(25),
        nullable=False
    )
    clienteTitulo = Column(
        name="titulo",
        type_=types.String(25),
        nullable=False
    )
