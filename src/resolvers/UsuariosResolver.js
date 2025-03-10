import { Usuario } from "../models";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import nodemailer from "nodemailer";
dotenv.config({ path: "variables.env" });

const format = /^[a-zA-Z0-9]+$/;

const crearToken = (usuario, secreto, expiresIn) => {
  const { cedula } = usuario;
  return jwt.sign({ cedula }, secreto, { expiresIn });
};

const generarCodigo = (length) => {
  var result = "";
  var characters = "0123456789";
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};

const crearMensajeClave = (usuario, clave) => {
  return (
    "<!DOCTYPE html>" +
    "<html lang='en'>" +
    "<head>" +
    "<meta charset='UTF-8'>" +
    "<meta http-equiv='X-UA-Compatible' content='IE=edge'>" +
    "<meta name='viewport' content='width=device-width, initial-scale=1.0'>" +
    "<title>BETHEL SOLUCIONES TECNOLÓGICAS</title></title>" +
    "</head>" +
    "<body>" +
    "<div style='padding-top:10px; height: 500px; width: 300px;margin-left: auto;margin-right: auto;margin-top: 5px; border-radius: 25px 25px 0px 0px; background-color: #ebe9e9;'>" +
    // "<img style='display: block; width: 90%; margin-left: auto; margin-right: auto; padding-top: 20px;' src='https://i1.wp.com/procapsulas.com/wp-content/uploads/2021/02/Recurso-1.png?w=3773&ssl=1%203773w,%20https://i1.wp.com/procapsulas.com/wp-content/uploads/2021/02/Recurso-1.png?resize=300%2C56&ssl=1%20300w,%20https://i1.wp.com/procapsulas.com/wp-content/uploads/2021/02/Recurso-1.png?resize=1024%2C191&ssl=1%201024w,%20https://i1.wp.com/procapsulas.com/wp-content/uploads/2021/02/Recurso-1.png?resize=768%2C144&ssl=1%20768w,%20https://i1.wp.com/procapsulas.com/wp-content/uploads/2021/02/Recurso-1.png?resize=1536%2C287&ssl=1%201536w,%20https://i1.wp.com/procapsulas.com/wp-content/uploads/2021/02/Recurso-1.png?resize=2048%2C383&ssl=1%202048w,%20https://i1.wp.com/procapsulas.com/wp-content/uploads/2021/02/Recurso-1.png?resize=1568%2C293&ssl=1%201568w,%20https://i1.wp.com/procapsulas.com/wp-content/uploads/2021/02/Recurso-1.png?w=2400&ssl=1%202400w'>" +
    "<h3 style='display: block; text-align: center;'>Bienvenid/a</h3>" +
    "<h4 style='display: block; text-align: center;'>Usuario: " +
    usuario +
    "</h4>" +
    "<p style='width: 90%; margin-left: auto; margin-right: auto;'>La siguiente es su contraseña de acceso al sistema, por favor no compartirla con nadie</p>" +
    "<span style='display: block; text-align: center;'>Contraseña: <strong>" +
    clave +
    "</strong></span>" +
    "</div>" +
    "<footer style='background-color: #d1d0d0; width: 280px; padding:10px; margin-left: auto; margin-right: auto; border-radius: 0px 0px 25px 25px;'>" +
    "<span style='display: block; text-align: center;'>BETHEL SOLUCIONES TECNOLÓGICAS</span>" +
    "</footer>" +
    "</body>" +
    "</html>"
  );
};

const crearMensajeCodigo = (usuario, codigo) => {
  return (
    "<!DOCTYPE html>" +
    "<html lang='en'>" +
    "<head>" +
    "<meta charset='UTF-8'>" +
    "<meta http-equiv='X-UA-Compatible' content='IE=edge'>" +
    "<meta name='viewport' content='width=device-width, initial-scale=1.0'>" +
    "<title>BETHEL SOLUCIONES TECNOLÓGICAS</title>" +
    "</head>" +
    "<body>" +
    "<div style='padding-top:10px; height: 500px; width: 300px;margin-left: auto;margin-right: auto;margin-top: 5px; border-radius: 25px 25px 0px 0px; background-color: #ebe9e9;'>" +
    // "<img style='display: block; width: 90%; margin-left: auto; margin-right: auto; padding-top: 20px;' src='https://i1.wp.com/procapsulas.com/wp-content/uploads/2021/02/Recurso-1.png?w=3773&ssl=1%203773w,%20https://i1.wp.com/procapsulas.com/wp-content/uploads/2021/02/Recurso-1.png?resize=300%2C56&ssl=1%20300w,%20https://i1.wp.com/procapsulas.com/wp-content/uploads/2021/02/Recurso-1.png?resize=1024%2C191&ssl=1%201024w,%20https://i1.wp.com/procapsulas.com/wp-content/uploads/2021/02/Recurso-1.png?resize=768%2C144&ssl=1%20768w,%20https://i1.wp.com/procapsulas.com/wp-content/uploads/2021/02/Recurso-1.png?resize=1536%2C287&ssl=1%201536w,%20https://i1.wp.com/procapsulas.com/wp-content/uploads/2021/02/Recurso-1.png?resize=2048%2C383&ssl=1%202048w,%20https://i1.wp.com/procapsulas.com/wp-content/uploads/2021/02/Recurso-1.png?resize=1568%2C293&ssl=1%201568w,%20https://i1.wp.com/procapsulas.com/wp-content/uploads/2021/02/Recurso-1.png?w=2400&ssl=1%202400w'>" +
    "<h3 style='display: block; text-align: center;'>Cambio de clave</h3>" +
    "<h4 style='display: block; text-align: center;'>Usuario: " +
    usuario +
    "</h4>" +
    "<p style='width: 90%; margin-left: auto; margin-right: auto;'>Se ha solicitado un código de verificación para cambio de clave. Por favor no lo comparta con nadie.</p>" +
    "<span style='display: block; text-align: center;'>Codigo de verificación: <strong>" +
    codigo +
    "</strong></span>" +
    "</div>" +
    "<footer style='background-color: #d1d0d0; width: 280px; padding:10px; margin-left: auto; margin-right: auto; border-radius: 0px 0px 25px 25px;'>" +
    "<span style='display: block; text-align: center;'>BETHEL SOLUCIONES TECNOLÓGICAS</span>" +
    "</footer>" +
    "</body>" +
    "</html>"
  );
};

