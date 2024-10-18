const { gql } = require('apollo-server-express');

const tipoMenu_type = gql`
    type TipoMenu{
        id: ID
        nombre: String,
        estado: Estado
    }

    type Query{
        obtenerTiposMenu: [TipoMenu]
        obtenerTipoMenuById(id:ID):TipoMenu
    }

    input TipoMenuInput{
        nombre: String,
        estado: Estado
    }

    type RespuestaTipoMenu{
        estado: Boolean,
        data: TipoMenu
        message: String
    }

    type Mutation{
        insertarTipoMenu(input:TipoMenuInput):RespuestaTipoMenu
        actualizarTipoMenu(id:ID, input:TipoMenuInput):RespuestaTipoMenu
        desactivarTipoMenu(id:ID):RespuestaTipoMenu
    }
`;

module.exports = tipoMenu_type;