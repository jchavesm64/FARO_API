import Notas from '../models/Notas'

export default {
    Query: {
        obtenerNotas: async (_, { }) => {
            try {
                const Notas = await Notas.find({ estado: 'ACTIVO' });
                return Notas;
            } catch (error) {
                return error;
            }
        },
        obtenerNota: async (_, { id }) => {
            try {
                const Notas = await Notas.findById(id);
                return Notas;
            } catch (error) {
                return error;
            }
        }
    },
    Mutation: {
        insertarNota: async (_, { input }) => {
            try {

                const Nota = new Notas(input)
                const result = await Nota.save()
                return {
                    estado: true,
                    data: result,
                    message: "Nota creada"
                }
            } catch (error) {
                return {
                    estado: false,
                    data: null,
                    message: "Ocurrio un error inesperado"
                };
            }
        },
        actualizarNota: async (_, { id, input }) => {
            try {
                const Nota = await Notas.findByIdAndUpdate({ _id: id }, input, { new: true })
                return {
                    estado: true,
                    data: Nota,
                    message: "Nota actualizada correctamente"
                };
            } catch (error) {
                return {
                    estado: false,
                    data: null,
                    message: "Ocurrio un error inesperado"
                };
            }
        },
        desactivarNota: async (_, { id }) => {
            try {
                const Nota = await Notas.findOneAndUpdate({ _id: id }, { estado: 'INACTIVO' }, { new: true });
                if (Nota) {
                    return {
                        estado: true,
                        data: null,
                        message: "Nota eliminada correctamente"
                    };
                } else {
                    return {
                        estado: false,
                        data: null,
                        message: "No se pudo eliminar la nota"
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