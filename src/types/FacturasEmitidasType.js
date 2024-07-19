const { gql } = require('apollo-server-express');

const facturas_emitidas = gql`

    type Receptor {
        Nombre: String
        IdentificacionTipo: String
        IdentificacionNumero: String
        NombreComercial: String
        CorreoElectronico: String
        CorreoElectronicoCC: String
        FaxArea: Int
        FaxNumero: Int
    }

    type Impuestos {
        Codigo: Int
        CodigoTarifa: String
        Tarifa: Int
        FactorIVA: Int
        MontoExportacion: Int
        Exoneracion: String
    }

    type LineasDetalle {
        EsServicio: Int
        CodigoCabys: Float
        CodigoTipo: [Int]
        Codigo: [String]
        PartidaArancelaria: String
        Cantidad: Int
        UnidadMedida: Int
        UnidadMedidaComercial: String
        Detalle: String
        PrecioUnitario: Float
        DescripcionExtra: String
        Descuento: Float
        DetalleDescuento: String
        Descuentos: String
        BaseImponible: Float
        Impuestos: [Impuestos]
    }

    type Encabezado {
        TipoDocumento: String
        SecuenciaControlada: Int
        NumeroConsecutivo: String
        Clave: String
        SecuenciaDocumento: Int
        Sucursal: Int
        Terminal: Int
        SituacionEnvio: Int
        CodigoActividad: String
        CantDeci: Int
        FechaEmision: String
        Receptor: Receptor
        CondicionVenta: String
        PlazoCredito: Int
        MedioPago: [String]
        TipoCambio: Int
        CodigoMoneda: String
    }

    type DocElectronicos {
        Encabezado: Encabezado
        LineasDetalle: [LineasDetalle]
        InformacionReferencia: String
    }

    type Data {
        CodigoCliente: String
        DocElectronicos: [DocElectronicos]
    }

    type FacturaEmitidaResponse {
        Id: ID
        Cliente: Int
        NumeroConsecutivo: String
        Clave: String
        CodigoRespuesta: Int
        Mensaje: String
        Fecha: Date
    }

    type FacturaEmitida {
        id: ID
        result: Boolean
        response: FacturaEmitidaResponse
        data: Data
    }

    type Query {
        obtenerFacturasEmitidas: [FacturaEmitida]
    }

`;

module.exports = facturas_emitidas;
