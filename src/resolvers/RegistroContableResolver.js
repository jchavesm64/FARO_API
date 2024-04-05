import { RegistroContable } from "../models"
import ModuloConsecutivoResolver from './ModuloConsecutivoResolver';

const { generarConsecutivo } = ModuloConsecutivoResolver.Mutation;


export default {
    Query: {
        obtenerRegistroContable: async (_, { id }) => {
            try {
                const registroContable = await RegistroContable.findById(id)
                    .populate('cliente')
                    .populate('proveedor')
                    .populate('usuario')
                    .populate('consecutivo')

                return registroContable
            } catch (error) {
                return error
            }
        },

        obtenerRegistrosContables: async () => {
            try {
                const registrosContables = await RegistroContable.find()
                    .populate('cliente')
                    .populate('proveedor')
                    .populate('usuario')
                    .populate('consecutivo')

                return registrosContables.sort(function (a, b) {
                    if (a.fechaRegistro < b.fechaRegistro) {
                        return 1
                    }
                    if (a.fechaRegistro > b.fechaRegistro) {
                        return -1
                    }
                    return 0;
                });

            } catch (error) {
                return error
            }
        },
        obtenerRegistrosContablesTipo: async (_, { tipo }) => {
            try {
                const registrosContables = await RegistroContable.find({ tipoRegistroContable: tipo })
                    .populate('cliente')
                    .populate('proveedor')
                    .populate('usuario')
                    .populate('consecutivo')

                return registrosContables.sort(function (a, b) {
                    if (a.fechaRegistro < b.fechaRegistro) {
                        return 1
                    }
                    if (a.fechaRegistro > b.fechaRegistro) {
                        return -1
                    }
                    return 0;
                });

            } catch (error) {
                return error
            }
        }
    },
    Mutation: {
        insertarRegistroContable: async (_, { input }) => {
            try {
                let consecutivo = null;
                if (input.tipoRegistroContable === "COBRAR") {
                    consecutivo = await generarConsecutivo(_, { input: { modulo: "Cuentas por cobrar", cedula: input.cedula } });
                } else if (input.tipoRegistroContable === "PAGAR") {
                    consecutivo = await generarConsecutivo(_, { input: { modulo: "Cuentas por pagar", cedula: input.cedula } });
                } else {
                    return {
                        estado: false,
                        data: null,
                        message: "El tipo de registro contable no es valido"
                    }
                }
                if (!consecutivo.estado) {
                    return {
                        estado: false,
                        data: null,
                        message: consecutivo.message
                    }
                }
                input.consecutivo = consecutivo.data.id;
                delete input.cedula;
                const registroContable = new RegistroContable(input)
                const result = await registroContable.save()
                return {
                    estado: true,
                    data: result,
                    message: "El registro contable fue registrado con éxito"
                };
            } catch (error) {
                console.log(error);
                return {
                    estado: false,
                    data: null,
                    message: "Ocurrio un error al registrar el registro contable"
                };
            }
        },

        actualizarRegistroContable: async (_, { id, input }) => {
            try {
                let consecutivo = null;
                const registroContableAnterior = await RegistroContable.findById(id).populate('consecutivo');
                if (registroContableAnterior.tipoRegistroContable !== input.tipoRegistroContable) {
                    if (input.tipoRegistroContable === "COBRAR") {
                        consecutivo = await generarConsecutivo(_, { input: { modulo: "Cuentas por cobrar", cedula: input.cedula } });
                    } else if (input.tipoRegistroContable === "PAGAR") {
                        consecutivo = await generarConsecutivo(_, { input: { modulo: "Cuentas por pagar", cedula: input.cedula } });
                    } else {
                        return {
                            estado: false,
                            data: null,
                            message: "El tipo de registro contable no es valido"
                        }
                    }
                    if (!consecutivo.estado) {
                        return {
                            estado: false,
                            data: null,
                            message: consecutivo.message
                        }
                    }
                    input.consecutivo = consecutivo.data.id;
                }
                delete input.cedula;
                const registroContable = await RegistroContable.findOneAndUpdate({ _id: id }, input, { new: true })
                return {
                    estado: true,
                    data: registroContable,
                    message: "El registro contable fue actualizado con éxito"
                };
            } catch (error) {
                console.log(error);
                return {
                    estado: false,
                    data: null,
                    message: "Ocurrio un error al actualizar el registro contable"
                };
            }
        },

        desactivarRegistroContable: async (_, { id }) => {
            try {
                const registroContable = await RegistroContable.findOneAndUpdate({ _id: id }, { estado: "INACTIVO" }, { new: true })
                if (registroContable) {
                    return {
                        estado: true,
                        data: null,
                        message: "Registro contable eliminado correctamente"
                    };
                } else {
                    return {
                        estado: false,
                        data: null,
                        message: "No se pudo eliminar el registro contable"
                    };
                }
            } catch (error) {
                return {
                    estado: false,
                    data: null,
                    message: "Ocurrio un error al eliminar el registro contable"
                };
            }
        }
    }

}