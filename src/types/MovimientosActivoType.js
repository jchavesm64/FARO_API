const { gql } = require('apollo-server-express');

const movimientos_activo_type = gql`
    enum Tipo{
        ENTRADA
        SALIDA
    }    

    type MovimientosActivoType{
        id: ID
        tipo: Tipo
        beneficiario: String
        fecha: Date
        activos: [Activo]
        consecutivo: HistorialConsecutivo
    }

    type RespuestaMovimientosActivo{
        estado: Boolean
        data: MovimientosActivoType
        message: String
    }

    input MovimientosActivoInput{
        tipo: Tipo
        beneficiario: String
        fecha: Date
        activos: [ID]
        cedula: String
    }

    type Query{
        obtenerMovimientosActivos: [MovimientosActivoType]
    }

    type Mutation{
        insertarMovimientosActivo(input: MovimientosActivoInput): RespuestaMovimientosActivo
    }

`;

module.exports = movimientos_activo_type;