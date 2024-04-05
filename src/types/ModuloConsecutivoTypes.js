const { gql } = require('apollo-server-express');

const modulo_consecutivo_type = gql`
    type ModuloConsecutivo{
        id: ID
        nombre: String
        abreviatura: String
        actual: String
        siguiente: String
    }

    input ModuloConsecutivoInput{
        nombre: String
        abreviatura: String
    }

    type RespuestaModuloConsecutivo{
        estado: Boolean
        data: ModuloConsecutivo
        message: String
    }

    type Query{
        obtenerModulosConsecutivos: [ModuloConsecutivo]
        obtenerModuloConsecutivo(id:ID): ModuloConsecutivo
    }

    type Mutation{
        insertarModuloConsecutivo(input:ModuloConsecutivoInput): RespuestaModuloConsecutivo
        actualizarModuloConsecutivo(id:ID, input:ModuloConsecutivoInput): RespuestaModuloConsecutivo
        generarConsecutivo(input:GenerarConsecutivoInput): RespuestaGenerarConsecutivo
    }
    
    input GenerarConsecutivoInput{
        modulo: String,
        cedula: String,
    }

    type RespuestaGenerarConsecutivo{
        estado: Boolean
        data: HistorialConsecutivo
        message: String
    }

`;

module.exports = modulo_consecutivo_type;