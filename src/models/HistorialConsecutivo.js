const mongoose = require('mongoose');

const HistorialConsecutivo = new mongoose.Schema({
    consecutivo: {
        type: String,
        require: true,
    },
    usuario: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'usuarios'
    },
    fechaAsignacion: {
        type: Date,
        required: true
    }
});

module.exports = mongoose.model('HistorialConsecutivo', HistorialConsecutivo, 'historialconsecutivo');