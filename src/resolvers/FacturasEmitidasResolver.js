import { FacturasEmitidas } from '../models';

export default {
    Query: {
        obtenerFacturasEmitidas: async (_, { }) => {
            try {
                const facturasEmitidas = await FacturasEmitidas.find()
                .sort({ 'response.Fecha': -1 });
                return facturasEmitidas;
            } catch (error) {
                return error;
            }
        },
    }
}