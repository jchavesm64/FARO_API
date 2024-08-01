const { gql } = require('apollo-server-express');

const Reservas_type = gql`
    type Reserva{
        id:ID
        reservaHabitacion: [ReservaHabitacion]
        fecha:String
        numeroPersonas: Number
        total: Number
        servicioGrupal:[Servicios]
        estado:String
    }
    
    input ReservaInput {
        reservaHabitacion: [ID]
        fecha:String
        numeroPersonas: Number
        total: Number
        servicioGrupal:[ID]
        estado:String
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
        insertarReserva(input: ReservaInput):RespuestaReserva
        actualizarReserva(id: ID, input: ReservaInput):RespuestaReserva
        desactivarReserva(id: ID):RespuestaReserva
    }
`
module.exports = Reservas_type;