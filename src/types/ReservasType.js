const { gql } = require('apollo-server-express');

const Reservas_type = gql`
    type Reserva{
        id:ID
        fecha:String
        numeroPersonas: Number
        total: Number
        servicioGrupal:[Servicios]
        estado:String
    }
    
    input ReservaInput {
        cliente: ID
        fechaReserva:String
        numeroPersonas: Number
        total: Number
        serviciosGrupal:[ID]
        estado:String
    }
        
    input ReservaHabitacionInput{
        habitaciones: [servicesExtra]
        fechaEntrada: String
        fechaSalida: String
        estado: String
    }
    
    type RespuestaReserva{
        estado: Boolean
        data: Reserva
        message: String
    }
    
    type Query{
        obtenerReservas:[Reserva]
        obtenerReserva(id:ID): Reserva
    }

    type Mutation{
        insertarReserva(input: ReservaInput, bookingRoom: ReservaHabitacionInput):RespuestaReserva
        actualizarReserva(id: ID, input: ReservaInput):RespuestaReserva
        desactivarReserva(id: ID):RespuestaReserva
    }
`
module.exports = Reservas_type;