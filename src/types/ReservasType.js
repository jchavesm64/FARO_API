const { gql } = require('apollo-server-express');

const Reservas_type = gql`
    type Reserva {
        id: ID
        cliente: ID
        usuario: ID
        fechaReserva: String
        numeroPersonas: NumeroPersonas
        total: Float
        serviciosGrupal: [Servicios]
        paquetes: [Paquete]
        tours: [Tour]
        notas: [JSON]
        metodoPago: String
        politicas: String
        ultimaModificacion: String
        estado: String
    }

    type NumeroPersonas {
        adulto: Number
        ninos: Number
    }

    input NumeroPersonasInput {
        adulto: Number
        ninos: Number
    }

    input ReservaInput {
        cliente: ID
        usuario: ID
        tipo: String
        fechaReserva: String
        numeroPersonas: NumeroPersonasInput
        total: Number
        serviciosGrupal: [ID]
        paquetes: [ID]
        tours: [ID]
        notas: [JSON]
        metodoPago: String
        politicas: String
        ultimaModificacion: String
        estado: String
    }
    
    input ReservaHabitacionInput {
        cliente: [clienteInput]
        reserva: ID
        habitacion: [ID]
        fechaEntrada: String
        fechaSalida: String
        serviciosExtra: [serviciosExtra]
        cargosPerdida: [cargosPerdidainput]
        estado: String
    }
        
    input clienteInput {
        nombre: String
        nombreFacturacion: String
        codigo: String
        pais: String
        telefono: String
        correo: String
    }
    
    input cargosPerdidainput {
        descripcion: String
        precio: Number
        cantidad: Number
        precioTotal: Number
    }

    type RespuestaReserva {
        estado: Boolean
        data: Reserva
        message: String
    }

    input serviciosExtra {
        room: ID
        service: [ID]
    }

    type Query {
        obtenerReservas: [Reserva]
        obtenerReserva(id: ID): Reserva
    }

    type Mutation {
        insertarReserva(input: ReservaInput, bookingRoom: ReservaHabitacionInput): RespuestaReserva
        actualizarReserva(id: ID, input: ReservaInput): RespuestaReserva
        desactivarReserva(id: ID): RespuestaReserva
    }
`

module.exports = Reservas_type;
