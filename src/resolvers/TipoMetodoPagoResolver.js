import { TipoMetodoPago } from '../models';

export default {
    Query: {
        obtenerTiposMetodoPago: async (_, { }) => {
            try {
                const tipos = await TipoMetodoPago.find({ estado: "ACTIVO" });
                return tipos.sort((a, b) => a.nombre.localeCompare(b.nombre));
            } catch (error) {
                return error;
            }
        },
        obtenerTipoMetodoPagoById: async (_, { id }) => {
            try {
                const tipo = await TipoMetodoPago.findById(id);
                return tipo;
            } catch (error) {
                return error;
            }
        }
    },
    Mutation: {
        insertarTipoMetodoPago: async (_, { input }) => {
            try {
                const { nombre } = input;
                const existe = await TipoMetodoPago.findOne({ nombre });
                if (existe) {
                    return {
                        estado: false,
                        data: null,
                        message: "El tipo de metodo de pago ya existe"
                    };
                } else {
                    const tipoMetodoPago = new TipoMetodoPago(input);
                    const result = await tipoMetodoPago.save();
                    return {
                        estado: true,
                        data: result,
                        message: "El tipo de metodo de pago fue agregado exitosamente"
                    };
                }
            } catch (error) {
                return {
                    estado: false,
                    data: null,
                    message: "Ocurrio un error inesperado al guardar el tipo de metodo de pago"
                };
            }
        },
        actualizarTipoMetodoPago: async (_, { id, input }) => {
            try {
                const tipo = await TipoMetodoPago.findOneAndUpdate({ _id: id }, input, { new: true });
                return {
                    estado: true,
                    data: tipo,
                    message: "El tipo de metodo de pago fue actualizado exitosamente"
                };
            } catch (error) {
                return {
                    estado: false,
                    data: null,
                    message: "Ocurrio un error inesperado al actualizar el tipo de metodo de pago"
                };
            }
        },
        desactivarTipoMetodoPago: async (_, { id }) => {
            try {
                const tipo = await TipoMetodoPago.findOneAndUpdate({ _id: id }, { estado: 'INACTIVO' }, { new: true });
                if (tipo) {
                    return {
                        estado: true,
                        data: null,
                        message: "Tipo de metodo de pago eliminado correctamente"
                    }
                } else {
                    return {
                        estado: false,
                        data: null,
                        message: "No se pudo eliminar el tipo de metodo de pago"
                    };
                }
            } catch (error) {
                return {
                    estado: false,
                    data: null,
                    message: "Ocurrio un error inesperado al eliminar el tipo de metodo de pago"
                };
            }
        }
    }
}