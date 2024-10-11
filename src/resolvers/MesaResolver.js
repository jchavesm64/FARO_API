import { Piso, Mesa, Comanda, Subcuenta } from "../models";

export default {
    Query: {
        obtenerMesas: async (_, { }) => {
            try {
                const mesas = await Mesa.find({ estado: "ACTIVO" }).populate('piso').sort({ numero: 1 });
                return mesas;
            } catch (error) {
                return error;
            }
        },
        obtenerMesaById: async (_, { id }) => {
            try {
                const mesa = await Mesa.findOne({
                    _id: id
                }).populate('piso');
                return mesa;
            } catch (error) {
                return error;
            }
        },
    },
    Mutation: {
        insertarMesa: async (_, { input }) => {
            try {
                const { numero } = input;
                const existe = await Mesa.findOne({ numero });
                if (existe) {
                    return {
                        estado: false,
                        data: null,
                        message: "El número de la mesa/silla ya fue asignado"
                    };
                } else {
                    const mesa = new Mesa(input);
                    const result = await mesa.save();
                    return {
                        estado: true,
                        data: result,
                        message: "Mesa/Silla creada con exito"
                    }
                }
            } catch (error) {
                return error;
            }
        },
        actualizarMesa: async (_, { id, input }) => {
            try {
                const { numero } = input;
                const existe = await Mesa.findOne({ numero });
                const mesaNumber = await Mesa.findOne({ _id: id });
                if (existe && mesaNumber.numero !== numero) {
                    return {
                        estado: false,
                        data: null,
                        message: "El número de la mesa/silla ya fue asignado"
                    };
                }
                const mesa = await Mesa.findOneAndUpdate({ _id: id }, input, { new: true });
                return {
                    estado: true,
                    data: mesa,
                    message: "Mesa/Silla actualizada correctamente"
                };
            } catch (error) {
                return {
                    estado: false,
                    data: null,
                    message: "Ocurrio un error inesperado al actualizar la mesa/silla"
                };
            }
        }
    }
}