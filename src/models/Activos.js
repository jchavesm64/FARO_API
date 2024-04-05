const mongoose = require('mongoose');

const ActivoSchema = new mongoose.Schema({
    nombre: {
        type: String,
        require: true,
    },
    unidad: {
        type: String,
        require: true,
        trim: true
    },
    referenciaInterna: {
        type: String,
    },
    fechaRegistro: {
        type: Date,
        require: true,
    },
    estado: {
        type: String,
        require: true,
    }
});

module.exports = mongoose.model('activo', ActivoSchema);