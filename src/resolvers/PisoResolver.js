import { Piso, Mesa, Comanda, Subcuenta } from "../models";

export default {
    Query: {
        obtenerPisos: async (_, { }) => {
            try {
                const pisos = await Piso.find({ estado: "ACTIVO" });
                return pisos;
            } catch (error) {
                return error;
            }
        },
        obtenerPisoById: async (_, { id }) => {
            try {
                const piso = await Piso.findOne({
                    _id: id
                });
                return piso;
            } catch (error) {
                return error;
            }
        },
        obtenerMesasPorPiso: async (_, { id }) => {
            try {
                const mesas = await Mesa.find({ piso: id }).populate('piso');
                return mesas;
            } catch (error) {
                return error;
            }
        },
        obtenerComandasPorPiso: async (_, { id }) => {
            try {
                let mesas = await Mesa.find({ piso: id });
                let comandas = [];
                mesas.map(async mesa => {
                    let comanda = await Comanda.find({ mesa: mesa.id });
                    let subcuentas = await Subcuenta.find({ comanda: comanda.id });
                    comandas.push({
                        mesa: mesa,
                        comandas: {
                            comanda: comanda,
                            subcuentas: subcuentas
                        }
                    });
                });
                return comandas;
            } catch (error) {
                return error;
            }
        }
    },
    Mutation: {
        insertarPiso: async (_, { input }) => {
            try {
                const piso = new Piso(input);
                const result = await piso.save();
                if (!result) {
                    return {
                        estado: false,
                        data: null,
                        message: "Ocurrio un error al registrar el piso"
                    };
                }
                return {
                    estado: true,
                    data: result,
                    message: "El piso fue registrado con éxito"
                };
            } catch (error) {
                return error;
            }
        },
        actualizarPiso: async (_, { id, input }) => {
            try {
                const piso = await Piso.findOneAndUpdate({ _id: id }, input, { new: true });
                if (!piso) {
                    return {
                        estado: false,
                        data: null,
                        message: "Ocurrio un error al actualizar el piso"
                    };
                }
                return {
                    estado: true,
                    data: piso,
                    message: "El piso fue actualizado con éxito"
                };
            } catch (error) {
                return error;
            }
        },
        desactivarPiso: async (_, { id }) => {
            try {
                const piso = await Piso.findOneAndUpdate({ _id: id }, { estado: 'INACTIVO' }, { new: true });
                if (!piso) {
                    return {
                        estado: false,
                        data: null,
                        message: "Ocurrio un error al desactivar el piso"
                    };
                }
                return {
                    estado: true,
                    data: piso,
                    message: "El piso fue desactivado con éxito"
                };
            } catch (error) {
                return error;
            }
        }
    }
}