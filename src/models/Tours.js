const mongoose = require('mongoose');

const TourSchema = new mongoose.Schema({
    tipo: {
        type: String,
        enum: ['Educativos', 'Temáticos', 'Aventura', 'Relax', 'Urbanos', 'Naturales', 'Culturales'],
        require: true,
        trim: true,
    },
    precio: {
        type: Number,
        require: true
    },
    descripcion: {
        type: String,
        trim: true
    },
    estado: {
        type: String,
        enum: ['Activo', 'Cancelada'],
        require: true,
        trim: true,
    }
});

module.exports = mongoose.model('tour', TourSchema);