const mongoose = require('mongoose');

const FacturasParametrosSchema = new mongoose.Schema({
    id: {
        type: Number,
        require: true,
    },
    value: {
        type: String,
        require: true,
    },
    type: {
        type: String,
        require: true,
    },
});

module.exports = mongoose.model('facturasparametro', FacturasParametrosSchema);