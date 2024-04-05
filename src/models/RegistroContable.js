const mongoose = require('mongoose');

const RegistroContableSchema = new mongoose.Schema({

    fechaRegistro: {
        type: Date,
        require: true,
    },
    fechaPago: {
        type: Date,
        require: true,
    },
    tipoPago: {
        type: String,
        enum: ['EFECTIVO', 'CHEQUE', 'TRANSFERENCIA', 'SINPE', 'TARJETA'],
    },
    tipoRegistroContable: {
        type: String,
        enum: ['COBRAR', 'PAGAR'],
        require: true,
        trim: true,
    },
    estado: {
        type: String,
        require: true,
        trim: true,
    },
    estadoRegistroContable: {
        type: String,
        enum: ['BORRADOR', 'PENDIENTE', 'PAGADO'],
        require: true,
        trim: true,
    },
    referenciaID: {
        type: String,
    },
    referenciaNombre: {
        type: String,
    },
    referenciaModelo: {
        type: String,
        require: true,
    },
    cliente: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'clientes'
    },
    proveedor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'proveedores'
    },
    usuario: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'usuarios'
    },
    monto: {
        type: Number,
        require: true,
    },
    comprobantePago: {
        type: String,
        trim: true,
    },
    consecutivo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'HistorialConsecutivo',
        require: true
    },
});

module.exports = mongoose.model('RegistroContable', RegistroContableSchema);