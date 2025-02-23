const mongoose = require('mongoose');

const MovimientosRestauranteSchema = new mongoose.Schema({
    fecha:{
        type: Date,
        require: true,
        trim: true
    },
    cliente: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Cliente',
    },
    nombreFacturacion: {
        type: String,
        require: true,
        trim: true,
    },
    comanda: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comanda',
        require: true
    },
    caja: { 
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Caja',
        require: false//falta de desarrollar
    },
    condicionVenta: {
        type: String,
        require: false,
    },
    medioPago: {
        type: String,
        require: false,
    },
    tipoCambio: {
        type: Number,
        require: false,
    },
    codigoMoneda: {
        type: String,
        require: false,
    },
    platillos: [{
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Menu',
            require: true//Menu
        },
        nombre: {
            type: String,
            require: true,
            trim: true,
        },
        precio: {
            type: Number,
            require: true,
        },
        observaciones: {
            type: String,
            require: false,
            trim:false
        },
    }],
    /*servicios: [{
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Menu',
            require: true//Menu
        },
        nombre: {
            type: String,
            require: true,
            trim: true,
        },
    }],*/
    numeroHabitacion: {
        type: String,
        require: false,
    },
    reserva: { 
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Rerservas',
        require: false//falta de desarrollar
    },

    subtotal: {
        type: Number,
        require: false,
    },
    descuento: {
        type: Number,
        require: false,
    },
    IVA: {
        type: Number,
        require: false,
    },
    impuestoServicio: {
        type: Number,
        require: false,
    },
    total: {
        type: Number,
        require: false,
    },

});
module.exports = mongoose.model('MovimientosRestaurante', MovimientosRestauranteSchema);