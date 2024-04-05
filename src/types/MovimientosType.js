const { gql } = require('apollo-server-express');

const movimientos_type = gql`
    scalar Date
    scalar Number

    enum Tipo{
        ENTRADA
        SALIDA
    }    

    type MovimientosType{
        id: ID
        tipo: Tipo
        lote: String
        cedido: Boolean
        cliente: Cliente
        proveedor: Proveedor
        fecha: Date
        cantidad: Number
        existencia: Number
        precio: Number
        precio_unidad: Number
        moneda: String
        usuario: Usuario
        materia_prima: MateriaPrima,
        almacen: Almacen
    }

    type RespuestaMovimientos{
        estado: Boolean
        data: MovimientosType
        message: String
    }

    type RespuestaVerificar{
        estado: Number
        message: String
    }

    input item{
        id: ID
        nombre: String
        cantidad: Number
    }

    input salida{
        id: ID,
        cantidad: Number
    }

    input salidas{
        usuario: ID
        cotizacion: ID
        elementos: [salida]
    }

    input salida_inventario{
        tipo: Tipo
        proveedor: ID
        fecha: Date
        cantidad: Number
        usuario: ID
        materia_prima: ID
        almacen: ID
    }

    input MovimientosInput{
        tipo: Tipo
        lote: String
        cedido: Boolean
        cliente: ID
        proveedor: ID
        fecha: Date
        cantidad: Number
        existencia: Number
        precio: Number
        precio_unidad: Number
        moneda: String
        usuario: ID
        materia_prima: ID
        almacen: ID
    }

    input Items{
        items: [item]
    }

    type Query{
        obtenerMovimientos(id:ID): [MovimientosType]
        obtenerMovimientos2(id:ID): [MovimientosType]
    }

    type RespuestaUpload{
        estado: Boolean
        filename: String
        message: String
    }

    type Mutation{
        insertarMovimiento(input:MovimientosInput, almacen: ID):RespuestaMovimientos
        insertarSalida(input:salida_inventario, almacen: ID):RespuestaMovimientos
        verificarExistencias(input:Items):RespuestaVerificar
    }
`;

module.exports = movimientos_type;