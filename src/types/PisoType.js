const { gql } = require('apollo-server-express');

const pisos_type = gql`

    enum EstadoPiso{
        ACTIVO
        INACTIVO
    }

    type Piso{
        id: ID
        nombre: String
        numero: String
        estado: EstadoPiso
    }

    input PisoInput{
        nombre: String
        numero: String
        estado: EstadoPiso
    }

    type RespuestaPiso{
        estado: Boolean
        data: Piso
        message: Date
    }

    type Query{
        obtenerPisos: [Piso]
        obtenerPiso(id: ID): Piso
        obtenerMesasPorPiso(id: ID): [Mesa]
    }

    type Mutation{
        insertarPiso(input: PisoInput): RespuestaPiso
        actualizarPiso(id: ID, input: PisoInput): RespuestaPiso
        desactivarPiso(id: ID): RespuestaPiso
    }

`;

module.exports = pisos_type;