const mongoose = require('mongoose');

const ImpuestoSchema = new mongoose.Schema({
    nombre:{
        type: String,
        require: true,
    },
    valor: {
        type: Number,
        require: true
    },
    estado:{
        type: String,
        require: true,
        trim: true
    }
});

module.exports = mongoose.model('impuestos', ImpuestoSchema);