const { gql } = require('apollo-server-express');

const almacen_type = gql`
    type Almacen{
        id: ID
        nombre: String
        descripcion: String
        estado: Estado
    }

    input AlmacenInput{
        nombre:String
        descripcion:String
        estado:Estado
    }

    type RespuestaAlmacen{
        estado: Boolean
        data: Almacen
        message: String
    }

    type Query{
        obtenerAlmacenes: [Almacen]
        obtenerAlmacen(id:ID): Almacen
    }

    type Mutation{
        insertarAlmacen(input:AlmacenInput):RespuestaAlmacen
        actualizarAlmacen(id:ID, input:AlmacenInput):RespuestaAlmacen
        desactivarAlmacen(id:ID):RespuestaAlmacen
    }
`;

module.exports = almacen_type;