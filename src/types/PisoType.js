const { gql } = require('apollo-server-express');

const pisos_type = gql`

    enum EstadoPiso{
        ACTIVO
        INACTIVO
    }

    type Piso{
        id: ID
        nombre: String
        estado: EstadoPiso
    }

    input PisoInput{
        nombre: String
        estado: EstadoPiso
    }

    type RespuestaPiso{
        estado: Boolean
        data: Piso
        message: Date
    }

    type ComandaConSubcuentas{
        comanda: Comanda
        subcuentas: [Subcuenta]
    }

    type MesaConComandas{
        mesa: Mesa
        comandas: [ComandaConSubcuentas]
    }

    type ComandasPorPiso{
        piso: Piso
        mesas: [MesaConComandas]
    }

    type Query{
        obtenerPisos: [Piso]
        obtenerPisoById(id: ID): Piso
        obtenerMesasPorPiso(id: ID): [Mesa]
        obtenerComandasPorPiso(id: ID): ComandasPorPiso
    }

    type Mutation{
        insertarPiso(input: PisoInput): RespuestaPiso
        actualizarPiso(id: ID, input: PisoInput): RespuestaPiso
        desactivarPiso(id: ID): RespuestaPiso
    }

`;

module.exports = pisos_type;