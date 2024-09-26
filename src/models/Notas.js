const mongoose = require('mongoose');

const NotasSchema = new mongoose.Schema({
    nota: {
        type: String,
        require: true,
    },
    area: {
        type: mongoose.Schema.Types.ObjectId,
        require: true,
        ref: 'areas'
    },
    tipo: {
        type: String,
        enum: ['ROOM', 'BOOKING'],
        trim: true,
    },
    estado: {
        type: String,
        enum: ['ACTIVO', 'INACTIVO'],
        trim: true,
    }
});

module.exports = mongoose.model('notas', NotasSchema);