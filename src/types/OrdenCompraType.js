const { gql } = require('apollo-server-express');

const orden_compra_type = gql`
    scalar Date
    scalar Number

    enum EstadoPedido{
        Borrador
        Confirmado
        Cancelado
        Recibido
        Facturado
    }

    type OrdenCompra{
        id: ID
        estado: Estado
        proveedor: Proveedor
        fechaPedido: Date
        estadoPedido: EstadoPedido
        numeroComprobante: String
        lineasPedido: [LineaOrdenCompra]
        subtotal: Number
        impuestosMonto: Number
        total: Number
        consecutivo: HistorialConsecutivo
    }

    type Query{
        obtenerOrdenesCompra(filtro:String): [OrdenCompra]
        obtenerOrdenCompra(id:ID): OrdenCompra
    }

    input OrdenCompraInput{
        estado: Estado
        proveedor: ID
        fechaPedido: Date
        estadoPedido: EstadoPedido
        numeroComprobante: String
        subtotal: Number
        impuestosMonto: Number
        total: Number
        cedula: String
    }

    type RespuestaOrdenCompra{
        estado: Boolean
        data: OrdenCompra
        message: Date
    }

    input LineasEditarInput{
        id: ID
        linea: LineaOrdenCompraInput
    }

    type Mutation{
        insertarOrdenCompra(input:OrdenCompraInput, inputLineas: [LineaOrdenCompraInput]): RespuestaOrdenCompra
        actualizarOrdenCompra(id:ID, input:OrdenCompraInput, inputLineasEditar: [LineasEditarInput]): RespuestaOrdenCompra
        actualizarEstadoOrdenCompra(id:ID, estado:EstadoPedido): RespuestaOrdenCompra
        desactivarOrdenCompra(id:ID): RespuestaOrdenCompra
    }
`;

module.exports = orden_compra_type;