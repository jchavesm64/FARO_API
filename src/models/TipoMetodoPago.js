const mongoose = require('mongoose');

const TipoMetodoPago = new mongoose.Schema({
    nombre: {
        type: String,
        require: true,
        trim: true,
    },
});

module.exports = mongoose.model('TipoMetodoPago', TipoMetodoPago);