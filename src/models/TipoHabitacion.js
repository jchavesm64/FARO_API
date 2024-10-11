const mongoose = require('mongoose');

const TipoHabitacionSchema = new mongoose.Schema({
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
    precioBase: {
        type: Number,
        require: true
    },
    estado: {
        type: String,
        enum: ['ACTIVO', 'INACTIVO'],
        trim: true,
    }
})
module.exports = mongoose.model('tipoHabitacion', TipoHabitacionSchema);