const mongoose = require('mongoose');

const ReservaHabitacionSchema = new mongoose.Schema({
    cliente: [{
        type: mongoose.Schema.Types.ObjectId,
        require: true,
        ref: 'clientes'
    }],
    habitacion: {
        type: mongoose.Schema.Types.ObjectId,
        require: true,
        ref: 'habitacion'
    },
    fechaEntrada: {
        type: Date,
        require: true,
        trim: true
    },
    fechaSalida: {
        type: Date,
        require: true,
        trim: true
    },
    serviciosExtra: [{
        type: mongoose.Schema.Types.ObjectId,
        require: true,
        ref: 'servicios '
    }],
    cargosPerdida: [{
        descripcion: {
            type: String,
            trim: true,
        },
        precio: {
            type: Number,
        },
        cantidad: {
            type: Number,
        },
        precioTotal: {
            type: Number,
        }
    }],
    estado: {
        type: String,
        require: true,
        enum: ['Pendiente', 'Cancelado', 'Activo'],
        trim: true,
    }

})

module.exports = mongoose.model('reservaHabitacion', ReservaHabitacionSchema);