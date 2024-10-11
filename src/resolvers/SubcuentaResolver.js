import { Subcuenta } from '../models';

export default {
    Query: {
        obtenerSubcuentas: async (_, { }) => {
            try {
                const subcuentas = await Subcuenta.find({});
                return subcuentas;
            } catch (error) {
                return error;
            }
        },
        obtenerSubcuentaById: async (_, { id }) => {
            try {
                const subcuenta = await Subcuenta.findById(id);
                return subcuenta;
            } catch (error) {
                return error;
            }
        },
        obtenerSubcuentasPorComanda: async (_, { id }) => {
            try {
                const subcuentas = await Subcuenta.find({ comanda: id });
                return subcuentas;
            } catch (error) {
                return error;
            }
        }
    },
    Mutation: {
        insertarSubcuenta: async (_, { input }) => {
            try {
                const { numero, comanda } = input;
                const existe = await Subcuenta.findOne({ numero, comanda });
                if (existe) {
                    //update subcuenta
                    const subcuenta = await Subcuenta.findOneAndUpdate({ numero, comanda }, input, { new: true });
                    return {
                        estado: true,
                        data: subcuenta,
                        message: "Subcuenta actualizada con exito"
                    };
                }
                const subcuenta = new Subcuenta(input);
                const result = await subcuenta.save();
                return {
                    estado: true,
                    data: result,
                    message: "Subcuenta creada con exito"
                };

            } catch (error) {
                return {
                    estado: false,
                    data: null,
                    message: error.message || "Ocurrio un error inesperado al guardar la subcuenta"
                };
            }
        },
        actualizarSubcuenta: async (_, { id, input }) => {
            try {
                const subcuenta = await Subcuenta.findOneAndUpdate({ _id: id }, input, { new: true });
                return {
                    estado: true,
                    data: subcuenta,
                    message: "Subcuenta actualizada con exito"
                };
            } catch (error) {
                return {
                    estado: false,
                    data: null,
                    message: error.message || "Ocurrio un error inesperado al actualizar la subcuenta"
                };
            }
        },
        desactivarSubcuenta: async (_, { id }) => {
            try {
                const subcuenta = await Subcuenta.findOneAndUpdate({ _id: id }, { estado: 'Cancelado' }, { new: true });
                return {
                    estado: true,
                    data: subcuenta,
                    message: "Subcuenta desactivada con exito"
                };
            } catch (error) {
                return {
                    estado: false,
                    data: null,
                    message: error.message || "Ocurrio un error inesperado al desactivar la subcuenta"
                };
            }
        }
    }
}