const { gql } = require('apollo-server-express');

const tipoPlatillo_type = gql`
    type TipoPlatillo{
        id: ID
        nombre: String,
        estado: Estado
    }

    type Query{
        obtenerTiposPlatillo: [TipoPlatillo]
        obtenerTipoPlatilloById(id:ID):TipoPlatillo
    }

    input TipoPlatilloInput{
        nombre: String,
        estado: Estado
    }

    type RespuestaTipoPlatillo{
        estado: Boolean,
        data: TipoPlatillo
        message: String
    }

    type Mutation{
        insertarTipoPlatillo(input:TipoPlatilloInput):RespuestaTipoPlatillo
        actualizarTipoPlatillo(id:ID, input:TipoPlatilloInput):RespuestaTipoPlatillo
        desactivarTipoPlatillo(id:ID):RespuestaTipoPlatillo
    }
`;

module.exports = tipoPlatillo_type;