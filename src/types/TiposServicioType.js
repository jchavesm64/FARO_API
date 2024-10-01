const { gql } = require('apollo-server-express');

const tipoServicio_type = gql`
    type TipoServicio{
        id: ID
        nombre: String
        cuantificable:String
        horadia:String
        icon:String
        estado: Estado
    }

    
    input TipoServicioInput{
        nombre: String,
        cuantificable:Boolean
        horadia:String
        icon:String
        estado: String
    }
        
    type RespuestaTipoServicio{
        estado: Boolean,
        data: TipoServicio
        message: String
    }
        
    type Query{
        obtenerTipoServicio: [TipoServicio]
        obtenerTipoServicioId(id:ID):TipoServicio
    }
            
    type Mutation{
        insertarTipoServicio(input:TipoServicioInput):RespuestaTipoServicio
        actualizarTipoServicio(id:ID, input:TipoServicioInput):RespuestaTipoServicio
        desactivarTipoServicio(id:ID):RespuestaTipoServicio
    }
`;

module.exports = tipoServicio_type;