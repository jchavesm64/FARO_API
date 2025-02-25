const { gql } = require('apollo-server-express');

const movimientos_restaurante_type = gql`
    type Platillos {
        id: ID
        nombre: String
        precio: Number
        observaciones: String
    }

    input PlatillosInput {
        id: ID
        nombre: String
        precio: Number
        observaciones: String
    }

    type MovimientoRestaurante {
        _id: ID
        fecha: Date!
        cliente: ID
        nombreFacturacion: String!
        comanda: ID!
        caja: ID
        condicionVenta: String
        medioPago: String
        tipoCambio: Number
        codigoMoneda: String
        platillos: [Platillos]
        numeroHabitacion: String
        reserva: ID
        subtotal: Number
        descuento: Number
        IVA: Number
        impuestoServicio: Number
        total: Number
    }
    input MovimientoRestauranteInput {
        fecha: Date!
        cliente: ID
        nombreFacturacion: String!
        comanda: ID!
        caja: ID
        condicionVenta: String
        medioPago: String
        tipoCambio: Number
        codigoMoneda: String
        platillos: [PlatillosInput]
        numeroHabitacion: String
        reserva: ID
        subtotal: Number
        descuento: Number
        IVA: Number
        impuestoServicio: Number
        total: Number
    }
    type RespuestaMovimientoRestaurante {
        estado: Boolean
        data: MovimientoRestaurante
        message: String
    }

    type Query {
        obtenerMovimientosRestaurante: [MovimientoRestaurante]
        obtenerMovimientosPorFecha(fechaInicio:Date, fechaFin:Date): [MovimientoRestaurante]
    }

    type Mutation {
        insertarMovimientoRestaurante(input: MovimientoRestauranteInput): RespuestaMovimientoRestaurante
    }
`;
module.exports = movimientos_restaurante_type;