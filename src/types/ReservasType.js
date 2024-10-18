const { gql } = require('apollo-server-express');

const Reservas_type = gql`
    type Reserva {
        id: ID
        cliente: Cliente
        usuario: Usuario
        fechaReserva: String
        numeroPersonas: NumeroPersonas
        total: Float
        serviciosGrupal: JSON
        paquetes: JSON
        tipo: String
        tours: JSON
        notas: JSON
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
        serviciosGrupal: [JSON]
        paquetes: [JSON]
        tours: [JSON]
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
