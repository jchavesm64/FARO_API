import { model } from "mongoose";
import ReservaHabitacion, { populate } from "../models/ReservaHabitacion";

export default {
    Query: {
        obtenerReservaHabitaciones: async (_, { }) => {
            try {
                const reservaHabitacion = await ReservaHabitacion.find()
                    .populate({
                        path: 'serviciosExtra',
                        model: 'servicios'
                    })
                    .populate({
                        path: 'habitacion',
                        model: 'habitacion'
                    })
                    .populate({
                        path: 'reserva',
                        model: 'reservas',
                        populate: [
                            {
                                path: 'serviciosGrupal',
                                model: 'servicios'
                            },
                            {
                                path: 'paquetes',
                                model: 'paquete',
                                populate: [
                                    {
                                        path: 'servicios',
                                        model: 'servicios'
                                    },
                                    {
                                        path: 'tours',
                                        model: 'tour'
                                    },
                                    {
                                        path: 'temporadas',
                                        model: 'temporada'
                                    }
                                ]
                            },
                            {
                                path: 'tours',
                                model: 'tour'
                            },
                            {
                                path: 'cliente',
                                model: 'clientes'
                            }
                        ]
                    })
                    .exec();

                return reservaHabitacion;
            } catch (error) {
                console.error(error);
                return error;
            }
        }
        ,
        obtenerReservaHabitacion: async (_, { id }) => {
            try {
                const reservaHabitacion = await ReservaHabitacion.findById(id).populate({
                    path: 'serviciosExtra',
                    model: 'servicios'
                })
                    .populate({
                        path: 'habitacion',
                        model: 'habitacion'
                    })
                    .populate({
                        path: 'reserva',
                        model: 'reservas',
                        populate: [
                            {
                                path: 'serviciosGrupal',
                                model: 'servicios'
                            },
                            {
                                path: 'paquetes',
                                model: 'paquete',
                                populate: [
                                    {
                                        path: 'servicios',
                                        model: 'servicios'
                                    },
                                    {
                                        path: 'tours',
                                        model: 'tour'
                                    },
                                    {
                                        path: 'temporadas',
                                        model: 'temporada'
                                    }
                                ]
                            },
                            {
                                path: 'tours',
                                model: 'tour'
                            },
                            {
                                path: 'cliente',
                                model: 'clientes'
                            }
                        ]
                    })
                    .exec();
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