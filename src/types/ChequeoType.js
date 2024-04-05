const { gql } = require('apollo-server-express')

const chequeo_type = gql`

    scalar Date
    scalar Number

    type AreasChequeo {
        area: String
        estado: Boolean
    }

    type Chequeo {
        id: ID
        puesto_limpieza: PuestoLimpieza
        areas: [AreasChequeo]
        fecha: Date
        fechaRegistro: Date
        aprobado: Boolean
        usuario: Usuario
    }

    type RespuestaBuscar {
        chequeo: Chequeo
        estado: Number
    }

    type Query {
        obtenerChequeos(id:ID, fecha1: Date, fecha2: Date): [Chequeo]
        obtenerTodosChequeos: [Chequeo]
        obtenerChequeoId(id:ID): Chequeo
    }

    input AreasChequeoInput {
        area: String
        estado: Boolean
    }

    input ChequeoInput {
        puesto_limpieza: ID
        areas: [AreasChequeoInput]
        fecha: Date
        fechaRegistro: Date
        aprobado: Boolean
        usuario: ID
    }

    type RespuestaChequeo {
        estado: Boolean
        message: String
    }

    type Mutation {
        insertarChequeo(input:ChequeoInput): RespuestaChequeo
        aprobarChequeo(id:ID): RespuestaChequeo
        obtenerChequeo(id:ID, fecha: Date): RespuestaBuscar
    }

`;

module.exports = chequeo_type
