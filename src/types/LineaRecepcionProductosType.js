const { gql } = require('apollo-server-express');

const linea_recepcion_productos_type = gql`
    scalar Date
    scalar Number

    type LineasRecepcionPedido{
        id: ID
        estado: Estado
        producto: MateriaPrima
        almacen: Almacen
        recepcion: RecepcionProductos
        impuesto: Impuesto
        precioUnitario: Number
        cantidadSolicitada: Number
        cantidadRecibida: Number
        porcentajeDescuento: Number
        descuento: Number
        montoImpuestos: Number
        subtotalSinImpuesto: Number
        subtotalConImpuesto: Number
    }
    

    input LineasRecepcionPedidoInput{
        estado: Estado
        producto: ID
        almacen: ID
        recepcion: ID
        impuesto: ID
        precioUnitario: Number
        cantidadSolicitada: Number
        cantidadRecibida: Number
        porcentajeDescuento: Number
        descuento: Number
        montoImpuestos: Number
        subtotalSinImpuesto: Number
        subtotalConImpuesto: Number
    }

    type RespuestaLineasRecepcionPedido{
        estado: Boolean
        data: LineasRecepcionPedido
        message: Date
    }

    type Query{
        obtenerLineasRecepcionPedido(id:ID): [LineasRecepcionPedido]
        obtenerLineaRecepcionPedido(id:ID): LineasRecepcionPedido
    }

    type Mutation{
        insertarLineasRecepcionPedido(input:LineasRecepcionPedidoInput): RespuestaLineasRecepcionPedido
        actualizarLineasRecepcionPedido(id:ID, input:LineasRecepcionPedidoInput): RespuestaLineasRecepcionPedido
        actualizarCantidadRecibidaLineaRecepcion(id:ID, cantidad:Number, almacen:ID): RespuestaLineasRecepcionPedido
        desactivarLineasRecepcionPedido(id:ID): RespuestaLineasRecepcionPedido
    }
`;

module.exports = linea_recepcion_productos_type;