export default {
  Query: {
    obtenerUsuariosActivos: async (_, {}) => {
      try {
        const usuarios = await Usuario.find({ estado: "ACTIVO" }).populate({
          path: "roles",
        });
        return usuarios.sort(function (a, b) {
          if (a.nombre > b.nombre) {
            return 1;
          }
          if (a.nombre < b.nombre) {
            return -1;
          }
          return 0;
        });
      } catch (error) {
        return error;
      }
    },
    obtenerUsuarioAutenticado: async (root, args, { usuarioActual }) => {
      if (!usuarioActual) {
        return {
          estado: false,
          data: null,
          message: "",
        };
      }
      const usuario = await Usuario.findOne({
        cedula: usuarioActual.cedula,
      }).populate({ path: "roles" });
      return {
        estado: true,
        data: usuario,
        message: "",
      };
    },
    obtenerUsuario: async (_, { id }) => {
      try {
        const usuarios = await Usuario.findById(id).populate({ path: "roles" });
        return usuarios;
      } catch (error) {
        return error;
      }
    },
    obtenerUsuarioByCodigo: async (_, { codigo }) => {
      try {
        const usuarios = await Usuario.findOne({ cedula: codigo }).populate({
          path: "roles",
        });
        return usuarios;
      } catch (error) {
        return error;
      }
    },
  },
  Mutation: {
    autenticarUsuario: async (_, { cedula, clave }) => {
      try {
        const existe = await Usuario.findOne({ cedula }).populate("roles");
        if (!existe) {
          return {
            token: "0",
            mensaje: "No existe un usuario con esas credenciales",
          };
        } else {
          console.log(existe);
          const valid = await bcrypt.compare(clave, existe.clave);
          if (!valid) {
            return {
              token: "0",
              mensaje: "La contraseña es incorrecta",
            };
          } else {
            const roles = existe.roles.map((r) => r.nombre);
            return {
              token: await crearToken(existe, process.env.SECRETO, "24h"),
              cedula: existe.cedula,
              roles: roles,
              nombre: existe.nombre,
              mensaje: "Usuario correcto",
            };
          }
        }
      } catch (error) {
        return {
          token: "0",
          mensaje: "Error inesperado",
        };
      }
    },
    comprobarUsuario: async (_, { cedula, clave }) => {
      try {
        const existe = await Usuario.findOne({ cedula }).populate({
          path: "roles",
        });
        if (!existe) {
          return {
            roles: null,
            mensaje: "No existe un usuario con esas credenciales",
          };
        } else {
          const valid = await bcrypt.compare(clave, existe.clave);
          if (!valid) {
            return {
              roles: null,
              mensaje: "La contraseña es incorrecta",
            };
          } else {
            return {
              roles: existe.roles,
              cedula: existe.cedula,
              nombre: existe.nombre,
              mensaje: "Usuario correcto",
            };
          }
        }
      } catch (error) {
        return {
          roles: null,
          mensaje: "Error inesperado",
        };
      }
    },
    //udbkmyrslbxhtrgm
    insertarUsuario: async (_, { input }) => {
      try {
        const { cedula } = input;
        if (format.test(cedula)) {
          const existe = await Usuario.findOne({ cedula });
          if (existe) {
            return {
              estado: false,
              data: null,
              message: "El usuario ya existe",
            };
          } else {
            var clave = generarCodigo(6);
            var clave_enc = await bcrypt.hash(clave, 10);
            input.clave = clave_enc;
            const usuario = new Usuario(input);
            const result = await usuario.save();
            var transporte = nodemailer.createTransport({
              host: "smtp.gmail.com",
              port: 587,
              auth: {
                user: "ingbethelpruebas@gmail.com",
                pass: "jjrwkknbhnavmnkb",
              },
            });
            var mailOptions = {
              from: "ingbethelpruebas@gmail.com",
              to: input.correos[0].email,
              subject: "Bienvenido/a",
              html: crearMensajeClave(usuario.nombre, clave),
            };
            transporte.sendMail(mailOptions, (error) => {
              if (error) {
                console.log(error);
              }
            });
            return {
              estado: true,
              data: result,
              message: "Usuario agregado correctamente",
            };
          }
        } else {
          return {
            estado: false,
            data: null,
            message: "La cédula solo debe contener numeros y letras",
          };
        }
      } catch (error) {
        return {
          estado: false,
          data: null,
          message: "Ocurrio un error inesperado al guardar el usuario",
        };
      }
    },
    actualizarUsuario: async (_, { id, input }) => {
      try {
        const usuario = await Usuario.findOneAndUpdate({ _id: id }, input, {
          new: true,
        }).populate("roles");
        return {
          estado: true,
          data: usuario,
          message: "Usuario actualizado correctamente",
        };
      } catch (error) {
        return {
          estado: false,
          data: null,
          message: "Ocurrio un error inesperado al actualizar el usuario",
        };
      }
    },
    desactivarUsuario: async (_, { id }) => {
      try {
        const usuario = await Usuario.findOneAndUpdate(
          { _id: id },
          { estado: "INACTIVO" },
          { new: true }
        );
        if (usuario) {
          return {
            estado: true,
            data: null,
            message: "Usuario eliminado correctamente",
          };
        } else {
          return {
            estado: false,
            data: null,
            message: "No se pudo eliminar el usuario",
          };
        }
      } catch (error) {
        return error;
      }
    },
    cambiarClave: async (_, { id, actual, nueva }) => {
      try {
        const usuario = await Usuario.findById(id);
        if (usuario) {
          const valid = await bcrypt.compare(actual, usuario.clave);
          if (!valid) {
            return {
              success: false,
              message: "La contraseña actual no es correcto",
            };
          } else {
            var clave_enc = await bcrypt.hash(nueva, 10);
            const result = await Usuario.findByIdAndUpdate(
              id,
              { clave: clave_enc },
              { new: true }
            );
            if (result) {
              return {
                success: true,
                message: "Contraseña cambiada correctamente",
              };
            } else {
              return {
                success: false,
                message: "No se puedo cambiar la contraseña",
              };
            }
          }
        } else {
          return {
            success: false,
            message: "No existe el usuario",
          };
        }
      } catch (error) {
        console.log(error);
        return {
          success: false,
          message: "Error inesperado",
        };
      }
    },
    recuperarClave: async (_, { codigo, nueva }) => {
      try {
        var clave_enc = await bcrypt.hash(nueva, 10);
        const result = await Usuario.findOneAndUpdate(
          { cedula: codigo },
          { clave: clave_enc },
          { new: true }
        );
        if (result) {
          return {
            success: true,
            message: "Contraseña cambiada correctamente",
          };
        } else {
          return {
            success: false,
            message: "No se puedo cambiar la contraseña",
          };
        }
      } catch (error) {
        return {
          success: false,
          message: "Error inesperado",
        };
      }
    },
    enviarCodigoVerificacion: async (_, { codigo, correo }) => {
      try {
        const usuario = await Usuario.findOne({ cedula: codigo });
        if (!usuario || usuario === null) {
          return {
            estado: false,
            codigo: null,
            message: "El usuario indicado no existe",
          };
        }

        if (!usuario.correos || usuario.correos.length === 0) {
          return {
            estado: false,
            codigo: null,
            message: "El usuario indicado no tiene correos asociados",
          };
        }
        var band = false;
        usuario.correos.map((c) => {
          if (c.email == correo) {
            band = true;
          }
        });
        if (band) {
          var transporte = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 587,
            auth: {
              user: "ingbethelpruebas@gmail.com",
              pass: "jjrwkknbhnavmnkb",
            },
          });
          transporte.verify();
          var codigo = generarCodigo(8);
          var mailOptions = {
            from: "ingbethelpruebas@gmail.com",
            to: correo,
            subject: "Codigo de verificación",
            html: crearMensajeCodigo(usuario.nombre, codigo),
          };
          transporte.sendMail(mailOptions, (error) => {
            if (error) {
              return {
                estado: false,
                codigo: null,
                message: "El correo no puedo ser enviado",
              };
            }
          });
          return {
            estado: true,
            codigo: codigo,
            message: "El correo fue enviado con éxito",
          };
        } else {
          return {
            estado: false,
            codigo: null,
            message: "El correo indicado no pertenece al usuario",
          };
        }
      } catch (error) {
        console.log(error);
        return {
          estado: false,
          data: null,
          message: "Ocurrió un error inesperado al enviar el correo",
        };
      }
    },
  },
};
