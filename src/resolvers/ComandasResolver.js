import { Comanda, Mesa, Subcuenta } from "../models";

export default {
    Query: {
        obtenerComandas: async (_, { piso }) => {
            try {
                const comandas = await Comanda.find({ piso, estado: 'ACTIVO' }).populate('mesa');
                for (const comanda of comandas) {
                    const subcuentas = await Subcuenta.find({ comanda: comanda.id });
                    comanda.subcuentas = subcuentas;
                }
                return comandas;
            } catch (error) {
                return error;
            }
        },
        obtenerComanda: async (_, { id }) => {
            try {
                const comanda = await Comanda.find({ id }).populate('mesa').populate('piso');
                const subcuentas = await Subcuenta.find({ comanda: comanda.id });
                comanda.subcuentas = subcuentas;

                return comanda;
            } catch (error) {
                return error;
            }
        },
        obtenerComandasPorMesa: async (_, { mesaId }) => {
            try {
                const comanda = await Comanda.find({ mesa: mesaId, estado: 'ACTIVO' });
                const subcuentas = await Subcuenta.find({ comanda: comanda.id });
                comanda.subcuentas = subcuentas;
                return comanda;
            } catch (error) {
                return error;
            }
        }
    },
    Mutation: {
        insertarComanda: async (_, { input }) => {
            try {
                const { piso, mesa, fecha, preFactura } = input;
                const ocupada = await Mesa.findOne({ id: mesa, estado: { $ne: 'LIBRE' } });
                if (ocupada) {
                    return "La mesa se encuentra ocupada o reserveada";
                }

                return result;

            } catch (error) {
                return error;
            }
        },
        actualizarPermiso: async (_, { id, input }) => {
            try {
                const permiso = await Permiso.findOneAndUpdate({ _id: id }, input, { new: true });
                return permiso;
            } catch (error) {
                return error;
            }
        },
        desactivarPermiso: async (_, { id }) => {
            try {
                const permiso = await Permiso.findOneAndUpdate({ _id: id }, { estado: 'INACTIVO' }, { new: true });
                if (permiso) {
                    return "Permiso eliminado correctamente";
                } else {
                    return "No se pudo eliminar el permiso";
                }
            } catch (error) {
                return error;
            }
        }
    }
}