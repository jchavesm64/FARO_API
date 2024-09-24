const mongoose = require('mongoose');

const TipoServicioSchema = new mongoose.Schema({
    nombre: {
        type: String,
        require: true,
        trim: true
    },
    cuantificable: {
        type: Boolean,
        require: true,
        trim: true
    },
    estado: {
        type: String,
        enum: ['Activo', 'Cancelado'],
        trim: true,
    }
});

module.exports = mongoose.model('tipoServicio', TipoServicioSchema);