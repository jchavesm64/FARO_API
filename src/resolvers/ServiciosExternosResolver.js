import ServiciosExternos from "../models/ServiciosExternos";

export default {
    Query: {
        obtenerServiciosExternos: async (_, { }) => {
            try {
                const servicios = await ServiciosExternos.find({ estado: 'ACTIVO' })
                    .populate('tipo');
                return servicios;
            } catch (error) {
                return error;
            }
        },
        obtenerServicioExterno: async (_, { id }) => {
            try {
                const servicios = await ServiciosExternos.findById(id).populate('tipo');
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
                const existe = await ServiciosExternos.findOne({ nombre });
                if (existe) {
                    return {
                        estado: true,
                        data: null,
                        message: "Ya existe un servicio con ese nombre"
                    }
                }
                const servicio = new ServiciosExternos(input)
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
                    message: error
                };
            }
        },
        actualizarServicioExterno: async (_, { id, input }) => {
            try {
                const servicio = await ServiciosExternos.findByIdAndUpdate({ _id: id }, input, { new: true })
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
                const servicio = await ServiciosExternos.findOneAndUpdate({ _id: id }, { estado: 'INACTIVO' }, { new: true });
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