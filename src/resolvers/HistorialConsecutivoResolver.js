import { HistorialConsecutivo } from '../models';

export default {
    Query: {
        obtenerHistorialConsecutivos: async () => {
            try {
                const historiales = await HistorialConsecutivo.find({})
                    .populate('usuario')
                    .sort({ fechaAsignacion: -1 });
                return historiales;
            } catch (error) {
                return error;
            }
        },
        obtenerHistorialConsecutivo: async (_, { id }) => {
            try {
                const historial = await HistorialConsecutivo.findById(id)
                    .populate('usuario');
                return historial;
            } catch (error) {
                return error;
            }
        }
    }
};