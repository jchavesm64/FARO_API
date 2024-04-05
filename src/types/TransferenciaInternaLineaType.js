const { gql } = require('apollo-server-express');

const transferencia_interna_linea = gql`
    type TransferenciaInternaLinea{
        id: ID
        transferenciaInterna: TransferenciaInterna
        producto: MateriaPrima
        cantidad: Number
    }
    

    input TransferenciaInternaLineaInput{
        transferenciaInterna: ID
        producto: ID
        cantidad: Number
    }

    input TransferenciaInternaLineaInput2{
        producto: ID
        cantidad: Number
    }

    type RespuestaTransferenciaInternaLinea{
        estado: Boolean
        data: TransferenciaInternaLinea
        message: String
    }

    type Query{
        obtenerLineasTransferenciaInterna(id:ID): [TransferenciaInternaLinea]
        obtenerLineaTransferenciaInterna(id:ID): TransferenciaInternaLinea
    }

    type Mutation{
        insertarLineaTransferenciaInterna(input:TransferenciaInternaLineaInput): RespuestaTransferenciaInternaLinea
        actualizarLineaTransferenciaInterna(id:ID, input:TransferenciaInternaLineaInput): RespuestaTransferenciaInternaLinea
    }
`;

module.exports = transferencia_interna_linea;