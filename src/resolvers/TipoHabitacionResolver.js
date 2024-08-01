import { TipoHabitacion } from "../models";

export default {
    
    Query: {
        obtenerTipoHabitaciones: async (_, { }) => {
            try {
                const tipoHabitacion = await TipoHabitacion.find({ estado: 'ACTIVO' });
                return tipoHabitacion;
            } catch (error) {
                return error;
            }
        },
        obtenerTipoHabitacion: async (_, { id }) => {
            try {
                const tipoHabitacion = await TipoHabitacion.findById(id);
                return tipoHabitacion;
            } catch (error) {
                return error;
            }
        }
    },
    Mutation: {
        insertarTipoHabitacion: async (_, { input }) => {
            try {
                const { nombre } = input;
                const existe = await TipoHabitacion.findOne({ nombre });
                if (existe) {
                    return {
                        estado: true,
                        data: null,
                        message: "Ya existe un tipo de habitación con ese nombre"
                    }
                }
                const tipoHabitacion = new TipoHabitacion(input)
                const result = await tipoHabitacion.save()
                return {
                    estado: true,
                    data: result,
                    message: "Tipo de habitación creado"
                }
            } catch (error) {
                return {
                    estado: false,
                    data: null,
                    message: "Ocurrio un error inesperado"
                };
            }
        },
        actualizarTipoHabitacion: async (_, { id, input }) => {
            try {
                const tipoHabitacion = await TipoHabitacion.findByIdAndUpdate({ _id: id }, input, { new: true })
                return {
                    estado: true,
                    data: tipoHabitacion,
                    message: "Tipo de habitación actualizada correctamente"
                };
            } catch (error) {
                return {
                    estado: false,
                    data: null,
                    message: "Ocurrio un error inesperado"
                };
            }
        },
        desactivarComodidad: async (_, { id }) => {
            try {
                const tipoHabitacion = await TipoHabitacion.findOneAndUpdate({ _id: id }, { estado: 'INACTIVO' }, { new: true });
                if (tipoHabitacion) {
                    return {
                        estado: true,
                        data: null,
                        message: "Tipo de habitación eliminado correctamente"
                    };
                } else {
                    return {
                        estado: false,
                        data: null,
                        message: "No se pudo eliminar el tipo de habitación"
                    };
                }
            } catch (error) {
                return {
                    estado: false,
                    data: null,
                    message: "Ocurrio un error inesperado"
                };
            }
        }
    }
}