import AreasOperativas from '../models/AreasOperativas'

export default {
    Query: {
        obtenerAreas: async (_, { }) => {
            try {
                const Areas = await AreasOperativas.find({ estado: 'ACTIVO' });
                return Areas;
            } catch (error) {
                return error;
            }
        },
        obtenerArea: async (_, { id }) => {
            try {
                const Areas = await AreasOperativas.findById(id);
                return Areas;
            } catch (error) {
                return error;
            }
        }
    },
    Mutation: {
        insertarArea: async (_, { input }) => {
            try {
                const { nombre } = input;
                const existe = await AreasOperativas.findOne({ nombre });
                if (existe) {
                    return {
                        estado: true,
                        data: null,
                        message: "Ya existe una área con ese nombre"
                    }
                }
                const Area = new AreasOperativas(input)
                const result = await Area.save()
                return {
                    estado: true,
                    data: result,
                    message: "Área creada"
                }
            } catch (error) {
                console.log(error)
                return {
                    estado: false,
                    data: null,
                    message: "Ocurrio un error inesperado"
                };
            }
        },
        actualizarArea: async (_, { id, input }) => {
            try {
                const Area = await AreasOperativas.findByIdAndUpdate({ _id: id }, input, { new: true })
                return {
                    estado: true,
                    data: Area,
                    message: "Área actualizada correctamente"
                };
            } catch (error) {
                return {
                    estado: false,
                    data: null,
                    message: "Ocurrio un error inesperado"
                };
            }
        },
        desactivarArea: async (_, { id }) => {
            try {
                const Area = await AreasOperativas.findOneAndUpdate({ _id: id }, { estado: 'INACTIVO' }, { new: true });
                if (Area) {
                    return {
                        estado: true,
                        data: null,
                        message: "Área eliminada correctamente"
                    };
                } else {
                    return {
                        estado: false,
                        data: null,
                        message: "No se pudo eliminar el Área"
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