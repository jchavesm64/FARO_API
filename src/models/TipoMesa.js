const mongoose = require('mongoose');

const TipoMesaSchema = new mongoose.Schema({
    nombre: {
        type: String,
        require: true,
        trim: true
    },
});

module.exports = mongoose.model('TipoMesa', TipoMesaSchema);