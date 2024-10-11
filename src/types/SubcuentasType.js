const { gql } = require('apollo-server-express');

const subcuentas_type = gql`

    type Platillos{
        id: ID,
        cantidad: Number,
        nombre: String,
        precio: Number,
        descuento: Number,
    }

    input PlatillosInput{
        id: ID,
        cantidad: Number,
        nombre: String,
        precio: Number,
        descuento: Number,
    }

    type FormaPago{
        tipo: TipoMetodoPago
        monto: Number
        moneda: String
    }

    input FormaPagoInput{
        tipo: ID
        monto: Number
        moneda: String
    }

    enum SubcuentaEstado{
        Pendiente
        Pagado
        Cancelado
    }

    type Subcuenta{
        id: ID
        numero: Number
        comanda: Comanda
        cliente: Cliente
        fecha: Date
        platillos: [Platillos]
        descuento: Number
        total: Number
        moneda: String
        formaPago: [FormaPago]
        estado: SubcuentaEstado
    }

    input SubcuentaInput{
        numero: Number
        comanda: ID
        cliente: ID
        fecha: Date
        platillos: [PlatillosInput]
        descuento: Number
        total: Number
        moneda: String
        formaPago: [FormaPagoInput]
        estado: SubcuentaEstado
    }

    type RespuestaSubcuenta{
        estado: Boolean
        data: Subcuenta
        message: Date
    }

    type Query{
        obtenerSubcuentas: [Subcuenta]
        obtenerSubcuentaById(id: ID): Subcuenta
        obtenerSubcuentasPorComanda(id: ID): [Subcuenta]
    }

    type Mutation{
        insertarSubcuenta(input: SubcuentaInput): RespuestaSubcuenta
        actualizarSubcuenta(id: ID, input: SubcuentaInput): RespuestaSubcuenta
        desactivarSubcuenta(id: ID): RespuestaSubcuenta
    }

`;

module.exports = subcuentas_type;