const mongoose = require('mongoose');

const MovimientosActivoSchema = new mongoose.Schema({
    tipo: {
        type: String,
        require: true,
        trim: true
    },
    beneficiario: {
        type: String,
        require: true
    },
    fecha: {
        type: Date,
        require: true,
        trim: true
    },
    activos: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'activo',
        require: true
    }],
    consecutivo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'HistorialConsecutivo',
        require: true
    },
});

module.exports = mongoose.model('movimientosActivo', MovimientosActivoSchema);