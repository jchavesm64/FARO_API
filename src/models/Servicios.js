const mongoose = require('mongoose');

const ServiciosSchema = new mongoose.Schema({
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
    estado: {
        type: String,
        require: true,
        trim: true,
    }

})
module.exports = mongoose.model('servicios', ServiciosSchema);