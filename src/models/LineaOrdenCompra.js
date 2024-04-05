const mongoose = require('mongoose');

const LineaOrdenCompra = new mongoose.Schema({
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
    impuesto: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'impuestos',
    },
    precioUnitario: {
        type: Number,
        require: true
    },
    cantidad: {
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
});

module.exports = mongoose.model('LineasOrdenCompra', LineaOrdenCompra);