const mongose = require('mongoose');

const MovimientosSchema = new mongose.Schema({
    tipo:{
        type: String,
        require: true,
        trim: true
    },
    lote:{
        type: String,
        trim: true
    },
    cedido:{
        type: Boolean,
        require: true
    },
    cliente:{
        type: mongose.Schema.Types.ObjectId,
        ref: 'clientes'
    },
    proveedor:{
        type: mongose.Schema.Types.ObjectId,
        ref: 'proveedores'
    },
    fecha:{
        type: Date,
        require: true,
        trim: true
    },
    cantidad:{
        type: Number,
        require: true,
        trim: true
    },
    existencia:{
        type: Number
    },
    precio:{
        type: Number
    },
    precio_unidad:{
        type: Number
    },
    moneda:{
        type: String,
        enum: ['US Dollar', 'Colón', 'Yen'],
        require: true,
        trim: true
    },
    usuario:{
        type: mongose.Schema.Types.ObjectId,
        ref: 'usuarios'
    },
    materia_prima:{
        type: mongose.Schema.Types.ObjectId,
        ref: 'MateriasPrimas'
    },
    almacen: {
        type: mongose.Schema.Types.ObjectId,
        ref: 'almacenes',
    },
});

module.exports = mongose.model('Movimientos', MovimientosSchema);