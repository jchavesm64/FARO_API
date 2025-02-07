import { Subcuenta, MenuLinea, MateriasPrimas } from '../models';

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
                const { numero, comanda, platillos } = input;
                const existe = await Subcuenta.findOne({ numero, comanda });
        
                if (existe) {
                    existe.platillos.push(...platillos);
                    const subcuenta = await existe.save();
        
                    return {
                        estado: true,
                        data: subcuenta,
                        message: "Subcuenta actualizada con éxito"
                    };
                }
    
                const subcuenta = new Subcuenta(input);
                const result = await subcuenta.save();
        
                return {
                    estado: true,
                    data: result,
                    message: "Subcuenta creada con éxito"
                };
        
            } catch (error) {
                return {
                    estado: false,
                    data: null,
                    message: error.message || "Ocurrió un error inesperado al guardar la subcuenta"
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
        actualizarEntregados: async (_, { id }) => {
            try {
            const subcuenta = await Subcuenta.findById(id);
                
            if (!subcuenta) {
                throw new Error("Subcuenta no encontrada");
            }
        
            if (subcuenta.estado === "Entregado") {
                return {
                    estado: false,
                    data: null,
                    message: "La subcuenta ya se encuentra en estado Entregado",
                };
            }
        
            const updatedSubcuenta = await Subcuenta.findByIdAndUpdate(
                id,
                {
                    $set: {
                        "platillos.$[elem].estado": "Entregado",
                        estado: "Entregado",
                    },
                },
                {
                    arrayFilters: [{ "elem.estado": "Pendiente" }],
                    new: true
                }
            );
        
            return {
                estado: true,
                data: updatedSubcuenta,
                message: "Subcuenta y platillos actualizados a Entregado con éxito",
            };
            } catch (error) {
            console.error(error);
            return {
                estado: false,
                data: null,
                message: error.message || "Error al actualizar el estado de la subcuenta y los platillos",
            };
            }
        },
        
        desactivarPlatillo: async (_, { subcuentaId, platilloId }) => {
            try {
                const subcuenta = await Subcuenta.findOneAndUpdate(
                    { _id: subcuentaId, "platillos._id": platilloId }, 
                    { $set: { "platillos.$.estado": "Cancelado" } }, 
                    { new: true } 
                );
        
                if (!subcuenta) {
                    return {
                        estado: false,
                        data: null,
                        message: "No se encontró la subcuenta o el platillo"
                    };
                }
        
                return {
                    estado: true,
                    data: subcuenta,
                    message: "Platillo cancelado con éxito"
                };
            } catch (error) {
                return {
                    estado: false,
                    data: null,
                    message: error.message || "Ocurrió un error inesperado al cancelar el platillo"
                };
            }
        }
        
    }
}