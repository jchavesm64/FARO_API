const mongose = require('mongoose');

const TransferenciaInternaSchema = new mongose.Schema({
    fecha:{
        type: Date,
        require: true,
        trim: true
    },
    almacenDesde: {
        type: mongose.Schema.Types.ObjectId,
        ref: 'almacenes',
    },
    almacenHasta: {
        type: mongose.Schema.Types.ObjectId,
        ref: 'almacenes',
    },
    nota:{
        type: String
    },
    usuario:{
        type: mongose.Schema.Types.ObjectId,
        ref: 'usuarios'
    },
});

module.exports = mongose.model('TransferenciaInterna', TransferenciaInternaSchema);