const mongoose = require('mongoose');

const RecepcionProductos = new mongoose.Schema({
    estado:{
        type: String,
        require: true,
        trim: true,
    },
    proveedor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'proveedores',
        require: true
    },
    pedido: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'OrdenesCompra',
        require: true
    },
    fechaPedido: {
        type: Date,
        require: true
    },
    fechaEntrega: {
        type: Date,
        require: true
    },
    estadoRecepcion:{
        type: String,
        require: true,
        trim: true,
    },
    subtotal:{
        type: Number,
        require: true,
    },
    impuestosMonto:{
        type: Number,
        require: true,
    },
    total:{
        type: Number,
        require: true,
    },
});

module.exports = mongoose.model('RecepcionProductos', RecepcionProductos);