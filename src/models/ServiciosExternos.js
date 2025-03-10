const mongoose = require('mongoose');

const ServiciosExternosSchema = new mongoose.Schema({
    nombre: {
        type: String,
        require: true,
        trim: true,
    },
    descripcion: {
        type: String,
        trim: true,
    },
    precio: {
        type: Number,
        require: true
    },
    tipo: {
        type: mongoose.Schema.Types.ObjectId,
        require: true,
        ref: 'tipoServicio'
    },
    estado: {
        type: String,
        enum: ['ACTIVO', 'INACTIVO'],
        trim: true,
    }

})
module.exports = mongoose.model('ServiciosExternos', ServiciosExternosSchema);