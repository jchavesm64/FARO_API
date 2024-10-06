import Temporada from "../models/Temporada";

export default {
    Query: {
        obtenerTemporada: async (_, { }) => {
            try {
                const temporada = await Temporada.find();
                return temporada;
            } catch (error) {
                return error;
            }
        },
        obtenerTemporadaById: async (_, { id }) => {
            try {
                const temporada = await Temporada.findById(id);
                return temporada;
            } catch (error) {
                return error;
            }
        }
    },
    Mutation: {
        insertarTemporada: async (_, { input }) => {
            try {
                const temporada = new Temporada(input);
                const result = await temporada.save();
                return {
                    estado: true,
                    data: result,
                    message: "Temporada creada con exito"
                }
            } catch (error) {
                return {
                    estado: false,
                    data: null,
                    message: error
                };
            }
        },
        actualizarTemporada: async (_, { id, input }) => {
            try {
                const temporada = await Temporada.findOneAndUpdate({ _id: id }, input, { new: true });
                return {
                    estado: true,
                    data: temporada,
                    message: "Temporada actualizada correctamente"
                };
            } catch (error) {
                return {
                    estado: false,
                    data: null,
                    message: "Ocurrio un error inesperado al actualizar la temporada"
                };
            }
        }
    }
}