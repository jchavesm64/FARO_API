import { MovimientosActivo } from '../models';
import ModuloConsecutivoResolver from './ModuloConsecutivoResolver';

const { generarConsecutivo } = ModuloConsecutivoResolver.Mutation;

export default {
    Query: {
        obtenerMovimientosActivos: async (_, { }) => {
            try {
                const movimientos = await MovimientosActivo.find({}).populate('consecutivo').populate('activo');
                return movimientos.sort(function (a, b) {
                    if (a.consecutivo.consecutivo < b.consecutivo.consecutivo) {
                        return 1;
                    }
                    if (a.consecutivo.consecutivo > b.consecutivo.consecutivo) {
                        return -1;
                    }
                    return 0;
                });
            } catch (error) {
                return error;
            }
        },
    },
    Mutation: {
        insertarMovimientosActivo: async (_, { input }) => {
            try {
                const consecutivoResponse = await generarConsecutivo(_, {
                    input: {
                        modulo: "movimiento de activos",
                        cedula: input.cedula
                    }
                });

                if (!consecutivoResponse.estado) {
                    return {
                        estado: false,
                        data: null,
                        message: consecutivoResponse.message
                    };
                }

                input.consecutivo = consecutivoResponse.data.id;
                delete input.cedula;

                input.fecha = new Date();

                const movimientoActivo = new MovimientosActivo(input);

                const result = await movimientoActivo.save();
                await result.populate('activo').populate('consecutivo').execPopulate();
                console.log(result);

                return {
                    estado: true,
                    data: result,
                    message: "Se registró correctamente el movimiento"
                };
            } catch (error) {
                return {
                    estado: false,
                    data: null,
                    message: "Ocurrió un error inesperado al registrar el movimiento"
                };
            }
        },
    }
}