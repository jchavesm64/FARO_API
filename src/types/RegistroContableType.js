const { gql } = require('apollo-server-express')

const registro_contable_type = gql`
    
    enum EstadoCuenta{
        PENDIENTE
        PAGADO
        BORRADOR
    }

    enum TipoPago{
        EFECTIVO
        CHEQUE
        TRANSFERENCIA
        SINPE
        TARJETA
    }

    enum TipoRegistroContable{
        COBRAR
        PAGAR
    }

    type RegistroContable{
        id: ID
        fechaRegistro: Date
        fechaPago: Date
        tipoPago: TipoPago
        tipoRegistroContable: TipoRegistroContable
        estado: Estado
        estadoRegistroContable: EstadoCuenta
        referenciaID: String
        referenciaNombre: String
        referenciaModelo: String
        cliente: Cliente
        proveedor: Proveedor
        usuario: Usuario
        monto: Float
        comprobantePago: String
        consecutivo: HistorialConsecutivo
    }

    input RegistroContableInput{
        fechaRegistro: Date
        fechaPago: Date
        tipoPago: TipoPago
        tipoRegistroContable: TipoRegistroContable
        estado: Estado
        estadoRegistroContable: EstadoCuenta
        referenciaID: String
        referenciaNombre: String
        referenciaModelo: String
        cliente: ID
        proveedor: ID
        usuario: ID
        monto: Float
        comprobantePago: String
        cedula: String
    }

    type RespuestaRegistroContable{
        estado: Boolean
        data: RegistroContable
        message: String
    }

    type Query{
        obtenerRegistroContable(id:ID): RegistroContable
        obtenerRegistrosContables: [RegistroContable]
        obtenerRegistrosContablesTipo(tipo: String): [RegistroContable]
    }

    type Mutation{
        insertarRegistroContable(input:RegistroContableInput):RespuestaRegistroContable
        actualizarRegistroContable(id:ID, input:RegistroContableInput):RespuestaRegistroContable
        desactivarRegistroContable(id:ID):RespuestaRegistroContable
    }

`;

module.exports = registro_contable_type;