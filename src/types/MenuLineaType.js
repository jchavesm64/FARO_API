const { gql } = require('apollo-server-express');

const menu_linea = gql`
    type MenuLinea{
        id: ID
        menu: Menu
        producto: MateriaPrima
        cantidad: Number
    }

    input MenuLineaInput{
        menu: ID
        producto: ID
        cantidad: Number
    }

    input MenuLineaInput2{
        producto: ID
        cantidad: Number
    }

    type RespuestaMenuLinea{
        estado: Boolean
        data: MenuLinea
        message: String
    }

    type Query{
        obtenerLineasMenu(id:ID): [MenuLinea]
        obtenerLineaMenu(id:ID): MenuLinea
    }

    type Mutation{
        insertarLineaMenu(input:MenuLineaInput): RespuestaMenuLinea
        actualizarLineaMenu(id:ID, input:MenuLineaInput): RespuestaMenuLinea
        desactivarLineaMenu(id:ID):RespuestaMenuLinea
    }
`;

module.exports = menu_linea;

