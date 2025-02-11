const { gql } = require("apollo-server-express");

const reservaHabitacion_type = gql`
  type ReservaHabitacion {
    id: ID
    cliente: [clientes]
    reserva: Reserva
    habitacion: Habitaciones
    fechaEntrada: String
    fechaSalida: String
    cargosHabitacion: [JSON]
    serviciosExtra: JSON
    toursExtra: JSON
    cargosPerdida: [cargosPerdida]
    estado: String
  }

  input ReservaHabitacionInput {
    cliente: [clienteInput]
    habitacion: [ID]
    reserva: ID
    fechaEntrada: String
    fechaSalida: String
    cargosHabitacion: JSON
    serviciosExtra: [JSON]
    toursExtra: [JSON]
    cargosPerdida: [cargosPerdidainput]
    estado: String
  }

  type RespuestaReservaHabitacion {
    estado: Boolean
    data: ReservaHabitacion
    message: String
  }

  type clientes {
    nombre: String
    nombreFacturacion: String
    codigo: String
    pais: String
    telefono: String
    correo: String
  }

  type cargosPerdida {
    descripcion: String
    precio: Number
    cantidad: Number
    precioTotal: Number
  }

  input cargosPerdidainput {
    descripcion: String
    precio: Number
    cantidad: Number
    precioTotal: Number
  }

  input serviciosExtra {
    room: ID
    service: [ID]
  }

  input clienteInput {
    nombre: String
    nombreFacturacion: String
    codigo: String
    pais: String
    telefono: String
    correo: String
  }

  type Query {
    obtenerReservaHabitaciones: [ReservaHabitacion]
    obtenerReservaHabitacion(id: ID): [ReservaHabitacion]
  }

  type Mutation {
    insertarReservaHabitacion(
      input: ReservaHabitacionInput
    ): RespuestaReservaHabitacion
    actualizarReservaHabitacion(
      id: ID
      input: ReservaHabitacionInput
    ): RespuestaReservaHabitacion
    desactivarReservaHabitacion(id: ID): RespuestaReservaHabitacion
  }
`;
module.exports = reservaHabitacion_type;
