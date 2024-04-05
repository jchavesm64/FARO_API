const mongoose = require('mongoose');

const TransferenciaInternaLineaSchema = new mongoose.Schema({
    transferenciaInterna: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'TransferenciaInterna',
        require: true
    },
    producto: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'MateriasPrimas',
        require: true
    },
    cantidad: {
        type: Number,
        require: true
    },
});

module.exports = mongoose.model('TransferenciaInternaLineas', TransferenciaInternaLineaSchema);