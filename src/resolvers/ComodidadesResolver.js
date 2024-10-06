import { Comodidades } from '../models';

export default {
    Query: {
        obtenerComodidades: async (_, { }) => {
            try {
                const comodidades = await Comodidades.find({ estado: 'ACTIVO' });
                return comodidades;
            } catch (error) {
                return error;
            }
        },
        obtenerComodidadById: async (_, { id }) => {
            try {
                const comodidades = await Comodidades.findById(id);
                return comodidades;
            } catch (error) {
                return error;
            }
        }
    },
    Mutation: {
        insertarComodidad: async (_, { input }) => {
            try {
                const { nombre } = input;
                const existe = await Comodidades.findOne({ nombre });
                if (existe) {
                    return {
                        estado: true,
                        data: null,
                        message: "Ya existe una comodidad con ese nombre"
                    }
                }
                const comodidad = new Comodidades(input)
                const result = await comodidad.save()
                return {
                    estado: true,
                    data: result,
                    message: "Comodidad creada"
                }
            } catch (error) {
                return {
                    estado: false,
                    data: null,
                    message: "Ocurrio un error inesperado"
                };
            }
        },
        actualizarComodidad: async (_, { id, input }) => {
            try {
                const comodidad = await Comodidades.findByIdAndUpdate({ _id: id }, input, { new: true })
                return {
                    estado: true,
                    data: comodidad,
                    message: "Comodidad actualizada correctamente"
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
                const comodidad = await Comodidades.findOneAndUpdate({ _id: id }, { estado: 'INACTIVO' }, { new: true });
                if (comodidad) {
                    return {
                        estado: true,
                        data: null,
                        message: "Comodidad eliminada correctamente"
                    };
                } else {
                    return {
                        estado: false,
                        data: null,
                        message: "No se pudo eliminar la comodidad"
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