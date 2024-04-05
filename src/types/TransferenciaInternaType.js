const { gql } = require('apollo-server-express');

const transferencia_interna_type = gql`
    type TransferenciaInterna{
        id: ID
        fecha: Date
        usuario: Usuario
        almacenDesde: Almacen
        almacenHasta: Almacen
        nota: String
    }

    input TransferenciaInternaInput{
        fecha: Date
        usuario: ID
        almacenDesde: ID
        almacenHasta: ID
        nota: String
    }

    type RespuestaTransferenciaInterna{
        estado: Boolean
        data: TransferenciaInterna
        message: String
    }

    type Query{
        obtenerTransferenciasInternas: [TransferenciaInterna]
        obtenerTransferenciaInterna(id:ID): TransferenciaInterna
    }

    type Mutation{
        insertarTransferenciaInterna(input:TransferenciaInternaInput, lineas:[TransferenciaInternaLineaInput2]):RespuestaTransferenciaInterna
        actualizarTransferenciaInterna(id:ID, input:TransferenciaInternaInput):RespuestaTransferenciaInterna
    }
`;

module.exports = transferencia_interna_type;



const mongose = require('mongoose');