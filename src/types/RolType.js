const { gql } = require('apollo-server-express');

const rol_type = gql`
    type Permisos{
        modulo:String
        editar:Boolean
        eliminar:Boolean
        agregar:Boolean
        ver:Boolean
    }

    type Rol{
        id: ID
        nombre: String
        permisos: [Permisos]
        estado: Estado
    }

    type Query{
        obtenerRoles: [Rol]
        obtenerRol(id:ID): Rol
    }

    input PermisosInput{
        modulo:String
        editar:Boolean
        eliminar:Boolean
        agregar:Boolean
        ver:Boolean
    }

    input RolInput{
        nombre: String
        permisos: [PermisosInput]
        estado: Estado
    }

    type RespuestaRol{
        estado: Boolean
        data: Rol
        message: String
    }

    type Mutation{
        insertarRol(input:RolInput):RespuestaRol
        actualizarRol(id:ID, input:RolInput):RespuestaRol
        desactivarRol(id:ID):RespuestaRol
    }
`;

module.exports = rol_type;