const { gql } = require('apollo-server-express');

const items_type = gql`
    type Data_Items {
        id: ID
        nombre: String
        descripcion: String
        precio: Float
        estado: String
    }

    input ItemsInput {
        nombre: String
        descripcion: String
        precio: Float
        estado: String
    }
    
    type RespuestaItems {
        estado: Boolean
        data: Data_Items  
        message: String
    }

    type Query {
        obtenerItems: [Data_Items]
        obtenerItem(id: ID): Data_Items
    }
    
    type Mutation {
        insertarItem(input: ItemsInput): RespuestaItems
        actualizarItem(id: ID, input: ItemsInput): RespuestaItems
        desactivarItem(id: ID): RespuestaItems
    }
`;

module.exports = items_type;
