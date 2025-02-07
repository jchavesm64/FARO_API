const { gql } = require('apollo-server-express');

const subcuentas_type = gql`
    enum PlatilloEstado{
        Pendiente
        Pagado
        Cancelado
        Entregado
    }
    type Platillos{
        _id: ID
        id: ID,
        nombre: String,
        precio: Number,
        descuento: Number,
        estado: PlatilloEstado,
        observaciones: String,
    }

    input PlatillosInput{
        _id: ID
        id: ID,
        nombre: String,
        precio: Number,
        descuento: Number,
        estado: PlatilloEstado,
        observaciones: String,
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

    input actualizarEntregadosInput{
        subcuenta: ID
        platillo: ID
        entregados: Number
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
        actualizarEntregados(id: ID, input: actualizarEntregadosInput): RespuestaSubcuenta
        desactivarSubcuenta(id: ID): RespuestaSubcuenta
        desactivarPlatillo(subcuentaId: ID, platilloId: ID): RespuestaSubcuenta
    }

`;

module.exports = subcuentas_type;