const { gql } = require('apollo-server-express');

const comandas_type = gql`

    type Comanda{
        id: ID
        piso: Piso
        mesa: Mesa
        fecha: Date
        preFactura: Boolean,
        estado: String,
        subcuentas: [Subcuenta]
    }

    input ComandaInput{
        piso: ID
        mesa: ID
        fecha: Date
        preFactura: Boolean,
    }

    type RespuestaComanda{
        estado: Boolean
        data: Comanda
        message: Date
    }

    type Query{
        obtenerComandas(piso:ID): [Comanda]
        obtenerComanda(id: ID): Comanda
        obtenerComandasPorMesa(mesaId: ID): [Comanda]
    }

    type Mutation{
        insertarComanda(input: ComandaInput): RespuestaComanda
        actualizarComanda(id: ID, input: ComandaInput): RespuestaComanda
        desactivarComanda(id: ID): RespuestaComanda
    }

`;

module.exports = comandas_type;