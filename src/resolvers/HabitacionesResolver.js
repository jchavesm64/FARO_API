import { Habitaciones } from "../models";

export default {
    Query: {
        obtenerHabitaciones: async (_, { }) => {
            try {
                const habitaciones = await Habitaciones.find();
                return habitaciones;
            } catch (error) {
                return error;
            }
        },
        obtenerHabitacion: async (_, { id }) => {
            try {
                const habitaciones = await Habitaciones.findById({ id });
                return habitaciones;
            } catch (error) {
                return error;
            }
        },
        obteberHabitacionesDisponibles: async (_, { }) => {
            try {
                const habitaciones = await Habitaciones.find({ estado: 'Diponible' });
                return habitaciones;
            } catch (error) {
                return error;
            }
        }
    },
    Mutation: {
        insertarHabitacion: async (_, { input }) => {
            try {
                const { numeroHabitacion } = input
                const existe = await Habitaciones.find({ numeroHabitacion })
                if (existe) {
                    return {
                        estado: true,
                        data: null,
                        message: "Ya existe una Habitación con ese número"
                    }
                }
                const habitacion = new Habitaciones(input)
                const result = await habitacion.save()
                return {
                    estado: true,
                    data: result,
                    message: "Habitación creada"
                }
            } catch (error) {
                return {
                    estado: false,
                    data: null,
                    message: "Ocurrio un error"
                };
            }
        },
        actualizarHabitacion: async (_, { id, input }) => {
            try {
                const habitacion = await Habitaciones.findByIdAndUpdate({ _id: id }, input, { new: true })
                return {
                    estado: true,
                    data: habitacion,
                    message: "Habitacion actualizada correctamente"
                };
            } catch (error) {
                return {
                    estado: false,
                    data: null,
                    message: "Ocurrio un error"
                };
            }
        },
        desactivarHabitacion: async (_, { id }) => {
            try {
                const habitacion = await Habitaciones.findOneAndUpdate({ _id: id }, { estado: 'Desmantelada' }, { new: true });
                if (habitacion) {
                    return {
                        estado: true,
                        data: null,
                        message: "Habitación eliminada correctamente"
                    };
                } else {
                    return {
                        estado: false,
                        data: null,
                        message: "No se pudo eliminar la habitación"
                    };
                }
            } catch (error) {
                return {
                    estado: false,
                    data: null,
                    message: "Ocurrio un error"
                };
            }
        }
    }
};