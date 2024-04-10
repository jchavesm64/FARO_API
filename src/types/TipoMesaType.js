const { gql } = require('apollo-server-express');

const tipoMesa_type = gql`

    type TipoMesa{
        id: ID
        nombre: String
    }

    input TipoMesaInput{
        nombre: String
    }

    type RespuestaTipoMesa{
        estado: Boolean
        data: TipoMesa
        message: Date
    }

    type Query{
        obtenerTipoMesas: [TipoMesa]
        obtenerTipoMesa(id: ID): TipoMesa
    }

    type Mutation{
        insertarTipoMesa(input: TipoMesaInput): RespuestaTipoMesa
        actualizarTipoMesa(id: ID, input: TipoMesaInput): RespuestaTipoMesa
    }

`;

module.exports = tipoMesa_type;