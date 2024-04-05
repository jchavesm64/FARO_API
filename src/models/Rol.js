const mongoose = require('mongoose');

const RolSchema = new mongoose.Schema({
    // tipo: {
    //     type: String,
    //     require: true,
    //     trim: true
    // },
    nombre: {
        type: String,
        require: true,
    },
    permisos: {
        type: Array,
        require: true,
    },
    // acciones: {
    //     type: Array,
    //     require: true,
    //     trim: true
    // },
    estado: {
        type: String,
        require: true,
        trim: true
    }
});

module.exports = mongoose.model('roles', RolSchema);