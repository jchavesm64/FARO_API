const mongoose = require('mongoose');

const MenuSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true,
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
    porcentajeGanancia: {
        type: Number
    },
    tipoPlatillo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'TipoPlatillo',
        required: true
    },
    tieneGuarnicion: {
        type: Boolean,
        require: true,
    },
    tipoGuarnicion: {
        type: String,//personalizada, todas
        require: false,
    },
    maxGuarniciones: {
        type: Number,
        require: false,
    },
    maxGuarnicionesIncluidas: {
        type: Number,
        require: false,
    },
    guarniciones: [{
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Menu',
            require: false
        }
    }],
    tipoMenu: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'TipoMenu',
        required: true
    }]
});

module.exports = mongoose.model('menus', MenuSchema);