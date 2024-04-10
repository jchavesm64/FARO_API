const { gql } = require('apollo-server-express');

const mesas_type = gql`

    enum EstadoMesa{
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
        nombre: String
        numero: String
        tipo: ETipoMesa
        piso: Piso
        ubicacion: Ubicacion
        estado: EstadoMesa
        temporizador: Int
    } 

    input MesaInput{
        nombre: String
        numero: String
        tipo: ETipoMesa
        piso: ID
        ubicacion: UbicacionInput
        estado: EstadoMesa
        temporizador: Int
    }

    type RespuestaMesa{
        estado: Boolean
        data: Mesa
        message: Date
    }

    type Query{
        obtenerMesas: [Mesa]
        obtenerMesa(id: ID): Mesa
        obtenerComandasPorMesa(id: ID): [Comanda]
    }

    type Mutation{
        insertarMesa(input: MesaInput): RespuestaMesa
        actualizarMesa(id: ID, input: MesaInput): RespuestaMesa
        desactivarMesa(id: ID): RespuestaMesa
    }

`;

module.exports = mesas_type;