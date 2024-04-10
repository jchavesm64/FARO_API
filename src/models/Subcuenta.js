const mongoose = require('mongoose');

const SubcuentaSchema = new mongoose.Schema({
    comanda: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comanda',
        require: true
    },
    cliente: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Cliente',
        require: true
    },
    fecha: {
        type: Date,
        require: true,
    },
    productos: [{
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Menu',
            require: true//Menu
        },
        cantidad: {
            type: Number,
            require: true,
        },
        precio: {
            type: Number,
            require: true,
        },
        descuento: {
            type: Number,
            require: true,
        },

    }],
    descuento: {
        type: Number,
        require: true,
    },
    total: {
        type: Number,
        require: true,
    },
    moneda: {
        type: String,
        require: true,
        trim: true,
    },
    formaPago: [{
        tipo: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'TipoMetodoPago',
            require: true
        },
        monto: {
            type: Number,
            require: true,
        },
        moneda: {
            type: String,
            require: true,
            trim: true,
        },
    }],
    estado: {
        type: String,
        require: true,
        trim: true,
    },
});

module.exports = mongoose.model('Subcuenta', SubcuentaSchema);