const { gql } = require('apollo-server-express');

const mesas_type = gql`

    enum Disponibilidad{
        LIBRE
        RESERVADA
        OCUPADA
    }

    enum ETipoMesa{
        Mesa
        Silla
    }

    input UbicacionInput{
        x: Int
        y: Int
    }

    type Ubicacion{
        x: Int
        y: Int
    }

    type Mesa{
        id: ID
        numero: Int
        tipo: ETipoMesa
        piso: Piso
        ubicacion: Ubicacion
        disponibilidad: Disponibilidad
        temporizador: Int
        estado: Estado
    } 

    input MesaInput{
        numero: Int
        tipo: ETipoMesa
        piso: ID
        ubicacion: UbicacionInput
        disponibilidad: Disponibilidad
        temporizador: Int,
        estado: Estado
    }

    type RespuestaMesa{
        estado: Boolean
        data: Mesa
        message: Date
    }

    type Query{
        obtenerMesas: [Mesa]
        obtenerMesaById(id: ID): Mesa
    }

    type Mutation{
        insertarMesa(input: MesaInput): RespuestaMesa
        actualizarMesa(id: ID, input: MesaInput): RespuestaMesa
        desactivarMesa(id: ID): RespuestaMesa
    }

`;

module.exports = mesas_type;