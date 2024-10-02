const mongoose = require('mongoose');

const ReservasSchema = new mongoose.Schema({
    cliente: {
        type: mongoose.Schema.Types.ObjectId,
        require: true,
        ref: 'clientes'
    },
    tipo: {
        type: String,
        enum: ['IN', 'GR', 'BL', 'OS'],
        trim: true,
    },
    fechaReserva: {
        type: Date,
        require: true,
        trim: true
    },
    numeroPersonas: {
        adulto: {
            type: Number,
            require: true,
            min: 1
        },
        ninos: {
            type: Number,
            require: true,
            min: 0
        }
    },
    total: {
        type: Number,
        require: true
    },
    serviciosGrupal: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'servicios'
    }],
    paquetes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'paquete'
    }],
    tours: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'tour'
    }],
    notas: [{
        type: mongoose.Schema.Types.Mixed,
        trim: true
    }],
    metodoPago: {
        type: String,
        require: true
    },
    politicas: {
        type: String,
        require: true
    },
    ultimamModificacion: {
        type: String,
        require: true,
        default: Date.now
    },
    usuario: {
        type: mongoose.Schema.Types.ObjectId,
        require: true,
        ref: 'usuarios'
    },
    estado: {
        type: String,
        enum: ['Confirmada', 'Cancelada', 'Completada', 'Pendiente', 'Pagada'],
        require: true,
        trim: true,
        default: 'Pendiente'
    }
})
module.exports = mongoose.model('reservas', ReservasSchema);