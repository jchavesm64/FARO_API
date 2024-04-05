const mongoose = require('mongoose');

const AlmacenSchema = new mongoose.Schema({
    nombre: {
        type: String,
        require: true,
    },
    descripcion: {
        type: String,
        require: true,
    },
    estado: {
        type: String,
        require: true,
        trim: true
    }
});

module.exports = mongoose.model('almacenes', AlmacenSchema);