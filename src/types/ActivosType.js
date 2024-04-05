const { gql } = require('apollo-server-express');

const activos_type = gql`
    enum Unidad {
        Kilogramo
        Litro
        Unidades
    }

    type Activo{
        id: ID
        nombre: String
        unidad: Unidad
        referenciaInterna: String
        fechaRegistro: Date
        estado: String
    }

    input ActivoInput{
        nombre: String
        unidad: Unidad
        referenciaInterna: String
        estado: String
    }

    type ActivoConMovimientos{
        id: ID
        nombre: String
        unidad: Unidad
        referenciaInterna: String
        fechaRegistro: Date
        estado: String
        movimientos: [MovimientosActivoType]
    }


    type RespuestaActivos{
        estado: Boolean
        data: Activo
        message: Date
    }

    type Query{
        obtenerActivos: [Activo]
        obtenerActivo(id: ID): Activo
        obtenerActivoConMovimientos(id: ID): ActivoConMovimientos
        obtenerActivosConMovimientos: [ActivoMovimientos]
    }

    type Mutation{
        insertarActivo(input: ActivoInput): RespuestaActivos
        actualizarActivo(id: ID, input: ActivoInput): RespuestaActivos
        desactivarActivo(id: ID): RespuestaActivos
    }

`;

module.exports = activos_type;