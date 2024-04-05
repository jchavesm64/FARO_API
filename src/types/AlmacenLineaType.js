const { gql } = require('apollo-server-express');

const almacen_linea = gql`
    type AlmacenLinea{
        id: ID
        almacen: Almacen
        producto: MateriaPrima
        cantidad: Number
    }
    

    input AlmacenLineaInput{
        almacen: ID
        producto: ID
        cantidad: Number
    }

    type RespuestaAlmacenLinea{
        estado: Boolean
        data: AlmacenLinea
        message: String
    }

    type Query{
        obtenerLineasAlmacen(id:ID): [AlmacenLinea]
        obtenerLineaAlmacen(id:ID): AlmacenLinea
    }

    type Mutation{
        insertarLineaAlmacen(input:AlmacenLineaInput): RespuestaAlmacenLinea
        actualizarLineaAlmacen(id:ID, input:AlmacenLineaInput): RespuestaAlmacenLinea
    }
`;

module.exports = almacen_linea;

