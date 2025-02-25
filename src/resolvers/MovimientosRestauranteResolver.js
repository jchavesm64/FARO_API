const { MovimientosRestaurante } = require('../models');

export default {
    Query: {
        obtenerMovimientosRestaurante: async () => {
            try {
                return await MovimientosRestaurante.findAll();
            } catch (error) {
                return error;
            }
        },
        obtenerMovimientosPorFecha: async (_, { fechaInicio, fechaFin }) => {
            try {
                const movements = await MovimientosRestaurante.find({}).where('fecha').gt(fechaInicio).lt(fechaFin);
                return movements;
            } catch (error) {
                return error;
            }
        },
    },
    Mutation: {
        insertarMovimientoRestaurante: async (_, { input }) => {
            try {
                const existe = await MovimientosRestaurante.findOne({fecha: input.fecha,cliente: input.cliente,comanda: input.comanda});
                if (existe) {
                    return {
                        estado: false,
                        data: null,
                        message: "El impuesto ya existe"
                    }
                } else {
                    const movimiento = new MovimientosRestaurante(input);
                    const result = await movimiento.save();
                    return {
                        estado: true,
                        data: result,
                        message: "Impuesto registrado correctamente"
                    }
                }
            } catch (error) {
                return {
                    estado: false,
                    data: null,
                    message: error.message || "Ocurrio un error inesperado al guardar el movimiento"
                };
            }
        }
    }
}
