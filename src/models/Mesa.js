const mongoose = require('mongoose');

const MesaSchema = new mongoose.Schema({
    numero: {
        type: Number,
        require: true,
    },
    tipo: {
        type: String,
        require: true
    },
    piso: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Piso',
        require: true
    },
    ubicacion: {
        x: {
            type: Number,
            require: true,
        },
        y: {
            type: Number,
            require: true,
        }
    },
    disponibilidad: {
        type: String,
        require: true,
        trim: true,
    },
    estado: {
        type: String,
        require: true,
        trim: true,
    },
    temporizador: {
        type: Number,
    },
});

module.exports = mongoose.model('Mesa', MesaSchema);