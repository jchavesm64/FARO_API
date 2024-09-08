const { gql } = require('apollo-server-express');

const paquetes_type = gql`
    type Paquete{
        id: ID
        tipo: String
        nombre: String
        servicios: [Servicios]
        tours: [Tour]
        temporadas:[Temporada]
        descripcion: String
        precio: Number
        estado: String
    }

    input PaqueteInput {
        tipo: String
        nombre: String
        servicios: [ID]
        tours: [ID]
        temporadas:[ID]
        descripcion: String
        precio: Number
        estado: String
    }

    type RespuestaPaquete{
        estado: Boolean
        data: Paquete
        message: String
    }
    
     type Query{
        obtenerPaquetes:[Paquete]
        obtenerPaquete(id:ID): Paquete
    }

    type Mutation{
        insertarPaquete(input: PaqueteInput):RespuestaPaquete
        actualizarPaquete(id: ID, input: PaqueteInput):RespuestaPaquete
        desactivarPaquete(id: ID):RespuestaPaquete
    }
`;

module.exports = paquetes_type;