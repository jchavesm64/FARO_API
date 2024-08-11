const mongoose = require('mongoose');

const HabitacionSchema = new mongoose.Schema({
    numeroHabitacion: {
        type: String,
        require: true,
        trim: true,
    },
    tipoHabitacion: {
        type: mongoose.Schema.Types.ObjectId,
        require: true,
        ref: 'tipoHabitacion'
    },
    precioPorNoche: {
        type: Number,
        require: true
    },
    descripcion: {
        type: String,
        require: true,
        trim: true,
    },
    comodidades: [{
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'comodidades'
    }],
    estado: {
        type: String,
        require: true,
        enum: ['Disponible', 'Ocupada', 'Mantenimineto', 'Servicio', 'Desmantelada'],
        trim: true,
    }

});

module.exports = mongoose.model('habitacion', HabitacionSchema);

