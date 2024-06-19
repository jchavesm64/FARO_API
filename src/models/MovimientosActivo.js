const mongose = require('mongoose');

const MovimientosActivoSchema = new mongose.Schema({
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
        type: mongose.Schema.Types.ObjectId,
        ref: 'activo',
        require: true
    }],
    consecutivo: {
        type: mongose.Schema.Types.ObjectId,
        ref: 'HistorialConsecutivo',
        require: true
    },
});

module.exports = mongose.model('movimientosActivo', MovimientosActivoSchema);