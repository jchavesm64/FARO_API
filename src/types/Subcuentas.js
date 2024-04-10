const { gql } = require('apollo-server-express');

const subcuentas_type = gql`

    type Productos{
        id: ID,
        cantidad: Number,
        precio: Number
    }

    input ProductosInput{
        id: ID,
        cantidad: Number,
        precio: Number
    }

    type Subcuenta{
        id: ID
        comanda: Comanda
        fecha: Date
        productos: [Productos]
        total: Number
    }

    input SubcuentaInput{
        comanda: ID
        fecha: Date
        productos: [ProductosInput]
        total: Number
    }

    type RespuestaSubcuenta{
        estado: Boolean
        data: Subcuenta
        message: Date
    }

    type Query{
        obtenerSubcuentas: [Subcuenta]
        obtenerSubcuenta(id: ID): Subcuenta
        obtenerSubcuentasPorComanda(id: ID): [Subcuenta]
    }

    type Mutation{
        insertarSubcuenta(input: SubcuentaInput): RespuestaSubcuenta
        actualizarSubcuenta(id: ID, input: SubcuentaInput): RespuestaSubcuenta
        desactivarSubcuenta(id: ID): RespuestaSubcuenta
    }

`;

module.exports = subcuentas_type;