import { TipoPlatillo } from '../models';

export default {
    Query: {
        obtenerTiposPlatillo: async (_, { }) => {
            try {
                const tipos = await TipoPlatillo.find({ estado: "ACTIVO" });
                return tipos.sort((a, b) => a.nombre.localeCompare(b.nombre));
            } catch (error) {
                return error;
            }
        },
        obtenerTipoPlatilloById: async (_, { id }) => {
            try {
                const tipo = await TipoPlatillo.findById(id);
                return tipo;
            } catch (error) {
                return error;
            }
        }
    },
    Mutation: {
        insertarTipoPlatillo: async (_, { input }) => {
            try {
                const { nombre } = input;
                const existe = await TipoPlatillo.findOne({ nombre });
                if (existe) {
                    return {
                        estado: false,
                        data: null,
                        message: "El tipo de platillo ya existe"
                    };
                } else {
                    const tipoPlatillo = new TipoPlatillo(input);
                    const result = await tipoPlatillo.save();
                    return {
                        estado: true,
                        data: result,
                        message: "El tipo de platillo fue agregado exitosamente"
                    };
                }
            } catch (error) {
                return {
                    estado: false,
                    data: null,
                    message: "Ocurrio un error inesperado al guardar el tipo de platillo"
                };
            }
        },
        actualizarTipoPlatillo: async (_, { id, input }) => {
            try {
                const tipo = await TipoPlatillo.findOneAndUpdate({ _id: id }, input, { new: true });
                return {
                    estado: true,
                    data: tipo,
                    message: "El tipo de platillo fue actualizado exitosamente"
                };
            } catch (error) {
                return {
                    estado: false,
                    data: null,
                    message: "Ocurrio un error inesperado al actualizar el tipo de platillo"
                };
            }
        },
        desactivarTipoPlatillo: async (_, { id }) => {
            try {
                const tipo = await TipoPlatillo.findOneAndUpdate({ _id: id }, { estado: 'INACTIVO' }, { new: true });
                if (tipo) {
                    return {
                        estado: true,
                        data: null,
                        message: "Tipo de platillo eliminado correctamente"
                    }
                } else {
                    return {
                        estado: false,
                        data: null,
                        message: "No se pudo eliminar el tipo de platillo"
                    };
                }
            } catch (error) {
                return {
                    estado: false,
                    data: null,
                    message: "Ocurrio un error inesperado al eliminar el tipo de platillo"
                };
            }
        }
    }
}