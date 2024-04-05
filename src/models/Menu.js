const mongoose = require('mongoose');

const MenuSchema = new mongoose.Schema({
    nombre: {
        type: String,
        require: true,
    },
    descripcion: {
        type: String,
        require: true,
    },
    estado: {
        type: String,
        require: true,
        trim: true
    },
    precioCosto: {
        type: Number
    },
    precioVenta: {
        type: Number
    },
    tipo: {
        type: String,
        require: true,
    },
});

module.exports = mongoose.model('menus', MenuSchema);