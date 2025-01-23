const mongoose = require('mongoose');

const ComandaSchema = new mongoose.Schema({
    mesa: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Mesa',
        require: true
    },
    fecha: {
        type: Date,
        require: true,
    },
    observaciones: {
        type: String,
        require: true,
        trim: true
    },
    preFactura: {
        type: Boolean,
        require: true,
    },
    estado: {
        type: String,
        require: true,
        trim: true,
    },
});

module.exports = mongoose.model('Comanda', ComandaSchema);