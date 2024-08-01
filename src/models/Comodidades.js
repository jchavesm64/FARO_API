const mongoose = require('mongoose');

const ComodidadesSchema = new mongoose.Schema({
    nombre: {
        type: String,
        require: true,
        trim: true,
    },
    descripcion: {
        type: String,
        require: true,
        trim: true,
    },
    estado: {
        type: String,
        require: true,
        trim: true,
    }
})

module.exports = mongoose.model('comodidades', ComodidadesSchema);