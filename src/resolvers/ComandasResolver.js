import { Comanda, Mesa, Subcuenta } from "../models";
import { Types } from 'mongoose';
export default {
    Query: {
        obtenerComandas: async (_, { }) => {
            try {
                const comandas = await Comanda.find({}).populate('mesa');
                for (const comanda of comandas) {
                    const subcuentas = await Subcuenta.find({ comanda: comanda.id });
                    comanda.subcuentas = subcuentas;
                }
                return comandas;
            } catch (error) {
                return error;
            }
        },
        obtenerComandaById: async (_, { id }) => {
            try {
                const comanda = await Comanda.find({ id }).populate('mesa');
                const subcuentas = await Subcuenta.find({ comanda: comanda.id });
                comanda.subcuentas = subcuentas;

                return comanda;
            } catch (error) {
                return error;
            }
        },
        obtenerComandaPorMesa: async (_, { id }) => {
            try {
                const comanda = await Comanda.findOne({ mesa: id, estado: 'GENERADA' });
                if (!comanda) {
                    return null;
                }

                const subcuentas = await Subcuenta.find({ comanda: Types.ObjectId(comanda._id) });

                return {
                    ...comanda.toObject(),
                    id: comanda._id.toString(),
                    mesa: {
                        ...comanda.mesa,
                        id: comanda.mesa._id.toString()
                    },
                    subcuentas: subcuentas.map(subcuenta => ({
                        ...subcuenta.toObject(),
                        id: subcuenta._id.toString(),
                    })),
                };
            } catch (error) {
                return error;
            }
        },
    },
    Mutation: {
        insertarComanda: async (_, { input }) => {
            try {
                const { mesa } = input;
                const existe = await Comanda.findOne({ mesa, estado: 'GENERADA' });
                if (existe) {
                    return {
                        estado: false,
                        data: null,
                        message: "La mesa ya posee una comanda abierta"
                    };
                }
                const comanda = new Comanda(input);
                const result = await comanda.save();
                return {
                    estado: true,
                    data: result,
                    message: "Comanda creada con exito"
                };
            } catch (error) {
                return {
                    estado: false,
                    data: null,
                    message: error.message || "Ocurrio un error inesperado al guardar la comanda"
                };
            }
        },
        actualizarComanda: async (_, { id, input }) => {
            try {
                const comanda = await Comanda.findOneAndUpdate({ _id: id }, input, { new: true });
                if (!comanda) {
                    return {
                        estado: false,
                        data: null,
                        message: "Ocurrio un error al actualizar la comanda"
                    };
                }
                return {
                    estado: true,
                    data: comanda,
                    message: "La comanda fue actualizada con éxito"
                };
            } catch (error) {
                return {
                    estado: false,
                    data: null,
                    message: error.message || "Ocurrio un error inesperado al actualizar la comanda"
                };
            }
        },
        desactivarComanda: async (_, { id }) => {
            try {
                const comanda = await Comanda.findOneAndUpdate({ _id: id }, { estado: 'DESCARTADA' }, { new: true });
                console.log(id);
                if (!comanda) {
                    return {
                        estado: false,
                        data: null,
                        message: "Ocurrio un error al desactivar la comanda"
                    };
                }
                return {
                    estado: true,
                    data: comanda,
                    message: "La comanda fue desactivada con éxito"
                };
            } catch (error) {
                console.log(error);
                return {
                    estado: false,
                    data: null,
                    message: error.message || "Ocurrio un error inesperado al desactivar la comanda"
                };
            }

        }
    }
}