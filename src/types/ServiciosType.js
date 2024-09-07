const { gql } = require('apollo-server-express');

const servicios_type = gql`

    type Servicios{
        id:ID
        nombre: String
        descripcion: String
        precio: Number
        estado: String
    }

    input ServiciosInput{
        nombre: String
        descripcion: String
        precio: Number
        estado: String
    }
        
    type RespuestaServicios{
        estado: Boolean
        data: Servicios
        message: String
    }

    type Query{
        obtenerServicios:[Servicios]
        obtenerServicio(id:ID): Servicios
    }

    type Mutation{
        insertarServicio(input: ServiciosInput):RespuestaServicios
        actualizarServicio(id: ID, input: ServiciosInput):RespuestaServicios
        desactivarServicio(id: ID):RespuestaServicios
    }

`
module.exports = servicios_type;