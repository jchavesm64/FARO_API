const { gql } = require('apollo-server-express');

const areas_type = gql`
    type Areas{
        id:ID
        nombre: String
        descripcion: String
        estado: String
    }

    input AreasInput{
        nombre: String
        descripcion: String
        estado: String
    }
        
    type RespuestaAreas{
        estado: Boolean
        data: Areas
        message: String
    }

    type Query{
        obtenerAreas:[Areas]
        obtenerArea(id:ID): Areas
    }

    type Mutation{
        insertarArea(input: AreasInput):RespuestaAreas
        actualizarArea(id: ID, input: AreasInput):RespuestaAreas
        desactivarArea(id: ID):RespuestaAreas
    }

`;

module.exports = areas_type;