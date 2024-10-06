const { gql } = require('apollo-server-express');

const notas_type = gql`
    type Notas{
        id:ID
        nota: String
        area: Areas
        tipo: String
        estado: String
    }

    input NotasInput{
        nota: String
        area: ID
        tipo: String
        estado: String
    }
        
    type RespuestaNotas{
        estado: Boolean
        data: Areas
        message: String
    }

    type Query{
        obtenerNotas:[Notas]
        obtenerNota(id:ID): Notas
    }

    type Mutation{
        insertarNota(input: NotasInput):RespuestaNotas
        actualizarNota(id: ID, input: NotasInput):RespuestaNotas
        desactivarNota(id: ID):RespuestaNotas
    }

`;

module.exports = notas_type;