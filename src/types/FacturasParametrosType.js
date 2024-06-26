const { gql } = require('apollo-server-express');

const facturas_parametros_type = gql`

    type FacturasParametro{
        id: ID
        value: String
        type: String
    }

    type Query{
        obtenerFacturasParametrosByType(type: String): [FacturasParametro]
    }

`;

module.exports = facturas_parametros_type;