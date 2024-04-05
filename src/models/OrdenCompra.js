const mongoose = require('mongoose');

const OrdenCompra = new mongoose.Schema({
    estado: {
        type: String,
        require: true,
        trim: true,
    },
    proveedor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'proveedores',
        require: true
    },
    fechaPedido: {
        type: Date,
        require: true
    },
    estadoPedido: {
        type: String,
        require: true,
        trim: true,
    },
    numeroComprobante: {
        type: String,
        require: true,
        trim: true,
    },
    lineasPedido: [{
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'LineasOrdenCompra'
    }],
    subtotal: {
        type: Number,
        require: true,
    },
    impuestosMonto: {
        type: Number,
        require: true,
    },
    total: {
        type: Number,
        require: true,
    },
    consecutivo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'HistorialConsecutivo',
        require: true
    },
});

module.exports = mongoose.model('OrdenesCompra', OrdenCompra);