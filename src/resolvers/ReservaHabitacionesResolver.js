import { model } from "mongoose";
import ReservaHabitacion, { populate } from "../models/ReservaHabitacion";

const mongoose = require("mongoose");
export default {
  Query: {
    obtenerReservaHabitaciones: async (_, {}) => {
      try {
        const reservaHabitacion = await ReservaHabitacion.find()
          .populate({
            path: "habitacion",
            model: "habitacion",
            populate: [
              {
                path: "tipoHabitacion",
                model: "tipoHabitacion",
              },
            ],
          })
          .populate({
            path: "reserva",
            model: "reservas",
            populate: [
              {
                path: "cliente",
                model: "clientes",
              },
            ],
          })
          .exec();

        return reservaHabitacion;
      } catch (error) {
        console.error(error);
        return error;
      }
    },
    obtenerReservaHabitacion: async (_, { id }) => {
      try {
        const reservaHabitacion = await ReservaHabitacion.find({ reserva: id })
          .populate({
            path: "habitacion",
            model: "habitacion",
            populate: [
              {
                path: "tipoHabitacion", // Popular la relación tipoHabitacion
                model: "tipoHabitacion",
              },
              {
                path: "comodidades", // Popular la relación comodidades
                model: "comodidades",
              },
              {
                path: "tours",
                model: "tour",
              },
            ],
          })
          .exec();
        return reservaHabitacion;
      } catch (error) {
        console.log("reservaHabitacion", error);
        return error;
      }
    },
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
            message: "Ya existe una reserva con esa habitación",
          };
        }
        const resrevaHabitacion = new Reservas(input);
        const result = await resrevaHabitacion.save();
        return {
          estado: true,
          data: result,
          message: "Habitación asociada a una reserva",
        };
      } catch (error) {
        return {
          estado: false,
          data: null,
          message: "Ocurrio un error inesperado",
        };
      }
    },
    actualizarReservaHabitacion: async (_, { id, input }) => {
      try {
        const reservaHabitacion = await ReservaHabitacion.findByIdAndUpdate(
          { _id: id },
          { $set: input },
          { new: true }
        );
        return {
          estado: true,
          data: reservaHabitacion,
          message: "Reserva actualizada",
        };
      } catch (error) {
        return {
          estado: false,
          data: null,
          message: "Ocurrio un error inesperado",
        };
      }
    },
    desactivarReservaHabitacion: async (_, { id }) => {
      try {
        const resrevaHabitacion = await ReservaHabitacion.findOneAndUpdate(
          { _id: id },
          { estado: "Cancelado" },
          { new: true }
        );
        if (resrevaHabitacion) {
          return {
            estado: true,
            data: null,
            message: "Reserva eliminada correctamente",
          };
        } else {
          return {
            estado: false,
            data: null,
            message: "No se pudo eliminar la reserva",
          };
        }
      } catch (error) {
        return {
          estado: false,
          data: null,
          message: "Ocurrio un error inesperado",
        };
      }
    },
  },
};
