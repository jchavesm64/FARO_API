import { Habitaciones, ReservaHabitacion } from "../models";
import Reservas from "../models/Reservas";

export default {
    Query: {
        obtenerReservas: async (_, { filters }) => {
            try {
                let query = {};

                if (filters?.cliente) query.cliente = filters.cliente;
                if (filters?.estado) query.estado = filters.estado;
                if (filters?.fechaReserva) query.fechaReserva = filters.fechaReserva;
                if (filters?.metodoPago) query.metodoPago = filters.metodoPago;
                if (filters?.totalMin || filters?.totalMax) {
                    query.total = {};
                    if (filters.totalMin) query.total.$gte = filters.totalMin;
                    if (filters.totalMax) query.total.$lte = filters.totalMax;
                }

                const reservas = await Reservas.find(query)
                    .populate("cliente")
                    .populate("usuario");

                return reservas;
            } catch (error) {
                throw new Error("Error al obtener las reservas: " + error.message);
            }
        },
        obtenerReserva: async (_, { id }) => {
            try {
                const reserva = await Reservas.findById(id)
                    .populate('cliente')
                    .populate('usuario');
                return reserva;
            } catch (error) {
                return error;
            }
        }
    },
    Mutation: {
        insertarReserva: async (_, { input, bookingRoom }) => {
            try {
                const resreva = new Reservas(input);
                const result = await resreva.save();
                for (let i = 0; i < bookingRoom.habitacion.length; i++) {

                    const serviciosExtra = bookingRoom.serviciosExtra ? bookingRoom.serviciosExtra.find(extra => extra.room === bookingRoom.habitacion[i]) : [];
                    const serviceIds = serviciosExtra ? serviciosExtra.service : [];

                    const reservaHabitacion = new ReservaHabitacion({
                        habitacion: bookingRoom.habitacion[i],
                        reserva: result.id,
                        fechaEntrada: bookingRoom.fechaEntrada,
                        fechaSalida: bookingRoom.fechaSalida,
                        serviciosExtra: serviceIds,
                        estado: 'Pendiente'
                    });
                    await Habitaciones.findOneAndUpdate({ _id: bookingRoom.habitacion[i] }, { estado: 'Reservada' }, { new: true });
                    await reservaHabitacion.save();
                }
                return {
                    estado: true,
                    data: result,
                    message: "Habición asociada a una reserva"
                }
            } catch (error) {
                return {
                    estado: false,
                    data: null,
                    message: error
                };
            }
        },
        actualizarReserva: async (_, { id, input, bookingRoom }) => {
            try {
                const updatedReserva = await Reservas.findByIdAndUpdate(id, input, { new: true });
                if (!updatedReserva) {
                    return {
                        estado: false,
                        data: null,
                        message: "Reserva no encontrada"
                    };
                }
                const habitacionesAsociadas = await ReservaHabitacion.find({ reserva: id });
                for (let habitacion of habitacionesAsociadas) {
                    await Habitaciones.findByIdAndUpdate(habitacion.habitacion, { estado: "Disponible" }, { new: true });
                }
                await ReservaHabitacion.deleteMany({ reserva: id });
                for (let i = 0; i < bookingRoom.habitacion.length; i++) {
                    const serviciosExtra = bookingRoom.serviciosExtra
                        ? bookingRoom.serviciosExtra.find(extra => extra.room === bookingRoom.habitacion[i])
                        : [];
                    const serviceIds = serviciosExtra ? serviciosExtra.service : [];

                    const reservaHabitacion = new ReservaHabitacion({
                        habitacion: bookingRoom.habitacion[i],
                        reserva: id,
                        fechaEntrada: bookingRoom.fechaEntrada,
                        fechaSalida: bookingRoom.fechaSalida,
                        serviciosExtra: serviceIds,
                        estado: 'Pendiente'
                    });
                    await Habitaciones.findByIdAndUpdate(bookingRoom.habitacion[i], { estado: 'Reservada' }, { new: true });
                    await reservaHabitacion.save();
                }

                return {
                    estado: true,
                    data: updatedReserva,
                    message: "Reserva actualizada exitosamente"
                };
            } catch (error) {
                return {
                    estado: false,
                    data: null,
                    message: error.message
                };
            }
        },
        desactivarReserva: async (_, { id }) => {
            try {
                const reserva = await Reservas.findByIdAndUpdate(
                    id,
                    { estado: "Cancelada" },
                    { new: true }
                );

                if (!reserva) {
                    return {
                        estado: false,
                        data: null,
                        message: "Reserva no encontrada"
                    };
                }

                const habitacionesAsociadas = await ReservaHabitacion.find({ reserva: id });

                if (!habitacionesAsociadas || habitacionesAsociadas.length === 0) {
                    return {
                        estado: false,
                        data: null,
                        message: "No se encontraron habitaciones asociadas a la reserva"
                    };
                }

                for (let habitacion of habitacionesAsociadas) {
                    await Habitaciones.findByIdAndUpdate(
                        habitacion.habitacion,
                        { estado: "Disponible" },
                        { new: true }
                    );
                }

                return {
                    estado: true,
                    data: null,
                    message: "Reserva cancelada y habitaciones actualizadas a 'Disponible'"
                };
            } catch (error) {
                return {
                    estado: false,
                    data: null,
                    message: error.message
                };
            }
        }
    }
};