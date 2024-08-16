const { gql } = require('apollo-server-express');

const habitaciones_type = gql`

    type Habitaciones{
        id: ID
        numeroHabitacion: String
        tipoHabitacion: TipoHabitacion
        precioPorNoche: Number
        descripcion: String
        comodidades:[Comodidades]
        estado: String
    }
    input HabitacionesInput{
        numeroHabitacion: String
        tipoHabitacion: ID
        precioPorNoche: Number
        descripcion: String
        comodidades:[ID]
        estado: String
    }

    type RespuestaHabitaciones{
        estado: Boolean
        data: Habitaciones
        message: String
    }

    type Query{
        obtenerHabitaciones:[Habitaciones]
        obtenerHabitacionById(id:ID): Habitaciones
        obtenerHabitacionesDisponibles: [Habitaciones]
    }

    type Mutation{
        insertarHabitacion(input:HabitacionesInput):RespuestaHabitaciones
        actualizarHabitacion(id:ID, input:HabitacionesInput):RespuestaHabitaciones
        desactivarHabitacion(id:ID):RespuestaHabitaciones
    }

`;
module.exports = habitaciones_type;