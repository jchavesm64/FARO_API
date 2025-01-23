const { gql } = require('apollo-server-express');

const menu_type = gql`
    type Menu{
        id: ID
        nombre: String
        descripcion: String
        estado: String
        precioCosto: Number
        porcentajeGanancia: Number
        tipoPlatillo: TipoPlatillo
        tipoMenu: [TipoMenu]
    }

    input MenuInput{
        nombre: String
        descripcion: String
        estado: String
        precioCosto: Number
        porcentajeGanancia: Number
        tipoPlatillo: ID
        tipoMenu: [ID]
    }

    type RespuestaMenu{
        estado: Boolean
        data: Menu
        message: String
    }

    type Query{
        obtenerMenus: [Menu]
        obtenerMenu(id:ID): Menu
    }

    type Mutation{
        insertarMenu(input:MenuInput, lineasInput:[MenuLineaInput2]):RespuestaMenu
        actualizarMenu(id:ID, input:MenuInput):RespuestaMenu
        desactivarMenu(id:ID):RespuestaMenu
    }
`;

module.exports = menu_type;