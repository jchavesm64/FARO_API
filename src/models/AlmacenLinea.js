const mongoose = require('mongoose');

const AlmacenLineaSchema = new mongoose.Schema({
    almacen: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'almacenes',
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

module.exports = mongoose.model('almacenLineas', AlmacenLineaSchema);