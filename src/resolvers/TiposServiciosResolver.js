import TipoServicios from "../models/TipoServicios";

export default {
    Query: {
        obtenerTipoServicio: async (_, { }) => {
            try {
                const tipos = await TipoServicios.find({ estado: "ACTIVO" });
                return tipos;
            } catch (error) {
                return error;
            }
        },
        obtenerTipoServicioId: async (_, { id }) => {
            try {
                const tipoServicio = await TipoServicios.findById(id);
                return tipoServicio;
            } catch (error) {
                return error;
            }
        }
    },
    Mutation: {
        insertarTipoServicio: async (_, { input }) => {
            try {
                const { nombre } = input;
                const existe = await TipoServicios.findOne({ nombre });
                if (existe) {
                    return {
                        estado: true,
                        data: null,
                        message: "Ya existe un tipo de servicio con ese nombre"
                    }
                }
                const tipoServicio = new TipoServicios(input)
                const result = await tipoServicio.save()
                return {
                    estado: true,
                    data: result,
                    message: "Tipo de servicio creado"
                }
            } catch (error) {
                return {
                    estado: false,
                    data: null,
                    message: "Ocurrio un error inesperado"
                };
            }
        },
        actualizarTipoServicio: async (_, { id, input }) => {
            try {
                const tipoServicio = await TipoServicios.findByIdAndUpdate({ _id: id }, input, { new: true })
                return {
                    estado: true,
                    data: tipoServicio,
                    message: "Tipo de servicio actualizado correctamente"
                };
            } catch (error) {
                return {
                    estado: false,
                    data: null,
                    message: "Ocurrio un error inesperado"
                };
            }
        },
        desactivarTipoServicio: async (_, { id }) => {
            try {
                const tipoServicio = await TipoServicios.findOneAndUpdate({ _id: id }, { estado: 'INACTIVO' }, { new: true });
                if (tipoServicio) {
                    return {
                        estado: true,
                        data: null,
                        message: "Tipo de servicio eliminado correctamente"
                    };
                } else {
                    return {
                        estado: false,
                        data: null,
                        message: "No se pudo eliminar el tipo de servicio"
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