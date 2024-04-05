const mongoose = require('mongoose');

const MenuLineaSchema = new mongoose.Schema({
    menu: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'menus',
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

module.exports = mongoose.model('menuLineas', MenuLineaSchema);