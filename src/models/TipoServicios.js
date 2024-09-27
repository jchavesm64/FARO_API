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
    horadia: {
        type: String,
        require: true,
        trim: true
    },
    estado: {
        type: String,
        enum: ['ACTIVO', 'INACTIVO'],
        trim: true,
    }
});

module.exports = mongoose.model('tipoServicio', TipoServicioSchema);