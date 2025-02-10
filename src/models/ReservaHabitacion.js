const mongoose = require('mongoose');

const ReservaHabitacionSchema = new mongoose.Schema({
    cliente: [{
        nombre: {
            type: String,
            trim: true,
        },
        nombreFacturacion: {
            type: String,
            trim: true,
        },
        codigo: {
            type: String,
            trim: true
        },
        pais: {
            type: String,
            trim: true,
        },
        telefono: {
            type: String,
            trim: true,
        },
        correo: {
            type: String,
            trim: true,
        }

    }],
    reserva: {
        type: mongoose.Schema.Types.ObjectId,
        require: true,
        ref: 'reservas'
    },
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
        type: mongoose.Schema.Types.Mixed,
        trim: true
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
        enum: ['Pendiente', 'Cancelado', 'CheckIn', 'CheckOut'],
        trim: true,
    }

})

module.exports = mongoose.model('reservaHabitacion', ReservaHabitacionSchema);