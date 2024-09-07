const { gql } = require('apollo-server-express');

const tour_type = gql`
    type Tour{
        id: ID
        tipo: String
        nombre: String
        precio: Number
        estado: String
        descripcion: String
    }
    
    input TourInput {
        tipo: String
        nombre: String
        precio: Number
        estado: String
        descripcion: String
    }

    type RespuestaTour{
        estado: Boolean
        data: Tour
        message: String
    }
    
     type Query{
        obtenerTours:[Tour]
        obtenerTour(id:ID): Tour
    }
    
    type Mutation{
        insertarTour(input: TourInput):RespuestaTour
        actualizarTour(id: ID, input: TourInput):RespuestaTour
        desactivarTour(id: ID):RespuestaTour
    }
`;
module.exports = tour_type;