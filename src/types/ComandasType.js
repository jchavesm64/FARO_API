const { gql } = require('apollo-server-express');

const comandas_type = gql`

    enum EstadoComanda{
        GENERADA
        FINALIZADA
        DESCARTADA
    }

    type Comanda{
        id: ID
        mesa: Mesa
        fecha: Date
        preFactura: Boolean,
        estado: EstadoComanda,
        subcuentas: [Subcuenta]
    }

    input ComandaInput{
        mesa: ID
        fecha: Date
        preFactura: Boolean,
        estado: EstadoComanda,
    }

    type RespuestaComanda{
        estado: Boolean
        data: Comanda
        message: Date
    }

    type Query{
        obtenerComandas: [Comanda]
        obtenerComandasPendientes: [Comanda]
        obtenerComandaById(id: ID): Comanda
        obtenerComandaPorMesa(id: ID): Comanda
    }

    type Mutation{
        insertarComanda(input: ComandaInput): RespuestaComanda
        actualizarComanda(id: ID, input: ComandaInput): RespuestaComanda
        finalizarComanda(id: ID): RespuestaComanda
        desactivarComanda(id: ID): RespuestaComanda
    }

`;

module.exports = comandas_type;