const mongoose = require('mongoose');

const ReservasSchema = new mongoose.Schema({
    cliente: {
        type: mongoose.Schema.Types.ObjectId,
        require: true,
        ref: 'clientes'
    },
    tipo: {
        type: String,
        enum: ['Individual', 'Grupales', 'Bloqueo'],
        trim: true,
    },
    fechaReserva: {
        type: Date,
        require: true,
        trim: true
    },
    numeroPersonas: {
        type: Number,
        require: true
    },
    total: {
        type: Number,
        require: true
    },
    serviciosGrupal: [{
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'servicios'
    }],
    estado: {
        type: String,
        enum: ['Confirmada', 'Cancelada', 'Completada', 'Pendiente'],
        require: true,
        trim: true,
    }
})
module.exports = mongoose.model('reservas', ReservasSchema);