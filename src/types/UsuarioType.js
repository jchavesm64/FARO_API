const { gql } = require("apollo-server-express");

const usuario_type = gql`
  type confirmacion {
    success: Boolean
    message: String
  }

  type RespuestaAutenticar {
    token: String
    cedula: String
    nombre: String
    roles: [String]
    success: Boolean
    message: String
  }
  type RespuestaComprobar {
    token: String
    cedula: String
    nombre: String
    roles: [JSON]
    success: Boolean
    message: String
  }
  type Usuario {
    id: ID
    nombre: String
    cedula: String
    clave: String
    correos: [Email]
    telefonos: [Telefono]
    roles: [Rol]
    estado: Estado
  }

  type RespuestaVerificacion {
    estado: Boolean
    codigo: String
    message: String
  }

  type Query {
    obtenerUsuarioAutenticado: RespuestaUsuario
    obtenerUsuariosActivos: [Usuario]
    obtenerUsuario(id: ID): Usuario
    obtenerUsuarioByCodigo(codigo: String): Usuario
  }

  input UsuarioInput {
    nombre: String
    cedula: String
    clave: String
    correos: [EmailInput]
    telefonos: [TelefonoInput]
    roles: [ID]
    estado: Estado
  }

  type RespuestaUsuario {
    estado: Boolean
    data: Usuario
    message: String
  }

  type Mutation {
    autenticarUsuario(cedula: String!, clave: String!): RespuestaAutenticar
    comprobarUsuario(cedula: String!, clave: String!): RespuestaComprobar
    insertarUsuario(input: UsuarioInput): RespuestaUsuario
    actualizarUsuario(id: ID, input: UsuarioInput): RespuestaUsuario
    desactivarUsuario(id: ID): RespuestaUsuario
    cambiarClave(id: ID, actual: String, nueva: String): confirmacion
    recuperarClave(codigo: String, nueva: String): confirmacion
    enviarCodigoVerificacion(
      codigo: String
      correo: String
    ): RespuestaVerificacion
  }
`;

module.exports = usuario_type;
