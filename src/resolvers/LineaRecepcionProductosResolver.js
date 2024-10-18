import { LineasRecepcionProductos } from '../models';
import mongoose from 'mongoose';

export default {
    Query: {
        obtenerLineasRecepcionPedido: async (_, { id }) => {
            try {
                const lineas = await LineasRecepcionProductos.find({ estado: 'ACTIVO', recepcion: id }).populate('producto').populate('impuesto').populate('recepcion').populate('almacen');
                return lineas.sort(function (a, b) {
                    if (a.fechaPedido > b.fechaPedido) {
                        return 1
                    }
                    if (a.fechaPedido < b.fechaPedido) {
                        return -1
                    }
                    return 0;
                });
            } catch (error) {
                return error;
            }
        },
        obtenerLineaRecepcionPedido: async (_, { id }) => {
            try {
                const pedido = await LineasRecepcionProductos.findOne({ id: id }).populate('producto').populate('impuesto').populate('recepcion').populate('almacen');
                return pedido;
            } catch (error) {

            }
        }
    },
    Mutation: {
        insertarLineasRecepcionPedido: async (_, { input }) => {
            try {
                const { recepcion, producto } = input;
                const existe = await LineasRecepcionProductos.findOne({ recepcion: recepcion, producto: producto });
                if (existe) {
                    return {
                        estado: true,
                        data: null,
                        message: "La línea ya existe"
                    };
                } else {
                    const linea = new LineasRecepcionProductos(input);
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
        actualizarLineasRecepcionPedido: async (_, { id, input }) => {
            try {
                const linea = await LineasRecepcionProductos.findOneAndUpdate({ _id: id }, input, { new: true });
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
        desactivarLineasRecepcionPedido: async (_, { id }) => {
            try {
                const linea = await LineasRecepcionProductos.findOneAndUpdate({ _id: id }, { estado: 'INACTIVO' }, { new: true });
                if (linea) {
                    return {
                        estado: true,
                        data: null,
                        message: "Línea eliminada correctamente"
                    };
                } else {
                    return {
                        estado: false,
                        data: null,
                        message: "No se pudo eliminar la línea"
                    };
                }
            } catch (error) {
                return {
                    estado: false,
                    data: null,
                    message: "Ocurrio un error inesperado al eliminar la línea"
                };
            }
        },
        actualizarCantidadRecibidaLineaRecepcion: async (_, { id, cantidad, almacen }) => {
            try {
                const linea = await LineasRecepcionProductos.findOneAndUpdate({ _id: id }, { cantidadRecibida: cantidad, almacen: almacen }, { new: true });
                if (linea) {
                    return {
                        estado: true,
                        data: null,
                        message: "Línea actualizada correctamente"
                    };
                } else {
                    return {
                        estado: false,
                        data: null,
                        message: "No se pudo actualizar la línea"
                    };
                }
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