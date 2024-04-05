const mongoose = require('mongoose');

const ModuloConsecutivo = new mongoose.Schema({
    nombre: {
        type: String,
        require: true,
    },
    abreviatura: {
        type: String,
        require: true
    },
    actual: {
        type: String,
        require: true
    },
    siguiente: {
        type: String,
        require: true
    },
});

module.exports = mongoose.model('ModuloConsecutivo', ModuloConsecutivo);