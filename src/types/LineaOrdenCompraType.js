const { gql } = require('apollo-server-express');

const linea_orden_compra_type = gql`
    scalar Date
    scalar Number

    type LineaOrdenCompra{
        id: ID
        estado: Estado
        producto: MateriaPrima
        impuesto: Impuesto
        precioUnitario: Number
        cantidad: Number
        cantidadRecibida: Number
        porcentajeDescuento: Number
        descuento: Number
        montoImpuestos: Number
        subtotalSinImpuesto: Number
        subtotalConImpuesto: Number
    }

    input LineaOrdenCompraInput{
        estado: Estado
        producto: ID
        impuesto: ID
        precioUnitario: Number
        cantidad: Number
        cantidadRecibida: Number
        porcentajeDescuento: Number
        descuento: Number
        montoImpuestos: Number
        subtotalSinImpuesto: Number
        subtotalConImpuesto: Number
    }

    type Query{
        obtenerLineasOrdenCompra(id:ID): [LineaOrdenCompra]
        obtenerLineaOrdenCompra(id:ID): LineaOrdenCompra
    }

    type RespuestaLineaOrdenCompra{
        estado: Boolean
        data: LineaOrdenCompra
        message: Date
    }

    type Mutation{
        insertarLineaOrdenCompra(input:LineaOrdenCompraInput): RespuestaLineaOrdenCompra
        actualizarLineaOrdenCompra(id:ID, input:LineaOrdenCompraInput): RespuestaLineaOrdenCompra
        desactivarLineaOrdenCompra(id:ID, idOrden:ID): RespuestaLineaOrdenCompra
    }
`;

module.exports = linea_orden_compra_type;