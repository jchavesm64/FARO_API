const mongoose = require('mongoose');

const TemporadaSchema = new mongoose.Schema({
    fechaInicio: {
        type: String,
        require: true,
        trim: true
    },
    fechaFin: {
        type: String,
        require: true,
        trim: true
    },
    tipo: {
        type: String,
        enum: ['Alta1', 'Alta2', 'FinAño', 'Baja'],
        require: true,
        trim: true,
    },
    nombre: {
        type: String,
        require: true,
        trim: true
    },
    precio: {
        type: Number,
        require: true
    },
    descripcion: {
        type: String,
        trim: true
    }
});

module.exports = mongoose.model('temporada', TemporadaSchema);