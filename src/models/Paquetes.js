const mongoose = require('mongoose');

const PaqueteSchema = new mongoose.Schema({
    tipo: {
        type: String,
        enum: ['Alojamiento', 'Especiales', 'Bienestar', 'Aventura', 'Eventos', 'Familiares', 'Temporales', 'Negocios'],
        require: true,
        trim: true,
    },
    servicios: [{
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'servicios'
    }],
    tours: [{
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'tour'
    }],
    descripcion: {
        type: String,
        require: true,
        trim: true
    },
    precio: {
        type: Number,
        require: true
    },
    estado: {
        type: String,
        require: true,
        trim: true
    }
});

module.exports = mongoose.model('paquete', PaqueteSchema);