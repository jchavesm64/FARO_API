const { gql } = require('apollo-server-express');

const tipoHabitacion_type = gql`
    type TipoHabitacion{
        id:ID
        nombre: String
        descripcion: String
        precioBase: Number
        estado: String
    }

    input TipoHabitacionInput{
        nombre: String
        descripcion: String
        precioBase: Number
        estado: String
    }
    type RespuestaTipoHabitacion{
        estado: Boolean
        data: TipoHabitacion
        message: String
    }

    type Query{
        obtenerTiposHabitaciones: [TipoHabitacion]
        obtenerTipoHabitacionById(id:ID): TipoHabitacion
    }

    type Mutation{
        insertarTipoHabitacion(input: TipoHabitacionInput):RespuestaTipoHabitacion
        actualizarTipoHabitacion(id: ID, input: TipoHabitacionInput):RespuestaTipoHabitacion
        desactivarTipoHabitacion(id: ID):RespuestaTipoHabitacion
    }

`

module.exports = tipoHabitacion_type;