import Reservas from "../models/Reservas";

export default {
    Query: {
        obtenerReservas: async (_, { }) => {
            try {
                const reserva = await Reservas.find({ estado: 'Activo' });
                return reserva;
            } catch (error) {
                return error;
            }
        },
        obtenerReserva: async (_, { id }) => {
            try {
                const reserva = await Reservas.findById(id);
                return reserva;
            } catch (error) {
                return error;
            }
        }
    },
    Mutation: {
        insertarReserva: async (_, { input }) => {
            try {
                const resreva = new Reservas(input)
                const result = await resreva.save()
                return {
                    estado: true,
                    data: result,
                    message: "Habición asociada a una reserva"
                }
            } catch (error) {
                return {
                    estado: false,
                    data: null,
                    message: "Ocurrio un error inesperado"
                };
            }
        },
        actualizarReserva: async (_, { id, input }) => {
            try {
                const reserva = await Reservas.findByIdAndUpdate({ _id: id }, input, { new: true })
                return {
                    estado: true,
                    data: reserva,
                    message: "Reserva actualizada correctamente"
                };
            } catch (error) {
                return {
                    estado: false,
                    data: null,
                    message: "Ocurrio un error inesperado"
                };
            }
        },
        desactivarReserva: async (_, { id }) => {
            try {
                const reserva = await Reservas.findOneAndUpdate({ _id: id }, { estado: 'Cancelado' }, { new: true });
                if (reserva) {
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