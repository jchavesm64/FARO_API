const { gql } = require('apollo-server-express');

const tipoMetodoPagoType = gql`
type TipoMetodoPago{
        id: ID
        nombre: String,
        estado: Estado
    }

    type Query{
        obtenerTiposMetodoPago: [TipoMetodoPago]
        obtenerTipoMetodoPagoById(id:ID):TipoMetodoPago
    }

    input TipoMetodoPagoInput{
        nombre: String,
        estado: Estado
    }

    type RespuestaTipoMetodoPago{
        estado: Boolean,
        data: TipoMetodoPago
        message: String
    }

    type Mutation{
        insertarTipoMetodoPago(input:TipoMetodoPagoInput):RespuestaTipoMetodoPago
        actualizarTipoMetodoPago(id:ID, input:TipoMetodoPagoInput):RespuestaTipoMetodoPago
        desactivarTipoMetodoPago(id:ID):RespuestaTipoMetodoPago
    }
`;

module.exports = tipoMetodoPagoType;