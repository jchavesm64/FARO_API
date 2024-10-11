const mongoose = require('mongoose');

const MateriasPrimasSchema = new mongoose.Schema({
    nombre: {
        type: String,
        require: true,
        trim: true,
    },
    pais: {
        type: String,
        require: true,
        trim: true
    },
    unidad: {
        type: String,
        require: true,
        trim: true
    },
    existencias: {
        type: Number,
        require: true
    },
    estado: {
        type: String,
        require: true,
        trim: true,
    },
    tipo: {
        type: String,
        require: true,
        trim: true
    },
    referenciaInterna: {
        type: String,
    },
    codigoBarras: {
        type: String,
    },
    codigoCabys: {
        type: String,
    },
    descripcion: {
        type: String,
    },
    precioCompra: {
        type: Number
    },
    precioCostoPromedio: {
        type: Number
    },
    margen: {
        type: Number
    },
    impuestos: {
        type: Array,
    },
});

module.exports = mongoose.model('MateriasPrimas', MateriasPrimasSchema);