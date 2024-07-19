import { FacturasParametros } from '../models';

export default {
    Query: {
        obtenerFacturasParametrosByType: async (_, { type }) => {
            try {
                const parametros = await FacturasParametros.find({ type: type });
                return parametros;
            } catch (error) {
                return error;
            }
        },
        obtenerFacturasParametros: async (_, {}) => {
            try {
                const parametros = await FacturasParametros.find();
                return parametros;
            } catch (error) {
                return error;
            }
        },
    }
}

