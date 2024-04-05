const { gql } = require('apollo-server-express');

const recepcion_productos_type = gql`
    scalar Date
    scalar Number

    enum EstadoRecepcion{
        Borrador
        Confirmado
        Cancelado
    }

    type RecepcionProductos{
        id: ID
        estado: Estado
        proveedor: Proveedor
        pedido: OrdenCompra
        fechaPedido: Date
        fechaEntrega: Date
        estadoRecepcion: EstadoRecepcion
        subtotal: Number
        impuestosMonto: Number
        total: Number
    }
    

    input RecepcionProductosInput{
        estado: Estado
        proveedor: ID
        pedido: ID
        fechaPedido: Date
        fechaEntrega: Date
        estadoRecepcion: EstadoPedido
        subtotal: Number
        impuestosMonto: Number
        total: Number
    }

    type RespuestaRecepcionProductos{
        estado: Boolean
        data: RecepcionProductos
        message: Date
    }

    type Query{
        obtenerRecepcionPedidos(filtro:String): [RecepcionProductos]
        obtenerRecepcionPedido(id:ID): RecepcionProductos
    }

    type Mutation{
        insertarRecepcionPedido(input:RecepcionProductosInput): RespuestaRecepcionProductos
        actualizarRecepcionPedido(id:ID, input:OrdenCompraInput): RespuestaRecepcionProductos
        actualizarEstadoRecepcion(id:ID, estado:EstadoRecepcion): RespuestaRecepcionProductos
        desactivarRecepcion(id:ID): RespuestaRecepcionProductos
    }
`;

module.exports = recepcion_productos_type;

