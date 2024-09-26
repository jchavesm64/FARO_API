const mongoose = require('mongoose');

const AreasSchema = new mongoose.Schema({
    nombre: {
        type: String,
        require: true,
    },
    descripcion: {
        type: String,
        trim: true,
    },
    estado: {
        type: String,
        enum: ['ACTIVO', 'INACTIVO'],
        trim: true,
    }
});

module.exports = mongoose.model('areas', AreasSchema);