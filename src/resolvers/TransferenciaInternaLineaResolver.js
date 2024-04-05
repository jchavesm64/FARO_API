import { TransferenciaInternaLinea } from '../models';

export default {
    Query: {
        obtenerLineasTransferenciaInterna: async (_, { id}) => {
            try {
                const lineas = await TransferenciaInternaLinea.find({ transferenciaInterna: id }).populate('transferenciaInterna').populate('producto')
                return lineas
            } catch (error) {
                return error;
            }
        },
        obtenerLineaTransferenciaInterna: async (_, { id }) => {
            try {
                const linea = await TransferenciaInternaLinea.findOne({id: id}).populate('transferenciaInterna').populate('producto')
                return linea;
            } catch (error) {

            }
        }
    },
    Mutation: {
        insertarLineaTransferenciaInterna: async (_, { input }) => {
            try {
                const { transferenciaInterna, producto } = input;
                const existe = await TransferenciaInternaLinea.findOne({ transferenciaInterna: transferenciaInterna, producto: producto });
                if (existe) {
                    input.cantidad = parseFloat(existe.cantidad) + parseFloat(input.cantidad)
                    const linea = await TransferenciaInternaLinea.findOneAndUpdate({ _id: existe.id }, input, { new: true });
                    return {
                        estado: true,
                        data: linea,
                        message: "Línea actualizada correctamente"
                    };
                } else {
                    const linea = new TransferenciaInternaLinea(input);
                    const result = await linea.save();
                    return {
                        estado: true,
                        data: result,
                        message: "Línea creada con exito"
                    }
                }
            } catch (error) {
                return {
                    estado: false,
                    data: null,
                    message: "Ocurrio un error inesperado al registrar la línea"
                };
            }
        },
        actualizarLineaTransferenciaInterna: async (_, { id, input }) => {
            try {
                const linea = await TransferenciaInternaLinea.findOneAndUpdate({ _id: id }, input, { new: true });
                return {
                    estado: true,
                    data: linea,
                    message: "Línea actualizada correctamente"
                };
            } catch (error) {
                return {
                    estado: false,
                    data: null,
                    message: "Ocurrio un error inesperado al actualizar la línea"
                };
            }
        },
    }
}