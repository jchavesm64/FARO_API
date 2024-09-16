const { gql } = require('apollo-server-express');
const GraphQLJSON = require('graphql-type-json');

const temporada_type = gql`
     scalar JSON

    type Temporada{
        id:ID
        fechaInicio: String
        fechaFin: String
        tipo: String
        nombre: String
        precio: Number
        tiposHabitacion: JSON
        descripcion: String
    }
    input TemporadaInput{
        fechaInicio: String
        fechaFin: String
        tipo: String
        nombre: String
        precio: Number
        tiposHabitacion: JSON
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