import { ServiciosExternos } from '../models';

export default {
    Query: {
        obtenerServiciosExternos: async (_, { }) => {
            try {
                const servicios = await Servicios.find({ estado: 'ACTIVO' })
                    .populate('tipo');
                return servicios;
            } catch (error) {
                return error;
            }
        },
        obtenerServicioExterno: async (_, { id }) => {
            try {
                const servicios = await Servicios.findById(id).populate('tipo');
                return servicios;
            } catch (error) {
                return error;
            }
        }
    },
    Mutation: {
        insertarServicioExterno: async (_, { input }) => {
            try {
                const { nombre } = input;
                const existe = await Servicios.findOne({ nombre });
                if (existe) {
                    return {
                        estado: true,
                        data: null,
                        message: "Ya existe un servicio con ese nombre"
                    }
                }
                const servicio = new Servicios(input)
                const result = await servicio.save()
                return {
                    estado: true,
                    data: result,
                    message: "Servicio creado"
                }
            } catch (error) {
                return {
                    estado: false,
                    data: null,
                    message: "Ocurrio un error inesperado"
                };
            }
        },
        actualizarServicioExterno: async (_, { id, input }) => {
            try {
                const servicio = await Servicios.findByIdAndUpdate({ _id: id }, input, { new: true })
                return {
                    estado: true,
                    data: servicio,
                    message: "Servicio actualizado correctamente"
                };
            } catch (error) {
                return {
                    estado: false,
                    data: null,
                    message: "Ocurrio un error inesperado"
                };
            }
        },
        desactivarServicioExterno: async (_, { id }) => {
            try {
                const servicio = await Servicios.findOneAndUpdate({ _id: id }, { estado: 'INACTIVO' }, { new: true });
                if (servicio) {
                    return {
                        estado: true,
                        data: null,
                        message: "Servicio eliminado correctamente"
                    };
                } else {
                    return {
                        estado: false,
                        data: null,
                        message: "No se pudo eliminar la servicio"
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