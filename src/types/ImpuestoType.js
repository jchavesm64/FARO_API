const { gql } = require('apollo-server-express');

const impuesto_type = gql`
    scalar Date
    scalar Number

    type Impuesto{
        id: ID
        nombre: String,
        valor: Number,
        estado: Estado
    }

    type Query{
        obtenerImpuestos: [Impuesto]
        obtenerImpuestoById(id:ID):Impuesto
        obtenerImpuestoByNombre(nombre:String):Impuesto
    }

    input ImpuestoInput{
        nombre: String,
        valor: Number,
        estado: Estado
    }

    type RespuestaImpuesto{
        estado: Boolean
        data: Impuesto
        message: String
    }

    type Mutation{
        insertarImpuesto(input:ImpuestoInput):RespuestaImpuesto
        actualizarImpuesto(id:ID, input:ImpuestoInput):RespuestaImpuesto
        desactivarImpuesto(id:ID): RespuestaImpuesto
    }
`;

module.exports = impuesto_type;