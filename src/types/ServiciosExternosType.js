const { gql } = require('apollo-server-express');

const servicios_extenos_type = gql`

    type ServiciosExternos{
        id:ID
        nombre: String
        descripcion: String
        precio: Number
        tipo: TipoServicio
        estado: String
    }

    input ServiciosExternosInput{
        nombre: String
        descripcion: String
        precio: Number
        tipo: ID
        estado: String
    }
        
    type RespuestaServiciosExternos{
        estado: Boolean
        data: Servicios
        message: String
    }

    type Query{
        obtenerServiciosExternos:[ServiciosExternos]
        obtenerServicioExterno(id:ID): ServiciosExternos
    }

    type Mutation{
        insertarServicioExterno(input: ServiciosInput):RespuestaServicios
        actualizarServicioExterno(id: ID, input: ServiciosInput):RespuestaServicios
        desactivarServicioExterno(id: ID):RespuestaServicios
    }

`
module.exports = servicios_extenos_type;