import { ModuloConsecutivo } from '../models';
import { HistorialConsecutivo } from '../models';
import { Usuario } from '../models';
import moment from 'moment-timezone';

export default {
    Query: {
        obtenerModulosConsecutivos: async () => {
            try {
                const modulos = await ModuloConsecutivo.find({});
                return modulos.sort(function (a, b) {
                    if (a.nombre > b.nombre) {
                        return 1
                    }
                    if (a.nombre < b.nombre) {
                        return -1
                    }
                    return 0;
                });
            } catch (error) {
                return error;
            }
        },
        obtenerModuloConsecutivo: async (_, { id }) => {
            try {
                const modulo = await ModuloConsecutivo.findById(id);
                return modulo;
            } catch (error) {
                return error;
            }
        }
    },
    Mutation: {
        insertarModuloConsecutivo: async (_, { input }) => {
            try {
                const { nombre } = input;
                const existe = await ModuloConsecutivo.findOne({ nombre });
                if (existe) {
                    return {
                        estado: true,
                        data: null,
                        message: "El modulo ya existe"
                    };
                } else {
                    input.actual = "0000";
                    input.siguiente = "0001";
                    const modulo = new ModuloConsecutivo(input);
                    const result = await modulo.save();
                    return {
                        estado: true,
                        data: result,
                        message: "Modulo creado con exito"
                    }
                }
            } catch (error) {
                console.log(error);
                return {
                    estado: false,
                    data: null,
                    message: "Ocurrio un error inesperado al registrar el modulo"
                };
            }
        },
        actualizarModuloConsecutivo: async (_, { id, input }) => {
            try {
                const modulo = await ModuloConsecutivo.findByIdAndUpdate(id, input, { new: true });
                return {
                    estado: true,
                    data: modulo,
                    message: "Modulo actualizado con exito"
                }
            } catch (error) {
                return {
                    estado: false,
                    data: null,
                    message: "Ocurrio un error inesperado al actualizar el modulo"
                }
            }
        },
        generarConsecutivo: async (_, { input }) => {
            try {
                const { modulo, cedula } = input;
                const moduloConsecutivo = await ModuloConsecutivo.findOne({ nombre: new RegExp(modulo, 'i') });
                if (!moduloConsecutivo) {
                    return {
                        estado: false,
                        data: null,
                        message: "Error al general el consecutivo: El modulo no existe"
                    };
                }
                const usuarioConsecutivo = await Usuario.findOne({ cedula });
                if (!usuarioConsecutivo) {
                    return {
                        estado: false,
                        data: null,
                        message: "Error al general el consecutivo: El usuario no existe"
                    };
                }
                const { abreviatura, siguiente } = moduloConsecutivo;
                const anio = moment().format('YYYY');
                const consecutivo = `${abreviatura}-${siguiente}-${anio}`;
                const historial = new HistorialConsecutivo({
                    consecutivo,
                    usuario: usuarioConsecutivo._id,
                    fechaAsignacion: moment().format('YYYY-MM-DD HH:mm:ss'),
                });
                await historial.save();
                let actual = parseInt(siguiente, 10);
                actual++;
                moduloConsecutivo.actual = siguiente;
                moduloConsecutivo.siguiente = actual.toString().padStart(4, '0');
                await moduloConsecutivo.save();

                return {
                    estado: true,
                    data: historial,
                    message: "Consecutivo generado con exito"
                }
            } catch (error) {
                console.log(error);
                return {
                    estado: false,
                    data: null,
                    message: "Ocurrio un error inesperado al generar el consecutivo"
                }
            }
        }
    },

};