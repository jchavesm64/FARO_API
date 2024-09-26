import Tours from "../models/Tours";


export default {
    Query: {
        obtenerTours: async (_, { }) => {
            try {
                const tour = await Tours.find({ estado: 'Activo' });
                return tour;
            } catch (error) {
                return error;
            }
        },
        obtenerTour: async (_, { id }) => {
            try {
                const tour = await Tours.findById(id);
                return tour;
            } catch (error) {
                return error;
            }
        }
    },
    Mutation: {
        insertarTour: async (_, { input }) => {
            try {
                const { nombre } = input;
                const existe = await Tours.findOne({ nombre });
                if (existe) {
                    return {
                        estado: true,
                        data: null,
                        message: "Ya existe un servicio con ese nombre"
                    }
                }
                const tour = new Tours(input);
                const result = await tour.save();
                return {
                    estado: true,
                    data: result,
                    message: "Tour creado con exito"
                }
            } catch (error) {
                return {
                    estado: false,
                    data: null,
                    message: "Ocurrio un error inesperado"
                };
            }
        },
        actualizarTour: async (_, { id, input }) => {
            try {
                const tour = await Tours.findOneAndUpdate({ _id: id }, input, { new: true });
                return {
                    estado: true,
                    data: tour,
                    message: "Tour actualizada correctamente"
                };
            } catch (error) {
                return {
                    estado: false,
                    data: null,
                    message: "Ocurrio un error inesperado al actualizar el Tour"
                };
            }
        },
        desactivarTour: async (_, { id }) => {
            try {
                const tour = await Tours.findOneAndUpdate({ _id: id }, { estado: 'INACTIVO' }, { new: true });
                if (tour) {
                    return {
                        estado: true,
                        data: null,
                        message: "Tour eliminado correctamente"
                    };
                } else {
                    return {
                        estado: false,
                        data: null,
                        message: "No se pudo eliminar la tour"
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