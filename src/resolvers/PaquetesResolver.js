import Paquetes from "../models/Paquetes";

export default {
    Query: {
        obtenerPaquetes: async (_, { }) => {
            try {
                const paquetes = await Paquetes.find()
                    .populate('temporadas');
                return paquetes;
            } catch (error) {
                return error;
            }
        },
        obtenerPaquete: async (_, { id }) => {
            try {
                const paquetes = await Paquetes.findById(id)
                    .populate('temporadas');

                return paquetes;
            } catch (error) {
                return error;
            }
        }
    },
    Mutation: {
        insertarPaquete: async (_, { input }) => {
            try {

                const { nombre } = input;
                const existe = await Paquetes.findOne({ nombre });
                if (existe) {
                    return {
                        estado: true,
                        data: null,
                        message: "Ya existe un paquete con ese nombre"
                    }
                }
                const paquete = new Paquetes(input);
                const result = await paquete.save();

                return {
                    estado: true,
                    data: result,
                    message: "Paquete creado"
                }
            } catch (error) {
                return {
                    estado: false,
                    data: null,
                    message: "Ocurrio un error inesperado"
                };
            }
        },
        actualizarPaquete: async (_, { id, input }) => {
            try {
                const paquete = await Paquetes.findByIdAndUpdate({ _id: id }, input, { new: true })
                return {
                    estado: true,
                    data: paquete,
                    message: "Paquete actualizada correctamente"
                };
            } catch (error) {

                return {
                    estado: false,
                    data: null,
                    message: "Ocurrio un error inesperado"
                };
            }
        },
        desactivarTour: async (_, { id }) => {
            try {
                const paquete = await Paquetes.findOneAndUpdate({ _id: id }, { estado: 'INACTIVO' }, { new: true });
                if (paquete) {
                    return {
                        estado: true,
                        data: paquete,
                        message: "Paquete eliminado correctamente"
                    };
                } else {
                    return {
                        estado: false,
                        data: null,
                        message: "No se pudo eliminar el paquete"
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