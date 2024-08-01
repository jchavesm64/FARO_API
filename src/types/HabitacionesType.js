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
        numeroHabitacion: ID
        tipoHabitacion: ID
        precioPorNoche: Number
        descripcion: String
        comodidades:[ComodidadesInput]
        estado: String
    }

    type RespuestaHabitaciones{
        estado: Boolean
        data: Habitaciones
        message: String
    }

    type Query{
        obtenerHabitaciones:[Habitaciones]
        obtenerHabitacion(id:ID): Habitaciones
        obteberHabitacionesDisponibles: [Habitaciones]
    }

    type Mutation{
        insertarHabitacion(input:HabitacionesInput):RespuestaHabitaciones
        actualizarHabitacion(id:ID, input:HabitacionesInput):RespuestaHabitaciones
        desactivarHabitacion(id:ID):RespuestaHabitaciones
    }

`;
module.exports = habitaciones_type;