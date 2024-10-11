import { TipoMenu } from '../models';

export default {
    Query: {
        obtenerTiposMenu: async (_, { }) => {
            try {
                const tipos = await TipoMenu.find({ estado: "ACTIVO" });
                return tipos.sort((a, b) => a.nombre.localeCompare(b.nombre));
            } catch (error) {
                return error;
            }
        },
        obtenerTipoMenuById: async (_, { id }) => {
            try {
                const tipo = await TipoMenu.findById(id);
                return tipo;
            } catch (error) {
                return error;
            }
        }
    },
    Mutation: {
        insertarTipoMenu: async (_, { input }) => {
            try {
                const { nombre } = input;
                const existe = await TipoMenu.findOne({ nombre });
                if (existe) {
                    return {
                        estado: false,
                        data: null,
                        message: "El tipo de menu ya existe"
                    };
                } else {
                    const tipoMenu = new TipoMenu(input);
                    const result = await tipoMenu.save();
                    return {
                        estado: true,
                        data: result,
                        message: "El tipo de menu fue agregado exitosamente"
                    };
                }
            } catch (error) {
                return {
                    estado: false,
                    data: null,
                    message: "Ocurrio un error inesperado al guardar el tipo de menu"
                };
            }
        },
        actualizarTipoMenu: async (_, { id, input }) => {
            try {
                const tipo = await TipoMenu.findOneAndUpdate({ _id: id }, input, { new: true });
                return {
                    estado: true,
                    data: tipo,
                    message: "El tipo de menu fue actualizado exitosamente"
                };
            } catch (error) {
                return {
                    estado: false,
                    data: null,
                    message: "Ocurrio un error inesperado al actualizar el tipo de menu"
                };
            }
        },
        desactivarTipoMenu: async (_, { id }) => {
            try {
                const tipo = await TipoMenu.findOneAndUpdate({ _id: id }, { estado: 'INACTIVO' }, { new: true });
                if (tipo) {
                    return {
                        estado: true,
                        data: null,
                        message: "Tipo de menu eliminado correctamente"
                    }
                } else {
                    return {
                        estado: false,
                        data: null,
                        message: "No se pudo eliminar el tipo de menu"
                    };
                }
            } catch (error) {
                return {
                    estado: false,
                    data: null,
                    message: "Ocurrio un error inesperado al eliminar el tipo de menu"
                };
            }
        }
    }
}