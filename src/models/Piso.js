const mongoose = require('mongoose');

const PisoSchema = new mongoose.Schema({
    nombre: {
        type: String,
        require: true,
        trim: true,
    },
    estado: {
        type: String,
        require: true,
        trim: true,
    },
});

module.exports = mongoose.model('Piso', PisoSchema);