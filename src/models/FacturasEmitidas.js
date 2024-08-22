const mongoose = require('mongoose');

const ReceptorSchema = new mongoose.Schema({
  Nombre: {
    type: String,
    require: false,
  },
  IdentificacionTipo: {
    type: String,
    require: false,
  },
  IdentificacionNumero: {
    type: String,
    require: false,
  },
  NombreComercial: {
    type: String,
    require: false,
  },
  CorreoElectronico: {
    type: String,
    require: false,
  },
  CorreoElectronicoCC: {
    type: String,
    require: false,
  },
  FaxArea: {
    type: Number,
    require: false,
  },
  FaxNumero: {
    type: Number,
    require: false,
  }
});

const LineasDetalleSchema = new mongoose.Schema({
  EsServicio: {
    type: Number,
    require: false,
  },
  CodigoCabys: {
    type: Number,
    require: false,
  },
  CodigoTipo: [{
    type: Number,
    require: false,
  }],
  Codigo: [{
    type: String,
    require: false,
  }],
  PartidaArancelaria: {
    type: String,
    require: false,
  },
  Cantidad: {
    type: Number,
    require: false,
  },
  UnidadMedida: {
    type: Number,
    require: false,
  },
  UnidadMedidaComercial: {
    type: String,
    require: false,
  },
  Detalle: {
    type: String,
    require: false,
  },
  PrecioUnitario: {
    type: Number,
    require: false,
  },
  DescripcionExtra: {
    type: String,
    require: false,
  },
  Descuento: {
    type: Number,
    require: false,
  },
  DetalleDescuento: {
    type: String,
    require: false,
  },
  Descuentos: {
    type: mongoose.Mixed,
    require: false,
  },
  BaseImponible: {
    type: Number,
    require: false,
  },
  Impuestos: [{
    Codigo: {
      type: Number,
      require: false,
    },
    CodigoTarifa: {
      type: String,
      require: false,
    },
    Tarifa: {
      type: Number,
      require: false,
    },
    FactorIVA: {
      type: Number,
      require: false,
    },
    MontoExportacion: {
      type: Number,
      require: false,
    },
    Exoneracion: {
      type: mongoose.Mixed,
      require: false,
    }
  }]
});

const EncabezadoSchema = new mongoose.Schema({
  TipoDocumento: {
    type: String,
    require: false,
  },
  SecuenciaControlada: {
    type: Number,
    require: false,
  },
  NumeroConsecutivo: {
    type: String,
    require: false,
  },
  Clave: {
    type: String,
    require: false,
  },
  SecuenciaDocumento: {
    type: Number,
    require: false,
  },
  Sucursal: {
    type: Number,
    require: false,
  },
  Terminal: {
    type: Number,
    require: false,
  },
  SituacionEnvio: {
    type: Number,
    require: false,
  },
  CodigoActividad: {
    type: String,
    require: false,
  },
  CantDeci: {
    type: Number,
    require: false,
  },
  FechaEmision: {
    type: String,
    require: false,
  },
  Receptor: {
    type: ReceptorSchema,
    require: false,
  },
  CondicionVenta: {
    type: String,
    require: false,
  },
  PlazoCredito: {
    type: Number,
    require: false,
  },
  MedioPago: [{
    type: String,
    require: false,
  }],
  TipoCambio: {
    type: Number,
    require: false,
  },
  CodigoMoneda: {
    type: String,
    require: false,
  }
});

const DocElectronicosSchema = new mongoose.Schema({
  Encabezado: {
    type: EncabezadoSchema,
    require: false,
  },
  LineasDetalle: [{
    type: LineasDetalleSchema,
    require: false,
  }],
  InformacionReferencia: {
    type: mongoose.Mixed,
    require: false,
  }
});

const ResponseSchema = new mongoose.Schema({
  Id: {
    type: Number,
    require: false,
  },
  Cliente: {
    type: Number,
    require: false,
  },
  NumeroConsecutivo: {
    type: String,
    require: false,
  },
  Clave: {
    type: String,
    require: false,
  },
  CodigoRespuesta: {
    type: Number,
    require: false,
  },
  Mensaje: {
    type: String,
    require: false,
  },
  Fecha: {
    type: Date,
    require: false,
  }
});

const FacturasEmitidasSchema = new mongoose.Schema({
  id: {
    type: Number,
    require: false,
  },
  result: {
    type: Boolean,
    require: false,
  },
  response: {
    type: ResponseSchema,
    require: false,
  },
  data: {
    CodigoCliente: {
      type: String,
      require: false,
    },
    DocElectronicos: [{
      type: DocElectronicosSchema,
      require: false,
    }]
  },
  items: {
    type: mongoose.Mixed,
    require: false,
  }
});

module.exports = mongoose.model('facturasemitidas', FacturasEmitidasSchema);
