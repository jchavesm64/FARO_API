const mongoose = require('mongoose');

const TipoMenu = new mongoose.Schema({
    nombre: {
        type: String,
        require: true,
        trim: true
    },
    estado: {
        type: String,
        require: true,
        trim: true
    }
});

module.exports = mongoose.model('TipoMenu', TipoMenu);