import ReservaHabitacion from "../models/ReservaHabitacion";

export default {
    Query: {
        obtenerReservaHabitaciones: async (_, { }) => {
            try {
                const reservaHabitacion = await ReservaHabitacion.find({ estado: 'Activo' });
                return reservaHabitacion;
            } catch (error) {
                return error;
            }
        },
        obtenerReservaHabitacion: async (_, { id }) => {
            try {
                const reservaHabitacion = await ReservaHabitacion.findById(id);
                return reservaHabitacion;
            } catch (error) {
                return error;
            }
        }
    },
    Mutation: {
        insertarReservaHabitacion: async (_, { input }) => {
            try {
                const { habitacion } = input;
                const existe = await ReservaHabitacion.findOne({ habitacion });
                if (existe) {
                    return {
                        estado: true,
                        data: null,
                        message: "Ya existe una reserva con esa habitación"
                    }
                }
                const resrevaHabitacion = new Reservas(input)
                const result = await resrevaHabitacion.save()
                return {
                    estado: true,
                    data: result,
                    message: "Habitación asociada a una reserva"
                }
            } catch (error) {
                return {
                    estado: false,
                    data: null,
                    message: "Ocurrio un error inesperado"
                };
            }
        },
        actualizarReservaHabitacion: async (_, { id, input }) => {
            try {
                const resrevaHabitacion = await ReservaHabitacion.findByIdAndUpdate({ _id: id }, input, { new: true })
                return {
                    estado: true,
                    data: resrevaHabitacion,
                    message: "Reserva actualizada"
                };
            } catch (error) {
                return {
                    estado: false,
                    data: null,
                    message: "Ocurrio un error inesperado"
                };
            }
        },
        desactivarReservaHabitacion: async (_, { id }) => {
            try {
                const resrevaHabitacion = await ReservaHabitacion.findOneAndUpdate({ _id: id }, { estado: 'Cancelado' }, { new: true });
                if (resrevaHabitacion) {
                    return {
                        estado: true,
                        data: null,
                        message: "Reserva eliminada correctamente"
                    };
                } else {
                    return {
                        estado: false,
                        data: null,
                        message: "No se pudo eliminar la reserva"
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
};