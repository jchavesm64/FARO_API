const { gql } = require('apollo-server-express');

const reservaHabitacion_type = gql`
    type ReservaHabitacion{
        id:ID
        cliente: [Cliente]
        reserva: Reserva
        habitacion: Habitaciones
        fechaEntrada: String
        fechaSalida: String
        serviciosExtra: [Servicios]
        estado: String
    }

    input ReservaHabitacionInput{
        cliente: [ID]
        habitacion: [ID]
        reservas: ID
        fechaEntrada: String
        fechaSalida: String
        serviciosExtra: [ID]
        estado: String
    }

    type RespuestaReservaHabitacion{
        estado: Boolean
        data: ReservaHabitacion
        message: String
    }

    type Query{
        obtenerReservaHabitaciones:[ReservaHabitacion]
        obtenerReservaHabitacion(id:ID): ReservaHabitacion
    }

    type Mutation{
        insertarReservaHabitacion(input: ReservaHabitacionInput):RespuestaReservaHabitacion
        actualizarReservaHabitacion(id: ID, input: ReservaHabitacionInput):RespuestaReservaHabitacion
        desactivarReservaHabitacion(id: ID):RespuestaReservaHabitacion
    }
`
module.exports = reservaHabitacion_type;