const { gql } = require('apollo-server-express');

const historial_consecutivo_type = gql`
    type HistorialConsecutivo{
        id: ID
        consecutivo: String
        usuario: Usuario
        fechaAsignacion: String
    }

    type RespuestaHistorialConsecutivo{
        estado: Boolean
        data: HistorialConsecutivo
        message: String
    }

    type Query{
        obtenerHistorialConsecutivos: [HistorialConsecutivo]
        obtenerHistorialConsecutivo(id:ID): HistorialConsecutivo
    }
`;

module.exports = historial_consecutivo_type;