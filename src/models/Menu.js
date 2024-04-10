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
});

module.exports = mongoose.model('menus', MenuSchema);