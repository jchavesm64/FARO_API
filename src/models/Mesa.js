const mongoose = require('mongoose');

const MesaSchema = new mongoose.Schema({
    nombre: {
        type: String,
        require: true,
        trim: true,
    },
    numero: {
        type: String,
        require: true,
        trim: true,
    },
    tipo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'TipoMesa',
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
    estado: {
        type: String,
        require: true,
        trim: true,
    },
    temporizador: {
        type: Number,
        require: true,
    },
});

module.exports = mongoose.model('Mesa', MesaSchema);