const { gql } = require('apollo-server-express');

const temporada_type = gql`

    type Temporada{
        id:ID
        fechaInicio: String
        fechaFin: String
        tipo: String
        nombre: String
        precio: Number
        descripcion: String
    }
    input TemporadaInput{
        fechaInicio: String
        fechaFin: String
        tipo: String
        nombre: String
        precio: Number
        descripcion: String
    }
    type RespuestaTemporada{
        estado: Boolean
        data: Temporada
        message: String
    }

     type Query{
        obtenerTemporada: [Temporada]
        obtenerTemporadaById(id:ID): Temporada
    }

    type Mutation{
        insertarTemporada(input: TemporadaInput):RespuestaTemporada
        actualizarTemporada(id: ID, input: TemporadaInput):RespuestaTemporada
    }
`;

module.exports = temporada_type;