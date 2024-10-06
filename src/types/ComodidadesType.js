const { gql } = require('apollo-server-express');

const comodidades_type = gql`

    type Comodidades{
        id:ID
        nombre: String
        descripcion: String
        estado: String
    }

    input ComodidadesInput{
        nombre: String
        descripcion: String
        estado: String
    }
        
    type RespuestaComodidades{
        estado: Boolean
        data: Comodidades
        message: String
    }

    type Query{
        obtenerComodidades:[Comodidades]
        obtenerComodidadById(id:ID): Comodidades
    }

    type Mutation{
        insertarComodidad(input: ComodidadesInput):RespuestaComodidades
        actualizarComodidad(id: ID, input: ComodidadesInput):RespuestaComodidades
        desactivarComodidad(id: ID):RespuestaComodidades
    }

`
module.exports = comodidades_type;