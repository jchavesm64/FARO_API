const mongoose = require('mongoose');

const LineasRecepcionPedido = new mongoose.Schema({
    estado:{
        type: String,
        require: true,
        trim: true,
    },
    producto: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'MateriasPrimas',
        require: true
    },
    recepcion: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'RecepcionProductos',
        require: true
    },
    impuesto: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'impuestos',
    },
    precioUnitario: {
        type: Number,
        require: true
    },
    cantidadSolicitada: {
        type: Number,
        require: true
    },
    cantidadRecibida: {
        type: Number,
        require: true
    },
    porcentajeDescuento: {
        type: Number,
    },
    descuento: {
        type: Number,
    },
    montoImpuestos: {
        type: Number,
    },
    subtotalSinImpuesto: {
        type: Number,
        require: true
    },
    subtotalConImpuesto: {
        type: Number,
        require: true
    },
    almacen:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'almacenes'
    },
});

module.exports = mongoose.model('LineasRecepcionPedido', LineasRecepcionPedido);