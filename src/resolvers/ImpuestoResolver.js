import { Impuesto } from "../models";


export default {
    Query: {
        obtenerImpuestos: async (_, { }) => {
            try {
                const impuestos = await Impuesto.find({ estado: "ACTIVO" });
                return impuestos.sort(function (a, b) {
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
        obtenerImpuestoById: async (_, { id }) => {
            try {
                const impuesto = await Impuesto.findById(id);
                return impuesto;
            } catch (error) {
                return error;
            }
        },
        obtenerImpuestoByNombre: async (_, { nombre }) => {
            try {
                const impuesto = await Impuesto.findOne({ nombre });
                return impuesto;
            } catch (error) {
                return error;
            }
        }
    },
    Mutation: {
        insertarImpuesto: async (_, { input }) => {
            try {
                const { nombre } = input;
                const existe = await Impuesto.findOne({ nombre });
                if (existe) {
                    return {
                        estado: false,
                        data: null,
                        message: "El impuesto ya existe"
                    }
                } else {
                    const impuesto = new Impuesto(input);
                    const result = await impuesto.save();
                    return {
                        estado: true,
                        data: result,
                        message: "Impuesto registrado correctamente"
                    }
                }
            } catch (error) {
                return {
                    estado: false,
                    data: null,
                    message: "Ocurrio un error inesperado al registrar el impuesto"
                }
            }
        },
        actualizarImpuesto: async (_, { id, input }) => {
            try {
                const impuesto = await Impuesto.findOneAndUpdate({ _id: id }, input, { new: true });
                return {
                    estado: true,
                    data: impuesto,
                    message: "Impuesto, actualizado correctamente"
                }
            } catch (error) {
                return {
                    estado: false,
                    data: null,
                    message: "Ocurrio un error inesperado al actualizar el impuesto"
                }
            }
        },
        desactivarImpuesto: async (_, { id }) => {
            try {
                const impuesto = await Impuesto.findOneAndUpdate({ _id: id }, { estado: 'INACTIVO' }, { new: true });
                if (impuesto) {
                    return {
                        estado: true,
                        data: null,
                        message: "Impuesto eliminado correctamente"
                    };
                } else {
                    return {
                        estado: false,
                        data: null,
                        message: "No se pudo eliminar el impuesto"
                    }
                }
            } catch (error) {
                return {
                    estado: false,
                    data: null,
                    message: "Ocurrio en error inesperado al eliminar el impuesto"
                }
            }
        }
    }
}