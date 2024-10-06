const mongoose = require('mongoose');

const TransferenciaInternaSchema = new mongoose.Schema({
    fecha:{
        type: Date,
        require: true,
        trim: true
    },
    almacenDesde: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'almacenes',
    },
    almacenHasta: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'almacenes',
    },
    nota:{
        type: String
    },
    usuario:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'usuarios'
    },
});

module.exports = mongoose.model('TransferenciaInterna', TransferenciaInternaSchema);